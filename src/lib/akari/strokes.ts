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

export function strokePathsFor(character: string): string[] {
  const direct = PATHS[character];
  if (direct?.length) return direct;
  const mapped = SMALL_KANA[character];
  if (mapped) {
    const from = PATHS[mapped];
    if (from?.length) return from;
  }
  if (character.length > 1) {
    const combined: string[] = [];
    for (const ch of character) {
      const part = strokePathsFor(ch);
      if (part.length) combined.push(...part);
    }
    return combined;
  }
  return [];
}

export function hasStrokeData(character: string) {
  return strokePathsFor(character).length > 0;
}
