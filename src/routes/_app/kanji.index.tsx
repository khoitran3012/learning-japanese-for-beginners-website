import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { KANJI_N5 } from "@/data/kanji-n5";
import { KANJI_N4 } from "@/data/kanji-n4";
import { useProgress } from "@/lib/akari/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/kanji/")({ component: Page });

function Page() {
  const [q, setQ] = useState("");
  const [lv, setLv] = useState<"all" | "N5" | "N4">("all");
  const srs = useProgress((s) => s.srs);
  const all = useMemo(() => [...KANJI_N5, ...KANJI_N4], []);
  const list = all.filter((k) => {
    if (lv !== "all" && k.level !== lv) return false;
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

  return (
    <div>
      <PageHeader kicker="漢字" title="Kanji" description="Hán-Việt neo nghĩa, rồi onyomi / kunyomi, số nét và từ ghép." />
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm kanji, Hán-Việt, nghĩa, âm..." />
        <div className="flex gap-2">
          {(["all", "N5", "N4"] as const).map((x) => (
            <button
              key={x}
              type="button"
              onClick={() => setLv(x)}
              className={cn("h-11 rounded-[10px] border px-3 text-sm", lv === x ? "border-primary bg-primary text-primary-fg" : "border-border")}
            >
              {x === "all" ? "Tất cả" : x}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {list.map((k) => (
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
            <Badge variant="muted" className="mt-1">{k.level}</Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
