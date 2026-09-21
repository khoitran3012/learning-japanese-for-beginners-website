import { KANJI_LESSONS } from "@/data/kanji-lessons";
import { PATH_LESSONS } from "@/data/lessons-vn-path";
import type { Lesson } from "@/lib/akari/types";

const existing = new Set(PATH_LESSONS.map((l) => l.id));

function practiceIds(level: string, chars: string) {
  const lv = level.toLowerCase();
  return [...chars].map((ch) => `kj-${lv}-${ch}`);
}

/** Bài kanji N5–N4 chưa viết tay — vẫn nằm trên lộ trình học. */
export function extraKanjiPathLessons(): Lesson[] {
  const extras = KANJI_LESSONS.filter((k) => k.kind === "học" && k.pathLessonId && !existing.has(k.pathLessonId));
  return extras.map((k) => {
    const n5 = k.level === "N5";
    const same = extras.filter((x) => x.level === k.level);
    const idx = same.findIndex((x) => x.id === k.id);
    const next = same[idx + 1];
    const order = n5 ? 27.5 + idx * 0.1 : 35 + (idx + 1) * 0.1;
    return {
      id: k.pathLessonId!,
      title: `Kanji: ${k.title}`,
      title_jp: k.title_jp,
      stage: "kanji",
      level: k.level,
      order,
      focus: "kanji" as const,
      summary: k.summary,
      sections: [
        {
          heading: n5 ? "Hán-Việt rồi mới on/kun" : "Từ ghép đọc on",
          body: n5
            ? `Bài này có ${k.chars.length} chữ N5: ${[...k.chars].join(" ")}. Nhìn chữ, nói Hán-Việt, viết nét, rồi mới nghe kun/on.`
            : `Bài này có ${k.chars.length} chữ N4: ${[...k.chars].join(" ")}. Thử on trong từ ghép hai chữ trước khi kun.`,
          hanViet: [...k.chars].slice(0, 8).join(" · "),
        },
        {
          heading: "Luyện ngay",
          body: "Mở trang Kanji, chọn đúng bài, bấm từng chữ để nghe cách đọc chuẩn (hiragana, một lần). Viết 5 chữ khó nhất.",
        },
      ],
      practiceIds: practiceIds(k.level, k.chars),
      unlocks: next?.pathLessonId ? [next.pathLessonId] : [n5 ? "l-n5-grammar" : "l-n4-grammar"],
    };
  });
}

export function practiceIdsForPath(pathId: string) {
  const k = KANJI_LESSONS.find((x) => x.pathLessonId === pathId);
  if (!k) return [] as string[];
  return practiceIds(k.level, k.chars);
}

export function withKanjiPractice(lessons: Lesson[]): Lesson[] {
  return lessons.map((lesson) => {
    const extra = practiceIdsForPath(lesson.id);
    if (!extra.length) return lesson;
    const ids = [...new Set([...(lesson.practiceIds ?? []), ...extra])];
    return { ...lesson, practiceIds: ids };
  });
}
