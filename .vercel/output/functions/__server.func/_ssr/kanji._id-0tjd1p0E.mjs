import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { B as notFound, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as kanjiLessonOf } from "./kanji-lessons-Bonc0FIc.mjs";
import { n as toHiragana, t as kanaToRomaji } from "./kana-util-DgSJpVDG.mjs";
import { i as kanjiById } from "./kanji-set-k3QBvSZq.mjs";
import { t as allKanjiExamples } from "./examples-Bn2JLbDz.mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { a as Route$8 } from "./router-sIrB-w_Z.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-BQrBv4Tb.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { t as SpeakButton } from "./speak-button-BcZ3hYwQ.mjs";
import { t as Badge } from "./badge-Bh2m61F7.mjs";
import { t as AiTutor } from "./ai-tutor-BTN6djKZ.mjs";
import { n as WriteCanvas, t as StrokeOrder } from "./stroke-order-BvZYDiP0.mjs";
import { t as Pronunciation } from "./pronunciation-Dt2bNZP1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kanji._id-0tjd1p0E.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { id } = Route$8.useParams();
	const k = kanjiById(id);
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
	const usage = allKanjiExamples(k);
	const lesson = kanjiLessonOf(k.character);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col items-center py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: k.level }),
					lesson ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/kanji",
						search: { lesson: lesson.id },
						className: "mt-2 text-xs text-accent hover:underline",
						children: [
							lesson.kind === "học" ? "Bài học" : "Bài tra cứu",
							": ",
							lesson.title
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-kana mt-3 text-[8rem] leading-none",
						children: k.character
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xl font-medium",
						children: k.han_viet ? `Hán-Việt: ${k.han_viet}` : null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-lg",
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
							kana: primary,
							label: "Nghe cách đọc"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-sm text-center text-xs text-subtle",
						children: "Máy đọc hiragana, không đọc trực tiếp chữ kanji — tránh phát âm sai."
					})
				]
			}) }),
			usage.tip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-sm text-muted",
						children: [
							"Cách dùng chữ ",
							k.character,
							k.han_viet ? ` · ${k.han_viet}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed",
						children: usage.tip
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: "Hán-Việt neo nghĩa. Onyomi (âm Hán, katakana) thường trong từ ghép. Kunyomi (âm Nhật, hiragana) khi chữ đứng một mình hoặc có okurigana."
					})
				]
			}) }) : null,
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
				children: "Từ dùng chữ này"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-4",
				children: usage.words.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-t border-border pt-3 first:border-0 first:pt-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-start justify-between gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dictionary",
								search: { q: ex.word },
								className: "font-jp text-lg hover:underline",
								children: ex.word
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: ex.meaning_vi
							}),
							ex.reading || ex.usage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-subtle",
								children: [ex.reading === "on" ? "Onyomi" : ex.reading === "kun" ? "Kunyomi" : null, ex.usage ? ` · ${ex.usage}` : null]
							}) : null
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pronunciation, {
						className: "mt-2",
						kana: ex.kana,
						romaji: ex.romaji,
						speak: ex.kana
					})]
				}, ex.word))
			})] }) }),
			usage.sentences.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm text-muted",
					children: "Câu ví dụ"
				}), usage.sentences.map((ex, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border pt-3 first:border-0 first:pt-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-subtle",
							children: ["Câu ", i + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-jp text-lg",
								children: ex.jp
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
								text: ex.jp,
								kana: ex.kana,
								label: "Nghe câu"
							})]
						}),
						ex.kana ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: ex.kana
						}) : null,
						showRomaji && ex.romaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-accent",
							children: ex.romaji
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: ex.vi
						})
					]
				}, ex.jp))]
			}) }) : null,
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiTutor, { seed: `Giải thích kanji ${k.character} (Hán-Việt: ${k.han_viet || "—"}; nghĩa Việt: ${k.meaning_vi}): onyomi ${k.onyomi.join("/")} = ${onRows.map((r) => `${r.hira} ${r.romaji}`).join(", ")}, kunyomi ${kunRows.map((r) => `${r.hira} ${r.romaji}`).join(", ")}. Cách dùng: ${usage.tip}` }),
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
