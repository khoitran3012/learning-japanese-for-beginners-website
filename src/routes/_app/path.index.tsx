import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LESSONS } from "@/data/lessons";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
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
        description="Từ số 0: làm quen → hiragana → katakana → từ vựng → ngữ pháp → kanji → đọc, nghe, quiz N5 rồi N4."
        actions={
          <div className="flex items-center gap-2">
            <Label htmlFor="free">Chế độ tự do</Label>
            <Switch id="free" checked={freeMode} onCheckedChange={(v) => set({ freeMode: v })} />
          </div>
        }
      />
      <ol className="space-y-2">
        {sorted.map((l, i) => {
          const prevDone = i === 0 || completed.has(sorted[i - 1]!.id);
          const locked = !freeMode && !prevDone && !completed.has(l.id);
          const done = completed.has(l.id);
          const inner = (
            <div
              className={cn(
                "flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3",
                locked && "opacity-50",
                done && "border-success/40",
              )}
            >
              <span className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-bg-elevated text-xs tabular-nums">
                {done ? <Check className="size-4 text-success" /> : locked ? <Lock className="size-3.5" /> : l.order}
              </span>
              <div>
                <p className="text-xs text-subtle">{l.stage}</p>
                <h2 className="font-medium">{l.title}</h2>
                <p className="text-sm text-muted">{l.summary}</p>
              </div>
            </div>
          );
          return (
            <li key={l.id}>
              {locked ? inner : <Link to="/path/$id" params={{ id: l.id }}>{inner}</Link>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
