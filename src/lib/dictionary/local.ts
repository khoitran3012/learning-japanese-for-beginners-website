import type { DictionaryEntry, KanjiEntry, VocabEntry } from "@/lib/akari/types";
import type { SearchQuery } from "@/lib/api/data-provider";
import { hasJapanese, normalizeRomaji, romajiVariants, stripKanaLength } from "@/lib/akari/romaji";
import { verbAliases, queryStems } from "./conjugate";
import { fuzzyScore } from "./fuzzy";
import { foldCompact, foldKana, foldVi, uniqueStrings } from "./text";

export function vocabToDict(v: VocabEntry): DictionaryEntry {
  const aliases = uniqueStrings([
    ...(v.meanings ?? []),
    ...verbAliases(v.word, v.kana, v.part_of_speech),
  ]);
  return {
    id: v.id,
    kanji: v.word,
    kana: v.kana,
    romaji: v.romaji,
    meanings: v.meanings ?? [v.meaning_vi],
    part_of_speech: v.part_of_speech,
    jlpt: [v.level],
    common: v.common ?? v.difficulty <= 2,
    frequency: v.difficulty,
    pitch_accent: null,
    examples: [
      {
        jp: v.example_sentence,
        kana: v.example_kana,
        romaji: v.example_romaji,
        vi: v.example_meaning_vi,
      },
    ],
    tags: v.tags,
    vocabId: v.id,
    kanjiChars: [...v.word].filter((c) => /[\u4e00-\u9fff]/.test(c)),
    aliases,
  };
}

function headKey(e: DictionaryEntry) {
  return `${e.kanji}::${e.kana}`;
}

export function mergeEntries(a: DictionaryEntry, b: DictionaryEntry): DictionaryEntry {
  const examples = [...a.examples];
  for (const ex of b.examples) {
    if (!examples.some((x) => x.jp === ex.jp)) examples.push(ex);
  }
  return {
    ...a,
    meanings: uniqueStrings([...a.meanings, ...b.meanings]),
    part_of_speech: uniqueStrings([...a.part_of_speech, ...b.part_of_speech]) as DictionaryEntry["part_of_speech"],
    jlpt: uniqueStrings([...a.jlpt, ...b.jlpt]) as DictionaryEntry["jlpt"],
    tags: uniqueStrings([...a.tags, ...b.tags]),
    related: uniqueStrings([...(a.related ?? []), ...(b.related ?? [])]),
    kanjiChars: uniqueStrings([...(a.kanjiChars ?? []), ...(b.kanjiChars ?? [])]),
    aliases: uniqueStrings([...(a.aliases ?? []), ...(b.aliases ?? [])]),
    examples,
    common: a.common || b.common,
    frequency: Math.min(a.frequency, b.frequency),
    pitch_accent: a.pitch_accent ?? b.pitch_accent,
    romaji: a.romaji || b.romaji,
  };
}

function withSearchAliases(entry: DictionaryEntry): DictionaryEntry {
  const extra = verbAliases(entry.kanji, entry.kana, entry.part_of_speech);
  if (entry.kana === "なに" || entry.kanji === "何") extra.push("nan", "なん");
  if (entry.kana === "は" && entry.romaji === "wa") extra.push("ha");
  if (entry.kana === "を" && (entry.romaji === "o" || entry.romaji === "wo")) extra.push("wo");
  if (entry.kana === "へ" && entry.romaji === "e") extra.push("he");
  if (!extra.length && !entry.aliases?.length) return entry;
  return { ...entry, aliases: uniqueStrings([...(entry.aliases ?? []), ...extra]) };
}

export function buildDictionary(
  vocab: VocabEntry[],
  _kanji: KanjiEntry[],
  extra: DictionaryEntry[] = [],
): DictionaryEntry[] {
  const byId = new Map<string, DictionaryEntry>();
  const byHead = new Map<string, string>();

  const add = (entry: DictionaryEntry) => {
    const next = withSearchAliases(entry);
    const head = headKey(next);
    const existingId = byHead.get(head);
    if (existingId) {
      const current = byId.get(existingId);
      if (current) {
        byId.set(existingId, mergeEntries(current, { ...next, id: existingId }));
        return;
      }
    }
    if (byId.has(next.id)) {
      byId.set(next.id, mergeEntries(byId.get(next.id)!, next));
      byHead.set(head, next.id);
      return;
    }
    byId.set(next.id, next);
    byHead.set(head, next.id);
  };

  for (const v of vocab) add(vocabToDict(v));
  for (const e of extra) add(e);
  return [...byId.values()];
}

function posMatch(entryPos: string[], filters: string[]) {
  return entryPos.some((p) =>
    filters.some((f) => p === f || p.startsWith(f) || p.includes(f) || f.includes(p)),
  );
}

export function matchesFilters(e: DictionaryEntry, query: Pick<SearchQuery, "jlpt" | "pos">) {
  if (query.jlpt && query.jlpt.length && !e.jlpt.some((l) => query.jlpt!.includes(l))) {
    return false;
  }
  if (query.pos && query.pos.length && !posMatch(e.part_of_speech, query.pos)) {
    return false;
  }
  return true;
}

export function filterDictionary(dict: DictionaryEntry[], query: SearchQuery) {
  const filtered = dict.filter((e) => matchesFilters(e, query));
  filtered.sort(
    (a, b) => Number(b.common) - Number(a.common) || a.frequency - b.frequency || a.kana.localeCompare(b.kana, "ja"),
  );
  return filtered.slice(0, query.limit ?? 80);
}

function scoreEntry(e: DictionaryEntry, raw: string) {
  const q = raw.toLowerCase();
  const qNorm = normalizeRomaji(q);
  const qFold = foldVi(q);
  const qCompact = foldCompact(q);
  const qKana = foldKana(raw);
  const variants = romajiVariants(q);
  const stems = queryStems(raw);
  const jp = hasJapanese(raw);
  let score = 0;

  const fields = [
    e.kanji,
    e.kana,
    foldKana(e.kana),
    e.romaji.toLowerCase(),
    normalizeRomaji(e.romaji),
    ...e.meanings.map((m) => m.toLowerCase()),
    ...e.meanings.map((m) => foldVi(m)),
    ...e.meanings.map((m) => foldCompact(m)),
    ...e.tags,
    ...(e.aliases ?? []),
  ];

  for (const f of fields) {
    if (!f) continue;
    if (f === raw || f === q || f === qFold || f === qKana) score = Math.max(score, 1);
    else if (f.startsWith(q) || f.startsWith(raw) || f.startsWith(qFold) || f.startsWith(qKana)) {
      score = Math.max(score, raw.length === 1 ? 0.7 : 0.94);
    } else if (f.includes(q) || f.includes(raw) || (qFold.length >= 3 && f.includes(qFold))) {
      score = Math.max(score, 0.8);
    }
  }

  for (const stem of stems) {
    if (stem === e.kanji || stem === e.kana) score = Math.max(score, 0.99);
    if (e.kanji.startsWith(stem) && stem.length >= 2) score = Math.max(score, 0.93);
    if (e.kana.startsWith(stem) && stem.length >= 2) score = Math.max(score, 0.93);
    for (const a of e.aliases ?? []) {
      if (a === stem || a.startsWith(stem)) score = Math.max(score, 0.96);
    }
  }

  const nRomaji = normalizeRomaji(e.romaji);
  for (const v of variants) {
    score = Math.max(score, fuzzyScore(v, nRomaji));
    if (nRomaji.startsWith(v) && v.length >= 2) score = Math.max(score, v.length >= 3 ? 0.88 : 0.7);
    if (e.kana.startsWith(raw) || e.kanji.startsWith(raw)) score = Math.max(score, 0.96);
  }

  if (!jp) {
    for (const m of e.meanings) {
      const mf = foldVi(m);
      const tokens = mf.split(" ").filter(Boolean);
      if (mf === qFold || foldCompact(m) === qCompact) score = Math.max(score, 1);
      else if (tokens.includes(qFold) || tokens.includes(qCompact)) score = Math.max(score, 0.97);
      else if (mf.startsWith(qFold) && qFold.length >= 2) score = Math.max(score, 0.9);
      else if (qFold.length >= 3 && mf.includes(qFold)) score = Math.max(score, 0.84);
      else if (qFold.length >= 3) score = Math.max(score, fuzzyScore(qFold, mf) * 0.95);
    }
  }

  score = Math.max(score, fuzzyScore(qNorm, nRomaji));
  if (qNorm.length >= 3 && nRomaji.startsWith(qNorm)) score = Math.max(score, 0.9);
  if (qKana.length >= 2 && stripKanaLength(e.kana).startsWith(qKana)) score = Math.max(score, 0.9);

  if (raw.length === 1 && jp) {
    if (e.kanji !== raw && e.kana !== raw) score *= 0.55;
  }

  return score;
}

export function searchLocal(dict: DictionaryEntry[], query: SearchQuery) {
  const raw = query.q.trim();
  if (!raw) return filterDictionary(dict, query);

  const scored = dict
    .filter((e) => matchesFilters(e, query))
    .map((e) => ({ e, score: scoreEntry(e, raw) }))
    .filter((x) => x.score >= 0.42)
    .sort((a, b) => b.score - a.score || Number(b.e.common) - Number(a.e.common) || a.e.frequency - b.e.frequency);

  return scored.slice(0, query.limit ?? 40).map((x) => x.e);
}

export function suggest(dict: DictionaryEntry[], q: string, limit = 8) {
  return searchLocal(dict, { q, limit });
}
