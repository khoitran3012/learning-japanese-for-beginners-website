import { TREE_XP } from "./trees";
import { todayKey } from "@/lib/utils";
import type { SrsItem } from "@/lib/akari/types";
import type { DayStats } from "@/lib/akari/storage";
import type { DailyGoalItem, GardenDayMark, GardenHistoryRow } from "./types";

function studiedToday(item: SrsItem, today: string) {
  return item.lastStudied > 0 && todayKey(new Date(item.lastStudied)) === today;
}

export function dailyGoalsFrom(input: {
  today: DayStats | null;
  srs: Record<string, SrsItem>;
  date: string;
}): DailyGoalItem[] {
  const items = input.today?.items ?? 0;
  const minutes = input.today?.minutes ?? 0;
  const quizzes = input.today?.quizzes ?? 0;
  const kana = Object.values(input.srs).filter(
    (x) => (x.id.startsWith("h-") || x.id.startsWith("k-")) && studiedToday(x, input.date),
  ).length;
  const kanji = Object.values(input.srs).filter(
    (x) => x.id.startsWith("kj-") && studiedToday(x, input.date),
  ).length;
  return [
    {
      id: "words",
      label: `Học / ôn ${TREE_XP.dailyItems} từ`,
      href: "/review",
      done: items >= TREE_XP.dailyItems,
      current: items,
      target: TREE_XP.dailyItems,
    },
    {
      id: "kana",
      label: "Học hiragana hoặc katakana",
      href: "/alphabet",
      done: kana >= 3,
      current: kana,
      target: 3,
    },
    {
      id: "kanji",
      label: "Học kanji",
      href: "/kanji",
      done: kanji >= 3,
      current: kanji,
      target: 3,
    },
    {
      id: "quiz",
      label: "Làm 1 bài quiz hoặc nghe",
      href: "/quiz",
      done: quizzes >= 1,
      current: quizzes,
      target: 1,
    },
    {
      id: "time",
      label: `Học ít nhất ${TREE_XP.dailyMinutes} phút`,
      href: "/daily",
      done: minutes >= TREE_XP.dailyMinutes,
      current: Math.round(minutes),
      target: TREE_XP.dailyMinutes,
    },
  ];
}

export function historyFromDays(days: DayStats[]): GardenHistoryRow[] {
  return [...days]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 10)
    .map((d) => {
      const xp = d.items * TREE_XP.perVocab + d.quizzes * TREE_XP.perQuiz + (d.minutes >= TREE_XP.dailyMinutes ? TREE_XP.dailyGoalBonus : 0);
      const parts: string[] = [];
      if (d.items) parts.push(`${d.items} từ`);
      if (d.quizzes) parts.push(`${d.quizzes} quiz`);
      if (d.minutes) parts.push(`${Math.round(d.minutes)} phút`);
      return { date: d.date, xp, note: parts.join(" · ") || "Học nhẹ" };
    });
}

export function calendarMarks(days: DayStats[], today: string, weeks = 4): GardenDayMark[] {
  const map = new Map(days.map((d) => [d.date, d]));
  const [y, m, d] = today.split("-").map(Number);
  const end = new Date(Date.UTC(y!, m! - 1, d!));
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (weeks * 7 - 1));
  const out: GardenDayMark[] = [];
  for (let t = start.getTime(); t <= end.getTime(); t += 86400000) {
    const dt = new Date(t);
    const key = dt.toISOString().slice(0, 10);
    const hit = map.get(key);
    out.push({
      date: key,
      minutes: hit?.minutes ?? 0,
      items: hit?.items ?? 0,
      quizzes: hit?.quizzes ?? 0,
    });
  }
  return out;
}

export function formatVnDate(iso: string) {
  const [y, m, d] = iso.split("-");
  if (!d) return iso;
  return `${d}/${m}/${y}`;
}
