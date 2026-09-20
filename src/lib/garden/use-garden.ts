import { useCallback, useEffect, useMemo, useState } from "react";
import { todayKey } from "@/lib/utils";
import { useProgress } from "@/lib/akari/progress";
import { learnedWordCount } from "./sync";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  acknowledgeGardenUnlocks,
  claimGardenDaily,
  loadGarden,
  reportGardenLearning,
  saveGardenPlacements,
  setGardenSound,
} from "./api";
import { localSnapshot, markLocalSeen, saveLocalPlacements, setLocalSound, claimLocalDaily } from "./local";
import { GARDEN_CONFIG } from "./config";
import { gardenEvents } from "./events";
import type { GardenPlacement, GardenSnapshot } from "./types";

function fromLocalProgress(
  srs: Record<string, import("@/lib/akari/types").SrsItem>,
  lessons: Set<string>,
  streak: number,
  lastStudyDate: string | null,
  quizScores: { score: number; total: number }[],
): GardenSnapshot {
  const words = learnedWordCount(srs);
  return localSnapshot({
    wordsLearned: words,
    lessons: lessons.size,
    streak,
    quizzes: quizScores.length,
    studyXp: quizScores.reduce((a, q) => a + q.score * 10, 0),
    lastStudyDate,
  });
}

export function useGarden() {
  const { user, isPending } = useCurrentUserState();
  const srs = useProgress((s) => s.srs);
  const lessons = useProgress((s) => s.completedLessonIds);
  const streak = useProgress((s) => s.streak);
  const lastStudyDate = useProgress((s) => s.lastStudyDate);
  const quizScores = useProgress((s) => s.quizScores);
  const ready = useProgress((s) => s.ready);
  const [remote, setRemote] = useState<GardenSnapshot | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const local = useMemo(
    () => fromLocalProgress(srs, lessons, streak, lastStudyDate, quizScores),
    [srs, lessons, streak, lastStudyDate, quizScores],
  );

  const garden = remote?.signedIn ? remote : local;

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

  const ackUnlocks = useCallback(async (ids: string[]) => {
    if (!ids.length) return;
    if (garden.signedIn) {
      try {
        const next = await acknowledgeGardenUnlocks({ data: ids });
        setRemote(next);
        return;
      } catch {
        setError(true);
      }
    }
    markLocalSeen(ids);
    setRemote(null);
  }, [garden.signedIn]);

  const savePlacements = useCallback(async (placements: GardenPlacement[]) => {
    if (garden.signedIn) {
      try {
        const next = await saveGardenPlacements({ data: placements });
        setRemote(next);
        return;
      } catch {
        setError(true);
      }
    }
    saveLocalPlacements(placements);
  }, [garden.signedIn]);

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
    return fromLocalProgress(srs, lessons, streak, lastStudyDate, quizScores);
  }, [garden.signedIn, lastStudyDate, srs, lessons, streak, quizScores]);

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
  }, [garden.signedIn]);

  return {
    garden,
    loading,
    error,
    refresh,
    ackUnlocks,
    savePlacements,
    claimDaily,
    toggleSound,
    config: GARDEN_CONFIG,
  };
}
