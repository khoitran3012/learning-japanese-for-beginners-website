import { n as toHiragana, t as kanaToRomaji } from "./kana-util-DgSJpVDG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/on-kun-BtzNpcc7.js
function splitKunReading(raw) {
	const s = raw.normalize("NFKC").replace(/[-－.]/g, "・");
	const i = s.indexOf("・");
	if (i >= 0) {
		const stem = s.slice(0, i).replace(/・/g, "");
		const oku = s.slice(i + 1).replace(/・/g, "");
		return {
			stem,
			oku,
			kana: stem + oku
		};
	}
	const kana = s.replace(/・/g, "");
	return {
		stem: kana,
		oku: "",
		kana
	};
}
function onReadings(k) {
	return k.onyomi.filter(Boolean).map((kata) => {
		const hira = toHiragana(kata);
		return {
			kata,
			hira,
			romaji: kanaToRomaji(hira)
		};
	});
}
function kunReadings(k) {
	return k.kunyomi.filter(Boolean).map((raw) => {
		const parts = splitKunReading(raw);
		return {
			raw,
			...parts,
			romaji: kanaToRomaji(parts.kana)
		};
	});
}
/** Hiragana hiện trên ô lưới: kun trước, on sau. */
function kanjiFurigana(k) {
	const kun = kunReadings(k)[0]?.kana ?? "";
	const on = onReadings(k)[0]?.hira ?? "";
	const parts = [kun, on].filter(Boolean);
	return {
		kun,
		on,
		line: parts.filter((x, i) => parts.indexOf(x) === i).join(" · ")
	};
}
var HAS_KANJI = /[\u4e00-\u9fff々]/;
function classifyExample(k, ex) {
	if (ex.reading === "on" || ex.reading === "kun") return ex.reading;
	const { word } = ex;
	if (word === k.character) return "kun";
	for (const kun of kunReadings(k)) {
		if (word === k.character + kun.oku) return "kun";
		if (ex.kana === kun.kana) return "kun";
	}
	const rest = [...word].filter((ch) => ch !== k.character).join("");
	const kanjiRest = HAS_KANJI.test(rest);
	const kanaRest = rest.length > 0 && /^[\u3040-\u30ffー]+$/.test(rest);
	if (kanaRest && !kanjiRest) return "kun";
	if (kanjiRest && !kanaRest) return "on";
	return "mixed";
}
function pickOnExample(k, words) {
	return words.find((w) => classifyExample(k, w) === "on") ?? words.find((w) => classifyExample(k, w) !== "kun");
}
function pickKunExample(k, words) {
	const hit = words.find((w) => classifyExample(k, w) === "kun");
	if (hit) return hit;
	const kun = kunReadings(k)[0];
	if (!kun) return void 0;
	return {
		word: k.character + kun.oku,
		kana: kun.kana,
		romaji: kun.romaji,
		meaning_vi: k.meaning_vi.split(" / ")[0] ?? k.meaning_vi,
		reading: "kun"
	};
}
/** Textbook pair: ghép chữ (ON) vs chữ + đuôi (KUN). */
var TEACH_ON = {
	label: "Ghép hai chữ → đọc âm Hán",
	word: "食堂",
	parts: [{
		ch: "食",
		yomi: "しょく"
	}, {
		ch: "堂",
		yomi: "どう"
	}],
	kana: "しょくどう",
	romaji: "shokudou",
	vi: "nhà ăn",
	hanViet: "Thực Đường",
	why: "Hai kanji dính nhau, không có hiragana ở giữa."
};
var TEACH_KUN = {
	label: "Một chữ + đuôi hiragana → đọc âm Nhật",
	word: "食べる",
	parts: [{
		ch: "食",
		yomi: "た"
	}],
	oku: "べる",
	kana: "たべる",
	romaji: "taberu",
	vi: "ăn",
	hanViet: "Thực",
	why: "べる là okurigana — đuôi hiragana bám sau kanji."
};
//#endregion
export { kunReadings as a, pickOnExample as c, kanjiFurigana as i, TEACH_ON as n, onReadings as o, classifyExample as r, pickKunExample as s, TEACH_KUN as t };
