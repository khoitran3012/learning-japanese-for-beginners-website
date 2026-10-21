using System.IO;
using System.Windows;
using Microsoft.Web.WebView2.Core;

namespace Akari;

public partial class MainWindow : Window
{
    private readonly AppHost _host = new();
    private bool _shown;

    public MainWindow()
    {
        InitializeComponent();
        Loaded += async (_, _) => await BootAsync();
        Closing += (_, _) => _host.Stop();
    }

    private async void Retry_Click(object sender, RoutedEventArgs e)
    {
        RetryButton.Visibility = Visibility.Collapsed;
        StatusText.Text = "Đang mở bài học...";
        await BootAsync();
    }

    private async Task BootAsync()
    {
        try
        {
            var url = await _host.EnsureAsync(msg => Dispatcher.Invoke(() => StatusText.Text = msg));
            await ShowApp(url);
        }
        catch (Exception ex)
        {
            StatusText.Text = ex.Message;
            RetryButton.Visibility = Visibility.Visible;
            Browser.Visibility = Visibility.Collapsed;
            Gate.Visibility = Visibility.Visible;
        }
    }

    private async Task ShowApp(string url)
    {
        if (!_shown)
        {
            var data = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "Akari",
                "WebView2");
            Directory.CreateDirectory(data);
            var env = await CoreWebView2Environment.CreateAsync(null, data);
            await Browser.EnsureCoreWebView2Async(env);
            _shown = true;
        }

        Browser.Source = new Uri(url);
        Gate.Visibility = Visibility.Collapsed;
        Browser.Visibility = Visibility.Visible;
    }
}
