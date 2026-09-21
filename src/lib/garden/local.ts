import { isBrowser, todayKey } from "@/lib/utils";
import { GARDEN_CONFIG } from "./config";
import { buildSnapshot, type GardenFacts } from "./compute";
import type { GardenPlacement, GardenSnapshot } from "./types";

const KEY = "akari-garden-v1";

type LocalGarden = {
  placements: GardenPlacement[];
  seenUnlocks: string[];
  soundOn: boolean;
  dailyBonus: number;
  lastDailyDate: string | null;
  lastSeenLevel: number;
};

function emptyLocal(): LocalGarden {
  return {
    placements: [],
    seenUnlocks: [],
    soundOn: false,
    dailyBonus: 0,
    lastDailyDate: null,
    lastSeenLevel: -1,
  };
}

export function readLocalGarden(): LocalGarden {
  if (!isBrowser()) return emptyLocal();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyLocal();
    const parsed = JSON.parse(raw) as Partial<LocalGarden>;
    return {
      placements: Array.isArray(parsed.placements) ? parsed.placements : [],
      seenUnlocks: Array.isArray(parsed.seenUnlocks) ? parsed.seenUnlocks : [],
      soundOn: Boolean(parsed.soundOn),
      dailyBonus: Number(parsed.dailyBonus) || 0,
      lastDailyDate: typeof parsed.lastDailyDate === "string" ? parsed.lastDailyDate : null,
      lastSeenLevel: Number.isFinite(Number(parsed.lastSeenLevel)) ? Number(parsed.lastSeenLevel) : -1,
    };
  } catch {
    return emptyLocal();
  }
}

export function writeLocalGarden(next: LocalGarden) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* quota */
  }
}

export function localSnapshot(
  facts: Omit<GardenFacts, "dailyBonus" | "lastDailyDate" | "soundOn" | "seenUnlocks" | "placements" | "today">,
): GardenSnapshot {
  const local = readLocalGarden();
  return buildSnapshot(
    {
      ...facts,
      dailyBonus: local.dailyBonus,
      lastDailyDate: local.lastDailyDate,
      soundOn: local.soundOn,
      seenUnlocks: local.seenUnlocks,
      placements: local.placements,
      today: todayKey(),
    },
    false,
  );
}

export function markLocalSeen(ids: string[]) {
  const local = readLocalGarden();
  const seen = new Set(local.seenUnlocks);
  for (const id of ids) seen.add(id);
  writeLocalGarden({ ...local, seenUnlocks: [...seen] });
}

export function saveLocalPlacements(placements: GardenPlacement[]) {
  writeLocalGarden({ ...readLocalGarden(), placements });
}

export function setLocalSound(soundOn: boolean) {
  writeLocalGarden({ ...readLocalGarden(), soundOn });
}

export function claimLocalDaily(studiedToday: boolean) {
  const local = readLocalGarden();
  const today = todayKey();
  if (!studiedToday || local.lastDailyDate === today) return local;
  const next = {
    ...local,
    dailyBonus: local.dailyBonus + GARDEN_CONFIG.xp.daily,
    lastDailyDate: today,
  };
  writeLocalGarden(next);
  return next;
}

export function peekLastSeenLevel() {
  return readLocalGarden().lastSeenLevel;
}

export function markSeenLevel(level: number) {
  writeLocalGarden({ ...readLocalGarden(), lastSeenLevel: level });
}
