import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  RADICALS,
  RADICAL_GROUPS,
  RADICAL_LESSONS,
  learnRadicals,
  radicalById,
  type Radical,
  type RadicalStage,
} from "@/data/radicals";
import { useProgress } from "@/lib/akari/progress";
import { cn } from "@/lib/utils";
import { foldVi } from "@/lib/dictionary/text";

type Filter = "hoc" | "all" | RadicalStage | (typeof RADICAL_GROUPS)[number] | string;

type SearchParams = { lesson?: string };

export const Route = createFileRoute("/_app/radicals/")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    lesson: typeof s.lesson === "string" ? s.lesson : undefined,
  }),
  component: Page,
});

function matches(r: Radical, q: string) {
  if (!q) return true;
  const s = foldVi(q);
  return (
    r.char.includes(q) ||
    (r.parent && r.parent.includes(q)) ||
    r.variants.some((v) => v.includes(q)) ||
    foldVi(r.han_viet).includes(s) ||
    foldVi(r.meaning_vi).includes(s) ||
    foldVi(r.name_jp).includes(s) ||
    r.name_kana.includes(q) ||
    r.examples.includes(q)
  );
}

function Page() {
  const { lesson } = Route.useSearch();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("hoc");
  const srs = useProgress((s) => s.srs);
  const selected = lesson ? RADICAL_LESSONS.find((x) => x.id === lesson) : undefined;

  const list = useMemo(() => {
    let pool: Radical[] = selected
      ? selected.ids.map(radicalById).filter((x): x is Radical => Boolean(x))
      : filter === "hoc"
        ? learnRadicals()
        : filter === "all"
          ? RADICALS
          : filter === "nen-tang" || filter === "n5" || filter === "n4" || filter === "tra-cuu"
            ? RADICALS.filter((x) => x.stage === filter)
            : RADICALS.filter((x) => x.group === filter);
    if (q.trim()) pool = (selected ? RADICALS : pool).filter((x) => matches(x, q.trim()));
    return pool;
  }, [filter, q, selected]);

  const first = list[0] ?? learnRadicals()[0];
  const learned = list.filter((x) => srs[x.id]?.correct).length;

  return (
    <div>
      <PageHeader
        kicker="部首"
        title="Bộ thủ"
        description="Phần chữ lặp lại trong kanji. Học biến thể (氵亻扌) trước — nhìn bộ là đoán được nghĩa."
        actions={
          first ? (
            <Button asChild>
              <Link to="/radicals/$id" params={{ id: first.id }}>
                Bắt đầu học
              </Link>
            </Button>
          ) : null
        }
      />

      <div className="mb-4">
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-subtle">Bài học</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setFilter("hoc");
              void navigate({ to: "/radicals", search: {} });
            }}
            className={cn(
              "h-10 rounded-[10px] border px-3 text-sm",
              !selected && filter === "hoc" ? "border-primary bg-primary text-primary-fg" : "border-border",
            )}
          >
            Học trước
          </button>
          {RADICAL_LESSONS.map((ls, i) => (
            <button
              key={ls.id}
              type="button"
              onClick={() => void navigate({ to: "/radicals", search: { lesson: ls.id } })}
              className={cn(
                "h-10 rounded-[10px] border px-3 text-sm",
                selected?.id === ls.id ? "border-primary bg-primary text-primary-fg" : "border-border",
              )}
            >
              {i + 1}. {ls.title}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm bộ, Hán-Việt, さんずい, kanji…"
        />
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            ["hoc", "Cần học"],
            ["nen-tang", "Nền tảng"],
            ["n5", "N5"],
            ["n4", "N4"],
            ["all", "Tất cả"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setFilter(id);
              void navigate({ to: "/radicals", search: {} });
            }}
            className={cn(
              "h-9 rounded-full border px-3 text-xs",
              !selected && filter === id ? "border-primary bg-primary text-primary-fg" : "border-border text-muted",
            )}
          >
            {label}
          </button>
        ))}
        {RADICAL_GROUPS.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => {
              setFilter(g);
              void navigate({ to: "/radicals", search: {} });
            }}
            className={cn(
              "h-9 rounded-full border px-3 text-xs",
              !selected && filter === g ? "border-primary bg-primary text-primary-fg" : "border-border text-muted",
            )}
          >
            {g}
          </button>
        ))}
      </div>

      {selected ? <p className="mb-3 text-sm text-muted">{selected.summary}</p> : null}
      <p className="mb-3 text-sm text-subtle">
        {list.length} bộ
        {learned ? ` · đã nhớ ${learned}` : ""}
        {selected ? ` · ${selected.title}` : ""}
      </p>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {list.map((x) => (
          <Link
            key={x.id}
            to="/radicals/$id"
            params={{ id: x.id }}
            className={cn(
              "flex flex-col items-center rounded-lg border border-border bg-surface p-3 hover:border-accent",
              srs[x.id]?.correct ? "border-success/40" : "",
            )}
          >
            <span className="text-kana text-4xl leading-none">{x.char}</span>
            {x.parent && x.parent !== x.char ? (
              <span className="mt-1 font-jp text-xs text-muted">← {x.parent}</span>
            ) : null}
            <span className="mt-1 text-xs font-medium">{x.han_viet}</span>
            <span className="line-clamp-1 text-[11px] text-muted">{x.meaning_vi}</span>
            <span className="mt-1 font-jp text-[11px] text-subtle">{x.name_kana}</span>
          </Link>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="text-sm text-muted">Không thấy bộ thủ khớp. Thử Hán-Việt hoặc tên Nhật (さんずい).</p>
      ) : null}
    </div>
  );
}
