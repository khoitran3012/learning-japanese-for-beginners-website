import { r as isBrowser } from "./utils-D10sm1uC.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BVK2Ns8d.js
var DEFAULT_SETTINGS = {
	theme: "system",
	fontSize: "md",
	showRomaji: true,
	autoPlayAudio: false,
	ttsRate: .9,
	dailyGoal: 15,
	flashcardPerDay: 20,
	freeMode: false,
	onlineDictionary: false,
	reducedMotion: false,
	aiMode: "off",
	localAiUrl: "http://localhost:11434",
	localAiModel: "llama3.2",
	localAiKind: "ollama",
	localAiSystem: "Bạn là gia sư tiếng Nhật. Giải thích bằng tiếng Việt, ngắn gọn, có ví dụ hiragana + romaji.",
	localAiTemperature: .4,
	localAiMaxTokens: 400
};
function applyToDom(s) {
	if (!isBrowser()) return;
	const root = document.documentElement;
	const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const dark = s.theme === "dark" || s.theme === "system" && systemDark;
	root.classList.toggle("dark", dark);
	root.classList.toggle("reduce-motion", s.reducedMotion);
	root.classList.remove("font-sm", "font-md", "font-lg");
	root.classList.add(`font-${s.fontSize}`);
}
var useSettings = create()(persist((set, get) => ({
	...DEFAULT_SETTINGS,
	hydrated: false,
	set: (partial) => {
		set(partial);
		applyToDom({
			...get(),
			...partial
		});
	},
	applyDom: () => applyToDom(get())
}), {
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
		localAiMaxTokens: s.localAiMaxTokens
	}),
	onRehydrateStorage: () => (state) => {
		state?.applyDom();
		useSettings.setState({ hydrated: true });
	}
}));
function initSettingsDom() {
	if (!isBrowser()) return;
	try {
		const raw = localStorage.getItem("akari-settings");
		if (!raw) {
			applyToDom(DEFAULT_SETTINGS);
			return;
		}
		const parsed = JSON.parse(raw);
		applyToDom({
			...DEFAULT_SETTINGS,
			...parsed.state
		});
	} catch {
		applyToDom(DEFAULT_SETTINGS);
	}
}
//#endregion
export { useSettings as n, initSettingsDom as t };
