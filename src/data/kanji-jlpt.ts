import type { JlptLevel, KanjiEntry } from "@/lib/akari/types";
import { hanVietOf } from "@/data/han-viet";
import { kanaToRomaji, toHiragana } from "@/lib/akari/kana-util";
import RAW from "@/data/kanji-jlpt.json";

type Row = [string, string, string, string, string, JlptLevel, string, string, string];

function freqOf(level: JlptLevel): number {
  return { N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 }[level];
}

/** N5–N1 kanji for lookup. Lesson/practice still prefers the hand-authored N5/N4 lists. */
export const KANJI_JLPT: KanjiEntry[] = (RAW as Row[]).map((row) => {
  const [character, on, kun, meaning, strokes, level, exWord, exKana, exVi] = row;
  const onyomi = on.split(/\s+/).filter(Boolean);
  const kunyomi = kun.split(/\s+/).filter(Boolean);
  const reading = kunyomi[0] || toHiragana(onyomi[0] ?? "") || character;
  return {
    id: `kj-${level.toLowerCase()}-${character}`,
    character,
    onyomi,
    kunyomi,
    meaning_vi: meaning,
    han_viet: hanVietOf(character),
    romaji: kanaToRomaji(reading),
    level,
    stroke_count: Number(strokes) || 0,
    examples: exWord
      ? [{ word: exWord, kana: exKana, romaji: kanaToRomaji(exKana || reading), meaning_vi: exVi }]
      : [],
  };
});

export function mergeKanji(primary: KanjiEntry[], extra: KanjiEntry[]): KanjiEntry[] {
  const map = new Map<string, KanjiEntry>();
  for (const k of extra) map.set(k.character, k);
  for (const k of primary) map.set(k.character, k);
  const rank = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 };
  return [...map.values()].sort(
    (a, b) => rank[a.level] - rank[b.level] || a.character.localeCompare(b.character, "ja"),
  );
}
