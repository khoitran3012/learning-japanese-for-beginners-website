import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Y as notFound, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as kanjiLessonOf } from "./kanji-lessons-CUEm7oSK.mjs";
import { t as kanaToRomaji } from "./kana-util-DgSJpVDG.mjs";
import { a as kanjiById, o as kanjiByLevel, s as kanjiNeighbors, t as allKanji } from "./kanji-set-B5ykdYH_.mjs";
import { l as radicalOfKanji } from "./radicals-BsxpUXhx.mjs";
import { t as allKanjiExamples } from "./examples-Bn2JLbDz.mjs";
import { t as Button } from "./button-Dt7wwSQI.mjs";
import { N as ChevronRight, P as ChevronLeft } from "../_libs/lucide-react.mjs";
import { c as Route$12 } from "./router-Dpb-YzpN.mjs";
import { n as useSettings } from "./settings-_aQHY0Mw.mjs";
import { n as CardContent, t as Card } from "./card-D1pZ1BiI.mjs";
import { t as SpeakButton } from "./speak-button-CukGzBix.mjs";
import { t as Badge } from "./badge-BshL6Y_S.mjs";
import { a as kunReadings, i as kanjiFurigana, o as onReadings, r as classifyExample } from "./on-kun-BtzNpcc7.mjs";
import { t as JpText } from "./jp-text-BzwjXJwK.mjs";
import { t as RememberActions } from "./remember-actions-CfojlqmX.mjs";
import { t as AiTutor } from "./ai-tutor-Cg8BqnQx.mjs";
import { n as WriteCanvas, t as StrokeOrder } from "./stroke-order-BFqXGMg3.mjs";
import { t as Pronunciation } from "./pronunciation-D8wwcOZ6.mjs";
import { i as exampleKindLabel, n as OnKunGuide, r as ReadingTag, t as OnKunForKanji } from "./on-kun-panel-B4c4WTkZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kanji._id-BodLqw2Z.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { id } = Route$12.useParams();
	const k = kanjiById(id);
	if (!k) throw notFound();
	const showRomaji = useSettings((s) => s.showRomaji);
	const onRows = onReadings(k);
	const kunRows = kunReadings(k);
	const yomi = kanjiFurigana(k);
	const primary = yomi.kun || yomi.on || k.character;
	const usage = allKanjiExamples(k);
	const lesson = kanjiLessonOf(k.character);
	const radical = radicalOfKanji(k.character);
	const levelPool = kanjiByLevel(k.level);
	const inLevel = kanjiNeighbors(k.id, levelPool);
	const inAll = kanjiNeighbors(k.id, allKanji());
	const prev = inAll.prev;
	const next = inAll.next;
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
							"Bài ",
							lesson.seq,
							": ",
							lesson.title
						]
					}) : null,
					radical ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/radicals/$id",
						params: { id: radical.id },
						className: "mt-1 text-xs text-muted hover:text-accent hover:underline",
						children: [
							"Bộ thủ ",
							radical.char,
							" · ",
							radical.han_viet,
							" (",
							radical.name_kana,
							")"
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs tabular-nums text-subtle",
						children: [
							k.level,
							" · chữ ",
							inLevel.index + 1,
							"/",
							inLevel.total,
							inAll.index >= 0 ? ` · cả lộ trình ${inAll.index + 1}/${inAll.total}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-kana mt-3 text-[8rem] leading-none",
						children: k.character
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-jp text-xl text-muted",
						children: [yomi.line || primary, showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-accent",
							children: kanaToRomaji(primary)
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xl font-medium",
						children: k.han_viet ? `Hán-Việt: ${k.han_viet}` : null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-lg",
						children: k.meaning_vi
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RememberActions, {
						className: "mt-5",
						id: k.id,
						itemType: "kanji"
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnKunGuide, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnKunForKanji, {
				kanji: k,
				words: usage.words
			}),
			radical ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm text-muted",
					children: "Ghi nhớ chữ này"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm leading-relaxed",
					children: [
						"Bộ ",
						radical.char,
						" · ",
						radical.han_viet,
						": ",
						radical.hint,
						" Hán-Việt",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: k.han_viet || "—"
						}),
						" neo nghĩa «",
						k.meaning_vi,
						"». Kun",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-jp",
							children: yomi.kun || "—"
						}),
						yomi.on ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							" ",
							"· on ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-jp",
								children: yomi.on
							})
						] }) : null,
						"."
					]
				})]
			}) }) : null,
			usage.tip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-sm text-muted",
					children: [
						"Cách dùng chữ ",
						k.character,
						k.han_viet ? ` · ${k.han_viet}` : ""
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed",
					children: usage.tip
				})]
			}) }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-sm text-muted",
				children: "Từ dùng chữ này · on hay kun?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-4",
				children: usage.words.map((ex) => {
					const kind = classifyExample(k, ex);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-border pt-3 first:border-0 first:pt-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-start justify-between gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JpText, {
										text: ex.word,
										className: "text-lg",
										hint: false
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadingTag, { kind })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: ex.meaning_vi
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-subtle",
									children: [exampleKindLabel(kind), ex.usage ? ` · ${ex.usage}` : null]
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pronunciation, {
							className: "mt-2",
							kana: ex.kana,
							romaji: ex.romaji,
							speak: ex.kana
						})]
					}, ex.word);
				})
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JpText, {
								text: ex.jp,
								className: "text-lg"
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiTutor, { seed: `Giải thích kanji ${k.character} (Hán-Việt: ${k.han_viet || "—"}; nghĩa Việt: ${k.meaning_vi}): onyomi ${k.onyomi.join("/")} = ${onRows.map((r) => `${r.hira} ${r.romaji}`).join(", ")}, kunyomi ${kunRows.map((r) => `${r.kana} ${r.romaji}`).join(", ")}. Cách dùng: ${usage.tip}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2 pb-4",
				children: [
					prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/kanji/$id",
							params: { id: prev.id },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {}),
								" ",
								prev.character
							]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RememberActions, {
						id: k.id,
						itemType: "kanji"
					}),
					next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/kanji/$id",
							params: { id: next.id },
							children: [
								next.character,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
							]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				]
			})
		]
	});
}
//#endregion
export { Page as component };
