import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuizCard } from "@/components/quiz-card";
import { nextQuestion, type KanjiQuizLevel, type QuizKind, type QuizQuestion } from "@/lib/akari/quiz-engine";
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
  { id: "vocab-kana", label: "Từ → kana" },
  { id: "type-romaji", label: "Gõ romaji" },
  { id: "cloze", label: "Điền câu" },
  { id: "listen", label: "Nghe chữ" },
  { id: "listen-vocab", label: "Nghe từ" },
  { id: "kanji", label: "Kanji nghĩa" },
  { id: "kanji-read", label: "Kanji đọc" },
  { id: "listen-kanji", label: "Nghe kanji" },
  { id: "radical", label: "Bộ thủ" },
  { id: "particle", label: "Trợ từ" },
  { id: "grammar", label: "Ngữ pháp" },
];

function srsOf(q: QuizQuestion): { id: string; type: SrsItem["itemType"] } {
  if (q.kind === "kanji" || q.kind === "kanji-read" || q.kind === "listen-kanji" || q.kind === "radical") return { id: q.sourceId, type: "kanji" };
  if (
    q.kind === "vocab-meaning" ||
    q.kind === "meaning-vocab" ||
    q.kind === "listen-vocab" ||
    q.kind === "vocab-kana" ||
    q.kind === "cloze"
  ) {
    return { id: q.sourceId, type: "vocab" };
  }
  if (q.kind === "grammar" || q.kind === "particle") return { id: q.sourceId, type: "grammar" };
  return { id: q.sourceId, type: "kana" };
}

function Page() {
  const [kind, setKind] = useState<QuizKind>("mix");
  const [kanjiLv, setKanjiLv] = useState<KanjiQuizLevel>("N5");
  const [q, setQ] = useState<QuizQuestion | null>(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const usedRef = useRef(new Set<string>());
  const scoreRef = useRef(0);
  const countRef = useRef(0);
  const savedRef = useRef({ score: 0, count: 0 });
  const log = useProgress((s) => s.logStudy);
  const mark = useProgress((s) => s.mark);
  const streak = useProgress((s) => s.streak);
  const user = useCurrentUser();

  function spawn(nextKind = kind) {
    const next = nextQuestion(nextKind, usedRef.current, Math.random, kanjiLv);
    setQ(next);
    return next;
  }

  useEffect(() => {
    usedRef.current = new Set();
    scoreRef.current = 0;
    countRef.current = 0;
    savedRef.current = { score: 0, count: 0 };
    setScore(0);
    setIndex(0);
    setDone(false);
    spawn(kind);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, kanjiLv]);

  async function persistDelta(minutes: number) {
    const dCount = countRef.current - savedRef.current.count;
    const dScore = scoreRef.current - savedRef.current.score;
    if (dCount <= 0) return;
    savedRef.current = { score: scoreRef.current, count: countRef.current };
    await addQuizResult({
      id: uid("quiz"),
      at: Date.now(),
      kind,
      score: dScore,
      total: dCount,
      durationMs: 0,
    });
    await log(dCount, minutes);
    await syncQuizToLeaderboard({
      score: dScore,
      total: dCount,
      minutes,
      streak,
      displayName: user?.displayName,
    });
  }

  async function finish() {
    await persistDelta(Math.max(1, Math.round((countRef.current - savedRef.current.count) * 0.3)));
    setDone(true);
  }

  async function checkpointIfNeeded() {
    if (countRef.current === 0 || countRef.current % 10 !== 0) return;
    await persistDelta(3);
  }

  return (
    <div>
      <PageHeader
        kicker="試験"
        title="Trắc nghiệm"
        description="Câu hỏi mới liên tục, không lặp ngay. Gõ đáp án hoặc chọn. Kết thúc khi bạn muốn — điểm tự lưu mỗi 10 câu."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {KINDS.map((k) => (
          <Button key={k.id} variant={kind === k.id ? "default" : "secondary"} onClick={() => setKind(k.id)}>
            {k.label}
          </Button>
        ))}
      </div>
      {kind === "kanji" || kind === "kanji-read" || kind === "listen-kanji" ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {(["N5", "N4", "N3", "N2", "N1", "core", "all"] as const).map((x) => (
            <Button key={x} size="sm" variant={kanjiLv === x ? "default" : "secondary"} onClick={() => setKanjiLv(x)}>
              {x === "core" ? "N5+N4" : x === "all" ? "N5→N1" : x}
            </Button>
          ))}
        </div>
      ) : null}
      {done ? (
        <Card className="mx-auto max-w-md">
          <CardContent className="py-10 text-center">
            <p className="text-sm text-muted">Kết quả phiên này</p>
            <p className="text-4xl font-semibold tabular-nums">
              {score}/{countRef.current || 0}
            </p>
            <p className="mt-2 text-sm text-muted">
              {countRef.current
                ? `${Math.round((score / Math.max(1, countRef.current)) * 100)}% đúng`
                : "Chưa trả lời câu nào"}
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                usedRef.current = new Set();
                scoreRef.current = 0;
                countRef.current = 0;
                savedRef.current = { score: 0, count: 0 };
                setScore(0);
                setIndex(0);
                setDone(false);
                spawn(kind);
              }}
            >
              Luyện tiếp
            </Button>
          </CardContent>
        </Card>
      ) : q ? (
        <div className="space-y-3">
          <QuizCard
            key={q.id}
            q={q}
            index={index}
            total={0}
            score={score}
            fillKind={Boolean(q.typedAnswers?.length)}
            onAnswer={(ok) => {
              countRef.current += 1;
              if (ok) {
                scoreRef.current += 1;
                setScore(scoreRef.current);
              }
              const srs = srsOf(q);
              void mark(srs.id, srs.type, ok ? "good" : "forgot");
              void checkpointIfNeeded();
            }}
            onNext={() => {
              setIndex((x) => x + 1);
              spawn(kind);
            }}
            nextLabel="Câu tiếp"
          />
          <div className="mx-auto flex max-w-lg justify-center">
            <Button variant="ghost" onClick={() => void finish()}>
              Kết thúc phiên
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
