import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { FlashcardDeck, type FlashCard } from "@/components/flashcard-deck";
import { HIRAGANA, KATAKANA } from "@/data/kana";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { KANJI_N5 } from "@/data/kanji-n5";
import { GRAMMAR_N5 } from "@/data/grammar-n5";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import { isDue } from "@/lib/akari/srs";
import { findBuiltin, findEntry, resolveStudyItem, useDictionary } from "@/lib/dictionary/catalog";
import { shuffle } from "@/lib/utils";

export const Route = createFileRoute("/_app/flashcards")({ component: Page });

type Deck = "hiragana" | "katakana" | "vocab" | "kanji" | "grammar" | "mine";

function Page() {
  const [deck, setDeck] = useState<Deck>("hiragana");
  const myWords = useProgress((s) => s.myWords);
  const srs = useProgress((s) => s.srs);
  const ready = useProgress((s) => s.ready);
  const perDay = useSettings((s) => s.flashcardPerDay);
  const showRomaji = useSettings((s) => s.showRomaji);
  const dict = useDictionary();

  const cards: FlashCard[] = useMemo(() => {
    let built: FlashCard[] = [];
    if (deck === "hiragana") {
      built = HIRAGANA.filter((k) => k.group === "gojuon").map((k) => ({
        id: k.id,
        front: k.char,
        back: `${k.romaji}\n${k.examples[0]?.vi ?? ""}`,
        extra: k.examples[0]?.jp,
        speak: k.char,
        type: "kana" as const,
      }));
    } else if (deck === "katakana") {
      built = KATAKANA.filter((k) => k.group === "gojuon").map((k) => ({
        id: k.id,
        front: k.char,
        back: `${k.romaji}\n${k.examples[0]?.vi ?? ""}`,
        extra: k.examples[0]?.jp,
        speak: k.char,
        type: "kana" as const,
      }));
    } else if (deck === "vocab") {
      built = [...VOCAB_N5, ...VOCAB_N4].map((v) => ({
        id: v.id,
        front: v.word,
        back: `${v.kana}${showRomaji ? " · " + v.romaji : ""}\n${v.meaning_vi}`,
        extra: v.example_sentence,
        speak: v.word,
        type: "vocab" as const,
      }));
    } else if (deck === "kanji") {
      built = KANJI_N5.map((k) => ({
        id: k.id,
        front: k.character,
        back: `${k.meaning_vi}\n${k.onyomi.join(" / ")}`,
        speak: k.character,
        type: "kanji" as const,
      }));
    } else if (deck === "mine") {
      built = [...myWords].map((id) => {
        const d = findEntry(id) ?? findBuiltin(id);
        if (d) {
          return {
            id,
            front: d.kanji,
            back: `${d.kana}${showRomaji ? " · " + d.romaji : ""}\n${d.meanings.join(" · ")}`,
            extra: d.examples[0]?.jp,
            speak: d.kanji,
            type: "vocab" as const,
          };
        }
        const r = resolveStudyItem(id);
        return {
          id,
          front: r?.title ?? id,
          back: r?.sub ?? "",
          speak: r?.speak,
          type: "custom" as const,
        };
      });
    } else {
      built = GRAMMAR_N5.map((g) => ({
        id: g.id,
        front: g.name,
        back: `${g.structure}\n${g.meaning_vi}`,
        extra: g.examples[0]?.jp,
        type: "grammar" as const,
      }));
    }

    const due = built.filter((c) => !srs[c.id] || isDue(srs[c.id]!));
    const rest = built.filter((c) => srs[c.id] && !isDue(srs[c.id]!));
    return [...shuffle(due), ...shuffle(rest)].slice(0, perDay);
  }, [deck, perDay, showRomaji, myWords, srs, dict]);

  return (
    <div>
      <PageHeader
        kicker="札"
        title="Flashcard"
        description="Ưu tiên thẻ đến hạn. Lật thẻ, tự đánh giá — khoảng cách ôn tăng khi bạn nhớ."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            ["hiragana", "Hiragana"],
            ["katakana", "Katakana"],
            ["vocab", "Từ vựng"],
            ["kanji", "Kanji"],
            ["grammar", "Ngữ pháp"],
            ["mine", "Từ của tôi"],
          ] as const
        ).map(([id, label]) => (
          <Button
            key={id}
            variant={deck === id ? "default" : "secondary"}
            onClick={() => setDeck(id)}
          >
            {label}
          </Button>
        ))}
      </div>
      <FlashcardDeck
        cards={cards}
        sessionKey={`${deck}-${perDay}-${showRomaji}-${ready ? "1" : "0"}`}
        empty={<p className="text-sm text-muted">Bộ thẻ trống. Thêm từ vào danh sách học trước.</p>}
      />
    </div>
  );
}
