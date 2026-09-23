import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SONGS, type SongLevel } from "@/data/songs";
import { foldVi } from "@/lib/dictionary/text";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/songs/")({ component: Page });

type LevelFilter = "all" | SongLevel;
type SeriesFilter = "all" | "hot" | "Naruto" | "Dragon Ball";

function Page() {
  const [q, setQ] = useState("");
  const [lv, setLv] = useState<LevelFilter>("all");
  const [series, setSeries] = useState<SeriesFilter>("all");
  const list = useMemo(() => {
    const s = foldVi(q.trim());
    return SONGS.filter((song) => {
      if (lv !== "all" && song.level !== lv) return false;
      if (series === "hot" && song.series && song.series !== "Nổi bật") return false;
      if (series !== "all" && series !== "hot" && song.series !== series) return false;
      if (!s) return true;
      return (
        foldVi(song.title).includes(s) ||
        foldVi(song.romaji).includes(s) ||
        foldVi(song.artist).includes(s) ||
        foldVi(song.anime).includes(s) ||
        foldVi(song.series ?? "").includes(s) ||
        song.titleKana.includes(q.trim()) ||
        song.vocab.some((v) => foldVi(v.meaning).includes(s) || v.kana.includes(q.trim()))
      );
    });
  }, [lv, q, series]);

  return (
    <div>
      <PageHeader
        kicker="歌"
        title="Bài hát anime"
        description="Stay with Me, bài đang hot, và toàn bộ opening/ending truyền hình của Naruto (kể cả Shippuden, Boruto) và Dragon Ball. Học từ rồi nghe bản chính thức. App không đăng lời."
      />
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm bài, anime, ca sĩ, từ..." />
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        {(
          [
            ["all", "Tất cả"],
            ["hot", "Đang hot"],
            ["Naruto", "Naruto"],
            ["Dragon Ball", "Dragon Ball"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSeries(id)}
            className={cn(
              "h-9 rounded-full border px-3 text-sm",
              series === id ? "border-primary bg-primary text-primary-fg" : "border-border text-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            ["all", "Tất cả"],
            ["N5", "Dễ N5"],
            ["N4", "N4"],
            ["N3", "Khó hơn"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setLv(id)}
            className={cn(
              "h-9 rounded-full border px-3 text-sm",
              lv === id ? "border-primary bg-primary text-primary-fg" : "border-border text-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="mb-3 text-sm tabular-nums text-muted">{list.length} bài</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {list.map((song) => (
          <li key={song.id}>
            <Link
              to="/songs/$id"
              params={{ id: song.id }}
              className="flex h-full flex-col rounded-xl border border-border bg-surface p-4 hover:border-accent"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-jp text-2xl text-fg">{song.title}</h2>
                <div className="flex shrink-0 gap-1">
                  {song.kind ? <Badge variant="muted">{song.kind}</Badge> : null}
                  <Badge variant="muted">{song.level}</Badge>
                </div>
              </div>
              <p className="mt-1 text-sm text-accent">{song.romaji}</p>
              <p className="mt-2 text-sm text-fg">{song.anime}</p>
              <p className="text-sm text-muted">
                {song.artist} · {song.year}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{song.why}</p>
            </Link>
          </li>
        ))}
      </ul>
      {list.length === 0 ? <p className="text-sm text-muted">Không thấy bài nào. Thử tên anime hoặc một từ tiếng Việt.</p> : null}
    </div>
  );
}
