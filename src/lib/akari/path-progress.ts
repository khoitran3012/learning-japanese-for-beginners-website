import { HIRAGANA, KATAKANA } from "@/data/kana";
import { LESSONS } from "@/data/lessons";
import { journeyGroups, PATH_STAGES } from "./path-stages";
import type { Lesson, SrsItem } from "./types";

const HIRA_ROW = /^l-n5-hira-(a|ka|sa|ta|na|ha|ma|ya)$/;

function kanaRowIds(kind: "h" | "k", row: string) {
  const list = kind === "h" ? HIRAGANA : KATAKANA;
  return list.filter((k) => k.row === row && (k.group === "gojuon" || k.group === "dakuten" || k.group === "handakuten")).map((k) => k.id);
}

function studied(srs: Record<string, SrsItem>, id: string) {
  const it = srs[id];
  return Boolean(it && it.correct > 0);
}

function enough(hit: number, total: number) {
  if (total <= 0) return false;
  if (total <= 2) return hit >= total;
  if (total <= 8) return hit >= Math.ceil(total * 0.75);
  return hit >= Math.ceil(total * 0.5);
}

/** SRS / practice ids that count as “đã học” cho một bài lộ trình. */
export function practiceIdsForLesson(lesson: Lesson, seen = new Set<string>()): string[] {
  if (seen.has(lesson.id)) return [];
  seen.add(lesson.id);
  const ids = new Set<string>();
  const row = lesson.id.match(HIRA_ROW)?.[1];
  if (row) for (const id of kanaRowIds("h", row)) ids.add(id);
  if (lesson.id === "l-n5-hira") {
    for (const k of HIRAGANA) {
      if (k.group === "gojuon" || k.group === "dakuten" || k.group === "handakuten" || k.group === "yoon") ids.add(k.id);
    }
  }
  if (lesson.id === "l-n5-kata") {
    for (const k of KATAKANA) if (k.group === "gojuon") ids.add(k.id);
  }
  for (const id of lesson.practiceIds ?? []) {
    if (id.startsWith("l-")) {
      const nested = LESSONS.find((l) => l.id === id);
      if (nested) for (const x of practiceIdsForLesson(nested, seen)) ids.add(x);
    } else {
      ids.add(id);
    }
  }
  return [...ids];
}

export function lessonSatisfiedByStudy(
  lesson: Lesson,
  srs: Record<string, SrsItem>,
  completed: ReadonlySet<string>,
) {
  if (completed.has(lesson.id)) return true;
  if (lesson.id === "l-n5-hira") {
    const rows = LESSONS.filter((l) => /^l-n5-hira-/.test(l.id));
    if (rows.length && rows.every((l) => completed.has(l.id) || lessonSatisfiedByStudy(l, srs, completed))) {
      return true;
    }
  }
  const ids = practiceIdsForLesson(lesson);
  if (!ids.length) return false;
  const hit = ids.filter((id) => studied(srs, id)).length;
  return enough(hit, ids.length);
}

export function lessonsReadyToComplete(srs: Record<string, SrsItem>, completed: Iterable<string>) {
  const done = completed instanceof Set ? completed : new Set(completed);
  return LESSONS.filter((l) => !done.has(l.id) && lessonSatisfiedByStudy(l, srs, done)).map((l) => l.id);
}

export type StageAccess = {
  open: boolean;
  current: boolean;
  complete: boolean;
  doneCount: number;
  total: number;
};

/** Mở ôn đúng thứ tự lộ trình: chặng trước xong thì mới mở chặng sau. */
export function pathStageAccess(completed: Iterable<string>, freeMode = false) {
  const done = completed instanceof Set ? completed : new Set(completed);
  const { sorted, groups } = journeyGroups();
  const access: Record<string, StageAccess> = {};
  let foundCurrent = false;
  for (const g of groups) {
    const total = g.items.length;
    const doneCount = g.items.filter((l) => done.has(l.id)).length;
    const first = g.items[0];
    const idx = first ? sorted.findIndex((l) => l.id === first.id) : 0;
    const prevDone = idx <= 0 || done.has(sorted[idx - 1]!.id);
    const complete = total > 0 && doneCount >= total;
    const open = freeMode || prevDone || doneCount > 0;
    const current = !foundCurrent && open && !complete;
    if (current) foundCurrent = true;
    access[g.stage] = { open, current, complete, doneCount, total };
  }
  for (const s of PATH_STAGES) {
    if (!access[s.id]) access[s.id] = { open: freeMode, current: false, complete: false, doneCount: 0, total: 0 };
  }
  return access;
}
