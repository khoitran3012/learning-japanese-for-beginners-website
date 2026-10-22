/**
 * Nội dung hướng dẫn cách học: dùng chung cho trang "Cách học" và cho các
 * gợi ý rải rác trong app.
 *
 * Module thuần dữ liệu (không import gì) nên test được bằng node --test.
 */

export interface GuideLink {
  label: string;
  to: string;
}

export interface GuideStep {
  /** Tiêu đề bước. */
  title: string;
  /** Giải thích ngắn. */
  body: string;
  /** Nơi thực hiện. */
  action: GuideLink;
  /** Mốc thời gian gợi ý (ngày 1, ngày 2…). */
  when: string;
}

/** Lộ trình 7 ngày cho người bắt đầu từ con số 0. */
export const START_PLAN: GuideStep[] = [
  {
    when: "Ngày 1",
    title: "Làm quen 46 chữ hiragana",
    body: "Chỉ cần nhận ra chữ, chưa cần viết nhanh. Nghe âm đọc kèm theo để tai quen luôn.",
    action: { label: "Mở bảng hiragana", to: "/hiragana" },
  },
  {
    when: "Ngày 2",
    title: "Katakana + 10 từ N5",
    body: "Katakana dùng cho tên riêng và từ mượn. Học 10 từ N5, mỗi từ một câu ví dụ.",
    action: { label: "Mở bảng katakana", to: "/katakana" },
  },
  {
    when: "Ngày 3–4",
    title: "Ôn lại bằng thẻ, không đọc lại",
    body: "Đọc lại thì thấy quen, đó là ảo giác. Lật thẻ và tự nhớ mới là ôn thật.",
    action: { label: "Mở flashcard", to: "/flashcards" },
  },
  {
    when: "Ngày 5",
    title: "Nghe và gõ lại 5 câu",
    body: "Chép chính tả buộc bạn viết ra, nhớ lâu hơn nhiều so với nghe thụt tai.",
    action: { label: "Luyện nghe & gõ", to: "/listen" },
  },
  {
    when: "Ngày 6",
    title: "Học 5 kanji kèm âm Hán-Việt",
    body: "Nghe âm Hán-Việt sẽ khiến nghĩa kanji bám vào tiếng Việt — chìa khóa cho người Việt.",
    action: { label: "Mở kanji", to: "/kanji" },
  },
  {
    when: "Ngày 7",
    title: "Trắc nghiệm rồi luyện chỗ yếu",
    body: "Làm một bài trắc nghiệm, xem mình sai ở đâu, rồi luyện lại đúng những mục đó.",
    action: { label: "Mở trắc nghiệm", to: "/quiz" },
  },
];

export interface GradeRow {
  label: string;
  /** Phím tắt. */
  key: string;
  /** Điều app làm với thẻ khi bạn bấm nút này. */
  effect: string;
  /** Khi nào nên bấm. */
  when: string;
}

/** Bốn nút chấm điểm trên thẻ — người mới hay bấm sai vì tưởng "Nhớ" = "Dễ". */
export const GRADE_GUIDE: GradeRow[] = [
  {
    label: "Quên",
    key: "1",
    effect: "Thẻ quay lại sau khoảng 10 phút và bị giảm khoảng cách ôn.",
    when: "Bạn không nhớ ra gì cả, hoặc chỉ đoán mò.",
  },
  {
    label: "Khó",
    key: "2",
    effect: "Thẻ quay lại sớm hơn bình thường một chút.",
    when: "Bạn nhớ được nhưng phải cố mới ra.",
  },
  {
    label: "Nhớ",
    key: "3",
    effect: "Thẻ lùi 1–3 ngày rồi mới hỏi lại.",
    when: "Bạn nhớ sau khi nghĩ một chút — đây là mức trung thành nhất.",
  },
  {
    label: "Dễ",
    key: "4",
    effect: "Thẻ lùi xa nhất, tới mấy tuần sau.",
    when: "Bạn nhớ ngay lập tức, không cần nghĩ.",
  },
];

export interface ScreenGuide {
  title: string;
  to: string;
  body: string;
}

/** Mỗi màn hình dùng để làm gì — để người mới không bị “mất” trong app. */
export const SCREEN_GUIDE: ScreenGuide[] = [
  { title: "Bài hôm nay", to: "/daily", body: "Bộ bài ngắn mỗi ngày: từ mới + kanji + ôn lại. Làm mỗi ngày để giữ chuỗi." },
  { title: "Ôn tập", to: "/review", body: "Chỉ hiện thẻ đã đến hạn. Đây là nơi giữ ký ức dài hạn, đừng bỏ qua." },
  { title: "Flashcard", to: "/flashcards", body: "Tự tạo bộ thẻ để ôn tự do: kana, kanji, từ của bạn." },
  { title: "Luyện nghe & gõ", to: "/listen", body: "Nghe rồi gõ lại. Hai chế độ: chọn nghĩa hoặc chép chính tả." },
  { title: "Luyện nói", to: "/speak", body: "Nói theo câu mẫu, app nghe và chấm. Nói sai cũng được, quan trọng là nói." },
  { title: "Luyện chỗ yếu", to: "/weak", body: "Gom đúng những mục bạn hay trượt và hỏi lại chúng." },
  { title: "Trắc nghiệm", to: "/quiz", body: "Kiểm tra nhanh với 17 dạng câu hỏi, điểm lưu mỗi 10 câu." },
  { title: "Bài hát", to: "/songs", body: "Nghe bài hát anime và học từ trong bài theo ngữ cảnh thật." },
  { title: "Ngữ pháp", to: "/grammar", body: "Đọc mẫu ngữ pháp kèm ví dụ và lỗi thường gặp." },
  { title: "Từ điển", to: "/dictionary", body: "Tra nhanh từ, kanji, bộ thủ. Có thể thêm từ điển riêng của bạn." },
];

export interface TroubleRow {
  problem: string;
  fix: string;
  to: string;
}

/** Gặp khó khăn gì thì làm gì. */
export const TROUBLES: TroubleRow[] = [
  {
    problem: "Nghe không ra từ nào",
    fix: "Bấm “Nghe chậm” (0,5×) thay vì nghe lại bình thường. Nghe hiểu rồi hãy nghe nhanh lại.",
    to: "/listen",
  },
  {
    problem: "Biết nghĩa nhưng không nhớ kanji",
    fix: "Học kanji theo âm Hán-Việt và bộ thủ; đừng học nghĩa dịch rời rạc.",
    to: "/kanji",
  },
  {
    problem: "Nói tiếng Nhật không ra",
    fix: "Đừng dịch trong đầu. Chép câu mẫu nguyên văn, nói theo nhịp câu mẫu rồi mới thay từ.",
    to: "/speak",
  },
  {
    problem: "Học mãi mà không tiến",
    fix: "Cắt giảm số từ mới, giữ phần ôn lại. Một bài 10 phút đều đặn thắng một bài 2 tiếng.",
    to: "/daily",
  },
  {
    problem: "Quên từ đã học",
    fix: "Đó là lý do app hẹn ôn lại. Vào “Ôn tập” hằng ngày, đừng bỏ qua thẻ đến hạn.",
    to: "/review",
  },
  {
    problem: "Nhớ từ nhưng dùng sai ngữ pháp",
    fix: "Học ngữ pháp theo mẫu câu, rồi làm bài trắc nghiệm ngữ pháp để thấy chỗ sai.",
    to: "/grammar",
  },
];

/** Một ngày học mẫu — ngắn gọn để copy theo. */
export const DAILY_ROUTINE = [
  { label: "5 phút", body: "Ôn thẻ đến hạn ở “Ôn tập”. Đây là phần quan trọng nhất, làm trước tiên." },
  { label: "5 phút", body: "Từ mới trong “Bài hôm nay”: 10 từ, mỗi từ một câu." },
  { label: "5 phút", body: "Nghe chép 5 câu ở “Luyện nghe & gõ”." },
];
