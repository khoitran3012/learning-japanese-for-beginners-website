import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Compass,
  Headphones,
  Lightbulb,
  PenLine,
  Sparkles,
  Target,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DynamicLink } from "@/components/dynamic-link";
import { STUDY_TIPS, type CoachTip } from "@/lib/akari/coach";
import { cn } from "@/lib/utils";

const TONE_ICON = {
  now: Target,
  goal: CheckCircle2,
  plan: Compass,
} as const;

const TONE_CHIP = {
  now: "bg-seal/12 text-seal",
  goal: "bg-mist text-forest",
  plan: "bg-primary/12 text-primary",
} as const;

const TONE_LABEL = {
  now: "Nên làm ngay",
  goal: "Hôm nay",
  plan: "Gợi ý lộ trình",
} as const;

const STUDY_ICON: Record<string, typeof Lightbulb> = {
  daily: CalendarClock,
  dictation: PenLine,
  slow: Headphones,
  hanviet: BookOpen,
  context: Sparkles,
  wrong: Target,
};

/**
 * Thẻ "Gợi ý học tập": phần trên là gợi ý động theo tiến độ hiện tại, phần dưới
 * là mẹo học dùng được cho mọi người.
 */
export function CoachCard({ tips }: { tips: CoachTip[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? STUDY_TIPS : STUDY_TIPS.slice(0, 3);

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-[10px] bg-primary/12 text-primary">
            <Lightbulb className="size-4" />
          </span>
          <div>
            <h2 className="font-medium">Gợi ý học tập</h2>
            <p className="text-xs text-subtle">Chọn đúng một việc nhỏ, làm xong rồi quay lại.</p>
          </div>
        </div>

        <ul className="space-y-2.5">
          {tips.map((tip) => {
            const Icon = TONE_ICON[tip.tone];
            return (
              <li
                key={tip.id}
                className="rounded-[12px] border border-border bg-bg-elevated p-3.5 sm:p-4"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                      TONE_CHIP[tip.tone],
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">
                      {TONE_LABEL[tip.tone]}
                    </p>
                    <p className="mt-0.5 font-medium leading-snug">{tip.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{tip.body}</p>
                    {tip.action ? (
                      <Button asChild size="sm" variant="secondary" className="mt-2.5">
                        <DynamicLink to={tip.action.to}>
                          {tip.action.label}
                          <ArrowRight />
                        </DynamicLink>
                      </Button>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-border pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-medium">Mẹo để học dễ hơn</h3>
            <DynamicLink
              to="/guide"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent underline-offset-4 hover:underline"
            >
              Hướng dẫn đầy đủ
              <ArrowRight className="size-3" />
            </DynamicLink>
          </div>
          <ul className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
            {visible.map((tip) => {
              const Icon = STUDY_ICON[tip.id] ?? Sparkles;
              return (
                <li key={tip.id} className="rounded-[12px] border border-border bg-surface p-3">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <Icon className="size-4 shrink-0 text-accent" />
                    {tip.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{tip.body}</p>
                  <DynamicLink
                    to={tip.to}
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-accent underline-offset-4 hover:underline"
                  >
                    {tip.action}
                    <ArrowRight className="size-3" />
                  </DynamicLink>
                </li>
              );
            })}
          </ul>
          {STUDY_TIPS.length > 3 ? (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="mt-3 text-xs font-medium text-accent underline-offset-4 hover:underline"
            >
              {showAll ? "Bớt mẹo lại" : `Xem thêm ${STUDY_TIPS.length - 3} mẹo`}
            </button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
