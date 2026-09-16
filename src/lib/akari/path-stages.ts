import { LESSONS } from "@/data/lessons";

export const PATH_STAGES = [
  { id: "nền tảng", label: "Nền tảng", kicker: "基礎" },
  { id: "hiragana", label: "Hiragana", kicker: "ひらがな" },
  { id: "katakana", label: "Katakana", kicker: "カタカナ" },
  { id: "từ vựng", label: "Từ vựng", kicker: "語彙" },
  { id: "ngữ pháp", label: "Ngữ pháp", kicker: "文法" },
  { id: "kanji", label: "Kanji", kicker: "漢字" },
  { id: "đọc", label: "Đọc hiểu", kicker: "読解" },
  { id: "nghe", label: "Nghe hiểu", kicker: "聴解" },
  { id: "kiểm tra", label: "Kiểm tra", kicker: "確認" },
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
