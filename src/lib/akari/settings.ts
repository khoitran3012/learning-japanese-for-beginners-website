import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_SETTINGS, type AppSettings } from "./types";
import { isBrowser } from "@/lib/utils";

interface SettingsState extends AppSettings {
  hydrated: boolean;
  set: (partial: Partial<AppSettings>) => void;
  applyDom: () => void;
}

function applyToDom(s: AppSettings) {
  if (!isBrowser()) return;
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = s.theme === "dark" || (s.theme === "system" && systemDark);
  root.classList.toggle("dark", dark);
  root.classList.toggle("reduce-motion", s.reducedMotion);
  root.classList.remove("font-sm", "font-md", "font-lg");
  root.classList.add(`font-${s.fontSize}`);
}

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_SETTINGS,
      hydrated: false,
      set: (partial) => {
        set(partial);
        applyToDom({ ...get(), ...partial });
      },
      applyDom: () => applyToDom(get()),
    }),
    {
      name: "akari-settings",
      partialize: (s) => ({
        theme: s.theme,
        fontSize: s.fontSize,
        showRomaji: s.showRomaji,
        autoPlayAudio: s.autoPlayAudio,
        ttsRate: s.ttsRate,
        dailyGoal: s.dailyGoal,
        flashcardPerDay: s.flashcardPerDay,
        freeMode: s.freeMode,
        onlineDictionary: s.onlineDictionary,
        reducedMotion: s.reducedMotion,
        aiMode: s.aiMode,
        localAiUrl: s.localAiUrl,
        localAiModel: s.localAiModel,
        localAiKind: s.localAiKind,
        localAiSystem: s.localAiSystem,
        localAiTemperature: s.localAiTemperature,
        localAiMaxTokens: s.localAiMaxTokens,
      }),
      onRehydrateStorage: () => (state) => {
        state?.applyDom();
        useSettings.setState({ hydrated: true });
      },
    },
  ),
);

export function initSettingsDom() {
  if (!isBrowser()) return;
  try {
    const raw = localStorage.getItem("akari-settings");
    if (!raw) {
      applyToDom(DEFAULT_SETTINGS);
      return;
    }
    const parsed = JSON.parse(raw) as { state?: Partial<AppSettings> };
    applyToDom({ ...DEFAULT_SETTINGS, ...parsed.state });
  } catch {
    applyToDom(DEFAULT_SETTINGS);
  }
}
