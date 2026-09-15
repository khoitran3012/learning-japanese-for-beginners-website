import { HIRAGANA, KATAKANA } from "@/data/kana";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { KANJI_N5 } from "@/data/kanji-n5";
import { KANJI_N4 } from "@/data/kanji-n4";
import type { VocabEntry } from "./types";

export type QuizKind =
  | "hira-romaji"
  | "romaji-hira"
  | "kata-romaji"
  | "vocab-meaning"
  | "meaning-vocab"
  | "listen"
  | "kanji";

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

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function pickWrong<T>(pool: T[], correct: T, n: number, key: (x: T) => string) {
  const ck = key(correct);
  return shuffle(pool.filter((x) => key(x) !== ck)).slice(0, n);
}

export function makeQuiz(kind: QuizKind, count = 10): QuizQuestion[] {
  const hira = HIRAGANA.filter((k) => k.group === "gojuon");
  const kata = KATAKANA.filter((k) => k.group === "gojuon");
  const vocab = kind.includes("n4") ? VOCAB_N4 : [...VOCAB_N5, ...VOCAB_N4];
  const kanji = [...KANJI_N5, ...KANJI_N4];

  if (kind === "hira-romaji" || kind === "kata-romaji") {
    const pool = kind === "hira-romaji" ? hira : kata;
    return shuffle(pool)
      .slice(0, count)
      .map((c) => {
        const wrong = pickWrong(pool, c, 3, (x) => x.romaji);
        const opts = shuffle([c, ...wrong]);
        return {
          id: `q-${c.id}`,
          kind,
          prompt: `${c.char} = ?`,
          promptJp: c.char,
          speak: c.char,
          options: opts.map((o) => o.romaji),
          answer: opts.findIndex((o) => o.id === c.id),
          explain: `${c.char} đọc là ${c.romaji}.`,
        };
      });
  }

  if (kind === "romaji-hira") {
    return shuffle(hira)
      .slice(0, count)
      .map((c) => {
        const wrong = pickWrong(hira, c, 3, (x) => x.char);
        const opts = shuffle([c, ...wrong]);
        return {
          id: `q-r-${c.id}`,
          kind,
          prompt: `"${c.romaji}" = ?`,
          speak: c.char,
          options: opts.map((o) => o.char),
          answer: opts.findIndex((o) => o.id === c.id),
          explain: `${c.romaji} là ${c.char}.`,
        };
      });
  }

  if (kind === "listen") {
    const pool = hira;
    return shuffle(pool)
      .slice(0, count)
      .map((c) => {
        const wrong = pickWrong(pool, c, 3, (x) => x.char);
        const opts = shuffle([c, ...wrong]);
        return {
          id: `q-l-${c.id}`,
          kind,
          prompt: "Nghe và chọn chữ",
          speak: c.char,
          options: opts.map((o) => `${o.char} (${o.romaji})`),
          answer: opts.findIndex((o) => o.id === c.id),
          explain: `Bạn nghe ${c.char} (${c.romaji}).`,
        };
      });
  }

  if (kind === "kanji") {
    return shuffle(kanji)
      .slice(0, count)
      .map((c) => {
        const wrong = pickWrong(kanji, c, 3, (x) => x.meaning_vi);
        const opts = shuffle([c, ...wrong]);
        return {
          id: `q-${c.id}`,
          kind,
          prompt: `${c.character} nghĩa là?`,
          promptJp: c.character,
          speak: c.character,
          options: opts.map((o) => o.meaning_vi),
          answer: opts.findIndex((o) => o.id === c.id),
          explain: `${c.character}: ${c.meaning_vi}. On: ${c.onyomi.join(", ")}.`,
        };
      });
  }

  const vpool: VocabEntry[] = VOCAB_N5;
  if (kind === "meaning-vocab") {
    return shuffle(vpool)
      .slice(0, count)
      .map((c) => {
        const wrong = pickWrong(vpool, c, 3, (x) => x.word);
        const opts = shuffle([c, ...wrong]);
        return {
          id: `q-mv-${c.id}`,
          kind,
          prompt: `"${c.meaning_vi}" = ?`,
          options: opts.map((o) => o.word),
          answer: opts.findIndex((o) => o.id === c.id),
          explain: `${c.meaning_vi} là ${c.word} (${c.romaji}).`,
        };
      });
  }

  return shuffle(vpool)
    .slice(0, count)
    .map((c) => {
      const wrong = pickWrong(vpool, c, 3, (x) => x.meaning_vi);
      const opts = shuffle([c, ...wrong]);
      return {
        id: `q-v-${c.id}`,
        kind: "vocab-meaning",
        prompt: `${c.word} nghĩa là?`,
        promptJp: c.word,
        speak: c.word,
        options: opts.map((o) => o.meaning_vi),
        answer: opts.findIndex((o) => o.id === c.id),
        explain: `${c.word} (${c.kana}, ${c.romaji}): ${c.meaning_vi}.`,
      };
    });
}
