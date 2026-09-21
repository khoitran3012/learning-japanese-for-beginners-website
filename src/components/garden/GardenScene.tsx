import { SakuraTree } from "./SakuraTree";
import type { GardenSnapshot } from "@/lib/garden/types";
import { cn } from "@/lib/utils";

export function GardenScene({
  garden,
  reduced,
  celebrate,
}: {
  garden: GardenSnapshot;
  placing?: string | null;
  onPlace?: (x: number, y: number) => void;
  reduced: boolean;
  celebrate?: boolean;
}) {
  return (
    <div className={cn("garden-stage tree-stage", reduced && "is-still")}>
      <div className="tree-haze" />
      <SakuraTree stage={garden.level} celebrate={celebrate && !reduced} />
    </div>
  );
}
