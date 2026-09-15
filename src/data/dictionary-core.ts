import type { DictionaryEntry } from "@/lib/akari/types";

function d(
  n: number,
  kanji: string,
  kana: string,
  romaji: string,
  meanings: string[],
  part_of_speech: DictionaryEntry["part_of_speech"],
  jlpt: DictionaryEntry["jlpt"],
  common: boolean,
  frequency: number,
  examples: DictionaryEntry["examples"],
  tags: string[],
  extra?: { related?: string[]; kanjiChars?: string[]; aliases?: string[] },
): DictionaryEntry {
  return {
    id: `dx-${String(n).padStart(3, "0")}`,
    kanji,
    kana,
    romaji,
    meanings,
    part_of_speech,
    jlpt,
    common,
    frequency,
    pitch_accent: null,
    examples,
    tags,
    related: extra?.related,
    kanjiChars: extra?.kanjiChars,
    aliases: extra?.aliases,
  };
}

/** High-frequency N5/N4 headwords missing from the lesson vocab lists. Original examples. */
export const DICTIONARY_CORE: DictionaryEntry[] = [
  d(100, "言う", "いう", "iu", ["nói"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "もう一度言ってください。", kana: "もういちどいってください。", romaji: "Mou ichido itte kudasai.", vi: "Xin hãy nói lại lần nữa." },
  ], ["động từ"], { related: ["話す"] }),
  d(101, "作る", "つくる", "tsukuru", ["làm", "nấu", "tạo"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "母は台所で夕食を作ります。", kana: "はははだいどころでゆうしょくをつくります。", romaji: "Haha wa daidokoro de yuushoku o tsukurimasu.", vi: "Mẹ nấu bữa tối ở nhà bếp." },
  ], ["động từ", "nhà cửa"]),
  d(102, "使う", "つかう", "tsukau", ["dùng", "sử dụng"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "この辞書を使ってもいいですか。", kana: "このじしょをつかってもいいですか。", romaji: "Kono jisho o tsukatte mo ii desu ka.", vi: "Tôi dùng từ điển này được không?" },
  ], ["động từ"]),
  d(103, "知る", "しる", "shiru", ["biết"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "彼の名前を知っていますか。", kana: "かれのなまえをしっていますか。", romaji: "Kare no namae o shitte imasu ka.", vi: "Bạn có biết tên anh ấy không?" },
  ], ["động từ"], { related: ["分かる"] }),
  d(104, "思う", "おもう", "omou", ["nghĩ", "cảm thấy"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "日本語は面白いと思います。", kana: "にほんごはおもしろいとおもいます。", romaji: "Nihongo wa omoshiroi to omoimasu.", vi: "Tôi nghĩ tiếng Nhật thú vị." },
  ], ["động từ"], { related: ["考える"] }),
  d(105, "会う", "あう", "au", ["gặp"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "駅の前で友達に会いました。", kana: "えきのまえでともだちにあいました。", romaji: "Eki no mae de tomodachi ni aimashita.", vi: "Tôi đã gặp bạn trước nhà ga." },
  ], ["động từ"]),
  d(106, "持つ", "もつ", "motsu", ["cầm", "có"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "黄色い傘を持っています。", kana: "きいろいかさをもっています。", romaji: "Kiiroi kasa o motte imasu.", vi: "Tôi đang cầm ô màu vàng." },
  ], ["động từ"]),
  d(107, "住む", "すむ", "sumu", ["sống", "ở"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "今、東京に住んでいます。", kana: "いま、とうきょうにすんでいます。", romaji: "Ima, Toukyou ni sunde imasu.", vi: "Hiện tôi sống ở Tokyo." },
  ], ["động từ", "nhà cửa"]),
  d(108, "入る", "はいる", "hairu", ["vào"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "教室に入ってください。", kana: "きょうしつにはいってください。", romaji: "Kyoushitsu ni haitte kudasai.", vi: "Hãy vào phòng học." },
  ], ["động từ"], { related: ["出る"] }),
  d(109, "出る", "でる", "deru", ["ra", "xuất hiện"], ["động từ nhóm 2"], ["N5"], true, 1, [
    { jp: "朝七時に家を出ます。", kana: "あさしちじにいえをでます。", romaji: "Asa shichiji ni ie o demasu.", vi: "Sáng tôi ra khỏi nhà lúc bảy giờ." },
  ], ["động từ"], { related: ["入る"] }),
  d(110, "帰る", "かえる", "kaeru", ["về"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "仕事のあと、すぐ帰ります。", kana: "しごとのあと、すぐかえります。", romaji: "Shigoto no ato, sugu kaerimasu.", vi: "Sau giờ làm tôi về ngay." },
  ], ["động từ"]),
  d(111, "着る", "きる", "kiru", ["mặc (áo)"], ["động từ nhóm 2"], ["N5"], true, 2, [
    { jp: "寒いのでコートを着ます。", kana: "さむいのでコートをきます。", romaji: "Samui node kooto o kimasu.", vi: "Trời lạnh nên tôi mặc áo khoác." },
  ], ["động từ", "quần áo"], { related: ["服"] }),
  d(112, "切る", "きる", "kiru", ["cắt"], ["động từ nhóm 1"], ["N5"], true, 2, [
    { jp: "紙をはさみで切ります。", kana: "かみをはさみできります。", romaji: "Kami o hasami de kirimasu.", vi: "Tôi cắt giấy bằng kéo." },
  ], ["động từ"]),
  d(113, "洗う", "あらう", "arau", ["rửa"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "ご飯の前に手を洗います。", kana: "ごはんのまえにてをあらいます。", romaji: "Gohan no mae ni te o araimasu.", vi: "Trước khi ăn tôi rửa tay." },
  ], ["động từ"]),
  d(114, "立つ", "たつ", "tatsu", ["đứng"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "バスの中で立ちます。", kana: "バスのなかでたちます。", romaji: "Basu no naka de tachimasu.", vi: "Tôi đứng trong xe buýt." },
  ], ["động từ"], { related: ["座る"] }),
  d(115, "座る", "すわる", "suwaru", ["ngồi"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "どうぞ、ここに座ってください。", kana: "どうぞ、ここにすわってください。", romaji: "Douzo, koko ni suwatte kudasai.", vi: "Xin mời ngồi đây." },
  ], ["động từ"], { related: ["立つ"] }),
  d(116, "遊ぶ", "あそぶ", "asobu", ["chơi"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "日曜日は公園で遊びます。", kana: "にちようびはこうえんであそびます。", romaji: "Nichiyoubi wa kouen de asobimasu.", vi: "Chủ nhật tôi chơi ở công viên." },
  ], ["động từ"]),
  d(117, "泳ぐ", "およぐ", "oyogu", ["bơi"], ["động từ nhóm 1"], ["N5"], true, 2, [
    { jp: "夏、海で泳ぎます。", kana: "なつ、うみでおよぎます。", romaji: "Natsu, umi de oyogimasu.", vi: "Mùa hè tôi bơi ở biển." },
  ], ["động từ"]),
  d(118, "歌う", "うたう", "utau", ["hát"], ["động từ nhóm 1"], ["N5"], true, 2, [
    { jp: "友達と一緒に歌を歌います。", kana: "ともだちといっしょにうたをうたいます。", romaji: "Tomodachi to issho ni uta o utaimasu.", vi: "Tôi hát cùng bạn." },
  ], ["động từ", "âm nhạc"]),
  d(119, "走る", "はしる", "hashiru", ["chạy"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "朝、公園を走ります。", kana: "あさ、こうえんをはしります。", romaji: "Asa, kouen o hashirimasu.", vi: "Sáng tôi chạy bộ ở công viên." },
  ], ["động từ"]),
  d(120, "死ぬ", "しぬ", "shinu", ["chết"], ["động từ nhóm 1"], ["N5"], true, 3, [
    { jp: "古い木が枯れて死にました。", kana: "ふるいきがかれてしにました。", romaji: "Furui ki ga karete shinimashita.", vi: "Cây cũ héo rồi chết." },
  ], ["động từ"]),
  d(121, "開ける", "あける", "akeru", ["mở (cửa, hộp)"], ["động từ nhóm 2"], ["N5"], true, 1, [
    { jp: "窓を開けてください。", kana: "まどをあけてください。", romaji: "Mado o akete kudasai.", vi: "Hãy mở cửa sổ." },
  ], ["động từ"], { related: ["開く", "閉める"] }),
  d(122, "閉める", "しめる", "shimeru", ["đóng (cửa)"], ["động từ nhóm 2"], ["N5"], true, 1, [
    { jp: "寒いのでドアを閉めます。", kana: "さむいのでドアをしめます。", romaji: "Samui node doa o shimemasu.", vi: "Trời lạnh nên tôi đóng cửa." },
  ], ["động từ"], { related: ["開ける"] }),
  d(123, "教える", "おしえる", "oshieru", ["dạy", "chỉ"], ["động từ nhóm 2"], ["N5"], true, 1, [
    { jp: "日本語を教えてください。", kana: "にほんごをおしえてください。", romaji: "Nihongo o oshiete kudasai.", vi: "Hãy dạy tôi tiếng Nhật." },
  ], ["động từ"], { related: ["習う"] }),
  d(124, "習う", "ならう", "narau", ["học (với ai)"], ["động từ nhóm 1"], ["N5"], true, 2, [
    { jp: "ピアノを習っています。", kana: "ピアノをならっています。", romaji: "Piano o naratte imasu.", vi: "Tôi đang học piano." },
  ], ["động từ"], { related: ["教える", "勉強"] }),
  d(125, "覚える", "おぼえる", "oboeru", ["nhớ", "học thuộc"], ["động từ nhóm 2"], ["N5"], true, 1, [
    { jp: "この漢字を覚えました。", kana: "このかんじをおぼえました。", romaji: "Kono kanji o oboemashita.", vi: "Tôi đã nhớ chữ kanji này." },
  ], ["động từ"], { related: ["忘れる"] }),
  d(126, "貸す", "かす", "kasu", ["cho mượn"], ["động từ nhóm 1"], ["N5"], true, 2, [
    { jp: "ペンを貸してください。", kana: "ペンをかしてください。", romaji: "Pen o kashite kudasai.", vi: "Cho tôi mượn bút với." },
  ], ["động từ"], { related: ["借りる"] }),
  d(127, "借りる", "かりる", "kariru", ["mượn"], ["động từ nhóm 2"], ["N5"], true, 2, [
    { jp: "図書館で本を借ります。", kana: "としょかんでほんをかります。", romaji: "Toshokan de hon o karimasu.", vi: "Tôi mượn sách ở thư viện." },
  ], ["động từ"], { related: ["貸す", "返す"] }),
  d(128, "返す", "かえす", "kaesu", ["trả lại"], ["động từ nhóm 1"], ["N5"], true, 2, [
    { jp: "明日本を返します。", kana: "あしたほんをかえします。", romaji: "Ashita hon o kaeshimasu.", vi: "Ngày mai tôi trả sách." },
  ], ["động từ"]),
  d(129, "払う", "はらう", "harau", ["trả tiền"], ["động từ nhóm 1"], ["N5"], true, 2, [
    { jp: "お金で払います。", kana: "おかねではらいます。", romaji: "Okane de haraimasu.", vi: "Tôi trả bằng tiền mặt." },
  ], ["động từ", "mua sắm"]),
  d(130, "撮る", "とる", "toru", ["chụp (ảnh)"], ["động từ nhóm 1"], ["N5"], true, 2, [
    { jp: "公園で写真を撮ります。", kana: "こうえんでしゃしんをとります。", romaji: "Kouen de shashin o torimasu.", vi: "Tôi chụp ảnh ở công viên." },
  ], ["động từ"], { related: ["写真"] }),
  d(131, "取る", "とる", "toru", ["lấy", "nhận"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "机の上の本を取ってください。", kana: "つくえのうえのほんをとってください。", romaji: "Tsukue no ue no hon o totte kudasai.", vi: "Hãy lấy quyển sách trên bàn." },
  ], ["động từ"]),
  d(132, "見せる", "みせる", "miseru", ["cho xem"], ["động từ nhóm 2"], ["N5"], true, 2, [
    { jp: "写真を見せてください。", kana: "しゃしんをみせてください。", romaji: "Shashin o misete kudasai.", vi: "Cho tôi xem ảnh với." },
  ], ["động từ"], { related: ["見る"] }),
  d(133, "置く", "おく", "oku", ["đặt", "để"], ["động từ nhóm 1"], ["N5"], true, 2, [
    { jp: "かばんを椅子の上に置きます。", kana: "かばんをいすのうえにおきます。", romaji: "Kaban o isu no ue ni okimasu.", vi: "Tôi để cặp lên ghế." },
  ], ["động từ"]),
  d(134, "呼ぶ", "よぶ", "yobu", ["gọi"], ["động từ nhóm 1"], ["N5"], true, 2, [
    { jp: "名前を呼ばれたら、はいと言います。", kana: "なまえをよばれたら、はいといいます。", romaji: "Namae o yobaretara, hai to iimasu.", vi: "Khi được gọi tên, tôi nói vâng." },
  ], ["động từ"]),
  d(135, "あげる", "あげる", "ageru", ["cho", "tặng (người khác)"], ["động từ nhóm 2"], ["N5"], true, 2, [
    { jp: "友達に花をあげました。", kana: "ともだちにはなをあげました。", romaji: "Tomodachi ni hana o agemashita.", vi: "Tôi đã tặng hoa cho bạn." },
  ], ["động từ"], { related: ["もらう", "くれる"] }),
  d(136, "もらう", "もらう", "morau", ["nhận"], ["động từ nhóm 1"], ["N5"], true, 2, [
    { jp: "母に時計をもらいました。", kana: "ははにとけいをもらいました。", romaji: "Haha ni tokei o moraimashita.", vi: "Tôi nhận đồng hồ từ mẹ." },
  ], ["động từ"], { related: ["あげる"] }),
  d(137, "くれる", "くれる", "kureru", ["cho (mình)"], ["động từ nhóm 2"], ["N5"], true, 2, [
    { jp: "友達が地図をくれました。", kana: "ともだちがちずをくれました。", romaji: "Tomodachi ga chizu o kuremashita.", vi: "Bạn đã cho tôi tờ bản đồ." },
  ], ["động từ"], { related: ["あげる"] }),
  d(138, "休む", "やすむ", "yasumu", ["nghỉ"], ["động từ nhóm 1"], ["N5"], true, 1, [
    { jp: "熱があるので学校を休みます。", kana: "ねつがあるのでがっこうをやすみます。", romaji: "Netsu ga aru node gakkou o yasumimasu.", vi: "Vì sốt nên tôi nghỉ học." },
  ], ["động từ"], { related: ["休み"] }),
  d(139, "着く", "つく", "tsuku", ["đến nơi"], ["động từ nhóm 1"], ["N5"], true, 2, [
    { jp: "駅に十時に着きます。", kana: "えきにじゅうじにつきます。", romaji: "Eki ni juuji ni tsukimasu.", vi: "Tôi đến ga lúc mười giờ." },
  ], ["động từ"]),
  d(140, "止まる", "とまる", "tomaru", ["dừng"], ["động từ nhóm 1"], ["N5"], true, 2, [
    { jp: "バスが駅の前に止まります。", kana: "バスがえきのまえにとまります。", romaji: "Basu ga eki no mae ni tomarimasu.", vi: "Xe buýt dừng trước ga." },
  ], ["động từ"]),
  d(141, "付ける", "つける", "tsukeru", ["gắn", "bật"], ["động từ nhóm 2"], ["N5"], true, 2, [
    { jp: "電気を付けてください。", kana: "でんきをつけてください。", romaji: "Denki o tsukete kudasai.", vi: "Hãy bật đèn." },
  ], ["động từ"], { related: ["消す"] }),
  d(142, "美味しい", "おいしい", "oishii", ["ngon"], ["tính từ -i"], ["N5"], true, 1, [
    { jp: "この店の魚は美味しいです。", kana: "このみせのさかなはおいしいです。", romaji: "Kono mise no sakana wa oishii desu.", vi: "Cá ở quán này ngon." },
  ], ["tính từ", "đồ ăn"], { aliases: ["おいしい"] }),
  d(143, "欲しい", "ほしい", "hoshii", ["muốn có"], ["tính từ -i"], ["N5"], true, 1, [
    { jp: "新しい辞書が欲しいです。", kana: "あたらしいじしょがほしいです。", romaji: "Atarashii jisho ga hoshii desu.", vi: "Tôi muốn có từ điển mới." },
  ], ["tính từ"]),
  d(144, "嫌い", "きらい", "kirai", ["ghét", "không thích"], ["tính từ -na"], ["N5"], true, 1, [
    { jp: "辛い食べ物が嫌いです。", kana: "からいたべものがきらいです。", romaji: "Karai tabemono ga kirai desu.", vi: "Tôi không thích đồ ăn cay." },
  ], ["tính từ"], { related: ["好き"] }),
  d(145, "痛い", "いたい", "itai", ["đau"], ["tính từ -i"], ["N5"], true, 1, [
    { jp: "頭が痛いです。", kana: "あたまがいたいです。", romaji: "Atama ga itai desu.", vi: "Tôi bị đau đầu." },
  ], ["tính từ", "sức khỏe"]),
  d(146, "疲れる", "つかれる", "tsukareru", ["mệt"], ["động từ nhóm 2"], ["N5"], true, 1, [
    { jp: "仕事のあと、とても疲れます。", kana: "しごとのあと、とてもつかれます。", romaji: "Shigoto no ato, totemo tsukaremasu.", vi: "Sau giờ làm tôi rất mệt." },
  ], ["động từ", "sức khỏe"]),
  d(147, "上手", "じょうず", "jouzu", ["giỏi"], ["tính từ -na"], ["N5"], true, 1, [
    { jp: "彼女は日本語が上手です。", kana: "かのじょはにほんごがじょうずです。", romaji: "Kanojo wa nihongo ga jouzu desu.", vi: "Cô ấy giỏi tiếng Nhật." },
  ], ["tính từ"], { related: ["下手"] }),
  d(148, "下手", "へた", "heta", ["kém"], ["tính từ -na"], ["N5"], true, 2, [
    { jp: "歌は下手ですが、好きです。", kana: "うたはへたですが、すきです。", romaji: "Uta wa heta desu ga, suki desu.", vi: "Tôi hát kém nhưng vẫn thích." },
  ], ["tính từ"], { related: ["上手"] }),
  d(149, "有名", "ゆうめい", "yuumei", ["nổi tiếng"], ["tính từ -na"], ["N5"], true, 2, [
    { jp: "この店はとても有名です。", kana: "このみせはとてもゆうめいです。", romaji: "Kono mise wa totemo yuumei desu.", vi: "Quán này rất nổi tiếng." },
  ], ["tính từ"]),
  d(150, "大丈夫", "だいじょうぶ", "daijoubu", ["không sao", "ổn"], ["tính từ -na", "biểu hiện"], ["N5"], true, 1, [
    { jp: "大丈夫です。心配しないでください。", kana: "だいじょうぶです。しんぱいしないでください。", romaji: "Daijoubu desu. Shinpai shinaide kudasai.", vi: "Không sao. Đừng lo." },
  ], ["biểu hiện"]),
  d(151, "名前", "なまえ", "namae", ["tên"], ["danh từ"], ["N5"], true, 1, [
    { jp: "お名前は何ですか。", kana: "おなまえはなんですか。", romaji: "Onamae wa nan desu ka.", vi: "Tên bạn là gì?" },
  ], ["người"], { aliases: ["nan", "お名前"] }),
  d(152, "番号", "ばんごう", "bangou", ["số", "số hiệu"], ["danh từ"], ["N5"], true, 1, [
    { jp: "電話番号を書いてください。", kana: "でんわばんごうをかいてください。", romaji: "Denwa bangou o kaite kudasai.", vi: "Hãy viết số điện thoại." },
  ], ["liên lạc"], { related: ["電話"] }),
  d(153, "電話", "でんわ", "denwa", ["điện thoại"], ["danh từ"], ["N5"], true, 1, [
    { jp: "あとで電話します。", kana: "あとででんわします。", romaji: "Ato de denwa shimasu.", vi: "Lát nữa tôi sẽ gọi điện." },
  ], ["liên lạc"]),
  d(154, "写真", "しゃしん", "shashin", ["ảnh", "tấm ảnh"], ["danh từ"], ["N5"], true, 1, [
    { jp: "旅行の写真を見ました。", kana: "りょこうのしゃしんをみました。", romaji: "Ryokou no shashin o mimashita.", vi: "Tôi đã xem ảnh chuyến đi." },
  ], ["du lịch"]),
  d(155, "映画", "えいが", "eiga", ["phim"], ["danh từ"], ["N5"], true, 1, [
    { jp: "夜、友達と映画を見ます。", kana: "よる、ともだちとえいがをみます。", romaji: "Yoru, tomodachi to eiga o mimasu.", vi: "Tối tôi xem phim với bạn." },
  ], ["giải trí"]),
  d(156, "音楽", "おんがく", "ongaku", ["âm nhạc"], ["danh từ"], ["N5"], true, 1, [
    { jp: "静かな音楽が好きです。", kana: "しずかなおんがくがすきです。", romaji: "Shizuka na ongaku ga suki desu.", vi: "Tôi thích nhạc nhẹ." },
  ], ["giải trí"]),
  d(157, "時計", "とけい", "tokei", ["đồng hồ"], ["danh từ"], ["N5"], true, 1, [
    { jp: "時計を見てください。もう八時です。", kana: "とけいをみてください。もうはちじです。", romaji: "Tokei o mite kudasai. Mou hachiji desu.", vi: "Nhìn đồng hồ đi. Đã tám giờ rồi." },
  ], ["thời gian"]),
  d(158, "眼鏡", "めがね", "megane", ["kính mắt"], ["danh từ"], ["N5"], true, 2, [
    { jp: "眼鏡をかけて本を読みます。", kana: "めがねをかけてほんをよみます。", romaji: "Megane o kakete hon o yomimasu.", vi: "Tôi đeo kính đọc sách." },
  ], ["đồ dùng"]),
  d(159, "服", "ふく", "fuku", ["quần áo"], ["danh từ"], ["N5"], true, 1, [
    { jp: "白い服を着ています。", kana: "しろいふくをきています。", romaji: "Shiroi fuku o kite imasu.", vi: "Tôi đang mặc quần áo trắng." },
  ], ["quần áo"]),
  d(160, "靴", "くつ", "kutsu", ["giày"], ["danh từ"], ["N5"], true, 1, [
    { jp: "新しい靴を買いました。", kana: "あたらしいくつをかいました。", romaji: "Atarashii kutsu o kaimashita.", vi: "Tôi đã mua giày mới." },
  ], ["quần áo"]),
  d(161, "傘", "かさ", "kasa", ["ô", "dù"], ["danh từ"], ["N5"], true, 1, [
    { jp: "雨なので傘を持って行きます。", kana: "あめなのでかさをもっていきます。", romaji: "Ame na node kasa o motte ikimasu.", vi: "Vì mưa nên tôi mang ô." },
  ], ["đồ dùng"]),
  d(162, "鞄", "かばん", "kaban", ["cặp", "túi"], ["danh từ"], ["N5"], true, 1, [
    { jp: "本を鞄に入れます。", kana: "ほんをかばんにいれます。", romaji: "Hon o kaban ni iremasu.", vi: "Tôi bỏ sách vào cặp." },
  ], ["đồ dùng"], { aliases: ["かばん"] }),
  d(163, "地図", "ちず", "chizu", ["bản đồ"], ["danh từ"], ["N5"], true, 1, [
    { jp: "地図で駅を探します。", kana: "ちずでえきをさがします。", romaji: "Chizu de eki o sagashimasu.", vi: "Tôi tìm nhà ga trên bản đồ." },
  ], ["du lịch"]),
  d(164, "薬", "くすり", "kusuri", ["thuốc"], ["danh từ"], ["N5"], true, 1, [
    { jp: "熱があるので薬を飲みます。", kana: "ねつがあるのでくすりをのみます。", romaji: "Netsu ga aru node kusuri o nomimasu.", vi: "Vì sốt nên tôi uống thuốc." },
  ], ["sức khỏe"], { related: ["熱", "病院"] }),
  d(165, "熱", "ねつ", "netsu", ["sốt", "nhiệt"], ["danh từ"], ["N5"], true, 2, [
    { jp: "少し熱があります。", kana: "すこしねつがあります。", romaji: "Sukoshi netsu ga arimasu.", vi: "Tôi hơi sốt." },
  ], ["sức khỏe"]),
  d(166, "風邪", "かぜ", "kaze", ["cảm lạnh"], ["danh từ"], ["N5"], true, 1, [
    { jp: "風邪をひいたので休みます。", kana: "かぜをひいたのでやすみます。", romaji: "Kaze o hiita node yasumimasu.", vi: "Tôi bị cảm nên nghỉ." },
  ], ["sức khỏe"]),
  d(167, "問題", "もんだい", "mondai", ["vấn đề", "câu hỏi"], ["danh từ"], ["N5"], true, 1, [
    { jp: "この問題は少し難しいです。", kana: "このもんだいはすこしむずかしいです。", romaji: "Kono mondai wa sukoshi muzukashii desu.", vi: "Câu này hơi khó." },
  ], ["học"]),
  d(168, "質問", "しつもん", "shitsumon", ["câu hỏi"], ["danh từ"], ["N5"], true, 1, [
    { jp: "先生に質問があります。", kana: "せんせいにしつもんがあります。", romaji: "Sensei ni shitsumon ga arimasu.", vi: "Tôi có câu hỏi cho thầy cô." },
  ], ["học"]),
  d(169, "誕生日", "たんじょうび", "tanjoubi", ["sinh nhật"], ["danh từ"], ["N5"], true, 1, [
    { jp: "今日は母の誕生日です。", kana: "きょうはははのたんじょうびです。", romaji: "Kyou wa haha no tanjoubi desu.", vi: "Hôm nay là sinh nhật mẹ." },
  ], ["thời gian"]),
  d(170, "結婚", "けっこん", "kekkon", ["kết hôn"], ["danh từ"], ["N4"], true, 2, [
    { jp: "来年結婚します。", kana: "らいねんけっこんします。", romaji: "Rainen kekkon shimasu.", vi: "Năm sau tôi kết hôn." },
  ], ["gia đình"]),
  d(171, "紙", "かみ", "kami", ["giấy"], ["danh từ"], ["N5"], true, 1, [
    { jp: "白い紙に名前を書きます。", kana: "しろいかみになまえをかきます。", romaji: "Shiroi kami ni namae o kakimasu.", vi: "Tôi viết tên lên giấy trắng." },
  ], ["đồ dùng"]),
  d(172, "ペン", "ペン", "pen", ["bút"], ["danh từ"], ["N5"], true, 1, [
    { jp: "赤いペンを貸してください。", kana: "あかいペンをかしてください。", romaji: "Akai pen o kashite kudasai.", vi: "Cho tôi mượn bút đỏ." },
  ], ["đồ dùng", "katakana"]),
  d(173, "新聞", "しんぶん", "shinbun", ["báo"], ["danh từ"], ["N5"], true, 2, [
    { jp: "朝、新聞を読みます。", kana: "あさ、しんぶんをよみます。", romaji: "Asa, shinbun o yomimasu.", vi: "Sáng tôi đọc báo." },
  ], ["đọc"]),
  d(174, "手紙", "てがみ", "tegami", ["thư"], ["danh từ"], ["N5"], true, 2, [
    { jp: "母に手紙を書きます。", kana: "ははにてがみをかきます。", romaji: "Haha ni tegami o kakimasu.", vi: "Tôi viết thư cho mẹ." },
  ], ["liên lạc"]),
  d(175, "荷物", "にもつ", "nimotsu", ["hành lý", "đồ đạc"], ["danh từ"], ["N5"], true, 2, [
    { jp: "荷物が多いのでタクシーに乗ります。", kana: "にもつがおおいのでタクシーにのります。", romaji: "Nimotsu ga ooi node takushii ni norimasu.", vi: "Hành lý nhiều nên tôi đi taxi." },
  ], ["du lịch"]),
  d(176, "財布", "さいふ", "saifu", ["ví"], ["danh từ"], ["N5"], true, 1, [
    { jp: "財布を鞄に入れました。", kana: "さいふをかばんにいれました。", romaji: "Saifu o kaban ni iremashita.", vi: "Tôi bỏ ví vào cặp." },
  ], ["mua sắm"]),
  d(177, "道", "みち", "michi", ["đường"], ["danh từ"], ["N5"], true, 1, [
    { jp: "駅への道を教えてください。", kana: "えきへのみちをおしえてください。", romaji: "Eki e no michi o oshiete kudasai.", vi: "Hãy chỉ đường đến nhà ga." },
  ], ["giao thông"]),
  d(178, "右", "みぎ", "migi", ["phải", "bên phải"], ["danh từ"], ["N5"], true, 1, [
    { jp: "次の角を右へ曲がってください。", kana: "つぎのかどをみぎへまがってください。", romaji: "Tsugi no kado o migi e magatte kudasai.", vi: "Rẽ phải ở góc tiếp theo." },
  ], ["hướng"], { related: ["左"] }),
  d(179, "左", "ひだり", "hidari", ["trái", "bên trái"], ["danh từ"], ["N5"], true, 1, [
    { jp: "銀行は左にあります。", kana: "ぎんこうはひだりにあります。", romaji: "Ginkou wa hidari ni arimasu.", vi: "Ngân hàng ở bên trái." },
  ], ["hướng"], { related: ["右"] }),
  d(180, "前", "まえ", "mae", ["trước"], ["danh từ"], ["N5"], true, 1, [
    { jp: "駅の前で待ちます。", kana: "えきのまえでまちます。", romaji: "Eki no mae de machimasu.", vi: "Tôi đợi trước nhà ga." },
  ], ["hướng"], { related: ["後ろ"] }),
  d(181, "後ろ", "うしろ", "ushiro", ["sau", "phía sau"], ["danh từ"], ["N5"], true, 1, [
    { jp: "私の後ろに座ってください。", kana: "わたしのうしろにすわってください。", romaji: "Watashi no ushiro ni suwatte kudasai.", vi: "Hãy ngồi phía sau tôi." },
  ], ["hướng"], { related: ["前"] }),
  d(182, "上", "うえ", "ue", ["trên"], ["danh từ"], ["N5"], true, 1, [
    { jp: "本は机の上にあります。", kana: "ほんはつくえのうえにあります。", romaji: "Hon wa tsukue no ue ni arimasu.", vi: "Sách ở trên bàn." },
  ], ["hướng"], { related: ["下"] }),
  d(183, "下", "した", "shita", ["dưới"], ["danh từ"], ["N5"], true, 1, [
    { jp: "猫は椅子の下にいます。", kana: "ねこはいすのしたにいます。", romaji: "Neko wa isu no shita ni imasu.", vi: "Con mèo ở dưới ghế." },
  ], ["hướng"], { related: ["上"] }),
  d(184, "中", "なか", "naka", ["trong", "giữa"], ["danh từ"], ["N5"], true, 1, [
    { jp: "鞄の中に財布があります。", kana: "かばんのなかにさいふがあります。", romaji: "Kaban no naka ni saifu ga arimasu.", vi: "Trong cặp có ví." },
  ], ["hướng"], { related: ["外"] }),
  d(185, "外", "そと", "soto", ["ngoài"], ["danh từ"], ["N5"], true, 1, [
    { jp: "子供は外で遊んでいます。", kana: "こどもはそとであそんでいます。", romaji: "Kodomo wa soto de asonde imasu.", vi: "Bọn trẻ đang chơi bên ngoài." },
  ], ["hướng"], { related: ["中"] }),
  d(186, "隣", "となり", "tonari", ["bên cạnh"], ["danh từ"], ["N5"], true, 1, [
    { jp: "銀行の隣に郵便局があります。", kana: "ぎんこうのとなりにゆうびんきょくがあります。", romaji: "Ginkou no tonari ni yuubinkyoku ga arimasu.", vi: "Bên cạnh ngân hàng có bưu điện." },
  ], ["hướng"]),
  d(187, "近く", "ちかく", "chikaku", ["gần"], ["danh từ", "trạng từ"], ["N5"], true, 1, [
    { jp: "駅の近くに住んでいます。", kana: "えきのちかくにすんでいます。", romaji: "Eki no chikaku ni sunde imasu.", vi: "Tôi sống gần nhà ga." },
  ], ["hướng"]),
  d(188, "入口", "いりぐち", "iriguchi", ["lối vào"], ["danh từ"], ["N5"], true, 2, [
    { jp: "駅の入口で待ちましょう。", kana: "えきのいりぐちでまちましょう。", romaji: "Eki no iriguchi de machimashou.", vi: "Hãy đợi ở lối vào nhà ga." },
  ], ["địa điểm"], { related: ["出口"] }),
  d(189, "出口", "でぐち", "deguchi", ["lối ra"], ["danh từ"], ["N5"], true, 2, [
    { jp: "出口はあちらです。", kana: "でぐちはあちらです。", romaji: "Deguchi wa achira desu.", vi: "Lối ra ở phía kia." },
  ], ["địa điểm"], { related: ["入口"] }),
  d(190, "郵便局", "ゆうびんきょく", "yuubinkyoku", ["bưu điện"], ["danh từ"], ["N5"], true, 2, [
    { jp: "手紙を出しに郵便局へ行きます。", kana: "てがみをだしにゆうびんきょくへいきます。", romaji: "Tegami o dashi ni yuubinkyoku e ikimasu.", vi: "Tôi đến bưu điện gửi thư." },
  ], ["địa điểm"]),
  d(191, "ここ", "ここ", "koko", ["ở đây"], ["đại từ"], ["N5"], true, 1, [
    { jp: "ここは図書館です。", kana: "ここはとしょかんです。", romaji: "Koko wa toshokan desu.", vi: "Đây là thư viện." },
  ], ["chỉ định"], { related: ["そこ", "あそこ"] }),
  d(192, "そこ", "そこ", "soko", ["ở đó"], ["đại từ"], ["N5"], true, 1, [
    { jp: "本はそこにあります。", kana: "ほんはそこにあります。", romaji: "Hon wa soko ni arimasu.", vi: "Sách ở chỗ đó." },
  ], ["chỉ định"], { related: ["ここ"] }),
  d(193, "あそこ", "あそこ", "asoko", ["ở kia"], ["đại từ"], ["N5"], true, 1, [
    { jp: "駅はあそこです。", kana: "えきはあそこです。", romaji: "Eki wa asoko desu.", vi: "Nhà ga ở kia." },
  ], ["chỉ định"], { related: ["ここ"] }),
  d(194, "甘い", "あまい", "amai", ["ngọt"], ["tính từ -i"], ["N5"], true, 2, [
    { jp: "このりんごは甘いです。", kana: "このりんごはあまいです。", romaji: "Kono ringo wa amai desu.", vi: "Quả táo này ngọt." },
  ], ["tính từ", "đồ ăn"]),
  d(195, "辛い", "からい", "karai", ["cay"], ["tính từ -i"], ["N5"], true, 2, [
    { jp: "この料理は少し辛いです。", kana: "このりょうりはすこしからいです。", romaji: "Kono ryouri wa sukoshi karai desu.", vi: "Món này hơi cay." },
  ], ["tính từ", "đồ ăn"]),
  d(196, "狭い", "せまい", "semai", ["chật", "hẹp"], ["tính từ -i"], ["N5"], true, 2, [
    { jp: "この部屋は狭いです。", kana: "このへやはせまいです。", romaji: "Kono heya wa semai desu.", vi: "Phòng này chật." },
  ], ["tính từ"], { related: ["広い"] }),
  d(197, "広い", "ひろい", "hiroi", ["rộng"], ["tính từ -i"], ["N5"], true, 1, [
    { jp: "公園はとても広いです。", kana: "こうえんはとてもひろいです。", romaji: "Kouen wa totemo hiroi desu.", vi: "Công viên rất rộng." },
  ], ["tính từ"], { related: ["狭い"] }),
  d(198, "近い", "ちかい", "chikai", ["gần"], ["tính từ -i"], ["N5"], true, 1, [
    { jp: "学校は駅から近いです。", kana: "がっこうはえきからちかいです。", romaji: "Gakkou wa eki kara chikai desu.", vi: "Trường gần nhà ga." },
  ], ["tính từ"], { related: ["遠い"] }),
  d(199, "遠い", "とおい", "tooi", ["xa"], ["tính từ -i"], ["N5"], true, 1, [
    { jp: "空港はここから遠いです。", kana: "くうこうはここからとおいです。", romaji: "Kuukou wa koko kara tooi desu.", vi: "Sân bay ở xa chỗ này." },
  ], ["tính từ"], { related: ["近い"] }),
  d(200, "早い", "はやい", "hayai", ["sớm"], ["tính từ -i"], ["N5"], true, 1, [
    { jp: "今朝は早く起きました。", kana: "けさははやくおきました。", romaji: "Kesa wa hayaku okimashita.", vi: "Sáng nay tôi dậy sớm." },
  ], ["tính từ"], { aliases: ["hayaku"] }),
  d(201, "速い", "はやい", "hayai", ["nhanh"], ["tính từ -i"], ["N5"], true, 1, [
    { jp: "この電車は速いです。", kana: "このでんしゃははやいです。", romaji: "Kono densha wa hayai desu.", vi: "Chuyến tàu này nhanh." },
  ], ["tính từ"]),
  d(202, "遅い", "おそい", "osoi", ["chậm", "muộn"], ["tính từ -i"], ["N5"], true, 1, [
    { jp: "今朝は少し遅かったです。", kana: "けさはすこしおそかったです。", romaji: "Kesa wa sukoshi osokatta desu.", vi: "Sáng nay tôi hơi muộn." },
  ], ["tính từ"]),
  d(203, "多い", "おおい", "ooi", ["nhiều"], ["tính từ -i"], ["N5"], true, 1, [
    { jp: "この町は人が多いです。", kana: "このまちはひとがおおいです。", romaji: "Kono machi wa hito ga ooi desu.", vi: "Thị trấn này đông người." },
  ], ["tính từ"], { related: ["少ない"] }),
  d(204, "少ない", "すくない", "sukunai", ["ít"], ["tính từ -i"], ["N5"], true, 2, [
    { jp: "今日は時間が少ないです。", kana: "きょうはじかんがすくないです。", romaji: "Kyou wa jikan ga sukunai desu.", vi: "Hôm nay tôi ít thời gian." },
  ], ["tính từ"], { related: ["多い"] }),
  d(205, "直ぐ", "すぐ", "sugu", ["ngay", "lập tức"], ["trạng từ"], ["N5"], true, 1, [
    { jp: "すぐ行きます。待ってください。", kana: "すぐいきます。まってください。", romaji: "Sugu ikimasu. Matte kudasai.", vi: "Tôi đi ngay. Hãy đợi." },
  ], ["trạng từ"], { aliases: ["すぐ"] }),
  d(206, "一緒", "いっしょ", "issho", ["cùng nhau"], ["danh từ", "biểu hiện"], ["N5"], true, 1, [
    { jp: "一緒に昼ごはんを食べませんか。", kana: "いっしょにひるごはんをたべませんか。", romaji: "Issho ni hirugohan o tabemasen ka.", vi: "Cùng ăn trưa chứ?" },
  ], ["biểu hiện"]),
  d(207, "大丈夫ですか", "だいじょうぶですか", "daijoubu desu ka", ["bạn có sao không?"], ["biểu hiện"], ["N5"], true, 1, [
    { jp: "大丈夫ですか。少し休みましょう。", kana: "だいじょうぶですか。すこしやすみましょう。", romaji: "Daijoubu desu ka. Sukoshi yasumimashou.", vi: "Bạn có sao không? Nghỉ một chút nhé." },
  ], ["chào hỏi"]),
];
