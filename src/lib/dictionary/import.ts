import type { DictionaryEntry, JlptLevel, PartOfSpeech } from "@/lib/akari/types";

export const ALLOWED_JLPT: JlptLevel[] = ["N5", "N4", "N3", "N2", "N1"];

export const ALLOWED_POS: PartOfSpeech[] = [
  "danh từ",
  "động từ",
  "động từ nhóm 1",
  "động từ nhóm 2",
  "động từ nhóm 3",
  "tính từ -i",
  "tính từ -na",
  "trạng từ",
  "trợ từ",
  "liên từ",
  "đại từ",
  "số từ",
  "từ nghi vấn",
  "biểu hiện",
  "thán từ",
  "định từ",
];

export interface ImportIssue {
  level: "error" | "warn";
  index: number;
  field?: string;
  message: string;
}

export interface ImportResult {
  ok: boolean;
  entries: DictionaryEntry[];
  issues: ImportIssue[];
  index: Record<string, string[]>;
}

function asString(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function asStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => asString(x)).filter(Boolean);
  if (typeof v === "string" && v.trim()) return [v.trim()];
  return [];
}

function slugId(kanji: string, kana: string, i: number) {
  const base = `${kanji || kana || "entry"}-${i}`.toLowerCase().replace(/\s+/g, "-");
  return `imp-${base}`;
}

export function normalizeEntry(raw: Record<string, unknown>, i: number, issues: ImportIssue[]): DictionaryEntry | null {
  const kanji = asString(raw.kanji ?? raw.word ?? raw.character);
  const kana = asString(raw.kana ?? raw.reading);
  const romaji = asString(raw.romaji);
  const meanings = asStringArray(raw.meanings ?? raw.meaning_vi ?? raw.translation);
  const pos = asStringArray(raw.part_of_speech ?? raw.pos) as PartOfSpeech[];
  const jlpt = asStringArray(raw.jlpt ?? raw.level) as JlptLevel[];

  if (!kana) {
    issues.push({ level: "error", index: i, field: "kana", message: "Thiếu kana / cách đọc." });
  }
  if (!meanings.length) {
    issues.push({ level: "error", index: i, field: "meanings", message: "Thiếu nghĩa tiếng Việt." });
  }
  if (!kanji && kana) {
    issues.push({ level: "warn", index: i, field: "kanji", message: "Không có chữ kanji — dùng kana làm headword." });
  }
  for (const p of pos) {
    if (!ALLOWED_POS.includes(p)) {
      issues.push({ level: "error", index: i, field: "part_of_speech", message: `POS không hợp lệ: ${p}` });
    }
  }
  for (const l of jlpt) {
    if (!ALLOWED_JLPT.includes(l)) {
      issues.push({ level: "error", index: i, field: "jlpt", message: `JLPT không hợp lệ: ${l}` });
    }
  }

  const examplesRaw = Array.isArray(raw.examples) ? raw.examples : [];
  const examples = examplesRaw
    .map((ex) => {
      if (!ex || typeof ex !== "object") return null;
      const o = ex as Record<string, unknown>;
      const jp = asString(o.jp ?? o.sentence);
      const vi = asString(o.vi ?? o.meaning_vi);
      if (!jp || !vi) return null;
      return {
        jp,
        kana: asString(o.kana) || undefined,
        romaji: asString(o.romaji),
        vi,
      };
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  if (issues.some((x) => x.level === "error" && x.index === i)) return null;

  return {
    id: asString(raw.id) || slugId(kanji || kana, kana, i),
    kanji: kanji || kana,
    kana,
    romaji,
    meanings,
    part_of_speech: pos.length ? pos : ["danh từ"],
    jlpt: jlpt.length ? jlpt : ["N5"],
    common: Boolean(raw.common),
    frequency: typeof raw.frequency === "number" ? raw.frequency : 5,
    pitch_accent: typeof raw.pitch_accent === "number" ? raw.pitch_accent : null,
    examples,
    tags: asStringArray(raw.tags),
    related: asStringArray(raw.related),
    kanjiChars: asStringArray(raw.kanjiChars),
    vocabId: asString(raw.vocabId) || undefined,
    aliases: asStringArray(raw.aliases),
  };
}

export function parseDictionaryJson(text: string): { data: unknown } | { error: string } {
  try {
    return { data: JSON.parse(text) };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "JSON không hợp lệ" };
  }
}

export function importDictionary(data: unknown): ImportResult {
  const issues: ImportIssue[] = [];
  let rows: unknown[] = [];
  if (Array.isArray(data)) rows = data;
  else if (data && typeof data === "object" && Array.isArray((data as { entries?: unknown }).entries)) {
    rows = (data as { entries: unknown[] }).entries;
  } else {
    return {
      ok: false,
      entries: [],
      issues: [{ level: "error", index: -1, message: "JSON phải là mảng hoặc { entries: [] }." }],
      index: {},
    };
  }

  const seenId = new Set<string>();
  const seenHead = new Set<string>();
  const entries: DictionaryEntry[] = [];

  rows.forEach((row, i) => {
    if (!row || typeof row !== "object") {
      issues.push({ level: "error", index: i, message: "Phần tử không phải object." });
      return;
    }
    const entry = normalizeEntry(row as Record<string, unknown>, i, issues);
    if (!entry) return;
    if (seenId.has(entry.id)) {
      issues.push({ level: "error", index: i, field: "id", message: `Trùng id ${entry.id}` });
      return;
    }
    const head = `${entry.kanji}::${entry.kana}`;
    if (seenHead.has(head)) {
      issues.push({ level: "warn", index: i, message: `Trùng headword ${entry.kanji} / ${entry.kana}` });
    }
    seenId.add(entry.id);
    seenHead.add(head);
    entries.push(entry);
  });

  const index = buildSearchIndex(entries);
  const hasError = issues.some((x) => x.level === "error");
  return { ok: !hasError && entries.length > 0, entries, issues, index };
}

export function buildSearchIndex(entries: DictionaryEntry[]) {
  const index: Record<string, string[]> = {};
  const add = (key: string, id: string) => {
    const k = key.trim().toLowerCase();
    if (!k) return;
    const list = index[k] ?? [];
    if (!list.includes(id)) list.push(id);
    index[k] = list;
  };
  for (const e of entries) {
    add(e.kanji, e.id);
    add(e.kana, e.id);
    add(e.romaji, e.id);
    add(e.romaji.replace(/ou/g, "o").replace(/uu/g, "u"), e.id);
    for (const m of e.meanings) add(m, e.id);
    for (const t of e.tags) add(t, e.id);
    for (const a of e.aliases ?? []) add(a, e.id);
  }
  return index;
}
