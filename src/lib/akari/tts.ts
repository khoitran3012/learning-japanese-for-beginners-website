/**
 * TTS: Web Speech API, ja-JP only.
 * Always feed yomigana (hiragana with spoken particles). Speak each utterance once.
 */

import { ttsKana } from "./kana-speak";

export interface TtsProvider {
  name: string;
  speak(text: string, options?: { rate?: number; lang?: string }): Promise<void>;
  stop(): void;
  isAvailable(): boolean;
  statusMessage(): string | null;
}

/** One reading, one time. Short mora get a stop so Chrome does not echo あい. */
export function ttsSafeJapanese(text: string) {
  const t = ttsKana(text, text);
  if (!t) return t;
  const mora = [...t].filter((ch) => /[\u3040-\u30ffー]/.test(ch)).length;
  if (mora > 0 && mora <= 2 && !/[。！？]/.test(t)) return `${t}。`;
  return t;
}

function voiceScore(v: SpeechSynthesisVoice) {
  const n = v.name.toLowerCase();
  const lang = v.lang.toLowerCase();
  if (!lang.startsWith("ja") && !/japan/.test(n)) return 99;
  if (/google 日本語|google japanese/.test(n)) return 0;
  if (/nanami|haruka|ayumi|ichiro|kyoko|kyōko|otoya|sayaka|mizuki/.test(n)) return 1;
  if (/google/.test(n) && lang.startsWith("ja")) return 2;
  if (lang === "ja-jp" && v.localService) return 3;
  if (lang.startsWith("ja-jp")) return 4;
  if (lang.startsWith("ja")) return 5;
  return 8;
}

class WebSpeechTts implements TtsProvider {
  name = "Web Speech API";
  private utterance: SpeechSynthesisUtterance | null = null;
  /** Bumps on every speak/stop so a cancelled utterance cannot start a second copy. */
  private gen = 0;

  isAvailable() {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  japaneseVoice() {
    if (!this.isAvailable()) return null;
    const voices = window.speechSynthesis.getVoices();
    const ranked = [...voices].sort((a, b) => voiceScore(a) - voiceScore(b));
    const best = ranked[0];
    if (!best || voiceScore(best) >= 99) return null;
    return best;
  }

  statusMessage() {
    if (!this.isAvailable()) {
      return "Trình duyệt không hỗ trợ đọc tiếng Nhật.";
    }
    if (typeof window !== "undefined" && window.speechSynthesis.getVoices().length > 0 && !this.japaneseVoice()) {
      return "Thiết bị của bạn chưa có giọng đọc tiếng Nhật. Máy sẽ đọc ja-JP mặc định.";
    }
    return null;
  }

  speak(text: string, options: { rate?: number; lang?: string } = {}) {
    return new Promise<void>((resolve) => {
      if (!this.isAvailable()) {
        resolve();
        return;
      }
      const spoken = ttsSafeJapanese(text);
      if (!spoken) {
        resolve();
        return;
      }
      const gen = ++this.gen;
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* ignore */
      }
      const start = () => {
        if (gen !== this.gen) {
          resolve();
          return;
        }
        try {
          window.speechSynthesis.cancel();
        } catch {
          /* ignore */
        }
        if (gen !== this.gen) {
          resolve();
          return;
        }
        const u = new SpeechSynthesisUtterance(spoken);
        u.lang = "ja-JP";
        u.rate = options.rate ?? 0.92;
        u.pitch = 1;
        u.volume = 1;
        const voice = this.japaneseVoice();
        if (voice) {
          u.voice = voice;
          u.lang = voice.lang.startsWith("ja") ? voice.lang : "ja-JP";
        }
        u.onend = () => {
          if (gen === this.gen) resolve();
        };
        u.onerror = () => {
          if (gen === this.gen) resolve();
        };
        this.utterance = u;
        window.speechSynthesis.speak(u);
      };
      // Chrome: cancel() then speak() in the same turn queues the old + new utterance.
      window.setTimeout(start, 90);
    });
  }

  stop() {
    this.gen += 1;
    if (this.isAvailable()) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* ignore */
      }
    }
    this.utterance = null;
  }
}

let provider: TtsProvider = new WebSpeechTts();

export function setTtsProvider(next: TtsProvider) {
  provider = next;
}

export function getTts() {
  return provider;
}

let lastOnce = { key: "", at: 0 };

export async function speakJapanese(text: string, rate = 0.92) {
  try {
    await provider.speak(text, { rate, lang: "ja-JP" });
    return { ok: true as const, message: null };
  } catch {
    return { ok: false as const, message: provider.statusMessage() ?? "Không đọc được." };
  }
}

/** Autoplay helper: same card/question cannot enqueue twice within 400ms (Strict Mode). */
export async function speakJapaneseOnce(key: string, text: string, rate = 0.92) {
  const now = Date.now();
  if (lastOnce.key === key && now - lastOnce.at < 80) {
    // First Strict-Mode invoke; the cleanup will cancel. Allow the remount.
  }
  lastOnce = { key, at: now };
  return speakJapanese(text, rate);
}

export function stopSpeaking() {
  lastOnce = { key: "", at: 0 };
  provider.stop();
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener?.("voiceschanged", () => {
    window.speechSynthesis.getVoices();
  });
}
