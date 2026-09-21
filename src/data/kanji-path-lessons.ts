import { KANJI_LESSONS, kanjiLessonsByPath } from "@/data/kanji-lessons";
import { PATH_LESSONS } from "@/data/lessons-vn-path";
import type { JlptLevel, Lesson } from "@/lib/akari/types";

const existing = new Set(PATH_LESSONS.map((l) => l.id));

function practiceIds(level: string, chars: string) {
  const lv = level.toLowerCase();
  return [...chars].map((ch) => `kj-${lv}-${ch}`);
}

const ORDER_START: Record<JlptLevel, number> = {
  N5: 27.05,
  N4: 35.05,
  N3: 40.1,
  N2: 41.1,
  N1: 42.1,
};

const NEXT_STAGE: Record<JlptLevel, string> = {
  N5: "l-n5-grammar",
  N4: "l-n4-grammar",
  N3: "l-n2-start",
  N2: "l-n1-start",
  N1: "l-n1-start",
};

function headingFor(level: JlptLevel) {
  if (level === "N5") return "Hán-Việt rồi mới on/kun";
  if (level === "N4") return "Từ ghép đọc on";
  return "Chữ hay gặp trước, nét khó sau";
}

function bodyFor(level: JlptLevel, chars: string) {
  const n = chars.length;
  const sample = [...chars].slice(0, 12).join(" ");
  if (level === "N5") {
    return `Bài này có ${n} chữ N5: ${sample}. Nhìn chữ, nói Hán-Việt, viết nét, rồi mới nghe kun/on.`;
  }
  if (level === "N4") {
    return `Bài này có ${n} chữ N4: ${sample}. Thử on trong từ ghép hai chữ trước khi kun.`;
  }
  return `Bài này có ${n} chữ ${level}: ${sample}… Học theo thứ tự N5→N1. Mỗi chữ: Hán-Việt → nghĩa Việt → on/kun → viết nét.`;
}

/** Bài kanji chưa viết tay — N5–N1, gom theo chặng lộ trình. */
export function extraKanjiPathLessons(): Lesson[] {
  const pathIds: string[] = [];
  for (const k of KANJI_LESSONS) {
    if (k.kind !== "học" || !k.pathLessonId) continue;
    if (existing.has(k.pathLessonId)) continue;
    if (!pathIds.includes(k.pathLessonId)) pathIds.push(k.pathLessonId);
  }

  const byLevel = new Map<JlptLevel, string[]>();
  for (const id of pathIds) {
    const first = kanjiLessonsByPath(id)[0];
    if (!first) continue;
    const list = byLevel.get(first.level) ?? [];
    list.push(id);
    byLevel.set(first.level, list);
  }

  const extras: Lesson[] = [];
  for (const level of ["N5", "N4", "N3", "N2", "N1"] as JlptLevel[]) {
    const ids = byLevel.get(level) ?? [];
    ids.forEach((pathId, idx) => {
      const parts = kanjiLessonsByPath(pathId);
      const chars = parts.map((p) => p.chars).join("");
      const titles = parts.map((p) => p.title);
      const next = ids[idx + 1];
      const title =
        parts.length === 1
          ? `Kanji: ${parts[0]!.title}`
          : `Kanji ${level} · chặng ${idx + 1}`;
      extras.push({
        id: pathId,
        title,
        title_jp: parts[0]?.title_jp ?? level,
        stage: level === "N5" || level === "N4" ? "kanji" : "nâng cao",
        level,
        order: ORDER_START[level] + idx * 0.05,
        focus: "kanji",
        summary:
          parts.length === 1
            ? parts[0]!.summary
            : `${chars.length} chữ ${level}: ${titles.join(" · ")}.`,
        sections: [
          {
            heading: headingFor(level),
            body: bodyFor(level, chars),
            hanViet: [...chars].slice(0, 8).join(" · "),
          },
          {
            heading: "Luyện ngay",
            body: `Mở trang Kanji, chọn cấp ${level}${parts[0] ? `, bài «${parts[0].title}»` : ""}. Học hết chữ trong chặng rồi mới sang chặng sau.`,
          },
        ],
        practiceIds: practiceIds(level, chars),
        unlocks: next ? [next] : level === "N1" ? [] : [NEXT_STAGE[level]],
      });
    });
  }
  return extras;
}

export function practiceIdsForPath(pathId: string) {
  const parts = kanjiLessonsByPath(pathId);
  if (!parts.length) return [] as string[];
  return parts.flatMap((k) => practiceIds(k.level, k.chars));
}

export function withKanjiPractice(lessons: Lesson[]): Lesson[] {
  return lessons.map((lesson) => {
    const extra = practiceIdsForPath(lesson.id);
    if (!extra.length) return lesson;
    const ids = [...new Set([...(lesson.practiceIds ?? []), ...extra])];
    return { ...lesson, practiceIds: ids };
  });
}
