import { n as GARDEN_ITEM_MAP, t as GARDEN_CONFIG } from "./config-CXidsrfo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compute-Cv-sZvIm.js
function gardenXpFrom(facts) {
	const { perWord, perLesson } = GARDEN_CONFIG.xp;
	return Math.max(0, Math.floor(facts.wordsLearned) * perWord + Math.floor(facts.lessons) * perLesson + Math.floor(facts.studyXp) + Math.floor(facts.dailyBonus));
}
function gardenLevelFromXp(xp) {
	const levels = GARDEN_CONFIG.levels;
	let current = levels[0];
	for (const row of levels) if (xp >= row.xp) current = row;
	const next = levels.find((row) => row.level === current.level + 1) ?? null;
	return {
		level: current.level,
		name: current.name,
		nameJp: current.nameJp,
		nextXp: next?.xp ?? null
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
		placements: mergePlacements(facts.placements, unlocked)
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
export { clampWordCount as n, buildSnapshot as t };
