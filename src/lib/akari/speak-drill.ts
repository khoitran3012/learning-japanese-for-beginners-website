import { VOCAB_N4 } from "@/data/vocabulary-n4";
import { VOCAB_N5 } from "@/data/vocabulary-n5";
import type { VocabEntry } from "./types";

export type SpeakLevel = "N5" | "N4" | "all";

const SHORT = [...VOCAB_N5, ...VOCAB_N4].filter((v) => v.kana.length >= 2 && v.kana.length <= 16);

function shuffle<T>(list: T[]) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = next[i]!;
    next[i] = next[j]!;
    next[j] = a;
  }
  return next;
}

/** Vòng nói ngắn: từ N5 trước, câu vừa miệng, không lặp trong một vòng. */
export function makeSpeakRound(level: SpeakLevel, count = 8): VocabEntry[] {
  const pool =
    level === "N5" ? SHORT.filter((v) => v.level === "N5") : level === "N4" ? SHORT.filter((v) => v.level === "N4") : SHORT;
  return shuffle(pool).slice(0, count);
}

/** So khớp lỏng: katakana→hiragana, bỏ dấu và khoảng trắng. */
export function normJa(input: string) {
  return input
    .normalize("NFKC")
    .replace(/[\u30a1-\u30f6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60))
    .toLowerCase()
    .replace(/[\s・、。！？!?,.ー\-〜~]/g, "");
}

export function speechMatches(heard: string, targets: string[]) {
  const h = normJa(heard);
  if (h.length < 2) return false;
  return targets.some((raw) => {
    const t = normJa(raw);
    if (t.length < 2) return false;
    if (h.includes(t)) return true;
    return t.includes(h) && h.length / t.length >= 0.7;
  });
}

type SpeechResultEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type SpeechErrorEvent = { error?: string };

type Recognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: ((event: SpeechErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function recognitionCtor(): (new () => Recognition) | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: new () => Recognition;
    webkitSpeechRecognition?: new () => Recognition;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function speechRecognitionAvailable() {
  return recognitionCtor() !== null;
}

/** Nghe một lần, tiếng Nhật. Gọi từ nút bấm — trình duyệt yêu cầu thao tác người dùng. */
export function listenJapanese(ms = 4500) {
  const Ctor = recognitionCtor();
  if (!Ctor) {
    return Promise.reject(new Error("Trình duyệt này không nhận giọng. Hãy nghe mẫu rồi tự nói theo."));
  }
  const rec = new Ctor();
  rec.lang = "ja-JP";
  rec.interimResults = true;
  rec.maxAlternatives = 5;
  let text = "";
  let settled = false;
  return new Promise<{ transcript: string; stop: () => void }>((resolve, reject) => {
    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      fn();
    };
    const timer = window.setTimeout(() => {
      try {
        rec.stop();
      } catch {
        finish(() => resolve({ transcript: text.trim(), stop: () => undefined }));
      }
    }, ms);
    rec.onresult = (event) => {
      let next = "";
      for (let i = 0; i < event.results.length; i++) next += event.results[i]?.[0]?.transcript ?? "";
      text = next;
    };
    rec.onerror = (event) => {
      const denied = event.error === "not-allowed" || event.error === "service-not-allowed";
      finish(() =>
        reject(
          new Error(
            denied
              ? "Trình duyệt chặn mic. Cho phép micro rồi bấm Nói lại."
              : "Không nghe rõ. Nói lại gần mic hơn, hoặc tự chấm bên dưới.",
          ),
        ),
      );
    };
    rec.onend = () => finish(() => resolve({ transcript: text.trim(), stop: () => undefined }));
    try {
      rec.start();
    } catch {
      finish(() => reject(new Error("Không mở được mic. Cho phép micro rồi thử lại.")));
    }
  });
}
