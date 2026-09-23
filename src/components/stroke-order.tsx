import { Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { loadStrokeSet, type StrokeSet } from "@/lib/akari/strokes";
import { cn } from "@/lib/utils";

export function StrokeOrder({
  character,
  strokeCount,
  className,
}: {
  character: string;
  strokeCount?: number;
  className?: string;
}) {
  const [pack, setPack] = useState<StrokeSet | null>(null);
  const [loading, setLoading] = useState(true);
  const glyphs = pack?.glyphs ?? [];
  const [shown, setShown] = useState(0);
  const [playing, setPlaying] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const viewBox = pack?.viewBox ?? "0 0 109 109";
  const box = viewBox.split(/\s+/).map(Number);
  const vw = box[2] || 109;
  const vh = box[3] || 109;
  const strokeWidth = pack ? 4.6 * (pack.unit / 109) : 4.6;

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    setPack(null);
    setShown(0);
    setPlaying(true);
    void loadStrokeSet(character).then((next) => {
      if (cancel) return;
      setPack(next);
      setLoading(false);
    });
    return () => {
      cancel = true;
    };
  }, [character]);

  useEffect(() => {
    if (!playing || glyphs.length === 0) return;
    if (shown >= glyphs.length) {
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(() => setShown((n) => n + 1), shown === 0 ? 250 : 720);
    return () => window.clearTimeout(t);
  }, [playing, shown, glyphs.length]);

  if (loading) {
    return (
      <div className={cn("rounded-xl border border-border bg-bg-elevated p-4 text-sm text-muted", className)}>
        Đang tải thứ tự nét cho {character}…
      </div>
    );
  }

  if (!glyphs.length) {
    return (
      <div className={cn("rounded-xl border border-border bg-bg-elevated p-4 text-sm text-muted", className)}>
        Chưa có dữ liệu nét cho {character}
        {strokeCount ? ` · ${strokeCount} nét theo quy cách giáo khoa` : ""}. Hãy viết thử bên dưới theo thứ tự
        nét chuẩn (trái → phải, trên → dưới).
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between text-sm text-muted">
        <span>Quy cách nét giáo khoa · {glyphs.length} nét đều (không thư pháp)</span>
        <span className="tabular-nums">
          {Math.min(shown, glyphs.length)}/{glyphs.length}
        </span>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
        <svg
          ref={svgRef}
          viewBox={viewBox}
          className="aspect-square w-full text-fg"
          role="img"
          aria-label={`Thứ tự nét chữ ${character}`}
        >
          <rect x="0" y="0" width={vw} height={vh} className="fill-[var(--color-bg-elevated)]" />
          <line x1={vw / 2} y1="0" x2={vw / 2} y2={vh} stroke="currentColor" strokeOpacity="0.12" />
          <line x1="0" y1={vh / 2} x2={vw} y2={vh / 2} stroke="currentColor" strokeOpacity="0.12" />
          {glyphs.map((g, i) => (
            <path
              key={`${character}-${i}`}
              d={g.d}
              transform={g.transform}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth / g.scale}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              className={cn(i < shown ? "opacity-100" : "opacity-0", i === shown - 1 && "stroke-order-draw")}
              style={{ color: i === shown - 1 ? "var(--color-seal)" : "var(--color-ink)" }}
            />
          ))}
        </svg>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => {
            if (shown >= glyphs.length) {
              setShown(0);
              setPlaying(true);
            } else {
              setPlaying((p) => !p);
            }
          }}
        >
          {playing ? <Pause /> : <Play />}
          {playing ? "Tạm dừng" : shown >= glyphs.length ? "Phát lại" : "Phát"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => {
            setPlaying(false);
            setShown((n) => Math.min(glyphs.length, n + 1));
          }}
        >
          <StepForward /> Nét tiếp
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => {
            setShown(0);
            setPlaying(false);
          }}
        >
          <RotateCcw /> Về đầu
        </Button>
      </div>
    </div>
  );
}
