import type { Example, KanjiEntry, VocabEntry } from "@/lib/akari/types";
import { VOCAB_EXTRA_EXAMPLES } from "@/data/vocab-extra-examples";
import { KANJI_USAGE } from "@/data/kanji-usage";

export function allVocabExamples(v: VocabEntry): Example[] {
  const primary: Example = {
    jp: v.example_sentence,
    kana: v.example_kana,
    romaji: v.example_romaji,
    vi: v.example_meaning_vi,
  };
  const extra = [...(v.examples ?? []), ...(VOCAB_EXTRA_EXAMPLES[v.id] ?? [])];
  const out: Example[] = [primary];
  for (const item of extra) {
    if (!item.jp || out.some((x) => x.jp === item.jp)) continue;
    out.push(item);
  }
  return out;
}

export function allKanjiExamples(k: KanjiEntry) {
  const extra = KANJI_USAGE[k.character];
  const words = [...k.examples];
  if (extra?.words) {
    for (const w of extra.words) {
      if (!words.some((x) => x.word === w.word)) words.push(w);
    }
  }
  const sentences: Example[] = [];
  for (const w of words) {
    if (w.sentence) {
      sentences.push({
        jp: w.sentence,
        kana: w.sentence_kana,
        romaji: w.sentence_romaji ?? "",
        vi: w.sentence_vi ?? "",
      });
    }
  }
  if (extra?.sentences) {
    for (const s of extra.sentences) {
      if (!sentences.some((x) => x.jp === s.jp)) sentences.push(s);
    }
  }
  return { words, sentences, tip: extra?.tip ?? "" };
}
