import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SpeakButton } from "@/components/speak-button";
import { WriteCanvas } from "@/components/write-canvas";
import { StrokeOrder } from "@/components/stroke-order";
import { RememberActions } from "@/components/remember-actions";
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
  type RadicalPos,
} from "@/data/radicals";
import { kanjiByChar } from "@/data/kanji-set";
import { useSettings } from "@/lib/akari/settings";
import { kanaToRomaji } from "@/lib/akari/kana-util";

export const Route = createFileRoute("/_app/radicals/$id")({ component: Page });

const SLOT: Record<RadicalPos, { where: string; place: string }> = {
  hen: { where: "bên trái", place: "left-2 top-1/2 -translate-y-1/2" },
  tsukuri: { where: "bên phải", place: "right-2 top-1/2 -translate-y-1/2" },
  kanmuri: { where: "phía trên", place: "top-2 left-1/2 -translate-x-1/2" },
  ashi: { where: "phía dưới", place: "bottom-2 left-1/2 -translate-x-1/2" },
  tare: { where: "phủ từ trên", place: "left-2 top-2" },
  nyou: { where: "quặp dưới", place: "left-2 bottom-2" },
  kamae: { where: "bao quanh", place: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" },
  dokuritsu: { where: "đứng một mình", place: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" },
};

function Page() {
  const { id } = Route.useParams();
  const r = radicalById(id);
  if (!r) throw notFound();
  const showRomaji = useSettings((s) => s.showRomaji);
  const [peek, setPeek] = useState(false);
  const pool = learnRadicals();
  const nav = radicalNeighbors(r.id, pool.length && pool.some((x) => x.id === r.id) ? pool : undefined);
  const lesson = RADICAL_LESSONS.find((ls) => ls.ids.includes(r.id));
  const chars = kanjiCharsFor(r);
  const kanji = chars.map(kanjiByChar).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const extra = chars.filter((ch) => !kanji.some((k) => k.character === ch));
  const romaji = kanaToRomaji(r.name_kana);
  const slot = SLOT[r.pos];
  const samples = [...r.examples].slice(0, 3);
  const core = r.meaning_vi.split("(")[0]?.trim() || r.meaning_vi;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Card>
        <CardContent className="flex flex-col items-center py-8">
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
              Cùng ý với <span className="font-jp text-2xl text-fg">{r.parent}</span>
              <span className="mx-1">→</span>
              khi đứng {slot.where} thì viết <span className="font-jp text-2xl text-fg">{r.char}</span>
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
          <RememberActions className="mt-5" id={r.id} itemType="radical" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-sm text-muted">Nhớ trong 10 giây</h2>
          <p className="text-base leading-relaxed text-fg">
            Thấy <span className="font-jp text-xl">{r.char}</span> thì nghĩ{" "}
            <span className="font-medium">{core}</span>. Bộ này đứng {slot.where}.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative h-32 w-32 rounded-xl border border-border bg-bg-elevated">
              <span className={`absolute font-jp text-4xl text-fg ${slot.place}`}>{r.char}</span>
              <span className="absolute bottom-2 right-2 text-[10px] text-subtle">chữ</span>
            </div>
            <div className="min-w-0 flex-1 space-y-2 text-sm leading-relaxed text-muted">
              <p>{r.hint}</p>
              <p>Chỉ cần nhớ nghĩa và chỗ đứng. Đừng học thuộc tên tiếng Nhật trước.</p>
            </div>
          </div>
          <div>
            <button type="button" className="text-sm text-accent hover:underline" onClick={() => setPeek((v) => !v)}>
              {peek ? "Giấu nghĩa" : "Tự nói nghĩa, rồi bấm xem"}
            </button>
            {peek ? (
              <p className="mt-2 text-sm text-fg">
                {r.han_viet} · {r.meaning_vi} · {slot.where}
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="mb-1 text-sm text-muted">Thấy bộ này trong chữ thật</h2>
          <p className="mb-3 text-sm text-subtle">Nhìn chữ, chỉ ra {r.char}, rồi nói “{core}”.</p>
          {kanji.length || extra.length || samples.length ? (
            <div className="flex flex-wrap gap-2">
              {(kanji.length ? kanji.slice(0, 6) : []).map((k) => (
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
              {!kanji.length
                ? samples.map((ch) => (
                    <span
                      key={ch}
                      className="flex min-w-16 flex-col items-center rounded-[10px] border border-border px-3 py-2"
                    >
                      <span className="font-jp text-2xl">{ch}</span>
                      <span className="text-[11px] text-subtle">thấy {r.char}</span>
                    </span>
                  ))
                : null}
              {extra.slice(0, 3).map((ch) => (
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
          <p className="text-sm text-muted">{r.strokes} nét · viết thử một lần là đủ</p>
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