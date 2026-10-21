import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as kanjiLessonsByPath, r as kanjiLessonById, s as kanjiLessonsFor, t as KANJI_LESSONS } from "./kanji-lessons-CUEm7oSK.mjs";
import { t as allKanji } from "./kanji-set-B5ykdYH_.mjs";
import { t as cn } from "./utils-XG3oJXDV.mjs";
import { t as Button } from "./button-Dt7wwSQI.mjs";
import { F as Check } from "../_libs/lucide-react.mjs";
import { l as Route$13, u as LEVELS } from "./router-Dpb-YzpN.mjs";
import { a as useProgress } from "./progress-CIocZrv7.mjs";
import { t as Input } from "./input-BD95aU7I.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { n as CardContent, t as Card } from "./card-D1pZ1BiI.mjs";
import { t as SpeakButton } from "./speak-button-CukGzBix.mjs";
import { t as Badge } from "./badge-BshL6Y_S.mjs";
import { i as kanjiFurigana } from "./on-kun-BtzNpcc7.mjs";
import { t as PagePager } from "./page-pager-CUQyp368.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kanji.index-BFB8uRzc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SOUND_ROWS = [
	{
		label: "Nguyên âm",
		jp: "あ い う え お",
		speak: "あいうえお",
		note: "Năm khuôn miệng. Mọi âm khác chỉ thêm phụ âm vào đây."
	},
	{
		label: "Mora (nhịp)",
		jp: "がっこう",
		speak: "がっこう",
		note: "ga-っ-ko-u = 4 nhịp. きゃ, っ, ー, ん mỗi cái một nhịp."
	},
	{
		label: "Dakuten",
		jp: "か→が  さ→ざ  た→だ",
		speak: "かが さざ ただ",
		note: "Hai chấm đổi thanh: k→g, s→z, t→d, h→b."
	},
	{
		label: "Yōon",
		jp: "きゃ しゅ ちょ",
		speak: "きゃ しゅ ちょ",
		note: "Ký tự nhỏ ゃゅょ: một nhịp, không tách き+や."
	}
];
function KanjiLearnGuide() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-2 py-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
					children: "読み"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium text-fg",
					children: "On là gì, Kun là gì?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[10px] border border-primary/25 bg-choice px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-fg",
							children: "On · âm Hán"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-relaxed text-muted",
							children: "Gần Hán-Việt. Hai chữ dính nhau thì đọc on. 食堂 = しょく + どう = しょくどう (nhà ăn). Từ điển ghi katakana."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[10px] border border-forest/30 bg-mist px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-fg",
							children: "Kun · âm Nhật"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-relaxed text-muted",
							children: "Tên đồ vật, hoặc chữ có đuôi hiragana. 食べる = た + べる = たべる (ăn). 山 một mình = やま. Từ điển ghi hiragana."
						})]
					})]
				})
			]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
						children: "音韻"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium text-fg",
						children: "Hệ thống âm tiếng Nhật"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-relaxed text-muted",
						children: [
							"Tiếng Nhật đọc theo ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: "mora"
							}),
							", không theo âm tiết tiếng Việt. Kanji không có “một âm cố định”: chữ mượn âm Hán (",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: "on"
							}),
							") hoặc âm Nhật (",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: "kun"
							}),
							"). Từ điển ghi on bằng katakana, kun bằng hiragana."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: SOUND_ROWS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-[10px] border border-border bg-bg-elevated px-3 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-subtle",
										children: r.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-jp text-base text-fg",
										children: r.jp
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: r.note
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
									text: r.speak,
									kana: r.speak,
									label: "Nghe"
								})]
							})
						}, r.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-relaxed text-muted",
						children: "On gần Hán-Việt (学 ガク ~ Học, 校 コウ ~ Hiệu) nên người Việt nhớ nghĩa trước. Kun là cách người Nhật gọi đồ vật: 山 やま, 人 ひと. Trong từ ghép thường đọc on; chữ một mình hoặc có đuôi hiragana thường đọc kun."
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
						children: "記憶"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium text-fg",
						children: "Cách nhớ kanji hiệu quả"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "space-y-2.5 text-sm leading-relaxed text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: "1. Hán-Việt trước âm Nhật."
							}), " Nhìn 水 nghĩ Thủy / nước, rồi mới gắn みず (kun) và スイ (on)."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: "2. Bộ thủ là mảnh nghĩa."
							}), " 氵 = nước → 海 池 河. Học bộ rồi ghép chuyện: “ba giọt + mỗi = biển”."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: "3. Học trong từ, không học chữ trần."
							}), " 食 nhớ kèm 食堂 (しょくどう, on) và 食べる (たべる, kun + đuôi)."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: "4. Viết đúng nét, nói hiragana."
							}), " Tay nhớ hình, miệng nhớ ひ / にち — máy đọc kana, không đọc thẳng chữ Hán."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: "5. Ôn ngắt quãng."
							}), " Vào ô chữ, lật nghĩa, đánh “đã nhớ”. Chữ khó quay lại sau 1 ngày, 3 ngày."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: "6. Cụm âm on giống nhau."
							}), " 生 せい, 正 せい, 西 せい — họ âm gần; gắn Hán-Việt Sinh / Chính / Tây để khỏi lẫn nghĩa."] })
						]
					})
				]
			}) })]
		})]
	});
}
var PAGE = 60;
var LEVEL_COUNTS = {
	N5: 0,
	N4: 0,
	N3: 0,
	N2: 0,
	N1: 0
};
function Page() {
	const { lesson: lessonParam, path: pathParam, lv: lvParam } = Route$13.useSearch();
	const navigate = useNavigate();
	const selectedLesson = lessonParam ? kanjiLessonById(lessonParam) : void 0;
	const pathLessons = pathParam ? kanjiLessonsByPath(pathParam) : [];
	const [q, setQ] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const lv = selectedLesson ? selectedLesson.level : pathLessons[0] ? pathLessons[0].level : lvParam ?? "N5";
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [
		lv,
		lessonParam,
		pathParam
	]);
	const srs = useProgress((s) => s.srs);
	const remember = useProgress((s) => s.remember);
	const all = (0, import_react.useMemo)(() => allKanji(), []);
	const counts = (0, import_react.useMemo)(() => {
		const c = { ...LEVEL_COUNTS };
		for (const k of all) c[k.level] += 1;
		return c;
	}, [all]);
	const lessons = kanjiLessonsFor(lv);
	const lessonChars = selectedLesson ? /* @__PURE__ */ new Set([...selectedLesson.chars]) : pathLessons.length ? new Set(pathLessons.flatMap((l) => [...l.chars])) : null;
	const list = all.filter((k) => {
		if (lv !== "all" && k.level !== lv) return false;
		if (lessonChars && !lessonChars.has(k.character)) return false;
		if (!q) return true;
		const s = q.toLowerCase();
		return k.character.includes(q) || k.han_viet.toLowerCase().includes(s) || k.meaning_vi.toLowerCase().includes(s) || k.onyomi.some((x) => x.toLowerCase().includes(s)) || k.kunyomi.some((x) => x.toLowerCase().includes(s)) || k.romaji.includes(s);
	});
	const pageCount = Math.max(1, Math.ceil(list.length / PAGE));
	const safe = Math.min(page, pageCount);
	const slice = list.slice((safe - 1) * PAGE, safe * PAGE);
	function go(next) {
		setPage(1);
		navigate({
			to: "/kanji",
			search: {
				lesson: next.lesson,
				path: next.path,
				lv: next.lesson || next.path ? void 0 : next.lv
			}
		});
	}
	const levelLessons = lv === "all" ? KANJI_LESSONS : lessons;
	const learnedInView = list.filter((k) => srs[k.id]?.correct).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "漢字",
			title: "Kanji",
			description: "Học N5→N1. Mỗi ô hiện chữ + hiragana (kun · on). Nhớ bằng Hán-Việt, bộ thủ, rồi âm.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/radicals",
					children: "Bộ thủ"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KanjiLearnGuide, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mb-4 flex flex-wrap items-center gap-1.5 text-sm",
			children: [
				"N5",
				"N4",
				"N3",
				"N2",
				"N1"
			].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-1.5",
				children: [i > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-subtle",
					children: "→"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => go({ lv: x }),
					className: cn("rounded-full border px-2.5 py-1 tabular-nums", lv === x && !selectedLesson && !pathParam ? "border-primary bg-primary text-primary-fg" : "border-border text-muted"),
					children: [
						x,
						" · ",
						counts[x]
					]
				})]
			}, x))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => {
					setQ(e.target.value);
					setPage(1);
				},
				placeholder: "Tìm kanji, Hán-Việt, nghĩa, âm..."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: LEVELS.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => go({ lv: x }),
					className: cn("h-11 rounded-[10px] border px-3 text-sm", lv === x && !selectedLesson && !pathParam ? "border-primary bg-primary text-primary-fg" : "border-border"),
					children: x === "all" ? "Mọi cấp" : x
				}, x))
			})]
		}),
		levelLessons.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-2 text-xs uppercase tracking-[0.14em] text-subtle",
				children: ["Bài học · ", lv === "all" ? "N5 → N1" : `${lv} · ${levelLessons.length} bài`]
			}), levelLessons.length > 12 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: "h-11 w-full rounded-[10px] border border-border bg-bg-elevated px-3 text-sm sm:max-w-md",
				value: selectedLesson?.id ?? "",
				onChange: (e) => {
					const id = e.target.value;
					if (!id) {
						go({ lv });
						return;
					}
					go({
						lesson: id,
						lv: kanjiLessonById(id)?.level ?? lv
					});
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: lv === "all" ? "Cả lộ trình N5 → N1" : `Cả cấp ${lv}`
				}), lv === "all" ? [
					"N5",
					"N4",
					"N3",
					"N2",
					"N1"
				].map((level) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
					label: level,
					children: KANJI_LESSONS.filter((ls) => ls.level === level).map((ls, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: ls.id,
						children: [
							i + 1,
							". ",
							ls.title,
							" · ",
							ls.chars.length,
							" chữ"
						]
					}, ls.id))
				}, level)) : levelLessons.map((ls, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: ls.id,
					children: [
						i + 1,
						". ",
						ls.title,
						" · ",
						ls.chars.length,
						" chữ"
					]
				}, ls.id))]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => go({ lv }),
					className: cn("h-10 rounded-[10px] border px-3 text-sm", !selectedLesson && !pathParam ? "border-primary bg-primary text-primary-fg" : "border-border"),
					children: "Cả cấp"
				}), levelLessons.map((ls, i) => {
					const done = [...ls.chars].filter((ch) => {
						const k = all.find((x) => x.character === ch);
						return k && srs[k.id]?.correct;
					}).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => go({
							lesson: ls.id,
							lv: ls.level
						}),
						className: cn("h-10 max-w-full rounded-[10px] border px-3 text-sm", selectedLesson?.id === ls.id ? "border-primary bg-primary text-primary-fg" : "border-border"),
						children: [
							i + 1,
							". ",
							ls.title,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs opacity-70",
								children: [
									done,
									"/",
									ls.chars.length
								]
							})
						]
					}, ls.id);
				})]
			})]
		}) : null,
		selectedLesson ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-sm text-muted",
			children: selectedLesson.summary
		}) : null,
		pathLessons.length > 1 && !selectedLesson ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-muted",
			children: [
				"Chặng ",
				pathLessons[0].level,
				": ",
				pathLessons.map((l) => l.title).join(" · ")
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-subtle",
			children: [
				list.length,
				" chữ · thứ tự học N5 → N1",
				learnedInView ? ` · đã nhớ ${learnedInView}` : "",
				selectedLesson ? ` · bài ${selectedLesson.seq}: ${selectedLesson.title}` : ""
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6",
			children: slice.map((k, i) => {
				const known = Boolean(srs[k.id]?.correct);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("relative flex flex-col rounded-lg border border-border bg-surface hover:border-accent", known ? "border-success/40" : ""),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/kanji/$id",
						params: { id: k.id },
						className: "flex flex-col items-center p-3 pb-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] tabular-nums text-subtle",
								children: (safe - 1) * PAGE + i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-kana text-4xl leading-none",
								children: k.character
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 font-jp text-[11px] leading-tight text-muted",
								children: kanjiFurigana(k).line || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 text-xs font-medium",
								children: k.han_viet || k.meaning_vi
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "line-clamp-1 text-[11px] text-muted",
								children: k.meaning_vi
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "muted",
								className: "mt-1",
								children: k.level
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: cn("absolute inset-x-1 bottom-1 flex h-8 items-center justify-center gap-1 rounded-md text-[11px] font-medium", known ? "bg-success/15 text-success" : "bg-choice text-fg hover:bg-choice-hover"),
						onClick: () => {
							remember(k.id, "kanji").then(() => toast.success(`Đã nhớ ${k.character}`));
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), known ? "Nhớ rồi" : "Đã nhớ"]
					})]
				}, k.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePager, {
				page: safe,
				pageCount,
				onPage: setPage
			})
		})
	] });
}
//#endregion
export { Page as component };
