import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DynamicLink } from "@/components/dynamic-link";
import { HIRAGANA, KATAKANA } from "@/data/kana";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { KANJI_N5 } from "@/data/kanji-n5";
import { KANJI_N4 } from "@/data/kanji-n4";
import { LESSONS } from "@/data/lessons";
import { useProgress, learnedCount } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import { isDue } from "@/lib/akari/srs";
import { primaryLessonHref } from "@/lib/akari/lesson-links";

export const Route = createFileRoute("/_app/")({ component: HomePage });

function HomePage() {
  const srs = useProgress((s) => s.srs);
  const streak = useProgress((s) => s.streak);
  const today = useProgress((s) => s.today);
  const completed = useProgress((s) => s.completedLessonIds);
  const quizScores = useProgress((s) => s.quizScores);
  const dailyGoal = useSettings((s) => s.dailyGoal);
  const showRomaji = useSettings((s) => s.showRomaji);
  const set = useSettings((s) => s.set);

  const hiraBase = HIRAGANA.filter((k) => k.group === "gojuon").length;
  const kataBase = KATAKANA.filter((k) => k.group === "gojuon").length;
  const hira = learnedCount(srs, "h-");
  const kata = learnedCount(srs, "k-");
  const vocab = learnedCount(srs, "v-");
  const kanji = learnedCount(srs, "kj-");
  const vocabTotal = VOCAB_N5.length + VOCAB_N4.length;
  const kanjiTotal = KANJI_N5.length + KANJI_N4.length;
  const due = Object.values(srs).filter(isDue).length;
  const nextLesson = LESSONS.find((l) => !completed.has(l.id)) ?? LESSONS[LESSONS.length - 1]!;
  const quizPct =
    quizScores.length === 0
      ? 0
      : Math.round(
          (quizScores.reduce((a, q) => a + q.score / Math.max(1, q.total), 0) / quizScores.length) * 100,
        );
  const n5pct = Math.round(
    ((hira / hiraBase + kata / kataBase + vocab / vocabTotal + kanji / kanjiTotal) / 4) * 100,
  );
  const minutes = today?.minutes ?? 0;
  const goalPct = Math.min(100, (minutes / dailyGoal) * 100);

  const stats = [
    { label: "Hiragana", value: hira, total: hiraBase },
    { label: "Katakana", value: kata, total: kataBase },
    { label: "Từ vựng", value: vocab, total: vocabTotal },
    { label: "Kanji", value: kanji, total: kanjiTotal },
  ];

  return (
    <div>
      <PageHeader
        kicker="明かり"
        title="Akari"
        description="Học tiếng Nhật từ số 0 — Hiragana đến N4. Đăng nhập nếu muốn thi đua; không bắt buộc."
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 py-5">
            <span className="flex size-10 items-center justify-center rounded-[10px] bg-seal/12 text-seal">
              <Flame className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted">Chuỗi ngày</p>
              <p className="text-2xl font-semibold tabular-nums">{streak}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-5">
            <p className="text-xs text-muted">Hôm nay</p>
            <p className="text-2xl font-semibold tabular-nums">{Math.round(minutes)} phút</p>
            <Progress className="mt-2" value={goalPct} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-5">
            <p className="text-xs text-muted">Cần ôn</p>
            <p className="text-2xl font-semibold tabular-nums">{due}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-5">
            <p className="text-xs text-muted">Điểm quiz trung bình</p>
            <p className="text-2xl font-semibold tabular-nums">{quizPct}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardContent className="space-y-4">
            <h2 className="font-medium">Tiến độ tổng thể</h2>
            <Progress label="N5 tổng hợp" value={n5pct} />
            {stats.map((s) => (
              <Progress key={s.label} label={s.label} value={(s.value / Math.max(1, s.total)) * 100} />
            ))}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardContent className="flex h-full flex-col">
            <p className="text-xs uppercase tracking-[0.14em] text-subtle">Bài tiếp theo</p>
            <h2 className="mt-2 font-display text-2xl">{nextLesson.title}</h2>
            <p className="mt-1 text-sm text-muted">{nextLesson.summary}</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              <Button asChild>
                <DynamicLink to={primaryLessonHref(nextLesson)}>
                  Vào bài học <ArrowRight />
                </DynamicLink>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/path/$id" params={{ id: nextLesson.id }}>
                  Đọc bài
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Button asChild>
          <Link to="/daily">Bài tập hôm nay</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/garden">Khu vườn</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/play">Giải trí</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/leaderboard">Bảng thi đua</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/review">Ôn tập hôm nay</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/hiragana">Bảng Hiragana</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/dictionary">Mở từ điển</Link>
        </Button>
      </div>

      {showRomaji && hira > 20 ? (
        <p className="mt-6 rounded-lg border border-border bg-bg-elevated px-4 py-3 text-sm text-muted">
          Bạn đã thuộc hơn 20 chữ hiragana. Hãy thử tắt Romaji trong cài đặt để luyện đọc chữ Nhật thuần.
          <button type="button" className="ml-2 underline" onClick={() => set({ showRomaji: false })}>
            Tắt Romaji
          </button>
        </p>
      ) : null}
    </div>
  );
}
