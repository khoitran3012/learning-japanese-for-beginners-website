import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toHiragana } from "./kana-util-DgSJpVDG.mjs";
import { c as practiceKanji, o as kanjiByLevel, t as allKanji } from "./kanji-set-B5ykdYH_.mjs";
import { n as GRAMMAR_N5 } from "./grammar-n4-Dv0a1spF.mjs";
import { t as VOCAB_N5 } from "./vocabulary-n5-DDorjkhE.mjs";
import { t as VOCAB_N4 } from "./vocabulary-n4-CVIZPi7y.mjs";
import { n as KATAKANA, t as HIRAGANA } from "./kana-CV-aAiLY.mjs";
import { o as learnRadicals } from "./radicals-BsxpUXhx.mjs";
import { i as shuffle } from "./utils-XG3oJXDV.mjs";
import { a as findEntry, f as resolveStudyItem, h as useDictionary, i as findBuiltin } from "./catalog-BHXFuF28.mjs";
import { t as Button } from "./button-Dt7wwSQI.mjs";
import { n as useSettings } from "./settings-_aQHY0Mw.mjs";
import { a as useProgress, t as isDue } from "./progress-CIocZrv7.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { r as meaningParts } from "./answer-check-vNWNvSky.mjs";
import { t as FlashcardDeck } from "./flashcard-deck-D-bXiLWr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flashcards-Bhz_YasJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const [deck, setDeck] = (0, import_react.useState)("hiragana");
	const [kanjiLv, setKanjiLv] = (0, import_react.useState)("N5");
	const myWords = useProgress((s) => s.myWords);
	const srs = useProgress((s) => s.srs);
	const ready = useProgress((s) => s.ready);
	const perDay = useSettings((s) => s.flashcardPerDay);
	const showRomaji = useSettings((s) => s.showRomaji);
	const dict = useDictionary();
	const cards = (0, import_react.useMemo)(() => {
		let built = [];
		if (deck === "hiragana") built = HIRAGANA.filter((k) => k.group === "gojuon" || k.group === "dakuten" || k.group === "yoon").map((k) => ({
			id: k.id,
			front: k.char,
			back: `${k.romaji}\n${k.examples[0]?.vi ?? ""}`,
			extra: k.examples[0]?.jp,
			speak: k.char,
			type: "kana",
			answers: [k.romaji],
			answerHint: "Gõ romaji"
		}));
		else if (deck === "katakana") built = KATAKANA.filter((k) => k.group === "gojuon" || k.group === "dakuten" || k.group === "yoon").map((k) => ({
			id: k.id,
			front: k.char,
			back: `${k.romaji}\n${k.examples[0]?.vi ?? ""}`,
			extra: k.examples[0]?.jp,
			speak: k.char,
			type: "kana",
			answers: [k.romaji],
			answerHint: "Gõ romaji"
		}));
		else if (deck === "vocab") built = [...VOCAB_N5, ...VOCAB_N4].map((v) => ({
			id: v.id,
			front: v.word,
			back: `${v.kana}${showRomaji ? " · " + v.romaji : ""}\n${v.meaning_vi}`,
			extra: v.example_sentence,
			speak: v.kana,
			speakExtra: v.example_kana,
			type: "vocab",
			answers: [
				v.romaji,
				v.kana,
				v.word,
				...meaningParts(v.meaning_vi)
			],
			answerHint: "Gõ romaji, kana hoặc nghĩa"
		}));
		else if (deck === "kanji") built = (kanjiLv === "all" ? allKanji() : kanjiLv === "core" ? practiceKanji() : kanjiByLevel(kanjiLv)).map((k) => ({
			id: k.id,
			front: k.character,
			back: `${k.han_viet ? `Hán-Việt: ${k.han_viet}\n` : ""}${k.meaning_vi}\n${k.onyomi.join(" / ")} · ${k.kunyomi.join(" / ")}`,
			speak: k.kunyomi[0]?.replace(/[-.・･]/g, "") || toHiragana(k.onyomi[0] ?? "") || k.character,
			type: "kanji",
			answers: [
				...meaningParts(k.meaning_vi),
				k.han_viet,
				k.romaji,
				...k.kunyomi,
				...k.onyomi
			].filter(Boolean),
			answerHint: "Gõ nghĩa, Hán-Việt hoặc cách đọc"
		}));
		else if (deck === "radical") built = learnRadicals().map((r) => ({
			id: r.id,
			front: r.char,
			back: `${r.han_viet} · ${r.meaning_vi}\n${r.name_kana}\n${r.hint}`,
			extra: r.examples,
			speak: r.name_kana,
			type: "kanji",
			answers: [
				r.han_viet,
				r.name_kana,
				r.meaning_vi,
				r.name_jp
			],
			answerHint: "Gõ Hán-Việt hoặc tên bộ (kana)"
		}));
		else if (deck === "mine") built = [...myWords].map((id) => {
			const d = findEntry(id) ?? findBuiltin(id);
			if (d) return {
				id,
				front: d.kanji,
				back: `${d.kana}${showRomaji ? " · " + d.romaji : ""}\n${d.meanings.join(" · ")}`,
				extra: d.examples[0]?.jp,
				speak: d.kana,
				speakExtra: d.examples[0]?.kana,
				type: "vocab",
				answers: [
					d.romaji,
					d.kana,
					d.kanji,
					...d.meanings.flatMap(meaningParts)
				],
				answerHint: "Gõ romaji, kana hoặc nghĩa"
			};
			const r = resolveStudyItem(id);
			return {
				id,
				front: r?.title ?? id,
				back: r?.sub ?? "",
				speak: r?.speak,
				type: "custom",
				answers: r?.sub ? meaningParts(r.sub) : [],
				answerHint: "Gõ đáp án"
			};
		});
		else built = GRAMMAR_N5.map((g) => ({
			id: g.id,
			front: g.name,
			back: `${g.structure}\n${g.meaning_vi}`,
			extra: g.examples[0]?.jp,
			type: "grammar",
			answers: meaningParts(g.meaning_vi),
			answerHint: "Gõ nghĩa tiếng Việt"
		}));
		const due = built.filter((c) => !srs[c.id] || isDue(srs[c.id]));
		const rest = built.filter((c) => srs[c.id] && !isDue(srs[c.id]));
		return [...shuffle(due), ...shuffle(rest)].slice(0, perDay);
	}, [
		deck,
		kanjiLv,
		perDay,
		showRomaji,
		myWords,
		srs,
		dict
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "札",
			title: "Thẻ từ",
			description: "Gõ đáp án để tự kiểm tra. Nhớ / Dễ hoặc gõ đúng thì lưu ngay. Thẻ quên sẽ quay lại trong phiên."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [
				["hiragana", "Hiragana"],
				["katakana", "Katakana"],
				["vocab", "Từ vựng"],
				["kanji", "Kanji"],
				["radical", "Bộ thủ"],
				["grammar", "Ngữ pháp"],
				["mine", "Từ của tôi"]
			].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: deck === id ? "default" : "secondary",
				onClick: () => setDeck(id),
				children: label
			}, id))
		}),
		deck === "kanji" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [
				"N5",
				"N4",
				"N3",
				"N2",
				"N1",
				"core",
				"all"
			].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: kanjiLv === x ? "default" : "secondary",
				onClick: () => setKanjiLv(x),
				children: x === "core" ? "N5+N4" : x === "all" ? "N5→N1" : x
			}, x))
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlashcardDeck, {
			cards,
			sessionKey: `${deck}-${kanjiLv}-${perDay}-${showRomaji}-${ready ? "1" : "0"}`,
			empty: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Bộ thẻ trống. Thêm từ vào danh sách học trước."
			})
		})
	] });
}
//#endregion
export { Page as component };
