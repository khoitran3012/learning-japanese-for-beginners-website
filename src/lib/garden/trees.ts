/** Cây học tiếng Nhật — cấu hình giai đoạn + XP. Thêm loài mới vào TREES, không đụng engine. */

export type TreeId = "sakura";

export type TreeStage = {
  level: number;
  xp: number;
  id: string;
  name: string;
  nameJp: string;
  mood: string;
};

export type TreeDef = {
  id: TreeId;
  name: string;
  nameJp: string;
  blurb: string;
  stages: TreeStage[];
};

/** XP chỉ từ hoạt động học thật — sửa số ở đây, không hard-code rải rác. */
export const TREE_XP = {
  perKana: 2,
  perVocab: 1,
  perKanji: 2,
  perGrammar: 3,
  perLesson: 15,
  perQuiz: 20,
  quizHighBonus: 10,
  quizHighRatio: 0.8,
  perStreakDay: 5,
  dailyGoalBonus: 30,
  dailyMinutes: 15,
  dailyItems: 10,
} as const;

export const SAKURA_STAGES: TreeStage[] = [
  { level: 0, xp: 0, id: "seed", name: "Hạt giống", nameJp: "種", mood: "Đang chờ được tưới" },
  { level: 1, xp: 100, id: "sprout", name: "Mầm cây", nameJp: "芽", mood: "Khỏe mạnh" },
  { level: 2, xp: 250, id: "young", name: "Cây non", nameJp: "苗", mood: "Đang phát triển" },
  { level: 3, xp: 500, id: "small", name: "Cây nhỏ", nameJp: "若木", mood: "Đang phát triển" },
  { level: 4, xp: 900, id: "grown", name: "Cây trưởng thành", nameJp: "木", mood: "Khỏe mạnh" },
  { level: 5, xp: 1400, id: "flower", name: "Bắt đầu ra hoa", nameJp: "開花", mood: "Đang nở hoa" },
  { level: 6, xp: 2000, id: "sakura", name: "Cây Sakura", nameJp: "桜", mood: "Đang nở hoa" },
  { level: 7, xp: 3000, id: "bloom", name: "Sakura nở rộ", nameJp: "満開", mood: "Nở rộ" },
];

export const TREES: Record<TreeId, TreeDef> = {
  sakura: {
    id: "sakura",
    name: "Sakura",
    nameJp: "桜",
    blurb: "Cây anh đào của bạn — lớn lên mỗi ngày bạn học.",
    stages: SAKURA_STAGES,
  },
};

export const DEFAULT_TREE: TreeId = "sakura";

export function treeById(id: string = DEFAULT_TREE): TreeDef {
  return TREES[(id as TreeId) in TREES ? (id as TreeId) : DEFAULT_TREE];
}

export function stageFromXp(xp: number, tree: TreeDef = TREES.sakura) {
  let current = tree.stages[0]!;
  for (const row of tree.stages) {
    if (xp >= row.xp) current = row;
  }
  const next = tree.stages.find((s) => s.level === current.level + 1) ?? null;
  return { current, next, prevXp: current.xp, nextXp: next?.xp ?? null };
}

export function studyXpFrom(input: {
  kanaHira: number;
  kanaKata: number;
  vocab: number;
  kanji: number;
  grammar: number;
  lessons: number;
  quizzes: Array<{ score: number; total: number }>;
  streak: number;
  dailyBonus: number;
}) {
  const r = TREE_XP;
  const quizXp = input.quizzes.reduce((sum, q) => {
    let n = r.perQuiz;
    if (q.total > 0 && q.score / q.total >= r.quizHighRatio) n += r.quizHighBonus;
    return sum + n;
  }, 0);
  return Math.max(
    0,
    Math.floor(
      input.kanaHira * r.perKana +
        input.kanaKata * r.perKana +
        input.vocab * r.perVocab +
        input.kanji * r.perKanji +
        input.grammar * r.perGrammar +
        input.lessons * r.perLesson +
        quizXp +
        input.streak * r.perStreakDay +
        input.dailyBonus,
    ),
  );
}
