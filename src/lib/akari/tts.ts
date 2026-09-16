/**
 * TTS abstraction. Default: Web Speech API (ja-JP).
 * Kanji glyphs are a poor TTS input — always prefer hiragana/kana readings.
 */

export interface TtsProvider {
  name: string;
  speak(text: string, options?: { rate?: number; lang?: string }): Promise<void>;
  stop(): void;
  isAvailable(): boolean;
  statusMessage(): string | null;
}

/** Isolated mora are too short for many voices — give them a little context. */
export function ttsSafeJapanese(text: string) {
  const t = text.trim();
  if (!t) return t;
  if (/[\u4e00-\u9fff]/.test(t) && !/[\u3040-\u30ff]/.test(t)) {
    // Bare kanji without kana — engines often guess wrong. Keep as-is but the
    // caller should pass hiragana. We still wrap so the engine commits.
    return `${t}。`;
  }
  if ([...t].length <= 2) return `${t}。${t}`;
  return t;
}

class WebSpeechTts implements TtsProvider {
  name = "Web Speech API";
  private utterance: SpeechSynthesisUtterance | null = null;

  isAvailable() {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  japaneseVoice() {
    if (!this.isAvailable()) return null;
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find((v) => v.lang.toLowerCase().startsWith("ja")) ??
      voices.find((v) => /japan/i.test(v.name)) ??
      null
    );
  }

  statusMessage() {
    if (!this.isAvailable()) {
      return "Trình duyệt không hỗ trợ đọc tiếng Nhật.";
    }
    if (typeof window !== "undefined" && window.speechSynthesis.getVoices().length > 0 && !this.japaneseVoice()) {
      return "Thiết bị của bạn chưa có giọng đọc tiếng Nhật.";
    }
    return null;
  }

  speak(text: string, options: { rate?: number; lang?: string } = {}) {
    return new Promise<void>((resolve, reject) => {
      if (!this.isAvailable()) {
        reject(new Error("TTS unavailable"));
        return;
      }
      this.stop();
      const u = new SpeechSynthesisUtterance(ttsSafeJapanese(text));
      u.lang = options.lang ?? "ja-JP";
      u.rate = options.rate ?? 0.9;
      const voice = this.japaneseVoice();
      if (voice) u.voice = voice;
      u.onend = () => resolve();
      u.onerror = () => resolve();
      this.utterance = u;
      window.speechSynthesis.speak(u);
    });
  }

  stop() {
    if (this.isAvailable()) {
      window.speechSynthesis.cancel();
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

export async function speakJapanese(text: string, rate = 0.9) {
  try {
    await provider.speak(text, { rate, lang: "ja-JP" });
    return { ok: true as const, message: null };
  } catch {
    return { ok: false as const, message: provider.statusMessage() ?? "Không đọc được." };
  }
}

export function stopSpeaking() {
  provider.stop();
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener?.("voiceschanged", () => {
    window.speechSynthesis.getVoices();
  });
}
