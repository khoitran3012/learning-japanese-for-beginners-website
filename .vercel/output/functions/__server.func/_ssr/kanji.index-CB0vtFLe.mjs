import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as KANJI_N5, t as KANJI_N4 } from "./kanji-n4-Bq9tkueZ.mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { i as useProgress } from "./progress-BOD7PV7B.mjs";
import { t as Input } from "./input-Blk7lEZJ.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { t as Badge } from "./badge-Bh2m61F7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kanji.index-CB0vtFLe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const [q, setQ] = (0, import_react.useState)("");
	const [lv, setLv] = (0, import_react.useState)("all");
	const srs = useProgress((s) => s.srs);
	const list = (0, import_react.useMemo)(() => [...KANJI_N5, ...KANJI_N4], []).filter((k) => {
		if (lv !== "all" && k.level !== lv) return false;
		if (!q) return true;
		const s = q.toLowerCase();
		return k.character.includes(q) || k.meaning_vi.toLowerCase().includes(s) || k.onyomi.some((x) => x.toLowerCase().includes(s)) || k.kunyomi.some((x) => x.toLowerCase().includes(s)) || k.romaji.includes(s);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "漢字",
			title: "Kanji",
			description: "Nghĩa tiếng Việt, onyomi, kunyomi, số nét và từ ghép — dữ liệu tự biên soạn."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Tìm kanji, nghĩa, âm..."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2",
				children: [
					"all",
					"N5",
					"N4"
				].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setLv(x),
					className: cn("h-11 rounded-[10px] border px-3 text-sm", lv === x ? "border-primary bg-primary text-primary-fg" : "border-border"),
					children: x === "all" ? "Tất cả" : x
				}, x))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6",
			children: list.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/kanji/$id",
				params: { id: k.id },
				className: cn("flex flex-col items-center rounded-lg border border-border bg-surface p-3 hover:border-accent", srs[k.id]?.correct ? "border-success/40" : ""),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-kana text-4xl",
						children: k.character
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 line-clamp-1 text-xs text-muted",
						children: k.meaning_vi
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "muted",
						className: "mt-1",
						children: k.level
					})
				]
			}, k.id))
		})
	] });
}
//#endregion
export { Page as component };
