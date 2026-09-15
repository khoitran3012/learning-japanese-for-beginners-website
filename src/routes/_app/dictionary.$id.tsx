import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DictEntryView } from "@/components/dict-entry-view";
import { Button } from "@/components/ui/button";
import { findEntry, fullDictionary } from "@/lib/dictionary/catalog";
import type { DictionaryEntry } from "@/lib/akari/types";

export const Route = createFileRoute("/_app/dictionary/$id")({
  component: Page,
  notFoundComponent: () => (
    <div className="space-y-3">
      <p className="text-sm text-muted">Không tìm thấy mục từ này.</p>
      <Button asChild variant="secondary" size="sm">
        <Link to="/dictionary">← Về từ điển</Link>
      </Button>
    </div>
  ),
});

function Page() {
  const { id } = Route.useParams();
  const [entry, setEntry] = useState<DictionaryEntry | null>(() => findEntry(id) ?? null);
  const [ready, setReady] = useState(Boolean(entry));

  useEffect(() => {
    let alive = true;
    const cached = findEntry(id) ?? null;
    if (cached) {
      setEntry(cached);
      setReady(true);
    }
    void fullDictionary().then((dict) => {
      if (!alive) return;
      setEntry(dict.find((e) => e.id === id) ?? cached);
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, [id]);

  if (!ready) {
    return <p className="text-sm text-muted">Đang mở mục từ…</p>;
  }
  if (!entry) throw notFound();

  return (
    <div className="space-y-4">
      <Button asChild variant="ghost" size="sm">
        <Link to="/dictionary">← Từ điển</Link>
      </Button>
      <DictEntryView entry={entry} />
    </div>
  );
}
