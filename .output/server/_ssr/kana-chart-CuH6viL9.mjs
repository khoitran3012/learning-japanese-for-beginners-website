import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-XG3oJXDV.mjs";
import { F as Check } from "../_libs/lucide-react.mjs";
import { n as useSettings } from "./settings-_aQHY0Mw.mjs";
import { a as useProgress } from "./progress-CIocZrv7.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-BshL6Y_S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kana-chart-CuH6viL9.js
var import_jsx_runtime = require_jsx_runtime();
var GROUPS = [
	{
		id: "gojuon",
		label: "Gojuon"
	},
	{
		id: "dakuten",
		label: "Dakuten"
	},
	{
		id: "handakuten",
		label: "Handakuten"
	},
	{
		id: "yoon",
		label: "Âm ghép"
	},
	{
		id: "sokuon",
		label: "Sokuon / âm dài"
	},
	{
		id: "foreign",
		label: "Âm mượn"
	},
	{
		id: "choon",
		label: "Âm dài"
	}
];
function KanaChart({ kind, chars }) {
	const srs = useProgress((s) => s.srs);
	const remember = useProgress((s) => s.remember);
	const showRomaji = useSettings((s) => s.showRomaji);
	const groups = GROUPS.filter((g) => chars.some((c) => c.group === g.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-8",
		children: groups.map((g) => {
			const list = chars.filter((c) => c.group === g.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium uppercase tracking-[0.14em] text-muted",
					children: g.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "muted",
					children: list.length
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-5 gap-2 sm:grid-cols-5 md:grid-cols-10",
				children: list.map((c) => {
					const learned = (srs[c.id]?.correct ?? 0) > 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("relative flex aspect-square flex-col rounded-lg border border-border bg-surface", learned && "border-success/40 bg-success/5"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: kind === "hiragana" ? "/hiragana/$id" : "/katakana/$id",
							params: { id: c.id },
							className: "flex min-h-0 flex-1 flex-col items-center justify-center px-1 pb-7 pt-1 text-center hover:border-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-kana text-2xl sm:text-3xl",
								children: c.char
							}), showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 text-[10px] text-muted",
								children: c.romaji
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: cn("absolute inset-x-1 bottom-1 flex h-6 items-center justify-center gap-0.5 rounded text-[10px] font-medium", learned ? "bg-success/15 text-success" : "bg-choice text-fg hover:bg-choice-hover"),
							onClick: () => {
								remember(c.id, "kana").then(() => toast.success(`Đã nhớ ${c.char}`));
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), learned ? "Nhớ" : "Đã nhớ"]
						})]
					}, c.id);
				})
			})] }, g.id);
		})
	});
}
//#endregion
export { KanaChart as t };
