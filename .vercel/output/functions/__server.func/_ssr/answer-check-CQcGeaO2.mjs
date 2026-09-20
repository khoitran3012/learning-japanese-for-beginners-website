import { a as stripKanaLength, i as romajiVariants, r as normalizeRomaji } from "./romaji-BCVeKQ98.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/answer-check-CQcGeaO2.js
function foldText(s) {
	return s.normalize("NFKC").trim().toLowerCase().replace(/[.,!?;:()[\]{}「」『』。、・…]/g, "").replace(/\s+/g, " ");
}
function foldVi(s) {
	return foldText(s).normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/g, "d");
}
function meaningParts(meaning) {
	return meaning.split(/[/·;,，、]| hoặc | \/ /).map((s) => s.trim()).filter((s) => s.length > 1);
}
function answersMatch(input, expected) {
	const raw = input.trim();
	if (!raw) return false;
	const folded = foldText(raw);
	const vi = foldVi(raw);
	const typedRomaji = new Set(romajiVariants(raw));
	const kana = stripKanaLength(folded.replace(/\s/g, ""));
	for (const exp of expected) {
		if (!exp) continue;
		const eFold = foldText(exp);
		if (eFold && eFold === folded) return true;
		if (foldVi(exp) === vi && vi.length >= 2) return true;
		if (romajiVariants(exp).some((x) => typedRomaji.has(x) && x.length > 0)) return true;
		if (/[\u3040-\u30ff]/.test(exp) && stripKanaLength(eFold.replace(/\s/g, "")) === kana && kana.length > 0) return true;
		if (normalizeRomaji(exp) === normalizeRomaji(raw) && normalizeRomaji(raw).length > 0) return true;
	}
	return false;
}
//#endregion
export { meaningParts as n, answersMatch as t };
