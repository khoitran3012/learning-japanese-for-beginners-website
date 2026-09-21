import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-CVirv4hv.mjs";
import { d as createSsrRpc } from "./router-sIrB-w_Z.mjs";
import { t as GARDEN_CONFIG } from "./config-BHwtEIDq.mjs";
import { n as gardenEvents } from "./events-DdCXtDE2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sync-BhlkWSdG.js
function parsePlacements(raw) {
	let value = raw;
	if (typeof value === "string") try {
		value = JSON.parse(value);
	} catch {
		return [];
	}
	if (!Array.isArray(value)) return [];
	return value.filter((p) => p && typeof p === "object").map((p) => {
		const row = p;
		return {
			id: String(row.id ?? ""),
			itemId: String(row.itemId ?? ""),
			x: Math.max(4, Math.min(96, Number(row.x) || 50)),
			y: Math.max(8, Math.min(92, Number(row.y) || 70)),
			scale: Number(row.scale) || 1
		};
	}).filter((p) => p.id && p.itemId);
}
var loadGarden = createServerFn({ method: "GET" }).handler(createSsrRpc("bf8ec82550fc18e13b84fb6d1fe7f2dd0af805ca7f69b8cda8d9f0d6c4b08c0e"));
var reportGardenLearning = createServerFn({ method: "POST" }).validator((input) => ({
	wordsLearned: Math.max(0, Math.min(GARDEN_CONFIG.xp.maxWords, Math.floor(Number(input.wordsLearned) || 0))),
	streak: Math.max(0, Math.min(365, Math.floor(Number(input.streak) || 0))),
	studiedToday: Boolean(input.studiedToday)
})).handler(createSsrRpc("e90a2b3ae369929e7d4f40ebd6ca7704ab5db2f1f831d8491c563742998bd85e"));
var acknowledgeGardenUnlocks = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((ids) => Array.isArray(ids) ? ids.map(String).slice(0, 40) : []).handler(createSsrRpc("ed0815a32f84567b8b9dbecca4ba0564774d61dbb5ff8e9593bc9068258009e0"));
var saveGardenPlacements = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => parsePlacements(input).slice(0, 40)).handler(createSsrRpc("571ac5899639ec47a089eca70709fdcfcdd775acaa35754cdca9d1378ed40568"));
var claimGardenDaily = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("c45635681e314c5148f52573cdc6317bc55b71916be059403582e165fc2a0f7a"));
var setGardenSound = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((on) => Boolean(on)).handler(createSsrRpc("ebc307b2eea602c0f070a4e8ae3b54ffe6ec20b98e4f0c4abe447138f26d2860"));
var sync_exports = /* @__PURE__ */ __exportAll({
	learnedWordCount: () => learnedWordCount,
	scheduleGardenSync: () => scheduleGardenSync
});
var timer = null;
var lastPayload = "";
function learnedWordCount(srs) {
	return Object.values(srs).filter((item) => item.correct + item.incorrect > 0).length;
}
function scheduleGardenSync(input) {
	const payload = {
		wordsLearned: learnedWordCount(input.srs),
		streak: input.streak,
		studiedToday: Boolean(input.lastStudyDate)
	};
	const key = JSON.stringify(payload);
	if (key === lastPayload) return;
	if (timer) window.clearTimeout(timer);
	timer = window.setTimeout(() => {
		lastPayload = key;
		reportGardenLearning({ data: payload }).then((res) => {
			if (!res || !("xp" in res)) return;
			gardenEvents.emit("gardenSynced", { xp: res.xp });
			if (res.newUnlocks.length) for (const item of res.newUnlocks) gardenEvents.emit("milestoneUnlocked", { itemId: item.id });
		}).catch(() => {});
	}, 900);
}
//#endregion
export { loadGarden as a, setGardenSound as c, claimGardenDaily as i, sync_exports as n, reportGardenLearning as o, acknowledgeGardenUnlocks as r, saveGardenPlacements as s, learnedWordCount as t };
