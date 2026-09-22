import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check, Lock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DynamicLink } from "@/components/dynamic-link";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import { primaryLessonHref } from "@/lib/akari/lesson-links";
import { journeyGroups, stageHint, stageKicker, stageLabel } from "@/lib/akari/path-stages";
import { cn } from "@/lib/utils";
import type { Lesson } from "@/lib/akari/types";

export const Route = createFileRoute("/_app/path/")({ component: Page });

function focusBadge(focus: Lesson["focus"]) {
  if (!focus) return null;
  return <Badge variant="muted">{focus}</Badge>;
}

function Page() {
  const completed = useProgress((s) => s.completedLessonIds);
  const freeMode = useSettings((s) => s.freeMode);
  const set = useSettings((s) => s.set);
  const { sorted, groups } = journeyGroups();

  return (
    <div>
      <PageHeader
        kicker="道"
        title="Lộ trình học"
        description="Cách lớp Việt hay đi: kana → nói & từ vựng → kanji kèm Hán-Việt (N5→N1) → ngữ pháp → đọc nghe. Bài tự hoàn thành khi bạn đã học chữ/từ trong bài."
        actions={
          <div className="flex items-center gap-2">
            <Label htmlFor="free">Chế độ tự do</Label>
            <Switch id="free" checked={freeMode} onCheckedChange={(v) => set({ freeMode: v })} />
          </div>
        }
      />

      <ol className="mb-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {[
          "1. Hiragana + katakana — đọc được mới nghe nói được",
          "2. Nói & từ N5 — chào, số, nhà, trường, ăn, đi",
          "3. Kanji + Hán-Việt — nghĩa trước, on/kun sau",
          "4. Ngữ pháp, đọc, nghe N5 — nhét từ vào câu",
          "5. N4 cùng ba trụ: từ, nói, kanji",
          "6. N3 → N1: kanji theo bài, dễ trước khó sau",
        ].map((line) => (
          <li key={line} className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-muted">
            {line}
          </li>
        ))}
      </ol>

      <div className="space-y-8">
        {groups.map((group) => {
          const items = group.items;
          const doneCount = items.filter((l) => completed.has(l.id)).length;
          const hint = stageHint(group.stage);
          return (
            <section key={`${group.stage}-${items[0]?.id}`}>
              <header className="mb-3 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
                    {stageKicker(group.stage)}
                  </p>
                  <h2 className="font-display text-xl font-semibold">{stageLabel(group.stage)}</h2>
                  {hint ? <p className="mt-1 max-w-xl text-sm text-muted">{hint}</p> : null}
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
                            <div className="flex flex-wrap items-center gap-1.5">
                              <p className="text-xs text-subtle">{l.level === "0" ? "Nhập môn" : l.level}</p>
                              {focusBadge(l.focus)}
                            </div>
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
