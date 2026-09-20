import { gardenEvents } from "./events";
import { reportGardenLearning } from "./api";
import type { SrsItem } from "@/lib/akari/types";

let timer: number | null = null;
let lastPayload = "";

export function learnedWordCount(srs: Record<string, SrsItem>) {
  return Object.values(srs).filter((item) => item.correct + item.incorrect > 0).length;
}

export function scheduleGardenSync(input: {
  srs: Record<string, SrsItem>;
  completedLessonIds: Set<string>;
  streak: number;
  lastStudyDate: string | null;
}) {
  const payload = {
    wordsLearned: learnedWordCount(input.srs),
    streak: input.streak,
    studiedToday: Boolean(input.lastStudyDate),
  };
  const key = JSON.stringify(payload);
  if (key === lastPayload) return;
  if (timer) window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    lastPayload = key;
    void reportGardenLearning({ data: payload })
      .then((res) => {
        if (!res || !("xp" in res)) return;
        gardenEvents.emit("gardenSynced", { xp: res.xp });
        if (res.newUnlocks.length) {
          for (const item of res.newUnlocks) {
            gardenEvents.emit("milestoneUnlocked", { itemId: item.id });
          }
        }
      })
      .catch(() => {
        /* garden is optional */
      });
  }, 900);
}
