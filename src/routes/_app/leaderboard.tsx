import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  GhibliChartFrame,
  GhibliGardenChart,
  GhibliRadarChart,
  GhibliRankBars,
  gardenFromLessons,
  stageRows,
} from "@/components/path-rank-chart";
import { getMyStats, listLeaderboard, updateDisplayName, type LeaderRow } from "@/lib/akari/leaderboard";
import { listPathRankings, type PathRankings } from "@/lib/akari/path-rank";
import { LESSON_STAGE, PATH_STAGES, STAGE_TOTALS, stageLabel } from "@/lib/akari/path-stages";
import { useProgress } from "@/lib/akari/progress";
import { syncPathProgress } from "@/lib/akari/sync-path";
import { useCurrentUser, useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/leaderboard")({ component: Page });

function Page() {
  const { user, isPending } = useCurrentUserState();
  const me = useCurrentUser();
  const completed = useProgress((s) => s.completedLessonIds);
  const [rows, setRows] = useState<LeaderRow[]>([]);
  const [mine, setMine] = useState<LeaderRow | null>(null);
  const [name, setName] = useState("");
  const [pathRanks, setPathRanks] = useState<PathRankings | null>(null);
  const [stage, setStage] = useState<string>("overall");

  useEffect(() => {
    void listLeaderboard().then(setRows).catch(() => setRows([]));
    void listPathRankings()
      .then(setPathRanks)
      .catch(() => setPathRanks(null));
  }, []);

  useEffect(() => {
    if (!user) {
      setMine(null);
      return;
    }
    void getMyStats()
      .then((r) => {
        setMine(r);
        if (r?.displayName) setName(r.displayName);
        else if (user.displayName) setName(user.displayName);
      })
      .catch(() => setMine(null));
  }, [user]);

  useEffect(() => {
    if (!user || completed.size === 0) return;
    void syncPathProgress([...completed]).then(() =>
      listPathRankings()
        .then(setPathRanks)
        .catch(() => null),
    );
  }, [user, completed]);

  const ranked = rows.map((r, i) => ({
    ...r,
    rank: i + 1,
    isYou: Boolean(me && r.userId === me.id),
  }));

  const garden = useMemo(
    () => gardenFromLessons(completed, LESSON_STAGE, pathRanks, me?.id ?? null),
    [completed, pathRanks, me],
  );

  const categoryRows = useMemo(() => {
    const list = stageRows(pathRanks, stage).map((r) => ({
      ...r,
      isYou: Boolean(me && r.userId === me.id),
    }));
    return list;
  }, [pathRanks, stage, me]);

  const myCategory = categoryRows.find((r) => r.isYou);
  const categoryTotal = stage === "overall" ? Object.values(STAGE_TOTALS).reduce((a, n) => a + n, 0) : STAGE_TOTALS[stage] ?? 0;

  return (
    <div>
      <PageHeader
        kicker="競争"
        title="Bảng thi đua"
        description="XP từ quiz, bài hôm nay và chuỗi ngày. Xếp hạng lộ trình theo từng hạng mục — xem như đồi Ghibli."
      />

      {!isPending && !user ? (
        <Card className="mb-4">
          <CardContent className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">Đăng nhập để ghi điểm lên bảng — vẫn học được khi chưa có tài khoản.</p>
            <Button asChild>
              <Link to="/login">Đăng nhập</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {user ? (
        <Card className="mb-4">
          <CardContent className="flex flex-wrap items-end gap-3">
            <div className="min-w-[12rem] flex-1">
              <p className="mb-1 text-xs text-muted">Tên trên bảng</p>
              <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={32} />
            </div>
            <Button
              variant="secondary"
              onClick={async () => {
                const res = await updateDisplayName({ data: name });
                if (res.ok) {
                  toast("Đã đổi tên");
                  const [list, path] = await Promise.all([listLeaderboard(), listPathRankings()]);
                  setRows(list);
                  setPathRanks(path);
                } else toast.error(res.error);
              }}
            >
              Lưu tên
            </Button>
            {mine ? (
              <p className="text-sm tabular-nums text-muted">
                XP {mine.xp} · đúng {mine.correct}/{mine.total || "—"} · chuỗi {mine.streak}
              </p>
            ) : (
              <p className="text-sm text-muted">Làm một quiz để lên bảng.</p>
            )}
          </CardContent>
        </Card>
      ) : null}

      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setStage("overall")}
            className={cn(
              "h-10 rounded-full border px-3 text-sm transition-colors",
              stage === "overall"
                ? "border-primary bg-primary text-primary-fg"
                : "border-border bg-surface text-muted hover:text-fg",
            )}
          >
            Cả lộ trình
          </button>
          {PATH_STAGES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStage(s.id)}
              className={cn(
                "h-10 rounded-full border px-3 text-sm transition-colors",
                stage === s.id
                  ? "border-primary bg-primary text-primary-fg"
                  : "border-border bg-surface text-muted hover:text-fg",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <GhibliChartFrame
          kicker="丘陵"
          title={`Đồi xếp hạng · ${stage === "overall" ? "Cả lộ trình" : stageLabel(stage)}`}
          description={
            myCategory
              ? `Bạn đang hạng ${myCategory.rank} với ${myCategory.completed}/${categoryTotal} bài.`
              : "Hoàn thành bài trên Lộ trình để hiện mặt trên đồi. Đăng nhập để so với học viên khác."
          }
        >
          <GhibliRankBars rows={categoryRows} meId={me?.id ?? null} />
        </GhibliChartFrame>

        <div className="grid gap-4 lg:grid-cols-2">
          <GhibliChartFrame
            kicker="風景"
            title="Khu vườn lộ trình"
            description="Đồi xanh là tiến độ của bạn theo hạng mục. Sương xanh nhạt là người dẫn đầu."
          >
            <GhibliGardenChart data={garden} />
          </GhibliChartFrame>
          <GhibliChartFrame
            kicker="羅針"
            title="La bàn chín hướng"
            description="So từng hạng mục: nền tảng, chữ, từ, ngữ pháp, kanji, đọc, nghe, kiểm tra."
          >
            <GhibliRadarChart data={garden} />
          </GhibliChartFrame>
        </div>
      </div>

      <Card className="mb-4">
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="border-b border-border text-xs text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Học viên</th>
                <th className="px-4 py-3 font-medium">Bài xong</th>
                <th className="px-4 py-3 font-medium">Hạng mục</th>
              </tr>
            </thead>
            <tbody>
              {categoryRows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted">
                    Chưa có xếp hạng lộ trình. Vào Lộ trình, học bài rồi đánh dấu hoàn thành.
                  </td>
                </tr>
              ) : (
                categoryRows.map((r) => (
                  <tr key={r.userId} className={r.isYou ? "bg-bg-elevated" : "border-t border-border"}>
                    <td className="px-4 py-3 tabular-nums">{r.rank}</td>
                    <td className="px-4 py-3 font-medium">
                      {r.displayName}
                      {r.isYou ? <span className="ml-2 text-xs text-accent">bạn</span> : null}
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {r.completed}/{r.total || categoryTotal}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {stage === "overall" ? "Cả lộ trình" : stageLabel(stage)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-medium">Xếp hạng XP</h2>
            <p className="text-xs text-muted">Từ quiz, bài hôm nay và chuỗi ngày.</p>
          </div>
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="border-b border-border text-xs text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Học viên</th>
                <th className="px-4 py-3 font-medium">XP</th>
                <th className="px-4 py-3 font-medium">Quiz</th>
                <th className="px-4 py-3 font-medium">Đúng</th>
                <th className="px-4 py-3 font-medium">Chuỗi</th>
              </tr>
            </thead>
            <tbody>
              {ranked.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted">
                    Chưa có ai ghi điểm. Hãy làm quiz hoặc bài hôm nay.
                  </td>
                </tr>
              ) : (
                ranked.map((r) => (
                  <tr key={r.userId} className={r.isYou ? "bg-bg-elevated" : "border-t border-border"}>
                    <td className="px-4 py-3 tabular-nums">{r.rank}</td>
                    <td className="px-4 py-3 font-medium">
                      {r.displayName}
                      {r.isYou ? <span className="ml-2 text-xs text-accent">bạn</span> : null}
                    </td>
                    <td className="px-4 py-3 tabular-nums">{r.xp}</td>
                    <td className="px-4 py-3 tabular-nums">{r.quizzes}</td>
                    <td className="px-4 py-3 tabular-nums">
                      {r.correct}/{r.total || 0}
                    </td>
                    <td className="px-4 py-3 tabular-nums">{r.streak}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
