import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Turtle, Volume2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChoiceRow, choiceState } from "@/components/ui/choice-row";
import { JpText } from "@/components/jp-text";
import { makeListenRound, type ListenQuestion } from "@/lib/akari/listen-engine";
import { getTts, speakJapanese, stopSpeaking } from "@/lib/akari/tts";
import { useProgress } from "@/lib/akari/progress";
import { addQuizResult } from "@/lib/akari/storage";
import { uid } from "@/lib/utils";
import { useSettings } from "@/lib/akari/settings";
import { syncQuizToLeaderboard } from "@/lib/akari/sync-score";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import type { JlptLevel } from "@/lib/akari/types";

export const Route = createFileRoute("/_app/listen")({ component: Page });

const ROUND = 12;
const SLOW_RATE = 0.48;

function Page() {
  const [level, setLevel] = useState<"all" | JlptLevel>("all");
  const [round, setRound] = useState<ListenQuestion[]>([]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [heard, setHeard] = useState(false);
  const [ttsMsg, setTtsMsg] = useState<string | null>(null);
  const [playing, setPlaying] = useState<"normal" | "slow" | null>(null);
  const log = useProgress((s) => s.logStudy);
  const streak = useProgress((s) => s.streak);
  const showRomaji = useSettings((s) => s.showRomaji);
  const ttsRate = useSettings((s) => s.ttsRate);
  const rateRef = useRef(ttsRate);
  rateRef.current = ttsRate;
  const allowAuto = useRef(false);
  const user = useCurrentUser();
  const item = !done && round.length && i >= 0 && i < round.length ? round[i] : undefined;

  function restart(nextLevel: "all" | JlptLevel = level) {
    stopSpeaking();
    allowAuto.current = false;
    setLevel(nextLevel);
    setRound(makeListenRound(ROUND, nextLevel));
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    setHeard(false);
    setPlaying(null);
    setTtsMsg(null);
  }

  async function play(speed: "normal" | "slow") {
    if (!item) return;
    allowAuto.current = true;
    setHeard(true);
    setPlaying(speed);
    const rate = speed === "slow" ? SLOW_RATE : rateRef.current;
    const res = await speakJapanese(item.speak, rate);
    const status = getTts().statusMessage();
    setTtsMsg(res.ok ? status : res.message ?? "Không đọc được. Bấm lại lần nữa.");
    setPlaying(null);
  }

  useEffect(() => {
    setRound(makeListenRound(ROUND, "all"));
    return () => stopSpeaking();
  }, []);

  useEffect(() => {
    if (!item) return;
    setHeard(false);
    setTtsMsg(null);
    setPlaying(null);
    if (!allowAuto.current) return;
    let cancelled = false;
    const handle = window.setTimeout(() => {
      if (cancelled) return;
      setHeard(true);
      void speakJapanese(item.speak, rateRef.current);
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
        <p className="text-sm text-muted">Chưa soạn được câu hỏi.</p>
        <Button className="mt-4" onClick={() => restart()}>
          Thử lại
        </Button>
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
        description="Nghe bình thường hoặc chậm. Mỗi vòng 12 câu random, không trùng từ/câu. Bấm kanji để xem hiragana và Hán-Việt."
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
            {item.kind === "word" ? "Nghe từ" : "Nghe câu"} · {item.level} · {i + 1}/{round.length}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="default"
              disabled={playing !== null}
              onClick={() => void play("normal")}
            >
              <Volume2 />
              {heard ? "Nghe lại" : "Nghe"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={playing !== null}
              onClick={() => void play("slow")}
            >
              <Turtle />
              Nghe chậm
            </Button>
          </div>
          {ttsMsg ? <p className="text-xs text-muted">{ttsMsg}</p> : null}
          {heard && !revealed ? (
            <div className="rounded-[10px] border border-dashed border-border bg-bg-elevated p-4">
              <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-subtle">
                Từ vừa nghe · bấm kanji để xác định
              </p>
              <JpText text={item.jp} className="text-2xl" hint={false} />
              <p className="mt-2 text-xs text-subtle">
                Trỏ vào chữ kanji — hiện hiragana và Hán-Việt. Nghĩa tiếng Việt chọn ở dưới.
              </p>
            </div>
          ) : null}
          <div className="grid gap-2">
            {item.options.map((o, idx) => {
              const state = choiceState({
                revealed,
                isAnswer: idx === item.answerIndex,
                picked: picked === idx,
              });
              return (
                <ChoiceRow
                  key={`${item.id}-${idx}`}
                  state={state}
                  disabled={revealed || !heard}
                  onClick={() => {
                    if (picked !== null || !heard) return;
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
            <div className="space-y-3">
              <div className="rounded-[10px] border border-border bg-choice p-4 text-left">
                {item.kind === "sentence" ? (
                  <p className="mb-1 text-xs text-subtle">{item.title}</p>
                ) : null}
                <JpText text={item.jp} className="text-xl" hint={false} />
                <p className="mt-1 font-jp text-sm text-muted">{item.kana}</p>
                {showRomaji ? <p className="mt-1 text-sm leading-relaxed text-muted">{item.romaji}</p> : null}
                <p className="mt-1 text-sm leading-relaxed text-fg">{item.vi}</p>
              </div>
              <Button
                className="w-full"
                onClick={async () => {
                  allowAuto.current = true;
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
            </div>
          ) : (
            <p className="text-sm text-muted">
              {heard
                ? "Chọn nghĩa khớp với từ/câu vừa nghe."
                : "Bấm Nghe hoặc Nghe chậm. Trình duyệt chỉ đọc sau khi bạn bấm."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
