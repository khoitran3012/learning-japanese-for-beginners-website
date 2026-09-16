import { submitStudyResult } from "./leaderboard";

export async function syncQuizToLeaderboard(input: {
  score: number;
  total: number;
  minutes?: number;
  streak?: number;
  dailyScore?: number;
  displayName?: string | null;
}) {
  if (input.total <= 0) return;
  try {
    await submitStudyResult({
      data: {
        score: input.score,
        total: input.total,
        minutes: input.minutes ?? 0,
        streak: input.streak ?? 0,
        dailyScore: input.dailyScore ?? 0,
        displayName: input.displayName ?? undefined,
      },
    });
  } catch {
    /* signed out or network — local progress still saved */
  }
}
