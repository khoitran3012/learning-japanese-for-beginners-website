import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as KANJI_N5, t as KANJI_N4 } from "./kanji-n4-Bq9tkueZ.mjs";
import { n as GRAMMAR_N5, t as GRAMMAR_N4 } from "./grammar-n4-Dv0a1spF.mjs";
import { t as VOCAB_N5 } from "./vocabulary-n5-DDorjkhE.mjs";
import { t as VOCAB_N4 } from "./vocabulary-n4-CVIZPi7y.mjs";
import { n as KATAKANA, t as HIRAGANA } from "./kana-CV-aAiLY.mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { r as Volume2 } from "../_libs/lucide-react.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { t as Input } from "./input-qD8XPiq5.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { n as speakJapanese, t as SpeakButton } from "./speak-button-D1RceTHQ.mjs";
import { n as meaningParts, t as answersMatch } from "./answer-check-CQcGeaO2.mjs";
import { n as toHiragana, t as kanaToRomaji } from "./kana-util-DgSJpVDG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz-engine-C-NnLgjj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuizCard({ q, index, total, score, fillKind, onAnswer, onNext, nextLabel }) {
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [fill, setFill] = (0, import_react.useState)("");
	const [typedOk, setTypedOk] = (0, import_react.useState)(null);
	const inputRef = (0, import_react.useRef)(null);
	const autoPlay = useSettings((s) => s.autoPlayAudio);
	const rate = useSettings((s) => s.ttsRate);
	const listenOnly = Boolean(q.speak) && !q.promptJp;
	const revealed = picked !== null;
	const canType = Boolean(fillKind || q.typedAnswers && q.typedAnswers.length);
	const endless = total <= 0;
	(0, import_react.useEffect)(() => {
		if (autoPlay && q.speak) speakJapanese(q.speak, rate);
	}, [
		autoPlay,
		q.speak,
		rate
	]);
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tabular-nums text-muted",
					children: endless ? `Câu ${index + 1} · đúng ${score}` : `Câu ${index + 1}/${total} · đúng ${score}`
				}),
				listenOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-3 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-16 items-center justify-center rounded-full bg-bg-elevated text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-8" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-base font-medium",
							children: q.prompt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
							text: q.speak,
							label: "Nghe lại"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					q.promptJp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-jp text-5xl leading-none",
						children: q.promptJp
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn(q.promptJp ? "text-sm text-muted" : "text-lg font-medium"),
						children: q.prompt
					}),
					q.speak ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, { text: q.speak }) : null
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
					className: "text-sm text-success",
					children: "Đúng — khớp với phần gõ."
				}) : null,
				typedOk === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-danger",
					children: "Chưa khớp. Đáp án đúng được tô xanh."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2",
					children: q.options.map((o, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: picked === null ? "secondary" : idx === q.answer ? "success" : picked === idx ? "danger" : "secondary",
						className: "h-auto justify-start py-3 font-jp",
						onClick: () => choose(idx),
						children: [
							String.fromCharCode(65 + idx),
							". ",
							o
						]
					}, o + idx))
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
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
function pickWrong(pool, correct, n, key, rand = Math.random) {
	const ck = key(correct);
	return shuffle(pool.filter((x) => key(x) !== ck), rand).slice(0, n);
}
function pickOne(pool, used, idOf, rand) {
	const fresh = pool.filter((x) => !used.has(idOf(x)));
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
	return c.kunyomi[0] || toHiragana(c.onyomi[0] ?? "") || c.character;
}
function qid(kind, source, rand) {
	return `q-${kind}-${source}-${Math.floor(rand() * 1e9).toString(36)}`;
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
	"vocab-kana",
	"type-romaji",
	"cloze"
];
function pools() {
	return {
		hira: HIRAGANA.filter((k) => k.group === "gojuon" || k.group === "dakuten" || k.group === "handakuten" || k.group === "yoon"),
		kata: KATAKANA.filter((k) => k.group === "gojuon" || k.group === "dakuten" || k.group === "handakuten" || k.group === "yoon"),
		vocab: [...VOCAB_N5, ...VOCAB_N4],
		kanji: [...KANJI_N5, ...KANJI_N4],
		grammar: [...GRAMMAR_N5, ...GRAMMAR_N4]
	};
}
function buildOne(kind, used, rand) {
	const { hira, kata, vocab, kanji, grammar } = pools();
	const mark = (sourceId) => used.add(`${kind}:${sourceId}`);
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
			options: opts.map((o) => o.char),
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
			options: opts.map((o) => `${o.char} · ${o.romaji}`),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `Bạn nghe ${c.char} (${c.romaji}).`
		};
	}
	if (kind === "listen-vocab") {
		const pool = vocab;
		const c = pickOne(pool, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const opts = shuffle([c, ...pickWrong(pool, c, 3, (x) => x.meaning_vi, rand)], rand);
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
		const c = pickOne(kanji, used, (x) => `${kind}:${x.id}`, rand);
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
			options: opts.map((o) => o.meaning_vi),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.character} · ${c.meaning_vi}. Kun ${c.kunyomi.join(" / ") || "—"} · on ${c.onyomi.map((o) => `${o} (${kanaToRomaji(o)})`).join(" / ")}.`,
			typedAnswers: meaningParts(c.meaning_vi),
			typedHint: "Gõ nghĩa tiếng Việt"
		};
	}
	if (kind === "kanji-read") {
		const c = pickOne(kanji, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const reading = kanjiSpeak(c);
		const romaji = kanaToRomaji(reading);
		const pool = kanji.map((k) => {
			const r = kanjiSpeak(k);
			return {
				id: k.id,
				label: `${r} · ${kanaToRomaji(r)}`
			};
		}).filter((x) => x.label);
		const correct = {
			id: c.id,
			label: `${reading} · ${romaji}`
		};
		const opts = shuffle([correct, ...pickWrong(pool, correct, 3, (x) => x.label, rand)], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: `${c.character} đọc là? (hiragana / romaji)`,
			promptJp: c.character,
			speak: reading,
			options: opts.map((o) => o.label),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.character} · kun ${c.kunyomi.join(" / ") || "—"} · on ${c.onyomi.join(" / ")} (${c.onyomi.map(kanaToRomaji).join(", ")}).`,
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
		const c = pickOne(kanji, used, (x) => `${kind}:${x.id}`, rand);
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
			options: opts.map((o) => `${o.character} · ${o.meaning_vi}`),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `Nghe ${speak} (${kanaToRomaji(speak)}) → ${c.character}. On ${c.onyomi.join("/")} · kun ${c.kunyomi.join("/") || "—"}.`
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
			answer: opts.findIndex((o) => o === c.answer),
			explain: c.explain
		};
	}
	if (kind === "meaning-vocab") {
		const c = pickOne(vocab, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const opts = shuffle([c, ...pickWrong(vocab, c, 3, (x) => x.word, rand)], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: `"${c.meaning_vi}" = ?`,
			speak: c.kana,
			options: opts.map((o) => `${o.word} · ${o.kana}`),
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
		const c = pickOne(vocab, used, (x) => `${kind}:${x.id}`, rand);
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
			options: opts.map((o) => `${o.kana} · ${o.romaji}`),
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
			const c = pickOne(vocab, used, (x) => `${kind}:${x.id}`, rand);
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
				options: opts.map((o) => o.romaji),
				answer: opts.findIndex((o) => o.id === c.id),
				explain: `${c.word} · ${c.kana} · ${c.romaji}`,
				typedAnswers: [c.romaji, c.kana],
				typedHint: "Gõ romaji"
			};
		}
		const c = pickOne(kanji, used, (x) => `${kind}:${x.id}`, rand);
		if (!c) return null;
		mark(c.id);
		const reading = kanjiSpeak(c);
		const romaji = kanaToRomaji(reading);
		const opts = shuffle([romaji, ...pickWrong(kanji, c, 3, (x) => kanaToRomaji(kanjiSpeak(x)), rand).map((k) => kanaToRomaji(kanjiSpeak(k)))], rand);
		return {
			id: qid(kind, c.id, rand),
			kind,
			sourceId: c.id,
			prompt: "Gõ romaji cách đọc kanji",
			promptJp: c.character,
			speak: reading,
			options: opts,
			answer: opts.findIndex((o) => o === romaji),
			explain: `${c.character} · ${reading} · ${romaji}`,
			typedAnswers: [
				romaji,
				reading,
				...c.kunyomi
			],
			typedHint: "Gõ romaji hoặc hiragana"
		};
	}
	if (kind === "cloze") {
		const c = pickOne(vocab.filter((v) => v.example_sentence.includes(v.word) || v.example_sentence.includes(v.kana)), used, (x) => `${kind}:${x.id}`, rand);
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
			options: opts.map((o) => `${o.word} · ${o.kana}`),
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
	const c = pickOne(vocab, used, (x) => `vocab-meaning:${x.id}`, rand);
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
function nextQuestion(kind, used, rand = Math.random) {
	if (kind === "mix") {
		const order = shuffle(MIX_KINDS, rand);
		for (const k of order) {
			const q = buildOne(k, used, rand);
			if (q) return q;
		}
		used.clear();
		return buildOne(shuffle(MIX_KINDS, rand)[0] ?? "vocab-meaning", used, rand);
	}
	const q = buildOne(kind, used, rand);
	if (q) return q;
	const stale = [...used].filter((k) => k.startsWith(`${kind}:`));
	for (const k of stale) used.delete(k);
	return buildOne(kind, used, rand);
}
function makeQuiz(kind, count = 10, rand = Math.random) {
	const used = /* @__PURE__ */ new Set();
	const out = [];
	let guard = 0;
	while (out.length < count && guard++ < count * 12) {
		const q = nextQuestion(kind, used, rand);
		if (!q) break;
		out.push(q);
	}
	return out;
}
function makeDailyQuiz(date, count = 15) {
	return makeQuiz("mix", count, mulberry32(dateSeed(date)));
}
//#endregion
export { makeDailyQuiz as n, nextQuestion as r, QuizCard as t };
