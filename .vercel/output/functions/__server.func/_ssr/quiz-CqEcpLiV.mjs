import { o as __toESM } from "../_runtime.mjs";
import { E as require_react, T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as uid } from "./utils-D10sm1uC.mjs";
import { n as addQuizResult } from "./storage-BvOEP3N4.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { t as useCurrentUser } from "./use-current-user-ClOiUQ-z.mjs";
import { i as useProgress } from "./progress-Cu0w4vLw.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { r as makeQuiz, t as QuizCard } from "./quiz-engine-BW4Q0xlY.mjs";
import { t as syncQuizToLeaderboard } from "./sync-score-CnnZf5ge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz-CqEcpLiV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KINDS = [
	{
		id: "mix",
		label: "Tổng hợp"
	},
	{
		id: "hira-romaji",
		label: "あ → a"
	},
	{
		id: "romaji-hira",
		label: "ka → か"
	},
	{
		id: "kata-romaji",
		label: "ア → a"
	},
	{
		id: "vocab-meaning",
		label: "Từ → nghĩa"
	},
	{
		id: "meaning-vocab",
		label: "Nghĩa → từ"
	},
	{
		id: "listen",
		label: "Nghe chữ"
	},
	{
		id: "listen-vocab",
		label: "Nghe từ"
	},
	{
		id: "kanji",
		label: "Kanji nghĩa"
	},
	{
		id: "kanji-read",
		label: "Kanji đọc"
	},
	{
		id: "listen-kanji",
		label: "Nghe kanji"
	},
	{
		id: "particle",
		label: "Trợ từ"
	},
	{
		id: "grammar",
		label: "Ngữ pháp"
	}
];
function srsOf(q) {
	const id = q.id.replace(/^q-(r-|l-|mv-|v-|kr-|lk-|lv-|p-\d+-)?/, "");
	if (q.kind === "kanji" || q.kind === "kanji-read" || q.kind === "listen-kanji") return {
		id,
		type: "kanji"
	};
	if (q.kind === "vocab-meaning" || q.kind === "meaning-vocab" || q.kind === "listen-vocab") return {
		id,
		type: "vocab"
	};
	if (q.kind === "grammar" || q.kind === "particle") return {
		id,
		type: "grammar"
	};
	return {
		id,
		type: "kana"
	};
}
function Page() {
	const [kind, setKind] = (0, import_react.useState)("mix");
	const [qs, setQs] = (0, import_react.useState)([]);
	const [i, setI] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	const log = useProgress((s) => s.logStudy);
	const mark = useProgress((s) => s.mark);
	const streak = useProgress((s) => s.streak);
	const user = useCurrentUser();
	const q = qs[i];
	(0, import_react.useEffect)(() => {
		setQs(makeQuiz(kind, 12));
		setI(0);
		setScore(0);
		setDone(false);
	}, [kind]);
	async function finish(nextScore) {
		setDone(true);
		await addQuizResult({
			id: uid("quiz"),
			at: Date.now(),
			kind,
			score: nextScore,
			total: qs.length,
			durationMs: 0
		});
		await log(qs.length, 4);
		await syncQuizToLeaderboard({
			score: nextScore,
			total: qs.length,
			minutes: 4,
			streak,
			displayName: user?.displayName
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "試験",
			title: "Quiz",
			description: "Chữ, từ, kanji (hiragana + romaji), nghe, trợ từ và ngữ pháp. Đăng nhập để điểm lên bảng thi đua."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: kind === k.id ? "default" : "secondary",
				onClick: () => setKind(k.id),
				children: k.label
			}, k.id))
		}),
		done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mx-auto max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "py-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Kết quả"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-4xl font-semibold tabular-nums",
						children: [
							score,
							"/",
							qs.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						onClick: () => {
							setQs(makeQuiz(kind, 12));
							setDone(false);
							setI(0);
							setScore(0);
						},
						children: "Làm lại"
					})
				]
			})
		}) : q ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizCard, {
			q,
			index: i,
			total: qs.length,
			score,
			fillKind: kind === "hira-romaji",
			onAnswer: (ok) => {
				setScore((s) => s + (ok ? 1 : 0));
				const srs = srsOf(q);
				mark(srs.id, srs.type, ok ? "good" : "forgot");
			},
			onNext: () => {
				if (i + 1 >= qs.length) finish(score);
				else setI((x) => x + 1);
			}
		}, q.id) : null
	] });
}
//#endregion
export { Page as component };
