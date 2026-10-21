import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as todayKey, r as isBrowser, t as cn } from "./utils-XG3oJXDV.mjs";
import { t as Button } from "./button-Dt7wwSQI.mjs";
import { n as useCurrentUserState } from "./use-current-user-ClOiUQ-z.mjs";
import { F as Check, O as Flame, n as VolumeX, r as Volume2, z as BookOpen } from "../_libs/lucide-react.mjs";
import { a as useProgress, n as learnedCount } from "./progress-CIocZrv7.mjs";
import { n as CardContent, t as Card } from "./card-D1pZ1BiI.mjs";
import { t as Progress } from "./progress-Dt2T4DqM.mjs";
import { t as DynamicLink } from "./dynamic-link-0Accw2NR.mjs";
import { t as GARDEN_CONFIG } from "./config-BniAcjF_.mjs";
import { n as buildSnapshot, t as TREE_XP } from "./compute-2znzg32w.mjs";
import { n as gardenEvents } from "./events-DdCXtDE2.mjs";
import { a as setGardenSound, i as reportGardenLearning, n as learnedWordCount, r as loadGarden, t as claimGardenDaily } from "./sync-R8_fGbj6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-garden-DZDG5b2v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BLOSSOMS = {
	5: [
		[
			72,
			86,
			2.2
		],
		[
			96,
			70,
			2.4
		],
		[
			118,
			80,
			2.1
		],
		[
			84,
			102,
			1.8
		],
		[
			132,
			98,
			2
		]
	],
	6: [
		[
			68,
			82,
			2.3
		],
		[
			90,
			64,
			2.5
		],
		[
			112,
			72,
			2.2
		],
		[
			128,
			90,
			2
		],
		[
			80,
			98,
			1.9
		],
		[
			104,
			88,
			2.4
		],
		[
			58,
			104,
			1.8
		],
		[
			140,
			108,
			2.1
		],
		[
			96,
			78,
			2
		]
	],
	7: [
		[
			66,
			78,
			2.4
		],
		[
			88,
			58,
			2.6
		],
		[
			110,
			66,
			2.3
		],
		[
			126,
			84,
			2.2
		],
		[
			78,
			94,
			2
		],
		[
			102,
			82,
			2.5
		],
		[
			54,
			102,
			1.9
		],
		[
			144,
			104,
			2.2
		],
		[
			94,
			72,
			2.1
		],
		[
			118,
			96,
			2
		],
		[
			70,
			110,
			1.8
		],
		[
			136,
			76,
			2
		],
		[
			84,
			54,
			2.3
		]
	]
};
function SakuraTree({ stage, compact = false, celebrate = false, className }) {
	const s = Math.max(0, Math.min(7, Math.floor(stage)));
	const bloom = s >= 5;
	const petals = BLOSSOMS[s] ?? BLOSSOMS[Math.min(s, 7)] ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 200 260",
		className: cn("tree-svg", compact && "tree-svg-compact", celebrate && "tree-celebrate", className),
		role: "img",
		"aria-label": `Cây Sakura cấp ${s}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Sakura" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "skyG",
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "var(--color-sky)",
						stopOpacity: "0.28"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "70%",
						stopColor: "var(--color-mist)",
						stopOpacity: "0"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
					id: "leafG",
					cx: "42%",
					cy: "38%",
					r: "62%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "var(--color-meadow)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "var(--color-forest)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
					id: "bloomG",
					cx: "46%",
					cy: "36%",
					r: "64%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "var(--color-blossom)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "var(--color-seal)",
						stopOpacity: "0.72"
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "200",
				height: "260",
				fill: "url(#skyG)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "100",
				cy: "238",
				rx: "72",
				ry: "10",
				fill: "var(--color-forest)",
				opacity: "0.14"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M28 236c18-10 40-14 72-14s54 4 72 14v16H28z",
				fill: "var(--color-forest)",
				opacity: "0.22"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M48 236c6-10 10-12 8 0",
				stroke: "var(--color-meadow)",
				strokeWidth: "1.4",
				fill: "none",
				opacity: "0.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M150 236c-5-11-9-13-7 0",
				stroke: "var(--color-forest)",
				strokeWidth: "1.4",
				fill: "none",
				opacity: "0.65"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M62 237c4-8 8-9 5 1",
				stroke: "var(--color-meadow)",
				strokeWidth: "1.2",
				fill: "none",
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: cn("tree-layer", s === 0 ? "is-on" : "is-off"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M100 214c5.5 0 10 4.2 10 10.5 0 7.4-4.4 14.6-10 19.5-5.6-4.9-10-12.1-10-19.5 0-6.3 4.5-10.5 10-10.5z",
					fill: "var(--color-bark)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "97",
					cy: "222",
					rx: "2.4",
					ry: "1.6",
					fill: "var(--color-blossom)",
					opacity: "0.45"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: cn("tree-layer", s >= 1 ? "is-on" : "is-off"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: s >= 2 ? "tree-sway" : void 0,
					children: [
						s === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M100 232v-34",
								stroke: "var(--color-bark)",
								strokeWidth: "2.4",
								strokeLinecap: "round",
								fill: "none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M100 206c-10-2-14-8-16-14 6 2 12 4 16 8",
								fill: "var(--color-meadow)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M100 206c10-2 14-8 16-14-6 2-12 4-16 8",
								fill: "var(--color-forest)"
							})
						] }) : null,
						s >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: s >= 4 ? "M100 234c1-24 3-78 2-118" : "M100 234c1-18 2-56 1-78",
							stroke: "var(--color-bark)",
							strokeWidth: s >= 4 ? 7 : s >= 3 ? 5 : 3.4,
							strokeLinecap: "round",
							fill: "none"
						}) : null,
						s >= 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M101 168c-18-12-32-16-42-12",
								stroke: "var(--color-bark)",
								strokeWidth: "3.4",
								fill: "none",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M101 158c18-12 30-15 40-11",
								stroke: "var(--color-bark)",
								strokeWidth: "3.2",
								fill: "none",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M101 140c-8-18-10-28-6-38",
								stroke: "var(--color-bark)",
								strokeWidth: "2.6",
								fill: "none",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M101 134c10-16 14-26 11-38",
								stroke: "var(--color-bark)",
								strokeWidth: "2.6",
								fill: "none",
								strokeLinecap: "round"
							})
						] }) : null,
						s === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M78 150c8-22 16-32 22-34 8-2 16 8 24 32 4 14-6 22-22 24-16 0-28-8-24-22z",
							fill: "url(#leafG)"
						}) : null,
						s >= 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: s >= 4 ? "M48 128c8-38 28-62 52-66 30-4 52 18 60 48 6 22-8 42-38 50-18 6-42 4-58-8-16-12-22-18-16-24z" : "M62 132c8-28 22-46 38-48 22-4 40 14 46 36 4 16-8 30-28 36-14 4-32 2-44-8-10-8-16-12-12-16z",
							fill: bloom ? "url(#bloomG)" : "url(#leafG)"
						}) : null,
						s >= 5 ? petals.map(([x, y, r], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: x,
							cy: y,
							r,
							fill: "var(--color-surface)",
							opacity: .55 + i % 4 * .1
						}, `${x}-${y}-${i}`)) : null
					]
				})
			}),
			s >= 6 && !compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: "tree-petals",
				"aria-hidden": true,
				children: Array.from({ length: s >= 7 ? 8 : 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					className: "tree-petal",
					cx: 48 + i * 17 % 110,
					cy: "28",
					rx: "2.1",
					ry: "3.2",
					fill: "var(--color-blossom)",
					opacity: "0.8",
					style: { animationDelay: `${i * .85}s` }
				}, i))
			}) : null
		]
	});
}
function studiedToday(item, today) {
	return item.lastStudied > 0 && todayKey(new Date(item.lastStudied)) === today;
}
function dailyGoalsFrom(input) {
	const items = input.today?.items ?? 0;
	const minutes = input.today?.minutes ?? 0;
	const quizzes = input.today?.quizzes ?? 0;
	const kana = Object.values(input.srs).filter((x) => (x.id.startsWith("h-") || x.id.startsWith("k-")) && studiedToday(x, input.date)).length;
	const kanji = Object.values(input.srs).filter((x) => x.id.startsWith("kj-") && studiedToday(x, input.date)).length;
	return [
		{
			id: "words",
			label: `Học / ôn ${TREE_XP.dailyItems} từ`,
			href: "/review",
			done: items >= TREE_XP.dailyItems,
			current: items,
			target: TREE_XP.dailyItems
		},
		{
			id: "kana",
			label: "Học hiragana hoặc katakana",
			href: "/alphabet",
			done: kana >= 3,
			current: kana,
			target: 3
		},
		{
			id: "kanji",
			label: "Học kanji",
			href: "/kanji",
			done: kanji >= 3,
			current: kanji,
			target: 3
		},
		{
			id: "quiz",
			label: "Làm 1 bài quiz hoặc nghe",
			href: "/quiz",
			done: quizzes >= 1,
			current: quizzes,
			target: 1
		},
		{
			id: "time",
			label: `Học ít nhất ${TREE_XP.dailyMinutes} phút`,
			href: "/daily",
			done: minutes >= TREE_XP.dailyMinutes,
			current: Math.round(minutes),
			target: TREE_XP.dailyMinutes
		}
	];
}
function historyFromDays(days) {
	return [...days].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10).map((d) => {
		const xp = d.items * TREE_XP.perVocab + d.quizzes * TREE_XP.perQuiz + (d.minutes >= TREE_XP.dailyMinutes ? TREE_XP.dailyGoalBonus : 0);
		const parts = [];
		if (d.items) parts.push(`${d.items} từ`);
		if (d.quizzes) parts.push(`${d.quizzes} quiz`);
		if (d.minutes) parts.push(`${Math.round(d.minutes)} phút`);
		return {
			date: d.date,
			xp,
			note: parts.join(" · ") || "Học nhẹ"
		};
	});
}
function calendarMarks(days, today, weeks = 4) {
	const map = new Map(days.map((d) => [d.date, d]));
	const [y, m, d] = today.split("-").map(Number);
	const end = new Date(Date.UTC(y, m - 1, d));
	const start = new Date(end);
	start.setUTCDate(start.getUTCDate() - (weeks * 7 - 1));
	const out = [];
	for (let t = start.getTime(); t <= end.getTime(); t += 864e5) {
		const key = new Date(t).toISOString().slice(0, 10);
		const hit = map.get(key);
		out.push({
			date: key,
			minutes: hit?.minutes ?? 0,
			items: hit?.items ?? 0,
			quizzes: hit?.quizzes ?? 0
		});
	}
	return out;
}
function formatVnDate(iso) {
	const [y, m, d] = iso.split("-");
	if (!d) return iso;
	return `${d}/${m}/${y}`;
}
function GardenHud({ garden, soundOn, onSound, goals, startedAt }) {
	const next = garden.nextLevelXp;
	const span = Math.max(1, (next ?? garden.xp) - garden.prevLevelXp);
	const into = Math.max(0, garden.xp - garden.prevLevelXp);
	const pct = next ? Math.min(100, into / span * 100) : 100;
	const done = goals.filter((g) => g.done).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "garden-hud",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "garden-chip",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.14em] text-subtle",
					children: garden.mood
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-lg leading-tight",
					children: [
						garden.levelName,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-jp text-muted",
							children: garden.levelNameJp
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"Sakura · cấp ",
						garden.level,
						startedAt ? ` · từ ${formatVnDate(startedAt)}` : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 h-1.5 overflow-hidden rounded-full bg-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-meadow",
						style: { width: `${pct}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [garden.xp.toLocaleString("vi-VN"), " XP"] }),
						next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"còn ",
							next - garden.xp,
							" tới cấp sau"
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Đỉnh vườn" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							done,
							"/",
							goals.length,
							" mục tiêu hôm nay"
						] })
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			size: "icon-sm",
			onClick: onSound,
			"aria-label": soundOn ? "Tắt âm" : "Bật âm",
			children: soundOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {})
		})]
	});
}
function TreeStats({ garden, goals }) {
	const done = goals.filter((g) => g.done).length;
	const goalPct = goals.length ? done / goals.length * 100 : 0;
	const next = garden.nextLevelXp;
	const span = Math.max(1, (next ?? garden.xp) - garden.prevLevelXp);
	const into = Math.max(0, garden.xp - garden.prevLevelXp);
	const xpPct = next ? Math.min(100, into / span * 100) : 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Chuỗi ngày"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 flex items-center gap-2 text-2xl font-semibold tabular-nums",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-5 text-seal" }), garden.streak]
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "XP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-2xl font-semibold tabular-nums",
						children: garden.xp.toLocaleString("vi-VN")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						className: "mt-2",
						value: xpPct
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Bài đã học"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-2xl font-semibold tabular-nums",
					children: garden.lessons
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Từ đã học"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-2xl font-semibold tabular-nums",
					children: garden.wordsLearned
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "sm:col-span-2 lg:col-span-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-end justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.14em] text-subtle",
								children: "Mục tiêu hôm nay"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									done,
									"/",
									goals.length,
									" việc",
									done === goals.length ? " · hoàn thành, cây được tưới" : ""
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									"+",
									TREE_XP.dailyGoalBonus,
									" XP khi đủ"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: goalPct,
							className: "mb-3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2 sm:grid-cols-2",
							children: goals.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DynamicLink, {
								to: g.href,
								className: cn("flex min-h-11 items-center justify-between gap-2 rounded-[10px] border px-3 py-2 text-sm", g.done ? "border-forest/25 bg-mist text-forest" : "border-border bg-bg-elevated"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("grid size-5 place-items-center rounded-full border", g.done ? "border-forest bg-forest text-success-fg" : "border-border"),
										children: g.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : null
									}), g.label]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums text-xs text-muted",
									children: [
										Math.min(g.current, g.target),
										"/",
										g.target
									]
								})]
							}) }, g.id))
						})
					]
				})
			})
		]
	});
}
function StreakCalendar({ marks, today }) {
	const labels = [
		"T2",
		"T3",
		"T4",
		"T5",
		"T6",
		"T7",
		"CN"
	];
	const first = marks[0]?.date;
	const pad = first ? (() => {
		const [y, m, d] = first.split("-").map(Number);
		return (new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7;
	})() : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.14em] text-subtle",
				children: "Lịch học"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Ngày có học được tô xanh — nghỉ không làm cây héo."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-7 gap-1.5 text-center text-[11px] text-subtle",
				children: [
					labels.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l }, l)),
					Array.from({ length: pad }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}, `p-${i}`)),
					marks.map((m) => {
						const on = m.items > 0 || m.minutes > 0 || m.quizzes > 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							title: `${formatVnDate(m.date)}${on ? " · đã học" : ""}`,
							className: cn("grid aspect-square place-items-center rounded-md text-xs tabular-nums", on ? "bg-mist text-forest" : "bg-choice text-subtle", m.date === today && "ring-1 ring-accent"),
							children: Number(m.date.slice(8))
						}, m.date);
					})
				]
			})
		]
	}) });
}
function StudyHistory({ rows }) {
	if (!rows.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
		className: "py-6 text-sm text-muted",
		children: "Chưa có nhật ký. Học hôm nay sẽ hiện ở đây."
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "space-y-3 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.14em] text-subtle",
			children: "Nhật ký cây"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-start justify-between gap-3 border-t border-border pt-3 first:border-0 first:pt-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: formatVnDate(r.date)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: r.note
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm tabular-nums text-forest",
					children: [
						"+",
						r.xp,
						" XP"
					]
				})]
			}, r.date))
		})]
	}) });
}
function LevelUpModal({ garden, onDone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "garden-modal",
		role: "dialog",
		"aria-labelledby": "garden-level-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "garden-modal-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.16em] text-subtle",
					children: "Cây lớn thêm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto my-3 w-36",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SakuraTree, {
						stage: garden.level,
						compact: true,
						celebrate: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "garden-level-title",
					className: "font-display text-2xl",
					children: garden.levelName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-jp text-muted",
					children: garden.levelNameJp
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						"Cấp ",
						garden.level,
						" · ",
						garden.mood,
						". Học đều, hoa sẽ nở."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					onClick: onDone,
					children: "Tiếp tục chăm cây"
				})
			]
		})
	});
}
function GardenFallback() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[16px] border border-border bg-surface p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl",
				children: "Vườn đang nghỉ một chút"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Phần học tiếng Nhật vẫn dùng bình thường."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-4",
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/daily",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {}), " Tiếp tục học"]
				})
			})
		]
	});
}
function GardenLoading() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-[50vh] place-items-center text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: "Đang chăm sóc Sakura…"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Hạt giống không đi đâu cả."
		})] })
	});
}
function HomeGardenCard({ garden, goalPct }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "grid gap-4 py-4 sm:grid-cols-[8.5rem_1fr] sm:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-32 sm:mx-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SakuraTree, {
					stage: garden.level,
					compact: true
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.14em] text-subtle",
					children: "Vườn tiếng Nhật"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-xl",
					children: "Sakura của bạn"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						garden.levelName,
						" · cấp ",
						garden.level,
						" · ",
						garden.xp.toLocaleString("vi-VN"),
						" XP"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"Chuỗi ",
						garden.streak,
						" ngày"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					className: "mt-3",
					value: goalPct,
					label: "Mục tiêu hôm nay"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-3",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/garden",
						children: "Vào khu vườn"
					})
				})
			] })]
		})
	});
}
var KEY = "akari-garden-v1";
function emptyLocal() {
	return {
		placements: [],
		seenUnlocks: [],
		soundOn: false,
		dailyBonus: 0,
		lastDailyDate: null,
		lastSeenLevel: -1
	};
}
function readLocalGarden() {
	if (!isBrowser()) return emptyLocal();
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return emptyLocal();
		const parsed = JSON.parse(raw);
		return {
			placements: Array.isArray(parsed.placements) ? parsed.placements : [],
			seenUnlocks: Array.isArray(parsed.seenUnlocks) ? parsed.seenUnlocks : [],
			soundOn: Boolean(parsed.soundOn),
			dailyBonus: Number(parsed.dailyBonus) || 0,
			lastDailyDate: typeof parsed.lastDailyDate === "string" ? parsed.lastDailyDate : null,
			lastSeenLevel: Number.isFinite(Number(parsed.lastSeenLevel)) ? Number(parsed.lastSeenLevel) : -1
		};
	} catch {
		return emptyLocal();
	}
}
function writeLocalGarden(next) {
	if (!isBrowser()) return;
	try {
		localStorage.setItem(KEY, JSON.stringify(next));
	} catch {}
}
function localSnapshot(facts) {
	const local = readLocalGarden();
	return buildSnapshot({
		...facts,
		dailyBonus: local.dailyBonus,
		lastDailyDate: local.lastDailyDate,
		soundOn: local.soundOn,
		seenUnlocks: local.seenUnlocks,
		placements: local.placements,
		today: todayKey()
	}, false);
}
function setLocalSound(soundOn) {
	writeLocalGarden({
		...readLocalGarden(),
		soundOn
	});
}
function claimLocalDaily(studiedToday) {
	const local = readLocalGarden();
	const today = todayKey();
	if (!studiedToday || local.lastDailyDate === today) return local;
	const next = {
		...local,
		dailyBonus: local.dailyBonus + GARDEN_CONFIG.xp.daily,
		lastDailyDate: today
	};
	writeLocalGarden(next);
	return next;
}
function peekLastSeenLevel() {
	return readLocalGarden().lastSeenLevel;
}
function markSeenLevel(level) {
	writeLocalGarden({
		...readLocalGarden(),
		lastSeenLevel: level
	});
}
function fromLocalProgress(srs, lessons, streak, lastStudyDate, quizScores) {
	return localSnapshot({
		wordsLearned: learnedCount(srs, "v-"),
		lessons: lessons.size,
		streak,
		quizzes: quizScores.length,
		studyXp: 0,
		lastStudyDate,
		kanaHira: learnedCount(srs, "h-"),
		kanaKata: learnedCount(srs, "k-"),
		vocab: learnedCount(srs, "v-"),
		kanji: learnedCount(srs, "kj-"),
		grammar: learnedCount(srs, "g-"),
		quizScores
	});
}
function useGarden() {
	const { user, isPending } = useCurrentUserState();
	const srs = useProgress((s) => s.srs);
	const lessons = useProgress((s) => s.completedLessonIds);
	const streak = useProgress((s) => s.streak);
	const lastStudyDate = useProgress((s) => s.lastStudyDate);
	const quizScores = useProgress((s) => s.quizScores);
	const today = useProgress((s) => s.today);
	const days = useProgress((s) => s.days);
	const ready = useProgress((s) => s.ready);
	const [remote, setRemote] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [tick, setTick] = (0, import_react.useState)(0);
	const local = (0, import_react.useMemo)(() => fromLocalProgress(srs, lessons, streak, lastStudyDate, quizScores), [
		srs,
		lessons,
		streak,
		lastStudyDate,
		quizScores,
		tick
	]);
	const garden = (0, import_react.useMemo)(() => {
		if (!remote?.signedIn) return local;
		return {
			...local,
			signedIn: true,
			soundOn: remote.soundOn,
			dailyBonus: remote.dailyBonus,
			lastDailyDate: remote.lastDailyDate,
			canClaimDaily: local.lastStudyDate === todayKey() && remote.lastDailyDate !== todayKey()
		};
	}, [local, remote]);
	const date = todayKey();
	const goals = (0, import_react.useMemo)(() => dailyGoalsFrom({
		today,
		srs,
		date
	}), [
		today,
		srs,
		date
	]);
	const marks = (0, import_react.useMemo)(() => calendarMarks(days, date), [days, date]);
	const history = (0, import_react.useMemo)(() => historyFromDays(days), [days]);
	const startedAt = days.length ? [...days].sort((a, b) => a.date.localeCompare(b.date))[0]?.date ?? lastStudyDate : lastStudyDate;
	const goalsDone = goals.length > 0 && goals.every((g) => g.done);
	const refresh = (0, import_react.useCallback)(async () => {
		try {
			const res = await loadGarden();
			if (res && "signedIn" in res && res.signedIn) {
				setRemote(res);
				setError(false);
			} else setRemote(null);
		} catch {
			setError(true);
			setRemote(null);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
	}, [refresh, user?.id]);
	(0, import_react.useEffect)(() => {
		return gardenEvents.on("gardenSynced", () => {
			refresh();
		});
	}, [refresh]);
	(0, import_react.useEffect)(() => {
		if (!ready || isPending) return;
		const words = learnedWordCount(srs);
		reportGardenLearning({ data: {
			wordsLearned: words,
			streak,
			studiedToday: lastStudyDate === todayKey()
		} }).then((res) => {
			if (res && "signedIn" in res && res.signedIn) setRemote(res);
		}).catch(() => {});
	}, [
		ready,
		isPending,
		srs,
		streak,
		lastStudyDate
	]);
	const ackUnlocks = (0, import_react.useCallback)(async (_ids) => {}, []);
	const claimDaily = (0, import_react.useCallback)(async () => {
		if (garden.signedIn) try {
			const next = await claimGardenDaily();
			setRemote(next);
			return next;
		} catch {
			setError(true);
		}
		claimLocalDaily(lastStudyDate === todayKey());
		setTick((n) => n + 1);
		return fromLocalProgress(srs, lessons, streak, lastStudyDate, quizScores);
	}, [
		garden.signedIn,
		lastStudyDate,
		srs,
		lessons,
		streak,
		quizScores
	]);
	(0, import_react.useEffect)(() => {
		if (!ready || !goalsDone || !garden.canClaimDaily) return;
		claimDaily();
	}, [
		ready,
		goalsDone,
		garden.canClaimDaily,
		claimDaily
	]);
	return {
		garden,
		loading,
		error,
		refresh,
		ackUnlocks,
		claimDaily,
		toggleSound: (0, import_react.useCallback)(async (on) => {
			if (garden.signedIn) try {
				await setGardenSound({ data: on });
				setRemote((prev) => prev ? {
					...prev,
					soundOn: on
				} : prev);
				return;
			} catch {}
			setLocalSound(on);
			setTick((n) => n + 1);
		}, [garden.signedIn]),
		config: GARDEN_CONFIG,
		goals,
		marks,
		history,
		startedAt,
		goalsDone
	};
}
//#endregion
export { LevelUpModal as a, StudyHistory as c, peekLastSeenLevel as d, useGarden as f, HomeGardenCard as i, TreeStats as l, GardenHud as n, SakuraTree as o, GardenLoading as r, StreakCalendar as s, GardenFallback as t, markSeenLevel as u };
