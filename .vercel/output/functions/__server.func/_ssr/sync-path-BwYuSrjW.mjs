import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-cENV1E7q.mjs";
import { u as createSsrRpc } from "./router-ClwOe2dp.mjs";
import { t as LESSON_STAGE } from "./path-stages-C25bjV5E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sync-path-BwYuSrjW.js
var listPathRankings = createServerFn({ method: "GET" }).handler(createSsrRpc("47e1c58a7c69a72073f6a4c1665b164412ed5188bc563dcd7174af389e27a62b"));
var recordPathProgress = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({ lessonIds: Array.from(new Set((Array.isArray(input?.lessonIds) ? input.lessonIds : []).map((id) => String(id)))).filter((id) => Boolean(LESSON_STAGE[id])).slice(0, 40) })).handler(createSsrRpc("ea01e3626d50871b0e27b68fe2793e1efa4c516b9a72c31078cd03fd5eb6d5e8"));
async function syncPathProgress(lessonIds) {
	if (lessonIds.length === 0) return;
	try {
		await recordPathProgress({ data: { lessonIds } });
	} catch {}
}
//#endregion
export { syncPathProgress, listPathRankings as t };
