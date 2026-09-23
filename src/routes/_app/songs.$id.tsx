import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SpeakButton } from "@/components/speak-button";
import { JpText } from "@/components/jp-text";
import { RememberMark } from "@/components/remember-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChoiceRow, choiceState } from "@/components/ui/choice-row";
import { SONGS, songById, type AnimeSong } from "@/data/songs";
import { useSettings } from "@/lib/akari/settings";
import { isBrowser } from "@/lib/utils";

export const Route = createFileRoute("/_app/songs/$id")({ component: Page });

function heardKey(id: string) {
  return `akari-song-heard-${id}`;
}

function loadHeard(id: string): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(heardKey(id));
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function Page() {
  const { id } = Route.useParams();
  const song = songById(id);
  if (!song) throw notFound();
  const current = song;
  const showRomaji = useSettings((s) => s.showRomaji);
  const [heard, setHeard] = useState<string[]>(() => loadHeard(song.id));
  const youtube = `https://www.youtube.com/results?search_query=${encodeURIComponent(song.search)}`;

  function toggle(kana: string) {
    setHeard((prev) => {
      const next = prev.includes(kana) ? prev.filter((x) => x !== kana) : [...prev, kana];
      if (isBrowser()) localStorage.setItem(heardKey(current.id), JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Button asChild variant="ghost" size="sm">
        <Link to="/songs">
          <ChevronLeft /> Bài hát
        </Link>
      </Button>
      <PageHeader
        kicker={song.anime}
        title={song.title}
        description={`${song.artist} · ${song.year}. ${song.why}`}
      />
      <Card>
        <CardContent className="space-y-3 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{song.level}</Badge>
            <span className="text-sm text-accent">{song.romaji}</span>
          </div>
          <p className="font-jp text-lg text-muted">{song.titleKana}</p>
          <p className="text-sm leading-relaxed text-fg">{song.focus}</p>
          {song.bits.length ? (
            <ul className="flex flex-wrap gap-2">
              {song.bits.map((b) => (
                <li key={b.ch} className="rounded-[10px] border border-border bg-bg-elevated px-3 py-2">
                  <p className="font-jp text-xl">{b.ch}</p>
                  <p className="font-jp text-sm text-muted">{b.kana}</p>
                  <p className="text-sm text-fg">{b.vi}</p>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="text-xs leading-relaxed text-subtle">
            Không có lời bài hát ở đây. Học từ và câu bên dưới, rồi mở bản chính thức để nghe đúng giọng.
          </p>
          <Button asChild>
            <a href={youtube} target="_blank" rel="noreferrer">
              Nghe bản chính thức
            </a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3">
          <h2 className="font-medium">Từ nên thuộc trước khi nghe</h2>
          <ul className="space-y-2">
            {song.vocab.map((v) => (
              <li key={v.kana} className="flex items-center justify-between gap-2 rounded-[10px] border border-border px-3 py-2">
                <div className="min-w-0">
                  <p className="font-jp text-lg">{v.word}</p>
                  <p className="font-jp text-sm text-muted">{v.kana}</p>
                  {showRomaji ? <p className="text-xs text-accent">{v.romaji}</p> : null}
                  <p className="text-sm">{v.meaning}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <SpeakButton text={v.kana} kana={v.kana} label="Nghe" />
                  <RememberMark id={`song:${song.id}:${v.kana}`} itemType="custom" label={v.word} />
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="font-medium">Câu luyện</h2>
          <p className="text-sm text-muted">Câu viết riêng để nhớ từ của bài, không phải lời hát. Bấm chữ để xem hiragana và Hán-Việt.</p>
          {song.lines.map((line) => (
            <div key={line.jp} className="border-t border-border pt-3">
              <div className="flex items-start justify-between gap-2">
                <JpText text={line.jp} className="font-jp text-lg" />
                <SpeakButton text={line.kana} kana={line.kana} label="Nghe" />
              </div>
              <p className="mt-1 font-jp text-sm text-muted">{line.kana}</p>
              {showRomaji ? <p className="text-xs text-accent">{line.romaji}</p> : null}
              <p className="text-sm">{line.vi}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3">
          <h2 className="font-medium">Nghe và tích từ</h2>
          <p className="text-sm text-muted">
            Mở bài hát, nghe một lần. Thấy từ nào thì tích. {heard.length}/{song.vocab.length}
          </p>
          <ul className="space-y-2">
            {song.vocab.map((v) => {
              const on = heard.includes(v.kana);
              return (
                <li key={v.kana}>
                  <button
                    type="button"
                    onClick={() => toggle(v.kana)}
                    className="flex w-full items-center gap-2 rounded-[10px] border border-border px-3 py-2 text-left hover:bg-bg-elevated"
                  >
                    <Check className={on ? "size-4 text-success" : "size-4 text-subtle"} />
                    <span className="font-jp">{v.word}</span>
                    <span className="text-sm text-muted">{v.meaning}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <SongQuiz song={song} />
    </div>
  );
}

function SongQuiz({ song }: { song: AnimeSong }) {
  const questions = useMemo(() => makeQuiz(song), [song]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const q = questions[i];
  if (!q) return null;
  const done = i >= questions.length - 1 && picked !== null;

  return (
    <Card>
      <CardContent className="space-y-3">
        <h2 className="font-medium">Kiểm tra từ của bài</h2>
        <p className="text-sm text-muted">
          Câu {i + 1}/{questions.length}
          {picked !== null && i === questions.length - 1 ? ` · ${score}/${questions.length}` : ""}
        </p>
        <p className="font-jp text-3xl">{q.word.word}</p>
        <p className="font-jp text-sm text-muted">{q.word.kana}</p>
        <div className="space-y-2">
          {q.options.map((opt, idx) => (
            <ChoiceRow
              key={opt}
              state={choiceState({
                revealed: picked !== null,
                isAnswer: idx === q.answer,
                picked: picked === idx,
              })}
              disabled={picked !== null}
              onClick={() => {
                if (picked !== null) return;
                setPicked(idx);
                if (idx === q.answer) setScore((n) => n + 1);
              }}
            >
              {opt}
            </ChoiceRow>
          ))}
        </div>
        {picked !== null ? (
          <Button
            onClick={() => {
              if (done) {
                setI(0);
                setPicked(null);
                setScore(0);
                return;
              }
              setI((n) => n + 1);
              setPicked(null);
            }}
          >
            {done ? "Làm lại" : "Câu tiếp"}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}

function makeQuiz(song: AnimeSong) {
  const pool = SONGS.flatMap((s) => s.vocab.map((v) => v.meaning));
  return song.vocab.map((word, index) => {
    const options = [word.meaning];
    for (const meaning of pool) {
      if (options.length >= 4) break;
      if (!options.includes(meaning)) options.push(meaning);
    }
    const shift = index % options.length;
    const rotated = options.map((_, i) => options[(i + shift) % options.length]!);
    return { word, options: rotated, answer: rotated.indexOf(word.meaning) };
  });
}
