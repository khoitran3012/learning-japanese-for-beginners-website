import type { QuizQuestion } from "./quiz-engine";
import type { SrsItem } from "./types";

/**
 * Bản ghi SRS mà một câu hỏi cập nhật.
 *
 * `sourceId` là id gốc (chữ kana, từ vựng, kanji, mẫu ngữ pháp) nên mọi màn
 * luyện đều ghi tiến độ vào cùng một thẻ — cần dùng chung để `/quiz` và
 * `/weak` không lệch nhau.
 */
export function srsOf(q: QuizQuestion): { id: string; type: SrsItem["itemType"] } {
  if (
    q.kind === "kanji" ||
    q.kind === "kanji-read" ||
    q.kind === "listen-kanji" ||
    q.kind === "radical"
  ) {
    return { id: q.sourceId, type: "kanji" };
  }
  if (
    q.kind === "vocab-meaning" ||
    q.kind === "meaning-vocab" ||
    q.kind === "listen-vocab" ||
    q.kind === "vocab-kana" ||
    q.kind === "cloze"
  ) {
    return { id: q.sourceId, type: "vocab" };
  }
  if (q.kind === "grammar" || q.kind === "particle") {
    return { id: q.sourceId, type: "grammar" };
  }
  return { id: q.sourceId, type: "kana" };
}
