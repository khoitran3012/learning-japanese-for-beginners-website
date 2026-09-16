import { Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SpeakButton } from "@/components/speak-button";
import { normalizeRomaji } from "@/lib/akari/romaji";
import { speakJapanese } from "@/lib/akari/tts";
import { useSettings } from "@/lib/akari/settings";
import type { QuizQuestion } from "@/lib/akari/quiz-engine";
import { cn } from "@/lib/utils";

export function QuizCard({
  q,
  index,
  total,
  score,
  fillKind,
  onAnswer,
  onNext,
}: {
  q: QuizQuestion;
  index: number;
  total: number;
  score: number;
  fillKind?: boolean;
  onAnswer: (ok: boolean, picked: number) => void;
  onNext: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [fill, setFill] = useState("");
  const autoPlay = useSettings((s) => s.autoPlayAudio);
  const rate = useSettings((s) => s.ttsRate);
  const listenOnly = Boolean(q.speak) && !q.promptJp;
  const revealed = picked !== null;

  useEffect(() => {
    if (autoPlay && q.speak) void speakJapanese(q.speak, rate);
  }, [autoPlay, q.speak, rate]);

  function choose(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    onAnswer(idx === q.answer, idx);
  }

  return (
    <Card className="mx-auto max-w-lg">
      <CardContent className="space-y-4">
        <p className="text-xs tabular-nums text-muted">
          Câu {index + 1}/{total} · đúng {score}
        </p>
        {listenOnly ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <span className="flex size-16 items-center justify-center rounded-full bg-bg-elevated text-accent">
              <Volume2 className="size-8" />
            </span>
            <p className="text-center text-base font-medium">{q.prompt}</p>
            <SpeakButton text={q.speak!} label="Nghe lại" />
          </div>
        ) : (
          <>
            {q.promptJp ? (
              <p className="font-jp text-5xl leading-none">{q.promptJp}</p>
            ) : null}
            <p className={cn(q.promptJp ? "text-sm text-muted" : "text-lg font-medium")}>{q.prompt}</p>
            {q.speak ? <SpeakButton text={q.speak} /> : null}
          </>
        )}
        {fillKind ? (
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const idx = q.options.findIndex((o) => normalizeRomaji(o) === normalizeRomaji(fill));
              choose(idx >= 0 ? idx : -1);
              setFill("");
            }}
          >
            <Input value={fill} onChange={(e) => setFill(e.target.value)} placeholder="Điền romaji" autoComplete="off" />
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
        {revealed ? (
          <div className="space-y-3">
            <p className="text-sm text-muted">{q.explain}</p>
            <Button onClick={onNext}>{index + 1 >= total ? "Xem điểm" : "Câu tiếp"}</Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
