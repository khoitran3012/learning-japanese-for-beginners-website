import { KANJI_N5 } from "@/data/kanji-n5";
import { KANJI_N4 } from "@/data/kanji-n4";
import { KANJI_JLPT, mergeKanji } from "@/data/kanji-jlpt";
import { kanjiLearnIndex } from "@/data/kanji-lessons";
import type { JlptLevel, KanjiEntry } from "@/lib/akari/types";

const authored = [...KANJI_N5, ...KANJI_N4];
const LEVEL_RANK: Record<JlptLevel, number> = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 };

let practiceCache: KanjiEntry[] | null = null;
let allCache: KanjiEntry[] | null = null;
let byLevelCache: Partial<Record<JlptLevel, KanjiEntry[]>> = {};

function sortLearn(list: KanjiEntry[]) {
  return [...list].sort((a, b) => {
    const ia = kanjiLearnIndex(a.character);
    const ib = kanjiLearnIndex(b.character);
    return ia - ib || LEVEL_RANK[a.level] - LEVEL_RANK[b.level] || a.stroke_count - b.stroke_count;
  });
}

/** N5 + N4 — quiz tổng hợp, trang chủ, người mới. */
export function practiceKanji(): KanjiEntry[] {
  if (!practiceCache) {
    practiceCache = sortLearn(
      mergeKanji(
        authored,
        KANJI_JLPT.filter((k) => k.level === "N5" || k.level === "N4"),
      ),
    );
  }
  return practiceCache;
}

/** N5–N1 — thứ tự học từ thấp đến cao. */
export function allKanji(): KanjiEntry[] {
  if (!allCache) allCache = sortLearn(mergeKanji(authored, KANJI_JLPT));
  return allCache;
}

export function kanjiByLevel(level: JlptLevel): KanjiEntry[] {
  if (!byLevelCache[level]) {
    byLevelCache[level] = allKanji().filter((k) => k.level === level);
  }
  return byLevelCache[level]!;
}

export function kanjiByChar(ch: string) {
  return allKanji().find((k) => k.character === ch);
}

export function kanjiById(id: string) {
  return allKanji().find((k) => k.id === id);
}

export function kanjiNeighbors(id: string, pool: KanjiEntry[] = allKanji()) {
  const i = pool.findIndex((k) => k.id === id);
  if (i < 0) return { prev: undefined, next: undefined, index: -1, total: pool.length };
  return { prev: pool[i - 1], next: pool[i + 1], index: i, total: pool.length };
}
