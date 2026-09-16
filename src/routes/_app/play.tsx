import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HIRAGANA } from "@/data/kana";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { shuffle } from "@/lib/utils";
import { useProgress } from "@/lib/akari/progress";
import { SpeakButton } from "@/components/speak-button";
import { normalizeRomaji } from "@/lib/akari/romaji";

export const Route = createFileRoute("/_app/play")({ component: Page });

type Mode = "memory" | "speed" | "match" | "type";

function Page() {
  const [mode, setMode] = useState<Mode>("memory");
  return (
    <div>
      <PageHeader
        kicker="遊"
        title="Giải trí"
        description="Ghép thẻ, đua tốc độ, nối nghĩa, gõ romaji — luyện chữ mà không khô lý thuyết."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <Button variant={mode === "memory" ? "default" : "secondary"} onClick={() => setMode("memory")}>
          Lật thẻ
        </Button>
        <Button variant={mode === "speed" ? "default" : "secondary"} onClick={() => setMode("speed")}>
          30 giây
        </Button>
        <Button variant={mode === "match" ? "default" : "secondary"} onClick={() => setMode("match")}>
          Nối nghĩa
        </Button>
        <Button variant={mode === "type" ? "default" : "secondary"} onClick={() => setMode("type")}>
          Gõ romaji
        </Button>
      </div>
      {mode === "memory" ? <MemoryGame /> : null}
      {mode === "speed" ? <SpeedGame /> : null}
      {mode === "match" ? <MatchGame /> : null}
      {mode === "type" ? <TypeGame /> : null}
    </div>
  );
}

function MemoryGame() {
  const log = useProgress((s) => s.logStudy);
  const deck = useMemo(() => {
    const pool = shuffle(HIRAGANA.filter((k) => k.group === "gojuon")).slice(0, 8);
    const cards = shuffle(
      pool.flatMap((c) => [
        { id: `${c.id}-jp`, pair: c.id, label: c.char, kind: "jp" as const },
        { id: `${c.id}-ro`, pair: c.id, label: c.romaji, kind: "ro" as const },
      ]),
    );
    return cards;
  }, []);
  const [open, setOpen] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const done = matched.size === 8;

  function flip(id: string, pair: string) {
    if (matched.has(pair) || open.includes(id) || open.length === 2) return;
    const next = [...open, id];
    setOpen(next);
    if (next.length < 2) return;
    setMoves((m) => m + 1);
    const a = deck.find((c) => c.id === next[0]);
    const b = deck.find((c) => c.id === next[1]);
    window.setTimeout(() => {
      if (a && b && a.pair === b.pair && a.id !== b.id) {
        setMatched((s) => new Set([...s, a.pair]));
        void log(1, 0.2);
      }
      setOpen([]);
    }, 550);
  }

  return (
    <Card>
      <CardContent>
        <p className="mb-3 text-sm text-muted">
          Lật 8 cặp hiragana ↔ romaji · {moves} lượt{done ? " · xong!" : ""}
        </p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-4">
          {deck.map((c) => {
            const face = matched.has(c.pair) || open.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => flip(c.id, c.pair)}
                className={`flex min-h-[4.5rem] items-center justify-center rounded-[10px] border text-xl ${
                  matched.has(c.pair)
                    ? "border-success bg-success/10 font-jp"
                    : face
                      ? "border-primary bg-surface font-jp"
                      : "border-border bg-bg-elevated text-subtle"
                }`}
              >
                {face ? c.label : "?"}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function SpeedGame() {
  const pool = useMemo(() => shuffle(HIRAGANA.filter((k) => k.group === "gojuon")), []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(30);
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState(false);
  const log = useProgress((s) => s.logStudy);
  const item = pool[i % pool.length]!;
  const timer = useState<{ id: number | null }>({ id: null })[0];

  useEffect(() => {
    return () => {
      if (timer.id) window.clearInterval(timer.id);
    };
  }, [timer]);

  function start() {
    if (timer.id) window.clearInterval(timer.id);
    setScore(0);
    setI(0);
    setLeft(30);
    setOver(false);
    setRunning(true);
    timer.id = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          if (timer.id) window.clearInterval(timer.id);
          timer.id = null;
          setRunning(false);
          setOver(true);
          void log(1, 0.5);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  const options = useMemo(() => {
    const wrong = shuffle(pool.filter((x) => x.id !== item.id)).slice(0, 3);
    return shuffle([item, ...wrong]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, running]);

  return (
    <Card className="mx-auto max-w-lg">
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm text-muted">
          <span className="tabular-nums">Điểm {score}</span>
          <span className="tabular-nums">{left}s</span>
        </div>
        {!running && !over ? (
          <Button onClick={start}>Bắt đầu 30 giây</Button>
        ) : over ? (
          <div className="text-center">
            <p className="text-3xl font-semibold tabular-nums">{score}</p>
            <p className="text-sm text-muted">chữ đúng trong 30 giây</p>
            <Button className="mt-3" onClick={start}>
              Chơi lại
            </Button>
          </div>
        ) : (
          <>
            <p className="text-center font-jp text-6xl">{item.char}</p>
            <SpeakButton text={item.char} />
            <div className="grid grid-cols-2 gap-2">
              {options.map((o) => (
                <Button
                  key={o.id + i}
                  variant="secondary"
                  onClick={() => {
                    if (o.id === item.id) setScore((s) => s + 1);
                    setI((n) => n + 1);
                  }}
                >
                  {o.romaji}
                </Button>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function MatchGame() {
  const round = useMemo(() => shuffle(VOCAB_N5).slice(0, 5), []);
  const [right, setRight] = useState(() => shuffle(round.map((v) => v.id)));
  const [leftPick, setLeftPick] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState(0);
  const log = useProgress((s) => s.logStudy);

  return (
    <Card>
      <CardContent>
        <p className="mb-3 text-sm text-muted">Chọn từ bên trái, rồi nghĩa bên phải · sai {wrong}</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            {round.map((v) => (
              <Button
                key={v.id}
                variant={done.has(v.id) ? "success" : leftPick === v.id ? "default" : "secondary"}
                className="h-auto w-full justify-start py-3 font-jp"
                disabled={done.has(v.id)}
                onClick={() => setLeftPick(v.id)}
              >
                {v.word}
                <span className="ml-2 text-xs font-sans text-muted">{v.kana}</span>
              </Button>
            ))}
          </div>
          <div className="space-y-2">
            {right.map((id) => {
              const v = round.find((x) => x.id === id)!;
              return (
                <Button
                  key={id}
                  variant={done.has(id) ? "success" : "secondary"}
                  className="h-auto w-full justify-start py-3"
                  disabled={done.has(id)}
                  onClick={() => {
                    if (!leftPick || done.has(id)) return;
                    if (leftPick === id) {
                      const next = new Set(done);
                      next.add(id);
                      setDone(next);
                      setLeftPick(null);
                      void log(1, 0.2);
                      if (next.size === round.length) setRight((r) => r);
                    } else {
                      setWrong((w) => w + 1);
                      setLeftPick(null);
                    }
                  }}
                >
                  {v.meaning_vi}
                </Button>
              );
            })}
          </div>
        </div>
        {done.size === round.length ? (
          <p className="mt-4 text-center text-sm text-success">Khớp hết {round.length} cặp.</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

function TypeGame() {
  const pool = useMemo(() => shuffle(HIRAGANA.filter((k) => k.group === "gojuon" || k.group === "dakuten")), []);
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState("");
  const [ok, setOk] = useState(0);
  const [miss, setMiss] = useState(0);
  const [msg, setMsg] = useState<string | null>(null);
  const log = useProgress((s) => s.logStudy);
  const item = pool[i % pool.length]!;

  return (
    <Card className="mx-auto max-w-lg">
      <CardContent className="space-y-4">
        <p className="text-sm text-muted">
          Nhìn chữ, gõ romaji · đúng {ok} · sai {miss}
        </p>
        <p className="text-center font-jp text-7xl leading-none">{item.char}</p>
        <div className="flex justify-center">
          <SpeakButton text={item.char} />
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const hit = normalizeRomaji(typed) === normalizeRomaji(item.romaji);
            if (hit) {
              setOk((n) => n + 1);
              setMsg("Đúng!");
              void log(1, 0.15);
            } else {
              setMiss((n) => n + 1);
              setMsg(`${item.char} = ${item.romaji}`);
            }
            setTyped("");
            setI((n) => n + 1);
          }}
        >
          <Input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="vd: ka"
            autoComplete="off"
            autoCapitalize="off"
          />
          <Button type="submit">OK</Button>
        </form>
        {msg ? <p className="text-center text-sm text-muted">{msg}</p> : null}
      </CardContent>
    </Card>
  );
}

