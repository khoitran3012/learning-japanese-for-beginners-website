import { type PathStageId } from "./path-stages";
import {
  makeFromKinds,
  makeQuiz,
  type KanjiQuizLevel,
  type QuizKind,
  type QuizPoolOpts,
  type QuizQuestion,
} from "./quiz-engine";

export interface PathReviewTrack {
  stage: PathStageId;
  blurb: string;
  count: number;
  kinds: QuizKind[];
  kanjiLevel: KanjiQuizLevel;
  pool: QuizPoolOpts;
  /** Chọn cấp kanji trong cùng một chặng. */
  subLevels?: Array<{ id: KanjiQuizLevel; label: string }>;
}

export const PATH_REVIEW: PathReviewTrack[] = [
  {
    stage: "nền tảng",
    blurb: "Nguyên âm và 50 âm cơ bản ↔ romaji.",
    count: 10,
    kinds: ["hira-romaji", "romaji-hira"],
    kanjiLevel: "core",
    pool: { kanaGroup: "gojuon", vocabLevel: "N5", grammarLevel: "N5" },
  },
  {
    stage: "hiragana",
    blurb: "あ → a, a → あ, nghe chữ — gồm dakuten và yōon.",
    count: 12,
    kinds: ["hira-romaji", "romaji-hira", "listen"],
    kanjiLevel: "core",
    pool: { kanaGroup: "all", vocabLevel: "N5", grammarLevel: "N5" },
  },
  {
    stage: "katakana",
    blurb: "カタカナ: ア → a, từ mượn, tên riêng.",
    count: 12,
    kinds: ["kata-romaji"],
    kanjiLevel: "core",
    pool: { kanaGroup: "all" },
  },
  {
    stage: "giao tiếp",
    blurb: "Từ vựng N5: chào, số, nhà, trường, ăn — nghĩa và nghe.",
    count: 12,
    kinds: ["vocab-meaning", "meaning-vocab", "listen-vocab", "cloze"],
    kanjiLevel: "N5",
    pool: { vocabLevel: "N5" },
  },
  {
    stage: "kanji",
    blurb: "Kanji N5–N4: Hán-Việt, nghĩa, on/kun, bộ thủ.",
    count: 12,
    kinds: ["kanji", "kanji-read", "listen-kanji", "radical"],
    kanjiLevel: "core",
    pool: {},
    subLevels: [
      { id: "N5", label: "N5" },
      { id: "N4", label: "N4" },
      { id: "core", label: "N5+N4" },
    ],
  },
  {
    stage: "từ vựng",
    blurb: "Từ N4 trong cụm: nghĩa, kana, điền câu.",
    count: 12,
    kinds: ["vocab-meaning", "meaning-vocab", "vocab-kana", "cloze"],
    kanjiLevel: "N4",
    pool: { vocabLevel: "N4" },
  },
  {
    stage: "ngữ pháp",
    blurb: "Trợ từ và mẫu câu N5–N4.",
    count: 12,
    kinds: ["grammar", "particle"],
    kanjiLevel: "core",
    pool: { grammarLevel: "both" },
  },
  {
    stage: "đọc",
    blurb: "Điền từ vào câu, nhận từ trong ngữ cảnh.",
    count: 12,
    kinds: ["cloze", "meaning-vocab", "vocab-kana"],
    kanjiLevel: "core",
    pool: { vocabLevel: "both" },
  },
  {
    stage: "nghe",
    blurb: "Nghe chữ, từ N5, kanji N5.",
    count: 12,
    kinds: ["listen", "listen-vocab", "listen-kanji"],
    kanjiLevel: "N5",
    pool: { vocabLevel: "N5", kanaGroup: "all" },
  },
  {
    stage: "kiểm tra",
    blurb: "Trộn N5–N4: chữ, từ, kanji, nghe, ngữ pháp.",
    count: 12,
    kinds: [],
    kanjiLevel: "core",
    pool: {},
  },
  {
    stage: "nâng cao",
    blurb: "Kanji N3 → N1 theo bài, Hán-Việt vẫn là neo.",
    count: 12,
    kinds: ["kanji", "kanji-read", "listen-kanji"],
    kanjiLevel: "N3",
    pool: {},
    subLevels: [
      { id: "N3", label: "N3" },
      { id: "N2", label: "N2" },
      { id: "N1", label: "N1" },
      { id: "all", label: "N5→N1" },
    ],
  },
];

export function pathReviewOf(stage: PathStageId) {
  return PATH_REVIEW.find((t) => t.stage === stage);
}

export function makePathReview(
  stage: PathStageId,
  kanjiLevel?: KanjiQuizLevel,
  count?: number,
  rand: () => number = Math.random,
): QuizQuestion[] {
  const track = pathReviewOf(stage);
  if (!track) return [];
  const n = count ?? track.count;
  if (track.stage === "kiểm tra" || track.kinds.length === 0) {
    return makeQuiz("mix", n, rand, kanjiLevel ?? "core");
  }
  const kinds =
    kanjiLevel === "N3" || kanjiLevel === "N2" || kanjiLevel === "N1" || kanjiLevel === "all"
      ? track.kinds.filter((k) => k !== "radical")
      : track.kinds;
  return makeFromKinds(kinds.length ? kinds : track.kinds, n, rand, kanjiLevel ?? track.kanjiLevel, track.pool);
}
