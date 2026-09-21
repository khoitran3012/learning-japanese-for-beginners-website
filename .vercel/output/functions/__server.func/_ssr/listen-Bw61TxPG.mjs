import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as VOCAB_N5 } from "./vocabulary-n5-DDorjkhE.mjs";
import { t as VOCAB_N4 } from "./vocabulary-n4-CVIZPi7y.mjs";
import { o as uid } from "./utils-D10sm1uC.mjs";
import { n as addQuizResult } from "./storage-BvOEP3N4.mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { t as useCurrentUser } from "./use-current-user-ClOiUQ-z.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-BQrBv4Tb.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { i as choiceState, r as ChoiceRow } from "./choice-row-ySbfq5TF.mjs";
import { a as ttsKana, i as stopSpeaking, n as isSpeakableKana, r as speakJapanese, t as SpeakButton } from "./speak-button-BcZ3hYwQ.mjs";
import { t as syncQuizToLeaderboard } from "./sync-score-CCFhBRl8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listen-Bw61TxPG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Sentence bank for listening: hear THIS utterance, pick its Vietnamese meaning. */
var LISTEN_SENTENCES = [
	{
		id: "ls-n5-01",
		title: "Hỏi giờ",
		level: "N5",
		jp: "今、何時ですか。",
		kana: "いま、なんじですか。",
		romaji: "Ima, nanji desu ka.",
		vi: "Bây giờ là mấy giờ?"
	},
	{
		id: "ls-n5-02",
		title: "Mời trà",
		level: "N5",
		jp: "お茶を飲みませんか。",
		kana: "おちゃをのみませんか。",
		romaji: "Ocha o nomimasen ka.",
		vi: "Bạn uống trà chứ?"
	},
	{
		id: "ls-n5-03",
		title: "Hỏi giá táo",
		level: "N5",
		jp: "このりんごはいくらですか。",
		kana: "このりんごはいくらですか。",
		romaji: "Kono ringo wa ikura desu ka.",
		vi: "Quả táo này bao nhiêu tiền?"
	},
	{
		id: "ls-n5-04",
		title: "Đến trường bằng gì",
		level: "N5",
		jp: "学校までどうやって行きますか。",
		kana: "がっこうまでどうやっていきますか。",
		romaji: "Gakkou made dou yatte ikimasu ka.",
		vi: "Bạn đến trường bằng cách nào?"
	},
	{
		id: "ls-n5-05",
		title: "Thời tiết ngày mai",
		level: "N5",
		jp: "明日の天気はどうですか。",
		kana: "あしたのてんきはどうですか。",
		romaji: "Ashita no tenki wa dou desu ka.",
		vi: "Thời tiết ngày mai thế nào?"
	},
	{
		id: "ls-n5-06",
		title: "Nhà vệ sinh ở đâu",
		level: "N5",
		jp: "すみません、トイレはどこですか。",
		kana: "すみません、トイレはどこですか。",
		romaji: "Sumimasen, toire wa doko desu ka.",
		vi: "Xin lỗi, nhà vệ sinh ở đâu?"
	},
	{
		id: "ls-n5-07",
		title: "Hỏi kanji",
		level: "N5",
		jp: "この漢字は何と読みますか。",
		kana: "このかんじはなんとよみますか。",
		romaji: "Kono kanji wa nan to yomimasu ka.",
		vi: "Kanji này đọc thế nào?"
	},
	{
		id: "ls-n5-08",
		title: "Gọi món",
		level: "N5",
		jp: "すみません、ラーメンを二つください。",
		kana: "すみません、ラーメンをふたつください。",
		romaji: "Sumimasen, raamen o futatsu kudasai.",
		vi: "Xin lỗi, cho tôi hai tô ramen."
	},
	{
		id: "ls-n5-09",
		title: "Hỏi đường",
		level: "N5",
		jp: "郵便局はどこですか。",
		kana: "ゆうびんきょくはどこですか。",
		romaji: "Yuubinkyoku wa doko desu ka.",
		vi: "Bưu điện ở đâu?"
	},
	{
		id: "ls-n5-10",
		title: "Xin nước",
		level: "N5",
		jp: "水、ください。",
		kana: "みず、ください。",
		romaji: "Mizu, kudasai.",
		vi: "Cho tôi nước."
	},
	{
		id: "ls-n5-11",
		title: "Núi Phú Sĩ",
		level: "N5",
		jp: "あの山は富士山です。",
		kana: "あのやまはふじさんです。",
		romaji: "Ano yama wa Fujisan desu.",
		vi: "Núi kia là núi Phú Sĩ."
	},
	{
		id: "ls-n5-12",
		title: "Người ở cửa",
		level: "N5",
		jp: "人が五人、入口にいます。",
		kana: "ひとがごにん、いりぐちにいます。",
		romaji: "Hito ga gonin, iriguchi ni imasu.",
		vi: "Có năm người ở cửa vào."
	},
	{
		id: "ls-n5-13",
		title: "Tôi là học sinh",
		level: "N5",
		jp: "私は学生です。",
		kana: "わたしはがくせいです。",
		romaji: "Watashi wa gakusei desu.",
		vi: "Tôi là học sinh."
	},
	{
		id: "ls-n5-14",
		title: "Thích tiếng Nhật",
		level: "N5",
		jp: "日本語が好きです。",
		kana: "にほんごがすきです。",
		romaji: "Nihongo ga suki desu.",
		vi: "Tôi thích tiếng Nhật."
	},
	{
		id: "ls-n5-15",
		title: "Đi xe đạp",
		level: "N5",
		jp: "自転車で行きます。",
		kana: "じてんしゃでいきます。",
		romaji: "Jitensha de ikimasu.",
		vi: "Tôi đi xe đạp."
	},
	{
		id: "ls-n4-01",
		title: "Tàu trễ",
		level: "N4",
		jp: "電車が遅れそうです。会社に連絡したほうがいいですか。",
		kana: "でんしゃがおくれそうです。かいしゃにれんらくしたほうがいいですか。",
		romaji: "Densha ga okure sou desu. Kaisha ni renraku shita hou ga ii desu ka.",
		vi: "Tàu có vẻ sẽ trễ. Tôi nên liên lạc công ty chứ?"
	},
	{
		id: "ls-n4-02",
		title: "Đặt khách sạn",
		level: "N4",
		jp: "旅行の前にホテルを予約しておきましょうか。",
		kana: "りょこうのまえにホテルをよやくしておきましょうか。",
		romaji: "Ryokou no mae ni hoteru o yoyaku shite okimashou ka.",
		vi: "Trước chuyến đi mình đặt khách sạn sẵn nhé?"
	},
	{
		id: "ls-n4-03",
		title: "Cửa hàng mới",
		level: "N4",
		jp: "駅の前に新しい店ができたそうです。",
		kana: "えきのまえにあたらしいみせができたそうです。",
		romaji: "Eki no mae ni atarashii mise ga dekita sou desu.",
		vi: "Nghe nói trước ga có cửa hàng mới."
	},
	{
		id: "ls-n4-04",
		title: "Hướng đi",
		level: "N4",
		jp: "進路が決まらなくて困っています。",
		kana: "しんろがきまらなくてこまっています。",
		romaji: "Shinro ga kimaranakute komatte imasu.",
		vi: "Tôi đang bối rối vì chưa quyết được hướng đi."
	},
	{
		id: "ls-n4-05",
		title: "Nhờ giữ chỗ",
		level: "N4",
		jp: "この席、ちょっと見ておいてもらえますか。",
		kana: "このせき、ちょっとみておいてもらえますか。",
		romaji: "Kono seki, chotto mite oite moraemasu ka.",
		vi: "Nhờ bạn trông giúp chỗ này một chút được không?"
	},
	{
		id: "ls-n4-06",
		title: "Đọc chữ 日",
		level: "N4",
		jp: "「日本」の「日」は何と読みますか。",
		kana: "「にほん」の「にち」はなんとよみますか。",
		romaji: "Nihon no nichi wa nan to yomimasu ka.",
		vi: "Chữ 日 trong 日本 đọc thế nào?"
	},
	{
		id: "ls-n4-07",
		title: "Giờ họp",
		level: "N4",
		jp: "会議は何時に始まりますか。",
		kana: "かいぎはなんじにはじまりますか。",
		romaji: "Kaigi wa nanji ni hajimarimasu ka.",
		vi: "Cuộc họp bắt đầu lúc mấy giờ?"
	},
	{
		id: "ls-n4-08",
		title: "Cách đọc kanji",
		level: "N4",
		jp: "この漢字の読み方を教えてください。",
		kana: "このかんじのよみかたをおしえてください。",
		romaji: "Kono kanji no yomikata o oshiete kudasai.",
		vi: "Làm ơn dạy cách đọc kanji này."
	},
	{
		id: "ls-n4-09",
		title: "Nên hỏi thầy",
		level: "N4",
		jp: "先生に相談したらどうですか。",
		kana: "せんせいにそうだんしたらどうですか。",
		romaji: "Sensei ni soudan shitara dou desu ka.",
		vi: "Hay là hỏi ý thầy cô?"
	},
	{
		id: "ls-n4-10",
		title: "Tắt điều hòa",
		level: "N4",
		jp: "冷房を消してください。",
		kana: "れいぼうをけしてください。",
		romaji: "Reibou o keshite kudasai.",
		vi: "Hãy tắt điều hòa."
	}
];
function shuffle(arr, rand) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
function cleanVocab(v) {
	return isSpeakableKana(v.kana) && Boolean(v.meaning_vi.trim()) && !/^to /i.test(v.meaning_vi);
}
function vocabPool(level) {
	return (level === "N5" ? VOCAB_N5 : level === "N4" ? VOCAB_N4 : [...VOCAB_N5, ...VOCAB_N4]).filter(cleanVocab);
}
function sentencePool(level) {
	return (level === "all" ? LISTEN_SENTENCES : LISTEN_SENTENCES.filter((s) => s.level === level)).filter((s) => isSpeakableKana(s.kana));
}
function uniqueMeaning(pool, meaning) {
	const key = meaning.trim();
	return pool.filter((v) => v.meaning_vi.trim() !== key);
}
function makeListenRound(n = 12, level = "all", rand = Math.random) {
	const vocab = vocabPool(level);
	const sentences = sentencePool(level);
	const usedVocab = /* @__PURE__ */ new Set();
	const usedSent = /* @__PURE__ */ new Set();
	const out = [];
	for (let i = 0; i < n; i++) {
		if (sentences.length > 0 && rand() < .35 && usedSent.size < sentences.length) {
			const fresh = sentences.filter((s) => !usedSent.has(s.id));
			const item = fresh[Math.floor(rand() * fresh.length)];
			if (!item) continue;
			usedSent.add(item.id);
			const others = shuffle(sentences.filter((s) => s.vi !== item.vi && s.id !== item.id).map((s) => s.vi), rand).slice(0, 3);
			if (others.length < 3) {
				const extra = uniqueMeaning(vocab, item.vi).map((v) => v.meaning_vi).filter((m, idx, arr) => arr.indexOf(m) === idx);
				others.push(...shuffle(extra, rand).slice(0, 3 - others.length));
			}
			const options = shuffle([item.vi, ...others.slice(0, 3)], rand);
			const speak = ttsKana(item.kana, item.jp);
			out.push({
				id: `${item.id}-${out.length}`,
				kind: "sentence",
				title: item.title,
				level: item.level,
				speak,
				jp: item.jp,
				kana: item.kana,
				romaji: item.romaji,
				vi: item.vi,
				options,
				answerIndex: Math.max(0, options.indexOf(item.vi))
			});
			continue;
		}
		const fresh = vocab.filter((v) => !usedVocab.has(v.id));
		const pool = fresh.length ? fresh : vocab;
		const c = pool[Math.floor(rand() * pool.length)];
		if (!c) continue;
		usedVocab.add(c.id);
		const wrong = shuffle(uniqueMeaning(vocab, c.meaning_vi), rand).filter((v, idx, arr) => arr.findIndex((x) => x.meaning_vi === v.meaning_vi) === idx).slice(0, 3);
		const options = shuffle([c.meaning_vi, ...wrong.map((v) => v.meaning_vi)], rand);
		const speak = ttsKana(c.kana, c.word);
		out.push({
			id: `${c.id}-${out.length}`,
			kind: "word",
			title: c.word,
			level: c.level,
			speak,
			jp: c.word,
			kana: c.kana,
			romaji: c.romaji,
			vi: c.meaning_vi,
			options,
			answerIndex: Math.max(0, options.indexOf(c.meaning_vi))
		});
	}
	return out;
}
var ROUND = 12;
function Page() {
	const [level, setLevel] = (0, import_react.useState)("all");
	const [round, setRound] = (0, import_react.useState)([]);
	const [i, setI] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	const log = useProgress((s) => s.logStudy);
	const streak = useProgress((s) => s.streak);
	const showRomaji = useSettings((s) => s.showRomaji);
	const ttsRate = useSettings((s) => s.ttsRate);
	const rateRef = (0, import_react.useRef)(ttsRate);
	rateRef.current = ttsRate;
	const user = useCurrentUser();
	const item = !done && round.length ? round[i] : void 0;
	function restart(nextLevel = level) {
		stopSpeaking();
		setLevel(nextLevel);
		setRound(makeListenRound(ROUND, nextLevel));
		setI(0);
		setPicked(null);
		setScore(0);
		setDone(false);
	}
	(0, import_react.useEffect)(() => {
		setRound(makeListenRound(ROUND, "all"));
		return () => stopSpeaking();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!item) return;
		let cancelled = false;
		const handle = window.setTimeout(() => {
			if (!cancelled) speakJapanese(item.speak, rateRef.current);
		}, 80);
		return () => {
			cancelled = true;
			window.clearTimeout(handle);
			stopSpeaking();
		};
	}, [item?.id]);
	if (!round.length && !done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "聴",
		title: "Luyện nghe",
		description: "Nghe từ hoặc câu tiếng Nhật, chọn đúng nghĩa tiếng Việt của chính điều vừa nghe."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Đang soạn câu hỏi…"
	})] });
	if (done || !item) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Luyện nghe" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			"Hoàn thành ",
			score,
			"/",
			round.length,
			"."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-4",
			onClick: () => restart(),
			children: "Làm tiếp"
		})
	] });
	const revealed = picked !== null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "聴",
			title: "Luyện nghe",
			description: "Nghe từ hoặc câu tiếng Nhật một lần, chọn đúng nghĩa tiếng Việt. Bấm Nghe lại nếu cần."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [
				"all",
				"N5",
				"N4"
			].map((lv) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: level === lv ? "default" : "secondary",
				onClick: () => restart(lv),
				children: lv === "all" ? "N5 + N4" : lv
			}, lv))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mx-auto max-w-lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							item.kind === "word" ? "Nghe từ" : item.title,
							" · ",
							item.level,
							" · ",
							i + 1,
							"/",
							round.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
						text: item.speak,
						kana: item.speak,
						label: "Nghe lại"
					}),
					revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[10px] border border-border bg-choice p-4 text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-jp text-xl leading-relaxed text-fg",
								children: item.jp
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-jp text-sm text-muted",
								children: item.kana
							}),
							showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted",
								children: item.romaji
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-fg",
								children: item.vi
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Máy đọc một lần. Chọn nghĩa khớp với từ/câu vừa nghe."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2",
						children: item.options.map((o, idx) => {
							const state = choiceState({
								revealed,
								isAnswer: idx === item.answerIndex,
								picked: picked === idx
							});
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
								state,
								disabled: revealed,
								onClick: () => {
									setPicked(idx);
									if (idx === item.answerIndex) setScore((s) => s + 1);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-left text-sm leading-snug text-fg",
									children: o
								})
							}, `${item.id}-${o}`);
						})
					}),
					revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: async () => {
							const nextScore = score;
							if (i + 1 >= round.length) {
								await addQuizResult({
									id: uid("quiz"),
									at: Date.now(),
									kind: "listen",
									score: nextScore,
									total: round.length,
									durationMs: 0
								});
								await log(round.length, 4);
								await syncQuizToLeaderboard({
									score: nextScore,
									total: round.length,
									minutes: 4,
									streak,
									displayName: user?.displayName
								});
								setDone(true);
								return;
							}
							setPicked(null);
							setI((x) => x + 1);
						},
						children: "Tiếp"
					}) : null
				]
			})
		})
	] });
}
//#endregion
export { Page as component };
