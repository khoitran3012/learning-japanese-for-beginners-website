import { create } from "zustand";
import {
  addMyWord,
  addQuizResult,
  allDayStats,
  allFavorites,
  allMyWords,
  allQuizResults,
  allSrs,
  bumpDayStats,
  completeLesson as persistLesson,
  completedLessons,
  getMeta,
  putSrs,
  removeMyWord,
  setMeta,
  toggleFavorite,
  type DayStats,
} from "./storage";
import { newSrsItem, reviewSrs, qualityFromLabel } from "./srs";
import type { QuizResult, SrsItem } from "./types";
import { todayKey } from "@/lib/utils";
import { lessonsReadyToComplete } from "./path-progress";

type QualityLabel = "forgot" | "hard" | "good" | "easy";

interface ProgressState {
  ready: boolean;
  srs: Record<string, SrsItem>;
  favorites: Set<string>;
  myWords: Set<string>;
  completedLessonIds: Set<string>;
  streak: number;
  lastStudyDate: string | null;
  today: DayStats | null;
  days: DayStats[];
  quizScores: { score: number; total: number }[];
  load: () => Promise<void>;
  mark: (id: string, itemType: SrsItem["itemType"], label: QualityLabel) => Promise<void>;
  remember: (id: string, itemType: SrsItem["itemType"]) => Promise<void>;
  forgot: (id: string, itemType: SrsItem["itemType"]) => Promise<void>;
  logStudy: (items?: number, minutes?: number) => Promise<void>;
  completeLesson: (id: string) => Promise<void>;
  recordQuiz: (result: QuizResult) => Promise<void>;
  syncPathFromStudy: () => Promise<void>;
  refreshSets: () => Promise<void>;
  toggleFav: (id: string, itemType: string) => Promise<boolean>;
  addToStudy: (id: string, itemType: SrsItem["itemType"]) => Promise<void>;
  dropMyWord: (id: string) => Promise<void>;
}

function computeStreak(last: string | null, stored: number) {
  if (!last) return 0;
  const today = todayKey();
  if (last === today) return stored || 1;
  const y = new Date();
  y.setDate(y.getDate() - 1);
  if (last === todayKey(y)) return stored || 1;
  return 0;
}

function upsertDay(days: DayStats[], day: DayStats) {
  const i = days.findIndex((d) => d.date === day.date);
  if (i < 0) return [...days, day];
  const next = [...days];
  next[i] = day;
  return next;
}

export const useProgress = create<ProgressState>((set, get) => ({
  ready: false,
  srs: {},
  favorites: new Set(),
  myWords: new Set(),
  completedLessonIds: new Set(),
  streak: 0,
  lastStudyDate: null,
  today: null,
  days: [],
  quizScores: [],
  load: async () => {
    try {
      const [srsList, favs, mine, lessons, last, streak, days, quizzes] = await Promise.all([
        allSrs(),
        allFavorites(),
        allMyWords(),
        completedLessons(),
        getMeta<string>("lastStudyDate"),
        getMeta<number>("streak"),
        allDayStats(),
        allQuizResults(),
      ]);
      const map: Record<string, SrsItem> = {};
      for (const item of srsList) map[item.id] = item;
      const today = days.find((d) => d.date === todayKey()) ?? null;
      set({
        ready: true,
        srs: map,
        favorites: new Set(favs.map((f) => f.id)),
        myWords: new Set(mine.map((m) => m.id)),
        completedLessonIds: new Set(lessons.map((l) => l.id)),
        lastStudyDate: last ?? null,
        streak: computeStreak(last ?? null, streak ?? 0),
        today,
        days,
        quizScores: quizzes.map((q) => ({ score: q.score, total: q.total })),
      });
      await get().syncPathFromStudy();
    } catch {
      set({ ready: true });
    }
  },
  mark: async (id, itemType, label) => {
    const current = get().srs[id] ?? newSrsItem(id, itemType);
    const next = reviewSrs(current, qualityFromLabel(label));
    await putSrs(next);
    set((s) => ({ srs: { ...s.srs, [id]: next } }));
    await get().logStudy(1, 0.4);
    void get().syncPathFromStudy();
  },
  remember: async (id, itemType) => get().mark(id, itemType, "good"),
  forgot: async (id, itemType) => get().mark(id, itemType, "forgot"),
  logStudy: async (items = 1, minutes = 0.5) => {
    const today = todayKey();
    const prev = get().lastStudyDate;
    let streak = get().streak;
    if (prev !== today) {
      const y = new Date();
      y.setDate(y.getDate() - 1);
      streak = prev === todayKey(y) ? streak + 1 : 1;
      await setMeta("lastStudyDate", today);
      await setMeta("streak", streak);
    }
    const day = await bumpDayStats({ items, minutes }, today);
    set((s) => ({
      lastStudyDate: today,
      streak,
      today: day,
      days: upsertDay(s.days, day),
    }));
    const snap = get();
    void import("@/lib/garden/sync").then(({ scheduleGardenSync }) =>
      scheduleGardenSync({
        srs: snap.srs,
        completedLessonIds: snap.completedLessonIds,
        streak: snap.streak,
        lastStudyDate: snap.lastStudyDate,
      }),
    );
    void import("@/lib/garden/events").then(({ gardenEvents }) =>
      gardenEvents.emit("wordLearned", {
        count: Object.values(snap.srs).filter((x) => x.correct + x.incorrect > 0).length,
      }),
    );
  },
  completeLesson: async (id) => {
    await persistLesson(id);
    set((s) => {
      const next = new Set(s.completedLessonIds);
      next.add(id);
      return { completedLessonIds: next };
    });
    await get().logStudy(3, 5);
    void import("./sync-path").then(({ syncPathProgress }) =>
      syncPathProgress([...get().completedLessonIds]),
    );
    void import("@/lib/garden/events").then(({ gardenEvents }) =>
      gardenEvents.emit("lessonCompleted", { lessonId: id }),
    );
  },
  recordQuiz: async (result) => {
    await addQuizResult(result);
    set((s) => ({ quizScores: [...s.quizScores, { score: result.score, total: result.total }] }));
  },
  /** Đánh dấu bài lộ trình hoàn thành khi đã học đủ chữ/từ trong bài — không cộng thêm phút. */
  syncPathFromStudy: async () => {
    const ready = lessonsReadyToComplete(get().srs, get().completedLessonIds);
    if (!ready.length) return;
    for (const id of ready) await persistLesson(id);
    set((s) => {
      const next = new Set(s.completedLessonIds);
      for (const id of ready) next.add(id);
      return { completedLessonIds: next };
    });
    void import("./sync-path").then(({ syncPathProgress }) =>
      syncPathProgress([...get().completedLessonIds]),
    );
    void import("@/lib/garden/events").then(({ gardenEvents }) =>
      gardenEvents.emit("lessonCompleted", { lessonId: ready[0]! }),
    );
  },
  refreshSets: async () => {
    const [favs, mine] = await Promise.all([allFavorites(), allMyWords()]);
    set({
      favorites: new Set(favs.map((f) => f.id)),
      myWords: new Set(mine.map((m) => m.id)),
    });
  },
  toggleFav: async (id, itemType) => {
    const on = await toggleFavorite(id, itemType);
    await get().refreshSets();
    return on;
  },
  addToStudy: async (id, itemType) => {
    if (!get().srs[id]) {
      const item = newSrsItem(id, itemType);
      await putSrs(item);
      set((s) => ({ srs: { ...s.srs, [id]: item } }));
    }
    await addMyWord(id, itemType === "vocab" || itemType === "custom" ? "vocab" : "dictionary");
    await get().refreshSets();
  },
  dropMyWord: async (id) => {
    await removeMyWord(id);
    await get().refreshSets();
  },
}));

export function masteredCount(srs: Record<string, SrsItem>, prefix: string) {
  return Object.values(srs).filter(
    (x) => x.id.startsWith(prefix) && (x.status === "mastered" || x.correct >= 2),
  ).length;
}

export function learnedCount(srs: Record<string, SrsItem>, prefix: string) {
  return Object.values(srs).filter((x) => x.id.startsWith(prefix) && x.correct + x.incorrect > 0).length;
}
