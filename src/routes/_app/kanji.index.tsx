import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PagePager } from "@/components/page-pager";
import { Button } from "@/components/ui/button";
import { allKanji } from "@/data/kanji-set";
import { KANJI_LESSONS, kanjiLessonById, kanjiLessonsByPath, kanjiLessonsFor } from "@/data/kanji-lessons";
import { useProgress } from "@/lib/akari/progress";
import { kanjiFurigana } from "@/lib/akari/on-kun";
import { KanjiLearnGuide } from "@/components/kanji-learn-guide";
import { cn } from "@/lib/utils";
import type { JlptLevel } from "@/lib/akari/types";

type LevelFilter = "all" | JlptLevel;
type SearchParams = { lesson?: string; path?: string; lv?: LevelFilter };

const LEVELS: LevelFilter[] = ["N5", "N4", "N3", "N2", "N1", "all"];

function parseLv(v: unknown): LevelFilter | undefined {
  return typeof v === "string" && (LEVELS as string[]).includes(v) ? (v as LevelFilter) : undefined;
}

export const Route = createFileRoute("/_app/kanji/")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    lesson: typeof s.lesson === "string" ? s.lesson : undefined,
    path: typeof s.path === "string" ? s.path : undefined,
    lv: parseLv(s.lv),
  }),
  component: Page,
});

const PAGE = 60;
const LEVEL_COUNTS: Record<JlptLevel, number> = { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 };

function Page() {
  const { lesson: lessonParam, path: pathParam, lv: lvParam } = Route.useSearch();
  const navigate = useNavigate();
  const selectedLesson = lessonParam ? kanjiLessonById(lessonParam) : undefined;
  const pathLessons = pathParam ? kanjiLessonsByPath(pathParam) : [];
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const lv: LevelFilter = selectedLesson
    ? selectedLesson.level
    : pathLessons[0]
      ? pathLessons[0].level
      : (lvParam ?? "N5");

  useEffect(() => {
    setPage(1);
  }, [lv, lessonParam, pathParam]);

  const srs = useProgress((s) => s.srs);
  const remember = useProgress((s) => s.remember);
  const all = useMemo(() => allKanji(), []);
  const counts = useMemo(() => {
    const c = { ...LEVEL_COUNTS };
    for (const k of all) c[k.level] += 1;
    return c;
  }, [all]);
  const lessons = kanjiLessonsFor(lv);
  const lessonChars = selectedLesson
    ? new Set([...selectedLesson.chars])
    : pathLessons.length
      ? new Set(pathLessons.flatMap((l) => [...l.chars]))
      : null;
  const list = all.filter((k) => {
    if (lv !== "all" && k.level !== lv) return false;
    if (lessonChars && !lessonChars.has(k.character)) return false;
    if (!q) return true;
    const s = q.toLowerCase();
    return (
      k.character.includes(q) ||
      k.han_viet.toLowerCase().includes(s) ||
      k.meaning_vi.toLowerCase().includes(s) ||
      k.onyomi.some((x) => x.toLowerCase().includes(s)) ||
      k.kunyomi.some((x) => x.toLowerCase().includes(s)) ||
      k.romaji.includes(s)
    );
  });
  const pageCount = Math.max(1, Math.ceil(list.length / PAGE));
  const safe = Math.min(page, pageCount);
  const slice = list.slice((safe - 1) * PAGE, safe * PAGE);

  function go(next: { lesson?: string; path?: string; lv?: LevelFilter }) {
    setPage(1);
    void navigate({
      to: "/kanji",
      search: {
        lesson: next.lesson,
        path: next.path,
        lv: next.lesson || next.path ? undefined : next.lv,
      },
    });
  }

  const levelLessons = lv === "all" ? KANJI_LESSONS : lessons;
  const learnedInView = list.filter((k) => srs[k.id]?.correct).length;

  return (
    <div>
      <PageHeader
        kicker="漢字"
        title="Kanji"
        description="Học N5→N1. Mỗi ô hiện chữ + hiragana (kun · on). Nhớ bằng Hán-Việt, bộ thủ, rồi âm."
        actions={
          <Button asChild variant="secondary">
            <Link to="/radicals">Bộ thủ</Link>
          </Button>
        }
      />
      <KanjiLearnGuide />
      <ol className="mb-4 flex flex-wrap items-center gap-1.5 text-sm">
        {(["N5", "N4", "N3", "N2", "N1"] as const).map((x, i) => (
          <li key={x} className="flex items-center gap-1.5">
            {i > 0 ? <span className="text-subtle">→</span> : null}
            <button
              type="button"
              onClick={() => go({ lv: x })}
              className={cn(
                "rounded-full border px-2.5 py-1 tabular-nums",
                lv === x && !selectedLesson && !pathParam ? "border-primary bg-primary text-primary-fg" : "border-border text-muted",
              )}
            >
              {x} · {counts[x]}
            </button>
          </li>
        ))}
      </ol>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <Input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          placeholder="Tìm kanji, Hán-Việt, nghĩa, âm..."
        />
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((x) => (
            <button
              key={x}
              type="button"
              onClick={() => go({ lv: x })}
              className={cn(
                "h-11 rounded-[10px] border px-3 text-sm",
                lv === x && !selectedLesson && !pathParam ? "border-primary bg-primary text-primary-fg" : "border-border",
              )}
            >
              {x === "all" ? "Mọi cấp" : x}
            </button>
          ))}
        </div>
      </div>
      {levelLessons.length ? (
        <div className="mb-4">
          <p className="mb-2 text-xs uppercase tracking-[0.14em] text-subtle">
            Bài học · {lv === "all" ? "N5 → N1" : `${lv} · ${levelLessons.length} bài`}
          </p>
          {levelLessons.length > 12 ? (
            <select
              className="h-11 w-full rounded-[10px] border border-border bg-bg-elevated px-3 text-sm sm:max-w-md"
              value={selectedLesson?.id ?? ""}
              onChange={(e) => {
                const id = e.target.value;
                if (!id) {
                  go({ lv });
                  return;
                }
                const ls = kanjiLessonById(id);
                go({ lesson: id, lv: ls?.level ?? lv });
              }}
            >
              <option value="">{lv === "all" ? "Cả lộ trình N5 → N1" : `Cả cấp ${lv}`}</option>
              {lv === "all"
                ? (["N5", "N4", "N3", "N2", "N1"] as const).map((level) => (
                    <optgroup key={level} label={level}>
                      {KANJI_LESSONS.filter((ls) => ls.level === level).map((ls, i) => (
                        <option key={ls.id} value={ls.id}>
                          {i + 1}. {ls.title} · {ls.chars.length} chữ
                        </option>
                      ))}
                    </optgroup>
                  ))
                : levelLessons.map((ls, i) => (
                    <option key={ls.id} value={ls.id}>
                      {i + 1}. {ls.title} · {ls.chars.length} chữ
                    </option>
                  ))}
            </select>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => go({ lv })}
                className={cn(
                  "h-10 rounded-[10px] border px-3 text-sm",
                  !selectedLesson && !pathParam ? "border-primary bg-primary text-primary-fg" : "border-border",
                )}
              >
                Cả cấp
              </button>
              {levelLessons.map((ls, i) => {
                const done = [...ls.chars].filter((ch) => {
                  const k = all.find((x) => x.character === ch);
                  return k && srs[k.id]?.correct;
                }).length;
                return (
                  <button
                    key={ls.id}
                    type="button"
                    onClick={() => go({ lesson: ls.id, lv: ls.level })}
                    className={cn(
                      "h-10 max-w-full rounded-[10px] border px-3 text-sm",
                      selectedLesson?.id === ls.id ? "border-primary bg-primary text-primary-fg" : "border-border",
                    )}
                  >
                    {i + 1}. {ls.title}{" "}
                    <span className="text-xs opacity-70">
                      {done}/{ls.chars.length}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : null}
      {selectedLesson ? <p className="mb-3 text-sm text-muted">{selectedLesson.summary}</p> : null}
      {pathLessons.length > 1 && !selectedLesson ? (
        <p className="mb-3 text-sm text-muted">
          Chặng {pathLessons[0]!.level}: {pathLessons.map((l) => l.title).join(" · ")}
        </p>
      ) : null}
      <p className="mb-3 text-sm text-subtle">
        {list.length} chữ · thứ tự học N5 → N1
        {learnedInView ? ` · đã nhớ ${learnedInView}` : ""}
        {selectedLesson ? ` · bài ${selectedLesson.seq}: ${selectedLesson.title}` : ""}
      </p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {slice.map((k, i) => {
          const known = Boolean(srs[k.id]?.correct);
          return (
            <div
              key={k.id}
              className={cn(
                "relative flex flex-col rounded-lg border border-border bg-surface hover:border-accent",
                known ? "border-success/40" : "",
              )}
            >
              <Link
                to="/kanji/$id"
                params={{ id: k.id }}
                className="flex flex-col items-center p-3 pb-10"
              >
                <span className="text-[10px] tabular-nums text-subtle">{(safe - 1) * PAGE + i + 1}</span>
                <span className="text-kana text-4xl leading-none">{k.character}</span>
                <span className="mt-1 font-jp text-[11px] leading-tight text-muted">
                  {kanjiFurigana(k).line || "—"}
                </span>
                <span className="mt-1 text-xs font-medium">{k.han_viet || k.meaning_vi}</span>
                <span className="line-clamp-1 text-[11px] text-muted">{k.meaning_vi}</span>
                <Badge variant="muted" className="mt-1">
                  {k.level}
                </Badge>
              </Link>
              <button
                type="button"
                className={cn(
                  "absolute inset-x-1 bottom-1 flex h-8 items-center justify-center gap-1 rounded-md text-[11px] font-medium",
                  known ? "bg-success/15 text-success" : "bg-choice text-fg hover:bg-choice-hover",
                )}
                onClick={() => {
                  void remember(k.id, "kanji").then(() => toast.success(`Đã nhớ ${k.character}`));
                }}
              >
                <Check className="size-3.5" />
                {known ? "Nhớ rồi" : "Đã nhớ"}
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <PagePager page={safe} pageCount={pageCount} onPage={setPage} />
      </div>
    </div>
  );
}
