import { HIRAGANA, KATAKANA } from "@/data/kana";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { allKanji, practiceKanji } from "@/data/kanji-set";
import { GRAMMAR_N5 } from "@/data/grammar-n5";
import { GRAMMAR_N4 } from "@/data/grammar-n4";
import { learnRadicals } from "@/data/radicals";
import { meaningParts } from "./answer-check";
import { kanaToRomaji, toHiragana } from "./kana-util";
import { questionsClash, similarAnswer, uniqueShuffle } from "./question-unique";
import type { JlptLevel, VocabEntry } from "./types";

export type QuizKind =
  | "hira-romaji"
  | "romaji-hira"
  | "kata-romaji"
  | "vocab-meaning"
  | "meaning-vocab"
  | "listen"
  | "listen-vocab"
  | "kanji"
  | "kanji-read"
  | "listen-kanji"
  | "grammar"
  | "particle"
  | "radical"
  | "vocab-kana"
  | "type-romaji"
  | "cloze"
  | "mix";

export type KanjiQuizLevel = JlptLevel | "core" | "all";
export type VocabQuizLevel = "N5" | "N4" | "both";
export type GrammarQuizLevel = "N5" | "N4" | "both";
export type KanaGroupFilter = "gojuon" | "all";

export interface QuizPoolOpts {
  vocabLevel?: VocabQuizLevel;
  grammarLevel?: GrammarQuizLevel;
  kanaGroup?: KanaGroupFilter;
  /** Đáp án đúng lấy từ các id này; đáp án nhiễu vẫn lấy cả pool. */
  focusIds?: string[];
  /** Giống focusIds nhưng cho kanji. */
  focusKanjiIds?: string[];
}

export interface QuizQuestion {
  id: string;
  kind: QuizKind;
  sourceId: string;
  prompt: string;
  promptJp?: string;
  speak?: string;
  options: string[];
  /** Nghĩa tiếng Việt / Hán-Việt hiện dưới đáp án, tắt được như romaji. */
  optionMeanings?: string[];
  optionRomaji?: string[];
  answer: number;
  explain: string;
  typedAnswers?: string[];
  typedHint?: string;
}

function shuffle<T>(arr: T[], rand: () => number = Math.random) {
  return uniqueShuffle(arr, rand);
}

function pickWrong<T>(
  pool: T[],
  correct: T,
  n: number,
  key: (x: T) => string,
  rand: () => number = Math.random,
) {
  const ck = key(correct);
  const seen = new Set<string>([ck]);
  const out: T[] = [];
  const ranked = shuffle(
    pool.filter((x) => key(x) !== ck),
    rand,
  );
  for (const x of ranked) {
    const k = key(x);
    if (!k || seen.has(k) || similarAnswer(k, ck)) continue;
    if (out.some((o) => similarAnswer(key(o), k))) continue;
    seen.add(k);
    out.push(x);
    if (out.length >= n) break;
  }
  if (out.length < n) {
    for (const x of ranked) {
      const k = key(x);
      if (!k || seen.has(k)) continue;
      seen.add(k);
      out.push(x);
      if (out.length >= n) break;
    }
  }
  return out;
}

function pickOne<T>(pool: T[], used: Set<string>, idOf: (x: T) => string, rand: () => number): T | null {
  const fresh = pool.filter((x) => {
    const key = idOf(x);
    if (used.has(key)) return false;
    const src = key.includes(":") ? key.slice(key.indexOf(":") + 1) : key;
    if (used.has(`src:${src}`)) return false;
    return true;
  });
  if (!fresh.length) return null;
  return fresh[Math.floor(rand() * fresh.length)] ?? null;
}

export function mulberry32(seed: number) {
  return function rand() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function dateSeed(date: string) {
  let h = 2166136261;
  for (const ch of date) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function kanjiSpeak(c: { kunyomi: string[]; onyomi: string[]; character: string }) {
  const kun = (c.kunyomi[0] || "").replace(/[-.]/g, "");
  return kun || toHiragana(c.onyomi[0] ?? "") || c.character;
}

function qid(kind: string, source: string, rand: () => number) {
  return `q-${kind}-${source}-${Math.floor(rand() * 1e9).toString(36)}`;
}

const PARTICLE_MEANING: Record<string, string> = {
  は: "chủ đề",
  を: "tân ngữ",
  へ: "hướng tới",
  で: "nơi / phương tiện",
  が: "chủ ngữ",
  に: "thời điểm / đích",
  と: "cùng với",
  も: "cũng",
  まで: "đến tận",
  から: "từ",
  や: "liệt kê (và…)",
};

function kanjiGloss(k: { han_viet?: string; meaning_vi: string }) {
  return [k.han_viet, k.meaning_vi].filter(Boolean).join(" · ");
}

function packOptions<T>(
  opts: T[],
  label: (x: T) => string,
  extra?: { meaning?: (x: T) => string; romaji?: (x: T) => string },
) {
  return {
    options: opts.map(label),
    optionMeanings: extra?.meaning ? opts.map((x) => extra.meaning!(x)) : undefined,
    optionRomaji: extra?.romaji ? opts.map((x) => extra.romaji!(x)) : undefined,
  };
}

const PARTICLES: Array<{ blank: string; options: string[]; answer: string; explain: string; speak: string }> = [
  { blank: "わたし____学生です。", options: ["は", "を", "へ", "と"], answer: "は", explain: "は đánh dấu chủ đề: tôi thì là học sinh.", speak: "わたしはがくせいです。" },
  { blank: "パン____食べます。", options: ["を", "に", "で", "が"], answer: "を", explain: "を đánh dấu tân ngữ của động từ tha.", speak: "パンをたべます。" },
  { blank: "学校____行きます。", options: ["へ", "を", "と", "も"], answer: "へ", explain: "へ chỉ hướng đi tới.", speak: "がっこうへいきます。" },
  { blank: "図書館____本を読みます。", options: ["で", "を", "へ", "と"], answer: "で", explain: "で chỉ nơi diễn ra hành động.", speak: "としょかんでほんをよみます。" },
  { blank: "七時____起きます。", options: ["に", "を", "へ", "と"], answer: "に", explain: "に chỉ thời điểm.", speak: "しちじにおきます。" },
  { blank: "友達____話します。", options: ["と", "を", "へ", "で"], answer: "と", explain: "と nghĩa là cùng với.", speak: "ともだちとはなします。" },
  { blank: "水____ありますか。", options: ["が", "を", "へ", "で"], answer: "が", explain: "が đánh dấu chủ ngữ tồn tại / nhấn mạnh.", speak: "みずがありますか。" },
  { blank: "これ____えんぴつです。", options: ["は", "を", "へ", "で"], answer: "は", explain: "は: đây thì là bút chì.", speak: "これはえんぴつです。" },
  { blank: "駅____歩きます。", options: ["まで", "を", "が", "も"], answer: "まで", explain: "まで: đến tận nhà ga.", speak: "えきまであるきます。" },
  { blank: "バス____来ます。", options: ["が", "を", "へ", "で"], answer: "が", explain: "が đánh dấu chủ ngữ của 来ます.", speak: "バスがきます。" },
  { blank: "日本____来ました。", options: ["から", "を", "へ", "と"], answer: "から", explain: "から: từ Nhật Bản đến.", speak: "にほんからきました。" },
  { blank: "コーヒー____お茶を飲みます。", options: ["や", "を", "に", "で"], answer: "や", explain: "や liệt kê không đầy đủ: cà phê và trà…", speak: "コーヒーやおちゃをのみます。" },
  { blank: "毎日日本語____勉強します。", options: ["を", "に", "が", "へ"], answer: "を", explain: "を: học tiếng Nhật (tân ngữ).", speak: "まいにちにほんごをべんきょうします。" },
  { blank: "うち____帰ります。", options: ["へ", "を", "が", "と"], answer: "へ", explain: "へ: về nhà (hướng).", speak: "うちへかえります。" },
  { blank: "はし____食べます。", options: ["で", "を", "に", "へ"], answer: "で", explain: "で: dùng đũa để ăn (phương tiện).", speak: "はしでたべます。" },
  { blank: "猫____好きです。", options: ["が", "を", "へ", "で"], answer: "が", explain: "が với 好き: thích mèo.", speak: "ねこがすきです。" },
  { blank: "あした____テストがあります。", options: ["は", "を", "へ", "と"], answer: "は", explain: "は đánh dấu chủ đề thời gian: còn ngày mai thì…", speak: "あしたはテストがあります。" },
  { blank: "先生____もらいました。", options: ["に", "を", "へ", "が"], answer: "に", explain: "に: nhận từ thầy/cô.", speak: "せんせいにもらいました。" },
  { blank: "車____乗ります。", options: ["に", "を", "へ", "と"], answer: "に", explain: "に: lên xe / ngồi vào xe.", speak: "くるまにのります。" },
  { blank: "兄弟____いません。", options: ["は", "を", "へ", "で"], answer: "は", explain: "は + いません: không có anh chị em.", speak: "きょうだいはいません。" },
];

const MIX_KINDS: QuizKind[] = [
  "hira-romaji",
  "romaji-hira",
  "kata-romaji",
  "vocab-meaning",
  "meaning-vocab",
  "kanji",
  "kanji-read",
  "listen-kanji",
  "grammar",
  "listen",
  "listen-vocab",
  "particle",
  "radical",
  "vocab-kana",
  "type-romaji",
  "cloze",
];

const KANA_BOTH_KINDS: QuizKind[] = ["hira-romaji", "romaji-hira", "kata-romaji", "listen"];
const KANA_HIRA_KINDS: QuizKind[] = ["hira-romaji", "romaji-hira", "listen"];
const KANA_KATA_KINDS: QuizKind[] = ["kata-romaji"];
const KANJI_CORE_KINDS: QuizKind[] = ["kanji", "kanji-read", "listen-kanji", "radical"];
const KANJI_ADV_KINDS: QuizKind[] = ["kanji", "kanji-read", "listen-kanji"];

export type KanaReviewScope = "hira" | "kata" | "both";

function pools(kanjiLevel: KanjiQuizLevel = "core", opts: QuizPoolOpts = {}) {
  const hiraAll = HIRAGANA.filter((k) => k.group === "gojuon" || k.group === "dakuten" || k.group === "handakuten" || k.group === "yoon");
  const kataAll = KATAKANA.filter((k) => k.group === "gojuon" || k.group === "dakuten" || k.group === "handakuten" || k.group === "yoon");
  const hira = opts.kanaGroup === "gojuon" ? hiraAll.filter((k) => k.group === "gojuon") : hiraAll;
  const kata = opts.kanaGroup === "gojuon" ? kataAll.filter((k) => k.group === "gojuon") : kataAll;
  const vocab: VocabEntry[] =
    opts.vocabLevel === "N5" ? [...VOCAB_N5] : opts.vocabLevel === "N4" ? [...VOCAB_N4] : [...VOCAB_N5, ...VOCAB_N4];
  const all = allKanji();
  const kanji =
    kanjiLevel === "all"
      ? all
      : kanjiLevel === "core"
        ? practiceKanji()
        : all.filter((k) => k.level === kanjiLevel);
  const grammar =
    opts.grammarLevel === "N5" ? [...GRAMMAR_N5] : opts.grammarLevel === "N4" ? [...GRAMMAR_N4] : [...GRAMMAR_N5, ...GRAMMAR_N4];
  return { hira, kata, vocab, kanji, grammar };
}

function buildOne(
  kind: QuizKind,
  used: Set<string>,
  rand: () => number,
  kanjiLevel: KanjiQuizLevel = "core",
  poolOpts: QuizPoolOpts = {},
): QuizQuestion | null {
  const { hira, kata, vocab, kanji, grammar } = pools(kind === "mix" ? "core" : kanjiLevel, poolOpts);
  const vocabFocus = (() => {
    if (!poolOpts.focusIds?.length) return vocab;
    const set = new Set(poolOpts.focusIds);
    const hit = vocab.filter((v) => set.has(v.id));
    return hit.length ? hit : vocab;
  })();
  const kanjiFocus = (() => {
    if (!poolOpts.focusKanjiIds?.length) return kanji;
    const set = new Set(poolOpts.focusKanjiIds);
    const hit = kanji.filter((k) => set.has(k.id));
    return hit.length ? hit : kanji;
  })();
  const mark = (sourceId: string) => {
    used.add(`${kind}:${sourceId}`);
    used.add(`src:${sourceId}`);
  };

  if (kind === "hira-romaji" || kind === "kata-romaji") {
    const pool = kind === "hira-romaji" ? hira : kata;
    const c = pickOne(pool, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const wrong = pickWrong(pool, c, 3, (x) => x.romaji, rand);
    const opts = shuffle([c, ...wrong], rand);
    return {
      id: qid(kind, c.id, rand),
      kind,
      sourceId: c.id,
      prompt: `${c.char} đọc là?`,
      promptJp: c.char,
      speak: c.char,
      options: opts.map((o) => o.romaji),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.char} · ${c.romaji}`,
      typedAnswers: [c.romaji],
      typedHint: "Gõ romaji",
    };
  }

  if (kind === "romaji-hira") {
    const c = pickOne(hira, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const wrong = pickWrong(hira, c, 3, (x) => x.char, rand);
    const opts = shuffle([c, ...wrong], rand);
    return {
      id: qid(kind, c.id, rand),
      kind,
      sourceId: c.id,
      prompt: `"${c.romaji}" là chữ nào?`,
      speak: c.char,
      ...packOptions(opts, (o) => o.char, { romaji: (o) => o.romaji }),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.romaji} = ${c.char}`,
    };
  }

  if (kind === "listen") {
    const c = pickOne(hira, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const wrong = pickWrong(hira, c, 3, (x) => x.char, rand);
    const opts = shuffle([c, ...wrong], rand);
    return {
      id: qid(kind, c.id, rand),
      kind,
      sourceId: c.id,
      prompt: "Nghe và chọn chữ",
      speak: c.char,
      ...packOptions(opts, (o) => o.char, { romaji: (o) => o.romaji }),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `Bạn nghe ${c.char} (${c.romaji}).`,
    };
  }

  if (kind === "listen-vocab") {
    const c = pickOne(vocabFocus, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const wrong = pickWrong(vocab, c, 3, (x) => x.meaning_vi, rand);
    const opts = shuffle([c, ...wrong], rand);
    return {
      id: qid(kind, c.id, rand),
      kind,
      sourceId: c.id,
      prompt: "Nghe từ và chọn nghĩa",
      speak: c.kana,
      options: opts.map((o) => o.meaning_vi),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.word} · ${c.kana} · ${c.romaji}: ${c.meaning_vi}.`,
    };
  }

  if (kind === "kanji") {
    const c = pickOne(kanjiFocus, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const speak = kanjiSpeak(c);
    const wrong = pickWrong(kanji, c, 3, (x) => x.meaning_vi, rand);
    const opts = shuffle([c, ...wrong], rand);
    return {
      id: qid(kind, c.id, rand),
      kind,
      sourceId: c.id,
      prompt: `${c.character} nghĩa là?`,
      promptJp: c.character,
      speak,
      ...packOptions(opts, (o) => o.meaning_vi, {
        meaning: (o) => o.han_viet,
      }),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.character} · Hán-Việt ${c.han_viet || "—"} · ${c.meaning_vi}. Kun ${c.kunyomi.join(" / ") || "—"} · on ${c.onyomi.map((o) => `${o} (${kanaToRomaji(o)})`).join(" / ")}.`,
      typedAnswers: [...meaningParts(c.meaning_vi), c.han_viet].filter(Boolean),
      typedHint: "Gõ nghĩa tiếng Việt",
    };
  }

  if (kind === "kanji-read") {
    const c = pickOne(kanjiFocus, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const reading = kanjiSpeak(c);
    const romaji = kanaToRomaji(reading);
    const wrong = pickWrong(kanji, c, 3, (x) => kanjiSpeak(x), rand);
    const opts = shuffle([c, ...wrong], rand);
    return {
      id: qid(kind, c.id, rand),
      kind,
      sourceId: c.id,
      prompt: `${c.character} đọc là? (hiragana / romaji)`,
      promptJp: c.character,
      speak: reading,
      ...packOptions(opts, (o) => kanjiSpeak(o), {
        romaji: (o) => kanaToRomaji(kanjiSpeak(o)),
        meaning: (o) => kanjiGloss(o),
      }),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.character} · Hán-Việt ${c.han_viet || "—"} · kun ${c.kunyomi.join(" / ") || "—"} · on ${c.onyomi.join(" / ")} (${c.onyomi.map(kanaToRomaji).join(", ")}).`,
      typedAnswers: [reading, romaji, ...c.kunyomi, ...c.onyomi.map(toHiragana)].filter(Boolean),
      typedHint: "Gõ hiragana hoặc romaji",
    };
  }

  if (kind === "listen-kanji") {
    const c = pickOne(kanjiFocus, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const speak = kanjiSpeak(c);
    const wrong = pickWrong(kanji, c, 3, (x) => x.character, rand);
    const opts = shuffle([c, ...wrong], rand);
    return {
      id: qid(kind, c.id, rand),
      kind,
      sourceId: c.id,
      prompt: "Nghe cách đọc (hiragana), chọn kanji",
      speak,
      ...packOptions(opts, (o) => o.character, {
        meaning: (o) => kanjiGloss(o),
        romaji: (o) => kanaToRomaji(kanjiSpeak(o)),
      }),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `Nghe ${speak} (${kanaToRomaji(speak)}) → ${c.character} (${c.han_viet || c.meaning_vi}). On ${c.onyomi.join("/")} · kun ${c.kunyomi.join("/") || "—"}.`,
    };
  }

  if (kind === "grammar") {
    const c = pickOne(grammar, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const wrong = pickWrong(grammar, c, 3, (x) => x.meaning_vi, rand);
    const opts = shuffle([c, ...wrong], rand);
    return {
      id: qid(kind, c.id, rand),
      kind,
      sourceId: c.id,
      prompt: `${c.name} dùng để?`,
      promptJp: c.name,
      options: opts.map((o) => o.meaning_vi),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.name}: ${c.meaning_vi}. ${c.structure}`,
    };
  }

  if (kind === "particle") {
    const c = pickOne(PARTICLES, used, (x) => `${kind}:${x.blank}`, rand);
    if (!c) return null;
    mark(c.blank);
    const opts = shuffle(c.options, rand);
    return {
      id: qid(kind, c.blank, rand),
      kind,
      sourceId: c.blank,
      prompt: "Chọn trợ từ đúng",
      promptJp: c.blank,
      speak: c.speak,
      options: opts,
      optionMeanings: opts.map((p) => PARTICLE_MEANING[p] ?? ""),
      answer: opts.findIndex((o) => o === c.answer),
      explain: c.explain,
    };
  }

  if (kind === "radical") {
    const pool = learnRadicals();
    const c = pickOne(pool, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const wrong = pickWrong(pool, c, 3, (x) => `${x.han_viet} · ${x.meaning_vi}`, rand);
    const opts = shuffle([c, ...wrong], rand);
    return {
      id: qid(kind, c.id, rand),
      kind,
      sourceId: c.id,
      prompt: `${c.char} là bộ gì?`,
      promptJp: c.char,
      speak: c.name_kana,
      ...packOptions(opts, (o) => `${o.han_viet} · ${o.meaning_vi}`, {
        romaji: (o) => `${o.name_kana} · ${kanaToRomaji(o.name_kana)}`,
      }),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.char} · ${c.han_viet} · ${c.name_kana} (${kanaToRomaji(c.name_kana)}) · ${c.meaning_vi}. ${c.hint}`,
      typedAnswers: [c.han_viet, c.name_kana, c.meaning_vi, kanaToRomaji(c.name_kana)].filter(Boolean),
      typedHint: "Gõ Hán-Việt hoặc tên bộ",
    };
  }

  if (kind === "meaning-vocab") {
    const c = pickOne(vocabFocus, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const wrong = pickWrong(vocab, c, 3, (x) => x.word, rand);
    const opts = shuffle([c, ...wrong], rand);
    return {
      id: qid(kind, c.id, rand),
      kind,
      sourceId: c.id,
      prompt: `"${c.meaning_vi}" = ?`,
      speak: c.kana,
      ...packOptions(opts, (o) => (o.word === o.kana ? o.word : `${o.word} · ${o.kana}`), {
        meaning: (o) => o.meaning_vi,
        romaji: (o) => o.romaji,
      }),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.meaning_vi} là ${c.word} (${c.kana}, ${c.romaji}).`,
      typedAnswers: [c.romaji, c.kana, c.word],
      typedHint: "Gõ từ (romaji / kana)",
    };
  }

  if (kind === "vocab-kana") {
    const c = pickOne(vocabFocus, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const wrong = pickWrong(vocab, c, 3, (x) => x.kana, rand);
    const opts = shuffle([c, ...wrong], rand);
    return {
      id: qid(kind, c.id, rand),
      kind,
      sourceId: c.id,
      prompt: `${c.word} đọc (kana) là?`,
      promptJp: c.word,
      speak: c.kana,
      ...packOptions(opts, (o) => o.kana, {
        meaning: (o) => o.meaning_vi,
        romaji: (o) => o.romaji,
      }),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.word} = ${c.kana} (${c.romaji}).`,
      typedAnswers: [c.kana, c.romaji],
      typedHint: "Gõ kana hoặc romaji",
    };
  }

  if (kind === "type-romaji") {
    const bag = rand() < 0.45 ? hira : rand() < 0.7 ? vocab : kanji;
    if (bag === hira) {
      const c = pickOne(hira, used, (x) => `${kind}:${x.id}`, rand);
      if (!c) return null;
      mark(c.id);
      const wrong = pickWrong(hira, c, 3, (x) => x.romaji, rand);
      const opts = shuffle([c, ...wrong], rand);
      return {
        id: qid(kind, c.id, rand),
        kind,
        sourceId: c.id,
        prompt: "Gõ romaji của chữ này",
        promptJp: c.char,
        speak: c.char,
        options: opts.map((o) => o.romaji),
        answer: opts.findIndex((o) => o.id === c.id),
        explain: `${c.char} · ${c.romaji}`,
        typedAnswers: [c.romaji],
        typedHint: "Gõ romaji rồi Enter",
      };
    }
    if (bag === vocab) {
      const c = pickOne(vocabFocus, used, (x) => `${kind}:${x.id}`, rand);
      if (!c) return null;
      mark(c.id);
      const wrong = pickWrong(vocab, c, 3, (x) => x.romaji, rand);
      const opts = shuffle([c, ...wrong], rand);
      return {
        id: qid(kind, c.id, rand),
        kind,
        sourceId: c.id,
        prompt: "Gõ romaji của từ này",
        promptJp: c.word,
        speak: c.kana,
        ...packOptions(opts, (o) => o.romaji, { meaning: (o) => o.meaning_vi }),
        answer: opts.findIndex((o) => o.id === c.id),
        explain: `${c.word} · ${c.kana} · ${c.romaji}`,
        typedAnswers: [c.romaji, c.kana],
        typedHint: "Gõ romaji",
      };
    }
    const c = pickOne(kanjiFocus, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const reading = kanjiSpeak(c);
    const romaji = kanaToRomaji(reading);
    const wrongK = pickWrong(kanji, c, 3, (x) => kanaToRomaji(kanjiSpeak(x)), rand);
    const opts = shuffle([c, ...wrongK], rand);
    return {
      id: qid(kind, c.id, rand),
      kind,
      sourceId: c.id,
      prompt: "Gõ romaji cách đọc kanji",
      promptJp: c.character,
      speak: reading,
      ...packOptions(opts, (o) => kanaToRomaji(kanjiSpeak(o)), { meaning: (o) => kanjiGloss(o) }),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.character} · Hán-Việt ${c.han_viet || "—"} · ${reading} · ${romaji}`,
      typedAnswers: [romaji, reading, ...c.kunyomi],
      typedHint: "Gõ romaji hoặc hiragana",
    };
  }

  if (kind === "cloze") {
    const clozePool = vocabFocus.filter((v) => v.example_sentence.includes(v.word) || v.example_sentence.includes(v.kana));
    const c = pickOne(clozePool, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const blank = c.example_sentence.includes(c.word)
      ? c.example_sentence.replace(c.word, "____")
      : c.example_sentence.replace(c.kana, "____");
    const wrong = pickWrong(vocab, c, 3, (x) => x.word, rand);
    const opts = shuffle([c, ...wrong], rand);
    return {
      id: qid(kind, c.id, rand),
      kind,
      sourceId: c.id,
      prompt: "Điền từ vào chỗ trống",
      promptJp: blank,
      speak: c.example_kana || c.kana,
      ...packOptions(opts, (o) => (o.word === o.kana ? o.word : `${o.word} · ${o.kana}`), {
        meaning: (o) => o.meaning_vi,
        romaji: (o) => o.romaji,
      }),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.example_sentence} — ${c.example_meaning_vi}`,
      typedAnswers: [c.word, c.kana, c.romaji],
      typedHint: "Gõ từ còn thiếu",
    };
  }

  const c = pickOne(vocabFocus, used, (x) => `vocab-meaning:${x.id}`, rand);
  if (!c) return null;
  used.add(`vocab-meaning:${c.id}`);
  const wrong = pickWrong(vocab, c, 3, (x) => x.meaning_vi, rand);
  const opts = shuffle([c, ...wrong], rand);
  return {
    id: qid("vocab-meaning", c.id, rand),
    kind: "vocab-meaning",
    sourceId: c.id,
    prompt: `${c.word} nghĩa là?`,
    promptJp: c.word,
    speak: c.kana,
    options: opts.map((o) => o.meaning_vi),
    answer: opts.findIndex((o) => o.id === c.id),
    explain: `${c.word} (${c.kana}, ${c.romaji}): ${c.meaning_vi}.`,
    typedAnswers: meaningParts(c.meaning_vi),
    typedHint: "Gõ nghĩa tiếng Việt",
  };
}

function nextFromKinds(
  kinds: QuizKind[],
  used: Set<string>,
  rand: () => number,
  kanjiLevel: KanjiQuizLevel,
  poolOpts: QuizPoolOpts = {},
): QuizQuestion | null {
  for (let pass = 0; pass < 2; pass++) {
    const remaining = kinds.filter((k) => !used.has(`mixkind:${k}`));
    const order = shuffle(remaining.length ? remaining : kinds, rand);
    if (!remaining.length) {
      for (const key of [...used]) if (key.startsWith("mixkind:")) used.delete(key);
    }
    for (const k of order) {
      const q = buildOne(k, used, rand, kanjiLevel, poolOpts);
      if (q) {
        used.add(`mixkind:${k}`);
        return q;
      }
    }
    for (const key of [...used]) {
      if (key.startsWith("src:") || key.startsWith("mixkind:")) used.delete(key);
    }
  }
  return buildOne(shuffle(kinds, rand)[0] ?? "vocab-meaning", used, rand, kanjiLevel, poolOpts);
}

export function nextQuestion(
  kind: QuizKind,
  used: Set<string>,
  rand: () => number = Math.random,
  kanjiLevel: KanjiQuizLevel = "core",
): QuizQuestion | null {
  if (kind === "mix") return nextFromKinds(MIX_KINDS, used, rand, "core");
  const q = buildOne(kind, used, rand, kanjiLevel);
  if (q) return q;
  const stale = [...used].filter((k) => k.startsWith(`${kind}:`) || k.startsWith("src:"));
  for (const k of stale) used.delete(k);
  return buildOne(kind, used, rand, kanjiLevel);
}

export function makeQuiz(
  kind: QuizKind,
  count = 10,
  rand: () => number = Math.random,
  kanjiLevel: KanjiQuizLevel = "core",
): QuizQuestion[] {
  return makeFromKinds(kind === "mix" ? MIX_KINDS : [kind], count, rand, kanjiLevel);
}

export function makeFromKinds(
  kinds: QuizKind[],
  count: number,
  rand: () => number = Math.random,
  kanjiLevel: KanjiQuizLevel = "core",
  poolOpts: QuizPoolOpts = {},
): QuizQuestion[] {
  const used = new Set<string>();
  const out: QuizQuestion[] = [];
  let guard = 0;
  while (out.length < count && guard++ < count * 20) {
    const q = nextFromKinds(kinds, used, rand, kanjiLevel, poolOpts);
    if (!q) break;
    if (out.some((prev) => questionsClash(prev, q))) continue;
    out.push(q);
  }
  return out;
}

export function makeDailyQuiz(date: string, count = 15) {
  return makeQuiz("mix", count, mulberry32(dateSeed(date)));
}

const DAILY_VOCAB_KINDS: QuizKind[] = [
  "vocab-meaning",
  "meaning-vocab",
  "listen-vocab",
  "vocab-kana",
  "cloze",
];

export function makeDailyVocabQuiz(ids: string[], date: string, count = ids.length) {
  return makeFromKinds(DAILY_VOCAB_KINDS, count, mulberry32(dateSeed(`${date}-vocab`)), "core", {
    vocabLevel: "both",
    focusIds: ids,
  });
}

const DAILY_KANJI_KINDS: QuizKind[] = ["kanji", "kanji-read", "listen-kanji"];

export function makeDailyKanjiQuiz(ids: string[], date: string, count = ids.length) {
  return makeFromKinds(DAILY_KANJI_KINDS, count, mulberry32(dateSeed(`${date}-kanji`)), "all", {
    focusKanjiIds: ids,
  });
}

export function makeKanaReview(scope: KanaReviewScope, count = 12, rand: () => number = Math.random) {
  const bag = scope === "hira" ? KANA_HIRA_KINDS : scope === "kata" ? KANA_KATA_KINDS : KANA_BOTH_KINDS;
  return makeFromKinds(bag, count, rand, "core");
}

export function makeKanjiReview(level: KanjiQuizLevel = "N5", count = 12, rand: () => number = Math.random) {
  const bag = level === "N3" || level === "N2" || level === "N1" ? KANJI_ADV_KINDS : KANJI_CORE_KINDS;
  return makeFromKinds(bag, count, rand, level);
}
