import type { DictionaryEntry, JlptLevel, PartOfSpeech } from "@/lib/akari/types";
import RAW from "@/data/dictionary-jlpt.json";

/** Compact row: kanji, kana, romaji, meaning, pos, level, exJp, exKana, exRomaji, exVi */
type Row = [string, string, string, string, string, JlptLevel, string, string, string, string];

function kanjiChars(word: string) {
  return [...word].filter((c) => /[\u4e00-\u9fff]/.test(c));
}

function freqOf(level: JlptLevel): number {
  return { N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 }[level];
}

/** N5–N1 headwords with Vietnamese glosses and original example sentences. */
export const JLPT_DICTIONARY: DictionaryEntry[] = (RAW as Row[]).map((row, i) => {
  const [kanji, kana, romaji, meaning, pos, level, jp, kanaEx, romajiEx, viEx] = row;
  const meanings = meaning.split(" · ").map((m) => m.trim()).filter(Boolean);
  return {
    id: `jlpt-${level.toLowerCase()}-${String(i + 1).padStart(4, "0")}`,
    kanji,
    kana,
    romaji,
    meanings: meanings.length ? meanings : [meaning],
    part_of_speech: [pos as PartOfSpeech],
    jlpt: [level],
    common: level === "N5" || level === "N4",
    frequency: freqOf(level),
    pitch_accent: null,
    examples: jp
      ? [{ jp, kana: kanaEx || undefined, romaji: romajiEx, vi: viEx }]
      : [],
    tags: [level, pos],
    kanjiChars: kanjiChars(kanji),
  };
});
