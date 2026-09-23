import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GRAMMAR_N5 } from "@/data/grammar-n5";
import { GRAMMAR_N4 } from "@/data/grammar-n4";
import { GRAMMAR_CATEGORY_BLURB, groupGrammar } from "@/lib/akari/grammar-categories";
import { RememberMark } from "@/components/remember-actions";

export const Route = createFileRoute("/_app/grammar/")({ component: Page });

function Page() {
  const [lv, setLv] = useState<"all" | "N5" | "N4">("all");
  const all = useMemo(
    () => [...GRAMMAR_N5, ...GRAMMAR_N4].filter((g) => lv === "all" || g.level === lv),
    [lv],
  );
  const groups = useMemo(() => groupGrammar(all), [all]);

  return (
    <div>
      <PageHeader
        kicker="文法"
        title="Ngữ pháp"
        description="Chia ô theo hạng mục dùng hàng ngày — chọn mục rồi vào từng mẫu."
      />
      <div className="mb-5 flex flex-wrap gap-2">
        {(["all", "N5", "N4"] as const).map((x) => (
          <Button key={x} size="sm" variant={lv === x ? "default" : "secondary"} onClick={() => setLv(x)}>
            {x === "all" ? "Tất cả" : x}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map(({ cat, items }) => (
          <Card key={cat}>
            <CardContent className="space-y-3">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-medium">{cat}</h2>
                <span className="text-xs tabular-nums text-subtle">{items.length} mẫu</span>
              </div>
              <p className="text-sm text-muted">{GRAMMAR_CATEGORY_BLURB[cat]}</p>
              <ul className="divide-y divide-border overflow-hidden rounded-[10px] border border-border">
                {items.map((g) => (
                  <li key={g.id} className="flex items-center gap-2 pr-2">
                    <Link
                      to="/grammar/$id"
                      params={{ id: g.id }}
                      className="block min-w-0 flex-1 px-3 py-2.5 hover:bg-bg-elevated"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-jp text-base">{g.name}</span>
                        <Badge variant="muted">{g.level}</Badge>
                      </div>
                      <p className="text-sm text-muted">{g.meaning_vi}</p>
                    </Link>
                    <RememberMark id={g.id} itemType="grammar" label={g.name} />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
