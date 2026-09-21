import { GARDEN_CONFIG, GARDEN_ITEM_MAP } from "./config";
import { DEFAULT_TREE, stageFromXp, studyXpFrom, treeById } from "./trees";
import type { GardenPlacement, GardenSnapshot } from "./types";

export type GardenFacts = {
  wordsLearned: number;
  lessons: number;
  streak: number;
  quizzes: number;
  studyXp: number;
  dailyBonus: number;
  lastDailyDate: string | null;
  lastStudyDate: string | null;
  soundOn: boolean;
  seenUnlocks: string[];
  placements: GardenPlacement[];
  today: string;
  kanaHira?: number;
  kanaKata?: number;
  vocab?: number;
  kanji?: number;
  grammar?: number;
  quizScores?: Array<{ score: number; total: number }>;
};

export function gardenXpFrom(facts: GardenFacts) {
  if (
    facts.kanaHira != null ||
    facts.vocab != null ||
    facts.kanji != null ||
    facts.quizScores != null
  ) {
    return studyXpFrom({
      kanaHira: facts.kanaHira ?? 0,
      kanaKata: facts.kanaKata ?? 0,
      vocab: facts.vocab ?? facts.wordsLearned,
      kanji: facts.kanji ?? 0,
      grammar: facts.grammar ?? 0,
      lessons: facts.lessons,
      quizzes: facts.quizScores ?? Array.from({ length: facts.quizzes }, () => ({ score: 1, total: 1 })),
      streak: facts.streak,
      dailyBonus: facts.dailyBonus,
    });
  }
  const { perWord, perLesson } = GARDEN_CONFIG.xp;
  return Math.max(
    0,
    Math.floor(facts.wordsLearned) * perWord +
      Math.floor(facts.lessons) * perLesson +
      Math.floor(facts.studyXp) +
      Math.floor(facts.dailyBonus),
  );
}

export function gardenLevelFromXp(xp: number) {
  const tree = treeById(DEFAULT_TREE);
  const { current, next } = stageFromXp(xp, tree);
  return {
    level: current.level,
    name: current.name,
    nameJp: current.nameJp,
    nextXp: next?.xp ?? null,
    prevXp: current.xp,
    mood: current.mood,
  };
}

export function unlockedItemIds(facts: Pick<GardenFacts, "wordsLearned" | "lessons" | "streak" | "quizzes">, xp: number) {
  const ids: string[] = [];
  for (const m of GARDEN_CONFIG.milestones) {
    const ok =
      (m.words == null || facts.wordsLearned >= m.words) &&
      (m.lessons == null || facts.lessons >= m.lessons) &&
      (m.streak == null || facts.streak >= m.streak) &&
      (m.quizzes == null || facts.quizzes >= m.quizzes) &&
      (m.xp == null || xp >= m.xp);
    if (ok) ids.push(m.itemId);
  }
  return [...new Set(ids)];
}

export function defaultPlacements(unlocked: string[]): GardenPlacement[] {
  return unlocked.map((itemId) => {
    const def = GARDEN_ITEM_MAP[itemId];
    return {
      id: `auto-${itemId}`,
      itemId,
      x: def?.x ?? 50,
      y: def?.y ?? 70,
      scale: def?.scale ?? 1,
    };
  });
}

export function mergePlacements(saved: GardenPlacement[], unlocked: string[]): GardenPlacement[] {
  const allowed = new Set(unlocked);
  const kept = saved.filter((p) => allowed.has(p.itemId));
  const have = new Set(kept.map((p) => p.itemId));
  for (const extra of defaultPlacements(unlocked)) {
    if (!have.has(extra.itemId)) kept.push(extra);
  }
  return kept;
}

export function buildSnapshot(facts: GardenFacts, signedIn: boolean): GardenSnapshot {
  const xp = gardenXpFrom(facts);
  const level = gardenLevelFromXp(xp);
  const unlocked = unlockedItemIds(facts, xp);
  const seen = new Set(facts.seenUnlocks);
  const newUnlocks = unlocked
    .filter((id) => !seen.has(id))
    .map((id) => {
      const item = GARDEN_ITEM_MAP[id];
      return {
        id,
        name: item?.name ?? id,
        nameJp: item?.nameJp ?? "",
        category: item?.category ?? "plants",
      };
    });
  const studiedToday = facts.lastStudyDate === facts.today;
  const canClaimDaily = studiedToday && facts.lastDailyDate !== facts.today;
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
    mood: level.mood,
  };
}

export function clampWordCount(stored: number, incoming: number) {
  const { maxWordDelta, maxWords } = GARDEN_CONFIG.xp;
  const safeIncoming = Math.max(0, Math.min(maxWords, Math.floor(incoming) || 0));
  const safeStored = Math.max(0, Math.floor(stored) || 0);
  if (safeIncoming <= safeStored) return safeStored;
  return Math.min(maxWords, safeStored + Math.min(maxWordDelta, safeIncoming - safeStored));
}
