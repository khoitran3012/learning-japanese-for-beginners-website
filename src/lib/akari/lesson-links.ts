import { HIRAGANA, KATAKANA } from "@/data/kana";
import type { Lesson } from "@/lib/akari/types";

export type LessonLink = {
  to: string;
  label: string;
};

const ROW_LESSON: Record<string, string> = {
  "l-n5-hira-a": "a",
  "l-n5-hira-ka": "ka",
  "l-n5-hira-sa": "sa",
  "l-n5-hira-ta": "ta",
  "l-n5-hira-na": "na",
  "l-n5-hira-ha": "ha",
  "l-n5-hira-ma": "ma",
  "l-n5-hira-ya": "ya",
};

function kanaHref(kind: "hiragana" | "katakana", row?: string) {
  const list = kind === "hiragana" ? HIRAGANA : KATAKANA;
  const found = row ? list.find((k) => k.row === row) : list[0];
  if (!found) return `/${kind}`;
  return `/${kind}/${found.id}`;
}

function practiceLink(id: string): LessonLink | null {
  if (id.startsWith("h-")) return { to: `/hiragana/${id}`, label: "Hiragana" };
  if (id.startsWith("k-")) return { to: `/katakana/${id}`, label: "Katakana" };
  if (id.startsWith("v-")) return { to: `/vocabulary/${id}`, label: "Từ vựng" };
  if (id.startsWith("g-")) return { to: `/grammar/${id}`, label: "Ngữ pháp" };
  if (id.startsWith("kj-")) return { to: `/kanji/${id}`, label: "Kanji" };
  return null;
}

function stageLink(lesson: Lesson): LessonLink {
  const row = ROW_LESSON[lesson.id];
  if (row) return { to: kanaHref("hiragana", row), label: `Hàng ${row.toUpperCase()}` };

  switch (lesson.stage) {
    case "nền tảng":
      if (lesson.id === "l0-1") return { to: "/alphabet", label: "Bảng chữ cái" };
      if (lesson.id === "l0-2") return { to: "/romaji", label: "Romaji" };
      return { to: kanaHref("hiragana", "a"), label: "Nguyên âm" };
    case "hiragana":
      return { to: "/hiragana", label: "Hiragana" };
    case "katakana":
      return { to: "/katakana", label: "Katakana" };
    case "từ vựng":
      return { to: "/vocabulary", label: "Từ vựng" };
    case "giao tiếp":
      if (lesson.focus === "nghe nói") return { to: "/listen", label: "Luyện nghe" };
      return { to: "/vocabulary", label: "Từ vựng" };
    case "ngữ pháp":
      return { to: "/grammar", label: "Ngữ pháp" };
    case "kanji":
      return { to: "/kanji", label: "Kanji" };
    case "đọc":
      return { to: "/read", label: "Luyện đọc" };
    case "nghe":
      return { to: "/listen", label: "Luyện nghe" };
    case "kiểm tra":
      return { to: "/quiz", label: "Quiz" };
    case "nâng cao":
      return { to: "/dictionary", label: "Từ điển N3–N1" };
    default:
      return { to: "/daily", label: "Bài hôm nay" };
  }
}

export function lessonPracticeLinks(lesson: Lesson): LessonLink[] {
  const links: LessonLink[] = [stageLink(lesson)];
  const seen = new Set(links.map((l) => l.to));
  for (const id of lesson.practiceIds ?? []) {
    const extra = practiceLink(id);
    if (!extra || seen.has(extra.to)) continue;
    seen.add(extra.to);
    links.push(extra);
  }
  return links;
}

export function primaryLessonHref(lesson: Lesson) {
  return lessonPracticeLinks(lesson)[0]?.to ?? `/path/${lesson.id}`;
}
