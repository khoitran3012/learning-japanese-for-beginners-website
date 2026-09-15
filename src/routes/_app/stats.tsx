import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HIRAGANA, KATAKANA } from "@/data/kana";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { KANJI_N5 } from "@/data/kanji-n5";
import { KANJI_N4 } from "@/data/kanji-n4";
import { GRAMMAR_N5 } from "@/data/grammar-n5";
import { GRAMMAR_N4 } from "@/data/grammar-n4";
import { useProgress, learnedCount, masteredCount } from "@/lib/akari/progress";
import { isDue } from "@/lib/akari/srs";

export const Route = createFileRoute("/_app/stats")({ component: Page });

function Page() {
  const srs = useProgress((s) => s.srs);
  const streak = useProgress((s) => s.streak);
  const today = useProgress((s) => s.today);
  const quiz = useProgress((s) => s.quizScores);
  const rows = [
    { label: "Hiragana", value: learnedCount(srs, "h-"), total: HIRAGANA.length },
    { label: "Katakana", value: learnedCount(srs, "k-"), total: KATAKANA.length },
    { label: "Từ vựng", value: learnedCount(srs, "v-"), total: VOCAB_N5.length + VOCAB_N4.length },
    { label: "Kanji", value: learnedCount(srs, "kj-"), total: KANJI_N5.length + KANJI_N4.length },
    { label: "Ngữ pháp", value: learnedCount(srs, "g-"), total: GRAMMAR_N5.length + GRAMMAR_N4.length },
  ];
  const due = Object.values(srs).filter(isDue).length;
  const mastered = Object.values(srs).filter((x) => x.status === "mastered").length;
  const avg = quiz.length ? Math.round((quiz.reduce((a, q) => a + q.score / q.total, 0) / quiz.length) * 100) : 0;

  return (
    <div>
      <PageHeader kicker="統計" title="Thống kê" description="Mọi số liệu lưu trên máy bạn — không gửi đi đâu." />
      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        <Card><CardContent className="py-5"><p className="text-xs text-muted">Chuỗi</p><p className="text-2xl font-semibold tabular-nums">{streak} ngày</p></CardContent></Card>
        <Card><CardContent className="py-5"><p className="text-xs text-muted">Hôm nay</p><p className="text-2xl font-semibold tabular-nums">{Math.round(today?.minutes ?? 0)} phút</p></CardContent></Card>
        <Card><CardContent className="py-5"><p className="text-xs text-muted">Nhớ tốt</p><p className="text-2xl font-semibold tabular-nums">{mastered}</p></CardContent></Card>
        <Card><CardContent className="py-5"><p className="text-xs text-muted">Cần ôn</p><p className="text-2xl font-semibold tabular-nums">{due}</p></CardContent></Card>
      </div>
      <Card>
        <CardContent className="space-y-4">
          {rows.map((r) => (
            <Progress key={r.label} label={`${r.label} ${r.value}/${r.total}`} value={(r.value / r.total) * 100} />
          ))}
          <Progress label={`Quiz ${avg}%`} value={avg} />
        </CardContent>
      </Card>
      <p className="mt-4 text-sm text-muted">Từ đã học: {learnedCount(srs, "v-")} · Hiragana thuộc: {masteredCount(srs, "h-")} · Katakana thuộc: {masteredCount(srs, "k-")}</p>
    </div>
  );
}
