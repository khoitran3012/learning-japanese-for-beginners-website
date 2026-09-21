import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuizCard } from "@/components/quiz-card";
import { makeDailyQuiz } from "@/lib/akari/quiz-engine";
import { addQuizResult } from "@/lib/akari/storage";
import { useProgress } from "@/lib/akari/progress";
import { todayKey, uid } from "@/lib/utils";
import { syncQuizToLeaderboard } from "@/lib/akari/sync-score";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { isBrowser } from "@/lib/utils";

export const Route = createFileRoute("/_app/daily")({ component: Page });

function dailyKey(date: string) {
  return `akari-daily-${date}`;
}

function loadSaved(date: string): { score: number; total: number } | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(dailyKey(date));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { score: number; total: number };
    if (typeof parsed.score === "number") return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

function Page() {
  const date = todayKey();
  const qs = useMemo(() => makeDailyQuiz(date, 15), [date]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [saved, setSaved] = useState(() => loadSaved(date));
  const [practice, setPractice] = useState(false);
  const log = useProgress((s) => s.logStudy);
  const streak = useProgress((s) => s.streak);
  const user = useCurrentUser();
  const q = qs[i];

  async function finish(nextScore: number) {
    if (!practice) {
      const result = { score: nextScore, total: qs.length };
      localStorage.setItem(dailyKey(date), JSON.stringify(result));
      setSaved(result);
      await addQuizResult({
        id: uid("daily"),
        at: Date.now(),
        kind: "daily",
        score: nextScore,
        total: qs.length,
        durationMs: 0,
      });
      await log(qs.length, 8);
      await syncQuizToLeaderboard({
        score: nextScore,
        total: qs.length,
        minutes: 8,
        streak,
        dailyScore: nextScore,
        displayName: user?.displayName,
      });
    } else {
      setSaved({ score: nextScore, total: qs.length });
      setPractice(false);
    }
  }

  if (saved && !practice) {
    return (
      <div>
        <PageHeader
          kicker="今日"
          title="Bài tập hôm nay"
          description={`15 câu random, không trùng nhau. Đề chung ngày ${date}.`}
        />
        <Card className="mx-auto max-w-md">
          <CardContent className="py-10 text-center">
            <p className="text-sm text-muted">Bạn đã hoàn thành hôm nay</p>
            <p className="text-4xl font-semibold tabular-nums">
              {saved.score}/{saved.total}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setPractice(true);
                  setI(0);
                  setScore(0);
                }}
              >
                Luyện thêm
              </Button>
              <Button asChild variant="secondary">
                <Link to="/play">Chơi giải trí</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/leaderboard">Bảng thi đua</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        kicker="今日"
        title={practice ? "Luyện thêm" : "Bài tập hôm nay"}
        description={
          practice
            ? "Cùng đề hôm nay — không ghi lại điểm ngày."
            : "15 câu trộn chữ, từ, kanji (kèm cách đọc), nghe, trợ từ, ngữ pháp."
        }
      />
      {q ? (
        <QuizCard
          key={q.id + String(practice)}
          q={q}
          index={i}
          total={qs.length}
          score={score}
          onAnswer={(ok) => setScore((s) => s + (ok ? 1 : 0))}
          onNext={() => {
            if (i + 1 >= qs.length) void finish(score);
            else setI((x) => x + 1);
          }}
        />
      ) : null}
    </div>
  );
}
