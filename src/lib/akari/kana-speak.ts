import { toHiragana } from "./kana-util";

const HAS_KANA = /[\u3040-\u30ff]/;
/** Pure kana (after stripping pauses). */
const KANA_CORE = /^[\u3040-\u30ffー]+$/;
/** TTS may keep Japanese pauses. */
const KANA_OR_PAUSE = /^[\u3040-\u30ffー。、！？\s]+$/;

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

/** Kun/on lists like ひ、び、か — not a spoken sentence. */
function isReadingList(s: string) {
  if (/[。！？]|です|ます|ください|ですか|ません/.test(s)) return false;
  const parts = s.split(/[、，,/／]/).map((p) => p.trim()).filter(Boolean);
  if (parts.length < 2) return false;
  return parts.every((p) => p.replace(/[・･.\s]/g, "").length <= 8);
}

/**
 * One reading, hiragana.
 * Keeps 、。！？ so TTS pauses on full sentences. Does not chop いま、なんじですか at the comma.
 */
export function readingToKana(raw: string): string {
  let s = stripNotes(raw.normalize("NFKC"));
  if (!s) return "";
  if (isReadingList(s)) {
    s = (s.split(/[、，,/／]/)[0] ?? "").trim();
  }
  s = toHiragana(s);
  s = s.replace(/[・･·]/g, "");
  s = s.replace(/[-－]/g, "");
  s = s.replace(/[「」『』]/g, "");
  s = s.replace(/[．.]/g, "。");
  s = s.replace(/[，,]/g, "、");
  s = s.replace(/\s+/g, "");
  return s;
}

function looksLikeSentence(s: string) {
  return /[。！？、]|です|ます|でした|ました|ください|ですか|ません|でしょう/.test(s);
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

function usable(s: string) {
  return Boolean(s && HAS_KANA.test(s) && KANA_OR_PAUSE.test(s));
}

/** Kana-only TTS input. Parenthetical POS notes and kanji guesses are stripped. */
export function ttsKana(kana: string | undefined, word = ""): string {
  const fromKana = yomigana(kana ?? "");
  if (usable(fromKana)) return fromKana;
  const fromWord = yomigana(word);
  if (usable(fromWord)) return fromWord;
  if (fromKana && HAS_KANA.test(fromKana)) return fromKana.replace(/[^\u3040-\u30ffー。、！？]/g, "");
  const fallback = (fromWord || fromKana || stripNotes(kana || word)).replace(/[^\u3040-\u30ffー。、！？]/g, "");
  return fallback;
}

export function isSpeakableKana(text: string): boolean {
  const t = ttsKana(text, text).replace(/[。、！？\s]/g, "");
  return t.length > 0 && KANA_CORE.test(t) && HAS_KANA.test(t);
}
