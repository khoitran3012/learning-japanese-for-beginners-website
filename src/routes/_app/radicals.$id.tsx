import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SpeakButton } from "@/components/speak-button";
import { WriteCanvas } from "@/components/write-canvas";
import { StrokeOrder } from "@/components/stroke-order";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  POS_VI,
  kanjiCharsFor,
  learnRadicals,
  radicalById,
  radicalNeighbors,
  RADICAL_LESSONS,
} from "@/data/radicals";
import { kanjiByChar } from "@/data/kanji-set";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import { kanaToRomaji } from "@/lib/akari/kana-util";

export const Route = createFileRoute("/_app/radicals/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const r = radicalById(id);
  if (!r) throw notFound();
  const remember = useProgress((s) => s.remember);
  const forgot = useProgress((s) => s.forgot);
  const showRomaji = useSettings((s) => s.showRomaji);
  const pool = learnRadicals();
  const nav = radicalNeighbors(r.id, pool.length && pool.some((x) => x.id === r.id) ? pool : undefined);
  const lesson = RADICAL_LESSONS.find((ls) => ls.ids.includes(r.id));
  const chars = kanjiCharsFor(r);
  const kanji = chars.map(kanjiByChar).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const extra = chars.filter((ch) => !kanji.some((k) => k.character === ch));
  const romaji = kanaToRomaji(r.name_kana);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Card>
        <CardContent className="flex flex-col items-center py-10">
          <Badge>Bộ {r.kangxi}</Badge>
          {lesson ? (
            <Link
              to="/radicals"
              search={{ lesson: lesson.id }}
              className="mt-2 text-xs text-accent hover:underline"
            >
              {lesson.title}
            </Link>
          ) : null}
          <p className="mt-1 text-xs tabular-nums text-subtle">
            {r.strokes} nét · {POS_VI[r.pos]}
            {nav.index >= 0 ? ` · ${nav.index + 1}/${nav.total}` : ""}
          </p>
          <p className="text-kana mt-3 text-[8rem] leading-none">{r.char}</p>
          {r.parent && r.parent !== r.char ? (
            <p className="mt-2 text-sm text-muted">
              Biến thể của <span className="font-jp text-lg text-fg">{r.parent}</span>
            </p>
          ) : null}
          <p className="mt-3 text-xl font-medium">Hán-Việt: {r.han_viet}</p>
          <p className="mt-1 text-lg">{r.meaning_vi}</p>
          <p className="mt-2 font-jp text-xl text-muted">
            {r.name_kana}
            {showRomaji ? <span className="ml-2 text-accent">{romaji}</span> : null}
          </p>
          <div className="mt-4">
            <SpeakButton text={r.name_kana} kana={r.name_kana} label="Nghe tên bộ" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-sm text-muted">Cách nhớ</h2>
          <p className="text-sm leading-relaxed">{r.hint}</p>
          {r.variants.length > 1 ? (
            <p className="text-sm text-muted">
              Dạng khác:{" "}
              <span className="font-jp text-lg text-fg">{r.variants.join(" · ")}</span>
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="mb-3 text-sm text-muted">Kanji dùng bộ này</h2>
          {kanji.length || extra.length ? (
            <div className="flex flex-wrap gap-2">
              {kanji.map((k) => (
                <Link
                  key={k.id}
                  to="/kanji/$id"
                  params={{ id: k.id }}
                  className="flex min-w-16 flex-col items-center rounded-[10px] border border-border bg-choice px-3 py-2 hover:border-accent"
                >
                  <span className="font-jp text-2xl">{k.character}</span>
                  <span className="text-[11px] text-muted">{k.han_viet || k.meaning_vi}</span>
                </Link>
              ))}
              {extra.map((ch) => (
                <span
                  key={ch}
                  className="flex min-w-16 flex-col items-center rounded-[10px] border border-border px-3 py-2"
                >
                  <span className="font-jp text-2xl">{ch}</span>
                  <span className="text-[11px] text-subtle">minh họa</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">Chưa gắn kanji minh họa.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-5">
          <p className="text-sm text-muted">{r.strokes} nét · viết thử</p>
          <StrokeOrder character={r.char} strokeCount={r.strokes} />
          <WriteCanvas character={r.char} strokeCount={r.strokes} />
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-2">
        {nav.prev ? (
          <Button asChild variant="secondary">
            <Link to="/radicals/$id" params={{ id: nav.prev.id }}>
              <ChevronLeft /> {nav.prev.char}
            </Link>
          </Button>
        ) : (
          <span />
        )}
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => void forgot(r.id, "kanji")}>
            Cần ôn
          </Button>
          <Button variant="success" onClick={() => void remember(r.id, "kanji")}>
            Đã nhớ
          </Button>
        </div>
        {nav.next ? (
          <Button asChild>
            <Link to="/radicals/$id" params={{ id: nav.next.id }}>
              {nav.next.char} <ChevronRight />
            </Link>
          </Button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
