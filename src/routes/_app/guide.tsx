import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Compass, KeyRound, LifeBuoy, Route as RouteIcon } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicLink } from "@/components/dynamic-link";
import { DAILY_ROUTINE, GRADE_GUIDE, SCREEN_GUIDE, START_PLAN, TROUBLES } from "@/lib/akari/guide";

export const Route = createFileRoute("/_app/guide")({ component: Page });

function Page() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <PageHeader
        kicker="道"
        title="Cách học"
        description="Hướng dẫn ngắn để học tiếng Nhật hiệu quả: mỗi ngày làm gì, 4 nút chấm điểm nghĩa là gì, và xử lý thế nào khi bí."
      />

      <Card>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-[10px] bg-primary/12 text-primary">
              <Compass className="size-4" />
            </span>
            <h2 className="font-medium">Một ngày học mẫu — 15 phút</h2>
          </div>
          <ul className="space-y-2">
            {DAILY_ROUTINE.map((step, idx) => (
              <li
                key={`${step.label}-${idx}`}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-[12px] border border-border bg-bg-elevated px-4 py-3"
              >
                <span className="text-sm font-semibold text-accent tabular-nums">{step.label}</span>
                <span className="flex-1 text-sm leading-relaxed text-muted">{step.body}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-subtle">
            Thứ tự này cố ý để phần ôn lại đứng trước: ôn thẻ đến hạn giữ được ký ức, học mới mới thêm
            được kiến thức.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-[10px] bg-primary/12 text-primary">
              <RouteIcon className="size-4" />
            </span>
            <h2 className="font-medium">Lộ trình 7 ngày đầu</h2>
          </div>
          <ol className="space-y-2">
            {START_PLAN.map((step, idx) => (
              <li
                key={step.title}
                className="rounded-[12px] border border-border bg-bg-elevated p-3.5 sm:p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="muted">{step.when}</Badge>
                  <p className="font-medium leading-snug">{step.title}</p>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
                <Button asChild size="sm" variant="secondary" className="mt-2.5">
                  <DynamicLink to={step.action.to}>
                    {step.action.label}
                    <ArrowRight />
                  </DynamicLink>
                </Button>
                <span className="sr-only">Bước {idx + 1}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-[10px] bg-primary/12 text-primary">
              <KeyRound className="size-4" />
            </span>
            <div>
              <h2 className="font-medium">4 nút chấm điểm trên thẻ</h2>
              <p className="text-xs text-subtle">Phím 1–4 để chấm nhanh, không cần rời bàn phím.</p>
            </div>
          </div>
          <ul className="space-y-2">
            {GRADE_GUIDE.map((row) => (
              <li key={row.label} className="rounded-[12px] border border-border bg-bg-elevated p-3.5">
                <p className="flex items-center gap-2 font-medium">
                  {row.label}
                  <span className="rounded border border-border px-1.5 py-0.5 text-[11px] font-mono text-subtle">
                    {row.key}
                  </span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{row.effect}</p>
                <p className="mt-1 text-xs leading-relaxed text-subtle">Khi nào bấm: {row.when}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3">
          <h2 className="font-medium">Mỗi màn hình dùng để làm gì</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {SCREEN_GUIDE.map((s) => (
              <li key={s.to} className="rounded-[12px] border border-border bg-bg-elevated p-3.5">
                <DynamicLink
                  to={s.to}
                  className="flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
                >
                  {s.title}
                  <ArrowRight className="size-3.5" />
                </DynamicLink>
                <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-[10px] bg-primary/12 text-primary">
              <LifeBuoy className="size-4" />
            </span>
            <h2 className="font-medium">Gặp khó khăn gì thì làm gì</h2>
          </div>
          <ul className="space-y-2">
            {TROUBLES.map((t) => (
              <li key={t.problem} className="rounded-[12px] border border-border bg-bg-elevated p-3.5">
                <p className="font-medium leading-snug">{t.problem}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{t.fix}</p>
                <DynamicLink
                  to={t.to}
                  className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-accent underline-offset-4 hover:underline"
                >
                  Mở màn hình liên quan
                  <ArrowRight className="size-3" />
                </DynamicLink>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
