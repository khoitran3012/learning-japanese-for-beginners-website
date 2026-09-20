import { r as submitStudyResult } from "./leaderboard-0qp47GSx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sync-score-D1NE6-of.js
async function syncQuizToLeaderboard(input) {
	if (input.total <= 0) return;
	try {
		await submitStudyResult({ data: {
			score: input.score,
			total: input.total,
			minutes: input.minutes ?? 0,
			streak: input.streak ?? 0,
			dailyScore: input.dailyScore ?? 0,
			displayName: input.displayName ?? void 0
		} });
	} catch {}
}
//#endregion
export { syncQuizToLeaderboard as t };
