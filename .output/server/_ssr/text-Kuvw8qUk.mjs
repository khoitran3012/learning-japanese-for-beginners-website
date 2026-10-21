//#region node_modules/.nitro/vite/services/ssr/assets/text-Kuvw8qUk.js
/** Fold Vietnamese diacritics and whitespace so "truong hoc" hits "trường học". */
function foldVi(input) {
	return input.trim().toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/g, "d").replace(/Đ/g, "d").replace(/[\s'\-./·,;:()]+/g, " ").trim();
}
function foldCompact(input) {
	return foldVi(input).replace(/\s+/g, "");
}
/** Drop sokuon / chōon so がっこう ≈ がこう for typo-tolerant kana search. */
function foldKana(input) {
	return input.replace(/ー/g, "").replace(/っ|ッ/g, "");
}
function uniqueStrings(list) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const item of list) {
		const key = item.trim();
		if (!key || seen.has(key)) continue;
		seen.add(key);
		out.push(key);
	}
	return out;
}
//#endregion
export { uniqueStrings as i, foldKana as n, foldVi as r, foldCompact as t };
