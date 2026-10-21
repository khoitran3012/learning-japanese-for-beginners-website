import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-XG3oJXDV.mjs";
import { n as useSettings } from "./settings-_aQHY0Mw.mjs";
import { n as CardContent, t as Card } from "./card-D1pZ1BiI.mjs";
import { t as SpeakButton } from "./speak-button-CukGzBix.mjs";
import { t as Badge } from "./badge-BshL6Y_S.mjs";
import { a as kunReadings, c as pickOnExample, n as TEACH_ON, o as onReadings, s as pickKunExample, t as TEACH_KUN } from "./on-kun-BtzNpcc7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/on-kun-panel-B4c4WTkZ.js
var import_jsx_runtime = require_jsx_runtime();
function RubyWord({ parts, oku, size = "lg" }) {
	const face = size === "lg" ? "text-3xl" : "text-2xl";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-end font-jp leading-none",
		children: [parts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex flex-col items-center px-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-4 text-[11px] leading-none text-muted",
				children: p.yomi || "\xA0"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn(face, "leading-none"),
				children: p.ch
			})]
		}, `${p.ch}-${i}`)), oku ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn(face, "leading-none text-muted"),
			children: oku
		}) : null]
	});
}
function KindBadge({ kind }) {
	return kind === "on" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "音 ON · âm Hán" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "success",
		children: "訓 KUN · âm Nhật"
	});
}
function ExampleBlock({ kind, title, why, children, speak, kana, romaji, vi, hanViet }) {
	const showRomaji = useSettings((s) => s.showRomaji);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col rounded-[10px] border p-4", kind === "on" ? "border-primary/25 bg-choice" : "border-forest/30 bg-mist"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindBadge, { kind }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm font-medium",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-end justify-between gap-2",
				children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
					text: kana,
					kana,
					label: "Nghe"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-jp text-sm text-muted",
				children: kana
			}),
			showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-accent",
				children: romaji
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm",
				children: vi
			}),
			hanViet ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-subtle",
				children: ["Hán-Việt: ", hanViet]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs leading-relaxed text-muted",
				children: why
			})
		]
	});
}
function OnKunGuide() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium",
					children: "On và Kun là gì?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm leading-relaxed text-muted",
					children: [
						"Mỗi kanji thường có ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "hai cách đọc"
						}),
						". Không phải “một chữ một âm”."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-3 space-y-2 text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: "On (音・onyomi) = âm Hán."
							}),
							" Âm Nhật vay từ tiếng Hán, nên gần Hán-Việt. Dùng khi ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: "hai kanji ghép lại"
							}),
							", không có hiragana chen giữa. Từ điển viết on bằng katakana: 食 → ショク. Ví dụ 食堂 đọc しょくどう (Thực Đường, nhà ăn)."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: "Kun (訓・kunyomi) = âm Nhật."
							}),
							" Cách người Nhật gọi sự vật trước khi có chữ Hán. Dùng khi chữ ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: "đứng một mình"
							}),
							" hoặc có",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: "đuôi hiragana"
							}),
							" (okurigana). Từ điển viết kun bằng hiragana, dấu ・ chỗ cắt đuôi: た・べる. Ví dụ 食べる đọc たべる (ăn), 山 đọc やま (núi)."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-fg",
							children: "Cách chọn nhanh."
						}), " Thấy kanji + kanji → thử on. Thấy kanji + hiragana hoặc chữ lẻ → thử kun. Không chắc thì bấm nghe, đừng đoán từ Hán-Việt thành cách đọc."] })
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExampleBlock, {
					kind: "on",
					title: TEACH_ON.label,
					why: TEACH_ON.why,
					speak: TEACH_ON.kana,
					kana: TEACH_ON.kana,
					romaji: TEACH_ON.romaji,
					vi: TEACH_ON.vi,
					hanViet: TEACH_ON.hanViet,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RubyWord, { parts: TEACH_ON.parts })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExampleBlock, {
					kind: "kun",
					title: TEACH_KUN.label,
					why: TEACH_KUN.why,
					speak: TEACH_KUN.kana,
					kana: TEACH_KUN.kana,
					romaji: TEACH_KUN.romaji,
					vi: TEACH_KUN.vi,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RubyWord, {
						parts: TEACH_KUN.parts,
						oku: TEACH_KUN.oku
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-subtle",
				children: "Cùng một chữ 食: ghép 食堂 đọc しょく (on, gần Hán-Việt Thực); có đuôi 食べる đọc たべる (kun). Tương tự 火山 かざん (on) vs 山 やま (kun, một mình). Từ điển viết on bằng katakana (ショク), kun bằng hiragana, dấu ・ chỗ cắt đuôi (た・べる)."
			})
		]
	}) });
}
function OnKunForKanji({ kanji, words }) {
	const showRomaji = useSettings((s) => s.showRomaji);
	const ons = onReadings(kanji);
	const kuns = kunReadings(kanji);
	const onEx = pickOnExample(kanji, words);
	const kunEx = pickKunExample(kanji, words);
	const firstKun = kuns[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-primary/25",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindBadge, { kind: "on" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								"Âm Hán · gần Hán-Việt ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-fg",
									children: kanji.han_viet || "—"
								}),
								". Hay gặp trong từ ghép."
							]
						}),
						ons.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2",
							children: ons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-jp text-lg leading-tight",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: r.kata
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mx-2 text-subtle",
											children: "→"
										}),
										r.hira
									]
								}), showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-accent",
									children: r.romaji
								}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
									text: r.hira,
									kana: r.hira,
									label: "Nghe"
								})]
							}, r.kata))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-subtle",
							children: "Chữ này ít dùng on."
						}),
						onEx ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[10px] border border-border bg-choice p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] uppercase tracking-[0.14em] text-subtle",
									children: "Từ ghép"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-jp text-2xl leading-none",
									children: onEx.word
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-jp text-sm text-muted",
									children: onEx.kana
								}),
								showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-accent",
									children: onEx.romaji
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: onEx.meaning_vi
								})
							]
						}) : null
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-forest/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindBadge, { kind: "kun" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Âm Nhật gốc. Chữ đứng một mình hoặc có đuôi hiragana (okurigana)."
						}),
						kuns.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: kuns.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-end justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RubyWord, {
										size: "md",
										parts: [{
											ch: kanji.character,
											yomi: r.stem
										}],
										oku: r.oku
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 font-jp text-sm text-muted",
										children: [r.stem, r.oku ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-subtle",
											children: ["・", r.oku]
										}) : null]
									}),
									showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-accent",
										children: r.romaji
									}) : null
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
									text: r.kana,
									kana: r.kana,
									label: "Nghe"
								})]
							}, r.raw))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-subtle",
							children: "Chữ này chủ yếu đọc on (từ Hán)."
						}),
						kunEx ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[10px] border border-forest/25 bg-mist p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] uppercase tracking-[0.14em] text-subtle",
									children: firstKun?.oku ? "Chữ + đuôi" : "Một mình"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-jp text-2xl leading-none",
									children: kunEx.word
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-jp text-sm text-muted",
									children: kunEx.kana
								}),
								showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-accent",
									children: kunEx.romaji
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: kunEx.meaning_vi
								})
							]
						}) : null
					]
				})
			})]
		})
	});
}
function ReadingTag({ kind }) {
	if (kind === "on") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "音 ON" });
	if (kind === "kun") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "success",
		children: "訓 KUN"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "muted",
		children: "ON + KUN"
	});
}
function exampleKindLabel(kind) {
	if (kind === "on") return "Từ ghép · đọc on";
	if (kind === "kun") return "Một chữ / có đuôi · đọc kun";
	return "Trộn on và kun";
}
//#endregion
export { exampleKindLabel as i, OnKunGuide as n, ReadingTag as r, OnKunForKanji as t };
