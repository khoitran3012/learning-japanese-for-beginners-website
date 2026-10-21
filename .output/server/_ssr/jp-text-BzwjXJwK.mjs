import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toHiragana, t as kanaToRomaji } from "./kana-util-DgSJpVDG.mjs";
import { i as kanjiByChar, n as hanVietOf, r as hanVietOfWord, t as allKanji } from "./kanji-set-B5ykdYH_.mjs";
import { t as VOCAB_N5 } from "./vocabulary-n5-DDorjkhE.mjs";
import { t as VOCAB_N4 } from "./vocabulary-n4-CVIZPi7y.mjs";
import { n as hasKanji } from "./romaji-BCVeKQ98.mjs";
import { t as cn } from "./utils-XG3oJXDV.mjs";
import { n as useSettings } from "./settings-_aQHY0Mw.mjs";
import { t as SpeakButton } from "./speak-button-CukGzBix.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jp-text-BzwjXJwK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KANJI_RE = /[\u4e00-\u9fff々〆ヶ]/;
function charInfo(ch) {
	const k = kanjiByChar(ch);
	return {
		ch,
		kun: (k?.kunyomi ?? []).filter(Boolean).join(" · "),
		on: (k?.onyomi ?? []).filter(Boolean).map((x) => toHiragana(x)).join(" · "),
		hanViet: k?.han_viet || hanVietOf(ch),
		meaning: k?.meaning_vi ?? "",
		kanjiId: k?.id
	};
}
var wordIndex = null;
function getWordIndex() {
	if (wordIndex) return wordIndex;
	const map = /* @__PURE__ */ new Map();
	const add = (word, kana, meaning) => {
		if (!word || !hasKanji(word) || map.has(word)) return;
		map.set(word, {
			kana: toHiragana(kana.replace(/[-．.]/g, "")),
			meaning
		});
	};
	for (const v of VOCAB_N5) add(v.word, v.kana, v.meaning_vi);
	for (const v of VOCAB_N4) add(v.word, v.kana, v.meaning_vi);
	for (const k of allKanji()) for (const ex of k.examples) add(ex.word, ex.kana, ex.meaning_vi);
	wordIndex = map;
	return map;
}
function peekOf(surface) {
	const chars = [...surface].filter((c) => KANJI_RE.test(c)).map(charInfo);
	const hit = getWordIndex().get(surface);
	const hanViet = hanVietOfWord(surface) || chars.map((c) => c.hanViet).filter(Boolean).join(" ");
	const wordKana = hit?.kana ?? "";
	return {
		surface,
		wordKana,
		wordRomaji: wordKana ? kanaToRomaji(wordKana) : "",
		hanViet,
		meaning: hit?.meaning ?? (chars.length === 1 ? chars[0]?.meaning ?? "" : ""),
		chars
	};
}
function kindOf(ch) {
	if (KANJI_RE.test(ch)) return "kanji";
	if (/[\u3040-\u30ffー]/.test(ch)) return "kana";
	return "other";
}
/** Greedy: cụm kanji (+ okurigana nếu khớp từ vựng) → bấm một lần ra cả từ. */
function tokenizeJp(text) {
	const chars = [...text];
	const dict = getWordIndex();
	const out = [];
	let i = 0;
	while (i < chars.length) {
		const ch = chars[i];
		if (!KANJI_RE.test(ch)) {
			const k = kindOf(ch);
			let j = i + 1;
			while (j < chars.length && kindOf(chars[j]) === k) j += 1;
			out.push({
				surface: chars.slice(i, j).join(""),
				kind: k
			});
			i = j;
			continue;
		}
		let bestLen = 1;
		const max = Math.min(8, chars.length - i);
		for (let len = max; len >= 2; len--) {
			const slice = chars.slice(i, i + len).join("");
			if (!KANJI_RE.test(slice[0] ?? "")) break;
			if (dict.has(slice)) {
				bestLen = len;
				break;
			}
		}
		const surface = chars.slice(i, i + bestLen).join("");
		out.push({
			surface,
			kind: "kanji",
			info: peekOf(surface)
		});
		i += bestLen;
	}
	return out;
}
function speakKanaOf(info) {
	if (info.wordKana) return info.wordKana.replace(/[・·]/g, "");
	const first = info.chars[0];
	if (!first) return "";
	const kun = first.kun.split(" · ")[0]?.replace(/[・·]/g, "") ?? "";
	const on = first.on.split(" · ")[0]?.replace(/[・·]/g, "") ?? "";
	return kun || on;
}
function PeekPanel({ info }) {
	const showRomaji = useSettings((s) => s.showRomaji);
	const speak = speakKanaOf(info);
	const single = info.chars.length === 1 ? info.chars[0] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 rounded-[10px] border border-border bg-choice p-3 text-left",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-jp text-2xl leading-none",
							children: info.surface
						}),
						info.wordKana ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-jp text-base text-muted",
							children: info.wordKana
						}), showRomaji && info.wordRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-accent",
							children: info.wordRomaji
						}) : null] }) : null,
						single && !info.wordKana ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 space-y-0.5 text-sm",
							children: [single.kun ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle",
								children: "Kun "
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-jp",
								children: single.kun
							})] }) : null, single.on ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle",
								children: "On "
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-jp",
								children: single.on
							})] }) : null]
						}) : null,
						info.hanViet ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm",
							children: ["Hán-Việt: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: info.hanViet
							})]
						}) : null,
						info.meaning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: info.meaning
						}) : null
					]
				}), speak ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
					text: speak,
					kana: speak,
					label: "Nghe"
				}) : null]
			}),
			info.chars.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-wrap gap-2",
				children: info.chars.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-md border border-border bg-surface px-2 py-1 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-jp text-base",
							children: c.ch
						}),
						c.hanViet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1",
							children: c.hanViet
						}) : null,
						c.kun || c.on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 font-jp text-muted",
							children: c.kun || c.on
						}) : null
					]
				}, c.ch))
			}) : null,
			single?.kanjiId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/kanji/$id",
				params: { id: single.kanjiId },
				className: "mt-2 inline-block text-xs text-accent hover:underline",
				children: ["Mở chữ ", single.ch]
			}) : null
		]
	});
}
function JpText({ text, className, hint = true }) {
	const tokens = (0, import_react.useMemo)(() => tokenizeJp(text), [text]);
	const [active, setActive] = (0, import_react.useState)(null);
	const picked = active != null ? tokens[active] : void 0;
	const hasPeek = tokens.some((t) => t.kind === "kanji");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("font-jp leading-relaxed", className),
		children: tokens.map((t, i) => {
			if (t.kind !== "kanji" || !t.info) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.surface }, i);
			const on = active === i;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: cn("rounded-sm px-0.5 underline decoration-dotted decoration-muted underline-offset-[5px] transition-colors", on ? "bg-mist text-fg" : "hover:bg-choice"),
				"aria-label": `${t.surface}. Xem hiragana và Hán-Việt`,
				"aria-expanded": on,
				onClick: () => setActive((cur) => cur === i ? null : i),
				onMouseEnter: () => setActive(i),
				children: t.surface
			}, i);
		})
	}), picked?.info ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeekPanel, { info: picked.info }) : hasPeek && hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-xs text-subtle",
		children: "Trỏ hoặc bấm kanji — hiện hiragana và Hán-Việt."
	}) : null] });
}
//#endregion
export { JpText as t };
