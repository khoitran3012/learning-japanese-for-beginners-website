import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuizCard } from "@/components/quiz-card";
import { FlashcardDeck, type FlashCard } from "@/components/flashcard-deck";
import { SpeakButton } from "@/components/speak-button";
import { Badge } from "@/components/ui/badge";
import { DynamicLink } from "@/components/dynamic-link";
import { makeDailyQuiz, makeDailyVocabQuiz, makeDailyKanjiQuiz, type KanjiQuizLevel, type QuizQuestion } from "@/lib/akari/quiz-engine";
import { dailyVocabPack } from "@/lib/akari/daily-vocab";
import { dailyKanjiPack } from "@/lib/akari/daily-kanji";
import { kanjiFurigana } from "@/lib/akari/on-kun";
import { makePathReview, PATH_REVIEW, pathReviewOf } from "@/lib/akari/path-review";
import { pathStageAccess } from "@/lib/akari/path-progress";
import { stageKicker, stageLabel, type PathStageId } from "@/lib/akari/path-stages";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import { todayKey, uid, cn, isBrowser } from "@/lib/utils";
import { syncQuizToLeaderboard } from "@/lib/akari/sync-score";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import type { SrsItem } from "@/lib/akari/types";

export const Route = createFileRoute("/_app/daily")({ component: Page });

type Track =
  | { id: "daily"; practice: boolean }
  | { id: "vocab-learn" }
  | { id: "vocab-test" }
  | { id: "kanji-learn" }
  | { id: "kanji-test" }
  | { id: "path"; stage: PathStageId; kanjiLevel?: KanjiQuizLevel };

type SavedScore = { score: number; total: number };

function dailyKey(date: string) {
  return `akari-daily-${date}`;
}

function reviewKey(date: string, stage: string, level?: string) {
  return `akari-review-${date}-${stage}${level ? `-${level}` : ""}`;
}

function loadJson(key: string): SavedScore | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedScore;
    if (typeof parsed.score === "number" && typeof parsed.total === "number") return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

function saveJson(key: string, value: SavedScore) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota */
  }
}

function srsOf(q: QuizQuestion): { id: string; type: SrsItem["itemType"] } {
  if (q.kind === "kanji" || q.kind === "kanji-read" || q.kind === "listen-kanji" || q.kind === "radical") {
    return { id: q.sourceId, type: "kanji" };
  }
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

function trackTitle(track: Track) {
  if (track.id === "daily") return track.practice ? "Luyện thêm bài hôm nay" : "Bài tập hôm nay";
  if (track.id === "vocab-learn") return "Từ vựng hôm nay";
  if (track.id === "vocab-test") return "Kiểm tra từ hôm nay";
  if (track.id === "kanji-learn") return "Kanji hôm nay";
  if (track.id === "kanji-test") return "Kiểm tra kanji hôm nay";
  const sub = track.kanjiLevel
    ? ` · ${track.kanjiLevel === "core" ? "N5+N4" : track.kanjiLevel === "all" ? "N5→N1" : track.kanjiLevel}`
    : "";
  return `Ôn ${stageLabel(track.stage)}${sub}`;
}

function persistKey(date: string, track: Track) {
  if (track.id === "daily") return dailyKey(date);
  if (track.id === "vocab-learn" || track.id === "vocab-test") return reviewKey(date, "vocab");
  if (track.id === "kanji-learn" || track.id === "kanji-test") return reviewKey(date, "kanji");
  return reviewKey(date, track.stage, track.kanjiLevel);
}

function Page() {
  const date = todayKey();
  const dailyQs = useMemo(() => makeDailyQuiz(date, 15), [date]);
  const [track, setTrack] = useState<Track | null>(null);
  const [round, setRound] = useState(0);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [qs, setQs] = useState<QuizQuestion[]>([]);
  const scoreRef = useRef(0);
  const [saved, setSaved] = useState(() => loadJson(dailyKey(date)));
  const [done, setDone] = useState<SavedScore | null>(null);
  const log = useProgress((s) => s.logStudy);
  const mark = useProgress((s) => s.mark);
  const recordQuiz = useProgress((s) => s.recordQuiz);
  const syncPath = useProgress((s) => s.syncPathFromStudy);
  const streak = useProgress((s) => s.streak);
  const completed = useProgress((s) => s.completedLessonIds);
  const srs = useProgress((s) => s.srs);
  const freeMode = useSettings((s) => s.freeMode);
  const showRomaji = useSettings((s) => s.showRomaji);
  const user = useCurrentUser();
  const access = useMemo(() => pathStageAccess(completed, freeMode), [completed, freeMode]);
  const vocabPack = useMemo(() => dailyVocabPack(date, srs), [date, srs]);
  const kanjiPack = useMemo(() => dailyKanjiPack(date, srs), [date, srs]);
  const vocabSaved = loadJson(reviewKey(date, "vocab"));
  const kanjiSaved = loadJson(reviewKey(date, "kanji"));
  const vocabCards: FlashCard[] = useMemo(
    () =>
      vocabPack.map((v) => ({
        id: v.id,
        front: v.word,
        back: v.meaning_vi,
        extra: `${v.kana}${showRomaji ? ` · ${v.romaji}` : ""} · ${v.level}`,
        speak: v.kana,
        type: "vocab" as const,
        answers: [v.meaning_vi, v.kana, v.romaji],
        answerHint: "Gõ nghĩa Việt, kana hoặc romaji",
      })),
    [vocabPack, showRomaji],
  );
  const kanjiCards: FlashCard[] = useMemo(
    () =>
      kanjiPack.map((k) => {
        const yomi = kanjiFurigana(k);
        return {
          id: k.id,
          front: k.character,
          back: `${k.han_viet ? `${k.han_viet} · ` : ""}${k.meaning_vi}`,
          extra: `${yomi.line || "—"} · ${k.level}`,
          speak: yomi.kun || yomi.on || k.character,
          type: "kanji" as const,
          answers: [k.meaning_vi, k.han_viet, yomi.kun, yomi.on].filter(Boolean),
          answerHint: "Gõ nghĩa, Hán-Việt hoặc hiragana",
        };
      }),
    [kanjiPack],
  );

  const q = qs[i];

  function questionsFor(next: Track): QuizQuestion[] {
    if (next.id === "daily") return dailyQs;
    if (next.id === "vocab-learn" || next.id === "kanji-learn") return [];
    if (next.id === "vocab-test") return makeDailyVocabQuiz(vocabPack.map((v) => v.id), date);
    if (next.id === "kanji-test") return makeDailyKanjiQuiz(kanjiPack.map((k) => k.id), date);
    return makePathReview(next.stage, next.kanjiLevel);
  }

  function start(next: Track) {
    scoreRef.current = 0;
    setQs(questionsFor(next));
    setTrack(next);
    setRound((n) => n + 1);
    setI(0);
    setScore(0);
    setDone(null);
  }

  async function finish(nextScore: number) {
    const total = qs.length;
    const result: SavedScore = { score: nextScore, total };
    setDone(result);
    if (track) saveJson(persistKey(date, track), result);
    if (track?.id === "daily" && !track.practice) setSaved(result);
    try {
      await recordQuiz({
        id: uid(
          track?.id === "path"
            ? track.stage
            : track?.id === "vocab-test"
              ? "vocab"
              : track?.id === "kanji-test"
                ? "kanji"
                : "daily",
        ),
        at: Date.now(),
        kind:
          track?.id === "daily" && !track.practice
            ? "daily"
            : track?.id === "vocab-test"
              ? "daily-vocab"
              : track?.id === "kanji-test"
                ? "daily-kanji"
                : track?.id === "path"
                ? `path-${track.stage}`
                : "daily-practice",
        score: nextScore,
        total,
        durationMs: 0,
      });
      await log(total, track?.id === "daily" && !track.practice ? 8 : 5);
      if (track?.id === "daily" && !track.practice) {
        await syncQuizToLeaderboard({
          score: nextScore,
          total,
          minutes: 8,
          streak,
          dailyScore: nextScore,
          displayName: user?.displayName,
        });
      }
      await syncPath();
    } catch (err) {
      console.error("[daily] không lưu được kết quả:", err);
    }
  }

  if (track?.id === "vocab-learn") {
    return (
      <div>
        <PageHeader
          kicker="単語"
          title="Từ vựng hôm nay"
          description={`${vocabPack.length} từ mới ngày ${date}. Lật thẻ, nhớ rồi kiểm tra.`}
        />
        <div className="mb-3 flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => setTrack(null)}>
            Về bài hôm nay
          </Button>
          <Button size="sm" onClick={() => start({ id: "vocab-test" })}>
            Kiểm tra
          </Button>
        </div>
        <FlashcardDeck
          cards={vocabCards}
          sessionKey={`daily-vocab-${date}-${round}`}
          doneExtra={
            <Button variant="secondary" onClick={() => start({ id: "vocab-test" })}>
              Sang kiểm tra
            </Button>
          }
        />
      </div>
    );
  }

  if (track?.id === "kanji-learn") {
    return (
      <div>
        <PageHeader
          kicker="漢字"
          title="Kanji hôm nay"
          description={`${kanjiPack.length} chữ mới ngày ${date}. Nhớ Hán-Việt, hiragana, rồi kiểm tra.`}
        />
        <div className="mb-3 flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => setTrack(null)}>
            Về bài hôm nay
          </Button>
          <Button size="sm" onClick={() => start({ id: "kanji-test" })}>
            Kiểm tra
          </Button>
        </div>
        <FlashcardDeck
          cards={kanjiCards}
          sessionKey={`daily-kanji-${date}-${round}`}
          doneExtra={
            <Button variant="secondary" onClick={() => start({ id: "kanji-test" })}>
              Sang kiểm tra
            </Button>
          }
        />
      </div>
    );
  }

  if (track && done) {
    return (
      <div>
        <PageHeader kicker="今日" title={trackTitle(track)} description={`Đã lưu ${done.score}/${done.total}.`} />
        <Card className="mx-auto max-w-md">
          <CardContent className="py-10 text-center">
            <p className="text-4xl font-semibold tabular-nums">
              {done.score}/{done.total}
            </p>
            <p className="mt-2 text-sm text-muted">
              {Math.round((done.score / Math.max(1, done.total)) * 100)}% đúng
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Button onClick={() => start(track)}>Ôn lại</Button>
              {track.id === "vocab-test" ? (
                <Button variant="secondary" onClick={() => start({ id: "vocab-learn" })}>
                  Học lại thẻ
                </Button>
              ) : null}
              {track.id === "kanji-test" ? (
                <Button variant="secondary" onClick={() => start({ id: "kanji-learn" })}>
                  Học lại chữ
                </Button>
              ) : null}
              <Button variant="secondary" onClick={() => setTrack(null)}>
                Chọn chặng khác
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (track && q) {
    return (
      <div>
        <PageHeader
          kicker="今日"
          title={trackTitle(track)}
          description={
            track.id === "daily"
              ? track.practice
                ? "Cùng đề hôm nay — vẫn lưu điểm ôn."
                : "15 câu trộn chữ, từ, kanji, nghe, trợ từ, ngữ pháp."
              : track.id === "vocab-test"
                ? "Kiểm tra đúng 8 từ hôm nay: nghĩa, kana, nghe."
                : track.id === "kanji-test"
                  ? "Kiểm tra đúng 6 chữ hôm nay: nghĩa, cách đọc, nghe."
                  : pathReviewOf(track.stage)?.blurb ?? "Câu random theo chặng lộ trình."
          }
        />
        <div className="mb-3">
          <Button size="sm" variant="secondary" onClick={() => setTrack(null)}>
            Đổi chặng
          </Button>
        </div>
        <QuizCard
          key={`${round}-${i}`}
          q={q}
          index={i}
          total={qs.length}
          score={score}
          fillKind={Boolean(q.typedAnswers?.length)}
          onAnswer={(ok) => {
            setScore((s) => {
              const n = s + (ok ? 1 : 0);
              scoreRef.current = n;
              return n;
            });
            if (track.id === "path" || track.id === "vocab-test" || track.id === "kanji-test") {
              const srsItem = srsOf(q);
              void mark(srsItem.id, srsItem.type, ok ? "good" : "forgot");
            }
          }}
          onNext={() => {
            if (i + 1 >= qs.length) void finish(scoreRef.current);
            else setI((x) => x + 1);
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        kicker="今日"
        title="Bài hôm nay"
        description="Mỗi ngày: kanji mới, từ vựng mới, đề 15 câu, rồi ôn đúng chặng lộ trình."
      />

      <Card className="mb-6">
        <CardContent className="space-y-3 py-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Đề ngày {date}</p>
          <h2 className="font-medium text-fg">15 câu tổng hợp</h2>
          <p className="text-sm text-muted">Chữ, từ, kanji, nghe, trợ từ, ngữ pháp — đề chung mọi người.</p>
          {saved ? (
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-2xl font-semibold tabular-nums">
                {saved.score}/{saved.total}
              </p>
              <Button onClick={() => start({ id: "daily", practice: true })}>Luyện thêm</Button>
              <Button asChild variant="secondary">
                <Link to="/leaderboard">Thi đua</Link>
              </Button>
            </div>
          ) : (
            <Button onClick={() => start({ id: "daily", practice: false })}>Làm bài hôm nay</Button>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="space-y-4 py-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">Kanji ngày {date}</p>
              <h2 className="font-medium text-fg">{kanjiPack.length} chữ mới hôm nay</h2>
              <p className="text-sm text-muted">Đổi bộ mỗi ngày (N5 trước). Học thẻ rồi kiểm tra đúng những chữ này.</p>
            </div>
            {kanjiSaved ? (
              <p className="text-sm tabular-nums text-muted">
                Test: {kanjiSaved.score}/{kanjiSaved.total}
              </p>
            ) : null}
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {kanjiPack.map((k) => {
              const yomi = kanjiFurigana(k);
              return (
                <li key={k.id} className="flex items-start justify-between gap-2 rounded-[10px] border border-border bg-bg-elevated px-3 py-2">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <DynamicLink to={`/kanji/${k.id}`} className="font-jp text-3xl text-fg hover:underline">
                        {k.character}
                      </DynamicLink>
                      <Badge variant="muted">{k.level}</Badge>
                    </div>
                    <p className="font-jp text-sm text-muted">{yomi.line || "—"}</p>
                    <p className="text-sm text-fg">
                      {k.han_viet ? `${k.han_viet} · ` : ""}
                      {k.meaning_vi}
                    </p>
                  </div>
                  <SpeakButton text={yomi.kun || yomi.on || k.character} kana={yomi.kun || yomi.on} label="Nghe" />
                </li>
              );
            })}
          </ul>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => start({ id: "kanji-learn" })}>Học 6 chữ</Button>
            <Button variant="secondary" onClick={() => start({ id: "kanji-test" })}>
              Kiểm tra
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="space-y-4 py-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">Từ vựng ngày {date}</p>
              <h2 className="font-medium text-fg">{vocabPack.length} từ mới hôm nay</h2>
              <p className="text-sm text-muted">Đổi bộ mỗi ngày (N5→N4). Học thẻ rồi kiểm tra đúng những từ này.</p>
            </div>
            {vocabSaved ? (
              <p className="text-sm tabular-nums text-muted">
                Test: {vocabSaved.score}/{vocabSaved.total}
              </p>
            ) : null}
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {vocabPack.map((v) => (
              <li key={v.id} className="flex items-start justify-between gap-2 rounded-[10px] border border-border bg-bg-elevated px-3 py-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <DynamicLink to={`/vocabulary/${v.id}`} className="font-jp text-lg text-fg hover:underline">
                      {v.word}
                    </DynamicLink>
                    <Badge variant="muted">{v.level}</Badge>
                  </div>
                  <p className="font-jp text-sm text-muted">{v.kana}</p>
                  {showRomaji ? <p className="text-xs text-accent">{v.romaji}</p> : null}
                  <p className="text-sm text-fg">{v.meaning_vi}</p>
                </div>
                <SpeakButton text={v.kana} kana={v.kana} label="Nghe" />
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => start({ id: "vocab-learn" })}>Học 8 từ</Button>
            <Button variant="secondary" onClick={() => start({ id: "vocab-test" })}>
              Kiểm tra
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="mb-3 font-display text-xl font-semibold">Ôn theo lộ trình</h2>
      <p className="mb-4 max-w-2xl text-sm text-muted">
        Chỉ mở chặng đang học và các chặng đã xong. Chặng sau khóa đến khi bạn hoàn thành chặng trước (hoặc bật chế độ tự do trên Lộ trình).
      </p>

      <ol className="space-y-3">
        {PATH_REVIEW.map((rev, idx) => {
          const st = access[rev.stage];
          const pct = st?.total ? Math.round(((st.doneCount ?? 0) / st.total) * 100) : 0;
          const open = Boolean(st?.open);
          const last = loadJson(reviewKey(date, rev.stage));
          return (
            <li key={rev.stage}>
              <Card className={cn(st?.current && "ring-1 ring-primary/40", !open && "opacity-60")}>
                <CardContent className="space-y-3 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
                        {idx + 1}. {stageKicker(rev.stage)}
                        {st?.complete ? " · đã xong" : st?.current ? " · đang học" : open ? "" : " · chưa mở"}
                      </p>
                      <h3 className="font-medium text-fg">{stageLabel(rev.stage)}</h3>
                      <p className="mt-1 text-sm text-muted">{rev.blurb}</p>
                      {last ? (
                        <p className="mt-1 text-sm tabular-nums text-muted">
                          Ôn hôm nay: {last.score}/{last.total}
                        </p>
                      ) : null}
                    </div>
                    {st && st.total > 0 ? (
                      <p className="text-sm tabular-nums text-muted">
                        {st.doneCount}/{st.total} bài
                      </p>
                    ) : null}
                  </div>
                  {st && st.total > 0 ? <Progress value={pct} /> : null}
                  <div className="flex flex-wrap gap-2">
                    {open ? (
                      rev.subLevels?.length ? (
                        rev.subLevels.map((lv) => (
                          <Button
                            key={lv.id}
                            size="sm"
                            variant={lv.id === rev.kanjiLevel ? "default" : "secondary"}
                            onClick={() => start({ id: "path", stage: rev.stage, kanjiLevel: lv.id })}
                          >
                            Ôn {lv.label}
                          </Button>
                        ))
                      ) : (
                        <Button size="sm" onClick={() => start({ id: "path", stage: rev.stage })}>
                          Ôn {rev.count} câu
                        </Button>
                      )
                    ) : (
                      <Button size="sm" variant="secondary" disabled>
                        <Lock className="size-3.5" />
                        Học xong chặng trước
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
