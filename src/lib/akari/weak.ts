import { shuffle } from "@/lib/utils";
import { makeFromKinds, type QuizKind, type QuizQuestion } from "./quiz-engine";
import type { SrsItem } from "./types";

/**
 * "Luyện chỗ yếu": chọn những mục mình hay trả lời sai rồi hỏi lại đúng mục đó.
 *
 * `/quiz` hỏi ngẫu nhiên cả kho, `/review` lật thẻ theo hạn ôn — không màn nào
 * tập trung vào lỗi. Ở đây xếp hạng theo tỉ lệ sai + số lần sai + đã quá hạn ôn,
 * rồi dựng câu hỏi có đáp án đúng nằm trong nhóm yếu (`focusIds` của quiz-engine).
 */

/** Số câu mặc định cho một buổi luyện. */
export const WEAK_QUIZ_SIZE = 8;

const VOCAB_KINDS: QuizKind[] = ["vocab-meaning", "meaning-vocab", "vocab-kana", "listen-vocab"];
const KANJI_KINDS: QuizKind[] = ["kanji", "kanji-read", "listen-kanji"];

export interface WeakItem {
  item: SrsItem;
  /** Số lần đã trả lời (đúng + sai). */
  attempts: number;
  /** 0..1 — tỉ lệ sai. */
  missRate: number;
  /** Điểm xếp hạng nội bộ, càng cao càng yếu. */
  weight: number;
}

/** Mục có thể dựng thành câu hỏi trắc nghiệm. Hiện hỗ trợ từ vựng và kanji. */
export function drillable(itemType: SrsItem["itemType"]): boolean {
  return itemType === "vocab" || itemType === "custom" || itemType === "kanji";
}

export function weakItems(srs: Record<string, SrsItem>, limit = 12, now = Date.now()): WeakItem[] {
  const out: WeakItem[] = [];
  for (const item of Object.values(srs)) {
    if (item.incorrect <= 0) continue;
    const attempts = item.correct + item.incorrect;
    const missRate = item.incorrect / Math.max(1, attempts);
    // Mục lâu chưa ôn đáng luyện hơn một chút so với mục vừa mới sai.
    const overdue = item.nextReview <= now ? 0.05 : 0;
    out.push({
      item,
      attempts,
      missRate,
      weight: missRate + Math.min(0.3, item.incorrect * 0.05) + overdue,
    });
  }
  return out
    .sort((a, b) => b.weight - a.weight || b.item.incorrect - a.item.incorrect)
    .slice(0, limit);
}

/**
 * Dựng buổi luyện từ danh sách đã xếp hạng. Đáp án đúng lấy trong nhóm yếu,
 * đáp án nhiễu vẫn lấy cả kho nên câu hỏi không bị đoán được.
 */
export function buildWeakQuiz(
  ranked: WeakItem[],
  count = WEAK_QUIZ_SIZE,
  rand: () => number = Math.random,
): QuizQuestion[] {
  const vocabIds: string[] = [];
  const kanjiIds: string[] = [];
  for (const { item } of ranked) {
    if (!drillable(item.itemType)) continue;
    if (item.itemType === "kanji") kanjiIds.push(item.id);
    else vocabIds.push(item.id);
  }

  const total = vocabIds.length + kanjiIds.length;
  if (!total) return [];

  // Chia câu theo tỉ lệ mục yếu của mỗi loại, nhưng loại nào có mặt thì có
  // ít nhất một câu.
  const vocabTarget = vocabIds.length
    ? Math.max(1, Math.min(count, Math.round((count * vocabIds.length) / total)))
    : 0;
  const kanjiTarget = kanjiIds.length ? Math.max(1, count - vocabTarget) : 0;

  const out: QuizQuestion[] = [];
  if (vocabTarget > 0) {
    out.push(
      ...makeFromKinds(VOCAB_KINDS, vocabTarget, rand, "core", {
        vocabLevel: "both",
        focusIds: vocabIds,
      }),
    );
  }
  if (kanjiTarget > 0) {
    out.push(
      ...makeFromKinds(KANJI_KINDS, kanjiTarget, rand, "all", {
        focusKanjiIds: kanjiIds,
      }),
    );
  }
  return shuffle(out);
}
