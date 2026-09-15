import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { GRAMMAR_N5 } from "@/data/grammar-n5";
import { GRAMMAR_N4 } from "@/data/grammar-n4";

export const Route = createFileRoute("/_app/grammar/")({ component: Page });

function Page() {
  const [lv, setLv] = useState<"all" | "N5" | "N4">("all");
  const all = [...GRAMMAR_N5, ...GRAMMAR_N4].filter((g) => lv === "all" || g.level === lv);

  return (
    <div>
      <PageHeader kicker="文法" title="Ngữ pháp" description="Cấu trúc, cách dùng, ví dụ gốc và lỗi thường gặp — giải thích bằng tiếng Việt." />
      <div className="mb-4 flex gap-2">
        {(["all", "N5", "N4"] as const).map((x) => (
          <button
            key={x}
            type="button"
            onClick={() => setLv(x)}
            className={`h-10 rounded-[10px] border px-3 text-sm ${lv === x ? "border-primary bg-primary text-primary-fg" : "border-border"}`}
          >
            {x === "all" ? "Tất cả" : x}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {all.map((g) => (
          <li key={g.id}>
            <Link to="/grammar/$id" params={{ id: g.id }} className="block rounded-xl border border-border bg-surface px-4 py-3 hover:border-accent">
              <div className="flex items-center gap-2">
                <span className="font-jp text-lg">{g.name}</span>
                <Badge variant="muted">{g.level}</Badge>
              </div>
              <p className="text-sm text-muted">{g.structure} — {g.meaning_vi}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
