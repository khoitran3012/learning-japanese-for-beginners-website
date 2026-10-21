import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toHiragana, t as kanaToRomaji } from "./kana-util-DgSJpVDG.mjs";
import { c as practiceKanji, t as allKanji } from "./kanji-set-B5ykdYH_.mjs";
import { n as GRAMMAR_N5, t as GRAMMAR_N4 } from "./grammar-n4-Dv0a1spF.mjs";
import { t as VOCAB_N5 } from "./vocabulary-n5-DDorjkhE.mjs";
import { t as VOCAB_N4 } from "./vocabulary-n4-CVIZPi7y.mjs";
import { n as KATAKANA, t as HIRAGANA } from "./kana-CV-aAiLY.mjs";
import { o as learnRadicals } from "./radicals-BsxpUXhx.mjs";
import { t as cn } from "./utils-XG3oJXDV.mjs";
import { t as Button } from "./button-Dt7wwSQI.mjs";
import { r as Volume2 } from "../_libs/lucide-react.mjs";
import { n as useSettings } from "./settings-_aQHY0Mw.mjs";
import { t as Input } from "./input-BD95aU7I.mjs";
import { n as CardContent, t as Card } from "./card-D1pZ1BiI.mjs";
import { a as stopSpeaking, i as speakJapanese, t as SpeakButton } from "./speak-button-CukGzBix.mjs";
import { r as meaningParts, t as answersMatch } from "./answer-check-vNWNvSky.mjs";
import { i as uniqueShuffle, n as similarAnswer, t as questionsClash } from "./sync-score-06pwS3pC.mjs";
import { i as choiceState, n as ChoiceRomaji, r as ChoiceRow, t as ChoiceKana } from "./choice-row-EQTkVhlN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz-engine-BRlYuq57.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuizHintToggles({ className }) {
	const showRomaji = useSettings((s) => s.showRomaji);
	const showMeaning = useSettings((s) => s.showMeaning);
	const set = useSettings((s) => s.set);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-wrap gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: showRomaji ? "default" : "secondary",
			onClick: () => set({ showRomaji: !showRomaji }),
			children: "Romaji"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: showMeaning ? "default" : "secondary",
			onClick: () => set({ showMeaning: !showMeaning }),
			children: "Nghĩa"
		})]
	});
}
function QuizCard({ q, index, total, score, fillKind, onAnswer, onNext, nextLabel }) {
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [fill, setFill] = (0, import_react.useState)("");
	const [typedOk, setTypedOk] = (0, import_react.useState)(null);
	const inputRef = (0, import_react.useRef)(null);
	const autoPlay = useSettings((s) => s.autoPlayAudio);
	const showRomaji = useSettings((s) => s.showRomaji);
	const showMeaning = useSettings((s) => s.showMeaning);
	const rate = useSettings((s) => s.ttsRate);
	const rateRef = (0, import_react.useRef)(rate);
	rateRef.current = rate;
	const listenOnly = Boolean(q.speak) && !q.promptJp;
	const revealed = picked !== null;
	const canType = Boolean(fillKind || q.typedAnswers && q.typedAnswers.length);
	const endless = total <= 0;
	(0, import_react.useEffect)(() => {
		if (!autoPlay || !q.speak) return;
		let cancelled = false;
		const handle = window.setTimeout(() => {
			if (!cancelled) speakJapanese(q.speak, rateRef.current);
		}, 80);
		return () => {
			cancelled = true;
			window.clearTimeout(handle);
			stopSpeaking();
		};
	}, [autoPlay, q.id]);
	(0, import_react.useEffect)(() => {
		if (canType) inputRef.current?.focus();
	}, [canType, q.id]);
	function choose(idx) {
		if (picked !== null) return;
		setPicked(idx);
		onAnswer(idx === q.answer, idx);
	}
	function submitTyped() {
		if (picked !== null) return;
		const expected = q.typedAnswers ?? q.options;
		const ok = answersMatch(fill, expected);
		setTypedOk(ok);
		if (ok) {
			const idx = q.options.findIndex((o) => answersMatch(o, expected) || answersMatch(fill, [o]));
			choose(idx >= 0 ? idx : q.answer);
		} else choose(-1);
		setFill("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "mx-auto max-w-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tabular-nums text-muted",
						children: endless ? `Câu ${index + 1} · đúng ${score}` : `Câu ${index + 1}/${total} · đúng ${score}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizHintToggles, {})]
				}),
				listenOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-3 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-16 items-center justify-center rounded-full bg-choice text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-8" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-base font-medium text-fg",
							children: q.prompt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
							text: q.speak,
							kana: q.speak,
							label: "Nghe lại"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					q.promptJp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-jp text-5xl leading-none text-fg",
						children: q.promptJp
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn(q.promptJp ? "text-sm text-muted" : "text-lg font-medium text-fg"),
						children: q.prompt
					}),
					q.speak ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
						text: q.speak,
						kana: q.speak
					}) : null
				] }),
				canType && !revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						submitTyped();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						ref: inputRef,
						value: fill,
						onChange: (e) => setFill(e.target.value),
						placeholder: q.typedHint ?? "Điền đáp án",
						autoComplete: "off",
						autoCapitalize: "off",
						autoCorrect: "off",
						spellCheck: false
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "OK"
					})]
				}) : null,
				typedOk === true ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-forest",
					children: "Đúng — khớp với phần gõ."
				}) : null,
				typedOk === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-seal",
					children: "Chưa khớp. Đáp án đúng được tô xanh."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2",
					children: q.options.map((o, idx) => {
						const meaning = (q.optionMeanings?.[idx] ?? "").trim();
						const romaji = (q.optionRomaji?.[idx] ?? "").trim();
						const showM = showMeaning && meaning && !similarAnswer(meaning, o);
						const showR = showRomaji && romaji && romaji !== o && !similarAnswer(romaji, o);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
							state: choiceState({
								revealed,
								isAnswer: idx === q.answer,
								picked: picked === idx
							}),
							disabled: revealed,
							onClick: () => choose(idx),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex min-w-0 flex-col items-start gap-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChoiceKana, { children: [
										String.fromCharCode(65 + idx),
										". ",
										o
									] }),
									showR ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRomaji, { children: romaji }) : null,
									showM ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-normal text-muted",
										children: meaning
									}) : null
								]
							})
						}, o + idx);
					})
				}),
				revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: q.explain
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: onNext,
						children: nextLabel ?? (endless ? "Câu tiếp" : index + 1 >= total ? "Xem điểm" : "Câu tiếp")
					})]
				}) : null
			]
		})
	});
}
function shuffle(arr, rand = Math.random) {
	return uniqueShuffle(arr, rand);
}
function pickWrong(pool, correct, n, key, rand = Math.random) {
	const ck = key(correct);
	const seen = /* @__PURE__ */ new Set([ck]);
	const out = [];
	const ranked = shuffle(pool.filter((x) => key(x) !== ck), rand);
	for (const x of ranked) {
		const k = key(x);
		if (!k || seen.has(k) || similarAnswer(k, ck)) continue;
		if (out.some((o) => similarAnswer(key(o), k))) continue;
		seen.add(k);
		out.push(x);
		if (out.length >= n) break;
	}
	if (out.length < n) for (const x of ranked) {
		const k = key(x);
		if (!k || seen.has(k)) continue;
		seen.add(k);
		out.push(x);
		if (out.length >= n) break;
	}
	return out;
}
function pickOne(pool, used, idOf, rand) {
	const fresh = pool.filter((x) => {
		const key = idOf(x);
		if (used.has(key)) return false;
		const src = key.includes(":") ? key.slice(key.indexOf(":") + 1) : key;
		if (used.has(`src:${src}`)) return false;
		return true;
	});
	if (!fresh.length) return null;
	return fresh[Math.floor(rand() * fresh.length)] ?? null;
}
function mulberry32(seed) {
	return function rand() {
		let t = seed += 1831565813;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function dateSeed(date) {
	let h = 2166136261;
	for (const ch of date) {
		h ^= ch.charCodeAt(0);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function kanjiSpeak(c) {
	return (c.kunyomi[0] || "").replace(/[-.]/g, "") || toHiragana(c.onyomi[0] ?? "") || c.character;
}
function qid(kind, source, rand) {
	return `q-${kind}-${source}-${Math.floor(rand() * 1e9).toString(36)}`;
}
var PARTICLE_MEANING = {
	は: "chủ đề",
	を: "tân ngữ",
	へ: "hướng tới",
	で: "nơi / phương tiện",
	が: "chủ ngữ",
	に: "thời điểm / đích",
	と: "cùng với",
	も: "cũng",
	まで: "đến tận",
	から: "từ",
	や: "liệt kê (và…)"
};
function kanjiGloss(k) {
	return [k.han_viet, k.meaning_vi].filter(Boolean).join(" · ");
}
function packOptions(opts, label, extra) {
	return {
		options: opts.map(label),
		optionMeanings: extra?.meaning ? opts.map((x) => extra.meaning(x)) : void 0,
		optionRomaji: extra?.romaji ? opts.map((x) => extra.romaji(x)) : void 0
	};
}
var PARTICLES = [
	{
		blank: "わたし____学生です。",
		options: [
			"は",
			"を",
			"へ",
			"と"
		],
		answer: "は",
		explain: "は đánh dấu chủ đề: tôi thì là học sinh.",
		speak: "わたしはがくせいです。"
	},
	{
		blank: "パン____食べます。",
		options: [
			"を",
			"に",
			"で",
			"が"
		],
		answer: "を",
		explain: "を đánh dấu tân ngữ của động từ tha.",
		speak: "パンをたべます。"
	},
	{
		blank: "学校____行きます。",
		options: [
			"へ",
			"を",
			"と",
			"も"
		],
		answer: "へ",
		explain: "へ chỉ hướng đi tới.",
		speak: "がっこうへいきます。"
	},
	{
		blank: "図書館____本を読みます。",
		options: [
			"で",
			"を",
			"へ",
			"と"
		],
		answer: "で",
		explain: "で chỉ nơi diễn ra hành động.",
		speak: "としょかんでほんをよみます。"
	},
	{
		blank: "七時____起きます。",
		options: [
			"に",
			"を",
			"へ",
			"と"
		],
		answer: "に",
		explain: "に chỉ thời điểm.",
		speak: "しちじにおきます。"
	},
	{
		blank: "友達____話します。",
		options: [
			"と",
			"を",
			"へ",
			"で"
		],
		answer: "と",
		explain: "と nghĩa là cùng với.",
		speak: "ともだちとはなします。"
	},
	{
		blank: "水____ありますか。",
		options: [
			"が",
			"を",
			"へ",
			"で"
		],
		answer: "が",
		explain: "が đánh dấu chủ ngữ tồn tại / nhấn mạnh.",
		speak: "みずがありますか。"
	},
	{
		blank: "これ____えんぴつです。",
		options: [
			"は",
			"を",
			"へ",
			"で"
		],
		answer: "は",
		explain: "は: đây thì là bút chì.",
		speak: "これはえんぴつです。"
	},
	{
		blank: "駅____歩きます。",
		options: [
			"まで",
			"を",
			"が",
			"も"
		],
		answer: "まで",
		explain: "まで: đến tận nhà ga.",
		speak: "えきまであるきます。"
	},
	{
		blank: "バス____来ます。",
		options: [
			"が",
			"を",
			"へ",
			"で"
		],
		answer: "が",
		explain: "が đánh dấu chủ ngữ của 来ます.",
		speak: "バスがきます。"
	},
	{
		blank: "日本____来ました。",
		options: [
			"から",
			"を",
			"へ",
			"と"
		],
		answer: "から",
		explain: "から: từ Nhật Bản đến.",
		speak: "にほんからきました。"
	},
	{
		blank: "コーヒー____お茶を飲みます。",
		options: [
			"や",
			"を",
			"に",
			"で"
		],
		answer: "や",
		explain: "や liệt kê không đầy đủ: cà phê và trà…",
		speak: "コーヒーやおちゃをのみます。"
	},
	{
		blank: "毎日日本語____勉強します。",
		options: [
			"を",
			"に",
			"が",
			"へ"
		],
		answer: "を",
		explain: "を: học tiếng Nhật (tân ngữ).",
		speak: "まいにちにほんごをべんきょうします。"
	},
	{
		blank: "うち____帰ります。",
		options: [
			"へ",
			"を",
			"が",
			"と"
		],
		answer: "へ",
		explain: "へ: về nhà (hướng).",
		speak: "うちへかえります。"
	},
	{
		blank: "はし____食べます。",
		options: [
			"で",
			"を",
			"に",
			"へ"
		],
		answer: "で",
		explain: "で: dùng đũa để ăn (phương tiện).",
		speak: "はしでたべます。"
	},
	{
		blank: "猫____好きです。",
		options: [
			"が",
			"を",
			"へ",
			"で"
		],
		answer: "が",
		explain: "が với 好き: thích mèo.",
		speak: "ねこがすきです。"
	},
	{
		blank: "あした____テストがあります。",
		options: [
			"は",
			"を",
			"へ",
			"と"
		],
		answer: "は",
		explain: "は đánh dấu chủ đề thời gian: còn ngày mai thì…",
		speak: "あしたはテストがあります。"
	},
	{
		blank: "先生____もらいました。",
		options: [
			"に",
			"を",
			"へ",
			"が"
		],
		answer: "に",
		explain: "に: nhận từ thầy/cô.",
		speak: "せんせいにもらいました。"
	},
	{
		blank: "車____乗ります。",
		options: [
			"に",
			"を",
			"へ",
			"と"
		],
		answer: "に",
		explain: "に: lên xe / ngồi vào xe.",
		speak: "くるまにのります。"
	},
	{
		blank: "兄弟____いません。",
		options: [
			"は",
			"を",
			"へ",
			"で"
		],
		answer: "は",
		explain: "は + いません: không có anh chị em.",
		speak: "きょうだいはいません。"
	}
];
var MIX_KINDS = [
	"hira-romaji",
	"romaji-hira",
	"kata-romaji",
	"vocab-meaning",
	"meaning-vocab",
	"kanji",
	"kanji-read",
	"listen-kanji",
	"grammar",
	"listen",
	"listen-vocab",
	"particle",
	"radical",
	"vocab-kana",
	"type-romaji",
	"cloze"
];
function pools(kanjiLevel = "core", opts = {}) {
	const hiraAll = HIRAGANA.filter((k) => k.group === "gojuon" || k.group === "dakuten" || k.group === "handakuten" || k.group === "yoon");
	const kataAll = KATAKANA.filter((k) => k.group === "gojuon" || k.group === "dakuten" || k.group === "handakuten" || k.group === "yoon");
	const hira = opts.kanaGroup === "gojuon" ? hiraAll.filter((k) => k.group === "gojuon") : hiraAll;
	const kata = opts.kanaGroup === "gojuon" ? kataAll.filter((k) => k.group === "gojuon") : kataAll;
	const vocab = opts.vocabLevel === "N5" ? [...VOCAB_N5] : opts.vocabLevel === "N4" ? [...VOCAB_N4] : [...VOCAB_N5, ...VOCAB_N4];
	const all = allKanji();
	return {
		hira,
		kata,
		vocab,
		kanji: kanjiLevel === "all" ? all : kanjiLevel === "core" ? practiceKanji() : all.filter((k) => k.level === kanjiLevel),
		grammar: opts.grammarLevel === "N5" ? [...GRAMMAR_N5] : opts.grammarLevel === "N4" ? [...GRAMMAR_N4] : [...GRAMMAR_N5, ...GRAMMAR_N4]
	};
}
function buildOne(kind, used, rand, kanjiLevel = "core", poolOpts = {}) {
	const { hira, kata, vocab, kanji, grammar } = pools(kind === "mix" ? "core" : kanjiLevel, poolOpts);
	const vocabFocus = (() => {
		if (!poolOpts.focusIds?.length) return vocab;
		const set = new Set(poolOpts.focusIds);
		const hit = vocab.filter((v) => set.has(v.id));
		return hit.length ? hit : vocab;
	})();
	const kanjiFocus = (() => {
		if (!poolOpts.focusKanjiIds?.length) return kanji;
		const set = new Set(poolOpts.focusKanjiIds);
		const hit = kanji.filter((k) => set.has(k.id));
		return hit.length ? hit : kanji;
	})();
	const mark = (sourceId) => {
		used.add(`${kind}:${sourceId}`);
		used.add(`src:${sourceId}`);
	};
	if (kind === "hira-romaji" || kind === "kata-romaji") {
		const pool = kind === "hira-romaji" ? hira : kata;
		const c = pickOne(pool, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const opts = shuffle([c, ...pickWrong(pool, c, 3, (x) => x.romaji, rand)], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: `${c.char} đọc là?`,
			promptJp: c.char,
			speak: c.char,
			options: opts.map((o) => o.romaji),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.char} · ${c.romaji}`,
			typedAnswers: [c.romaji],
			typedHint: "Gõ romaji"
		};
	}
	if (kind === "romaji-hira") {
		const c = pickOne(hira, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const opts = shuffle([c, ...pickWrong(hira, c, 3, (x) => x.char, rand)], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: `"${c.romaji}" là chữ nào?`,
			speak: c.char,
			...packOptions(opts, (o) => o.char, { romaji: (o) => o.romaji }),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.romaji} = ${c.char}`
		};
	}
	if (kind === "listen") {
		const c = pickOne(hira, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const opts = shuffle([c, ...pickWrong(hira, c, 3, (x) => x.char, rand)], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: "Nghe và chọn chữ",
			speak: c.char,
			...packOptions(opts, (o) => o.char, { romaji: (o) => o.romaji }),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `Bạn nghe ${c.char} (${c.romaji}).`
		};
	}
	if (kind === "listen-vocab") {
		const c = pickOne(vocabFocus, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const opts = shuffle([c, ...pickWrong(vocab, c, 3, (x) => x.meaning_vi, rand)], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: "Nghe từ và chọn nghĩa",
			speak: c.kana,
			options: opts.map((o) => o.meaning_vi),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.word} · ${c.kana} · ${c.romaji}: ${c.meaning_vi}.`
		};
	}
	if (kind === "kanji") {
		const c = pickOne(kanjiFocus, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const speak = kanjiSpeak(c);
		const opts = shuffle([c, ...pickWrong(kanji, c, 3, (x) => x.meaning_vi, rand)], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: `${c.character} nghĩa là?`,
			promptJp: c.character,
			speak,
			...packOptions(opts, (o) => o.meaning_vi, { meaning: (o) => o.han_viet }),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.character} · Hán-Việt ${c.han_viet || "—"} · ${c.meaning_vi}. Kun ${c.kunyomi.join(" / ") || "—"} · on ${c.onyomi.map((o) => `${o} (${kanaToRomaji(o)})`).join(" / ")}.`,
			typedAnswers: [...meaningParts(c.meaning_vi), c.han_viet].filter(Boolean),
			typedHint: "Gõ nghĩa tiếng Việt"
		};
	}
	if (kind === "kanji-read") {
		const c = pickOne(kanjiFocus, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const reading = kanjiSpeak(c);
		const romaji = kanaToRomaji(reading);
		const opts = shuffle([c, ...pickWrong(kanji, c, 3, (x) => kanjiSpeak(x), rand)], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: `${c.character} đọc là? (hiragana / romaji)`,
			promptJp: c.character,
			speak: reading,
			...packOptions(opts, (o) => kanjiSpeak(o), {
				romaji: (o) => kanaToRomaji(kanjiSpeak(o)),
				meaning: (o) => kanjiGloss(o)
			}),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.character} · Hán-Việt ${c.han_viet || "—"} · kun ${c.kunyomi.join(" / ") || "—"} · on ${c.onyomi.join(" / ")} (${c.onyomi.map(kanaToRomaji).join(", ")}).`,
			typedAnswers: [
				reading,
				romaji,
				...c.kunyomi,
				...c.onyomi.map(toHiragana)
			].filter(Boolean),
			typedHint: "Gõ hiragana hoặc romaji"
		};
	}
	if (kind === "listen-kanji") {
		const c = pickOne(kanjiFocus, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const speak = kanjiSpeak(c);
		const opts = shuffle([c, ...pickWrong(kanji, c, 3, (x) => x.character, rand)], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: "Nghe cách đọc (hiragana), chọn kanji",
			speak,
			...packOptions(opts, (o) => o.character, {
				meaning: (o) => kanjiGloss(o),
				romaji: (o) => kanaToRomaji(kanjiSpeak(o))
			}),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `Nghe ${speak} (${kanaToRomaji(speak)}) → ${c.character} (${c.han_viet || c.meaning_vi}). On ${c.onyomi.join("/")} · kun ${c.kunyomi.join("/") || "—"}.`
		};
	}
	if (kind === "grammar") {
		const c = pickOne(grammar, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const opts = shuffle([c, ...pickWrong(grammar, c, 3, (x) => x.meaning_vi, rand)], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: `${c.name} dùng để?`,
			promptJp: c.name,
			options: opts.map((o) => o.meaning_vi),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.name}: ${c.meaning_vi}. ${c.structure}`
		};
	}
	if (kind === "particle") {
		const c = pickOne(PARTICLES, used, (x) => `${kind}:${x.blank}`, rand);
		if (!c) return null;
		mark(c.blank);
		const opts = shuffle(c.options, rand);
		return {
			id: qid(kind, c.blank, rand),
			kind,
			sourceId: c.blank,
			prompt: "Chọn trợ từ đúng",
			promptJp: c.blank,
			speak: c.speak,
			options: opts,
			optionMeanings: opts.map((p) => PARTICLE_MEANING[p] ?? ""),
			answer: opts.findIndex((o) => o === c.answer),
			explain: c.explain
		};
	}
	if (kind === "radical") {
		const pool = learnRadicals();
		const c = pickOne(pool, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const opts = shuffle([c, ...pickWrong(pool, c, 3, (x) => `${x.han_viet} · ${x.meaning_vi}`, rand)], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: `${c.char} là bộ gì?`,
			promptJp: c.char,
			speak: c.name_kana,
			...packOptions(opts, (o) => `${o.han_viet} · ${o.meaning_vi}`, { romaji: (o) => `${o.name_kana} · ${kanaToRomaji(o.name_kana)}` }),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.char} · ${c.han_viet} · ${c.name_kana} (${kanaToRomaji(c.name_kana)}) · ${c.meaning_vi}. ${c.hint}`,
			typedAnswers: [
				c.han_viet,
				c.name_kana,
				c.meaning_vi,
				kanaToRomaji(c.name_kana)
			].filter(Boolean),
			typedHint: "Gõ Hán-Việt hoặc tên bộ"
		};
	}
	if (kind === "meaning-vocab") {
		const c = pickOne(vocabFocus, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const opts = shuffle([c, ...pickWrong(vocab, c, 3, (x) => x.word, rand)], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: `"${c.meaning_vi}" = ?`,
			speak: c.kana,
			...packOptions(opts, (o) => o.word === o.kana ? o.word : `${o.word} · ${o.kana}`, {
				meaning: (o) => o.meaning_vi,
				romaji: (o) => o.romaji
			}),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.meaning_vi} là ${c.word} (${c.kana}, ${c.romaji}).`,
			typedAnswers: [
				c.romaji,
				c.kana,
				c.word
			],
			typedHint: "Gõ từ (romaji / kana)"
		};
	}
	if (kind === "vocab-kana") {
		const c = pickOne(vocabFocus, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const opts = shuffle([c, ...pickWrong(vocab, c, 3, (x) => x.kana, rand)], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: `${c.word} đọc (kana) là?`,
			promptJp: c.word,
			speak: c.kana,
			...packOptions(opts, (o) => o.kana, {
				meaning: (o) => o.meaning_vi,
				romaji: (o) => o.romaji
			}),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.word} = ${c.kana} (${c.romaji}).`,
			typedAnswers: [c.kana, c.romaji],
			typedHint: "Gõ kana hoặc romaji"
		};
	}
	if (kind === "type-romaji") {
		const bag = rand() < .45 ? hira : rand() < .7 ? vocab : kanji;
		if (bag === hira) {
			const c = pickOne(hira, used, (x) => `${kind}:${x.id}`, rand);
			if (!c) return null;
			mark(c.id);
			const opts = shuffle([c, ...pickWrong(hira, c, 3, (x) => x.romaji, rand)], rand);
			return {
				id: qid(kind, c.id, rand),
				kind,
				sourceId: c.id,
				prompt: "Gõ romaji của chữ này",
				promptJp: c.char,
				speak: c.char,
				options: opts.map((o) => o.romaji),
				answer: opts.findIndex((o) => o.id === c.id),
				explain: `${c.char} · ${c.romaji}`,
				typedAnswers: [c.romaji],
				typedHint: "Gõ romaji rồi Enter"
			};
		}
		if (bag === vocab) {
			const c = pickOne(vocabFocus, used, (x) => `${kind}:${x.id}`, rand);
			if (!c) return null;
			mark(c.id);
			const opts = shuffle([c, ...pickWrong(vocab, c, 3, (x) => x.romaji, rand)], rand);
			return {
				id: qid(kind, c.id, rand),
				kind,
				sourceId: c.id,
				prompt: "Gõ romaji của từ này",
				promptJp: c.word,
				speak: c.kana,
				...packOptions(opts, (o) => o.romaji, { meaning: (o) => o.meaning_vi }),
				answer: opts.findIndex((o) => o.id === c.id),
				explain: `${c.word} · ${c.kana} · ${c.romaji}`,
				typedAnswers: [c.romaji, c.kana],
				typedHint: "Gõ romaji"
			};
		}
		const c = pickOne(kanjiFocus, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const reading = kanjiSpeak(c);
		const romaji = kanaToRomaji(reading);
		const opts = shuffle([c, ...pickWrong(kanji, c, 3, (x) => kanaToRomaji(kanjiSpeak(x)), rand)], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: "Gõ romaji cách đọc kanji",
			promptJp: c.character,
			speak: reading,
			...packOptions(opts, (o) => kanaToRomaji(kanjiSpeak(o)), { meaning: (o) => kanjiGloss(o) }),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.character} · Hán-Việt ${c.han_viet || "—"} · ${reading} · ${romaji}`,
			typedAnswers: [
				romaji,
				reading,
				...c.kunyomi
			],
			typedHint: "Gõ romaji hoặc hiragana"
		};
	}
	if (kind === "cloze") {
		const c = pickOne(vocabFocus.filter((v) => v.example_sentence.includes(v.word) || v.example_sentence.includes(v.kana)), used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const blank = c.example_sentence.includes(c.word) ? c.example_sentence.replace(c.word, "____") : c.example_sentence.replace(c.kana, "____");
		const opts = shuffle([c, ...pickWrong(vocab, c, 3, (x) => x.word, rand)], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: "Điền từ vào chỗ trống",
			promptJp: blank,
			speak: c.example_kana || c.kana,
			...packOptions(opts, (o) => o.word === o.kana ? o.word : `${o.word} · ${o.kana}`, {
				meaning: (o) => o.meaning_vi,
				romaji: (o) => o.romaji
			}),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.example_sentence} — ${c.example_meaning_vi}`,
			typedAnswers: [
				c.word,
				c.kana,
				c.romaji
			],
			typedHint: "Gõ từ còn thiếu"
		};
	}
	const c = pickOne(vocabFocus, used, (x) => `vocab-meaning:${x.id}`, rand);
	if (!c) return null;
	used.add(`vocab-meaning:${c.id}`);
	const opts = shuffle([c, ...pickWrong(vocab, c, 3, (x) => x.meaning_vi, rand)], rand);
	return {
		id: qid("vocab-meaning", c.id, rand),
		kind: "vocab-meaning",
		sourceId: c.id,
		prompt: `${c.word} nghĩa là?`,
		promptJp: c.word,
		speak: c.kana,
		options: opts.map((o) => o.meaning_vi),
		answer: opts.findIndex((o) => o.id === c.id),
		explain: `${c.word} (${c.kana}, ${c.romaji}): ${c.meaning_vi}.`,
		typedAnswers: meaningParts(c.meaning_vi),
		typedHint: "Gõ nghĩa tiếng Việt"
	};
}
function nextFromKinds(kinds, used, rand, kanjiLevel, poolOpts = {}) {
	for (let pass = 0; pass < 2; pass++) {
		const remaining = kinds.filter((k) => !used.has(`mixkind:${k}`));
		const order = shuffle(remaining.length ? remaining : kinds, rand);
		if (!remaining.length) {
			for (const key of [...used]) if (key.startsWith("mixkind:")) used.delete(key);
		}
		for (const k of order) {
			const q = buildOne(k, used, rand, kanjiLevel, poolOpts);
			if (q) {
				used.add(`mixkind:${k}`);
				return q;
			}
		}
		for (const key of [...used]) if (key.startsWith("src:") || key.startsWith("mixkind:")) used.delete(key);
	}
	return buildOne(shuffle(kinds, rand)[0] ?? "vocab-meaning", used, rand, kanjiLevel, poolOpts);
}
function nextQuestion(kind, used, rand = Math.random, kanjiLevel = "core") {
	if (kind === "mix") return nextFromKinds(MIX_KINDS, used, rand, "core");
	const q = buildOne(kind, used, rand, kanjiLevel);
	if (q) return q;
	const stale = [...used].filter((k) => k.startsWith(`${kind}:`) || k.startsWith("src:"));
	for (const k of stale) used.delete(k);
	return buildOne(kind, used, rand, kanjiLevel);
}
function makeQuiz(kind, count = 10, rand = Math.random, kanjiLevel = "core") {
	return makeFromKinds(kind === "mix" ? MIX_KINDS : [kind], count, rand, kanjiLevel);
}
function makeFromKinds(kinds, count, rand = Math.random, kanjiLevel = "core", poolOpts = {}) {
	const used = /* @__PURE__ */ new Set();
	const out = [];
	let guard = 0;
	while (out.length < count && guard++ < count * 20) {
		const q = nextFromKinds(kinds, used, rand, kanjiLevel, poolOpts);
		if (!q) break;
		if (out.some((prev) => questionsClash(prev, q))) continue;
		out.push(q);
	}
	return out;
}
function makeDailyQuiz(date, count = 15) {
	return makeQuiz("mix", count, mulberry32(dateSeed(date)));
}
var DAILY_VOCAB_KINDS = [
	"vocab-meaning",
	"meaning-vocab",
	"listen-vocab",
	"vocab-kana",
	"cloze"
];
function makeDailyVocabQuiz(ids, date, count = ids.length) {
	return makeFromKinds(DAILY_VOCAB_KINDS, count, mulberry32(dateSeed(`${date}-vocab`)), "core", {
		vocabLevel: "both",
		focusIds: ids
	});
}
var DAILY_KANJI_KINDS = [
	"kanji",
	"kanji-read",
	"listen-kanji"
];
function makeDailyKanjiQuiz(ids, date, count = ids.length) {
	return makeFromKinds(DAILY_KANJI_KINDS, count, mulberry32(dateSeed(`${date}-kanji`)), "all", { focusKanjiIds: ids });
}
//#endregion
export { makeFromKinds as a, makeDailyVocabQuiz as i, makeDailyKanjiQuiz as n, makeQuiz as o, makeDailyQuiz as r, nextQuestion as s, QuizCard as t };
