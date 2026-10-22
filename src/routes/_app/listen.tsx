import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Turtle, Volume2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChoiceRow, choiceState } from "@/components/ui/choice-row";
import { JpText } from "@/components/jp-text";
import { makeListenRound, type ListenQuestion } from "@/lib/akari/listen-engine";
import { getTts, speakJapanese, stopSpeaking } from "@/lib/akari/tts";
import { useProgress } from "@/lib/akari/progress";
import { addQuizResult } from "@/lib/akari/storage";
import { answersMatch } from "@/lib/akari/answer-check";
import { kanaToRomaji } from "@/lib/akari/kana-util";
import { cn, uid } from "@/lib/utils";
import { useSettings } from "@/lib/akari/settings";
import { syncQuizToLeaderboard } from "@/lib/akari/sync-score";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import type { JlptLevel } from "@/lib/akari/types";

export const Route = createFileRoute("/_app/listen")({ component: Page });

const ROUND = 12;
const SLOW_RATE = 0.48;

type ListenMode = "choice" | "dictation";

function Page() {
  const [level, setLevel] = useState<"all" | JlptLevel>("all");
  const [mode, setMode] = useState<ListenMode>("choice");
  const [round, setRound] = useState<ListenQuestion[]>([]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [heard, setHeard] = useState(false);
  const [ttsMsg, setTtsMsg] = useState<string | null>(null);
  const [playing, setPlaying] = useState<"normal" | "slow" | null>(null);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [verdict, setVerdict] = useState<"ok" | "no" | null>(null);
  const [wrong, setWrong] = useState<ListenQuestion[]>([]);
  const scoreRef = useRef(0);
  const wrongRef = useRef<ListenQuestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const log = useProgress((s) => s.logStudy);
  const streak = useProgress((s) => s.streak);
  const showRomaji = useSettings((s) => s.showRomaji);
  const ttsRate = useSettings((s) => s.ttsRate);
  const rateRef = useRef(ttsRate);
  rateRef.current = ttsRate;
  const allowAuto = useRef(false);
  const user = useCurrentUser();
  const item = !done && round.length && i >= 0 && i < round.length ? round[i] : undefined;

  function restart(nextLevel: "all" | JlptLevel = level, nextMode: ListenMode = mode) {
    stopSpeaking();
    allowAuto.current = false;
    setLevel(nextLevel);
    setMode(nextMode);
    setRound(makeListenRound(ROUND, nextLevel));
    setI(0);
    setPicked(null);
    setScore(0);
    scoreRef.current = 0;
    wrongRef.current = [];
    setWrong([]);
    setDone(false);
    setHeard(false);
    setPlaying(null);
    setTtsMsg(null);
    setTyped("");
    setChecked(false);
    setVerdict(null);
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
    setTyped("");
    setChecked(false);
    setVerdict(null);
    if (!item) return;
    setHeard(false);
    setTtsMsg(null);
    setPlaying(null);
    const timers: number[] = [];
    if (mode === "dictation") {
      // Không tự mở bàn phím ảo trên điện thoại — bàn phím làm trang reflow.
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      if (!coarse) timers.push(window.setTimeout(() => inputRef.current?.focus(), 80));
    }
    if (allowAuto.current) {
      timers.push(
        window.setTimeout(() => {
          setHeard(true);
          void speakJapanese(item.speak, rateRef.current);
        }, 80),
      );
    }
    return () => {
      for (const t of timers) window.clearTimeout(t);
      stopSpeaking();
    };
  }, [item, mode]);

  function award(ok: boolean) {
    if (ok) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    } else if (item) {
      wrongRef.current.push(item);
      setWrong([...wrongRef.current]);
    }
  }

  async function finishRound() {
    const finalScore = scoreRef.current;
    await addQuizResult({
      id: uid("quiz"),
      at: Date.now(),
      kind: mode === "dictation" ? "listen-dictation" : "listen",
      score: finalScore,
      total: round.length,
      durationMs: 0,
    });
    await log(round.length, 4);
    await syncQuizToLeaderboard({
      score: finalScore,
      total: round.length,
      minutes: 4,
      streak,
      displayName: user?.displayName,
    });
    setDone(true);
  }

  function advance() {
    allowAuto.current = true;
    if (i + 1 >= round.length) {
      void finishRound();
      return;
    }
    setPicked(null);
    setTyped("");
    setChecked(false);
    setVerdict(null);
    setI((x) => x + 1);
  }

  function checkTyped() {
    if (!item || checked || !heard) return;
    // `item.speak` là kana đã đổi trợ từ theo cách đọc (は→わ, を→お): người nghe
    // gõ đúng âm mình vừa nghe vẫn được tính đúng.
    const ok = answersMatch(typed, [item.kana, item.romaji, kanaToRomaji(item.kana), item.speak]);
    setChecked(true);
    setVerdict(ok ? "ok" : "no");
    award(ok);
  }

  function revealTyped() {
    if (!item || checked) return;
    setChecked(true);
    setVerdict("no");
    award(false);
  }

  if (!round.length && !done) {
    return (
      <div>
        <PageHeader
          kicker="聴"
          title="Luyện nghe"
          description="Nghe từ hoặc câu tiếng Nhật rồi chọn nghĩa, hoặc chép lại điều vừa nghe."
        />
        <p className="text-sm text-muted">Chưa soạn được câu hỏi.</p>
        <Button className="mt-4" onClick={() => restart()}>
          Thử lại
        </Button>
      </div>
    );
  }

  if (done || !item) {
    const pct = round.length ? Math.round((score / round.length) * 100) : 0;
    return (
      <div>
        <PageHeader
          kicker="聴"
          title="Luyện nghe"
          description={
            mode === "dictation"
              ? "Chép chính tả: nghe rồi gõ lại bằng romaji hoặc kana."
              : "Nghe và chọn nghĩa tiếng Việt của điều vừa nghe."
          }
        />
        <Card className="mx-auto max-w-lg">
          <CardContent className="space-y-4 py-8 text-center">
            <p className="text-sm text-muted">Kết quả vòng này</p>
            <p className="text-4xl font-semibold tabular-nums">
              {score}/{round.length}
            </p>
            <p className="text-sm text-muted">{round.length ? `${pct}% đúng` : "Chưa trả lời câu nào"}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button onClick={() => restart()}>Làm vòng mới</Button>
              <Button
                variant="secondary"
                onClick={() => restart(level, mode === "choice" ? "dictation" : "choice")}
              >
                {mode === "choice" ? "Thử nghe & gõ" : "Thử chọn nghĩa"}
              </Button>
            </div>
          </CardContent>
        </Card>
        {wrong.length ? (
          <Card className="mx-auto mt-4 max-w-lg">
            <CardContent className="space-y-2">
              <h2 className="font-medium">Xem lại {wrong.length} câu sai</h2>
              <ul className="space-y-1.5 text-sm leading-relaxed text-muted">
                {wrong.slice(0, 8).map((w, idx) => (
                  <li key={`${w.id}-${idx}`}>
                    <span className="font-jp text-base text-fg">{w.jp}</span>
                    <span className="ml-2 font-jp">{w.kana}</span> — {w.vi}
                  </li>
                ))}
              </ul>
              {wrong.length > 8 ? <p className="text-xs text-subtle">… và {wrong.length - 8} câu nữa</p> : null}
            </CardContent>
          </Card>
        ) : null}
      </div>
    );
  }

  const revealed = mode === "choice" ? picked !== null : checked;
  const correct = mode === "choice" ? picked === item.answerIndex : verdict === "ok";

  return (
    <div>
      <PageHeader
        kicker="聴"
        title="Luyện nghe"
        description={
          mode === "dictation"
            ? "Nghe bình thường hoặc chậm rồi gõ lại bằng romaji hoặc kana. Sai chính tả nhỏ vẫn được chấp nhận."
            : "Nghe bình thường hoặc chậm. Mỗi vòng 12 câu random, không trùng từ/câu. Bấm kanji để xem hiragana và Hán-Việt."
        }
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant={mode === "choice" ? "default" : "secondary"}
          onClick={() => restart(level, "choice")}
        >
          Chọn nghĩa
        </Button>
        <Button
          size="sm"
          variant={mode === "dictation" ? "default" : "secondary"}
          onClick={() => restart(level, "dictation")}
        >
          Nghe &amp; gõ
        </Button>
        <span className="mx-1 hidden h-5 w-px bg-border sm:block" />
        {(["all", "N5", "N4"] as const).map((lv) => (
          <Button key={lv} size="sm" variant={level === lv ? "default" : "secondary"} onClick={() => restart(lv)}>
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
            <Button type="button" variant="default" disabled={playing !== null} onClick={() => void play("normal")}>
              <Volume2 />
              {heard ? "Nghe lại" : "Nghe"}
            </Button>
            <Button type="button" variant="secondary" disabled={playing !== null} onClick={() => void play("slow")}>
              <Turtle />
              Nghe chậm
            </Button>
          </div>
          {/* Chừa sẵn chỗ cho thông báo giọng đọc để không giật khi nó hiện ra. */}
          <div className="min-h-[34px]">
            {ttsMsg ? <p className="text-xs leading-relaxed text-muted">{ttsMsg}</p> : null}
          </div>
          {mode === "choice" ? (
            <>
              {/* Chừa sẵn chỗ cho ô “từ vừa nghe” — nó xuất hiện sau khi bấm Nghe. */}
              <div className="min-h-[136px]">
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
              </div>
              <div className="grid content-start gap-2">
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
                        award(idx === item.answerIndex);
                      }}
                    >
                      <span className="text-left text-sm leading-snug text-fg">{o}</span>
                    </ChoiceRow>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Input
                ref={inputRef}
                value={typed}
                disabled={checked}
                onChange={(e) => setTyped(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    checkTyped();
                  }
                }}
                placeholder="Gõ điều vừa nghe (romaji hoặc kana)…"
                aria-label="Chép lại điều vừa nghe"
                className="font-jp"
              />
              <div className="flex flex-wrap gap-2">
                <Button type="button" disabled={!heard || !typed.trim() || checked} onClick={checkTyped}>
                  Kiểm tra
                </Button>
                {!checked ? (
                  <Button type="button" variant="ghost" onClick={revealTyped}>
                    Xem đáp án
                  </Button>
                ) : null}
              </div>
              <p className="text-xs leading-relaxed text-subtle">
                Mẹo: gõ romaji không dấu cũng được (kuukou = くうこう). Chưa nghe ra thì bấm “Nghe
                chậm” — nghe hiểu rồi hãy nghe bình thường để luyện tốc độ thật.
              </p>
            </div>
          )}
          {/* Khu vực phản hồi chừa sẵn chiều cao: bấm đáp án xong khối này hiện ra
              mà trang không nhảy, nút “Tiếp” luôn nằm đúng chỗ. */}
          <div className="min-h-[284px]">
            {revealed ? (
              <div className="space-y-3">
                {mode === "dictation" ? (
                  <p className={cn("text-sm font-medium", correct ? "text-forest" : "text-seal")}>
                    {correct ? "Chính xác!" : checked && verdict === "no" ? "Chưa đúng" : ""}
                  </p>
                ) : null}
                <div className="rounded-[10px] border border-border bg-choice p-4 text-left">
                  {item.kind === "sentence" ? <p className="mb-1 text-xs text-subtle">{item.title}</p> : null}
                  <JpText text={item.jp} className="text-xl" hint={false} />
                  <p className="mt-1 font-jp text-sm text-muted">{item.kana}</p>
                  {showRomaji ? <p className="mt-1 text-sm leading-relaxed text-muted">{item.romaji}</p> : null}
                  <p className="mt-1 text-sm leading-relaxed text-fg">{item.vi}</p>
                </div>
                {mode === "dictation" && !correct ? (
                  <p className="text-xs leading-relaxed text-subtle">
                    Nghe lại câu này một lần nữa rồi hãy sang câu mới — nghe lại ngay là lúc nhớ được
                    nhất.
                  </p>
                ) : null}
                <Button className="w-full" onClick={advance}>
                  {i + 1 >= round.length ? "Xem kết quả" : "Tiếp"}
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted">
                {mode === "dictation"
                  ? heard
                    ? "Gõ lại bằng romaji hoặc kana rồi bấm Kiểm tra (hoặc Enter)."
                    : "Bấm Nghe hoặc Nghe chậm. Trình duyệt chỉ đọc sau khi bạn bấm."
                  : heard
                    ? "Chọn nghĩa khớp với từ/câu vừa nghe."
                    : "Bấm Nghe hoặc Nghe chậm. Trình duyệt chỉ đọc sau khi bạn bấm."}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
