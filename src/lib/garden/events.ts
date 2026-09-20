type GardenEventMap = {
  lessonCompleted: { lessonId: string };
  wordLearned: { count: number };
  quizCompleted: { score: number; total: number };
  streakUpdated: { streak: number };
  milestoneUnlocked: { itemId: string };
  gardenSynced: { xp: number };
};

type Handler<K extends keyof GardenEventMap> = (payload: GardenEventMap[K]) => void;

const listeners: { [K in keyof GardenEventMap]?: Set<Handler<K>> } = {};

export const gardenEvents = {
  on<K extends keyof GardenEventMap>(type: K, fn: Handler<K>) {
    const existing = listeners[type];
    const set: Set<Handler<K>> = existing ?? new Set();
    if (!existing) (listeners as Record<K, Set<Handler<K>>>)[type] = set;
    set.add(fn);
    return () => {
      set.delete(fn);
    };
  },
  emit<K extends keyof GardenEventMap>(type: K, payload: GardenEventMap[K]) {
    const set = listeners[type] as Set<Handler<K>> | undefined;
    if (!set) return;
    for (const fn of set) {
      try {
        fn(payload);
      } catch {
        /* garden never crashes learning */
      }
    }
  },
};
