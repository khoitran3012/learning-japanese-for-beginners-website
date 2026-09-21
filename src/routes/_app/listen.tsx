import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChoiceRow, choiceState } from "@/components/ui/choice-row";
import { SpeakButton } from "@/components/speak-button";
import { makeListenRound, type ListenQuestion } from "@/lib/akari/listen-engine";
import { speakJapanese, stopSpeaking } from "@/lib/akari/tts";
import { useProgress } from "@/lib/akari/progress";
import { addQuizResult } from "@/lib/akari/storage";
import { uid } from "@/lib/utils";
import { useSettings } from "@/lib/akari/settings";
import { syncQuizToLeaderboard } from "@/lib/akari/sync-score";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import type { JlptLevel } from "@/lib/akari/types";

export const Route = createFileRoute("/_app/listen")({ component: Page });

const ROUND = 12;

function Page() {
  const [level, setLevel] = useState<"all" | JlptLevel>("all");
  const [round, setRound] = useState<ListenQuestion[]>([]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const log = useProgress((s) => s.logStudy);
  const streak = useProgress((s) => s.streak);
  const showRomaji = useSettings((s) => s.showRomaji);
  const ttsRate = useSettings((s) => s.ttsRate);
  const rateRef = useRef(ttsRate);
  rateRef.current = ttsRate;
  const user = useCurrentUser();
  const item = !done && round.length ? round[i] : undefined;

  function restart(nextLevel: "all" | JlptLevel = level) {
    stopSpeaking();
    setLevel(nextLevel);
    setRound(makeListenRound(ROUND, nextLevel));
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }

  useEffect(() => {
    setRound(makeListenRound(ROUND, "all"));
    return () => stopSpeaking();
  }, []);

  useEffect(() => {
    if (!item) return;
    let cancelled = false;
    const handle = window.setTimeout(() => {
      if (!cancelled) void speakJapanese(item.speak, rateRef.current);
    }, 80);
    return () => {
      cancelled = true;
      window.clearTimeout(handle);
      stopSpeaking();
    };
  }, [item?.id]);

  if (!round.length && !done) {
    return (
      <div>
        <PageHeader
          kicker="聴"
          title="Luyện nghe"
          description="Nghe từ hoặc câu tiếng Nhật, chọn đúng nghĩa tiếng Việt của chính điều vừa nghe."
        />
        <p className="text-sm text-muted">Đang soạn câu hỏi…</p>
      </div>
    );
  }

  if (done || !item) {
    return (
      <div>
        <PageHeader title="Luyện nghe" />
        <p>
          Hoàn thành {score}/{round.length}.
        </p>
        <Button className="mt-4" onClick={() => restart()}>
          Làm tiếp
        </Button>
      </div>
    );
  }

  const revealed = picked !== null;

  return (
    <div>
      <PageHeader
        kicker="聴"
        title="Luyện nghe"
        description="Nghe từ hoặc câu tiếng Nhật một lần, chọn đúng nghĩa tiếng Việt. Bấm Nghe lại nếu cần."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", "N5", "N4"] as const).map((lv) => (
          <Button
            key={lv}
            size="sm"
            variant={level === lv ? "default" : "secondary"}
            onClick={() => restart(lv)}
          >
            {lv === "all" ? "N5 + N4" : lv}
          </Button>
        ))}
      </div>
      <Card className="mx-auto max-w-lg">
        <CardContent className="space-y-4">
          <p className="text-sm text-muted">
            {item.kind === "word" ? "Nghe từ" : item.title} · {item.level} · {i + 1}/{round.length}
          </p>
          <SpeakButton text={item.speak} kana={item.speak} label="Nghe lại" />
          {revealed ? (
            <div className="rounded-[10px] border border-border bg-choice p-4 text-left">
              <p className="font-jp text-xl leading-relaxed text-fg">{item.jp}</p>
              <p className="mt-1 font-jp text-sm text-muted">{item.kana}</p>
              {showRomaji ? <p className="mt-1 text-sm leading-relaxed text-muted">{item.romaji}</p> : null}
              <p className="mt-1 text-sm leading-relaxed text-fg">{item.vi}</p>
            </div>
          ) : (
            <p className="text-sm text-muted">Máy đọc một lần. Chọn nghĩa khớp với từ/câu vừa nghe.</p>
          )}
          <div className="grid gap-2">
            {item.options.map((o, idx) => {
              const state = choiceState({
                revealed,
                isAnswer: idx === item.answerIndex,
                picked: picked === idx,
              });
              return (
                <ChoiceRow
                  key={`${item.id}-${o}`}
                  state={state}
                  disabled={revealed}
                  onClick={() => {
                    setPicked(idx);
                    if (idx === item.answerIndex) setScore((s) => s + 1);
                  }}
                >
                  <span className="text-left text-sm leading-snug text-fg">{o}</span>
                </ChoiceRow>
              );
            })}
          </div>
          {revealed ? (
            <Button
              onClick={async () => {
                const nextScore = score;
                if (i + 1 >= round.length) {
                  await addQuizResult({
                    id: uid("quiz"),
                    at: Date.now(),
                    kind: "listen",
                    score: nextScore,
                    total: round.length,
                    durationMs: 0,
                  });
                  await log(round.length, 4);
                  await syncQuizToLeaderboard({
                    score: nextScore,
                    total: round.length,
                    minutes: 4,
                    streak,
                    displayName: user?.displayName,
                  });
                  setDone(true);
                  return;
                }
                setPicked(null);
                setI((x) => x + 1);
              }}
            >
              Tiếp
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
