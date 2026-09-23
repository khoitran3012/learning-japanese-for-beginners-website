import { Check, RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/lib/akari/progress";
import type { SrsItem } from "@/lib/akari/types";
import { cn } from "@/lib/utils";

export function RememberActions({
  id,
  itemType,
  className,
}: {
  id: string;
  itemType: SrsItem["itemType"];
  className?: string;
}) {
  const item = useProgress((s) => s.srs[id]);
  const remember = useProgress((s) => s.remember);
  const forgot = useProgress((s) => s.forgot);
  const [busy, setBusy] = useState<"remember" | "forgot" | null>(null);
  const known = (item?.correct ?? 0) > 0;

  async function go(kind: "remember" | "forgot") {
    if (busy) return;
    setBusy(kind);
    try {
      if (kind === "remember") {
        await remember(id, itemType);
        toast.success("Đã nhớ — sẽ ôn lại sau");
      } else {
        await forgot(id, itemType);
        toast("Đánh dấu cần ôn");
      }
    } catch {
      toast.error("Không lưu được, thử lại");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {item ? (
        <p className="text-xs tabular-nums text-muted">
          {known ? "Đã nhớ" : "Đang học"} · đúng {item.correct} · sai {item.incorrect}
        </p>
      ) : (
        <p className="text-xs text-muted">Chưa đánh dấu chữ này</p>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          type="button"
          variant="secondary"
          disabled={busy !== null}
          onClick={() => void go("forgot")}
        >
          <RotateCcw /> Cần ôn
        </Button>
        <Button
          type="button"
          variant={known ? "success" : "default"}
          disabled={busy !== null}
          onClick={() => void go("remember")}
        >
          <Check /> {known ? "Nhớ rồi" : "Đã nhớ"}
        </Button>
      </div>
    </div>
  );
}
