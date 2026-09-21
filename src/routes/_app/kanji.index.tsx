import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PagePager } from "@/components/page-pager";
import { allKanji } from "@/data/kanji-set";
import { kanjiLessonById, kanjiLessonsFor } from "@/data/kanji-lessons";
import { useProgress } from "@/lib/akari/progress";
import { cn } from "@/lib/utils";
import type { JlptLevel } from "@/lib/akari/types";

type SearchParams = { lesson?: string };

export const Route = createFileRoute("/_app/kanji/")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    lesson: typeof s.lesson === "string" ? s.lesson : undefined,
  }),
  component: Page,
});

const PAGE = 60;

function Page() {
  const { lesson: lessonParam } = Route.useSearch();
  const navigate = useNavigate();
  const selectedLesson = lessonParam ? kanjiLessonById(lessonParam) : undefined;
  const [q, setQ] = useState("");
  const [lv, setLv] = useState<"all" | JlptLevel>(selectedLesson?.level ?? "N5");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (selectedLesson) {
      setLv(selectedLesson.level);
      setPage(1);
    }
  }, [selectedLesson?.id, selectedLesson?.level]);
  const srs = useProgress((s) => s.srs);
  const all = useMemo(() => allKanji(), []);
  const lessons = kanjiLessonsFor(lv);
  const lessonChars = selectedLesson ? new Set([...selectedLesson.chars]) : null;
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
  const learning = lv === "N5" || lv === "N4";

  function setLesson(id?: string) {
    setPage(1);
    void navigate({
      to: "/kanji",
      search: id ? { lesson: id } : {},
    });
  }

  return (
    <div>
      <PageHeader
        kicker="漢字"
        title="Kanji"
        description="Học theo bài N5–N4. N3–N1 đủ bộ để tra cứu — nghe cách đọc chuẩn từng âm."
      />
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
          {(["N5", "N4", "N3", "N2", "N1", "all"] as const).map((x) => (
            <button
              key={x}
              type="button"
              onClick={() => {
                setLv(x);
                setPage(1);
                setLesson(undefined);
              }}
              className={cn(
                "h-11 rounded-[10px] border px-3 text-sm",
                lv === x && !selectedLesson ? "border-primary bg-primary text-primary-fg" : "border-border",
              )}
            >
              {x === "all" ? "Mọi cấp" : x}
            </button>
          ))}
        </div>
      </div>
      {lessons.length ? (
        <div className="mb-4">
          <p className="mb-2 text-xs uppercase tracking-[0.14em] text-subtle">
            {learning ? "Bài học" : "Bài tra cứu"}
          </p>
          {lessons.length > 12 ? (
            <select
              className="h-11 w-full rounded-[10px] border border-border bg-bg-elevated px-3 text-sm sm:max-w-md"
              value={selectedLesson?.id ?? ""}
              onChange={(e) => {
                const id = e.target.value;
                if (!id) {
                  setLesson(undefined);
                  return;
                }
                const ls = kanjiLessonById(id);
                if (ls) setLv(ls.level);
                setLesson(id);
              }}
            >
              <option value="">Cả cấp {lv === "all" ? "" : lv}</option>
              {lessons.map((ls) => (
                <option key={ls.id} value={ls.id}>
                  {ls.title} · {ls.chars.length} chữ
                </option>
              ))}
            </select>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setLesson(undefined)}
                className={cn(
                  "h-10 rounded-[10px] border px-3 text-sm",
                  !selectedLesson ? "border-primary bg-primary text-primary-fg" : "border-border",
                )}
              >
                Cả cấp
              </button>
              {lessons.map((ls) => (
                <button
                  key={ls.id}
                  type="button"
                  onClick={() => {
                    setLv(ls.level);
                    setLesson(ls.id);
                  }}
                  className={cn(
                    "h-10 max-w-full rounded-[10px] border px-3 text-sm",
                    selectedLesson?.id === ls.id ? "border-primary bg-primary text-primary-fg" : "border-border",
                  )}
                >
                  {ls.title}{" "}
                  <span className="text-xs opacity-70">{ls.chars.length}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : null}
      {selectedLesson ? <p className="mb-3 text-sm text-muted">{selectedLesson.summary}</p> : null}
      <p className="mb-3 text-sm text-subtle">
        {list.length} chữ
        {learning ? " · học" : lv === "all" ? " · học + tra cứu" : " · tra cứu"}
        {selectedLesson ? ` · ${selectedLesson.title}` : ""}
      </p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {slice.map((k) => (
          <Link
            key={k.id}
            to="/kanji/$id"
            params={{ id: k.id }}
            className={cn(
              "flex flex-col items-center rounded-lg border border-border bg-surface p-3 hover:border-accent",
              srs[k.id]?.correct ? "border-success/40" : "",
            )}
          >
            <span className="text-kana text-4xl">{k.character}</span>
            <span className="mt-1 text-xs font-medium">{k.han_viet || k.meaning_vi}</span>
            <span className="line-clamp-1 text-[11px] text-muted">{k.meaning_vi}</span>
            <Badge variant="muted" className="mt-1">
              {k.level}
            </Badge>
          </Link>
        ))}
      </div>
      <div className="mt-4">
        <PagePager page={safe} pageCount={pageCount} onPage={setPage} />
      </div>
    </div>
  );
}
