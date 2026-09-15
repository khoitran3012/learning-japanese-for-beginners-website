import type { KanjiEntry } from "@/lib/akari/types";

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
    id: `kj-n5-${character}`,
    character,
    onyomi,
    kunyomi,
    meaning_vi,
    romaji,
    level: "N5",
    stroke_count,
    examples,
  };
}

export const KANJI_N5: KanjiEntry[] = [
  k("日", ["ニチ", "ジツ"], ["ひ", "か"], "ngày / mặt trời", "nichi", 4, [
    { word: "日本", kana: "にほん", romaji: "nihon", meaning_vi: "Nhật Bản" },
    { word: "日曜日", kana: "にちようび", romaji: "nichiyoubi", meaning_vi: "Chủ nhật" },
  ]),
  k("月", ["ゲツ", "ガツ"], ["つき"], "tháng / mặt trăng", "getsu", 4, [
    { word: "月曜日", kana: "げつようび", romaji: "getsuyoubi", meaning_vi: "thứ Hai" },
    { word: "今月", kana: "こんげつ", romaji: "kongetsu", meaning_vi: "tháng này" },
  ]),
  k("火", ["カ"], ["ひ"], "lửa", "ka", 4, [
    { word: "火曜日", kana: "かようび", romaji: "kayoubi", meaning_vi: "thứ Ba" },
    { word: "花火", kana: "はなび", romaji: "hanabi", meaning_vi: "pháo hoa" },
  ]),
  k("水", ["スイ"], ["みず"], "nước", "sui", 4, [
    { word: "水曜日", kana: "すいようび", romaji: "suiyoubi", meaning_vi: "thứ Tư" },
    { word: "水", kana: "みず", romaji: "mizu", meaning_vi: "nước" },
  ]),
  k("木", ["モク", "ボク"], ["き"], "cây / gỗ", "moku", 4, [
    { word: "木曜日", kana: "もくようび", romaji: "mokuyoubi", meaning_vi: "thứ Năm" },
    { word: "木", kana: "き", romaji: "ki", meaning_vi: "cây" },
  ]),
  k("金", ["キン", "コン"], ["かね"], "vàng / tiền", "kin", 8, [
    { word: "金曜日", kana: "きんようび", romaji: "kinyoubi", meaning_vi: "thứ Sáu" },
    { word: "お金", kana: "おかね", romaji: "okane", meaning_vi: "tiền" },
  ]),
  k("土", ["ド", "ト"], ["つち"], "đất", "do", 3, [
    { word: "土曜日", kana: "どようび", romaji: "doyoubi", meaning_vi: "thứ Bảy" },
    { word: "土地", kana: "とち", romaji: "tochi", meaning_vi: "đất đai" },
  ]),
  k("人", ["ジン", "ニン"], ["ひと"], "người", "jin", 2, [
    { word: "日本人", kana: "にほんじん", romaji: "nihonjin", meaning_vi: "người Nhật" },
    { word: "一人", kana: "ひとり", romaji: "hitori", meaning_vi: "một người" },
  ]),
  k("口", ["コウ", "ク"], ["くち"], "miệng / cửa", "kou", 3, [
    { word: "入口", kana: "いりぐち", romaji: "iriguchi", meaning_vi: "lối vào" },
    { word: "出口", kana: "でぐち", romaji: "deguchi", meaning_vi: "lối ra" },
  ]),
  k("目", ["モク", "ボク"], ["め"], "mắt", "moku", 5, [
    { word: "目", kana: "め", romaji: "me", meaning_vi: "mắt" },
    { word: "注目", kana: "ちゅうもく", romaji: "chuumoku", meaning_vi: "chú ý" },
  ]),
  k("耳", ["ジ"], ["みみ"], "tai", "ji", 6, [
    { word: "耳", kana: "みみ", romaji: "mimi", meaning_vi: "tai" },
    { word: "耳鼻科", kana: "じびか", romaji: "jibika", meaning_vi: "khoa tai mũi họng" },
  ]),
  k("手", ["シュ"], ["て"], "tay", "shu", 4, [
    { word: "手紙", kana: "てがみ", romaji: "tegami", meaning_vi: "thư" },
    { word: "上手", kana: "じょうず", romaji: "jouzu", meaning_vi: "giỏi" },
  ]),
  k("足", ["ソク"], ["あし", "た・りる"], "chân / đủ", "soku", 7, [
    { word: "足", kana: "あし", romaji: "ashi", meaning_vi: "chân" },
    { word: "不足", kana: "ふそく", romaji: "fusoku", meaning_vi: "thiếu" },
  ]),
  k("山", ["サン"], ["やま"], "núi", "san", 3, [
    { word: "山", kana: "やま", romaji: "yama", meaning_vi: "núi" },
    { word: "富士山", kana: "ふじさん", romaji: "fujisan", meaning_vi: "núi Phú Sĩ" },
  ]),
  k("川", ["セン"], ["かわ"], "sông", "sen", 3, [
    { word: "川", kana: "かわ", romaji: "kawa", meaning_vi: "sông" },
    { word: "小川", kana: "おがわ", romaji: "ogawa", meaning_vi: "suối nhỏ" },
  ]),
  k("田", ["デン"], ["た"], "ruộng", "den", 5, [
    { word: "田中", kana: "たなか", romaji: "tanaka", meaning_vi: "Tanaka (họ)" },
    { word: "水田", kana: "すいでん", romaji: "suiden", meaning_vi: "ruộng nước" },
  ]),
  k("天", ["テン"], ["あま"], "trời", "ten", 4, [
    { word: "天気", kana: "てんき", romaji: "tenki", meaning_vi: "thời tiết" },
    { word: "天気図", kana: "てんきず", romaji: "tenkizu", meaning_vi: "bản đồ thời tiết" },
  ]),
  k("気", ["キ", "ケ"], ["き"], "khí / tâm trạng", "ki", 6, [
    { word: "元気", kana: "げんき", romaji: "genki", meaning_vi: "khỏe / năng động" },
    { word: "天気", kana: "てんき", romaji: "tenki", meaning_vi: "thời tiết" },
  ]),
  k("一", ["イチ"], ["ひと・つ"], "một", "ichi", 1, [
    { word: "一人", kana: "ひとり", romaji: "hitori", meaning_vi: "một người" },
    { word: "一日", kana: "いちにち", romaji: "ichinichi", meaning_vi: "một ngày" },
  ]),
  k("二", ["ニ"], ["ふた・つ"], "hai", "ni", 2, [
    { word: "二人", kana: "ふたり", romaji: "futari", meaning_vi: "hai người" },
    { word: "二月", kana: "にがつ", romaji: "nigatsu", meaning_vi: "tháng Hai" },
  ]),
  k("三", ["サン"], ["みっ・つ"], "ba", "san", 3, [
    { word: "三日", kana: "みっか", romaji: "mikka", meaning_vi: "ngày mồng ba" },
    { word: "三月", kana: "さんがつ", romaji: "sangatsu", meaning_vi: "tháng Ba" },
  ]),
  k("四", ["シ"], ["よん", "よ・つ"], "bốn", "shi", 5, [
    { word: "四月", kana: "しがつ", romaji: "shigatsu", meaning_vi: "tháng Tư" },
    { word: "四時", kana: "よじ", romaji: "yoji", meaning_vi: "bốn giờ" },
  ]),
  k("五", ["ゴ"], ["いつ・つ"], "năm", "go", 4, [
    { word: "五日", kana: "いつか", romaji: "itsuka", meaning_vi: "ngày mồng năm" },
    { word: "五月", kana: "ごがつ", romaji: "gogatsu", meaning_vi: "tháng Năm" },
  ]),
  k("六", ["ロク"], ["むっ・つ"], "sáu", "roku", 4, [
    { word: "六月", kana: "ろくがつ", romaji: "rokugatsu", meaning_vi: "tháng Sáu" },
    { word: "六時", kana: "ろくじ", romaji: "rokuji", meaning_vi: "sáu giờ" },
  ]),
  k("七", ["シチ"], ["なな", "なの"], "bảy", "shichi", 2, [
    { word: "七月", kana: "しちがつ", romaji: "shichigatsu", meaning_vi: "tháng Bảy" },
    { word: "七日", kana: "なのか", romaji: "nanoka", meaning_vi: "ngày mồng bảy" },
  ]),
  k("八", ["ハチ"], ["やっ・つ", "よう"], "tám", "hachi", 2, [
    { word: "八月", kana: "はちがつ", romaji: "hachigatsu", meaning_vi: "tháng Tám" },
    { word: "八時", kana: "はちじ", romaji: "hachiji", meaning_vi: "tám giờ" },
  ]),
  k("九", ["キュウ", "ク"], ["ここの・つ"], "chín", "kyuu", 2, [
    { word: "九月", kana: "くがつ", romaji: "kugatsu", meaning_vi: "tháng Chín" },
    { word: "九日", kana: "ここのか", romaji: "kokonoka", meaning_vi: "ngày mồng chín" },
  ]),
  k("十", ["ジュウ"], ["とお"], "mười", "juu", 2, [
    { word: "十月", kana: "じゅうがつ", romaji: "juugatsu", meaning_vi: "tháng Mười" },
    { word: "十日", kana: "とおか", romaji: "tooka", meaning_vi: "ngày mồng mười" },
  ]),
  k("百", ["ヒャク"], [], "trăm", "hyaku", 6, [
    { word: "百円", kana: "ひゃくえん", romaji: "hyaku en", meaning_vi: "một trăm yên" },
    { word: "三百", kana: "さんびゃく", romaji: "sanbyaku", meaning_vi: "ba trăm" },
  ]),
  k("千", ["セン"], ["ち"], "nghìn", "sen", 3, [
    { word: "千円", kana: "せんえん", romaji: "sen en", meaning_vi: "một nghìn yên" },
    { word: "三千", kana: "さんぜん", romaji: "sanzen", meaning_vi: "ba nghìn" },
  ]),
  k("万", ["マン", "バン"], [], "vạn / mười nghìn", "man", 3, [
    { word: "一万円", kana: "いちまんえん", romaji: "ichiman en", meaning_vi: "mười nghìn yên" },
    { word: "万", kana: "まん", romaji: "man", meaning_vi: "vạn" },
  ]),
  k("円", ["エン"], ["まる"], "yên / hình tròn", "en", 4, [
    { word: "百円", kana: "ひゃくえん", romaji: "hyaku en", meaning_vi: "một trăm yên" },
    { word: "円い", kana: "まるい", romaji: "marui", meaning_vi: "tròn" },
  ]),
  k("年", ["ネン"], ["とし"], "năm", "nen", 6, [
    { word: "今年", kana: "ことし", romaji: "kotoshi", meaning_vi: "năm nay" },
    { word: "来年", kana: "らいねん", romaji: "rainen", meaning_vi: "năm sau" },
  ]),
  k("時", ["ジ"], ["とき"], "giờ / lúc", "ji", 10, [
    { word: "時間", kana: "じかん", romaji: "jikan", meaning_vi: "thời gian" },
    { word: "三時", kana: "さんじ", romaji: "sanji", meaning_vi: "ba giờ" },
  ]),
  k("分", ["ブン", "フン", "ブ"], ["わ・ける"], "phút / chia", "bun", 4, [
    { word: "十分", kana: "じゅっぷん", romaji: "juppun", meaning_vi: "mười phút" },
    { word: "自分", kana: "じぶん", romaji: "jibun", meaning_vi: "bản thân" },
  ]),
  k("半", ["ハン"], ["なか・ば"], "một nửa", "han", 5, [
    { word: "半分", kana: "はんぶん", romaji: "hanbun", meaning_vi: "một nửa" },
    { word: "三時半", kana: "さんじはん", romaji: "sanji han", meaning_vi: "ba giờ rưỡi" },
  ]),
  k("今", ["コン", "キン"], ["いま"], "bây giờ / hiện tại", "kon", 4, [
    { word: "今日", kana: "きょう", romaji: "kyou", meaning_vi: "hôm nay" },
    { word: "今晚", kana: "こんばん", romaji: "konban", meaning_vi: "tối nay" },
  ]),
  k("先", ["セン"], ["さき"], "trước / đầu", "sen", 6, [
    { word: "先生", kana: "せんせい", romaji: "sensei", meaning_vi: "giáo viên" },
    { word: "先週", kana: "せんしゅう", romaji: "senshuu", meaning_vi: "tuần trước" },
  ]),
  k("生", ["セイ", "ショウ"], ["い・きる", "う・まれる"], "sống / sinh", "sei", 5, [
    { word: "学生", kana: "がくせい", romaji: "gakusei", meaning_vi: "học sinh" },
    { word: "先生", kana: "せんせい", romaji: "sensei", meaning_vi: "giáo viên" },
  ]),
  k("学", ["ガク"], ["まな・ぶ"], "học", "gaku", 8, [
    { word: "学校", kana: "がっこう", romaji: "gakkou", meaning_vi: "trường học" },
    { word: "大学", kana: "だいがく", romaji: "daigaku", meaning_vi: "đại học" },
  ]),
  k("校", ["コウ"], [], "trường", "kou", 10, [
    { word: "学校", kana: "がっこう", romaji: "gakkou", meaning_vi: "trường học" },
    { word: "高校", kana: "こうこう", romaji: "koukou", meaning_vi: "trung học phổ thông" },
  ]),
  k("入", ["ニュウ"], ["はい・る", "い・れる"], "vào", "nyuu", 2, [
    { word: "入学", kana: "にゅうがく", romaji: "nyuugaku", meaning_vi: "nhập học" },
    { word: "入口", kana: "いりぐち", romaji: "iriguchi", meaning_vi: "lối vào" },
  ]),
  k("出", ["シュツ"], ["で・る", "だ・す"], "ra", "shutsu", 5, [
    { word: "出口", kana: "でぐち", romaji: "deguchi", meaning_vi: "lối ra" },
    { word: "出発", kana: "しゅっぱつ", romaji: "shuppatsu", meaning_vi: "xuất phát" },
  ]),
  k("上", ["ジョウ"], ["うえ", "あ・がる"], "trên / lên", "jou", 3, [
    { word: "上手", kana: "じょうず", romaji: "jouzu", meaning_vi: "giỏi" },
    { word: "上着", kana: "うわぎ", romaji: "uwagi", meaning_vi: "áo khoác" },
  ]),
  k("下", ["カ", "ゲ"], ["した", "さ・がる"], "dưới / xuống", "ka", 3, [
    { word: "下手", kana: "へた", romaji: "heta", meaning_vi: "vụng về" },
    { word: "地下鉄", kana: "ちかてつ", romaji: "chikatetsu", meaning_vi: "tàu điện ngầm" },
  ]),
  k("中", ["チュウ"], ["なか"], "trong / giữa", "chuu", 4, [
    { word: "中国", kana: "ちゅうごく", romaji: "chuugoku", meaning_vi: "Trung Quốc" },
    { word: "中学生", kana: "ちゅうがくせい", romaji: "chuugakusei", meaning_vi: "học sinh cấp hai" },
  ]),
  k("外", ["ガイ", "ゲ"], ["そと"], "ngoài", "gai", 5, [
    { word: "外国", kana: "がいこく", romaji: "gaikoku", meaning_vi: "nước ngoài" },
    { word: "外出", kana: "がいしゅつ", romaji: "gaishutsu", meaning_vi: "ra ngoài" },
  ]),
  k("前", ["ゼン"], ["まえ"], "trước", "zen", 9, [
    { word: "名前", kana: "なまえ", romaji: "namae", meaning_vi: "tên" },
    { word: "午前", kana: "ごぜん", romaji: "gozen", meaning_vi: "buổi sáng" },
  ]),
  k("後", ["ゴ", "コウ"], ["あと", "うし・ろ"], "sau / đằng sau", "go", 9, [
    { word: "午後", kana: "ごご", romaji: "gogo", meaning_vi: "buổi chiều" },
    { word: "後ろ", kana: "うしろ", romaji: "ushiro", meaning_vi: "phía sau" },
  ]),
  k("右", ["ウ", "ユウ"], ["みぎ"], "phải", "u", 5, [
    { word: "右", kana: "みぎ", romaji: "migi", meaning_vi: "bên phải" },
    { word: "右手", kana: "みぎて", romaji: "migite", meaning_vi: "tay phải" },
  ]),
  k("左", ["サ"], ["ひだり"], "trái", "sa", 5, [
    { word: "左", kana: "ひだり", romaji: "hidari", meaning_vi: "bên trái" },
    { word: "左手", kana: "ひだりて", romaji: "hidarite", meaning_vi: "tay trái" },
  ]),
  k("東", ["トウ"], ["ひがし"], "đông", "tou", 8, [
    { word: "東京", kana: "とうきょう", romaji: "toukyou", meaning_vi: "Tokyo" },
    { word: "東口", kana: "ひがしぐち", romaji: "higashiguchi", meaning_vi: "cửa phía đông" },
  ]),
  k("西", ["セイ", "サイ"], ["にし"], "tây", "sei", 6, [
    { word: "西口", kana: "にしぐち", romaji: "nishiguchi", meaning_vi: "cửa phía tây" },
    { word: "関西", kana: "かんさい", romaji: "kansai", meaning_vi: "vùng Kansai" },
  ]),
  k("南", ["ナン"], ["みなみ"], "nam", "nan", 9, [
    { word: "南口", kana: "みなみぐち", romaji: "minamiguchi", meaning_vi: "cửa phía nam" },
    { word: "南", kana: "みなみ", romaji: "minami", meaning_vi: "phía nam" },
  ]),
  k("北", ["ホク"], ["きた"], "bắc", "hoku", 5, [
    { word: "北口", kana: "きたぐち", romaji: "kitaguchi", meaning_vi: "cửa phía bắc" },
    { word: "北海道", kana: "ほっかいどう", romaji: "hokkaidou", meaning_vi: "Hokkaido" },
  ]),
  k("車", ["シャ"], ["くるま"], "xe", "sha", 7, [
    { word: "電車", kana: "でんしゃ", romaji: "densha", meaning_vi: "tàu điện" },
    { word: "自転車", kana: "じてんしゃ", romaji: "jitensha", meaning_vi: "xe đạp" },
  ]),
  k("電", ["デン"], [], "điện", "den", 13, [
    { word: "電車", kana: "でんしゃ", romaji: "densha", meaning_vi: "tàu điện" },
    { word: "電話", kana: "でんわ", romaji: "denwa", meaning_vi: "điện thoại" },
  ]),
  k("話", ["ワ"], ["はな・す", "はなし"], "nói / chuyện", "wa", 13, [
    { word: "会話", kana: "かいわ", romaji: "kaiwa", meaning_vi: "hội thoại" },
    { word: "電話", kana: "でんわ", romaji: "denwa", meaning_vi: "điện thoại" },
  ]),
  k("語", ["ゴ"], ["かた・る"], "ngôn ngữ", "go", 14, [
    { word: "日本語", kana: "にほんご", romaji: "nihongo", meaning_vi: "tiếng Nhật" },
    { word: "英語", kana: "えいご", romaji: "eigo", meaning_vi: "tiếng Anh" },
  ]),
  k("読", ["ドク", "トク"], ["よ・む"], "đọc", "doku", 14, [
    { word: "読む", kana: "よむ", romaji: "yomu", meaning_vi: "đọc" },
    { word: "読書", kana: "どくしょ", romaji: "dokusho", meaning_vi: "đọc sách" },
  ]),
  k("書", ["ショ"], ["か・く"], "viết", "sho", 10, [
    { word: "辞書", kana: "じしょ", romaji: "jisho", meaning_vi: "từ điển" },
    { word: "図書館", kana: "としょかん", romaji: "toshokan", meaning_vi: "thư viện" },
  ]),
  k("見", ["ケン"], ["み・る"], "nhìn / xem", "ken", 7, [
    { word: "見る", kana: "みる", romaji: "miru", meaning_vi: "nhìn / xem" },
    { word: "意見", kana: "いけん", romaji: "iken", meaning_vi: "ý kiến" },
  ]),
  k("聞", ["ブン", "モン"], ["き・く"], "nghe / hỏi", "bun", 14, [
    { word: "聞く", kana: "きく", romaji: "kiku", meaning_vi: "nghe" },
    { word: "新聞", kana: "しんぶん", romaji: "shinbun", meaning_vi: "báo" },
  ]),
  k("食", ["ショク"], ["た・べる"], "ăn", "shoku", 9, [
    { word: "食べる", kana: "たべる", romaji: "taberu", meaning_vi: "ăn" },
    { word: "食堂", kana: "しょくどう", romaji: "shokudou", meaning_vi: "nhà ăn" },
  ]),
  k("飲", ["イン"], ["の・む"], "uống", "in", 12, [
    { word: "飲む", kana: "のむ", romaji: "nomu", meaning_vi: "uống" },
    { word: "飲み物", kana: "のみもの", romaji: "nomimono", meaning_vi: "đồ uống" },
  ]),
  k("買", ["バイ"], ["か・う"], "mua", "bai", 12, [
    { word: "買う", kana: "かう", romaji: "kau", meaning_vi: "mua" },
    { word: "買い物", kana: "かいもの", romaji: "kaimono", meaning_vi: "mua sắm" },
  ]),
  k("行", ["コウ", "ギョウ"], ["い・く", "おこな・う"], "đi", "kou", 6, [
    { word: "行く", kana: "いく", romaji: "iku", meaning_vi: "đi" },
    { word: "銀行", kana: "ぎんこう", romaji: "ginkou", meaning_vi: "ngân hàng" },
  ]),
  k("来", ["ライ"], ["く・る"], "đến", "rai", 7, [
    { word: "来る", kana: "くる", romaji: "kuru", meaning_vi: "đến" },
    { word: "来年", kana: "らいねん", romaji: "rainen", meaning_vi: "năm sau" },
  ]),
  k("帰", ["キ"], ["かえ・る"], "về", "ki", 10, [
    { word: "帰る", kana: "かえる", romaji: "kaeru", meaning_vi: "về nhà" },
    { word: "帰国", kana: "きこく", romaji: "kikoku", meaning_vi: "về nước" },
  ]),
  k("休", ["キュウ"], ["やす・む"], "nghỉ", "kyuu", 6, [
    { word: "休む", kana: "やすむ", romaji: "yasumu", meaning_vi: "nghỉ" },
    { word: "休日", kana: "きゅうじつ", romaji: "kyuujitsu", meaning_vi: "ngày nghỉ" },
  ]),
  k("友", ["ユウ"], ["とも"], "bạn", "yuu", 4, [
    { word: "友達", kana: "ともだち", romaji: "tomodachi", meaning_vi: "bạn bè" },
    { word: "友人", kana: "ゆうじん", romaji: "yuujin", meaning_vi: "người bạn" },
  ]),
  k("母", ["ボ"], ["はは"], "mẹ", "bo", 5, [
    { word: "母", kana: "はは", romaji: "haha", meaning_vi: "mẹ (của mình)" },
    { word: "母語", kana: "ぼご", romaji: "bogo", meaning_vi: "tiếng mẹ đẻ" },
  ]),
  k("父", ["フ"], ["ちち"], "bố", "fu", 4, [
    { word: "父", kana: "ちち", romaji: "chichi", meaning_vi: "bố (của mình)" },
    { word: "父母", kana: "ふぼ", romaji: "fubo", meaning_vi: "cha mẹ" },
  ]),
  k("女", ["ジョ", "ニョ"], ["おんな"], "nữ / phụ nữ", "jo", 3, [
    { word: "女の人", kana: "おんなのひと", romaji: "onna no hito", meaning_vi: "người phụ nữ" },
    { word: "女子", kana: "じょし", romaji: "joshi", meaning_vi: "nữ sinh / con gái" },
  ]),
  k("男", ["ダン", "ナン"], ["おとこ"], "nam / đàn ông", "dan", 7, [
    { word: "男の人", kana: "おとこのひと", romaji: "otoko no hito", meaning_vi: "người đàn ông" },
    { word: "男子", kana: "だんし", romaji: "danshi", meaning_vi: "nam sinh / con trai" },
  ]),
  k("子", ["シ", "ス"], ["こ"], "con / trẻ", "shi", 3, [
    { word: "子供", kana: "こども", romaji: "kodomo", meaning_vi: "trẻ em" },
    { word: "女子", kana: "じょし", romaji: "joshi", meaning_vi: "nữ sinh" },
  ]),
  k("名", ["メイ", "ミョウ"], ["な"], "tên", "mei", 6, [
    { word: "名前", kana: "なまえ", romaji: "namae", meaning_vi: "tên" },
    { word: "有名", kana: "ゆうめい", romaji: "yuumei", meaning_vi: "nổi tiếng" },
  ]),
  k("何", ["カ"], ["なに", "なん"], "gì", "ka", 7, [
    { word: "何", kana: "なに", romaji: "nani", meaning_vi: "cái gì" },
    { word: "何時", kana: "なんじ", romaji: "nanji", meaning_vi: "mấy giờ" },
  ]),
  k("大", ["ダイ", "タイ"], ["おお・きい"], "lớn", "dai", 3, [
    { word: "大学", kana: "だいがく", romaji: "daigaku", meaning_vi: "đại học" },
    { word: "大きい", kana: "おおきい", romaji: "ookii", meaning_vi: "to" },
  ]),
  k("小", ["ショウ"], ["ちい・さい"], "nhỏ", "shou", 3, [
    { word: "小さい", kana: "ちいさい", romaji: "chiisai", meaning_vi: "nhỏ" },
    { word: "小学校", kana: "しょうがっこう", romaji: "shougakkou", meaning_vi: "tiểu học" },
  ]),
  k("高", ["コウ"], ["たか・い"], "cao / đắt", "kou", 10, [
    { word: "高い", kana: "たかい", romaji: "takai", meaning_vi: "cao / đắt" },
    { word: "高校", kana: "こうこう", romaji: "koukou", meaning_vi: "trung học phổ thông" },
  ]),
  k("安", ["アン"], ["やす・い"], "rẻ / yên", "an", 6, [
    { word: "安い", kana: "やすい", romaji: "yasui", meaning_vi: "rẻ" },
    { word: "安全", kana: "あんぜん", romaji: "anzen", meaning_vi: "an toàn" },
  ]),
  k("新", ["シン"], ["あたら・しい"], "mới", "shin", 13, [
    { word: "新しい", kana: "あたらしい", romaji: "atarashii", meaning_vi: "mới" },
    { word: "新聞", kana: "しんぶん", romaji: "shinbun", meaning_vi: "báo" },
  ]),
  k("古", ["コ"], ["ふる・い"], "cũ", "ko", 5, [
    { word: "古い", kana: "ふるい", romaji: "furui", meaning_vi: "cũ" },
    { word: "中古", kana: "ちゅうこ", romaji: "chuuko", meaning_vi: "đã qua sử dụng" },
  ]),
  k("多", ["タ"], ["おお・い"], "nhiều", "ta", 6, [
    { word: "多い", kana: "おおい", romaji: "ooi", meaning_vi: "nhiều" },
    { word: "多少", kana: "たしょう", romaji: "tashou", meaning_vi: "hơi / một chút" },
  ]),
  k("少", ["ショウ"], ["すく・ない", "すこ・し"], "ít", "shou", 4, [
    { word: "少し", kana: "すこし", romaji: "sukoshi", meaning_vi: "một chút" },
    { word: "少年", kana: "しょうねん", romaji: "shounen", meaning_vi: "thiếu niên" },
  ]),
  k("白", ["ハク", "ビャク"], ["しろ", "しろ・い"], "trắng", "haku", 5, [
    { word: "白い", kana: "しろい", romaji: "shiroi", meaning_vi: "trắng" },
    { word: "白紙", kana: "はくし", romaji: "hakushi", meaning_vi: "tờ giấy trắng" },
  ]),
  k("長", ["チョウ"], ["なが・い"], "dài / trưởng", "chou", 8, [
    { word: "長い", kana: "ながい", romaji: "nagai", meaning_vi: "dài" },
    { word: "社長", kana: "しゃちょう", romaji: "shachou", meaning_vi: "giám đốc" },
  ]),
];
