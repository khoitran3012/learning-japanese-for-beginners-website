import { createFileRoute, notFound } from "@tanstack/react-router";
import { SpeakButton } from "@/components/speak-button";
import { AiTutor } from "@/components/ai-tutor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GRAMMAR_N5 } from "@/data/grammar-n5";
import { GRAMMAR_N4 } from "@/data/grammar-n4";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import { grammarCategory } from "@/lib/akari/grammar-categories";

export const Route = createFileRoute("/_app/grammar/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const g = [...GRAMMAR_N5, ...GRAMMAR_N4].find((x) => x.id === id);
  if (!g) throw notFound();
  const remember = useProgress((s) => s.remember);
  const showRomaji = useSettings((s) => s.showRomaji);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <Badge>{g.level}</Badge>
        <Badge variant="muted" className="ml-2">
          {grammarCategory(g)}
        </Badge>
        <h1 className="mt-2 font-display text-4xl">{g.name}</h1>
        <p className="mt-1 font-jp text-lg text-muted">{g.structure}</p>
        <p className="mt-2">{g.meaning_vi}</p>
      </div>
      <Card>
        <CardContent>
          <h2 className="mb-2 font-medium">Cách dùng</h2>
          <p className="text-sm leading-relaxed text-muted">{g.usage}</p>
        </CardContent>
      </Card>
      <div className="space-y-3">
        {g.examples.map((ex) => (
          <Card key={ex.jp}>
            <CardContent className="flex items-start justify-between gap-3">
              <div>
                <p className="font-jp text-lg">{ex.jp}</p>
                {ex.kana ? <p className="text-sm text-muted">{ex.kana}</p> : null}
                {showRomaji ? <p className="text-sm text-accent">{ex.romaji}</p> : null}
                <p className="text-sm">{ex.vi}</p>
              </div>
              <SpeakButton text={ex.jp} kana={ex.kana} label="Nghe" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent>
          <h2 className="mb-2 font-medium">Lỗi thường gặp</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
            {g.mistakes.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <AiTutor seed={`Giải thích ngữ pháp ${g.name} (${g.structure}): ${g.meaning_vi}.`} />
      <Button variant="success" onClick={() => void remember(g.id, "grammar")}>Đã hiểu</Button>
    </div>
  );
}
