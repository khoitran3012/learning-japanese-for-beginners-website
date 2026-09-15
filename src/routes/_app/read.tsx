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
  const item = READINGS.find((r) => r.id === sel)!;
  const showRomaji = useSettings((s) => s.showRomaji);
  const log = useProgress((s) => s.logStudy);

  return (
    <div>
      <PageHeader kicker="読" title="Luyện đọc" description="Đoạn ngắn tự viết, không lấy từ giáo trình thương mại." />
      <div className="mb-4 flex flex-wrap gap-2">
        {READINGS.map((r) => (
          <Button key={r.id} variant={sel === r.id ? "default" : "secondary"} onClick={() => { setSel(r.id); setAnswers({}); }}>
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
          {showRomaji ? <p className="mt-3 text-sm text-accent">{item.romaji}</p> : null}
          <p className="mt-2 text-sm text-muted">{item.kana}</p>
          <p className="mt-2 text-sm">{item.vi}</p>
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
