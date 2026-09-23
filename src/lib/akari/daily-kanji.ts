import { practiceKanji } from "@/data/kanji-set";
import type { KanjiEntry, SrsItem } from "./types";

export const DAILY_KANJI_COUNT = 6;

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

/** 6 kanji mới mỗi ngày, N5 trước rồi N4. Chữ đã thuộc thì nhảy sang chữ kế. */
export function dailyKanjiPack(
  date: string,
  srs?: Record<string, SrsItem>,
  count = DAILY_KANJI_COUNT,
): KanjiEntry[] {
  const corpus = practiceKanji();
  const n = corpus.length;
  if (!n) return [];
  const start = ((dayNumber(date) % n) * count) % n;
  const ordered: KanjiEntry[] = [];
  for (let i = 0; i < n; i++) ordered.push(corpus[(start + i) % n]!);
  const picked: KanjiEntry[] = [];
  const used = new Set<string>();
  for (const tier of [0, 1, 2]) {
    for (const k of ordered) {
      if (picked.length >= count) return picked;
      if (used.has(k.id)) continue;
      if (knownTier(srs, k.id) !== tier) continue;
      picked.push(k);
      used.add(k.id);
    }
  }
  return picked;
}
