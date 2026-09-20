import type { GardenCategory } from "./config";

export type GardenPlacement = {
  id: string;
  itemId: string;
  x: number;
  y: number;
  scale?: number;
};

export type GardenSnapshot = {
  signedIn: boolean;
  xp: number;
  level: number;
  levelName: string;
  levelNameJp: string;
  nextLevelXp: number | null;
  wordsLearned: number;
  lessons: number;
  streak: number;
  quizzes: number;
  dailyBonus: number;
  lastDailyDate: string | null;
  lastStudyDate: string | null;
  canClaimDaily: boolean;
  soundOn: boolean;
  unlocked: string[];
  newUnlocks: { id: string; name: string; nameJp: string; category: GardenCategory }[];
  placements: GardenPlacement[];
};

export type GardenLearningInput = {
  wordsLearned: number;
  streak: number;
  studiedToday: boolean;
};
