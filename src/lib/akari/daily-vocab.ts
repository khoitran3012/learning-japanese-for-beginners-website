import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import type { SrsItem, VocabEntry } from "./types";

export const DAILY_VOCAB_COUNT = 8;

const CORPUS: VocabEntry[] = [...VOCAB_N5, ...VOCAB_N4];

function dayNumber(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return Math.floor(Date.UTC(y ?? 2026, (m ?? 1) - 1, d ?? 1) / 86_400_000);
}

function knownTier(srs: Record<string, SrsItem> | undefined, id: string) {
  const it = srs?.[id];
  if (!it || it.correct + it.incorrect === 0) return 0;
  if (it.correct < 2) return 1;
  return 2;
}

/** 8 từ mới mỗi ngày, xoay N5→N4. Bỏ từ đã thuộc rồi lấy từ tiếp theo trong chu kỳ. */
export function dailyVocabPack(
  date: string,
  srs?: Record<string, SrsItem>,
  count = DAILY_VOCAB_COUNT,
): VocabEntry[] {
  const n = CORPUS.length;
  if (!n) return [];
  const start = ((dayNumber(date) % n) * count) % n;
  const ordered: VocabEntry[] = [];
  for (let i = 0; i < n; i++) ordered.push(CORPUS[(start + i) % n]!);
  const picked: VocabEntry[] = [];
  const used = new Set<string>();
  for (const tier of [0, 1, 2]) {
    for (const v of ordered) {
      if (picked.length >= count) return picked;
      if (used.has(v.id)) continue;
      if (knownTier(srs, v.id) !== tier) continue;
      picked.push(v);
      used.add(v.id);
    }
  }
  return picked;
}
