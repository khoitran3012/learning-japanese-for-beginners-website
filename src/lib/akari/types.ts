export type JlptLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export type KanaKind = "hiragana" | "katakana";

export type KanaGroup =
  | "gojuon"
  | "dakuten"
  | "handakuten"
  | "yoon"
  | "sokuon"
  | "choon"
  | "foreign";

export type PartOfSpeech =
  | "danh từ"
  | "động từ"
  | "động từ nhóm 1"
  | "động từ nhóm 2"
  | "động từ nhóm 3"
  | "tính từ -i"
  | "tính từ -na"
  | "trạng từ"
  | "trợ từ"
  | "liên từ"
  | "đại từ"
  | "số từ"
  | "từ nghi vấn"
  | "biểu hiện"
  | "thán từ"
  | "định từ";

export type VocabCategory =
  | "Chào hỏi"
  | "Gia đình"
  | "Trường học"
  | "Công việc"
  | "Thời gian"
  | "Số đếm"
  | "Địa điểm"
  | "Đồ ăn"
  | "Mua sắm"
  | "Giao thông"
  | "Thời tiết"
  | "Cơ thể"
  | "Nhà cửa"
  | "Động từ"
  | "Tính từ"
  | "Trạng từ"
  | "Đại từ"
  | "Từ nghi vấn"
  | "Màu sắc"
  | "Tính cách"
  | "Tự nhiên"
  | "Du lịch"
  | "Sức khỏe"
  | "Công nghệ"
  | "Xã hội";

export interface Example {
  jp: string;
  kana?: string;
  romaji: string;
  vi: string;
}

export interface KanaChar {
  id: string;
  char: string;
  romaji: string;
  kind: KanaKind;
  group: KanaGroup;
  row: string;
  col: string;
  strokeCount: number;
  dakutenOf?: string;
  pronunciation?: string;
  notes?: string;
  mnemonic?: string;
  examples: Example[];
}

export interface VocabEntry {
  id: string;
  word: string;
  kana: string;
  romaji: string;
  meaning_vi: string;
  meanings?: string[];
  level: JlptLevel;
  category: VocabCategory;
  part_of_speech: PartOfSpeech[];
  example_sentence: string;
  example_kana?: string;
  example_romaji: string;
  example_meaning_vi: string;
  examples?: Example[];
  tags: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  common?: boolean;
}

export interface KanjiExample {
  word: string;
  kana: string;
  romaji: string;
  meaning_vi: string;
  reading?: "on" | "kun";
  usage?: string;
  sentence?: string;
  sentence_kana?: string;
  sentence_romaji?: string;
  sentence_vi?: string;
}

export interface KanjiEntry {
  id: string;
  character: string;
  onyomi: string[];
  kunyomi: string[];
  meaning_vi: string;
  /** Âm Hán-Việt — neo nghĩa cho người Việt. */
  han_viet: string;
  meanings?: string[];
  romaji: string;
  level: JlptLevel;
  stroke_count: number;
  radical?: string;
  examples: KanjiExample[];
}

export interface GrammarEntry {
  id: string;
  name: string;
  structure: string;
  meaning_vi: string;
  usage: string;
  level: JlptLevel;
  examples: Example[];
  mistakes: string[];
  notes?: string;
  related?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  title_jp?: string;
  stage: string;
  level: "0" | "N5" | "N4" | "N3" | "N2" | "N1";
  order: number;
  summary: string;
  /** Trụ chính của bài — hiện trên lộ trình. */
  focus?: "chữ" | "từ vựng" | "nghe nói" | "kanji" | "ngữ pháp" | "đọc" | "kiểm tra";
  sections: Array<{
    heading: string;
    body: string;
    jp?: string;
    kana?: string;
    romaji?: string;
    hanViet?: string;
  }>;
  practiceIds?: string[];
  unlocks?: string[];
}

export interface DictionaryEntry {
  id: string;
  kanji: string;
  kana: string;
  romaji: string;
  meanings: string[];
  part_of_speech: PartOfSpeech[];
  jlpt: JlptLevel[];
  common: boolean;
  frequency: number;
  pitch_accent: number | null;
  examples: Example[];
  tags: string[];
  related?: string[];
  vocabId?: string;
  kanjiChars?: string[];
  aliases?: string[];
}

export interface SrsItem {
  id: string;
  itemType: "kana" | "vocab" | "kanji" | "grammar" | "radical" | "custom";
  lastStudied: number;
  correct: number;
  incorrect: number;
  ease: number;
  interval: number;
  repetitions: number;
  nextReview: number;
  status: "new" | "learning" | "review" | "mastered";
  leitnerBox: number;
}

export interface QuizResult {
  id: string;
  at: number;
  kind: string;
  score: number;
  total: number;
  durationMs: number;
}

export interface SearchHistoryItem {
  query: string;
  at: number;
}

export type ThemeMode = "light" | "dark" | "system";

export interface AppSettings {
  theme: ThemeMode;
  fontSize: "sm" | "md" | "lg";
  showRomaji: boolean;
  showMeaning: boolean;
  autoPlayAudio: boolean;
  ttsRate: number;
  dailyGoal: number;
  flashcardPerDay: number;
  freeMode: boolean;
  onlineDictionary: boolean;
  reducedMotion: boolean;
  aiMode: "off" | "local" | "cloud";
  localAiUrl: string;
  localAiModel: string;
  localAiKind: "ollama" | "openai";
  localAiSystem: string;
  localAiTemperature: number;
  localAiMaxTokens: number;
}

export const DEFAULT_SETTINGS: AppSettings = {
  theme: "system",
  fontSize: "md",
  showRomaji: true,
  showMeaning: true,
  autoPlayAudio: false,
  ttsRate: 0.9,
  dailyGoal: 15,
  flashcardPerDay: 20,
  freeMode: false,
  onlineDictionary: false,
  reducedMotion: false,
  aiMode: "off",
  localAiUrl: "http://localhost:11434",
  localAiModel: "llama3.2",
  localAiKind: "ollama",
  localAiSystem: "Bạn là gia sư tiếng Nhật. Giải thích bằng tiếng Việt, ngắn gọn, có ví dụ hiragana + romaji.",
  localAiTemperature: 0.4,
  localAiMaxTokens: 400,
};
