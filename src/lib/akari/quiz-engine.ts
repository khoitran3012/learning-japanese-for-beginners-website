import { HIRAGANA, KATAKANA } from "@/data/kana";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { KANJI_N5 } from "@/data/kanji-n5";
import { KANJI_N4 } from "@/data/kanji-n4";
import { GRAMMAR_N5 } from "@/data/grammar-n5";
import { GRAMMAR_N4 } from "@/data/grammar-n4";
import { kanaToRomaji, toHiragana } from "./kana-util";
import type { VocabEntry } from "./types";

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
  | "mix";

export interface QuizQuestion {
  id: string;
  kind: QuizKind;
  prompt: string;
  promptJp?: string;
  speak?: string;
  options: string[];
  answer: number;
  explain: string;
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
  return c.kunyomi[0] || toHiragana(c.onyomi[0] ?? "") || c.character;
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
];

export function makeQuiz(kind: QuizKind, count = 10, rand: () => number = Math.random): QuizQuestion[] {
  if (kind === "mix") {
    const kinds: QuizKind[] = [
      "hira-romaji",
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
    ];
    const out: QuizQuestion[] = [];
    const per = Math.max(1, Math.ceil(count / kinds.length));
    for (const k of kinds) out.push(...makeQuiz(k, per, rand));
    return shuffle(out, rand).slice(0, count);
  }

  const hira = HIRAGANA.filter((k) => k.group === "gojuon");
  const kata = KATAKANA.filter((k) => k.group === "gojuon");
  const vocab: VocabEntry[] = [...VOCAB_N5, ...VOCAB_N4];
  const kanji = [...KANJI_N5, ...KANJI_N4];
  const grammar = [...GRAMMAR_N5, ...GRAMMAR_N4];

  if (kind === "hira-romaji" || kind === "kata-romaji") {
    const pool = kind === "hira-romaji" ? hira : kata;
    return shuffle(pool, rand)
      .slice(0, count)
      .map((c) => {
        const wrong = pickWrong(pool, c, 3, (x) => x.romaji, rand);
        const opts = shuffle([c, ...wrong], rand);
        return {
          id: `q-${c.id}`,
          kind,
          prompt: `${c.char} đọc là?`,
          promptJp: c.char,
          speak: c.char,
          options: opts.map((o) => o.romaji),
          answer: opts.findIndex((o) => o.id === c.id),
          explain: `${c.char} · ${c.romaji}`,
        };
      });
  }

  if (kind === "romaji-hira") {
    return shuffle(hira, rand)
      .slice(0, count)
      .map((c) => {
        const wrong = pickWrong(hira, c, 3, (x) => x.char, rand);
        const opts = shuffle([c, ...wrong], rand);
        return {
          id: `q-r-${c.id}`,
          kind,
          prompt: `"${c.romaji}" là chữ nào?`,
          speak: c.char,
          options: opts.map((o) => o.char),
          answer: opts.findIndex((o) => o.id === c.id),
          explain: `${c.romaji} = ${c.char}`,
        };
      });
  }

  if (kind === "listen") {
    return shuffle(hira, rand)
      .slice(0, count)
      .map((c) => {
        const wrong = pickWrong(hira, c, 3, (x) => x.char, rand);
        const opts = shuffle([c, ...wrong], rand);
        return {
          id: `q-l-${c.id}`,
          kind,
          prompt: "Nghe và chọn chữ",
          speak: c.char,
          options: opts.map((o) => `${o.char} · ${o.romaji}`),
          answer: opts.findIndex((o) => o.id === c.id),
          explain: `Bạn nghe ${c.char} (${c.romaji}).`,
        };
      });
  }

  if (kind === "listen-vocab") {
    const pool = VOCAB_N5;
    return shuffle(pool, rand)
      .slice(0, count)
      .map((c) => {
        const wrong = pickWrong(pool, c, 3, (x) => x.meaning_vi, rand);
        const opts = shuffle([c, ...wrong], rand);
        return {
          id: `q-lv-${c.id}`,
          kind,
          prompt: "Nghe từ và chọn nghĩa",
          speak: c.kana,
          options: opts.map((o) => o.meaning_vi),
          answer: opts.findIndex((o) => o.id === c.id),
          explain: `${c.word} · ${c.kana} · ${c.romaji}: ${c.meaning_vi}.`,
        };
      });
  }

  if (kind === "kanji") {
    return shuffle(kanji, rand)
      .slice(0, count)
      .map((c) => {
        const speak = kanjiSpeak(c);
        const wrong = pickWrong(kanji, c, 3, (x) => x.meaning_vi, rand);
        const opts = shuffle([c, ...wrong], rand);
        return {
          id: `q-${c.id}`,
          kind,
          prompt: `${c.character} nghĩa là?`,
          promptJp: c.character,
          speak,
          options: opts.map((o) => o.meaning_vi),
          answer: opts.findIndex((o) => o.id === c.id),
          explain: `${c.character} · ${c.meaning_vi}. Kun ${c.kunyomi.join(" / ") || "—"} · on ${c.onyomi.map((o) => `${o} (${kanaToRomaji(o)})`).join(" / ")}.`,
        };
      });
  }

  if (kind === "kanji-read") {
    return shuffle(kanji, rand)
      .slice(0, count)
      .map((c) => {
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
          id: `q-kr-${c.id}`,
          kind,
          prompt: `${c.character} đọc là? (hiragana / romaji)`,
          promptJp: c.character,
          speak: reading,
          options: opts.map((o) => o.label),
          answer: opts.findIndex((o) => o.id === c.id),
          explain: `${c.character} · kun ${c.kunyomi.join(" / ") || "—"} · on ${c.onyomi.join(" / ")} (${c.onyomi.map(kanaToRomaji).join(", ")}).`,
        };
      });
  }

  if (kind === "listen-kanji") {
    return shuffle(kanji, rand)
      .slice(0, count)
      .map((c) => {
        const speak = kanjiSpeak(c);
        const wrong = pickWrong(kanji, c, 3, (x) => x.character, rand);
        const opts = shuffle([c, ...wrong], rand);
        return {
          id: `q-lk-${c.id}`,
          kind,
          prompt: "Nghe cách đọc (hiragana), chọn kanji",
          speak,
          options: opts.map((o) => `${o.character} · ${o.meaning_vi}`),
          answer: opts.findIndex((o) => o.id === c.id),
          explain: `Nghe ${speak} (${kanaToRomaji(speak)}) → ${c.character}. On ${c.onyomi.join("/")} · kun ${c.kunyomi.join("/") || "—"}.`,
        };
      });
  }

  if (kind === "grammar") {
    return shuffle(grammar, rand)
      .slice(0, count)
      .map((c) => {
        const wrong = pickWrong(grammar, c, 3, (x) => x.meaning_vi, rand);
        const opts = shuffle([c, ...wrong], rand);
        return {
          id: `q-${c.id}`,
          kind,
          prompt: `${c.name} dùng để?`,
          promptJp: c.name,
          options: opts.map((o) => o.meaning_vi),
          answer: opts.findIndex((o) => o.id === c.id),
          explain: `${c.name}: ${c.meaning_vi}. ${c.structure}`,
        };
      });
  }

  if (kind === "particle") {
    return shuffle(PARTICLES, rand)
      .slice(0, count)
      .map((c, i) => {
        const opts = shuffle(c.options, rand);
        return {
          id: `q-p-${i}-${c.answer}`,
          kind,
          prompt: "Chọn trợ từ đúng",
          promptJp: c.blank,
          speak: c.speak,
          options: opts,
          answer: opts.findIndex((o) => o === c.answer),
          explain: c.explain,
        };
      });
  }

  if (kind === "meaning-vocab") {
    const vpool = VOCAB_N5;
    return shuffle(vpool, rand)
      .slice(0, count)
      .map((c) => {
        const wrong = pickWrong(vpool, c, 3, (x) => x.word, rand);
        const opts = shuffle([c, ...wrong], rand);
        return {
          id: `q-mv-${c.id}`,
          kind,
          prompt: `"${c.meaning_vi}" = ?`,
          speak: c.kana,
          options: opts.map((o) => `${o.word} · ${o.kana}`),
          answer: opts.findIndex((o) => o.id === c.id),
          explain: `${c.meaning_vi} là ${c.word} (${c.kana}, ${c.romaji}).`,
        };
      });
  }

  const vpool: VocabEntry[] = vocab;
  return shuffle(vpool, rand)
    .slice(0, count)
    .map((c) => {
      const wrong = pickWrong(vpool, c, 3, (x) => x.meaning_vi, rand);
      const opts = shuffle([c, ...wrong], rand);
      return {
        id: `q-v-${c.id}`,
        kind: "vocab-meaning",
        prompt: `${c.word} nghĩa là?`,
        promptJp: c.word,
        speak: c.kana,
        options: opts.map((o) => o.meaning_vi),
        answer: opts.findIndex((o) => o.id === c.id),
        explain: `${c.word} (${c.kana}, ${c.romaji}): ${c.meaning_vi}.`,
      };
    });
}

export function makeDailyQuiz(date: string, count = 15) {
  return makeQuiz("mix", count, mulberry32(dateSeed(date)));
}
