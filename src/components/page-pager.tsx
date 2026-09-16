import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PagePager({
  page,
  pageCount,
  onPage,
  className,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
  className?: string;
}) {
  if (pageCount <= 1) return null;
  const windowed = pageWindow(page, pageCount);
  return (
    <nav className={cn("flex flex-wrap items-center justify-center gap-1", className)} aria-label="Phân trang">
      <Button
        type="button"
        size="sm"
        variant="secondary"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
        aria-label="Trang trước"
      >
        <ChevronLeft />
      </Button>
      {windowed.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-1 text-sm text-subtle">
            …
          </span>
        ) : (
          <Button
            key={p}
            type="button"
            size="sm"
            variant={p === page ? "default" : "secondary"}
            className="min-w-10 tabular-nums"
            onClick={() => onPage(p)}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </Button>
        ),
      )}
      <Button
        type="button"
        size="sm"
        variant="secondary"
        disabled={page >= pageCount}
        onClick={() => onPage(page + 1)}
        aria-label="Trang sau"
      >
        <ChevronRight />
      </Button>
    </nav>
  );
}

function pageWindow(page: number, pageCount: number): Array<number | "…"> {
  if (pageCount <= 9) return Array.from({ length: pageCount }, (_, i) => i + 1);
  const set = new Set<number>([1, 2, pageCount - 1, pageCount, page - 1, page, page + 1]);
  const nums = [...set].filter((n) => n >= 1 && n <= pageCount).sort((a, b) => a - b);
  const out: Array<number | "…"> = [];
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i]!;
    if (i > 0 && n - nums[i - 1]! > 1) out.push("…");
    out.push(n);
  }
  return out;
}
