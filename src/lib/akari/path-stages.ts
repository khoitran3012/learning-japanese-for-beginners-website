import { LESSONS } from "@/data/lessons";
import type { Lesson } from "@/lib/akari/types";

/** Thứ tự lớp Việt: kana → nói/từ → kanji Hán-Việt → ngữ pháp → đọc nghe → nâng cao. */
export const PATH_STAGES = [
  { id: "nền tảng", label: "Làm quen", kicker: "基礎", hint: "Hiểu tiếng Nhật ghi âm thế nào trước khi viết." },
  { id: "hiragana", label: "Hiragana", kicker: "ひらがな", hint: "Bảng 50 âm — đọc được thì mới nghe và nói được." },
  { id: "katakana", label: "Katakana", kicker: "カタカナ", hint: "Từ mượn, tên riêng, thực đơn." },
  { id: "giao tiếp", label: "Nói & từ vựng N5", kicker: "会話", hint: "Chào hỏi, số, gia đình, trường, ăn uống — nghe rồi nhắc." },
  { id: "kanji", label: "Kanji + Hán-Việt", kicker: "漢字", hint: "Mỗi chữ một âm Hán-Việt để nhớ nghĩa, rồi mới on/kun." },
  { id: "từ vựng", label: "Từ vựng N4", kicker: "語彙", hint: "Từ công việc, xã hội — học trong cụm." },
  { id: "ngữ pháp", label: "Ngữ pháp", kicker: "文法", hint: "Trợ từ và mẫu câu sau khi đã có từ để nhét vào." },
  { id: "đọc", label: "Đọc hiểu", kicker: "読解", hint: "Đoạn ngắn, tìm chủ đề và động từ cuối câu." },
  { id: "nghe", label: "Nghe nói", kicker: "聴解", hint: "Nghe từ/câu, chọn đúng nghĩa — rồi nhại lại." },
  { id: "kiểm tra", label: "Kiểm tra", kicker: "確認", hint: "Chốt N5 rồi N4 trước khi lên cấp." },
  { id: "nâng cao", label: "N3 → N1", kicker: "上級", hint: "Kanji N3–N1 theo bài, từ hay gặp đến khó. Hán-Việt vẫn là neo." },
] as const;

export type PathStageId = (typeof PATH_STAGES)[number]["id"];

export const STAGE_TOTALS: Record<string, number> = PATH_STAGES.reduce(
  (acc, s) => {
    acc[s.id] = LESSONS.filter((l) => l.stage === s.id).length;
    return acc;
  },
  {} as Record<string, number>,
);

export const LESSON_TOTAL = LESSONS.length;

export const LESSON_STAGE = Object.fromEntries(LESSONS.map((l) => [l.id, l.stage])) as Record<
  string,
  string
>;

export function isPathStage(value: string): value is PathStageId {
  return PATH_STAGES.some((s) => s.id === value);
}

export function stageLabel(id: string) {
  return PATH_STAGES.find((s) => s.id === id)?.label ?? id;
}

export function stageHint(id: string) {
  return PATH_STAGES.find((s) => s.id === id)?.hint ?? "";
}

export function stageKicker(id: string) {
  return PATH_STAGES.find((s) => s.id === id)?.kicker ?? "";
}

export function countCompletedByStage(completed: Iterable<string>) {
  const counts: Record<string, number> = {};
  for (const id of completed) {
    const stage = LESSON_STAGE[id];
    if (!stage) continue;
    counts[stage] = (counts[stage] ?? 0) + 1;
  }
  return counts;
}

/** Gom bài theo thứ tự học — mỗi cụm liên tiếp cùng stage là một chặng. */
export function journeyGroups(lessons: Lesson[] = LESSONS) {
  const sorted = [...lessons].sort((a, b) => a.order - b.order);
  const groups: { stage: string; items: Lesson[] }[] = [];
  for (const lesson of sorted) {
    const last = groups[groups.length - 1];
    if (last && last.stage === lesson.stage) last.items.push(lesson);
    else groups.push({ stage: lesson.stage, items: [lesson] });
  }
  return { sorted, groups };
}
