import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as KATAKANA, t as HIRAGANA } from "./kana-CV-aAiLY.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/alphabet-BRGafUdL.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "文字",
		title: "Bảng chữ cái",
		description: "Ba lớp chữ bạn sẽ gặp: hiragana, katakana và kanji. Romaji chỉ là cầu tạm."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 md:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/hiragana",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "h-full transition-colors hover:border-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-kana text-5xl",
							children: "あ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-2xl",
							children: "Hiragana"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [HIRAGANA.length, " ký tự · ngữ pháp và từ thuần Nhật"]
						})
					] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/katakana",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "h-full transition-colors hover:border-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-kana text-5xl",
							children: "ア"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-2xl",
							children: "Katakana"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [KATAKANA.length, " ký tự · từ mượn và tên riêng"]
						})
					] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/romaji",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "h-full transition-colors hover:border-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-kana text-5xl",
							children: "A"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-2xl",
							children: "Romaji"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Luyện chuyển đổi chữ Nhật ↔ Latin"
						})
					] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/kanji",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "h-full transition-colors hover:border-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-kana text-5xl",
							children: "日"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-2xl",
							children: "Kanji"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Chữ Hán Nhật Bản, bắt đầu từ N5"
						})
					] })
				})
			})
		]
	})] });
}
//#endregion
export { Page as component };
