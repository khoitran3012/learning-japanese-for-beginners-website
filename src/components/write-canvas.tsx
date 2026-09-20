import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, RotateCcw } from "lucide-react";

interface Point {
  x: number;
  y: number;
}

const FONT = "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif";

export function WriteCanvas({ character, strokeCount }: { character: string; strokeCount?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const strokes = useRef<Point[][]>([]);
  const [count, setCount] = useState(0);

  function pos(e: PointerEvent, canvas: HTMLCanvasElement): Point {
    const r = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * canvas.width,
      y: ((e.clientY - r.top) / r.height) * canvas.height,
    };
  }

  function colors() {
    const root = getComputedStyle(document.documentElement);
    return {
      ink: root.getPropertyValue("--color-ink").trim() || "#1c1917",
      pen: root.getPropertyValue("--color-primary").trim() || "#2f4158",
      grid: root.getPropertyValue("--color-border").trim() || "#ddd4c8",
    };
  }

  function fitFont(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxSize: number) {
    let size = maxSize;
    ctx.font = `${size}px ${FONT}`;
    while (size > 56 && ctx.measureText(text).width > maxWidth) {
      size -= 6;
      ctx.font = `${size}px ${FONT}`;
    }
    return size;
  }

  function redraw() {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { ink, pen, grid } = colors();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = ink;
    const units = Math.max(1, [...character].length);
    const maxSize = units <= 1 ? 280 : units === 2 ? 168 : Math.max(64, 360 / units);
    fitFont(ctx, character, canvas.width * 0.86, maxSize);
    ctx.fillText(character, canvas.width / 2, canvas.height / 2);
    ctx.globalAlpha = 1;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = pen;
    ctx.lineWidth = units >= 2 ? 11 : 14;
    for (const s of strokes.current) {
      if (!s.length) continue;
      ctx.beginPath();
      ctx.moveTo(s[0]!.x, s[0]!.y);
      for (const p of s.slice(1)) ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
  }

  useEffect(() => {
    strokes.current = [];
    setCount(0);
    redraw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const onDown = (e: PointerEvent) => {
      drawing.current = true;
      canvas.setPointerCapture(e.pointerId);
      strokes.current.push([pos(e, canvas)]);
    };
    const onMove = (e: PointerEvent) => {
      if (!drawing.current) return;
      const cur = strokes.current[strokes.current.length - 1];
      cur?.push(pos(e, canvas));
      redraw();
    };
    const onUp = () => {
      if (drawing.current) setCount(strokes.current.length);
      drawing.current = false;
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    redraw();
    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>Viết thử {strokeCount ? `· ${strokeCount} nét mẫu (kiểu giáo khoa)` : ""}</span>
        <span className="tabular-nums">{count} nét đã viết</span>
      </div>
      <canvas
        ref={ref}
        width={420}
        height={420}
        className="w-full touch-none rounded-lg border border-border bg-surface"
        style={{ aspectRatio: "1 / 1", touchAction: "none" }}
        aria-label={`Vùng viết chữ ${character}`}
      />
      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => {
            strokes.current = [];
            setCount(0);
            redraw();
          }}
        >
          <Eraser /> Xóa
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            strokes.current.pop();
            setCount(strokes.current.length);
            redraw();
          }}
        >
          <RotateCcw /> Hoàn tác
        </Button>
      </div>
    </div>
  );
}
