import { o as journeyGroups, r as PATH_STAGES, t as LESSONS } from "./path-stages-Cie-poLX.mjs";
import { n as KATAKANA, t as HIRAGANA } from "./kana-CV-aAiLY.mjs";
import { a as todayKey } from "./utils-XG3oJXDV.mjs";
import { C as toggleFavorite, S as setMeta, b as removeMyWord, c as allSrs, f as completeLesson, h as getMeta, i as allFavorites, l as bumpDayStats, n as addQuizResult, o as allMyWords, p as completedLessons, r as allDayStats, s as allQuizResults, t as addMyWord, y as putSrs } from "./storage-LIImtsUk.mjs";
import { n as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-CIocZrv7.js
/** Simplified SM-2. quality: 0 forget, 3 hard, 4 good, 5 easy */
function reviewSrs(item, quality, now = Date.now()) {
	const next = {
		...item,
		lastStudied: now
	};
	if (quality < 3) {
		next.incorrect += 1;
		next.repetitions = 0;
		next.interval = .01;
		next.leitnerBox = Math.max(1, next.leitnerBox - 1);
		next.status = "learning";
		next.nextReview = now + 6e5;
	} else {
		next.correct += 1;
		if (next.repetitions === 0) next.interval = 1;
		else if (next.repetitions === 1) next.interval = 3;
		else next.interval = Math.round(next.interval * next.ease);
		next.repetitions += 1;
		next.leitnerBox = Math.min(5, next.leitnerBox + 1);
		if (next.repetitions >= 5 && next.ease >= 2.4) next.status = "mastered";
		else next.status = "review";
		next.nextReview = now + next.interval * 24 * 60 * 60 * 1e3;
	}
	const q = quality;
	next.ease = Math.max(1.3, next.ease + (.1 - (5 - q) * (.08 + (5 - q) * .02)));
	return next;
}
function newSrsItem(id, itemType) {
	return {
		id,
		itemType,
		lastStudied: 0,
		correct: 0,
		incorrect: 0,
		ease: 2.5,
		interval: 0,
		repetitions: 0,
		nextReview: 0,
		status: "new",
		leitnerBox: 1
	};
}
function isDue(item, now = Date.now()) {
	return item.nextReview <= now;
}
function qualityFromLabel(label) {
	if (label === "forgot") return 0;
	if (label === "hard") return 3;
	if (label === "easy") return 5;
	return 4;
}
var HIRA_ROW = /^l-n5-hira-(a|ka|sa|ta|na|ha|ma|ya)$/;
function kanaRowIds(kind, row) {
	return (kind === "h" ? HIRAGANA : KATAKANA).filter((k) => k.row === row && (k.group === "gojuon" || k.group === "dakuten" || k.group === "handakuten")).map((k) => k.id);
}
function studied(srs, id) {
	const it = srs[id];
	return Boolean(it && it.correct > 0);
}
function enough(hit, total) {
	if (total <= 0) return false;
	if (total <= 2) return hit >= total;
	if (total <= 8) return hit >= Math.ceil(total * .75);
	return hit >= Math.ceil(total * .5);
}
/** SRS / practice ids that count as “đã học” cho một bài lộ trình. */
function practiceIdsForLesson(lesson, seen = /* @__PURE__ */ new Set()) {
	if (seen.has(lesson.id)) return [];
	seen.add(lesson.id);
	const ids = /* @__PURE__ */ new Set();
	const row = lesson.id.match(HIRA_ROW)?.[1];
	if (row) for (const id of kanaRowIds("h", row)) ids.add(id);
	if (lesson.id === "l-n5-hira") {
		for (const k of HIRAGANA) if (k.group === "gojuon" || k.group === "dakuten" || k.group === "handakuten" || k.group === "yoon") ids.add(k.id);
	}
	if (lesson.id === "l-n5-kata") {
		for (const k of KATAKANA) if (k.group === "gojuon") ids.add(k.id);
	}
	for (const id of lesson.practiceIds ?? []) if (id.startsWith("l-")) {
		const nested = LESSONS.find((l) => l.id === id);
		if (nested) for (const x of practiceIdsForLesson(nested, seen)) ids.add(x);
	} else ids.add(id);
	return [...ids];
}
function lessonSatisfiedByStudy(lesson, srs, completed) {
	if (completed.has(lesson.id)) return true;
	if (lesson.id === "l-n5-hira") {
		const rows = LESSONS.filter((l) => /^l-n5-hira-/.test(l.id));
		if (rows.length && rows.every((l) => completed.has(l.id) || lessonSatisfiedByStudy(l, srs, completed))) return true;
	}
	const ids = practiceIdsForLesson(lesson);
	if (!ids.length) return false;
	const hit = ids.filter((id) => studied(srs, id)).length;
	return enough(hit, ids.length);
}
function lessonsReadyToComplete(srs, completed) {
	const done = completed instanceof Set ? completed : new Set(completed);
	return LESSONS.filter((l) => !done.has(l.id) && lessonSatisfiedByStudy(l, srs, done)).map((l) => l.id);
}
/** Mở ôn đúng thứ tự lộ trình: chặng trước xong thì mới mở chặng sau. */
function pathStageAccess(completed, freeMode = false) {
	const done = completed instanceof Set ? completed : new Set(completed);
	const { sorted, groups } = journeyGroups();
	const access = {};
	let foundCurrent = false;
	for (const g of groups) {
		const total = g.items.length;
		const doneCount = g.items.filter((l) => done.has(l.id)).length;
		const first = g.items[0];
		const idx = first ? sorted.findIndex((l) => l.id === first.id) : 0;
		const prevDone = idx <= 0 || done.has(sorted[idx - 1].id);
		const complete = total > 0 && doneCount >= total;
		const open = freeMode || prevDone || doneCount > 0;
		const current = !foundCurrent && open && !complete;
		if (current) foundCurrent = true;
		access[g.stage] = {
			open,
			current,
			complete,
			doneCount,
			total
		};
	}
	for (const s of PATH_STAGES) if (!access[s.id]) access[s.id] = {
		open: freeMode,
		current: false,
		complete: false,
		doneCount: 0,
		total: 0
	};
	return access;
}
function computeStreak(last, stored) {
	if (!last) return 0;
	if (last === todayKey()) return stored || 1;
	const y = /* @__PURE__ */ new Date();
	y.setDate(y.getDate() - 1);
	if (last === todayKey(y)) return stored || 1;
	return 0;
}
function upsertDay(days, day) {
	const i = days.findIndex((d) => d.date === day.date);
	if (i < 0) return [...days, day];
	const next = [...days];
	next[i] = day;
	return next;
}
var useProgress = create((set, get) => ({
	ready: false,
	srs: {},
	favorites: /* @__PURE__ */ new Set(),
	myWords: /* @__PURE__ */ new Set(),
	completedLessonIds: /* @__PURE__ */ new Set(),
	streak: 0,
	lastStudyDate: null,
	today: null,
	days: [],
	quizScores: [],
	load: async () => {
		try {
			const [srsList, favs, mine, lessons, last, streak, days, quizzes] = await Promise.all([
				allSrs(),
				allFavorites(),
				allMyWords(),
				completedLessons(),
				getMeta("lastStudyDate"),
				getMeta("streak"),
				allDayStats(),
				allQuizResults()
			]);
			const map = {};
			for (const item of srsList) map[item.id] = item;
			const today = days.find((d) => d.date === todayKey()) ?? null;
			set({
				ready: true,
				srs: map,
				favorites: new Set(favs.map((f) => f.id)),
				myWords: new Set(mine.map((m) => m.id)),
				completedLessonIds: new Set(lessons.map((l) => l.id)),
				lastStudyDate: last ?? null,
				streak: computeStreak(last ?? null, streak ?? 0),
				today,
				days,
				quizScores: quizzes.map((q) => ({
					score: q.score,
					total: q.total
				}))
			});
			await get().syncPathFromStudy();
		} catch {
			set({ ready: true });
		}
	},
	mark: async (id, itemType, label) => {
		const next = reviewSrs(get().srs[id] ?? newSrsItem(id, itemType), qualityFromLabel(label));
		set((s) => ({ srs: {
			...s.srs,
			[id]: next
		} }));
		try {
			await putSrs(next);
		} catch (err) {
			console.error("[srs] không ghi được IndexedDB:", err);
		}
		try {
			await get().logStudy(1, .4);
		} catch (err) {
			console.error("[srs] không ghi được buổi học:", err);
		}
		get().syncPathFromStudy();
	},
	remember: async (id, itemType) => get().mark(id, itemType, "good"),
	forgot: async (id, itemType) => get().mark(id, itemType, "forgot"),
	logStudy: async (items = 1, minutes = .5) => {
		const today = todayKey();
		const prev = get().lastStudyDate;
		let streak = get().streak;
		if (prev !== today) {
			const y = /* @__PURE__ */ new Date();
			y.setDate(y.getDate() - 1);
			streak = prev === todayKey(y) ? streak + 1 : 1;
			await setMeta("lastStudyDate", today);
			await setMeta("streak", streak);
		}
		const day = await bumpDayStats({
			items,
			minutes
		}, today);
		set((s) => ({
			lastStudyDate: today,
			streak,
			today: day,
			days: upsertDay(s.days, day)
		}));
		const snap = get();
		import("./sync-R8_fGbj6.mjs").then((n) => n.o).then((n) => n.n).then(({ scheduleGardenSync }) => scheduleGardenSync({
			srs: snap.srs,
			completedLessonIds: snap.completedLessonIds,
			streak: snap.streak,
			lastStudyDate: snap.lastStudyDate
		}));
		import("./events-DdCXtDE2.mjs").then((n) => n.t).then((n) => n.t).then(({ gardenEvents }) => gardenEvents.emit("wordLearned", { count: Object.values(snap.srs).filter((x) => x.correct + x.incorrect > 0).length }));
	},
	completeLesson: async (id) => {
		await completeLesson(id);
		set((s) => {
			const next = new Set(s.completedLessonIds);
			next.add(id);
			return { completedLessonIds: next };
		});
		await get().logStudy(3, 5);
		import("./sync-path-Rkd12nv7.mjs").then(({ syncPathProgress }) => syncPathProgress([...get().completedLessonIds]));
		import("./events-DdCXtDE2.mjs").then((n) => n.t).then((n) => n.t).then(({ gardenEvents }) => gardenEvents.emit("lessonCompleted", { lessonId: id }));
	},
	recordQuiz: async (result) => {
		await addQuizResult(result);
		set((s) => ({ quizScores: [...s.quizScores, {
			score: result.score,
			total: result.total
		}] }));
	},
	/** Đánh dấu bài lộ trình hoàn thành khi đã học đủ chữ/từ trong bài — không cộng thêm phút. */
	syncPathFromStudy: async () => {
		const ready = lessonsReadyToComplete(get().srs, get().completedLessonIds);
		if (!ready.length) return;
		for (const id of ready) await completeLesson(id);
		set((s) => {
			const next = new Set(s.completedLessonIds);
			for (const id of ready) next.add(id);
			return { completedLessonIds: next };
		});
		import("./sync-path-Rkd12nv7.mjs").then(({ syncPathProgress }) => syncPathProgress([...get().completedLessonIds]));
		import("./events-DdCXtDE2.mjs").then((n) => n.t).then((n) => n.t).then(({ gardenEvents }) => gardenEvents.emit("lessonCompleted", { lessonId: ready[0] }));
	},
	refreshSets: async () => {
		const [favs, mine] = await Promise.all([allFavorites(), allMyWords()]);
		set({
			favorites: new Set(favs.map((f) => f.id)),
			myWords: new Set(mine.map((m) => m.id))
		});
	},
	toggleFav: async (id, itemType) => {
		const on = await toggleFavorite(id, itemType);
		await get().refreshSets();
		return on;
	},
	addToStudy: async (id, itemType) => {
		if (!get().srs[id]) {
			const item = newSrsItem(id, itemType);
			await putSrs(item);
			set((s) => ({ srs: {
				...s.srs,
				[id]: item
			} }));
		}
		await addMyWord(id, itemType === "vocab" || itemType === "custom" ? "vocab" : "dictionary");
		await get().refreshSets();
	},
	dropMyWord: async (id) => {
		await removeMyWord(id);
		await get().refreshSets();
	}
}));
function masteredCount(srs, prefix) {
	return Object.values(srs).filter((x) => x.id.startsWith(prefix) && (x.status === "mastered" || x.correct >= 2)).length;
}
function learnedCount(srs, prefix) {
	return Object.values(srs).filter((x) => x.id.startsWith(prefix) && x.correct + x.incorrect > 0).length;
}
//#endregion
export { useProgress as a, pathStageAccess as i, learnedCount as n, masteredCount as r, isDue as t };
