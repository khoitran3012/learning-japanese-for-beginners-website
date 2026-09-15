import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SpeakButton } from "@/components/speak-button";
import { speakJapanese } from "@/lib/akari/tts";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import type { SrsItem } from "@/lib/akari/types";
import { cn } from "@/lib/utils";

export interface FlashCard {
  id: string;
  front: string;
  back: string;
  extra?: string;
  speak?: string;
  type: SrsItem["itemType"];
}

export function FlashcardDeck({
  cards,
  empty,
  sessionKey,
}: {
  cards: FlashCard[];
  empty?: ReactNode;
  sessionKey?: string;
}) {
  const [deck, setDeck] = useState<FlashCard[]>(cards);
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const [done, setDone] = useState(false);
  const [rated, setRated] = useState(0);
  const mark = useProgress((s) => s.mark);
  const autoPlay = useSettings((s) => s.autoPlayAudio);
  const ttsRate = useSettings((s) => s.ttsRate);
  const card = !done && deck.length ? deck[i] : undefined;

  useEffect(() => {
    setDeck(cards);
    setI(0);
    setFlip(false);
    setDone(false);
    setRated(0);
    // Snapshot on session start only — rating updates parent SRS and must not reset the deck.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionKey]);

  useEffect(() => {
    if (!card || !autoPlay) return;
    const text = card.speak ?? card.front;
    void speakJapanese(text, ttsRate);
  }, [card, autoPlay, ttsRate]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (!card) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlip((f) => !f);
      } else if (e.key === "1") void rate("forgot");
      else if (e.key === "2") void rate("hard");
      else if (e.key === "3") void rate("good");
      else if (e.key === "4") void rate("easy");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card, i, deck.length]);

  async function rate(label: "forgot" | "hard" | "good" | "easy") {
    if (!card) return;
    await mark(card.id, card.type, label);
    setFlip(false);
    setRated((n) => n + 1);
    if (i + 1 >= deck.length) setDone(true);
    else setI((x) => x + 1);
  }

  if (!deck.length) {
    return <>{empty ?? <p className="text-sm text-muted">Bộ thẻ trống.</p>}</>;
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md rounded-xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-soft)]">
        <p className="text-sm text-muted">Phiên ôn xong</p>
        <p className="mt-2 text-4xl font-semibold tabular-nums">{rated}</p>
        <p className="text-sm text-muted">thẻ đã đánh giá</p>
        <Button
          className="mt-5"
          onClick={() => {
            setI(0);
            setDone(false);
            setRated(0);
            setFlip(false);
          }}
        >
          Ôn lại bộ này
        </Button>
      </div>
    );
  }

  if (!card) return null;

  return (
    <div className="mx-auto max-w-md">
      <button
        type="button"
        onClick={() => setFlip((f) => !f)}
        className={cn(
          "relative min-h-64 w-full rounded-xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-soft)]",
        )}
        aria-label="Lật thẻ"
      >
        {flip ? (
          <div>
            <p className="whitespace-pre-line text-lg">{card.back}</p>
            {card.extra ? <p className="mt-3 font-jp text-muted">{card.extra}</p> : null}
          </div>
        ) : (
          <>
            <p className="text-kana text-6xl">{card.front}</p>
            <p className="mt-6 text-sm text-subtle">Bấm để lật · phím cách</p>
          </>
        )}
      </button>
      <div className="mt-3 flex justify-center">
        <SpeakButton text={card.speak ?? card.front} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Button variant="danger" onClick={() => void rate("forgot")}>
          Quên
        </Button>
        <Button variant="secondary" onClick={() => void rate("hard")}>
          Khó
        </Button>
        <Button variant="secondary" onClick={() => void rate("good")}>
          Nhớ
        </Button>
        <Button variant="success" onClick={() => void rate("easy")}>
          Dễ
        </Button>
      </div>
      <p className="mt-3 text-center text-xs text-muted tabular-nums">
        Thẻ {i + 1} / {deck.length}
      </p>
    </div>
  );
}
