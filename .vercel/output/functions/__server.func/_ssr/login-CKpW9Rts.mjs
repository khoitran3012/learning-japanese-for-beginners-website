import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as GROK_PROVIDERS } from "./server-Dk6lnkaw.mjs";
import { r as signIn, t as authClient } from "./client-CVqXY6bk.mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { n as useCurrentUserState } from "./use-current-user-ClOiUQ-z.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-DAQLxMFr.mjs";
import { t as Input } from "./input-Blk7lEZJ.mjs";
import { t as Label } from "./label-2T3zHwov.mjs";
import { n as issueRecoveryCode, r as resetPasswordWithCode } from "./recovery-CqhGUYkM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CKpW9Rts.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function grokSocialAllowed(hostname) {
	return hostname.endsWith(".grok-sandbox.com") || hostname.endsWith(".grok.me") || hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}
function humanAuthError(message, fallback) {
	const raw = (message || "").toLowerCase();
	if (raw.includes("invalid origin") || raw.includes("unable to verify") || raw.includes("forbidden")) return "Trình duyệt gửi địa chỉ khác với máy chủ. Hãy mở đúng domain bạn đang host (ví dụ http://khoitran3012.ddns.net:8080), cho phép cookie, rồi thử lại.";
	if (raw.includes("invalid password") || raw.includes("invalid email") || raw.includes("invalid credentials")) return "Email hoặc mật khẩu chưa đúng.";
	if (raw.includes("user already exists") || raw.includes("already exists")) return "Email này đã có tài khoản. Hãy đăng nhập.";
	if (raw.includes("password") && raw.includes("least")) return "Mật khẩu cần tối thiểu 8 ký tự.";
	if (raw.includes("failed to fetch") || raw.includes("network") || raw.includes("load failed")) return "Không kết nối được máy chủ. Kiểm tra app còn chạy và bạn đang mở đúng địa chỉ.";
	return message || fallback;
}
function Login() {
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [socialOk, setSocialOk] = (0, import_react.useState)(false);
	const [recovery, setRecovery] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [resetOk, setResetOk] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setSocialOk(grokSocialAllowed(window.location.hostname));
	}, []);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-bg px-4 py-10 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-10 w-48 animate-pulse rounded-[10px] bg-border",
			"aria-hidden": true
		})
	});
	if (user && !recovery) navigate({ to: "/" });
	async function onEmail(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		setResetOk(false);
		try {
			if (mode === "forgot") {
				const res = await resetPasswordWithCode({ data: {
					email: email.trim(),
					code,
					password
				} });
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
					name: name.trim() || email.split("@")[0] || "Học viên"
				});
				if (res.error) {
					setError(humanAuthError(res.error.message, "Không tạo được tài khoản."));
					return;
				}
				let code = null;
				for (let i = 0; i < 4 && !code; i++) {
					try {
						await authClient.getSession();
						const minted = await issueRecoveryCode();
						if (minted.ok) code = minted.code;
					} catch {}
					if (!code) await new Promise((r) => setTimeout(r, 250 * (i + 1)));
				}
				if (code) {
					setRecovery(code);
					return;
				}
				setRecovery("MISSING");
				return;
			}
			const res = await authClient.signIn.email({
				email: email.trim(),
				password
			});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "grid min-h-dvh place-items-center bg-bg px-4 py-10 text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 items-center justify-center rounded-[10px] bg-primary font-jp text-lg text-primary-fg",
						children: "明"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-semibold leading-tight",
						children: "Akari"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs text-muted",
						children: "Đăng nhập để thi đua"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-semibold",
							children: mode === "forgot" ? "Đặt lại mật khẩu" : "Tài khoản học tập"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [mode === "forgot" ? "Nhập email, mã khôi phục đã lưu khi tạo tài khoản, rồi mật khẩu mới. App không gửi email." : "Điểm quiz, bài hàng ngày và chuỗi ngày sẽ lên bảng xếp hạng. Học không bắt buộc đăng nhập.", mode !== "forgot" && (socialOk ? " Có thể dùng Google / X, hoặc email + mật khẩu." : " Trên domain riêng hãy dùng email + mật khẩu (Google/X chỉ trên bản Grok).")]
						}),
						socialOk && mode !== "forgot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-2",
							children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "secondary",
								className: "w-full",
								onClick: () => signIn(p.providerId, { callbackURL: "/" }),
								children: ["Tiếp tục với ", p.label]
							}, p.providerId))
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							socialOk && mode !== "forgot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "my-4 flex items-center gap-3 text-xs text-subtle",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
									"hoặc email",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4" }),
							mode !== "forgot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: mode === "in" ? "default" : "secondary",
									onClick: () => setMode("in"),
									children: "Đăng nhập"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: mode === "up" ? "default" : "secondary",
									onClick: () => setMode("up"),
									children: "Tạo tài khoản"
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "space-y-3",
								onSubmit: (e) => void onEmail(e),
								children: [
									mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "name",
										children: "Tên hiển thị"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "name",
										value: name,
										onChange: (e) => setName(e.target.value),
										className: "mt-1"
									})] }) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "email",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "email",
										type: "email",
										autoComplete: "email",
										required: true,
										value: email,
										onChange: (e) => setEmail(e.target.value),
										className: "mt-1"
									})] }),
									mode === "forgot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "code",
										children: "Mã khôi phục"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "code",
										value: code,
										onChange: (e) => setCode(e.target.value),
										className: "mt-1 font-mono uppercase",
										placeholder: "XXXX-XXXX-XXXX",
										autoComplete: "off",
										required: true
									})] }) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "password",
										children: mode === "forgot" ? "Mật khẩu mới" : "Mật khẩu"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "password",
										type: "password",
										autoComplete: mode === "in" ? "current-password" : "new-password",
										required: true,
										minLength: 8,
										value: password,
										onChange: (e) => setPassword(e.target.value),
										className: "mt-1"
									})] }),
									resetOk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-success",
										children: "Đã đặt mật khẩu mới. Hãy đăng nhập."
									}) : null,
									error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-danger",
										children: error
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										className: "w-full",
										disabled: busy,
										children: busy ? "Đang xử lý…" : mode === "up" ? "Tạo tài khoản" : mode === "forgot" ? "Đặt mật khẩu mới" : "Đăng nhập"
									})
								]
							}),
							mode === "forgot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mt-3 text-sm text-accent",
								onClick: () => setMode("in"),
								children: "Quay lại đăng nhập"
							}) : mode === "in" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mt-3 text-sm text-accent",
								onClick: () => setMode("forgot"),
								children: "Quên mật khẩu?"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-subtle",
								children: "Sau khi tạo, bạn sẽ nhận mã khôi phục — lưu lại để đặt lại mật khẩu sau này."
							})
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Học không cần tài khoản"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: Boolean(recovery),
			onOpenChange: (open) => !open && recovery && void navigate({ to: "/" }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Lưu mã khôi phục" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: recovery === "MISSING" ? "Tài khoản đã tạo. Vào Cài đặt → Mật khẩu & khôi phục để lấy mã (app không gửi email)." : "Đây là cách duy nhất để đặt lại mật khẩu (app không gửi email). Chép và cất ở chỗ an toàn." })] }),
				recovery && recovery !== "MISSING" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-[10px] border border-border bg-bg-elevated px-3 py-3 text-center font-mono text-lg tracking-wide",
					children: recovery
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [recovery && recovery !== "MISSING" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => {
							if (!recovery) return;
							navigator.clipboard.writeText(recovery).then(() => setCopied(true));
						},
						children: copied ? "Đã chép" : "Chép mã"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void navigate({ to: recovery === "MISSING" ? "/settings" : "/" }),
						children: recovery === "MISSING" ? "Mở cài đặt" : "Đã lưu, vào học"
					})]
				})
			] })
		})]
	});
}
//#endregion
export { Login as component };
