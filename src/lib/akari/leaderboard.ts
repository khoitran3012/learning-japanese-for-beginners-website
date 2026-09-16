import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export type LeaderRow = {
  userId: string;
  displayName: string;
  xp: number;
  quizzes: number;
  correct: number;
  total: number;
  streak: number;
  minutes: number;
  dailyBest: number;
  rank: number;
  isYou?: boolean;
};

function computeXp(row: { correct: number; quizzes: number; streak: number; minutes: number; dailyBest: number }) {
  return row.correct * 10 + row.quizzes * 8 + row.streak * 20 + Math.floor(row.minutes) + row.dailyBest * 5;
}

export const listLeaderboard = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<{
    user_id: string;
    display_name: string;
    xp: number;
    quizzes: number;
    correct: number;
    total: number;
    streak: number;
    minutes: number;
    daily_best: number;
  }>`
    select user_id, display_name, xp, quizzes, correct, total, streak, minutes, daily_best
    from study_stats
    order by xp desc, correct desc
    limit 50
  `;
  return rows.map((r, i) => ({
    userId: r.user_id,
    displayName: r.display_name,
    xp: r.xp,
    quizzes: r.quizzes,
    correct: r.correct,
    total: r.total,
    streak: r.streak,
    minutes: r.minutes,
    dailyBest: r.daily_best,
    rank: i + 1,
  })) satisfies LeaderRow[];
});

export const getMyStats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      user_id: string;
      display_name: string;
      xp: number;
      quizzes: number;
      correct: number;
      total: number;
      streak: number;
      minutes: number;
      daily_best: number;
    }>`select user_id, display_name, xp, quizzes, correct, total, streak, minutes, daily_best from study_stats where user_id = ${context.userId}`;
    const r = rows[0];
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
      isYou: true,
    } satisfies LeaderRow;
  });

export const submitStudyResult = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { score: number; total: number; minutes?: number; streak?: number; dailyScore?: number; displayName?: string }) => ({
    score: Math.max(0, Math.min(100, Math.floor(Number(input.score) || 0))),
    total: Math.max(0, Math.min(100, Math.floor(Number(input.total) || 0))),
    minutes: Math.max(0, Math.min(180, Number(input.minutes) || 0)),
    streak: Math.max(0, Math.min(365, Math.floor(Number(input.streak) || 0))),
    dailyScore: Math.max(0, Math.min(100, Math.floor(Number(input.dailyScore) || 0))),
    displayName: String(input.displayName ?? "").trim().slice(0, 32),
  }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const existing = await sql<{
      display_name: string;
      quizzes: number;
      correct: number;
      total: number;
      streak: number;
      minutes: number;
      daily_best: number;
    }>`select display_name, quizzes, correct, total, streak, minutes, daily_best from study_stats where user_id = ${context.userId}`;

    let displayName = data.displayName;
    if (!displayName) {
      try {
        const { getSessionUser } = await import("@/lib/auth/verify.server");
        const u = await getSessionUser();
        displayName = (u?.email || "").split("@")[0] ?? "";
      } catch {
        displayName = "";
      }
    }
    displayName = (displayName || existing[0]?.display_name || "Học viên").slice(0, 32);

    const prev = existing[0];
    const quizzes = (prev?.quizzes ?? 0) + (data.total > 0 ? 1 : 0);
    const correct = (prev?.correct ?? 0) + data.score;
    const total = (prev?.total ?? 0) + data.total;
    const streak = Math.max(prev?.streak ?? 0, data.streak);
    const minutes = (prev?.minutes ?? 0) + data.minutes;
    const dailyBest = Math.max(prev?.daily_best ?? 0, data.dailyScore);
    const xp = computeXp({ correct, quizzes, streak, minutes, dailyBest });

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
    return { xp, quizzes, correct, total, streak };
  });

export const updateDisplayName = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((name: string) => String(name ?? "").trim().slice(0, 32))
  .handler(async ({ context, data: name }) => {
    if (!name) return { ok: false as const, error: "Tên không được trống" };
    const sql = await getSql();
    await sql`
      insert into study_stats (user_id, display_name, updated_at)
      values (${context.userId}, ${name}, now())
      on conflict (user_id) do update set display_name = excluded.display_name, updated_at = now()
    `;
    return { ok: true as const };
  });
