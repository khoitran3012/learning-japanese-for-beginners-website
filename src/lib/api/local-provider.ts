import { DataProvider, type SearchQuery } from "./data-provider";
import { HIRAGANA, KATAKANA } from "@/data/kana";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { allKanji } from "@/data/kanji-set";
import { GRAMMAR_N5 } from "@/data/grammar-n5";
import { GRAMMAR_N4 } from "@/data/grammar-n4";
import { LESSONS } from "@/data/lessons";
import { buildDictionary, searchLocal } from "@/lib/dictionary/local";
import type { DictionaryEntry } from "@/lib/akari/types";

export class LocalDataProvider extends DataProvider {
  name = "local";
  private dict: DictionaryEntry[] | null = null;

  async getKana() {
    return [...HIRAGANA, ...KATAKANA];
  }
  async getVocab() {
    return [...VOCAB_N5, ...VOCAB_N4];
  }
  async getKanji() {
    return allKanji();
  }
  async getGrammar() {
    return [...GRAMMAR_N5, ...GRAMMAR_N4];
  }
  async getLessons() {
    return LESSONS;
  }
  async getDictionary() {
    if (!this.dict) {
      const extra = await import("@/data/dictionary-extra").then((m) => m.DICTIONARY_EXTRA);
      this.dict = buildDictionary(
        [...VOCAB_N5, ...VOCAB_N4],
        allKanji(),
        extra,
      );
    }
    return this.dict;
  }
  async searchDictionary(query: SearchQuery) {
    const dict = await this.getDictionary();
    return searchLocal(dict, query);
  }
}

export class RemoteDataProvider extends DataProvider {
  name = "remote";
  constructor(private fallback: DataProvider) {
    super();
  }
  getKana() {
    return this.fallback.getKana();
  }
  getVocab() {
    return this.fallback.getVocab();
  }
  getKanji() {
    return this.fallback.getKanji();
  }
  getGrammar() {
    return this.fallback.getGrammar();
  }
  getLessons() {
    return this.fallback.getLessons();
  }
  getDictionary() {
    return this.fallback.getDictionary();
  }
  async searchDictionary(query: SearchQuery) {
    try {
      const local = await this.fallback.searchDictionary(query);
      if (local.length > 0) return local;
      return local;
    } catch {
      return this.fallback.searchDictionary(query);
    }
  }
}
