import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as GRAMMAR_N5, t as GRAMMAR_N4 } from "./grammar-n4-Dv0a1spF.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { t as Badge } from "./badge-BjjZgNOo.mjs";
import { r as groupGrammar, t as GRAMMAR_CATEGORY_BLURB } from "./grammar-categories-CJmstdUW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/grammar.index-D6kHUp8s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const [lv, setLv] = (0, import_react.useState)("all");
	const all = (0, import_react.useMemo)(() => [...GRAMMAR_N5, ...GRAMMAR_N4].filter((g) => lv === "all" || g.level === lv), [lv]);
	const groups = (0, import_react.useMemo)(() => groupGrammar(all), [all]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "文法",
			title: "Ngữ pháp",
			description: "Chia ô theo hạng mục dùng hàng ngày — chọn mục rồi vào từng mẫu."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex flex-wrap gap-2",
			children: [
				"all",
				"N5",
				"N4"
			].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: lv === x ? "default" : "secondary",
				onClick: () => setLv(x),
				children: x === "all" ? "Tất cả" : x
			}, x))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: groups.map(({ cat, items }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-medium",
							children: cat
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs tabular-nums text-subtle",
							children: [items.length, " mẫu"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: GRAMMAR_CATEGORY_BLURB[cat]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border overflow-hidden rounded-[10px] border border-border",
						children: items.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/grammar/$id",
							params: { id: g.id },
							className: "block px-3 py-2.5 hover:bg-bg-elevated",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-jp text-base",
									children: g.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "muted",
									children: g.level
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: g.meaning_vi
							})]
						}) }, g.id))
					})
				]
			}) }, cat))
		})
	] });
}
//#endregion
export { Page as component };
