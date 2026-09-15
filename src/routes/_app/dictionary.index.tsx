import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { DictEntryView } from "@/components/dict-entry-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/empty-state";
import { POS_FILTERS, rememberImported, searchDictionary, useDictionary } from "@/lib/dictionary/catalog";
import { lookupDictionaryAi } from "@/lib/dictionary/ai-lookup";
import { pushSearch, searchHistory, clearSearchHistory, putImportedEntries } from "@/lib/akari/storage";
import { useSettings } from "@/lib/akari/settings";
import { cn } from "@/lib/utils";
import type { DictionaryEntry, JlptLevel } from "@/lib/akari/types";

type SearchParams = { q?: string };

export const Route = createFileRoute("/_app/dictionary/")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  component: Page,
});

function Page() {
  const { q: qParam = "" } = Route.useSearch();
  const navigate = useNavigate();
  const [q, setQ] = useState(qParam);
  const [jlpt, setJlpt] = useState<"all" | JlptLevel>("all");
  const [pos, setPos] = useState<string | "all">("all");
  const dict = useDictionary();
  const [recent, setRecent] = useState<string[]>([]);
  const showRomaji = useSettings((s) => s.showRomaji);
  const online = useSettings((s) => s.onlineDictionary);
  const inputRef = useRef<HTMLInputElement>(null);
  const typing = useRef(false);

  useEffect(() => {
    void searchHistory().then((h) => setRecent(h.map((x) => x.query)));
  }, []);

  useEffect(() => {
    if (typing.current) return;
    if (document.activeElement === inputRef.current) return;
    setQ(qParam);
  }, [qParam]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      typing.current = false;
      const value = q.trim();
      if (value === (qParam ?? "").trim()) return;
      void navigate({ to: "/dictionary", search: value ? { q: value } : {}, replace: true });
    }, 400);
    return () => window.clearTimeout(handle);
  }, [q, qParam, navigate]);

  const browsing = !q.trim();
  const results = useMemo(() => {
    return searchDictionary(dict, {
      q: q.trim(),
      jlpt: jlpt === "all" ? undefined : [jlpt],
      pos: pos === "all" ? undefined : [pos],
      limit: browsing ? 24 : 40,
    });
  }, [dict, q, jlpt, pos, browsing]);

  function record(value: string) {
    const next = value.trim();
    if (!next) return;
    void pushSearch(next).then(() => searchHistory().then((h) => setRecent(h.map((x) => x.query))));
  }

  function commit(next: string) {
    typing.current = false;
    const value = next.trim();
    setQ(next);
    void navigate({ to: "/dictionary", search: value ? { q: value } : {} });
    record(value);
    inputRef.current?.blur();
  }

  return (
    <div>
      <PageHeader
        kicker="辞書"
        title="Từ điển Nhật – Việt"
        description={`${dict.length} mục trên máy — tra kanji, kana, romaji, dạng ます, hoặc tiếng Việt (có/không dấu).`}
      />

      <form
        className="relative mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          commit(q);
        }}
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
        <Input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            typing.current = true;
            setQ(e.target.value);
          }}
          placeholder="学校 · がっこう · gakkou · trường học · 食べます"
          className="h-12 pl-10"
          aria-label="Tra từ điển"
          autoFocus
        />
      </form>

      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", "N5", "N4", "N3"] as const).map((lv) => (
          <Button key={lv} size="sm" variant={jlpt === lv ? "default" : "secondary"} onClick={() => setJlpt(lv)}>
            {lv === "all" ? "Mọi cấp" : lv}
          </Button>
        ))}
        <span className="mx-1 w-px self-stretch bg-border" />
        <Button size="sm" variant={pos === "all" ? "default" : "secondary"} onClick={() => setPos("all")}>
          Mọi loại
        </Button>
        {POS_FILTERS.map((p) => (
          <Button key={p} size="sm" variant={pos === p ? "default" : "secondary"} onClick={() => setPos(p)}>
            {p}
          </Button>
        ))}
      </div>

      {q.trim() ? (
        results.length === 0 ? (
          <AiLookupPanel
            query={q.trim()}
            auto={online}
            onSaved={() => record(q.trim())}
          />
        ) : (
          <>
            <p className="mb-2 text-sm text-muted">
              {results.length} kết quả · {dict.length} mục trong máy
            </p>
            <ResultList results={results} showRomaji={showRomaji} onPick={(word) => record(word)} />
          </>
        )
      ) : (
        <div className="space-y-6">
          {recent.length > 0 ? (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm text-muted">Vừa tra</h2>
                <button
                  type="button"
                  className="text-xs text-subtle underline"
                  onClick={() => {
                    void clearSearchHistory();
                    setRecent([]);
                  }}
                >
                  Xóa
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recent.slice(0, 10).map((r) => (
                  <Button key={r} size="sm" variant="secondary" onClick={() => commit(r)}>
                    {r}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
          <div>
            <h2 className="mb-2 text-sm text-muted">
              {jlpt !== "all" || pos !== "all" ? "Theo bộ lọc" : "Từ phổ biến"}
              <span className="ml-2 font-normal text-subtle">{results.length}</span>
            </h2>
            <ResultList results={results} showRomaji={showRomaji} />
          </div>
        </div>
      )}
    </div>
  );
}

function AiLookupPanel({
  query,
  auto,
  onSaved,
}: {
  query: string;
  auto: boolean;
  onSaved?: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const ran = useRef("");

  async function run() {
    setBusy(true);
    setError(null);
    try {
      const res = await lookupDictionaryAi({ data: { q: query } });
      if (!res.ok) {
        setError(res.error);
        setEntry(null);
        return;
      }
      setEntry(res.entry);
    } catch {
      setError("Không tra cứu được.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    setEntry(null);
    setError(null);
    if (auto && query && ran.current !== query) {
      ran.current = query;
      void run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, auto]);

  async function save() {
    if (!entry) return;
    await putImportedEntries([entry]);
    rememberImported([entry]);
    onSaved?.();
    toast("Đã lưu vào từ điển trên máy");
  }

  return (
    <div className="space-y-4">
      <EmptyState
        title="Không có trong bộ đi kèm"
        description="Thử romaji ngắn hơn, kana, nghĩa không dấu — hoặc tra cứu bổ sung rồi lưu vào máy."
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <Button onClick={() => void run()} disabled={busy}>
              <Sparkles /> {busy ? "Đang tra…" : "Tra cứu bổ sung"}
            </Button>
            <Button asChild variant="secondary">
              <Link to="/tools/import-dictionary">Import JSON</Link>
            </Button>
          </div>
        }
      />
      {error ? <p className="text-center text-sm text-danger">{error}</p> : null}
      {entry ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">Kết quả tra cứu — kiểm tra rồi lưu nếu đúng.</p>
            <Button size="sm" onClick={() => void save()}>
              Lưu vào máy
            </Button>
          </div>
          <DictEntryView entry={entry} />
        </div>
      ) : null}
    </div>
  );
}

function ResultList({
  results,
  showRomaji,
  onPick,
}: {
  results: DictionaryEntry[];
  showRomaji: boolean;
  onPick?: (q: string) => void;
}) {
  return (
    <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
      {results.map((e) => (
        <li key={e.id}>
          <Link
            to="/dictionary/$id"
            params={{ id: e.id }}
            onClick={() => onPick?.(e.kanji)}
            className={cn("flex min-h-12 items-center gap-3 px-4 py-3 hover:bg-bg-elevated")}
          >
            <span className="w-28 shrink-0 font-jp text-lg">{e.kanji}</span>
            <span className="hidden w-28 shrink-0 text-sm text-accent sm:block">
              {showRomaji ? e.romaji : e.kana}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm">{e.meanings[0]}</span>
            <Badge variant="muted">{e.jlpt[0]}</Badge>
          </Link>
        </li>
      ))}
    </ul>
  );
}
