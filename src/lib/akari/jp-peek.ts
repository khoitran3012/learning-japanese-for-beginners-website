import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { hanVietOf, hanVietOfWord } from "@/data/han-viet";
import { allKanji, kanjiByChar } from "@/data/kanji-set";
import { kanaToRomaji, toHiragana } from "@/lib/akari/kana-util";
import { hasKanji } from "@/lib/akari/romaji";

const KANJI_RE = /[\u4e00-\u9fff々〆ヶ]/;

export type PeekChar = {
  ch: string;
  kun: string;
  on: string;
  hanViet: string;
  meaning: string;
  kanjiId?: string;
};

export type PeekInfo = {
  surface: string;
  /** Hiragana của cả cụm (từ vựng) — trống nếu chỉ có từng chữ. */
  wordKana: string;
  wordRomaji: string;
  hanViet: string;
  meaning: string;
  chars: PeekChar[];
};

export type JpToken = {
  surface: string;
  kind: "kanji" | "kana" | "other";
  info?: PeekInfo;
};

function charInfo(ch: string): PeekChar {
  const k = kanjiByChar(ch);
  const kun = (k?.kunyomi ?? []).filter(Boolean).join(" · ");
  const on = (k?.onyomi ?? []).filter(Boolean).map((x) => toHiragana(x)).join(" · ");
  return {
    ch,
    kun,
    on,
    hanViet: k?.han_viet || hanVietOf(ch),
    meaning: k?.meaning_vi ?? "",
    kanjiId: k?.id,
  };
}

type WordHit = { kana: string; meaning: string };

let wordIndex: Map<string, WordHit> | null = null;

function getWordIndex() {
  if (wordIndex) return wordIndex;
  const map = new Map<string, WordHit>();
  const add = (word: string, kana: string, meaning: string) => {
    if (!word || !hasKanji(word) || map.has(word)) return;
    map.set(word, { kana: toHiragana(kana.replace(/[-．.]/g, "")), meaning });
  };
  for (const v of VOCAB_N5) add(v.word, v.kana, v.meaning_vi);
  for (const v of VOCAB_N4) add(v.word, v.kana, v.meaning_vi);
  for (const k of allKanji()) {
    for (const ex of k.examples) add(ex.word, ex.kana, ex.meaning_vi);
  }
  wordIndex = map;
  return map;
}

function peekOf(surface: string): PeekInfo {
  const chars = [...surface].filter((c) => KANJI_RE.test(c)).map(charInfo);
  const hit = getWordIndex().get(surface);
  const hanViet = hanVietOfWord(surface) || chars.map((c) => c.hanViet).filter(Boolean).join(" ");
  const wordKana = hit?.kana ?? "";
  return {
    surface,
    wordKana,
    wordRomaji: wordKana ? kanaToRomaji(wordKana) : "",
    hanViet,
    meaning: hit?.meaning ?? (chars.length === 1 ? chars[0]?.meaning ?? "" : ""),
    chars,
  };
}

function kindOf(ch: string): JpToken["kind"] {
  if (KANJI_RE.test(ch)) return "kanji";
  if (/[\u3040-\u30ffー]/.test(ch)) return "kana";
  return "other";
}

/** Greedy: cụm kanji (+ okurigana nếu khớp từ vựng) → bấm một lần ra cả từ. */
export function tokenizeJp(text: string): JpToken[] {
  const chars = [...text];
  const dict = getWordIndex();
  const out: JpToken[] = [];
  let i = 0;
  while (i < chars.length) {
    const ch = chars[i]!;
    if (!KANJI_RE.test(ch)) {
      const k = kindOf(ch);
      let j = i + 1;
      while (j < chars.length && kindOf(chars[j]!) === k) j += 1;
      out.push({ surface: chars.slice(i, j).join(""), kind: k });
      i = j;
      continue;
    }
    let bestLen = 1;
    const max = Math.min(8, chars.length - i);
    for (let len = max; len >= 2; len--) {
      const slice = chars.slice(i, i + len).join("");
      if (!KANJI_RE.test(slice[0] ?? "")) break;
      if (dict.has(slice)) {
        bestLen = len;
        break;
      }
    }
    const surface = chars.slice(i, i + bestLen).join("");
    out.push({ surface, kind: "kanji", info: peekOf(surface) });
    i += bestLen;
  }
  return out;
}

export function speakKanaOf(info: PeekInfo) {
  if (info.wordKana) return info.wordKana.replace(/[・·]/g, "");
  const first = info.chars[0];
  if (!first) return "";
  const kun = first.kun.split(" · ")[0]?.replace(/[・·]/g, "") ?? "";
  const on = first.on.split(" · ")[0]?.replace(/[・·]/g, "") ?? "";
  return kun || on;
}
