import { KANJI_N5 } from "@/data/kanji-n5";
import { KANJI_N4 } from "@/data/kanji-n4";
import { KANJI_JLPT, mergeKanji } from "@/data/kanji-jlpt";
import type { KanjiEntry } from "@/lib/akari/types";

const authored = [...KANJI_N5, ...KANJI_N4];

let practiceCache: KanjiEntry[] | null = null;
let allCache: KanjiEntry[] | null = null;

/** N5 + N4 — lộ trình học, quiz, flashcard, thống kê. */
export function practiceKanji(): KanjiEntry[] {
  if (!practiceCache) {
    practiceCache = mergeKanji(
      authored,
      KANJI_JLPT.filter((k) => k.level === "N5" || k.level === "N4"),
    );
  }
  return practiceCache;
}

/** N5–N1 — tra cứu từ điển / trang kanji. */
export function allKanji(): KanjiEntry[] {
  if (!allCache) allCache = mergeKanji(authored, KANJI_JLPT);
  return allCache;
}

export function kanjiByChar(ch: string) {
  return allKanji().find((k) => k.character === ch);
}

export function kanjiById(id: string) {
  return allKanji().find((k) => k.id === id);
}
