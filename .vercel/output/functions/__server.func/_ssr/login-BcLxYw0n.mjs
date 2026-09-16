import { o as __toESM } from "../_runtime.mjs";
import { E as require_react, T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-CVqXY6bk.mjs";
import { t as GROK_PROVIDERS } from "./server-BWdmroKK.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useCurrentUserState } from "./use-current-user-ClOiUQ-z.mjs";
import { t as Input } from "./input-qD8XPiq5.mjs";
import { t as Label } from "./label-2T3zHwov.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BcLxYw0n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-bg px-4 py-10 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-10 w-48 animate-pulse rounded-[10px] bg-border",
			"aria-hidden": true
		})
	});
	if (user) navigate({ to: "/" });
	async function onEmail(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		try {
			if (mode === "up") {
				const res = await authClient.signUp.email({
					email: email.trim(),
					password,
					name: name.trim() || email.split("@")[0] || "Học viên"
				});
				if (res.error) {
					setError(res.error.message || "Không tạo được tài khoản.");
					return;
				}
			} else {
				const res = await authClient.signIn.email({
					email: email.trim(),
					password
				});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-bg px-4 py-10 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
							children: "Tài khoản học tập"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Điểm quiz, bài hàng ngày và chuỗi ngày sẽ lên bảng xếp hạng. Học không bắt buộc đăng nhập."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-2",
							children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "secondary",
								className: "w-full",
								onClick: () => signIn(p.providerId, { callbackURL: "/" }),
								children: ["Tiếp tục với ", p.label]
							}, p.providerId))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "my-4 flex items-center gap-3 text-xs text-subtle",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
									"hoặc email",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
							}),
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "password",
										children: "Mật khẩu"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "password",
										type: "password",
										autoComplete: mode === "up" ? "new-password" : "current-password",
										required: true,
										minLength: 8,
										value: password,
										onChange: (e) => setPassword(e.target.value),
										className: "mt-1"
									})] }),
									error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-danger",
										children: error
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										className: "w-full",
										disabled: busy,
										children: busy ? "Đang xử lý…" : mode === "up" ? "Tạo tài khoản" : "Đăng nhập"
									})
								]
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
		})
	});
}
//#endregion
export { Login as component };
