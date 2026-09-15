export function levenshtein(a: string, b: string) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = i - 1;
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j]!;
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j]! + 1, row[j - 1]! + 1, prev + cost);
      prev = tmp;
    }
  }
  return row[b.length]!;
}

export function fuzzyScore(query: string, target: string) {
  if (!query) return 0;
  if (target === query) return 1;
  if (target.startsWith(query)) return 0.92;
  if (target.includes(query)) return 0.75;
  const dist = levenshtein(query, target);
  const max = Math.max(query.length, target.length);
  const sim = 1 - dist / max;
  return sim > 0.55 ? sim * 0.7 : 0;
}
