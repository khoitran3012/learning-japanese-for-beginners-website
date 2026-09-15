import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SpeakButton } from "@/components/speak-button";
import { WriteCanvas } from "@/components/write-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KANJI_N5 } from "@/data/kanji-n5";
import { KANJI_N4 } from "@/data/kanji-n4";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";

export const Route = createFileRoute("/_app/kanji/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const all = [...KANJI_N5, ...KANJI_N4];
  const k = all.find((x) => x.id === id);
  if (!k) throw notFound();
  const remember = useProgress((s) => s.remember);
  const forgot = useProgress((s) => s.forgot);
  const showRomaji = useSettings((s) => s.showRomaji);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Card>
        <CardContent className="flex flex-col items-center py-10">
          <Badge>{k.level}</Badge>
          <p className="text-kana mt-3 text-[8rem] leading-none">{k.character}</p>
          <p className="mt-3 text-lg">{k.meaning_vi}</p>
          <SpeakButton className="mt-4" text={k.character} />
        </CardContent>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent>
            <h2 className="text-sm text-muted">Onyomi</h2>
            <p className="font-jp text-xl">{k.onyomi.join(" · ")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-sm text-muted">Kunyomi</h2>
            <p className="font-jp text-xl">{k.kunyomi.filter(Boolean).join(" · ") || "—"}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent>
          <h2 className="mb-3 text-sm text-muted">Từ ví dụ</h2>
          <ul className="space-y-2">
            {k.examples.map((ex) => (
              <li key={ex.word}>
                <Link to="/dictionary" search={{ q: ex.word }} className="font-jp text-lg hover:underline">
                  {ex.word}
                </Link>
                {showRomaji ? <span className="ml-2 text-sm text-accent">{ex.romaji}</span> : null}
                <span className="ml-2 text-sm text-muted">{ex.meaning_vi}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="mb-2 text-sm text-muted">{k.stroke_count} nét</p>
          <WriteCanvas character={k.character} strokeCount={k.stroke_count} />
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => void forgot(k.id, "kanji")}>Cần ôn</Button>
        <Button variant="success" onClick={() => void remember(k.id, "kanji")}>Đã nhớ</Button>
      </div>
    </div>
  );
}
