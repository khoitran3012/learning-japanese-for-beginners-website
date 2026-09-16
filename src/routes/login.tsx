import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { emailAndPasswordEnabled } from "@/lib/auth/email-password";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (isPending) {
    return (
      <main className="grid min-h-dvh place-items-center bg-bg px-4 py-10 text-fg">
        <div className="h-10 w-48 animate-pulse rounded-[10px] bg-border" aria-hidden />
      </main>
    );
  }

  if (user) {
    void navigate({ to: "/" });
  }

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: name.trim() || email.split("@")[0] || "Học viên",
        });
        if (res.error) {
          setError(res.error.message || "Không tạo được tài khoản.");
          return;
        }
      } else {
        const res = await authClient.signIn.email({ email: email.trim(), password });
        if (res.error) {
          setError(res.error.message || "Email hoặc mật khẩu chưa đúng.");
          return;
        }
      }
      await navigate({ to: "/" });
    } catch {
      setError("Không đăng nhập được.");
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
          <h1 className="text-lg font-semibold">Tài khoản học tập</h1>
          <p className="mt-1 text-sm text-muted">
            Điểm quiz, bài hàng ngày và chuỗi ngày sẽ lên bảng xếp hạng. Học không bắt buộc đăng nhập.
          </p>

          {authEnabled ? (
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
          ) : (
            <p className="mt-3 text-sm text-muted">Đăng nhập đang tắt.</p>
          )}

          {authEnabled && emailAndPasswordEnabled ? (
            <>
              <div className="my-4 flex items-center gap-3 text-xs text-subtle">
                <span className="h-px flex-1 bg-border" />
                hoặc email
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="mb-3 flex gap-2">
                <Button size="sm" variant={mode === "in" ? "default" : "secondary"} onClick={() => setMode("in")}>
                  Đăng nhập
                </Button>
                <Button size="sm" variant={mode === "up" ? "default" : "secondary"} onClick={() => setMode("up")}>
                  Tạo tài khoản
                </Button>
              </div>
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
                <div>
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete={mode === "up" ? "new-password" : "current-password"}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                  />
                </div>
                {error ? <p className="text-sm text-danger">{error}</p> : null}
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy ? "Đang xử lý…" : mode === "up" ? "Tạo tài khoản" : "Đăng nhập"}
                </Button>
              </form>
            </>
          ) : null}
        </div>

        <Button asChild variant="ghost" className="w-full">
          <Link to="/">Học không cần tài khoản</Link>
        </Button>
      </div>
    </main>
  );
}
