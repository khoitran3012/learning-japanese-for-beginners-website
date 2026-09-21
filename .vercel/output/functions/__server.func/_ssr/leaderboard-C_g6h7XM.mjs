import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-CVirv4hv.mjs";
import { d as createSsrRpc } from "./router-sIrB-w_Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leaderboard-C_g6h7XM.js
var listLeaderboard = createServerFn({ method: "GET" }).handler(createSsrRpc("7f13ca3221c915546d2c3f6c69777871fe5524b592d5b390977f3f910c2c0cd7"));
var getMyStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("1d4e3183cb8db7033a0ca02e6dac07bb98cd810afe8a70b063ec61e7d7b1f550"));
var submitStudyResult = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	score: Math.max(0, Math.min(100, Math.floor(Number(input.score) || 0))),
	total: Math.max(0, Math.min(100, Math.floor(Number(input.total) || 0))),
	minutes: Math.max(0, Math.min(180, Number(input.minutes) || 0)),
	streak: Math.max(0, Math.min(365, Math.floor(Number(input.streak) || 0))),
	dailyScore: Math.max(0, Math.min(100, Math.floor(Number(input.dailyScore) || 0))),
	displayName: String(input.displayName ?? "").trim().slice(0, 32)
})).handler(createSsrRpc("a1512acee8aa22255707cb6ae3731f85420b1655752c1d93f9c79d1f1fde978f"));
var updateDisplayName = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((name) => String(name ?? "").trim().slice(0, 32)).handler(createSsrRpc("f8d2b2c22fd76be8d886b8bf74b87148f5359c0f43c106318a3a3a6fab3a7cab"));
//#endregion
export { updateDisplayName as i, listLeaderboard as n, submitStudyResult as r, getMyStats as t };
