//#region node_modules/.nitro/vite/services/ssr/assets/romaji-BCVeKQ98.js
var MACRON = {
	ā: "aa",
	ī: "ii",
	ū: "uu",
	ē: "ee",
	ō: "ou",
	Ā: "aa",
	Ī: "ii",
	Ū: "uu",
	Ē: "ee",
	Ō: "ou"
};
function normalizeRomaji(input) {
	let s = input.trim().toLowerCase().normalize("NFKC");
	s = s.replace(/[āīūēōĀĪŪĒŌ]/g, (ch) => MACRON[ch] ?? ch);
	s = s.replace(/ô/g, "ou").replace(/û/g, "uu");
	s = s.replace(/[\s'\-.]/g, "");
	s = s.replace(/([aeioun])oo/g, "$1ou");
	s = s.replace(/n'/g, "n");
	return s;
}
function romajiVariants(input) {
	const base = normalizeRomaji(input);
	const set = /* @__PURE__ */ new Set([base]);
	set.add(base.replace(/ou/g, "oo"));
	set.add(base.replace(/ou/g, "o"));
	set.add(base.replace(/uu/g, "u"));
	set.add(base.replace(/aa/g, "a"));
	set.add(base.replace(/ee/g, "e"));
	set.add(base.replace(/ii/g, "i"));
	set.add(base.replace(/shi/g, "si"));
	set.add(base.replace(/chi/g, "ti"));
	set.add(base.replace(/tsu/g, "tu"));
	set.add(base.replace(/fu/g, "hu"));
	set.add(base.replace(/ji/g, "zi"));
	set.add(base.replace(/sha/g, "sya"));
	set.add(base.replace(/shu/g, "syu"));
	set.add(base.replace(/sho/g, "syo"));
	set.add(base.replace(/cha/g, "tya"));
	set.add(base.replace(/chu/g, "tyu"));
	set.add(base.replace(/cho/g, "tyo"));
	set.add(base.replace(/kk/g, "k").replace(/tt/g, "t").replace(/pp/g, "p").replace(/ss/g, "s"));
	return [...set];
}
function stripKanaLength(s) {
	return s.replace(/ー/g, "").replace(/っ|ッ/g, "");
}
function hasJapanese(s) {
	return /[\u3040-\u30ff\u4e00-\u9fff]/.test(s);
}
function hasKanji(s) {
	return /[\u4e00-\u9fff]/.test(s);
}
//#endregion
export { stripKanaLength as a, romajiVariants as i, hasKanji as n, normalizeRomaji as r, hasJapanese as t };
