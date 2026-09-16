import { o as __toESM } from "../_runtime.mjs";
import { E as require_react, T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as KANJI_N5, t as KANJI_N4 } from "./kanji-n4-Bq9tkueZ.mjs";
import { n as GRAMMAR_N5, t as GRAMMAR_N4 } from "./grammar-n4-Dv0a1spF.mjs";
import { t as VOCAB_N5 } from "./vocabulary-n5-DDorjkhE.mjs";
import { t as VOCAB_N4 } from "./vocabulary-n4-CVIZPi7y.mjs";
import { n as KATAKANA, t as HIRAGANA } from "./kana-CV-aAiLY.mjs";
import { r as normalizeRomaji } from "./romaji-BCVeKQ98.mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { t as Input } from "./input-qD8XPiq5.mjs";
import { n as Volume2 } from "../_libs/lucide-react.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { n as speakJapanese, t as SpeakButton } from "./speak-button-D1RceTHQ.mjs";
import { n as toHiragana, t as kanaToRomaji } from "./kana-util-DgSJpVDG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz-engine-BW4Q0xlY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuizCard({ q, index, total, score, fillKind, onAnswer, onNext }) {
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [fill, setFill] = (0, import_react.useState)("");
	const autoPlay = useSettings((s) => s.autoPlayAudio);
	const rate = useSettings((s) => s.ttsRate);
	const listenOnly = Boolean(q.speak) && !q.promptJp;
	const revealed = picked !== null;
	(0, import_react.useEffect)(() => {
		if (autoPlay && q.speak) speakJapanese(q.speak, rate);
	}, [
		autoPlay,
		q.speak,
		rate
	]);
	function choose(idx) {
		if (picked !== null) return;
		setPicked(idx);
		onAnswer(idx === q.answer, idx);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "mx-auto max-w-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs tabular-nums text-muted",
					children: [
						"Câu ",
						index + 1,
						"/",
						total,
						" · đúng ",
						score
					]
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
				fillKind ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						const idx = q.options.findIndex((o) => normalizeRomaji(o) === normalizeRomaji(fill));
						choose(idx >= 0 ? idx : -1);
						setFill("");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: fill,
						onChange: (e) => setFill(e.target.value),
						placeholder: "Điền romaji",
						autoComplete: "off"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "OK"
					})]
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
						children: index + 1 >= total ? "Xem điểm" : "Câu tiếp"
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
	}
];
function makeQuiz(kind, count = 10, rand = Math.random) {
	if (kind === "mix") {
		const kinds = [
			"hira-romaji",
			"kata-romaji",
			"vocab-meaning",
			"meaning-vocab",
			"kanji",
			"kanji-read",
			"listen-kanji",
			"grammar",
			"listen",
			"listen-vocab",
			"particle"
		];
		const out = [];
		const per = Math.max(1, Math.ceil(count / kinds.length));
		for (const k of kinds) out.push(...makeQuiz(k, per, rand));
		return shuffle(out, rand).slice(0, count);
	}
	const hira = HIRAGANA.filter((k) => k.group === "gojuon");
	const kata = KATAKANA.filter((k) => k.group === "gojuon");
	const vocab = [...VOCAB_N5, ...VOCAB_N4];
	const kanji = [...KANJI_N5, ...KANJI_N4];
	const grammar = [...GRAMMAR_N5, ...GRAMMAR_N4];
	if (kind === "hira-romaji" || kind === "kata-romaji") {
		const pool = kind === "hira-romaji" ? hira : kata;
		return shuffle(pool, rand).slice(0, count).map((c) => {
			const opts = shuffle([c, ...pickWrong(pool, c, 3, (x) => x.romaji, rand)], rand);
			return {
				id: `q-${c.id}`,
				kind,
				prompt: `${c.char} đọc là?`,
				promptJp: c.char,
				speak: c.char,
				options: opts.map((o) => o.romaji),
				answer: opts.findIndex((o) => o.id === c.id),
				explain: `${c.char} · ${c.romaji}`
			};
		});
	}
	if (kind === "romaji-hira") return shuffle(hira, rand).slice(0, count).map((c) => {
		const opts = shuffle([c, ...pickWrong(hira, c, 3, (x) => x.char, rand)], rand);
		return {
			id: `q-r-${c.id}`,
			kind,
			prompt: `"${c.romaji}" là chữ nào?`,
			speak: c.char,
			options: opts.map((o) => o.char),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.romaji} = ${c.char}`
		};
	});
	if (kind === "listen") return shuffle(hira, rand).slice(0, count).map((c) => {
		const opts = shuffle([c, ...pickWrong(hira, c, 3, (x) => x.char, rand)], rand);
		return {
			id: `q-l-${c.id}`,
			kind,
			prompt: "Nghe và chọn chữ",
			speak: c.char,
			options: opts.map((o) => `${o.char} · ${o.romaji}`),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `Bạn nghe ${c.char} (${c.romaji}).`
		};
	});
	if (kind === "listen-vocab") {
		const pool = VOCAB_N5;
		return shuffle(pool, rand).slice(0, count).map((c) => {
			const opts = shuffle([c, ...pickWrong(pool, c, 3, (x) => x.meaning_vi, rand)], rand);
			return {
				id: `q-lv-${c.id}`,
				kind,
				prompt: "Nghe từ và chọn nghĩa",
				speak: c.kana,
				options: opts.map((o) => o.meaning_vi),
				answer: opts.findIndex((o) => o.id === c.id),
				explain: `${c.word} · ${c.kana} · ${c.romaji}: ${c.meaning_vi}.`
			};
		});
	}
	if (kind === "kanji") return shuffle(kanji, rand).slice(0, count).map((c) => {
		const speak = kanjiSpeak(c);
		const opts = shuffle([c, ...pickWrong(kanji, c, 3, (x) => x.meaning_vi, rand)], rand);
		return {
			id: `q-${c.id}`,
			kind,
			prompt: `${c.character} nghĩa là?`,
			promptJp: c.character,
			speak,
			options: opts.map((o) => o.meaning_vi),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.character} · ${c.meaning_vi}. Kun ${c.kunyomi.join(" / ") || "—"} · on ${c.onyomi.map((o) => `${o} (${kanaToRomaji(o)})`).join(" / ")}.`
		};
	});
	if (kind === "kanji-read") return shuffle(kanji, rand).slice(0, count).map((c) => {
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
			id: `q-kr-${c.id}`,
			kind,
			prompt: `${c.character} đọc là? (hiragana / romaji)`,
			promptJp: c.character,
			speak: reading,
			options: opts.map((o) => o.label),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.character} · kun ${c.kunyomi.join(" / ") || "—"} · on ${c.onyomi.join(" / ")} (${c.onyomi.map(kanaToRomaji).join(", ")}).`
		};
	});
	if (kind === "listen-kanji") return shuffle(kanji, rand).slice(0, count).map((c) => {
		const speak = kanjiSpeak(c);
		const opts = shuffle([c, ...pickWrong(kanji, c, 3, (x) => x.character, rand)], rand);
		return {
			id: `q-lk-${c.id}`,
			kind,
			prompt: "Nghe cách đọc (hiragana), chọn kanji",
			speak,
			options: opts.map((o) => `${o.character} · ${o.meaning_vi}`),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `Nghe ${speak} (${kanaToRomaji(speak)}) → ${c.character}. On ${c.onyomi.join("/")} · kun ${c.kunyomi.join("/") || "—"}.`
		};
	});
	if (kind === "grammar") return shuffle(grammar, rand).slice(0, count).map((c) => {
		const opts = shuffle([c, ...pickWrong(grammar, c, 3, (x) => x.meaning_vi, rand)], rand);
		return {
			id: `q-${c.id}`,
			kind,
			prompt: `${c.name} dùng để?`,
			promptJp: c.name,
			options: opts.map((o) => o.meaning_vi),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.name}: ${c.meaning_vi}. ${c.structure}`
		};
	});
	if (kind === "particle") return shuffle(PARTICLES, rand).slice(0, count).map((c, i) => {
		const opts = shuffle(c.options, rand);
		return {
			id: `q-p-${i}-${c.answer}`,
			kind,
			prompt: "Chọn trợ từ đúng",
			promptJp: c.blank,
			speak: c.speak,
			options: opts,
			answer: opts.findIndex((o) => o === c.answer),
			explain: c.explain
		};
	});
	if (kind === "meaning-vocab") {
		const vpool = VOCAB_N5;
		return shuffle(vpool, rand).slice(0, count).map((c) => {
			const opts = shuffle([c, ...pickWrong(vpool, c, 3, (x) => x.word, rand)], rand);
			return {
				id: `q-mv-${c.id}`,
				kind,
				prompt: `"${c.meaning_vi}" = ?`,
				speak: c.kana,
				options: opts.map((o) => `${o.word} · ${o.kana}`),
				answer: opts.findIndex((o) => o.id === c.id),
				explain: `${c.meaning_vi} là ${c.word} (${c.kana}, ${c.romaji}).`
			};
		});
	}
	const vpool = vocab;
	return shuffle(vpool, rand).slice(0, count).map((c) => {
		const opts = shuffle([c, ...pickWrong(vpool, c, 3, (x) => x.meaning_vi, rand)], rand);
		return {
			id: `q-v-${c.id}`,
			kind: "vocab-meaning",
			prompt: `${c.word} nghĩa là?`,
			promptJp: c.word,
			speak: c.kana,
			options: opts.map((o) => o.meaning_vi),
			answer: opts.findIndex((o) => o.id === c.id),
			explain: `${c.word} (${c.kana}, ${c.romaji}): ${c.meaning_vi}.`
		};
	});
}
function makeDailyQuiz(date, count = 15) {
	return makeQuiz("mix", count, mulberry32(dateSeed(date)));
}
//#endregion
export { makeDailyQuiz as n, makeQuiz as r, QuizCard as t };
