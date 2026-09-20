import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { GardenScene } from "@/components/garden/GardenScene";
import { CollectionSheet, GardenFallback, GardenHud, GardenLoading, UnlockModal } from "@/components/garden/GardenChrome";
import { useGarden } from "@/lib/garden/use-garden";
import { chimeUnlock, setGardenAudio } from "@/lib/garden/audio";
import { uid } from "@/lib/utils";
import { GARDEN_ITEM_MAP } from "@/lib/garden/config";

export const Route = createFileRoute("/_app/garden")({ component: GardenPage });

function GardenPage() {
  const { garden, loading, error, ackUnlocks, savePlacements, claimDaily, toggleSound } = useGarden();
  const [collection, setCollection] = useState(false);
  const [placing, setPlacing] = useState<string | null>(null);
  const [sound, setSound] = useState(garden.soundOn);
  const reduced =
    typeof window !== "undefined" &&
    (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("reduce-motion"));

  useEffect(() => {
    setSound(garden.soundOn);
  }, [garden.soundOn]);

  useEffect(() => {
    void setGardenAudio(sound);
    return () => {
      void setGardenAudio(false);
    };
  }, [sound]);

  useEffect(() => {
    if (garden.newUnlocks.length && sound) chimeUnlock();
  }, [garden.newUnlocks.length, sound]);

  if (loading) return <GardenLoading />;
  if (error && !garden) return <GardenFallback />;

  return (
    <div>
      <PageHeader
        kicker="庭"
        title="Khu vườn của tôi"
        description="Học tiếng Nhật càng đều, khu vườn càng sống. Cây không bao giờ chết — chúng chỉ chờ bạn trở lại."
        actions={
          <Button asChild variant="secondary">
            <Link to="/daily">Bắt đầu học</Link>
          </Button>
        }
      />
      <div className="garden-frame">
        <GardenScene
          garden={garden}
          placing={placing}
          reduced={reduced}
          onPlace={(x, y) => {
            if (!placing) return;
            const def = GARDEN_ITEM_MAP[placing];
            void savePlacements([
              ...garden.placements.filter((p) => p.itemId !== placing),
              { id: uid("plt"), itemId: placing, x, y, scale: def?.scale ?? 1 },
            ]);
            setPlacing(null);
          }}
        />
        <GardenHud
          garden={garden}
          soundOn={sound}
          placing={placing}
          onCancelPlace={() => setPlacing(null)}
          onOpenCollection={() => setCollection(true)}
          onSound={() => {
            const next = !sound;
            setSound(next);
            void toggleSound(next);
          }}
          onDaily={() => {
            void claimDaily();
          }}
        />
      </div>
      <CollectionSheet
        open={collection}
        onOpenChange={setCollection}
        garden={garden}
        onPlace={(id) => setPlacing(id)}
      />
      {garden.newUnlocks.length ? (
        <UnlockModal garden={garden} onDone={(ids) => void ackUnlocks(ids)} />
      ) : null}
      {error ? (
        <p className="mt-3 text-center text-sm text-muted">Khu vườn đang nghỉ một chút — tiến trình học vẫn an toàn.</p>
      ) : null}
    </div>
  );
}
