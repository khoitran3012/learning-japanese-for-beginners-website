import { BookOpen, Check, Flame, Volume2, VolumeX } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DynamicLink } from "@/components/dynamic-link";
import { TREE_XP } from "@/lib/garden/trees";
import { formatVnDate } from "@/lib/garden/goals";
import type { DailyGoalItem, GardenDayMark, GardenHistoryRow, GardenSnapshot } from "@/lib/garden/types";
import { cn } from "@/lib/utils";
import { SakuraTree } from "./SakuraTree";

export function GardenHud({
  garden,
  soundOn,
  onSound,
  goals,
  startedAt,
}: {
  garden: GardenSnapshot;
  soundOn: boolean;
  onSound: () => void;
  placing?: string | null;
  onCancelPlace?: () => void;
  onOpenCollection?: () => void;
  onDaily?: () => void;
  goals: DailyGoalItem[];
  startedAt: string | null;
}) {
  const next = garden.nextLevelXp;
  const span = Math.max(1, (next ?? garden.xp) - garden.prevLevelXp);
  const into = Math.max(0, garden.xp - garden.prevLevelXp);
  const pct = next ? Math.min(100, (into / span) * 100) : 100;
  const done = goals.filter((g) => g.done).length;
  return (
    <div className="garden-hud">
      <div className="garden-chip">
        <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">
          {garden.mood}
        </p>
        <p className="font-display text-lg leading-tight">
          {garden.levelName}{" "}
          <span className="font-jp text-muted">{garden.levelNameJp}</span>
        </p>
        <p className="mt-1 text-sm text-muted">
          Sakura · cấp {garden.level}
          {startedAt ? ` · từ ${formatVnDate(startedAt)}` : ""}
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-meadow" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
          <span>{garden.xp.toLocaleString("vi-VN")} XP</span>
          {next ? <span>còn {next - garden.xp} tới cấp sau</span> : <span>Đỉnh vườn</span>}
          <span>{done}/{goals.length} mục tiêu hôm nay</span>
        </p>
      </div>
      <Button variant="secondary" size="icon-sm" onClick={onSound} aria-label={soundOn ? "Tắt âm" : "Bật âm"}>
        {soundOn ? <Volume2 /> : <VolumeX />}
      </Button>
    </div>
  );
}

export function TreeStats({
  garden,
  goals,
}: {
  garden: GardenSnapshot;
  goals: DailyGoalItem[];
}) {
  const done = goals.filter((g) => g.done).length;
  const goalPct = goals.length ? (done / goals.length) * 100 : 0;
  const next = garden.nextLevelXp;
  const span = Math.max(1, (next ?? garden.xp) - garden.prevLevelXp);
  const into = Math.max(0, garden.xp - garden.prevLevelXp);
  const xpPct = next ? Math.min(100, (into / span) * 100) : 100;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="py-4">
          <p className="text-xs text-muted">Chuỗi ngày</p>
          <p className="mt-1 flex items-center gap-2 text-2xl font-semibold tabular-nums">
            <Flame className="size-5 text-seal" />
            {garden.streak}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4">
          <p className="text-xs text-muted">XP</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{garden.xp.toLocaleString("vi-VN")}</p>
          <Progress className="mt-2" value={xpPct} />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4">
          <p className="text-xs text-muted">Bài đã học</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{garden.lessons}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4">
          <p className="text-xs text-muted">Từ đã học</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{garden.wordsLearned}</p>
        </CardContent>
      </Card>
      <Card className="sm:col-span-2 lg:col-span-4">
        <CardContent className="py-4">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-subtle">Mục tiêu hôm nay</p>
              <p className="mt-1 text-sm text-muted">
                {done}/{goals.length} việc
                {done === goals.length ? " · hoàn thành, cây được tưới" : ""}
              </p>
            </div>
            <p className="text-xs text-muted">+{TREE_XP.dailyGoalBonus} XP khi đủ</p>
          </div>
          <Progress value={goalPct} className="mb-3" />
          <ul className="grid gap-2 sm:grid-cols-2">
            {goals.map((g) => (
              <li key={g.id}>
                <DynamicLink
                  to={g.href}
                  className={cn(
                    "flex min-h-11 items-center justify-between gap-2 rounded-[10px] border px-3 py-2 text-sm",
                    g.done ? "border-forest/25 bg-mist text-forest" : "border-border bg-bg-elevated",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "grid size-5 place-items-center rounded-full border",
                        g.done ? "border-forest bg-forest text-success-fg" : "border-border",
                      )}
                    >
                      {g.done ? <Check className="size-3" /> : null}
                    </span>
                    {g.label}
                  </span>
                  <span className="tabular-nums text-xs text-muted">
                    {Math.min(g.current, g.target)}/{g.target}
                  </span>
                </DynamicLink>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export function StreakCalendar({ marks, today }: { marks: GardenDayMark[]; today: string }) {
  const labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const first = marks[0]?.date;
  const pad = first
    ? (() => {
        const [y, m, d] = first.split("-").map(Number);
        const dow = new Date(Date.UTC(y!, m! - 1, d!)).getUTCDay();
        return (dow + 6) % 7;
      })()
    : 0;
  return (
    <Card>
      <CardContent className="py-4">
        <p className="text-xs uppercase tracking-[0.14em] text-subtle">Lịch học</p>
        <p className="mt-1 text-sm text-muted">Ngày có học được tô xanh — nghỉ không làm cây héo.</p>
        <div className="mt-3 grid grid-cols-7 gap-1.5 text-center text-[11px] text-subtle">
          {labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
          {Array.from({ length: pad }).map((_, i) => (
            <span key={`p-${i}`} />
          ))}
          {marks.map((m) => {
            const on = m.items > 0 || m.minutes > 0 || m.quizzes > 0;
            return (
              <span
                key={m.date}
                title={`${formatVnDate(m.date)}${on ? " · đã học" : ""}`}
                className={cn(
                  "grid aspect-square place-items-center rounded-md text-xs tabular-nums",
                  on ? "bg-mist text-forest" : "bg-choice text-subtle",
                  m.date === today && "ring-1 ring-accent",
                )}
              >
                {Number(m.date.slice(8))}
              </span>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function StudyHistory({ rows }: { rows: GardenHistoryRow[] }) {
  if (!rows.length) {
    return (
      <Card>
        <CardContent className="py-6 text-sm text-muted">Chưa có nhật ký. Học hôm nay sẽ hiện ở đây.</CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardContent className="space-y-3 py-4">
        <p className="text-xs uppercase tracking-[0.14em] text-subtle">Nhật ký cây</p>
        <ul className="space-y-3">
          {rows.map((r) => (
            <li key={r.date} className="flex items-start justify-between gap-3 border-t border-border pt-3 first:border-0 first:pt-0">
              <div>
                <p className="text-sm">{formatVnDate(r.date)}</p>
                <p className="text-xs text-muted">{r.note}</p>
              </div>
              <p className="text-sm tabular-nums text-forest">+{r.xp} XP</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function LevelUpModal({
  garden,
  onDone,
}: {
  garden: GardenSnapshot;
  onDone: () => void;
}) {
  return (
    <div className="garden-modal" role="dialog" aria-labelledby="garden-level-title">
      <div className="garden-modal-card">
        <p className="text-[11px] uppercase tracking-[0.16em] text-subtle">Cây lớn thêm</p>
        <div className="mx-auto my-3 w-36">
          <SakuraTree stage={garden.level} compact celebrate />
        </div>
        <h2 id="garden-level-title" className="font-display text-2xl">
          {garden.levelName}
        </h2>
        <p className="font-jp text-muted">{garden.levelNameJp}</p>
        <p className="mt-2 text-sm text-muted">
          Cấp {garden.level} · {garden.mood}. Học đều, hoa sẽ nở.
        </p>
        <Button className="mt-4 w-full" onClick={onDone}>
          Tiếp tục chăm cây
        </Button>
      </div>
    </div>
  );
}

export function GardenFallback() {
  return (
    <div className="rounded-[16px] border border-border bg-surface p-8 text-center">
      <p className="font-display text-xl">Vườn đang nghỉ một chút</p>
      <p className="mt-2 text-sm text-muted">Phần học tiếng Nhật vẫn dùng bình thường.</p>
      <Button asChild className="mt-4" variant="secondary">
        <Link to="/daily">
          <BookOpen /> Tiếp tục học
        </Link>
      </Button>
    </div>
  );
}

export function GardenLoading() {
  return (
    <div className="grid min-h-[50vh] place-items-center text-center">
      <div>
        <p className="font-display text-2xl">Đang chăm sóc Sakura…</p>
        <p className="mt-2 text-sm text-muted">Hạt giống không đi đâu cả.</p>
      </div>
    </div>
  );
}

export function HomeGardenCard({
  garden,
  goalPct,
}: {
  garden: GardenSnapshot;
  goalPct: number;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="grid gap-4 py-4 sm:grid-cols-[8.5rem_1fr] sm:items-center">
        <div className="mx-auto w-32 sm:mx-0">
          <SakuraTree stage={garden.level} compact />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-subtle">Vườn tiếng Nhật</p>
          <p className="mt-1 font-display text-xl">Sakura của bạn</p>
          <p className="text-sm text-muted">
            {garden.levelName} · cấp {garden.level} · {garden.xp.toLocaleString("vi-VN")} XP
          </p>
          <p className="mt-1 text-sm text-muted">Chuỗi {garden.streak} ngày</p>
          <Progress className="mt-3" value={goalPct} label="Mục tiêu hôm nay" />
          <Button asChild className="mt-3" size="sm">
            <Link to="/garden">Vào khu vườn</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
