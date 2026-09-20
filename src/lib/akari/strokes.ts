import STROKE_PATHS from "@/data/stroke-paths.json";

const PATHS = STROKE_PATHS as Record<string, string[]>;

/** Small kana share the same stroke order as their full-size forms (教科書体). */
const SMALL_KANA: Record<string, string> = {
  ぁ: "あ",
  ぃ: "い",
  ぅ: "う",
  ぇ: "え",
  ぉ: "お",
  ゃ: "や",
  ゅ: "ゆ",
  ょ: "よ",
  っ: "つ",
  ゎ: "わ",
  ァ: "ア",
  ィ: "イ",
  ゥ: "ウ",
  ェ: "エ",
  ォ: "オ",
  ャ: "ヤ",
  ュ: "ユ",
  ョ: "ヨ",
  ッ: "ツ",
  ヮ: "ワ",
};

export type StrokeGlyph = {
  d: string;
  transform?: string;
  /** Visual scale of this glyph (1 = full 109×109 cell). */
  scale: number;
};

function rawPaths(ch: string): string[] {
  if (PATHS[ch]?.length) return PATHS[ch]!;
  const mapped = SMALL_KANA[ch];
  if (mapped && PATHS[mapped]?.length) return PATHS[mapped]!;
  return [];
}

function isSmallKana(ch: string) {
  return Boolean(SMALL_KANA[ch]);
}

function layoutOf(chars: string[]): Array<{ transform?: string; scale: number }> {
  const n = chars.length;
  if (n <= 1) {
    const ch = chars[0];
    if (ch && isSmallKana(ch) && !PATHS[ch]?.length) {
      return [{ transform: "translate(26 28) scale(0.52)", scale: 0.52 }];
    }
    return [{ scale: 1 }];
  }
  const secondSmall = n === 2 && isSmallKana(chars[1]!);
  if (n === 2 && secondSmall) {
    return [
      { transform: "translate(2 8) scale(0.66)", scale: 0.66 },
      { transform: "translate(56 48) scale(0.4)", scale: 0.4 },
    ];
  }
  if (n === 2) {
    return [
      { transform: "translate(1 14) scale(0.5)", scale: 0.5 },
      { transform: "translate(54 14) scale(0.5)", scale: 0.5 },
    ];
  }
  const slot = 109 / n;
  const scale = Math.min(0.4, (slot - 4) / 109);
  return chars.map((_, i) => ({
    transform: `translate(${i * slot + 2} 24) scale(${scale})`,
    scale,
  }));
}

/** Flattened SVG paths with per-glyph transforms so yoon (きゃ, キャ, ファ…) do not stack. */
export function strokeGlyphsFor(character: string): StrokeGlyph[] {
  const chars = [...character];
  if (!chars.length) return [];
  const layouts = layoutOf(chars);
  const out: StrokeGlyph[] = [];
  chars.forEach((ch, i) => {
    const layout = layouts[i] ?? { scale: 1 };
    for (const d of rawPaths(ch)) {
      out.push({ d, transform: layout.transform, scale: layout.scale });
    }
  });
  return out;
}

export function strokePathsFor(character: string): string[] {
  return strokeGlyphsFor(character).map((g) => g.d);
}

export function hasStrokeData(character: string) {
  return strokeGlyphsFor(character).length > 0;
}
