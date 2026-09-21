import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-iW6MThKt.mjs";
import { t as authMiddleware } from "./middleware-CVirv4hv.mjs";
import { n as PATH_STAGES, r as STAGE_TOTALS, t as LESSON_STAGE } from "./path-stages-Js0Sa0fT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/path-rank-B-ccDTSc.js
function emptyRankings() {
	const byStage = {};
	for (const s of PATH_STAGES) byStage[s.id] = [];
	return {
		byStage,
		overall: [],
		stageTotals: { ...STAGE_TOTALS }
	};
}
var listPathRankings_createServerFn_handler = createServerRpc({
	id: "47e1c58a7c69a72073f6a4c1665b164412ed5188bc563dcd7174af389e27a62b",
	name: "listPathRankings",
	filename: "src/lib/akari/path-rank.ts"
}, (opts) => listPathRankings.__executeServer(opts));
var listPathRankings = createServerFn({ method: "GET" }).handler(listPathRankings_createServerFn_handler, async () => {
	const rows = await (await getSql())`
    select user_id, display_name, stage, completed
    from path_rank_by_stage
  `;
	const result = emptyRankings();
	const totals = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const total = STAGE_TOTALS[row.stage] ?? 0;
		(result.byStage[row.stage] ?? (result.byStage[row.stage] = [])).push({
			userId: row.user_id,
			displayName: row.display_name,
			stage: row.stage,
			completed: Number(row.completed) || 0,
			total,
			rank: 0
		});
		const acc = totals.get(row.user_id) ?? {
			displayName: row.display_name,
			completed: 0
		};
		acc.displayName = row.display_name;
		acc.completed += Number(row.completed) || 0;
		totals.set(row.user_id, acc);
	}
	for (const stage of Object.keys(result.byStage)) result.byStage[stage] = (result.byStage[stage] ?? []).sort((a, b) => b.completed - a.completed || a.displayName.localeCompare(b.displayName, "vi")).slice(0, 50).map((r, i) => ({
		...r,
		rank: i + 1
	}));
	const lessonTotal = Object.values(STAGE_TOTALS).reduce((a, n) => a + n, 0);
	result.overall = [...totals.entries()].map(([userId, v]) => ({
		userId,
		displayName: v.displayName,
		completed: v.completed,
		total: lessonTotal,
		rank: 0
	})).sort((a, b) => b.completed - a.completed || a.displayName.localeCompare(b.displayName, "vi")).slice(0, 50).map((r, i) => ({
		...r,
		rank: i + 1
	}));
	return result;
});
var recordPathProgress_createServerFn_handler = createServerRpc({
	id: "ea01e3626d50871b0e27b68fe2793e1efa4c516b9a72c31078cd03fd5eb6d5e8",
	name: "recordPathProgress",
	filename: "src/lib/akari/path-rank.ts"
}, (opts) => recordPathProgress.__executeServer(opts));
var recordPathProgress = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({ lessonIds: Array.from(new Set((Array.isArray(input?.lessonIds) ? input.lessonIds : []).map((id) => String(id)))).filter((id) => Boolean(LESSON_STAGE[id])).slice(0, 80) })).handler(recordPathProgress_createServerFn_handler, async ({ context, data }) => {
	if (data.lessonIds.length === 0) return { saved: 0 };
	const sql = await getSql();
	let displayName = "Học viên";
	try {
		const { getSessionUser } = await import("./verify.server-TI2QFOGt.mjs");
		displayName = ((await getSessionUser())?.email || "").split("@")[0] || displayName;
	} catch {}
	displayName = displayName.slice(0, 32);
	await sql`
      insert into study_stats (user_id, display_name, updated_at)
      values (${context.userId}, ${displayName}, now())
      on conflict (user_id) do nothing
    `;
	const stages = data.lessonIds.map((id) => LESSON_STAGE[id]);
	await sql.query(`insert into path_progress (user_id, lesson_id, stage)
       select $1, x.lid, x.stg
       from unnest($2::text[], $3::text[]) as x(lid, stg)
       on conflict (user_id, lesson_id) do update set stage = excluded.stage`, [
		context.userId,
		data.lessonIds,
		stages
	]);
	return { saved: data.lessonIds.length };
});
//#endregion
export { listPathRankings_createServerFn_handler, recordPathProgress_createServerFn_handler };
