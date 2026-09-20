import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { LISTEN_SENTENCES } from "@/data/listening";
import type { JlptLevel, VocabEntry } from "./types";

export type ListenKind = "word" | "sentence";

export interface ListenQuestion {
  id: string;
  kind: ListenKind;
  title: string;
  level: JlptLevel;
  /** Hiragana / kana fed to TTS — never bare kanji. */
  speak: string;
  jp: string;
  kana: string;
  romaji: string;
  vi: string;
  options: string[];
  answerIndex: number;
}

function shuffle<T>(arr: T[], rand: () => number) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function vocabPool(level: "all" | JlptLevel): VocabEntry[] {
  if (level === "N5") return VOCAB_N5;
  if (level === "N4") return VOCAB_N4;
  return [...VOCAB_N5, ...VOCAB_N4];
}

function sentencePool(level: "all" | JlptLevel) {
  if (level === "all") return LISTEN_SENTENCES;
  return LISTEN_SENTENCES.filter((s) => s.level === level);
}

function uniqueMeaning(pool: VocabEntry[], meaning: string) {
  const key = meaning.trim();
  return pool.filter((v) => v.meaning_vi.trim() !== key);
}

export function makeListenRound(
  n = 12,
  level: "all" | JlptLevel = "all",
  rand: () => number = Math.random,
): ListenQuestion[] {
  const vocab = vocabPool(level);
  const sentences = sentencePool(level);
  const usedVocab = new Set<string>();
  const usedSent = new Set<string>();
  const out: ListenQuestion[] = [];

  for (let i = 0; i < n; i++) {
    const preferSentence = sentences.length > 0 && rand() < 0.28 && usedSent.size < sentences.length;
    if (preferSentence) {
      const fresh = sentences.filter((s) => !usedSent.has(s.id));
      const item = fresh[Math.floor(rand() * fresh.length)];
      if (!item) continue;
      usedSent.add(item.id);
      const others = shuffle(
        sentences.filter((s) => s.vi !== item.vi).map((s) => s.vi),
        rand,
      ).slice(0, 3);
      if (others.length < 3) {
        const extra = uniqueMeaning(vocab, item.vi)
          .map((v) => v.meaning_vi)
          .filter((m, idx, arr) => arr.indexOf(m) === idx);
        others.push(...shuffle(extra, rand).slice(0, 3 - others.length));
      }
      const options = shuffle([item.vi, ...others.slice(0, 3)], rand);
      out.push({
        id: `${item.id}-${out.length}`,
        kind: "sentence",
        title: item.title,
        level: item.level,
        speak: item.kana,
        jp: item.jp,
        kana: item.kana,
        romaji: item.romaji,
        vi: item.vi,
        options,
        answerIndex: options.indexOf(item.vi),
      });
      continue;
    }

    const fresh = vocab.filter((v) => !usedVocab.has(v.id));
    const pool = fresh.length ? fresh : vocab;
    const c = pool[Math.floor(rand() * pool.length)];
    if (!c) continue;
    usedVocab.add(c.id);
    const wrong = shuffle(uniqueMeaning(vocab, c.meaning_vi), rand)
      .filter((v, idx, arr) => arr.findIndex((x) => x.meaning_vi === v.meaning_vi) === idx)
      .slice(0, 3);
    const options = shuffle([c.meaning_vi, ...wrong.map((v) => v.meaning_vi)], rand);
    out.push({
      id: `${c.id}-${out.length}`,
      kind: "word",
      title: c.word,
      level: c.level,
      speak: c.kana,
      jp: c.word,
      kana: c.kana,
      romaji: c.romaji,
      vi: c.meaning_vi,
      options,
      answerIndex: options.indexOf(c.meaning_vi),
    });
  }
  return out;
}
