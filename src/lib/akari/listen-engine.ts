import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { LISTEN_SENTENCES } from "@/data/listening";
import { isSpeakableKana, ttsKana } from "./kana-speak";
import type { JlptLevel, VocabEntry } from "./types";

export type ListenKind = "word" | "sentence";

export interface ListenQuestion {
  id: string;
  kind: ListenKind;
  title: string;
  level: JlptLevel;
  /** Hiragana / kana fed to TTS — never bare kanji or POS notes. */
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

function uniqueStrings(values: string[], keep: string, n: number, rand: () => number) {
  const seen = new Set<string>([keep.trim()]);
  const out: string[] = [];
  for (const raw of shuffle(values, rand)) {
    const v = raw.trim();
    if (!v || seen.has(v)) continue;
    seen.add(v);
    out.push(v);
    if (out.length >= n) break;
  }
  return out;
}

function cleanVocab(v: VocabEntry): boolean {
  return isSpeakableKana(v.kana) && Boolean(v.meaning_vi.trim()) && !/^to /i.test(v.meaning_vi);
}

function vocabPool(level: "all" | JlptLevel): VocabEntry[] {
  const raw = level === "N5" ? VOCAB_N5 : level === "N4" ? VOCAB_N4 : [...VOCAB_N5, ...VOCAB_N4];
  return raw.filter(cleanVocab);
}

function sentencePool(level: "all" | JlptLevel) {
  const raw = level === "all" ? LISTEN_SENTENCES : LISTEN_SENTENCES.filter((s) => s.level === level);
  return raw.filter((s) => isSpeakableKana(s.kana));
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
  const meanings = vocab.map((v) => v.meaning_vi);

  let guard = 0;
  while (out.length < n && guard++ < n * 10) {
    const preferSentence =
      sentences.length > 0 && rand() < 0.4 && usedSent.size < sentences.length;
    if (preferSentence) {
      const fresh = sentences.filter((s) => !usedSent.has(s.id));
      const item = fresh[Math.floor(rand() * fresh.length)];
      if (!item) continue;
      const speak = ttsKana(item.kana, item.jp);
      if (!speak) continue;
      const sentMeanings = sentences.filter((s) => s.id !== item.id).map((s) => s.vi);
      let others = uniqueStrings(sentMeanings, item.vi, 3, rand);
      if (others.length < 3) {
        others = others.concat(
          uniqueStrings(meanings, item.vi, 3 - others.length, rand).filter((m) => !others.includes(m)),
        );
      }
      if (others.length < 2) continue;
      const options = shuffle([item.vi, ...others], rand);
      const answerIndex = options.indexOf(item.vi);
      if (answerIndex < 0) continue;
      usedSent.add(item.id);
      out.push({
        id: `${item.id}-${out.length}`,
        kind: "sentence",
        title: item.title,
        level: item.level,
        speak,
        jp: item.jp,
        kana: item.kana,
        romaji: item.romaji,
        vi: item.vi,
        options,
        answerIndex,
      });
      continue;
    }

    const fresh = vocab.filter((v) => !usedVocab.has(v.id));
    const pool = fresh.length ? fresh : vocab;
    const c = pool[Math.floor(rand() * pool.length)];
    if (!c) continue;
    const speak = ttsKana(c.kana, c.word);
    if (!speak) continue;
    const others = uniqueStrings(
      uniqueMeaningList(vocab, c.meaning_vi),
      c.meaning_vi,
      3,
      rand,
    );
    if (others.length < 2) continue;
    const options = shuffle([c.meaning_vi, ...others], rand);
    const answerIndex = options.indexOf(c.meaning_vi);
    if (answerIndex < 0) continue;
    usedVocab.add(c.id);
    out.push({
      id: `${c.id}-${out.length}`,
      kind: "word",
      title: c.word,
      level: c.level,
      speak,
      jp: c.word,
      kana: c.kana,
      romaji: c.romaji,
      vi: c.meaning_vi,
      options,
      answerIndex,
    });
  }
  return out;
}

function uniqueMeaningList(pool: VocabEntry[], meaning: string) {
  const key = meaning.trim();
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of pool) {
    const m = v.meaning_vi.trim();
    if (!m || m === key || seen.has(m)) continue;
    seen.add(m);
    out.push(m);
  }
  return out;
}
