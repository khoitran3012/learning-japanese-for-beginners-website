import { r as __exportAll } from "../_runtime.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dictionary-extra-CkhUMB5P.js
var dictionary_extra_CkhUMB5P_exports = /* @__PURE__ */ __exportAll({
	n: () => dictionary_extra_exports,
	t: () => DICTIONARY_EXTRA
});
var dictionary_extra_exports = /* @__PURE__ */ __exportAll$1({ DICTIONARY_EXTRA: () => DICTIONARY_EXTRA });
function d(n, kanji, kana, romaji, meanings, part_of_speech, jlpt, common, frequency, examples, tags, extra) {
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
		pitch_accent: extra?.pitch_accent ?? null,
		examples,
		tags,
		related: extra?.related,
		kanjiChars: extra?.kanjiChars
	};
}
var DICTIONARY_EXTRA = [
	d(1, "ありがとう", "ありがとう", "arigatou", ["cảm ơn"], ["biểu hiện", "thán từ"], ["N5"], true, 1, [{
		jp: "手伝ってくれてありがとう。",
		kana: "てつだってくれてありがとう。",
		romaji: "Tetsudatte kurete arigatou.",
		vi: "Cảm ơn vì đã giúp tôi."
	}], ["chào hỏi", "lịch sự"]),
	d(2, "こんにちは", "こんにちは", "konnichiwa", ["xin chào (ban ngày)"], ["biểu hiện"], ["N5"], true, 1, [{
		jp: "こんにちは。いい天気ですね。",
		kana: "こんにちは。いいてんきですね。",
		romaji: "Konnichiwa. Ii tenki desu ne.",
		vi: "Xin chào. Thời tiết đẹp nhỉ."
	}], ["chào hỏi"]),
	d(3, "すみません", "すみません", "sumimasen", [
		"xin lỗi",
		"xin phép",
		"cảm ơn nhẹ"
	], ["biểu hiện"], ["N5"], true, 1, [{
		jp: "すみません、少しよろしいですか。",
		kana: "すみません、すこしよろしいですか。",
		romaji: "Sumimasen, sukoshi yoroshii desu ka.",
		vi: "Xin lỗi, cho tôi hỏi một chút được không?"
	}], ["chào hỏi", "xin lỗi"]),
	d(4, "おはよう", "おはよう", "ohayou", ["chào buổi sáng"], ["biểu hiện"], ["N5"], true, 1, [{
		jp: "おはよう。よく眠れた？",
		kana: "おはよう。よくねむれた？",
		romaji: "Ohayou. Yoku nemureta?",
		vi: "Chào buổi sáng. Ngủ ngon không?"
	}], ["chào hỏi"]),
	d(5, "コンピューター", "コンピューター", "konpyuutaa", ["máy tính"], ["danh từ"], ["N5", "N4"], true, 2, [{
		jp: "新しいコンピューターを買いました。",
		kana: "あたらしいコンピューターをかいました。",
		romaji: "Atarashii konpyuutaa o kaimashita.",
		vi: "Tôi đã mua máy tính mới."
	}], ["công nghệ", "katakana"], { related: ["パソコン"] }),
	d(6, "アルバイト", "アルバイト", "arubaito", ["việc làm thêm"], ["danh từ"], ["N4"], true, 2, [{
		jp: "週末は喫茶店でアルバイトをしています。",
		kana: "しゅうまつはきっさてんでアルバイトをしています。",
		romaji: "Shuumatsu wa kissaten de arubaito o shite imasu.",
		vi: "Cuối tuần tôi làm thêm ở quán cà phê."
	}], ["công việc", "katakana"]),
	d(7, "お願いします", "おねがいします", "onegaishimasu", ["xin nhờ", "làm ơn"], ["biểu hiện"], ["N5"], true, 1, [{
		jp: "水をお願いします。",
		kana: "みずをおねがいします。",
		romaji: "Mizu o onegaishimasu.",
		vi: "Cho tôi xin nước."
	}], ["lịch sự"]),
	d(8, "いただきます", "いただきます", "itadakimasu", ["câu nói trước khi ăn"], ["biểu hiện"], ["N5"], true, 2, [{
		jp: "いただきます。美味しそうですね。",
		kana: "いただきます。おいしそうですね。",
		romaji: "Itadakimasu. Oishisou desu ne.",
		vi: "Xin mời (trước khi ăn). Trông ngon nhỉ."
	}], ["đồ ăn", "lịch sự"]),
	d(9, "ごちそうさま", "ごちそうさま", "gochisousama", ["câu nói sau khi ăn"], ["biểu hiện"], ["N5"], true, 2, [{
		jp: "ごちそうさまでした。とても美味しかったです。",
		kana: "ごちそうさまでした。とてもおいしかったです。",
		romaji: "Gochisousama deshita. Totemo oishikatta desu.",
		vi: "Cảm ơn bữa ăn. Rất ngon."
	}], ["đồ ăn", "lịch sự"]),
	d(10, "お疲れ様", "おつかれさま", "otsukaresama", ["cảm ơn vì đã vất vả"], ["biểu hiện"], ["N4"], true, 2, [{
		jp: "お疲れ様です。今日もありがとうございました。",
		kana: "おつかれさまです。きょうもありがとうございました。",
		romaji: "Otsukaresama desu. Kyou mo arigatou gozaimashita.",
		vi: "Bạn đã vất vả rồi. Cảm ơn hôm nay."
	}], ["công việc", "lịch sự"], { kanjiChars: ["疲"] }),
	d(11, "パソコン", "パソコン", "pasokon", ["máy tính cá nhân"], ["danh từ"], ["N4"], true, 2, [{
		jp: "パソコンで写真を送ります。",
		kana: "パソコンでしゃしんをおくります。",
		romaji: "Pasokon de shashin o okurimasu.",
		vi: "Tôi gửi ảnh bằng máy tính."
	}], ["công nghệ", "katakana"]),
	d(12, "スマートフォン", "スマートフォン", "sumaatofon", ["điện thoại thông minh"], ["danh từ"], ["N4"], true, 2, [{
		jp: "スマートフォンで地図を見ます。",
		kana: "スマートフォンでちずをみます。",
		romaji: "Sumaatofon de chizu o mimasu.",
		vi: "Tôi xem bản đồ trên điện thoại."
	}], ["công nghệ", "katakana"]),
	d(13, "インターネット", "インターネット", "intaanetto", ["internet"], ["danh từ"], ["N4"], true, 3, [{
		jp: "インターネットで切符を予約しました。",
		kana: "インターネットできっぷをよやくしました。",
		romaji: "Intaanetto de kippu o yoyaku shimashita.",
		vi: "Tôi đặt vé trên internet."
	}], ["công nghệ", "katakana"]),
	d(14, "ホテル", "ホテル", "hoteru", ["khách sạn"], ["danh từ"], ["N5"], true, 2, [{
		jp: "駅の前のホテルに泊まります。",
		kana: "えきのまえのホテルにとまります。",
		romaji: "Eki no mae no hoteru ni tomarimasu.",
		vi: "Tôi ở khách sạn trước ga."
	}], ["du lịch", "katakana"]),
	d(15, "レストラン", "レストラン", "resutoran", ["nhà hàng"], ["danh từ"], ["N5"], true, 2, [{
		jp: "このレストランの魚は新鮮です。",
		kana: "このレストランのさかなはしんせんです。",
		romaji: "Kono resutoran no sakana wa shinsen desu.",
		vi: "Cá ở nhà hàng này tươi."
	}], ["đồ ăn", "katakana"]),
	d(16, "コンビニ", "コンビニ", "konbini", ["cửa hàng tiện lợi"], ["danh từ"], ["N4"], true, 2, [{
		jp: "夜、コンビニでおにぎりを買いました。",
		kana: "よる、コンビニでおにぎりをかいました。",
		romaji: "Yoru, konbini de onigiri o kaimashita.",
		vi: "Tối tôi mua cơm nắm ở cửa hàng tiện lợi."
	}], ["mua sắm", "katakana"]),
	d(17, "エレベーター", "エレベーター", "erebeetaa", ["thang máy"], ["danh từ"], ["N4"], true, 3, [{
		jp: "エレベーターで三階へ行きます。",
		kana: "エレベーターでさんがいへいきます。",
		romaji: "Erebeetaa de sangai e ikimasu.",
		vi: "Tôi đi thang máy lên tầng ba."
	}], ["nhà cửa", "katakana"]),
	d(18, "アパート", "アパート", "apaato", ["chung cư / căn hộ kiểu Nhật"], ["danh từ"], ["N5"], true, 2, [{
		jp: "駅の近くのアパートに住んでいます。",
		kana: "えきのちかくのアパートにすんでいます。",
		romaji: "Eki no chikaku no apaato ni sunde imasu.",
		vi: "Tôi sống ở căn hộ gần ga."
	}], ["nhà cửa", "katakana"]),
	d(19, "タクシー", "タクシー", "takushii", ["taxi"], ["danh từ"], ["N5"], true, 2, [{
		jp: "雨なのでタクシーで帰りました。",
		kana: "あめなのでタクシーでかえりました。",
		romaji: "Ame na node takushii de kaerimashita.",
		vi: "Vì mưa nên tôi về bằng taxi."
	}], ["giao thông", "katakana"]),
	d(20, "チケット", "チケット", "chiketto", ["vé"], ["danh từ"], ["N4"], true, 3, [{
		jp: "映画のチケットを二枚買いました。",
		kana: "えいがのチケットをにまいかいました。",
		romaji: "Eiga no chiketto o nimai kaimashita.",
		vi: "Tôi mua hai vé xem phim."
	}], ["du lịch", "katakana"]),
	d(21, "プレゼント", "プレゼント", "purezento", ["quà tặng"], ["danh từ"], ["N4"], true, 3, [{
		jp: "母の日に花のプレゼントをあげます。",
		kana: "ははのひにはなのプレゼントをあげます。",
		romaji: "Haha no hi ni hana no purezento o agemasu.",
		vi: "Ngày của mẹ tôi tặng hoa."
	}], ["mua sắm", "katakana"]),
	d(22, "カメラ", "カメラ", "kamera", ["máy ảnh"], ["danh từ"], ["N5"], true, 2, [{
		jp: "旅行にカメラを持って行きます。",
		kana: "りょこうにカメラをもっていきます。",
		romaji: "Ryokou ni kamera o motte ikimasu.",
		vi: "Tôi mang máy ảnh đi du lịch."
	}], ["du lịch", "katakana"]),
	d(23, "ニュース", "ニュース", "nyuusu", ["tin tức"], ["danh từ"], ["N4"], true, 2, [{
		jp: "朝、ニュースを見てから出ます。",
		kana: "あさ、ニュースをみてからでます。",
		romaji: "Asa, nyuusu o mite kara demasu.",
		vi: "Sáng tôi xem tin rồi mới ra ngoài."
	}], ["truyền thông", "katakana"]),
	d(24, "スポーツ", "スポーツ", "supootsu", ["thể thao"], ["danh từ"], ["N5"], true, 2, [{
		jp: "週末はスポーツをします。",
		kana: "しゅうまつはスポーツをします。",
		romaji: "Shuumatsu wa supootsu o shimasu.",
		vi: "Cuối tuần tôi chơi thể thao."
	}], ["sức khỏe", "katakana"]),
	d(25, "カレンダー", "カレンダー", "karendaa", ["lịch"], ["danh từ"], ["N4"], true, 3, [{
		jp: "カレンダーに試験の日を書きました。",
		kana: "カレンダーにしけんのひをかきました。",
		romaji: "Karendaa ni shiken no hi o kakimashita.",
		vi: "Tôi ghi ngày thi lên lịch."
	}], ["thời gian", "katakana"]),
	d(26, "メニュー", "メニュー", "menyuu", ["thực đơn"], ["danh từ"], ["N5"], true, 2, [{
		jp: "メニューを見せてください。",
		kana: "メニューをみせてください。",
		romaji: "Menyuu o misete kudasai.",
		vi: "Cho tôi xem thực đơn."
	}], ["đồ ăn", "katakana"]),
	d(27, "レシート", "レシート", "reshiito", ["hóa đơn / biên lai"], ["danh từ"], ["N4"], true, 3, [{
		jp: "レシートを袋に入れてください。",
		kana: "レシートをふくろにいれてください。",
		romaji: "Reshiito o fukuro ni irete kudasai.",
		vi: "Hãy bỏ hóa đơn vào túi."
	}], ["mua sắm", "katakana"]),
	d(28, "パスワード", "パスワード", "pasuwaado", ["mật khẩu"], ["danh từ"], ["N4"], false, 4, [{
		jp: "パスワードを忘れないでください。",
		kana: "パスワードをわすれないでください。",
		romaji: "Pasuwaado o wasurenaide kudasai.",
		vi: "Đừng quên mật khẩu."
	}], ["công nghệ", "katakana"]),
	d(29, "ガソリンスタンド", "ガソリンスタンド", "gasorin sutando", ["cửa hàng xăng"], ["danh từ"], ["N4"], false, 4, [{
		jp: "次の角にガソリンスタンドがあります。",
		kana: "つぎのかどにガソリンスタンドがあります。",
		romaji: "Tsugi no kado ni gasorin sutando ga arimasu.",
		vi: "Ở góc tiếp theo có cây xăng."
	}], ["giao thông", "katakana"]),
	d(30, "エアコン", "エアコン", "eakon", ["máy điều hòa"], ["danh từ"], ["N4"], true, 3, [{
		jp: "暑いのでエアコンをつけてください。",
		kana: "あついのでエアコンをつけてください。",
		romaji: "Atsui node eakon o tsukete kudasai.",
		vi: "Trời nóng nên hãy bật điều hòa."
	}], ["nhà cửa", "katakana"]),
	d(31, "ただいま", "ただいま", "tadaima", ["tôi về rồi"], ["biểu hiện"], ["N5"], true, 2, [{
		jp: "ただいま。今日は少し早かったね。",
		kana: "ただいま。きょうはすこしはやかったね。",
		romaji: "Tadaima. Kyou wa sukoshi hayakatta ne.",
		vi: "Tôi về rồi. Hôm nay về hơi sớm nhỉ."
	}], ["chào hỏi", "nhà"]),
	d(32, "おかえり", "おかえり", "okaeri", ["chào mừng về nhà"], ["biểu hiện"], ["N5"], true, 2, [{
		jp: "おかえりなさい。ご飯はもうあるよ。",
		kana: "おかえりなさい。ごはんはもうあるよ。",
		romaji: "Okaerinasai. Gohan wa mou aru yo.",
		vi: "Về rồi à. Cơm đã có rồi đó."
	}], ["chào hỏi", "nhà"]),
	d(33, "よろしく", "よろしく", "yoroshiku", ["rất mong được giúp đỡ / nhờ gắn bó"], ["biểu hiện"], ["N5"], true, 1, [{
		jp: "これからよろしくお願いします。",
		kana: "これからよろしくおねがいします。",
		romaji: "Kore kara yoroshiku onegaishimasu.",
		vi: "Từ nay rất mong được giúp đỡ."
	}], ["chào hỏi"]),
	d(34, "です", "です", "desu", ["là (lịch sự)", "thì / mà"], ["biểu hiện"], ["N5"], true, 1, [{
		jp: "私は学生です。",
		kana: "わたしはがくせいです。",
		romaji: "Watashi wa gakusei desu.",
		vi: "Tôi là học sinh."
	}], ["ngữ pháp", "câu"]),
	d(35, "ます", "ます", "masu", ["đuôi lịch sự của động từ"], ["biểu hiện"], ["N5"], true, 1, [{
		jp: "毎朝コーヒーを飲みます。",
		kana: "まいあさコーヒーをのみます。",
		romaji: "Maiasa koohii o nomimasu.",
		vi: "Tôi uống cà phê mỗi sáng."
	}], ["ngữ pháp", "động từ"]),
	d(36, "だ", "だ", "da", ["là (thân mật)"], ["biểu hiện"], ["N5"], true, 2, [{
		jp: "今日は休みだ。",
		kana: "きょうはやすみだ。",
		romaji: "Kyou wa yasumi da.",
		vi: "Hôm nay là ngày nghỉ."
	}], ["ngữ pháp"]),
	d(37, "は", "は", "wa", ["trợ từ chủ đề (đọc wa)"], ["trợ từ"], ["N5"], true, 1, [{
		jp: "これは本です。",
		kana: "これはほんです。",
		romaji: "Kore wa hon desu.",
		vi: "Đây là sách."
	}], ["ngữ pháp", "trợ từ"]),
	d(38, "が", "が", "ga", ["trợ từ chủ thể / nhấn mạnh"], ["trợ từ"], ["N5"], true, 1, [{
		jp: "雨が降っています。",
		kana: "あめがふっています。",
		romaji: "Ame ga futte imasu.",
		vi: "Trời đang mưa."
	}], ["ngữ pháp", "trợ từ"]),
	d(39, "を", "を", "o", ["trợ từ tân ngữ (đọc o)"], ["trợ từ"], ["N5"], true, 1, [{
		jp: "水をください。",
		kana: "みずをください。",
		romaji: "Mizu o kudasai.",
		vi: "Cho tôi xin nước."
	}], ["ngữ pháp", "trợ từ"]),
	d(40, "に", "に", "ni", ["trợ từ thời điểm / hướng / đích"], ["trợ từ"], ["N5"], true, 1, [{
		jp: "七時に起きます。",
		kana: "しちじにおきます。",
		romaji: "Shichiji ni okimasu.",
		vi: "Tôi thức dậy lúc bảy giờ."
	}], ["ngữ pháp", "trợ từ"]),
	d(41, "で", "で", "de", ["trợ từ nơi chốn / phương tiện"], ["trợ từ"], ["N5"], true, 1, [{
		jp: "図書館で勉強します。",
		kana: "としょかんでべんきょうします。",
		romaji: "Toshokan de benkyou shimasu.",
		vi: "Tôi học ở thư viện."
	}], ["ngữ pháp", "trợ từ"]),
	d(42, "へ", "へ", "e", ["trợ từ hướng đi (đọc e)"], ["trợ từ"], ["N5"], true, 1, [{
		jp: "学校へ行きます。",
		kana: "がっこうへいきます。",
		romaji: "Gakkou e ikimasu.",
		vi: "Tôi đi tới trường."
	}], ["ngữ pháp", "trợ từ"], { related: ["に"] }),
	d(43, "と", "と", "to", ["và / cùng với / trích dẫn"], ["trợ từ", "liên từ"], ["N5"], true, 1, [{
		jp: "パンと牛乳を買いました。",
		kana: "パンとぎゅうにゅうをかいました。",
		romaji: "Pan to gyuunyuu o kaimashita.",
		vi: "Tôi đã mua bánh mì và sữa."
	}], ["ngữ pháp", "trợ từ"]),
	d(44, "も", "も", "mo", ["cũng"], ["trợ từ"], ["N5"], true, 1, [{
		jp: "私も学生です。",
		kana: "わたしもがくせいです。",
		romaji: "Watashi mo gakusei desu.",
		vi: "Tôi cũng là học sinh."
	}], ["ngữ pháp", "trợ từ"]),
	d(45, "の", "の", "no", ["của / sở hữu / danh hóa"], ["trợ từ"], ["N5"], true, 1, [{
		jp: "これは私の本です。",
		kana: "これはわたしのほんです。",
		romaji: "Kore wa watashi no hon desu.",
		vi: "Đây là sách của tôi."
	}], ["ngữ pháp", "trợ từ"]),
	d(46, "か", "か", "ka", ["trợ từ nghi vấn"], ["trợ từ"], ["N5"], true, 1, [{
		jp: "今、時間がありますか。",
		kana: "いま、じかんがありますか。",
		romaji: "Ima, jikan ga arimasu ka.",
		vi: "Bây giờ bạn có thời gian không?"
	}], ["ngữ pháp", "câu hỏi"]),
	d(47, "ね", "ね", "ne", ["nhỉ / xác nhận đồng tình"], ["trợ từ"], ["N5"], true, 1, [{
		jp: "今日は暑いですね。",
		kana: "きょうはあついですね。",
		romaji: "Kyou wa atsui desu ne.",
		vi: "Hôm nay nóng nhỉ."
	}], ["ngữ pháp"], { related: ["よ"] }),
	d(48, "よ", "よ", "yo", ["đấy / nhấn thông tin mới"], ["trợ từ"], ["N5"], true, 1, [{
		jp: "電車が来ますよ。",
		kana: "でんしゃがきますよ。",
		romaji: "Densha ga kimasu yo.",
		vi: "Tàu đến rồi đấy."
	}], ["ngữ pháp"], { related: ["ね"] }),
	d(49, "この", "この", "kono", ["cái này (đi với danh từ)"], ["định từ"], ["N5"], true, 1, [{
		jp: "この本は面白いです。",
		kana: "このほんはおもしろいです。",
		romaji: "Kono hon wa omoshiroi desu.",
		vi: "Quyển sách này thú vị."
	}], ["chỉ định"], { related: [
		"その",
		"あの",
		"これ"
	] }),
	d(50, "その", "その", "sono", ["cái đó (đi với danh từ)"], ["định từ"], ["N5"], true, 1, [{
		jp: "その人は先生です。",
		kana: "そのひとはせんせいです。",
		romaji: "Sono hito wa sensei desu.",
		vi: "Người đó là giáo viên."
	}], ["chỉ định"], { related: ["この", "あの"] }),
	d(51, "あの", "あの", "ano", ["cái kia (đi với danh từ)"], ["định từ"], ["N5"], true, 1, [{
		jp: "あの山は富士山です。",
		kana: "あのやまはふじさんです。",
		romaji: "Ano yama wa Fujisan desu.",
		vi: "Ngọn núi kia là núi Phú Sĩ."
	}], ["chỉ định"], { related: ["この", "その"] }),
	d(52, "日本", "にほん", "nihon", ["Nhật Bản"], ["danh từ"], ["N5"], true, 1, [{
		jp: "来年日本へ行きたいです。",
		kana: "らいねんにほんへいきたいです。",
		romaji: "Rainen Nihon e ikitai desu.",
		vi: "Năm sau tôi muốn đi Nhật."
	}], ["địa điểm", "quốc gia"], {
		kanjiChars: ["日", "本"],
		related: ["日本語"]
	}),
	d(53, "日本語", "にほんご", "nihongo", ["tiếng Nhật"], ["danh từ"], ["N5"], true, 1, [{
		jp: "毎日日本語を勉強しています。",
		kana: "まいにちにほんごをべんきょうしています。",
		romaji: "Mainichi nihongo o benkyou shite imasu.",
		vi: "Tôi học tiếng Nhật mỗi ngày."
	}], ["học", "ngôn ngữ"], {
		kanjiChars: [
			"日",
			"本",
			"語"
		],
		related: ["日本"]
	}),
	d(54, "人", "ひと", "hito", ["người"], ["danh từ"], ["N5"], true, 1, [{
		jp: "あの人は誰ですか。",
		kana: "あのひとはだれですか。",
		romaji: "Ano hito wa dare desu ka.",
		vi: "Người kia là ai?"
	}], ["người"], { kanjiChars: ["人"] }),
	d(55, "時間", "じかん", "jikan", ["thời gian", "giờ học"], ["danh từ"], ["N5"], true, 1, [{
		jp: "今、時間がありません。",
		kana: "いま、じかんがありません。",
		romaji: "Ima, jikan ga arimasen.",
		vi: "Bây giờ tôi không có thời gian."
	}], ["thời gian"], { kanjiChars: ["時", "間"] }),
	d(56, "ください", "ください", "kudasai", ["làm ơn / xin cho"], ["biểu hiện"], ["N5"], true, 1, [{
		jp: "もう一度言ってください。",
		kana: "もういちどいってください。",
		romaji: "Mou ichido itte kudasai.",
		vi: "Xin hãy nói lại lần nữa."
	}], ["lịch sự", "cầu khiến"]),
	d(57, "たい", "たい", "tai", ["muốn làm (đuôi động từ)"], ["biểu hiện"], ["N5"], true, 2, [{
		jp: "寿司が食べたいです。",
		kana: "すしがたべたいです。",
		romaji: "Sushi ga tabetai desu.",
		vi: "Tôi muốn ăn sushi."
	}], ["ngữ pháp", "mong muốn"]),
	d(58, "ない", "ない", "nai", ["không (phủ định)"], ["biểu hiện", "tính từ -i"], ["N5"], true, 1, [{
		jp: "今日は宿題がありません。宿題がない日です。",
		kana: "きょうはしゅくだいがありません。しゅくだいがないひです。",
		romaji: "Kyou wa shukudai ga arimasen. Shukudai ga nai hi desu.",
		vi: "Hôm nay không có bài tập. Là ngày không bài tập."
	}], ["ngữ pháp", "phủ định"]),
	d(59, "ある", "ある", "aru", ["có (đồ vật, sự việc)"], ["động từ nhóm 1"], ["N5"], true, 1, [{
		jp: "机の上に本があります。",
		kana: "つくえのうえにほんがあります。",
		romaji: "Tsukue no ue ni hon ga arimasu.",
		vi: "Trên bàn có sách."
	}], ["tồn tại"], { related: ["いる"] }),
	d(60, "いる", "いる", "iru", ["có / ở (người, động vật)"], ["động từ nhóm 2"], ["N5"], true, 1, [{
		jp: "部屋に猫がいます。",
		kana: "へやにねこがいます。",
		romaji: "Heya ni neko ga imasu.",
		vi: "Trong phòng có con mèo."
	}], ["tồn tại"], { related: ["ある"] }),
	d(61, "できる", "できる", "dekiru", ["có thể", "làm được"], ["động từ nhóm 2"], ["N5"], true, 1, [{
		jp: "日本語が少しできます。",
		kana: "にほんごがすこしできます。",
		romaji: "Nihongo ga sukoshi dekimasu.",
		vi: "Tôi nói được một chút tiếng Nhật."
	}], ["khả năng"]),
	d(62, "良い", "よい", "yoi", ["tốt", "hay"], ["tính từ -i"], ["N5"], true, 1, [{
		jp: "いい天気ですね。",
		kana: "いいてんきですね。",
		romaji: "Ii tenki desu ne.",
		vi: "Thời tiết đẹp nhỉ."
	}], ["tính từ"], { related: ["いい"] }),
	d(63, "いい", "いい", "ii", ["tốt / được (dạng thông dụng của 良い)"], ["tính từ -i"], ["N5"], true, 1, [{
		jp: "それでいいです。",
		kana: "それでいいです。",
		romaji: "Sore de ii desu.",
		vi: "Như vậy là được."
	}], ["tính từ"], { related: ["良い"] })
];
//#endregion
export { dictionary_extra_CkhUMB5P_exports as n, DICTIONARY_EXTRA as t };
