/**
 * Gợi ý học tập: biến tiến độ thật của người học thành lời nhắc cụ thể, kèm
 * đường dẫn tới đúng màn hình để hành động ngay.
 *
 * Module này cố tình không import gì từ app (chỉ kiểu dữ liệu của chính nó)
 * để test được bằng node --test mà không cần IndexedDB hay alias.
 *
 * Thứ tự ưu tiên:
 *   1. Việc đáng làm ngay  — thẻ đến hạn ôn, mục hay sai, chuỗi ngày bị đứt.
 *   2. Việc đủ mục tiêu hôm nay — còn thiếu bao nhiêu phút.
 *   3. Lộ trình cho người mới — bắt đầu từ đâu, học theo thứ tự nào.
 */

export type CoachTone = "now" | "goal" | "plan";

export interface CoachTip {
  id: string;
  /** Tiêu đề ngắn, có số liệu thật trong đó. */
  title: string;
  /** Một câu giải thích vì sao nên làm. */
  body: string;
  /** Nút hành động dẫn tới đúng màn hình. */
  action?: { label: string; to: string };
  tone: CoachTone;
}

export interface CoachInput {
  /** Số thẻ SRS đã đến hạn ôn. */
  due: number;
  /** Số mục hay sai (chỉ tính mục dựng được câu hỏi). */
  weak: number;
  /** Phút đã học hôm nay. */
  minutesToday: number;
  /** Mục tiêu phút mỗi ngày. */
  dailyGoal: number;
  /** Chuỗi ngày học liên tiếp. */
  streak: number;
  /** Điểm trắc nghiệm trung bình (%), null nếu chưa làm bài nào. */
  quizAvg: number | null;
  /** Số chữ kana đã học. */
  learnedKana: number;
  /** Số từ vựng đã học. */
  learnedVocab: number;
  /** Số kanji đã học. */
  learnedKanji: number;
  /** Người học đã từng học gì chưa. */
  hasHistory: boolean;
}

/** Người mới: ba bước đầu tiên theo đúng thứ tự dễ nhất. */
export function buildStartPlan(): CoachTip[] {
  return [
    {
      id: "plan-kana",
      title: "Bước 1 — Học bảng chữ cái",
      body: "46 chữ hiragana chỉ cần khoảng 3 buổi. Không đọc được kana thì mọi từ đều chỉ là âm thanh.",
      action: { label: "Học hiragana", to: "/hiragana" },
      tone: "plan",
    },
    {
      id: "plan-vocab",
      title: "Bước 2 — Nhớ 10 từ N5, mỗi từ một câu",
      body: "Đừng học cả kho. Học 10 từ, đặt chúng vào câu có ngữ cảnh, rồi lật thẻ ôn lại.",
      action: { label: "Mở từ vựng", to: "/vocabulary" },
      tone: "plan",
    },
    {
      id: "plan-listen",
      title: "Bước 3 — Mỗi ngày nghe chép 5 câu",
      body: "Chế độ “Nghe & gõ” buộc bạn tự viết ra, tai quen nhịp tiếng Nhật mà không cần nhìn.",
      action: { label: "Luyện nghe & gõ", to: "/listen" },
      tone: "plan",
    },
  ];
}

/**
 * Gợi ý động, ưu tiên việc đáng làm ngay.
 * Tối đa `limit` gợi ý; người mới luôn nhận lộ trình 3 bước.
 */
export function buildCoachTips(input: CoachInput, limit = 3): CoachTip[] {
  if (!input.hasHistory) return buildStartPlan().slice(0, limit);

  const tips: CoachTip[] = [];
  const { due, weak, minutesToday, dailyGoal, streak, quizAvg } = input;

  if (due > 0) {
    tips.push({
      id: "due",
      title: `Ôn ${due} thẻ đang đến hạn`,
      body: "Thẻ đến hạn là thẻ bạn sắp quên. Ôn đúng hạn giữ thẻ lâu hơn học lại từ đầu.",
      action: { label: "Ôn tập ngay", to: "/review" },
      tone: "now",
    });
  }

  if (weak > 0) {
    tips.push({
      id: "weak",
      title: `Luyện ${weak} mục bạn hay sai`,
      body: "Đây là những chỗ dễ rơi nhất. Buổi luyện chỗ yếu sẽ hỏi đúng các mục đó, không hỏi ngẫu nhiên.",
      action: { label: "Luyện chỗ yếu", to: "/weak" },
      tone: "now",
    });
  }

  if (streak === 0) {
    tips.push({
      id: "streak-broken",
      title: "Chuỗi ngày vừa bị đứt",
      body: "Chuỗi đứt không phải vì học nhiều quá. Học 5 phút hôm nay là nối lại.",
      action: { label: "Nối lại chuỗi", to: "/daily" },
      tone: "now",
    });
  }

  if (minutesToday <= 0) {
    tips.push({
      id: "start-today",
      title: "Bắt đầu 5 phút hôm nay",
      body: "Không cần nhiều. 5 phút mỗi ngày vẫn tiến được và giữ được chuỗi học.",
      action: { label: "Bài tập hôm nay", to: "/daily" },
      tone: "goal",
    });
  } else if (minutesToday < dailyGoal) {
    const left = Math.max(1, Math.round(dailyGoal - minutesToday));
    tips.push({
      id: "goal-left",
      title: `Còn ${left} phút nữa là đủ mục tiêu hôm nay`,
      body: "Một mục tiêu nhỏ mỗi ngày tốt hơn một phiên dài. Ôn thẻ đến hạn là cách nhanh nhất.",
      action: { label: "Ôn thẻ", to: "/review" },
      tone: "goal",
    });
  } else {
    tips.push({
      id: "goal-done",
      title: "Đã đạt mục tiêu hôm nay",
      body: "Tốt lắm. Muốn thêm thì làm một vòng nghe chép — nghe rồi tự viết lại là cách nhớ lâu nhất.",
      action: { label: "Luyện nghe & gõ", to: "/listen" },
      tone: "goal",
    });
  }

  if (streak >= 3) {
    tips.push({
      id: "streak",
      title: `Chuỗi ${streak} ngày — đừng để đứt`,
      body: "Chuỗi ngày là bộ nhớ dài hạn. 5 phút hôm nay là đủ để giữ nó.",
      action: { label: "Học tiếp", to: "/daily" },
      tone: "goal",
    });
  }

  if (quizAvg !== null && quizAvg < 60) {
    tips.push({
      id: "quiz-low",
      title: `Điểm trắc nghiệm đang ở ${quizAvg}%`,
      body: "Dưới 60% thường do ngữ pháp và trợ từ chưa chắc, chứ không phải từ vựng. Ôn lại mục sai trước.",
      action: { label: "Ôn mục sai", to: "/weak" },
      tone: "now",
    });
  }

  if (input.learnedKana === 0) {
    tips.push({
      id: "learn-kana",
      title: "Chưa học chữ nào — bắt đầu từ hiragana",
      body: "46 chữ, học theo hàng 5 phút một buổi là xong. Mọi từ vựng đều dựa trên bảng chữ cái này.",
      action: { label: "Học hiragana", to: "/hiragana" },
      tone: "plan",
    });
  } else if (input.learnedVocab === 0) {
    tips.push({
      id: "learn-vocab",
      title: "Bảng chữ cái xong rồi — thêm từ vựng",
      body: "Học 10 từ N5 mỗi ngày, mỗi từ gắn một câu ví dụ. Flashcard giúp bạn ôn lại đúng hạn.",
      action: { label: "Mở từ vựng", to: "/vocabulary" },
      tone: "plan",
    });
  } else if (input.learnedKanji === 0) {
    tips.push({
      id: "learn-kanji",
      title: "Thêm kanji theo âm Hán-Việt",
      body: "Nghe âm Hán-Việt sẽ khiến nghĩa kanji bám vào tiếng Việt, nhớ lâu hơn hẳn nhìn nét chữ.",
      action: { label: "Mở kanji", to: "/kanji" },
      tone: "plan",
    });
  }

  return tips.slice(0, limit);
}

export interface StudyTip {
  id: string;
  title: string;
  body: string;
  /** Màn hình liên quan để xem thêm. */
  to: string;
  /** Nhãn của nút. */
  action: string;
}

/** Mẹo học tập dùng được cho mọi người, không phụ thuộc tiến độ. */
export const STUDY_TIPS: StudyTip[] = [
  {
    id: "daily",
    title: "10 phút mỗi ngày hơn 2 tiếng cuối tuần",
    body: "Não quên theo ngày, không theo tuần. Học đều mỗi ngày rẻ hơn nhiều so với dồn lại.",
    to: "/daily",
    action: "Bài hôm nay",
  },
  {
    id: "dictation",
    title: "Nghe chép, đừng chỉ nghe",
    body: "Nghe thụt tai quen nhanh, nhưng tự viết lại thì mới nhớ. Chế độ “Nghe & gõ” làm đúng việc đó.",
    to: "/listen",
    action: "Nghe & gõ",
  },
  {
    id: "slow",
    title: "Nghe chậm 0,5× khi chưa hiểu",
    body: "Nghe chậm để bắt nhịp và âm, hiểu rồi hãy nghe bình thường để luyện tốc độ thật.",
    to: "/listen",
    action: "Mở luyện nghe",
  },
  {
    id: "hanviet",
    title: "Kanji đi cùng Hán-Việt",
    body: "Nghe âm Hán-Việt, nghĩa kanji sẽ bám vào tiếng Việt. Đó là chìa khóa cho người Việt học kanji.",
    to: "/kanji",
    action: "Mở kanji",
  },
  {
    id: "context",
    title: "Gắn mỗi từ mới vào một câu",
    body: "Từ đứng lẻ dễ bay khỏi đầu. Câu có ngữ cảnh thì nhớ lâu hơn hẳn, và bạn dùng được ngay.",
    to: "/my-words",
    action: "Từ của tôi",
  },
  {
    id: "wrong",
    title: "Sai một câu không sao, bỏ qua mới tiếc",
    body: "Mỗi lần sai là một chỗ bạn sắp trượt. “Luyện chỗ yếu” gom đúng những mục đó lại cho bạn.",
    to: "/weak",
    action: "Luyện chỗ yếu",
  },
];
