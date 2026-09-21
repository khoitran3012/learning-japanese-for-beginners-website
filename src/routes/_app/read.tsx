import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChoiceKana, ChoiceRomaji, ChoiceRow, choiceState } from "@/components/ui/choice-row";
import { SpeakButton } from "@/components/speak-button";
import { READINGS } from "@/data/readings";
import { useSettings } from "@/lib/akari/settings";
import { useProgress } from "@/lib/akari/progress";

export const Route = createFileRoute("/_app/read")({ component: Page });

function Page() {
  const [sel, setSel] = useState(READINGS[0]!.id);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showKana, setShowKana] = useState(false);
  const [showVi, setShowVi] = useState(false);
  const item = READINGS.find((r) => r.id === sel)!;
  const showRomaji = useSettings((s) => s.showRomaji);
  const log = useProgress((s) => s.logStudy);

  return (
    <div>
      <PageHeader
        kicker="読"
        title="Luyện đọc"
        description="Đọc đoạn trước, đoán nghĩa, rồi mới mở bản dịch. Bật romaji trong Cài đặt để hiện phiên âm trên đáp án."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {READINGS.map((r) => (
          <Button
            key={r.id}
            variant={sel === r.id ? "default" : "secondary"}
            onClick={() => {
              setSel(r.id);
              setAnswers({});
              setShowKana(false);
              setShowVi(false);
            }}
          >
            {r.level} · {r.title}
          </Button>
        ))}
      </div>
      <Card>
        <CardContent>
          <div className="flex items-start justify-between gap-3">
            <p className="font-jp text-xl leading-relaxed text-fg">{item.jp}</p>
            <SpeakButton text={item.jp} kana={item.kana} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" variant={showKana ? "default" : "secondary"} onClick={() => setShowKana((v) => !v)}>
              {showKana ? "Ẩn furigana" : "Hiện hiragana"}
            </Button>
            <Button size="sm" variant={showVi ? "default" : "secondary"} onClick={() => setShowVi((v) => !v)}>
              {showVi ? "Ẩn nghĩa" : "Hiện nghĩa"}
            </Button>
          </div>
          {showKana ? (
            <div className="mt-3 rounded-[10px] border border-border bg-choice p-3 text-sm">
              <p className="font-jp text-fg">{item.kana}</p>
              {showRomaji ? <p className="mt-1 text-muted">{item.romaji}</p> : null}
            </div>
          ) : (
            <p className="mt-3 text-xs text-muted">Đọc không nhìn phiên âm trước — bấm hiện hiragana khi bí.</p>
          )}
          {showVi ? <p className="mt-2 text-sm text-fg">{item.vi}</p> : null}
        </CardContent>
      </Card>
      <div className="mt-4 space-y-4">
        {item.questions.map((q, qi) => {
          const picked = answers[qi];
          const revealed = picked !== undefined;
          return (
            <Card key={q.q}>
              <CardContent>
                <p className="font-medium text-fg">{q.q}</p>
                <div className="mt-2 grid gap-2">
                  {q.options.map((o, oi) => (
                    <ChoiceRow
                      key={o.jp}
                      state={choiceState({
                        revealed,
                        isAnswer: oi === q.answer,
                        picked: picked === oi,
                      })}
                      disabled={revealed}
                      onClick={() => {
                        if (revealed) return;
                        setAnswers((a) => ({ ...a, [qi]: oi }));
                        void log(1, 0.5);
                      }}
                    >
                      <span className="flex flex-col items-start gap-0.5">
                        <ChoiceKana>{o.jp}</ChoiceKana>
                        {showRomaji && o.romaji ? <ChoiceRomaji>{o.romaji}</ChoiceRomaji> : null}
                      </span>
                    </ChoiceRow>
                  ))}
                </div>
                {revealed ? <p className="mt-2 text-sm text-muted">{q.explain}</p> : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
