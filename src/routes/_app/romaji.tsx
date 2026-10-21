import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SpeakButton } from "@/components/speak-button";
import { HIRAGANA } from "@/data/kana";
import { normalizeRomaji, romajiVariants } from "@/lib/akari/romaji";
import { useProgress } from "@/lib/akari/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/romaji")({ component: Page });

const POOL = HIRAGANA.filter((k) => k.group === "gojuon");

type Mode = "jp-ro" | "ro-jp" | "mixed";
type Direction = "jp-ro" | "ro-jp";

const MODES: Array<{ id: Mode; label: string }> = [
  { id: "jp-ro", label: "Nhật → Romaji" },
  { id: "ro-jp", label: "Romaji → Nhật" },
  { id: "mixed", label: "Trộn cả hai" },
];

function Page() {
  const [mode, setMode] = useState<Mode>("jp-ro");
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [score, setScore] = useState({ correct: 0, answered: 0 });

  const remember = useProgress((s) => s.remember);
  const forgot = useProgress((s) => s.forgot);
  const inputRef = useRef<HTMLInputElement>(null);

  const item = POOL[index % POOL.length]!;
  const direction: Direction = mode === "mixed" ? (index % 2 === 0 ? "jp-ro" : "ro-jp") : mode;
  const prompt = direction === "jp-ro" ? item.char : item.romaji;
  const example = item.examples[0];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function restart(nextMode: Mode) {
    setMode(nextMode);
    setIndex(0);
    setTyped("");
    setFeedback(null);
    setScore({ correct: 0, answered: 0 });
    inputRef.current?.focus();
  }

  function check() {
    const value = typed.trim();
    if (!value) return;
    // Jp → Ro accepts Hepburn variants (shi/si, tsu/tu, …); Ro → Jp needs the kana.
    const ok =
      direction === "jp-ro"
        ? romajiVariants(item.romaji).includes(normalizeRomaji(value))
        : value.normalize("NFKC").replace(/\s+/g, "") === item.char;

    setScore((s) => ({ correct: s.correct + (ok ? 1 : 0), answered: s.answered + 1 }));

    if (ok) {
      setFeedback({ ok: true, text: `Đúng — ${item.char} = ${item.romaji}` });
      void remember(item.id, "kana");
      setTyped("");
      setIndex((x) => x + 1);
    } else {
      setFeedback({
        ok: false,
        text: `Chưa đúng — đáp án: ${direction === "jp-ro" ? item.romaji : item.char}`,
      });
      void forgot(item.id, "kana");
    }
    inputRef.current?.focus();
  }

  function skip() {
    setFeedback({ ok: false, text: `Bỏ qua — ${item.char} = ${item.romaji}` });
    setTyped("");
    setIndex((x) => x + 1);
    inputRef.current?.focus();
  }

  const accuracy = score.answered ? Math.round((score.correct / score.answered) * 100) : 0;
  const position = index % POOL.length;

  return (
    <div>
      <PageHeader
        kicker="ローマ字"
        title="Luyện Romaji"
        description="Gõ đáp án để luyện chuyển Nhật ↔ Latin. Chấp nhận biến thể Hepburn: shi/si, chi/ti, tsu/tu."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {MODES.map((m) => (
          <Button
            key={m.id}
            variant={mode === m.id ? "default" : "secondary"}
            onClick={() => restart(m.id)}
          >
            {m.label}
          </Button>
        ))}
      </div>

      <Card className="mx-auto max-w-lg">
        <CardContent className="space-y-5 py-8">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>
              Câu {position + 1}/{POOL.length}
            </span>
            <span className="tabular-nums">
              {score.correct}/{score.answered} đúng · {accuracy}%
            </span>
          </div>
          <Progress value={(position / POOL.length) * 100} />

          <div className="flex flex-col items-center gap-2">
            <p
              className={cn(
                "text-center",
                direction === "jp-ro" ? "text-kana text-7xl" : "font-mono text-5xl tracking-wide",
              )}
            >
              {prompt}
            </p>
            <p className="text-sm text-muted">
              {direction === "jp-ro" ? "Gõ romaji của chữ này" : "Gõ chữ Nhật tương ứng"}
            </p>
            <SpeakButton className="mt-1" text={item.char} />
          </div>

          <form
            className="flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              check();
            }}
          >
            <Input
              ref={inputRef}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder={direction === "jp-ro" ? "Nhập romaji" : "Nhập chữ Nhật"}
              aria-label="Đáp án"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="sm:flex-1"
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={!typed.trim()}>
                Kiểm tra
              </Button>
              <Button type="button" variant="secondary" onClick={skip}>
                Bỏ qua
              </Button>
            </div>
          </form>

          <p
            aria-live="polite"
            className={cn(
              "min-h-5 text-sm",
              !feedback ? "text-muted" : feedback.ok ? "text-success" : "text-danger",
            )}
          >
            {feedback?.text ?? ""}
          </p>

          {example ? (
            <div className="border-t border-border pt-4 text-sm text-muted">
              <span className="text-kana text-fg">{example.jp}</span> · {example.romaji} · {example.vi}
            </div>
          ) : null}

          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => restart(mode)}>
              Làm lại
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
