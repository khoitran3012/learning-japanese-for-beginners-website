import { foldVi } from "./answer-check";

function tokens(s: string) {
  return new Set(
    foldVi(s)
      .split(/[\s/·,;:+_-]+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 1),
  );
}

/** Hai đáp án/câu quá gần nhau — loại khỏi cùng một vòng. */
export function similarAnswer(a: string, b: string) {
  const fa = foldVi(a);
  const fb = foldVi(b);
  if (!fa || !fb) return false;
  if (fa === fb) return true;
  if (fa.length >= 4 && fb.length >= 4 && (fa.includes(fb) || fb.includes(fa))) return true;
  const A = tokens(a);
  const B = tokens(b);
  if (!A.size || !B.size) return false;
  let hit = 0;
  for (const t of A) if (B.has(t)) hit += 1;
  return hit / Math.min(A.size, B.size) >= 0.65;
}

export function questionsClash(
  a: { sourceId: string; speak?: string; promptJp?: string; options: string[]; answer: number },
  b: { sourceId: string; speak?: string; promptJp?: string; options: string[]; answer: number },
) {
  if (a.sourceId === b.sourceId) return true;
  if (a.speak && b.speak && a.speak === b.speak) return true;
  if (a.promptJp && b.promptJp && a.promptJp === b.promptJp) return true;
  const aa = a.options[a.answer] ?? "";
  const bb = b.options[b.answer] ?? "";
  if (aa && bb && similarAnswer(aa, bb)) return true;
  return false;
}

export function uniqueShuffle<T>(arr: T[], rand: () => number) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}
