import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as uid } from "./utils-D10sm1uC.mjs";
import { n as addQuizResult } from "./storage-BvOEP3N4.mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { t as useCurrentUser } from "./use-current-user-ClOiUQ-z.mjs";
import { i as useProgress } from "./progress-BOD7PV7B.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { r as nextQuestion, t as QuizCard } from "./quiz-engine-0xgDhG2h.mjs";
import { t as syncQuizToLeaderboard } from "./sync-score-C_3RPUr4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz-B4fy9O41.js
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
		id: "vocab-kana",
		label: "Từ → kana"
	},
	{
		id: "type-romaji",
		label: "Gõ romaji"
	},
	{
		id: "cloze",
		label: "Điền câu"
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
	if (q.kind === "kanji" || q.kind === "kanji-read" || q.kind === "listen-kanji") return {
		id: q.sourceId,
		type: "kanji"
	};
	if (q.kind === "vocab-meaning" || q.kind === "meaning-vocab" || q.kind === "listen-vocab" || q.kind === "vocab-kana" || q.kind === "cloze") return {
		id: q.sourceId,
		type: "vocab"
	};
	if (q.kind === "grammar" || q.kind === "particle") return {
		id: q.sourceId,
		type: "grammar"
	};
	return {
		id: q.sourceId,
		type: "kana"
	};
}
function Page() {
	const [kind, setKind] = (0, import_react.useState)("mix");
	const [q, setQ] = (0, import_react.useState)(null);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	const usedRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const scoreRef = (0, import_react.useRef)(0);
	const countRef = (0, import_react.useRef)(0);
	const savedRef = (0, import_react.useRef)({
		score: 0,
		count: 0
	});
	const log = useProgress((s) => s.logStudy);
	const mark = useProgress((s) => s.mark);
	const streak = useProgress((s) => s.streak);
	const user = useCurrentUser();
	function spawn(nextKind = kind) {
		const next = nextQuestion(nextKind, usedRef.current);
		setQ(next);
		return next;
	}
	(0, import_react.useEffect)(() => {
		usedRef.current = /* @__PURE__ */ new Set();
		scoreRef.current = 0;
		countRef.current = 0;
		savedRef.current = {
			score: 0,
			count: 0
		};
		setScore(0);
		setIndex(0);
		setDone(false);
		spawn(kind);
	}, [kind]);
	async function persistDelta(minutes) {
		const dCount = countRef.current - savedRef.current.count;
		const dScore = scoreRef.current - savedRef.current.score;
		if (dCount <= 0) return;
		savedRef.current = {
			score: scoreRef.current,
			count: countRef.current
		};
		await addQuizResult({
			id: uid("quiz"),
			at: Date.now(),
			kind,
			score: dScore,
			total: dCount,
			durationMs: 0
		});
		await log(dCount, minutes);
		await syncQuizToLeaderboard({
			score: dScore,
			total: dCount,
			minutes,
			streak,
			displayName: user?.displayName
		});
	}
	async function finish() {
		await persistDelta(Math.max(1, Math.round((countRef.current - savedRef.current.count) * .3)));
		setDone(true);
	}
	async function checkpointIfNeeded() {
		if (countRef.current === 0 || countRef.current % 10 !== 0) return;
		await persistDelta(3);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "試験",
			title: "Quiz",
			description: "Câu hỏi mới liên tục, không lặp ngay. Gõ đáp án hoặc chọn. Kết thúc khi bạn muốn — điểm tự lưu mỗi 10 câu."
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
						children: "Kết quả phiên này"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-4xl font-semibold tabular-nums",
						children: [
							score,
							"/",
							countRef.current || 0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: countRef.current ? `${Math.round(score / Math.max(1, countRef.current) * 100)}% đúng` : "Chưa trả lời câu nào"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						onClick: () => {
							usedRef.current = /* @__PURE__ */ new Set();
							scoreRef.current = 0;
							countRef.current = 0;
							savedRef.current = {
								score: 0,
								count: 0
							};
							setScore(0);
							setIndex(0);
							setDone(false);
							spawn(kind);
						},
						children: "Luyện tiếp"
					})
				]
			})
		}) : q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizCard, {
				q,
				index,
				total: 0,
				score,
				fillKind: Boolean(q.typedAnswers?.length),
				onAnswer: (ok) => {
					countRef.current += 1;
					if (ok) {
						scoreRef.current += 1;
						setScore(scoreRef.current);
					}
					const srs = srsOf(q);
					mark(srs.id, srs.type, ok ? "good" : "forgot");
					checkpointIfNeeded();
				},
				onNext: () => {
					setIndex((x) => x + 1);
					spawn(kind);
				},
				nextLabel: "Câu tiếp"
			}, q.id), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex max-w-lg justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => void finish(),
					children: "Kết thúc phiên"
				})
			})]
		}) : null
	] });
}
//#endregion
export { Page as component };
