import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { LESSON_STAGE, PATH_STAGES, STAGE_TOTALS } from "@/lib/akari/path-stages";

export type PathRankRow = {
  userId: string;
  displayName: string;
  stage: string;
  completed: number;
  total: number;
  rank: number;
  isYou?: boolean;
};

export type PathOverallRow = {
  userId: string;
  displayName: string;
  completed: number;
  total: number;
  rank: number;
  isYou?: boolean;
};

export type PathRankings = {
  byStage: Record<string, PathRankRow[]>;
  overall: PathOverallRow[];
  stageTotals: Record<string, number>;
};

function emptyRankings(): PathRankings {
  const byStage: Record<string, PathRankRow[]> = {};
  for (const s of PATH_STAGES) byStage[s.id] = [];
  return { byStage, overall: [], stageTotals: { ...STAGE_TOTALS } };
}

export const listPathRankings = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<{
    user_id: string;
    display_name: string;
    stage: string;
    completed: number;
  }>`
    select
      p.user_id,
      coalesce(nullif(s.display_name, ''), 'Học viên') as display_name,
      p.stage,
      count(*)::int as completed
    from path_progress p
    left join study_stats s on s.user_id = p.user_id
    group by p.user_id, coalesce(nullif(s.display_name, ''), 'Học viên'), p.stage
  `;

  const result = emptyRankings();
  const totals = new Map<string, { displayName: string; completed: number }>();

  for (const row of rows) {
    const total = STAGE_TOTALS[row.stage] ?? 0;
    const list = result.byStage[row.stage] ?? (result.byStage[row.stage] = []);
    list.push({
      userId: row.user_id,
      displayName: row.display_name,
      stage: row.stage,
      completed: row.completed,
      total,
      rank: 0,
    });
    const acc = totals.get(row.user_id) ?? { displayName: row.display_name, completed: 0 };
    acc.displayName = row.display_name;
    acc.completed += row.completed;
    totals.set(row.user_id, acc);
  }

  for (const stage of Object.keys(result.byStage)) {
    result.byStage[stage] = (result.byStage[stage] ?? [])
      .sort((a, b) => b.completed - a.completed || a.displayName.localeCompare(b.displayName, "vi"))
      .slice(0, 50)
      .map((r, i) => ({ ...r, rank: i + 1 }));
  }

  const lessonTotal = Object.values(STAGE_TOTALS).reduce((a, n) => a + n, 0);
  result.overall = [...totals.entries()]
    .map(([userId, v]) => ({
      userId,
      displayName: v.displayName,
      completed: v.completed,
      total: lessonTotal,
      rank: 0,
    }))
    .sort((a, b) => b.completed - a.completed || a.displayName.localeCompare(b.displayName, "vi"))
    .slice(0, 50)
    .map((r, i) => ({ ...r, rank: i + 1 }));

  return result;
});

export const recordPathProgress = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { lessonIds: string[] }) => ({
    lessonIds: Array.from(
      new Set((Array.isArray(input?.lessonIds) ? input.lessonIds : []).map((id) => String(id))),
    )
      .filter((id) => Boolean(LESSON_STAGE[id]))
      .slice(0, 40),
  }))
  .handler(async ({ context, data }) => {
    if (data.lessonIds.length === 0) return { saved: 0 };
    const sql = await getSql();

    let displayName = "Học viên";
    try {
      const { getSessionUser } = await import("@/lib/auth/verify.server");
      const u = await getSessionUser();
      displayName = (u?.email || "").split("@")[0] || displayName;
    } catch {
      /* keep default */
    }
    displayName = displayName.slice(0, 32);

    await sql`
      insert into study_stats (user_id, display_name, updated_at)
      values (${context.userId}, ${displayName}, now())
      on conflict (user_id) do nothing
    `;

    for (const lessonId of data.lessonIds) {
      const stage = LESSON_STAGE[lessonId];
      if (!stage) continue;
      await sql`
        insert into path_progress (user_id, lesson_id, stage, completed_at)
        values (${context.userId}, ${lessonId}, ${stage}, now())
        on conflict (user_id, lesson_id) do nothing
      `;
    }
    return { saved: data.lessonIds.length };
  });
