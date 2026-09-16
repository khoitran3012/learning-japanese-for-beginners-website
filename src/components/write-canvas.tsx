import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, RotateCcw } from "lucide-react";

interface Point {
  x: number;
  y: number;
}

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
    };
  }

  function redraw() {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { ink, pen } = colors();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "280px 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = ink;
    ctx.fillText(character, canvas.width / 2, canvas.height / 2 + 20);
    ctx.globalAlpha = 1;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = pen;
    ctx.lineWidth = 14;
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
        className="w-full touch-none rounded-lg border border-border bg-bg-elevated"
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
