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

export type StrokeSet = {
  viewBox: string;
  glyphs: StrokeGlyph[];
  /** Base width of the coordinate system — used to size the pen. */
  unit: number;
};

const remoteCache = new Map<string, StrokeSet>();
const inflight = new Map<string, Promise<StrokeSet>>();

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

function glyphsFromPaths(character: string, pathMap?: Record<string, string[]>): StrokeGlyph[] {
  const chars = [...character];
  if (!chars.length) return [];
  const layouts = layoutOf(chars);
  const out: StrokeGlyph[] = [];
  chars.forEach((ch, i) => {
    const layout = layouts[i] ?? { scale: 1 };
    const ds = pathMap?.[ch] ?? rawPaths(ch);
    for (const d of ds) {
      out.push({ d, transform: layout.transform, scale: layout.scale });
    }
  });
  return out;
}

/** Flattened SVG paths with per-glyph transforms so yoon (きゃ, キャ, ファ…) do not stack. */
export function strokeGlyphsFor(character: string): StrokeGlyph[] {
  return glyphsFromPaths(character);
}

export function strokePathsFor(character: string): string[] {
  return strokeGlyphsFor(character).map((g) => g.d);
}

export function hasStrokeData(character: string) {
  return strokeGlyphsFor(character).length > 0;
}

function parseKanjiVg(svg: string): string[] {
  const cut = svg.split(/StrokeNumbers/)[0] ?? svg;
  const out: string[] = [];
  const re = /<path\b[^>]*\bd="([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(cut))) out.push(m[1]!);
  return out;
}

async function fetchKanjiVg(ch: string): Promise<string[] | null> {
  const hex = (ch.codePointAt(0) ?? 0).toString(16).padStart(5, "0");
  const url = `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${hex}.svg`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const svg = await res.text();
    const paths = parseKanjiVg(svg);
    return paths.length ? paths : null;
  } catch {
    return null;
  }
}

async function fetchHanziWriter(ch: string): Promise<StrokeSet | null> {
  const url = `https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${encodeURIComponent(ch)}.json`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as { strokes?: string[] };
    if (!data.strokes?.length) return null;
    return {
      viewBox: "0 0 1024 1024",
      unit: 1024,
      glyphs: data.strokes.map((d) => ({ d, scale: 1 })),
    };
  } catch {
    return null;
  }
}

async function loadChar109(ch: string): Promise<string[]> {
  const local = rawPaths(ch);
  if (local.length) return local;
  return (await fetchKanjiVg(ch)) ?? [];
}

const EMPTY: StrokeSet = { viewBox: "0 0 109 109", unit: 109, glyphs: [] };

async function resolveStrokeSet(character: string): Promise<StrokeSet> {
  const local = strokeGlyphsFor(character);
  if (local.length) return { viewBox: "0 0 109 109", unit: 109, glyphs: local };

  const chars = [...character];
  if (chars.length === 1) {
    const ch = chars[0]!;
    const vg = await fetchKanjiVg(ch);
    if (vg?.length) {
      return { viewBox: "0 0 109 109", unit: 109, glyphs: vg.map((d) => ({ d, scale: 1 })) };
    }
    const hanzi = await fetchHanziWriter(ch);
    if (hanzi) return hanzi;
    return EMPTY;
  }

  const packs = await Promise.all(chars.map(loadChar109));
  const pathMap: Record<string, string[]> = {};
  chars.forEach((ch, i) => {
    if (packs[i]?.length) pathMap[ch] = packs[i]!;
  });
  const glyphs = glyphsFromPaths(character, pathMap);
  if (glyphs.length) return { viewBox: "0 0 109 109", unit: 109, glyphs };
  return EMPTY;
}

/** Local data first, then KanjiVG / Hanzi Writer for missing kanji. */
export function loadStrokeSet(character: string): Promise<StrokeSet> {
  const hit = remoteCache.get(character);
  if (hit) return Promise.resolve(hit);
  const pending = inflight.get(character);
  if (pending) return pending;
  const job = resolveStrokeSet(character)
    .then((set) => {
      remoteCache.set(character, set);
      inflight.delete(character);
      return set;
    })
    .catch(() => {
      inflight.delete(character);
      return EMPTY;
    });
  inflight.set(character, job);
  return job;
}
