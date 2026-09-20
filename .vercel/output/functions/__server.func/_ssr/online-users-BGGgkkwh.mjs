import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { n as useCurrentUserState, t as useCurrentUser } from "./use-current-user-ClOiUQ-z.mjs";
import { t as authMiddleware } from "./middleware-CVirv4hv.mjs";
import { u as createSsrRpc } from "./router-nloH8-FU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/online-users-BGGgkkwh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var heartbeatPresence = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({ displayName: String(input?.displayName ?? "").trim().slice(0, 32) })).handler(createSsrRpc("55bde106b37f88219366398a62501124eea17a554b4108af3d819880cb4908c3"));
var listOnlineUsers = createServerFn({ method: "GET" }).handler(createSsrRpc("c9030a61763885d9527112bfa9bafc3120bd6a4149b9c2ab840482b5e914bc2e"));
var PING_MS = 25e3;
var LIST_MS = 2e4;
function PresenceHeartbeat() {
	const { user, isPending } = useCurrentUserState();
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		let cancelled = false;
		const ping = () => {
			heartbeatPresence({ data: { displayName: user.displayName ?? void 0 } }).catch(() => void 0);
		};
		ping();
		const id = window.setInterval(() => {
			if (!cancelled) ping();
		}, PING_MS);
		const onVis = () => {
			if (document.visibilityState === "visible") ping();
		};
		document.addEventListener("visibilitychange", onVis);
		return () => {
			cancelled = true;
			window.clearInterval(id);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, [user, isPending]);
	return null;
}
function useOnlineUsers() {
	const [users, setUsers] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const load = () => {
			listOnlineUsers().then((rows) => {
				if (!cancelled) setUsers(rows);
			}).catch(() => {
				if (!cancelled) setUsers([]);
			});
		};
		load();
		const id = window.setInterval(load, LIST_MS);
		return () => {
			cancelled = true;
			window.clearInterval(id);
		};
	}, []);
	return users;
}
function OnlineUsersList({ compact = false }) {
	const users = useOnlineUsers();
	const me = useCurrentUser();
	if (!users.length) {
		if (compact) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-subtle",
			children: "Chưa có ai đang online."
		});
	}
	const shown = compact ? users.slice(0, 5) : users;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: cn("mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-subtle", compact && "px-3"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-1.5 rounded-full bg-success",
					"aria-hidden": true
				}),
				users.length,
				" đang học"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: cn("space-y-1", compact && "px-3"),
			children: shown.map((u) => {
				const you = Boolean(me && u.userId === me.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-1.5 shrink-0 rounded-full bg-success",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: u.displayName
						}),
						you ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-accent",
							children: "bạn"
						}) : null
					]
				}, u.userId);
			})
		}),
		compact && users.length > shown.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 px-3 text-xs text-subtle",
			children: [
				"+",
				users.length - shown.length,
				" người nữa"
			]
		}) : null
	] });
}
//#endregion
export { PresenceHeartbeat as n, useOnlineUsers as r, OnlineUsersList as t };
