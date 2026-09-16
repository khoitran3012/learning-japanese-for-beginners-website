import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuizCard } from "@/components/quiz-card";
import { makeQuiz, type QuizKind, type QuizQuestion } from "@/lib/akari/quiz-engine";
import { addQuizResult } from "@/lib/akari/storage";
import { useProgress } from "@/lib/akari/progress";
import { uid } from "@/lib/utils";
import { syncQuizToLeaderboard } from "@/lib/akari/sync-score";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import type { SrsItem } from "@/lib/akari/types";

export const Route = createFileRoute("/_app/quiz")({ component: Page });

const KINDS: { id: QuizKind; label: string }[] = [
  { id: "mix", label: "Tổng hợp" },
  { id: "hira-romaji", label: "あ → a" },
  { id: "romaji-hira", label: "ka → か" },
  { id: "kata-romaji", label: "ア → a" },
  { id: "vocab-meaning", label: "Từ → nghĩa" },
  { id: "meaning-vocab", label: "Nghĩa → từ" },
  { id: "listen", label: "Nghe chữ" },
  { id: "listen-vocab", label: "Nghe từ" },
  { id: "kanji", label: "Kanji nghĩa" },
  { id: "kanji-read", label: "Kanji đọc" },
  { id: "listen-kanji", label: "Nghe kanji" },
  { id: "particle", label: "Trợ từ" },
  { id: "grammar", label: "Ngữ pháp" },
];

function srsOf(q: QuizQuestion): { id: string; type: SrsItem["itemType"] } {
  const id = q.id.replace(/^q-(r-|l-|mv-|v-|kr-|lk-|lv-|p-\d+-)?/, "");
  if (q.kind === "kanji" || q.kind === "kanji-read" || q.kind === "listen-kanji") return { id, type: "kanji" };
  if (q.kind === "vocab-meaning" || q.kind === "meaning-vocab" || q.kind === "listen-vocab") return { id, type: "vocab" };
  if (q.kind === "grammar" || q.kind === "particle") return { id, type: "grammar" };
  return { id, type: "kana" };
}

function Page() {
  const [kind, setKind] = useState<QuizKind>("mix");
  const [qs, setQs] = useState<QuizQuestion[]>([]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const log = useProgress((s) => s.logStudy);
  const mark = useProgress((s) => s.mark);
  const streak = useProgress((s) => s.streak);
  const user = useCurrentUser();
  const q = qs[i];

  useEffect(() => {
    setQs(makeQuiz(kind, 12));
    setI(0);
    setScore(0);
    setDone(false);
  }, [kind]);

  async function finish(nextScore: number) {
    setDone(true);
    await addQuizResult({
      id: uid("quiz"),
      at: Date.now(),
      kind,
      score: nextScore,
      total: qs.length,
      durationMs: 0,
    });
    await log(qs.length, 4);
    await syncQuizToLeaderboard({
      score: nextScore,
      total: qs.length,
      minutes: 4,
      streak,
      displayName: user?.displayName,
    });
  }

  return (
    <div>
      <PageHeader
        kicker="試験"
        title="Quiz"
        description="Chữ, từ, kanji (hiragana + romaji), nghe, trợ từ và ngữ pháp. Đăng nhập để điểm lên bảng thi đua."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {KINDS.map((k) => (
          <Button key={k.id} variant={kind === k.id ? "default" : "secondary"} onClick={() => setKind(k.id)}>
            {k.label}
          </Button>
        ))}
      </div>
      {done ? (
        <Card className="mx-auto max-w-md">
          <CardContent className="py-10 text-center">
            <p className="text-sm text-muted">Kết quả</p>
            <p className="text-4xl font-semibold tabular-nums">
              {score}/{qs.length}
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                setQs(makeQuiz(kind, 12));
                setDone(false);
                setI(0);
                setScore(0);
              }}
            >
              Làm lại
            </Button>
          </CardContent>
        </Card>
      ) : q ? (
        <QuizCard
          key={q.id}
          q={q}
          index={i}
          total={qs.length}
          score={score}
          fillKind={kind === "hira-romaji"}
          onAnswer={(ok) => {
            setScore((s) => s + (ok ? 1 : 0));
            const srs = srsOf(q);
            void mark(srs.id, srs.type, ok ? "good" : "forgot");
          }}
          onNext={() => {
            if (i + 1 >= qs.length) void finish(score);
            else setI((x) => x + 1);
          }}
        />
      ) : null}
    </div>
  );
}
