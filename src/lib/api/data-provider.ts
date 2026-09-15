import type { DictionaryEntry, GrammarEntry, KanjiEntry, KanaChar, Lesson, VocabEntry } from "@/lib/akari/types";

export interface SearchQuery {
  q: string;
  jlpt?: Array<"N5" | "N4" | "N3" | "N2" | "N1">;
  pos?: string[];
  limit?: number;
}

export abstract class DataProvider {
  abstract name: string;
  abstract getKana(): Promise<KanaChar[]>;
  abstract getVocab(): Promise<VocabEntry[]>;
  abstract getKanji(): Promise<KanjiEntry[]>;
  abstract getGrammar(): Promise<GrammarEntry[]>;
  abstract getLessons(): Promise<Lesson[]>;
  abstract getDictionary(): Promise<DictionaryEntry[]>;
  abstract searchDictionary(query: SearchQuery): Promise<DictionaryEntry[]>;
}

let current: DataProvider | null = null;

export function setDataProvider(provider: DataProvider) {
  current = provider;
}

export function getDataProvider() {
  if (!current) throw new Error("DataProvider chưa được khởi tạo");
  return current;
}
