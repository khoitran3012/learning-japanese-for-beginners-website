import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toHiragana } from "./kana-util-DgSJpVDG.mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { r as Volume2 } from "../_libs/lucide-react.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/speak-button-BcZ3hYwQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var HAS_KANA = /[\u3040-\u30ff]/;
var KANA_ONLY = /^[\u3040-\u30ffー\s]+$/;
/** Longer first so こんにちは is kept intact before は. */
var PROTECT_HA = [
	"おはようございます",
	"こんにちは",
	"こんばんは",
	"はじめまして",
	"はじめて",
	"おはよう",
	"はなし",
	"はなび",
	"はがき",
	"はたら",
	"はじめ",
	"はやし",
	"はずれ",
	"はず",
	"はは",
	"はい",
	"はな",
	"はし",
	"はこ",
	"はる",
	"はれ",
	"はで",
	"はば",
	"はら",
	"はだ",
	"はん",
	"はつ",
	"はち",
	"はて",
	"ほか"
];
/** Lexical へ (not the particle). Longer first. */
var PROTECT_HE = [
	"へいわ",
	"へんじ",
	"へんか",
	"へんこう",
	"へんかん",
	"へいき",
	"へいこう",
	"へいせい",
	"へいほう",
	"へいれつ",
	"へいさ",
	"へいし",
	"へた",
	"へや",
	"へそ",
	"へえ",
	"へび",
	"へらす",
	"へる",
	"へこ",
	"へん",
	"へい"
];
function stripNotes(raw) {
	return raw.replace(/[（(][^）)]*[）)]/g, "").replace(/\s*=\s*.*$/, "").replace(/[#＃].*$/, "").replace(/#NAME\??/gi, "").trim();
}
/** One reading, hiragana, no okurigana dots. */
function readingToKana(raw) {
	let s = stripNotes(raw.normalize("NFKC"));
	if (!s) return "";
	s = s.replace(/、/g, "/").replace(/[，,]/g, "/");
	s = (s.split("/")[0] ?? "").trim();
	s = toHiragana(s);
	s = s.replace(/[・･·．.]/g, "");
	s = s.replace(/[-－]/g, "");
	s = s.replace(/\s+/g, "");
	return s;
}
function looksLikeSentence(s) {
	return /[。！？、]|です|ます|でした|ました|だ$|である/.test(s) || s.length >= 8;
}
function protectThen(s, words, replace) {
	const slots = [];
	let out = s;
	for (const w of words) {
		if (!out.includes(w)) continue;
		const token = `\u0001${slots.length}\u0001`;
		slots.push(w);
		out = out.split(w).join(token);
	}
	out = replace(out);
	for (let i = 0; i < slots.length; i++) out = out.split(`\u0001${i}\u0001`).join(slots[i]);
	return out;
}
/** Topic は → わ, keeping words like こんにちは / はは. */
function replaceTopicHa(s) {
	return protectThen(s, PROTECT_HA, (t) => t.replace(/は/g, "わ"));
}
/** Direction へ → え, keeping へや / へん / へた. */
function replaceHe(s) {
	return protectThen(s, PROTECT_HE, (t) => t.replace(/へ/g, "え"));
}
/**
* Yomigana for Japanese TTS: hiragana + spoken particles (を→お, へ→え, は→わ).
* Isolated は/へ/を are the particles. Isolated words keep lexical は (はな, はは).
*/
function yomigana(kana) {
	let s = readingToKana(kana);
	if (!s) return s;
	if (s === "は") return "わ";
	if (s === "へ") return "え";
	if (s === "を") return "お";
	s = s.replace(/を/g, "お");
	s = replaceHe(s);
	if (looksLikeSentence(s)) s = replaceTopicHa(s);
	return s;
}
/** Kana-only TTS input. Parenthetical POS notes and kanji guesses are stripped. */
function ttsKana(kana, word = "") {
	const fromKana = yomigana(kana ?? "");
	if (fromKana && HAS_KANA.test(fromKana) && KANA_ONLY.test(fromKana)) return fromKana;
	const fromWord = yomigana(word);
	if (fromWord && HAS_KANA.test(fromWord) && KANA_ONLY.test(fromWord)) return fromWord;
	if (fromKana && HAS_KANA.test(fromKana)) return fromKana;
	return fromWord || fromKana || stripNotes(kana || word);
}
function isSpeakableKana(text) {
	const t = ttsKana(text, text);
	return t.length > 0 && KANA_ONLY.test(t) && HAS_KANA.test(t);
}
/**
* TTS: Web Speech API, ja-JP only.
* Always feed yomigana (hiragana with spoken particles). Speak each utterance once.
*/
/** One reading, one time. Short mora get a stop so Chrome does not echo あい. */
function ttsSafeJapanese(text) {
	const t = ttsKana(text, text);
	if (!t) return t;
	const mora = [...t].filter((ch) => /[\u3040-\u30ffー]/.test(ch)).length;
	if (mora > 0 && mora <= 2 && !/[。！？]/.test(t)) return `${t}。`;
	return t;
}
function voiceScore(v) {
	const n = v.name.toLowerCase();
	const lang = v.lang.toLowerCase();
	if (!lang.startsWith("ja") && !/japan/.test(n)) return 99;
	if (/google 日本語|google japanese/.test(n)) return 0;
	if (/nanami|haruka|ayumi|ichiro|kyoko|kyōko|otoya|sayaka|mizuki/.test(n)) return 1;
	if (/google/.test(n) && lang.startsWith("ja")) return 2;
	if (lang === "ja-jp" && v.localService) return 3;
	if (lang.startsWith("ja-jp")) return 4;
	if (lang.startsWith("ja")) return 5;
	return 8;
}
var WebSpeechTts = class {
	name = "Web Speech API";
	utterance = null;
	/** Bumps on every speak/stop so a cancelled utterance cannot start a second copy. */
	gen = 0;
	isAvailable() {
		return typeof window !== "undefined" && "speechSynthesis" in window;
	}
	japaneseVoice() {
		if (!this.isAvailable()) return null;
		const best = [...window.speechSynthesis.getVoices()].sort((a, b) => voiceScore(a) - voiceScore(b))[0];
		if (!best || voiceScore(best) >= 99) return null;
		return best;
	}
	statusMessage() {
		if (!this.isAvailable()) return "Trình duyệt không hỗ trợ đọc tiếng Nhật.";
		if (typeof window !== "undefined" && window.speechSynthesis.getVoices().length > 0 && !this.japaneseVoice()) return "Thiết bị của bạn chưa có giọng đọc tiếng Nhật. Máy sẽ đọc ja-JP mặc định.";
		return null;
	}
	speak(text, options = {}) {
		return new Promise((resolve) => {
			if (!this.isAvailable()) {
				resolve();
				return;
			}
			const spoken = ttsSafeJapanese(text);
			if (!spoken) {
				resolve();
				return;
			}
			const gen = ++this.gen;
			try {
				window.speechSynthesis.cancel();
			} catch {}
			const start = () => {
				if (gen !== this.gen) {
					resolve();
					return;
				}
				try {
					window.speechSynthesis.cancel();
				} catch {}
				if (gen !== this.gen) {
					resolve();
					return;
				}
				const u = new SpeechSynthesisUtterance(spoken);
				u.lang = "ja-JP";
				u.rate = options.rate ?? .92;
				u.pitch = 1;
				u.volume = 1;
				const voice = this.japaneseVoice();
				if (voice) {
					u.voice = voice;
					u.lang = voice.lang.startsWith("ja") ? voice.lang : "ja-JP";
				}
				u.onend = () => {
					if (gen === this.gen) resolve();
				};
				u.onerror = () => {
					if (gen === this.gen) resolve();
				};
				this.utterance = u;
				window.speechSynthesis.speak(u);
			};
			window.setTimeout(start, 90);
		});
	}
	stop() {
		this.gen += 1;
		if (this.isAvailable()) try {
			window.speechSynthesis.cancel();
		} catch {}
		this.utterance = null;
	}
};
var provider = new WebSpeechTts();
function getTts() {
	return provider;
}
async function speakJapanese(text, rate = .92) {
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
function stopSpeaking() {
	provider.stop();
}
if (typeof window !== "undefined" && "speechSynthesis" in window) {
	window.speechSynthesis.getVoices();
	window.speechSynthesis.addEventListener?.("voiceschanged", () => {
		window.speechSynthesis.getVoices();
	});
}
function SpeakButton({ text, kana, className, label = "Nghe" }) {
	const rate = useSettings((s) => s.ttsRate);
	const [msg, setMsg] = (0, import_react.useState)(null);
	const spoken = ttsKana(kana, text);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("inline-flex flex-col items-start gap-1", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "secondary",
			size: "sm",
			"aria-label": label,
			onClick: async () => {
				const res = await speakJapanese(spoken, rate);
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
export { ttsKana as a, stopSpeaking as i, isSpeakableKana as n, speakJapanese as r, SpeakButton as t };
