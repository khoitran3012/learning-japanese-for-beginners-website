import type {
  JlptLevel,
  PartOfSpeech,
  VocabCategory,
  VocabEntry,
} from "@/lib/akari/types";

export function v(
  level: JlptLevel,
  id: string,
  word: string,
  kana: string,
  romaji: string,
  meaning_vi: string,
  category: VocabCategory,
  pos: PartOfSpeech[],
  example_sentence: string,
  example_kana: string,
  example_romaji: string,
  example_meaning_vi: string,
  difficulty: 1 | 2 | 3 | 4 | 5 = 1,
  common = true,
): VocabEntry {
  return {
    id,
    word,
    kana,
    romaji,
    meaning_vi,
    level,
    category,
    part_of_speech: pos,
    example_sentence,
    example_kana,
    example_romaji,
    example_meaning_vi,
    tags: [category, level],
    difficulty,
    common,
  };
}
