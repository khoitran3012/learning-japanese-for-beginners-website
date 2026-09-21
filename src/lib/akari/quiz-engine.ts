import { HIRAGANA, KATAKANA } from "@/data/kana";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { allKanji, practiceKanji } from "@/data/kanji-set";
import { GRAMMAR_N5 } from "@/data/grammar-n5";
import { GRAMMAR_N4 } from "@/data/grammar-n4";
import { learnRadicals } from "@/data/radicals";
import { meaningParts } from "./answer-check";
import { kanaToRomaji, toHiragana } from "./kana-util";
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

export interface QuizQuestion {
  id: string;
  kind: QuizKind;
  sourceId: string;
  prompt: string;
  promptJp?: string;
  speak?: string;
  options: string[];
  answer: number;
  explain: string;
  typedAnswers?: string[];
  typedHint?: string;
}

function shuffle<T>(arr: T[], rand: () => number = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function pickWrong<T>(pool: T[], correct: T, n: number, key: (x: T) => string, rand: () => number = Math.random) {
  const ck = key(correct);
  return shuffle(
    pool.filter((x) => key(x) !== ck),
    rand,
  ).slice(0, n);
}

function pickOne<T>(pool: T[], used: Set<string>, idOf: (x: T) => string, rand: () => number): T | null {
  const fresh = pool.filter((x) => !used.has(idOf(x)));
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

function dateSeed(date: string) {
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

function pools(kanjiLevel: KanjiQuizLevel = "core") {
  const hira = HIRAGANA.filter((k) => k.group === "gojuon" || k.group === "dakuten" || k.group === "handakuten" || k.group === "yoon");
  const kata = KATAKANA.filter((k) => k.group === "gojuon" || k.group === "dakuten" || k.group === "handakuten" || k.group === "yoon");
  const vocab: VocabEntry[] = [...VOCAB_N5, ...VOCAB_N4];
  const all = allKanji();
  const kanji =
    kanjiLevel === "all"
      ? all
      : kanjiLevel === "core"
        ? practiceKanji()
        : all.filter((k) => k.level === kanjiLevel);
  const grammar = [...GRAMMAR_N5, ...GRAMMAR_N4];
  return { hira, kata, vocab, kanji, grammar };
}

function buildOne(kind: QuizKind, used: Set<string>, rand: () => number, kanjiLevel: KanjiQuizLevel = "core"): QuizQuestion | null {
  const { hira, kata, vocab, kanji, grammar } = pools(kind === "mix" ? "core" : kanjiLevel);
  const mark = (sourceId: string) => used.add(`${kind}:${sourceId}`);

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
      options: opts.map((o) => o.char),
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
      options: opts.map((o) => `${o.char} · ${o.romaji}`),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `Bạn nghe ${c.char} (${c.romaji}).`,
    };
  }

  if (kind === "listen-vocab") {
    const pool = vocab;
    const c = pickOne(pool, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const wrong = pickWrong(pool, c, 3, (x) => x.meaning_vi, rand);
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
    const c = pickOne(kanji, used, (x) => `${kind}:${x.id}`, rand);
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
      options: opts.map((o) => o.meaning_vi),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.character} · Hán-Việt ${c.han_viet || "—"} · ${c.meaning_vi}. Kun ${c.kunyomi.join(" / ") || "—"} · on ${c.onyomi.map((o) => `${o} (${kanaToRomaji(o)})`).join(" / ")}.`,
      typedAnswers: [...meaningParts(c.meaning_vi), c.han_viet].filter(Boolean),
      typedHint: "Gõ nghĩa tiếng Việt",
    };
  }

  if (kind === "kanji-read") {
    const c = pickOne(kanji, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const reading = kanjiSpeak(c);
    const romaji = kanaToRomaji(reading);
    const pool = kanji
      .map((k) => {
        const r = kanjiSpeak(k);
        return { id: k.id, label: `${r} · ${kanaToRomaji(r)}` };
      })
      .filter((x) => x.label);
    const correct = { id: c.id, label: `${reading} · ${romaji}` };
    const wrong = pickWrong(pool, correct, 3, (x) => x.label, rand);
    const opts = shuffle([correct, ...wrong], rand);
    return {
      id: qid(kind, c.id, rand),
      kind,
      sourceId: c.id,
      prompt: `${c.character} đọc là? (hiragana / romaji)`,
      promptJp: c.character,
      speak: reading,
      options: opts.map((o) => o.label),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.character} · Hán-Việt ${c.han_viet || "—"} · kun ${c.kunyomi.join(" / ") || "—"} · on ${c.onyomi.join(" / ")} (${c.onyomi.map(kanaToRomaji).join(", ")}).`,
      typedAnswers: [reading, romaji, ...c.kunyomi, ...c.onyomi.map(toHiragana)].filter(Boolean),
      typedHint: "Gõ hiragana hoặc romaji",
    };
  }

  if (kind === "listen-kanji") {
    const c = pickOne(kanji, used, (x) => `${kind}:${x.id}`, rand);
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
      options: opts.map((o) => `${o.character} · ${o.han_viet || o.meaning_vi}`),
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
      options: opts.map((o) => `${o.han_viet} · ${o.meaning_vi}`),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.char} · ${c.han_viet} · ${c.name_kana} (${kanaToRomaji(c.name_kana)}) · ${c.meaning_vi}. ${c.hint}`,
      typedAnswers: [c.han_viet, c.name_kana, c.meaning_vi, kanaToRomaji(c.name_kana)].filter(Boolean),
      typedHint: "Gõ Hán-Việt hoặc tên bộ",
    };
  }

  if (kind === "meaning-vocab") {
    const c = pickOne(vocab, used, (x) => `${kind}:${x.id}`, rand);
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
      options: opts.map((o) => `${o.word} · ${o.kana}`),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.meaning_vi} là ${c.word} (${c.kana}, ${c.romaji}).`,
      typedAnswers: [c.romaji, c.kana, c.word],
      typedHint: "Gõ từ (romaji / kana)",
    };
  }

  if (kind === "vocab-kana") {
    const c = pickOne(vocab, used, (x) => `${kind}:${x.id}`, rand);
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
      options: opts.map((o) => `${o.kana} · ${o.romaji}`),
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
      const c = pickOne(vocab, used, (x) => `${kind}:${x.id}`, rand);
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
        options: opts.map((o) => o.romaji),
        answer: opts.findIndex((o) => o.id === c.id),
        explain: `${c.word} · ${c.kana} · ${c.romaji}`,
        typedAnswers: [c.romaji, c.kana],
        typedHint: "Gõ romaji",
      };
    }
    const c = pickOne(kanji, used, (x) => `${kind}:${x.id}`, rand);
    if (!c) return null;
    mark(c.id);
    const reading = kanjiSpeak(c);
    const romaji = kanaToRomaji(reading);
    const wrongReadings = pickWrong(kanji, c, 3, (x) => kanaToRomaji(kanjiSpeak(x)), rand);
    const opts = shuffle([romaji, ...wrongReadings.map((k) => kanaToRomaji(kanjiSpeak(k)))], rand);
    return {
      id: qid(kind, c.id, rand),
      kind,
      sourceId: c.id,
      prompt: "Gõ romaji cách đọc kanji",
      promptJp: c.character,
      speak: reading,
      options: opts,
      answer: opts.findIndex((o) => o === romaji),
      explain: `${c.character} · Hán-Việt ${c.han_viet || "—"} · ${reading} · ${romaji}`,
      typedAnswers: [romaji, reading, ...c.kunyomi],
      typedHint: "Gõ romaji hoặc hiragana",
    };
  }

  if (kind === "cloze") {
    const clozePool = vocab.filter((v) => v.example_sentence.includes(v.word) || v.example_sentence.includes(v.kana));
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
      options: opts.map((o) => `${o.word} · ${o.kana}`),
      answer: opts.findIndex((o) => o.id === c.id),
      explain: `${c.example_sentence} — ${c.example_meaning_vi}`,
      typedAnswers: [c.word, c.kana, c.romaji],
      typedHint: "Gõ từ còn thiếu",
    };
  }

  const c = pickOne(vocab, used, (x) => `vocab-meaning:${x.id}`, rand);
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

export function nextQuestion(
  kind: QuizKind,
  used: Set<string>,
  rand: () => number = Math.random,
  kanjiLevel: KanjiQuizLevel = "core",
): QuizQuestion | null {
  if (kind === "mix") {
    const order = shuffle(MIX_KINDS, rand);
    for (const k of order) {
      const q = buildOne(k, used, rand, "core");
      if (q) return q;
    }
    used.clear();
    return buildOne(shuffle(MIX_KINDS, rand)[0] ?? "vocab-meaning", used, rand, "core");
  }
  const q = buildOne(kind, used, rand, kanjiLevel);
  if (q) return q;
  const stale = [...used].filter((k) => k.startsWith(`${kind}:`));
  for (const k of stale) used.delete(k);
  return buildOne(kind, used, rand, kanjiLevel);
}

export function makeQuiz(
  kind: QuizKind,
  count = 10,
  rand: () => number = Math.random,
  kanjiLevel: KanjiQuizLevel = "core",
): QuizQuestion[] {
  const used = new Set<string>();
  const out: QuizQuestion[] = [];
  let guard = 0;
  while (out.length < count && guard++ < count * 12) {
    const q = nextQuestion(kind, used, rand, kanjiLevel);
    if (!q) break;
    out.push(q);
  }
  return out;
}

export function makeDailyQuiz(date: string, count = 15) {
  return makeQuiz("mix", count, mulberry32(dateSeed(date)));
}
