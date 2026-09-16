import type { GrammarEntry } from "./types";

export const GRAMMAR_CATEGORY_ORDER = [
  "Thể lịch sự",
  "Trợ từ",
  "Chỉ định",
  "Động từ",
  "Tính từ",
  "Tồn tại & sở hữu",
  "Thời gian",
  "Ý muốn & đề nghị",
  "Ý kiến & suy đoán",
  "Trợ động từ て",
  "Điều kiện",
  "Lý do & mục đích",
  "Nghĩa vụ & mức độ",
  "Khác",
] as const;

export type GrammarCategory = (typeof GRAMMAR_CATEGORY_ORDER)[number];

export const GRAMMAR_CATEGORY_BLURB: Record<GrammarCategory, string> = {
  "Thể lịch sự": "Câu lịch sự です / ます — nền tảng hội thoại.",
  "Trợ từ": "は を に で へ が と も の か — gắn vai trò trong câu.",
  "Chỉ định": "これ / この — chỉ vật gần, xa, kia.",
  "Động từ": "て-form, ている, phủ định ない.",
  "Tính từ": "Chia tính từ -i (かった).",
  "Tồn tại & sở hữu": "ある / いる — có, ở.",
  "Thời gian": "もう / まだ, から / まで, 前に.",
  "Ý muốn & đề nghị": "たい, ませんか, ましょう, てください.",
  "Ý kiến & suy đoán": "と思う, つもり, ようだ, らしい.",
  "Trợ động từ て": "てしまう / ておく / てみる.",
  "Điều kiện": "ば / たら / なら / ても.",
  "Lý do & mục đích": "ので / のに / ために / ように.",
  "Nghĩa vụ & mức độ": "なければならない — phải làm.",
  Khác: "Mẫu chưa xếp hạng mục.",
};

const MAP: Record<string, GrammarCategory> = {
  です: "Thể lịch sự",
  だ: "Thể lịch sự",
  ます: "Thể lịch sự",
  ません: "Thể lịch sự",
  ました: "Thể lịch sự",
  は: "Trợ từ",
  も: "Trợ từ",
  を: "Trợ từ",
  に: "Trợ từ",
  で: "Trợ từ",
  へ: "Trợ từ",
  の: "Trợ từ",
  と: "Trợ từ",
  が: "Trợ từ",
  か: "Trợ từ",
  "ね / よ": "Trợ từ",
  "これ / それ / あれ": "Chỉ định",
  "この / その / あの": "Chỉ định",
  "て-form": "Động từ",
  ている: "Động từ",
  ない: "Động từ",
  たい: "Ý muốn & đề nghị",
  ませんか: "Ý muốn & đề nghị",
  ましょう: "Ý muốn & đề nghị",
  てください: "Ý muốn & đề nghị",
  かった: "Tính từ",
  "がある / いる": "Tồn tại & sở hữu",
  "もう / まだ": "Thời gian",
  "から / まで": "Thời gian",
  前に: "Thời gian",
  と思う: "Ý kiến & suy đoán",
  つもり: "Ý kiến & suy đoán",
  ようだ: "Ý kiến & suy đoán",
  らしい: "Ý kiến & suy đoán",
  "そうだ (nghe nói)": "Ý kiến & suy đoán",
  てしまう: "Trợ động từ て",
  ておく: "Trợ động từ て",
  てみる: "Trợ động từ て",
  "ば (điều kiện)": "Điều kiện",
  たら: "Điều kiện",
  なら: "Điều kiện",
  ても: "Điều kiện",
  のに: "Lý do & mục đích",
  ので: "Lý do & mục đích",
  ために: "Lý do & mục đích",
  ように: "Lý do & mục đích",
  なければならない: "Nghĩa vụ & mức độ",
  たらどう: "Ý muốn & đề nghị",
};

export function grammarCategory(entry: GrammarEntry): GrammarCategory {
  return MAP[entry.name] ?? "Khác";
}

export function groupGrammar(entries: GrammarEntry[]) {
  const buckets = new Map<GrammarCategory, GrammarEntry[]>();
  for (const cat of GRAMMAR_CATEGORY_ORDER) buckets.set(cat, []);
  for (const g of entries) {
    const cat = grammarCategory(g);
    buckets.get(cat)!.push(g);
  }
  return GRAMMAR_CATEGORY_ORDER.map((cat) => ({ cat, items: buckets.get(cat)! })).filter(
    (x) => x.items.length > 0,
  );
}
