import { o as __toESM } from "../_runtime.mjs";
import { E as require_react, T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useCurrentUserState, t as useCurrentUser } from "./use-current-user-ClOiUQ-z.mjs";
import { i as useProgress } from "./progress-De5Z2Iqg.mjs";
import { t as Input } from "./input-qD8XPiq5.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { i as updateDisplayName, n as listLeaderboard, t as getMyStats } from "./leaderboard-CRj1pN2h.mjs";
import { i as stageLabel, n as PATH_STAGES, r as STAGE_TOTALS, t as LESSON_STAGE } from "./path-stages-C25bjV5E.mjs";
import { syncPathProgress, t as listPathRankings } from "./sync-path-BwYuSrjW.mjs";
import { a as XAxis, c as Bar, d as PolarGrid, f as Cell, i as YAxis, l as Radar, m as Tooltip, n as RadarChart, o as Area, p as ResponsiveContainer, r as BarChart, s as CartesianGrid, t as AreaChart, u as PolarAngleAxis } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leaderboard-CXK_GuGv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChartTip({ active, payload, label, suffix = "%" }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[10px] border border-border bg-surface px-3 py-2 text-xs shadow-[var(--shadow-soft)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1 font-medium",
			children: label
		}), payload.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "tabular-nums text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mr-1 inline-block size-2 rounded-full",
					style: { background: p.color }
				}),
				p.name,
				": ",
				p.value,
				suffix
			]
		}, p.name))]
	});
}
function ChartLegend() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-1 flex flex-wrap gap-4 px-1 text-xs text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-meadow" }), "Bạn"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-sky" }), "Dẫn đầu"]
		})]
	});
}
function gardenFromLessons(completed, lessonStage, rankings, meId) {
	const localCount = {};
	for (const id of completed) {
		const stage = lessonStage[id];
		if (!stage) continue;
		localCount[stage] = (localCount[stage] ?? 0) + 1;
	}
	return PATH_STAGES.map((s) => {
		const total = STAGE_TOTALS[s.id] || 1;
		const server = rankings?.byStage[s.id]?.find((r) => r.userId === meId)?.completed ?? 0;
		const youDone = Math.max(localCount[s.id] ?? 0, server);
		const lead = Math.max(rankings?.byStage[s.id]?.[0]?.completed ?? 0, youDone);
		return {
			stage: s.label,
			you: Math.round(youDone / total * 100),
			lead: Math.round(lead / total * 100)
		};
	});
}
function GhibliGardenChart({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64 w-full sm:h-72",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data,
				margin: {
					top: 12,
					right: 8,
					left: -18,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "ghibliYou",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--color-meadow)",
							stopOpacity: .85
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--color-meadow)",
							stopOpacity: .08
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "ghibliLead",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--color-sky)",
							stopOpacity: .55
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--color-sky)",
							stopOpacity: .05
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "color-mix(in oklab, var(--color-fg) 8%, transparent)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "stage",
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false,
						interval: 0,
						angle: -20,
						textAnchor: "end",
						height: 48
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						domain: [0, 100],
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, {}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "lead",
						name: "Dẫn đầu",
						stroke: "var(--color-sky)",
						fill: "url(#ghibliLead)",
						strokeWidth: 2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "you",
						name: "Bạn",
						stroke: "var(--color-forest)",
						fill: "url(#ghibliYou)",
						strokeWidth: 2.5
					})
				]
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, {})] });
}
function GhibliRadarChart({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64 w-full sm:h-72",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
				data,
				cx: "50%",
				cy: "50%",
				outerRadius: "70%",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "color-mix(in oklab, var(--color-fg) 14%, transparent)" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
						dataKey: "stage",
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
						name: "Dẫn đầu",
						dataKey: "lead",
						stroke: "var(--color-sky)",
						fill: "var(--color-sky)",
						fillOpacity: .18
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
						name: "Bạn",
						dataKey: "you",
						stroke: "var(--color-forest)",
						fill: "var(--color-meadow)",
						fillOpacity: .35
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, {}) })
				]
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, {})] });
}
function GhibliRankBars({ rows, meId }) {
	const data = rows.slice(0, 8).map((r) => ({
		name: r.displayName.length > 12 ? `${r.displayName.slice(0, 11)}…` : r.displayName,
		full: r.displayName,
		value: r.completed,
		fill: meId && r.userId === meId ? "var(--color-clay)" : "var(--color-meadow)"
	}));
	if (data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-8 text-center text-sm text-muted",
		children: "Chưa có ai hoàn thành hạng mục này."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64 w-full sm:h-72",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				layout: "vertical",
				margin: {
					top: 8,
					right: 12,
					left: 8,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "color-mix(in oklab, var(--color-fg) 8%, transparent)",
						horizontal: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						type: "number",
						allowDecimals: false,
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						type: "category",
						dataKey: "name",
						width: 88,
						tick: {
							fill: "var(--color-fg)",
							fontSize: 12
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload }) => {
						if (!active || !payload?.length) return null;
						const d = payload[0]?.payload;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[10px] border border-border bg-surface px-3 py-2 text-xs shadow-[var(--shadow-soft)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: d.full
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "tabular-nums text-muted",
								children: [d.value, " bài"]
							})]
						});
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "value",
						name: "Bài đã xong",
						radius: [
							0,
							10,
							10,
							0
						],
						maxBarSize: 22,
						children: data.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, `${d.full}-${i}`))
					})
				]
			})
		})
	});
}
function GhibliChartFrame({ kicker, title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "ghibli-panel overflow-hidden rounded-xl border border-border shadow-[var(--shadow-soft)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ghibli-panel-wash p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
					children: kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-xl font-semibold",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-xl text-sm text-muted",
					children: description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 rounded-[14px] border border-border bg-surface/85 p-3 backdrop-blur-[2px]",
					children
				})
			]
		})
	});
}
function stageRows(rankings, stage) {
	if (!rankings) return [];
	if (stage === "overall") return rankings.overall;
	return rankings.byStage[stage] ?? [];
}
function Page() {
	const { user, isPending } = useCurrentUserState();
	const me = useCurrentUser();
	const completed = useProgress((s) => s.completedLessonIds);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [mine, setMine] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [pathRanks, setPathRanks] = (0, import_react.useState)(null);
	const [stage, setStage] = (0, import_react.useState)("overall");
	(0, import_react.useEffect)(() => {
		listLeaderboard().then(setRows).catch(() => setRows([]));
		listPathRankings().then(setPathRanks).catch(() => setPathRanks(null));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setMine(null);
			return;
		}
		getMyStats().then((r) => {
			setMine(r);
			if (r?.displayName) setName(r.displayName);
			else if (user.displayName) setName(user.displayName);
		}).catch(() => setMine(null));
	}, [user]);
	(0, import_react.useEffect)(() => {
		if (!user || completed.size === 0) return;
		syncPathProgress([...completed]).then(() => listPathRankings().then(setPathRanks).catch(() => null));
	}, [user, completed]);
	const ranked = rows.map((r, i) => ({
		...r,
		rank: i + 1,
		isYou: Boolean(me && r.userId === me.id)
	}));
	const garden = (0, import_react.useMemo)(() => gardenFromLessons(completed, LESSON_STAGE, pathRanks, me?.id ?? null), [
		completed,
		pathRanks,
		me
	]);
	const categoryRows = (0, import_react.useMemo)(() => {
		return stageRows(pathRanks, stage).map((r) => ({
			...r,
			isYou: Boolean(me && r.userId === me.id)
		}));
	}, [
		pathRanks,
		stage,
		me
	]);
	const myCategory = categoryRows.find((r) => r.isYou);
	const categoryTotal = stage === "overall" ? Object.values(STAGE_TOTALS).reduce((a, n) => a + n, 0) : STAGE_TOTALS[stage] ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "競争",
			title: "Bảng thi đua",
			description: "XP từ quiz, bài hôm nay và chuỗi ngày. Xếp hạng lộ trình theo từng hạng mục — xem như đồi Ghibli."
		}),
		!isPending && !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Đăng nhập để ghi điểm lên bảng — vẫn học được khi chưa có tài khoản."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: "Đăng nhập"
					})
				})]
			})
		}) : null,
		user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-wrap items-end gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-[12rem] flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1 text-xs text-muted",
							children: "Tên trên bảng"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							maxLength: 32
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: async () => {
							const res = await updateDisplayName({ data: name });
							if (res.ok) {
								toast("Đã đổi tên");
								const [list, path] = await Promise.all([listLeaderboard(), listPathRankings()]);
								setRows(list);
								setPathRanks(path);
							} else toast.error(res.error);
						},
						children: "Lưu tên"
					}),
					mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm tabular-nums text-muted",
						children: [
							"XP ",
							mine.xp,
							" · đúng ",
							mine.correct,
							"/",
							mine.total || "—",
							" · chuỗi ",
							mine.streak
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Làm một quiz để lên bảng."
					})
				]
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setStage("overall"),
						className: cn("h-10 rounded-full border px-3 text-sm transition-colors", stage === "overall" ? "border-primary bg-primary text-primary-fg" : "border-border bg-surface text-muted hover:text-fg"),
						children: "Cả lộ trình"
					}), PATH_STAGES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setStage(s.id),
						className: cn("h-10 rounded-full border px-3 text-sm transition-colors", stage === s.id ? "border-primary bg-primary text-primary-fg" : "border-border bg-surface text-muted hover:text-fg"),
						children: s.label
					}, s.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhibliChartFrame, {
					kicker: "丘陵",
					title: `Đồi xếp hạng · ${stage === "overall" ? "Cả lộ trình" : stageLabel(stage)}`,
					description: myCategory ? `Bạn đang hạng ${myCategory.rank} với ${myCategory.completed}/${categoryTotal} bài.` : "Hoàn thành bài trên Lộ trình để hiện mặt trên đồi. Đăng nhập để so với học viên khác.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhibliRankBars, {
						rows: categoryRows,
						meId: me?.id ?? null
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhibliChartFrame, {
						kicker: "風景",
						title: "Khu vườn lộ trình",
						description: "Đồi xanh là tiến độ của bạn theo hạng mục. Sương xanh nhạt là người dẫn đầu.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhibliGardenChart, { data: garden })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhibliChartFrame, {
						kicker: "羅針",
						title: "La bàn chín hướng",
						description: "So từng hạng mục: nền tảng, chữ, từ, ngữ pháp, kanji, đọc, nghe, kiểm tra.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhibliRadarChart, { data: garden })
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "overflow-x-auto p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[32rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-border text-xs text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "#"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Học viên"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Bài xong"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Hạng mục"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: categoryRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 4,
						className: "px-4 py-8 text-center text-muted",
						children: "Chưa có xếp hạng lộ trình. Vào Lộ trình, học bài rồi đánh dấu hoàn thành."
					}) }) : categoryRows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: r.isYou ? "bg-bg-elevated" : "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular-nums",
								children: r.rank
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3 font-medium",
								children: [r.displayName, r.isYou ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 text-xs text-accent",
									children: "bạn"
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3 tabular-nums",
								children: [
									r.completed,
									"/",
									r.total || categoryTotal
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted",
								children: stage === "overall" ? "Cả lộ trình" : stageLabel(stage)
							})
						]
					}, r.userId)) })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "overflow-x-auto p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "Xếp hạng XP"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Từ quiz, bài hôm nay và chuỗi ngày."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[32rem] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "border-b border-border text-xs text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "#"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Học viên"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "XP"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Quiz"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Đúng"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Chuỗi"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ranked.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 6,
					className: "px-4 py-8 text-center text-muted",
					children: "Chưa có ai ghi điểm. Hãy làm quiz hoặc bài hôm nay."
				}) }) : ranked.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: r.isYou ? "bg-bg-elevated" : "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 tabular-nums",
							children: r.rank
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-4 py-3 font-medium",
							children: [r.displayName, r.isYou ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-xs text-accent",
								children: "bạn"
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 tabular-nums",
							children: r.xp
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 tabular-nums",
							children: r.quizzes
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-4 py-3 tabular-nums",
							children: [
								r.correct,
								"/",
								r.total || 0
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 tabular-nums",
							children: r.streak
						})
					]
				}, r.userId)) })]
			})]
		}) })
	] });
}
//#endregion
export { Page as component };
