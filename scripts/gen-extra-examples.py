#!/usr/bin/env python3
"""Generate extra example TypeScript for Akari vocab + kanji usage."""
from __future__ import annotations
import json
import re
from pathlib import Path

GODAN_I = {"う":"い","く":"き","ぐ":"ぎ","す":"し","つ":"ち","ぬ":"に","ぶ":"び","む":"み","る":"り"}
GODAN_TE = {"う":"って","つ":"って","る":"って","む":"んで","ぶ":"んで","ぬ":"んで","く":"いて","ぐ":"いで","す":"して"}
GODAN_TA = {"う":"った","つ":"った","る":"った","む":"んだ","ぶ":"んだ","ぬ":"んだ","く":"いた","ぐ":"いだ","す":"した"}

IRREG = {
    "する": ("します", "して", "した"),
    "くる": ("きます", "きて", "きた"),
    "来る": ("来ます", "来て", "来た"),
}

def masu_te_ta(word: str, kana: str, pos: str):
    if kana in IRREG: return IRREG[kana]
    if word in IRREG: return IRREG[word]
    if kana.endswith("する"):
        pre = kana[:-2]
        return pre+"します", pre+"して", pre+"した"
    group2 = "nhóm 2" in pos or (word.endswith("る") and kana[-2:-1] in "いきぎじちびぴえけげせぜてでねべぺ")
    if "động từ" in pos and group2 and kana.endswith("る"):
        s = kana[:-1]
        return s+"ます", s+"て", s+"た"
    end = kana[-1]
    if kana in ("いく","行く") or word == "行く":
        return "いきます", "いって", "いった"
    if end in GODAN_I:
        s = kana[:-1]
        return s+GODAN_I[end]+"ます", s+GODAN_TE[end], s+GODAN_TA[end]
    return kana+"ます", kana, kana

def r(romaji: str) -> str:
    return romaji[:1].upper() + romaji[1:] if romaji else romaji

HAND: dict[str, list[tuple[str,str,str,str]]] = {}

# --- greetings N5 1-10 ---
HAND["v-n5-001"] = [
    ("こんにちは。今、暇ですか。", "こんにちは。いま、ひまですか。", "Konnichiwa. Ima, hima desu ka.", "Xin chào. Bây giờ bạn có rảnh không?"),
    ("先生が教室でこんにちはと言いました。", "せんせいがきょうしつでこんにちはといいました。", "Sensei ga kyoushitsu de konnichiwa to iimashita.", "Thầy cô đã nói xin chào trong lớp."),
]
HAND["v-n5-002"] = [
    ("朝、母におはようと言います。", "あさ、ははにおはようといいます。", "Asa, haha ni ohayou to iimasu.", "Buổi sáng tôi nói chào mẹ."),
    ("おはよう。よく眠れましたか。", "おはよう。よくねむれましたか。", "Ohayou. Yoku nemuremashita ka.", "Chào buổi sáng. Bạn ngủ ngon không?"),
]
HAND["v-n5-003"] = [
    ("夜、友達にこんばんはとメールします。", "よる、ともだちにこんばんはとメールします。", "Yoru, tomodachi ni konbanwa to meeru shimasu.", "Tối tôi nhắn 'chào buổi tối' cho bạn."),
    ("こんばんは。今日は寒かったですね。", "こんばんは。きょうはさむかったですね。", "Konbanwa. Kyou wa samukatta desu ne.", "Chào buổi tối. Hôm nay lạnh nhỉ."),
]
HAND["v-n5-004"] = [
    ("駅で友だちとさようならをしました。", "えきでともだちとさようならをしました。", "Eki de tomodachi to sayounara o shimashita.", "Tôi đã tạm biệt bạn ở ga."),
    ("また会いましょう。さようなら。", "またあいましょう。さようなら。", "Mata aimashou. Sayounara.", "Hẹn gặp lại. Tạm biệt."),
]
HAND["v-n5-005"] = [
    ("プレゼントをありがとう。嬉しいです。", "プレゼントをありがとう。うれしいです。", "Purezento o arigatou. Ureshii desu.", "Cảm ơn món quà. Tôi vui lắm."),
    ("手伝ってくれてありがとう。", "てつだってくれてありがとう。", "Tetsudatte kurete arigatou.", "Cảm ơn vì đã giúp tôi."),
]
HAND["v-n5-006"] = [
    ("すみません、ちょっと待ってください。", "すみません、ちょっとまってください。", "Sumimasen, chotto matte kudasai.", "Xin lỗi, hãy đợi một chút."),
    ("足を踏んでしまいました。すみません。", "あしをふんでしまいました。すみません。", "Ashi o funde shimaimashita. Sumimasen.", "Tôi vô ý giẫm chân. Xin lỗi."),
]
HAND["v-n5-007"] = [
    ("はい、わかりました。今行きます。", "はい、わかりました。いまいきます。", "Hai, wakarimashita. Ima ikimasu.", "Vâng, tôi hiểu rồi. Tôi đi ngay."),
    ("お茶はいかがですか。はい、お願いします。", "おちゃはいかがですか。はい、おねがいします。", "Ocha wa ikaga desu ka. Hai, onegaishimasu.", "Bạn dùng trà chứ? Vâng, xin hãy cho tôi."),
]
HAND["v-n5-008"] = [
    ("いいえ、大丈夫です。", "いいえ、だいじょうぶです。", "Iie, daijoubu desu.", "Không, tôi không sao."),
    ("肉は食べますか。いいえ、食べません。", "にくはたべますか。いいえ、たべません。", "Niku wa tabemasu ka. Iie, tabemasen.", "Bạn ăn thịt không? Không, tôi không ăn."),
]
HAND["v-n5-009"] = [
    ("はじめまして。どうぞよろしくお願いします。", "はじめまして。どうぞよろしくおねがいします。", "Hajimemashite. Douzo yoroshiku onegaishimasu.", "Rất hân hạnh. Mong được chiếu cố."),
    ("昨日パーティーではじめましての人が多かったです。", "きのうパーティーではじめましてのひとがおおかったです。", "Kinou paatii de hajimemashite no hito ga ookatta desu.", "Hôm qua ở tiệc có nhiều người lần đầu gặp."),
]
HAND["v-n5-010"] = [
    ("どうぞ、先に行ってください。", "どうぞ、さきにいってください。", "Douzo, saki ni itte kudasai.", "Xin mời đi trước."),
    ("コーヒー、どうぞ。", "コーヒー、どうぞ。", "Koohii, douzo.", "Xin mời cà phê."),
]
HAND["v-n5-011"] = [
    ("家族と一緒にご飯を食べます。", "かぞくといっしょにごはんをたべます。", "Kazoku to issho ni gohan o tabemasu.", "Tôi ăn cơm cùng gia đình."),
    ("私の家族はベトナムにいます。", "わたしのかぞくはベトナムにいます。", "Watashi no kazoku wa Betonamu ni imasu.", "Gia đình tôi ở Việt Nam."),
]
HAND["v-n5-012"] = [
    ("父はもう帰りました。", "ちちはもうかえりました。", "Chichi wa mou kaerimashita.", "Bố tôi đã về rồi."),
    ("父に手紙を書きます。", "ちちにてがみをかきます。", "Chichi ni tegami o kakimasu.", "Tôi viết thư cho bố."),
]
HAND["v-n5-013"] = [
    ("母は今、買い物に行きました。", "はははいま、かいものにいきました。", "Haha wa ima, kaimono ni ikimashita.", "Mẹ đang đi mua sắm."),
    ("母の料理は美味しいです。", "ははのりょうりはおいしいです。", "Haha no ryouri wa oishii desu.", "Món của mẹ rất ngon."),
]
HAND["v-n5-014"] = [
    ("兄は東京の大学に通っています。", "あにはとうきょうのだいがくにかよっています。", "Ani wa Toukyou no daigaku ni kayotte imasu.", "Anh trai học đại học ở Tokyo."),
    ("兄より背が高いです。", "あによりせがたかいです。", "Ani yori se ga takai desu.", "Tôi cao hơn anh trai."),
]
HAND["v-n5-015"] = [
    ("姉は来月結婚します。", "あねはらいげつけっこんします。", "Ane wa raigetsu kekkon shimasu.", "Chị gái tháng sau kết hôn."),
    ("姉に日本語を習いました。", "あねににほんごをならいました。", "Ane ni nihongo o naraimashita.", "Tôi học tiếng Nhật từ chị."),
]
HAND["v-n5-016"] = [
    ("弟はまだ小学生です。", "おとうとはまだしょうがくせいです。", "Otouto wa mada shougakusei desu.", "Em trai vẫn còn tiểu học."),
    ("弟とゲームをします。", "おとうととゲームをします。", "Otouto to geemu o shimasu.", "Tôi chơi game với em trai."),
]
HAND["v-n5-017"] = [
    ("妹はピアノが上手です。", "いもうとはピアノがじょうずです。", "Imouto wa piano ga jouzu desu.", "Em gái chơi piano giỏi."),
    ("妹の誕生日は五月です。", "いもうとのたんじょうびはごがつです。", "Imouto no tanjoubi wa gogatsu desu.", "Sinh nhật em gái là tháng Năm."),
]
HAND["v-n5-018"] = [
    ("子供の時、よく川で遊びました。", "こどものとき、よくかわであそびました。", "Kodomo no toki, yoku kawa de asobimashita.", "Lúc nhỏ tôi hay chơi ở sông."),
    ("公園に子供がたくさんいます。", "こうえんにこどもがたくさんいます。", "Kouen ni kodomo ga takusan imasu.", "Công viên có rất nhiều trẻ em."),
]
HAND["v-n5-019"] = [
    ("両親は田舎に住んでいます。", "りょうしんはいなかにすんでいます。", "Ryoushin wa inaka ni sunde imasu.", "Bố mẹ sống ở quê."),
    ("両親にプレゼントをあげました。", "りょうしんにプレゼントをあげました。", "Ryoushin ni purezento o agemashita.", "Tôi tặng quà bố mẹ."),
]
HAND["v-n5-020"] = [
    ("友達と映画を見に行きます。", "ともだちとえいがをみにいきます。", "Tomodachi to eiga o mi ni ikimasu.", "Tôi đi xem phim với bạn."),
    ("いい友達が三人います。", "いいともだちがさんにんいます。", "Ii tomodachi ga sannin imasu.", "Tôi có ba người bạn tốt."),
]
HAND["v-n5-021"] = [
    ("学校は九時に始まります。", "がっこうはくじにはじまります。", "Gakkou wa kuji ni hajimarimasu.", "Trường bắt đầu lúc chín giờ."),
    ("雨の日も学校へ行きます。", "あめのひもがっこうへいきます。", "Ame no hi mo gakkou e ikimasu.", "Ngày mưa tôi vẫn đến trường."),
    ("学校で友達に会います。", "がっこうでともだちにあいます。", "Gakkou de tomodachi ni aimasu.", "Tôi gặp bạn ở trường."),
]
HAND["v-n5-022"] = [
    ("先生に質問してもいいですか。", "せんせいしつもんしてもいいですか。", "Sensei ni shitsumon shite mo ii desu ka.", "Tôi hỏi thầy cô được không?"),
    ("日本語の先生は優しいです。", "にほんごのせんせいはやさしいです。", "Nihongo no sensei wa yasashii desu.", "Giáo viên tiếng Nhật rất dịu dàng."),
]
HAND["v-n5-023"] = [
    ("あの学生は毎日図書館にいます。", "あのがくせいはまいにちとしょかんにいます。", "Ano gakusei wa mainichi toshokan ni imasu.", "Học sinh kia ngày nào cũng ở thư viện."),
    ("私は大学の学生です。", "わたしはだいがくのがくせいです。", "Watashi wa daigaku no gakusei desu.", "Tôi là sinh viên đại học."),
]
HAND["v-n5-024"] = [
    ("日本語は面白いですが、漢字が難しいです。", "にほんごはおもしろいですが、かんじがむずかしいです。", "Nihongo wa omoshiroi desu ga, kanji ga muzukashii desu.", "Tiếng Nhật thú vị nhưng kanji khó."),
    ("ゆっくり日本語で話してください。", "ゆっくりにほんごではなしてください。", "Yukkuri nihongo de hanashite kudasai.", "Hãy nói tiếng Nhật chậm giúp tôi."),
]
HAND["v-n5-025"] = [
    ("毎晩二時間勉強します。", "まいばんにじかんべんきょうします。", "Maiban nijikan benkyou shimasu.", "Mỗi tối tôi học hai tiếng."),
    ("勉強しすぎて頭が痛いです。", "べんきょうしすぎてあたまがいたいです。", "Benkyou shisugite atama ga itai desu.", "Học quá nhiều nên tôi đau đầu."),
]
HAND["v-n5-026"] = [
    ("この本を図書館で借りました。", "このほんをとしょかんでかりました。", "Kono hon o toshokan de karimashita.", "Tôi mượn quyển này ở thư viện."),
    ("面白い本を紹介してください。", "おもしろいほんをしょうかいしてください。", "Omoshiroi hon o shoukai shite kudasai.", "Hãy giới thiệu một quyển sách hay."),
]
HAND["v-n5-027"] = [
    ("宿題を忘れないでください。", "しゅくだいをわすれないでください。", "Shukudai o wasurenaide kudasai.", "Đừng quên bài tập."),
    ("今日の宿題はもう終わりました。", "きょうのしゅくだいはもうおわりました。", "Kyou no shukudai wa mou owarimashita.", "Bài tập hôm nay xong rồi."),
]
HAND["v-n5-028"] = [
    ("教室は二階にあります。", "きょうしつはにかいにあります。", "Kyoushitsu wa nikai ni arimasu.", "Phòng học ở tầng hai."),
    ("教室で静かにしてください。", "きょうしつでしずかにしてください。", "Kyoushitsu de shizuka ni shite kudasai.", "Hãy giữ yên lặng trong lớp."),
]
HAND["v-n5-029"] = [
    ("電子辞書を使っています。", "でんしじしょをつかっています。", "Denshi jisho o tsukatte imasu.", "Tôi đang dùng từ điển điện tử."),
    ("この辞書はとても便利です。", "このじしょはとてもべんりです。", "Kono jisho wa totemo benri desu.", "Từ điển này rất tiện."),
]
HAND["v-n5-030"] = [
    ("鉛筆を忘れたので、借りました。", "えんぴつをわすれたので、かりました。", "Enpitsu o wasureta node, karimashita.", "Quên bút chì nên tôi mượn."),
    ("赤い鉛筆で直してください。", "あかいえんぴつでなおしてください。", "Akai enpitsu de naoshite kudasai.", "Hãy sửa bằng bút chì đỏ."),
]
HAND["v-n5-031"] = [
    ("授業の後で質問します。", "じゅぎょうのあとでしつもんします。", "Jugyou no ato de shitsumon shimasu.", "Sau giờ học tôi sẽ hỏi."),
    ("今日は授業がありません。", "きょうはじゅぎょうがありません。", "Kyou wa jugyou ga arimasen.", "Hôm nay không có tiết học."),
]
HAND["v-n5-032"] = [
    ("試験は来週の月曜日です。", "しけんはらいしゅうのげつようびです。", "Shiken wa raishuu no getsuyoubi desu.", "Kỳ thi vào thứ Hai tuần sau."),
    ("試験の前に早く寝ます。", "しけんのまえにはやくねます。", "Shiken no mae ni hayaku nemasu.", "Trước thi tôi đi ngủ sớm."),
]
HAND["v-n5-033"] = [
    ("仕事は大変ですが、楽しいです。", "しごとはたいへんですが、たのしいです。", "Shigoto wa taihen desu ga, tanoshii desu.", "Công việc vất vả nhưng vui."),
    ("仕事が終わったら電話します。", "しごとがおわったらでんわします。", "Shigoto ga owattara denwa shimasu.", "Tan làm tôi sẽ gọi."),
]
HAND["v-n5-034"] = [
    ("会社まで電車で三十分です。", "かいしゃまででんしゃでさんじゅっぷんです。", "Kaisha made densha de sanjuppun desu.", "Đến công ty mất 30 phút tàu."),
    ("大きい会社で働いています。", "おおきいかいしゃではたらいています。", "Ookii kaisha de hataraite imasu.", "Tôi làm ở công ty lớn."),
]
HAND["v-n5-038"] = [
    ("兄は銀行で働いています。", "あにはぎんこうではたらいています。", "Ani wa ginkou de hataraite imasu.", "Anh trai làm ở ngân hàng."),
    ("週末も働きますか。", "しゅうまつもはたらきますか。", "Shuumatsu mo hatarakimasu ka.", "Cuối tuần bạn cũng làm việc à?"),
    ("どこで働いていますか。", "どこではたらいていますか。", "Doko de hataraite imasu ka.", "Bạn đang làm việc ở đâu?"),
]
HAND["v-n5-035"] = [
    ("兄は会社員です。", "あにはかいしゃいんです。", "Ani wa kaishain desu.", "Anh trai tôi là nhân viên công ty."),
    ("会社員になりたいです。", "かいしゃいんになりたいです。", "Kaishain ni naritai desu.", "Tôi muốn trở thành nhân viên công ty."),
    ("会社員は毎日電車で通勤します。", "かいしゃいんはまいにちでんしゃでつうきんします。", "Kaishain wa mainichi densha de tsuukin shimasu.", "Nhân viên công ty đi làm bằng tàu mỗi ngày."),
]
HAND["v-n5-036"] = [
    ("熱があるので医者に行きます。", "ねつがあるのでいしゃにいきます。", "Netsu ga aru node isha ni ikimasu.", "Tôi sốt nên đi gặp bác sĩ."),
    ("父は医者です。", "ちちはいしゃです。", "Chichi wa isha desu.", "Bố tôi là bác sĩ."),
    ("いい医者を紹介してください。", "いいいしゃをしょうかいしてください。", "Ii isha o shoukai shite kudasai.", "Hãy giới thiệu giúp tôi một bác sĩ giỏi."),
]
HAND["v-n5-037"] = [
    ("店員に値段を聞きました。", "てんいんにねだんをききました。", "Ten'in ni nedan o kikimashita.", "Tôi hỏi nhân viên giá tiền."),
    ("あの店員は親切です。", "あのてんいんはしんせつです。", "Ano ten'in wa shinsetsu desu.", "Nhân viên kia rất tử tế."),
    ("店員を呼んでください。", "てんいんをよんでください。", "Ten'in o yonde kudasai.", "Hãy gọi nhân viên giúp tôi."),
]
HAND["v-n5-039"] = [
    ("明日は休みです。", "あしたはやすみです。", "Ashita wa yasumi desu.", "Ngày mai tôi nghỉ."),
    ("休みの日は本を読みます。", "やすみのひはほんをよみます。", "Yasumi no hi wa hon o yomimasu.", "Ngày nghỉ tôi đọc sách."),
    ("来週三日休みがあります。", "らいしゅうみっかやすみがあります。", "Raishuu mikka yasumi ga arimasu.", "Tuần sau tôi có ba ngày nghỉ."),
]
HAND["v-n5-040"] = [
    ("父はバスの運転手です。", "ちちはバスのうんてんしゅです。", "Chichi wa basu no untenshu desu.", "Bố tôi là tài xế xe buýt."),
    ("運転手に「駅まで」と言いました。", "うんてんしゅに「えきまで」といいました。", "Untenshu ni \"eki made\" to iimashita.", "Tôi nói với tài xế: đến nhà ga."),
    ("運転手は道をよく知っています。", "うんてんしゅはみちをよくしっています。", "Untenshu wa michi o yoku shitte imasu.", "Tài xế thuộc đường lắm."),
]
HAND["v-n5-041"] = [
    ("今日は日本語の試験です。", "きょうはにほんごのしけんです。", "Kyou wa nihongo no shiken desu.", "Hôm nay có kỳ thi tiếng Nhật."),
    ("今日の天気はいいです。", "きょうのてんきはいいです。", "Kyou no tenki wa ii desu.", "Thời tiết hôm nay đẹp."),
    ("今日は何をしますか。", "きょうはなにをしますか。", "Kyou wa nani o shimasu ka.", "Hôm nay bạn làm gì?"),
]
HAND["v-n5-042"] = [
    ("明日友達に会います。", "あしたともだちにあいます。", "Ashita tomodachi ni aimasu.", "Ngày mai tôi gặp bạn."),
    ("明日は休みですか。", "あしたはやすみですか。", "Ashita wa yasumi desu ka.", "Ngày mai bạn nghỉ à?"),
    ("明日の朝、早く起きます。", "あしたのあさ、はやくおきます。", "Ashita no asa, hayaku okimasu.", "Sáng mai tôi dậy sớm."),
]
HAND["v-n5-043"] = [
    ("昨日映画を見ました。", "きのうえいがをみました。", "Kinou eiga o mimashita.", "Hôm qua tôi xem phim."),
    ("昨日はとても寒かったです。", "きのうはとてもさむかったです。", "Kinou wa totemo samukatta desu.", "Hôm qua rất lạnh."),
    ("昨日何を食べましたか。", "きのうなにをたべましたか。", "Kinou nani o tabemashita ka.", "Hôm qua bạn ăn gì?"),
]
HAND["v-n5-044"] = [
    ("今、何をしていますか。", "いま、なにをしていますか。", "Ima, nani o shite imasu ka.", "Bây giờ bạn đang làm gì?"),
    ("今はちょっと忙しいです。", "いまはちょっといそがしいです。", "Ima wa chotto isogashii desu.", "Bây giờ tôi hơi bận."),
    ("今すぐ行きます。", "いますぐいきます。", "Ima sugu ikimasu.", "Tôi đi ngay bây giờ."),
]
HAND["v-n5-045"] = [
    ("朝ごはんを食べます。", "あさごはんをたべます。", "Asagohan o tabemasu.", "Tôi ăn sáng."),
    ("朝早く起きます。", "あさはやくおきます。", "Asa hayaku okimasu.", "Buổi sáng tôi dậy sớm."),
    ("朝はコーヒーを飲みます。", "あさはコーヒーをのみます。", "Asa wa koohii o nomimasu.", "Buổi sáng tôi uống cà phê."),
]
HAND["v-n5-046"] = [
    ("昼に弁当を食べます。", "ひるにべんとうをたべます。", "Hiru ni bentou o tabemasu.", "Trưa tôi ăn cơm hộp."),
    ("昼から授業があります。", "ひるからじゅぎょうがあります。", "Hiru kara jugyou ga arimasu.", "Từ trưa có tiết học."),
    ("昼休みは短いです。", "ひるやすみはみじかいです。", "Hiruyasumi wa mijikai desu.", "Giờ nghỉ trưa ngắn."),
]
HAND["v-n5-047"] = [
    ("夜、本を読みます。", "よる、ほんをよみます。", "Yoru, hon o yomimasu.", "Tối tôi đọc sách."),
    ("夜は静かです。", "よるはしずかです。", "Yoru wa shizuka desu.", "Ban đêm thì yên tĩnh."),
    ("夜ごはんは七時です。", "よるごはんはしちじです。", "Yorugohan wa shichiji desu.", "Cơm tối lúc bảy giờ."),
]
HAND["v-n5-048"] = [
    ("毎日日本語を勉強します。", "まいにちにほんごをべんきょうします。", "Mainichi nihongo o benkyou shimasu.", "Mỗi ngày tôi học tiếng Nhật."),
    ("毎日歩いて学校へ行きます。", "まいにちあるいてがっこうへいきます。", "Mainichi aruite gakkou e ikimasu.", "Mỗi ngày tôi đi bộ đến trường."),
    ("毎日水を飲みます。", "まいにちみずをのみます。", "Mainichi mizu o nomimasu.", "Mỗi ngày tôi uống nước."),
]
HAND["v-n5-049"] = [
    ("月曜日は忙しいです。", "げつようびはいそがしいです。", "Getsuyoubi wa isogashii desu.", "Thứ Hai tôi bận."),
    ("次の月曜日に会いましょう。", "つぎのげつようびにあいましょう。", "Tsugi no getsuyoubi ni aimashou.", "Thứ Hai tới mình gặp nhau nhé."),
    ("月曜日から新しい授業が始まります。", "げつようびからあたらしいじゅぎょうがはじまります。", "Getsuyoubi kara atarashii jugyou ga hajimarimasu.", "Từ thứ Hai bắt đầu tiết học mới."),
]
HAND["v-n5-050"] = [
    ("日曜日は家族と過ごします。", "にちようびはかぞくとすごします。", "Nichiyoubi wa kazoku to sugoshimasu.", "Chủ nhật tôi ở với gia đình."),
    ("日曜日、公園へ行きます。", "にちようび、こうえんへいきます。", "Nichiyoubi, kouen e ikimasu.", "Chủ nhật tôi ra công viên."),
    ("日曜日はお店が混みます。", "にちようびはおみせがこみます。", "Nichiyoubi wa omise ga komimasu.", "Chủ nhật cửa hàng đông."),
]
HAND["v-n5-051"] = [
    ("今、何時ですか。", "いま、なんじですか。", "Ima, nanji desu ka.", "Bây giờ là mấy giờ?"),
    ("一時から勉強します。", "いちじからべんきょうします。", "Ichiji kara benkyou shimasu.", "Tôi học từ một giờ."),
    ("授業は二時間です。", "じゅぎょうはにじかんです。", "Jugyou wa nijikan desu.", "Buổi học dài hai tiếng."),
]
HAND["v-n5-052"] = [
    ("五分待ってください。", "ごふんまってください。", "Gofun matte kudasai.", "Hãy đợi năm phút."),
    ("駅まで十分です。", "えきまでじゅっぷんです。", "Eki made juppun desu.", "Đến ga mất mười phút."),
    ("一分だけ待ってください。", "いっぷんだけまってください。", "Ippun dake matte kudasai.", "Chỉ đợi một phút thôi."),
]
HAND["v-n5-053"] = [
    ("一週間に三回走ります。", "いっしゅうかんにさんかいはしります。", "Isshuukan ni sankai hashirimasu.", "Một tuần tôi chạy ba lần."),
    ("来週試験があります。", "らいしゅうしけんがあります。", "Raishuu shiken ga arimasu.", "Tuần sau có kỳ thi."),
    ("今週は忙しいです。", "こんしゅうはいそがしいです。", "Konshuu wa isogashii desu.", "Tuần này tôi bận."),
]
HAND["v-n5-054"] = [
    ("来年日本へ行きます。", "らいねんにほんへいきます。", "Rainen nihon e ikimasu.", "Năm sau tôi đi Nhật."),
    ("今年二十歳です。", "ことしはたちです。", "Kotoshi hatachi desu.", "Năm nay tôi 20 tuổi."),
    ("一年に一度旅行します。", "いちねんにいちどりょこうします。", "Ichinen ni ichido ryokou shimasu.", "Mỗi năm tôi đi du lịch một lần."),
]
HAND["v-n4-001"] = [
    ("午後に会議があります。", "ごごにかいぎがあります。", "Gogo ni kaigi ga arimasu.", "Chiều có cuộc họp."),
    ("会議は三時に始まります。", "かいぎはさんじにはじまります。", "Kaigi wa sanji ni hajimarimasu.", "Cuộc họp bắt đầu lúc ba giờ."),
    ("会議で発表します。", "かいぎではっぴょうします。", "Kaigi de happyou shimasu.", "Tôi thuyết trình trong cuộc họp."),
]
HAND["v-n4-002"] = [
    ("試験の準備をします。", "しけんのじゅんびをします。", "Shiken no junbi o shimasu.", "Tôi chuẩn bị cho kỳ thi."),
    ("旅行の準備はもう終わりました。", "りょこうのじゅんびはもうおわりました。", "Ryokou no junbi wa mou owarimashita.", "Chuẩn bị chuyến đi đã xong."),
    ("明日の準備をしてください。", "あしたのじゅんびをしてください。", "Ashita no junbi o shite kudasai.", "Hãy chuẩn bị cho ngày mai."),
]
HAND["v-n4-003"] = [
    ("日本で働く経験があります。", "にほんではたらくけいけんがあります。", "Nihon de hataraku keiken ga arimasu.", "Tôi có kinh nghiệm làm việc ở Nhật."),
    ("いい経験になりました。", "いいけいけんになりました。", "Ii keiken ni narimashita.", "Đó đã trở thành một trải nghiệm tốt."),
    ("経験を話してください。", "けいけんをはなしてください。", "Keiken o hanashite kudasai.", "Hãy kể kinh nghiệm của bạn."),
]
HAND["v-n4-004"] = [
    ("先生が文法を説明します。", "せんせいがぶんぽうをせつめいします。", "Sensei ga bunpou o setsumei shimasu.", "Thầy cô giải thích ngữ pháp."),
    ("もう一度説明してください。", "もういちどせつめいしてください。", "Mou ichido setsumei shite kudasai.", "Hãy giải thích lại một lần nữa."),
    ("説明は分かりやすかったです。", "せつめいはわかりやすかったです。", "Setsumei wa wakariyasukatta desu.", "Phần giải thích dễ hiểu."),
]
HAND["v-n4-005"] = [
    ("あとで連絡します。", "あとでれんらくします。", "Ato de renraku shimasu.", "Tôi sẽ liên lạc sau."),
    ("連絡先を教えてください。", "れんらくさきをおしえてください。", "Renrakusaki o oshiete kudasai.", "Hãy cho tôi thông tin liên lạc."),
    ("まだ連絡がありません。", "まだれんらくがありません。", "Mada renraku ga arimasen.", "Vẫn chưa có liên lạc."),
]
HAND["v-n4-007"] = [
    ("夏休みの計画を立てます。", "なつやすみのけいかくをたてます。", "Natsuyasumi no keikaku o tatemasu.", "Tôi lập kế hoạch nghỉ hè."),
    ("計画どおりに行きました。", "けいかくどおりにいきました。", "Keikaku doori ni ikimashita.", "Mọi thứ diễn ra đúng kế hoạch."),
    ("旅行の計画はまだです。", "りょこうのけいかくはまだです。", "Ryokou no keikaku wa mada desu.", "Kế hoạch du lịch vẫn chưa xong."),
]
HAND["v-n4-014"] = [
    ("失敗しても大丈夫です。", "しっぱいしてもだいじょうぶです。", "Shippai shite mo daijoubu desu.", "Thất bại cũng không sao."),
    ("一度失敗しました。", "いちどしっぱいしました。", "Ichido shippai shimashita.", "Tôi đã thất bại một lần."),
    ("失敗から学びます。", "しっぱいからまなびます。", "Shippai kara manabimasu.", "Tôi học từ thất bại."),
]
HAND["v-n4-015"] = [
    ("実験は成功しました。", "じっけんはせいこうしました。", "Jikken wa seikou shimashita.", "Thí nghiệm đã thành công."),
    ("成功を祈っています。", "せいこうをいのっています。", "Seikou o inotte imasu.", "Tôi cầu chúc thành công."),
    ("成功するまで続けます。", "せいこうするまでつづけます。", "Seikou suru made tsuzukemasu.", "Tôi sẽ làm đến khi thành công."),
]
HAND["v-n4-017"] = [
    ("来月から日本語を始めます。", "らいげつからにほんごをはじめます。", "Raigetsu kara nihongo o hajimemasu.", "Từ tháng sau tôi bắt đầu học tiếng Nhật."),
    ("九時に授業を始めます。", "くじにじゅぎょうをはじめます。", "Kuji ni jugyou o hajimemasu.", "Tiết học bắt đầu lúc chín giờ."),
    ("さあ、始めましょう。", "さあ、はじめましょう。", "Saa, hajimemashou.", "Thôi, bắt đầu nào."),
]
HAND["v-n4-064"] = [
    ("将来は医者になりたいです。", "しょうらいはいしゃになりたいです。", "Shourai wa isha ni naritai desu.", "Tương lai tôi muốn làm bác sĩ."),
    ("将来の夢は何ですか。", "しょうらいのゆめはなんですか。", "Shourai no yume wa nan desu ka.", "Ước mơ tương lai của bạn là gì?"),
    ("将来について話しましょう。", "しょうらいについてはなしましょう。", "Shourai ni tsuite hanashimashou.", "Mình nói về tương lai nhé."),
]
HAND["v-n4-080"] = [
    ("先生に相談します。", "せんせいにそうだんします。", "Sensei ni soudan shimasu.", "Tôi hỏi ý thầy cô."),
    ("ちょっと相談してもいいですか。", "ちょっとそうだんしてもいいですか。", "Chotto soudan shite mo ii desu ka.", "Cho tôi hỏi ý một chút được không?"),
    ("家族と相談してから決めます。", "かぞくとそうだんしてからきめます。", "Kazoku to soudan shite kara kimemasu.", "Tôi sẽ bàn với gia đình rồi quyết định."),
]
HAND["v-n4-082"] = [
    ("メールの返事を書きました。", "メールのへんじをかきました。", "Meeru no henji o kakimashita.", "Tôi đã viết thư trả lời."),
    ("返事はまだ来ません。", "へんじはまだきません。", "Henji wa mada kimasen.", "Vẫn chưa có hồi âm."),
    ("すぐに返事してください。", "すぐにへんじしてください。", "Sugu ni henji shite kudasai.", "Hãy trả lời ngay giúp tôi."),
]
HAND["v-n4-087"] = [
    ("土曜日にサッカーの試合があります。", "どようびにサッカーのしあいがあります。", "Doyoubi ni sakkaa no shiai ga arimasu.", "Thứ Bảy có trận bóng đá."),
    ("試合に勝ちました。", "しあいにかちました。", "Shiai ni kachimashita.", "Chúng tôi thắng trận."),
    ("試合を見に行きませんか。", "しあいをみにいきませんか。", "Shiai o mi ni ikimasen ka.", "Đi xem trận đấu không?"),
]
HAND["v-n4-103"] = [
    ("時間を確認してください。", "じかんをかくにんしてください。", "Jikan o kakunin shite kudasai.", "Hãy kiểm tra lại giờ."),
    ("予約を確認します。", "よやくをかくにんします。", "Yoyaku o kakunin shimasu.", "Tôi xác nhận đặt chỗ."),
    ("名前を確認してもいいですか。", "なまえをかくにんしてもいいですか。", "Namae o kakunin shite mo ii desu ka.", "Cho tôi xác nhận tên được không?"),
]


def noun_examples(word, kana, romaji, mean, cat):
    cap = r(romaji)
    a = (
        f"これは{word}です。",
        f"これは{kana}です。",
        f"Kore wa {romaji} desu.",
        f"Đây là {mean}.",
    )
    b = (
        f"私は{word}が好きです。",
        f"わたしは{kana}がすきです。",
        f"Watashi wa {romaji} ga suki desu.",
        f"Tôi thích {mean}.",
    )
    by_cat = {
        "Gia đình": [
            (f"私の{word}は東京にいます。", f"わたしの{kana}はとうきょうにいます。", f"Watashi no {romaji} wa Toukyou ni imasu.", f"{mean.capitalize()} của tôi ở Tokyo."),
            (f"週末は{word}と話します。", f"しゅうまつは{kana}とはなします。", f"Shuumatsu wa {romaji} to hanashimasu.", f"Cuối tuần tôi nói chuyện với {mean}."),
        ],
        "Trường học": [
            (f"毎日{word}へ行きます。", f"まいにち{kana}へいきます。", f"Mainichi {romaji} e ikimasu.", f"Mỗi ngày tôi đến {mean}."),
            (f"{word}は大切です。", f"{kana}はたいせつです。", f"{cap} wa taisetsu desu.", f"{mean.capitalize()} thì quan trọng."),
        ],
        "Công việc": [
            (f"私の父は{word}です。", f"わたしのちちは{kana}です。", f"Watashi no chichi wa {romaji} desu.", f"Bố tôi liên quan đến {mean}."),
            (f"{word}について話します。", f"{kana}についてはなします。", f"{cap} ni tsuite hanashimasu.", f"Tôi nói về {mean}."),
        ],
        "Thời gian": [
            (f"{word}、日本語を勉強します。", f"{kana}、にほんごをべんきょうします。", f"{cap}, nihongo o benkyou shimasu.", f"{mean.capitalize()} tôi học tiếng Nhật."),
            (f"{word}は大切です。", f"{kana}はたいせつです。", f"{cap} wa taisetsu desu.", f"{mean.capitalize()} thì quan trọng."),
        ],
        "Đồ ăn": [
            (f"朝ごはんに{word}を食べます。", f"あさごはんに{kana}をたべます。", f"Asagohan ni {romaji} o tabemasu.", f"Bữa sáng tôi ăn {mean}."),
            (f"この{word}は美味しいです。", f"この{kana}はおいしいです。", f"Kono {romaji} wa oishii desu.", f"{mean.capitalize()} này ngon."),
        ],
        "Giao thông": [
            (f"{word}で学校へ行きます。", f"{kana}でがっこうへいきます。", f"{cap} de gakkou e ikimasu.", f"Tôi đến trường bằng {mean}."),
            (f"{word}は何時に来ますか。", f"{kana}はなんじにきますか。", f"{cap} wa nanji ni kimasu ka.", f"{mean.capitalize()} đến lúc mấy giờ?"),
        ],
        "Nhà cửa": [
            (f"私の家に{word}があります。", f"わたしのいえに{kana}があります。", f"Watashi no ie ni {romaji} ga arimasu.", f"Nhà tôi có {mean}."),
            (f"{word}を掃除します。", f"{kana}をそうじします。", f"{cap} o souji shimasu.", f"Tôi dọn {mean}."),
        ],
        "Cơ thể": [
            (f"{word}が痛いです。", f"{kana}がいたいです。", f"{cap} ga itai desu.", f"{mean.capitalize()} tôi đau."),
            (f"手で{word}を洗います。", f"てで{kana}をあらいます。", f"Te de {romaji} o araimasu.", f"Tôi rửa {mean}."),
        ],
        "Thời tiết": [
            (f"今日は{word}です。", f"きょうは{kana}です。", f"Kyou wa {romaji} desu.", f"Hôm nay là {mean}."),
            (f"{word}の日は家にいます。", f"{kana}のひはいえにいます。", f"{cap} no hi wa ie ni imasu.", f"Ngày {mean} tôi ở nhà."),
        ],
        "Mua sắm": [
            (f"店で{word}を買います。", f"みせで{kana}をかいます。", f"Mise de {romaji} o kaimasu.", f"Tôi mua {mean} ở cửa hàng."),
            (f"この{word}は高いです。", f"この{kana}はたかいです。", f"Kono {romaji} wa takai desu.", f"{mean.capitalize()} này đắt."),
        ],
        "Du lịch": [
            (f"夏休みに{word}へ行きます。", f"なつやすみに{kana}へいきます。", f"Natsuyasumi ni {romaji} e ikimasu.", f"Nghỉ hè tôi đi {mean}."),
            (f"{word}の写真を撮りました。", f"{kana}のしゃしんをとりました。", f"{cap} no shashin o torimashita.", f"Tôi đã chụp ảnh {mean}."),
        ],
        "Tự nhiên": [
            (f"公園で{word}を見ました。", f"こうえんで{kana}をみました。", f"Kouen de {romaji} o mimashita.", f"Tôi đã thấy {mean} ở công viên."),
            (f"{word}が好きです。", f"{kana}がすきです。", f"{cap} ga suki desu.", f"Tôi thích {mean}."),
        ],
        "Màu sắc": [
            (f"私の鞄は{word}です。", f"わたしのかばんは{kana}です。", f"Watashi no kaban wa {romaji} desu.", f"Cặp tôi màu {mean}."),
            (f"{word}の花がきれいです。", f"{kana}のはながきれいです。", f"{cap} no hana ga kirei desu.", f"Hoa {mean} rất đẹp."),
        ],
    }
    return by_cat.get(cat, [a, b])

def adj_examples(word, kana, romaji, mean, pos):
    cap = r(romaji)
    if "tính từ -i" in pos and kana.endswith("い"):
        stemk = kana[:-1]
        return [
            (f"今日は{word}です。", f"きょうは{kana}です。", f"Kyou wa {romaji} desu.", f"Hôm nay {mean}."),
            (f"この部屋は{stemk}くないです。", f"このへやは{stemk}くないです。", f"Kono heya wa {romaji[:-1]}kunai desu.", f"Phòng này không {mean}."),
        ]
    return [
        (f"彼は{word}な人です。", f"かれは{kana}なひとです。", f"Kare wa {romaji} na hito desu.", f"Anh ấy là người {mean}."),
        (f"今日は{word}です。", f"きょうは{kana}です。", f"Kyou wa {romaji} desu.", f"Hôm nay {mean}."),
    ]

KANA = {
    "きゃ":"kya","きゅ":"kyu","きょ":"kyo","しゃ":"sha","しゅ":"shu","しょ":"sho",
    "ちゃ":"cha","ちゅ":"chu","ちょ":"cho","にゃ":"nya","にゅ":"nyu","にょ":"nyo",
    "ひゃ":"hya","ひゅ":"hyu","ひょ":"hyo","みゃ":"mya","みゅ":"myu","みょ":"myo",
    "りゃ":"rya","りゅ":"ryu","りょ":"ryo","ぎゃ":"gya","ぎゅ":"gyu","ぎょ":"gyo",
    "じゃ":"ja","じゅ":"ju","じょ":"jo","びゃ":"bya","びゅ":"byu","びょ":"byo",
    "ぴゃ":"pya","ぴゅ":"pyu","ぴょ":"pyo",
    "あ":"a","い":"i","う":"u","え":"e","お":"o",
    "か":"ka","き":"ki","く":"ku","け":"ke","こ":"ko",
    "さ":"sa","し":"shi","す":"su","せ":"se","そ":"so",
    "た":"ta","ち":"chi","つ":"tsu","て":"te","と":"to",
    "な":"na","に":"ni","ぬ":"nu","ね":"ne","の":"no",
    "は":"ha","ひ":"hi","ふ":"fu","へ":"he","ほ":"ho",
    "ま":"ma","み":"mi","む":"mu","め":"me","も":"mo",
    "や":"ya","ゆ":"yu","よ":"yo",
    "ら":"ra","り":"ri","る":"ru","れ":"re","ろ":"ro",
    "わ":"wa","を":"o","ん":"n",
    "が":"ga","ぎ":"gi","ぐ":"gu","げ":"ge","ご":"go",
    "ざ":"za","じ":"ji","ず":"zu","ぜ":"ze","ぞ":"zo",
    "だ":"da","ぢ":"ji","づ":"zu","で":"de","ど":"do",
    "ば":"ba","び":"bi","ぶ":"bu","べ":"be","ぼ":"bo",
    "ぱ":"pa","ぴ":"pi","ぷ":"pu","ぺ":"pe","ぽ":"po",
    "っ":"", "ー":"",
}

def kana_to_romaji(s: str) -> str:
    out = []
    i = 0
    while i < len(s):
        if s[i] == "っ" and i + 1 < len(s):
            rest = kana_to_romaji(s[i + 1 :])
            cons = (rest[:1] or "t").lower()
            if cons == "c":
                cons = "t"
            return "".join(out) + cons + rest
        two = s[i : i + 2]
        if two in KANA:
            out.append(KANA[two])
            i += 2
            continue
        ch = s[i]
        if ch in KANA:
            out.append(KANA[ch])
            i += 1
            continue
        if ch in "。、！？「」":
            out.append(". " if ch == "。" else (", " if ch == "、" else " "))
            i += 1
            continue
        out.append(ch)
        i += 1
    return "".join(out).strip().replace("  ", " ")

def kanji_form(form_k: str, kana: str, word: str) -> str:
    if not word or word == kana or not kana:
        return form_k
    if word in ("する", "来る") or kana in ("する", "くる"):
        if word == "来る" or kana == "くる":
            return form_k.replace("き", "来", 1) if form_k.startswith("き") else ("来て" if form_k == "きて" else ("来た" if form_k == "きた" else form_k))
        return form_k
    if len(form_k) >= len(kana) - 1:
        return word[:-1] + form_k[len(kana) - 1 :]
    return form_k

def verb_examples(word, kana, romaji, mean, pos):
    masu, te, ta = masu_te_ta(word, kana, pos)
    masu_j, te_j, ta_j = kanji_form(masu, kana, word), kanji_form(te, kana, word), kanji_form(ta, kana, word)
    masu_r = kana_to_romaji(masu)
    te_r = kana_to_romaji(te)
    ta_r = kana_to_romaji(ta)
    return [
        (f"今から{masu_j}。", f"いまから{masu}。", f"Ima kara {masu_r}.", f"Từ bây giờ tôi {mean}."),
        (f"もう{ta_j}。", f"もう{ta}。", f"Mou {ta_r}.", f"Tôi đã {mean} rồi."),
        (f"{te_j}もいいですか。", f"{te}もいいですか。", f"{te_r} mo ii desu ka.", f"Tôi {mean} được không?"),
    ]

def adverb_examples(word, kana, romaji, mean):
    return [
        (f"彼は{word}話します。", f"かれは{kana}はなします。", f"Kare wa {romaji} hanashimasu.", f"Anh ấy nói {mean}."),
        (f"{word}歩いてください。", f"{kana}あるいてください。", f"{r(romaji)} aruite kudasai.", f"Hãy đi {mean}."),
    ]

def generic(word, kana, romaji, mean):
    return [
        (f"{word}の意味は「{mean}」です。", f"{kana}のいみは「{mean}」です。", f"{r(romaji)} no imi wa \"{mean}\" desu.", f"Nghĩa của {word} là '{mean}'."),
        (f"先生は{word}の使い方を教えました。", f"せんせいは{kana}のつかいかたをおしえました。", f"Sensei wa {romaji} no tsukaikata o oshiemashita.", f"Thầy cô đã dạy cách dùng {word}."),
    ]

def for_entry(e):
    if e["id"] in HAND:
        return HAND[e["id"]]
    pos = e["pos"]
    word, kana, romaji, mean, cat = e["word"], e["kana"], e["romaji"], e["mean"], e["cat"]
    if "động từ" in pos:
        return verb_examples(word, kana, romaji, mean, pos)
    if "tính từ" in pos:
        return adj_examples(word, kana, romaji, mean, pos)
    if "trạng từ" in pos:
        return adverb_examples(word, kana, romaji, mean)
    if "danh từ" in pos or "số từ" in pos:
        return noun_examples(word, kana, romaji, mean, cat)
    if "biểu hiện" in pos:
        return [
            (f"{word}はよく使います。", f"{kana}はよくつかいます。", f"{r(romaji)} wa yoku tsukaimasu.", f"Người ta hay dùng {mean}."),
            (f"友達に{word}と言いました。", f"ともだちに{kana}といいました。", f"Tomodachi ni {romaji} to iimashita.", f"Tôi đã nói '{mean}' với bạn."),
        ]
    return generic(word, kana, romaji, mean)

def ts_escape(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')

def emit_vocab(rows):
    lines = [
        'import type { Example } from "@/lib/akari/types";',
        "",
        "function x(jp: string, kana: string, romaji: string, vi: string): Example {",
        "  return { jp, kana, romaji, vi };",
        "}",
        "",
        "/** Extra example sentences keyed by vocab id (on top of the built-in one). */",
        "export const VOCAB_EXTRA_EXAMPLES: Record<string, Example[]> = {",
    ]
    for e in rows:
        xs = for_entry(e)
        body = ",\n    ".join(
            f'x("{ts_escape(a)}", "{ts_escape(b)}", "{ts_escape(c)}", "{ts_escape(d)}")'
            for a,b,c,d in xs
        )
        lines.append(f'  "{e["id"]}": [\n    {body},\n  ],')
    lines.append("};")
    lines.append("")
    return "\n".join(lines)

# Kanji usage
KANJI_N5 = "日 月 火 水 木 金 土 人 口 目 耳 手 足 山 川 田 天 気 一 二 三 四 五 六 七 八 九 十 百 千 万 円 年 時 分 半 今 先 生 学 校 入 出 上 下 中 外 前 後 右 左 東 西 南 北 車 電 話 語 読 書 見 聞 食 飲 買 行 来 帰 休 友 母 父 女 男 子 名 何 大 小 高 安 新 古 多 少 白 長".split()
KANJI_N4 = "会 社 発 着 開 閉 問 題 研 究 仕 事 業 堂 院 館 屋 度 回 的 力 作 待 持 思 知 言 考 教 室 起 終 始 使 急 速 遅 走 歩 正 音 楽 歌 映 画 写 真 色 赤 青 黒 紙 切 代 場 所 世 界".split()

# character -> (mean, extra words, sentences, tip)
# extra word: word, kana, romaji, vi, on|kun, usage
KANJI: dict[str, dict] = {}

def K(ch, tip, words, sents):
    KANJI[ch] = {"tip": tip, "words": words, "sents": sents}

K("日", "Đứng một mình đọc ひ (kun). Trong từ ghép thường đọc にち / じつ / に (on).",
  [("休日", "きゅうじつ", "kyuujitsu", "ngày nghỉ", "on", "日 đọc じつ sau 休"),
   ("誕生日", "たんじょうび", "tanjoubi", "sinh nhật", "kun", "日 đọc び khi chỉ ngày")],
  [("今日はいい日です。", "きょうはいいひです。", "Kyou wa ii hi desu.", "Hôm nay là một ngày đẹp."),
   ("日本へ行きたいです。", "にほんへいきたいです。", "Nihon e ikitai desu.", "Tôi muốn đi Nhật Bản.")])
K("月", "Một mình: つき. Trong thứ trong tuần: げつ. Tháng trong năm: がつ.",
  [("毎月", "まいつき", "maitsuki", "hàng tháng", "kun", "月 đọc つき"),
   ("一月", "いちがつ", "ichigatsu", "tháng Một", "on", "月 đọc がつ khi đếm tháng")],
  [("月がきれいです。", "つきがきれいです。", "Tsuki ga kirei desu.", "Mặt trăng rất đẹp."),
   ("来月試験があります。", "らいげつしけんがあります。", "Raigetsu shiken ga arimasu.", "Tháng sau có kỳ thi.")])
K("火", "Kun ひ = lửa. On か trong thứ Ba và từ Hán.",
  [("火山", "かざん", "kazan", "núi lửa", "on", "火 đọc か trong từ ghép"),
   ("火力", "かりょく", "karyoku", "hỏa lực", "on", "cùng âm on カ")],
  [("火を消してください。", "ひをけしてください。", "Hi o keshite kudasai.", "Hãy tắt lửa."),
   ("火曜日に会いましょう。", "かようびにあいましょう。", "Kayoubi ni aimashou.", "Thứ Ba mình gặp nhau nhé.")])
K("水", "Kun みず khi nói nước. On すい trong từ ghép (水曜日, 水道).",
  [("水道", "すいどう", "suidou", "nước máy", "on", "水 đọc すい"),
   ("水着", "みずぎ", "mizugi", "đồ bơi", "kun", "水 đọc みず")],
  [("水を一杯ください。", "みずをいっぱいください。", "Mizu o ippai kudasai.", "Cho tôi một cốc nước."),
   ("水曜日は休みです。", "すいようびはやすみです。", "Suiyoubi wa yasumi desu.", "Thứ Tư được nghỉ.")])
K("木", "Kun き = cây. On もく trong thứ Năm.",
  [("木材", "もくざい", "mokuzai", "gỗ", "on", "木 đọc もく"),
   ("並木", "なみき", "namiki", "hàng cây", "kun", "木 đọc き")],
  [("庭に木があります。", "にわにきがあります。", "Niwa ni ki ga arimasu.", "Trong vườn có cây."),
   ("木曜日にテストがあります。", "もくようびにテストがあります。", "Mokuyoubi ni tesuto ga arimasu.", "Thứ Năm có bài kiểm tra.")])
K("金", "Kun かね = tiền. On きん = vàng / thứ Sáu.",
  [("金色", "きんいろ", "kin'iro", "màu vàng kim", "on", "金 đọc きん"),
   ("代金", "だいきん", "daikin", "tiền phải trả", "on", "cùng âm on")],
  [("お金がありません。", "おかねがありません。", "Okane ga arimasen.", "Tôi không có tiền."),
   ("金曜日の夜は映画を見ます。", "きんようびのよるはえいがをみます。", "Kinyoubi no yoru wa eiga o mimasu.", "Tối thứ Sáu tôi xem phim.")])
K("土", "Kun つち = đất. On ど trong thứ Bảy, 土地.",
  [("土木", "どぼく", "doboku", "công trình dân dụng", "on", "土 đọc ど"),
   ("土産", "みやげ", "miyage", "quà lưu niệm", "kun", "đọc đặc biệt みやげ")],
  [("土を触らないでください。", "つちをさわらないでください。", "Tsuchi o sawaranaide kudasai.", "Đừng sờ đất."),
   ("土曜日は家にいます。", "どようびはいえにいます。", "Doyoubi wa ie ni imasu.", "Thứ Bảy tôi ở nhà.")])
K("人", "Kun ひと. On じん (người nước nào), にん (đếm người).",
  [("外国人", "がいこくじん", "gaikokujin", "người nước ngoài", "on", "人 đọc じん"),
   ("三人", "さんにん", "sannin", "ba người", "on", "人 đọc にん khi đếm")],
  [("あの人は先生です。", "あのひとはせんせいです。", "Ano hito wa sensei desu.", "Người kia là giáo viên."),
   ("日本人の友達がいます。", "にほんじんのともだちがいます。", "Nihonjin no tomodachi ga imasu.", "Tôi có bạn người Nhật.")])
K("口", "Kun くち = miệng / cửa. On こう trong từ Hán.",
  [("人口", "じんこう", "jinkou", "dân số", "on", "口 đọc こう"),
   ("悪口", "わるくち", "warukuchi", "nói xấu", "kun", "口 đọc くち")],
  [("口を開けてください。", "くちをあけてください。", "Kuchi o akete kudasai.", "Hãy há miệng."),
   ("入口はあちらです。", "いりぐちはあちらです。", "Iriguchi wa achira desu.", "Lối vào ở phía kia.")])
K("目", "Kun め = mắt. On もく trong 注目, 目的.",
  [("目的", "もくてき", "mokuteki", "mục đích", "on", "目 đọc もく"),
   ("目玉", "めだま", "medama", "nhãn cầu", "kun", "目 đọc め")],
  [("目が痛いです。", "めがいたいです。", "Me ga itai desu.", "Mắt tôi đau."),
   ("もう一度目を閉じてください。", "もういちどめをとじてください。", "Mou ichido me o tojite kudasai.", "Hãy nhắm mắt lần nữa.")])
K("耳", "Thường kun みみ. On じ trong từ y khoa.",
  [("耳元", "みみもと", "mimimoto", "sát tai", "kun", "耳 đọc みみ"),
   ("中耳", "ちゅうじ", "chuuji", "tai giữa", "on", "耳 đọc じ")],
  [("音楽を耳で聞きます。", "おんがくをみみでききます。", "Ongaku o mimi de kikimasu.", "Tôi nghe nhạc bằng tai."),
   ("耳を澄ましてください。", "みみをすましてください。", "Mimi o sumashite kudasai.", "Hãy lắng tai.")])
K("手", "Kun て rất phổ biến. On しゅ trong 上手 / 下手 (đọc đặc biệt).",
  [("手元", "てもと", "temoto", "trong tầm tay", "kun", "手 đọc て"),
   ("下手", "へた", "heta", "vụng", "on", "đọc đặc biệt へた")],
  [("手を洗ってください。", "てをあらってください。", "Te o aratte kudasai.", "Hãy rửa tay."),
   ("彼女は料理が上手です。", "かのじょはりょうりがじょうずです。", "Kanojo wa ryouri ga jouzu desu.", "Cô ấy nấu ăn giỏi.")])
K("足", "Kun あし = chân. On そく trong 不足.",
  [("足音", "あしおと", "ashioto", "tiếng bước chân", "kun", "足 đọc あし"),
   ("満足", "まんぞく", "manzoku", "hài lòng", "on", "足 đọc ぞく")],
  [("足が痛いので走りません。", "あしがいたいのはしりません。", "Ashi ga itai node hashirimasen.", "Chân đau nên tôi không chạy."),
   ("時間が足りません。", "じかんがたりません。", "Jikan ga tarimasen.", "Không đủ thời gian.")])
K("山", "Kun やま. On さん sau tên núi (富士山).",
  [("山田", "やまだ", "yamada", "Yamada (họ)", "kun", "山 đọc やま"),
   ("火山", "かざん", "kazan", "núi lửa", "on", "山 đọc ざん (rendaku)")],
  [("山に登りたいです。", "やまにのぼりたいです。", "Yama ni noboritai desu.", "Tôi muốn leo núi."),
   ("富士山は日本一高いです。", "ふじさんはにほんいちたかいです。", "Fujisan wa nihon ichi takai desu.", "Phú Sĩ cao nhất Nhật.")])
K("川", "Kun かわ. On せん ít gặp ở N5.",
  [("川辺", "かわべ", "kawabe", "bờ sông", "kun", "川 đọc かわ"),
   ("河川", "かせん", "kasen", "sông ngòi", "on", "川 đọc せん")],
  [("川で魚を見ました。", "かわでさかなをみました。", "Kawa de sakana o mimashita.", "Tôi thấy cá dưới sông."),
   ("この川は長いです。", "このかわはながいです。", "Kono kawa wa nagai desu.", "Con sông này dài.")])
K("田", "Kun た / だ trong họ. On でん trong 水田.",
  [("田んぼ", "たんぼ", "tanbo", "ruộng", "kun", "nói hàng ngày"),
   ("油田", "ゆでん", "yuden", "mỏ dầu", "on", "田 đọc でん")],
  [("田中さんは先生です。", "たなかさんはせんせいです。", "Tanaka-san wa sensei desu.", "Anh Tanaka là giáo viên."),
   ("春に田に水を入れます。", "はるにたにみずをいれます。", "Haru ni ta ni mizu o iremasu.", "Mùa xuân người ta dẫn nước vào ruộng.")])
K("天", "Thường on てん. Kun あま trong 雨天 ít dùng N5.",
  [("天使", "てんし", "tenshi", "thiên thần", "on", "天 đọc てん"),
   ("天才", "てんさい", "tensai", "thiên tài", "on", "cùng âm on")],
  [("天気はどうですか。", "てんきはどうですか。", "Tenki wa dou desu ka.", "Thời tiết thế nào?"),
   ("雨の日は家にいます。", "あめのひはいえにいます。", "Ame no hi wa ie ni imasu.", "Ngày mưa tôi ở nhà.")])
K("気", "On き rất năng sản: 元気, 天気, 気持ち.",
  [("気持ち", "きもち", "kimochi", "cảm giác", "on", "気 đọc き"),
   ("人気", "にんき", "ninki", "được yêu thích", "on", "気 đọc き")],
  [("元気ですか。", "げんきですか。", "Genki desu ka.", "Bạn khỏe không?"),
   ("気がつきませんでした。", "きがつきませんでした。", "Ki ga tsukimasen deshita.", "Tôi đã không để ý.")])

# numbers and the rest — compact generator with unique compounds
MORE = {
"一": ("Một mình ひと. On いち trong đếm và 一日 (いちにち / ついたち).",
      [("一緒", "いっしょ", "issho", "cùng nhau", "on", "一 đọc いっ (sokuon)"),
       ("一人で", "ひとりで", "hitori de", "một mình", "kun", "一 đọc ひと")],
      [("一つください。", "ひとつください。", "Hitotsu kudasai.", "Cho tôi một cái."),
       ("一日中勉強しました。", "いちにちじゅうべんきょうしました。", "Ichinichijuu benkyou shimashita.", "Tôi học cả ngày.")]),
"二": ("Kun ふた. On に. Tháng Hai = にがつ.",
      [("二つ", "ふたつ", "futatsu", "hai cái", "kun", "二 đọc ふた"),
       ("二十歳", "はたち", "hatachi", "20 tuổi", "kun", "đọc đặc biệt")],
      [("りんごを二つください。", "りんごをふたつください。", "Ringo o futatsu kudasai.", "Cho tôi hai quả táo."),
       ("二月は寒いです。", "にがつはさむいです。", "Nigatsu wa samui desu.", "Tháng Hai lạnh.")]),
"三": ("Kun みっ. On さん.",
      [("三つ", "みっつ", "mittsu", "ba cái", "kun", "三 đọc みっ"),
       ("三角形", "さんかくけい", "sankakukei", "tam giác", "on", "三 đọc さん")],
      [("子どもが三人います。", "こどもがさんにんいます。", "Kodomo ga sannin imasu.", "Có ba đứa trẻ."),
       ("三月は暖かいです。", "さんがつはあたたかいです。", "Sangatsu wa atatakai desu.", "Tháng Ba ấm.")]),
"四": ("Hay đọc よん để tránh し (chết). Tháng Tư = しがつ.",
      [("四つ", "よっつ", "yottsu", "bốn cái", "kun", "四 đọc よっ"),
       ("四季", "しき", "shiki", "bốn mùa", "on", "四 đọc し")],
      [("四時に終わります。", "よじにおわります。", "Yoji ni owarimasu.", "Hết lúc bốn giờ."),
       ("四月から新学期です。", "しがつからしんがっきです。", "Shigatsu kara shingakki desu.", "Từ tháng Tư là học kỳ mới.")]),
"五": ("Kun いつ. On ご.",
      [("五つ", "いつつ", "itsutsu", "năm cái", "kun", "五 đọc いつ"),
       ("五十", "ごじゅう", "gojuu", "năm mươi", "on", "五 đọc ご")],
      [("五日に会いましょう。", "いつかにあいましょう。", "Itsuka ni aimashou.", "Gặp nhau ngày mồng năm nhé."),
       ("五月はゴールデンウィークです。", "ごがつはゴールデンウィークです。", "Gogatsu wa gooruden wiiku desu.", "Tháng Năm có Golden Week.")]),
"六": ("Kun むっ. On ろく.",
      [("六つ", "むっつ", "muttsu", "sáu cái", "kun", "六 đọc むっ"),
       ("十六", "じゅうろく", "juuroku", "mười sáu", "on", "六 đọc ろく")],
      [("六時に起きます。", "ろくじにおきます。", "Rokuji ni okimasu.", "Tôi dậy lúc sáu giờ."),
       ("六月は梅雨です。", "ろくがつはつゆです。", "Rokugatsu wa tsuyu desu.", "Tháng Sáu là mùa mưa.")]),
"七": ("Kun なな / なの. On しち (tháng Bảy しちがつ).",
      [("七つ", "ななつ", "nanatsu", "bảy cái", "kun", "七 đọc なな"),
       ("七夕", "たなばた", "tanabata", "lễ Tanabata", "kun", "đọc đặc biệt")],
      [("七日まで待ってください。", "なのかまでまってください。", "Nanoka made matte kudasai.", "Hãy đợi đến mồng bảy."),
       ("七月は夏休みです。", "しちがつはなつやすみです。", "Shichigatsu wa natsuyasumi desu.", "Tháng Bảy là nghỉ hè.")]),
"八": ("Kun やっ / よう. On はち.",
      [("八つ", "やっつ", "yattsu", "tám cái", "kun", "八 đọc やっ"),
       ("八百", "はっぴゃく", "happyaku", "tám trăm", "on", "八 đọc はっ")],
      [("八時の電車に乗ります。", "はちじのでんしゃにのります。", "Hachiji no densha ni norimasu.", "Tôi lên tàu tám giờ."),
       ("八月はとても暑いです。", "はちがつはとてもあついです。", "Hachigatsu wa totemo atsui desu.", "Tháng Tám rất nóng.")]),
"九": ("Kun ここの. On きゅう / く (九月 = くがつ).",
      [("九つ", "ここのつ", "kokonotsu", "chín cái", "kun", "九 đọc ここの"),
       ("九州", "きゅうしゅう", "kyuushuu", "Kyushu", "on", "九 đọc きゅう")],
      [("九日に旅行します。", "ここのかにりょこうします。", "Kokonoka ni ryokou shimasu.", "Ngày mồng chín tôi đi du lịch."),
       ("九月は秋です。", "くがつはあきです。", "Kugatsu wa aki desu.", "Tháng Chín là mùa thu.")]),
"十": ("Kun とお. On じゅう.",
      [("十日", "とおか", "tooka", "mồng mười", "kun", "十 đọc とお"),
       ("十字", "じゅうじ", "juuji", "chữ thập", "on", "十 đọc じゅう")],
      [("十時に寝ます。", "じゅうじにねます。", "Juuji ni nemasu.", "Tôi ngủ lúc mười giờ."),
       ("十月は涼しいです。", "じゅうがつはすずしいです。", "Juugatsu wa suzushii desu.", "Tháng Mười mát.")]),
"百": ("On ひゃく. Không dùng kun ở N5.",
      [("百円", "ひゃくえん", "hyakuen", "100 yên", "on", "百 đọc ひゃく"),
       ("三百", "さんびゃく", "sanbyaku", "ba trăm", "on", "rendaku びゃく")],
      [("これは百円です。", "これはひゃくえんです。", "Kore wa hyakuen desu.", "Cái này 100 yên."),
       ("百人ぐらい来ました。", "ひゃくにんぐらいきました。", "Hyakunin gurai kimashita.", "Khoảng một trăm người đến.")]),
"千": ("On せん. 三千 = さんぜん.",
      [("千円", "せんえん", "sen'en", "1000 yên", "on", "千 đọc せん"),
       ("三千", "さんぜん", "sanzen", "ba nghìn", "on", "千 đọc ぜん")],
      [("本は千円です。", "ほんはせんえんです。", "Hon wa sen'en desu.", "Quyển sách 1000 yên."),
       ("千人の人がいます。", "せんにんのひとがいます。", "Sennin no hito ga imasu.", "Có một nghìn người.")]),
"万": ("On まん. 1万 = 10.000.",
      [("一万円", "いちまんえん", "ichiman'en", "10.000 yên", "on", "万 đọc まん"),
       ("十万", "じゅうまん", "juuman", "100.000", "on", "cùng âm")],
      [("家賃は十万円です。", "やちんはじゅうまんえんです。", "Yachin wa juuman'en desu.", "Tiền nhà 100.000 yên."),
       ("万が一つ遅れたら電話します。", "まんひとつおくれたらでんわします。", "Man ga hitotsu okuretara denwa shimasu.", "Nếu chẳng may trễ tôi sẽ gọi.")]),
"円": ("On えん = yên. Cũng nghĩa hình tròn.",
      [("円い", "まるい", "marui", "tròn", "kun", "thường viết 丸い"),
       ("円高", "えんだか", "endaka", "yên tăng giá", "on", "円 đọc えん")],
      [("これは五百円です。", "これはごひゃくえんです。", "Kore wa gohyakuen desu.", "Cái này 500 yên."),
       ("円で払います。", "えんではらいます。", "En de haraimasu.", "Tôi trả bằng yên.")]),
"年": ("On ねん. Kun とし.",
      [("今年", "ことし", "kotoshi", "năm nay", "kun", "đọc đặc biệt ことし"),
       ("来年", "らいねん", "rainen", "năm sau", "on", "年 đọc ねん")],
      [("今年は忙しいです。", "ことしはいそがしいです。", "Kotoshi wa isogashii desu.", "Năm nay tôi bận."),
       ("来年日本へ行きます。", "らいねんにほんへいきます。", "Rainen nihon e ikimasu.", "Năm sau tôi đi Nhật.")]),
"時": ("On じ khi nói giờ. Kun とき = lúc.",
      [("時間", "じかん", "jikan", "thời gian", "on", "時 đọc じ"),
       ("時々", "ときどき", "tokidoki", "thỉnh thoảng", "kun", "時 đọc とき")],
      [("今、何時ですか。", "いま、なんじですか。", "Ima, nanji desu ka.", "Bây giờ là mấy giờ?"),
       ("子供の時、よく遊びました。", "こどものとき、よくあそびました。", "Kodomo no toki, yoku asobimashita.", "Lúc nhỏ tôi hay chơi.")]),
"分": ("On ふん/ぷん = phút. Kun わ・ける = chia.",
      [("五分", "ごふん", "gofun", "năm phút", "on", "分 đọc ふん"),
       ("自分", "じぶん", "jibun", "bản thân", "on", "分 đọc ぶん")],
      [("三分待ってください。", "さんぷんまってください。", "Sanpun matte kudasai.", "Hãy đợi ba phút."),
       ("わかりません。自分で考えます。", "わかりません。じぶんでかんがえます。", "Wakarimasen. Jibun de kangaemasu.", "Tôi chưa hiểu. Tôi sẽ tự nghĩ.")]),
"半": ("On はん = nửa. 一時半 = 1:30.",
      [("半年", "はんとし", "hantoshi", "nửa năm", "on", "半 đọc はん"),
       ("半分", "はんぶん", "hanbun", "một nửa", "on", "cùng âm")],
      [("今、二時半です。", "いま、にじはんです。", "Ima, niji han desu.", "Bây giờ là 2 rưỡi."),
       ("ケーキを半分食べました。", "ケーキをはんぶんたべました。", "Keeki o hanbun tabemashita.", "Tôi ăn một nửa bánh.")]),
"今": ("Kun いま. On こん trong 今日, 今週, 今年 (đọc đặc biệt).",
      [("今週", "こんしゅう", "konshuu", "tuần này", "on", "今 đọc こん"),
       ("今夜", "こんや", "konya", "tối nay", "on", "cùng âm")],
      [("今、何をしていますか。", "いま、なにをしていますか。", "Ima, nani o shite imasu ka.", "Bây giờ bạn đang làm gì?"),
       ("今日は暑いです。", "きょうはあついです。", "Kyou wa atsui desu.", "Hôm nay nóng.")]),
"先": ("On せん. 先生, 先週, 先に.",
      [("先週", "せんしゅう", "senshuu", "tuần trước", "on", "先 đọc せん"),
       ("先に", "さきに", "saki ni", "trước", "kun", "先 đọc さき")],
      [("先生に質問します。", "せんせいにしつもんします。", "Sensei ni shitsumon shimasu.", "Tôi hỏi thầy cô."),
       ("先に行ってください。", "さきにいってください。", "Saki ni itte kudasai.", "Hãy đi trước.")]),
"生": ("On せい / しょう. Kun い・きる, う・まれる.",
      [("学生", "がくせい", "gakusei", "học sinh", "on", "生 đọc せい"),
       ("生きる", "いきる", "ikiru", "sống", "kun", "生 đọc い")],
      [("大学生です。", "だいがくせいです。", "Daigakusei desu.", "Tôi là sinh viên."),
       ("ここで生まれました。", "ここでうまれました。", "Koko de umaremashita.", "Tôi sinh ra ở đây.")]),
"学": ("On がく. 学校, 学生, 大学.",
  [("大学", "だいがく", "daigaku", "đại học", "on", "学 đọc がく"),
   ("科学", "かがく", "kagaku", "khoa học", "on", "cùng âm")],
  [("日本語を学んでいます。", "にほんごをまなんでいます。", "Nihongo o manande imasu.", "Tôi đang học tiếng Nhật."),
   ("学校は八時に始まります。", "がっこうははちじにはじまります。", "Gakkou wa hachiji ni hajimarimasu.", "Trường bắt đầu lúc 8 giờ.")]),
"校": ("On こう. Gần như luôn trong 学校, 校長.",
  [("校長", "こうちょう", "kouchou", "hiệu trưởng", "on", "校 đọc こう"),
   ("高校", "こうこう", "koukou", "cấp 3", "on", "cùng âm")],
  [("学校まで歩きます。", "がっこうまであるきます。", "Gakkou made arukimasu.", "Tôi đi bộ đến trường."),
   ("高校で英語を勉強しました。", "こうこうでえいごをべんきょうしました。", "Koukou de eigo o benkyou shimashita.", "Tôi học tiếng Anh ở cấp 3.")]),
}
for ch, data in MORE.items():
    K(ch, data[0], data[1], data[2])

REST_N5 = {
"入": ("Kun はい・る / い・れる. On にゅう.",
      [("入学", "にゅうがく", "nyuugaku", "nhập học", "on", "入 đọc にゅう"),
       ("入り口", "いりぐち", "iriguchi", "lối vào", "kun", "入 đọc いり")],
      [("部屋に入ってください。", "へやにはいってください。", "Heya ni haitte kudasai.", "Hãy vào phòng."),
       ("名前を入れてください。", "なまえをいれてください。", "Namae o irete kudasai.", "Hãy điền tên.")]),
"出": ("Kun で・る / だ・す. On しゅつ.",
      [("出口", "でぐち", "deguchi", "lối ra", "kun", "出 đọc で"),
       ("出発", "しゅっぱつ", "shuppatsu", "xuất phát", "on", "出 đọc しゅっ")],
      [("家を出ます。", "いえをでます。", "Ie o demasu.", "Tôi ra khỏi nhà."),
       ("宿題を出してください。", "しゅくだいをだしてください。", "Shukudai o dashite kudasai.", "Hãy nộp bài tập.")]),
"上": ("Kun うえ / あ・がる / のぼ・る. On じょう.",
      [("上手", "じょうず", "jouzu", "giỏi", "on", "đọc đặc biệt"),
       ("上着", "うわぎ", "uwagi", "áo khoác", "kun", "上 đọc うわ")],
      [("机の上に本があります。", "つくえのうえにほんがあります。", "Tsukue no ue ni hon ga arimasu.", "Trên bàn có sách."),
       ("階段を上がってください。", "かいだんをあがってください。", "Kaidan o agatte kudasai.", "Hãy lên cầu thang.")]),
"下": ("Kun した / さ・がる / くだ・る. On か / げ.",
      [("下手", "へた", "heta", "vụng", "on", "đọc đặc biệt"),
       ("地下鉄", "ちかてつ", "chikatetsu", "tàu điện ngầm", "on", "下 đọc か")],
      [("椅子の下に猫がいます。", "いすのしたにねこがいます。", "Isu no shita ni neko ga imasu.", "Dưới ghế có con mèo."),
       ("値段が下がります。", "ねだんがさがります。", "Nedan ga sagarimasu.", "Giá giảm.")]),
"中": ("Kun なか. On ちゅう.",
      [("中国", "ちゅうごく", "chuugoku", "Trung Quốc", "on", "中 đọc ちゅう"),
       ("中学生", "ちゅうがくせい", "chuugakusei", "học sinh cấp 2", "on", "cùng âm")],
      [("箱の中に何がありますか。", "はこのなかになにがありますか。", "Hako no naka ni nani ga arimasu ka.", "Trong hộp có gì?"),
       ("今、勉強中です。", "いま、べんきょうちゅうです。", "Ima, benkyou chuu desu.", "Bây giờ tôi đang học.")]),
"外": ("Kun そと / はず・れる. On がい.",
      [("外国", "がいこく", "gaikoku", "nước ngoài", "on", "外 đọc がい"),
       ("外見", "がいけん", "gaiken", "bề ngoài", "on", "cùng âm")],
      [("外で遊びます。", "そとであそびます。", "Soto de asobimasu.", "Tôi chơi ngoài trời."),
       ("外国語を勉強しています。", "がいこくごをべんきょうしています。", "Gaikokugo o benkyou shite imasu.", "Tôi đang học ngoại ngữ.")]),
"前": ("Kun まえ. On ぜん.",
      [("名前", "なまえ", "namae", "tên", "kun", "前 đọc まえ"),
       ("午前", "ごぜん", "gozen", "buổi sáng", "on", "前 đọc ぜん")],
      [("駅の前で待ってください。", "えきのまえでまってください。", "Eki no mae de matte kudasai.", "Hãy đợi trước ga."),
       ("ご飯の前に手を洗います。", "ごはんのまえにてをあらいます。", "Gohan no mae ni te o araimasu.", "Trước cơm tôi rửa tay.")]),
"後": ("Kun あと / うし・ろ. On ご.",
      [("午後", "ごご", "gogo", "buổi chiều", "on", "後 đọc ご"),
       ("最後", "さいご", "saigo", "cuối cùng", "on", "cùng âm")],
      [("授業の後で話しましょう。", "じゅぎょうのあとではなしましょう。", "Jugyou no ato de hanashimashou.", "Sau giờ học mình nói chuyện nhé."),
       ("後ろを見てください。", "うしろをみてください。", "Ushiro o mite kudasai.", "Hãy nhìn phía sau.")]),
"右": ("Kun みぎ. On う / ゆう.",
      [("右手", "みぎて", "migite", "tay phải", "kun", "右 đọc みぎ"),
       ("左右", "さゆう", "sayuu", "trái phải", "on", "右 đọc ゆう")],
      [("右に曲がってください。", "みぎにまがってください。", "Migi ni magatte kudasai.", "Hãy rẽ phải."),
       ("右側を歩きます。", "みぎがわをあるきます。", "Migigawa o arukimasu.", "Tôi đi phía bên phải.")]),
"左": ("Kun ひだり. On さ.",
      [("左手", "ひだりて", "hidarite", "tay trái", "kun", "左 đọc ひだり"),
       ("左右", "さゆう", "sayuu", "trái phải", "on", "左 đọc さ")],
      [("左に銀行があります。", "ひだりにぎんこうがあります。", "Hidari ni ginkou ga arimasu.", "Bên trái có ngân hàng."),
       ("左側に座ってください。", "ひだりがわにすわってください。", "Hidarigawa ni suwatte kudasai.", "Hãy ngồi bên trái.")]),
"東": ("Kun ひがし. On とう (東京, 東).",
      [("東京", "とうきょう", "toukyou", "Tokyo", "on", "東 đọc とう"),
       ("東西", "とうざい", "touzai", "đông tây", "on", "cùng âm")],
      [("東に太陽がのぼります。", "ひがしにたいようがのぼります。", "Higashi ni taiyou ga noborimasu.", "Mặt trời mọc ở phía đông."),
       ("東京へ行きたいです。", "とうきょうへいきたいです。", "Toukyou e ikitai desu.", "Tôi muốn đi Tokyo.")]),
"西": ("Kun にし. On せい / さい.",
      [("西口", "にしぐち", "nishiguchi", "cửa tây", "kun", "西 đọc にし"),
      ("関西", "かんさい", "kansai", "Vùng Kansai", "on", "西 đọc さい")],
      [("西の空が赤いです。", "にしのそらがあかいです。", "Nishi no sora ga akai desu.", "Bầu trời phía tây đỏ."),
       ("駅の西口で会いましょう。", "えきのにしぐちであいましょう。", "Eki no nishiguchi de aimashou.", "Gặp ở cửa tây nhà ga nhé.")]),
"南": ("Kun みなみ. On なん.",
      [("南口", "みなみぐち", "minamiguchi", "cửa nam", "kun", "南 đọc みなみ"),
       ("南極", "なんきょく", "nankyoku", "Nam Cực", "on", "南 đọc なん")],
      [("南は暖かいです。", "みなみはあたたかいです。", "Minami wa atatakai desu.", "Phía nam thì ấm."),
       ("地図の南を見てください。", "ちずのみなみをみてください。", "Chizu no minami o mite kudasai.", "Hãy nhìn phía nam trên bản đồ.")]),
"北": ("Kun きた. On ほく.",
      [("北口", "きたぐち", "kitaguchi", "cửa bắc", "kun", "北 đọc きた"),
       ("北海道", "ほっかいどう", "hokkaidou", "Hokkaido", "on", "北 đọc ほっ")],
      [("北は寒いです。", "きたはさむいです。", "Kita wa samui desu.", "Phía bắc lạnh."),
       ("北海道へ行きたいです。", "ほっかいどうへいきたいです。", "Hokkaidou e ikitai desu.", "Tôi muốn đi Hokkaido.")]),
"車": ("Kun くるま. On しゃ (電車, 自転車).",
      [("電車", "でんしゃ", "densha", "tàu điện", "on", "車 đọc しゃ"),
       ("自転車", "じてんしゃ", "jitensha", "xe đạp", "on", "cùng âm")],
      [("車で行きます。", "くるまでいきます。", "Kuruma de ikimasu.", "Tôi đi bằng ô tô."),
       ("駐車場は向こうです。", "ちゅうしゃじょうはむこうです。", "Chuushajou wa mukou desu.", "Bãi đỗ xe ở phía kia.")]),
"電": ("On でん. Điện: 電気, 電話, 電車.",
      [("電気", "でんき", "denki", "điện / đèn", "on", "電 đọc でん"),
       ("電子", "でんし", "denshi", "điện tử", "on", "cùng âm")],
      [("電気をつけてください。", "でんきをつけてください。", "Denki o tsukete kudasai.", "Hãy bật đèn."),
       ("電話番号を教えてください。", "でんわばんごうをおしえてください。", "Denwa bangou o oshiete kudasai.", "Hãy cho tôi số điện thoại.")]),
"話": ("Kun はな・す / はなし. On わ.",
      [("会話", "かいわ", "kaiwa", "hội thoại", "on", "話 đọc わ"),
       ("話題", "わだい", "wadai", "chủ đề", "on", "cùng âm")],
      [("友達と話します。", "ともだちとはなします。", "Tomodachi to hanashimasu.", "Tôi nói chuyện với bạn."),
       ("面白い話を聞きました。", "おもしろいはなしをききました。", "Omoshiroi hanashi o kikimashita.", "Tôi nghe một câu chuyện thú vị.")]),
"語": ("On ご = ngôn ngữ. 日本語, 英語.",
      [("英語", "えいご", "eigo", "tiếng Anh", "on", "語 đọc ご"),
       ("物語", "ものがたり", "monogatari", "câu chuyện", "kun", "語 đọc がたり")],
      [("日本語を話します。", "にほんごをはなします。", "Nihongo o hanashimasu.", "Tôi nói tiếng Nhật."),
       ("外国語は難しいです。", "がいこくごはむずかしいです。", "Gaikokugo wa muzukashii desu.", "Ngoại ngữ thì khó.")]),
"読": ("Kun よ・む. On どく.",
      [("読書", "どくしょ", "dokusho", "đọc sách", "on", "読 đọc どく"),
       ("読み方", "よみかた", "yomikata", "cách đọc", "kun", "読 đọc よ")],
      [("本を読んでいます。", "ほんをよんでいます。", "Hon o yonde imasu.", "Tôi đang đọc sách."),
       ("この漢字の読み方を教えてください。", "このかんじのよみかたをおしえてください。", "Kono kanji no yomikata o oshiete kudasai.", "Hãy dạy cách đọc kanji này.")]),
"書": ("Kun か・く. On しょ.",
      [("辞書", "じしょ", "jisho", "từ điển", "on", "書 đọc しょ"),
       ("教科書", "きょうかしょ", "kyoukasho", "sách giáo khoa", "on", "cùng âm")],
      [("手紙を書きます。", "てがみをかきます。", "Tegami o kakimasu.", "Tôi viết thư."),
       ("名前を書いてください。", "なまえをかいてください。", "Namae o kaite kudasai.", "Hãy viết tên.")]),
"見": ("Kun み・る. On けん.",
      [("見物", "けんぶつ", "kenbutsu", "tham quan", "on", "見 đọc けん"),
       ("意見", "いけん", "iken", "ý kiến", "on", "cùng âm")],
      [("映画を見ます。", "えいがをみます。", "Eiga o mimasu.", "Tôi xem phim."),
       ("見てください。きれいです。", "みてください。きれいです。", "Mite kudasai. Kirei desu.", "Hãy nhìn. Đẹp quá.")]),
"聞": ("Kun き・く. On ぶん / もん.",
      [("新聞", "しんぶん", "shinbun", "báo", "on", "聞 đọc ぶん"),
       ("聴聞", "ちょうもん", "choumon", "lắng nghe (hành chính)", "on", "ít dùng N5")],
      [("音楽を聞きます。", "おんがくをききます。", "Ongaku o kikimasu.", "Tôi nghe nhạc."),
       ("先生の話をよく聞いてください。", "せんせいのはなしをよくきいてください。", "Sensei no hanashi o yoku kiite kudasai.", "Hãy nghe kỹ lời thầy cô.")]),
"食": ("Kun た・べる. On しょく.",
      [("食事", "しょくじ", "shokuji", "bữa ăn", "on", "食 đọc しょく"),
       ("食堂", "しょくどう", "shokudou", "nhà ăn", "on", "cùng âm")],
      [("朝ごはんを食べます。", "あさごはんをたべます。", "Asagohan o tabemasu.", "Tôi ăn sáng."),
       ("一緒に食事しませんか。", "いっしょにしょくじしませんか。", "Issho ni shokuji shimasen ka.", "Cùng ăn cơm chứ?")]),
"飲": ("Kun の・む. On いん.",
      [("飲み物", "のみもの", "nomimono", "đồ uống", "kun", "飲 đọc の"),
       ("飲食", "いんしょく", "inshoku", "ăn uống", "on", "飲 đọc いん")],
      [("水を飲みます。", "みずをのみます。", "Mizu o nomimasu.", "Tôi uống nước."),
       ("ここで飲まないでください。", "ここでのまないでください。", "Koko de nomanaide kudasai.", "Đừng uống ở đây.")]),
"買": ("Kun か・う. On ばい.",
      [("買い物", "かいもの", "kaimono", "mua sắm", "kun", "買 đọc かい"),
       ("売買", "ばいばい", "baibai", "mua bán", "on", "買 đọc ばい")],
      [("パンを買います。", "パンをかいます。", "Pan o kaimasu.", "Tôi mua bánh mì."),
       ("スーパーで買い物します。", "スーパーでかいものします。", "Suupaa de kaimono shimasu.", "Tôi mua sắm ở siêu thị.")]),
"行": ("Kun い・く / おこな・う. On こう / ぎょう.",
      [("銀行", "ぎんこう", "ginkou", "ngân hàng", "on", "行 đọc こう"),
       ("旅行", "りょこう", "ryokou", "du lịch", "on", "cùng âm")],
      [("学校へ行きます。", "がっこうへいきます。", "Gakkou e ikimasu.", "Tôi đến trường."),
       ("京都へ旅行したいです。", "きょうとへりょこうしたいです。", "Kyouto e ryokou shitai desu.", "Tôi muốn du lịch Kyoto.")]),
"来": ("Kun く・る. On らい.",
      [("来週", "らいしゅう", "raishuu", "tuần sau", "on", "来 đọc らい"),
       ("未来", "みらい", "mirai", "tương lai", "on", "cùng âm")],
      [("明日来てください。", "あしたきてください。", "Ashita kite kudasai.", "Ngày mai hãy đến."),
       ("来年また会いましょう。", "らいねんまたあいましょう。", "Rainen mata aimashou.", "Năm sau gặp lại nhé.")]),
"帰": ("Kun かえ・る. On き.",
      [("帰宅", "きたく", "kitaku", "về nhà", "on", "帰 đọc き"),
       ("帰り道", "かえりみち", "kaerimichi", "đường về", "kun", "帰 đọc かえり")],
      [("六時に帰ります。", "ろくじにかえります。", "Rokuji ni kaerimasu.", "Tôi về lúc sáu giờ."),
       ("そろそろ帰らないと。", "そろそろかえらないと。", "Sorosoro kaeranai to.", "Sắp phải về rồi.")]),
"休": ("Kun やす・む. On きゅう.",
      [("休日", "きゅうじつ", "kyuujitsu", "ngày nghỉ", "on", "休 đọc きゅう"),
       ("休み", "やすみ", "yasumi", "nghỉ", "kun", "休 đọc やす")],
      [("日曜日は休みます。", "にちようびはやすみます。", "Nichiyoubi wa yasumimasu.", "Chủ nhật tôi nghỉ."),
       ("少し休んでください。", "すこしやすんでください。", "Sukoshi yasunde kudasai.", "Hãy nghỉ một chút.")]),
"友": ("Kun とも. On ゆう.",
      [("友人", "ゆうじん", "yuujin", "bạn (trang trọng)", "on", "友 đọc ゆう"),
       ("友情", "ゆうじょう", "yuujou", "tình bạn", "on", "cùng âm")],
      [("友達と遊びます。", "ともだちとあそびます。", "Tomodachi to asobimasu.", "Tôi chơi với bạn."),
       ("いい友達ができました。", "いいともだちができました。", "Ii tomodachi ga dekimashita.", "Tôi kết được người bạn tốt.")]),
"母": ("Kun はは (mẹ mình) / おかあさん. On ぼ.",
      [("母親", "ははおや", "hahaoya", "mẹ", "kun", "母 đọc はは"),
       ("母国", "ぼこく", "bokoku", "tổ quốc", "on", "母 đọc ぼ")],
      [("母は料理が上手です。", "はははりょうりがじょうずです。", "Haha wa ryouri ga jouzu desu.", "Mẹ tôi nấu ăn giỏi."),
       ("お母さんはいますか。", "おかあさんはいますか。", "Okaasan wa imasu ka.", "Mẹ bạn có nhà không?")]),
"父": ("Kun ちち (bố mình) / おとうさん. On ふ.",
      [("父親", "ちちおや", "chichioya", "bố", "kun", "父 đọc ちち"),
       ("祖父", "そふ", "sofu", "ông nội/ngoại", "on", "父 đọc ふ")],
      [("父は会社員です。", "ちちはかいしゃいんです。", "Chichi wa kaishain desu.", "Bố tôi là nhân viên công ty."),
       ("お父さんに聞いてください。", "おとうさんにきいてください。", "Otousan ni kiite kudasai.", "Hãy hỏi bố.")]),
"女": ("Kun おんな. On じょ.",
      [("女性", "じょせい", "josei", "phụ nữ", "on", "女 đọc じょ"),
       ("彼女", "かのじょ", "kanojo", "cô ấy / bạn gái", "on", "cùng âm")],
      [("女の子が三人います。", "おんなのこがさんにんいます。", "Onna no ko ga sannin imasu.", "Có ba bé gái."),
       ("彼女は学生です。", "かのじょはがくせいです。", "Kanojo wa gakusei desu.", "Cô ấy là học sinh.")]),
"男": ("Kun おとこ. On だん.",
      [("男性", "だんせい", "dansei", "nam giới", "on", "男 đọc だん"),
       ("長男", "ちょうなん", "chounan", "con trai cả", "on", "cùng âm")],
      [("男の子が走っています。", "おとこのこがはしっています。", "Otoko no ko ga hashitte imasu.", "Bé trai đang chạy."),
       ("男性の方が多いです。", "だんせいのほうがおおいです。", "Dansei no hou ga ooi desu.", "Nam giới đông hơn.")]),
"子": ("Kun こ. On し.",
      [("子供", "こども", "kodomo", "trẻ em", "kun", "子 đọc こ"),
       ("椅子", "いす", "isu", "ghế", "on", "đọc đặc biệt")],
      [("子供が公園で遊んでいます。", "こどもがこうえんであそんでいます。", "Kodomo ga kouen de asonde imasu.", "Trẻ em đang chơi ở công viên."),
       ("電子辞書を使います。", "でんしじしょをつかいます。", "Denshi jisho o tsukaimasu.", "Tôi dùng từ điển điện tử.")]),
"名": ("Kun な. On めい / みょう.",
      [("名前", "なまえ", "namae", "tên", "kun", "名 đọc な"),
       ("有名", "ゆうめい", "yuumei", "nổi tiếng", "on", "名 đọc めい")],
      [("お名前は何ですか。", "おなまえはなんですか。", "Onamae wa nan desu ka.", "Bạn tên gì?"),
       ("この店は有名です。", "このみせはゆうめいです。", "Kono mise wa yuumei desu.", "Cửa hàng này nổi tiếng.")]),
"何": ("Kun なに / なん. On か.",
      [("何人", "なんにん", "nannin", "bao nhiêu người", "kun", "何 đọc なん"),
       ("何か", "なにか", "nanika", "cái gì đó", "kun", "何 đọc なに")],
      [("これは何ですか。", "これはなんですか。", "Kore wa nan desu ka.", "Đây là gì?"),
       ("何を食べますか。", "なにをたべますか。", "Nani o tabemasu ka.", "Bạn ăn gì?")]),
"大": ("Kun おお・きい. On だい / たい.",
      [("大学", "だいがく", "daigaku", "đại học", "on", "大 đọc だい"),
       ("大切", "たいせつ", "taisetsu", "quan trọng", "on", "大 đọc たい")],
      [("大きい犬がいます。", "おおきいいぬがいます。", "Ookii inu ga imasu.", "Có một con chó lớn."),
       ("友達は大切です。", "ともだちはたいせつです。", "Tomodachi wa taisetsu desu.", "Bạn bè thì quan trọng.")]),
"小": ("Kun ちい・さい / こ. On しょう.",
      [("小学校", "しょうがっこう", "shougakkou", "tiểu học", "on", "小 đọc しょう"),
       ("小鳥", "ことり", "kotori", "chim nhỏ", "kun", "小 đọc こ")],
      [("小さい猫が好きです。", "ちいさいねこがすきです。", "Chiisai neko ga suki desu.", "Tôi thích mèo nhỏ."),
       ("小学校で日本語を習いました。", "しょうがっこうでにほんごをならいました。", "Shougakkou de nihongo o naraimashita.", "Tôi học tiếng Nhật từ tiểu học.")]),
"高": ("Kun たか・い. On こう.",
      [("高校", "こうこう", "koukou", "cấp 3", "on", "高 đọc こう"),
       ("最高", "さいこう", "saikou", "tốt nhất", "on", "cùng âm")],
      [("この靴は高いです。", "このくつはたかいです。", "Kono kutsu wa takai desu.", "Đôi giày này đắt."),
       ("高い山に登りました。", "たかいやまにのぼりました。", "Takai yama ni noborimashita.", "Tôi đã leo núi cao.")]),
"安": ("Kun やす・い. On あん.",
      [("安心", "あんしん", "anshin", "yên tâm", "on", "安 đọc あん"),
       ("安全", "あんぜん", "anzen", "an toàn", "on", "cùng âm")],
      [("この店は安いです。", "このみせはやすいです。", "Kono mise wa yasui desu.", "Cửa hàng này rẻ."),
       ("安全に気をつけてください。", "あんぜんにきをつけてください。", "Anzen ni ki o tsukete kudasai.", "Hãy chú ý an toàn.")]),
"新": ("Kun あたら・しい / あら. On しん.",
      [("新聞", "しんぶん", "shinbun", "báo", "on", "新 đọc しん"),
       ("新年", "しんねん", "shinnen", "năm mới", "on", "cùng âm")],
      [("新しい本を買いました。", "あたらしいほんをかいました。", "Atarashii hon o kaimashita.", "Tôi đã mua sách mới."),
       ("新聞を読みます。", "しんぶんをよみます。", "Shinbun o yomimasu.", "Tôi đọc báo.")]),
"古": ("Kun ふる・い. On こ.",
      [("中古", "ちゅうこ", "chuuko", "đã qua sử dụng", "on", "古 đọc こ"),
       ("古本", "ふるほん", "furuhon", "sách cũ", "kun", "古 đọc ふる")],
      [("この家は古いです。", "このいえはふるいです。", "Kono ie wa furui desu.", "Ngôi nhà này cũ."),
       ("古い写真を見ました。", "ふるいしゃしんをみました。", "Furui shashin o mimashita.", "Tôi xem ảnh cũ.")]),
"多": ("Kun おお・い. On た.",
      [("多少", "たしょう", "tashou", "hơi / một chút", "on", "多 đọc た"),
       ("多数", "たすう", "tasuu", "số nhiều", "on", "cùng âm")],
      [("人が多いです。", "ひとがおおいです。", "Hito ga ooi desu.", "Người thì đông."),
       ("質問が多数あります。", "しつもんがたすうあります。", "Shitsumon ga tasuu arimasu.", "Có rất nhiều câu hỏi.")]),
"少": ("Kun すこ・し / すく・ない. On しょう.",
      [("少年", "しょうねん", "shounen", "thiếu niên", "on", "少 đọc しょう"),
       ("少数", "しょうすう", "shousuu", "số ít", "on", "cùng âm")],
      [("少し待ってください。", "すこしまってください。", "Sukoshi matte kudasai.", "Hãy đợi một chút."),
       ("時間は少ししかありません。", "じかんはすこししかありません。", "Jikan wa sukoshi shika arimasen.", "Chỉ còn ít thời gian.")]),
"白": ("Kun しろ / しろ・い. On はく.",
      [("白紙", "はくし", "hakushi", "tờ giấy trắng", "on", "白 đọc はく"),
       ("空白", "くうはく", "kuuhaku", "khoảng trống", "on", "cùng âm")],
      [("白い猫がいます。", "しろいねこがいます。", "Shiroi neko ga imasu.", "Có một con mèo trắng."),
       ("紙は白いです。", "かみはしろいです。", "Kami wa shiroi desu.", "Giấy thì trắng.")]),
"長": ("Kun なが・い. On ちょう.",
      [("校長", "こうちょう", "kouchou", "hiệu trưởng", "on", "長 đọc ちょう"),
       ("社長", "しゃちょう", "shachou", "giám đốc", "on", "cùng âm")],
      [("この川は長いです。", "このかわはながいです。", "Kono kawa wa nagai desu.", "Con sông này dài."),
       ("長い時間待ちました。", "ながいじかんまちました。", "Nagai jikan machimashita.", "Tôi đợi rất lâu.")]),
}
for ch, data in REST_N5.items():
    K(ch, data[0], data[1], data[2])

N4K = {
"会": ("Kun あ・う = gặp. On かい trong 会社, 会議.",
      [("会話", "かいわ", "kaiwa", "hội thoại", "on", "会 đọc かい"),
       ("面会", "めんかい", "menkai", "gặp mặt", "on", "cùng âm")],
      [("駅で友達に会います。", "えきでともだちにあいます。", "Eki de tomodachi ni aimasu.", "Tôi gặp bạn ở ga."),
       ("会議は三時からです。", "かいぎはさんじからです。", "Kaigi wa sanji kara desu.", "Cuộc họp từ 3 giờ.")]),
"社": ("On しゃ. 会社, 社会, 神社.",
      [("社会", "しゃかい", "shakai", "xã hội", "on", "社 đọc しゃ"),
       ("神社", "じんじゃ", "jinja", "đền Shinto", "on", "社 đọc じゃ")],
      [("来年から会社で働きます。", "らいねんからかいしゃではたらきます。", "Rainen kara kaisha de hatarakimasu.", "Từ năm sau tôi làm ở công ty."),
       ("社会の問題を考えます。", "しゃかいのもんだいをかんがえます。", "Shakai no mondai o kangaemasu.", "Tôi nghĩ về vấn đề xã hội.")]),
"発": ("On はつ. 発音, 出発, 発見.",
      [("発見", "はっけん", "hakken", "phát hiện", "on", "発 đọc はっ"),
       ("発表", "はっぴょう", "happyou", "thuyết trình", "on", "cùng âm")],
      [("発音を練習します。", "はつおんをれんしゅうします。", "Hatsuon o renshuu shimasu.", "Tôi luyện phát âm."),
       ("駅を八時に出発します。", "えきをはちじにしゅっぱつします。", "Eki o hachiji ni shuppatsu shimasu.", "Xuất phát ga lúc 8 giờ.")]),
"着": ("Kun き・る = mặc; つ・く = đến. On ちゃく.",
      [("到着", "とうちゃく", "touchaku", "đến nơi", "on", "着 đọc ちゃく"),
       ("下着", "したぎ", "shitagi", "đồ lót", "kun", "着 đọc ぎ")],
      [("白いシャツを着ます。", "しろいシャツをきます。", "Shiroi shatsu o kimasu.", "Tôi mặc áo sơ mi trắng."),
       ("三時に駅に着きます。", "さんじにえきにつきます。", "Sanji ni eki ni tsukimasu.", "Tôi đến ga lúc 3 giờ.")]),
"開": ("Kun ひら・く / あ・ける. On かい.",
      [("開始", "かいし", "kaishi", "bắt đầu", "on", "開 đọc かい"),
       ("公開", "こうかい", "koukai", "công khai", "on", "cùng âm")],
      [("窓を開けてください。", "まどをあけてください。", "Mado o akete kudasai.", "Hãy mở cửa sổ."),
       ("店は九時に開きます。", "みせはくじにひらきます。", "Mise wa kuji ni hirakimasu.", "Cửa hàng mở lúc 9 giờ.")]),
"閉": ("Kun し・める / と・じる. On へい.",
      [("閉会", "へいかい", "heikai", "bế mạc", "on", "閉 đọc へい"),
       ("閉店", "へいてん", "heiten", "đóng cửa hàng", "on", "cùng âm")],
      [("ドアを閉めてください。", "ドアをしめてください。", "Doa o shimete kudasai.", "Hãy đóng cửa."),
       ("目を閉じてください。", "めをとじてください。", "Me o tojite kudasai.", "Hãy nhắm mắt.")]),
"問": ("On もん. 問題, 質問. Kun と・う.",
      [("質問", "しつもん", "shitsumon", "câu hỏi", "on", "問 đọc もん"),
       ("訪問", "ほうもん", "houmon", "thăm", "on", "cùng âm")],
      [("この問題は難しいです。", "このもんだいはむずかしいです。", "Kono mondai wa muzukashii desu.", "Bài này khó."),
       ("先生に質問してもいいですか。", "せんせいしつもんしてもいいですか。", "Sensei ni shitsumon shite mo ii desu ka.", "Tôi hỏi thầy được không?")]),
"題": ("On だい. 問題, 宿題, 題名.",
      [("宿題", "しゅくだい", "shukudai", "bài tập", "on", "題 đọc だい"),
       ("題名", "だいめい", "daimei", "nhan đề", "on", "cùng âm")],
      [("宿題を忘れました。", "しゅくだいをわすれました。", "Shukudai o wasuremashita.", "Tôi quên bài tập."),
       ("問題をよく読んでください。", "もんだいをよくよんでください。", "Mondai o yoku yonde kudasai.", "Hãy đọc kỹ đề.")]),
"研": ("On けん. 研究, 研修.",
      [("研究", "けんきゅう", "kenkyuu", "nghiên cứu", "on", "研 đọc けん"),
       ("研修", "けんしゅう", "kenshuu", "bồi dưỡng", "on", "cùng âm")],
      [("大学で研究しています。", "だいがくでけんきゅうしています。", "Daigaku de kenkyuu shite imasu.", "Tôi nghiên cứu ở đại học."),
       ("新しい技術を研究します。", "あたらしいぎじゅつをけんきゅうします。", "Atarashii gijutsu o kenkyuu shimasu.", "Tôi nghiên cứu kỹ thuật mới.")]),
"究": ("On きゅう. Đi với 研究.",
      [("研究", "けんきゅう", "kenkyuu", "nghiên cứu", "on", "究 đọc きゅう"),
       ("究極", "きゅうきょく", "kyuukyoku", "tột cùng", "on", "cùng âm")],
      [("この問題を究明します。", "このもんだいをきゅうめいします。", "Kono mondai o kyuumei shimasu.", "Tôi làm rõ vấn đề này."),
       ("究めるのは難しいです。", "きわめるのはむずかしいです。", "Kiwameru no wa muzukashii desu.", "Theo đến cùng thì khó.")]),
"仕": ("On し. 仕事, 仕方.",
      [("仕方", "しかた", "shikata", "cách làm", "on", "仕 đọc し"),
       ("仕える", "つかえる", "tsukaeru", "phục vụ", "kun", "ít N4")],
      [("仕事は楽しいです。", "しごとはたのしいです。", "Shigoto wa tanoshii desu.", "Công việc vui."),
       ("仕方がありません。", "しかたがありません。", "Shikata ga arimasen.", "Không còn cách nào.")]),
"事": ("On じ. Kun こと = sự việc.",
      [("食事", "しょくじ", "shokuji", "bữa ăn", "on", "事 đọc じ"),
       ("大事", "だいじ", "daiji", "quan trọng", "on", "cùng âm")],
      [("いい事がありました。", "いいことがありました。", "Ii koto ga arimashita.", "Có chuyện vui."),
       ("仕事の後で食事します。", "しごとのあとでしょくじします。", "Shigoto no ato de shokuji shimasu.", "Sau giờ làm tôi ăn.")]),
"業": ("On ぎょう. 授業, 職業, 卒業.",
      [("授業", "じゅぎょう", "jugyou", "tiết học", "on", "業 đọc ぎょう"),
       ("卒業", "そつぎょう", "sotsugyou", "tốt nghiệp", "on", "cùng âm")],
      [("午後の授業は難しいです。", "ごごのじゅぎょうはむずかしいです。", "Gogo no jugyou wa muzukashii desu.", "Tiết chiều khó."),
       ("来年卒業します。", "らいねんそつぎょうします。", "Rainen sotsugyou shimasu.", "Năm sau tôi tốt nghiệp.")]),
"堂": ("On どう. 食堂, 講堂.",
      [("食堂", "しょくどう", "shokudou", "nhà ăn", "on", "堂 đọc どう"),
       ("講堂", "こうどう", "koudou", "hội trường", "on", "cùng âm")],
      [("食堂で昼ごはんを食べます。", "しょくどうでひるごはんをたべます。", "Shokudou de hirugohan o tabemasu.", "Tôi ăn trưa ở nhà ăn."),
       ("この食堂は安いです。", "このしょくどうはやすいです。", "Kono shokudou wa yasui desu.", "Nhà ăn này rẻ.")]),
"院": ("On いん. 病院, 入院.",
      [("病院", "びょういん", "byouin", "bệnh viện", "on", "院 đọc いん"),
       ("入院", "にゅういん", "nyuuin", "nhập viện", "on", "cùng âm")],
      [("頭が痛いので病院へ行きます。", "あたまがいたいのでびょういんへいきます。", "Atama ga itai node byouin e ikimasu.", "Đau đầu nên tôi đến bệnh viện."),
       ("先週入院しました。", "せんしゅうにゅういんしました。", "Senshuu nyuuin shimashita.", "Tuần trước tôi nhập viện.")]),
"館": ("On かん. 図書館, 映画館.",
      [("図書館", "としょかん", "toshokan", "thư viện", "on", "館 đọc かん"),
       ("映画館", "えいがかん", "eigakan", "rạp phim", "on", "cùng âm")],
      [("図書館で本を借ります。", "としょかんでほんをかります。", "Toshokan de hon o karimasu.", "Tôi mượn sách ở thư viện."),
       ("映画館は駅の近くです。", "えいがかんはえきのちかくです。", "Eigakan wa eki no chikaku desu.", "Rạp phim gần ga.")]),
"屋": ("Kun や = cửa hàng. On おく.",
      [("部屋", "へや", "heya", "phòng", "kun", "屋 đọc や"),
       ("屋上", "おくじょう", "okujou", "sân thượng", "on", "屋 đọc おく")],
      [("本屋で辞書を買います。", "ほんやでじしょをかいます。", "Honya de jisho o kaimasu.", "Tôi mua từ điển ở hiệu sách."),
       ("この部屋は広いです。", "このへやはひろいです。", "Kono heya wa hiroi desu.", "Phòng này rộng.")]),
"度": ("On ど = lần / độ. 一度, 温度.",
      [("一度", "いちど", "ichido", "một lần", "on", "度 đọc ど"),
       ("温度", "おんど", "ondo", "nhiệt độ", "on", "cùng âm")],
      [("もう一度言ってください。", "もういちどいってください。", "Mou ichido itte kudasai.", "Hãy nói lại lần nữa."),
       ("何度も練習します。", "なんどもれんしゅうします。", "Nando mo renshuu shimasu.", "Tôi luyện rất nhiều lần.")]),
"回": ("On かい = lần. Kun まわ・る.",
      [("一回", "いっかい", "ikkai", "một lần", "on", "回 đọc かい"),
       ("回転", "かいてん", "kaiten", "xoay", "on", "cùng âm")],
      [("三回読みました。", "さんかいよみました。", "Sankai yomimashita.", "Tôi đọc ba lần."),
       ("回ってください。", "まわってください。", "Mawatte kudasai.", "Hãy quay lại.")]),
"的": ("On てき = -tính. 日本的, 目的.",
      [("目的", "もくてき", "mokuteki", "mục đích", "on", "的 đọc てき"),
       ("一般的", "いっぱんてき", "ippanteki", "phổ biến", "on", "cùng âm")],
      [("目的は何ですか。", "もくてきはなんですか。", "Mokuteki wa nan desu ka.", "Mục đích là gì?"),
       ("日本的な庭が好きです。", "にほんてきなにわがすきです。", "Nihon-teki na niwa ga suki desu.", "Tôi thích vườn kiểu Nhật.")]),
"力": ("Kun ちから. On りょく / りき.",
      [("能力", "のうりょく", "nouryoku", "năng lực", "on", "力 đọc りょく"),
       ("努力", "どりょく", "doryoku", "nỗ lực", "on", "cùng âm")],
      [("力を合わせてください。", "ちからをあわせてください。", "Chikara o awasete kudasai.", "Hãy chung sức."),
       ("もっと努力します。", "もっとどりょくします。", "Motto doryoku shimasu.", "Tôi sẽ nỗ lực hơn.")]),
"作": ("Kun つく・る. On さく / さ.",
      [("作文", "さくぶん", "sakubun", "bài văn", "on", "作 đọc さく"),
       ("作品", "さくひん", "sakuhin", "tác phẩm", "on", "cùng âm")],
      [("母が夕食を作ります。", "ははがゆうしょくをつくります。", "Haha ga yuushoku o tsukurimasu.", "Mẹ nấu bữa tối."),
       ("作文を書きました。", "さくぶんをかきました。", "Sakubun o kakimashita.", "Tôi đã viết bài văn.")]),
"待": ("Kun ま・つ. On たい.",
      [("期待", "きたい", "kitai", "kỳ vọng", "on", "待 đọc たい"),
       ("招待", "しょうたい", "shoutai", "mời", "on", "cùng âm")],
      [("少し待ってください。", "すこしまってください。", "Sukoshi matte kudasai.", "Hãy đợi một chút."),
       ("駅で待っています。", "えきでまっています。", "Eki de matte imasu.", "Tôi đang đợi ở ga.")]),
"持": ("Kun も・つ. On じ.",
      [("気持ち", "きもち", "kimochi", "cảm giác", "kun", "持 đọc もち"),
       ("持参", "じさん", "jisan", "mang theo", "on", "持 đọc じ")],
      [("傘を持っていきます。", "かさをもっていきます。", "Kasa o motte ikimasu.", "Tôi mang ô đi."),
       ("学生証を持っていますか。", "がくせいしょうをもっていますか。", "Gakuseishou o motte imasu ka.", "Bạn có thẻ sinh viên không?")]),
"思": ("Kun おも・う. On し.",
      [("思想", "しそう", "shisou", "tư tưởng", "on", "思 đọc し"),
       ("意思", "いし", "ishi", "ý chí", "on", "cùng âm")],
      [("そう思います。", "そうおもいます。", "Sou omoimasu.", "Tôi nghĩ vậy."),
       ("何を考えていると思いますか。", "なにをかんがえているとおもいますか。", "Nani o kangaete iru to omoimasu ka.", "Bạn nghĩ họ đang nghĩ gì?")]),
"知": ("Kun し・る. On ち.",
      [("知人", "ちじん", "chijin", "người quen", "on", "知 đọc ち"),
       ("知識", "ちしき", "chishiki", "kiến thức", "on", "cùng âm")],
      [("この言葉を知っていますか。", "このことばをしっていますか。", "Kono kotoba o shitte imasu ka.", "Bạn biết từ này không?"),
       ("知らなかったです。", "しらなかったです。", "Shiranakatta desu.", "Tôi đã không biết.")]),
"言": ("Kun い・う / こと. On げん.",
      [("言語", "げんご", "gengo", "ngôn ngữ", "on", "言 đọc げん"),
       ("方言", "ほうげん", "hougen", "phương ngữ", "on", "cùng âm")],
      [("ゆっくり言ってください。", "ゆっくりいってください。", "Yukkuri itte kudasai.", "Hãy nói chậm."),
       ("言葉を覚えます。", "ことばをおぼえます。", "Kotoba o oboemasu.", "Tôi nhớ từ.")]),
"考": ("Kun かんが・える. On こう.",
      [("考え", "かんがえ", "kangae", "ý nghĩ", "kun", "考 đọc かんがえ"),
       ("参考", "さんこう", "sankou", "tham khảo", "on", "考 đọc こう")],
      [("よく考えてから答えます。", "よくかんがえてからこたえます。", "Yoku kangaete kara kotaemasu.", "Tôi nghĩ kỹ rồi mới trả lời."),
       ("将来のことを考えます。", "しょうらいのことをかんがえます。", "Shourai no koto o kangaemasu.", "Tôi nghĩ về tương lai.")]),
"教": ("Kun おし・える. On きょう.",
      [("教室", "きょうしつ", "kyoushitsu", "phòng học", "on", "教 đọc きょう"),
       ("教科書", "きょうかしょ", "kyoukasho", "sách giáo khoa", "on", "cùng âm")],
      [("日本語を教えてください。", "にほんごをおしえてください。", "Nihongo o oshiete kudasai.", "Hãy dạy tôi tiếng Nhật."),
       ("教室は二階です。", "きょうしつはにかいです。", "Kyoushitsu wa nikai desu.", "Phòng học ở tầng hai.")]),
"室": ("On しつ. 教室, 部屋と違う — phòng chức năng.",
      [("教室", "きょうしつ", "kyoushitsu", "phòng học", "on", "室 đọc しつ"),
       ("待合室", "まちあいしつ", "machiaishitsu", "phòng chờ", "on", "cùng âm")],
      [("この教室は広いです。", "このきょうしつはひろいです。", "Kono kyoushitsu wa hiroi desu.", "Phòng học này rộng."),
       ("研究室で待ってください。", "けんきゅうしつでまってください。", "Kenkyuushitsu de matte kudasai.", "Hãy đợi ở phòng nghiên cứu.")]),
"起": ("Kun お・きる / お・こす. On き.",
      [("起床", "きしょう", "kishou", "thức dậy", "on", "起 đọc き"),
       ("起点", "きてん", "kiten", "điểm xuất phát", "on", "cùng âm")],
      [("朝六時に起きます。", "あさろくじにおきます。", "Asa rokuji ni okimasu.", "Sáng tôi dậy lúc 6 giờ."),
       ("起こしてください。", "おこしてください。", "Okoshite kudasai.", "Hãy đánh thức tôi.")]),
"終": ("Kun お・わる / お・える. On しゅう.",
      [("終電", "しゅうでん", "shuuden", "chuyến tàu cuối", "on", "終 đọc しゅう"),
       ("終了", "しゅうりょう", "shuuryou", "kết thúc", "on", "cùng âm")],
      [("授業が終わりました。", "じゅぎょうがおわりました。", "Jugyou ga owarimashita.", "Giờ học đã kết thúc."),
       ("終わりまで聞いてください。", "おわりまできいてください。", "Owari made kiite kudasai.", "Hãy nghe đến hết.")]),
"始": ("Kun はじ・める / はじ・まる. On し.",
      [("開始", "かいし", "kaishi", "bắt đầu", "on", "始 đọc し"),
       ("始終", "しじゅう", "shijuu", "suốt / luôn", "on", "cùng âm")],
      [("八時に始まります。", "はちじにはじまります。", "Hachiji ni hajimarimasu.", "Bắt đầu lúc 8 giờ."),
       ("日本語を始めました。", "にほんごをはじめました。", "Nihongo o hajimemashita.", "Tôi đã bắt đầu học tiếng Nhật.")]),
"使": ("Kun つか・う. On し.",
      [("使用", "しよう", "shiyou", "sử dụng", "on", "使 đọc し"),
       ("大使", "たいし", "taishi", "đại sứ", "on", "cùng âm")],
      [("この辞書を使ってください。", "このじしょをつかってください。", "Kono jisho o tsukatte kudasai.", "Hãy dùng từ điển này."),
       ("スマホを使いすぎます。", "スマホをつかいすぎます。", "Sumaho o tsukai sugimasu.", "Tôi dùng điện thoại quá nhiều.")]),
"急": ("Kun いそ・ぐ. On きゅう.",
      [("急に", "きゅうに", "kyuuni", "đột ngột", "on", "急 đọc きゅう"),
       ("特急", "とっきゅう", "tokkyuu", "tàu tốc hành", "on", "cùng âm")],
      [("急いで駅へ行きます。", "いそいでえきへいきます。", "Isoide eki e ikimasu.", "Tôi vội đến ga."),
       ("急に雨が降りました。", "きゅうにあめがふりました。", "Kyuuni ame ga furimashita.", "Đột nhiên mưa.")]),
"速": ("Kun はや・い. On そく.",
      [("速度", "そくど", "sokudo", "tốc độ", "on", "速 đọc そく"),
       ("速い", "はやい", "hayai", "nhanh", "kun", "速 đọc はや")],
      [("この電車は速いです。", "このでんしゃははやいです。", "Kono densha wa hayai desu.", "Tàu này nhanh."),
       ("速度を落としてください。", "そくどをおとしてください。", "Sokudo o otoshite kudasai.", "Hãy giảm tốc độ.")]),
"遅": ("Kun おそ・い / おく・れる. On ち.",
      [("遅刻", "ちこく", "chikoku", "đến trễ", "on", "遅 đọc ち"),
       ("遅れる", "おくれる", "okureru", "trễ", "kun", "遅 đọc おく")],
      [("この時計は遅いです。", "このとけいはおそいです。", "Kono tokei wa osoi desu.", "Đồng hồ này chậm."),
       ("電車が遅れました。", "でんしゃがおくれました。", "Densha ga okuremashita.", "Tàu bị trễ.")]),
"走": ("Kun はし・る. On そう.",
      [("走る", "はしる", "hashiru", "chạy", "kun", "走 đọc はし"),
       ("走行", "そうこう", "soukou", "chạy xe", "on", "走 đọc そう")],
      [("公園を走ります。", "こうえんをはしります。", "Kouen o hashirimasu.", "Tôi chạy ở công viên."),
       ("走らないでください。", "はしらないでください。", "Hashiranaide kudasai.", "Đừng chạy.")]),
"歩": ("Kun ある・く. On ほ.",
      [("散歩", "さんぽ", "sanpo", "đi dạo", "on", "歩 đọc ぽ"),
       ("徒歩", "とほ", "toho", "đi bộ", "on", "歩 đọc ほ")],
      [("駅まで歩きます。", "えきまであるきます。", "Eki made arukimasu.", "Tôi đi bộ đến ga."),
       ("夕方に散歩します。", "ゆうがたにさんぽします。", "Yuugata ni sanpo shimasu.", "Chiều tôi đi dạo.")]),
"正": ("Kun ただ・しい. On せい / しょう.",
      [("正確", "せいかく", "seikaku", "chính xác", "on", "正 đọc せい"),
       ("正直", "しょうじき", "shoujiki", "thành thật", "on", "正 đọc しょう")],
      [("答えは正しいです。", "こたえはただしいです。", "Kotae wa tadashii desu.", "Câu trả lời đúng."),
       ("正確に書いてください。", "せいかくにかいてください。", "Seikaku ni kaite kudasai.", "Hãy viết cho chính xác.")]),
"音": ("Kun おと / ね. On おん.",
      [("音楽", "おんがく", "ongaku", "âm nhạc", "on", "音 đọc おん"),
       ("発音", "はつおん", "hatsuon", "phát âm", "on", "cùng âm")],
      [("変な音がします。", "へんなおとがします。", "Hen na oto ga shimasu.", "Có tiếng lạ."),
       ("音楽を聞くのが好きです。", "おんがくをきくのがすきです。", "Ongaku o kiku no ga suki desu.", "Tôi thích nghe nhạc.")]),
"楽": ("Kun たの・しい. On がく / らく.",
      [("音楽", "おんがく", "ongaku", "âm nhạc", "on", "楽 đọc がく"),
       ("楽しい", "たのしい", "tanoshii", "vui", "kun", "楽 đọc たの")],
      [("旅行は楽しかったです。", "りょこうはたのしかったです。", "Ryokou wa tanoshikatta desu.", "Chuyến đi vui."),
       ("楽に座ってください。", "らくにすわってください。", "Raku ni suwatte kudasai.", "Hãy ngồi thoải mái.")]),
"歌": ("Kun うた / うた・う. On か.",
      [("歌手", "かしゅ", "kashu", "ca sĩ", "on", "歌 đọc か"),
       ("国歌", "こっか", "kokka", "quốc ca", "on", "cùng âm")],
      [("日本の歌を歌います。", "にほんのうたをうたいます。", "Nihon no uta o utaimasu.", "Tôi hát bài Nhật."),
       ("好きな歌手は誰ですか。", "すきなかしゅはだれですか。", "Suki na kashu wa dare desu ka.", "Ca sĩ bạn thích là ai?")]),
"映": ("On えい. 映画, 映像.",
      [("映画", "えいが", "eiga", "phim", "on", "映 đọc えい"),
       ("反映", "はんえい", "han'ei", "phản ánh", "on", "cùng âm")],
      [("週末に映画を見ます。", "しゅうまつにえいがをみます。", "Shuumatsu ni eiga o mimasu.", "Cuối tuần tôi xem phim."),
       ("この映画は面白いです。", "このえいがはおもしろいです。", "Kono eiga wa omoshiroi desu.", "Phim này thú vị.")]),
"画": ("On が / かく. 映画, 計画.",
      [("計画", "けいかく", "keikaku", "kế hoạch", "on", "画 đọc かく"),
       ("画家", "がか", "gaka", "họa sĩ", "on", "画 đọc が")],
      [("旅行の計画を立てます。", "りょこうのけいかくをたてます。", "Ryokou no keikaku o tatemasu.", "Tôi lập kế hoạch chuyến đi."),
       ("映画を見る計画です。", "えいがをみるけいかくです。", "Eiga o miru keikaku desu.", "Kế hoạch là xem phim.")]),
"写": ("Kun うつ・す. On しゃ.",
      [("写真", "しゃしん", "shashin", "ảnh", "on", "写 đọc しゃ"),
       ("写す", "うつす", "utsusu", "chép / chụp", "kun", "写 đọc うつ")],
      [("写真を撮ってもいいですか。", "しゃしんをとってもいいですか。", "Shashin o totte mo ii desu ka.", "Chụp ảnh được không?"),
       ("黒板を写してください。", "こくばんをうつしてください。", "Kokuban o utsushite kudasai.", "Hãy chép bảng.")]),
"真": ("On しん. 写真, 真剣, 真ん中 (đặc biệt).",
      [("真面目", "まじめ", "majime", "nghiêm túc", "on", "đọc đặc biệt"),
       ("真相", "しんそう", "shinsou", "sự thật", "on", "真 đọc しん")],
      [("写真が上手ですね。", "しゃしんがじょうずですね。", "Shashin ga jouzu desu ne.", "Bạn chụp ảnh giỏi nhỉ."),
       ("彼は真面目な学生です。", "かれはまじめながくせいです。", "Kare wa majime na gakusei desu.", "Anh ấy là học sinh nghiêm túc.")]),
"色": ("Kun いろ. On しょく.",
      [("景色", "けしき", "keshiki", "phong cảnh", "on", "色 đọc しき"),
       ("特色", "とくしょく", "tokushoku", "nét đặc trưng", "on", "色 đọc しょく")],
      [("好きな色は青です。", "すきないろはあおです。", "Suki na iro wa ao desu.", "Màu tôi thích là xanh."),
       ("秋の景色はきれいです。", "あきのけしきはきれいです。", "Aki no keshiki wa kirei desu.", "Cảnh mùa thu đẹp.")]),
"赤": ("Kun あか / あか・い. On せき.",
      [("赤", "あか", "aka", "màu đỏ", "kun", "赤 đọc あか"),
       ("赤道", "せきどう", "sekidou", "xích đạo", "on", "赤 đọc せき")],
      [("赤いりんごを買いました。", "あかいりんごをかいました。", "Akai ringo o kaimashita.", "Tôi mua táo đỏ."),
       ("信号は赤です。", "しんごうはあかです。", "Shingou wa aka desu.", "Đèn giao thông đang đỏ.")]),
"青": ("Kun あお / あお・い. On せい.",
      [("青春", "せいしゅん", "seishun", "tuổi trẻ", "on", "青 đọc せい"),
       ("青空", "あおぞら", "aozora", "bầu trời xanh", "kun", "青 đọc あお")],
      [("空は青いです。", "そらはあおいです。", "Sora wa aoi desu.", "Bầu trời xanh."),
       ("青いシャツを着ています。", "あおいシャツをきています。", "Aoi shatsu o kite imasu.", "Tôi đang mặc áo xanh.")]),
"黒": ("Kun くろ / くろ・い. On こく.",
      [("黒板", "こくばん", "kokuban", "bảng đen", "on", "黒 đọc こく"),
       ("黒字", "くろじ", "kuroji", "có lãi", "kun", "黒 đọc くろ")],
      [("黒い猫が好きです。", "くろいねこがすきです。", "Kuroi neko ga suki desu.", "Tôi thích mèo đen."),
       ("黒板を見てください。", "こくばんをみてください。", "Kokuban o mite kudasai.", "Hãy nhìn bảng.")]),
"紙": ("Kun かみ. On し.",
      [("手紙", "てがみ", "tegami", "thư", "kun", "紙 đọc がみ"),
       ("新聞紙", "しんぶんし", "shinbunshi", "giấy báo", "on", "紙 đọc し")],
      [("白い紙をください。", "しろいかみをください。", "Shiroi kami o kudasai.", "Cho tôi tờ giấy trắng."),
       ("手紙を書きました。", "てがみをかきました。", "Tegami o kakimashita.", "Tôi đã viết thư.")]),
"切": ("Kun き・る. On せつ.",
      [("大切", "たいせつ", "taisetsu", "quan trọng", "on", "切 đọc せつ"),
       ("切符", "きっぷ", "kippu", "vé", "kun", "切 đọc きっ")],
      [("パンを切ってください。", "パンをきってください。", "Pan o kitte kudasai.", "Hãy cắt bánh mì."),
       ("友達は大切です。", "ともだちはたいせつです。", "Tomodachi wa taisetsu desu.", "Bạn bè thì quý.")]),
"代": ("On だい. Kun か・わる / よ.",
      [("時代", "じだい", "jidai", "thời đại", "on", "代 đọc だい"),
       ("現代", "げんだい", "gendai", "hiện đại", "on", "cùng âm")],
      [("代わりに行きます。", "かわりにいきます。", "Kawari ni ikimasu.", "Tôi đi thay."),
       ("この時代の映画が好きです。", "このじだいのえいががすきです。", "Kono jidai no eiga ga suki desu.", "Tôi thích phim thời này.")]),
"場": ("On じょう. Kun ば.",
      [("場所", "ばしょ", "basho", "địa điểm", "kun", "場 đọc ば"),
       ("会場", "かいじょう", "kaijou", "hội trường", "on", "場 đọc じょう")],
      [("会う場所を決めましょう。", "あうばしょをきめましょう。", "Au basho o kimemashou.", "Mình chọn chỗ gặp nhé."),
       ("会場はこちらです。", "かいじょうはこちらです。", "Kaijou wa kochira desu.", "Hội trường ở đây.")]),
"所": ("Kun ところ. On しょ.",
      [("場所", "ばしょ", "basho", "địa điểm", "on", "所 đọc しょ"),
       ("事務所", "じむしょ", "jimusho", "văn phòng", "on", "cùng âm")],
      [("いい所ですね。", "いいところですね。", "Ii tokoro desu ne.", "Chỗ này đẹp nhỉ."),
       ("住所を書いてください。", "じゅうしょをかいてください。", "Juusho o kaite kudasai.", "Hãy viết địa chỉ.")]),
"世": ("On せい / せ. 世界, 世話.",
      [("世界", "せかい", "sekai", "thế giới", "on", "世 đọc せ"),
       ("世話", "せわ", "sewa", "chăm sóc / giúp đỡ", "on", "cùng âm")],
      [("世界を旅行したいです。", "せかいをりょこうしたいです。", "Sekai o ryokou shitai desu.", "Tôi muốn du lịch thế giới."),
       ("お世話になりました。", "おせわになりました。", "Osewa ni narimashita.", "Cảm ơn sự giúp đỡ của anh/chị.")]),
"界": ("On かい. Đi với 世界.",
      [("世界", "せかい", "sekai", "thế giới", "on", "界 đọc かい"),
       ("限界", "げんかい", "genkai", "giới hạn", "on", "cùng âm")],
      [("世界中の人が来ます。", "せかいじゅうのひとがきます。", "Sekaijuu no hito ga kimasu.", "Người từ khắp thế giới đến."),
      ("この世界は広いです。", "このせかいはひろいです。", "Kono sekai wa hiroi desu.", "Thế giới này rộng.")]),
}
for ch, data in N4K.items():
    K(ch, data[0], data[1], data[2])

missing = [c for c in KANJI_N5+KANJI_N4 if c not in KANJI]
print("missing kanji", missing)

def emit_kanji():
    lines = [
        'import type { Example, KanjiExample } from "@/lib/akari/types";',
        "",
        "export type KanjiUsage = {",
        "  tip: string;",
        "  words: KanjiExample[];",
        "  sentences: Example[];",
        "};",
        "",
        "export const KANJI_USAGE: Record<string, KanjiUsage> = {",
    ]
    for ch, data in KANJI.items():
        words = ",\n      ".join(
            '{'
            + f' word: "{w[0]}", kana: "{w[1]}", romaji: "{w[2]}", meaning_vi: "{ts_escape(w[3])}", reading: "{w[4]}", usage: "{ts_escape(w[5])}"'
            + ' }'
            for w in data["words"]
        )
        sents = ",\n      ".join(
            '{'
            + f' jp: "{ts_escape(s[0])}", kana: "{ts_escape(s[1])}", romaji: "{ts_escape(s[2])}", vi: "{ts_escape(s[3])}"'
            + ' }'
            for s in data["sents"]
        )
        lines.append(
            f'  "{ch}": {{\n'
            f'    tip: "{ts_escape(data["tip"])}",\n'
            f'    words: [\n      {words},\n    ],\n'
            f'    sentences: [\n      {sents},\n    ],\n'
            f'  }},'
        )
    lines.append("};")
    lines.append("")
    return "\n".join(lines)

def main():
    rows = json.loads(Path("/tmp/vocab.json").read_text())
    Path("/workspace/src/data/vocab-extra-examples.ts").write_text(emit_vocab(rows), encoding="utf-8")
    Path("/workspace/src/data/kanji-usage.ts").write_text(emit_kanji(), encoding="utf-8")
    print("wrote vocab", len(rows), "kanji", len(KANJI))

if __name__ == "__main__":
    main()
