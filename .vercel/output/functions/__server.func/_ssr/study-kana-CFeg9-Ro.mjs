import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-De5Z2Iqg.mjs";
import { A as ChevronLeft, d as RotateCcw, j as Check, k as ChevronRight } from "../_libs/lucide-react.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { t as SpeakButton } from "./speak-button-D1RceTHQ.mjs";
import { t as Badge } from "./badge-BjjZgNOo.mjs";
import { n as WriteCanvas, t as StrokeOrder } from "./stroke-order-CDRey7pT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/study-kana-CFeg9-Ro.js
var import_jsx_runtime = require_jsx_runtime();
function StudyKana({ current, prev, next, kind }) {
	const showRomaji = useSettings((s) => s.showRomaji);
	const remember = useProgress((s) => s.remember);
	const forgot = useProgress((s) => s.forgot);
	const item = useProgress((s) => s.srs[current.id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col items-center py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "muted",
						className: "mb-4",
						children: [
							current.group,
							" · ",
							current.strokeCount,
							" nét"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-kana text-[7.5rem] leading-none sm:text-[9rem]",
						children: current.char
					}),
					showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-2xl font-medium tracking-wide text-accent",
						children: current.romaji
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-subtle",
						children: "Romaji đang tắt"
					}),
					current.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-center text-sm text-muted",
						children: current.notes
					}) : null,
					current.mnemonic ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-center text-sm text-muted",
						children: current.mnemonic
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, { text: current.char })
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-muted",
					children: "Ví dụ"
				}), current.examples.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-bg-elevated p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-jp text-xl",
							children: ex.jp
						}),
						showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-accent",
							children: ex.romaji
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: ex.vi
						})
					]
				}, ex.jp))]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrokeOrder, {
					character: current.char,
					strokeCount: current.strokeCount
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WriteCanvas, {
					character: current.char,
					strokeCount: current.strokeCount
				})]
			}) }),
			item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center text-xs text-muted",
				children: [
					"Đúng ",
					item.correct,
					" · Sai ",
					item.incorrect,
					" · Hộp ",
					item.leitnerBox
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [
					prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: kind === "hiragana" ? "/hiragana/$id" : "/katakana/$id",
							params: { id: prev.id },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {}), " Trước"]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							onClick: () => void forgot(current.id, "kana"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), " Cần ôn"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "success",
							onClick: () => void remember(current.id, "kana"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}), " Đã nhớ"]
						})]
					}),
					next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: kind === "hiragana" ? "/hiragana/$id" : "/katakana/$id",
							params: { id: next.id },
							children: ["Sau ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				]
			})
		]
	});
}
//#endregion
export { StudyKana as t };
