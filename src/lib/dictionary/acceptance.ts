import { searchLocal } from "./local";
import type { DictionaryEntry } from "@/lib/akari/types";

export interface AcceptanceCase {
  q: string;
  expect: string;
  note: string;
}

export const ACCEPTANCE_CASES: AcceptanceCase[] = [
  { q: "学校", expect: "学校", note: "Kanji" },
  { q: "がっこう", expect: "学校", note: "Kana" },
  { q: "gakkou", expect: "学校", note: "Romaji" },
  { q: "trường học", expect: "学校", note: "Nghĩa Việt" },
  { q: "truong hoc", expect: "学校", note: "Nghĩa không dấu" },
  { q: "gakko", expect: "学校", note: "Romaji thiếu dấu dài" },
  { q: "食べる", expect: "食べる", note: "Động từ N5" },
  { q: "taberu", expect: "食べる", note: "Romaji động từ" },
  { q: "ăn", expect: "食べる", note: "Nghĩa Việt động từ" },
  { q: "食べます", expect: "食べる", note: "Dạng lịch sự" },
  { q: "cam on", expect: "ありがとう", note: "Cảm ơn không dấu" },
  { q: "desu", expect: "です", note: "Copula" },
  { q: "は", expect: "は", note: "Trợ từ chủ đề" },
  { q: "namae", expect: "名前", note: "Tên (romaji)" },
  { q: "tên", expect: "名前", note: "Tên (Việt)" },
  { q: "oishii", expect: "美味しい", note: "Ngon" },
  { q: "行きます", expect: "行く", note: "Đi — dạng ます" },
  { q: "iu", expect: "言う", note: "Nói" },
];

export function runAcceptance(dict: DictionaryEntry[]) {
  return ACCEPTANCE_CASES.map((c) => {
    const hits = searchLocal(dict, { q: c.q, limit: 8 });
    const hit = hits.find((e) => e.kanji === c.expect) ?? hits[0];
    const pass = Boolean(hits.some((e) => e.kanji === c.expect));
    return { ...c, pass, top: hit ? `${hit.kanji} ${hit.kana} ${hit.romaji} · ${hit.meanings[0]}` : "—" };
  });
}
