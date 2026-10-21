import { n as GARDEN_ITEM_MAP, t as GARDEN_CONFIG } from "./config-BniAcjF_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compute-2znzg32w.js
/** XP chỉ từ hoạt động học thật — sửa số ở đây, không hard-code rải rác. */
var TREE_XP = {
	perKana: 2,
	perVocab: 1,
	perKanji: 2,
	perGrammar: 3,
	perLesson: 15,
	perQuiz: 20,
	quizHighBonus: 10,
	quizHighRatio: .8,
	perStreakDay: 5,
	dailyGoalBonus: 30,
	dailyMinutes: 15,
	dailyItems: 10
};
var TREES = { sakura: {
	id: "sakura",
	name: "Sakura",
	nameJp: "桜",
	blurb: "Cây anh đào của bạn — lớn lên mỗi ngày bạn học.",
	stages: [
		{
			level: 0,
			xp: 0,
			id: "seed",
			name: "Hạt giống",
			nameJp: "種",
			mood: "Đang chờ được tưới"
		},
		{
			level: 1,
			xp: 100,
			id: "sprout",
			name: "Mầm cây",
			nameJp: "芽",
			mood: "Khỏe mạnh"
		},
		{
			level: 2,
			xp: 250,
			id: "young",
			name: "Cây non",
			nameJp: "苗",
			mood: "Đang phát triển"
		},
		{
			level: 3,
			xp: 500,
			id: "small",
			name: "Cây nhỏ",
			nameJp: "若木",
			mood: "Đang phát triển"
		},
		{
			level: 4,
			xp: 900,
			id: "grown",
			name: "Cây trưởng thành",
			nameJp: "木",
			mood: "Khỏe mạnh"
		},
		{
			level: 5,
			xp: 1400,
			id: "flower",
			name: "Bắt đầu ra hoa",
			nameJp: "開花",
			mood: "Đang nở hoa"
		},
		{
			level: 6,
			xp: 2e3,
			id: "sakura",
			name: "Cây Sakura",
			nameJp: "桜",
			mood: "Đang nở hoa"
		},
		{
			level: 7,
			xp: 3e3,
			id: "bloom",
			name: "Sakura nở rộ",
			nameJp: "満開",
			mood: "Nở rộ"
		}
	]
} };
var DEFAULT_TREE = "sakura";
function treeById(id = DEFAULT_TREE) {
	return TREES[id in TREES ? id : DEFAULT_TREE];
}
function stageFromXp(xp, tree = TREES.sakura) {
	let current = tree.stages[0];
	for (const row of tree.stages) if (xp >= row.xp) current = row;
	const next = tree.stages.find((s) => s.level === current.level + 1) ?? null;
	return {
		current,
		next,
		prevXp: current.xp,
		nextXp: next?.xp ?? null
	};
}
function studyXpFrom(input) {
	const r = TREE_XP;
	const quizXp = input.quizzes.reduce((sum, q) => {
		let n = r.perQuiz;
		if (q.total > 0 && q.score / q.total >= r.quizHighRatio) n += r.quizHighBonus;
		return sum + n;
	}, 0);
	return Math.max(0, Math.floor(input.kanaHira * r.perKana + input.kanaKata * r.perKana + input.vocab * r.perVocab + input.kanji * r.perKanji + input.grammar * r.perGrammar + input.lessons * r.perLesson + quizXp + input.streak * r.perStreakDay + input.dailyBonus));
}
function gardenXpFrom(facts) {
	if (facts.kanaHira != null || facts.vocab != null || facts.kanji != null || facts.quizScores != null) return studyXpFrom({
		kanaHira: facts.kanaHira ?? 0,
		kanaKata: facts.kanaKata ?? 0,
		vocab: facts.vocab ?? facts.wordsLearned,
		kanji: facts.kanji ?? 0,
		grammar: facts.grammar ?? 0,
		lessons: facts.lessons,
		quizzes: facts.quizScores ?? Array.from({ length: facts.quizzes }, () => ({
			score: 1,
			total: 1
		})),
		streak: facts.streak,
		dailyBonus: facts.dailyBonus
	});
	const { perWord, perLesson } = GARDEN_CONFIG.xp;
	return Math.max(0, Math.floor(facts.wordsLearned) * perWord + Math.floor(facts.lessons) * perLesson + Math.floor(facts.studyXp) + Math.floor(facts.dailyBonus));
}
function gardenLevelFromXp(xp) {
	const { current, next } = stageFromXp(xp, treeById(DEFAULT_TREE));
	return {
		level: current.level,
		name: current.name,
		nameJp: current.nameJp,
		nextXp: next?.xp ?? null,
		prevXp: current.xp,
		mood: current.mood
	};
}
function unlockedItemIds(facts, xp) {
	const ids = [];
	for (const m of GARDEN_CONFIG.milestones) if ((m.words == null || facts.wordsLearned >= m.words) && (m.lessons == null || facts.lessons >= m.lessons) && (m.streak == null || facts.streak >= m.streak) && (m.quizzes == null || facts.quizzes >= m.quizzes) && (m.xp == null || xp >= m.xp)) ids.push(m.itemId);
	return [...new Set(ids)];
}
function defaultPlacements(unlocked) {
	return unlocked.map((itemId) => {
		const def = GARDEN_ITEM_MAP[itemId];
		return {
			id: `auto-${itemId}`,
			itemId,
			x: def?.x ?? 50,
			y: def?.y ?? 70,
			scale: def?.scale ?? 1
		};
	});
}
function mergePlacements(saved, unlocked) {
	const allowed = new Set(unlocked);
	const kept = saved.filter((p) => allowed.has(p.itemId));
	const have = new Set(kept.map((p) => p.itemId));
	for (const extra of defaultPlacements(unlocked)) if (!have.has(extra.itemId)) kept.push(extra);
	return kept;
}
function buildSnapshot(facts, signedIn) {
	const xp = gardenXpFrom(facts);
	const level = gardenLevelFromXp(xp);
	const unlocked = unlockedItemIds(facts, xp);
	const seen = new Set(facts.seenUnlocks);
	const newUnlocks = unlocked.filter((id) => !seen.has(id)).map((id) => {
		const item = GARDEN_ITEM_MAP[id];
		return {
			id,
			name: item?.name ?? id,
			nameJp: item?.nameJp ?? "",
			category: item?.category ?? "plants"
		};
	});
	const canClaimDaily = facts.lastStudyDate === facts.today && facts.lastDailyDate !== facts.today;
	return {
		signedIn,
		xp,
		level: level.level,
		levelName: level.name,
		levelNameJp: level.nameJp,
		nextLevelXp: level.nextXp,
		prevLevelXp: level.prevXp,
		wordsLearned: facts.wordsLearned,
		lessons: facts.lessons,
		streak: facts.streak,
		quizzes: facts.quizzes,
		dailyBonus: facts.dailyBonus,
		lastDailyDate: facts.lastDailyDate,
		lastStudyDate: facts.lastStudyDate,
		canClaimDaily,
		soundOn: facts.soundOn,
		unlocked,
		newUnlocks,
		placements: mergePlacements(facts.placements, unlocked),
		treeId: DEFAULT_TREE,
		mood: level.mood
	};
}
function clampWordCount(stored, incoming) {
	const { maxWordDelta, maxWords } = GARDEN_CONFIG.xp;
	const safeIncoming = Math.max(0, Math.min(maxWords, Math.floor(incoming) || 0));
	const safeStored = Math.max(0, Math.floor(stored) || 0);
	if (safeIncoming <= safeStored) return safeStored;
	return Math.min(maxWords, safeStored + Math.min(maxWordDelta, safeIncoming - safeStored));
}
//#endregion
export { buildSnapshot as n, clampWordCount as r, TREE_XP as t };
