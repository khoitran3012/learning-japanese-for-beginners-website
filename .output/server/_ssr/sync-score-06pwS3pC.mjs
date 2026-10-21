import { n as foldVi } from "./answer-check-vNWNvSky.mjs";
import { r as submitStudyResult } from "./leaderboard-CPXAb9k_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sync-score-06pwS3pC.js
function tokens(s) {
	return new Set(foldVi(s).split(/[\s/·,;:+_-]+/).map((t) => t.trim()).filter((t) => t.length > 1));
}
/** Hai đáp án/câu quá gần nhau — loại khỏi cùng một vòng. */
function similarAnswer(a, b) {
	const fa = foldVi(a);
	const fb = foldVi(b);
	if (!fa || !fb) return false;
	if (fa === fb) return true;
	if (fa.length >= 4 && fb.length >= 4 && (fa.includes(fb) || fb.includes(fa))) return true;
	const A = tokens(a);
	const B = tokens(b);
	if (!A.size || !B.size) return false;
	let hit = 0;
	for (const t of A) if (B.has(t)) hit += 1;
	return hit / Math.min(A.size, B.size) >= .65;
}
function questionsClash(a, b) {
	if (a.sourceId === b.sourceId) return true;
	if (a.speak && b.speak && a.speak === b.speak) return true;
	if (a.promptJp && b.promptJp && a.promptJp === b.promptJp) return true;
	const aa = a.options[a.answer] ?? "";
	const bb = b.options[b.answer] ?? "";
	if (aa && bb && similarAnswer(aa, bb)) return true;
	return false;
}
function uniqueShuffle(arr, rand) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
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
export { uniqueShuffle as i, similarAnswer as n, syncQuizToLeaderboard as r, questionsClash as t };
