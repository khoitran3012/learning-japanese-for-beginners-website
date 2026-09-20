import { BookOpen, Flower2, Lock, Volume2, VolumeX, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { GARDEN_CONFIG } from "@/lib/garden/config";
import type { GardenSnapshot } from "@/lib/garden/types";
import { cn } from "@/lib/utils";
import { SPRITES } from "./sprites";

const CATS = [
  { id: "plants", label: "Cây & hoa" },
  { id: "animals", label: "Sinh vật" },
  { id: "decor", label: "Trang trí" },
  { id: "special", label: "Đặc biệt" },
] as const;

export function GardenHud({
  garden,
  soundOn,
  onSound,
  onDaily,
  onOpenCollection,
  placing,
  onCancelPlace,
}: {
  garden: GardenSnapshot;
  soundOn: boolean;
  onSound: () => void;
  onDaily: () => void;
  onOpenCollection: () => void;
  placing: string | null;
  onCancelPlace: () => void;
}) {
  const pct = garden.nextLevelXp
    ? Math.min(100, (garden.xp / garden.nextLevelXp) * 100)
    : 100;
  return (
    <div className="garden-hud">
      <div className="garden-chip">
        <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">Khu vườn cấp {garden.level}</p>
        <p className="font-display text-lg leading-tight">
          {garden.levelName} <span className="font-jp text-muted">{garden.levelNameJp}</span>
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-meadow" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
          <span>{garden.xp} Garden XP</span>
          <span>{garden.wordsLearned} từ</span>
          <span>{garden.streak} ngày</span>
          <span>{garden.unlocked.length} vật phẩm</span>
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={onOpenCollection} aria-label="Bộ sưu tập">
          <Flower2 /> Bộ sưu tập
        </Button>
        <Button variant="secondary" size="icon-sm" onClick={onSound} aria-label={soundOn ? "Tắt âm" : "Bật âm"}>
          {soundOn ? <Volume2 /> : <VolumeX />}
        </Button>
        {garden.canClaimDaily ? (
          <Button size="sm" onClick={onDaily}>
            Quà hôm nay
          </Button>
        ) : null}
      </div>
      {placing ? (
        <div className="garden-chip flex items-center justify-between gap-2">
          <p className="text-sm">Chạm vào vườn để đặt vật phẩm.</p>
          <Button size="icon-sm" variant="ghost" onClick={onCancelPlace} aria-label="Hủy đặt">
            <X />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export function CollectionSheet({
  open,
  onOpenChange,
  garden,
  onPlace,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  garden: GardenSnapshot;
  onPlace: (itemId: string) => void;
}) {
  const unlocked = new Set(garden.unlocked);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Bộ sưu tập khu vườn</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 px-2 pb-10">
          {CATS.map((cat) => (
            <section key={cat.id}>
              <h3 className="mb-2 text-xs uppercase tracking-[0.14em] text-subtle">{cat.label}</h3>
              <ul className="grid grid-cols-2 gap-2">
                {GARDEN_CONFIG.items
                  .filter((item) => item.category === cat.id)
                  .map((item) => {
                    const on = unlocked.has(item.id);
                    const Sprite = SPRITES[item.id];
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          disabled={!on}
                          onClick={() => {
                            onPlace(item.id);
                            onOpenChange(false);
                          }}
                          className={cn(
                            "flex w-full flex-col items-center rounded-[12px] border border-border bg-surface p-3 text-center",
                            !on && "opacity-50",
                          )}
                        >
                          <span className={cn("size-14", !on && "opacity-30 grayscale")}>
                            {Sprite ? Sprite({ title: item.name }) : null}
                          </span>
                          <span className="mt-1 flex items-center gap-1 text-sm">
                            {on ? item.name : "Chưa mở"}
                            {on ? null : <Lock className="size-3" />}
                          </span>
                          <span className="font-jp text-[11px] text-muted">{item.nameJp}</span>
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </section>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function UnlockModal({
  garden,
  onDone,
}: {
  garden: GardenSnapshot;
  onDone: (ids: string[]) => void;
}) {
  const [index, setIndex] = useState(0);
  const item = garden.newUnlocks[index];
  useEffect(() => {
    setIndex(0);
  }, [garden.newUnlocks.map((u) => u.id).join(",")]);
  if (!item) return null;
  const Sprite = SPRITES[item.id];
  const last = index >= garden.newUnlocks.length - 1;
  return (
    <div className="garden-modal" role="dialog" aria-labelledby="garden-unlock-title">
      <div className="garden-modal-card">
        <p className="text-[11px] uppercase tracking-[0.16em] text-subtle">Vật phẩm mới</p>
        <div className="garden-unlock-glow mx-auto my-3 size-24">{Sprite ? Sprite({ title: item.name }) : null}</div>
        <h2 id="garden-unlock-title" className="font-display text-2xl">
          {item.name}
        </h2>
        <p className="font-jp text-muted">{item.nameJp}</p>
        <p className="mt-2 text-sm text-muted">
          {garden.wordsLearned} từ đã học đã làm khu vườn lớn thêm một chút.
        </p>
        <Button
          className="mt-4 w-full"
          onClick={() => {
            if (last) onDone(garden.newUnlocks.map((u) => u.id));
            else setIndex((i) => i + 1);
          }}
        >
          {last ? "Vào khu vườn" : "Tiếp"}
        </Button>
      </div>
    </div>
  );
}

export function GardenFallback() {
  return (
    <div className="rounded-[16px] border border-border bg-surface p-8 text-center">
      <p className="font-display text-xl">Khu vườn đang nghỉ một chút</p>
      <p className="mt-2 text-sm text-muted">Phần học tiếng Nhật vẫn dùng bình thường.</p>
      <Button asChild className="mt-4" variant="secondary">
        <Link to="/daily">
          <BookOpen /> Tiếp tục học
        </Link>
      </Button>
    </div>
  );
}

export function GardenLoading() {
  return (
    <div className="grid min-h-[50vh] place-items-center text-center">
      <div>
        <p className="font-display text-2xl">Đang chăm sóc khu vườn…</p>
        <p className="mt-2 text-sm text-muted">Mame đang tưới một chút nước.</p>
      </div>
    </div>
  );
}
