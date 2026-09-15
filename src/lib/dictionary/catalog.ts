import { useEffect, useState } from "react";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { KANJI_N5 } from "@/data/kanji-n5";
import { KANJI_N4 } from "@/data/kanji-n4";
import { GRAMMAR_N5 } from "@/data/grammar-n5";
import { GRAMMAR_N4 } from "@/data/grammar-n4";
import { DICTIONARY_EXTRA } from "@/data/dictionary-extra";
import { DICTIONARY_CORE } from "@/data/dictionary-core";
import { kanaById } from "@/data/kana";
import { buildDictionary, searchLocal } from "./local";
import { hasKanji } from "@/lib/akari/romaji";
import type { DictionaryEntry, KanjiEntry } from "@/lib/akari/types";
import type { SearchQuery } from "@/lib/api/data-provider";
import { allImportedDictionary } from "@/lib/akari/storage";

let builtin: DictionaryEntry[] | null = null;
let importedCache: DictionaryEntry[] = [];
let tick = 0;
const listeners = new Set<() => void>();

function emit() {
  tick += 1;
  for (const fn of listeners) fn();
}

export function subscribeDictionary(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function builtinDictionary(): DictionaryEntry[] {
  if (!builtin) {
    builtin = buildDictionary(
      [...VOCAB_N5, ...VOCAB_N4],
      [...KANJI_N5, ...KANJI_N4],
      [...DICTIONARY_EXTRA, ...DICTIONARY_CORE],
    );
  }
  return builtin;
}

export function setImportedCache(entries: DictionaryEntry[]) {
  importedCache = entries;
  emit();
}

export function rememberImported(entries: DictionaryEntry[]) {
  const map = new Map(importedCache.map((e) => [e.id, e]));
  for (const e of entries) map.set(e.id, e);
  importedCache = [...map.values()];
  emit();
}

export function mergeDictionary(extra: DictionaryEntry[] = []): DictionaryEntry[] {
  return buildDictionary(
    [...VOCAB_N5, ...VOCAB_N4],
    [...KANJI_N5, ...KANJI_N4],
    [...DICTIONARY_EXTRA, ...DICTIONARY_CORE, ...extra],
  );
}

export async function fullDictionary(): Promise<DictionaryEntry[]> {
  try {
    const imported = await allImportedDictionary();
    const changed =
      imported.length !== importedCache.length ||
      imported.some((e, i) => e.id !== importedCache[i]?.id);
    importedCache = imported;
    if (changed) emit();
    return mergeDictionary(imported);
  } catch {
    return builtinDictionary();
  }
}

export function currentDictionary() {
  return mergeDictionary(importedCache);
}

export function findBuiltin(id: string) {
  return builtinDictionary().find((e) => e.id === id);
}

export function findEntry(id: string) {
  return findBuiltin(id) ?? importedCache.find((e) => e.id === id);
}

export function searchDictionary(dict: DictionaryEntry[], query: SearchQuery) {
  return searchLocal(dict, query);
}

export function allKanji(): KanjiEntry[] {
  return [...KANJI_N5, ...KANJI_N4];
}

export function kanjiByChar(ch: string) {
  return allKanji().find((k) => k.character === ch);
}

export function kanjiInWord(word: string, entry?: DictionaryEntry) {
  const chars = entry?.kanjiChars?.length
    ? entry.kanjiChars
    : [...word].filter((c) => hasKanji(c));
  return chars.map((c) => ({ char: c, entry: kanjiByChar(c) }));
}

export function relatedEntries(entry: DictionaryEntry): DictionaryEntry[] {
  const keys = entry.related ?? [];
  if (!keys.length) return [];
  const pool = [...builtinDictionary(), ...importedCache];
  const out: DictionaryEntry[] = [];
  for (const key of keys) {
    const hit = pool.find((e) => e.id === key || e.kanji === key || e.kana === key);
    if (hit && hit.id !== entry.id && !out.some((x) => x.id === hit.id)) out.push(hit);
  }
  return out;
}

export interface ResolvedItem {
  id: string;
  title: string;
  sub: string;
  to: string;
  type: string;
  speak?: string;
}

export function resolveStudyItem(id: string): ResolvedItem | null {
  const kana = kanaById(id);
  if (kana) {
    return {
      id,
      title: kana.char,
      sub: kana.romaji,
      to: `/${kana.kind}/${kana.id}`,
      type: kana.kind === "hiragana" ? "Hiragana" : "Katakana",
      speak: kana.char,
    };
  }
  const vocab = [...VOCAB_N5, ...VOCAB_N4].find((v) => v.id === id);
  if (vocab) {
    return {
      id,
      title: vocab.word,
      sub: vocab.meaning_vi,
      to: `/vocabulary/${vocab.id}`,
      type: "Từ vựng",
      speak: vocab.word,
    };
  }
  const kj = allKanji().find((k) => k.id === id);
  if (kj) {
    return {
      id,
      title: kj.character,
      sub: kj.meaning_vi,
      to: `/kanji/${kj.id}`,
      type: "Kanji",
      speak: kj.character,
    };
  }
  const g = [...GRAMMAR_N5, ...GRAMMAR_N4].find((x) => x.id === id);
  if (g) {
    return {
      id,
      title: g.name,
      sub: g.meaning_vi,
      to: `/grammar/${g.id}`,
      type: "Ngữ pháp",
    };
  }
  const d = findEntry(id);
  if (d) {
    return {
      id,
      title: d.kanji,
      sub: d.meanings[0] ?? d.kana,
      to: `/dictionary/${d.id}`,
      type: "Từ điển",
      speak: d.kanji,
    };
  }
  return {
    id,
    title: id,
    sub: "Mục tùy chọn",
    to: `/dictionary/${id}`,
    type: "Khác",
  };
}

export function useDictionary() {
  const [dict, setDict] = useState<DictionaryEntry[]>(() => builtinDictionary());

  useEffect(() => {
    let alive = true;
    void fullDictionary().then((next) => {
      if (alive) setDict(next);
    });
    const unsub = subscribeDictionary(() => {
      if (alive) setDict(currentDictionary());
    });
    return () => {
      alive = false;
      unsub();
    };
  }, []);

  return dict;
}

export const POS_FILTERS = [
  "danh từ",
  "động từ",
  "tính từ -i",
  "tính từ -na",
  "trạng từ",
  "trợ từ",
  "biểu hiện",
] as const;
