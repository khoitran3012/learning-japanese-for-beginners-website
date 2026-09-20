import { E as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as LESSONS } from "./_ssr/lessons-C7yMsqVQ.mjs";
import { n as KANJI_N5, t as KANJI_N4 } from "./_ssr/kanji-n4-Bq9tkueZ.mjs";
import { t as VOCAB_N5 } from "./_ssr/vocabulary-n5-DDorjkhE.mjs";
import { t as VOCAB_N4 } from "./_ssr/vocabulary-n4-CVIZPi7y.mjs";
import { n as KATAKANA, t as HIRAGANA } from "./_ssr/kana-CV-aAiLY.mjs";
import { t as Button } from "./_ssr/button-C9dY86uP.mjs";
import { B as ArrowRight, O as Flame } from "./_libs/lucide-react.mjs";
import { n as useSettings } from "./_ssr/settings-BVK2Ns8d.mjs";
import { i as useProgress, n as learnedCount, t as isDue } from "./_ssr/progress-BOD7PV7B.mjs";
import { t as PageHeader } from "./_ssr/page-header-CF9mcnZA.mjs";
import { n as CardContent, t as Card } from "./_ssr/card-BGiMB6P_.mjs";
import { t as DynamicLink } from "./_ssr/dynamic-link-CvxKwlbs.mjs";
import { t as Progress } from "./_ssr/progress-059PnNni.mjs";
import { n as primaryLessonHref } from "./_ssr/lesson-links-Bk0snfip.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-Cwcjig6q.js
var import_jsx_runtime = require_jsx_runtime();
function HomePage() {
	const srs = useProgress((s) => s.srs);
	const streak = useProgress((s) => s.streak);
	const today = useProgress((s) => s.today);
	const completed = useProgress((s) => s.completedLessonIds);
	const quizScores = useProgress((s) => s.quizScores);
	const dailyGoal = useSettings((s) => s.dailyGoal);
	const showRomaji = useSettings((s) => s.showRomaji);
	const set = useSettings((s) => s.set);
	const hiraBase = HIRAGANA.filter((k) => k.group === "gojuon").length;
	const kataBase = KATAKANA.filter((k) => k.group === "gojuon").length;
	const hira = learnedCount(srs, "h-");
	const kata = learnedCount(srs, "k-");
	const vocab = learnedCount(srs, "v-");
	const kanji = learnedCount(srs, "kj-");
	const vocabTotal = VOCAB_N5.length + VOCAB_N4.length;
	const kanjiTotal = KANJI_N5.length + KANJI_N4.length;
	const due = Object.values(srs).filter(isDue).length;
	const nextLesson = LESSONS.find((l) => !completed.has(l.id)) ?? LESSONS[LESSONS.length - 1];
	const quizPct = quizScores.length === 0 ? 0 : Math.round(quizScores.reduce((a, q) => a + q.score / Math.max(1, q.total), 0) / quizScores.length * 100);
	const n5pct = Math.round((hira / hiraBase + kata / kataBase + vocab / vocabTotal + kanji / kanjiTotal) / 4 * 100);
	const minutes = today?.minutes ?? 0;
	const goalPct = Math.min(100, minutes / dailyGoal * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "明かり",
			title: "Akari",
			description: "Học tiếng Nhật từ số 0 — Hiragana đến N4. Đăng nhập nếu muốn thi đua; không bắt buộc."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex items-center gap-3 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 items-center justify-center rounded-[10px] bg-seal/12 text-seal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Chuỗi ngày"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xl font-semibold tabular-nums",
						children: streak
					})] })]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Hôm nay"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-2xl font-semibold tabular-nums",
							children: [Math.round(minutes), " phút"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							className: "mt-2",
							value: goalPct
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Cần ôn"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xl font-semibold tabular-nums",
						children: due
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Điểm quiz trung bình"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-2xl font-semibold tabular-nums",
						children: [quizPct, "%"]
					})]
				}) })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "lg:col-span-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-medium",
							children: "Tiến độ tổng thể"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							label: "N5 tổng hợp",
							value: n5pct
						}),
						[
							{
								label: "Hiragana",
								value: hira,
								total: hiraBase
							},
							{
								label: "Katakana",
								value: kata,
								total: kataBase
							},
							{
								label: "Từ vựng",
								value: vocab,
								total: vocabTotal
							},
							{
								label: "Kanji",
								value: kanji,
								total: kanjiTotal
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							label: s.label,
							value: s.value / Math.max(1, s.total) * 100
						}, s.label))
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex h-full flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.14em] text-muted",
							children: "Bài tiếp theo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl",
							children: nextLesson.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: nextLesson.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto flex flex-wrap gap-2 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DynamicLink, {
									to: primaryLessonHref(nextLesson),
									children: ["Vào bài học ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/path/$id",
									params: { id: nextLesson.id },
									children: "Đọc bài"
								})
							})]
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/daily",
						children: "Bài tập hôm nay"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/garden",
						children: "Khu vườn"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/play",
						children: "Giải trí"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/leaderboard",
						children: "Bảng thi đua"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/review",
						children: "Ôn tập hôm nay"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hiragana",
						children: "Bảng Hiragana"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dictionary",
						children: "Mở từ điển"
					})
				})
			]
		}),
		showRomaji && hira > 20 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-muted",
			children: ["Bạn đã thuộc hơn 20 chữ hiragana. Hãy thử tắt Romaji trong cài đặt để luyện đọc chữ Nhật thuần.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "ml-2 underline",
				onClick: () => set({ showRomaji: false }),
				children: "Tắt Romaji"
			})]
		}) : null
	] });
}
//#endregion
export { HomePage as component };
