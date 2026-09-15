/** Fold Vietnamese diacritics and whitespace so "truong hoc" hits "trường học". */
export function foldVi(input: string) {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .replace(/[\s'\-./·,;:()]+/g, " ")
    .trim();
}

export function foldCompact(input: string) {
  return foldVi(input).replace(/\s+/g, "");
}

/** Drop sokuon / chōon so がっこう ≈ がこう for typo-tolerant kana search. */
export function foldKana(input: string) {
  return input.replace(/ー/g, "").replace(/っ|ッ/g, "");
}

export function uniqueStrings(list: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of list) {
    const key = item.trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(key);
  }
  return out;
}
