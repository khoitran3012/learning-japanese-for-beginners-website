import { a as todayKey } from "./utils-D10sm1uC.mjs";
import { C as toggleFavorite, S as setMeta, b as removeMyWord, c as allSrs, f as completeLesson, h as getMeta, i as allFavorites, l as bumpDayStats, o as allMyWords, p as completedLessons, r as allDayStats, s as allQuizResults, t as addMyWord, y as putSrs } from "./storage-BvOEP3N4.mjs";
import { n as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-Cu0w4vLw.js
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
function computeStreak(last, stored) {
	if (!last) return 0;
	if (last === todayKey()) return stored || 1;
	const y = /* @__PURE__ */ new Date();
	y.setDate(y.getDate() - 1);
	if (last === todayKey(y)) return stored || 1;
	return 0;
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
				quizScores: quizzes.map((q) => ({
					score: q.score,
					total: q.total
				}))
			});
		} catch {
			set({ ready: true });
		}
	},
	mark: async (id, itemType, label) => {
		const next = reviewSrs(get().srs[id] ?? newSrsItem(id, itemType), qualityFromLabel(label));
		await putSrs(next);
		set((s) => ({ srs: {
			...s.srs,
			[id]: next
		} }));
		await get().logStudy(1, .4);
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
		set({
			lastStudyDate: today,
			streak,
			today: day
		});
		const snap = get();
		import("./sync-l6nVZd2N.mjs").then((n) => n.n).then(({ scheduleGardenSync }) => scheduleGardenSync({
			srs: snap.srs,
			completedLessonIds: snap.completedLessonIds,
			streak: snap.streak,
			lastStudyDate: snap.lastStudyDate
		}));
		import("./events-DdCXtDE2.mjs").then((n) => n.t).then(({ gardenEvents }) => gardenEvents.emit("wordLearned", { count: Object.values(snap.srs).filter((x) => x.correct + x.incorrect > 0).length }));
	},
	completeLesson: async (id) => {
		await completeLesson(id);
		set((s) => {
			const next = new Set(s.completedLessonIds);
			next.add(id);
			return { completedLessonIds: next };
		});
		await get().logStudy(3, 5);
		import("./sync-path-Bdoqrc2y.mjs").then(({ syncPathProgress }) => syncPathProgress([...get().completedLessonIds]));
		import("./events-DdCXtDE2.mjs").then((n) => n.t).then(({ gardenEvents }) => gardenEvents.emit("lessonCompleted", { lessonId: id }));
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
export { useProgress as i, learnedCount as n, masteredCount as r, isDue as t };
