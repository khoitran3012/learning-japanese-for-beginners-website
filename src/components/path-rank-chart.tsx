import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PATH_STAGES, STAGE_TOTALS } from "@/lib/akari/path-stages";
import type { PathOverallRow, PathRankRow, PathRankings } from "@/lib/akari/path-rank";

export type GardenPoint = {
  stage: string;
  you: number;
  lead: number;
};

function ChartTip({
  active,
  payload,
  label,
  suffix = "%",
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
  suffix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-[10px] border border-border bg-surface px-3 py-2 text-xs shadow-[var(--shadow-soft)]">
      <p className="mb-1 font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="tabular-nums text-muted">
          <span className="mr-1 inline-block size-2 rounded-full" style={{ background: p.color }} />
          {p.name}: {p.value}
          {suffix}
        </p>
      ))}
    </div>
  );
}

function ChartLegend() {
  return (
    <div className="mt-1 flex flex-wrap gap-4 px-1 text-xs text-muted">
      <span className="inline-flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-meadow" />
        Bạn
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-sky" />
        Dẫn đầu
      </span>
    </div>
  );
}

export function gardenFromLessons(
  completed: Set<string>,
  lessonStage: Record<string, string>,
  rankings: PathRankings | null,
  meId: string | null,
): GardenPoint[] {
  const localCount: Record<string, number> = {};
  for (const id of completed) {
    const stage = lessonStage[id];
    if (!stage) continue;
    localCount[stage] = (localCount[stage] ?? 0) + 1;
  }
  return PATH_STAGES.map((s) => {
    const total = STAGE_TOTALS[s.id] || 1;
    const server = rankings?.byStage[s.id]?.find((r) => r.userId === meId)?.completed ?? 0;
    const youDone = Math.max(localCount[s.id] ?? 0, server);
    const lead = Math.max(rankings?.byStage[s.id]?.[0]?.completed ?? 0, youDone);
    return {
      stage: s.label,
      you: Math.round((youDone / total) * 100),
      lead: Math.round((lead / total) * 100),
    };
  });
}

export function GhibliGardenChart({ data }: { data: GardenPoint[] }) {
  return (
    <div>
      <div className="h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="ghibliYou" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-meadow)" stopOpacity={0.85} />
                <stop offset="100%" stopColor="var(--color-meadow)" stopOpacity={0.08} />
              </linearGradient>
              <linearGradient id="ghibliLead" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-sky)" stopOpacity={0.55} />
                <stop offset="100%" stopColor="var(--color-sky)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="color-mix(in oklab, var(--color-fg) 8%, transparent)" vertical={false} />
            <XAxis
              dataKey="stage"
              tick={{ fill: "var(--color-muted)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={48}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "var(--color-muted)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ChartTip />} />
            <Area
              type="monotone"
              dataKey="lead"
              name="Dẫn đầu"
              stroke="var(--color-sky)"
              fill="url(#ghibliLead)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="you"
              name="Bạn"
              stroke="var(--color-forest)"
              fill="url(#ghibliYou)"
              strokeWidth={2.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend />
    </div>
  );
}

export function GhibliRadarChart({ data }: { data: GardenPoint[] }) {
  return (
    <div>
      <div className="h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="color-mix(in oklab, var(--color-fg) 14%, transparent)" />
            <PolarAngleAxis dataKey="stage" tick={{ fill: "var(--color-muted)", fontSize: 11 }} />
            <Radar
              name="Dẫn đầu"
              dataKey="lead"
              stroke="var(--color-sky)"
              fill="var(--color-sky)"
              fillOpacity={0.18}
            />
            <Radar
              name="Bạn"
              dataKey="you"
              stroke="var(--color-forest)"
              fill="var(--color-meadow)"
              fillOpacity={0.35}
            />
            <Tooltip content={<ChartTip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend />
    </div>
  );
}

export function GhibliRankBars({
  rows,
  meId,
}: {
  rows: Array<PathRankRow | PathOverallRow>;
  meId: string | null;
}) {
  const data = rows.slice(0, 8).map((r) => ({
    name: r.displayName.length > 12 ? `${r.displayName.slice(0, 11)}…` : r.displayName,
    full: r.displayName,
    value: r.completed,
    fill: meId && r.userId === meId ? "var(--color-clay)" : "var(--color-meadow)",
  }));
  if (data.length === 0) {
    return <p className="py-8 text-center text-sm text-muted">Chưa có ai hoàn thành hạng mục này.</p>;
  }
  return (
    <div className="h-64 w-full sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 12, left: 8, bottom: 0 }}>
          <CartesianGrid stroke="color-mix(in oklab, var(--color-fg) 8%, transparent)" horizontal={false} />
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fill: "var(--color-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={88}
            tick={{ fill: "var(--color-fg)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0]?.payload as { full: string; value: number };
              return (
                <div className="rounded-[10px] border border-border bg-surface px-3 py-2 text-xs shadow-[var(--shadow-soft)]">
                  <p className="font-medium">{d.full}</p>
                  <p className="tabular-nums text-muted">{d.value} bài</p>
                </div>
              );
            }}
          />
          <Bar dataKey="value" name="Bài đã xong" radius={[0, 10, 10, 0]} maxBarSize={22}>
            {data.map((d, i) => (
              <Cell key={`${d.full}-${i}`} fill={d.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function GhibliChartFrame({
  kicker,
  title,
  description,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="ghibli-panel overflow-hidden rounded-xl border border-border shadow-[var(--shadow-soft)]">
      <div className="ghibli-panel-wash p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">{kicker}</p>
        <h2 className="mt-1 font-display text-xl font-semibold">{title}</h2>
        <p className="mt-1 max-w-xl text-sm text-muted">{description}</p>
        <div className="mt-4 rounded-[14px] border border-border bg-surface/85 p-3 backdrop-blur-[2px]">
          {children}
        </div>
      </div>
    </section>
  );
}

export function stageRows(
  rankings: PathRankings | null,
  stage: string | "overall",
): Array<PathRankRow | PathOverallRow> {
  if (!rankings) return [];
  if (stage === "overall") return rankings.overall;
  return rankings.byStage[stage] ?? [];
}
