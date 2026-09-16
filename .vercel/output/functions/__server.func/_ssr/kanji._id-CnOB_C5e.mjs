import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { B as notFound, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as KANJI_N5, t as KANJI_N4 } from "./kanji-n4-Bq9tkueZ.mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-8NRl5CDj.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { t as SpeakButton } from "./speak-button-D1RceTHQ.mjs";
import { n as toHiragana, t as kanaToRomaji } from "./kana-util-DgSJpVDG.mjs";
import { a as Route$8 } from "./router-CdBadYz-.mjs";
import { t as Badge } from "./badge-BjjZgNOo.mjs";
import { t as AiTutor } from "./ai-tutor-ClcV4l5c.mjs";
import { n as WriteCanvas, t as StrokeOrder } from "./stroke-order-CDRey7pT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kanji._id-CnOB_C5e.js
var import_jsx_runtime = require_jsx_runtime();
function Pronunciation({ kana, romaji, speak, label, large = false, className }) {
	const showRomaji = useSettings((s) => s.showRomaji);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center justify-between gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: label
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("font-jp leading-tight", large ? "text-2xl" : "text-lg"),
					children: kana
				}),
				showRomaji && romaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-accent",
					children: romaji
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
			text: speak || kana,
			label: "Nghe"
		})]
	});
}
function Page() {
	const { id } = Route$8.useParams();
	const k = [...KANJI_N5, ...KANJI_N4].find((x) => x.id === id);
	if (!k) throw notFound();
	const remember = useProgress((s) => s.remember);
	const forgot = useProgress((s) => s.forgot);
	const showRomaji = useSettings((s) => s.showRomaji);
	const onRows = k.onyomi.filter(Boolean).map((on) => {
		const hira = toHiragana(on);
		return {
			kata: on,
			hira,
			romaji: kanaToRomaji(hira)
		};
	});
	const kunRows = k.kunyomi.filter(Boolean).map((kun) => ({
		hira: kun,
		romaji: kanaToRomaji(kun)
	}));
	const primary = kunRows[0]?.hira || onRows[0]?.hira || k.character;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col items-center py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: k.level }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-kana mt-3 text-[8rem] leading-none",
						children: k.character
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-lg",
						children: k.meaning_vi
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-jp text-xl text-muted",
						children: [primary, showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-accent",
							children: kanaToRomaji(primary)
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap justify-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
							text: primary,
							label: "Nghe cách đọc"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-sm text-center text-xs text-subtle",
						children: "Máy đọc hiragana, không đọc trực tiếp chữ kanji — tránh phát âm sai."
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm text-muted",
						children: "Onyomi (âm Hán) · katakana / hiragana / romaji"
					}), onRows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: onRows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pronunciation, {
							label: r.kata,
							kana: r.hira,
							romaji: r.romaji,
							speak: r.hira
						}) }, r.kata))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-subtle",
						children: "—"
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm text-muted",
						children: "Kunyomi (âm Nhật) · hiragana / romaji"
					}), kunRows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: kunRows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pronunciation, {
							kana: r.hira,
							romaji: r.romaji,
							speak: r.hira
						}) }, r.hira))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-subtle",
						children: "—"
					})]
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-sm text-muted",
				children: "Từ ví dụ"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-4",
				children: k.examples.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-start justify-between gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dictionary",
						search: { q: ex.word },
						className: "font-jp text-lg hover:underline",
						children: ex.word
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: ex.meaning_vi
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pronunciation, {
					className: "mt-2",
					kana: ex.kana,
					romaji: ex.romaji,
					speak: ex.kana
				})] }, ex.word))
			})] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [k.stroke_count, " nét · thứ tự chuẩn kiểu giáo khoa (nét đều, không thư pháp)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrokeOrder, {
						character: k.character,
						strokeCount: k.stroke_count
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WriteCanvas, {
						character: k.character,
						strokeCount: k.stroke_count
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiTutor, { seed: `Giải thích kanji ${k.character} (${k.meaning_vi}): onyomi ${k.onyomi.join("/")} = ${onRows.map((r) => `${r.hira} ${r.romaji}`).join(", ")}, kunyomi ${kunRows.map((r) => `${r.hira} ${r.romaji}`).join(", ")}.` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => void forgot(k.id, "kanji"),
					children: "Cần ôn"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "success",
					onClick: () => void remember(k.id, "kanji"),
					children: "Đã nhớ"
				})]
			})
		]
	});
}
//#endregion
export { Page as component };
