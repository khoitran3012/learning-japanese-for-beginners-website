import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { a as todayKey } from "./utils-D10sm1uC.mjs";
import { r as getSql } from "./db-LCQbIpHx.mjs";
import { t as authMiddleware } from "./middleware-C9_h3cKa.mjs";
import { t as GARDEN_CONFIG } from "./config-CXidsrfo.mjs";
import { n as clampWordCount, t as buildSnapshot } from "./compute-Cv-sZvIm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-Drc_Cfwv.js
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
function parseUnlocks(raw) {
	if (Array.isArray(raw)) return raw.map(String);
	if (typeof raw === "string") try {
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) return parsed.map(String);
	} catch {
		return raw.replace(/[{}]/g, "").split(",").map((s) => s.trim()).filter(Boolean);
	}
	return [];
}
async function learningFacts(userId) {
	const sql = await getSql();
	const stats = await sql`select xp, quizzes, streak from study_stats where user_id = ${userId}`;
	const lessons = await sql`select count(*)::int as n from path_progress where user_id = ${userId}`;
	return {
		studyXp: Number(stats[0]?.xp) || 0,
		quizzes: Number(stats[0]?.quizzes) || 0,
		streak: Number(stats[0]?.streak) || 0,
		lessons: Number(lessons[0]?.n) || 0
	};
}
async function loadRow(userId) {
	return (await (await getSql())`
    select words_learned, daily_bonus, last_daily_date, last_study_date, sound_on, placements, seen_unlocks
    from garden_state where user_id = ${userId}
  `)[0] ?? null;
}
async function ensureRow(userId) {
	await (await getSql())`
    insert into garden_state (user_id, updated_at)
    values (${userId}, now())
    on conflict (user_id) do nothing
  `;
}
async function snapshotFor(userId) {
	const [row, learn] = await Promise.all([loadRow(userId), learningFacts(userId)]);
	const facts = {
		wordsLearned: Number(row?.words_learned) || 0,
		lessons: learn.lessons,
		streak: learn.streak,
		quizzes: learn.quizzes,
		studyXp: learn.studyXp,
		dailyBonus: Number(row?.daily_bonus) || 0,
		lastDailyDate: row?.last_daily_date ?? null,
		lastStudyDate: row?.last_study_date ?? null,
		soundOn: Boolean(row?.sound_on),
		seenUnlocks: parseUnlocks(row?.seen_unlocks),
		placements: parsePlacements(row?.placements),
		today: todayKey()
	};
	return buildSnapshot(facts, true);
}
var loadGarden_createServerFn_handler = createServerRpc({
	id: "bf8ec82550fc18e13b84fb6d1fe7f2dd0af805ca7f69b8cda8d9f0d6c4b08c0e",
	name: "loadGarden",
	filename: "src/lib/garden/api.ts"
}, (opts) => loadGarden.__executeServer(opts));
var loadGarden = createServerFn({ method: "GET" }).handler(loadGarden_createServerFn_handler, async () => {
	try {
		const { getSessionUser } = await import("./verify.server-B2sMrGBs.mjs");
		const user = await getSessionUser();
		if (!user) return { signedIn: false };
		return await snapshotFor(user.id);
	} catch {
		return { signedIn: false };
	}
});
var reportGardenLearning_createServerFn_handler = createServerRpc({
	id: "e90a2b3ae369929e7d4f40ebd6ca7704ab5db2f1f831d8491c563742998bd85e",
	name: "reportGardenLearning",
	filename: "src/lib/garden/api.ts"
}, (opts) => reportGardenLearning.__executeServer(opts));
var reportGardenLearning = createServerFn({ method: "POST" }).validator((input) => ({
	wordsLearned: Math.max(0, Math.min(GARDEN_CONFIG.xp.maxWords, Math.floor(Number(input.wordsLearned) || 0))),
	streak: Math.max(0, Math.min(365, Math.floor(Number(input.streak) || 0))),
	studiedToday: Boolean(input.studiedToday)
})).handler(reportGardenLearning_createServerFn_handler, async ({ data }) => {
	try {
		const { getSessionUser } = await import("./verify.server-B2sMrGBs.mjs");
		const user = await getSessionUser();
		if (!user) return { signedIn: false };
		const sql = await getSql();
		await ensureRow(user.id);
		const current = await loadRow(user.id);
		const words = clampWordCount(Number(current?.words_learned) || 0, data.wordsLearned);
		const today = todayKey();
		await sql`
        update garden_state
        set words_learned = ${words},
            last_study_date = ${data.studiedToday ? today : current?.last_study_date ?? null},
            updated_at = now()
        where user_id = ${user.id}
      `;
		if (data.streak > 0) {
			const existing = await sql`select streak from study_stats where user_id = ${user.id}`;
			const prev = Number(existing[0]?.streak) || 0;
			const nextStreak = prev === 0 ? data.streak : Math.max(prev, Math.min(data.streak, prev + 1));
			if (existing[0]) await sql`update study_stats set streak = ${nextStreak}, updated_at = now() where user_id = ${user.id}`;
		}
		const before = await snapshotFor(user.id);
		if (before.newUnlocks.length) await sql`insert into garden_events (user_id, kind, payload) values (${user.id}, ${"unlock"}, ${JSON.stringify(before.newUnlocks)}::jsonb)`;
		return before;
	} catch {
		return { signedIn: false };
	}
});
var acknowledgeGardenUnlocks_createServerFn_handler = createServerRpc({
	id: "ed0815a32f84567b8b9dbecca4ba0564774d61dbb5ff8e9593bc9068258009e0",
	name: "acknowledgeGardenUnlocks",
	filename: "src/lib/garden/api.ts"
}, (opts) => acknowledgeGardenUnlocks.__executeServer(opts));
var acknowledgeGardenUnlocks = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((ids) => Array.isArray(ids) ? ids.map(String).slice(0, 40) : []).handler(acknowledgeGardenUnlocks_createServerFn_handler, async ({ context, data: ids }) => {
	const sql = await getSql();
	await ensureRow(context.userId);
	const row = await loadRow(context.userId);
	const seen = new Set(parseUnlocks(row?.seen_unlocks));
	for (const id of ids) seen.add(id);
	const next = [...seen];
	await sql`
      update garden_state set seen_unlocks = ${JSON.stringify(next)}::jsonb, updated_at = now() where user_id = ${context.userId}
    `;
	return snapshotFor(context.userId);
});
var saveGardenPlacements_createServerFn_handler = createServerRpc({
	id: "571ac5899639ec47a089eca70709fdcfcdd775acaa35754cdca9d1378ed40568",
	name: "saveGardenPlacements",
	filename: "src/lib/garden/api.ts"
}, (opts) => saveGardenPlacements.__executeServer(opts));
var saveGardenPlacements = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => parsePlacements(input).slice(0, 40)).handler(saveGardenPlacements_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureRow(context.userId);
	const snap = await snapshotFor(context.userId);
	const allowed = new Set(snap.unlocked);
	const placements = data.filter((p) => allowed.has(p.itemId));
	await sql`
      update garden_state
      set placements = ${JSON.stringify(placements)}::jsonb, updated_at = now()
      where user_id = ${context.userId}
    `;
	return snapshotFor(context.userId);
});
var claimGardenDaily_createServerFn_handler = createServerRpc({
	id: "c45635681e314c5148f52573cdc6317bc55b71916be059403582e165fc2a0f7a",
	name: "claimGardenDaily",
	filename: "src/lib/garden/api.ts"
}, (opts) => claimGardenDaily.__executeServer(opts));
var claimGardenDaily = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(claimGardenDaily_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureRow(context.userId);
	const snap = await snapshotFor(context.userId);
	if (!snap.canClaimDaily) return snap;
	const today = todayKey();
	await sql`
      update garden_state
      set daily_bonus = daily_bonus + ${GARDEN_CONFIG.xp.daily},
          last_daily_date = ${today},
          updated_at = now()
      where user_id = ${context.userId}
    `;
	return snapshotFor(context.userId);
});
var setGardenSound_createServerFn_handler = createServerRpc({
	id: "ebc307b2eea602c0f070a4e8ae3b54ffe6ec20b98e4f0c4abe447138f26d2860",
	name: "setGardenSound",
	filename: "src/lib/garden/api.ts"
}, (opts) => setGardenSound.__executeServer(opts));
var setGardenSound = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((on) => Boolean(on)).handler(setGardenSound_createServerFn_handler, async ({ context, data: on }) => {
	const sql = await getSql();
	await ensureRow(context.userId);
	await sql`update garden_state set sound_on = ${on}, updated_at = now() where user_id = ${context.userId}`;
	return {
		ok: true,
		soundOn: on
	};
});
//#endregion
export { acknowledgeGardenUnlocks_createServerFn_handler, claimGardenDaily_createServerFn_handler, loadGarden_createServerFn_handler, reportGardenLearning_createServerFn_handler, saveGardenPlacements_createServerFn_handler, setGardenSound_createServerFn_handler };
