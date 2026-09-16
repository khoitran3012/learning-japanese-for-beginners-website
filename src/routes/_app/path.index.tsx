import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check, Lock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DynamicLink } from "@/components/dynamic-link";
import { LESSONS } from "@/data/lessons";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import { primaryLessonHref } from "@/lib/akari/lesson-links";
import { PATH_STAGES } from "@/lib/akari/path-stages";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/path/")({ component: Page });

function Page() {
  const completed = useProgress((s) => s.completedLessonIds);
  const freeMode = useSettings((s) => s.freeMode);
  const set = useSettings((s) => s.set);
  const sorted = [...LESSONS].sort((a, b) => a.order - b.order);

  return (
    <div>
      <PageHeader
        kicker="道"
        title="Lộ trình học"
        description="Từ số 0: làm quen → hiragana → katakana → từ vựng → ngữ pháp → kanji → đọc, nghe, quiz N5 rồi N4. Bấm Vào bài học để chuyển thẳng tới phần luyện."
        actions={
          <div className="flex items-center gap-2">
            <Label htmlFor="free">Chế độ tự do</Label>
            <Switch id="free" checked={freeMode} onCheckedChange={(v) => set({ freeMode: v })} />
          </div>
        }
      />
      <div className="space-y-8">
        {PATH_STAGES.map((stage) => {
          const items = sorted.filter((l) => l.stage === stage.id);
          if (items.length === 0) return null;
          const doneCount = items.filter((l) => completed.has(l.id)).length;
          return (
            <section key={stage.id}>
              <header className="mb-3 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
                    {stage.kicker}
                  </p>
                  <h2 className="font-display text-xl font-semibold">{stage.label}</h2>
                </div>
                <p className="text-sm tabular-nums text-muted">
                  {doneCount}/{items.length}
                </p>
              </header>
              <ol className="space-y-2">
                {items.map((l) => {
                  const idx = sorted.findIndex((x) => x.id === l.id);
                  const prevDone = idx === 0 || completed.has(sorted[idx - 1]!.id);
                  const locked = !freeMode && !prevDone && !completed.has(l.id);
                  const done = completed.has(l.id);
                  const practiceTo = primaryLessonHref(l);
                  return (
                    <li key={l.id}>
                      <div
                        className={cn(
                          "flex flex-col gap-3 rounded-xl border border-border bg-surface px-4 py-3 sm:flex-row sm:items-center",
                          locked && "opacity-55",
                          done && "border-success/40",
                        )}
                      >
                        <div className="flex min-w-0 flex-1 items-start gap-3">
                          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-xs tabular-nums">
                            {done ? (
                              <Check className="size-4 text-success" />
                            ) : locked ? (
                              <Lock className="size-3.5" />
                            ) : (
                              l.order
                            )}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs text-subtle">{l.level === "0" ? "Nhập môn" : l.level}</p>
                            <h3 className="font-medium">{l.title}</h3>
                            <p className="text-sm text-muted">{l.summary}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:shrink-0">
                          {locked ? (
                            <Button variant="secondary" disabled>
                              <Lock className="size-4" />
                              Chưa mở
                            </Button>
                          ) : (
                            <>
                              <Button asChild>
                                <DynamicLink to={practiceTo}>
                                  Vào bài học
                                  <ArrowRight />
                                </DynamicLink>
                              </Button>
                              <Button asChild variant="secondary">
                                <DynamicLink to={`/path/${l.id}`}>
                                  <BookOpen />
                                  Đọc bài
                                </DynamicLink>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}
