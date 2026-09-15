import { createFileRoute, notFound } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { SpeakButton } from "@/components/speak-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";

export const Route = createFileRoute("/_app/vocabulary/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const v = [...VOCAB_N5, ...VOCAB_N4].find((x) => x.id === id);
  if (!v) throw notFound();
  const remember = useProgress((s) => s.remember);
  const forgot = useProgress((s) => s.forgot);
  const toggleFav = useProgress((s) => s.toggleFav);
  const addToStudy = useProgress((s) => s.addToStudy);
  const fav = useProgress((s) => s.favorites.has(v.id));
  const mine = useProgress((s) => s.myWords.has(v.id));
  const showRomaji = useSettings((s) => s.showRomaji);

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <Card>
        <CardContent className="py-8 text-center">
          <Badge>{v.level}</Badge>
          <p className="text-kana mt-3 text-6xl">{v.word}</p>
          <p className="mt-2 font-jp text-xl text-muted">{v.kana}</p>
          {showRomaji ? <p className="text-accent">{v.romaji}</p> : null}
          <p className="mt-3 text-lg">{v.meaning_vi}</p>
          <p className="mt-1 text-sm text-subtle">{v.part_of_speech.join(", ")} · {v.category}</p>
          <SpeakButton className="mt-4 mx-auto" text={v.word} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="font-jp text-lg">{v.example_sentence}</p>
          {v.example_kana ? <p className="text-sm text-muted">{v.example_kana}</p> : null}
          {showRomaji ? <p className="text-sm text-accent">{v.example_romaji}</p> : null}
          <p className="text-sm">{v.example_meaning_vi}</p>
        </CardContent>
      </Card>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={fav ? "default" : "secondary"}
          onClick={async () => {
            const on = await toggleFav(v.id, "vocab");
            toast(on ? "Đã thêm yêu thích" : "Đã bỏ yêu thích");
          }}
        >
          <Star /> {fav ? "Đã thích" : "Yêu thích"}
        </Button>
        <Button
          variant={mine ? "default" : "secondary"}
          onClick={async () => {
            await addToStudy(v.id, "vocab");
            toast(mine ? "Đã có trong từ của tôi" : "Đã thêm vào danh sách học");
          }}
        >
          {mine ? "Trong từ của tôi" : "Thêm vào từ của tôi"}
        </Button>
        <Button
          variant="secondary"
          onClick={async () => {
            await forgot(v.id, "vocab");
            toast("Đánh dấu cần ôn");
          }}
        >
          Cần ôn
        </Button>
        <Button
          variant="success"
          onClick={async () => {
            await remember(v.id, "vocab");
            toast("Đã nhớ — sẽ ôn sau");
          }}
        >
          Đã nhớ
        </Button>
      </div>
    </div>
  );
}
