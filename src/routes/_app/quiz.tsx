import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SpeakButton } from "@/components/speak-button";
import { makeQuiz, type QuizKind, type QuizQuestion } from "@/lib/akari/quiz-engine";
import { addQuizResult } from "@/lib/akari/storage";
import { useProgress } from "@/lib/akari/progress";
import { uid } from "@/lib/utils";
import { normalizeRomaji } from "@/lib/akari/romaji";
import type { SrsItem } from "@/lib/akari/types";

export const Route = createFileRoute("/_app/quiz")({ component: Page });

const KINDS: { id: QuizKind; label: string }[] = [
  { id: "hira-romaji", label: "あ → a" },
  { id: "romaji-hira", label: "ka → か" },
  { id: "kata-romaji", label: "ア → a" },
  { id: "vocab-meaning", label: "Từ → nghĩa" },
  { id: "meaning-vocab", label: "Nghĩa → từ" },
  { id: "listen", label: "Nghe → chọn" },
  { id: "kanji", label: "Kanji" },
];

function srsOf(q: QuizQuestion): { id: string; type: SrsItem["itemType"] } {
  const id = q.id.replace(/^q-(r-|l-|mv-|v-)?/, "");
  if (q.kind === "kanji") return { id, type: "kanji" };
  if (q.kind === "vocab-meaning" || q.kind === "meaning-vocab") return { id, type: "vocab" };
  return { id, type: "kana" };
}

function Page() {
  const [kind, setKind] = useState<QuizKind>("hira-romaji");
  const [qs, setQs] = useState<QuizQuestion[]>([]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [fill, setFill] = useState("");
  const [done, setDone] = useState(false);
  const log = useProgress((s) => s.logStudy);
  const mark = useProgress((s) => s.mark);
  const q = qs[i];

  useEffect(() => {
    setQs(makeQuiz(kind, 10));
    setI(0);
    setScore(0);
    setPicked(null);
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
    await log(qs.length, 3);
  }

  function choose(idx: number) {
    if (!q || picked !== null) return;
    const ok = idx === q.answer;
    setPicked(idx);
    const next = score + (ok ? 1 : 0);
    setScore(next);
    const srs = srsOf(q);
    void mark(srs.id, srs.type, ok ? "good" : "forgot");
  }

  return (
    <div>
      <PageHeader kicker="試験" title="Quiz" description="Nhiều dạng câu: chữ, từ, kanji, nghe. Điểm lưu trên máy." />
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
            <p className="text-4xl font-semibold tabular-nums">{score}/{qs.length}</p>
            <Button className="mt-4" onClick={() => { setQs(makeQuiz(kind, 10)); setDone(false); setI(0); setScore(0); setPicked(null); }}>
              Làm lại
            </Button>
          </CardContent>
        </Card>
      ) : q ? (
        <Card className="mx-auto max-w-lg">
          <CardContent className="space-y-4">
            <p className="text-xs text-muted tabular-nums">Câu {i + 1}/{qs.length} · đúng {score}</p>
            <p className="font-jp text-4xl">{q.promptJp ?? q.prompt}</p>
            {q.promptJp ? <p className="text-sm text-muted">{q.prompt}</p> : null}
            {q.speak ? <SpeakButton text={q.speak} /> : null}
            {kind === "hira-romaji" ? (
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const idx = q.options.findIndex((o) => normalizeRomaji(o) === normalizeRomaji(fill));
                  choose(idx >= 0 ? idx : -1);
                  setFill("");
                }}
              >
                <Input value={fill} onChange={(e) => setFill(e.target.value)} placeholder="Điền romaji" />
                <Button type="submit">OK</Button>
              </form>
            ) : null}
            <div className="grid gap-2">
              {q.options.map((o, idx) => (
                <Button
                  key={o + idx}
                  variant={picked === null ? "secondary" : idx === q.answer ? "success" : picked === idx ? "danger" : "secondary"}
                  className="h-auto justify-start py-3 font-jp"
                  onClick={() => choose(idx)}
                >
                  {String.fromCharCode(65 + idx)}. {o}
                </Button>
              ))}
            </div>
            {picked !== null ? (
              <div>
                <p className="text-sm text-muted">{q.explain}</p>
                <Button
                  className="mt-3"
                  onClick={() => {
                    if (i + 1 >= qs.length) void finish(score);
                    else {
                      setI((x) => x + 1);
                      setPicked(null);
                    }
                  }}
                >
                  {i + 1 >= qs.length ? "Xem điểm" : "Câu tiếp"}
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
