import { Link } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { SpeakButton } from "@/components/speak-button";
import { WriteCanvas } from "@/components/write-canvas";
import { StrokeOrder } from "@/components/stroke-order";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { KanaChar } from "@/lib/akari/types";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";

export function StudyKana({
  current,
  prev,
  next,
  kind,
}: {
  current: KanaChar;
  prev?: KanaChar;
  next?: KanaChar;
  kind: "hiragana" | "katakana";
}) {
  const showRomaji = useSettings((s) => s.showRomaji);
  const remember = useProgress((s) => s.remember);
  const forgot = useProgress((s) => s.forgot);
  const item = useProgress((s) => s.srs[current.id]);

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Card>
        <CardContent className="flex flex-col items-center py-10">
          <Badge variant="muted" className="mb-4">
            {current.group} · {current.strokeCount} nét
          </Badge>
          <p className="text-kana text-[7.5rem] leading-none sm:text-[9rem]">{current.char}</p>
          {showRomaji ? (
            <p className="mt-4 text-2xl font-medium tracking-wide text-accent">{current.romaji}</p>
          ) : (
            <p className="mt-4 text-sm text-subtle">Romaji đang tắt</p>
          )}
          {current.notes ? <p className="mt-3 text-center text-sm text-muted">{current.notes}</p> : null}
          {current.mnemonic ? <p className="mt-2 text-center text-sm text-muted">{current.mnemonic}</p> : null}
          <div className="mt-6">
            <SpeakButton text={current.char} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3">
          <h2 className="text-sm font-medium text-muted">Ví dụ</h2>
          {current.examples.map((ex) => (
            <div key={ex.jp} className="flex items-start justify-between gap-3 rounded-lg bg-bg-elevated p-3">
              <div className="min-w-0">
                <p className="font-jp text-xl text-fg">{ex.jp}</p>
                {showRomaji ? <p className="text-sm text-fg">{ex.romaji}</p> : null}
                <p className="text-sm text-fg">{ex.vi}</p>
              </div>
              <SpeakButton text={ex.jp} label="Nghe" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-5">
          <StrokeOrder character={current.char} strokeCount={current.strokeCount} />
          <WriteCanvas character={current.char} strokeCount={current.strokeCount} />
        </CardContent>
      </Card>

      {item ? (
        <p className="text-center text-xs text-muted">
          Đúng {item.correct} · Sai {item.incorrect} · Hộp {item.leitnerBox}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2">
        {prev ? (
          <Button asChild variant="secondary">
            <Link to={kind === "hiragana" ? "/hiragana/$id" : "/katakana/$id"} params={{ id: prev.id }}>
              <ChevronLeft /> Trước
            </Link>
          </Button>
        ) : (
          <span />
        )}
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => void forgot(current.id, "kana")}>
            <RotateCcw /> Cần ôn
          </Button>
          <Button variant="success" onClick={() => void remember(current.id, "kana")}>
            <Check /> Đã nhớ
          </Button>
        </div>
        {next ? (
          <Button asChild>
            <Link to={kind === "hiragana" ? "/hiragana/$id" : "/katakana/$id"} params={{ id: next.id }}>
              Sau <ChevronRight />
            </Link>
          </Button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
