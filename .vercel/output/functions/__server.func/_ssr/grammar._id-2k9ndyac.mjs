import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { B as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as GRAMMAR_N5, t as GRAMMAR_N4 } from "./grammar-n4-Dv0a1spF.mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { s as Route$12 } from "./router-C92aJlrP.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-BOD7PV7B.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { t as SpeakButton } from "./speak-button-DVsDELCU.mjs";
import { t as Badge } from "./badge-Bh2m61F7.mjs";
import { t as AiTutor } from "./ai-tutor-DZYAE-3e.mjs";
import { n as grammarCategory } from "./grammar-categories-CJmstdUW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/grammar._id-2k9ndyac.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { id } = Route$12.useParams();
	const g = [...GRAMMAR_N5, ...GRAMMAR_N4].find((x) => x.id === id);
	if (!g) throw notFound();
	const remember = useProgress((s) => s.remember);
	const showRomaji = useSettings((s) => s.showRomaji);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: g.level }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "muted",
					className: "ml-2",
					children: grammarCategory(g)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl",
					children: g.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-jp text-lg text-muted",
					children: g.structure
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: g.meaning_vi
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 font-medium",
				children: "Cách dùng"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: g.usage
			})] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: g.examples.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-jp text-lg",
							children: ex.jp
						}),
						ex.kana ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: ex.kana
						}) : null,
						showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-accent",
							children: ex.romaji
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: ex.vi
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
						text: ex.jp,
						label: "Nghe"
					})]
				}) }, ex.jp))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 font-medium",
				children: "Lỗi thường gặp"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "list-disc space-y-1 pl-5 text-sm text-muted",
				children: g.mistakes.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: m }, m))
			})] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiTutor, { seed: `Giải thích ngữ pháp ${g.name} (${g.structure}): ${g.meaning_vi}.` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "success",
				onClick: () => void remember(g.id, "grammar"),
				children: "Đã hiểu"
			})
		]
	});
}
//#endregion
export { Page as component };
