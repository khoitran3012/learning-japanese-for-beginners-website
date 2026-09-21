import { useCallback, useEffect, useMemo, useState } from "react";
import { todayKey } from "@/lib/utils";
import { learnedCount, useProgress } from "@/lib/akari/progress";
import { learnedWordCount } from "./sync";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  claimGardenDaily,
  loadGarden,
  reportGardenLearning,
  setGardenSound,
} from "./api";
import { localSnapshot, setLocalSound, claimLocalDaily } from "./local";
import { GARDEN_CONFIG } from "./config";
import { gardenEvents } from "./events";
import { calendarMarks, dailyGoalsFrom, historyFromDays } from "./goals";
import type { GardenSnapshot } from "./types";

function fromLocalProgress(
  srs: Record<string, import("@/lib/akari/types").SrsItem>,
  lessons: Set<string>,
  streak: number,
  lastStudyDate: string | null,
  quizScores: { score: number; total: number }[],
): GardenSnapshot {
  return localSnapshot({
    wordsLearned: learnedCount(srs, "v-"),
    lessons: lessons.size,
    streak,
    quizzes: quizScores.length,
    studyXp: 0,
    lastStudyDate,
    kanaHira: learnedCount(srs, "h-"),
    kanaKata: learnedCount(srs, "k-"),
    vocab: learnedCount(srs, "v-"),
    kanji: learnedCount(srs, "kj-"),
    grammar: learnedCount(srs, "g-"),
    quizScores,
  });
}

export function useGarden() {
  const { user, isPending } = useCurrentUserState();
  const srs = useProgress((s) => s.srs);
  const lessons = useProgress((s) => s.completedLessonIds);
  const streak = useProgress((s) => s.streak);
  const lastStudyDate = useProgress((s) => s.lastStudyDate);
  const quizScores = useProgress((s) => s.quizScores);
  const today = useProgress((s) => s.today);
  const days = useProgress((s) => s.days);
  const ready = useProgress((s) => s.ready);
  const [remote, setRemote] = useState<GardenSnapshot | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  const local = useMemo(
    () => fromLocalProgress(srs, lessons, streak, lastStudyDate, quizScores),
    [srs, lessons, streak, lastStudyDate, quizScores, tick],
  );

  const garden: GardenSnapshot = useMemo(() => {
    if (!remote?.signedIn) return local;
    return {
      ...local,
      signedIn: true,
      soundOn: remote.soundOn,
      dailyBonus: remote.dailyBonus,
      lastDailyDate: remote.lastDailyDate,
      canClaimDaily: local.lastStudyDate === todayKey() && remote.lastDailyDate !== todayKey(),
    };
  }, [local, remote]);

  const date = todayKey();
  const goals = useMemo(() => dailyGoalsFrom({ today, srs, date }), [today, srs, date]);
  const marks = useMemo(() => calendarMarks(days, date), [days, date]);
  const history = useMemo(() => historyFromDays(days), [days]);
  const startedAt = days.length ? [...days].sort((a, b) => a.date.localeCompare(b.date))[0]?.date ?? lastStudyDate : lastStudyDate;
  const goalsDone = goals.length > 0 && goals.every((g) => g.done);

  const refresh = useCallback(async () => {
    try {
      const res = await loadGarden();
      if (res && "signedIn" in res && res.signedIn) {
        setRemote(res);
        setError(false);
      } else {
        setRemote(null);
      }
    } catch {
      setError(true);
      setRemote(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh, user?.id]);

  useEffect(() => {
    return gardenEvents.on("gardenSynced", () => {
      void refresh();
    });
  }, [refresh]);

  useEffect(() => {
    if (!ready || isPending) return;
    const words = learnedWordCount(srs);
    void reportGardenLearning({
      data: {
        wordsLearned: words,
        streak,
        studiedToday: lastStudyDate === todayKey(),
      },
    }).then((res) => {
      if (res && "signedIn" in res && res.signedIn) setRemote(res);
    }).catch(() => {
      /* local garden still works */
    });
  }, [ready, isPending, srs, streak, lastStudyDate]);

  const ackUnlocks = useCallback(async (_ids: string[]) => {
    return;
  }, []);

  const claimDaily = useCallback(async () => {
    if (garden.signedIn) {
      try {
        const next = await claimGardenDaily();
        setRemote(next);
        return next;
      } catch {
        setError(true);
      }
    }
    claimLocalDaily(lastStudyDate === todayKey());
    setTick((n) => n + 1);
    return fromLocalProgress(srs, lessons, streak, lastStudyDate, quizScores);
  }, [garden.signedIn, lastStudyDate, srs, lessons, streak, quizScores]);

  useEffect(() => {
    if (!ready || !goalsDone || !garden.canClaimDaily) return;
    void claimDaily();
  }, [ready, goalsDone, garden.canClaimDaily, claimDaily]);

  const toggleSound = useCallback(async (on: boolean) => {
    if (garden.signedIn) {
      try {
        await setGardenSound({ data: on });
        setRemote((prev) => (prev ? { ...prev, soundOn: on } : prev));
        return;
      } catch {
        /* local */
      }
    }
    setLocalSound(on);
    setTick((n) => n + 1);
  }, [garden.signedIn]);

  return {
    garden,
    loading,
    error,
    refresh,
    ackUnlocks,
    claimDaily,
    toggleSound,
    config: GARDEN_CONFIG,
    goals,
    marks,
    history,
    startedAt,
    goalsDone,
  };
}
