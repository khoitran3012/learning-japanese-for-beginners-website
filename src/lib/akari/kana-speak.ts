import { toHiragana } from "./kana-util";

const HAS_KANA = /[\u3040-\u30ff]/;
const KANA_ONLY = /^[\u3040-\u30ffー\s]+$/;

/** Longer first so こんにちは is kept intact before は. */
const PROTECT_HA = [
  "おはようございます",
  "こんにちは",
  "こんばんは",
  "はじめまして",
  "はじめて",
  "おはよう",
  "はなし",
  "はなび",
  "はがき",
  "はたら",
  "はじめ",
  "はやし",
  "はずれ",
  "はず",
  "はは",
  "はい",
  "はな",
  "はし",
  "はこ",
  "はる",
  "はれ",
  "はで",
  "はば",
  "はら",
  "はだ",
  "はん",
  "はつ",
  "はち",
  "はて",
  "ほか",
];

/** Lexical へ (not the particle). Longer first. */
const PROTECT_HE = [
  "へいわ",
  "へんじ",
  "へんか",
  "へんこう",
  "へんかん",
  "へいき",
  "へいこう",
  "へいせい",
  "へいほう",
  "へいれつ",
  "へいさ",
  "へいし",
  "へた",
  "へや",
  "へそ",
  "へえ",
  "へび",
  "へらす",
  "へる",
  "へこ",
  "へん",
  "へい",
];

function stripNotes(raw: string) {
  return raw
    .replace(/[（(][^）)]*[）)]/g, "")
    .replace(/\s*=\s*.*$/, "")
    .replace(/[#＃].*$/, "")
    .replace(/#NAME\??/gi, "")
    .trim();
}

/** One reading, hiragana, no okurigana dots. */
export function readingToKana(raw: string): string {
  let s = stripNotes(raw.normalize("NFKC"));
  if (!s) return "";
  s = s.replace(/、/g, "/").replace(/[，,]/g, "/");
  s = (s.split("/")[0] ?? "").trim();
  s = toHiragana(s);
  s = s.replace(/[・･·．.]/g, "");
  s = s.replace(/[-－]/g, "");
  s = s.replace(/\s+/g, "");
  return s;
}

function looksLikeSentence(s: string) {
  return /[。！？、]|です|ます|でした|ました|だ$|である/.test(s) || s.length >= 8;
}

function protectThen(s: string, words: string[], replace: (t: string) => string) {
  const slots: string[] = [];
  let out = s;
  for (const w of words) {
    if (!out.includes(w)) continue;
    const token = `\u0001${slots.length}\u0001`;
    slots.push(w);
    out = out.split(w).join(token);
  }
  out = replace(out);
  for (let i = 0; i < slots.length; i++) {
    out = out.split(`\u0001${i}\u0001`).join(slots[i]!);
  }
  return out;
}

/** Topic は → わ, keeping words like こんにちは / はは. */
function replaceTopicHa(s: string) {
  return protectThen(s, PROTECT_HA, (t) => t.replace(/は/g, "わ"));
}

/** Direction へ → え, keeping へや / へん / へた. */
function replaceHe(s: string) {
  return protectThen(s, PROTECT_HE, (t) => t.replace(/へ/g, "え"));
}

/**
 * Yomigana for Japanese TTS: hiragana + spoken particles (を→お, へ→え, は→わ).
 * Isolated は/へ/を are the particles. Isolated words keep lexical は (はな, はは).
 */
export function yomigana(kana: string): string {
  let s = readingToKana(kana);
  if (!s) return s;
  if (s === "は") return "わ";
  if (s === "へ") return "え";
  if (s === "を") return "お";
  s = s.replace(/を/g, "お");
  s = replaceHe(s);
  if (looksLikeSentence(s)) {
    s = replaceTopicHa(s);
  }
  return s;
}

/** Kana-only TTS input. Parenthetical POS notes and kanji guesses are stripped. */
export function ttsKana(kana: string | undefined, word = ""): string {
  const fromKana = yomigana(kana ?? "");
  if (fromKana && HAS_KANA.test(fromKana) && KANA_ONLY.test(fromKana)) return fromKana;
  const fromWord = yomigana(word);
  if (fromWord && HAS_KANA.test(fromWord) && KANA_ONLY.test(fromWord)) return fromWord;
  if (fromKana && HAS_KANA.test(fromKana)) return fromKana;
  return fromWord || fromKana || stripNotes(kana || word);
}

export function isSpeakableKana(text: string): boolean {
  const t = ttsKana(text, text);
  return t.length > 0 && KANA_ONLY.test(t) && HAS_KANA.test(t);
}
