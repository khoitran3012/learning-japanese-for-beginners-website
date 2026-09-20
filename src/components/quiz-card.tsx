import { Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SpeakButton } from "@/components/speak-button";
import { answersMatch } from "@/lib/akari/answer-check";
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
  nextLabel,
}: {
  q: QuizQuestion;
  index: number;
  total: number;
  score: number;
  fillKind?: boolean;
  onAnswer: (ok: boolean, picked: number) => void;
  onNext: () => void;
  nextLabel?: string;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [fill, setFill] = useState("");
  const [typedOk, setTypedOk] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoPlay = useSettings((s) => s.autoPlayAudio);
  const rate = useSettings((s) => s.ttsRate);
  const listenOnly = Boolean(q.speak) && !q.promptJp;
  const revealed = picked !== null;
  const canType = Boolean(fillKind || (q.typedAnswers && q.typedAnswers.length));
  const endless = total <= 0;

  useEffect(() => {
    if (autoPlay && q.speak) void speakJapanese(q.speak, rate);
  }, [autoPlay, q.speak, rate]);

  useEffect(() => {
    if (canType) inputRef.current?.focus();
  }, [canType, q.id]);

  function choose(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    onAnswer(idx === q.answer, idx);
  }

  function submitTyped() {
    if (picked !== null) return;
    const expected = q.typedAnswers ?? q.options;
    const ok = answersMatch(fill, expected);
    setTypedOk(ok);
    if (ok) {
      const idx = q.options.findIndex((o) => answersMatch(o, expected) || answersMatch(fill, [o]));
      choose(idx >= 0 ? idx : q.answer);
    } else {
      choose(-1);
    }
    setFill("");
  }

  return (
    <Card className="mx-auto max-w-lg">
      <CardContent className="space-y-4">
        <p className="text-xs tabular-nums text-muted">
          {endless ? `Câu ${index + 1} · đúng ${score}` : `Câu ${index + 1}/${total} · đúng ${score}`}
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
        {canType && !revealed ? (
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitTyped();
            }}
          >
            <Input
              ref={inputRef}
              value={fill}
              onChange={(e) => setFill(e.target.value)}
              placeholder={q.typedHint ?? "Điền đáp án"}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <Button type="submit">OK</Button>
          </form>
        ) : null}
        {typedOk === true ? <p className="text-sm text-success">Đúng — khớp với phần gõ.</p> : null}
        {typedOk === false ? <p className="text-sm text-danger">Chưa khớp. Đáp án đúng được tô xanh.</p> : null}
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
            <Button onClick={onNext}>
              {nextLabel ?? (endless ? "Câu tiếp" : index + 1 >= total ? "Xem điểm" : "Câu tiếp")}
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
