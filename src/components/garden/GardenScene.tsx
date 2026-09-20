import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type PointerEvent as PE } from "react";
import { cn } from "@/lib/utils";
import { GARDEN_ITEM_MAP } from "@/lib/garden/config";
import type { GardenPlacement, GardenSnapshot } from "@/lib/garden/types";
import { MascotMame, SPRITES } from "./sprites";

function hourNow() {
  return new Date().getHours();
}

function monthNow() {
  return new Date().getMonth() + 1;
}

function seasonOf(month: number) {
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

export function GardenScene({
  garden,
  placing,
  onPlace,
  reduced,
}: {
  garden: GardenSnapshot;
  placing: string | null;
  onPlace: (x: number, y: number) => void;
  reduced: boolean;
}) {
  const night = hourNow() < 6 || hourNow() >= 19;
  const dusk = hourNow() >= 17 && hourNow() < 19;
  const season = seasonOf(monthNow());
  const lush = Math.min(1, Math.max(0, (garden.level - 1) / 4));
  const unlocked = new Set(garden.unlocked);
  const stage = useRef<HTMLDivElement>(null);
  const [cam, setCam] = useState({ s: 1, x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onWheel = (e: Event) => {
      const we = e as WheelEvent;
      we.preventDefault();
      setCam((c) => ({ ...c, s: Math.min(1.8, Math.max(0.85, c.s + (we.deltaY < 0 ? 0.08 : -0.08))) }));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  function onPointerDown(e: PE<HTMLDivElement>) {
    if (placing) return;
    drag.current = { x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: PE<HTMLDivElement>) {
    if (!drag.current) return;
    setCam({
      s: cam.s,
      x: drag.current.cx + (e.clientX - drag.current.x),
      y: drag.current.cy + (e.clientY - drag.current.y),
    });
  }
  function onPointerUp(e: PE<HTMLDivElement>) {
    const wasDrag = drag.current;
    drag.current = null;
    if (!placing || wasDrag) return;
    const world = stage.current?.querySelector("[data-garden-world]") as HTMLElement | null;
    if (!world) return;
    const rect = world.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onPlace(x, y);
  }

  const idle = garden.xp === 0;

  return (
    <div
      ref={stage}
      className={cn("garden-stage", night && "is-night", dusk && "is-dusk", `season-${season}`, placing && "is-placing")}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="img"
      aria-label={`Khu vườn cấp ${garden.level}, ${garden.levelName}`}
    >
      <div className="garden-backdrop" aria-hidden>
        <img src="/art/garden-dawn.jpg" alt="" className="garden-bg garden-bg-dawn" />
        <img
          src="/art/garden-lush.jpg"
          alt=""
          className="garden-bg garden-bg-lush"
          style={{ opacity: lush }}
        />
        <img
          src="/art/garden-night.jpg"
          alt=""
          className="garden-bg garden-bg-night"
          style={{ opacity: night ? 0.92 : dusk ? 0.35 : 0 }}
        />
        <div className="garden-wash" />
      </div>

      <div
        data-garden-world
        className="garden-world"
        style={{ transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.s})` }}
      >
        {!reduced ? <Clouds /> : null}
        {season === "spring" && unlocked.has("sakura") && !reduced ? <Petals color="sakura" /> : null}
        {season === "autumn" && !reduced ? <Petals color="maple" /> : null}
        {season === "winter" && !reduced ? <Snow /> : null}

        {garden.placements.map((p) => (
          <GardenProp key={p.id} placement={p} night={night} reduced={reduced} />
        ))}

        {unlocked.has("butterfly") && !reduced ? <span className="garden-critter is-butterfly" /> : null}
        {unlocked.has("bird") && !reduced ? <span className="garden-critter is-bird" /> : null}
        {night && unlocked.has("fireflies") && !reduced ? (
          <>
            <span className="garden-firefly" style={{ left: "38%", top: "58%" }} />
            <span className="garden-firefly" style={{ left: "52%", top: "62%", animationDelay: "1.2s" }} />
            <span className="garden-firefly" style={{ left: "46%", top: "50%", animationDelay: "0.6s" }} />
          </>
        ) : null}

        <div className="garden-mascot" title="Mame, linh vật khu vườn">
          <MascotMame waving={!idle} />
        </div>
      </div>

      {idle ? (
        <div className="garden-empty">
          <p className="font-display text-xl">Đây là khu vườn đầu tiên của bạn.</p>
          <p className="mt-1 max-w-sm text-sm text-muted">
            Hãy bắt đầu học tiếng Nhật và cùng nhau trồng nó nhé.
          </p>
          <Link
            to="/daily"
            className="mt-3 inline-flex h-11 items-center rounded-[10px] bg-primary px-4 text-sm text-primary-fg"
          >
            Bắt đầu học
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function GardenProp({
  placement,
  night,
  reduced,
}: {
  placement: GardenPlacement;
  night: boolean;
  reduced: boolean;
}) {
  const def = GARDEN_ITEM_MAP[placement.itemId];
  const Sprite = SPRITES[placement.itemId];
  if (!Sprite) return null;
  const fly = placement.itemId === "butterfly" || placement.itemId === "bird";
  return (
    <div
      className={cn("garden-prop", fly && !reduced && "is-living")}
      style={{
        left: `${placement.x}%`,
        top: `${placement.y}%`,
        zIndex: def?.z ?? 2,
        width: `${(def?.scale ?? 1) * (placement.scale ?? 1) * 4.6}rem`,
      }}
    >
      {Sprite({ title: def?.name, night })}
    </div>
  );
}

function Clouds() {
  return (
    <>
      <span className="garden-cloud" style={{ top: "8%", left: "-10%" }} />
      <span className="garden-cloud c2" style={{ top: "14%", left: "30%" }} />
    </>
  );
}

function Petals({ color }: { color: "sakura" | "maple" }) {
  return (
    <div className={cn("garden-petals", color === "maple" && "is-maple")} aria-hidden>
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} style={{ left: `${8 + i * 11}%`, animationDelay: `${i * 0.7}s` }} />
      ))}
    </div>
  );
}

function Snow() {
  return (
    <div className="garden-snow" aria-hidden>
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} style={{ left: `${6 + i * 9}%`, animationDelay: `${i * 0.5}s` }} />
      ))}
    </div>
  );
}
