import { useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { HIRAGANA, KATAKANA } from "@/data/kana";
import { allKanji } from "@/data/kanji-set";
import { RADICALS } from "@/data/radicals";
import { GRAMMAR_N5 } from "@/data/grammar-n5";
import { GRAMMAR_N4 } from "@/data/grammar-n4";
import { LESSONS } from "@/data/lessons";
import { SONGS } from "@/data/songs";
import { searchLocal } from "@/lib/dictionary/local";
import { useDictionary } from "@/lib/dictionary/catalog";
import { foldVi } from "@/lib/dictionary/text";
import { normalizeRomaji } from "@/lib/akari/romaji";

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const dict = useDictionary();

  const results = useMemo(() => {
    const query = q.trim();
    if (query.length < 1) return [] as Array<{ type: string; title: string; sub: string; to: string }>;
    const nq = normalizeRomaji(query);
    const qFold = foldVi(query);
    const out: Array<{ type: string; title: string; sub: string; to: string }> = [];

    for (const k of [...HIRAGANA, ...KATAKANA]) {
      if (k.char === query || k.romaji === nq || k.romaji.startsWith(nq) || k.id.includes(query)) {
        out.push({
          type: k.kind === "hiragana" ? "Hiragana" : "Katakana",
          title: k.char,
          sub: k.romaji,
          to: `/${k.kind}/${k.id}`,
        });
      }
    }
    for (const kj of allKanji()) {
      if (
        kj.character === query ||
        foldVi(kj.meaning_vi).includes(qFold) ||
        foldVi(kj.han_viet).includes(qFold) ||
        kj.onyomi.some((x) => x.includes(query)) ||
        kj.kunyomi.some((x) => x.includes(query))
      ) {
        out.push({
          type: "Kanji",
          title: kj.character,
          sub: kj.han_viet ? `${kj.han_viet} · ${kj.meaning_vi}` : kj.meaning_vi,
          to: `/kanji/${kj.id}`,
        });
      }
    }
    for (const rd of RADICALS) {
      if (
        rd.char === query ||
        rd.parent === query ||
        rd.variants.includes(query) ||
        foldVi(rd.han_viet).includes(qFold) ||
        foldVi(rd.meaning_vi).includes(qFold) ||
        rd.name_kana.includes(query) ||
        foldVi(rd.name_jp).includes(qFold)
      ) {
        out.push({
          type: "Bộ thủ",
          title: rd.char,
          sub: `${rd.han_viet} · ${rd.name_kana} · ${rd.meaning_vi}`,
          to: `/radicals/${rd.id}`,
        });
      }
    }
    for (const g of [...GRAMMAR_N5, ...GRAMMAR_N4]) {
      if (g.name.includes(query) || g.structure.includes(query) || foldVi(g.meaning_vi).includes(qFold)) {
        out.push({ type: "Ngữ pháp", title: g.name, sub: g.meaning_vi, to: `/grammar/${g.id}` });
      }
    }
    for (const l of LESSONS) {
      if (foldVi(l.title).includes(qFold) || foldVi(l.summary).includes(qFold)) {
        out.push({ type: "Bài học", title: l.title, sub: l.summary, to: `/path/${l.id}` });
      }
    }
    for (const song of SONGS) {
      if (
        song.title.includes(query) ||
        song.titleKana.includes(query) ||
        foldVi(song.romaji).includes(qFold) ||
        foldVi(song.anime).includes(qFold) ||
        foldVi(song.series ?? "").includes(qFold) ||
        foldVi(song.artist).includes(qFold) ||
        foldVi(song.title).includes(qFold)
      ) {
        out.push({
          type: "Bài hát",
          title: song.title,
          sub: `${song.anime} · ${song.artist}`,
          to: `/songs/${song.id}`,
        });
      }
    }
    for (const d of searchLocal(dict, { q: query, limit: 8 })) {
      out.push({
        type: "Từ điển",
        title: d.kanji,
        sub: `${d.kana} · ${d.meanings[0]}`,
        to: `/dictionary/${d.id}`,
      });
    }
    return out.slice(0, 20);
  }, [dict, q]);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Tìm kiếm</DialogTitle>
        </DialogHeader>
        <div className="p-3">
          <Input
            autoFocus
            placeholder="Kanji, kana, romaji, tiếng Việt..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Tìm kiếm toàn cục"
          />
        </div>
        <ul className="max-h-80 overflow-y-auto pb-3">
          {q && results.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-muted">Không tìm thấy.</li>
          ) : null}
          {results.map((r, i) => (
            <li key={`${r.to}-${i}`}>
              <button
                type="button"
                className="flex min-h-12 w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-choice"
                onClick={() => {
                  onOpenChange(false);
                  void router.navigate({ to: r.to as never });
                }}
              >
                <span className="w-20 shrink-0 text-[11px] uppercase tracking-wide text-muted">
                  {r.type}
                </span>
                <span className="font-jp text-base">{r.title}</span>
                <span className="truncate text-sm text-muted">{r.sub}</span>
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
