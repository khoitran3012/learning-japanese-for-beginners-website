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
import { useSettings } from "@/lib/akari/settings";
import { syncQuizToLeaderboard } from "@/lib/akari/sync-score";
import { useCurrentUser } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/_app/listen")({ component: Page });

function Page() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const log = useProgress((s) => s.logStudy);
  const streak = useProgress((s) => s.streak);
  const showRomaji = useSettings((s) => s.showRomaji);
  const user = useCurrentUser();
  const item = LISTENING[i];

  if (!item) {
    return (
      <div>
        <PageHeader title="Luyện nghe" />
        <p>
          Hoàn thành {score}/{LISTENING.length}.
        </p>
        <Button className="mt-4" onClick={() => { setI(0); setScore(0); setPicked(null); }}>
          Làm lại
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        kicker="聴"
        title="Luyện nghe"
        description="Nghe trước, chọn đáp án. Romaji / hiragana hiện sau khi trả lời — để tai luyện thật."
      />
      <Card className="mx-auto max-w-lg">
        <CardContent className="space-y-4">
          <p className="text-sm text-muted">
            {item.title} · {item.level} · {i + 1}/{LISTENING.length}
          </p>
          <SpeakButton text={item.promptJp} label="Nghe câu" />
          {picked !== null ? (
            <div className="rounded-[10px] bg-bg-elevated p-3 text-sm">
              <p className="font-jp text-lg">{item.promptJp}</p>
              {showRomaji ? <p className="text-accent">{item.promptRomaji}</p> : null}
              <p className="text-muted">{item.promptVi}</p>
            </div>
          ) : (
            <p className="text-sm text-subtle">Bấm nghe, rồi chọn câu trả lời phù hợp. Bản dịch hiện sau.</p>
          )}
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
                  {show ? <span className="ml-2 text-muted">{o.vi}</span> : null}
                </Button>
              );
            })}
          </div>
          {picked !== null ? (
            <Button
              onClick={async () => {
                const nextScore = score;
                if (i + 1 >= LISTENING.length) {
                  await addQuizResult({
                    id: uid("quiz"),
                    at: Date.now(),
                    kind: "listen",
                    score: nextScore,
                    total: LISTENING.length,
                    durationMs: 0,
                  });
                  await log(LISTENING.length, 4);
                  await syncQuizToLeaderboard({
                    score: nextScore,
                    total: LISTENING.length,
                    minutes: 4,
                    streak,
                    displayName: user?.displayName,
                  });
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
