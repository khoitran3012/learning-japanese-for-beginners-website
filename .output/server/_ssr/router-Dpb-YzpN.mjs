import { o as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { S as useRouter, _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { n as SESSION_TOKEN_COOKIE, r as auth } from "./server-Nep1Cdby.mjs";
import { s as TriangleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Dpb-YzpN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-BWoib4h-.css";
var APP_NAME = "Akari";
var THEME_BOOT = `(function(){try{var r=JSON.parse(localStorage.getItem('akari-settings')||'{}');var t=(r.state&&r.state.theme)||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);var f=(r.state&&r.state.fontSize)||'md';document.documentElement.classList.add('font-'+f);}catch(e){}})();`;
var fetchSessionUser = createServerFn({ method: "GET" }).handler(createSsrRpc("2c4985e96c199268f7f639534cb5e8e31d6b19d43286bf77416413db60ffde26"));
var Route$46 = createRootRoute({
	beforeLoad: async () => ({ sessionUser: await fetchSessionUser() }),
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Akari — học tiếng Nhật từ số 0, ưu tiên N5 đến N4, bảng chữ, từ điển, quiz và thi đua."
			},
			{
				name: "theme-color",
				content: "#2f4158"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "vi",
		suppressHydrationWarning: true,
		className: "antialiased",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: THEME_BOOT } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$44 = () => import("../_app-Cy8n7Tun.mjs");
var Route$45 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$44, "component") });
var $$splitComponentImporter$43 = () => import("./login-D6EgpAzZ.mjs");
var Route$44 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$43, "component") });
var $$splitComponentImporter$42 = () => import("../_app-D-ay97Of.mjs");
var Route$43 = createFileRoute("/_app/")({ component: lazyRouteComponent($$splitComponentImporter$42, "component") });
var $$splitComponentImporter$41 = () => import("./alphabet-BAExDvkf.mjs");
var Route$42 = createFileRoute("/_app/alphabet")({ component: lazyRouteComponent($$splitComponentImporter$41, "component") });
var $$splitComponentImporter$40 = () => import("./daily-CXzr7tzf.mjs");
var Route$41 = createFileRoute("/_app/daily")({ component: lazyRouteComponent($$splitComponentImporter$40, "component") });
var $$splitComponentImporter$39 = () => import("./dictionary-DfMgGPdv.mjs");
var Route$40 = createFileRoute("/_app/dictionary")({ component: lazyRouteComponent($$splitComponentImporter$39, "component") });
var $$splitComponentImporter$38 = () => import("./favorites-CF9fiEXR.mjs");
var Route$39 = createFileRoute("/_app/favorites")({ component: lazyRouteComponent($$splitComponentImporter$38, "component") });
var $$splitComponentImporter$37 = () => import("./flashcards-Bhz_YasJ.mjs");
var Route$38 = createFileRoute("/_app/flashcards")({ component: lazyRouteComponent($$splitComponentImporter$37, "component") });
var $$splitComponentImporter$36 = () => import("./garden-BzN9RXpo.mjs");
var Route$37 = createFileRoute("/_app/garden")({ component: lazyRouteComponent($$splitComponentImporter$36, "component") });
var $$splitComponentImporter$35 = () => import("./grammar-DVKkpHJM.mjs");
var Route$36 = createFileRoute("/_app/grammar")({ component: lazyRouteComponent($$splitComponentImporter$35, "component") });
var $$splitComponentImporter$34 = () => import("./hiragana-cWIDlk_O.mjs");
var Route$35 = createFileRoute("/_app/hiragana")({ component: lazyRouteComponent($$splitComponentImporter$34, "component") });
var $$splitComponentImporter$33 = () => import("./kanji-ZJHhMfSG.mjs");
var Route$34 = createFileRoute("/_app/kanji")({ component: lazyRouteComponent($$splitComponentImporter$33, "component") });
var $$splitComponentImporter$32 = () => import("./katakana-DhIGcxET.mjs");
var Route$33 = createFileRoute("/_app/katakana")({ component: lazyRouteComponent($$splitComponentImporter$32, "component") });
var $$splitComponentImporter$31 = () => import("./leaderboard-DCtMChjO.mjs");
var Route$32 = createFileRoute("/_app/leaderboard")({ component: lazyRouteComponent($$splitComponentImporter$31, "component") });
var $$splitComponentImporter$30 = () => import("./listen-D9v9HqOA.mjs");
var Route$31 = createFileRoute("/_app/listen")({ component: lazyRouteComponent($$splitComponentImporter$30, "component") });
var $$splitComponentImporter$29 = () => import("./my-words-DAUqzQ3N.mjs");
var Route$30 = createFileRoute("/_app/my-words")({ component: lazyRouteComponent($$splitComponentImporter$29, "component") });
var $$splitComponentImporter$28 = () => import("./path-v8q0YG3y.mjs");
var Route$29 = createFileRoute("/_app/path")({ component: lazyRouteComponent($$splitComponentImporter$28, "component") });
var $$splitComponentImporter$27 = () => import("./play-DckLFGt9.mjs");
var Route$28 = createFileRoute("/_app/play")({ component: lazyRouteComponent($$splitComponentImporter$27, "component") });
var $$splitComponentImporter$26 = () => import("./quiz-BykQK4vx.mjs");
var Route$27 = createFileRoute("/_app/quiz")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
var $$splitComponentImporter$25 = () => import("./radicals-DoGutjje.mjs");
var Route$26 = createFileRoute("/_app/radicals")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./read-BtFhuvig.mjs");
var Route$25 = createFileRoute("/_app/read")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
var $$splitComponentImporter$23 = () => import("./review-WXZ5k4lT.mjs");
var Route$24 = createFileRoute("/_app/review")({ component: lazyRouteComponent($$splitComponentImporter$23, "component") });
var $$splitComponentImporter$22 = () => import("./settings-1DZIvr3w.mjs");
var Route$23 = createFileRoute("/_app/settings")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./songs-DwcAQmUH.mjs");
var Route$22 = createFileRoute("/_app/songs")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./stats-DSL9NlYp.mjs");
var Route$21 = createFileRoute("/_app/stats")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./vocabulary-Do91yQE7.mjs");
var Route$20 = createFileRoute("/_app/vocabulary")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./dictionary.index-DfbT3i4L.mjs");
var Route$19 = createFileRoute("/_app/dictionary/")({
	validateSearch: (s) => ({
		q: typeof s.q === "string" ? s.q : void 0,
		p: typeof s.p === "number" && s.p > 0 ? Math.floor(s.p) : typeof s.p === "string" && Number(s.p) > 0 ? Math.floor(Number(s.p)) : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitNotFoundComponentImporter = () => import("./dictionary._id-B7ZbWhjN.mjs");
var $$splitComponentImporter$17 = () => import("./dictionary._id-2UhiJEaD.mjs");
var Route$18 = createFileRoute("/_app/dictionary/$id")({
	component: lazyRouteComponent($$splitComponentImporter$17, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var $$splitComponentImporter$16 = () => import("./grammar.index-RQbXcE9h.mjs");
var Route$17 = createFileRoute("/_app/grammar/")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./grammar._id-SiWMBMey.mjs");
var Route$16 = createFileRoute("/_app/grammar/$id")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./hiragana.index-CJHIkp9i.mjs");
var Route$15 = createFileRoute("/_app/hiragana/")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./hiragana._id-vBK2AmA0.mjs");
var Route$14 = createFileRoute("/_app/hiragana/$id")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var LEVELS = [
	"N5",
	"N4",
	"N3",
	"N2",
	"N1",
	"all"
];
var $$splitComponentImporter$12 = () => import("./kanji.index-BFB8uRzc.mjs");
function parseLv(v) {
	return typeof v === "string" && LEVELS.includes(v) ? v : void 0;
}
var Route$13 = createFileRoute("/_app/kanji/")({
	validateSearch: (s) => ({
		lesson: typeof s.lesson === "string" ? s.lesson : void 0,
		path: typeof s.path === "string" ? s.path : void 0,
		lv: parseLv(s.lv)
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./kanji._id-BodLqw2Z.mjs");
var Route$12 = createFileRoute("/_app/kanji/$id")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./katakana.index-yUXHMYrQ.mjs");
var Route$11 = createFileRoute("/_app/katakana/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./katakana._id-Cih3--EJ.mjs");
var Route$10 = createFileRoute("/_app/katakana/$id")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./path.index-BfFl4kWW.mjs");
var Route$9 = createFileRoute("/_app/path/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./path._id-DthY3P2D.mjs");
var Route$8 = createFileRoute("/_app/path/$id")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./radicals.index-FV0Z9gFK.mjs");
var Route$7 = createFileRoute("/_app/radicals/")({
	validateSearch: (s) => ({ lesson: typeof s.lesson === "string" ? s.lesson : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./radicals._id-DfrfIPcC.mjs");
var Route$6 = createFileRoute("/_app/radicals/$id")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./songs.index-CXxuhVrR.mjs");
var Route$5 = createFileRoute("/_app/songs/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./songs._id-DFvOhue9.mjs");
var Route$4 = createFileRoute("/_app/songs/$id")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./tools.import-dictionary-DOc-ePMv.mjs");
var Route$3 = createFileRoute("/_app/tools/import-dictionary")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./vocabulary.index-CdVEy3gS.mjs");
var Route$2 = createFileRoute("/_app/vocabulary/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./vocabulary._id-DpL6VZWh.mjs");
var Route$1 = createFileRoute("/_app/vocabulary/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
/** Browser-safe cookie prefix on HTTP public hosts (no `__Host-` / Secure). */
var HTTP_PREFIX = "akari-auth.";
var HOST_PREFIX = "__Host-grok-auth.";
function requestHostname(request) {
	return (request.headers.get("x-forwarded-host") || request.headers.get("host") || "").split(",")[0]?.trim().split(":")[0]?.toLowerCase() || "";
}
function requestProto(request) {
	const forwarded = request.headers.get("x-forwarded-proto");
	if (forwarded) return forwarded.split(",")[0].trim().toLowerCase();
	try {
		return new URL(request.url).protocol.replace(":", "").toLowerCase();
	} catch {
		return "http";
	}
}
function loopback(hostname) {
	return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}
function grokHost(hostname) {
	return hostname.endsWith(".grok-sandbox.com") || hostname.endsWith(".grok.me");
}
/**
* HTTP on a public hostname (khoitran3012.ddns.net, LAN IP, …) cannot store
* `__Host-` / `Secure` cookies — the browser silently drops them and login
* looks broken. HTTPS preview + localhost keep the template cookies.
*/
function isHttpPublicSelfHost(request) {
	const host = requestHostname(request);
	if (!host || loopback(host) || grokHost(host)) return false;
	return requestProto(request) !== "https";
}
function expectedPrefix() {
	return SESSION_TOKEN_COOKIE.replace(/session_token$/, "");
}
function swapCookieNames(value, from, to) {
	if (!from || from === to) return value;
	return value.split(from).join(to);
}
/** Map browser HTTP cookie names to whatever Better Auth is configured to read. */
function rewriteIncomingAuthRequest(request) {
	if (!isHttpPublicSelfHost(request)) return request;
	const cookie = request.headers.get("cookie");
	if (!cookie) return request;
	const expected = expectedPrefix();
	let next = cookie;
	if (expected === HOST_PREFIX && cookie.includes(HTTP_PREFIX)) next = swapCookieNames(next, HTTP_PREFIX, HOST_PREFIX);
	else if (expected === HTTP_PREFIX && cookie.includes(HOST_PREFIX)) next = swapCookieNames(next, HOST_PREFIX, HTTP_PREFIX);
	if (next === cookie) return request;
	try {
		request.headers.set("cookie", next);
		return request;
	} catch {
		const headers = new Headers(request.headers);
		headers.set("cookie", next);
		const init = {
			method: request.method,
			headers
		};
		if (request.body) {
			init.body = request.body;
			init.duplex = "half";
		}
		return new Request(request.url, init);
	}
}
function stripSecure(setCookie) {
	return setCookie.replace(/;\s*Secure/gi, "").replace(/;\s*Partitioned/gi, "");
}
/** Emit non-Secure `akari-auth.*` cookies so HTTP DDNS browsers will store them. */
function rewriteOutgoingAuthResponse(request, response) {
	if (!isHttpPublicSelfHost(request)) return response;
	const cookies = typeof response.headers.getSetCookie === "function" ? response.headers.getSetCookie() : [];
	if (!cookies.length) return response;
	const headers = new Headers(response.headers);
	headers.delete("set-cookie");
	for (const raw of cookies) {
		let next = swapCookieNames(raw, HOST_PREFIX, HTTP_PREFIX);
		next = stripSecure(next);
		headers.append("set-cookie", next);
	}
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}
async function handleSelfHostAuth(request, handler) {
	return rewriteOutgoingAuthResponse(request, await handler(rewriteIncomingAuthRequest(request)));
}
async function handle({ request }) {
	return handleSelfHostAuth(request, (req) => auth.handler(req));
}
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: handle,
	POST: handle
} } });
var AppRoute = Route$45.update({
	id: "/_app",
	getParentRoute: () => Route$46
});
var LoginRoute = Route$44.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$46
});
var AppIndexRoute = Route$43.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppAlphabetRoute = Route$42.update({
	id: "/alphabet",
	path: "/alphabet",
	getParentRoute: () => AppRoute
});
var AppDailyRoute = Route$41.update({
	id: "/daily",
	path: "/daily",
	getParentRoute: () => AppRoute
});
var AppDictionaryRoute = Route$40.update({
	id: "/dictionary",
	path: "/dictionary",
	getParentRoute: () => AppRoute
});
var AppFavoritesRoute = Route$39.update({
	id: "/favorites",
	path: "/favorites",
	getParentRoute: () => AppRoute
});
var AppFlashcardsRoute = Route$38.update({
	id: "/flashcards",
	path: "/flashcards",
	getParentRoute: () => AppRoute
});
var AppGardenRoute = Route$37.update({
	id: "/garden",
	path: "/garden",
	getParentRoute: () => AppRoute
});
var AppGrammarRoute = Route$36.update({
	id: "/grammar",
	path: "/grammar",
	getParentRoute: () => AppRoute
});
var AppHiraganaRoute = Route$35.update({
	id: "/hiragana",
	path: "/hiragana",
	getParentRoute: () => AppRoute
});
var AppKanjiRoute = Route$34.update({
	id: "/kanji",
	path: "/kanji",
	getParentRoute: () => AppRoute
});
var AppKatakanaRoute = Route$33.update({
	id: "/katakana",
	path: "/katakana",
	getParentRoute: () => AppRoute
});
var AppLeaderboardRoute = Route$32.update({
	id: "/leaderboard",
	path: "/leaderboard",
	getParentRoute: () => AppRoute
});
var AppListenRoute = Route$31.update({
	id: "/listen",
	path: "/listen",
	getParentRoute: () => AppRoute
});
var AppMyWordsRoute = Route$30.update({
	id: "/my-words",
	path: "/my-words",
	getParentRoute: () => AppRoute
});
var AppPathRoute = Route$29.update({
	id: "/path",
	path: "/path",
	getParentRoute: () => AppRoute
});
var AppPlayRoute = Route$28.update({
	id: "/play",
	path: "/play",
	getParentRoute: () => AppRoute
});
var AppQuizRoute = Route$27.update({
	id: "/quiz",
	path: "/quiz",
	getParentRoute: () => AppRoute
});
var AppRadicalsRoute = Route$26.update({
	id: "/radicals",
	path: "/radicals",
	getParentRoute: () => AppRoute
});
var AppReadRoute = Route$25.update({
	id: "/read",
	path: "/read",
	getParentRoute: () => AppRoute
});
var AppReviewRoute = Route$24.update({
	id: "/review",
	path: "/review",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$23.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppSongsRoute = Route$22.update({
	id: "/songs",
	path: "/songs",
	getParentRoute: () => AppRoute
});
var AppStatsRoute = Route$21.update({
	id: "/stats",
	path: "/stats",
	getParentRoute: () => AppRoute
});
var AppVocabularyRoute = Route$20.update({
	id: "/vocabulary",
	path: "/vocabulary",
	getParentRoute: () => AppRoute
});
var AppDictionaryIndexRoute = Route$19.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppDictionaryRoute
});
var AppDictionaryIdRoute = Route$18.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppDictionaryRoute
});
var AppGrammarIndexRoute = Route$17.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppGrammarRoute
});
var AppGrammarIdRoute = Route$16.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppGrammarRoute
});
var AppHiraganaIndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppHiraganaRoute
});
var AppHiraganaIdRoute = Route$14.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppHiraganaRoute
});
var AppKanjiIndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppKanjiRoute
});
var AppKanjiIdRoute = Route$12.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppKanjiRoute
});
var AppKatakanaIndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppKatakanaRoute
});
var AppKatakanaIdRoute = Route$10.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppKatakanaRoute
});
var AppPathIndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppPathRoute
});
var AppPathIdRoute = Route$8.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppPathRoute
});
var AppRadicalsIndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRadicalsRoute
});
var AppRadicalsIdRoute = Route$6.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppRadicalsRoute
});
var AppSongsIndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppSongsRoute
});
var AppSongsIdRoute = Route$4.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppSongsRoute
});
var AppToolsImportDictionaryRoute = Route$3.update({
	id: "/tools/import-dictionary",
	path: "/tools/import-dictionary",
	getParentRoute: () => AppRoute
});
var AppVocabularyIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppVocabularyRoute
});
var AppVocabularyIdRoute = Route$1.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppVocabularyRoute
});
var ApiAuthSplatRoute = Route.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$46
});
var AppDictionaryRouteChildren = {
	AppDictionaryIdRoute,
	AppDictionaryIndexRoute
};
var AppDictionaryRouteWithChildren = AppDictionaryRoute._addFileChildren(AppDictionaryRouteChildren);
var AppGrammarRouteChildren = {
	AppGrammarIdRoute,
	AppGrammarIndexRoute
};
var AppGrammarRouteWithChildren = AppGrammarRoute._addFileChildren(AppGrammarRouteChildren);
var AppHiraganaRouteChildren = {
	AppHiraganaIdRoute,
	AppHiraganaIndexRoute
};
var AppHiraganaRouteWithChildren = AppHiraganaRoute._addFileChildren(AppHiraganaRouteChildren);
var AppKanjiRouteChildren = {
	AppKanjiIdRoute,
	AppKanjiIndexRoute
};
var AppKanjiRouteWithChildren = AppKanjiRoute._addFileChildren(AppKanjiRouteChildren);
var AppKatakanaRouteChildren = {
	AppKatakanaIdRoute,
	AppKatakanaIndexRoute
};
var AppKatakanaRouteWithChildren = AppKatakanaRoute._addFileChildren(AppKatakanaRouteChildren);
var AppPathRouteChildren = {
	AppPathIdRoute,
	AppPathIndexRoute
};
var AppPathRouteWithChildren = AppPathRoute._addFileChildren(AppPathRouteChildren);
var AppRadicalsRouteChildren = {
	AppRadicalsIdRoute,
	AppRadicalsIndexRoute
};
var AppRadicalsRouteWithChildren = AppRadicalsRoute._addFileChildren(AppRadicalsRouteChildren);
var AppSongsRouteChildren = {
	AppSongsIdRoute,
	AppSongsIndexRoute
};
var AppSongsRouteWithChildren = AppSongsRoute._addFileChildren(AppSongsRouteChildren);
var AppVocabularyRouteChildren = {
	AppVocabularyIdRoute,
	AppVocabularyIndexRoute
};
var AppRouteChildren = {
	AppAlphabetRoute,
	AppDailyRoute,
	AppDictionaryRoute: AppDictionaryRouteWithChildren,
	AppFavoritesRoute,
	AppFlashcardsRoute,
	AppGardenRoute,
	AppGrammarRoute: AppGrammarRouteWithChildren,
	AppHiraganaRoute: AppHiraganaRouteWithChildren,
	AppKanjiRoute: AppKanjiRouteWithChildren,
	AppKatakanaRoute: AppKatakanaRouteWithChildren,
	AppLeaderboardRoute,
	AppListenRoute,
	AppMyWordsRoute,
	AppPathRoute: AppPathRouteWithChildren,
	AppPlayRoute,
	AppQuizRoute,
	AppRadicalsRoute: AppRadicalsRouteWithChildren,
	AppReadRoute,
	AppReviewRoute,
	AppSettingsRoute,
	AppSongsRoute: AppSongsRouteWithChildren,
	AppStatsRoute,
	AppVocabularyRoute: AppVocabularyRoute._addFileChildren(AppVocabularyRouteChildren),
	AppIndexRoute,
	AppToolsImportDictionaryRoute
};
var rootRouteChildren = {
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	LoginRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$46._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Route$7 as a, Route$12 as c, Route$14 as d, Route$16 as f, createSsrRpc as h, Route$6 as i, Route$13 as l, Route$19 as m, Route$1 as n, Route$8 as o, Route$18 as p, Route$4 as r, Route$10 as s, router_exports as t, LEVELS as u };
