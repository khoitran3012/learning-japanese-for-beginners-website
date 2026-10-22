import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mic, Turtle, Volume2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JpText } from "@/components/jp-text";
import { dailyVocabPack } from "@/lib/akari/daily-vocab";
import {
  listenJapanese,
  makeSpeakRound,
  speechMatches,
  speechRecognitionAvailable,
  type SpeakLevel,
} from "@/lib/akari/speak-drill";
import { useProgress } from "@/lib/akari/progress";
import { speakJapanese, stopSpeaking } from "@/lib/akari/tts";
import { useSettings } from "@/lib/akari/settings";
import { todayKey, uid } from "@/lib/utils";
import type { VocabEntry } from "@/lib/akari/types";

export const Route = createFileRoute("/_app/speak")({
  validateSearch: (search: Record<string, unknown>): { set: "today" | "mix" } => ({
    set: search.set === "today" ? "today" : "mix",
  }),
  component: Page,
});

const SLOW = 0.48;

function Page() {
  const { set } = Route.useSearch();
  const ready = useProgress((s) => s.ready);
  const mark = useProgress((s) => s.mark);
  const recordQuiz = useProgress((s) => s.recordQuiz);
  const showRomaji = useSettings((s) => s.showRomaji);
  const ttsRate = useSettings((s) => s.ttsRate);
  const [level, setLevel] = useState<SpeakLevel>("N5");
  const [round, setRound] = useState<VocabEntry[]>([]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [playing, setPlaying] = useState<"normal" | "slow" | null>(null);
  const [hearing, setHearing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [micNote, setMicNote] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [graded, setGraded] = useState<"good" | "forgot" | null>(null);
  const [micOn, setMicOn] = useState(false);

  function load(nextLevel: SpeakLevel = level) {
    stopSpeaking();
    const items = set === "today" ? dailyVocabPack(todayKey(), useProgress.getState().srs) : makeSpeakRound(nextLevel);
    setLevel(nextLevel);
    setRound(items);
    setI(0);
    setScore(0);
    setDone(false);
    setPlaying(null);
    setHearing(false);
    setTranscript("");
    setMicNote(null);
    setRevealed(false);
    setGraded(null);
  }

  useEffect(() => {
    setMicOn(speechRecognitionAvailable());
    load(level);
    return () => stopSpeaking();
    // Đợi sổ ôn nạp xong rồi mới chốt 8 từ hôm nay. Không reset khi chấm một từ.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set, ready]);

  const item = !done && round[i] ? round[i] : undefined;

  async function play(speed: "normal" | "slow") {
    if (!item) return;
    setPlaying(speed);
    await speakJapanese(item.kana, speed === "slow" ? SLOW : ttsRate);
    setPlaying(null);
  }

  function grade(good: boolean) {
    if (!item || graded) return graded;
    setGraded(good ? "good" : "forgot");
    if (good) setScore((n) => n + 1);
    void mark(item.id, "vocab", good ? "good" : "forgot");
    setRevealed(true);
    return good ? "good" : "forgot";
  }

  async function hear() {
    if (!item || hearing) return;
    stopSpeaking();
    setHearing(true);
    setMicNote(null);
    setTranscript("");
    try {
      const { transcript: said } = await listenJapanese();
      setTranscript(said);
      const ok = speechMatches(said, [item.kana, item.word]);
      setMicNote(ok ? "Khớp với từ cần nói." : said ? "Chưa khớp. Nghe mẫu rồi nói lại, hoặc tự chấm." : "Chưa nghe được chữ nào.");
      if (ok) grade(true);
      else setRevealed(true);
    } catch (err) {
      setMicNote(err instanceof Error ? err.message : "Không nhận được giọng.");
      setRevealed(true);
    } finally {
      setHearing(false);
    }
  }

  async function finish(nextScore: number, total: number) {
    setDone(true);
    await recordQuiz({
      id: uid("quiz"),
      at: Date.now(),
      kind: "speak",
      score: nextScore,
      total,
      durationMs: 0,
    });
  }

  function next() {
    if (!round.length) return;
    if (i + 1 >= round.length) {
      void finish(score, round.length);
      return;
    }
    stopSpeaking();
    setI((n) => n + 1);
    setTranscript("");
    setMicNote(null);
    setRevealed(false);
    setGraded(null);
    setPlaying(null);
  }

  if (!round.length && !done) {
    return (
      <div>
        <PageHeader kicker="話" title="Luyện nói" description="Chưa có từ để nói." />
        <Button onClick={() => load()}>Thử lại</Button>
      </div>
    );
  }

  if (done || !item) {
    return (
      <div>
        <PageHeader
          kicker="話"
          title="Luyện nói"
          description="Nói được là đã ghi vào ôn tập. Cây Sakura nhận điểm như học từ."
        />
        <Card className="mx-auto max-w-md">
          <CardContent className="py-10 text-center">
            <p className="text-4xl font-semibold tabular-nums">
              {score}/{round.length}
            </p>
            <p className="mt-2 text-sm text-muted">từ nói được trong vòng này</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Button onClick={() => load()}>Vòng mới</Button>
              <Button asChild variant="secondary">
                <Link to="/listen">Sang luyện nghe</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        kicker="話"
        title="Luyện nói"
        description="Nhìn nghĩa tiếng Việt, nghe mẫu, rồi nói lại. Chrome hoặc Edge nhận mic tiếng Nhật. Không có mic thì tự chấm sau khi nói theo."
      />
      {set === "mix" ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {(["N5", "N4", "all"] as const).map((lv) => (
            <Button key={lv} size="sm" variant={level === lv ? "default" : "secondary"} onClick={() => load(lv)}>
              {lv === "all" ? "N5 + N4" : lv}
            </Button>
          ))}
        </div>
      ) : (
        <p className="mb-4 text-sm text-muted">Đúng 8 từ mới của hôm nay.</p>
      )}
      <Card className="mx-auto max-w-lg">
        <CardContent className="space-y-4">
          <p className="text-sm text-muted">
            {item.level} · {i + 1}/{round.length}
            {graded === "good" ? " · nói được" : graded === "forgot" ? " · chưa được" : ""}
          </p>
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">Nói tiếng Nhật cho nghĩa này</p>
            <p className="mt-1 text-2xl font-medium leading-snug">{item.meaning_vi}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" disabled={playing !== null || hearing} onClick={() => void play("normal")}>
              <Volume2 />
              Nghe mẫu
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={playing !== null || hearing}
              onClick={() => void play("slow")}
            >
              <Turtle />
              Nghe chậm
            </Button>
            {micOn ? (
              <Button type="button" variant="secondary" disabled={hearing || playing !== null} onClick={() => void hear()}>
                <Mic />
                {hearing ? "Đang nghe…" : "Nói"}
              </Button>
            ) : null}
          </div>
          {!micOn ? (
            <p className="text-xs text-muted">Máy này không nhận mic. Nghe mẫu, nói theo, rồi bấm Nói được.</p>
          ) : null}
          {/* Chừa chỗ cho kết quả nghe/kết luận để không giật khi chúng hiện ra. */}
          <div className="min-h-[40px]">
            {transcript ? <p className="text-sm text-fg">Nghe được: {transcript}</p> : null}
            {micNote ? <p className="text-sm text-muted">{micNote}</p> : null}
          </div>
          {/* Chừa sẵn chỗ cho thẻ đáp án: bấm “Hiện chữ” không làm trang giật. */}
          <div className="flex min-h-[196px] flex-col justify-end">
            {revealed ? (
              <div className="rounded-[10px] border border-border bg-choice p-4">
                <JpText text={item.word} className="text-3xl" />
                <p className="mt-1 font-jp text-sm text-muted">{item.kana}</p>
                {showRomaji ? <p className="text-sm text-accent">{item.romaji}</p> : null}
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-subtle">Câu mẫu</p>
                <JpText text={item.example_sentence} className="mt-1 text-lg" />
                <p className="mt-1 text-sm text-muted">{item.example_meaning_vi}</p>
              </div>
            ) : (
              <Button type="button" variant="secondary" onClick={() => setRevealed(true)}>
                Hiện chữ
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" disabled={graded !== null} onClick={() => grade(true)}>
              Nói được
            </Button>
            <Button type="button" variant="secondary" disabled={graded !== null} onClick={() => grade(false)}>
              Chưa được
            </Button>
            <Button type="button" variant="secondary" disabled={graded === null} onClick={next}>
              {i + 1 >= round.length ? "Xong" : "Tiếp"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
