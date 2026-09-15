import type { SrsItem } from "./types";

/** Simplified SM-2. quality: 0 forget, 3 hard, 4 good, 5 easy */
export function reviewSrs(item: SrsItem, quality: 0 | 1 | 2 | 3 | 4 | 5, now = Date.now()): SrsItem {
  const next = { ...item, lastStudied: now };
  if (quality < 3) {
    next.incorrect += 1;
    next.repetitions = 0;
    next.interval = 0.01;
    next.leitnerBox = Math.max(1, next.leitnerBox - 1);
    next.status = "learning";
    next.nextReview = now + 10 * 60 * 1000;
  } else {
    next.correct += 1;
    if (next.repetitions === 0) next.interval = 1;
    else if (next.repetitions === 1) next.interval = 3;
    else next.interval = Math.round(next.interval * next.ease);
    next.repetitions += 1;
    next.leitnerBox = Math.min(5, next.leitnerBox + 1);
    if (next.repetitions >= 5 && next.ease >= 2.4) next.status = "mastered";
    else next.status = "review";
    next.nextReview = now + next.interval * 24 * 60 * 60 * 1000;
  }
  const q = quality;
  next.ease = Math.max(1.3, next.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  return next;
}

export function newSrsItem(id: string, itemType: SrsItem["itemType"]): SrsItem {
  return {
    id,
    itemType,
    lastStudied: 0,
    correct: 0,
    incorrect: 0,
    ease: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: 0,
    status: "new",
    leitnerBox: 1,
  };
}

export function isDue(item: SrsItem, now = Date.now()) {
  return item.nextReview <= now;
}

export function qualityFromLabel(label: "forgot" | "hard" | "good" | "easy"): 0 | 3 | 4 | 5 {
  if (label === "forgot") return 0;
  if (label === "hard") return 3;
  if (label === "easy") return 5;
  return 4;
}
