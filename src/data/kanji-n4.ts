import type { KanjiEntry } from "@/lib/akari/types";
import { hanVietOf } from "@/data/han-viet";

function k(
  character: string,
  onyomi: string[],
  kunyomi: string[],
  meaning_vi: string,
  romaji: string,
  stroke_count: number,
  examples: Array<{ word: string; kana: string; romaji: string; meaning_vi: string }>,
): KanjiEntry {
  return {
    id: `kj-n4-${character}`,
    character,
    onyomi,
    kunyomi,
    meaning_vi,
    han_viet: hanVietOf(character),
    romaji,
    level: "N4",
    stroke_count,
    examples,
  };
}

export const KANJI_N4: KanjiEntry[] = [
  k("会", ["カイ", "エ"], ["あ・う"], "gặp / hội", "kai", 6, [
    { word: "会う", kana: "あう", romaji: "au", meaning_vi: "gặp" },
    { word: "会議", kana: "かいぎ", romaji: "kaigi", meaning_vi: "cuộc họp" },
  ]),
  k("社", ["シャ"], ["やしろ"], "đền / công ty", "sha", 7, [
    { word: "会社", kana: "かいしゃ", romaji: "kaisha", meaning_vi: "công ty" },
    { word: "社会", kana: "しゃかい", romaji: "shakai", meaning_vi: "xã hội" },
  ]),
  k("発", ["ハツ", "ホツ"], [], "phát / xuất", "hatsu", 9, [
    { word: "出発", kana: "しゅっぱつ", romaji: "shuppatsu", meaning_vi: "xuất phát" },
    { word: "発音", kana: "はつおん", romaji: "hatsuon", meaning_vi: "phát âm" },
  ]),
  k("着", ["チャク"], ["き・る", "つ・く"], "mặc / đến", "chaku", 12, [
    { word: "到着", kana: "とうちゃく", romaji: "touchaku", meaning_vi: "đến nơi" },
    { word: "着物", kana: "きもの", romaji: "kimono", meaning_vi: "kimono" },
  ]),
  k("開", ["カイ"], ["ひら・く", "あ・ける"], "mở", "kai", 12, [
    { word: "開く", kana: "ひらく", romaji: "hiraku", meaning_vi: "mở" },
    { word: "開始", kana: "かいし", romaji: "kaishi", meaning_vi: "bắt đầu" },
  ]),
  k("閉", ["ヘイ"], ["し・める", "と・じる"], "đóng", "hei", 11, [
    { word: "閉める", kana: "しめる", romaji: "shimeru", meaning_vi: "đóng" },
    { word: "閉会", kana: "へいかい", romaji: "heikai", meaning_vi: "bế mạc" },
  ]),
  k("問", ["モン"], ["と・う", "とん"], "hỏi", "mon", 11, [
    { word: "質問", kana: "しつもん", romaji: "shitsumon", meaning_vi: "câu hỏi" },
    { word: "問題", kana: "もんだい", romaji: "mondai", meaning_vi: "vấn đề / bài tập" },
  ]),
  k("題", ["ダイ"], [], "đề / chủ đề", "dai", 18, [
    { word: "問題", kana: "もんだい", romaji: "mondai", meaning_vi: "vấn đề" },
    { word: "宿題", kana: "しゅくだい", romaji: "shukudai", meaning_vi: "bài tập về nhà" },
  ]),
  k("研", ["ケン"], ["と・ぐ"], "mài / nghiên", "ken", 9, [
    { word: "研究", kana: "けんきゅう", romaji: "kenkyuu", meaning_vi: "nghiên cứu" },
    { word: "研修", kana: "けんしゅう", romaji: "kenshuu", meaning_vi: "đào tạo / tập huấn" },
  ]),
  k("究", ["キュウ"], ["きわ・める"], "cứu / cùng", "kyuu", 7, [
    { word: "研究", kana: "けんきゅう", romaji: "kenkyuu", meaning_vi: "nghiên cứu" },
    { word: "究明", kana: "きゅうめい", romaji: "kyuumei", meaning_vi: "làm rõ" },
  ]),
  k("仕", ["シ", "ジ"], ["つか・える"], "làm / phục vụ", "shi", 5, [
    { word: "仕事", kana: "しごと", romaji: "shigoto", meaning_vi: "công việc" },
    { word: "仕方", kana: "しかた", romaji: "shikata", meaning_vi: "cách làm" },
  ]),
  k("事", ["ジ", "ズ"], ["こと"], "việc", "ji", 8, [
    { word: "仕事", kana: "しごと", romaji: "shigoto", meaning_vi: "công việc" },
    { word: "食事", kana: "しょくじ", romaji: "shokuji", meaning_vi: "bữa ăn" },
  ]),
  k("業", ["ギョウ", "ゴウ"], ["わざ"], "nghề / nghiệp", "gyou", 13, [
    { word: "授業", kana: "じゅぎょう", romaji: "jugyou", meaning_vi: "tiết học" },
    { word: "卒業", kana: "そつぎょう", romaji: "sotsugyou", meaning_vi: "tốt nghiệp" },
  ]),
  k("堂", ["ドウ"], [], "sảnh / đường", "dou", 11, [
    { word: "食堂", kana: "しょくどう", romaji: "shokudou", meaning_vi: "nhà ăn" },
    { word: "講堂", kana: "こうどう", romaji: "koudou", meaning_vi: "hội trường" },
  ]),
  k("院", ["イン"], [], "viện", "in", 10, [
    { word: "病院", kana: "びょういん", romaji: "byouin", meaning_vi: "bệnh viện" },
    { word: "入院", kana: "にゅういん", romaji: "nyuuin", meaning_vi: "nhập viện" },
  ]),
  k("館", ["カン"], ["やかた"], "quán / tòa nhà", "kan", 16, [
    { word: "図書館", kana: "としょかん", romaji: "toshokan", meaning_vi: "thư viện" },
    { word: "映画館", kana: "えいがかん", romaji: "eigakan", meaning_vi: "rạp chiếu phim" },
  ]),
  k("屋", ["オク"], ["や"], "nhà / cửa hiệu", "oku", 9, [
    { word: "部屋", kana: "へや", romaji: "heya", meaning_vi: "phòng" },
    { word: "屋上", kana: "おくじょう", romaji: "okujou", meaning_vi: "sân thượng" },
  ]),
  k("度", ["ド", "タク"], ["たび"], "lần / độ", "do", 9, [
    { word: "今度", kana: "こんど", romaji: "kondo", meaning_vi: "lần này / lần tới" },
    { word: "温度", kana: "おんど", romaji: "ondo", meaning_vi: "nhiệt độ" },
  ]),
  k("回", ["カイ"], ["まわ・る"], "vòng / lần", "kai", 6, [
    { word: "一回", kana: "いっかい", romaji: "ikkai", meaning_vi: "một lần" },
    { word: "回転", kana: "かいてん", romaji: "kaiten", meaning_vi: "xoay vòng" },
  ]),
  k("的", ["テキ"], ["まと"], "tính / đích", "teki", 8, [
    { word: "目的", kana: "もくてき", romaji: "mokuteki", meaning_vi: "mục đích" },
    { word: "国際的", kana: "こくさいてき", romaji: "kokusaiteki", meaning_vi: "mang tính quốc tế" },
  ]),
  k("力", ["リョク", "リキ"], ["ちから"], "sức lực", "ryoku", 2, [
    { word: "力", kana: "ちから", romaji: "chikara", meaning_vi: "sức" },
    { word: "努力", kana: "どりょく", romaji: "doryoku", meaning_vi: "nỗ lực" },
  ]),
  k("作", ["サク", "サ"], ["つく・る"], "làm / tạo", "saku", 7, [
    { word: "作る", kana: "つくる", romaji: "tsukuru", meaning_vi: "làm / nấu" },
    { word: "作文", kana: "さくぶん", romaji: "sakubun", meaning_vi: "bài viết" },
  ]),
  k("待", ["タイ"], ["ま・つ"], "đợi", "tai", 9, [
    { word: "待つ", kana: "まつ", romaji: "matsu", meaning_vi: "đợi" },
    { word: "期待", kana: "きたい", romaji: "kitai", meaning_vi: "kỳ vọng" },
  ]),
  k("持", ["ジ"], ["も・つ"], "cầm / giữ", "ji", 9, [
    { word: "持つ", kana: "もつ", romaji: "motsu", meaning_vi: "cầm" },
    { word: "持参", kana: "じさん", romaji: "jisan", meaning_vi: "mang theo" },
  ]),
  k("思", ["シ"], ["おも・う"], "nghĩ", "shi", 9, [
    { word: "思う", kana: "おもう", romaji: "omou", meaning_vi: "nghĩ" },
    { word: "意思", kana: "いし", romaji: "ishi", meaning_vi: "ý chí" },
  ]),
  k("知", ["チ"], ["し・る"], "biết", "chi", 8, [
    { word: "知る", kana: "しる", romaji: "shiru", meaning_vi: "biết" },
    { word: "知識", kana: "ちしき", romaji: "chishiki", meaning_vi: "kiến thức" },
  ]),
  k("言", ["ゲン", "ゴン"], ["い・う", "こと"], "nói / lời", "gen", 7, [
    { word: "言う", kana: "いう", romaji: "iu", meaning_vi: "nói" },
    { word: "言語", kana: "げんご", romaji: "gengo", meaning_vi: "ngôn ngữ" },
  ]),
  k("考", ["コウ"], ["かんが・える"], "suy nghĩ", "kou", 6, [
    { word: "考える", kana: "かんがえる", romaji: "kangaeru", meaning_vi: "suy nghĩ" },
    { word: "参考", kana: "さんこう", romaji: "sankou", meaning_vi: "tham khảo" },
  ]),
  k("教", ["キョウ"], ["おし・える", "おそ・わる"], "dạy", "kyou", 11, [
    { word: "教える", kana: "おしえる", romaji: "oshieru", meaning_vi: "dạy" },
    { word: "教室", kana: "きょうしつ", romaji: "kyoushitsu", meaning_vi: "phòng học" },
  ]),
  k("室", ["シツ"], ["むろ"], "phòng", "shitsu", 9, [
    { word: "教室", kana: "きょうしつ", romaji: "kyoushitsu", meaning_vi: "phòng học" },
    { word: "室内", kana: "しつない", romaji: "shitsunai", meaning_vi: "trong phòng" },
  ]),
  k("起", ["キ"], ["お・きる", "お・こす"], "dậy / nổi lên", "ki", 10, [
    { word: "起きる", kana: "おきる", romaji: "okiru", meaning_vi: "thức dậy" },
    { word: "起源", kana: "きげん", romaji: "kigen", meaning_vi: "nguồn gốc" },
  ]),
  k("終", ["シュウ"], ["お・わる", "お・える"], "kết thúc", "shuu", 11, [
    { word: "終わる", kana: "おわる", romaji: "owaru", meaning_vi: "kết thúc" },
    { word: "終電", kana: "しゅうでん", romaji: "shuuden", meaning_vi: "chuyến tàu cuối" },
  ]),
  k("始", ["シ"], ["はじ・める", "はじ・まる"], "bắt đầu", "shi", 8, [
    { word: "始める", kana: "はじめる", romaji: "hajimeru", meaning_vi: "bắt đầu" },
    { word: "開始", kana: "かいし", romaji: "kaishi", meaning_vi: "khởi đầu" },
  ]),
  k("使", ["シ"], ["つか・う"], "dùng / sai khiến", "shi", 8, [
    { word: "使う", kana: "つかう", romaji: "tsukau", meaning_vi: "sử dụng" },
    { word: "使用", kana: "しよう", romaji: "shiyou", meaning_vi: "việc sử dụng" },
  ]),
  k("急", ["キュウ"], ["いそ・ぐ"], "gấp / đột ngột", "kyuu", 9, [
    { word: "急ぐ", kana: "いそぐ", romaji: "isogu", meaning_vi: "vội" },
    { word: "急行", kana: "きゅうこう", romaji: "kyuukou", meaning_vi: "tàu tốc hành" },
  ]),
  k("速", ["ソク"], ["はや・い"], "nhanh", "soku", 10, [
    { word: "速い", kana: "はやい", romaji: "hayai", meaning_vi: "nhanh" },
    { word: "速度", kana: "そくど", romaji: "sokudo", meaning_vi: "tốc độ" },
  ]),
  k("遅", ["チ"], ["おそ・い", "おく・れる"], "chậm / trễ", "chi", 12, [
    { word: "遅い", kana: "おそい", romaji: "osoi", meaning_vi: "chậm / muộn" },
    { word: "遅刻", kana: "ちこく", romaji: "chikoku", meaning_vi: "đến trễ" },
  ]),
  k("走", ["ソウ"], ["はし・る"], "chạy", "sou", 7, [
    { word: "走る", kana: "はしる", romaji: "hashiru", meaning_vi: "chạy" },
    { word: "走行", kana: "そうこう", romaji: "soukou", meaning_vi: "chạy xe" },
  ]),
  k("歩", ["ホ", "ブ", "フ"], ["ある・く"], "bước / đi bộ", "ho", 8, [
    { word: "歩く", kana: "あるく", romaji: "aruku", meaning_vi: "đi bộ" },
    { word: "散歩", kana: "さんぽ", romaji: "sanpo", meaning_vi: "đi dạo" },
  ]),
  k("正", ["セイ", "ショウ"], ["ただ・しい"], "đúng / chính", "sei", 5, [
    { word: "正しい", kana: "ただしい", romaji: "tadashii", meaning_vi: "đúng đắn" },
    { word: "正直", kana: "しょうじき", romaji: "shoujiki", meaning_vi: "thành thật" },
  ]),
  k("音", ["オン", "イン"], ["おと", "ね"], "âm thanh", "on", 9, [
    { word: "音楽", kana: "おんがく", romaji: "ongaku", meaning_vi: "âm nhạc" },
    { word: "発音", kana: "はつおん", romaji: "hatsuon", meaning_vi: "phát âm" },
  ]),
  k("楽", ["ガク", "ラク"], ["たの・しい"], "vui / nhạc", "gaku", 13, [
    { word: "楽しい", kana: "たのしい", romaji: "tanoshii", meaning_vi: "vui" },
    { word: "音楽", kana: "おんがく", romaji: "ongaku", meaning_vi: "âm nhạc" },
  ]),
  k("歌", ["カ"], ["うた", "うた・う"], "bài hát", "ka", 14, [
    { word: "歌う", kana: "うたう", romaji: "utau", meaning_vi: "hát" },
    { word: "歌手", kana: "かしゅ", romaji: "kashu", meaning_vi: "ca sĩ" },
  ]),
  k("映", ["エイ"], ["うつ・る", "は・える"], "chiếu / phản chiếu", "ei", 9, [
    { word: "映画", kana: "えいが", romaji: "eiga", meaning_vi: "phim" },
    { word: "映る", kana: "うつる", romaji: "utsuru", meaning_vi: "hiện lên / phản chiếu" },
  ]),
  k("画", ["ガ", "カク"], [], "hình / họa", "ga", 8, [
    { word: "映画", kana: "えいが", romaji: "eiga", meaning_vi: "phim" },
    { word: "計画", kana: "けいかく", romaji: "keikaku", meaning_vi: "kế hoạch" },
  ]),
  k("写", ["シャ"], ["うつ・す"], "chép / chụp", "sha", 5, [
    { word: "写真", kana: "しゃしん", romaji: "shashin", meaning_vi: "ảnh" },
    { word: "写す", kana: "うつす", romaji: "utsusu", meaning_vi: "chép / chụp" },
  ]),
  k("真", ["シン"], ["ま"], "thật", "shin", 10, [
    { word: "写真", kana: "しゃしん", romaji: "shashin", meaning_vi: "ảnh" },
    { word: "真面目", kana: "まじめ", romaji: "majime", meaning_vi: "nghiêm túc" },
  ]),
  k("色", ["ショク", "シキ"], ["いろ"], "màu", "shoku", 6, [
    { word: "色", kana: "いろ", romaji: "iro", meaning_vi: "màu sắc" },
    { word: "景色", kana: "けしき", romaji: "keshiki", meaning_vi: "phong cảnh" },
  ]),
  k("赤", ["セキ", "シャク"], ["あか", "あか・い"], "đỏ", "seki", 7, [
    { word: "赤い", kana: "あかい", romaji: "akai", meaning_vi: "đỏ" },
    { word: "赤字", kana: "あかじ", romaji: "akaji", meaning_vi: "thâm hụt / lỗ" },
  ]),
  k("青", ["セイ", "ショウ"], ["あお", "あお・い"], "xanh", "sei", 8, [
    { word: "青い", kana: "あおい", romaji: "aoi", meaning_vi: "xanh" },
    { word: "青年", kana: "せいねん", romaji: "seinen", meaning_vi: "thanh niên" },
  ]),
  k("黒", ["コク"], ["くろ", "くろ・い"], "đen", "koku", 11, [
    { word: "黒い", kana: "くろい", romaji: "kuroi", meaning_vi: "đen" },
    { word: "黒板", kana: "こくばん", romaji: "kokuban", meaning_vi: "bảng đen" },
  ]),
  k("紙", ["シ"], ["かみ"], "giấy", "shi", 10, [
    { word: "紙", kana: "かみ", romaji: "kami", meaning_vi: "giấy" },
    { word: "手紙", kana: "てがみ", romaji: "tegami", meaning_vi: "thư" },
  ]),
  k("切", ["セツ", "サイ"], ["き・る"], "cắt", "setsu", 4, [
    { word: "切る", kana: "きる", romaji: "kiru", meaning_vi: "cắt" },
    { word: "大切", kana: "たいせつ", romaji: "taisetsu", meaning_vi: "quan trọng" },
  ]),
  k("代", ["ダイ", "タイ"], ["か・わる", "よ"], "thế / đời / giá", "dai", 5, [
    { word: "時代", kana: "じだい", romaji: "jidai", meaning_vi: "thời đại" },
    { word: "代金", kana: "だいきん", romaji: "daikin", meaning_vi: "tiền thanh toán" },
  ]),
  k("場", ["ジョウ"], ["ば"], "nơi / chỗ", "jou", 12, [
    { word: "場所", kana: "ばしょ", romaji: "basho", meaning_vi: "địa điểm" },
    { word: "会場", kana: "かいじょう", romaji: "kaijou", meaning_vi: "hội trường" },
  ]),
  k("所", ["ショ"], ["ところ"], "chỗ", "sho", 8, [
    { word: "場所", kana: "ばしょ", romaji: "basho", meaning_vi: "địa điểm" },
    { word: "住所", kana: "じゅうしょ", romaji: "juusho", meaning_vi: "địa chỉ" },
  ]),
  k("世", ["セイ", "セ"], ["よ"], "đời / thế", "sei", 5, [
    { word: "世界", kana: "せかい", romaji: "sekai", meaning_vi: "thế giới" },
    { word: "世話", kana: "せわ", romaji: "sewa", meaning_vi: "chăm sóc / giúp đỡ" },
  ]),
  k("界", ["カイ"], [], "giới / cõi", "kai", 9, [
    { word: "世界", kana: "せかい", romaji: "sekai", meaning_vi: "thế giới" },
    { word: "限界", kana: "げんかい", romaji: "genkai", meaning_vi: "giới hạn" },
  ]),
];
