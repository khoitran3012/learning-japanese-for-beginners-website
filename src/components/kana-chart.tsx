import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { toast } from "sonner";
import type { KanaChar, KanaGroup, KanaKind } from "@/lib/akari/types";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const GROUPS: { id: KanaGroup; label: string }[] = [
  { id: "gojuon", label: "Gojuon" },
  { id: "dakuten", label: "Dakuten" },
  { id: "handakuten", label: "Handakuten" },
  { id: "yoon", label: "Âm ghép" },
  { id: "sokuon", label: "Sokuon / âm dài" },
  { id: "foreign", label: "Âm mượn" },
  { id: "choon", label: "Âm dài" },
];

export function KanaChart({ kind, chars }: { kind: KanaKind; chars: KanaChar[] }) {
  const srs = useProgress((s) => s.srs);
  const remember = useProgress((s) => s.remember);
  const showRomaji = useSettings((s) => s.showRomaji);
  const groups = GROUPS.filter((g) => chars.some((c) => c.group === g.id));

  return (
    <div className="space-y-8">
      {groups.map((g) => {
        const list = chars.filter((c) => c.group === g.id);
        return (
          <section key={g.id}>
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-muted">{g.label}</h2>
              <Badge variant="muted">{list.length}</Badge>
            </div>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-5 md:grid-cols-10">
              {list.map((c) => {
                const learned = (srs[c.id]?.correct ?? 0) > 0;
                return (
                  <div
                    key={c.id}
                    className={cn(
                      "relative flex aspect-square flex-col rounded-lg border border-border bg-surface",
                      learned && "border-success/40 bg-success/5",
                    )}
                  >
                    <Link
                      to={kind === "hiragana" ? "/hiragana/$id" : "/katakana/$id"}
                      params={{ id: c.id }}
                      className="flex min-h-0 flex-1 flex-col items-center justify-center px-1 pb-7 pt-1 text-center hover:border-accent"
                    >
                      <span className="text-kana text-2xl sm:text-3xl">{c.char}</span>
                      {showRomaji ? <span className="mt-0.5 text-[10px] text-muted">{c.romaji}</span> : null}
                    </Link>
                    <button
                      type="button"
                      className={cn(
                        "absolute inset-x-1 bottom-1 flex h-6 items-center justify-center gap-0.5 rounded text-[10px] font-medium",
                        learned ? "bg-success/15 text-success" : "bg-choice text-fg hover:bg-choice-hover",
                      )}
                      onClick={() => {
                        void remember(c.id, "kana").then(() => toast.success(`Đã nhớ ${c.char}`));
                      }}
                    >
                      <Check className="size-3" />
                      {learned ? "Nhớ" : "Đã nhớ"}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
