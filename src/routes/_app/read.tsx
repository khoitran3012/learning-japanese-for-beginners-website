import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
        description="Đọc đoạn trước, đoán nghĩa, rồi mới mở bản dịch. Đoạn tự viết, không lấy từ giáo trình thương mại."
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
            <p className="font-jp text-xl leading-relaxed">{item.jp}</p>
            <SpeakButton text={item.jp} />
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
            <div className="mt-3 rounded-[10px] bg-bg-elevated p-3 text-sm">
              <p className="font-jp">{item.kana}</p>
              {showRomaji ? <p className="mt-1 text-accent">{item.romaji}</p> : null}
            </div>
          ) : (
            <p className="mt-3 text-xs text-subtle">Đọc không nhìn phiên âm trước — bấm hiện hiragana khi bí.</p>
          )}
          {showVi ? <p className="mt-2 text-sm">{item.vi}</p> : null}
        </CardContent>
      </Card>
      <div className="mt-4 space-y-4">
        {item.questions.map((q, qi) => (
          <Card key={q.q}>
            <CardContent>
              <p className="font-medium">{q.q}</p>
              <div className="mt-2 grid gap-2">
                {q.options.map((o, oi) => {
                  const picked = answers[qi];
                  const show = picked !== undefined;
                  return (
                    <Button
                      key={o}
                      variant={show ? (oi === q.answer ? "success" : picked === oi ? "danger" : "secondary") : "secondary"}
                      className="justify-start"
                      onClick={() => {
                        if (picked !== undefined) return;
                        setAnswers((a) => ({ ...a, [qi]: oi }));
                        void log(1, 0.5);
                      }}
                    >
                      {o}
                    </Button>
                  );
                })}
              </div>
              {answers[qi] !== undefined ? <p className="mt-2 text-sm text-muted">{q.explain}</p> : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
