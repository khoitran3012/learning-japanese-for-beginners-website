import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getMyStats, listLeaderboard, updateDisplayName, type LeaderRow } from "@/lib/akari/leaderboard";
import { useCurrentUser, useCurrentUserState } from "@/lib/auth/use-current-user";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/leaderboard")({ component: Page });

function Page() {
  const { user, isPending } = useCurrentUserState();
  const me = useCurrentUser();
  const [rows, setRows] = useState<LeaderRow[]>([]);
  const [mine, setMine] = useState<LeaderRow | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    void listLeaderboard().then(setRows).catch(() => setRows([]));
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

  const ranked = rows.map((r, i) => ({
    ...r,
    rank: i + 1,
    isYou: Boolean(me && r.userId === me.id),
  }));

  return (
    <div>
      <PageHeader
        kicker="競争"
        title="Bảng thi đua"
        description="XP từ quiz, bài hôm nay và chuỗi ngày. Đăng nhập để tên bạn xuất hiện."
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
                  const list = await listLeaderboard();
                  setRows(list);
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

      <Card>
        <CardContent className="overflow-x-auto p-0">
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
