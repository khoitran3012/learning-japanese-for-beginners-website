import type { Example } from "@/lib/akari/types";

function x(jp: string, kana: string, romaji: string, vi: string): Example {
  return { jp, kana, romaji, vi };
}

/** Extra example sentences keyed by vocab id (on top of the built-in one). */
export const VOCAB_EXTRA_EXAMPLES: Record<string, Example[]> = {
  "v-n5-001": [
    x("こんにちは。今、暇ですか。", "こんにちは。いま、ひまですか。", "Konnichiwa. Ima, hima desu ka.", "Xin chào. Bây giờ bạn có rảnh không?"),
    x("先生が教室でこんにちはと言いました。", "せんせいがきょうしつでこんにちはといいました。", "Sensei ga kyoushitsu de konnichiwa to iimashita.", "Thầy cô đã nói xin chào trong lớp."),
  ],
  "v-n5-002": [
    x("朝、母におはようと言います。", "あさ、ははにおはようといいます。", "Asa, haha ni ohayou to iimasu.", "Buổi sáng tôi nói chào mẹ."),
    x("おはよう。よく眠れましたか。", "おはよう。よくねむれましたか。", "Ohayou. Yoku nemuremashita ka.", "Chào buổi sáng. Bạn ngủ ngon không?"),
  ],
  "v-n5-003": [
    x("夜、友達にこんばんはとメールします。", "よる、ともだちにこんばんはとメールします。", "Yoru, tomodachi ni konbanwa to meeru shimasu.", "Tối tôi nhắn 'chào buổi tối' cho bạn."),
    x("こんばんは。今日は寒かったですね。", "こんばんは。きょうはさむかったですね。", "Konbanwa. Kyou wa samukatta desu ne.", "Chào buổi tối. Hôm nay lạnh nhỉ."),
  ],
  "v-n5-004": [
    x("駅で友だちとさようならをしました。", "えきでともだちとさようならをしました。", "Eki de tomodachi to sayounara o shimashita.", "Tôi đã tạm biệt bạn ở ga."),
    x("また会いましょう。さようなら。", "またあいましょう。さようなら。", "Mata aimashou. Sayounara.", "Hẹn gặp lại. Tạm biệt."),
  ],
  "v-n5-005": [
    x("プレゼントをありがとう。嬉しいです。", "プレゼントをありがとう。うれしいです。", "Purezento o arigatou. Ureshii desu.", "Cảm ơn món quà. Tôi vui lắm."),
    x("手伝ってくれてありがとう。", "てつだってくれてありがとう。", "Tetsudatte kurete arigatou.", "Cảm ơn vì đã giúp tôi."),
  ],
  "v-n5-006": [
    x("すみません、ちょっと待ってください。", "すみません、ちょっとまってください。", "Sumimasen, chotto matte kudasai.", "Xin lỗi, hãy đợi một chút."),
    x("足を踏んでしまいました。すみません。", "あしをふんでしまいました。すみません。", "Ashi o funde shimaimashita. Sumimasen.", "Tôi vô ý giẫm chân. Xin lỗi."),
  ],
  "v-n5-007": [
    x("はい、わかりました。今行きます。", "はい、わかりました。いまいきます。", "Hai, wakarimashita. Ima ikimasu.", "Vâng, tôi hiểu rồi. Tôi đi ngay."),
    x("お茶はいかがですか。はい、お願いします。", "おちゃはいかがですか。はい、おねがいします。", "Ocha wa ikaga desu ka. Hai, onegaishimasu.", "Bạn dùng trà chứ? Vâng, xin hãy cho tôi."),
  ],
  "v-n5-008": [
    x("いいえ、大丈夫です。", "いいえ、だいじょうぶです。", "Iie, daijoubu desu.", "Không, tôi không sao."),
    x("肉は食べますか。いいえ、食べません。", "にくはたべますか。いいえ、たべません。", "Niku wa tabemasu ka. Iie, tabemasen.", "Bạn ăn thịt không? Không, tôi không ăn."),
  ],
  "v-n5-009": [
    x("はじめまして。どうぞよろしくお願いします。", "はじめまして。どうぞよろしくおねがいします。", "Hajimemashite. Douzo yoroshiku onegaishimasu.", "Rất hân hạnh. Mong được chiếu cố."),
    x("昨日パーティーではじめましての人が多かったです。", "きのうパーティーではじめましてのひとがおおかったです。", "Kinou paatii de hajimemashite no hito ga ookatta desu.", "Hôm qua ở tiệc có nhiều người lần đầu gặp."),
  ],
  "v-n5-010": [
    x("どうぞ、先に行ってください。", "どうぞ、さきにいってください。", "Douzo, saki ni itte kudasai.", "Xin mời đi trước."),
    x("コーヒー、どうぞ。", "コーヒー、どうぞ。", "Koohii, douzo.", "Xin mời cà phê."),
  ],
  "v-n5-011": [
    x("家族と一緒にご飯を食べます。", "かぞくといっしょにごはんをたべます。", "Kazoku to issho ni gohan o tabemasu.", "Tôi ăn cơm cùng gia đình."),
    x("私の家族はベトナムにいます。", "わたしのかぞくはベトナムにいます。", "Watashi no kazoku wa Betonamu ni imasu.", "Gia đình tôi ở Việt Nam."),
  ],
  "v-n5-012": [
    x("父はもう帰りました。", "ちちはもうかえりました。", "Chichi wa mou kaerimashita.", "Bố tôi đã về rồi."),
    x("父に手紙を書きます。", "ちちにてがみをかきます。", "Chichi ni tegami o kakimasu.", "Tôi viết thư cho bố."),
  ],
  "v-n5-013": [
    x("母は今、買い物に行きました。", "はははいま、かいものにいきました。", "Haha wa ima, kaimono ni ikimashita.", "Mẹ đang đi mua sắm."),
    x("母の料理は美味しいです。", "ははのりょうりはおいしいです。", "Haha no ryouri wa oishii desu.", "Món của mẹ rất ngon."),
  ],
  "v-n5-014": [
    x("兄は東京の大学に通っています。", "あにはとうきょうのだいがくにかよっています。", "Ani wa Toukyou no daigaku ni kayotte imasu.", "Anh trai học đại học ở Tokyo."),
    x("兄より背が高いです。", "あによりせがたかいです。", "Ani yori se ga takai desu.", "Tôi cao hơn anh trai."),
  ],
  "v-n5-015": [
    x("姉は来月結婚します。", "あねはらいげつけっこんします。", "Ane wa raigetsu kekkon shimasu.", "Chị gái tháng sau kết hôn."),
    x("姉に日本語を習いました。", "あねににほんごをならいました。", "Ane ni nihongo o naraimashita.", "Tôi học tiếng Nhật từ chị."),
  ],
  "v-n5-016": [
    x("弟はまだ小学生です。", "おとうとはまだしょうがくせいです。", "Otouto wa mada shougakusei desu.", "Em trai vẫn còn tiểu học."),
    x("弟とゲームをします。", "おとうととゲームをします。", "Otouto to geemu o shimasu.", "Tôi chơi game với em trai."),
  ],
  "v-n5-017": [
    x("妹はピアノが上手です。", "いもうとはピアノがじょうずです。", "Imouto wa piano ga jouzu desu.", "Em gái chơi piano giỏi."),
    x("妹の誕生日は五月です。", "いもうとのたんじょうびはごがつです。", "Imouto no tanjoubi wa gogatsu desu.", "Sinh nhật em gái là tháng Năm."),
  ],
  "v-n5-018": [
    x("子供の時、よく川で遊びました。", "こどものとき、よくかわであそびました。", "Kodomo no toki, yoku kawa de asobimashita.", "Lúc nhỏ tôi hay chơi ở sông."),
    x("公園に子供がたくさんいます。", "こうえんにこどもがたくさんいます。", "Kouen ni kodomo ga takusan imasu.", "Công viên có rất nhiều trẻ em."),
  ],
  "v-n5-019": [
    x("両親は田舎に住んでいます。", "りょうしんはいなかにすんでいます。", "Ryoushin wa inaka ni sunde imasu.", "Bố mẹ sống ở quê."),
    x("両親にプレゼントをあげました。", "りょうしんにプレゼントをあげました。", "Ryoushin ni purezento o agemashita.", "Tôi tặng quà bố mẹ."),
  ],
  "v-n5-020": [
    x("友達と映画を見に行きます。", "ともだちとえいがをみにいきます。", "Tomodachi to eiga o mi ni ikimasu.", "Tôi đi xem phim với bạn."),
    x("いい友達が三人います。", "いいともだちがさんにんいます。", "Ii tomodachi ga sannin imasu.", "Tôi có ba người bạn tốt."),
  ],
  "v-n5-021": [
    x("学校は九時に始まります。", "がっこうはくじにはじまります。", "Gakkou wa kuji ni hajimarimasu.", "Trường bắt đầu lúc chín giờ."),
    x("雨の日も学校へ行きます。", "あめのひもがっこうへいきます。", "Ame no hi mo gakkou e ikimasu.", "Ngày mưa tôi vẫn đến trường."),
    x("学校で友達に会います。", "がっこうでともだちにあいます。", "Gakkou de tomodachi ni aimasu.", "Tôi gặp bạn ở trường."),
  ],
  "v-n5-022": [
    x("先生に質問してもいいですか。", "せんせいしつもんしてもいいですか。", "Sensei ni shitsumon shite mo ii desu ka.", "Tôi hỏi thầy cô được không?"),
    x("日本語の先生は優しいです。", "にほんごのせんせいはやさしいです。", "Nihongo no sensei wa yasashii desu.", "Giáo viên tiếng Nhật rất dịu dàng."),
  ],
  "v-n5-023": [
    x("あの学生は毎日図書館にいます。", "あのがくせいはまいにちとしょかんにいます。", "Ano gakusei wa mainichi toshokan ni imasu.", "Học sinh kia ngày nào cũng ở thư viện."),
    x("私は大学の学生です。", "わたしはだいがくのがくせいです。", "Watashi wa daigaku no gakusei desu.", "Tôi là sinh viên đại học."),
  ],
  "v-n5-024": [
    x("日本語は面白いですが、漢字が難しいです。", "にほんごはおもしろいですが、かんじがむずかしいです。", "Nihongo wa omoshiroi desu ga, kanji ga muzukashii desu.", "Tiếng Nhật thú vị nhưng kanji khó."),
    x("ゆっくり日本語で話してください。", "ゆっくりにほんごではなしてください。", "Yukkuri nihongo de hanashite kudasai.", "Hãy nói tiếng Nhật chậm giúp tôi."),
  ],
  "v-n5-025": [
    x("毎晩二時間勉強します。", "まいばんにじかんべんきょうします。", "Maiban nijikan benkyou shimasu.", "Mỗi tối tôi học hai tiếng."),
    x("勉強しすぎて頭が痛いです。", "べんきょうしすぎてあたまがいたいです。", "Benkyou shisugite atama ga itai desu.", "Học quá nhiều nên tôi đau đầu."),
  ],
  "v-n5-026": [
    x("この本を図書館で借りました。", "このほんをとしょかんでかりました。", "Kono hon o toshokan de karimashita.", "Tôi mượn quyển này ở thư viện."),
    x("面白い本を紹介してください。", "おもしろいほんをしょうかいしてください。", "Omoshiroi hon o shoukai shite kudasai.", "Hãy giới thiệu một quyển sách hay."),
  ],
  "v-n5-027": [
    x("宿題を忘れないでください。", "しゅくだいをわすれないでください。", "Shukudai o wasurenaide kudasai.", "Đừng quên bài tập."),
    x("今日の宿題はもう終わりました。", "きょうのしゅくだいはもうおわりました。", "Kyou no shukudai wa mou owarimashita.", "Bài tập hôm nay xong rồi."),
  ],
  "v-n5-028": [
    x("教室は二階にあります。", "きょうしつはにかいにあります。", "Kyoushitsu wa nikai ni arimasu.", "Phòng học ở tầng hai."),
    x("教室で静かにしてください。", "きょうしつでしずかにしてください。", "Kyoushitsu de shizuka ni shite kudasai.", "Hãy giữ yên lặng trong lớp."),
  ],
  "v-n5-029": [
    x("電子辞書を使っています。", "でんしじしょをつかっています。", "Denshi jisho o tsukatte imasu.", "Tôi đang dùng từ điển điện tử."),
    x("この辞書はとても便利です。", "このじしょはとてもべんりです。", "Kono jisho wa totemo benri desu.", "Từ điển này rất tiện."),
  ],
  "v-n5-030": [
    x("鉛筆を忘れたので、借りました。", "えんぴつをわすれたので、かりました。", "Enpitsu o wasureta node, karimashita.", "Quên bút chì nên tôi mượn."),
    x("赤い鉛筆で直してください。", "あかいえんぴつでなおしてください。", "Akai enpitsu de naoshite kudasai.", "Hãy sửa bằng bút chì đỏ."),
  ],
  "v-n5-031": [
    x("授業の後で質問します。", "じゅぎょうのあとでしつもんします。", "Jugyou no ato de shitsumon shimasu.", "Sau giờ học tôi sẽ hỏi."),
    x("今日は授業がありません。", "きょうはじゅぎょうがありません。", "Kyou wa jugyou ga arimasen.", "Hôm nay không có tiết học."),
  ],
  "v-n5-032": [
    x("試験は来週の月曜日です。", "しけんはらいしゅうのげつようびです。", "Shiken wa raishuu no getsuyoubi desu.", "Kỳ thi vào thứ Hai tuần sau."),
    x("試験の前に早く寝ます。", "しけんのまえにはやくねます。", "Shiken no mae ni hayaku nemasu.", "Trước thi tôi đi ngủ sớm."),
  ],
  "v-n5-033": [
    x("仕事は大変ですが、楽しいです。", "しごとはたいへんですが、たのしいです。", "Shigoto wa taihen desu ga, tanoshii desu.", "Công việc vất vả nhưng vui."),
    x("仕事が終わったら電話します。", "しごとがおわったらでんわします。", "Shigoto ga owattara denwa shimasu.", "Tan làm tôi sẽ gọi."),
  ],
  "v-n5-034": [
    x("会社まで電車で三十分です。", "かいしゃまででんしゃでさんじゅっぷんです。", "Kaisha made densha de sanjuppun desu.", "Đến công ty mất 30 phút tàu."),
    x("大きい会社で働いています。", "おおきいかいしゃではたらいています。", "Ookii kaisha de hataraite imasu.", "Tôi làm ở công ty lớn."),
  ],
  "v-n5-035": [
    x("兄は会社員です。", "あにはかいしゃいんです。", "Ani wa kaishain desu.", "Anh trai tôi là nhân viên công ty."),
    x("会社員になりたいです。", "かいしゃいんになりたいです。", "Kaishain ni naritai desu.", "Tôi muốn trở thành nhân viên công ty."),
    x("会社員は毎日電車で通勤します。", "かいしゃいんはまいにちでんしゃでつうきんします。", "Kaishain wa mainichi densha de tsuukin shimasu.", "Nhân viên công ty đi làm bằng tàu mỗi ngày."),
  ],
  "v-n5-036": [
    x("熱があるので医者に行きます。", "ねつがあるのでいしゃにいきます。", "Netsu ga aru node isha ni ikimasu.", "Tôi sốt nên đi gặp bác sĩ."),
    x("父は医者です。", "ちちはいしゃです。", "Chichi wa isha desu.", "Bố tôi là bác sĩ."),
    x("いい医者を紹介してください。", "いいいしゃをしょうかいしてください。", "Ii isha o shoukai shite kudasai.", "Hãy giới thiệu giúp tôi một bác sĩ giỏi."),
  ],
  "v-n5-037": [
    x("店員に値段を聞きました。", "てんいんにねだんをききました。", "Ten'in ni nedan o kikimashita.", "Tôi hỏi nhân viên giá tiền."),
    x("あの店員は親切です。", "あのてんいんはしんせつです。", "Ano ten'in wa shinsetsu desu.", "Nhân viên kia rất tử tế."),
    x("店員を呼んでください。", "てんいんをよんでください。", "Ten'in o yonde kudasai.", "Hãy gọi nhân viên giúp tôi."),
  ],
  "v-n5-038": [
    x("兄は銀行で働いています。", "あにはぎんこうではたらいています。", "Ani wa ginkou de hataraite imasu.", "Anh trai làm ở ngân hàng."),
    x("週末も働きますか。", "しゅうまつもはたらきますか。", "Shuumatsu mo hatarakimasu ka.", "Cuối tuần bạn cũng làm việc à?"),
    x("どこで働いていますか。", "どこではたらいていますか。", "Doko de hataraite imasu ka.", "Bạn đang làm việc ở đâu?"),
  ],
  "v-n5-039": [
    x("明日は休みです。", "あしたはやすみです。", "Ashita wa yasumi desu.", "Ngày mai tôi nghỉ."),
    x("休みの日は本を読みます。", "やすみのひはほんをよみます。", "Yasumi no hi wa hon o yomimasu.", "Ngày nghỉ tôi đọc sách."),
    x("来週三日休みがあります。", "らいしゅうみっかやすみがあります。", "Raishuu mikka yasumi ga arimasu.", "Tuần sau tôi có ba ngày nghỉ."),
  ],
  "v-n5-040": [
    x("父はバスの運転手です。", "ちちはバスのうんてんしゅです。", "Chichi wa basu no untenshu desu.", "Bố tôi là tài xế xe buýt."),
    x("運転手に「駅まで」と言いました。", "うんてんしゅに「えきまで」といいました。", "Untenshu ni \"eki made\" to iimashita.", "Tôi nói với tài xế: đến nhà ga."),
    x("運転手は道をよく知っています。", "うんてんしゅはみちをよくしっています。", "Untenshu wa michi o yoku shitte imasu.", "Tài xế thuộc đường lắm."),
  ],
  "v-n5-041": [
    x("今日は日本語の試験です。", "きょうはにほんごのしけんです。", "Kyou wa nihongo no shiken desu.", "Hôm nay có kỳ thi tiếng Nhật."),
    x("今日の天気はいいです。", "きょうのてんきはいいです。", "Kyou no tenki wa ii desu.", "Thời tiết hôm nay đẹp."),
    x("今日は何をしますか。", "きょうはなにをしますか。", "Kyou wa nani o shimasu ka.", "Hôm nay bạn làm gì?"),
  ],
  "v-n5-042": [
    x("明日友達に会います。", "あしたともだちにあいます。", "Ashita tomodachi ni aimasu.", "Ngày mai tôi gặp bạn."),
    x("明日は休みですか。", "あしたはやすみですか。", "Ashita wa yasumi desu ka.", "Ngày mai bạn nghỉ à?"),
    x("明日の朝、早く起きます。", "あしたのあさ、はやくおきます。", "Ashita no asa, hayaku okimasu.", "Sáng mai tôi dậy sớm."),
  ],
  "v-n5-043": [
    x("昨日映画を見ました。", "きのうえいがをみました。", "Kinou eiga o mimashita.", "Hôm qua tôi xem phim."),
    x("昨日はとても寒かったです。", "きのうはとてもさむかったです。", "Kinou wa totemo samukatta desu.", "Hôm qua rất lạnh."),
    x("昨日何を食べましたか。", "きのうなにをたべましたか。", "Kinou nani o tabemashita ka.", "Hôm qua bạn ăn gì?"),
  ],
  "v-n5-044": [
    x("今、何をしていますか。", "いま、なにをしていますか。", "Ima, nani o shite imasu ka.", "Bây giờ bạn đang làm gì?"),
    x("今はちょっと忙しいです。", "いまはちょっといそがしいです。", "Ima wa chotto isogashii desu.", "Bây giờ tôi hơi bận."),
    x("今すぐ行きます。", "いますぐいきます。", "Ima sugu ikimasu.", "Tôi đi ngay bây giờ."),
  ],
  "v-n5-045": [
    x("朝ごはんを食べます。", "あさごはんをたべます。", "Asagohan o tabemasu.", "Tôi ăn sáng."),
    x("朝早く起きます。", "あさはやくおきます。", "Asa hayaku okimasu.", "Buổi sáng tôi dậy sớm."),
    x("朝はコーヒーを飲みます。", "あさはコーヒーをのみます。", "Asa wa koohii o nomimasu.", "Buổi sáng tôi uống cà phê."),
  ],
  "v-n5-046": [
    x("昼に弁当を食べます。", "ひるにべんとうをたべます。", "Hiru ni bentou o tabemasu.", "Trưa tôi ăn cơm hộp."),
    x("昼から授業があります。", "ひるからじゅぎょうがあります。", "Hiru kara jugyou ga arimasu.", "Từ trưa có tiết học."),
    x("昼休みは短いです。", "ひるやすみはみじかいです。", "Hiruyasumi wa mijikai desu.", "Giờ nghỉ trưa ngắn."),
  ],
  "v-n5-047": [
    x("夜、本を読みます。", "よる、ほんをよみます。", "Yoru, hon o yomimasu.", "Tối tôi đọc sách."),
    x("夜は静かです。", "よるはしずかです。", "Yoru wa shizuka desu.", "Ban đêm thì yên tĩnh."),
    x("夜ごはんは七時です。", "よるごはんはしちじです。", "Yorugohan wa shichiji desu.", "Cơm tối lúc bảy giờ."),
  ],
  "v-n5-048": [
    x("毎日日本語を勉強します。", "まいにちにほんごをべんきょうします。", "Mainichi nihongo o benkyou shimasu.", "Mỗi ngày tôi học tiếng Nhật."),
    x("毎日歩いて学校へ行きます。", "まいにちあるいてがっこうへいきます。", "Mainichi aruite gakkou e ikimasu.", "Mỗi ngày tôi đi bộ đến trường."),
    x("毎日水を飲みます。", "まいにちみずをのみます。", "Mainichi mizu o nomimasu.", "Mỗi ngày tôi uống nước."),
  ],
  "v-n5-049": [
    x("月曜日は忙しいです。", "げつようびはいそがしいです。", "Getsuyoubi wa isogashii desu.", "Thứ Hai tôi bận."),
    x("次の月曜日に会いましょう。", "つぎのげつようびにあいましょう。", "Tsugi no getsuyoubi ni aimashou.", "Thứ Hai tới mình gặp nhau nhé."),
    x("月曜日から新しい授業が始まります。", "げつようびからあたらしいじゅぎょうがはじまります。", "Getsuyoubi kara atarashii jugyou ga hajimarimasu.", "Từ thứ Hai bắt đầu tiết học mới."),
  ],
  "v-n5-050": [
    x("日曜日は家族と過ごします。", "にちようびはかぞくとすごします。", "Nichiyoubi wa kazoku to sugoshimasu.", "Chủ nhật tôi ở với gia đình."),
    x("日曜日、公園へ行きます。", "にちようび、こうえんへいきます。", "Nichiyoubi, kouen e ikimasu.", "Chủ nhật tôi ra công viên."),
    x("日曜日はお店が混みます。", "にちようびはおみせがこみます。", "Nichiyoubi wa omise ga komimasu.", "Chủ nhật cửa hàng đông."),
  ],
  "v-n5-051": [
    x("今、何時ですか。", "いま、なんじですか。", "Ima, nanji desu ka.", "Bây giờ là mấy giờ?"),
    x("一時から勉強します。", "いちじからべんきょうします。", "Ichiji kara benkyou shimasu.", "Tôi học từ một giờ."),
    x("授業は二時間です。", "じゅぎょうはにじかんです。", "Jugyou wa nijikan desu.", "Buổi học dài hai tiếng."),
  ],
  "v-n5-052": [
    x("五分待ってください。", "ごふんまってください。", "Gofun matte kudasai.", "Hãy đợi năm phút."),
    x("駅まで十分です。", "えきまでじゅっぷんです。", "Eki made juppun desu.", "Đến ga mất mười phút."),
    x("一分だけ待ってください。", "いっぷんだけまってください。", "Ippun dake matte kudasai.", "Chỉ đợi một phút thôi."),
  ],
  "v-n5-053": [
    x("一週間に三回走ります。", "いっしゅうかんにさんかいはしります。", "Isshuukan ni sankai hashirimasu.", "Một tuần tôi chạy ba lần."),
    x("来週試験があります。", "らいしゅうしけんがあります。", "Raishuu shiken ga arimasu.", "Tuần sau có kỳ thi."),
    x("今週は忙しいです。", "こんしゅうはいそがしいです。", "Konshuu wa isogashii desu.", "Tuần này tôi bận."),
  ],
  "v-n5-054": [
    x("来年日本へ行きます。", "らいねんにほんへいきます。", "Rainen nihon e ikimasu.", "Năm sau tôi đi Nhật."),
    x("今年二十歳です。", "ことしはたちです。", "Kotoshi hatachi desu.", "Năm nay tôi 20 tuổi."),
    x("一年に一度旅行します。", "いちねんにいちどりょこうします。", "Ichinen ni ichido ryokou shimasu.", "Mỗi năm tôi đi du lịch một lần."),
  ],
  "v-n5-055": [
    x("これは一です。", "これはいちです。", "Kore wa ichi desu.", "Đây là một."),
    x("私は一が好きです。", "わたしはいちがすきです。", "Watashi wa ichi ga suki desu.", "Tôi thích một."),
  ],
  "v-n5-056": [
    x("これは二です。", "これはにです。", "Kore wa ni desu.", "Đây là hai."),
    x("私は二が好きです。", "わたしはにがすきです。", "Watashi wa ni ga suki desu.", "Tôi thích hai."),
  ],
  "v-n5-057": [
    x("これは三です。", "これはさんです。", "Kore wa san desu.", "Đây là ba."),
    x("私は三が好きです。", "わたしはさんがすきです。", "Watashi wa san ga suki desu.", "Tôi thích ba."),
  ],
  "v-n5-058": [
    x("これは四です。", "これはよんです。", "Kore wa yon desu.", "Đây là bốn."),
    x("私は四が好きです。", "わたしはよんがすきです。", "Watashi wa yon ga suki desu.", "Tôi thích bốn."),
  ],
  "v-n5-059": [
    x("これは五です。", "これはごです。", "Kore wa go desu.", "Đây là năm."),
    x("私は五が好きです。", "わたしはごがすきです。", "Watashi wa go ga suki desu.", "Tôi thích năm."),
  ],
  "v-n5-060": [
    x("これは六です。", "これはろくです。", "Kore wa roku desu.", "Đây là sáu."),
    x("私は六が好きです。", "わたしはろくがすきです。", "Watashi wa roku ga suki desu.", "Tôi thích sáu."),
  ],
  "v-n5-061": [
    x("これは七です。", "これはななです。", "Kore wa nana desu.", "Đây là bảy."),
    x("私は七が好きです。", "わたしはなながすきです。", "Watashi wa nana ga suki desu.", "Tôi thích bảy."),
  ],
  "v-n5-062": [
    x("これは八です。", "これははちです。", "Kore wa hachi desu.", "Đây là tám."),
    x("私は八が好きです。", "わたしははちがすきです。", "Watashi wa hachi ga suki desu.", "Tôi thích tám."),
  ],
  "v-n5-063": [
    x("これは九です。", "これはきゅうです。", "Kore wa kyuu desu.", "Đây là chín."),
    x("私は九が好きです。", "わたしはきゅうがすきです。", "Watashi wa kyuu ga suki desu.", "Tôi thích chín."),
  ],
  "v-n5-064": [
    x("これは十です。", "これはじゅうです。", "Kore wa juu desu.", "Đây là mười."),
    x("私は十が好きです。", "わたしはじゅうがすきです。", "Watashi wa juu ga suki desu.", "Tôi thích mười."),
  ],
  "v-n5-065": [
    x("これは百です。", "これはひゃくです。", "Kore wa hyaku desu.", "Đây là trăm."),
    x("私は百が好きです。", "わたしはひゃくがすきです。", "Watashi wa hyaku ga suki desu.", "Tôi thích trăm."),
  ],
  "v-n5-066": [
    x("これは千です。", "これはせんです。", "Kore wa sen desu.", "Đây là nghìn."),
    x("私は千が好きです。", "わたしはせんがすきです。", "Watashi wa sen ga suki desu.", "Tôi thích nghìn."),
  ],
  "v-n5-067": [
    x("これは万です。", "これはまんです。", "Kore wa man desu.", "Đây là vạn (mười nghìn)."),
    x("私は万が好きです。", "わたしはまんがすきです。", "Watashi wa man ga suki desu.", "Tôi thích vạn (mười nghìn)."),
  ],
  "v-n5-068": [
    x("これは円です。", "これはえんです。", "Kore wa en desu.", "Đây là yên (tiền Nhật)."),
    x("私は円が好きです。", "わたしはえんがすきです。", "Watashi wa en ga suki desu.", "Tôi thích yên (tiền Nhật)."),
  ],
  "v-n5-069": [
    x("これは家です。", "これはいえです。", "Kore wa ie desu.", "Đây là nhà."),
    x("私は家が好きです。", "わたしはいえがすきです。", "Watashi wa ie ga suki desu.", "Tôi thích nhà."),
  ],
  "v-n5-070": [
    x("これは駅です。", "これはえきです。", "Kore wa eki desu.", "Đây là nhà ga."),
    x("私は駅が好きです。", "わたしはえきがすきです。", "Watashi wa eki ga suki desu.", "Tôi thích nhà ga."),
  ],
  "v-n5-071": [
    x("これは病院です。", "これはびょういんです。", "Kore wa byouin desu.", "Đây là bệnh viện."),
    x("私は病院が好きです。", "わたしはびょういんがすきです。", "Watashi wa byouin ga suki desu.", "Tôi thích bệnh viện."),
  ],
  "v-n5-072": [
    x("これは銀行です。", "これはぎんこうです。", "Kore wa ginkou desu.", "Đây là ngân hàng."),
    x("私は銀行が好きです。", "わたしはぎんこうがすきです。", "Watashi wa ginkou ga suki desu.", "Tôi thích ngân hàng."),
  ],
  "v-n5-073": [
    x("これは公園です。", "これはこうえんです。", "Kore wa kouen desu.", "Đây là công viên."),
    x("私は公園が好きです。", "わたしはこうえんがすきです。", "Watashi wa kouen ga suki desu.", "Tôi thích công viên."),
  ],
  "v-n5-074": [
    x("これは店です。", "これはみせです。", "Kore wa mise desu.", "Đây là cửa hàng."),
    x("私は店が好きです。", "わたしはみせがすきです。", "Watashi wa mise ga suki desu.", "Tôi thích cửa hàng."),
  ],
  "v-n5-075": [
    x("これは図書館です。", "これはとしょかんです。", "Kore wa toshokan desu.", "Đây là thư viện."),
    x("私は図書館が好きです。", "わたしはとしょかんがすきです。", "Watashi wa toshokan ga suki desu.", "Tôi thích thư viện."),
  ],
  "v-n5-076": [
    x("これは空港です。", "これはくうこうです。", "Kore wa kuukou desu.", "Đây là sân bay."),
    x("私は空港が好きです。", "わたしはくうこうがすきです。", "Watashi wa kuukou ga suki desu.", "Tôi thích sân bay."),
  ],
  "v-n5-077": [
    x("これは国です。", "これはくにです。", "Kore wa kuni desu.", "Đây là đất nước."),
    x("私は国が好きです。", "わたしはくにがすきです。", "Watashi wa kuni ga suki desu.", "Tôi thích đất nước."),
  ],
  "v-n5-078": [
    x("これは町です。", "これはまちです。", "Kore wa machi desu.", "Đây là phố / thị trấn."),
    x("私は町が好きです。", "わたしはまちがすきです。", "Watashi wa machi ga suki desu.", "Tôi thích phố / thị trấn."),
  ],
  "v-n5-079": [
    x("朝ごはんに水を食べます。", "あさごはんにみずをたべます。", "Asagohan ni mizu o tabemasu.", "Bữa sáng tôi ăn nước."),
    x("この水は美味しいです。", "このみずはおいしいです。", "Kono mizu wa oishii desu.", "Nước này ngon."),
  ],
  "v-n5-080": [
    x("朝ごはんにご飯を食べます。", "あさごはんにごはんをたべます。", "Asagohan ni gohan o tabemasu.", "Bữa sáng tôi ăn cơm / bữa ăn."),
    x("このご飯は美味しいです。", "このごはんはおいしいです。", "Kono gohan wa oishii desu.", "Cơm / bữa ăn này ngon."),
  ],
  "v-n5-081": [
    x("朝ごはんにパンを食べます。", "あさごはんにパンをたべます。", "Asagohan ni pan o tabemasu.", "Bữa sáng tôi ăn bánh mì."),
    x("このパンは美味しいです。", "このパンはおいしいです。", "Kono pan wa oishii desu.", "Bánh mì này ngon."),
  ],
  "v-n5-082": [
    x("朝ごはんに魚を食べます。", "あさごはんにさかなをたべます。", "Asagohan ni sakana o tabemasu.", "Bữa sáng tôi ăn cá."),
    x("この魚は美味しいです。", "このさかなはおいしいです。", "Kono sakana wa oishii desu.", "Cá này ngon."),
  ],
  "v-n5-083": [
    x("朝ごはんに肉を食べます。", "あさごはんににくをたべます。", "Asagohan ni niku o tabemasu.", "Bữa sáng tôi ăn thịt."),
    x("この肉は美味しいです。", "このにくはおいしいです。", "Kono niku wa oishii desu.", "Thịt này ngon."),
  ],
  "v-n5-084": [
    x("朝ごはんに野菜を食べます。", "あさごはんにやさいをたべます。", "Asagohan ni yasai o tabemasu.", "Bữa sáng tôi ăn rau củ."),
    x("この野菜は美味しいです。", "このやさいはおいしいです。", "Kono yasai wa oishii desu.", "Rau củ này ngon."),
  ],
  "v-n5-085": [
    x("朝ごはんに果物を食べます。", "あさごはんにくだものをたべます。", "Asagohan ni kudamono o tabemasu.", "Bữa sáng tôi ăn trái cây."),
    x("この果物は美味しいです。", "このくだものはおいしいです。", "Kono kudamono wa oishii desu.", "Trái cây này ngon."),
  ],
  "v-n5-086": [
    x("朝ごはんにお茶を食べます。", "あさごはんにおちゃをたべます。", "Asagohan ni ocha o tabemasu.", "Bữa sáng tôi ăn trà."),
    x("このお茶は美味しいです。", "このおちゃはおいしいです。", "Kono ocha wa oishii desu.", "Trà này ngon."),
  ],
  "v-n5-087": [
    x("朝ごはんに牛乳を食べます。", "あさごはんにぎゅうにゅうをたべます。", "Asagohan ni gyuunyuu o tabemasu.", "Bữa sáng tôi ăn sữa bò."),
    x("この牛乳は美味しいです。", "このぎゅうにゅうはおいしいです。", "Kono gyuunyuu wa oishii desu.", "Sữa bò này ngon."),
  ],
  "v-n5-088": [
    x("朝ごはんに卵を食べます。", "あさごはんにたまごをたべます。", "Asagohan ni tamago o tabemasu.", "Bữa sáng tôi ăn trứng."),
    x("この卵は美味しいです。", "このたまごはおいしいです。", "Kono tamago wa oishii desu.", "Trứng này ngon."),
  ],
  "v-n5-089": [
    x("朝ごはんにりんごを食べます。", "あさごはんにりんごをたべます。", "Asagohan ni ringo o tabemasu.", "Bữa sáng tôi ăn táo."),
    x("このりんごは美味しいです。", "このりんごはおいしいです。", "Kono ringo wa oishii desu.", "Táo này ngon."),
  ],
  "v-n5-090": [
    x("朝ごはんに食べ物を食べます。", "あさごはんにたべものをたべます。", "Asagohan ni tabemono o tabemasu.", "Bữa sáng tôi ăn thức ăn."),
    x("この食べ物は美味しいです。", "このたべものはおいしいです。", "Kono tabemono wa oishii desu.", "Thức ăn này ngon."),
  ],
  "v-n5-091": [
    x("今から買います。", "いまからかいます。", "Ima kara kaimasu.", "Từ bây giờ tôi mua."),
    x("もう買った。", "もうかった。", "Mou katta.", "Tôi đã mua rồi."),
    x("買ってもいいですか。", "かってもいいですか。", "katte mo ii desu ka.", "Tôi mua được không?"),
  ],
  "v-n5-092": [
    x("今から売ります。", "いまからうります。", "Ima kara urimasu.", "Từ bây giờ tôi bán."),
    x("もう売った。", "もううった。", "Mou utta.", "Tôi đã bán rồi."),
    x("売ってもいいですか。", "うってもいいですか。", "utte mo ii desu ka.", "Tôi bán được không?"),
  ],
  "v-n5-093": [
    x("店でお金を買います。", "みせでおかねをかいます。", "Mise de okane o kaimasu.", "Tôi mua tiền ở cửa hàng."),
    x("このお金は高いです。", "このおかねはたかいです。", "Kono okane wa takai desu.", "Tiền này đắt."),
  ],
  "v-n5-094": [
    x("今日は高いです。", "きょうはたかいです。", "Kyou wa takai desu.", "Hôm nay đắt / cao."),
    x("この部屋はたかくないです。", "このへやはたかくないです。", "Kono heya wa takakunai desu.", "Phòng này không đắt / cao."),
  ],
  "v-n5-095": [
    x("今日は安いです。", "きょうはやすいです。", "Kyou wa yasui desu.", "Hôm nay rẻ."),
    x("この部屋はやすくないです。", "このへやはやすくないです。", "Kono heya wa yasukunai desu.", "Phòng này không rẻ."),
  ],
  "v-n5-096": [
    x("店で買い物を買います。", "みせでかいものをかいます。", "Mise de kaimono o kaimasu.", "Tôi mua việc mua sắm ở cửa hàng."),
    x("この買い物は高いです。", "このかいものはたかいです。", "Kono kaimono wa takai desu.", "Việc mua sắm này đắt."),
  ],
  "v-n5-097": [
    x("店でスーパーを買います。", "みせでスーパーをかいます。", "Mise de suupaa o kaimasu.", "Tôi mua siêu thị ở cửa hàng."),
    x("このスーパーは高いです。", "このスーパーはたかいです。", "Kono suupaa wa takai desu.", "Siêu thị này đắt."),
  ],
  "v-n5-098": [
    x("店で値段を買います。", "みせでねだんをかいます。", "Mise de nedan o kaimasu.", "Tôi mua giá tiền ở cửa hàng."),
    x("この値段は高いです。", "このねだんはたかいです。", "Kono nedan wa takai desu.", "Giá tiền này đắt."),
  ],
  "v-n5-099": [
    x("電車で学校へ行きます。", "でんしゃでがっこうへいきます。", "Densha de gakkou e ikimasu.", "Tôi đến trường bằng tàu điện."),
    x("電車は何時に来ますか。", "でんしゃはなんじにきますか。", "Densha wa nanji ni kimasu ka.", "Tàu điện đến lúc mấy giờ?"),
  ],
  "v-n5-100": [
    x("バスで学校へ行きます。", "バスでがっこうへいきます。", "Basu de gakkou e ikimasu.", "Tôi đến trường bằng xe buýt."),
    x("バスは何時に来ますか。", "バスはなんじにきますか。", "Basu wa nanji ni kimasu ka.", "Xe buýt đến lúc mấy giờ?"),
  ],
  "v-n5-101": [
    x("車で学校へ行きます。", "くるまでがっこうへいきます。", "Kuruma de gakkou e ikimasu.", "Tôi đến trường bằng ô tô / xe hơi."),
    x("車は何時に来ますか。", "くるまはなんじにきますか。", "Kuruma wa nanji ni kimasu ka.", "Ô tô / xe hơi đến lúc mấy giờ?"),
  ],
  "v-n5-102": [
    x("自転車で学校へ行きます。", "じてんしゃでがっこうへいきます。", "Jitensha de gakkou e ikimasu.", "Tôi đến trường bằng xe đạp."),
    x("自転車は何時に来ますか。", "じてんしゃはなんじにきますか。", "Jitensha wa nanji ni kimasu ka.", "Xe đạp đến lúc mấy giờ?"),
  ],
  "v-n5-103": [
    x("飛行機で学校へ行きます。", "ひこうきでがっこうへいきます。", "Hikouki de gakkou e ikimasu.", "Tôi đến trường bằng máy bay."),
    x("飛行機は何時に来ますか。", "ひこうきはなんじにきますか。", "Hikouki wa nanji ni kimasu ka.", "Máy bay đến lúc mấy giờ?"),
  ],
  "v-n5-104": [
    x("今から歩きます。", "いまからあるきます。", "Ima kara arukimasu.", "Từ bây giờ tôi đi bộ."),
    x("もう歩いた。", "もうあるいた。", "Mou aruita.", "Tôi đã đi bộ rồi."),
    x("歩いてもいいですか。", "あるいてもいいですか。", "aruite mo ii desu ka.", "Tôi đi bộ được không?"),
  ],
  "v-n5-105": [
    x("今から乗ります。", "いまからのります。", "Ima kara norimasu.", "Từ bây giờ tôi lên / đi (xe, tàu)."),
    x("もう乗った。", "もうのった。", "Mou notta.", "Tôi đã lên / đi (xe, tàu) rồi."),
    x("乗ってもいいですか。", "のってもいいですか。", "notte mo ii desu ka.", "Tôi lên / đi (xe, tàu) được không?"),
  ],
  "v-n5-106": [
    x("今から降ります。", "いまからおります。", "Ima kara orimasu.", "Từ bây giờ tôi xuống (xe, tàu)."),
    x("もう降りた。", "もうおりた。", "Mou orita.", "Tôi đã xuống (xe, tàu) rồi."),
    x("降りてもいいですか。", "おりてもいいですか。", "orite mo ii desu ka.", "Tôi xuống (xe, tàu) được không?"),
  ],
  "v-n5-107": [
    x("今日は天気です。", "きょうはてんきです。", "Kyou wa tenki desu.", "Hôm nay là thời tiết."),
    x("天気の日は家にいます。", "てんきのひはいえにいます。", "Tenki no hi wa ie ni imasu.", "Ngày thời tiết tôi ở nhà."),
  ],
  "v-n5-108": [
    x("今日は雨です。", "きょうはあめです。", "Kyou wa ame desu.", "Hôm nay là mưa."),
    x("雨の日は家にいます。", "あめのひはいえにいます。", "Ame no hi wa ie ni imasu.", "Ngày mưa tôi ở nhà."),
  ],
  "v-n5-109": [
    x("今日は雪です。", "きょうはゆきです。", "Kyou wa yuki desu.", "Hôm nay là tuyết."),
    x("雪の日は家にいます。", "ゆきのひはいえにいます。", "Yuki no hi wa ie ni imasu.", "Ngày tuyết tôi ở nhà."),
  ],
  "v-n5-110": [
    x("今日は風です。", "きょうはかぜです。", "Kyou wa kaze desu.", "Hôm nay là gió."),
    x("風の日は家にいます。", "かぜのひはいえにいます。", "Kaze no hi wa ie ni imasu.", "Ngày gió tôi ở nhà."),
  ],
  "v-n5-111": [
    x("今日は暑いです。", "きょうはあついです。", "Kyou wa atsui desu.", "Hôm nay nóng (thời tiết)."),
    x("この部屋はあつくないです。", "このへやはあつくないです。", "Kono heya wa atsukunai desu.", "Phòng này không nóng (thời tiết)."),
  ],
  "v-n5-112": [
    x("今日は寒いです。", "きょうはさむいです。", "Kyou wa samui desu.", "Hôm nay lạnh."),
    x("この部屋はさむくないです。", "このへやはさむくないです。", "Kono heya wa samukunai desu.", "Phòng này không lạnh."),
  ],
  "v-n5-113": [
    x("今日は晴れです。", "きょうははれです。", "Kyou wa hare desu.", "Hôm nay là trời nắng / quang đãng."),
    x("晴れの日は家にいます。", "はれのひはいえにいます。", "Hare no hi wa ie ni imasu.", "Ngày trời nắng / quang đãng tôi ở nhà."),
  ],
  "v-n5-114": [
    x("今日は曇りです。", "きょうはくもりです。", "Kyou wa kumori desu.", "Hôm nay là trời nhiều mây."),
    x("曇りの日は家にいます。", "くもりのひはいえにいます。", "Kumori no hi wa ie ni imasu.", "Ngày trời nhiều mây tôi ở nhà."),
  ],
  "v-n5-115": [
    x("体が痛いです。", "からだがいたいです。", "Karada ga itai desu.", "Cơ thể tôi đau."),
    x("手で体を洗います。", "てでからだをあらいます。", "Te de karada o araimasu.", "Tôi rửa cơ thể."),
  ],
  "v-n5-116": [
    x("頭が痛いです。", "あたまがいたいです。", "Atama ga itai desu.", "Đầu tôi đau."),
    x("手で頭を洗います。", "てであたまをあらいます。", "Te de atama o araimasu.", "Tôi rửa đầu."),
  ],
  "v-n5-117": [
    x("手が痛いです。", "てがいたいです。", "Te ga itai desu.", "Tay tôi đau."),
    x("手で手を洗います。", "てでてをあらいます。", "Te de te o araimasu.", "Tôi rửa tay."),
  ],
  "v-n5-118": [
    x("足が痛いです。", "あしがいたいです。", "Ashi ga itai desu.", "Chân tôi đau."),
    x("手で足を洗います。", "てであしをあらいます。", "Te de ashi o araimasu.", "Tôi rửa chân."),
  ],
  "v-n5-119": [
    x("目が痛いです。", "めがいたいです。", "Me ga itai desu.", "Mắt tôi đau."),
    x("手で目を洗います。", "てでめをあらいます。", "Te de me o araimasu.", "Tôi rửa mắt."),
  ],
  "v-n5-120": [
    x("耳が痛いです。", "みみがいたいです。", "Mimi ga itai desu.", "Tai tôi đau."),
    x("手で耳を洗います。", "てでみみをあらいます。", "Te de mimi o araimasu.", "Tôi rửa tai."),
  ],
  "v-n5-121": [
    x("口が痛いです。", "くちがいたいです。", "Kuchi ga itai desu.", "Miệng tôi đau."),
    x("手で口を洗います。", "てでくちをあらいます。", "Te de kuchi o araimasu.", "Tôi rửa miệng."),
  ],
  "v-n5-122": [
    x("顔が痛いです。", "かおがいたいです。", "Kao ga itai desu.", "Khuôn mặt tôi đau."),
    x("手で顔を洗います。", "てでかおをあらいます。", "Te de kao o araimasu.", "Tôi rửa khuôn mặt."),
  ],
  "v-n5-123": [
    x("私の家に部屋があります。", "わたしのいえにへやがあります。", "Watashi no ie ni heya ga arimasu.", "Nhà tôi có phòng."),
    x("部屋を掃除します。", "へやをそうじします。", "Heya o souji shimasu.", "Tôi dọn phòng."),
  ],
  "v-n5-124": [
    x("私の家にドアがあります。", "わたしのいえにドアがあります。", "Watashi no ie ni doa ga arimasu.", "Nhà tôi có cửa ra vào."),
    x("ドアを掃除します。", "ドアをそうじします。", "Doa o souji shimasu.", "Tôi dọn cửa ra vào."),
  ],
  "v-n5-125": [
    x("私の家に窓があります。", "わたしのいえにまどがあります。", "Watashi no ie ni mado ga arimasu.", "Nhà tôi có cửa sổ."),
    x("窓を掃除します。", "まどをそうじします。", "Mado o souji shimasu.", "Tôi dọn cửa sổ."),
  ],
  "v-n5-126": [
    x("私の家に机があります。", "わたしのいえにつくえがあります。", "Watashi no ie ni tsukue ga arimasu.", "Nhà tôi có bàn học / bàn làm việc."),
    x("机を掃除します。", "つくえをそうじします。", "Tsukue o souji shimasu.", "Tôi dọn bàn học / bàn làm việc."),
  ],
  "v-n5-127": [
    x("私の家に椅子があります。", "わたしのいえにいすがあります。", "Watashi no ie ni isu ga arimasu.", "Nhà tôi có ghế."),
    x("椅子を掃除します。", "いすをそうじします。", "Isu o souji shimasu.", "Tôi dọn ghế."),
  ],
  "v-n5-128": [
    x("私の家にベッドがあります。", "わたしのいえにベッドがあります。", "Watashi no ie ni beddo ga arimasu.", "Nhà tôi có giường."),
    x("ベッドを掃除します。", "ベッドをそうじします。", "Beddo o souji shimasu.", "Tôi dọn giường."),
  ],
  "v-n5-129": [
    x("私の家に台所があります。", "わたしのいえにだいどころがあります。", "Watashi no ie ni daidokoro ga arimasu.", "Nhà tôi có nhà bếp."),
    x("台所を掃除します。", "だいどころをそうじします。", "Daidokoro o souji shimasu.", "Tôi dọn nhà bếp."),
  ],
  "v-n5-130": [
    x("私の家に電気があります。", "わたしのいえにでんきがあります。", "Watashi no ie ni denki ga arimasu.", "Nhà tôi có điện / đèn điện."),
    x("電気を掃除します。", "でんきをそうじします。", "Denki o souji shimasu.", "Tôi dọn điện / đèn điện."),
  ],
  "v-n5-131": [
    x("私の家に鍵があります。", "わたしのいえにかぎがあります。", "Watashi no ie ni kagi ga arimasu.", "Nhà tôi có chìa khóa."),
    x("鍵を掃除します。", "かぎをそうじします。", "Kagi o souji shimasu.", "Tôi dọn chìa khóa."),
  ],
  "v-n5-132": [
    x("私の家にトイレがあります。", "わたしのいえにトイレがあります。", "Watashi no ie ni toire ga arimasu.", "Nhà tôi có nhà vệ sinh."),
    x("トイレを掃除します。", "トイレをそうじします。", "Toire o souji shimasu.", "Tôi dọn nhà vệ sinh."),
  ],
  "v-n5-133": [
    x("今から食べます。", "いまからたべます。", "Ima kara tabemasu.", "Từ bây giờ tôi ăn."),
    x("もう食べた。", "もうたべた。", "Mou tabeta.", "Tôi đã ăn rồi."),
    x("食べてもいいですか。", "たべてもいいですか。", "tabete mo ii desu ka.", "Tôi ăn được không?"),
  ],
  "v-n5-134": [
    x("今から飲みます。", "いまからのみます。", "Ima kara nomimasu.", "Từ bây giờ tôi uống."),
    x("もう飲んだ。", "もうのんだ。", "Mou nonda.", "Tôi đã uống rồi."),
    x("飲んでもいいですか。", "のんでもいいですか。", "nonde mo ii desu ka.", "Tôi uống được không?"),
  ],
  "v-n5-135": [
    x("今から行きます。", "いまからいきます。", "Ima kara ikimasu.", "Từ bây giờ tôi đi."),
    x("もう行った。", "もういった。", "Mou itta.", "Tôi đã đi rồi."),
    x("行ってもいいですか。", "いってもいいですか。", "itte mo ii desu ka.", "Tôi đi được không?"),
  ],
  "v-n5-136": [
    x("今から来ます。", "いまからきます。", "Ima kara kimasu.", "Từ bây giờ tôi đến."),
    x("もう来た。", "もうきた。", "Mou kita.", "Tôi đã đến rồi."),
    x("来てもいいですか。", "きてもいいですか。", "kite mo ii desu ka.", "Tôi đến được không?"),
  ],
  "v-n5-137": [
    x("今から見ます。", "いまからみます。", "Ima kara mimasu.", "Từ bây giờ tôi nhìn / xem."),
    x("もう見た。", "もうみた。", "Mou mita.", "Tôi đã nhìn / xem rồi."),
    x("見てもいいですか。", "みてもいいですか。", "mite mo ii desu ka.", "Tôi nhìn / xem được không?"),
  ],
  "v-n5-138": [
    x("今からします。", "いまからします。", "Ima kara shimasu.", "Từ bây giờ tôi làm."),
    x("もうした。", "もうした。", "Mou shita.", "Tôi đã làm rồi."),
    x("してもいいですか。", "してもいいですか。", "shite mo ii desu ka.", "Tôi làm được không?"),
  ],
  "v-n5-139": [
    x("今から聞きます。", "いまからききます。", "Ima kara kikimasu.", "Từ bây giờ tôi nghe / hỏi."),
    x("もう聞いた。", "もうきいた。", "Mou kiita.", "Tôi đã nghe / hỏi rồi."),
    x("聞いてもいいですか。", "きいてもいいですか。", "kiite mo ii desu ka.", "Tôi nghe / hỏi được không?"),
  ],
  "v-n5-140": [
    x("今から読みます。", "いまからよみます。", "Ima kara yomimasu.", "Từ bây giờ tôi đọc."),
    x("もう読んだ。", "もうよんだ。", "Mou yonda.", "Tôi đã đọc rồi."),
    x("読んでもいいですか。", "よんでもいいですか。", "yonde mo ii desu ka.", "Tôi đọc được không?"),
  ],
  "v-n5-141": [
    x("今から書きます。", "いまからかきます。", "Ima kara kakimasu.", "Từ bây giờ tôi viết."),
    x("もう書いた。", "もうかいた。", "Mou kaita.", "Tôi đã viết rồi."),
    x("書いてもいいですか。", "かいてもいいですか。", "kaite mo ii desu ka.", "Tôi viết được không?"),
  ],
  "v-n5-142": [
    x("今から話します。", "いまからはなします。", "Ima kara hanashimasu.", "Từ bây giờ tôi nói chuyện."),
    x("もう話した。", "もうはなした。", "Mou hanashita.", "Tôi đã nói chuyện rồi."),
    x("話してもいいですか。", "はなしてもいいですか。", "hanashite mo ii desu ka.", "Tôi nói chuyện được không?"),
  ],
  "v-n5-143": [
    x("今から寝ます。", "いまからねます。", "Ima kara nemasu.", "Từ bây giờ tôi ngủ."),
    x("もう寝た。", "もうねた。", "Mou neta.", "Tôi đã ngủ rồi."),
    x("寝てもいいですか。", "ねてもいいですか。", "nete mo ii desu ka.", "Tôi ngủ được không?"),
  ],
  "v-n5-144": [
    x("今から起きます。", "いまからおきます。", "Ima kara okimasu.", "Từ bây giờ tôi thức dậy."),
    x("もう起きた。", "もうおきた。", "Mou okita.", "Tôi đã thức dậy rồi."),
    x("起きてもいいですか。", "おきてもいいですか。", "okite mo ii desu ka.", "Tôi thức dậy được không?"),
  ],
  "v-n5-145": [
    x("今から待ちます。", "いまからまちます。", "Ima kara machimasu.", "Từ bây giờ tôi đợi."),
    x("もう待った。", "もうまった。", "Mou matta.", "Tôi đã đợi rồi."),
    x("待ってもいいですか。", "まってもいいですか。", "matte mo ii desu ka.", "Tôi đợi được không?"),
  ],
  "v-n5-146": [
    x("今から分かります。", "いまからわかります。", "Ima kara wakarimasu.", "Từ bây giờ tôi hiểu."),
    x("もう分かった。", "もうわかった。", "Mou wakatta.", "Tôi đã hiểu rồi."),
    x("分かってもいいですか。", "わかってもいいですか。", "wakatte mo ii desu ka.", "Tôi hiểu được không?"),
  ],
  "v-n5-147": [
    x("今日は大きいです。", "きょうはおおきいです。", "Kyou wa ookii desu.", "Hôm nay to / lớn."),
    x("この部屋はおおきくないです。", "このへやはおおきくないです。", "Kono heya wa ookikunai desu.", "Phòng này không to / lớn."),
  ],
  "v-n5-148": [
    x("今日は小さいです。", "きょうはちいさいです。", "Kyou wa chiisai desu.", "Hôm nay nhỏ."),
    x("この部屋はちいさくないです。", "このへやはちいさくないです。", "Kono heya wa chiisakunai desu.", "Phòng này không nhỏ."),
  ],
  "v-n5-149": [
    x("今日は新しいです。", "きょうはあたらしいです。", "Kyou wa atarashii desu.", "Hôm nay mới."),
    x("この部屋はあたらしくないです。", "このへやはあたらしくないです。", "Kono heya wa atarashikunai desu.", "Phòng này không mới."),
  ],
  "v-n5-150": [
    x("今日は古いです。", "きょうはふるいです。", "Kyou wa furui desu.", "Hôm nay cũ."),
    x("この部屋はふるくないです。", "このへやはふるくないです。", "Kono heya wa furukunai desu.", "Phòng này không cũ."),
  ],
  "v-n5-151": [
    x("今日はいいです。", "きょうはいいです。", "Kyou wa ii desu.", "Hôm nay tốt / hay."),
    x("この部屋はいくないです。", "このへやはいくないです。", "Kono heya wa ikunai desu.", "Phòng này không tốt / hay."),
  ],
  "v-n5-152": [
    x("今日は悪いです。", "きょうはわるいです。", "Kyou wa warui desu.", "Hôm nay xấu / không tốt."),
    x("この部屋はわるくないです。", "このへやはわるくないです。", "Kono heya wa warukunai desu.", "Phòng này không xấu / không tốt."),
  ],
  "v-n5-153": [
    x("今日は難しいです。", "きょうはむずかしいです。", "Kyou wa muzukashii desu.", "Hôm nay khó."),
    x("この部屋はむずかしくないです。", "このへやはむずかしくないです。", "Kono heya wa muzukashikunai desu.", "Phòng này không khó."),
  ],
  "v-n5-154": [
    x("今日は易しいです。", "きょうはやさしいです。", "Kyou wa yasashii desu.", "Hôm nay dễ."),
    x("この部屋はやさしくないです。", "このへやはやさしくないです。", "Kono heya wa yasashikunai desu.", "Phòng này không dễ."),
  ],
  "v-n5-155": [
    x("今日は忙しいです。", "きょうはいそがしいです。", "Kyou wa isogashii desu.", "Hôm nay bận."),
    x("この部屋はいそがしくないです。", "このへやはいそがしくないです。", "Kono heya wa isogashikunai desu.", "Phòng này không bận."),
  ],
  "v-n5-156": [
    x("今日は楽しいです。", "きょうはたのしいです。", "Kyou wa tanoshii desu.", "Hôm nay vui."),
    x("この部屋はたのしくないです。", "このへやはたのしくないです。", "Kono heya wa tanoshikunai desu.", "Phòng này không vui."),
  ],
  "v-n5-157": [
    x("彼はきれいな人です。", "かれはきれいなひとです。", "Kare wa kirei na hito desu.", "Anh ấy là người đẹp / sạch."),
    x("今日はきれいです。", "きょうはきれいです。", "Kyou wa kirei desu.", "Hôm nay đẹp / sạch."),
  ],
  "v-n5-158": [
    x("彼は好きな人です。", "かれはすきなひとです。", "Kare wa suki na hito desu.", "Anh ấy là người thích."),
    x("今日は好きです。", "きょうはすきです。", "Kyou wa suki desu.", "Hôm nay thích."),
  ],
  "v-n5-159": [
    x("彼はとても話します。", "かれはとてもはなします。", "Kare wa totemo hanashimasu.", "Anh ấy nói rất."),
    x("とても歩いてください。", "とてもあるいてください。", "Totemo aruite kudasai.", "Hãy đi rất."),
  ],
  "v-n5-160": [
    x("彼は少し話します。", "かれはすこしはなします。", "Kare wa sukoshi hanashimasu.", "Anh ấy nói một chút."),
    x("少し歩いてください。", "すこしあるいてください。", "Sukoshi aruite kudasai.", "Hãy đi một chút."),
  ],
  "v-n5-161": [
    x("彼はいつも話します。", "かれはいつもはなします。", "Kare wa itsumo hanashimasu.", "Anh ấy nói luôn luôn."),
    x("いつも歩いてください。", "いつもあるいてください。", "Itsumo aruite kudasai.", "Hãy đi luôn luôn."),
  ],
  "v-n5-162": [
    x("彼は時々話します。", "かれはときどきはなします。", "Kare wa tokidoki hanashimasu.", "Anh ấy nói thỉnh thoảng."),
    x("時々歩いてください。", "ときどきあるいてください。", "Tokidoki aruite kudasai.", "Hãy đi thỉnh thoảng."),
  ],
  "v-n5-163": [
    x("彼はゆっくり話します。", "かれはゆっくりはなします。", "Kare wa yukkuri hanashimasu.", "Anh ấy nói chậm rãi / thong thả."),
    x("ゆっくり歩いてください。", "ゆっくりあるいてください。", "Yukkuri aruite kudasai.", "Hãy đi chậm rãi / thong thả."),
  ],
  "v-n5-164": [
    x("彼はよく話します。", "かれはよくはなします。", "Kare wa yoku hanashimasu.", "Anh ấy nói thường / giỏi / kỹ."),
    x("よく歩いてください。", "よくあるいてください。", "Yoku aruite kudasai.", "Hãy đi thường / giỏi / kỹ."),
  ],
  "v-n5-165": [
    x("彼はまだ話します。", "かれはまだはなします。", "Kare wa mada hanashimasu.", "Anh ấy nói vẫn còn / chưa."),
    x("まだ歩いてください。", "まだあるいてください。", "Mada aruite kudasai.", "Hãy đi vẫn còn / chưa."),
  ],
  "v-n5-166": [
    x("彼はもう話します。", "かれはもうはなします。", "Kare wa mou hanashimasu.", "Anh ấy nói đã / nữa."),
    x("もう歩いてください。", "もうあるいてください。", "Mou aruite kudasai.", "Hãy đi đã / nữa."),
  ],
  "v-n5-167": [
    x("私の意味は「tôi」です。", "わたしのいみは「tôi」です。", "Watashi no imi wa \"tôi\" desu.", "Nghĩa của 私 là 'tôi'."),
    x("先生は私の使い方を教えました。", "せんせいはわたしのつかいかたをおしえました。", "Sensei wa watashi no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng 私."),
  ],
  "v-n5-168": [
    x("あなたの意味は「bạn (ngôi hai)」です。", "あなたのいみは「bạn (ngôi hai)」です。", "Anata no imi wa \"bạn (ngôi hai)\" desu.", "Nghĩa của あなた là 'bạn (ngôi hai)'."),
    x("先生はあなたの使い方を教えました。", "せんせいはあなたのつかいかたをおしえました。", "Sensei wa anata no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng あなた."),
  ],
  "v-n5-169": [
    x("彼の意味は「anh ấy」です。", "かれのいみは「anh ấy」です。", "Kare no imi wa \"anh ấy\" desu.", "Nghĩa của 彼 là 'anh ấy'."),
    x("先生は彼の使い方を教えました。", "せんせいはかれのつかいかたをおしえました。", "Sensei wa kare no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng 彼."),
  ],
  "v-n5-170": [
    x("彼女の意味は「cô ấy」です。", "かのじょのいみは「cô ấy」です。", "Kanojo no imi wa \"cô ấy\" desu.", "Nghĩa của 彼女 là 'cô ấy'."),
    x("先生は彼女の使い方を教えました。", "せんせいはかのじょのつかいかたをおしえました。", "Sensei wa kanojo no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng 彼女."),
  ],
  "v-n5-171": [
    x("これの意味は「cái này (gần người nói)」です。", "これのいみは「cái này (gần người nói)」です。", "Kore no imi wa \"cái này (gần người nói)\" desu.", "Nghĩa của これ là 'cái này (gần người nói)'."),
    x("先生はこれの使い方を教えました。", "せんせいはこれのつかいかたをおしえました。", "Sensei wa kore no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng これ."),
  ],
  "v-n5-172": [
    x("それの意味は「cái đó (gần người nghe)」です。", "それのいみは「cái đó (gần người nghe)」です。", "Sore no imi wa \"cái đó (gần người nghe)\" desu.", "Nghĩa của それ là 'cái đó (gần người nghe)'."),
    x("先生はそれの使い方を教えました。", "せんせいはそれのつかいかたをおしえました。", "Sensei wa sore no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng それ."),
  ],
  "v-n5-173": [
    x("あれの意味は「cái kia (xa cả hai)」です。", "あれのいみは「cái kia (xa cả hai)」です。", "Are no imi wa \"cái kia (xa cả hai)\" desu.", "Nghĩa của あれ là 'cái kia (xa cả hai)'."),
    x("先生はあれの使い方を教えました。", "せんせいはあれのつかいかたをおしえました。", "Sensei wa are no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng あれ."),
  ],
  "v-n5-174": [
    x("どれの意味は「cái nào」です。", "どれのいみは「cái nào」です。", "Dore no imi wa \"cái nào\" desu.", "Nghĩa của どれ là 'cái nào'."),
    x("先生はどれの使い方を教えました。", "せんせいはどれのつかいかたをおしえました。", "Sensei wa dore no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng どれ."),
  ],
  "v-n5-175": [
    x("何の意味は「gì / cái gì」です。", "なにのいみは「gì / cái gì」です。", "Nani no imi wa \"gì / cái gì\" desu.", "Nghĩa của 何 là 'gì / cái gì'."),
    x("先生は何の使い方を教えました。", "せんせいはなにのつかいかたをおしえました。", "Sensei wa nani no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng 何."),
  ],
  "v-n5-176": [
    x("誰の意味は「ai」です。", "だれのいみは「ai」です。", "Dare no imi wa \"ai\" desu.", "Nghĩa của 誰 là 'ai'."),
    x("先生は誰の使い方を教えました。", "せんせいはだれのつかいかたをおしえました。", "Sensei wa dare no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng 誰."),
  ],
  "v-n5-177": [
    x("どこの意味は「ở đâu」です。", "どこのいみは「ở đâu」です。", "Doko no imi wa \"ở đâu\" desu.", "Nghĩa của どこ là 'ở đâu'."),
    x("先生はどこの使い方を教えました。", "せんせいはどこのつかいかたをおしえました。", "Sensei wa doko no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng どこ."),
  ],
  "v-n5-178": [
    x("いつの意味は「khi nào」です。", "いつのいみは「khi nào」です。", "Itsu no imi wa \"khi nào\" desu.", "Nghĩa của いつ là 'khi nào'."),
    x("先生はいつの使い方を教えました。", "せんせいはいつのつかいかたをおしえました。", "Sensei wa itsu no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng いつ."),
  ],
  "v-n5-179": [
    x("どうの意味は「như thế nào」です。", "どうのいみは「như thế nào」です。", "Dou no imi wa \"như thế nào\" desu.", "Nghĩa của どう là 'như thế nào'."),
    x("先生はどうの使い方を教えました。", "せんせいはどうのつかいかたをおしえました。", "Sensei wa dou no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng どう."),
  ],
  "v-n5-180": [
    x("なぜの意味は「tại sao」です。", "なぜのいみは「tại sao」です。", "Naze no imi wa \"tại sao\" desu.", "Nghĩa của なぜ là 'tại sao'."),
    x("先生はなぜの使い方を教えました。", "せんせいはなぜのつかいかたをおしえました。", "Sensei wa naze no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng なぜ."),
  ],
  "v-n5-181": [
    x("いくらの意味は「bao nhiêu tiền」です。", "いくらのいみは「bao nhiêu tiền」です。", "Ikura no imi wa \"bao nhiêu tiền\" desu.", "Nghĩa của いくら là 'bao nhiêu tiền'."),
    x("先生はいくらの使い方を教えました。", "せんせいはいくらのつかいかたをおしえました。", "Sensei wa ikura no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng いくら."),
  ],
  "v-n5-182": [
    x("どのの意味は「nào (đi với danh từ)」です。", "どののいみは「nào (đi với danh từ)」です。", "Dono no imi wa \"nào (đi với danh từ)\" desu.", "Nghĩa của どの là 'nào (đi với danh từ)'."),
    x("先生はどのの使い方を教えました。", "せんせいはどののつかいかたをおしえました。", "Sensei wa dono no tsukaikata o oshiemashita.", "Thầy cô đã dạy cách dùng どの."),
  ],
  "v-n5-183": [
    x("私の鞄は色です。", "わたしのかばんはいろです。", "Watashi no kaban wa iro desu.", "Cặp tôi màu màu sắc."),
    x("色の花がきれいです。", "いろのはながきれいです。", "Iro no hana ga kirei desu.", "Hoa màu sắc rất đẹp."),
  ],
  "v-n5-184": [
    x("今日は赤いです。", "きょうはあかいです。", "Kyou wa akai desu.", "Hôm nay màu đỏ."),
    x("この部屋はあかくないです。", "このへやはあかくないです。", "Kono heya wa akakunai desu.", "Phòng này không màu đỏ."),
  ],
  "v-n5-185": [
    x("今日は青いです。", "きょうはあおいです。", "Kyou wa aoi desu.", "Hôm nay màu xanh (biển/trời)."),
    x("この部屋はあおくないです。", "このへやはあおくないです。", "Kono heya wa aokunai desu.", "Phòng này không màu xanh (biển/trời)."),
  ],
  "v-n5-186": [
    x("今日は白いです。", "きょうはしろいです。", "Kyou wa shiroi desu.", "Hôm nay màu trắng."),
    x("この部屋はしろくないです。", "このへやはしろくないです。", "Kono heya wa shirokunai desu.", "Phòng này không màu trắng."),
  ],
  "v-n5-187": [
    x("今日は黒いです。", "きょうはくろいです。", "Kyou wa kuroi desu.", "Hôm nay màu đen."),
    x("この部屋はくろくないです。", "このへやはくろくないです。", "Kono heya wa kurokunai desu.", "Phòng này không màu đen."),
  ],
  "v-n5-188": [
    x("今日は黄色いです。", "きょうはきいろいです。", "Kyou wa kiiroi desu.", "Hôm nay màu vàng."),
    x("この部屋はきいろくないです。", "このへやはきいろくないです。", "Kono heya wa kiirokunai desu.", "Phòng này không màu vàng."),
  ],
  "v-n5-189": [
    x("私の鞄は緑です。", "わたしのかばんはみどりです。", "Watashi no kaban wa midori desu.", "Cặp tôi màu màu xanh lá."),
    x("緑の花がきれいです。", "みどりのはながきれいです。", "Midori no hana ga kirei desu.", "Hoa màu xanh lá rất đẹp."),
  ],
  "v-n5-190": [
    x("今日は優しいです。", "きょうはやさしいです。", "Kyou wa yasashii desu.", "Hôm nay hiền / dịu dàng."),
    x("この部屋はやさしくないです。", "このへやはやさしくないです。", "Kono heya wa yasashikunai desu.", "Phòng này không hiền / dịu dàng."),
  ],
  "v-n5-191": [
    x("彼は親切な人です。", "かれはしんせつなひとです。", "Kare wa shinsetsu na hito desu.", "Anh ấy là người tốt bụng / tử tế."),
    x("今日は親切です。", "きょうはしんせつです。", "Kyou wa shinsetsu desu.", "Hôm nay tốt bụng / tử tế."),
  ],
  "v-n5-192": [
    x("彼は元気な人です。", "かれはげんきなひとです。", "Kare wa genki na hito desu.", "Anh ấy là người khỏe / năng động."),
    x("今日は元気です。", "きょうはげんきです。", "Kyou wa genki desu.", "Hôm nay khỏe / năng động."),
  ],
  "v-n5-193": [
    x("彼は静かな人です。", "かれはしずかなひとです。", "Kare wa shizuka na hito desu.", "Anh ấy là người yên tĩnh."),
    x("今日は静かです。", "きょうはしずかです。", "Kyou wa shizuka desu.", "Hôm nay yên tĩnh."),
  ],
  "v-n5-194": [
    x("今日は面白いです。", "きょうはおもしろいです。", "Kyou wa omoshiroi desu.", "Hôm nay thú vị / vui."),
    x("この部屋はおもしろくないです。", "このへやはおもしろくないです。", "Kono heya wa omoshirokunai desu.", "Phòng này không thú vị / vui."),
  ],
  "v-n5-195": [
    x("彼は真面目な人です。", "かれはまじめなひとです。", "Kare wa majime na hito desu.", "Anh ấy là người nghiêm túc / chăm chỉ."),
    x("今日は真面目です。", "きょうはまじめです。", "Kyou wa majime desu.", "Hôm nay nghiêm túc / chăm chỉ."),
  ],
  "v-n5-196": [
    x("公園で山を見ました。", "こうえんでやまをみました。", "Kouen de yama o mimashita.", "Tôi đã thấy núi ở công viên."),
    x("山が好きです。", "やまがすきです。", "Yama ga suki desu.", "Tôi thích núi."),
  ],
  "v-n5-197": [
    x("公園で川を見ました。", "こうえんでかわをみました。", "Kouen de kawa o mimashita.", "Tôi đã thấy sông ở công viên."),
    x("川が好きです。", "かわがすきです。", "Kawa ga suki desu.", "Tôi thích sông."),
  ],
  "v-n5-198": [
    x("公園で海を見ました。", "こうえんでうみをみました。", "Kouen de umi o mimashita.", "Tôi đã thấy biển ở công viên."),
    x("海が好きです。", "うみがすきです。", "Umi ga suki desu.", "Tôi thích biển."),
  ],
  "v-n5-199": [
    x("公園で空を見ました。", "こうえんでそらをみました。", "Kouen de sora o mimashita.", "Tôi đã thấy bầu trời ở công viên."),
    x("空が好きです。", "そらがすきです。", "Sora ga suki desu.", "Tôi thích bầu trời."),
  ],
  "v-n5-200": [
    x("公園で花を見ました。", "こうえんではなをみました。", "Kouen de hana o mimashita.", "Tôi đã thấy hoa ở công viên."),
    x("花が好きです。", "はながすきです。", "Hana ga suki desu.", "Tôi thích hoa."),
  ],
  "v-n5-201": [
    x("公園で木を見ました。", "こうえんできをみました。", "Kouen de ki o mimashita.", "Tôi đã thấy cây ở công viên."),
    x("木が好きです。", "きがすきです。", "Ki ga suki desu.", "Tôi thích cây."),
  ],
  "v-n5-202": [
    x("公園で犬を見ました。", "こうえんでいぬをみました。", "Kouen de inu o mimashita.", "Tôi đã thấy chó ở công viên."),
    x("犬が好きです。", "いぬがすきです。", "Inu ga suki desu.", "Tôi thích chó."),
  ],
  "v-n5-203": [
    x("公園で猫を見ました。", "こうえんでねこをみました。", "Kouen de neko o mimashita.", "Tôi đã thấy mèo ở công viên."),
    x("猫が好きです。", "ねこがすきです。", "Neko ga suki desu.", "Tôi thích mèo."),
  ],
  "v-n4-001": [
    x("午後に会議があります。", "ごごにかいぎがあります。", "Gogo ni kaigi ga arimasu.", "Chiều có cuộc họp."),
    x("会議は三時に始まります。", "かいぎはさんじにはじまります。", "Kaigi wa sanji ni hajimarimasu.", "Cuộc họp bắt đầu lúc ba giờ."),
    x("会議で発表します。", "かいぎではっぴょうします。", "Kaigi de happyou shimasu.", "Tôi thuyết trình trong cuộc họp."),
  ],
  "v-n4-002": [
    x("試験の準備をします。", "しけんのじゅんびをします。", "Shiken no junbi o shimasu.", "Tôi chuẩn bị cho kỳ thi."),
    x("旅行の準備はもう終わりました。", "りょこうのじゅんびはもうおわりました。", "Ryokou no junbi wa mou owarimashita.", "Chuẩn bị chuyến đi đã xong."),
    x("明日の準備をしてください。", "あしたのじゅんびをしてください。", "Ashita no junbi o shite kudasai.", "Hãy chuẩn bị cho ngày mai."),
  ],
  "v-n4-003": [
    x("日本で働く経験があります。", "にほんではたらくけいけんがあります。", "Nihon de hataraku keiken ga arimasu.", "Tôi có kinh nghiệm làm việc ở Nhật."),
    x("いい経験になりました。", "いいけいけんになりました。", "Ii keiken ni narimashita.", "Đó đã trở thành một trải nghiệm tốt."),
    x("経験を話してください。", "けいけんをはなしてください。", "Keiken o hanashite kudasai.", "Hãy kể kinh nghiệm của bạn."),
  ],
  "v-n4-004": [
    x("先生が文法を説明します。", "せんせいがぶんぽうをせつめいします。", "Sensei ga bunpou o setsumei shimasu.", "Thầy cô giải thích ngữ pháp."),
    x("もう一度説明してください。", "もういちどせつめいしてください。", "Mou ichido setsumei shite kudasai.", "Hãy giải thích lại một lần nữa."),
    x("説明は分かりやすかったです。", "せつめいはわかりやすかったです。", "Setsumei wa wakariyasukatta desu.", "Phần giải thích dễ hiểu."),
  ],
  "v-n4-005": [
    x("あとで連絡します。", "あとでれんらくします。", "Ato de renraku shimasu.", "Tôi sẽ liên lạc sau."),
    x("連絡先を教えてください。", "れんらくさきをおしえてください。", "Renrakusaki o oshiete kudasai.", "Hãy cho tôi thông tin liên lạc."),
    x("まだ連絡がありません。", "まだれんらくがありません。", "Mada renraku ga arimasen.", "Vẫn chưa có liên lạc."),
  ],
  "v-n4-006": [
    x("夏休みに予約へ行きます。", "なつやすみによやくへいきます。", "Natsuyasumi ni yoyaku e ikimasu.", "Nghỉ hè tôi đi đặt chỗ / đặt trước."),
    x("予約の写真を撮りました。", "よやくのしゃしんをとりました。", "Yoyaku no shashin o torimashita.", "Tôi đã chụp ảnh đặt chỗ / đặt trước."),
  ],
  "v-n4-007": [
    x("夏休みの計画を立てます。", "なつやすみのけいかくをたてます。", "Natsuyasumi no keikaku o tatemasu.", "Tôi lập kế hoạch nghỉ hè."),
    x("計画どおりに行きました。", "けいかくどおりにいきました。", "Keikaku doori ni ikimashita.", "Mọi thứ diễn ra đúng kế hoạch."),
    x("旅行の計画はまだです。", "りょこうのけいかくはまだです。", "Ryokou no keikaku wa mada desu.", "Kế hoạch du lịch vẫn chưa xong."),
  ],
  "v-n4-008": [
    x("これは意見です。", "これはいけんです。", "Kore wa iken desu.", "Đây là ý kiến."),
    x("私は意見が好きです。", "わたしはいけんがすきです。", "Watashi wa iken ga suki desu.", "Tôi thích ý kiến."),
  ],
  "v-n4-009": [
    x("これは原因です。", "これはげんいんです。", "Kore wa gen'in desu.", "Đây là nguyên nhân."),
    x("私は原因が好きです。", "わたしはげんいんがすきです。", "Watashi wa gen'in ga suki desu.", "Tôi thích nguyên nhân."),
  ],
  "v-n4-010": [
    x("毎日結果へ行きます。", "まいにちけっかへいきます。", "Mainichi kekka e ikimasu.", "Mỗi ngày tôi đến kết quả."),
    x("結果は大切です。", "けっかはたいせつです。", "Kekka wa taisetsu desu.", "Kết quả thì quan trọng."),
  ],
  "v-n4-011": [
    x("これは気持ちです。", "これはきもちです。", "Kore wa kimochi desu.", "Đây là cảm xúc / tâm trạng."),
    x("私は気持ちが好きです。", "わたしはきもちがすきです。", "Watashi wa kimochi ga suki desu.", "Tôi thích cảm xúc / tâm trạng."),
  ],
  "v-n4-012": [
    x("彼は心配な人です。", "かれはしんぱいなひとです。", "Kare wa shinpai na hito desu.", "Anh ấy là người lo lắng."),
    x("今日は心配です。", "きょうはしんぱいです。", "Kyou wa shinpai desu.", "Hôm nay lo lắng."),
  ],
  "v-n4-013": [
    x("彼は安心な人です。", "かれはあんしんなひとです。", "Kare wa anshin na hito desu.", "Anh ấy là người yên tâm."),
    x("今日は安心です。", "きょうはあんしんです。", "Kyou wa anshin desu.", "Hôm nay yên tâm."),
  ],
  "v-n4-014": [
    x("失敗しても大丈夫です。", "しっぱいしてもだいじょうぶです。", "Shippai shite mo daijoubu desu.", "Thất bại cũng không sao."),
    x("一度失敗しました。", "いちどしっぱいしました。", "Ichido shippai shimashita.", "Tôi đã thất bại một lần."),
    x("失敗から学びます。", "しっぱいからまなびます。", "Shippai kara manabimasu.", "Tôi học từ thất bại."),
  ],
  "v-n4-015": [
    x("実験は成功しました。", "じっけんはせいこうしました。", "Jikken wa seikou shimashita.", "Thí nghiệm đã thành công."),
    x("成功を祈っています。", "せいこうをいのっています。", "Seikou o inotte imasu.", "Tôi cầu chúc thành công."),
    x("成功するまで続けます。", "せいこうするまでつづけます。", "Seikou suru made tsuzukemasu.", "Tôi sẽ làm đến khi thành công."),
  ],
  "v-n4-016": [
    x("今から続けます。", "いまからつづけます。", "Ima kara tsuzukemasu.", "Từ bây giờ tôi tiếp tục."),
    x("もう続けた。", "もうつづけた。", "Mou tsuzuketa.", "Tôi đã tiếp tục rồi."),
    x("続けてもいいですか。", "つづけてもいいですか。", "tsuzukete mo ii desu ka.", "Tôi tiếp tục được không?"),
  ],
  "v-n4-017": [
    x("来月から日本語を始めます。", "らいげつからにほんごをはじめます。", "Raigetsu kara nihongo o hajimemasu.", "Từ tháng sau tôi bắt đầu học tiếng Nhật."),
    x("九時に授業を始めます。", "くじにじゅぎょうをはじめます。", "Kuji ni jugyou o hajimemasu.", "Tiết học bắt đầu lúc chín giờ."),
    x("さあ、始めましょう。", "さあ、はじめましょう。", "Saa, hajimemashou.", "Thôi, bắt đầu nào."),
  ],
  "v-n4-018": [
    x("今から終わります。", "いまからおわります。", "Ima kara owarimasu.", "Từ bây giờ tôi kết thúc."),
    x("もう終わった。", "もうおわった。", "Mou owatta.", "Tôi đã kết thúc rồi."),
    x("終わってもいいですか。", "おわってもいいですか。", "owatte mo ii desu ka.", "Tôi kết thúc được không?"),
  ],
  "v-n4-019": [
    x("今から決めます。", "いまからきめます。", "Ima kara kimemasu.", "Từ bây giờ tôi quyết định."),
    x("もう決めた。", "もうきめた。", "Mou kimeta.", "Tôi đã quyết định rồi."),
    x("決めてもいいですか。", "きめてもいいですか。", "kimete mo ii desu ka.", "Tôi quyết định được không?"),
  ],
  "v-n4-020": [
    x("今から考えます。", "いまからかんがえます。", "Ima kara kangaemasu.", "Từ bây giờ tôi suy nghĩ."),
    x("もう考えた。", "もうかんがえた。", "Mou kangaeta.", "Tôi đã suy nghĩ rồi."),
    x("考えてもいいですか。", "かんがえてもいいですか。", "kangaete mo ii desu ka.", "Tôi suy nghĩ được không?"),
  ],
  "v-n4-021": [
    x("今から思い出します。", "いまからおもいだします。", "Ima kara omoidashimasu.", "Từ bây giờ tôi nhớ lại."),
    x("もう思い出した。", "もうおもいだした。", "Mou omoidashita.", "Tôi đã nhớ lại rồi."),
    x("思い出してもいいですか。", "おもいだしてもいいですか。", "omoidashite mo ii desu ka.", "Tôi nhớ lại được không?"),
  ],
  "v-n4-022": [
    x("今から忘れます。", "いまからわすれます。", "Ima kara wasuremasu.", "Từ bây giờ tôi quên."),
    x("もう忘れた。", "もうわすれた。", "Mou wasureta.", "Tôi đã quên rồi."),
    x("忘れてもいいですか。", "わすれてもいいですか。", "wasurete mo ii desu ka.", "Tôi quên được không?"),
  ],
  "v-n4-023": [
    x("今から届けます。", "いまからとどけます。", "Ima kara todokemasu.", "Từ bây giờ tôi giao / mang đến."),
    x("もう届けた。", "もうとどけた。", "Mou todoketa.", "Tôi đã giao / mang đến rồi."),
    x("届けてもいいですか。", "とどけてもいいですか。", "todokete mo ii desu ka.", "Tôi giao / mang đến được không?"),
  ],
  "v-n4-024": [
    x("今から送ります。", "いまからおくります。", "Ima kara okurimasu.", "Từ bây giờ tôi gửi / tiễn."),
    x("もう送った。", "もうおくった。", "Mou okutta.", "Tôi đã gửi / tiễn rồi."),
    x("送ってもいいですか。", "おくってもいいですか。", "okutte mo ii desu ka.", "Tôi gửi / tiễn được không?"),
  ],
  "v-n4-025": [
    x("今から受けます。", "いまからうけます。", "Ima kara ukemasu.", "Từ bây giờ tôi nhận / thi / chịu."),
    x("もう受けた。", "もううけた。", "Mou uketa.", "Tôi đã nhận / thi / chịu rồi."),
    x("受けてもいいですか。", "うけてもいいですか。", "ukete mo ii desu ka.", "Tôi nhận / thi / chịu được không?"),
  ],
  "v-n4-026": [
    x("今から伝えます。", "いまからつたえます。", "Ima kara tsutaemasu.", "Từ bây giờ tôi truyền đạt / nhắn."),
    x("もう伝えた。", "もうつたえた。", "Mou tsutaeta.", "Tôi đã truyền đạt / nhắn rồi."),
    x("伝えてもいいですか。", "つたえてもいいですか。", "tsutaete mo ii desu ka.", "Tôi truyền đạt / nhắn được không?"),
  ],
  "v-n4-027": [
    x("今から調べます。", "いまからしらべます。", "Ima kara shirabemasu.", "Từ bây giờ tôi tra cứu / điều tra."),
    x("もう調べた。", "もうしらべた。", "Mou shirabeta.", "Tôi đã tra cứu / điều tra rồi."),
    x("調べてもいいですか。", "しらべてもいいですか。", "shirabete mo ii desu ka.", "Tôi tra cứu / điều tra được không?"),
  ],
  "v-n4-028": [
    x("今から比べます。", "いまからくらべます。", "Ima kara kurabemasu.", "Từ bây giờ tôi so sánh."),
    x("もう比べた。", "もうくらべた。", "Mou kurabeta.", "Tôi đã so sánh rồi."),
    x("比べてもいいですか。", "くらべてもいいですか。", "kurabete mo ii desu ka.", "Tôi so sánh được không?"),
  ],
  "v-n4-029": [
    x("今から集めます。", "いまからあつめます。", "Ima kara atsumemasu.", "Từ bây giờ tôi thu thập / tập hợp."),
    x("もう集めた。", "もうあつめた。", "Mou atsumeta.", "Tôi đã thu thập / tập hợp rồi."),
    x("集めてもいいですか。", "あつめてもいいですか。", "atsumete mo ii desu ka.", "Tôi thu thập / tập hợp được không?"),
  ],
  "v-n4-030": [
    x("今から捨てます。", "いまからすてます。", "Ima kara sutemasu.", "Từ bây giờ tôi vứt bỏ."),
    x("もう捨てた。", "もうすてた。", "Mou suteta.", "Tôi đã vứt bỏ rồi."),
    x("捨ててもいいですか。", "すててもいいですか。", "sutete mo ii desu ka.", "Tôi vứt bỏ được không?"),
  ],
  "v-n4-031": [
    x("今から手伝います。", "いまからてつだいます。", "Ima kara tetsudaimasu.", "Từ bây giờ tôi giúp đỡ."),
    x("もう手伝った。", "もうてつだった。", "Mou tetsudatta.", "Tôi đã giúp đỡ rồi."),
    x("手伝ってもいいですか。", "てつだってもいいですか。", "tetsudatte mo ii desu ka.", "Tôi giúp đỡ được không?"),
  ],
  "v-n4-032": [
    x("今から頼みます。", "いまからたのみます。", "Ima kara tanomimasu.", "Từ bây giờ tôi nhờ / yêu cầu."),
    x("もう頼んだ。", "もうたのんだ。", "Mou tanonda.", "Tôi đã nhờ / yêu cầu rồi."),
    x("頼んでもいいですか。", "たのんでもいいですか。", "tanonde mo ii desu ka.", "Tôi nhờ / yêu cầu được không?"),
  ],
  "v-n4-033": [
    x("今から断ります。", "いまからことわります。", "Ima kara kotowarimasu.", "Từ bây giờ tôi từ chối."),
    x("もう断った。", "もうことわった。", "Mou kotowatta.", "Tôi đã từ chối rồi."),
    x("断ってもいいですか。", "ことわってもいいですか。", "kotowatte mo ii desu ka.", "Tôi từ chối được không?"),
  ],
  "v-n4-034": [
    x("今から急ぎます。", "いまからいそぎます。", "Ima kara isogimasu.", "Từ bây giờ tôi vội / gấp."),
    x("もう急いだ。", "もういそいだ。", "Mou isoida.", "Tôi đã vội / gấp rồi."),
    x("急いでもいいですか。", "いそいでもいいですか。", "isoide mo ii desu ka.", "Tôi vội / gấp được không?"),
  ],
  "v-n4-035": [
    x("今から遅れます。", "いまからおくれます。", "Ima kara okuremasu.", "Từ bây giờ tôi trễ."),
    x("もう遅れた。", "もうおくれた。", "Mou okureta.", "Tôi đã trễ rồi."),
    x("遅れてもいいですか。", "おくれてもいいですか。", "okurete mo ii desu ka.", "Tôi trễ được không?"),
  ],
  "v-n4-036": [
    x("今から間に合います。", "いまからまにあいます。", "Ima kara maniaimasu.", "Từ bây giờ tôi kịp giờ."),
    x("もう間に合った。", "もうまにあった。", "Mou maniatta.", "Tôi đã kịp giờ rồi."),
    x("間に合ってもいいですか。", "まにあってもいいですか。", "maniatte mo ii desu ka.", "Tôi kịp giờ được không?"),
  ],
  "v-n4-037": [
    x("今から足ります。", "いまからたります。", "Ima kara tarimasu.", "Từ bây giờ tôi đủ."),
    x("もう足りた。", "もうたりた。", "Mou tarita.", "Tôi đã đủ rồi."),
    x("足りてもいいですか。", "たりてもいいですか。", "tarite mo ii desu ka.", "Tôi đủ được không?"),
  ],
  "v-n4-038": [
    x("今から残ります。", "いまからのこります。", "Ima kara nokorimasu.", "Từ bây giờ tôi còn lại / ở lại."),
    x("もう残った。", "もうのこった。", "Mou nokotta.", "Tôi đã còn lại / ở lại rồi."),
    x("残ってもいいですか。", "のこってもいいですか。", "nokotte mo ii desu ka.", "Tôi còn lại / ở lại được không?"),
  ],
  "v-n4-039": [
    x("今から壊れます。", "いまからこわれます。", "Ima kara kowaremasu.", "Từ bây giờ tôi hỏng / vỡ."),
    x("もう壊れた。", "もうこわれた。", "Mou kowareta.", "Tôi đã hỏng / vỡ rồi."),
    x("壊れてもいいですか。", "こわれてもいいですか。", "kowarete mo ii desu ka.", "Tôi hỏng / vỡ được không?"),
  ],
  "v-n4-040": [
    x("今から直します。", "いまからなおします。", "Ima kara naoshimasu.", "Từ bây giờ tôi sửa."),
    x("もう直した。", "もうなおした。", "Mou naoshita.", "Tôi đã sửa rồi."),
    x("直してもいいですか。", "なおしてもいいですか。", "naoshite mo ii desu ka.", "Tôi sửa được không?"),
  ],
  "v-n4-041": [
    x("彼は必ず話します。", "かれはかならずはなします。", "Kare wa kanarazu hanashimasu.", "Anh ấy nói nhất định."),
    x("必ず歩いてください。", "かならずあるいてください。", "Kanarazu aruite kudasai.", "Hãy đi nhất định."),
  ],
  "v-n4-042": [
    x("彼は特に話します。", "かれはとくにはなします。", "Kare wa tokuni hanashimasu.", "Anh ấy nói đặc biệt là."),
    x("特に歩いてください。", "とくにあるいてください。", "Tokuni aruite kudasai.", "Hãy đi đặc biệt là."),
  ],
  "v-n4-043": [
    x("彼はほとんど話します。", "かれはほとんどはなします。", "Kare wa hotondo hanashimasu.", "Anh ấy nói hầu hết / gần như."),
    x("ほとんど歩いてください。", "ほとんどあるいてください。", "Hotondo aruite kudasai.", "Hãy đi hầu hết / gần như."),
  ],
  "v-n4-044": [
    x("彼はずいぶん話します。", "かれはずいぶんはなします。", "Kare wa zuibun hanashimasu.", "Anh ấy nói khá / nhiều hơn tưởng."),
    x("ずいぶん歩いてください。", "ずいぶんあるいてください。", "Zuibun aruite kudasai.", "Hãy đi khá / nhiều hơn tưởng."),
  ],
  "v-n4-045": [
    x("彼はやっと話します。", "かれはやっとはなします。", "Kare wa yatto hanashimasu.", "Anh ấy nói cuối cùng thì."),
    x("やっと歩いてください。", "やっとあるいてください。", "Yatto aruite kudasai.", "Hãy đi cuối cùng thì."),
  ],
  "v-n4-046": [
    x("彼はなかなか話します。", "かれはなかなかはなします。", "Kare wa nakanaka hanashimasu.", "Anh ấy nói không dễ dàng / khá."),
    x("なかなか歩いてください。", "なかなかあるいてください。", "Nakanaka aruite kudasai.", "Hãy đi không dễ dàng / khá."),
  ],
  "v-n4-047": [
    x("彼はしっかり話します。", "かれはしっかりはなします。", "Kare wa shikkari hanashimasu.", "Anh ấy nói chắc chắn / đàng hoàng."),
    x("しっかり歩いてください。", "しっかりあるいてください。", "Shikkari aruite kudasai.", "Hãy đi chắc chắn / đàng hoàng."),
  ],
  "v-n4-048": [
    x("彼ははっきり話します。", "かれははっきりはなします。", "Kare wa hakkiri hanashimasu.", "Anh ấy nói rõ ràng."),
    x("はっきり歩いてください。", "はっきりあるいてください。", "Hakkiri aruite kudasai.", "Hãy đi rõ ràng."),
  ],
  "v-n4-049": [
    x("彼は不便な人です。", "かれはふべんなひとです。", "Kare wa fuben na hito desu.", "Anh ấy là người bất tiện."),
    x("今日は不便です。", "きょうはふべんです。", "Kyou wa fuben desu.", "Hôm nay bất tiện."),
  ],
  "v-n4-050": [
    x("彼は便利な人です。", "かれはべんりなひとです。", "Kare wa benri na hito desu.", "Anh ấy là người tiện lợi."),
    x("今日は便利です。", "きょうはべんりです。", "Kyou wa benri desu.", "Hôm nay tiện lợi."),
  ],
  "v-n4-051": [
    x("彼は複雑な人です。", "かれはふくざつなひとです。", "Kare wa fukuzatsu na hito desu.", "Anh ấy là người phức tạp."),
    x("今日は複雑です。", "きょうはふくざつです。", "Kyou wa fukuzatsu desu.", "Hôm nay phức tạp."),
  ],
  "v-n4-052": [
    x("彼は簡単な人です。", "かれはかんたんなひとです。", "Kare wa kantan na hito desu.", "Anh ấy là người đơn giản."),
    x("今日は簡単です。", "きょうはかんたんです。", "Kyou wa kantan desu.", "Hôm nay đơn giản."),
  ],
  "v-n4-053": [
    x("彼は安全な人です。", "かれはあんぜんなひとです。", "Kare wa anzen na hito desu.", "Anh ấy là người an toàn."),
    x("今日は安全です。", "きょうはあんぜんです。", "Kyou wa anzen desu.", "Hôm nay an toàn."),
  ],
  "v-n4-054": [
    x("彼は危険な人です。", "かれはきけんなひとです。", "Kare wa kiken na hito desu.", "Anh ấy là người nguy hiểm."),
    x("今日は危険です。", "きょうはきけんです。", "Kyou wa kiken desu.", "Hôm nay nguy hiểm."),
  ],
  "v-n4-055": [
    x("彼は丁寧な人です。", "かれはていねいなひとです。", "Kare wa teinei na hito desu.", "Anh ấy là người lịch sự / cẩn thận."),
    x("今日は丁寧です。", "きょうはていねいです。", "Kyou wa teinei desu.", "Hôm nay lịch sự / cẩn thận."),
  ],
  "v-n4-056": [
    x("彼は大切な人です。", "かれはたいせつなひとです。", "Kare wa taisetsu na hito desu.", "Anh ấy là người quan trọng / quý."),
    x("今日は大切です。", "きょうはたいせつです。", "Kyou wa taisetsu desu.", "Hôm nay quan trọng / quý."),
  ],
  "v-n4-057": [
    x("彼は必要な人です。", "かれはひつようなひとです。", "Kare wa hitsuyou na hito desu.", "Anh ấy là người cần thiết."),
    x("今日は必要です。", "きょうはひつようです。", "Kyou wa hitsuyou desu.", "Hôm nay cần thiết."),
  ],
  "v-n4-058": [
    x("彼は十分な人です。", "かれはじゅうぶんなひとです。", "Kare wa juubun na hito desu.", "Anh ấy là người đủ."),
    x("今日は十分です。", "きょうはじゅうぶんです。", "Kyou wa juubun desu.", "Hôm nay đủ."),
  ],
  "v-n4-059": [
    x("彼は無理な人です。", "かれはむりなひとです。", "Kare wa muri na hito desu.", "Anh ấy là người quá sức / không thể."),
    x("今日は無理です。", "きょうはむりです。", "Kyou wa muri desu.", "Hôm nay quá sức / không thể."),
  ],
  "v-n4-060": [
    x("彼は普通な人です。", "かれはふつうなひとです。", "Kare wa futsuu na hito desu.", "Anh ấy là người bình thường."),
    x("今日は普通です。", "きょうはふつうです。", "Kyou wa futsuu desu.", "Hôm nay bình thường."),
  ],
  "v-n4-061": [
    x("彼は特別な人です。", "かれはとくべつなひとです。", "Kare wa tokubetsu na hito desu.", "Anh ấy là người đặc biệt."),
    x("今日は特別です。", "きょうはとくべつです。", "Kyou wa tokubetsu desu.", "Hôm nay đặc biệt."),
  ],
  "v-n4-062": [
    x("彼は同じな人です。", "かれはおなじなひとです。", "Kare wa onaji na hito desu.", "Anh ấy là người giống nhau."),
    x("今日は同じです。", "きょうはおなじです。", "Kyou wa onaji desu.", "Hôm nay giống nhau."),
  ],
  "v-n4-063": [
    x("今から違います。", "いまからちがいます。", "Ima kara chigaimasu.", "Từ bây giờ tôi khác / sai."),
    x("もう違った。", "もうちがった。", "Mou chigatta.", "Tôi đã khác / sai rồi."),
    x("違ってもいいですか。", "ちがってもいいですか。", "chigatte mo ii desu ka.", "Tôi khác / sai được không?"),
  ],
  "v-n4-064": [
    x("将来は医者になりたいです。", "しょうらいはいしゃになりたいです。", "Shourai wa isha ni naritai desu.", "Tương lai tôi muốn làm bác sĩ."),
    x("将来の夢は何ですか。", "しょうらいのゆめはなんですか。", "Shourai no yume wa nan desu ka.", "Ước mơ tương lai của bạn là gì?"),
    x("将来について話しましょう。", "しょうらいについてはなしましょう。", "Shourai ni tsuite hanashimashou.", "Mình nói về tương lai nhé."),
  ],
  "v-n4-065": [
    x("これは機会です。", "これはきかいです。", "Kore wa kikai desu.", "Đây là cơ hội."),
    x("私は機会が好きです。", "わたしはきかいがすきです。", "Watashi wa kikai ga suki desu.", "Tôi thích cơ hội."),
  ],
  "v-n4-066": [
    x("これは習慣です。", "これはしゅうかんです。", "Kore wa shuukan desu.", "Đây là thói quen."),
    x("私は習慣が好きです。", "わたしはしゅうかんがすきです。", "Watashi wa shuukan ga suki desu.", "Tôi thích thói quen."),
  ],
  "v-n4-067": [
    x("これは規則です。", "これはきそくです。", "Kore wa kisoku desu.", "Đây là nội quy / quy tắc."),
    x("私は規則が好きです。", "わたしはきそくがすきです。", "Watashi wa kisoku ga suki desu.", "Tôi thích nội quy / quy tắc."),
  ],
  "v-n4-068": [
    x("これは文化です。", "これはぶんかです。", "Kore wa bunka desu.", "Đây là văn hóa."),
    x("私は文化が好きです。", "わたしはぶんかがすきです。", "Watashi wa bunka ga suki desu.", "Tôi thích văn hóa."),
  ],
  "v-n4-069": [
    x("毎日歴史へ行きます。", "まいにちれきしへいきます。", "Mainichi rekishi e ikimasu.", "Mỗi ngày tôi đến lịch sử."),
    x("歴史は大切です。", "れきしはたいせつです。", "Rekishi wa taisetsu desu.", "Lịch sử thì quan trọng."),
  ],
  "v-n4-070": [
    x("毎日科学へ行きます。", "まいにちかがくへいきます。", "Mainichi kagaku e ikimasu.", "Mỗi ngày tôi đến khoa học."),
    x("科学は大切です。", "かがくはたいせつです。", "Kagaku wa taisetsu desu.", "Khoa học thì quan trọng."),
  ],
  "v-n4-071": [
    x("これは技術です。", "これはぎじゅつです。", "Kore wa gijutsu desu.", "Đây là kỹ thuật."),
    x("私は技術が好きです。", "わたしはぎじゅつがすきです。", "Watashi wa gijutsu ga suki desu.", "Tôi thích kỹ thuật."),
  ],
  "v-n4-072": [
    x("公園で環境を見ました。", "こうえんでかんきょうをみました。", "Kouen de kankyou o mimashita.", "Tôi đã thấy môi trường ở công viên."),
    x("環境が好きです。", "かんきょうがすきです。", "Kankyou ga suki desu.", "Tôi thích môi trường."),
  ],
  "v-n4-073": [
    x("これは社会です。", "これはしゃかいです。", "Kore wa shakai desu.", "Đây là xã hội."),
    x("私は社会が好きです。", "わたしはしゃかいがすきです。", "Watashi wa shakai ga suki desu.", "Tôi thích xã hội."),
  ],
  "v-n4-074": [
    x("これは経済です。", "これはけいざいです。", "Kore wa keizai desu.", "Đây là kinh tế."),
    x("私は経済が好きです。", "わたしはけいざいがすきです。", "Watashi wa keizai ga suki desu.", "Tôi thích kinh tế."),
  ],
  "v-n4-075": [
    x("これは国際です。", "これはこくさいです。", "Kore wa kokusai desu.", "Đây là quốc tế."),
    x("私は国際が好きです。", "わたしはこくさいがすきです。", "Watashi wa kokusai ga suki desu.", "Tôi thích quốc tế."),
  ],
  "v-n4-076": [
    x("私の家に暖房があります。", "わたしのいえにだんぼうがあります。", "Watashi no ie ni danbou ga arimasu.", "Nhà tôi có máy sưởi / hệ thống sưởi."),
    x("暖房を掃除します。", "だんぼうをそうじします。", "Danbou o souji shimasu.", "Tôi dọn máy sưởi / hệ thống sưởi."),
  ],
  "v-n4-077": [
    x("私の家に冷房があります。", "わたしのいえにれいぼうがあります。", "Watashi no ie ni reibou ga arimasu.", "Nhà tôi có máy lạnh / điều hòa."),
    x("冷房を掃除します。", "れいぼうをそうじします。", "Reibou o souji shimasu.", "Tôi dọn máy lạnh / điều hòa."),
  ],
  "v-n4-078": [
    x("夏休みに案内へ行きます。", "なつやすみにあんないへいきます。", "Natsuyasumi ni annai e ikimasu.", "Nghỉ hè tôi đi hướng dẫn / chỉ đường."),
    x("案内の写真を撮りました。", "あんないのしゃしんをとりました。", "Annai no shashin o torimashita.", "Tôi đã chụp ảnh hướng dẫn / chỉ đường."),
  ],
  "v-n4-079": [
    x("これは紹介です。", "これはしょうかいです。", "Kore wa shoukai desu.", "Đây là giới thiệu."),
    x("私は紹介が好きです。", "わたしはしょうかいがすきです。", "Watashi wa shoukai ga suki desu.", "Tôi thích giới thiệu."),
  ],
  "v-n4-080": [
    x("先生に相談します。", "せんせいにそうだんします。", "Sensei ni soudan shimasu.", "Tôi hỏi ý thầy cô."),
    x("ちょっと相談してもいいですか。", "ちょっとそうだんしてもいいですか。", "Chotto soudan shite mo ii desu ka.", "Cho tôi hỏi ý một chút được không?"),
    x("家族と相談してから決めます。", "かぞくとそうだんしてからきめます。", "Kazoku to soudan shite kara kimemasu.", "Tôi sẽ bàn với gia đình rồi quyết định."),
  ],
  "v-n4-081": [
    x("これは約束です。", "これはやくそくです。", "Kore wa yakusoku desu.", "Đây là lời hứa / hẹn."),
    x("私は約束が好きです。", "わたしはやくそくがすきです。", "Watashi wa yakusoku ga suki desu.", "Tôi thích lời hứa / hẹn."),
  ],
  "v-n4-082": [
    x("メールの返事を書きました。", "メールのへんじをかきました。", "Meeru no henji o kakimashita.", "Tôi đã viết thư trả lời."),
    x("返事はまだ来ません。", "へんじはまだきません。", "Henji wa mada kimasen.", "Vẫn chưa có hồi âm."),
    x("すぐに返事してください。", "すぐにへんじしてください。", "Sugu ni henji shite kudasai.", "Hãy trả lời ngay giúp tôi."),
  ],
  "v-n4-083": [
    x("これは趣味です。", "これはしゅみです。", "Kore wa shumi desu.", "Đây là sở thích."),
    x("私は趣味が好きです。", "わたしはしゅみがすきです。", "Watashi wa shumi ga suki desu.", "Tôi thích sở thích."),
  ],
  "v-n4-084": [
    x("毎日漫画へ行きます。", "まいにちまんがへいきます。", "Mainichi manga e ikimasu.", "Mỗi ngày tôi đến truyện tranh."),
    x("漫画は大切です。", "まんがはたいせつです。", "Manga wa taisetsu desu.", "Truyện tranh thì quan trọng."),
  ],
  "v-n4-085": [
    x("毎日小説へ行きます。", "まいにちしょうせつへいきます。", "Mainichi shousetsu e ikimasu.", "Mỗi ngày tôi đến tiểu thuyết."),
    x("小説は大切です。", "しょうせつはたいせつです。", "Shousetsu wa taisetsu desu.", "Tiểu thuyết thì quan trọng."),
  ],
  "v-n4-086": [
    x("これは番組です。", "これはばんぐみです。", "Kore wa bangumi desu.", "Đây là chương trình (TV)."),
    x("私は番組が好きです。", "わたしはばんぐみがすきです。", "Watashi wa bangumi ga suki desu.", "Tôi thích chương trình (TV)."),
  ],
  "v-n4-087": [
    x("土曜日にサッカーの試合があります。", "どようびにサッカーのしあいがあります。", "Doyoubi ni sakkaa no shiai ga arimasu.", "Thứ Bảy có trận bóng đá."),
    x("試合に勝ちました。", "しあいにかちました。", "Shiai ni kachimashita.", "Chúng tôi thắng trận."),
    x("試合を見に行きませんか。", "しあいをみにいきませんか。", "Shiai o mi ni ikimasen ka.", "Đi xem trận đấu không?"),
  ],
  "v-n4-088": [
    x("これは参加です。", "これはさんかです。", "Kore wa sanka desu.", "Đây là tham gia."),
    x("私は参加が好きです。", "わたしはさんかがすきです。", "Watashi wa sanka ga suki desu.", "Tôi thích tham gia."),
  ],
  "v-n4-089": [
    x("出発で学校へ行きます。", "しゅっぱつでがっこうへいきます。", "Shuppatsu de gakkou e ikimasu.", "Tôi đến trường bằng xuất phát."),
    x("出発は何時に来ますか。", "しゅっぱつはなんじにきますか。", "Shuppatsu wa nanji ni kimasu ka.", "Xuất phát đến lúc mấy giờ?"),
  ],
  "v-n4-090": [
    x("到着で学校へ行きます。", "とうちゃくでがっこうへいきます。", "Touchaku de gakkou e ikimasu.", "Tôi đến trường bằng đến nơi."),
    x("到着は何時に来ますか。", "とうちゃくはなんじにきますか。", "Touchaku wa nanji ni kimasu ka.", "Đến nơi đến lúc mấy giờ?"),
  ],
  "v-n4-091": [
    x("今から引っ越します。", "いまからひっこします。", "Ima kara hikkoshimasu.", "Từ bây giờ tôi chuyển nhà."),
    x("もう引っ越した。", "もうひっこした。", "Mou hikkoshita.", "Tôi đã chuyển nhà rồi."),
    x("引っ越してもいいですか。", "ひっこしてもいいですか。", "hikkoshite mo ii desu ka.", "Tôi chuyển nhà được không?"),
  ],
  "v-n4-092": [
    x("今から増えます。", "いまからふえます。", "Ima kara fuemasu.", "Từ bây giờ tôi tăng lên."),
    x("もう増えた。", "もうふえた。", "Mou fueta.", "Tôi đã tăng lên rồi."),
    x("増えてもいいですか。", "ふえてもいいですか。", "fuete mo ii desu ka.", "Tôi tăng lên được không?"),
  ],
  "v-n4-093": [
    x("今から減ります。", "いまからへります。", "Ima kara herimasu.", "Từ bây giờ tôi giảm đi."),
    x("もう減った。", "もうへった。", "Mou hetta.", "Tôi đã giảm đi rồi."),
    x("減ってもいいですか。", "へってもいいですか。", "hette mo ii desu ka.", "Tôi giảm đi được không?"),
  ],
  "v-n4-094": [
    x("今から触ります。", "いまからさわります。", "Ima kara sawarimasu.", "Từ bây giờ tôi chạm vào."),
    x("もう触った。", "もうさわった。", "Mou sawatta.", "Tôi đã chạm vào rồi."),
    x("触ってもいいですか。", "さわってもいいですか。", "sawatte mo ii desu ka.", "Tôi chạm vào được không?"),
  ],
  "v-n4-095": [
    x("今から落ちます。", "いまからおちます。", "Ima kara ochimasu.", "Từ bây giờ tôi rơi / trượt."),
    x("もう落ちた。", "もうおちた。", "Mou ochita.", "Tôi đã rơi / trượt rồi."),
    x("落ちてもいいですか。", "おちてもいいですか。", "ochite mo ii desu ka.", "Tôi rơi / trượt được không?"),
  ],
  "v-n4-096": [
    x("今から拾います。", "いまからひろいます。", "Ima kara hiroimasu.", "Từ bây giờ tôi nhặt."),
    x("もう拾った。", "もうひろった。", "Mou hirotta.", "Tôi đã nhặt rồi."),
    x("拾ってもいいですか。", "ひろってもいいですか。", "hirotte mo ii desu ka.", "Tôi nhặt được không?"),
  ],
  "v-n4-097": [
    x("今から点けます。", "いまからつけます。", "Ima kara tsukemasu.", "Từ bây giờ tôi bật (đèn, máy)."),
    x("もう点けた。", "もうつけた。", "Mou tsuketa.", "Tôi đã bật (đèn, máy) rồi."),
    x("点けてもいいですか。", "つけてもいいですか。", "tsukete mo ii desu ka.", "Tôi bật (đèn, máy) được không?"),
  ],
  "v-n4-098": [
    x("今から消します。", "いまからけします。", "Ima kara keshimasu.", "Từ bây giờ tôi tắt / xóa."),
    x("もう消した。", "もうけした。", "Mou keshita.", "Tôi đã tắt / xóa rồi."),
    x("消してもいいですか。", "けしてもいいですか。", "keshite mo ii desu ka.", "Tôi tắt / xóa được không?"),
  ],
  "v-n4-099": [
    x("今から開きます。", "いまからあきます。", "Ima kara akimasu.", "Từ bây giờ tôi mở (tự mở / mở cửa)."),
    x("もう開いた。", "もうあいた。", "Mou aita.", "Tôi đã mở (tự mở / mở cửa) rồi."),
    x("開いてもいいですか。", "あいてもいいですか。", "aite mo ii desu ka.", "Tôi mở (tự mở / mở cửa) được không?"),
  ],
  "v-n4-100": [
    x("今から閉まります。", "いまからしまります。", "Ima kara shimarimasu.", "Từ bây giờ tôi đóng lại."),
    x("もう閉まった。", "もうしまった。", "Mou shimatta.", "Tôi đã đóng lại rồi."),
    x("閉まってもいいですか。", "しまってもいいですか。", "shimatte mo ii desu ka.", "Tôi đóng lại được không?"),
  ],
  "v-n4-101": [
    x("これは注意です。", "これはちゅういです。", "Kore wa chuui desu.", "Đây là chú ý / cảnh báo."),
    x("私は注意が好きです。", "わたしはちゅういがすきです。", "Watashi wa chuui ga suki desu.", "Tôi thích chú ý / cảnh báo."),
  ],
  "v-n4-102": [
    x("毎日意味へ行きます。", "まいにちいみへいきます。", "Mainichi imi e ikimasu.", "Mỗi ngày tôi đến ý nghĩa."),
    x("意味は大切です。", "いみはたいせつです。", "Imi wa taisetsu desu.", "Ý nghĩa thì quan trọng."),
  ],
  "v-n4-103": [
    x("時間を確認してください。", "じかんをかくにんしてください。", "Jikan o kakunin shite kudasai.", "Hãy kiểm tra lại giờ."),
    x("予約を確認します。", "よやくをかくにんします。", "Yoyaku o kakunin shimasu.", "Tôi xác nhận đặt chỗ."),
    x("名前を確認してもいいですか。", "なまえをかくにんしてもいいですか。", "Namae o kakunin shite mo ii desu ka.", "Cho tôi xác nhận tên được không?"),
  ],
};
