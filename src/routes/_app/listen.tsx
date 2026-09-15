import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SpeakButton } from "@/components/speak-button";
import { LISTENING } from "@/data/listening";
import { useProgress } from "@/lib/akari/progress";
import { addQuizResult } from "@/lib/akari/storage";
import { uid } from "@/lib/utils";

export const Route = createFileRoute("/_app/listen")({ component: Page });

function Page() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const log = useProgress((s) => s.logStudy);
  const item = LISTENING[i];

  if (!item) {
    return (
      <div>
        <PageHeader title="Luyện nghe" />
        <p>Hoàn thành {score}/{LISTENING.length}.</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader kicker="聴" title="Luyện nghe" description="Nghe giọng Nhật trên thiết bị, rồi chọn đáp án. Không cần mạng nếu trình duyệt đã có giọng ja-JP." />
      <Card className="mx-auto max-w-lg">
        <CardContent className="space-y-4">
          <p className="text-sm text-muted">{item.title} · {item.level}</p>
          <SpeakButton text={item.promptJp} label="Nghe câu" />
          <p className="text-sm">{item.promptVi}</p>
          <div className="grid gap-2">
            {item.options.map((o, idx) => {
              const show = picked !== null;
              const ok = idx === item.answerIndex;
              return (
                <Button
                  key={o.jp}
                  variant={show ? (ok ? "success" : picked === idx ? "danger" : "secondary") : "secondary"}
                  className="h-auto justify-start py-3"
                  disabled={picked !== null}
                  onClick={() => {
                    setPicked(idx);
                    if (idx === item.answerIndex) setScore((s) => s + 1);
                  }}
                >
                  <span className="font-jp">{o.jp}</span>
                  <span className="ml-2 text-muted">{o.vi}</span>
                </Button>
              );
            })}
          </div>
          {picked !== null ? (
            <Button
              onClick={async () => {
                if (i + 1 >= LISTENING.length) {
                  await addQuizResult({
                    id: uid("quiz"),
                    at: Date.now(),
                    kind: "listen",
                    score: score + (picked === item.answerIndex ? 0 : 0),
                    total: LISTENING.length,
                    durationMs: 0,
                  });
                  await log(LISTENING.length, 4);
                }
                setPicked(null);
                setI((x) => x + 1);
              }}
            >
              Tiếp
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
