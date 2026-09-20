import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { SpeakButton } from "@/components/speak-button";
import { Pronunciation } from "@/components/pronunciation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import { allVocabExamples } from "@/lib/akari/examples";
import { verbUsageForms } from "@/lib/dictionary/conjugate";
import { kanjiByChar } from "@/lib/dictionary/catalog";

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
  const examples = allVocabExamples(v);
  const forms = verbUsageForms(v.word, v.kana, v.part_of_speech);
  const kanjiChars = [...v.word].filter((c) => /[\u4e00-\u9fff]/.test(c));

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <Card>
        <CardContent className="py-8 text-center">
          <Badge>{v.level}</Badge>
          <p className="text-kana mt-3 text-6xl">{v.word}</p>
          <p className="mt-2 font-jp text-xl text-muted">{v.kana}</p>
          {showRomaji ? <p className="text-accent">{v.romaji}</p> : null}
          <p className="mt-3 text-lg">{v.meaning_vi}</p>
          <p className="mt-1 text-sm text-subtle">
            {v.part_of_speech.join(", ")} · {v.category}
          </p>
          <SpeakButton className="mt-4 mx-auto" text={v.word} kana={v.kana} />
        </CardContent>
      </Card>

      {forms.length ? (
        <Card>
          <CardContent className="space-y-3">
            <h2 className="text-sm text-muted">Cách dùng động từ</h2>
            <p className="text-sm text-subtle">
              Học dạng ます trước, rồi て để nối câu. Từ điển ghi dạng gốc.
            </p>
            <ul className="space-y-3">
              {forms.map((f) => (
                <li key={f.label} className="rounded-[10px] border border-border bg-bg-elevated px-3 py-2">
                  <p className="text-xs text-muted">
                    {f.label} · {f.note}
                  </p>
                  <Pronunciation className="mt-1" kana={f.kana} speak={f.kana} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="space-y-2">
            <h2 className="text-sm text-muted">Cách dùng</h2>
            <p className="text-sm leading-relaxed text-fg">
              {v.part_of_speech.includes("danh từ")
                ? `${v.word} là danh từ. Đi với は / が / を / の tùy vai trò trong câu — xem các ví dụ bên dưới.`
                : v.part_of_speech.some((p) => p.includes("tính từ"))
                  ? `${v.word} là tính từ. Đặt trước danh từ hoặc đứng cuối câu với です.`
                  : v.part_of_speech.includes("trạng từ")
                    ? `${v.word} là trạng từ, đứng trước động từ để bổ nghĩa.`
                    : `Dùng ${v.word} như trong các câu ví dụ. Nghe rồi nhắc lại.`
              }
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-sm text-muted">Ví dụ ({examples.length})</h2>
          {examples.map((ex, i) => (
            <div key={ex.jp} className="border-t border-border pt-3 first:border-0 first:pt-0">
              <p className="text-xs text-subtle">Câu {i + 1}</p>
              <div className="mt-1 flex items-start justify-between gap-3">
                <p className="font-jp text-lg">{ex.jp}</p>
                <SpeakButton text={ex.jp} kana={ex.kana} label="Nghe câu" />
              </div>
              {ex.kana ? <p className="text-sm text-muted">{ex.kana}</p> : null}
              {showRomaji && ex.romaji ? <p className="text-sm text-accent">{ex.romaji}</p> : null}
              <p className="text-sm">{ex.vi}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {kanjiChars.length ? (
        <Card>
          <CardContent className="space-y-2">
            <h2 className="text-sm text-muted">Kanji trong từ</h2>
            <div className="flex flex-wrap gap-2">
              {kanjiChars.map((ch) => {
                const entry = kanjiByChar(ch);
                if (entry) {
                  return (
                    <Link
                      key={ch}
                      to="/kanji/$id"
                      params={{ id: entry.id }}
                      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border border-border bg-bg-elevated font-jp text-xl hover:bg-surface"
                    >
                      {ch}
                    </Link>
                  );
                }
                return (
                  <span
                    key={ch}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border border-border bg-bg-elevated font-jp text-xl"
                  >
                    {ch}
                  </span>
                );
              })}
            </div>
            <p className="text-xs text-subtle">Bấm chữ để xem cách đọc on/kun và từ ghép.</p>
          </CardContent>
        </Card>
      ) : null}

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
