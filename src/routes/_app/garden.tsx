import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { GardenScene } from "@/components/garden/GardenScene";
import {
  GardenFallback,
  GardenHud,
  GardenLoading,
  LevelUpModal,
  StreakCalendar,
  StudyHistory,
  TreeStats,
} from "@/components/garden/GardenChrome";
import { useGarden } from "@/lib/garden/use-garden";
import { chimeUnlock, setGardenAudio } from "@/lib/garden/audio";
import { markSeenLevel, peekLastSeenLevel } from "@/lib/garden/local";
import { todayKey } from "@/lib/utils";

export const Route = createFileRoute("/_app/garden")({ component: GardenPage });

function GardenPage() {
  const { garden, loading, error, toggleSound, goals, marks, history, startedAt } = useGarden();
  const [sound, setSound] = useState(garden.soundOn);
  const [levelUp, setLevelUp] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const seen = useRef(peekLastSeenLevel());
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
    if (seen.current < 0) {
      seen.current = garden.level;
      markSeenLevel(garden.level);
      return;
    }
    if (garden.level > seen.current) {
      setLevelUp(true);
      setCelebrate(true);
      if (sound) chimeUnlock();
      seen.current = garden.level;
      markSeenLevel(garden.level);
      const t = window.setTimeout(() => setCelebrate(false), 1600);
      return () => window.clearTimeout(t);
    }
  }, [garden.level, sound]);

  if (loading) return <GardenLoading />;
  if (error && !garden) return <GardenFallback />;

  return (
    <div>
      <PageHeader
        kicker="庭"
        title="Vườn tiếng Nhật"
        description="Mỗi ngày học là một ngày tưới Sakura. Cây không héo — chỉ chờ bạn trở lại."
        actions={
          <Button asChild variant="secondary">
            <Link to="/daily">Học hôm nay</Link>
          </Button>
        }
      />
      <div className="garden-frame">
        <GardenScene garden={garden} reduced={reduced} celebrate={celebrate} />
        <GardenHud
          garden={garden}
          soundOn={sound}
          goals={goals}
          startedAt={startedAt}
          onSound={() => {
            const next = !sound;
            setSound(next);
            void toggleSound(next);
          }}
        />
      </div>
      <div className="mt-4 space-y-4">
        <TreeStats garden={garden} goals={goals} />
        <div className="grid gap-4 lg:grid-cols-2">
          <StreakCalendar marks={marks} today={todayKey()} />
          <StudyHistory rows={history} />
        </div>
      </div>
      {levelUp ? (
        <LevelUpModal
          garden={garden}
          onDone={() => setLevelUp(false)}
        />
      ) : null}
      {error ? (
        <p className="mt-3 text-center text-sm text-muted">Vườn đang nghỉ một chút — tiến trình học vẫn an toàn.</p>
      ) : null}
    </div>
  );
}
