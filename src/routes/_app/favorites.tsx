import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { DynamicLink } from "@/components/dynamic-link";
import { useProgress } from "@/lib/akari/progress";
import { resolveStudyItem, useDictionary } from "@/lib/dictionary/catalog";

export const Route = createFileRoute("/_app/favorites")({ component: Page });

function Page() {
  useDictionary();
  const ids = [...useProgress((s) => s.favorites)];
  const items = ids.map(resolveStudyItem).filter(Boolean);

  return (
    <div>
      <PageHeader kicker="星" title="Yêu thích" description="Các chữ và từ bạn đánh dấu sao." />
      {items.length === 0 ? (
        <EmptyState
          title="Chưa có mục yêu thích"
          description="Mở một từ hoặc chữ rồi bấm Yêu thích."
          action={
            <Button asChild>
              <Link to="/dictionary">Mở từ điển</Link>
            </Button>
          }
        />
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
          {items.map((item) =>
            item ? (
              <li key={item.id}>
                <DynamicLink
                  to={item.to}
                  className="flex min-h-12 items-center justify-between px-4 py-3 hover:bg-bg-elevated"
                >
                  <span>
                    <span className="font-jp text-lg">{item.title}</span>
                    <span className="ml-2 text-sm text-muted">{item.sub}</span>
                  </span>
                  <span className="text-[11px] uppercase tracking-wide text-subtle">{item.type}</span>
                </DynamicLink>
              </li>
            ) : null,
          )}
        </ul>
      )}
    </div>
  );
}
