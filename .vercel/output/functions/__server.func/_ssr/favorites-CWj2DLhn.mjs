import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as resolveStudyItem, h as useDictionary } from "./catalog-B78poYwc.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { i as useProgress } from "./progress-Cu0w4vLw.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { t as DynamicLink } from "./dynamic-link-CvxKwlbs.mjs";
import { t as EmptyState } from "./empty-state-A1bLnuh-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-CWj2DLhn.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	useDictionary();
	const items = [...useProgress((s) => s.favorites)].map(resolveStudyItem).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "星",
		title: "Yêu thích",
		description: "Các chữ và từ bạn đánh dấu sao."
	}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Chưa có mục yêu thích",
		description: "Mở một từ hoặc chữ rồi bấm Yêu thích.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/dictionary",
				children: "Mở từ điển"
			})
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-border rounded-xl border border-border bg-surface",
		children: items.map((item) => item ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DynamicLink, {
			to: item.to,
			className: "flex min-h-12 items-center justify-between px-4 py-3 hover:bg-bg-elevated",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-jp text-lg",
				children: item.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-2 text-sm text-muted",
				children: item.sub
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] uppercase tracking-wide text-subtle",
				children: item.type
			})]
		}) }, item.id) : null)
	})] });
}
//#endregion
export { Page as component };
