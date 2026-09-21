import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { FlashcardDeck, type FlashCard } from "@/components/flashcard-deck";
import { HIRAGANA, KATAKANA } from "@/data/kana";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { practiceKanji, kanjiByLevel, allKanji } from "@/data/kanji-set";
import { GRAMMAR_N5 } from "@/data/grammar-n5";
import { meaningParts } from "@/lib/akari/answer-check";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import { isDue } from "@/lib/akari/srs";
import { findBuiltin, findEntry, resolveStudyItem, useDictionary } from "@/lib/dictionary/catalog";
import { toHiragana } from "@/lib/akari/kana-util";
import { shuffle } from "@/lib/utils";
import type { JlptLevel } from "@/lib/akari/types";

export const Route = createFileRoute("/_app/flashcards")({ component: Page });

type Deck = "hiragana" | "katakana" | "vocab" | "kanji" | "grammar" | "mine";
type KanjiLv = JlptLevel | "core" | "all";

function Page() {
  const [deck, setDeck] = useState<Deck>("hiragana");
  const [kanjiLv, setKanjiLv] = useState<KanjiLv>("N5");
  const myWords = useProgress((s) => s.myWords);
  const srs = useProgress((s) => s.srs);
  const ready = useProgress((s) => s.ready);
  const perDay = useSettings((s) => s.flashcardPerDay);
  const showRomaji = useSettings((s) => s.showRomaji);
  const dict = useDictionary();

  const cards: FlashCard[] = useMemo(() => {
    let built: FlashCard[] = [];
    if (deck === "hiragana") {
      built = HIRAGANA.filter((k) => k.group === "gojuon" || k.group === "dakuten" || k.group === "yoon").map((k) => ({
        id: k.id,
        front: k.char,
        back: `${k.romaji}\n${k.examples[0]?.vi ?? ""}`,
        extra: k.examples[0]?.jp,
        speak: k.char,
        type: "kana" as const,
        answers: [k.romaji],
        answerHint: "Gõ romaji",
      }));
    } else if (deck === "katakana") {
      built = KATAKANA.filter((k) => k.group === "gojuon" || k.group === "dakuten" || k.group === "yoon").map((k) => ({
        id: k.id,
        front: k.char,
        back: `${k.romaji}\n${k.examples[0]?.vi ?? ""}`,
        extra: k.examples[0]?.jp,
        speak: k.char,
        type: "kana" as const,
        answers: [k.romaji],
        answerHint: "Gõ romaji",
      }));
    } else if (deck === "vocab") {
      built = [...VOCAB_N5, ...VOCAB_N4].map((v) => ({
        id: v.id,
        front: v.word,
        back: `${v.kana}${showRomaji ? " · " + v.romaji : ""}\n${v.meaning_vi}`,
        extra: v.example_sentence,
        speak: v.kana,
        speakExtra: v.example_kana,
        type: "vocab" as const,
        answers: [v.romaji, v.kana, v.word, ...meaningParts(v.meaning_vi)],
        answerHint: "Gõ romaji, kana hoặc nghĩa",
      }));
    } else if (deck === "kanji") {
      const pool =
        kanjiLv === "all"
          ? allKanji()
          : kanjiLv === "core"
            ? practiceKanji()
            : kanjiByLevel(kanjiLv);
      built = pool.map((k) => ({
        id: k.id,
        front: k.character,
        back: `${k.han_viet ? `Hán-Việt: ${k.han_viet}\n` : ""}${k.meaning_vi}\n${k.onyomi.join(" / ")} · ${k.kunyomi.join(" / ")}`,
        speak: k.kunyomi[0]?.replace(/[-.・･]/g, "") || toHiragana(k.onyomi[0] ?? "") || k.character,
        type: "kanji" as const,
        answers: [...meaningParts(k.meaning_vi), k.han_viet, k.romaji, ...k.kunyomi, ...k.onyomi].filter(Boolean),
        answerHint: "Gõ nghĩa, Hán-Việt hoặc cách đọc",
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
            speak: d.kana,
            speakExtra: d.examples[0]?.kana,
            type: "vocab" as const,
            answers: [d.romaji, d.kana, d.kanji, ...d.meanings.flatMap(meaningParts)],
            answerHint: "Gõ romaji, kana hoặc nghĩa",
          };
        }
        const r = resolveStudyItem(id);
        return {
          id,
          front: r?.title ?? id,
          back: r?.sub ?? "",
          speak: r?.speak,
          type: "custom" as const,
          answers: r?.sub ? meaningParts(r.sub) : [],
          answerHint: "Gõ đáp án",
        };
      });
    } else {
      built = GRAMMAR_N5.map((g) => ({
        id: g.id,
        front: g.name,
        back: `${g.structure}\n${g.meaning_vi}`,
        extra: g.examples[0]?.jp,
        type: "grammar" as const,
        answers: meaningParts(g.meaning_vi),
        answerHint: "Gõ nghĩa tiếng Việt",
      }));
    }

    const due = built.filter((c) => !srs[c.id] || isDue(srs[c.id]!));
    const rest = built.filter((c) => srs[c.id] && !isDue(srs[c.id]!));
    return [...shuffle(due), ...shuffle(rest)].slice(0, perDay);
  }, [deck, kanjiLv, perDay, showRomaji, myWords, srs, dict]);

  return (
    <div>
      <PageHeader
        kicker="札"
        title="Thẻ từ"
        description="Gõ đáp án để tự kiểm tra. Nhớ / Dễ hoặc gõ đúng thì lưu ngay. Thẻ quên sẽ quay lại trong phiên."
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
      {deck === "kanji" ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {(["N5", "N4", "N3", "N2", "N1", "core", "all"] as const).map((x) => (
            <Button key={x} size="sm" variant={kanjiLv === x ? "default" : "secondary"} onClick={() => setKanjiLv(x)}>
              {x === "core" ? "N5+N4" : x === "all" ? "N5→N1" : x}
            </Button>
          ))}
        </div>
      ) : null}
      <FlashcardDeck
        cards={cards}
        sessionKey={`${deck}-${kanjiLv}-${perDay}-${showRomaji}-${ready ? "1" : "0"}`}
        empty={<p className="text-sm text-muted">Bộ thẻ trống. Thêm từ vào danh sách học trước.</p>}
      />
    </div>
  );
}
