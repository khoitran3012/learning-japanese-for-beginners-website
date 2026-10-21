import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HIRAGANA, KATAKANA } from "@/data/kana";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { allKanji, practiceKanji } from "@/data/kanji-set";
import { GRAMMAR_N5 } from "@/data/grammar-n5";
import { GRAMMAR_N4 } from "@/data/grammar-n4";
import { useProgress, learnedCount, masteredCount } from "@/lib/akari/progress";
import { isDue } from "@/lib/akari/srs";
import { drillable, weakItems } from "@/lib/akari/weak";
import { resolveStudyItem } from "@/lib/dictionary/catalog";
import type { SrsItem } from "@/lib/akari/types";
import { cn, todayKey } from "@/lib/utils";

export const Route = createFileRoute("/_app/stats")({ component: Page });

const ACTIVITY_DAYS = 14;

const BUCKETS: Array<{ key: SrsItem["status"]; label: string }> = [
  { key: "new", label: "Mới" },
  { key: "learning", label: "Đang học" },
  { key: "review", label: "Đang ôn" },
  { key: "mastered", label: "Nhớ tốt" },
];

function Page() {
  const srs = useProgress((s) => s.srs);
  const streak = useProgress((s) => s.streak);
  const today = useProgress((s) => s.today);
  const days = useProgress((s) => s.days);
  const quiz = useProgress((s) => s.quizScores);

  const kanjiAll = allKanji();
  const rows = [
    { label: "Hiragana", value: learnedCount(srs, "h-"), total: HIRAGANA.length },
    { label: "Katakana", value: learnedCount(srs, "k-"), total: KATAKANA.length },
    { label: "Từ vựng", value: learnedCount(srs, "v-"), total: VOCAB_N5.length + VOCAB_N4.length },
    { label: "Kanji N5–N4", value: practiceKanji().filter((k) => srs[k.id]?.correct).length, total: practiceKanji().length },
    { label: "Kanji N5→N1", value: kanjiAll.filter((k) => srs[k.id]?.correct).length, total: kanjiAll.length },
    { label: "Ngữ pháp", value: learnedCount(srs, "g-"), total: GRAMMAR_N5.length + GRAMMAR_N4.length },
  ];

  const due = Object.values(srs).filter(isDue).length;
  const mastered = Object.values(srs).filter((x) => x.status === "mastered").length;

  /** Last N days, oldest → newest, including days with no activity. */
  const activity = useMemo(() => {
    const byDate = new Map(days.map((d) => [d.date, d]));
    const out: Array<{ date: string; minutes: number; items: number }> = [];
    for (let i = ACTIVITY_DAYS - 1; i >= 0; i--) {
      const date = todayKey(new Date(Date.now() - i * 86_400_000));
      const day = byDate.get(date);
      out.push({ date, minutes: day?.minutes ?? 0, items: day?.items ?? 0 });
    }
    return out;
  }, [days]);

  const peak = Math.max(1, ...activity.map((d) => d.minutes));
  const windowMinutes = activity.reduce((acc, d) => acc + d.minutes, 0);
  const totals = days.reduce(
    (acc, d) => ({ minutes: acc.minutes + d.minutes, items: acc.items + d.items }),
    { minutes: 0, items: 0 },
  );
  const activeDays = days.filter((d) => d.minutes > 0 || d.items > 0).length;

  const srsItems = Object.values(srs);
  const buckets = BUCKETS.map((b) => ({ ...b, count: srsItems.filter((x) => x.status === b.key).length }));
  const graded = srsItems.reduce((acc, x) => acc + x.correct + x.incorrect, 0);
  const recalled = srsItems.reduce((acc, x) => acc + x.correct, 0);
  const recallPct = graded ? Math.round((recalled / graded) * 100) : 0;
  const weak = weakItems(srs, 12).filter((w) => drillable(w.item));

  const quizPcts = quiz.map((q) => (q.total ? Math.round((q.score / q.total) * 100) : 0));
  const quizAvg = quizPcts.length ? Math.round(quizPcts.reduce((a, b) => a + b, 0) / quizPcts.length) : 0;
  const quizBest = quizPcts.length ? Math.max(...quizPcts) : 0;

  return (
    <div>
      <PageHeader kicker="統計" title="Thống kê" description="Số liệu trên máy này. Đăng nhập để so sánh XP trên bảng thi đua." />

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        <Card><CardContent className="py-5"><p className="text-xs text-muted">Chuỗi</p><p className="text-2xl font-semibold tabular-nums">{streak} ngày</p></CardContent></Card>
        <Card><CardContent className="py-5"><p className="text-xs text-muted">Hôm nay</p><p className="text-2xl font-semibold tabular-nums">{Math.round(today?.minutes ?? 0)} phút</p></CardContent></Card>
        <Card><CardContent className="py-5"><p className="text-xs text-muted">Nhớ tốt</p><p className="text-2xl font-semibold tabular-nums">{mastered}</p></CardContent></Card>
        <Card><CardContent className="py-5"><p className="text-xs text-muted">Cần ôn</p><p className="text-2xl font-semibold tabular-nums">{due}</p></CardContent></Card>
      </div>

      <Card className="mb-4">
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-medium">Hoạt động {ACTIVITY_DAYS} ngày</h2>
            <p className="text-xs text-muted tabular-nums">
              Tổng {Math.round(totals.minutes)} phút · {totals.items} mục · {activeDays} ngày học
            </p>
          </div>
          <div className="flex h-32 items-end gap-1" role="img" aria-label={`Số phút học mỗi ngày, ${ACTIVITY_DAYS} ngày gần nhất`}>
            {activity.map((d) => (
              <div
                key={d.date}
                className="flex h-full flex-1 flex-col items-center justify-end gap-1"
                title={`${d.date}: ${Math.round(d.minutes)} phút · ${d.items} mục`}
              >
                <div
                  className={cn(
                    "w-full rounded-t-[3px]",
                    d.minutes > 0 ? "bg-primary" : "bg-border",
                  )}
                  style={{ height: `${d.minutes > 0 ? Math.max(6, (d.minutes / peak) * 100) : 2}%` }}
                />
                <span className="text-[10px] text-subtle tabular-nums">{d.date.slice(8)}</span>
              </div>
            ))}
          </div>
          {windowMinutes === 0 ? (
            <p className="text-sm text-muted">
              Chưa có phút học nào trong {ACTIVITY_DAYS} ngày qua. Học một bài hoặc ôn thẻ để bắt đầu biểu đồ.
            </p>
          ) : null}
        </CardContent>
      </Card>

      {weak.length ? (
        <Card className="mb-4">
          <CardContent className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-medium">Chỗ yếu</h2>
                <p className="text-xs text-muted">
                  {weak.length} mục hay sai · cao nhất {Math.round(weak[0]!.missRate * 100)}% câu sai
                </p>
              </div>
              <Button asChild size="sm">
                <Link to="/weak">Luyện ngay</Link>
              </Button>
            </div>
            <ul className="flex flex-wrap gap-2">
              {weak.slice(0, 5).map(({ item, attempts }) => {
                const r = resolveStudyItem(item.id);
                return (
                  <li key={item.id} className="rounded-lg border border-border bg-bg-elevated px-3 py-1.5 text-sm">
                    <span className="font-jp">{r?.title ?? item.id}</span>
                    <span className="ml-2 text-xs tabular-nums text-seal">
                      sai {item.incorrect}/{attempts}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="text-xs text-subtle">
              Buổi luyện chỉ hỏi lại đúng những mục này và tự cập nhật lịch ôn.
            </p>
          </CardContent>
        </Card>
      ) : null}

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-3">
            <h2 className="font-medium">Phân bố thẻ</h2>
            {srsItems.length === 0 ? (
              <p className="text-sm text-muted">Chưa có thẻ nào. Học một bài để đưa thẻ vào hệ thống.</p>
            ) : (
              <>
                {buckets.map((b) => (
                  <div key={b.key} className="flex items-center gap-3">
                    <span className="w-20 shrink-0 text-sm text-muted">{b.label}</span>
                    <Progress value={(b.count / Math.max(1, srsItems.length)) * 100} />
                    <span className="w-8 shrink-0 text-right text-sm tabular-nums">{b.count}</span>
                  </div>
                ))}
                <p className="pt-1 text-xs text-subtle">
                  {srsItems.length} thẻ trong hệ thống · {graded} lượt đã chấm
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <h2 className="font-medium">Độ chính xác</h2>
            <Progress label={`Nhớ đúng ${recalled}/${graded}`} value={recallPct} />
            <Progress label={`Trắc nghiệm ${quizAvg}%`} value={quizAvg} />
            <p className="text-xs text-subtle">
              {quiz.length === 0
                ? "Chưa làm bài trắc nghiệm nào."
                : `${quiz.length} phiên quiz · cao nhất ${quizBest}%`}
            </p>
            <p className="text-xs text-subtle">
              Từ đã học {learnedCount(srs, "v-")} · Hiragana thuộc {masteredCount(srs, "h-")} · Katakana thuộc{" "}
              {masteredCount(srs, "k-")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="font-medium">Tiến độ theo mục</h2>
          {rows.map((r) => (
            <Progress key={r.label} label={`${r.label} ${r.value}/${r.total}`} value={(r.value / r.total) * 100} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
