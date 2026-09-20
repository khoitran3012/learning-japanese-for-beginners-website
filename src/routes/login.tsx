import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { emailAndPasswordEnabled } from "@/lib/auth/email-password";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { issueRecoveryCode, resetPasswordWithCode } from "@/lib/akari/recovery";

export const Route = createFileRoute("/login")({ component: Login });

function grokSocialAllowed(hostname: string) {
  return (
    hostname.endsWith(".grok-sandbox.com") ||
    hostname.endsWith(".grok.me") ||
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]"
  );
}

function humanAuthError(message: string | undefined, fallback: string) {
  const raw = (message || "").toLowerCase();
  if (raw.includes("invalid origin") || raw.includes("unable to verify") || raw.includes("forbidden")) {
    return "Trình duyệt gửi địa chỉ khác với máy chủ. Hãy mở đúng domain bạn đang host (ví dụ http://khoitran3012.ddns.net:8080), cho phép cookie, rồi thử lại.";
  }
  if (raw.includes("invalid password") || raw.includes("invalid email") || raw.includes("invalid credentials")) {
    return "Email hoặc mật khẩu chưa đúng.";
  }
  if (raw.includes("user already exists") || raw.includes("already exists")) {
    return "Email này đã có tài khoản. Hãy đăng nhập.";
  }
  if (raw.includes("password") && raw.includes("least")) {
    return "Mật khẩu cần tối thiểu 8 ký tự.";
  }
  if (raw.includes("failed to fetch") || raw.includes("network") || raw.includes("load failed")) {
    return "Không kết nối được máy chủ. Kiểm tra app còn chạy và bạn đang mở đúng địa chỉ.";
  }
  return message || fallback;
}

function Login() {
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up" | "forgot">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [socialOk, setSocialOk] = useState(false);
  const [recovery, setRecovery] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [resetOk, setResetOk] = useState(false);

  useEffect(() => {
    setSocialOk(grokSocialAllowed(window.location.hostname));
  }, []);

  if (isPending) {
    return (
      <main className="grid min-h-dvh place-items-center bg-bg px-4 py-10 text-fg">
        <div className="h-10 w-48 animate-pulse rounded-[10px] bg-border" aria-hidden />
      </main>
    );
  }

  if (user && !recovery) {
    void navigate({ to: "/" });
  }

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setResetOk(false);
    try {
      if (mode === "forgot") {
        const res = await resetPasswordWithCode({
          data: { email: email.trim(), code, password },
        });
        if (!res.ok) {
          setError(res.error);
          return;
        }
        setResetOk(true);
        setMode("in");
        setPassword("");
        setCode("");
        return;
      }
      if (mode === "up") {
        const res = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: name.trim() || email.split("@")[0] || "Học viên",
        });
        if (res.error) {
          setError(humanAuthError(res.error.message, "Không tạo được tài khoản."));
          return;
        }
        let code: string | null = null;
        for (let i = 0; i < 4 && !code; i++) {
          try {
            await authClient.getSession();
            const minted = await issueRecoveryCode();
            if (minted.ok) code = minted.code;
          } catch {
            /* session may not be ready yet */
          }
          if (!code) await new Promise((r) => setTimeout(r, 250 * (i + 1)));
        }
        if (code) {
          setRecovery(code);
          return;
        }
        setRecovery("MISSING");
        return;
      }
      const res = await authClient.signIn.email({ email: email.trim(), password });
      if (res.error) {
        setError(humanAuthError(res.error.message, "Email hoặc mật khẩu chưa đúng."));
        return;
      }
      await navigate({ to: "/" });
    } catch {
      setError("Không đăng nhập được. Mở đúng địa chỉ host, cho phép cookie, rồi thử lại.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-4 py-10 text-fg">
      <div className="w-full max-w-sm space-y-5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-[10px] bg-primary font-jp text-lg text-primary-fg">
            明
          </span>
          <span>
            <span className="block font-semibold leading-tight">Akari</span>
            <span className="block text-xs text-muted">Đăng nhập để thi đua</span>
          </span>
        </Link>

        <div className="rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)]">
          <h1 className="text-lg font-semibold">
            {mode === "forgot" ? "Đặt lại mật khẩu" : "Tài khoản học tập"}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {mode === "forgot"
              ? "Nhập email, mã khôi phục đã lưu khi tạo tài khoản, rồi mật khẩu mới. App không gửi email."
              : "Điểm quiz, bài hàng ngày và chuỗi ngày sẽ lên bảng xếp hạng. Học không bắt buộc đăng nhập."}
            {mode !== "forgot" &&
              (socialOk
                ? " Có thể dùng Google / X, hoặc email + mật khẩu."
                : " Trên domain riêng hãy dùng email + mật khẩu (Google/X chỉ trên bản Grok).")}
          </p>

          {authEnabled && socialOk && mode !== "forgot" ? (
            <div className="mt-4 space-y-2">
              {GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                >
                  Tiếp tục với {p.label}
                </Button>
              ))}
            </div>
          ) : null}

          {authEnabled && emailAndPasswordEnabled ? (
            <>
              {socialOk && mode !== "forgot" ? (
                <div className="my-4 flex items-center gap-3 text-xs text-subtle">
                  <span className="h-px flex-1 bg-border" />
                  hoặc email
                  <span className="h-px flex-1 bg-border" />
                </div>
              ) : (
                <div className="mt-4" />
              )}
              {mode !== "forgot" ? (
                <div className="mb-3 flex gap-2">
                  <Button size="sm" variant={mode === "in" ? "default" : "secondary"} onClick={() => setMode("in")}>
                    Đăng nhập
                  </Button>
                  <Button size="sm" variant={mode === "up" ? "default" : "secondary"} onClick={() => setMode("up")}>
                    Tạo tài khoản
                  </Button>
                </div>
              ) : null}
              <form className="space-y-3" onSubmit={(e) => void onEmail(e)}>
                {mode === "up" ? (
                  <div>
                    <Label htmlFor="name">Tên hiển thị</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
                  </div>
                ) : null}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
                {mode === "forgot" ? (
                  <div>
                    <Label htmlFor="code">Mã khôi phục</Label>
                    <Input
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="mt-1 font-mono uppercase"
                      placeholder="XXXX-XXXX-XXXX"
                      autoComplete="off"
                      required
                    />
                  </div>
                ) : null}
                <div>
                  <Label htmlFor="password">{mode === "forgot" ? "Mật khẩu mới" : "Mật khẩu"}</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete={mode === "in" ? "current-password" : "new-password"}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                  />
                </div>
                {resetOk ? <p className="text-sm text-success">Đã đặt mật khẩu mới. Hãy đăng nhập.</p> : null}
                {error ? <p className="text-sm text-danger">{error}</p> : null}
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy
                    ? "Đang xử lý…"
                    : mode === "up"
                      ? "Tạo tài khoản"
                      : mode === "forgot"
                        ? "Đặt mật khẩu mới"
                        : "Đăng nhập"}
                </Button>
              </form>
              {mode === "forgot" ? (
                <button type="button" className="mt-3 text-sm text-accent" onClick={() => setMode("in")}>
                  Quay lại đăng nhập
                </button>
              ) : mode === "in" ? (
                <button type="button" className="mt-3 text-sm text-accent" onClick={() => setMode("forgot")}>
                  Quên mật khẩu?
                </button>
              ) : (
                <p className="mt-3 text-xs text-subtle">
                  Sau khi tạo, bạn sẽ nhận mã khôi phục — lưu lại để đặt lại mật khẩu sau này.
                </p>
              )}
            </>
          ) : authEnabled ? (
            <p className="mt-3 text-sm text-muted">Đăng nhập đang tắt email/mật khẩu.</p>
          ) : (
            <p className="mt-3 text-sm text-muted">Đăng nhập đang tắt.</p>
          )}
        </div>

        <Button asChild variant="ghost" className="w-full">
          <Link to="/">Học không cần tài khoản</Link>
        </Button>
      </div>

      <Dialog open={Boolean(recovery)} onOpenChange={(open) => !open && recovery && void navigate({ to: "/" })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lưu mã khôi phục</DialogTitle>
            <DialogDescription>
              {recovery === "MISSING"
                ? "Tài khoản đã tạo. Vào Cài đặt → Mật khẩu & khôi phục để lấy mã (app không gửi email)."
                : "Đây là cách duy nhất để đặt lại mật khẩu (app không gửi email). Chép và cất ở chỗ an toàn."}
            </DialogDescription>
          </DialogHeader>
          {recovery && recovery !== "MISSING" ? (
            <p className="rounded-[10px] border border-border bg-bg-elevated px-3 py-3 text-center font-mono text-lg tracking-wide">
              {recovery}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            {recovery && recovery !== "MISSING" ? (
              <Button
                variant="secondary"
                onClick={() => {
                  if (!recovery) return;
                  void navigator.clipboard.writeText(recovery).then(() => setCopied(true));
                }}
              >
                {copied ? "Đã chép" : "Chép mã"}
              </Button>
            ) : null}
            <Button onClick={() => void navigate({ to: recovery === "MISSING" ? "/settings" : "/" })}>
              {recovery === "MISSING" ? "Mở cài đặt" : "Đã lưu, vào học"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
