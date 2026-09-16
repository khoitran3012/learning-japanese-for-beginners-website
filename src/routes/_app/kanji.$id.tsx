import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SpeakButton } from "@/components/speak-button";
import { Pronunciation } from "@/components/pronunciation";
import { WriteCanvas } from "@/components/write-canvas";
import { StrokeOrder } from "@/components/stroke-order";
import { AiTutor } from "@/components/ai-tutor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KANJI_N5 } from "@/data/kanji-n5";
import { KANJI_N4 } from "@/data/kanji-n4";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import { kanaToRomaji, toHiragana } from "@/lib/akari/kana-util";

export const Route = createFileRoute("/_app/kanji/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const all = [...KANJI_N5, ...KANJI_N4];
  const k = all.find((x) => x.id === id);
  if (!k) throw notFound();
  const remember = useProgress((s) => s.remember);
  const forgot = useProgress((s) => s.forgot);
  const showRomaji = useSettings((s) => s.showRomaji);

  const onRows = k.onyomi.filter(Boolean).map((on) => {
    const hira = toHiragana(on);
    return { kata: on, hira, romaji: kanaToRomaji(hira) };
  });
  const kunRows = k.kunyomi.filter(Boolean).map((kun) => ({
    hira: kun,
    romaji: kanaToRomaji(kun),
  }));
  const primary = kunRows[0]?.hira || onRows[0]?.hira || k.character;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Card>
        <CardContent className="flex flex-col items-center py-10">
          <Badge>{k.level}</Badge>
          <p className="text-kana mt-3 text-[8rem] leading-none">{k.character}</p>
          <p className="mt-3 text-lg">{k.meaning_vi}</p>
          <p className="mt-2 font-jp text-xl text-muted">
            {primary}
            {showRomaji ? <span className="ml-2 text-accent">{kanaToRomaji(primary)}</span> : null}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <SpeakButton text={primary} label="Nghe cách đọc" />
          </div>
          <p className="mt-2 max-w-sm text-center text-xs text-subtle">
            Máy đọc hiragana, không đọc trực tiếp chữ kanji — tránh phát âm sai.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="space-y-3">
            <h2 className="text-sm text-muted">Onyomi (âm Hán) · katakana / hiragana / romaji</h2>
            {onRows.length ? (
              <ul className="space-y-3">
                {onRows.map((r) => (
                  <li key={r.kata}>
                    <Pronunciation label={r.kata} kana={r.hira} romaji={r.romaji} speak={r.hira} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-subtle">—</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3">
            <h2 className="text-sm text-muted">Kunyomi (âm Nhật) · hiragana / romaji</h2>
            {kunRows.length ? (
              <ul className="space-y-3">
                {kunRows.map((r) => (
                  <li key={r.hira}>
                    <Pronunciation kana={r.hira} romaji={r.romaji} speak={r.hira} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-subtle">—</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <h2 className="mb-3 text-sm text-muted">Từ ví dụ</h2>
          <ul className="space-y-4">
            {k.examples.map((ex) => (
              <li key={ex.word}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link to="/dictionary" search={{ q: ex.word }} className="font-jp text-lg hover:underline">
                      {ex.word}
                    </Link>
                    <p className="text-sm">{ex.meaning_vi}</p>
                  </div>
                </div>
                <Pronunciation className="mt-2" kana={ex.kana} romaji={ex.romaji} speak={ex.kana} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-5">
          <p className="text-sm text-muted">{k.stroke_count} nét · thứ tự chuẩn kiểu giáo khoa (nét đều, không thư pháp)</p>
          <StrokeOrder character={k.character} strokeCount={k.stroke_count} />
          <WriteCanvas character={k.character} strokeCount={k.stroke_count} />
        </CardContent>
      </Card>

      <AiTutor seed={`Giải thích kanji ${k.character} (${k.meaning_vi}): onyomi ${k.onyomi.join("/")} = ${onRows.map((r) => `${r.hira} ${r.romaji}`).join(", ")}, kunyomi ${kunRows.map((r) => `${r.hira} ${r.romaji}`).join(", ")}.`} />

      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => void forgot(k.id, "kanji")}>
          Cần ôn
        </Button>
        <Button variant="success" onClick={() => void remember(k.id, "kanji")}>
          Đã nhớ
        </Button>
      </div>
    </div>
  );
}
