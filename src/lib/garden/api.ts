import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { todayKey } from "@/lib/utils";
import { GARDEN_CONFIG } from "./config";
import { buildSnapshot, clampWordCount, type GardenFacts } from "./compute";
import type { GardenPlacement, GardenSnapshot } from "./types";

type GardenRow = {
  words_learned: number;
  daily_bonus: number;
  last_daily_date: string | null;
  last_study_date: string | null;
  sound_on: boolean;
  placements: unknown;
  seen_unlocks: unknown;
};

function parsePlacements(raw: unknown): GardenPlacement[] {
  let value = raw;
  if (typeof value === "string") {
    try {
      value = JSON.parse(value);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(value)) return [];
  return value
    .filter((p) => p && typeof p === "object")
    .map((p) => {
      const row = p as Record<string, unknown>;
      return {
        id: String(row.id ?? ""),
        itemId: String(row.itemId ?? ""),
        x: Math.max(4, Math.min(96, Number(row.x) || 50)),
        y: Math.max(8, Math.min(92, Number(row.y) || 70)),
        scale: Number(row.scale) || 1,
      };
    })
    .filter((p) => p.id && p.itemId);
}

function parseUnlocks(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      return raw.replace(/[{}]/g, "").split(",").map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}

async function learningFacts(userId: string) {
  const sql = await getSql();
  const stats = await sql<{
    xp: number;
    quizzes: number;
    streak: number;
  }>`select xp, quizzes, streak from study_stats where user_id = ${userId}`;
  const lessons = await sql<{ n: number }>`select count(*)::int as n from path_progress where user_id = ${userId}`;
  return {
    studyXp: Number(stats[0]?.xp) || 0,
    quizzes: Number(stats[0]?.quizzes) || 0,
    streak: Number(stats[0]?.streak) || 0,
    lessons: Number(lessons[0]?.n) || 0,
  };
}

async function loadRow(userId: string): Promise<GardenRow | null> {
  const sql = await getSql();
  const rows = await sql<GardenRow>`
    select words_learned, daily_bonus, last_daily_date, last_study_date, sound_on, placements, seen_unlocks
    from garden_state where user_id = ${userId}
  `;
  return rows[0] ?? null;
}

async function ensureRow(userId: string) {
  const sql = await getSql();
  await sql`
    insert into garden_state (user_id, updated_at)
    values (${userId}, now())
    on conflict (user_id) do nothing
  `;
}

async function snapshotFor(userId: string): Promise<GardenSnapshot> {
  const [row, learn] = await Promise.all([loadRow(userId), learningFacts(userId)]);
  const facts: GardenFacts = {
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
    today: todayKey(),
  };
  return buildSnapshot(facts, true);
}

export const loadGarden = createServerFn({ method: "GET" }).handler(async (): Promise<GardenSnapshot | { signedIn: false }> => {
  try {
    const { getSessionUser } = await import("@/lib/auth/verify.server");
    const user = await getSessionUser();
    if (!user) return { signedIn: false };
    return await snapshotFor(user.id);
  } catch {
    return { signedIn: false };
  }
});

export const reportGardenLearning = createServerFn({ method: "POST" })
  .validator((input: { wordsLearned?: number; streak?: number; studiedToday?: boolean }) => ({
    wordsLearned: Math.max(0, Math.min(GARDEN_CONFIG.xp.maxWords, Math.floor(Number(input.wordsLearned) || 0))),
    streak: Math.max(0, Math.min(365, Math.floor(Number(input.streak) || 0))),
    studiedToday: Boolean(input.studiedToday),
  }))
  .handler(async ({ data }): Promise<GardenSnapshot | { signedIn: false }> => {
    try {
      const { getSessionUser } = await import("@/lib/auth/verify.server");
      const user = await getSessionUser();
      if (!user) return { signedIn: false };
      const sql = await getSql();
      await ensureRow(user.id);
      const current = await loadRow(user.id);
      const words = clampWordCount(Number(current?.words_learned) || 0, data.wordsLearned);
      const today = todayKey();
      const lastStudy = data.studiedToday ? today : (current?.last_study_date ?? null);
      await sql`
        update garden_state
        set words_learned = ${words},
            last_study_date = ${lastStudy},
            updated_at = now()
        where user_id = ${user.id}
      `;
      if (data.streak > 0) {
        const existing = await sql<{ streak: number }>`select streak from study_stats where user_id = ${user.id}`;
        const prev = Number(existing[0]?.streak) || 0;
        const nextStreak = prev === 0 ? data.streak : Math.max(prev, Math.min(data.streak, prev + 1));
        if (existing[0]) {
          await sql`update study_stats set streak = ${nextStreak}, updated_at = now() where user_id = ${user.id}`;
        }
      }
      const before = await snapshotFor(user.id);
      if (before.newUnlocks.length) {
        await sql`insert into garden_events (user_id, kind, payload) values (${user.id}, ${"unlock"}, ${JSON.stringify(before.newUnlocks)}::jsonb)`;
      }
      return before;
    } catch {
      return { signedIn: false };
    }
  });

export const acknowledgeGardenUnlocks = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((ids: string[]) => (Array.isArray(ids) ? ids.map(String).slice(0, 40) : []))
  .handler(async ({ context, data: ids }) => {
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

export const saveGardenPlacements = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: GardenPlacement[]) => parsePlacements(input).slice(0, 40))
  .handler(async ({ context, data }) => {
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

export const claimGardenDaily = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
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

export const setGardenSound = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((on: boolean) => Boolean(on))
  .handler(async ({ context, data: on }) => {
    const sql = await getSql();
    await ensureRow(context.userId);
    await sql`update garden_state set sound_on = ${on}, updated_at = now() where user_id = ${context.userId}`;
    return { ok: true as const, soundOn: on };
  });
