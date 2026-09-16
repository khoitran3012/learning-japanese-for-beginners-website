/** Katakana (full-width) → hiragana. Leaves kanji and punctuation alone. */
export function toHiragana(input: string) {
  return [...input]
    .map((ch) => {
      const c = ch.charCodeAt(0);
      if (c >= 0x30a1 && c <= 0x30f6) return String.fromCharCode(c - 0x60);
      return ch;
    })
    .join("");
}

export function toKatakana(input: string) {
  return [...input]
    .map((ch) => {
      const c = ch.charCodeAt(0);
      if (c >= 0x3041 && c <= 0x3096) return String.fromCharCode(c + 0x60);
      return ch;
    })
    .join("");
}

const DIGRAPHS: Array<[string, string]> = [
  ["きゃ", "kya"],
  ["きゅ", "kyu"],
  ["きょ", "kyo"],
  ["ぎゃ", "gya"],
  ["ぎゅ", "gyu"],
  ["ぎょ", "gyo"],
  ["しゃ", "sha"],
  ["しゅ", "shu"],
  ["しょ", "sho"],
  ["じゃ", "ja"],
  ["じゅ", "ju"],
  ["じょ", "jo"],
  ["ちゃ", "cha"],
  ["ちゅ", "chu"],
  ["ちょ", "cho"],
  ["にゃ", "nya"],
  ["にゅ", "nyu"],
  ["にょ", "nyo"],
  ["ひゃ", "hya"],
  ["ひゅ", "hyu"],
  ["ひょ", "hyo"],
  ["びゃ", "bya"],
  ["びゅ", "byu"],
  ["びょ", "byo"],
  ["ぴゃ", "pya"],
  ["ぴゅ", "pyu"],
  ["ぴょ", "pyo"],
  ["みゃ", "mya"],
  ["みゅ", "myu"],
  ["みょ", "myo"],
  ["りゃ", "rya"],
  ["りゅ", "ryu"],
  ["りょ", "ryo"],
];

const MONO: Record<string, string> = {
  あ: "a",
  い: "i",
  う: "u",
  え: "e",
  お: "o",
  か: "ka",
  き: "ki",
  く: "ku",
  け: "ke",
  こ: "ko",
  が: "ga",
  ぎ: "gi",
  ぐ: "gu",
  げ: "ge",
  ご: "go",
  さ: "sa",
  し: "shi",
  す: "su",
  せ: "se",
  そ: "so",
  ざ: "za",
  じ: "ji",
  ず: "zu",
  ぜ: "ze",
  ぞ: "zo",
  た: "ta",
  ち: "chi",
  つ: "tsu",
  て: "te",
  と: "to",
  だ: "da",
  ぢ: "ji",
  づ: "zu",
  で: "de",
  ど: "do",
  な: "na",
  に: "ni",
  ぬ: "nu",
  ね: "ne",
  の: "no",
  は: "ha",
  ひ: "hi",
  ふ: "fu",
  へ: "he",
  ほ: "ho",
  ば: "ba",
  び: "bi",
  ぶ: "bu",
  べ: "be",
  ぼ: "bo",
  ぱ: "pa",
  ぴ: "pi",
  ぷ: "pu",
  ぺ: "pe",
  ぽ: "po",
  ま: "ma",
  み: "mi",
  む: "mu",
  め: "me",
  も: "mo",
  や: "ya",
  ゆ: "yu",
  よ: "yo",
  ら: "ra",
  り: "ri",
  る: "ru",
  れ: "re",
  ろ: "ro",
  わ: "wa",
  を: "o",
  ん: "n",
  ぁ: "a",
  ぃ: "i",
  ぅ: "u",
  ぇ: "e",
  ぉ: "o",
  ゃ: "ya",
  ゅ: "yu",
  ょ: "yo",
  ゎ: "wa",
  ゐ: "i",
  ゑ: "e",
  っ: "",
  ー: "",
};

function lastVowel(romaji: string) {
  const m = romaji.match(/[aeiou]$/i);
  return m ? m[0] : "";
}

/** Hepburn romaji from kana (hiragana or katakana). */
export function kanaToRomaji(input: string) {
  const hira = toHiragana(input.normalize("NFKC"));
  let i = 0;
  let out = "";
  while (i < hira.length) {
    const pair = hira.slice(i, i + 2);
    const found = DIGRAPHS.find(([k]) => k === pair);
    if (found) {
      out += found[1];
      i += 2;
      continue;
    }
    const ch = hira[i]!;
    if (ch === "っ") {
      const rest = hira.slice(i + 1);
      const nextPair = DIGRAPHS.find(([k]) => rest.startsWith(k));
      const next = nextPair ? nextPair[1] : MONO[rest[0] ?? ""] ?? "";
      const cons = next.charAt(0);
      out += cons && cons !== "n" ? cons : "t";
      i += 1;
      continue;
    }
    if (ch === "ー") {
      out += lastVowel(out);
      i += 1;
      continue;
    }
    out += MONO[ch] ?? ch;
    i += 1;
  }
  return out;
}

export function isKanaChar(ch: string) {
  return /[\u3040-\u30ff]/.test(ch);
}
