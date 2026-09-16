import { o as __toESM } from "../_runtime.mjs";
import { E as require_react, T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as VOCAB_N5 } from "./vocabulary-n5-DDorjkhE.mjs";
import { t as VOCAB_N4 } from "./vocabulary-n4-CVIZPi7y.mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-8NRl5CDj.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { t as Input } from "./input-qD8XPiq5.mjs";
import { t as Badge } from "./badge-BjjZgNOo.mjs";
import { t as PagePager } from "./page-pager-DjUrga2u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vocabulary.index-DCvsIvwJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 50;
function Page() {
	const [q, setQ] = (0, import_react.useState)("");
	const [lv, setLv] = (0, import_react.useState)("all");
	const [cat, setCat] = (0, import_react.useState)("all");
	const [page, setPage] = (0, import_react.useState)(1);
	const srs = useProgress((s) => s.srs);
	const showRomaji = useSettings((s) => s.showRomaji);
	const all = (0, import_react.useMemo)(() => [...VOCAB_N5, ...VOCAB_N4], []);
	const cats = (0, import_react.useMemo)(() => [...new Set(all.map((v) => v.category))], [all]);
	const list = all.filter((v) => {
		if (lv !== "all" && v.level !== lv) return false;
		if (cat !== "all" && v.category !== cat) return false;
		if (!q) return true;
		const s = q.toLowerCase();
		return v.word.includes(q) || v.kana.includes(q) || v.romaji.toLowerCase().includes(s) || v.meaning_vi.toLowerCase().includes(s);
	});
	const pageCount = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
	const safePage = Math.min(page, pageCount);
	const slice = list.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
	const from = list.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
	const to = Math.min(safePage * PAGE_SIZE, list.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "単語",
			title: "Từ vựng",
			description: "Lọc N5/N4, chủ đề — 50 từ mỗi trang."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 grid gap-2 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => {
						setQ(e.target.value);
						setPage(1);
					},
					placeholder: "Tìm từ, kana, romaji, nghĩa..."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "h-11 rounded-[10px] border border-border bg-bg-elevated px-3 text-sm",
					value: lv,
					onChange: (e) => {
						setLv(e.target.value);
						setPage(1);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "Mọi cấp"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "N5",
							children: "N5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "N4",
							children: "N4"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "h-11 rounded-[10px] border border-border bg-bg-elevated px-3 text-sm",
					value: cat,
					onChange: (e) => {
						setCat(e.target.value);
						setPage(1);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "Mọi chủ đề"
					}), cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c,
						children: c
					}, c))]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm tabular-nums text-muted",
			children: [
				from,
				"–",
				to,
				" / ",
				list.length,
				" · ",
				PAGE_SIZE,
				" từ/trang"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border rounded-xl border border-border bg-surface",
			children: slice.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/vocabulary/$id",
				params: { id: v.id },
				className: cn("flex min-h-12 items-center gap-3 px-4 py-3 hover:bg-bg-elevated", srs[v.id]?.correct && "bg-success/5"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-28 font-jp text-lg",
						children: v.word
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden w-28 text-sm text-accent sm:block",
						children: showRomaji ? v.romaji : v.kana
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1 text-sm",
						children: v.meaning_vi
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "muted",
						children: v.level
					})
				]
			}) }, v.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePager, {
			className: "mt-4",
			page: safePage,
			pageCount,
			onPage: setPage
		})
	] });
}
//#endregion
export { Page as component };
