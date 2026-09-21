import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SpeakButton } from "@/components/speak-button";
import { answersMatch } from "@/lib/akari/answer-check";
import { ttsKana } from "@/lib/akari/kana-speak";
import { speakJapanese, stopSpeaking } from "@/lib/akari/tts";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import type { SrsItem } from "@/lib/akari/types";
import { cn, shuffle } from "@/lib/utils";

export interface FlashCard {
  id: string;
  front: string;
  back: string;
  extra?: string;
  speak?: string;
  speakExtra?: string;
  type: SrsItem["itemType"];
  answers?: string[];
  answerHint?: string;
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
  const [deck, setDeck] = useState<FlashCard[]>(() => shuffle(cards));
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const [done, setDone] = useState(false);
  const [rated, setRated] = useState(0);
  const [saved, setSaved] = useState(0);
  const [typed, setTyped] = useState("");
  const [check, setCheck] = useState<"idle" | "correct" | "wrong">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingRef = useRef<number | null>(null);
  const busyRef = useRef(false);
  const mark = useProgress((s) => s.mark);
  const autoPlay = useSettings((s) => s.autoPlayAudio);
  const ttsRate = useSettings((s) => s.ttsRate);
  const rateRef = useRef(ttsRate);
  rateRef.current = ttsRate;
  const card = !done && deck.length ? deck[i] : undefined;

  function clearPending() {
    if (pendingRef.current != null) {
      window.clearTimeout(pendingRef.current);
      pendingRef.current = null;
    }
  }

  useEffect(() => {
    clearPending();
    busyRef.current = false;
    setDeck(shuffle(cards));
    setI(0);
    setFlip(false);
    setDone(false);
    setRated(0);
    setSaved(0);
    setTyped("");
    setCheck("idle");
    // Snapshot on session start only — rating updates parent SRS and must not reset the deck.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionKey]);

  useEffect(() => () => clearPending(), []);

  useEffect(() => {
    if (!card || !autoPlay) {
      stopSpeaking();
      return;
    }
    const text = ttsKana(card.speak, card.front);
    let cancelled = false;
    const handle = window.setTimeout(() => {
      if (!cancelled) void speakJapanese(text, rateRef.current);
    }, 80);
    return () => {
      cancelled = true;
      window.clearTimeout(handle);
      stopSpeaking();
    };
  }, [card?.id, autoPlay]);

  useEffect(() => {
    if (card && check === "idle") inputRef.current?.focus();
  }, [card, check, i]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (!card) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (check === "wrong") void rate("forgot");
        else if (check === "idle") setFlip((f) => !f);
      } else if (e.key === "1") void rate("forgot");
      else if (e.key === "2") void rate("hard");
      else if (e.key === "3") void rate("good");
      else if (e.key === "4") void rate("easy");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card, i, deck.length, check]);

  function advance(nextDeck: FlashCard[], from: number) {
    if (nextDeck.length === 0) {
      setDeck([]);
      setDone(true);
      setFlip(false);
      setTyped("");
      setCheck("idle");
      return;
    }
    setDeck(nextDeck);
    setI(from >= nextDeck.length ? 0 : from);
    setFlip(false);
    setTyped("");
    setCheck("idle");
  }

  async function rate(label: "forgot" | "hard" | "good" | "easy") {
    if (!card || busyRef.current) return;
    busyRef.current = true;
    clearPending();
    const snapshot = card;
    const idx = i;
    const next = [...deck];
    next.splice(idx, 1);
    if (label === "forgot") next.splice(Math.min(next.length, idx + 2), 0, snapshot);
    else if (label === "hard") next.splice(Math.min(next.length, idx + 4), 0, snapshot);
    setRated((n) => n + 1);
    if (label === "good" || label === "easy") setSaved((n) => n + 1);
    advance(next, idx);
    try {
      await mark(snapshot.id, snapshot.type, label);
    } catch {
      /* keep going even if local save is slow */
    } finally {
      busyRef.current = false;
    }
  }

  function onTypeCheck() {
    if (!card) return;
    if (check === "wrong") {
      void rate("forgot");
      return;
    }
    if (check !== "idle") return;
    const expected = card.answers?.filter(Boolean) ?? [];
    if (!expected.length) {
      setFlip(true);
      return;
    }
    const ok = answersMatch(typed, expected);
    if (ok) {
      setCheck("correct");
      setFlip(true);
      pendingRef.current = window.setTimeout(() => {
        void rate("good");
      }, 800);
    } else {
      setCheck("wrong");
      setFlip(true);
      pendingRef.current = window.setTimeout(() => {
        void rate("forgot");
      }, 1600);
    }
  }

  if (!deck.length && done) {
    return (
      <div className="mx-auto max-w-md rounded-xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-soft)]">
        <p className="text-sm text-muted">Phiên ôn xong</p>
        <p className="mt-2 text-4xl font-semibold tabular-nums">{rated}</p>
        <p className="text-sm text-muted">{saved} thẻ đã lưu là nhớ</p>
        <Button
          className="mt-5"
          onClick={() => {
            clearPending();
            setDeck(shuffle(cards));
            setI(0);
            setDone(false);
            setRated(0);
            setSaved(0);
            setFlip(false);
            setTyped("");
            setCheck("idle");
          }}
        >
          Ôn lại bộ này
        </Button>
      </div>
    );
  }

  if (!deck.length) {
    return <>{empty ?? <p className="text-sm text-muted">Bộ thẻ trống.</p>}</>;
  }

  if (!card) return null;

  const canType = Boolean(card.answers?.length);

  return (
    <div className="mx-auto max-w-md">
      <button
        type="button"
        onClick={() => {
          if (check !== "idle") return;
          setFlip((f) => !f);
        }}
        className={cn(
          "relative min-h-64 w-full rounded-xl border bg-surface p-8 text-center shadow-[var(--shadow-soft)]",
          check === "correct" ? "border-success" : check === "wrong" ? "border-danger" : "border-border",
        )}
        aria-label="Lật thẻ"
      >
        {flip ? (
          <div>
            <p className="whitespace-pre-line text-lg text-fg">{card.back}</p>
            {card.extra ? <p className="mt-3 font-jp text-fg">{card.extra}</p> : null}
            {check === "correct" ? (
              <p className="mt-4 text-sm text-success">Đúng — đã lưu là nhớ</p>
            ) : check === "wrong" ? (
              <p className="mt-4 text-sm text-danger">Chưa khớp. Thẻ sẽ quay lại sau vài lá.</p>
            ) : null}
          </div>
        ) : (
          <>
            <p className="text-kana text-6xl">{card.front}</p>
            <p className="mt-6 text-sm text-muted">Bấm để lật · hoặc gõ đáp án bên dưới</p>
          </>
        )}
      </button>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <SpeakButton text={card.speak ?? card.front} kana={card.speak} />
        {card.extra ? <SpeakButton text={card.extra} kana={card.speakExtra} label="Nghe ví dụ" /> : null}
      </div>
      {canType ? (
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            onTypeCheck();
          }}
        >
          <Input
            ref={inputRef}
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={card.answerHint ?? "Gõ để kiểm tra"}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            disabled={check !== "idle"}
          />
          <Button type="submit" variant={check === "wrong" ? "default" : "secondary"} disabled={check === "correct"}>
            {check === "wrong" ? "Tiếp" : "Kiểm tra"}
          </Button>
        </form>
      ) : check === "wrong" ? (
        <Button className="mt-4 w-full" onClick={() => void rate("forgot")}>
          Tiếp
        </Button>
      ) : null}
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
        Còn {deck.length} thẻ · đã lưu {saved}
        <span className="block text-muted">Gõ sai sẽ hiện đáp án rồi tự sang thẻ tiếp (ôn lại sau).</span>
      </p>
    </div>
  );
}
