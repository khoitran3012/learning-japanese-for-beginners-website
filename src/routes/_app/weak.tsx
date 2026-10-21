import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { DynamicLink } from "@/components/dynamic-link";
import { PageHeader } from "@/components/page-header";
import { QuizCard } from "@/components/quiz-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProgress } from "@/lib/akari/progress";
import type { QuizQuestion } from "@/lib/akari/quiz-engine";
import { srsOf } from "@/lib/akari/quiz-srs";
import { buildWeakQuiz, drillable, weakItems, WEAK_QUIZ_SIZE } from "@/lib/akari/weak";
import { resolveStudyItem } from "@/lib/dictionary/catalog";

export const Route = createFileRoute("/_app/weak")({ component: Page });

type Phase = "idle" | "playing" | "done";

function Page() {
  const ready = useProgress((s) => s.ready);
  const srs = useProgress((s) => s.srs);
  const mark = useProgress((s) => s.mark);

  const ranked = useMemo(() => weakItems(srs, 12), [srs]);
  const drillableItems = useMemo(() => ranked.filter((w) => drillable(w.item.itemType)), [ranked]);

  const [phase, setPhase] = useState<Phase>("idle");
  const [queue, setQueue] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState<QuizQuestion[]>([]);

  function start() {
    const qs = buildWeakQuiz(drillableItems, WEAK_QUIZ_SIZE);
    if (!qs.length) return;
    setQueue(qs);
    setIndex(0);
    setScore(0);
    setWrong([]);
    setPhase("playing");
  }

  function finish() {
    // Không gọi logStudy ở đây: `mark()` đã cộng từng câu vào thống kê rồi.
    setPhase("done");
  }

  const q = queue[index];
  const pct = queue.length ? Math.round((score / queue.length) * 100) : 0;

  return (
    <div>
      <PageHeader
        kicker="弱点"
        title="Luyện chỗ yếu"
        description="Chỉ hỏi lại những từ và chữ bạn hay trả lời sai. Đáp án đúng lấy trong nhóm yếu, đáp án nhiễu vẫn lấy cả kho nên không đoán được."
      />

      {!ready ? (
        <p className="text-sm text-muted">Đang tải tiến độ…</p>
      ) : phase === "idle" ? (
        drillableItems.length === 0 ? (
          <EmptyState
            title="Chưa có chỗ yếu nào"
            description="Mục này chỉ hiện sau khi bạn trả lời sai ít nhất một câu. Làm vài câu trắc nghiệm hoặc lật thẻ từ, rồi quay lại."
            action={
              <Button asChild>
                <Link to="/quiz">Làm trắc nghiệm</Link>
              </Button>
            }
          />
        ) : (
          <div className="space-y-4">
            <Card>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted">Đang có</p>
                    <p className="text-2xl font-semibold tabular-nums">{drillableItems.length} mục hay sai</p>
                  </div>
                  <Button onClick={start}>Bắt đầu buổi luyện</Button>
                </div>
                <ul className="divide-y divide-border rounded-xl border border-border">
                  {drillableItems.slice(0, 6).map(({ item, attempts, missRate }) => {
                    const r = resolveStudyItem(item.id);
                    return (
                      <li key={item.id}>
                        <DynamicLink
                          to={r?.to ?? "/stats"}
                          className="flex min-h-12 min-w-0 items-center justify-between gap-3 px-4 py-3 hover:bg-bg-elevated"
                        >
                          <span className="min-w-0">
                            <span className="font-jp text-lg">{r?.title ?? item.id}</span>
                            <span className="ml-2 text-sm text-muted">{r?.sub ?? r?.type ?? ""}</span>
                          </span>
                          <span className="shrink-0 text-xs tabular-nums text-seal">
                            sai {item.incorrect}/{attempts} · {Math.round(missRate * 100)}%
                          </span>
                        </DynamicLink>
                      </li>
                    );
                  })}
                </ul>
                <p className="text-xs leading-relaxed text-subtle">
                  Buổi luyện dài tối đa {WEAK_QUIZ_SIZE} câu và tự cập nhật lịch ôn: câu đúng được giãn ra, câu sai quay lại sớm.
                </p>
              </CardContent>
            </Card>
          </div>
        )
      ) : phase === "playing" && q ? (
        <div className="space-y-3">
          <QuizCard
            key={q.id}
            q={q}
            index={index}
            total={queue.length}
            score={score}
            fillKind={Boolean(q.typedAnswers?.length)}
            onAnswer={(ok) => {
              if (ok) setScore((s) => s + 1);
              else setWrong((w) => [...w, q]);
              const srsItem = srsOf(q);
              void mark(srsItem.id, srsItem.type, ok ? "good" : "forgot");
            }}
            onNext={() => {
              if (index + 1 >= queue.length) finish();
              else setIndex((i) => i + 1);
            }}
            nextLabel={index + 1 >= queue.length ? "Xem kết quả" : "Câu tiếp"}
          />
          <div className="mx-auto flex max-w-lg justify-center">
            <Button variant="ghost" onClick={finish}>
              Dừng buổi luyện
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="mx-auto max-w-lg">
            <CardContent className="space-y-4 py-8 text-center">
              <p className="text-sm text-muted">Kết quả buổi luyện</p>
              <p className="text-4xl font-semibold tabular-nums">
                {score}/{queue.length}
              </p>
              <p className="text-sm text-muted">{pct}% đúng</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button onClick={start}>Luyện lại</Button>
                <Button asChild variant="secondary">
                  <Link to="/stats">Xem thống kê</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          {wrong.length ? (
            <Card className="mx-auto max-w-lg">
              <CardContent className="space-y-2">
                <h2 className="font-medium">Xem lại {wrong.length} câu sai</h2>
                <ul className="space-y-1.5 text-sm leading-relaxed text-muted">
                  {wrong.map((w, i) => (
                    <li key={`${w.id}-${i}`}>{w.explain}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : (
            <p className="text-center text-sm text-forest">Không sai câu nào — chỗ yếu đang được lấp dần.</p>
          )}
        </div>
      )}
    </div>
  );
}
