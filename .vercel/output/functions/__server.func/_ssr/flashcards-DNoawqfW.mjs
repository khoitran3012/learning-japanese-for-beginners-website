import { o as __toESM } from "../_runtime.mjs";
import { E as require_react, T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as KANJI_N5 } from "./kanji-n4-Bq9tkueZ.mjs";
import { n as GRAMMAR_N5 } from "./grammar-n4-Dv0a1spF.mjs";
import { t as VOCAB_N5 } from "./vocabulary-n5-DDorjkhE.mjs";
import { t as VOCAB_N4 } from "./vocabulary-n4-CVIZPi7y.mjs";
import { n as KATAKANA, t as HIRAGANA } from "./kana-CV-aAiLY.mjs";
import { i as shuffle } from "./utils-D10sm1uC.mjs";
import { a as findEntry, d as resolveStudyItem, i as findBuiltin, m as useDictionary } from "./catalog-Ba7ml22_.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress, t as isDue } from "./progress-De5Z2Iqg.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { t as FlashcardDeck } from "./flashcard-deck-CdKKFZ9X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flashcards-DNoawqfW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const [deck, setDeck] = (0, import_react.useState)("hiragana");
	const myWords = useProgress((s) => s.myWords);
	const srs = useProgress((s) => s.srs);
	const ready = useProgress((s) => s.ready);
	const perDay = useSettings((s) => s.flashcardPerDay);
	const showRomaji = useSettings((s) => s.showRomaji);
	const dict = useDictionary();
	const cards = (0, import_react.useMemo)(() => {
		let built = [];
		if (deck === "hiragana") built = HIRAGANA.filter((k) => k.group === "gojuon").map((k) => ({
			id: k.id,
			front: k.char,
			back: `${k.romaji}\n${k.examples[0]?.vi ?? ""}`,
			extra: k.examples[0]?.jp,
			speak: k.char,
			type: "kana"
		}));
		else if (deck === "katakana") built = KATAKANA.filter((k) => k.group === "gojuon").map((k) => ({
			id: k.id,
			front: k.char,
			back: `${k.romaji}\n${k.examples[0]?.vi ?? ""}`,
			extra: k.examples[0]?.jp,
			speak: k.char,
			type: "kana"
		}));
		else if (deck === "vocab") built = [...VOCAB_N5, ...VOCAB_N4].map((v) => ({
			id: v.id,
			front: v.word,
			back: `${v.kana}${showRomaji ? " · " + v.romaji : ""}\n${v.meaning_vi}`,
			extra: v.example_sentence,
			speak: v.word,
			type: "vocab"
		}));
		else if (deck === "kanji") built = KANJI_N5.map((k) => ({
			id: k.id,
			front: k.character,
			back: `${k.meaning_vi}\n${k.onyomi.join(" / ")}`,
			speak: k.character,
			type: "kanji"
		}));
		else if (deck === "mine") built = [...myWords].map((id) => {
			const d = findEntry(id) ?? findBuiltin(id);
			if (d) return {
				id,
				front: d.kanji,
				back: `${d.kana}${showRomaji ? " · " + d.romaji : ""}\n${d.meanings.join(" · ")}`,
				extra: d.examples[0]?.jp,
				speak: d.kanji,
				type: "vocab"
			};
			const r = resolveStudyItem(id);
			return {
				id,
				front: r?.title ?? id,
				back: r?.sub ?? "",
				speak: r?.speak,
				type: "custom"
			};
		});
		else built = GRAMMAR_N5.map((g) => ({
			id: g.id,
			front: g.name,
			back: `${g.structure}\n${g.meaning_vi}`,
			extra: g.examples[0]?.jp,
			type: "grammar"
		}));
		const due = built.filter((c) => !srs[c.id] || isDue(srs[c.id]));
		const rest = built.filter((c) => srs[c.id] && !isDue(srs[c.id]));
		return [...shuffle(due), ...shuffle(rest)].slice(0, perDay);
	}, [
		deck,
		perDay,
		showRomaji,
		myWords,
		srs,
		dict
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "札",
			title: "Flashcard",
			description: "Ưu tiên thẻ đến hạn. Lật thẻ, tự đánh giá — khoảng cách ôn tăng khi bạn nhớ."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [
				["hiragana", "Hiragana"],
				["katakana", "Katakana"],
				["vocab", "Từ vựng"],
				["kanji", "Kanji"],
				["grammar", "Ngữ pháp"],
				["mine", "Từ của tôi"]
			].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: deck === id ? "default" : "secondary",
				onClick: () => setDeck(id),
				children: label
			}, id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlashcardDeck, {
			cards,
			sessionKey: `${deck}-${perDay}-${showRomaji}-${ready ? "1" : "0"}`,
			empty: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Bộ thẻ trống. Thêm từ vào danh sách học trước."
			})
		})
	] });
}
//#endregion
export { Page as component };
