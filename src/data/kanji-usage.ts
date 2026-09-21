import type { Example, KanjiExample } from "@/lib/akari/types";

export type KanjiUsage = {
  tip: string;
  words: KanjiExample[];
  sentences: Example[];
};

export const KANJI_USAGE: Record<string, KanjiUsage> = {
  "日": {
    tip: "Đứng một mình đọc ひ (kun). Trong từ ghép thường đọc にち / じつ / に (on).",
    words: [
      { word: "休日", kana: "きゅうじつ", romaji: "kyuujitsu", meaning_vi: "ngày nghỉ", reading: "on", usage: "日 đọc じつ sau 休" },
      { word: "誕生日", kana: "たんじょうび", romaji: "tanjoubi", meaning_vi: "sinh nhật", reading: "kun", usage: "日 đọc び khi chỉ ngày" },
    ],
    sentences: [
      { jp: "今日はいい日です。", kana: "きょうはいいひです。", romaji: "Kyou wa ii hi desu.", vi: "Hôm nay là một ngày đẹp." },
      { jp: "日本へ行きたいです。", kana: "にほんへいきたいです。", romaji: "Nihon e ikitai desu.", vi: "Tôi muốn đi Nhật Bản." },
    ],
  },
  "月": {
    tip: "Một mình: つき. Trong thứ trong tuần: げつ. Tháng trong năm: がつ.",
    words: [
      { word: "毎月", kana: "まいつき", romaji: "maitsuki", meaning_vi: "hàng tháng", reading: "kun", usage: "月 đọc つき" },
      { word: "一月", kana: "いちがつ", romaji: "ichigatsu", meaning_vi: "tháng Một", reading: "on", usage: "月 đọc がつ khi đếm tháng" },
    ],
    sentences: [
      { jp: "月がきれいです。", kana: "つきがきれいです。", romaji: "Tsuki ga kirei desu.", vi: "Mặt trăng rất đẹp." },
      { jp: "来月試験があります。", kana: "らいげつしけんがあります。", romaji: "Raigetsu shiken ga arimasu.", vi: "Tháng sau có kỳ thi." },
    ],
  },
  "火": {
    tip: "Kun ひ = lửa. On か trong thứ Ba và từ Hán.",
    words: [
      { word: "火山", kana: "かざん", romaji: "kazan", meaning_vi: "núi lửa", reading: "on", usage: "火 đọc か trong từ ghép" },
      { word: "火力", kana: "かりょく", romaji: "karyoku", meaning_vi: "hỏa lực", reading: "on", usage: "cùng âm on カ" },
    ],
    sentences: [
      { jp: "火を消してください。", kana: "ひをけしてください。", romaji: "Hi o keshite kudasai.", vi: "Hãy tắt lửa." },
      { jp: "火曜日に会いましょう。", kana: "かようびにあいましょう。", romaji: "Kayoubi ni aimashou.", vi: "Thứ Ba mình gặp nhau nhé." },
    ],
  },
  "水": {
    tip: "Kun みず khi nói nước. On すい trong từ ghép (水曜日, 水道).",
    words: [
      { word: "水道", kana: "すいどう", romaji: "suidou", meaning_vi: "nước máy", reading: "on", usage: "水 đọc すい" },
      { word: "水着", kana: "みずぎ", romaji: "mizugi", meaning_vi: "đồ bơi", reading: "kun", usage: "水 đọc みず" },
    ],
    sentences: [
      { jp: "水を一杯ください。", kana: "みずをいっぱいください。", romaji: "Mizu o ippai kudasai.", vi: "Cho tôi một cốc nước." },
      { jp: "水曜日は休みです。", kana: "すいようびはやすみです。", romaji: "Suiyoubi wa yasumi desu.", vi: "Thứ Tư được nghỉ." },
    ],
  },
  "木": {
    tip: "Kun き = cây. On もく trong thứ Năm.",
    words: [
      { word: "木材", kana: "もくざい", romaji: "mokuzai", meaning_vi: "gỗ", reading: "on", usage: "木 đọc もく" },
      { word: "並木", kana: "なみき", romaji: "namiki", meaning_vi: "hàng cây", reading: "kun", usage: "木 đọc き" },
    ],
    sentences: [
      { jp: "庭に木があります。", kana: "にわにきがあります。", romaji: "Niwa ni ki ga arimasu.", vi: "Trong vườn có cây." },
      { jp: "木曜日にテストがあります。", kana: "もくようびにテストがあります。", romaji: "Mokuyoubi ni tesuto ga arimasu.", vi: "Thứ Năm có bài kiểm tra." },
    ],
  },
  "金": {
    tip: "Kun かね = tiền. On きん = vàng / thứ Sáu.",
    words: [
      { word: "金色", kana: "きんいろ", romaji: "kin'iro", meaning_vi: "màu vàng kim", reading: "on", usage: "金 đọc きん" },
      { word: "代金", kana: "だいきん", romaji: "daikin", meaning_vi: "tiền phải trả", reading: "on", usage: "cùng âm on" },
    ],
    sentences: [
      { jp: "お金がありません。", kana: "おかねがありません。", romaji: "Okane ga arimasen.", vi: "Tôi không có tiền." },
      { jp: "金曜日の夜は映画を見ます。", kana: "きんようびのよるはえいがをみます。", romaji: "Kinyoubi no yoru wa eiga o mimasu.", vi: "Tối thứ Sáu tôi xem phim." },
    ],
  },
  "土": {
    tip: "Kun つち = đất. On ど trong thứ Bảy, 土地.",
    words: [
      { word: "土木", kana: "どぼく", romaji: "doboku", meaning_vi: "công trình dân dụng", reading: "on", usage: "土 đọc ど" },
      { word: "土産", kana: "みやげ", romaji: "miyage", meaning_vi: "quà lưu niệm", reading: "kun", usage: "đọc đặc biệt みやげ" },
    ],
    sentences: [
      { jp: "土を触らないでください。", kana: "つちをさわらないでください。", romaji: "Tsuchi o sawaranaide kudasai.", vi: "Đừng sờ đất." },
      { jp: "土曜日は家にいます。", kana: "どようびはいえにいます。", romaji: "Doyoubi wa ie ni imasu.", vi: "Thứ Bảy tôi ở nhà." },
    ],
  },
  "人": {
    tip: "Kun ひと. On じん (người nước nào), にん (đếm người).",
    words: [
      { word: "外国人", kana: "がいこくじん", romaji: "gaikokujin", meaning_vi: "người nước ngoài", reading: "on", usage: "人 đọc じん" },
      { word: "三人", kana: "さんにん", romaji: "sannin", meaning_vi: "ba người", reading: "on", usage: "人 đọc にん khi đếm" },
    ],
    sentences: [
      { jp: "あの人は先生です。", kana: "あのひとはせんせいです。", romaji: "Ano hito wa sensei desu.", vi: "Người kia là giáo viên." },
      { jp: "日本人の友達がいます。", kana: "にほんじんのともだちがいます。", romaji: "Nihonjin no tomodachi ga imasu.", vi: "Tôi có bạn người Nhật." },
    ],
  },
  "口": {
    tip: "Kun くち = miệng / cửa. On こう trong từ Hán.",
    words: [
      { word: "人口", kana: "じんこう", romaji: "jinkou", meaning_vi: "dân số", reading: "on", usage: "口 đọc こう" },
      { word: "悪口", kana: "わるくち", romaji: "warukuchi", meaning_vi: "nói xấu", reading: "kun", usage: "口 đọc くち" },
    ],
    sentences: [
      { jp: "口を開けてください。", kana: "くちをあけてください。", romaji: "Kuchi o akete kudasai.", vi: "Hãy há miệng." },
      { jp: "入口はあちらです。", kana: "いりぐちはあちらです。", romaji: "Iriguchi wa achira desu.", vi: "Lối vào ở phía kia." },
    ],
  },
  "目": {
    tip: "Kun め = mắt. On もく trong 注目, 目的.",
    words: [
      { word: "目的", kana: "もくてき", romaji: "mokuteki", meaning_vi: "mục đích", reading: "on", usage: "目 đọc もく" },
      { word: "目玉", kana: "めだま", romaji: "medama", meaning_vi: "nhãn cầu", reading: "kun", usage: "目 đọc め" },
    ],
    sentences: [
      { jp: "目が痛いです。", kana: "めがいたいです。", romaji: "Me ga itai desu.", vi: "Mắt tôi đau." },
      { jp: "もう一度目を閉じてください。", kana: "もういちどめをとじてください。", romaji: "Mou ichido me o tojite kudasai.", vi: "Hãy nhắm mắt lần nữa." },
    ],
  },
  "耳": {
    tip: "Thường kun みみ. On じ trong từ y khoa.",
    words: [
      { word: "耳元", kana: "みみもと", romaji: "mimimoto", meaning_vi: "sát tai", reading: "kun", usage: "耳 đọc みみ" },
      { word: "中耳", kana: "ちゅうじ", romaji: "chuuji", meaning_vi: "tai giữa", reading: "on", usage: "耳 đọc じ" },
    ],
    sentences: [
      { jp: "音楽を耳で聞きます。", kana: "おんがくをみみでききます。", romaji: "Ongaku o mimi de kikimasu.", vi: "Tôi nghe nhạc bằng tai." },
      { jp: "耳を澄ましてください。", kana: "みみをすましてください。", romaji: "Mimi o sumashite kudasai.", vi: "Hãy lắng tai." },
    ],
  },
  "手": {
    tip: "Kun て rất phổ biến. On しゅ trong 上手 / 下手 (đọc đặc biệt).",
    words: [
      { word: "手元", kana: "てもと", romaji: "temoto", meaning_vi: "trong tầm tay", reading: "kun", usage: "手 đọc て" },
      { word: "下手", kana: "へた", romaji: "heta", meaning_vi: "vụng", reading: "on", usage: "đọc đặc biệt へた" },
    ],
    sentences: [
      { jp: "手を洗ってください。", kana: "てをあらってください。", romaji: "Te o aratte kudasai.", vi: "Hãy rửa tay." },
      { jp: "彼女は料理が上手です。", kana: "かのじょはりょうりがじょうずです。", romaji: "Kanojo wa ryouri ga jouzu desu.", vi: "Cô ấy nấu ăn giỏi." },
    ],
  },
  "足": {
    tip: "Kun あし = chân. On そく trong 不足.",
    words: [
      { word: "足音", kana: "あしおと", romaji: "ashioto", meaning_vi: "tiếng bước chân", reading: "kun", usage: "足 đọc あし" },
      { word: "満足", kana: "まんぞく", romaji: "manzoku", meaning_vi: "hài lòng", reading: "on", usage: "足 đọc ぞく" },
    ],
    sentences: [
      { jp: "足が痛いので走りません。", kana: "あしがいたいのはしりません。", romaji: "Ashi ga itai node hashirimasen.", vi: "Chân đau nên tôi không chạy." },
      { jp: "時間が足りません。", kana: "じかんがたりません。", romaji: "Jikan ga tarimasen.", vi: "Không đủ thời gian." },
    ],
  },
  "山": {
    tip: "Kun やま. On さん sau tên núi (富士山).",
    words: [
      { word: "山田", kana: "やまだ", romaji: "yamada", meaning_vi: "Yamada (họ)", reading: "kun", usage: "山 đọc やま" },
      { word: "火山", kana: "かざん", romaji: "kazan", meaning_vi: "núi lửa", reading: "on", usage: "山 đọc ざん (rendaku)" },
    ],
    sentences: [
      { jp: "山に登りたいです。", kana: "やまにのぼりたいです。", romaji: "Yama ni noboritai desu.", vi: "Tôi muốn leo núi." },
      { jp: "富士山は日本一高いです。", kana: "ふじさんはにほんいちたかいです。", romaji: "Fujisan wa nihon ichi takai desu.", vi: "Phú Sĩ cao nhất Nhật." },
    ],
  },
  "川": {
    tip: "Kun かわ. On せん ít gặp ở N5.",
    words: [
      { word: "川辺", kana: "かわべ", romaji: "kawabe", meaning_vi: "bờ sông", reading: "kun", usage: "川 đọc かわ" },
      { word: "河川", kana: "かせん", romaji: "kasen", meaning_vi: "sông ngòi", reading: "on", usage: "川 đọc せん" },
    ],
    sentences: [
      { jp: "川で魚を見ました。", kana: "かわでさかなをみました。", romaji: "Kawa de sakana o mimashita.", vi: "Tôi thấy cá dưới sông." },
      { jp: "この川は長いです。", kana: "このかわはながいです。", romaji: "Kono kawa wa nagai desu.", vi: "Con sông này dài." },
    ],
  },
  "田": {
    tip: "Kun た / だ trong họ. On でん trong 水田.",
    words: [
      { word: "田んぼ", kana: "たんぼ", romaji: "tanbo", meaning_vi: "ruộng", reading: "kun", usage: "nói hàng ngày" },
      { word: "油田", kana: "ゆでん", romaji: "yuden", meaning_vi: "mỏ dầu", reading: "on", usage: "田 đọc でん" },
    ],
    sentences: [
      { jp: "田中さんは先生です。", kana: "たなかさんはせんせいです。", romaji: "Tanaka-san wa sensei desu.", vi: "Anh Tanaka là giáo viên." },
      { jp: "春に田に水を入れます。", kana: "はるにたにみずをいれます。", romaji: "Haru ni ta ni mizu o iremasu.", vi: "Mùa xuân người ta dẫn nước vào ruộng." },
    ],
  },
  "天": {
    tip: "Thường on てん. Kun あま trong 雨天 ít dùng N5.",
    words: [
      { word: "天使", kana: "てんし", romaji: "tenshi", meaning_vi: "thiên thần", reading: "on", usage: "天 đọc てん" },
      { word: "天才", kana: "てんさい", romaji: "tensai", meaning_vi: "thiên tài", reading: "on", usage: "cùng âm on" },
    ],
    sentences: [
      { jp: "天気はどうですか。", kana: "てんきはどうですか。", romaji: "Tenki wa dou desu ka.", vi: "Thời tiết thế nào?" },
      { jp: "雨の日は家にいます。", kana: "あめのひはいえにいます。", romaji: "Ame no hi wa ie ni imasu.", vi: "Ngày mưa tôi ở nhà." },
    ],
  },
  "気": {
    tip: "On き rất năng sản: 元気, 天気, 気持ち.",
    words: [
      { word: "気持ち", kana: "きもち", romaji: "kimochi", meaning_vi: "cảm giác", reading: "on", usage: "気 đọc き" },
      { word: "人気", kana: "にんき", romaji: "ninki", meaning_vi: "được yêu thích", reading: "on", usage: "気 đọc き" },
    ],
    sentences: [
      { jp: "元気ですか。", kana: "げんきですか。", romaji: "Genki desu ka.", vi: "Bạn khỏe không?" },
      { jp: "気がつきませんでした。", kana: "きがつきませんでした。", romaji: "Ki ga tsukimasen deshita.", vi: "Tôi đã không để ý." },
    ],
  },
  "一": {
    tip: "Một mình ひと. On いち trong đếm và 一日 (いちにち / ついたち).",
    words: [
      { word: "一緒", kana: "いっしょ", romaji: "issho", meaning_vi: "cùng nhau", reading: "on", usage: "一 đọc いっ (sokuon)" },
      { word: "一人で", kana: "ひとりで", romaji: "hitori de", meaning_vi: "một mình", reading: "kun", usage: "一 đọc ひと" },
    ],
    sentences: [
      { jp: "一つください。", kana: "ひとつください。", romaji: "Hitotsu kudasai.", vi: "Cho tôi một cái." },
      { jp: "一日中勉強しました。", kana: "いちにちじゅうべんきょうしました。", romaji: "Ichinichijuu benkyou shimashita.", vi: "Tôi học cả ngày." },
    ],
  },
  "二": {
    tip: "Kun ふた. On に. Tháng Hai = にがつ.",
    words: [
      { word: "二つ", kana: "ふたつ", romaji: "futatsu", meaning_vi: "hai cái", reading: "kun", usage: "二 đọc ふた" },
      { word: "二十歳", kana: "はたち", romaji: "hatachi", meaning_vi: "20 tuổi", reading: "kun", usage: "đọc đặc biệt" },
    ],
    sentences: [
      { jp: "りんごを二つください。", kana: "りんごをふたつください。", romaji: "Ringo o futatsu kudasai.", vi: "Cho tôi hai quả táo." },
      { jp: "二月は寒いです。", kana: "にがつはさむいです。", romaji: "Nigatsu wa samui desu.", vi: "Tháng Hai lạnh." },
    ],
  },
  "三": {
    tip: "Kun みっ. On さん.",
    words: [
      { word: "三つ", kana: "みっつ", romaji: "mittsu", meaning_vi: "ba cái", reading: "kun", usage: "三 đọc みっ" },
      { word: "三角形", kana: "さんかくけい", romaji: "sankakukei", meaning_vi: "tam giác", reading: "on", usage: "三 đọc さん" },
    ],
    sentences: [
      { jp: "子どもが三人います。", kana: "こどもがさんにんいます。", romaji: "Kodomo ga sannin imasu.", vi: "Có ba đứa trẻ." },
      { jp: "三月は暖かいです。", kana: "さんがつはあたたかいです。", romaji: "Sangatsu wa atatakai desu.", vi: "Tháng Ba ấm." },
    ],
  },
  "四": {
    tip: "Hay đọc よん để tránh し (chết). Tháng Tư = しがつ.",
    words: [
      { word: "四つ", kana: "よっつ", romaji: "yottsu", meaning_vi: "bốn cái", reading: "kun", usage: "四 đọc よっ" },
      { word: "四季", kana: "しき", romaji: "shiki", meaning_vi: "bốn mùa", reading: "on", usage: "四 đọc し" },
    ],
    sentences: [
      { jp: "四時に終わります。", kana: "よじにおわります。", romaji: "Yoji ni owarimasu.", vi: "Hết lúc bốn giờ." },
      { jp: "四月から新学期です。", kana: "しがつからしんがっきです。", romaji: "Shigatsu kara shingakki desu.", vi: "Từ tháng Tư là học kỳ mới." },
    ],
  },
  "五": {
    tip: "Kun いつ. On ご.",
    words: [
      { word: "五つ", kana: "いつつ", romaji: "itsutsu", meaning_vi: "năm cái", reading: "kun", usage: "五 đọc いつ" },
      { word: "五十", kana: "ごじゅう", romaji: "gojuu", meaning_vi: "năm mươi", reading: "on", usage: "五 đọc ご" },
    ],
    sentences: [
      { jp: "五日に会いましょう。", kana: "いつかにあいましょう。", romaji: "Itsuka ni aimashou.", vi: "Gặp nhau ngày mồng năm nhé." },
      { jp: "五月はゴールデンウィークです。", kana: "ごがつはゴールデンウィークです。", romaji: "Gogatsu wa gooruden wiiku desu.", vi: "Tháng Năm có Golden Week." },
    ],
  },
  "六": {
    tip: "Kun むっ. On ろく.",
    words: [
      { word: "六つ", kana: "むっつ", romaji: "muttsu", meaning_vi: "sáu cái", reading: "kun", usage: "六 đọc むっ" },
      { word: "十六", kana: "じゅうろく", romaji: "juuroku", meaning_vi: "mười sáu", reading: "on", usage: "六 đọc ろく" },
    ],
    sentences: [
      { jp: "六時に起きます。", kana: "ろくじにおきます。", romaji: "Rokuji ni okimasu.", vi: "Tôi dậy lúc sáu giờ." },
      { jp: "六月は梅雨です。", kana: "ろくがつはつゆです。", romaji: "Rokugatsu wa tsuyu desu.", vi: "Tháng Sáu là mùa mưa." },
    ],
  },
  "七": {
    tip: "Kun なな / なの. On しち (tháng Bảy しちがつ).",
    words: [
      { word: "七つ", kana: "ななつ", romaji: "nanatsu", meaning_vi: "bảy cái", reading: "kun", usage: "七 đọc なな" },
      { word: "七夕", kana: "たなばた", romaji: "tanabata", meaning_vi: "lễ Tanabata", reading: "kun", usage: "đọc đặc biệt" },
    ],
    sentences: [
      { jp: "七日まで待ってください。", kana: "なのかまでまってください。", romaji: "Nanoka made matte kudasai.", vi: "Hãy đợi đến mồng bảy." },
      { jp: "七月は夏休みです。", kana: "しちがつはなつやすみです。", romaji: "Shichigatsu wa natsuyasumi desu.", vi: "Tháng Bảy là nghỉ hè." },
    ],
  },
  "八": {
    tip: "Kun やっ / よう. On はち.",
    words: [
      { word: "八つ", kana: "やっつ", romaji: "yattsu", meaning_vi: "tám cái", reading: "kun", usage: "八 đọc やっ" },
      { word: "八百", kana: "はっぴゃく", romaji: "happyaku", meaning_vi: "tám trăm", reading: "on", usage: "八 đọc はっ" },
    ],
    sentences: [
      { jp: "八時の電車に乗ります。", kana: "はちじのでんしゃにのります。", romaji: "Hachiji no densha ni norimasu.", vi: "Tôi lên tàu tám giờ." },
      { jp: "八月はとても暑いです。", kana: "はちがつはとてもあついです。", romaji: "Hachigatsu wa totemo atsui desu.", vi: "Tháng Tám rất nóng." },
    ],
  },
  "九": {
    tip: "Kun ここの. On きゅう / く (九月 = くがつ).",
    words: [
      { word: "九つ", kana: "ここのつ", romaji: "kokonotsu", meaning_vi: "chín cái", reading: "kun", usage: "九 đọc ここの" },
      { word: "九州", kana: "きゅうしゅう", romaji: "kyuushuu", meaning_vi: "Kyushu", reading: "on", usage: "九 đọc きゅう" },
    ],
    sentences: [
      { jp: "九日に旅行します。", kana: "ここのかにりょこうします。", romaji: "Kokonoka ni ryokou shimasu.", vi: "Ngày mồng chín tôi đi du lịch." },
      { jp: "九月は秋です。", kana: "くがつはあきです。", romaji: "Kugatsu wa aki desu.", vi: "Tháng Chín là mùa thu." },
    ],
  },
  "十": {
    tip: "Kun とお. On じゅう.",
    words: [
      { word: "十日", kana: "とおか", romaji: "tooka", meaning_vi: "mồng mười", reading: "kun", usage: "十 đọc とお" },
      { word: "十字", kana: "じゅうじ", romaji: "juuji", meaning_vi: "chữ thập", reading: "on", usage: "十 đọc じゅう" },
    ],
    sentences: [
      { jp: "十時に寝ます。", kana: "じゅうじにねます。", romaji: "Juuji ni nemasu.", vi: "Tôi ngủ lúc mười giờ." },
      { jp: "十月は涼しいです。", kana: "じゅうがつはすずしいです。", romaji: "Juugatsu wa suzushii desu.", vi: "Tháng Mười mát." },
    ],
  },
  "百": {
    tip: "On ひゃく. Không dùng kun ở N5.",
    words: [
      { word: "百円", kana: "ひゃくえん", romaji: "hyakuen", meaning_vi: "100 yên", reading: "on", usage: "百 đọc ひゃく" },
      { word: "三百", kana: "さんびゃく", romaji: "sanbyaku", meaning_vi: "ba trăm", reading: "on", usage: "rendaku びゃく" },
    ],
    sentences: [
      { jp: "これは百円です。", kana: "これはひゃくえんです。", romaji: "Kore wa hyakuen desu.", vi: "Cái này 100 yên." },
      { jp: "百人ぐらい来ました。", kana: "ひゃくにんぐらいきました。", romaji: "Hyakunin gurai kimashita.", vi: "Khoảng một trăm người đến." },
    ],
  },
  "千": {
    tip: "On せん. 三千 = さんぜん.",
    words: [
      { word: "千円", kana: "せんえん", romaji: "sen'en", meaning_vi: "1000 yên", reading: "on", usage: "千 đọc せん" },
      { word: "三千", kana: "さんぜん", romaji: "sanzen", meaning_vi: "ba nghìn", reading: "on", usage: "千 đọc ぜん" },
    ],
    sentences: [
      { jp: "本は千円です。", kana: "ほんはせんえんです。", romaji: "Hon wa sen'en desu.", vi: "Quyển sách 1000 yên." },
      { jp: "千人の人がいます。", kana: "せんにんのひとがいます。", romaji: "Sennin no hito ga imasu.", vi: "Có một nghìn người." },
    ],
  },
  "万": {
    tip: "On まん. 1万 = 10.000.",
    words: [
      { word: "一万円", kana: "いちまんえん", romaji: "ichiman'en", meaning_vi: "10.000 yên", reading: "on", usage: "万 đọc まん" },
      { word: "十万", kana: "じゅうまん", romaji: "juuman", meaning_vi: "100.000", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "家賃は十万円です。", kana: "やちんはじゅうまんえんです。", romaji: "Yachin wa juuman'en desu.", vi: "Tiền nhà 100.000 yên." },
      { jp: "万が一つ遅れたら電話します。", kana: "まんひとつおくれたらでんわします。", romaji: "Man ga hitotsu okuretara denwa shimasu.", vi: "Nếu chẳng may trễ tôi sẽ gọi." },
    ],
  },
  "円": {
    tip: "On えん = yên. Cũng nghĩa hình tròn.",
    words: [
      { word: "円い", kana: "まるい", romaji: "marui", meaning_vi: "tròn", reading: "kun", usage: "thường viết 丸い" },
      { word: "円高", kana: "えんだか", romaji: "endaka", meaning_vi: "yên tăng giá", reading: "on", usage: "円 đọc えん" },
    ],
    sentences: [
      { jp: "これは五百円です。", kana: "これはごひゃくえんです。", romaji: "Kore wa gohyakuen desu.", vi: "Cái này 500 yên." },
      { jp: "円で払います。", kana: "えんではらいます。", romaji: "En de haraimasu.", vi: "Tôi trả bằng yên." },
    ],
  },
  "年": {
    tip: "On ねん. Kun とし.",
    words: [
      { word: "今年", kana: "ことし", romaji: "kotoshi", meaning_vi: "năm nay", reading: "kun", usage: "đọc đặc biệt ことし" },
      { word: "来年", kana: "らいねん", romaji: "rainen", meaning_vi: "năm sau", reading: "on", usage: "年 đọc ねん" },
    ],
    sentences: [
      { jp: "今年は忙しいです。", kana: "ことしはいそがしいです。", romaji: "Kotoshi wa isogashii desu.", vi: "Năm nay tôi bận." },
      { jp: "来年日本へ行きます。", kana: "らいねんにほんへいきます。", romaji: "Rainen nihon e ikimasu.", vi: "Năm sau tôi đi Nhật." },
    ],
  },
  "時": {
    tip: "On じ khi nói giờ. Kun とき = lúc.",
    words: [
      { word: "時間", kana: "じかん", romaji: "jikan", meaning_vi: "thời gian", reading: "on", usage: "時 đọc じ" },
      { word: "時々", kana: "ときどき", romaji: "tokidoki", meaning_vi: "thỉnh thoảng", reading: "kun", usage: "時 đọc とき" },
    ],
    sentences: [
      { jp: "今、何時ですか。", kana: "いま、なんじですか。", romaji: "Ima, nanji desu ka.", vi: "Bây giờ là mấy giờ?" },
      { jp: "子供の時、よく遊びました。", kana: "こどものとき、よくあそびました。", romaji: "Kodomo no toki, yoku asobimashita.", vi: "Lúc nhỏ tôi hay chơi." },
    ],
  },
  "分": {
    tip: "On ふん/ぷん = phút. Kun わ・ける = chia.",
    words: [
      { word: "五分", kana: "ごふん", romaji: "gofun", meaning_vi: "năm phút", reading: "on", usage: "分 đọc ふん" },
      { word: "自分", kana: "じぶん", romaji: "jibun", meaning_vi: "bản thân", reading: "on", usage: "分 đọc ぶん" },
    ],
    sentences: [
      { jp: "三分待ってください。", kana: "さんぷんまってください。", romaji: "Sanpun matte kudasai.", vi: "Hãy đợi ba phút." },
      { jp: "わかりません。自分で考えます。", kana: "わかりません。じぶんでかんがえます。", romaji: "Wakarimasen. Jibun de kangaemasu.", vi: "Tôi chưa hiểu. Tôi sẽ tự nghĩ." },
    ],
  },
  "半": {
    tip: "On はん = nửa. 一時半 = 1:30.",
    words: [
      { word: "半年", kana: "はんとし", romaji: "hantoshi", meaning_vi: "nửa năm", reading: "on", usage: "半 đọc はん" },
      { word: "半分", kana: "はんぶん", romaji: "hanbun", meaning_vi: "một nửa", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "今、二時半です。", kana: "いま、にじはんです。", romaji: "Ima, niji han desu.", vi: "Bây giờ là 2 rưỡi." },
      { jp: "ケーキを半分食べました。", kana: "ケーキをはんぶんたべました。", romaji: "Keeki o hanbun tabemashita.", vi: "Tôi ăn một nửa bánh." },
    ],
  },
  "今": {
    tip: "Kun いま. On こん trong 今日, 今週, 今年 (đọc đặc biệt).",
    words: [
      { word: "今週", kana: "こんしゅう", romaji: "konshuu", meaning_vi: "tuần này", reading: "on", usage: "今 đọc こん" },
      { word: "今夜", kana: "こんや", romaji: "konya", meaning_vi: "tối nay", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "今、何をしていますか。", kana: "いま、なにをしていますか。", romaji: "Ima, nani o shite imasu ka.", vi: "Bây giờ bạn đang làm gì?" },
      { jp: "今日は暑いです。", kana: "きょうはあついです。", romaji: "Kyou wa atsui desu.", vi: "Hôm nay nóng." },
    ],
  },
  "先": {
    tip: "On せん. 先生, 先週, 先に.",
    words: [
      { word: "先週", kana: "せんしゅう", romaji: "senshuu", meaning_vi: "tuần trước", reading: "on", usage: "先 đọc せん" },
      { word: "先に", kana: "さきに", romaji: "saki ni", meaning_vi: "trước", reading: "kun", usage: "先 đọc さき" },
    ],
    sentences: [
      { jp: "先生に質問します。", kana: "せんせいにしつもんします。", romaji: "Sensei ni shitsumon shimasu.", vi: "Tôi hỏi thầy cô." },
      { jp: "先に行ってください。", kana: "さきにいってください。", romaji: "Saki ni itte kudasai.", vi: "Hãy đi trước." },
    ],
  },
  "生": {
    tip: "On せい / しょう. Kun い・きる, う・まれる.",
    words: [
      { word: "学生", kana: "がくせい", romaji: "gakusei", meaning_vi: "học sinh", reading: "on", usage: "生 đọc せい" },
      { word: "生きる", kana: "いきる", romaji: "ikiru", meaning_vi: "sống", reading: "kun", usage: "生 đọc い" },
    ],
    sentences: [
      { jp: "大学生です。", kana: "だいがくせいです。", romaji: "Daigakusei desu.", vi: "Tôi là sinh viên." },
      { jp: "ここで生まれました。", kana: "ここでうまれました。", romaji: "Koko de umaremashita.", vi: "Tôi sinh ra ở đây." },
    ],
  },
  "学": {
    tip: "On がく. 学校, 学生, 大学.",
    words: [
      { word: "大学", kana: "だいがく", romaji: "daigaku", meaning_vi: "đại học", reading: "on", usage: "学 đọc がく" },
      { word: "科学", kana: "かがく", romaji: "kagaku", meaning_vi: "khoa học", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "日本語を学んでいます。", kana: "にほんごをまなんでいます。", romaji: "Nihongo o manande imasu.", vi: "Tôi đang học tiếng Nhật." },
      { jp: "学校は八時に始まります。", kana: "がっこうははちじにはじまります。", romaji: "Gakkou wa hachiji ni hajimarimasu.", vi: "Trường bắt đầu lúc 8 giờ." },
    ],
  },
  "校": {
    tip: "On こう. Gần như luôn trong 学校, 校長.",
    words: [
      { word: "校長", kana: "こうちょう", romaji: "kouchou", meaning_vi: "hiệu trưởng", reading: "on", usage: "校 đọc こう" },
      { word: "高校", kana: "こうこう", romaji: "koukou", meaning_vi: "cấp 3", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "学校まで歩きます。", kana: "がっこうまであるきます。", romaji: "Gakkou made arukimasu.", vi: "Tôi đi bộ đến trường." },
      { jp: "高校で英語を勉強しました。", kana: "こうこうでえいごをべんきょうしました。", romaji: "Koukou de eigo o benkyou shimashita.", vi: "Tôi học tiếng Anh ở cấp 3." },
    ],
  },
  本: {
    tip: "Kun ほん = sách. On ほん trong 日本 (Nhật Bản), 本当.",
    words: [
      { word: "日本語", kana: "にほんご", romaji: "nihongo", meaning_vi: "tiếng Nhật", reading: "on", usage: "本 đọc ほん" },
      { word: "本屋", kana: "ほんや", romaji: "honya", meaning_vi: "hiệu sách", reading: "kun", usage: "本 đọc ほん" },
    ],
    sentences: [
      { jp: "本を読みます。", kana: "ほんをよみます。", romaji: "Hon o yomimasu.", vi: "Tôi đọc sách." },
      { jp: "日本の本です。", kana: "にほんのほんです。", romaji: "Nihon no hon desu.", vi: "Đây là sách của Nhật." },
    ],
  },
  "入": {
    tip: "Kun はい・る / い・れる. On にゅう.",
    words: [
      { word: "入学", kana: "にゅうがく", romaji: "nyuugaku", meaning_vi: "nhập học", reading: "on", usage: "入 đọc にゅう" },
      { word: "入り口", kana: "いりぐち", romaji: "iriguchi", meaning_vi: "lối vào", reading: "kun", usage: "入 đọc いり" },
    ],
    sentences: [
      { jp: "部屋に入ってください。", kana: "へやにはいってください。", romaji: "Heya ni haitte kudasai.", vi: "Hãy vào phòng." },
      { jp: "名前を入れてください。", kana: "なまえをいれてください。", romaji: "Namae o irete kudasai.", vi: "Hãy điền tên." },
    ],
  },
  "出": {
    tip: "Kun で・る / だ・す. On しゅつ.",
    words: [
      { word: "出口", kana: "でぐち", romaji: "deguchi", meaning_vi: "lối ra", reading: "kun", usage: "出 đọc で" },
      { word: "出発", kana: "しゅっぱつ", romaji: "shuppatsu", meaning_vi: "xuất phát", reading: "on", usage: "出 đọc しゅっ" },
    ],
    sentences: [
      { jp: "家を出ます。", kana: "いえをでます。", romaji: "Ie o demasu.", vi: "Tôi ra khỏi nhà." },
      { jp: "宿題を出してください。", kana: "しゅくだいをだしてください。", romaji: "Shukudai o dashite kudasai.", vi: "Hãy nộp bài tập." },
    ],
  },
  "上": {
    tip: "Kun うえ / あ・がる / のぼ・る. On じょう.",
    words: [
      { word: "上手", kana: "じょうず", romaji: "jouzu", meaning_vi: "giỏi", reading: "on", usage: "đọc đặc biệt" },
      { word: "上着", kana: "うわぎ", romaji: "uwagi", meaning_vi: "áo khoác", reading: "kun", usage: "上 đọc うわ" },
    ],
    sentences: [
      { jp: "机の上に本があります。", kana: "つくえのうえにほんがあります。", romaji: "Tsukue no ue ni hon ga arimasu.", vi: "Trên bàn có sách." },
      { jp: "階段を上がってください。", kana: "かいだんをあがってください。", romaji: "Kaidan o agatte kudasai.", vi: "Hãy lên cầu thang." },
    ],
  },
  "下": {
    tip: "Kun した / さ・がる / くだ・る. On か / げ.",
    words: [
      { word: "下手", kana: "へた", romaji: "heta", meaning_vi: "vụng", reading: "on", usage: "đọc đặc biệt" },
      { word: "地下鉄", kana: "ちかてつ", romaji: "chikatetsu", meaning_vi: "tàu điện ngầm", reading: "on", usage: "下 đọc か" },
    ],
    sentences: [
      { jp: "椅子の下に猫がいます。", kana: "いすのしたにねこがいます。", romaji: "Isu no shita ni neko ga imasu.", vi: "Dưới ghế có con mèo." },
      { jp: "値段が下がります。", kana: "ねだんがさがります。", romaji: "Nedan ga sagarimasu.", vi: "Giá giảm." },
    ],
  },
  "中": {
    tip: "Kun なか. On ちゅう.",
    words: [
      { word: "中国", kana: "ちゅうごく", romaji: "chuugoku", meaning_vi: "Trung Quốc", reading: "on", usage: "中 đọc ちゅう" },
      { word: "中学生", kana: "ちゅうがくせい", romaji: "chuugakusei", meaning_vi: "học sinh cấp 2", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "箱の中に何がありますか。", kana: "はこのなかになにがありますか。", romaji: "Hako no naka ni nani ga arimasu ka.", vi: "Trong hộp có gì?" },
      { jp: "今、勉強中です。", kana: "いま、べんきょうちゅうです。", romaji: "Ima, benkyou chuu desu.", vi: "Bây giờ tôi đang học." },
    ],
  },
  "外": {
    tip: "Kun そと / はず・れる. On がい.",
    words: [
      { word: "外国", kana: "がいこく", romaji: "gaikoku", meaning_vi: "nước ngoài", reading: "on", usage: "外 đọc がい" },
      { word: "外見", kana: "がいけん", romaji: "gaiken", meaning_vi: "bề ngoài", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "外で遊びます。", kana: "そとであそびます。", romaji: "Soto de asobimasu.", vi: "Tôi chơi ngoài trời." },
      { jp: "外国語を勉強しています。", kana: "がいこくごをべんきょうしています。", romaji: "Gaikokugo o benkyou shite imasu.", vi: "Tôi đang học ngoại ngữ." },
    ],
  },
  "前": {
    tip: "Kun まえ. On ぜん.",
    words: [
      { word: "名前", kana: "なまえ", romaji: "namae", meaning_vi: "tên", reading: "kun", usage: "前 đọc まえ" },
      { word: "午前", kana: "ごぜん", romaji: "gozen", meaning_vi: "buổi sáng", reading: "on", usage: "前 đọc ぜん" },
    ],
    sentences: [
      { jp: "駅の前で待ってください。", kana: "えきのまえでまってください。", romaji: "Eki no mae de matte kudasai.", vi: "Hãy đợi trước ga." },
      { jp: "ご飯の前に手を洗います。", kana: "ごはんのまえにてをあらいます。", romaji: "Gohan no mae ni te o araimasu.", vi: "Trước cơm tôi rửa tay." },
    ],
  },
  "後": {
    tip: "Kun あと / うし・ろ. On ご.",
    words: [
      { word: "午後", kana: "ごご", romaji: "gogo", meaning_vi: "buổi chiều", reading: "on", usage: "後 đọc ご" },
      { word: "最後", kana: "さいご", romaji: "saigo", meaning_vi: "cuối cùng", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "授業の後で話しましょう。", kana: "じゅぎょうのあとではなしましょう。", romaji: "Jugyou no ato de hanashimashou.", vi: "Sau giờ học mình nói chuyện nhé." },
      { jp: "後ろを見てください。", kana: "うしろをみてください。", romaji: "Ushiro o mite kudasai.", vi: "Hãy nhìn phía sau." },
    ],
  },
  "右": {
    tip: "Kun みぎ. On う / ゆう.",
    words: [
      { word: "右手", kana: "みぎて", romaji: "migite", meaning_vi: "tay phải", reading: "kun", usage: "右 đọc みぎ" },
      { word: "左右", kana: "さゆう", romaji: "sayuu", meaning_vi: "trái phải", reading: "on", usage: "右 đọc ゆう" },
    ],
    sentences: [
      { jp: "右に曲がってください。", kana: "みぎにまがってください。", romaji: "Migi ni magatte kudasai.", vi: "Hãy rẽ phải." },
      { jp: "右側を歩きます。", kana: "みぎがわをあるきます。", romaji: "Migigawa o arukimasu.", vi: "Tôi đi phía bên phải." },
    ],
  },
  "左": {
    tip: "Kun ひだり. On さ.",
    words: [
      { word: "左手", kana: "ひだりて", romaji: "hidarite", meaning_vi: "tay trái", reading: "kun", usage: "左 đọc ひだり" },
      { word: "左右", kana: "さゆう", romaji: "sayuu", meaning_vi: "trái phải", reading: "on", usage: "左 đọc さ" },
    ],
    sentences: [
      { jp: "左に銀行があります。", kana: "ひだりにぎんこうがあります。", romaji: "Hidari ni ginkou ga arimasu.", vi: "Bên trái có ngân hàng." },
      { jp: "左側に座ってください。", kana: "ひだりがわにすわってください。", romaji: "Hidarigawa ni suwatte kudasai.", vi: "Hãy ngồi bên trái." },
    ],
  },
  "東": {
    tip: "Kun ひがし. On とう (東京, 東).",
    words: [
      { word: "東京", kana: "とうきょう", romaji: "toukyou", meaning_vi: "Tokyo", reading: "on", usage: "東 đọc とう" },
      { word: "東西", kana: "とうざい", romaji: "touzai", meaning_vi: "đông tây", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "東に太陽がのぼります。", kana: "ひがしにたいようがのぼります。", romaji: "Higashi ni taiyou ga noborimasu.", vi: "Mặt trời mọc ở phía đông." },
      { jp: "東京へ行きたいです。", kana: "とうきょうへいきたいです。", romaji: "Toukyou e ikitai desu.", vi: "Tôi muốn đi Tokyo." },
    ],
  },
  "西": {
    tip: "Kun にし. On せい / さい.",
    words: [
      { word: "西口", kana: "にしぐち", romaji: "nishiguchi", meaning_vi: "cửa tây", reading: "kun", usage: "西 đọc にし" },
      { word: "関西", kana: "かんさい", romaji: "kansai", meaning_vi: "Vùng Kansai", reading: "on", usage: "西 đọc さい" },
    ],
    sentences: [
      { jp: "西の空が赤いです。", kana: "にしのそらがあかいです。", romaji: "Nishi no sora ga akai desu.", vi: "Bầu trời phía tây đỏ." },
      { jp: "駅の西口で会いましょう。", kana: "えきのにしぐちであいましょう。", romaji: "Eki no nishiguchi de aimashou.", vi: "Gặp ở cửa tây nhà ga nhé." },
    ],
  },
  "南": {
    tip: "Kun みなみ. On なん.",
    words: [
      { word: "南口", kana: "みなみぐち", romaji: "minamiguchi", meaning_vi: "cửa nam", reading: "kun", usage: "南 đọc みなみ" },
      { word: "南極", kana: "なんきょく", romaji: "nankyoku", meaning_vi: "Nam Cực", reading: "on", usage: "南 đọc なん" },
    ],
    sentences: [
      { jp: "南は暖かいです。", kana: "みなみはあたたかいです。", romaji: "Minami wa atatakai desu.", vi: "Phía nam thì ấm." },
      { jp: "地図の南を見てください。", kana: "ちずのみなみをみてください。", romaji: "Chizu no minami o mite kudasai.", vi: "Hãy nhìn phía nam trên bản đồ." },
    ],
  },
  "北": {
    tip: "Kun きた. On ほく.",
    words: [
      { word: "北口", kana: "きたぐち", romaji: "kitaguchi", meaning_vi: "cửa bắc", reading: "kun", usage: "北 đọc きた" },
      { word: "北海道", kana: "ほっかいどう", romaji: "hokkaidou", meaning_vi: "Hokkaido", reading: "on", usage: "北 đọc ほっ" },
    ],
    sentences: [
      { jp: "北は寒いです。", kana: "きたはさむいです。", romaji: "Kita wa samui desu.", vi: "Phía bắc lạnh." },
      { jp: "北海道へ行きたいです。", kana: "ほっかいどうへいきたいです。", romaji: "Hokkaidou e ikitai desu.", vi: "Tôi muốn đi Hokkaido." },
    ],
  },
  "車": {
    tip: "Kun くるま. On しゃ (電車, 自転車).",
    words: [
      { word: "電車", kana: "でんしゃ", romaji: "densha", meaning_vi: "tàu điện", reading: "on", usage: "車 đọc しゃ" },
      { word: "自転車", kana: "じてんしゃ", romaji: "jitensha", meaning_vi: "xe đạp", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "車で行きます。", kana: "くるまでいきます。", romaji: "Kuruma de ikimasu.", vi: "Tôi đi bằng ô tô." },
      { jp: "駐車場は向こうです。", kana: "ちゅうしゃじょうはむこうです。", romaji: "Chuushajou wa mukou desu.", vi: "Bãi đỗ xe ở phía kia." },
    ],
  },
  "電": {
    tip: "On でん. Điện: 電気, 電話, 電車.",
    words: [
      { word: "電気", kana: "でんき", romaji: "denki", meaning_vi: "điện / đèn", reading: "on", usage: "電 đọc でん" },
      { word: "電子", kana: "でんし", romaji: "denshi", meaning_vi: "điện tử", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "電気をつけてください。", kana: "でんきをつけてください。", romaji: "Denki o tsukete kudasai.", vi: "Hãy bật đèn." },
      { jp: "電話番号を教えてください。", kana: "でんわばんごうをおしえてください。", romaji: "Denwa bangou o oshiete kudasai.", vi: "Hãy cho tôi số điện thoại." },
    ],
  },
  "話": {
    tip: "Kun はな・す / はなし. On わ.",
    words: [
      { word: "会話", kana: "かいわ", romaji: "kaiwa", meaning_vi: "hội thoại", reading: "on", usage: "話 đọc わ" },
      { word: "話題", kana: "わだい", romaji: "wadai", meaning_vi: "chủ đề", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "友達と話します。", kana: "ともだちとはなします。", romaji: "Tomodachi to hanashimasu.", vi: "Tôi nói chuyện với bạn." },
      { jp: "面白い話を聞きました。", kana: "おもしろいはなしをききました。", romaji: "Omoshiroi hanashi o kikimashita.", vi: "Tôi nghe một câu chuyện thú vị." },
    ],
  },
  "語": {
    tip: "On ご = ngôn ngữ. 日本語, 英語.",
    words: [
      { word: "英語", kana: "えいご", romaji: "eigo", meaning_vi: "tiếng Anh", reading: "on", usage: "語 đọc ご" },
      { word: "物語", kana: "ものがたり", romaji: "monogatari", meaning_vi: "câu chuyện", reading: "kun", usage: "語 đọc がたり" },
    ],
    sentences: [
      { jp: "日本語を話します。", kana: "にほんごをはなします。", romaji: "Nihongo o hanashimasu.", vi: "Tôi nói tiếng Nhật." },
      { jp: "外国語は難しいです。", kana: "がいこくごはむずかしいです。", romaji: "Gaikokugo wa muzukashii desu.", vi: "Ngoại ngữ thì khó." },
    ],
  },
  "読": {
    tip: "Kun よ・む. On どく.",
    words: [
      { word: "読書", kana: "どくしょ", romaji: "dokusho", meaning_vi: "đọc sách", reading: "on", usage: "読 đọc どく" },
      { word: "読み方", kana: "よみかた", romaji: "yomikata", meaning_vi: "cách đọc", reading: "kun", usage: "読 đọc よ" },
    ],
    sentences: [
      { jp: "本を読んでいます。", kana: "ほんをよんでいます。", romaji: "Hon o yonde imasu.", vi: "Tôi đang đọc sách." },
      { jp: "この漢字の読み方を教えてください。", kana: "このかんじのよみかたをおしえてください。", romaji: "Kono kanji no yomikata o oshiete kudasai.", vi: "Hãy dạy cách đọc kanji này." },
    ],
  },
  "書": {
    tip: "Kun か・く. On しょ.",
    words: [
      { word: "辞書", kana: "じしょ", romaji: "jisho", meaning_vi: "từ điển", reading: "on", usage: "書 đọc しょ" },
      { word: "教科書", kana: "きょうかしょ", romaji: "kyoukasho", meaning_vi: "sách giáo khoa", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "手紙を書きます。", kana: "てがみをかきます。", romaji: "Tegami o kakimasu.", vi: "Tôi viết thư." },
      { jp: "名前を書いてください。", kana: "なまえをかいてください。", romaji: "Namae o kaite kudasai.", vi: "Hãy viết tên." },
    ],
  },
  "見": {
    tip: "Kun み・る. On けん.",
    words: [
      { word: "見物", kana: "けんぶつ", romaji: "kenbutsu", meaning_vi: "tham quan", reading: "on", usage: "見 đọc けん" },
      { word: "意見", kana: "いけん", romaji: "iken", meaning_vi: "ý kiến", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "映画を見ます。", kana: "えいがをみます。", romaji: "Eiga o mimasu.", vi: "Tôi xem phim." },
      { jp: "見てください。きれいです。", kana: "みてください。きれいです。", romaji: "Mite kudasai. Kirei desu.", vi: "Hãy nhìn. Đẹp quá." },
    ],
  },
  "聞": {
    tip: "Kun き・く. On ぶん / もん.",
    words: [
      { word: "新聞", kana: "しんぶん", romaji: "shinbun", meaning_vi: "báo", reading: "on", usage: "聞 đọc ぶん" },
      { word: "聴聞", kana: "ちょうもん", romaji: "choumon", meaning_vi: "lắng nghe (hành chính)", reading: "on", usage: "ít dùng N5" },
    ],
    sentences: [
      { jp: "音楽を聞きます。", kana: "おんがくをききます。", romaji: "Ongaku o kikimasu.", vi: "Tôi nghe nhạc." },
      { jp: "先生の話をよく聞いてください。", kana: "せんせいのはなしをよくきいてください。", romaji: "Sensei no hanashi o yoku kiite kudasai.", vi: "Hãy nghe kỹ lời thầy cô." },
    ],
  },
  "食": {
    tip: "Kun た・べる. On しょく.",
    words: [
      { word: "食事", kana: "しょくじ", romaji: "shokuji", meaning_vi: "bữa ăn", reading: "on", usage: "食 đọc しょく" },
      { word: "食堂", kana: "しょくどう", romaji: "shokudou", meaning_vi: "nhà ăn", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "朝ごはんを食べます。", kana: "あさごはんをたべます。", romaji: "Asagohan o tabemasu.", vi: "Tôi ăn sáng." },
      { jp: "一緒に食事しませんか。", kana: "いっしょにしょくじしませんか。", romaji: "Issho ni shokuji shimasen ka.", vi: "Cùng ăn cơm chứ?" },
    ],
  },
  "飲": {
    tip: "Kun の・む. On いん.",
    words: [
      { word: "飲み物", kana: "のみもの", romaji: "nomimono", meaning_vi: "đồ uống", reading: "kun", usage: "飲 đọc の" },
      { word: "飲食", kana: "いんしょく", romaji: "inshoku", meaning_vi: "ăn uống", reading: "on", usage: "飲 đọc いん" },
    ],
    sentences: [
      { jp: "水を飲みます。", kana: "みずをのみます。", romaji: "Mizu o nomimasu.", vi: "Tôi uống nước." },
      { jp: "ここで飲まないでください。", kana: "ここでのまないでください。", romaji: "Koko de nomanaide kudasai.", vi: "Đừng uống ở đây." },
    ],
  },
  "買": {
    tip: "Kun か・う. On ばい.",
    words: [
      { word: "買い物", kana: "かいもの", romaji: "kaimono", meaning_vi: "mua sắm", reading: "kun", usage: "買 đọc かい" },
      { word: "売買", kana: "ばいばい", romaji: "baibai", meaning_vi: "mua bán", reading: "on", usage: "買 đọc ばい" },
    ],
    sentences: [
      { jp: "パンを買います。", kana: "パンをかいます。", romaji: "Pan o kaimasu.", vi: "Tôi mua bánh mì." },
      { jp: "スーパーで買い物します。", kana: "スーパーでかいものします。", romaji: "Suupaa de kaimono shimasu.", vi: "Tôi mua sắm ở siêu thị." },
    ],
  },
  "行": {
    tip: "Kun い・く / おこな・う. On こう / ぎょう.",
    words: [
      { word: "銀行", kana: "ぎんこう", romaji: "ginkou", meaning_vi: "ngân hàng", reading: "on", usage: "行 đọc こう" },
      { word: "旅行", kana: "りょこう", romaji: "ryokou", meaning_vi: "du lịch", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "学校へ行きます。", kana: "がっこうへいきます。", romaji: "Gakkou e ikimasu.", vi: "Tôi đến trường." },
      { jp: "京都へ旅行したいです。", kana: "きょうとへりょこうしたいです。", romaji: "Kyouto e ryokou shitai desu.", vi: "Tôi muốn du lịch Kyoto." },
    ],
  },
  "来": {
    tip: "Kun く・る. On らい.",
    words: [
      { word: "来週", kana: "らいしゅう", romaji: "raishuu", meaning_vi: "tuần sau", reading: "on", usage: "来 đọc らい" },
      { word: "未来", kana: "みらい", romaji: "mirai", meaning_vi: "tương lai", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "明日来てください。", kana: "あしたきてください。", romaji: "Ashita kite kudasai.", vi: "Ngày mai hãy đến." },
      { jp: "来年また会いましょう。", kana: "らいねんまたあいましょう。", romaji: "Rainen mata aimashou.", vi: "Năm sau gặp lại nhé." },
    ],
  },
  "帰": {
    tip: "Kun かえ・る. On き.",
    words: [
      { word: "帰宅", kana: "きたく", romaji: "kitaku", meaning_vi: "về nhà", reading: "on", usage: "帰 đọc き" },
      { word: "帰り道", kana: "かえりみち", romaji: "kaerimichi", meaning_vi: "đường về", reading: "kun", usage: "帰 đọc かえり" },
    ],
    sentences: [
      { jp: "六時に帰ります。", kana: "ろくじにかえります。", romaji: "Rokuji ni kaerimasu.", vi: "Tôi về lúc sáu giờ." },
      { jp: "そろそろ帰らないと。", kana: "そろそろかえらないと。", romaji: "Sorosoro kaeranai to.", vi: "Sắp phải về rồi." },
    ],
  },
  "休": {
    tip: "Kun やす・む. On きゅう.",
    words: [
      { word: "休日", kana: "きゅうじつ", romaji: "kyuujitsu", meaning_vi: "ngày nghỉ", reading: "on", usage: "休 đọc きゅう" },
      { word: "休み", kana: "やすみ", romaji: "yasumi", meaning_vi: "nghỉ", reading: "kun", usage: "休 đọc やす" },
    ],
    sentences: [
      { jp: "日曜日は休みます。", kana: "にちようびはやすみます。", romaji: "Nichiyoubi wa yasumimasu.", vi: "Chủ nhật tôi nghỉ." },
      { jp: "少し休んでください。", kana: "すこしやすんでください。", romaji: "Sukoshi yasunde kudasai.", vi: "Hãy nghỉ một chút." },
    ],
  },
  "友": {
    tip: "Kun とも. On ゆう.",
    words: [
      { word: "友人", kana: "ゆうじん", romaji: "yuujin", meaning_vi: "bạn (trang trọng)", reading: "on", usage: "友 đọc ゆう" },
      { word: "友情", kana: "ゆうじょう", romaji: "yuujou", meaning_vi: "tình bạn", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "友達と遊びます。", kana: "ともだちとあそびます。", romaji: "Tomodachi to asobimasu.", vi: "Tôi chơi với bạn." },
      { jp: "いい友達ができました。", kana: "いいともだちができました。", romaji: "Ii tomodachi ga dekimashita.", vi: "Tôi kết được người bạn tốt." },
    ],
  },
  "母": {
    tip: "Kun はは (mẹ mình) / おかあさん. On ぼ.",
    words: [
      { word: "母親", kana: "ははおや", romaji: "hahaoya", meaning_vi: "mẹ", reading: "kun", usage: "母 đọc はは" },
      { word: "母国", kana: "ぼこく", romaji: "bokoku", meaning_vi: "tổ quốc", reading: "on", usage: "母 đọc ぼ" },
    ],
    sentences: [
      { jp: "母は料理が上手です。", kana: "はははりょうりがじょうずです。", romaji: "Haha wa ryouri ga jouzu desu.", vi: "Mẹ tôi nấu ăn giỏi." },
      { jp: "お母さんはいますか。", kana: "おかあさんはいますか。", romaji: "Okaasan wa imasu ka.", vi: "Mẹ bạn có nhà không?" },
    ],
  },
  "父": {
    tip: "Kun ちち (bố mình) / おとうさん. On ふ.",
    words: [
      { word: "父親", kana: "ちちおや", romaji: "chichioya", meaning_vi: "bố", reading: "kun", usage: "父 đọc ちち" },
      { word: "祖父", kana: "そふ", romaji: "sofu", meaning_vi: "ông nội/ngoại", reading: "on", usage: "父 đọc ふ" },
    ],
    sentences: [
      { jp: "父は会社員です。", kana: "ちちはかいしゃいんです。", romaji: "Chichi wa kaishain desu.", vi: "Bố tôi là nhân viên công ty." },
      { jp: "お父さんに聞いてください。", kana: "おとうさんにきいてください。", romaji: "Otousan ni kiite kudasai.", vi: "Hãy hỏi bố." },
    ],
  },
  "女": {
    tip: "Kun おんな. On じょ.",
    words: [
      { word: "女性", kana: "じょせい", romaji: "josei", meaning_vi: "phụ nữ", reading: "on", usage: "女 đọc じょ" },
      { word: "彼女", kana: "かのじょ", romaji: "kanojo", meaning_vi: "cô ấy / bạn gái", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "女の子が三人います。", kana: "おんなのこがさんにんいます。", romaji: "Onna no ko ga sannin imasu.", vi: "Có ba bé gái." },
      { jp: "彼女は学生です。", kana: "かのじょはがくせいです。", romaji: "Kanojo wa gakusei desu.", vi: "Cô ấy là học sinh." },
    ],
  },
  "男": {
    tip: "Kun おとこ. On だん.",
    words: [
      { word: "男性", kana: "だんせい", romaji: "dansei", meaning_vi: "nam giới", reading: "on", usage: "男 đọc だん" },
      { word: "長男", kana: "ちょうなん", romaji: "chounan", meaning_vi: "con trai cả", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "男の子が走っています。", kana: "おとこのこがはしっています。", romaji: "Otoko no ko ga hashitte imasu.", vi: "Bé trai đang chạy." },
      { jp: "男性の方が多いです。", kana: "だんせいのほうがおおいです。", romaji: "Dansei no hou ga ooi desu.", vi: "Nam giới đông hơn." },
    ],
  },
  "子": {
    tip: "Kun こ. On し.",
    words: [
      { word: "子供", kana: "こども", romaji: "kodomo", meaning_vi: "trẻ em", reading: "kun", usage: "子 đọc こ" },
      { word: "椅子", kana: "いす", romaji: "isu", meaning_vi: "ghế", reading: "on", usage: "đọc đặc biệt" },
    ],
    sentences: [
      { jp: "子供が公園で遊んでいます。", kana: "こどもがこうえんであそんでいます。", romaji: "Kodomo ga kouen de asonde imasu.", vi: "Trẻ em đang chơi ở công viên." },
      { jp: "電子辞書を使います。", kana: "でんしじしょをつかいます。", romaji: "Denshi jisho o tsukaimasu.", vi: "Tôi dùng từ điển điện tử." },
    ],
  },
  "名": {
    tip: "Kun な. On めい / みょう.",
    words: [
      { word: "名前", kana: "なまえ", romaji: "namae", meaning_vi: "tên", reading: "kun", usage: "名 đọc な" },
      { word: "有名", kana: "ゆうめい", romaji: "yuumei", meaning_vi: "nổi tiếng", reading: "on", usage: "名 đọc めい" },
    ],
    sentences: [
      { jp: "お名前は何ですか。", kana: "おなまえはなんですか。", romaji: "Onamae wa nan desu ka.", vi: "Bạn tên gì?" },
      { jp: "この店は有名です。", kana: "このみせはゆうめいです。", romaji: "Kono mise wa yuumei desu.", vi: "Cửa hàng này nổi tiếng." },
    ],
  },
  "何": {
    tip: "Kun なに / なん. On か.",
    words: [
      { word: "何人", kana: "なんにん", romaji: "nannin", meaning_vi: "bao nhiêu người", reading: "kun", usage: "何 đọc なん" },
      { word: "何か", kana: "なにか", romaji: "nanika", meaning_vi: "cái gì đó", reading: "kun", usage: "何 đọc なに" },
    ],
    sentences: [
      { jp: "これは何ですか。", kana: "これはなんですか。", romaji: "Kore wa nan desu ka.", vi: "Đây là gì?" },
      { jp: "何を食べますか。", kana: "なにをたべますか。", romaji: "Nani o tabemasu ka.", vi: "Bạn ăn gì?" },
    ],
  },
  "大": {
    tip: "Kun おお・きい. On だい / たい.",
    words: [
      { word: "大学", kana: "だいがく", romaji: "daigaku", meaning_vi: "đại học", reading: "on", usage: "大 đọc だい" },
      { word: "大切", kana: "たいせつ", romaji: "taisetsu", meaning_vi: "quan trọng", reading: "on", usage: "大 đọc たい" },
    ],
    sentences: [
      { jp: "大きい犬がいます。", kana: "おおきいいぬがいます。", romaji: "Ookii inu ga imasu.", vi: "Có một con chó lớn." },
      { jp: "友達は大切です。", kana: "ともだちはたいせつです。", romaji: "Tomodachi wa taisetsu desu.", vi: "Bạn bè thì quan trọng." },
    ],
  },
  "小": {
    tip: "Kun ちい・さい / こ. On しょう.",
    words: [
      { word: "小学校", kana: "しょうがっこう", romaji: "shougakkou", meaning_vi: "tiểu học", reading: "on", usage: "小 đọc しょう" },
      { word: "小鳥", kana: "ことり", romaji: "kotori", meaning_vi: "chim nhỏ", reading: "kun", usage: "小 đọc こ" },
    ],
    sentences: [
      { jp: "小さい猫が好きです。", kana: "ちいさいねこがすきです。", romaji: "Chiisai neko ga suki desu.", vi: "Tôi thích mèo nhỏ." },
      { jp: "小学校で日本語を習いました。", kana: "しょうがっこうでにほんごをならいました。", romaji: "Shougakkou de nihongo o naraimashita.", vi: "Tôi học tiếng Nhật từ tiểu học." },
    ],
  },
  "高": {
    tip: "Kun たか・い. On こう.",
    words: [
      { word: "高校", kana: "こうこう", romaji: "koukou", meaning_vi: "cấp 3", reading: "on", usage: "高 đọc こう" },
      { word: "最高", kana: "さいこう", romaji: "saikou", meaning_vi: "tốt nhất", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "この靴は高いです。", kana: "このくつはたかいです。", romaji: "Kono kutsu wa takai desu.", vi: "Đôi giày này đắt." },
      { jp: "高い山に登りました。", kana: "たかいやまにのぼりました。", romaji: "Takai yama ni noborimashita.", vi: "Tôi đã leo núi cao." },
    ],
  },
  "安": {
    tip: "Kun やす・い. On あん.",
    words: [
      { word: "安心", kana: "あんしん", romaji: "anshin", meaning_vi: "yên tâm", reading: "on", usage: "安 đọc あん" },
      { word: "安全", kana: "あんぜん", romaji: "anzen", meaning_vi: "an toàn", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "この店は安いです。", kana: "このみせはやすいです。", romaji: "Kono mise wa yasui desu.", vi: "Cửa hàng này rẻ." },
      { jp: "安全に気をつけてください。", kana: "あんぜんにきをつけてください。", romaji: "Anzen ni ki o tsukete kudasai.", vi: "Hãy chú ý an toàn." },
    ],
  },
  "新": {
    tip: "Kun あたら・しい / あら. On しん.",
    words: [
      { word: "新聞", kana: "しんぶん", romaji: "shinbun", meaning_vi: "báo", reading: "on", usage: "新 đọc しん" },
      { word: "新年", kana: "しんねん", romaji: "shinnen", meaning_vi: "năm mới", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "新しい本を買いました。", kana: "あたらしいほんをかいました。", romaji: "Atarashii hon o kaimashita.", vi: "Tôi đã mua sách mới." },
      { jp: "新聞を読みます。", kana: "しんぶんをよみます。", romaji: "Shinbun o yomimasu.", vi: "Tôi đọc báo." },
    ],
  },
  "古": {
    tip: "Kun ふる・い. On こ.",
    words: [
      { word: "中古", kana: "ちゅうこ", romaji: "chuuko", meaning_vi: "đã qua sử dụng", reading: "on", usage: "古 đọc こ" },
      { word: "古本", kana: "ふるほん", romaji: "furuhon", meaning_vi: "sách cũ", reading: "kun", usage: "古 đọc ふる" },
    ],
    sentences: [
      { jp: "この家は古いです。", kana: "このいえはふるいです。", romaji: "Kono ie wa furui desu.", vi: "Ngôi nhà này cũ." },
      { jp: "古い写真を見ました。", kana: "ふるいしゃしんをみました。", romaji: "Furui shashin o mimashita.", vi: "Tôi xem ảnh cũ." },
    ],
  },
  "多": {
    tip: "Kun おお・い. On た.",
    words: [
      { word: "多少", kana: "たしょう", romaji: "tashou", meaning_vi: "hơi / một chút", reading: "on", usage: "多 đọc た" },
      { word: "多数", kana: "たすう", romaji: "tasuu", meaning_vi: "số nhiều", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "人が多いです。", kana: "ひとがおおいです。", romaji: "Hito ga ooi desu.", vi: "Người thì đông." },
      { jp: "質問が多数あります。", kana: "しつもんがたすうあります。", romaji: "Shitsumon ga tasuu arimasu.", vi: "Có rất nhiều câu hỏi." },
    ],
  },
  "少": {
    tip: "Kun すこ・し / すく・ない. On しょう.",
    words: [
      { word: "少年", kana: "しょうねん", romaji: "shounen", meaning_vi: "thiếu niên", reading: "on", usage: "少 đọc しょう" },
      { word: "少数", kana: "しょうすう", romaji: "shousuu", meaning_vi: "số ít", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "少し待ってください。", kana: "すこしまってください。", romaji: "Sukoshi matte kudasai.", vi: "Hãy đợi một chút." },
      { jp: "時間は少ししかありません。", kana: "じかんはすこししかありません。", romaji: "Jikan wa sukoshi shika arimasen.", vi: "Chỉ còn ít thời gian." },
    ],
  },
  "白": {
    tip: "Kun しろ / しろ・い. On はく.",
    words: [
      { word: "白紙", kana: "はくし", romaji: "hakushi", meaning_vi: "tờ giấy trắng", reading: "on", usage: "白 đọc はく" },
      { word: "空白", kana: "くうはく", romaji: "kuuhaku", meaning_vi: "khoảng trống", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "白い猫がいます。", kana: "しろいねこがいます。", romaji: "Shiroi neko ga imasu.", vi: "Có một con mèo trắng." },
      { jp: "紙は白いです。", kana: "かみはしろいです。", romaji: "Kami wa shiroi desu.", vi: "Giấy thì trắng." },
    ],
  },
  "長": {
    tip: "Kun なが・い. On ちょう.",
    words: [
      { word: "校長", kana: "こうちょう", romaji: "kouchou", meaning_vi: "hiệu trưởng", reading: "on", usage: "長 đọc ちょう" },
      { word: "社長", kana: "しゃちょう", romaji: "shachou", meaning_vi: "giám đốc", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "この川は長いです。", kana: "このかわはながいです。", romaji: "Kono kawa wa nagai desu.", vi: "Con sông này dài." },
      { jp: "長い時間待ちました。", kana: "ながいじかんまちました。", romaji: "Nagai jikan machimashita.", vi: "Tôi đợi rất lâu." },
    ],
  },
  "会": {
    tip: "Kun あ・う = gặp. On かい trong 会社, 会議.",
    words: [
      { word: "会話", kana: "かいわ", romaji: "kaiwa", meaning_vi: "hội thoại", reading: "on", usage: "会 đọc かい" },
      { word: "面会", kana: "めんかい", romaji: "menkai", meaning_vi: "gặp mặt", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "駅で友達に会います。", kana: "えきでともだちにあいます。", romaji: "Eki de tomodachi ni aimasu.", vi: "Tôi gặp bạn ở ga." },
      { jp: "会議は三時からです。", kana: "かいぎはさんじからです。", romaji: "Kaigi wa sanji kara desu.", vi: "Cuộc họp từ 3 giờ." },
    ],
  },
  "社": {
    tip: "On しゃ. 会社, 社会, 神社.",
    words: [
      { word: "社会", kana: "しゃかい", romaji: "shakai", meaning_vi: "xã hội", reading: "on", usage: "社 đọc しゃ" },
      { word: "神社", kana: "じんじゃ", romaji: "jinja", meaning_vi: "đền Shinto", reading: "on", usage: "社 đọc じゃ" },
    ],
    sentences: [
      { jp: "来年から会社で働きます。", kana: "らいねんからかいしゃではたらきます。", romaji: "Rainen kara kaisha de hatarakimasu.", vi: "Từ năm sau tôi làm ở công ty." },
      { jp: "社会の問題を考えます。", kana: "しゃかいのもんだいをかんがえます。", romaji: "Shakai no mondai o kangaemasu.", vi: "Tôi nghĩ về vấn đề xã hội." },
    ],
  },
  "発": {
    tip: "On はつ. 発音, 出発, 発見.",
    words: [
      { word: "発見", kana: "はっけん", romaji: "hakken", meaning_vi: "phát hiện", reading: "on", usage: "発 đọc はっ" },
      { word: "発表", kana: "はっぴょう", romaji: "happyou", meaning_vi: "thuyết trình", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "発音を練習します。", kana: "はつおんをれんしゅうします。", romaji: "Hatsuon o renshuu shimasu.", vi: "Tôi luyện phát âm." },
      { jp: "駅を八時に出発します。", kana: "えきをはちじにしゅっぱつします。", romaji: "Eki o hachiji ni shuppatsu shimasu.", vi: "Xuất phát ga lúc 8 giờ." },
    ],
  },
  "着": {
    tip: "Kun き・る = mặc; つ・く = đến. On ちゃく.",
    words: [
      { word: "到着", kana: "とうちゃく", romaji: "touchaku", meaning_vi: "đến nơi", reading: "on", usage: "着 đọc ちゃく" },
      { word: "下着", kana: "したぎ", romaji: "shitagi", meaning_vi: "đồ lót", reading: "kun", usage: "着 đọc ぎ" },
    ],
    sentences: [
      { jp: "白いシャツを着ます。", kana: "しろいシャツをきます。", romaji: "Shiroi shatsu o kimasu.", vi: "Tôi mặc áo sơ mi trắng." },
      { jp: "三時に駅に着きます。", kana: "さんじにえきにつきます。", romaji: "Sanji ni eki ni tsukimasu.", vi: "Tôi đến ga lúc 3 giờ." },
    ],
  },
  "開": {
    tip: "Kun ひら・く / あ・ける. On かい.",
    words: [
      { word: "開始", kana: "かいし", romaji: "kaishi", meaning_vi: "bắt đầu", reading: "on", usage: "開 đọc かい" },
      { word: "公開", kana: "こうかい", romaji: "koukai", meaning_vi: "công khai", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "窓を開けてください。", kana: "まどをあけてください。", romaji: "Mado o akete kudasai.", vi: "Hãy mở cửa sổ." },
      { jp: "店は九時に開きます。", kana: "みせはくじにひらきます。", romaji: "Mise wa kuji ni hirakimasu.", vi: "Cửa hàng mở lúc 9 giờ." },
    ],
  },
  "閉": {
    tip: "Kun し・める / と・じる. On へい.",
    words: [
      { word: "閉会", kana: "へいかい", romaji: "heikai", meaning_vi: "bế mạc", reading: "on", usage: "閉 đọc へい" },
      { word: "閉店", kana: "へいてん", romaji: "heiten", meaning_vi: "đóng cửa hàng", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "ドアを閉めてください。", kana: "ドアをしめてください。", romaji: "Doa o shimete kudasai.", vi: "Hãy đóng cửa." },
      { jp: "目を閉じてください。", kana: "めをとじてください。", romaji: "Me o tojite kudasai.", vi: "Hãy nhắm mắt." },
    ],
  },
  "問": {
    tip: "On もん. 問題, 質問. Kun と・う.",
    words: [
      { word: "質問", kana: "しつもん", romaji: "shitsumon", meaning_vi: "câu hỏi", reading: "on", usage: "問 đọc もん" },
      { word: "訪問", kana: "ほうもん", romaji: "houmon", meaning_vi: "thăm", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "この問題は難しいです。", kana: "このもんだいはむずかしいです。", romaji: "Kono mondai wa muzukashii desu.", vi: "Bài này khó." },
      { jp: "先生に質問してもいいですか。", kana: "せんせいしつもんしてもいいですか。", romaji: "Sensei ni shitsumon shite mo ii desu ka.", vi: "Tôi hỏi thầy được không?" },
    ],
  },
  "題": {
    tip: "On だい. 問題, 宿題, 題名.",
    words: [
      { word: "宿題", kana: "しゅくだい", romaji: "shukudai", meaning_vi: "bài tập", reading: "on", usage: "題 đọc だい" },
      { word: "題名", kana: "だいめい", romaji: "daimei", meaning_vi: "nhan đề", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "宿題を忘れました。", kana: "しゅくだいをわすれました。", romaji: "Shukudai o wasuremashita.", vi: "Tôi quên bài tập." },
      { jp: "問題をよく読んでください。", kana: "もんだいをよくよんでください。", romaji: "Mondai o yoku yonde kudasai.", vi: "Hãy đọc kỹ đề." },
    ],
  },
  "研": {
    tip: "On けん. 研究, 研修.",
    words: [
      { word: "研究", kana: "けんきゅう", romaji: "kenkyuu", meaning_vi: "nghiên cứu", reading: "on", usage: "研 đọc けん" },
      { word: "研修", kana: "けんしゅう", romaji: "kenshuu", meaning_vi: "bồi dưỡng", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "大学で研究しています。", kana: "だいがくでけんきゅうしています。", romaji: "Daigaku de kenkyuu shite imasu.", vi: "Tôi nghiên cứu ở đại học." },
      { jp: "新しい技術を研究します。", kana: "あたらしいぎじゅつをけんきゅうします。", romaji: "Atarashii gijutsu o kenkyuu shimasu.", vi: "Tôi nghiên cứu kỹ thuật mới." },
    ],
  },
  "究": {
    tip: "On きゅう. Đi với 研究.",
    words: [
      { word: "研究", kana: "けんきゅう", romaji: "kenkyuu", meaning_vi: "nghiên cứu", reading: "on", usage: "究 đọc きゅう" },
      { word: "究極", kana: "きゅうきょく", romaji: "kyuukyoku", meaning_vi: "tột cùng", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "この問題を究明します。", kana: "このもんだいをきゅうめいします。", romaji: "Kono mondai o kyuumei shimasu.", vi: "Tôi làm rõ vấn đề này." },
      { jp: "究めるのは難しいです。", kana: "きわめるのはむずかしいです。", romaji: "Kiwameru no wa muzukashii desu.", vi: "Theo đến cùng thì khó." },
    ],
  },
  "仕": {
    tip: "On し. 仕事, 仕方.",
    words: [
      { word: "仕方", kana: "しかた", romaji: "shikata", meaning_vi: "cách làm", reading: "on", usage: "仕 đọc し" },
      { word: "仕える", kana: "つかえる", romaji: "tsukaeru", meaning_vi: "phục vụ", reading: "kun", usage: "ít N4" },
    ],
    sentences: [
      { jp: "仕事は楽しいです。", kana: "しごとはたのしいです。", romaji: "Shigoto wa tanoshii desu.", vi: "Công việc vui." },
      { jp: "仕方がありません。", kana: "しかたがありません。", romaji: "Shikata ga arimasen.", vi: "Không còn cách nào." },
    ],
  },
  "事": {
    tip: "On じ. Kun こと = sự việc.",
    words: [
      { word: "食事", kana: "しょくじ", romaji: "shokuji", meaning_vi: "bữa ăn", reading: "on", usage: "事 đọc じ" },
      { word: "大事", kana: "だいじ", romaji: "daiji", meaning_vi: "quan trọng", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "いい事がありました。", kana: "いいことがありました。", romaji: "Ii koto ga arimashita.", vi: "Có chuyện vui." },
      { jp: "仕事の後で食事します。", kana: "しごとのあとでしょくじします。", romaji: "Shigoto no ato de shokuji shimasu.", vi: "Sau giờ làm tôi ăn." },
    ],
  },
  "業": {
    tip: "On ぎょう. 授業, 職業, 卒業.",
    words: [
      { word: "授業", kana: "じゅぎょう", romaji: "jugyou", meaning_vi: "tiết học", reading: "on", usage: "業 đọc ぎょう" },
      { word: "卒業", kana: "そつぎょう", romaji: "sotsugyou", meaning_vi: "tốt nghiệp", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "午後の授業は難しいです。", kana: "ごごのじゅぎょうはむずかしいです。", romaji: "Gogo no jugyou wa muzukashii desu.", vi: "Tiết chiều khó." },
      { jp: "来年卒業します。", kana: "らいねんそつぎょうします。", romaji: "Rainen sotsugyou shimasu.", vi: "Năm sau tôi tốt nghiệp." },
    ],
  },
  "堂": {
    tip: "On どう. 食堂, 講堂.",
    words: [
      { word: "食堂", kana: "しょくどう", romaji: "shokudou", meaning_vi: "nhà ăn", reading: "on", usage: "堂 đọc どう" },
      { word: "講堂", kana: "こうどう", romaji: "koudou", meaning_vi: "hội trường", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "食堂で昼ごはんを食べます。", kana: "しょくどうでひるごはんをたべます。", romaji: "Shokudou de hirugohan o tabemasu.", vi: "Tôi ăn trưa ở nhà ăn." },
      { jp: "この食堂は安いです。", kana: "このしょくどうはやすいです。", romaji: "Kono shokudou wa yasui desu.", vi: "Nhà ăn này rẻ." },
    ],
  },
  "院": {
    tip: "On いん. 病院, 入院.",
    words: [
      { word: "病院", kana: "びょういん", romaji: "byouin", meaning_vi: "bệnh viện", reading: "on", usage: "院 đọc いん" },
      { word: "入院", kana: "にゅういん", romaji: "nyuuin", meaning_vi: "nhập viện", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "頭が痛いので病院へ行きます。", kana: "あたまがいたいのでびょういんへいきます。", romaji: "Atama ga itai node byouin e ikimasu.", vi: "Đau đầu nên tôi đến bệnh viện." },
      { jp: "先週入院しました。", kana: "せんしゅうにゅういんしました。", romaji: "Senshuu nyuuin shimashita.", vi: "Tuần trước tôi nhập viện." },
    ],
  },
  "館": {
    tip: "On かん. 図書館, 映画館.",
    words: [
      { word: "図書館", kana: "としょかん", romaji: "toshokan", meaning_vi: "thư viện", reading: "on", usage: "館 đọc かん" },
      { word: "映画館", kana: "えいがかん", romaji: "eigakan", meaning_vi: "rạp phim", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "図書館で本を借ります。", kana: "としょかんでほんをかります。", romaji: "Toshokan de hon o karimasu.", vi: "Tôi mượn sách ở thư viện." },
      { jp: "映画館は駅の近くです。", kana: "えいがかんはえきのちかくです。", romaji: "Eigakan wa eki no chikaku desu.", vi: "Rạp phim gần ga." },
    ],
  },
  "屋": {
    tip: "Kun や = cửa hàng. On おく.",
    words: [
      { word: "部屋", kana: "へや", romaji: "heya", meaning_vi: "phòng", reading: "kun", usage: "屋 đọc や" },
      { word: "屋上", kana: "おくじょう", romaji: "okujou", meaning_vi: "sân thượng", reading: "on", usage: "屋 đọc おく" },
    ],
    sentences: [
      { jp: "本屋で辞書を買います。", kana: "ほんやでじしょをかいます。", romaji: "Honya de jisho o kaimasu.", vi: "Tôi mua từ điển ở hiệu sách." },
      { jp: "この部屋は広いです。", kana: "このへやはひろいです。", romaji: "Kono heya wa hiroi desu.", vi: "Phòng này rộng." },
    ],
  },
  "度": {
    tip: "On ど = lần / độ. 一度, 温度.",
    words: [
      { word: "一度", kana: "いちど", romaji: "ichido", meaning_vi: "một lần", reading: "on", usage: "度 đọc ど" },
      { word: "温度", kana: "おんど", romaji: "ondo", meaning_vi: "nhiệt độ", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "もう一度言ってください。", kana: "もういちどいってください。", romaji: "Mou ichido itte kudasai.", vi: "Hãy nói lại lần nữa." },
      { jp: "何度も練習します。", kana: "なんどもれんしゅうします。", romaji: "Nando mo renshuu shimasu.", vi: "Tôi luyện rất nhiều lần." },
    ],
  },
  "回": {
    tip: "On かい = lần. Kun まわ・る.",
    words: [
      { word: "一回", kana: "いっかい", romaji: "ikkai", meaning_vi: "một lần", reading: "on", usage: "回 đọc かい" },
      { word: "回転", kana: "かいてん", romaji: "kaiten", meaning_vi: "xoay", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "三回読みました。", kana: "さんかいよみました。", romaji: "Sankai yomimashita.", vi: "Tôi đọc ba lần." },
      { jp: "回ってください。", kana: "まわってください。", romaji: "Mawatte kudasai.", vi: "Hãy quay lại." },
    ],
  },
  "的": {
    tip: "On てき = -tính. 日本的, 目的.",
    words: [
      { word: "目的", kana: "もくてき", romaji: "mokuteki", meaning_vi: "mục đích", reading: "on", usage: "的 đọc てき" },
      { word: "一般的", kana: "いっぱんてき", romaji: "ippanteki", meaning_vi: "phổ biến", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "目的は何ですか。", kana: "もくてきはなんですか。", romaji: "Mokuteki wa nan desu ka.", vi: "Mục đích là gì?" },
      { jp: "日本的な庭が好きです。", kana: "にほんてきなにわがすきです。", romaji: "Nihon-teki na niwa ga suki desu.", vi: "Tôi thích vườn kiểu Nhật." },
    ],
  },
  "力": {
    tip: "Kun ちから. On りょく / りき.",
    words: [
      { word: "能力", kana: "のうりょく", romaji: "nouryoku", meaning_vi: "năng lực", reading: "on", usage: "力 đọc りょく" },
      { word: "努力", kana: "どりょく", romaji: "doryoku", meaning_vi: "nỗ lực", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "力を合わせてください。", kana: "ちからをあわせてください。", romaji: "Chikara o awasete kudasai.", vi: "Hãy chung sức." },
      { jp: "もっと努力します。", kana: "もっとどりょくします。", romaji: "Motto doryoku shimasu.", vi: "Tôi sẽ nỗ lực hơn." },
    ],
  },
  "作": {
    tip: "Kun つく・る. On さく / さ.",
    words: [
      { word: "作文", kana: "さくぶん", romaji: "sakubun", meaning_vi: "bài văn", reading: "on", usage: "作 đọc さく" },
      { word: "作品", kana: "さくひん", romaji: "sakuhin", meaning_vi: "tác phẩm", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "母が夕食を作ります。", kana: "ははがゆうしょくをつくります。", romaji: "Haha ga yuushoku o tsukurimasu.", vi: "Mẹ nấu bữa tối." },
      { jp: "作文を書きました。", kana: "さくぶんをかきました。", romaji: "Sakubun o kakimashita.", vi: "Tôi đã viết bài văn." },
    ],
  },
  "待": {
    tip: "Kun ま・つ. On たい.",
    words: [
      { word: "期待", kana: "きたい", romaji: "kitai", meaning_vi: "kỳ vọng", reading: "on", usage: "待 đọc たい" },
      { word: "招待", kana: "しょうたい", romaji: "shoutai", meaning_vi: "mời", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "少し待ってください。", kana: "すこしまってください。", romaji: "Sukoshi matte kudasai.", vi: "Hãy đợi một chút." },
      { jp: "駅で待っています。", kana: "えきでまっています。", romaji: "Eki de matte imasu.", vi: "Tôi đang đợi ở ga." },
    ],
  },
  "持": {
    tip: "Kun も・つ. On じ.",
    words: [
      { word: "気持ち", kana: "きもち", romaji: "kimochi", meaning_vi: "cảm giác", reading: "kun", usage: "持 đọc もち" },
      { word: "持参", kana: "じさん", romaji: "jisan", meaning_vi: "mang theo", reading: "on", usage: "持 đọc じ" },
    ],
    sentences: [
      { jp: "傘を持っていきます。", kana: "かさをもっていきます。", romaji: "Kasa o motte ikimasu.", vi: "Tôi mang ô đi." },
      { jp: "学生証を持っていますか。", kana: "がくせいしょうをもっていますか。", romaji: "Gakuseishou o motte imasu ka.", vi: "Bạn có thẻ sinh viên không?" },
    ],
  },
  "思": {
    tip: "Kun おも・う. On し.",
    words: [
      { word: "思想", kana: "しそう", romaji: "shisou", meaning_vi: "tư tưởng", reading: "on", usage: "思 đọc し" },
      { word: "意思", kana: "いし", romaji: "ishi", meaning_vi: "ý chí", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "そう思います。", kana: "そうおもいます。", romaji: "Sou omoimasu.", vi: "Tôi nghĩ vậy." },
      { jp: "何を考えていると思いますか。", kana: "なにをかんがえているとおもいますか。", romaji: "Nani o kangaete iru to omoimasu ka.", vi: "Bạn nghĩ họ đang nghĩ gì?" },
    ],
  },
  "知": {
    tip: "Kun し・る. On ち.",
    words: [
      { word: "知人", kana: "ちじん", romaji: "chijin", meaning_vi: "người quen", reading: "on", usage: "知 đọc ち" },
      { word: "知識", kana: "ちしき", romaji: "chishiki", meaning_vi: "kiến thức", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "この言葉を知っていますか。", kana: "このことばをしっていますか。", romaji: "Kono kotoba o shitte imasu ka.", vi: "Bạn biết từ này không?" },
      { jp: "知らなかったです。", kana: "しらなかったです。", romaji: "Shiranakatta desu.", vi: "Tôi đã không biết." },
    ],
  },
  "言": {
    tip: "Kun い・う / こと. On げん.",
    words: [
      { word: "言語", kana: "げんご", romaji: "gengo", meaning_vi: "ngôn ngữ", reading: "on", usage: "言 đọc げん" },
      { word: "方言", kana: "ほうげん", romaji: "hougen", meaning_vi: "phương ngữ", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "ゆっくり言ってください。", kana: "ゆっくりいってください。", romaji: "Yukkuri itte kudasai.", vi: "Hãy nói chậm." },
      { jp: "言葉を覚えます。", kana: "ことばをおぼえます。", romaji: "Kotoba o oboemasu.", vi: "Tôi nhớ từ." },
    ],
  },
  "考": {
    tip: "Kun かんが・える. On こう.",
    words: [
      { word: "考え", kana: "かんがえ", romaji: "kangae", meaning_vi: "ý nghĩ", reading: "kun", usage: "考 đọc かんがえ" },
      { word: "参考", kana: "さんこう", romaji: "sankou", meaning_vi: "tham khảo", reading: "on", usage: "考 đọc こう" },
    ],
    sentences: [
      { jp: "よく考えてから答えます。", kana: "よくかんがえてからこたえます。", romaji: "Yoku kangaete kara kotaemasu.", vi: "Tôi nghĩ kỹ rồi mới trả lời." },
      { jp: "将来のことを考えます。", kana: "しょうらいのことをかんがえます。", romaji: "Shourai no koto o kangaemasu.", vi: "Tôi nghĩ về tương lai." },
    ],
  },
  "教": {
    tip: "Kun おし・える. On きょう.",
    words: [
      { word: "教室", kana: "きょうしつ", romaji: "kyoushitsu", meaning_vi: "phòng học", reading: "on", usage: "教 đọc きょう" },
      { word: "教科書", kana: "きょうかしょ", romaji: "kyoukasho", meaning_vi: "sách giáo khoa", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "日本語を教えてください。", kana: "にほんごをおしえてください。", romaji: "Nihongo o oshiete kudasai.", vi: "Hãy dạy tôi tiếng Nhật." },
      { jp: "教室は二階です。", kana: "きょうしつはにかいです。", romaji: "Kyoushitsu wa nikai desu.", vi: "Phòng học ở tầng hai." },
    ],
  },
  "室": {
    tip: "On しつ. 教室, 部屋と違う — phòng chức năng.",
    words: [
      { word: "教室", kana: "きょうしつ", romaji: "kyoushitsu", meaning_vi: "phòng học", reading: "on", usage: "室 đọc しつ" },
      { word: "待合室", kana: "まちあいしつ", romaji: "machiaishitsu", meaning_vi: "phòng chờ", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "この教室は広いです。", kana: "このきょうしつはひろいです。", romaji: "Kono kyoushitsu wa hiroi desu.", vi: "Phòng học này rộng." },
      { jp: "研究室で待ってください。", kana: "けんきゅうしつでまってください。", romaji: "Kenkyuushitsu de matte kudasai.", vi: "Hãy đợi ở phòng nghiên cứu." },
    ],
  },
  "起": {
    tip: "Kun お・きる / お・こす. On き.",
    words: [
      { word: "起床", kana: "きしょう", romaji: "kishou", meaning_vi: "thức dậy", reading: "on", usage: "起 đọc き" },
      { word: "起点", kana: "きてん", romaji: "kiten", meaning_vi: "điểm xuất phát", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "朝六時に起きます。", kana: "あさろくじにおきます。", romaji: "Asa rokuji ni okimasu.", vi: "Sáng tôi dậy lúc 6 giờ." },
      { jp: "起こしてください。", kana: "おこしてください。", romaji: "Okoshite kudasai.", vi: "Hãy đánh thức tôi." },
    ],
  },
  "終": {
    tip: "Kun お・わる / お・える. On しゅう.",
    words: [
      { word: "終電", kana: "しゅうでん", romaji: "shuuden", meaning_vi: "chuyến tàu cuối", reading: "on", usage: "終 đọc しゅう" },
      { word: "終了", kana: "しゅうりょう", romaji: "shuuryou", meaning_vi: "kết thúc", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "授業が終わりました。", kana: "じゅぎょうがおわりました。", romaji: "Jugyou ga owarimashita.", vi: "Giờ học đã kết thúc." },
      { jp: "終わりまで聞いてください。", kana: "おわりまできいてください。", romaji: "Owari made kiite kudasai.", vi: "Hãy nghe đến hết." },
    ],
  },
  "始": {
    tip: "Kun はじ・める / はじ・まる. On し.",
    words: [
      { word: "開始", kana: "かいし", romaji: "kaishi", meaning_vi: "bắt đầu", reading: "on", usage: "始 đọc し" },
      { word: "始終", kana: "しじゅう", romaji: "shijuu", meaning_vi: "suốt / luôn", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "八時に始まります。", kana: "はちじにはじまります。", romaji: "Hachiji ni hajimarimasu.", vi: "Bắt đầu lúc 8 giờ." },
      { jp: "日本語を始めました。", kana: "にほんごをはじめました。", romaji: "Nihongo o hajimemashita.", vi: "Tôi đã bắt đầu học tiếng Nhật." },
    ],
  },
  "使": {
    tip: "Kun つか・う. On し.",
    words: [
      { word: "使用", kana: "しよう", romaji: "shiyou", meaning_vi: "sử dụng", reading: "on", usage: "使 đọc し" },
      { word: "大使", kana: "たいし", romaji: "taishi", meaning_vi: "đại sứ", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "この辞書を使ってください。", kana: "このじしょをつかってください。", romaji: "Kono jisho o tsukatte kudasai.", vi: "Hãy dùng từ điển này." },
      { jp: "スマホを使いすぎます。", kana: "スマホをつかいすぎます。", romaji: "Sumaho o tsukai sugimasu.", vi: "Tôi dùng điện thoại quá nhiều." },
    ],
  },
  "急": {
    tip: "Kun いそ・ぐ. On きゅう.",
    words: [
      { word: "急に", kana: "きゅうに", romaji: "kyuuni", meaning_vi: "đột ngột", reading: "on", usage: "急 đọc きゅう" },
      { word: "特急", kana: "とっきゅう", romaji: "tokkyuu", meaning_vi: "tàu tốc hành", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "急いで駅へ行きます。", kana: "いそいでえきへいきます。", romaji: "Isoide eki e ikimasu.", vi: "Tôi vội đến ga." },
      { jp: "急に雨が降りました。", kana: "きゅうにあめがふりました。", romaji: "Kyuuni ame ga furimashita.", vi: "Đột nhiên mưa." },
    ],
  },
  "速": {
    tip: "Kun はや・い. On そく.",
    words: [
      { word: "速度", kana: "そくど", romaji: "sokudo", meaning_vi: "tốc độ", reading: "on", usage: "速 đọc そく" },
      { word: "速い", kana: "はやい", romaji: "hayai", meaning_vi: "nhanh", reading: "kun", usage: "速 đọc はや" },
    ],
    sentences: [
      { jp: "この電車は速いです。", kana: "このでんしゃははやいです。", romaji: "Kono densha wa hayai desu.", vi: "Tàu này nhanh." },
      { jp: "速度を落としてください。", kana: "そくどをおとしてください。", romaji: "Sokudo o otoshite kudasai.", vi: "Hãy giảm tốc độ." },
    ],
  },
  "遅": {
    tip: "Kun おそ・い / おく・れる. On ち.",
    words: [
      { word: "遅刻", kana: "ちこく", romaji: "chikoku", meaning_vi: "đến trễ", reading: "on", usage: "遅 đọc ち" },
      { word: "遅れる", kana: "おくれる", romaji: "okureru", meaning_vi: "trễ", reading: "kun", usage: "遅 đọc おく" },
    ],
    sentences: [
      { jp: "この時計は遅いです。", kana: "このとけいはおそいです。", romaji: "Kono tokei wa osoi desu.", vi: "Đồng hồ này chậm." },
      { jp: "電車が遅れました。", kana: "でんしゃがおくれました。", romaji: "Densha ga okuremashita.", vi: "Tàu bị trễ." },
    ],
  },
  "走": {
    tip: "Kun はし・る. On そう.",
    words: [
      { word: "走る", kana: "はしる", romaji: "hashiru", meaning_vi: "chạy", reading: "kun", usage: "走 đọc はし" },
      { word: "走行", kana: "そうこう", romaji: "soukou", meaning_vi: "chạy xe", reading: "on", usage: "走 đọc そう" },
    ],
    sentences: [
      { jp: "公園を走ります。", kana: "こうえんをはしります。", romaji: "Kouen o hashirimasu.", vi: "Tôi chạy ở công viên." },
      { jp: "走らないでください。", kana: "はしらないでください。", romaji: "Hashiranaide kudasai.", vi: "Đừng chạy." },
    ],
  },
  "歩": {
    tip: "Kun ある・く. On ほ.",
    words: [
      { word: "散歩", kana: "さんぽ", romaji: "sanpo", meaning_vi: "đi dạo", reading: "on", usage: "歩 đọc ぽ" },
      { word: "徒歩", kana: "とほ", romaji: "toho", meaning_vi: "đi bộ", reading: "on", usage: "歩 đọc ほ" },
    ],
    sentences: [
      { jp: "駅まで歩きます。", kana: "えきまであるきます。", romaji: "Eki made arukimasu.", vi: "Tôi đi bộ đến ga." },
      { jp: "夕方に散歩します。", kana: "ゆうがたにさんぽします。", romaji: "Yuugata ni sanpo shimasu.", vi: "Chiều tôi đi dạo." },
    ],
  },
  "正": {
    tip: "Kun ただ・しい. On せい / しょう.",
    words: [
      { word: "正確", kana: "せいかく", romaji: "seikaku", meaning_vi: "chính xác", reading: "on", usage: "正 đọc せい" },
      { word: "正直", kana: "しょうじき", romaji: "shoujiki", meaning_vi: "thành thật", reading: "on", usage: "正 đọc しょう" },
    ],
    sentences: [
      { jp: "答えは正しいです。", kana: "こたえはただしいです。", romaji: "Kotae wa tadashii desu.", vi: "Câu trả lời đúng." },
      { jp: "正確に書いてください。", kana: "せいかくにかいてください。", romaji: "Seikaku ni kaite kudasai.", vi: "Hãy viết cho chính xác." },
    ],
  },
  "音": {
    tip: "Kun おと / ね. On おん.",
    words: [
      { word: "音楽", kana: "おんがく", romaji: "ongaku", meaning_vi: "âm nhạc", reading: "on", usage: "音 đọc おん" },
      { word: "発音", kana: "はつおん", romaji: "hatsuon", meaning_vi: "phát âm", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "変な音がします。", kana: "へんなおとがします。", romaji: "Hen na oto ga shimasu.", vi: "Có tiếng lạ." },
      { jp: "音楽を聞くのが好きです。", kana: "おんがくをきくのがすきです。", romaji: "Ongaku o kiku no ga suki desu.", vi: "Tôi thích nghe nhạc." },
    ],
  },
  "楽": {
    tip: "Kun たの・しい. On がく / らく.",
    words: [
      { word: "音楽", kana: "おんがく", romaji: "ongaku", meaning_vi: "âm nhạc", reading: "on", usage: "楽 đọc がく" },
      { word: "楽しい", kana: "たのしい", romaji: "tanoshii", meaning_vi: "vui", reading: "kun", usage: "楽 đọc たの" },
    ],
    sentences: [
      { jp: "旅行は楽しかったです。", kana: "りょこうはたのしかったです。", romaji: "Ryokou wa tanoshikatta desu.", vi: "Chuyến đi vui." },
      { jp: "楽に座ってください。", kana: "らくにすわってください。", romaji: "Raku ni suwatte kudasai.", vi: "Hãy ngồi thoải mái." },
    ],
  },
  "歌": {
    tip: "Kun うた / うた・う. On か.",
    words: [
      { word: "歌手", kana: "かしゅ", romaji: "kashu", meaning_vi: "ca sĩ", reading: "on", usage: "歌 đọc か" },
      { word: "国歌", kana: "こっか", romaji: "kokka", meaning_vi: "quốc ca", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "日本の歌を歌います。", kana: "にほんのうたをうたいます。", romaji: "Nihon no uta o utaimasu.", vi: "Tôi hát bài Nhật." },
      { jp: "好きな歌手は誰ですか。", kana: "すきなかしゅはだれですか。", romaji: "Suki na kashu wa dare desu ka.", vi: "Ca sĩ bạn thích là ai?" },
    ],
  },
  "映": {
    tip: "On えい. 映画, 映像.",
    words: [
      { word: "映画", kana: "えいが", romaji: "eiga", meaning_vi: "phim", reading: "on", usage: "映 đọc えい" },
      { word: "反映", kana: "はんえい", romaji: "han'ei", meaning_vi: "phản ánh", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "週末に映画を見ます。", kana: "しゅうまつにえいがをみます。", romaji: "Shuumatsu ni eiga o mimasu.", vi: "Cuối tuần tôi xem phim." },
      { jp: "この映画は面白いです。", kana: "このえいがはおもしろいです。", romaji: "Kono eiga wa omoshiroi desu.", vi: "Phim này thú vị." },
    ],
  },
  "画": {
    tip: "On が / かく. 映画, 計画.",
    words: [
      { word: "計画", kana: "けいかく", romaji: "keikaku", meaning_vi: "kế hoạch", reading: "on", usage: "画 đọc かく" },
      { word: "画家", kana: "がか", romaji: "gaka", meaning_vi: "họa sĩ", reading: "on", usage: "画 đọc が" },
    ],
    sentences: [
      { jp: "旅行の計画を立てます。", kana: "りょこうのけいかくをたてます。", romaji: "Ryokou no keikaku o tatemasu.", vi: "Tôi lập kế hoạch chuyến đi." },
      { jp: "映画を見る計画です。", kana: "えいがをみるけいかくです。", romaji: "Eiga o miru keikaku desu.", vi: "Kế hoạch là xem phim." },
    ],
  },
  "写": {
    tip: "Kun うつ・す. On しゃ.",
    words: [
      { word: "写真", kana: "しゃしん", romaji: "shashin", meaning_vi: "ảnh", reading: "on", usage: "写 đọc しゃ" },
      { word: "写す", kana: "うつす", romaji: "utsusu", meaning_vi: "chép / chụp", reading: "kun", usage: "写 đọc うつ" },
    ],
    sentences: [
      { jp: "写真を撮ってもいいですか。", kana: "しゃしんをとってもいいですか。", romaji: "Shashin o totte mo ii desu ka.", vi: "Chụp ảnh được không?" },
      { jp: "黒板を写してください。", kana: "こくばんをうつしてください。", romaji: "Kokuban o utsushite kudasai.", vi: "Hãy chép bảng." },
    ],
  },
  "真": {
    tip: "On しん. 写真, 真剣, 真ん中 (đặc biệt).",
    words: [
      { word: "真面目", kana: "まじめ", romaji: "majime", meaning_vi: "nghiêm túc", reading: "on", usage: "đọc đặc biệt" },
      { word: "真相", kana: "しんそう", romaji: "shinsou", meaning_vi: "sự thật", reading: "on", usage: "真 đọc しん" },
    ],
    sentences: [
      { jp: "写真が上手ですね。", kana: "しゃしんがじょうずですね。", romaji: "Shashin ga jouzu desu ne.", vi: "Bạn chụp ảnh giỏi nhỉ." },
      { jp: "彼は真面目な学生です。", kana: "かれはまじめながくせいです。", romaji: "Kare wa majime na gakusei desu.", vi: "Anh ấy là học sinh nghiêm túc." },
    ],
  },
  "色": {
    tip: "Kun いろ. On しょく.",
    words: [
      { word: "景色", kana: "けしき", romaji: "keshiki", meaning_vi: "phong cảnh", reading: "on", usage: "色 đọc しき" },
      { word: "特色", kana: "とくしょく", romaji: "tokushoku", meaning_vi: "nét đặc trưng", reading: "on", usage: "色 đọc しょく" },
    ],
    sentences: [
      { jp: "好きな色は青です。", kana: "すきないろはあおです。", romaji: "Suki na iro wa ao desu.", vi: "Màu tôi thích là xanh." },
      { jp: "秋の景色はきれいです。", kana: "あきのけしきはきれいです。", romaji: "Aki no keshiki wa kirei desu.", vi: "Cảnh mùa thu đẹp." },
    ],
  },
  "赤": {
    tip: "Kun あか / あか・い. On せき.",
    words: [
      { word: "赤", kana: "あか", romaji: "aka", meaning_vi: "màu đỏ", reading: "kun", usage: "赤 đọc あか" },
      { word: "赤道", kana: "せきどう", romaji: "sekidou", meaning_vi: "xích đạo", reading: "on", usage: "赤 đọc せき" },
    ],
    sentences: [
      { jp: "赤いりんごを買いました。", kana: "あかいりんごをかいました。", romaji: "Akai ringo o kaimashita.", vi: "Tôi mua táo đỏ." },
      { jp: "信号は赤です。", kana: "しんごうはあかです。", romaji: "Shingou wa aka desu.", vi: "Đèn giao thông đang đỏ." },
    ],
  },
  "青": {
    tip: "Kun あお / あお・い. On せい.",
    words: [
      { word: "青春", kana: "せいしゅん", romaji: "seishun", meaning_vi: "tuổi trẻ", reading: "on", usage: "青 đọc せい" },
      { word: "青空", kana: "あおぞら", romaji: "aozora", meaning_vi: "bầu trời xanh", reading: "kun", usage: "青 đọc あお" },
    ],
    sentences: [
      { jp: "空は青いです。", kana: "そらはあおいです。", romaji: "Sora wa aoi desu.", vi: "Bầu trời xanh." },
      { jp: "青いシャツを着ています。", kana: "あおいシャツをきています。", romaji: "Aoi shatsu o kite imasu.", vi: "Tôi đang mặc áo xanh." },
    ],
  },
  "黒": {
    tip: "Kun くろ / くろ・い. On こく.",
    words: [
      { word: "黒板", kana: "こくばん", romaji: "kokuban", meaning_vi: "bảng đen", reading: "on", usage: "黒 đọc こく" },
      { word: "黒字", kana: "くろじ", romaji: "kuroji", meaning_vi: "có lãi", reading: "kun", usage: "黒 đọc くろ" },
    ],
    sentences: [
      { jp: "黒い猫が好きです。", kana: "くろいねこがすきです。", romaji: "Kuroi neko ga suki desu.", vi: "Tôi thích mèo đen." },
      { jp: "黒板を見てください。", kana: "こくばんをみてください。", romaji: "Kokuban o mite kudasai.", vi: "Hãy nhìn bảng." },
    ],
  },
  "紙": {
    tip: "Kun かみ. On し.",
    words: [
      { word: "手紙", kana: "てがみ", romaji: "tegami", meaning_vi: "thư", reading: "kun", usage: "紙 đọc がみ" },
      { word: "新聞紙", kana: "しんぶんし", romaji: "shinbunshi", meaning_vi: "giấy báo", reading: "on", usage: "紙 đọc し" },
    ],
    sentences: [
      { jp: "白い紙をください。", kana: "しろいかみをください。", romaji: "Shiroi kami o kudasai.", vi: "Cho tôi tờ giấy trắng." },
      { jp: "手紙を書きました。", kana: "てがみをかきました。", romaji: "Tegami o kakimashita.", vi: "Tôi đã viết thư." },
    ],
  },
  "切": {
    tip: "Kun き・る. On せつ.",
    words: [
      { word: "大切", kana: "たいせつ", romaji: "taisetsu", meaning_vi: "quan trọng", reading: "on", usage: "切 đọc せつ" },
      { word: "切符", kana: "きっぷ", romaji: "kippu", meaning_vi: "vé", reading: "kun", usage: "切 đọc きっ" },
    ],
    sentences: [
      { jp: "パンを切ってください。", kana: "パンをきってください。", romaji: "Pan o kitte kudasai.", vi: "Hãy cắt bánh mì." },
      { jp: "友達は大切です。", kana: "ともだちはたいせつです。", romaji: "Tomodachi wa taisetsu desu.", vi: "Bạn bè thì quý." },
    ],
  },
  "代": {
    tip: "On だい. Kun か・わる / よ.",
    words: [
      { word: "時代", kana: "じだい", romaji: "jidai", meaning_vi: "thời đại", reading: "on", usage: "代 đọc だい" },
      { word: "現代", kana: "げんだい", romaji: "gendai", meaning_vi: "hiện đại", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "代わりに行きます。", kana: "かわりにいきます。", romaji: "Kawari ni ikimasu.", vi: "Tôi đi thay." },
      { jp: "この時代の映画が好きです。", kana: "このじだいのえいががすきです。", romaji: "Kono jidai no eiga ga suki desu.", vi: "Tôi thích phim thời này." },
    ],
  },
  "場": {
    tip: "On じょう. Kun ば.",
    words: [
      { word: "場所", kana: "ばしょ", romaji: "basho", meaning_vi: "địa điểm", reading: "kun", usage: "場 đọc ば" },
      { word: "会場", kana: "かいじょう", romaji: "kaijou", meaning_vi: "hội trường", reading: "on", usage: "場 đọc じょう" },
    ],
    sentences: [
      { jp: "会う場所を決めましょう。", kana: "あうばしょをきめましょう。", romaji: "Au basho o kimemashou.", vi: "Mình chọn chỗ gặp nhé." },
      { jp: "会場はこちらです。", kana: "かいじょうはこちらです。", romaji: "Kaijou wa kochira desu.", vi: "Hội trường ở đây." },
    ],
  },
  "所": {
    tip: "Kun ところ. On しょ.",
    words: [
      { word: "場所", kana: "ばしょ", romaji: "basho", meaning_vi: "địa điểm", reading: "on", usage: "所 đọc しょ" },
      { word: "事務所", kana: "じむしょ", romaji: "jimusho", meaning_vi: "văn phòng", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "いい所ですね。", kana: "いいところですね。", romaji: "Ii tokoro desu ne.", vi: "Chỗ này đẹp nhỉ." },
      { jp: "住所を書いてください。", kana: "じゅうしょをかいてください。", romaji: "Juusho o kaite kudasai.", vi: "Hãy viết địa chỉ." },
    ],
  },
  "世": {
    tip: "On せい / せ. 世界, 世話.",
    words: [
      { word: "世界", kana: "せかい", romaji: "sekai", meaning_vi: "thế giới", reading: "on", usage: "世 đọc せ" },
      { word: "世話", kana: "せわ", romaji: "sewa", meaning_vi: "chăm sóc / giúp đỡ", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "世界を旅行したいです。", kana: "せかいをりょこうしたいです。", romaji: "Sekai o ryokou shitai desu.", vi: "Tôi muốn du lịch thế giới." },
      { jp: "お世話になりました。", kana: "おせわになりました。", romaji: "Osewa ni narimashita.", vi: "Cảm ơn sự giúp đỡ của anh/chị." },
    ],
  },
  "界": {
    tip: "On かい. Đi với 世界.",
    words: [
      { word: "世界", kana: "せかい", romaji: "sekai", meaning_vi: "thế giới", reading: "on", usage: "界 đọc かい" },
      { word: "限界", kana: "げんかい", romaji: "genkai", meaning_vi: "giới hạn", reading: "on", usage: "cùng âm" },
    ],
    sentences: [
      { jp: "世界中の人が来ます。", kana: "せかいじゅうのひとがきます。", romaji: "Sekaijuu no hito ga kimasu.", vi: "Người từ khắp thế giới đến." },
      { jp: "この世界は広いです。", kana: "このせかいはひろいです。", romaji: "Kono sekai wa hiroi desu.", vi: "Thế giới này rộng." },
    ],
  },
};
