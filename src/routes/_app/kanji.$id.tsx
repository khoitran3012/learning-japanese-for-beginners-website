import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SpeakButton } from "@/components/speak-button";
import { Pronunciation } from "@/components/pronunciation";
import { WriteCanvas } from "@/components/write-canvas";
import { StrokeOrder } from "@/components/stroke-order";
import { AiTutor } from "@/components/ai-tutor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OnKunForKanji, OnKunGuide, ReadingTag, classifyExample, exampleKindLabel } from "@/components/on-kun-panel";
import { allKanji, kanjiById, kanjiByLevel, kanjiNeighbors } from "@/data/kanji-set";
import { kanjiLessonOf } from "@/data/kanji-lessons";
import { radicalOfKanji } from "@/data/radicals";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import { kanaToRomaji } from "@/lib/akari/kana-util";
import { allKanjiExamples } from "@/lib/akari/examples";
import { kunReadings, onReadings } from "@/lib/akari/on-kun";
import { JpText } from "@/components/jp-text";

export const Route = createFileRoute("/_app/kanji/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const k = kanjiById(id);
  if (!k) throw notFound();
  const remember = useProgress((s) => s.remember);
  const forgot = useProgress((s) => s.forgot);
  const showRomaji = useSettings((s) => s.showRomaji);

  const onRows = onReadings(k);
  const kunRows = kunReadings(k);
  const primary = kunRows[0]?.kana || onRows[0]?.hira || k.character;
  const usage = allKanjiExamples(k);
  const lesson = kanjiLessonOf(k.character);
  const radical = radicalOfKanji(k.character);
  const levelPool = kanjiByLevel(k.level);
  const inLevel = kanjiNeighbors(k.id, levelPool);
  const inAll = kanjiNeighbors(k.id, allKanji());
  const prev = inAll.prev;
  const next = inAll.next;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Card>
        <CardContent className="flex flex-col items-center py-10">
          <Badge>{k.level}</Badge>
          {lesson ? (
            <Link
              to="/kanji"
              search={{ lesson: lesson.id }}
              className="mt-2 text-xs text-accent hover:underline"
            >
              Bài {lesson.seq}: {lesson.title}
            </Link>
          ) : null}
          {radical ? (
            <Link
              to="/radicals/$id"
              params={{ id: radical.id }}
              className="mt-1 text-xs text-muted hover:text-accent hover:underline"
            >
              Bộ thủ {radical.char} · {radical.han_viet} ({radical.name_kana})
            </Link>
          ) : null}
          <p className="mt-1 text-xs tabular-nums text-subtle">
            {k.level} · chữ {inLevel.index + 1}/{inLevel.total}
            {inAll.index >= 0 ? ` · cả lộ trình ${inAll.index + 1}/${inAll.total}` : ""}
          </p>
          <p className="text-kana mt-3 text-[8rem] leading-none">{k.character}</p>
          <p className="mt-3 text-xl font-medium">{k.han_viet ? `Hán-Việt: ${k.han_viet}` : null}</p>
          <p className="mt-1 text-lg">{k.meaning_vi}</p>
          <p className="mt-2 font-jp text-xl text-muted">
            {primary}
            {showRomaji ? <span className="ml-2 text-accent">{kanaToRomaji(primary)}</span> : null}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <SpeakButton text={primary} kana={primary} label="Nghe cách đọc" />
          </div>
          <p className="mt-2 max-w-sm text-center text-xs text-subtle">
            Máy đọc hiragana, không đọc trực tiếp chữ kanji — tránh phát âm sai.
          </p>
        </CardContent>
      </Card>

      <OnKunGuide />
      <OnKunForKanji kanji={k} words={usage.words} />

      {usage.tip ? (
        <Card>
          <CardContent className="space-y-2">
            <h2 className="text-sm text-muted">Cách dùng chữ {k.character}{k.han_viet ? ` · ${k.han_viet}` : ""}</h2>
            <p className="text-sm leading-relaxed">{usage.tip}</p>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardContent>
          <h2 className="mb-3 text-sm text-muted">Từ dùng chữ này · on hay kun?</h2>
          <ul className="space-y-4">
            {usage.words.map((ex) => {
              const kind = classifyExample(k, ex);
              return (
              <li key={ex.word} className="border-t border-border pt-3 first:border-0 first:pt-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <JpText text={ex.word} className="text-lg" hint={false} />
                      <ReadingTag kind={kind} />
                    </div>
                    <p className="text-sm">{ex.meaning_vi}</p>
                    <p className="mt-1 text-xs text-subtle">
                      {exampleKindLabel(kind)}
                      {ex.usage ? ` · ${ex.usage}` : null}
                    </p>
                  </div>
                </div>
                <Pronunciation className="mt-2" kana={ex.kana} romaji={ex.romaji} speak={ex.kana} />
              </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      {usage.sentences.length ? (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-sm text-muted">Câu ví dụ</h2>
            {usage.sentences.map((ex, i) => (
              <div key={ex.jp} className="border-t border-border pt-3 first:border-0 first:pt-0">
                <p className="text-xs text-subtle">Câu {i + 1}</p>
                <div className="mt-1 flex items-start justify-between gap-3">
                  <JpText text={ex.jp} className="text-lg" />
                  <SpeakButton text={ex.jp} kana={ex.kana} label="Nghe câu" />
                </div>
                {ex.kana ? <p className="text-sm text-muted">{ex.kana}</p> : null}
                {showRomaji && ex.romaji ? <p className="text-sm text-accent">{ex.romaji}</p> : null}
                <p className="text-sm">{ex.vi}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardContent className="space-y-5">
          <p className="text-sm text-muted">{k.stroke_count} nét · thứ tự chuẩn kiểu giáo khoa (nét đều, không thư pháp)</p>
          <StrokeOrder character={k.character} strokeCount={k.stroke_count} />
          <WriteCanvas character={k.character} strokeCount={k.stroke_count} />
        </CardContent>
      </Card>

      <AiTutor seed={`Giải thích kanji ${k.character} (Hán-Việt: ${k.han_viet || "—"}; nghĩa Việt: ${k.meaning_vi}): onyomi ${k.onyomi.join("/")} = ${onRows.map((r) => `${r.hira} ${r.romaji}`).join(", ")}, kunyomi ${kunRows.map((r) => `${r.kana} ${r.romaji}`).join(", ")}. Cách dùng: ${usage.tip}`} />

      <div className="flex flex-wrap items-center justify-between gap-2">
        {prev ? (
          <Button asChild variant="secondary">
            <Link to="/kanji/$id" params={{ id: prev.id }}>
              <ChevronLeft /> {prev.character}
            </Link>
          </Button>
        ) : (
          <span />
        )}
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => void forgot(k.id, "kanji")}>
            Cần ôn
          </Button>
          <Button variant="success" onClick={() => void remember(k.id, "kanji")}>
            Đã nhớ
          </Button>
        </div>
        {next ? (
          <Button asChild>
            <Link to="/kanji/$id" params={{ id: next.id }}>
              {next.character} <ChevronRight />
            </Link>
          </Button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
