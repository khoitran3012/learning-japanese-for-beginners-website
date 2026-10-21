using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Text;

namespace Akari;

/// <summary>
/// Opens the bundled study server next to Akari.exe.
/// If that bundle is missing, falls back to a project checkout plus Node.js.
/// </summary>
public sealed class AppHost : IDisposable
{
    public const string Url = "http://127.0.0.1:8080/";

    private Process? _process;
    private bool _owned;
    private readonly StringBuilder _log = new();

    public async Task<string> EnsureAsync(Action<string> status)
    {
        if (await IsUp())
        {
            status("Akari đang chạy. Mở cửa sổ học...");
            return Url;
        }

        if (TryBundled(out var node, out var work, out var args))
        {
            status("Đang mở Akari...");
            Start(node, args, work, BundledEnv());
        }
        else
        {
            var root = FindRepo();
            if (root == null)
            {
                throw new InvalidOperationException(
                    "Không thấy bộ cài Akari cạnh file này. Hãy giải nén cả thư mục, rồi bấm Akari.exe ở trong đó.");
            }

            node = FindNode();
            if (node == null)
            {
                throw new InvalidOperationException(
                    "Chưa có Node.js. Cài bản LTS từ nodejs.org (chọn Add to PATH), rồi bấm Thử lại.");
            }

            var script = Path.Combine(root, "scripts", "self-host.mjs");
            if (!File.Exists(script))
            {
                throw new InvalidOperationException("Thiếu scripts\\self-host.mjs trong thư mục Akari.");
            }

            status("Đang khởi động Akari...");
            Start(node, "scripts\\self-host.mjs", root, null);
        }

        for (var i = 0; i < 180; i++)
        {
            if (_process!.HasExited)
            {
                throw new InvalidOperationException("Akari dừng khi đang mở.\n\n" + Tail());
            }

            if (await IsUp()) return Url;
            status(i < 6 ? "Đang mở Akari..." : "Lần đầu mở hơi lâu, đợi một chút...");
            await Task.Delay(1000);
        }

        throw new InvalidOperationException("Quá 3 phút mà Akari chưa mở.\n\n" + Tail());
    }

    public void Stop()
    {
        if (!_owned || _process == null || _process.HasExited) return;
        try
        {
            _process.Kill(entireProcessTree: true);
        }
        catch
        {
            // The window is already closing.
        }
    }

    public void Dispose() => Stop();

    private void Start(string file, string args, string work, Dictionary<string, string>? env)
    {
        var psi = new ProcessStartInfo
        {
            FileName = file,
            Arguments = args,
            WorkingDirectory = work,
            UseShellExecute = false,
            CreateNoWindow = true,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
        };
        if (env != null)
        {
            foreach (var pair in env) psi.Environment[pair.Key] = pair.Value;
        }

        _process = Process.Start(psi) ?? throw new InvalidOperationException("Không mở được máy chủ Akari.");
        _owned = true;
        _process.OutputDataReceived += (_, e) => Note(e.Data);
        _process.ErrorDataReceived += (_, e) => Note(e.Data);
        _process.BeginOutputReadLine();
        _process.BeginErrorReadLine();
    }

    private void Note(string? line)
    {
        if (string.IsNullOrWhiteSpace(line)) return;
        lock (_log)
        {
            _log.AppendLine(line);
            if (_log.Length > 8000) _log.Remove(0, _log.Length - 6000);
        }
    }

    private string Tail()
    {
        lock (_log)
        {
            var text = _log.ToString().Trim();
            if (text.Length == 0) return "Không có thêm chi tiết.";
            return text.Length > 1200 ? text[^1200..] : text;
        }
    }

    private static bool TryBundled(out string node, out string work, out string args)
    {
        var baseDir = AppContext.BaseDirectory;
        node = Path.Combine(baseDir, "node", "node.exe");
        work = Path.Combine(baseDir, "app");
        args = "server\\index.mjs";
        return File.Exists(node) && File.Exists(Path.Combine(work, "server", "index.mjs"));
    }

    private static Dictionary<string, string> BundledEnv()
    {
        var home = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "Akari");
        Directory.CreateDirectory(home);
        var pglite = Path.Combine(home, "pglite");
        Directory.CreateDirectory(pglite);
        var secretFile = Path.Combine(home, "auth-secret.txt");
        if (!File.Exists(secretFile) || File.ReadAllText(secretFile).Trim().Length < 32)
        {
            File.WriteAllText(secretFile, Guid.NewGuid().ToString("N") + Guid.NewGuid().ToString("N"));
        }

        var secret = File.ReadAllText(secretFile).Trim();
        return new Dictionary<string, string>
        {
            ["NODE_ENV"] = "production",
            ["NITRO_HOST"] = "127.0.0.1",
            ["NITRO_PORT"] = "8080",
            ["HOST"] = "127.0.0.1",
            ["PORT"] = "8080",
            ["AKARI_SELF_HOST"] = "1",
            ["AKARI_PGLITE_DIR"] = pglite.Replace('\\', '/'),
            ["BETTER_AUTH_URL"] = "http://127.0.0.1:8080",
            ["BETTER_AUTH_SECRET"] = secret,
            ["BETTER_AUTH_TRUSTED_ORIGINS"] = "http://127.0.0.1:8080,http://localhost:8080",
        };
    }

    private static async Task<bool> IsUp()
    {
        try
        {
            using var http = new HttpClient { Timeout = TimeSpan.FromSeconds(2) };
            using var response = await http.GetAsync(Url);
            return response.IsSuccessStatusCode;
        }
        catch
        {
            return false;
        }
    }

    private static string? FindRepo()
    {
        foreach (var seed in new[] { AppContext.BaseDirectory, Environment.CurrentDirectory })
        {
            var dir = new DirectoryInfo(seed);
            while (dir != null)
            {
                if (File.Exists(Path.Combine(dir.FullName, "package.json"))
                    && File.Exists(Path.Combine(dir.FullName, "scripts", "self-host.mjs")))
                {
                    return dir.FullName;
                }

                dir = dir.Parent;
            }
        }

        return null;
    }

    private static string? FindNode()
    {
        var fromPath = FindOnPath("node.exe");
        if (fromPath != null) return fromPath;

        var roots = new[]
        {
            Environment.GetEnvironmentVariable("ProgramFiles"),
            Environment.GetEnvironmentVariable("ProgramFiles(x86)"),
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            Environment.GetEnvironmentVariable("NVM_SYMLINK"),
            Environment.GetEnvironmentVariable("NVM_HOME"),
        };
        foreach (var root in roots)
        {
            if (string.IsNullOrWhiteSpace(root)) continue;
            foreach (var tail in new[] { "nodejs\\node.exe", "Programs\\nodejs\\node.exe" })
            {
                var path = Path.Combine(root, tail);
                if (File.Exists(path)) return path;
            }
        }

        var user = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        string[] extra =
        [
            Path.Combine(user, "scoop", "apps", "nodejs", "current", "node.exe"),
            Path.Combine(user, "scoop", "apps", "nodejs-lts", "current", "node.exe"),
            Path.Combine(user, ".volta", "bin", "node.exe"),
        ];
        return extra.FirstOrDefault(File.Exists);
    }

    private static string? FindOnPath(string file)
    {
        var path = Environment.GetEnvironmentVariable("PATH");
        if (string.IsNullOrEmpty(path)) return null;
        foreach (var dir in path.Split(Path.PathSeparator, StringSplitOptions.RemoveEmptyEntries))
        {
            var candidate = Path.Combine(dir.Trim(), file);
            if (File.Exists(candidate)) return candidate;
        }

        return null;
    }
}
