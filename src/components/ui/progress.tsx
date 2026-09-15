import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  label,
}: {
  value: number;
  className?: string;
  label?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <div className="mb-1.5 flex items-center justify-between text-xs text-muted">
          <span>{label}</span>
          <span className="tabular-nums">{Math.round(v)}%</span>
        </div>
      ) : null}
      <div className="h-2 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]"
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}
