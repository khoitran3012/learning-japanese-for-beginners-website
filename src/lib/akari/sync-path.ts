import { recordPathProgress } from "./path-rank";

export async function syncPathProgress(lessonIds: string[]) {
  if (lessonIds.length === 0) return;
  try {
    await recordPathProgress({ data: { lessonIds } });
  } catch {
    /* signed out or network — local progress still saved */
  }
}
