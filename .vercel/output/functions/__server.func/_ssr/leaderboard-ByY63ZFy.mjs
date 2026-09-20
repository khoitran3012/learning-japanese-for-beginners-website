import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-C9EktZ5Q.mjs";
import { t as authMiddleware } from "./middleware-D5cszHQ_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leaderboard-ByY63ZFy.js
function computeXp(row) {
	return row.correct * 10 + row.quizzes * 8 + row.streak * 20 + Math.floor(row.minutes) + row.dailyBest * 5;
}
var listLeaderboard_createServerFn_handler = createServerRpc({
	id: "7f13ca3221c915546d2c3f6c69777871fe5524b592d5b390977f3f910c2c0cd7",
	name: "listLeaderboard",
	filename: "src/lib/akari/leaderboard.ts"
}, (opts) => listLeaderboard.__executeServer(opts));
var listLeaderboard = createServerFn({ method: "GET" }).handler(listLeaderboard_createServerFn_handler, async () => {
	return (await (await getSql())`
    select user_id, display_name, xp, quizzes, correct, total, streak, minutes, daily_best
    from study_stats
    order by xp desc, correct desc
    limit 50
  `).map((r, i) => ({
		userId: r.user_id,
		displayName: r.display_name,
		xp: r.xp,
		quizzes: r.quizzes,
		correct: r.correct,
		total: r.total,
		streak: r.streak,
		minutes: r.minutes,
		dailyBest: r.daily_best,
		rank: i + 1
	}));
});
var getMyStats_createServerFn_handler = createServerRpc({
	id: "1d4e3183cb8db7033a0ca02e6dac07bb98cd810afe8a70b063ec61e7d7b1f550",
	name: "getMyStats",
	filename: "src/lib/akari/leaderboard.ts"
}, (opts) => getMyStats.__executeServer(opts));
var getMyStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyStats_createServerFn_handler, async ({ context }) => {
	const r = (await (await getSql())`select user_id, display_name, xp, quizzes, correct, total, streak, minutes, daily_best from study_stats where user_id = ${context.userId}`)[0];
	if (!r) return null;
	return {
		userId: r.user_id,
		displayName: r.display_name,
		xp: r.xp,
		quizzes: r.quizzes,
		correct: r.correct,
		total: r.total,
		streak: r.streak,
		minutes: r.minutes,
		dailyBest: r.daily_best,
		rank: 0,
		isYou: true
	};
});
var submitStudyResult_createServerFn_handler = createServerRpc({
	id: "a1512acee8aa22255707cb6ae3731f85420b1655752c1d93f9c79d1f1fde978f",
	name: "submitStudyResult",
	filename: "src/lib/akari/leaderboard.ts"
}, (opts) => submitStudyResult.__executeServer(opts));
var submitStudyResult = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	score: Math.max(0, Math.min(100, Math.floor(Number(input.score) || 0))),
	total: Math.max(0, Math.min(100, Math.floor(Number(input.total) || 0))),
	minutes: Math.max(0, Math.min(180, Number(input.minutes) || 0)),
	streak: Math.max(0, Math.min(365, Math.floor(Number(input.streak) || 0))),
	dailyScore: Math.max(0, Math.min(100, Math.floor(Number(input.dailyScore) || 0))),
	displayName: String(input.displayName ?? "").trim().slice(0, 32)
})).handler(submitStudyResult_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const existing = await sql`select display_name, quizzes, correct, total, streak, minutes, daily_best from study_stats where user_id = ${context.userId}`;
	let displayName = data.displayName;
	if (!displayName) try {
		const { getSessionUser } = await import("./verify.server-Ce4Vny-K.mjs");
		displayName = ((await getSessionUser())?.email || "").split("@")[0] ?? "";
	} catch {
		displayName = "";
	}
	displayName = (displayName || existing[0]?.display_name || "Học viên").slice(0, 32);
	const prev = existing[0];
	const quizzes = (prev?.quizzes ?? 0) + (data.total > 0 ? 1 : 0);
	const correct = (prev?.correct ?? 0) + data.score;
	const total = (prev?.total ?? 0) + data.total;
	const streak = Math.max(prev?.streak ?? 0, data.streak);
	const minutes = (prev?.minutes ?? 0) + data.minutes;
	const dailyBest = Math.max(prev?.daily_best ?? 0, data.dailyScore);
	const xp = computeXp({
		correct,
		quizzes,
		streak,
		minutes,
		dailyBest
	});
	await sql`
      insert into study_stats (user_id, display_name, xp, quizzes, correct, total, streak, minutes, daily_best, updated_at)
      values (${context.userId}, ${displayName}, ${xp}, ${quizzes}, ${correct}, ${total}, ${streak}, ${minutes}, ${dailyBest}, now())
      on conflict (user_id) do update set
        display_name = excluded.display_name,
        xp = excluded.xp,
        quizzes = excluded.quizzes,
        correct = excluded.correct,
        total = excluded.total,
        streak = excluded.streak,
        minutes = excluded.minutes,
        daily_best = excluded.daily_best,
        updated_at = now()
    `;
	return {
		xp,
		quizzes,
		correct,
		total,
		streak
	};
});
var updateDisplayName_createServerFn_handler = createServerRpc({
	id: "f8d2b2c22fd76be8d886b8bf74b87148f5359c0f43c106318a3a3a6fab3a7cab",
	name: "updateDisplayName",
	filename: "src/lib/akari/leaderboard.ts"
}, (opts) => updateDisplayName.__executeServer(opts));
var updateDisplayName = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((name) => String(name ?? "").trim().slice(0, 32)).handler(updateDisplayName_createServerFn_handler, async ({ context, data: name }) => {
	if (!name) return {
		ok: false,
		error: "Tên không được trống"
	};
	await (await getSql())`
      insert into study_stats (user_id, display_name, updated_at)
      values (${context.userId}, ${name}, now())
      on conflict (user_id) do update set display_name = excluded.display_name, updated_at = now()
    `;
	return { ok: true };
});
//#endregion
export { getMyStats_createServerFn_handler, listLeaderboard_createServerFn_handler, submitStudyResult_createServerFn_handler, updateDisplayName_createServerFn_handler };
