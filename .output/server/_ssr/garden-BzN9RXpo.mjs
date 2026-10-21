import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as todayKey, t as cn } from "./utils-XG3oJXDV.mjs";
import { t as Button } from "./button-Dt7wwSQI.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { a as LevelUpModal, c as StudyHistory, d as peekLastSeenLevel, f as useGarden, l as TreeStats, n as GardenHud, o as SakuraTree, r as GardenLoading, s as StreakCalendar, t as GardenFallback, u as markSeenLevel } from "./use-garden-DZDG5b2v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/garden-BzN9RXpo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GardenScene({ garden, reduced, celebrate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("garden-stage tree-stage", reduced && "is-still"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tree-haze" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SakuraTree, {
			stage: garden.level,
			celebrate: celebrate && !reduced
		})]
	});
}
var ctx = null;
var wind = null;
var gain = null;
function ensure() {
	if (typeof window === "undefined") return null;
	if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
	return ctx;
}
async function setGardenAudio(on) {
	const audio = ensure();
	if (!audio) return;
	if (!on) {
		gain?.gain.setTargetAtTime(0, audio.currentTime, .2);
		return;
	}
	if (audio.state === "suspended") await audio.resume();
	if (!wind) {
		const osc = audio.createOscillator();
		osc.type = "triangle";
		osc.frequency.value = 110;
		const g = audio.createGain();
		g.gain.value = 0;
		const filter = audio.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.value = 420;
		osc.connect(filter);
		filter.connect(g);
		g.connect(audio.destination);
		osc.start();
		wind = osc;
		gain = g;
	}
	gain?.gain.setTargetAtTime(.015, audio.currentTime, .4);
}
function chimeUnlock() {
	const audio = ensure();
	if (!audio || !gain || gain.gain.value <= .001) return;
	const osc = audio.createOscillator();
	const g = audio.createGain();
	osc.frequency.value = 784;
	osc.type = "sine";
	g.gain.value = .04;
	osc.connect(g);
	g.connect(audio.destination);
	osc.start();
	g.gain.exponentialRampToValueAtTime(.001, audio.currentTime + .8);
	osc.stop(audio.currentTime + .85);
}
function GardenPage() {
	const { garden, loading, error, toggleSound, goals, marks, history, startedAt } = useGarden();
	const [sound, setSound] = (0, import_react.useState)(garden.soundOn);
	const [levelUp, setLevelUp] = (0, import_react.useState)(false);
	const [celebrate, setCelebrate] = (0, import_react.useState)(false);
	const seen = (0, import_react.useRef)(peekLastSeenLevel());
	const reduced = typeof window !== "undefined" && (window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("reduce-motion"));
	(0, import_react.useEffect)(() => {
		setSound(garden.soundOn);
	}, [garden.soundOn]);
	(0, import_react.useEffect)(() => {
		setGardenAudio(sound);
		return () => {
			setGardenAudio(false);
		};
	}, [sound]);
	(0, import_react.useEffect)(() => {
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
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GardenLoading, {});
	if (error && !garden) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GardenFallback, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "庭",
			title: "Vườn tiếng Nhật",
			description: "Mỗi ngày học là một ngày tưới Sakura. Cây không héo — chỉ chờ bạn trở lại.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/daily",
					children: "Học hôm nay"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "garden-frame",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GardenScene, {
				garden,
				reduced,
				celebrate
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GardenHud, {
				garden,
				soundOn: sound,
				goals,
				startedAt,
				onSound: () => {
					const next = !sound;
					setSound(next);
					toggleSound(next);
				}
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeStats, {
				garden,
				goals
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreakCalendar, {
					marks,
					today: todayKey()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyHistory, { rows: history })]
			})]
		}),
		levelUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelUpModal, {
			garden,
			onDone: () => setLevelUp(false)
		}) : null,
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-center text-sm text-muted",
			children: "Vườn đang nghỉ một chút — tiến trình học vẫn an toàn."
		}) : null
	] });
}
//#endregion
export { GardenPage as component };
