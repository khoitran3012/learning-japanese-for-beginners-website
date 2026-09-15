const MACRON: Record<string, string> = {
  ā: "aa",
  ī: "ii",
  ū: "uu",
  ē: "ee",
  ō: "ou",
  Ā: "aa",
  Ī: "ii",
  Ū: "uu",
  Ē: "ee",
  Ō: "ou",
};

export function normalizeRomaji(input: string) {
  let s = input.trim().toLowerCase().normalize("NFKC");
  s = s.replace(/[āīūēōĀĪŪĒŌ]/g, (ch) => MACRON[ch] ?? ch);
  s = s.replace(/ô/g, "ou").replace(/û/g, "uu");
  s = s.replace(/[\s'\-.]/g, "");
  // Long vowels only — do not touch sokuon (kk/tt/pp/ss).
  s = s.replace(/([aeioun])oo/g, "$1ou");
  s = s.replace(/n'/g, "n");
  return s;
}

export function romajiVariants(input: string) {
  const base = normalizeRomaji(input);
  const set = new Set<string>([base]);
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
  // Missing sokuon: gakkou → gakou / gakko
  set.add(base.replace(/kk/g, "k").replace(/tt/g, "t").replace(/pp/g, "p").replace(/ss/g, "s"));
  return [...set];
}

export function stripKanaLength(s: string) {
  return s.replace(/ー/g, "").replace(/っ|ッ/g, "");
}

export function hasJapanese(s: string) {
  return /[\u3040-\u30ff\u4e00-\u9fff]/.test(s);
}

export function hasKana(s: string) {
  return /[\u3040-\u30ff]/.test(s);
}

export function hasKanji(s: string) {
  return /[\u4e00-\u9fff]/.test(s);
}
