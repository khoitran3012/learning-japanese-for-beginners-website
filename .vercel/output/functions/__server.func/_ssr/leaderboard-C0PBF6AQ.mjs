import { o as __toESM } from "../_runtime.mjs";
import { E as require_react, T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { n as useCurrentUserState, t as useCurrentUser } from "./use-current-user-ClOiUQ-z.mjs";
import { t as Input } from "./input-qD8XPiq5.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as updateDisplayName, n as listLeaderboard, t as getMyStats } from "./leaderboard-2HOZZMp1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leaderboard-C0PBF6AQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { user, isPending } = useCurrentUserState();
	const me = useCurrentUser();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [mine, setMine] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		listLeaderboard().then(setRows).catch(() => setRows([]));
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
	const ranked = rows.map((r, i) => ({
		...r,
		rank: i + 1,
		isYou: Boolean(me && r.userId === me.id)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "競争",
			title: "Bảng thi đua",
			description: "XP từ quiz, bài hôm nay và chuỗi ngày. Đăng nhập để tên bạn xuất hiện."
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
								const list = await listLeaderboard();
								setRows(list);
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
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
			})
		}) })
	] });
}
//#endregion
export { Page as component };
