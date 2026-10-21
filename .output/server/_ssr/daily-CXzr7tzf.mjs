import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as stageKicker, l as stageLabel } from "./path-stages-Cie-poLX.mjs";
import { c as practiceKanji } from "./kanji-set-B5ykdYH_.mjs";
import { t as VOCAB_N5 } from "./vocabulary-n5-DDorjkhE.mjs";
import { t as VOCAB_N4 } from "./vocabulary-n4-CVIZPi7y.mjs";
import { a as todayKey, o as uid, r as isBrowser, t as cn } from "./utils-XG3oJXDV.mjs";
import { t as Button } from "./button-Dt7wwSQI.mjs";
import { t as useCurrentUser } from "./use-current-user-ClOiUQ-z.mjs";
import { b as Lock } from "../_libs/lucide-react.mjs";
import { n as useSettings } from "./settings-_aQHY0Mw.mjs";
import { a as useProgress, i as pathStageAccess } from "./progress-CIocZrv7.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { n as CardContent, t as Card } from "./card-D1pZ1BiI.mjs";
import { t as Progress } from "./progress-Dt2T4DqM.mjs";
import { t as DynamicLink } from "./dynamic-link-0Accw2NR.mjs";
import { t as SpeakButton } from "./speak-button-CukGzBix.mjs";
import { r as syncQuizToLeaderboard } from "./sync-score-06pwS3pC.mjs";
import { a as makeFromKinds, i as makeDailyVocabQuiz, n as makeDailyKanjiQuiz, o as makeQuiz, r as makeDailyQuiz, t as QuizCard } from "./quiz-engine-BRlYuq57.mjs";
import { t as FlashcardDeck } from "./flashcard-deck-D-bXiLWr.mjs";
import { t as Badge } from "./badge-BshL6Y_S.mjs";
import { i as kanjiFurigana } from "./on-kun-BtzNpcc7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/daily-CXzr7tzf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CORPUS = [...VOCAB_N5, ...VOCAB_N4];
function dayNumber$1(date) {
	const [y, m, d] = date.split("-").map(Number);
	return Math.floor(Date.UTC(y ?? 2026, (m ?? 1) - 1, d ?? 1) / 864e5);
}
function knownTier$1(srs, id) {
	const it = srs?.[id];
	if (!it || it.correct + it.incorrect === 0) return 0;
	if (it.correct < 2) return 1;
	return 2;
}
/** 8 từ mới mỗi ngày, xoay N5→N4. Bỏ từ đã thuộc rồi lấy từ tiếp theo trong chu kỳ. */
function dailyVocabPack(date, srs, count = 8) {
	const n = CORPUS.length;
	if (!n) return [];
	const start = dayNumber$1(date) % n * count % n;
	const ordered = [];
	for (let i = 0; i < n; i++) ordered.push(CORPUS[(start + i) % n]);
	const picked = [];
	const used = /* @__PURE__ */ new Set();
	for (const tier of [
		0,
		1,
		2
	]) for (const v of ordered) {
		if (picked.length >= count) return picked;
		if (used.has(v.id)) continue;
		if (knownTier$1(srs, v.id) !== tier) continue;
		picked.push(v);
		used.add(v.id);
	}
	return picked;
}
function dayNumber(date) {
	const [y, m, d] = date.split("-").map(Number);
	return Math.floor(Date.UTC(y ?? 2026, (m ?? 1) - 1, d ?? 1) / 864e5);
}
function knownTier(srs, id) {
	const it = srs?.[id];
	if (!it || it.correct + it.incorrect === 0) return 0;
	if (it.correct < 2) return 1;
	return 2;
}
/** 6 kanji mới mỗi ngày, N5 trước rồi N4. Chữ đã thuộc thì nhảy sang chữ kế. */
function dailyKanjiPack(date, srs, count = 6) {
	const corpus = practiceKanji();
	const n = corpus.length;
	if (!n) return [];
	const start = dayNumber(date) % n * count % n;
	const ordered = [];
	for (let i = 0; i < n; i++) ordered.push(corpus[(start + i) % n]);
	const picked = [];
	const used = /* @__PURE__ */ new Set();
	for (const tier of [
		0,
		1,
		2
	]) for (const k of ordered) {
		if (picked.length >= count) return picked;
		if (used.has(k.id)) continue;
		if (knownTier(srs, k.id) !== tier) continue;
		picked.push(k);
		used.add(k.id);
	}
	return picked;
}
var PATH_REVIEW = [
	{
		stage: "nền tảng",
		blurb: "Nguyên âm và 50 âm cơ bản ↔ romaji.",
		count: 10,
		kinds: ["hira-romaji", "romaji-hira"],
		kanjiLevel: "core",
		pool: {
			kanaGroup: "gojuon",
			vocabLevel: "N5",
			grammarLevel: "N5"
		}
	},
	{
		stage: "hiragana",
		blurb: "あ → a, a → あ, nghe chữ — gồm dakuten và yōon.",
		count: 12,
		kinds: [
			"hira-romaji",
			"romaji-hira",
			"listen"
		],
		kanjiLevel: "core",
		pool: {
			kanaGroup: "all",
			vocabLevel: "N5",
			grammarLevel: "N5"
		}
	},
	{
		stage: "katakana",
		blurb: "カタカナ: ア → a, từ mượn, tên riêng.",
		count: 12,
		kinds: ["kata-romaji"],
		kanjiLevel: "core",
		pool: { kanaGroup: "all" }
	},
	{
		stage: "giao tiếp",
		blurb: "Từ vựng N5: chào, số, nhà, trường, ăn — nghĩa và nghe.",
		count: 12,
		kinds: [
			"vocab-meaning",
			"meaning-vocab",
			"listen-vocab",
			"cloze"
		],
		kanjiLevel: "N5",
		pool: { vocabLevel: "N5" }
	},
	{
		stage: "kanji",
		blurb: "Kanji N5–N4: Hán-Việt, nghĩa, on/kun, bộ thủ.",
		count: 12,
		kinds: [
			"kanji",
			"kanji-read",
			"listen-kanji",
			"radical"
		],
		kanjiLevel: "core",
		pool: {},
		subLevels: [
			{
				id: "N5",
				label: "N5"
			},
			{
				id: "N4",
				label: "N4"
			},
			{
				id: "core",
				label: "N5+N4"
			}
		]
	},
	{
		stage: "từ vựng",
		blurb: "Từ N4 trong cụm: nghĩa, kana, điền câu.",
		count: 12,
		kinds: [
			"vocab-meaning",
			"meaning-vocab",
			"vocab-kana",
			"cloze"
		],
		kanjiLevel: "N4",
		pool: { vocabLevel: "N4" }
	},
	{
		stage: "ngữ pháp",
		blurb: "Trợ từ và mẫu câu N5–N4.",
		count: 12,
		kinds: ["grammar", "particle"],
		kanjiLevel: "core",
		pool: { grammarLevel: "both" }
	},
	{
		stage: "đọc",
		blurb: "Điền từ vào câu, nhận từ trong ngữ cảnh.",
		count: 12,
		kinds: [
			"cloze",
			"meaning-vocab",
			"vocab-kana"
		],
		kanjiLevel: "core",
		pool: { vocabLevel: "both" }
	},
	{
		stage: "nghe",
		blurb: "Nghe chữ, từ N5, kanji N5.",
		count: 12,
		kinds: [
			"listen",
			"listen-vocab",
			"listen-kanji"
		],
		kanjiLevel: "N5",
		pool: {
			vocabLevel: "N5",
			kanaGroup: "all"
		}
	},
	{
		stage: "kiểm tra",
		blurb: "Trộn N5–N4: chữ, từ, kanji, nghe, ngữ pháp.",
		count: 12,
		kinds: [],
		kanjiLevel: "core",
		pool: {}
	},
	{
		stage: "nâng cao",
		blurb: "Kanji N3 → N1 theo bài, Hán-Việt vẫn là neo.",
		count: 12,
		kinds: [
			"kanji",
			"kanji-read",
			"listen-kanji"
		],
		kanjiLevel: "N3",
		pool: {},
		subLevels: [
			{
				id: "N3",
				label: "N3"
			},
			{
				id: "N2",
				label: "N2"
			},
			{
				id: "N1",
				label: "N1"
			},
			{
				id: "all",
				label: "N5→N1"
			}
		]
	}
];
function pathReviewOf(stage) {
	return PATH_REVIEW.find((t) => t.stage === stage);
}
function makePathReview(stage, kanjiLevel, count, rand = Math.random) {
	const track = pathReviewOf(stage);
	if (!track) return [];
	const n = count ?? track.count;
	if (track.stage === "kiểm tra" || track.kinds.length === 0) return makeQuiz("mix", n, rand, kanjiLevel ?? "core");
	const kinds = kanjiLevel === "N3" || kanjiLevel === "N2" || kanjiLevel === "N1" || kanjiLevel === "all" ? track.kinds.filter((k) => k !== "radical") : track.kinds;
	return makeFromKinds(kinds.length ? kinds : track.kinds, n, rand, kanjiLevel ?? track.kanjiLevel, track.pool);
}
function dailyKey(date) {
	return `akari-daily-${date}`;
}
function reviewKey(date, stage, level) {
	return `akari-review-${date}-${stage}${level ? `-${level}` : ""}`;
}
function loadJson(key) {
	if (!isBrowser()) return null;
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (typeof parsed.score === "number" && typeof parsed.total === "number") return parsed;
	} catch {}
	return null;
}
function saveJson(key, value) {
	if (!isBrowser()) return;
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {}
}
function srsOf(q) {
	if (q.kind === "kanji" || q.kind === "kanji-read" || q.kind === "listen-kanji" || q.kind === "radical") return {
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
function trackTitle(track) {
	if (track.id === "daily") return track.practice ? "Luyện thêm bài hôm nay" : "Bài tập hôm nay";
	if (track.id === "vocab-learn") return "Từ vựng hôm nay";
	if (track.id === "vocab-test") return "Kiểm tra từ hôm nay";
	if (track.id === "kanji-learn") return "Kanji hôm nay";
	if (track.id === "kanji-test") return "Kiểm tra kanji hôm nay";
	const sub = track.kanjiLevel ? ` · ${track.kanjiLevel === "core" ? "N5+N4" : track.kanjiLevel === "all" ? "N5→N1" : track.kanjiLevel}` : "";
	return `Ôn ${stageLabel(track.stage)}${sub}`;
}
function persistKey(date, track) {
	if (track.id === "daily") return dailyKey(date);
	if (track.id === "vocab-learn" || track.id === "vocab-test") return reviewKey(date, "vocab");
	if (track.id === "kanji-learn" || track.id === "kanji-test") return reviewKey(date, "kanji");
	return reviewKey(date, track.stage, track.kanjiLevel);
}
function Page() {
	const date = todayKey();
	const dailyQs = (0, import_react.useMemo)(() => makeDailyQuiz(date, 15), [date]);
	const [track, setTrack] = (0, import_react.useState)(null);
	const [round, setRound] = (0, import_react.useState)(0);
	const [i, setI] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [qs, setQs] = (0, import_react.useState)([]);
	const scoreRef = (0, import_react.useRef)(0);
	const [saved, setSaved] = (0, import_react.useState)(() => loadJson(dailyKey(date)));
	const [done, setDone] = (0, import_react.useState)(null);
	const log = useProgress((s) => s.logStudy);
	const mark = useProgress((s) => s.mark);
	const recordQuiz = useProgress((s) => s.recordQuiz);
	const syncPath = useProgress((s) => s.syncPathFromStudy);
	const streak = useProgress((s) => s.streak);
	const completed = useProgress((s) => s.completedLessonIds);
	const srs = useProgress((s) => s.srs);
	const freeMode = useSettings((s) => s.freeMode);
	const showRomaji = useSettings((s) => s.showRomaji);
	const user = useCurrentUser();
	const access = (0, import_react.useMemo)(() => pathStageAccess(completed, freeMode), [completed, freeMode]);
	const vocabPack = (0, import_react.useMemo)(() => dailyVocabPack(date, srs), [date, srs]);
	const kanjiPack = (0, import_react.useMemo)(() => dailyKanjiPack(date, srs), [date, srs]);
	const vocabSaved = loadJson(reviewKey(date, "vocab"));
	const kanjiSaved = loadJson(reviewKey(date, "kanji"));
	const vocabCards = (0, import_react.useMemo)(() => vocabPack.map((v) => ({
		id: v.id,
		front: v.word,
		back: v.meaning_vi,
		extra: `${v.kana}${showRomaji ? ` · ${v.romaji}` : ""} · ${v.level}`,
		speak: v.kana,
		type: "vocab",
		answers: [
			v.meaning_vi,
			v.kana,
			v.romaji
		],
		answerHint: "Gõ nghĩa Việt, kana hoặc romaji"
	})), [vocabPack, showRomaji]);
	const kanjiCards = (0, import_react.useMemo)(() => kanjiPack.map((k) => {
		const yomi = kanjiFurigana(k);
		return {
			id: k.id,
			front: k.character,
			back: `${k.han_viet ? `${k.han_viet} · ` : ""}${k.meaning_vi}`,
			extra: `${yomi.line || "—"} · ${k.level}`,
			speak: yomi.kun || yomi.on || k.character,
			type: "kanji",
			answers: [
				k.meaning_vi,
				k.han_viet,
				yomi.kun,
				yomi.on
			].filter(Boolean),
			answerHint: "Gõ nghĩa, Hán-Việt hoặc hiragana"
		};
	}), [kanjiPack]);
	const q = qs[i];
	function questionsFor(next) {
		if (next.id === "daily") return dailyQs;
		if (next.id === "vocab-learn" || next.id === "kanji-learn") return [];
		if (next.id === "vocab-test") return makeDailyVocabQuiz(vocabPack.map((v) => v.id), date);
		if (next.id === "kanji-test") return makeDailyKanjiQuiz(kanjiPack.map((k) => k.id), date);
		return makePathReview(next.stage, next.kanjiLevel);
	}
	function start(next) {
		scoreRef.current = 0;
		setQs(questionsFor(next));
		setTrack(next);
		setRound((n) => n + 1);
		setI(0);
		setScore(0);
		setDone(null);
	}
	async function finish(nextScore) {
		const total = qs.length;
		const result = {
			score: nextScore,
			total
		};
		setDone(result);
		if (track) saveJson(persistKey(date, track), result);
		if (track?.id === "daily" && !track.practice) setSaved(result);
		try {
			await recordQuiz({
				id: uid(track?.id === "path" ? track.stage : track?.id === "vocab-test" ? "vocab" : track?.id === "kanji-test" ? "kanji" : "daily"),
				at: Date.now(),
				kind: track?.id === "daily" && !track.practice ? "daily" : track?.id === "vocab-test" ? "daily-vocab" : track?.id === "kanji-test" ? "daily-kanji" : track?.id === "path" ? `path-${track.stage}` : "daily-practice",
				score: nextScore,
				total,
				durationMs: 0
			});
			await log(total, track?.id === "daily" && !track.practice ? 8 : 5);
			if (track?.id === "daily" && !track.practice) await syncQuizToLeaderboard({
				score: nextScore,
				total,
				minutes: 8,
				streak,
				dailyScore: nextScore,
				displayName: user?.displayName
			});
			await syncPath();
		} catch (err) {
			console.error("[daily] không lưu được kết quả:", err);
		}
	}
	if (track?.id === "vocab-learn") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "単語",
			title: "Từ vựng hôm nay",
			description: `${vocabPack.length} từ mới ngày ${date}. Lật thẻ, nhớ rồi kiểm tra.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "secondary",
				onClick: () => setTrack(null),
				children: "Về bài hôm nay"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: () => start({ id: "vocab-test" }),
				children: "Kiểm tra"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlashcardDeck, {
			cards: vocabCards,
			sessionKey: `daily-vocab-${date}-${round}`,
			doneExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => start({ id: "vocab-test" }),
				children: "Sang kiểm tra"
			})
		})
	] });
	if (track?.id === "kanji-learn") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "漢字",
			title: "Kanji hôm nay",
			description: `${kanjiPack.length} chữ mới ngày ${date}. Nhớ Hán-Việt, hiragana, rồi kiểm tra.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "secondary",
				onClick: () => setTrack(null),
				children: "Về bài hôm nay"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: () => start({ id: "kanji-test" }),
				children: "Kiểm tra"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlashcardDeck, {
			cards: kanjiCards,
			sessionKey: `daily-kanji-${date}-${round}`,
			doneExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => start({ id: "kanji-test" }),
				children: "Sang kiểm tra"
			})
		})
	] });
	if (track && done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "今日",
		title: trackTitle(track),
		description: `Đã lưu ${done.score}/${done.total}.`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "mx-auto max-w-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "py-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-4xl font-semibold tabular-nums",
					children: [
						done.score,
						"/",
						done.total
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [Math.round(done.score / Math.max(1, done.total) * 100), "% đúng"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap justify-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => start(track),
							children: "Ôn lại"
						}),
						track.id === "vocab-test" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => start({ id: "vocab-learn" }),
							children: "Học lại thẻ"
						}) : null,
						track.id === "kanji-test" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => start({ id: "kanji-learn" }),
							children: "Học lại chữ"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => setTrack(null),
							children: "Chọn chặng khác"
						})
					]
				})
			]
		})
	})] });
	if (track && q) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "今日",
			title: trackTitle(track),
			description: track.id === "daily" ? track.practice ? "Cùng đề hôm nay — vẫn lưu điểm ôn." : "15 câu trộn chữ, từ, kanji, nghe, trợ từ, ngữ pháp." : track.id === "vocab-test" ? "Kiểm tra đúng 8 từ hôm nay: nghĩa, kana, nghe." : track.id === "kanji-test" ? "Kiểm tra đúng 6 chữ hôm nay: nghĩa, cách đọc, nghe." : pathReviewOf(track.stage)?.blurb ?? "Câu random theo chặng lộ trình."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "secondary",
				onClick: () => setTrack(null),
				children: "Đổi chặng"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizCard, {
			q,
			index: i,
			total: qs.length,
			score,
			fillKind: Boolean(q.typedAnswers?.length),
			onAnswer: (ok) => {
				setScore((s) => {
					const n = s + (ok ? 1 : 0);
					scoreRef.current = n;
					return n;
				});
				if (track.id === "path" || track.id === "vocab-test" || track.id === "kanji-test") {
					const srsItem = srsOf(q);
					mark(srsItem.id, srsItem.type, ok ? "good" : "forgot");
				}
			},
			onNext: () => {
				if (i + 1 >= qs.length) finish(scoreRef.current);
				else setI((x) => x + 1);
			}
		}, `${round}-${i}`)
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "今日",
			title: "Bài hôm nay",
			description: "Mỗi ngày: kanji mới, từ vựng mới, đề 15 câu, rồi ôn đúng chặng lộ trình."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-medium uppercase tracking-wide text-muted",
						children: ["Đề ngày ", date]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium text-fg",
						children: "15 câu tổng hợp"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Chữ, từ, kanji, nghe, trợ từ, ngữ pháp — đề chung mọi người."
					}),
					saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-2xl font-semibold tabular-nums",
								children: [
									saved.score,
									"/",
									saved.total
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => start({
									id: "daily",
									practice: true
								}),
								children: "Luyện thêm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/leaderboard",
									children: "Thi đua"
								})
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => start({
							id: "daily",
							practice: false
						}),
						children: "Làm bài hôm nay"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-medium uppercase tracking-wide text-muted",
								children: ["Kanji ngày ", date]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-medium text-fg",
								children: [kanjiPack.length, " chữ mới hôm nay"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Đổi bộ mỗi ngày (N5 trước). Học thẻ rồi kiểm tra đúng những chữ này."
							})
						] }), kanjiSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm tabular-nums text-muted",
							children: [
								"Test: ",
								kanjiSaved.score,
								"/",
								kanjiSaved.total
							]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
						children: kanjiPack.map((k) => {
							const yomi = kanjiFurigana(k);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start justify-between gap-2 rounded-[10px] border border-border bg-bg-elevated px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicLink, {
												to: `/kanji/${k.id}`,
												className: "font-jp text-3xl text-fg hover:underline",
												children: k.character
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "muted",
												children: k.level
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-jp text-sm text-muted",
											children: yomi.line || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-fg",
											children: [k.han_viet ? `${k.han_viet} · ` : "", k.meaning_vi]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
									text: yomi.kun || yomi.on || k.character,
									kana: yomi.kun || yomi.on,
									label: "Nghe"
								})]
							}, k.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => start({ id: "kanji-learn" }),
							children: "Học 6 chữ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => start({ id: "kanji-test" }),
							children: "Kiểm tra"
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-medium uppercase tracking-wide text-muted",
								children: ["Từ vựng ngày ", date]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-medium text-fg",
								children: [vocabPack.length, " từ mới hôm nay"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Đổi bộ mỗi ngày (N5→N4). Học thẻ rồi kiểm tra đúng những từ này."
							})
						] }), vocabSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm tabular-nums text-muted",
							children: [
								"Test: ",
								vocabSaved.score,
								"/",
								vocabSaved.total
							]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-2 sm:grid-cols-2",
						children: vocabPack.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start justify-between gap-2 rounded-[10px] border border-border bg-bg-elevated px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicLink, {
											to: `/vocabulary/${v.id}`,
											className: "font-jp text-lg text-fg hover:underline",
											children: v.word
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "muted",
											children: v.level
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-jp text-sm text-muted",
										children: v.kana
									}),
									showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-accent",
										children: v.romaji
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-fg",
										children: v.meaning_vi
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
								text: v.kana,
								kana: v.kana,
								label: "Nghe"
							})]
						}, v.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => start({ id: "vocab-learn" }),
							children: "Học 8 từ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => start({ id: "vocab-test" }),
							children: "Kiểm tra"
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-display text-xl font-semibold",
			children: "Ôn theo lộ trình"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 max-w-2xl text-sm text-muted",
			children: "Chỉ mở chặng đang học và các chặng đã xong. Chặng sau khóa đến khi bạn hoàn thành chặng trước (hoặc bật chế độ tự do trên Lộ trình)."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-3",
			children: PATH_REVIEW.map((rev, idx) => {
				const st = access[rev.stage];
				const pct = st?.total ? Math.round((st.doneCount ?? 0) / st.total * 100) : 0;
				const open = Boolean(st?.open);
				const last = loadJson(reviewKey(date, rev.stage));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: cn(st?.current && "ring-1 ring-primary/40", !open && "opacity-60"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-3 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
										children: [
											idx + 1,
											". ",
											stageKicker(rev.stage),
											st?.complete ? " · đã xong" : st?.current ? " · đang học" : open ? "" : " · chưa mở"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-medium text-fg",
										children: stageLabel(rev.stage)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: rev.blurb
									}),
									last ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm tabular-nums text-muted",
										children: [
											"Ôn hôm nay: ",
											last.score,
											"/",
											last.total
										]
									}) : null
								] }), st && st.total > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm tabular-nums text-muted",
									children: [
										st.doneCount,
										"/",
										st.total,
										" bài"
									]
								}) : null]
							}),
							st && st.total > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: pct }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: open ? rev.subLevels?.length ? rev.subLevels.map((lv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: lv.id === rev.kanjiLevel ? "default" : "secondary",
									onClick: () => start({
										id: "path",
										stage: rev.stage,
										kanjiLevel: lv.id
									}),
									children: ["Ôn ", lv.label]
								}, lv.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => start({
										id: "path",
										stage: rev.stage
									}),
									children: [
										"Ôn ",
										rev.count,
										" câu"
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "secondary",
									disabled: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5" }), "Học xong chặng trước"]
								})
							})
						]
					})
				}) }, rev.stage);
			})
		})
	] });
}
//#endregion
export { Page as component };
