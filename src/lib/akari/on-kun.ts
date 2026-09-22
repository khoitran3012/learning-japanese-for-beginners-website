import type { KanjiEntry, KanjiExample } from "@/lib/akari/types";
import { kanaToRomaji, toHiragana } from "@/lib/akari/kana-util";

export type ReadingKind = "on" | "kun";

export function splitKunReading(raw: string): { stem: string; oku: string; kana: string } {
  const s = raw.normalize("NFKC").replace(/[-－.]/g, "・");
  const i = s.indexOf("・");
  if (i >= 0) {
    const stem = s.slice(0, i).replace(/・/g, "");
    const oku = s.slice(i + 1).replace(/・/g, "");
    return { stem, oku, kana: stem + oku };
  }
  const kana = s.replace(/・/g, "");
  return { stem: kana, oku: "", kana };
}

export function onReadings(k: KanjiEntry) {
  return k.onyomi.filter(Boolean).map((kata) => {
    const hira = toHiragana(kata);
    return { kata, hira, romaji: kanaToRomaji(hira) };
  });
}

export function kunReadings(k: KanjiEntry) {
  return k.kunyomi.filter(Boolean).map((raw) => {
    const parts = splitKunReading(raw);
    return { raw, ...parts, romaji: kanaToRomaji(parts.kana) };
  });
}

/** Hiragana hiện trên ô lưới: kun trước, on sau. */
export function kanjiFurigana(k: KanjiEntry) {
  const kun = kunReadings(k)[0]?.kana ?? "";
  const on = onReadings(k)[0]?.hira ?? "";
  const parts = [kun, on].filter(Boolean);
  const unique = parts.filter((x, i) => parts.indexOf(x) === i);
  return { kun, on, line: unique.join(" · ") };
}

const HAS_KANJI = /[\u4e00-\u9fff々]/;

export function classifyExample(k: KanjiEntry, ex: KanjiExample): ReadingKind | "mixed" {
  if (ex.reading === "on" || ex.reading === "kun") return ex.reading;
  const { word } = ex;
  if (word === k.character) return "kun";
  for (const kun of kunReadings(k)) {
    if (word === k.character + kun.oku) return "kun";
    if (ex.kana === kun.kana) return "kun";
  }
  const rest = [...word].filter((ch) => ch !== k.character).join("");
  const kanjiRest = HAS_KANJI.test(rest);
  const kanaRest = rest.length > 0 && /^[\u3040-\u30ffー]+$/.test(rest);
  if (kanaRest && !kanjiRest) return "kun";
  if (kanjiRest && !kanaRest) return "on";
  return "mixed";
}

export function pickOnExample(k: KanjiEntry, words: KanjiExample[]): KanjiExample | undefined {
  return words.find((w) => classifyExample(k, w) === "on") ?? words.find((w) => classifyExample(k, w) !== "kun");
}

export function pickKunExample(k: KanjiEntry, words: KanjiExample[]): KanjiExample | undefined {
  const hit = words.find((w) => classifyExample(k, w) === "kun");
  if (hit) return hit;
  const kun = kunReadings(k)[0];
  if (!kun) return undefined;
  return {
    word: k.character + kun.oku,
    kana: kun.kana,
    romaji: kun.romaji,
    meaning_vi: k.meaning_vi.split(" / ")[0] ?? k.meaning_vi,
    reading: "kun",
  };
}

/** Textbook pair: ghép chữ (ON) vs chữ + đuôi (KUN). */
export const TEACH_ON = {
  label: "Ghép hai chữ → đọc âm Hán",
  word: "食堂",
  parts: [
    { ch: "食", yomi: "しょく" },
    { ch: "堂", yomi: "どう" },
  ],
  kana: "しょくどう",
  romaji: "shokudou",
  vi: "nhà ăn",
  hanViet: "Thực Đường",
  why: "Hai kanji dính nhau, không có hiragana ở giữa.",
} as const;

export const TEACH_KUN = {
  label: "Một chữ + đuôi hiragana → đọc âm Nhật",
  word: "食べる",
  parts: [{ ch: "食", yomi: "た" }],
  oku: "べる",
  kana: "たべる",
  romaji: "taberu",
  vi: "ăn",
  hanViet: "Thực",
  why: "べる là okurigana — đuôi hiragana bám sau kanji.",
} as const;

export const TEACH_KUN_SOLO = {
  label: "Một chữ đứng một mình → cũng âm Nhật",
  word: "山",
  parts: [{ ch: "山", yomi: "やま" }],
  oku: "",
  kana: "やま",
  romaji: "yama",
  vi: "núi",
  why: "Không ghép chữ khác, không đuôi — đọc kun.",
} as const;

export const TEACH_ON_COMPOUND = {
  label: "Ghép chữ → âm Hán",
  word: "火山",
  parts: [
    { ch: "火", yomi: "か" },
    { ch: "山", yomi: "ざん" },
  ],
  kana: "かざん",
  romaji: "kazan",
  vi: "núi lửa",
  hanViet: "Hỏa Sơn",
  why: "火 + 山. Cả hai đọc on, gần Hán-Việt.",
} as const;
