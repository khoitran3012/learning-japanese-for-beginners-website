/** Kana-only TTS input. Parenthetical POS notes and kanji guesses are stripped. */
const KANA_ONLY = /^[\u3040-\u30ffー・\s/]+$/;

export function ttsKana(kana: string | undefined, word = ""): string {
  const raw = (kana ?? "").trim();
  const stripped = raw
    .replace(/[（(][^）)]*[）)]/g, "")
    .replace(/\s*=\s*.*$/, "")
    .replace(/、/g, "/")
    .replace(/#NAME\??/gi, "")
    .trim()
    .replace(/^\/+|\/+$/g, "");
  const first = stripped.split("/")[0]?.trim() ?? "";
  if (first && KANA_ONLY.test(first) && /[\u3040-\u30ff]/.test(first)) return first;
  const w = word.trim().split("/")[0]?.trim() ?? "";
  if (w && KANA_ONLY.test(w) && /[\u3040-\u30ff]/.test(w)) return w;
  return first || w || raw || word;
}

export function isSpeakableKana(text: string): boolean {
  const t = ttsKana(text, text);
  return t.length > 0 && KANA_ONLY.test(t) && /[\u3040-\u30ff]/.test(t);
}
