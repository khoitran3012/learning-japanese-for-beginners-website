import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import type { VocabCategory } from "@/lib/akari/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/vocabulary/")({ component: Page });

function Page() {
  const [q, setQ] = useState("");
  const [lv, setLv] = useState<"all" | "N5" | "N4">("all");
  const [cat, setCat] = useState<VocabCategory | "all">("all");
  const srs = useProgress((s) => s.srs);
  const showRomaji = useSettings((s) => s.showRomaji);
  const all = useMemo(() => [...VOCAB_N5, ...VOCAB_N4], []);
  const cats = useMemo(() => [...new Set(all.map((v) => v.category))], [all]);
  const list = all.filter((v) => {
    if (lv !== "all" && v.level !== lv) return false;
    if (cat !== "all" && v.category !== cat) return false;
    if (!q) return true;
    const s = q.toLowerCase();
    return (
      v.word.includes(q) ||
      v.kana.includes(q) ||
      v.romaji.toLowerCase().includes(s) ||
      v.meaning_vi.toLowerCase().includes(s)
    );
  });

  return (
    <div>
      <PageHeader kicker="単語" title="Từ vựng" description="Lọc N5/N4, chủ đề, tìm romaji hoặc tiếng Việt." />
      <div className="mb-4 grid gap-2 md:grid-cols-3">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm từ, kana, romaji, nghĩa..." />
        <select
          className="h-11 rounded-[10px] border border-border bg-bg-elevated px-3 text-sm"
          value={lv}
          onChange={(e) => setLv(e.target.value as typeof lv)}
        >
          <option value="all">Mọi cấp</option>
          <option value="N5">N5</option>
          <option value="N4">N4</option>
        </select>
        <select
          className="h-11 rounded-[10px] border border-border bg-bg-elevated px-3 text-sm"
          value={cat}
          onChange={(e) => setCat(e.target.value as typeof cat)}
        >
          <option value="all">Mọi chủ đề</option>
          {cats.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <p className="mb-3 text-sm text-muted">{list.length} từ</p>
      <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
        {list.map((v) => (
          <li key={v.id}>
            <Link
              to="/vocabulary/$id"
              params={{ id: v.id }}
              className={cn("flex items-center gap-3 px-4 py-3 hover:bg-bg-elevated", srs[v.id]?.correct && "bg-success/5")}
            >
              <span className="w-28 font-jp text-lg">{v.word}</span>
              <span className="hidden w-28 text-sm text-accent sm:block">{showRomaji ? v.romaji : v.kana}</span>
              <span className="flex-1 text-sm">{v.meaning_vi}</span>
              <Badge variant="muted">{v.level}</Badge>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
