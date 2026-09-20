import { o as __toESM } from "../_runtime.mjs";
import { E as require_react, T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as todayKey, o as uid, r as isBrowser } from "./utils-D10sm1uC.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as addQuizResult } from "./storage-BvOEP3N4.mjs";
import { i as useProgress } from "./progress-DKGo45g_.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { t as useCurrentUser } from "./use-current-user-ClOiUQ-z.mjs";
import { n as makeDailyQuiz, t as QuizCard } from "./quiz-engine-BW4Q0xlY.mjs";
import { t as syncQuizToLeaderboard } from "./sync-score-DIkH5ZMq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/daily-DueTF2mg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function dailyKey(date) {
	return `akari-daily-${date}`;
}
function loadSaved(date) {
	if (!isBrowser()) return null;
	try {
		const raw = localStorage.getItem(dailyKey(date));
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (typeof parsed.score === "number") return parsed;
	} catch {}
	return null;
}
function Page() {
	const date = todayKey();
	const qs = (0, import_react.useMemo)(() => makeDailyQuiz(date, 15), [date]);
	const [i, setI] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [saved, setSaved] = (0, import_react.useState)(() => loadSaved(date));
	const [practice, setPractice] = (0, import_react.useState)(false);
	const log = useProgress((s) => s.logStudy);
	const streak = useProgress((s) => s.streak);
	const user = useCurrentUser();
	const q = qs[i];
	async function finish(nextScore) {
		if (!practice) {
			const result = {
				score: nextScore,
				total: qs.length
			};
			localStorage.setItem(dailyKey(date), JSON.stringify(result));
			setSaved(result);
			await addQuizResult({
				id: uid("daily"),
				at: Date.now(),
				kind: "daily",
				score: nextScore,
				total: qs.length,
				durationMs: 0
			});
			await log(qs.length, 8);
			await syncQuizToLeaderboard({
				score: nextScore,
				total: qs.length,
				minutes: 8,
				streak,
				dailyScore: nextScore,
				displayName: user?.displayName
			});
		} else {
			setSaved({
				score: nextScore,
				total: qs.length
			});
			setPractice(false);
		}
	}
	if (saved && !practice) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "今日",
		title: "Bài tập hôm nay",
		description: `Bộ 15 câu chung cho mọi người ngày ${date}. Mai sẽ có đề mới.`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "mx-auto max-w-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "py-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Bạn đã hoàn thành hôm nay"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-4xl font-semibold tabular-nums",
					children: [
						saved.score,
						"/",
						saved.total
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap justify-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => {
								setPractice(true);
								setI(0);
								setScore(0);
							},
							children: "Luyện thêm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/play",
								children: "Chơi giải trí"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/leaderboard",
								children: "Bảng thi đua"
							})
						})
					]
				})
			]
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "今日",
		title: practice ? "Luyện thêm" : "Bài tập hôm nay",
		description: practice ? "Cùng đề hôm nay — không ghi lại điểm ngày." : "15 câu trộn chữ, từ, kanji (kèm cách đọc), nghe, trợ từ, ngữ pháp."
	}), q ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizCard, {
		q,
		index: i,
		total: qs.length,
		score,
		onAnswer: (ok) => setScore((s) => s + (ok ? 1 : 0)),
		onNext: () => {
			if (i + 1 >= qs.length) finish(score);
			else setI((x) => x + 1);
		}
	}, q.id + String(practice)) : null] });
}
//#endregion
export { Page as component };
