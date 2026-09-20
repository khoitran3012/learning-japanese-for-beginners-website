import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { r as Volume2 } from "../_libs/lucide-react.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/speak-button-DVsDELCU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Isolated mora are too short for many voices — give them a little context. */
function ttsSafeJapanese(text) {
	const t = text.trim();
	if (!t) return t;
	if (/[\u4e00-\u9fff]/.test(t) && !/[\u3040-\u30ff]/.test(t)) return `${t}。`;
	if ([...t].length <= 2) return `${t}。${t}`;
	return t;
}
var WebSpeechTts = class {
	name = "Web Speech API";
	utterance = null;
	isAvailable() {
		return typeof window !== "undefined" && "speechSynthesis" in window;
	}
	japaneseVoice() {
		if (!this.isAvailable()) return null;
		const voices = window.speechSynthesis.getVoices();
		return voices.find((v) => v.lang.toLowerCase().startsWith("ja")) ?? voices.find((v) => /japan/i.test(v.name)) ?? null;
	}
	statusMessage() {
		if (!this.isAvailable()) return "Trình duyệt không hỗ trợ đọc tiếng Nhật.";
		if (typeof window !== "undefined" && window.speechSynthesis.getVoices().length > 0 && !this.japaneseVoice()) return "Thiết bị của bạn chưa có giọng đọc tiếng Nhật.";
		return null;
	}
	speak(text, options = {}) {
		return new Promise((resolve, reject) => {
			if (!this.isAvailable()) {
				reject(/* @__PURE__ */ new Error("TTS unavailable"));
				return;
			}
			this.stop();
			const u = new SpeechSynthesisUtterance(ttsSafeJapanese(text));
			u.lang = options.lang ?? "ja-JP";
			u.rate = options.rate ?? .9;
			const voice = this.japaneseVoice();
			if (voice) u.voice = voice;
			u.onend = () => resolve();
			u.onerror = () => resolve();
			this.utterance = u;
			window.speechSynthesis.speak(u);
		});
	}
	stop() {
		if (this.isAvailable()) window.speechSynthesis.cancel();
		this.utterance = null;
	}
};
var provider = new WebSpeechTts();
function getTts() {
	return provider;
}
async function speakJapanese(text, rate = .9) {
	try {
		await provider.speak(text, {
			rate,
			lang: "ja-JP"
		});
		return {
			ok: true,
			message: null
		};
	} catch {
		return {
			ok: false,
			message: provider.statusMessage() ?? "Không đọc được."
		};
	}
}
if (typeof window !== "undefined" && "speechSynthesis" in window) {
	window.speechSynthesis.getVoices();
	window.speechSynthesis.addEventListener?.("voiceschanged", () => {
		window.speechSynthesis.getVoices();
	});
}
function SpeakButton({ text, className, label = "Nghe" }) {
	const rate = useSettings((s) => s.ttsRate);
	const [msg, setMsg] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("inline-flex flex-col items-start gap-1", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "secondary",
			size: "sm",
			"aria-label": label,
			onClick: async () => {
				const res = await speakJapanese(text, rate);
				const status = getTts().statusMessage();
				setMsg(res.ok ? status : res.message);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {}), label]
		}), msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-xs text-xs text-muted",
			children: msg
		}) : null]
	});
}
//#endregion
export { speakJapanese as n, SpeakButton as t };
