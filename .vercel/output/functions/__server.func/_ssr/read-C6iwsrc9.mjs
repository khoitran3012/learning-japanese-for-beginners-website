import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-BOD7PV7B.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { i as choiceState, n as ChoiceRomaji, r as ChoiceRow, t as ChoiceKana } from "./choice-row-ySbfq5TF.mjs";
import { t as SpeakButton } from "./speak-button-DVsDELCU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/read-C6iwsrc9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var READINGS = [
	{
		id: "rd-n5-01",
		title: "Buổi sáng của Yumi",
		level: "N5",
		jp: "ゆみさんは毎朝七時に起きます。朝ごはんを食べてから学校へ行きます。教室で日本語を勉強します。先生はとてもやさしいです。",
		kana: "ゆみさんはまいあさしちじにおきます。あさごはんをたべてからがっこうへいきます。きょうしつでにほんごをべんきょうします。せんせいはとてもやさしいです。",
		romaji: "Yumi-san wa maiasa shichiji ni okimasu. Asagohan o tabete kara gakkou e ikimasu. Kyoushitsu de nihongo o benkyou shimasu. Sensei wa totemo yasashii desu.",
		vi: "Yumi dậy lúc bảy giờ mỗi sáng. Ăn sáng xong rồi đến trường. Ở lớp học tiếng Nhật. Cô giáo rất dịu dàng.",
		questions: [{
			q: "ゆみさんは何時に起きますか。",
			options: [
				{
					jp: "六時",
					romaji: "rokuji"
				},
				{
					jp: "七時",
					romaji: "shichiji"
				},
				{
					jp: "八時",
					romaji: "hachiji"
				},
				{
					jp: "九時",
					romaji: "kuji"
				}
			],
			answer: 1,
			explain: "Câu đầu: 毎朝七時に起きます."
		}, {
			q: "学校で何を勉強しますか。",
			options: [
				{
					jp: "英語",
					romaji: "eigo"
				},
				{
					jp: "数学",
					romaji: "suugaku"
				},
				{
					jp: "日本語",
					romaji: "nihongo"
				},
				{
					jp: "歴史",
					romaji: "rekishi"
				}
			],
			answer: 2,
			explain: "教室で日本語を勉強します."
		}]
	},
	{
		id: "rd-n5-02",
		title: "Mua táo ở siêu thị",
		level: "N5",
		jp: "けんさんはスーパーへ行きます。りんごが安いです。けんさんは赤いりんごを五つ買います。家へ帰って家族と食べます。",
		kana: "けんさんはスーパーへいきます。りんごがやすいです。けんさんはあかいりんごをいつつかいます。いえへかえってかぞくとたべます。",
		romaji: "Ken-san wa suupaa e ikimasu. Ringo ga yasui desu. Ken-san wa akai ringo o itsutsu kaimasu. Ie e kaette kazoku to tabemasu.",
		vi: "Ken đến siêu thị. Táo đang rẻ. Ken mua năm quả táo đỏ. Về nhà ăn cùng gia đình.",
		questions: [{
			q: "けんさんは何を買いますか。",
			options: [
				{
					jp: "パン",
					romaji: "pan"
				},
				{
					jp: "赤いりんご",
					romaji: "akai ringo"
				},
				{
					jp: "牛乳",
					romaji: "gyuunyuu"
				},
				{
					jp: "魚",
					romaji: "sakana"
				}
			],
			answer: 1,
			explain: "赤いりんごを五つ買います."
		}, {
			q: "りんごは高いですか。",
			options: [
				{
					jp: "はい、高いです",
					romaji: "Hai, takai desu"
				},
				{
					jp: "いいえ、安いです",
					romaji: "Iie, yasui desu"
				},
				{
					jp: "分かりません",
					romaji: "wakarimasen"
				},
				{
					jp: "五つです",
					romaji: "itsutsu desu"
				}
			],
			answer: 1,
			explain: "りんごが安いです."
		}]
	},
	{
		id: "rd-n5-03",
		title: "Ngày mưa ra ga",
		level: "N5",
		jp: "きょうは雨です。空が暗いです。わたしは黄色い傘を持って駅まで歩きます。電車は少し混んでいます。家に帰ると母がお茶を入れてくれました。",
		kana: "きょうはあめです。そらがくらいです。わたしはきいろいかさをもってえきまであるきます。でんしゃはすこしこんでいます。いえにかえるとははがおちゃをいれてくれました。",
		romaji: "Kyou wa ame desu. Sora ga kurai desu. Watashi wa kiiroi kasa o motte eki made arukimasu. Densha wa sukoshi konde imasu. Ie ni kaeru to haha ga ocha o irete kuremashita.",
		vi: "Hôm nay trời mưa. Bầu trời tối. Tôi cầm ô vàng đi bộ tới ga. Tàu hơi đông. Về nhà mẹ pha trà cho tôi.",
		questions: [{
			q: "わたしは何を持っていますか。",
			options: [
				{
					jp: "赤い傘",
					romaji: "akai kasa"
				},
				{
					jp: "黄色い傘",
					romaji: "kiiroi kasa"
				},
				{
					jp: "黒い鞄",
					romaji: "kuroi kaban"
				},
				{
					jp: "白い花",
					romaji: "shiroi hana"
				}
			],
			answer: 1,
			explain: "黄色い傘を持って駅まで歩きます."
		}, {
			q: "家に帰ると、誰がお茶を入れてくれましたか。",
			options: [
				{
					jp: "父",
					romaji: "chichi"
				},
				{
					jp: "先生",
					romaji: "sensei"
				},
				{
					jp: "母",
					romaji: "haha"
				},
				{
					jp: "友達",
					romaji: "tomodachi"
				}
			],
			answer: 2,
			explain: "母がお茶を入れてくれました."
		}]
	},
	{
		id: "rd-n4-01",
		title: "Lỡ tàu buổi sáng",
		level: "N4",
		jp: "けさ雪でバスが遅れました。走ったのに、電車に間に合いませんでした。会社に連絡して、次の電車で行きました。会議には少し遅れましたが、資料は昨夜準備しておきました。",
		kana: "けさゆきでバスがおくれました。はしったのに、でんしゃにまにあいませんでした。かいしゃにれんらくして、つぎのでんしゃでいきました。かいぎにはすこしおくれましたが、しりょうはさくやじゅんびしておきました。",
		romaji: "Kesa yuki de basu ga okuremashita. Hashitta noni, densha ni maniaimasen deshita. Kaisha ni renraku shite, tsugi no densha de ikimashita. Kaigi ni wa sukoshi okuremashita ga, shiryou wa sakuya junbi shite okimashita.",
		vi: "Sáng nay xe buýt trễ vì tuyết. Dù chạy vẫn không kịp tàu. Tôi liên lạc công ty rồi đi chuyến sau. Họp hơi trễ nhưng tài liệu đã chuẩn bị từ tối qua.",
		questions: [{
			q: "なぜ電車に間に合いませんでしたか。",
			options: [
				{
					jp: "会議があったから",
					romaji: "kaigi ga atta kara"
				},
				{
					jp: "雪でバスが遅れたから",
					romaji: "yuki de basu ga okureta kara"
				},
				{
					jp: "資料がなかったから",
					romaji: "shiryou ga nakatta kara"
				},
				{
					jp: "会社が休みだったから",
					romaji: "kaisha ga yasumi datta kara"
				}
			],
			answer: 1,
			explain: "けさ雪でバスが遅れました。それが原因です。"
		}, {
			q: "資料はいつ準備しましたか。",
			options: [
				{
					jp: "今朝",
					romaji: "kesa"
				},
				{
					jp: "会議の後",
					romaji: "kaigi no ato"
				},
				{
					jp: "昨夜",
					romaji: "sakuya"
				},
				{
					jp: "来週",
					romaji: "raishuu"
				}
			],
			answer: 2,
			explain: "資料は昨夜準備しておきました。"
		}]
	},
	{
		id: "rd-n4-02",
		title: "Chuẩn bị thuyết trình",
		level: "N4",
		jp: "来週、研究の発表があります。図書館で資料を集めて、家で何度も練習するつもりです。失敗しないように、先生に相談しておきました。緊張すると思いますが、やってみます。",
		kana: "らいしゅう、けんきゅうのはっぴょうがあります。としょかんでしりょうをあつめて、いえでなんどもれんしゅうするつもりです。しっぱいしないように、せんせいにそうだんしておきました。きんちょうするとおもいますが、やってみます。",
		romaji: "Raishuu, kenkyuu no happyou ga arimasu. Toshokan de shiryou o atsumete, ie de nando mo renshuu suru tsumori desu. Shippai shinai you ni, sensei ni soudan shite okimashita. Kinchou suru to omoimasu ga, yatte mimasu.",
		vi: "Tuần sau có buổi thuyết trình nghiên cứu. Tôi định thu thập tài liệu ở thư viện rồi luyện ở nhà. Để khỏi thất bại, tôi đã hỏi ý thầy trước. Sẽ hồi hộp nhưng tôi sẽ thử.",
		questions: [{
			q: "発表はいつですか。",
			options: [
				{
					jp: "昨日",
					romaji: "kinou"
				},
				{
					jp: "今夜",
					romaji: "konya"
				},
				{
					jp: "来週",
					romaji: "raishuu"
				},
				{
					jp: "来年",
					romaji: "rainen"
				}
			],
			answer: 2,
			explain: "来週、研究の発表があります。"
		}, {
			q: "失敗しないために、何をしましたか。",
			options: [
				{
					jp: "旅行した",
					romaji: "ryokou shita"
				},
				{
					jp: "先生に相談した",
					romaji: "sensei ni soudan shita"
				},
				{
					jp: "会社を休んだ",
					romaji: "kaisha o yasunda"
				},
				{
					jp: "切符を買った",
					romaji: "kippu o katta"
				}
			],
			answer: 1,
			explain: "先生に相談しておきました。"
		}]
	},
	{
		id: "rd-n4-03",
		title: "Lễ hội phố",
		level: "N4",
		jp: "日曜日に町の祭りがあるそうです。弟は花火を見たがっています。母は弁当を作っておくと言いました。雨が降っても、駅前まで行くつもりです。世界の料理も出るらしいです。",
		kana: "にちようびにまちのまつりがあるそうです。おとうとははなびをみたがっています。はははべんとうをつくっておくといいました。あめがふっても、えきまえまでいくつもりです。せかいのりょうりもでるらしいです。",
		romaji: "Nichiyoubi ni machi no matsuri ga aru sou desu. Otouto wa hanabi o mitagatte imasu. Haha wa bentou o tsukutte oku to iimashita. Ame ga futte mo, ekimae made iku tsumori desu. Sekai no ryouri mo deru rashii desu.",
		vi: "Nghe nói Chủ nhật có lễ hội phố. Em trai muốn xem pháo hoa. Mẹ nói sẽ nấu cơm hộp sẵn. Dù mưa chúng tôi vẫn định ra trước ga. Nghe đâu cũng có quán ẩm thực thế giới.",
		questions: [{
			q: "祭りの情報はどのような形で伝わっていますか。",
			options: [
				{
					jp: "自分が昨日見た",
					romaji: "jibun ga kinou mita"
				},
				{
					jp: "聞いた話（そうだ）",
					romaji: "kiita hanashi (sou da)"
				},
				{
					jp: "天気予報だけ",
					romaji: "tenki yohou dake"
				},
				{
					jp: "手紙",
					romaji: "tegami"
				}
			],
			answer: 1,
			explain: "あるそうです — mẫu truyền tin."
		}, {
			q: "雨の場合、家族はどうしますか。",
			options: [
				{
					jp: "家にいる",
					romaji: "ie ni iru"
				},
				{
					jp: "駅前まで行く",
					romaji: "ekimae made iku"
				},
				{
					jp: "飛行機で帰る",
					romaji: "hikouki de kaeru"
				},
				{
					jp: "会議に出る",
					romaji: "kaigi ni deru"
				}
			],
			answer: 1,
			explain: "雨が降っても、駅前まで行くつもりです。"
		}]
	},
	{
		id: "rd-n5-06",
		title: "Chủ nhật ở công viên",
		level: "N5",
		jp: "日曜日、私は公園へ行きます。子どもがボールで遊びます。犬もたくさんいます。午後、友達とコーヒーを飲みます。",
		kana: "にちようび、わたしはこうえんへいきます。こどもがボールであそびます。いぬもたくさんいます。ごご、ともだちとコーヒーをのみます。",
		romaji: "Nichiyoubi, watashi wa kouen e ikimasu. Kodomo ga booru de asobimasu. Inu mo takusan imasu. Gogo, tomodachi to koohii o nomimasu.",
		vi: "Chủ nhật tôi đến công viên. Trẻ con chơi bóng. Cũng có nhiều chó. Buổi chiều tôi uống cà phê với bạn.",
		questions: [{
			q: "公園で子どもは何をしますか。",
			options: [
				{
					jp: "本を読む",
					romaji: "hon o yomu"
				},
				{
					jp: "ボールで遊ぶ",
					romaji: "booru de asobu"
				},
				{
					jp: "電車に乗る",
					romaji: "densha ni noru"
				},
				{
					jp: "試験を受ける",
					romaji: "shiken o ukeru"
				}
			],
			answer: 1,
			explain: "子どもがボールで遊びます。"
		}, {
			q: "午後、誰とコーヒーを飲みますか。",
			options: [
				{
					jp: "先生",
					romaji: "sensei"
				},
				{
					jp: "母",
					romaji: "haha"
				},
				{
					jp: "友達",
					romaji: "tomodachi"
				},
				{
					jp: "駅員",
					romaji: "ekiin"
				}
			],
			answer: 2,
			explain: "友達とコーヒーを飲みます。"
		}]
	},
	{
		id: "rd-n5-04",
		title: "Thư gửi mẹ",
		level: "N5",
		jp: "お母さん、元気ですか。今、日本語を毎日勉強しています。先生は面白いです。来月、東京へ行きたいです。一緒に行きませんか。",
		kana: "おかあさん、げんきですか。いま、にほんごをまいにちべんきょうしています。せんせいはおもしろいです。らいげつ、とうきょうへいきたいです。いっしょにいきませんか。",
		romaji: "Okaasan, genki desu ka. Ima, nihongo o mainichi benkyou shite imasu. Sensei wa omoshiroi desu. Raigetsu, Toukyou e ikitai desu. Issho ni ikimasen ka.",
		vi: "Mẹ khỏe không? Giờ con học tiếng Nhật mỗi ngày. Thầy cô thú vị. Tháng sau con muốn đi Tokyo. Mẹ đi cùng chứ?",
		questions: [{
			q: "今、何をしていますか。",
			options: [
				{
					jp: "働いている",
					romaji: "hataraite iru"
				},
				{
					jp: "日本語を勉強している",
					romaji: "nihongo o benkyou shite iru"
				},
				{
					jp: "料理している",
					romaji: "ryouri shite iru"
				},
				{
					jp: "寝ている",
					romaji: "nete iru"
				}
			],
			answer: 1,
			explain: "日本語を毎日勉強しています。"
		}, {
			q: "東京へいつ行きたいですか。",
			options: [
				{
					jp: "昨日",
					romaji: "kinou"
				},
				{
					jp: "来月",
					romaji: "raigetsu"
				},
				{
					jp: "来年",
					romaji: "rainen"
				},
				{
					jp: "今朝",
					romaji: "kesa"
				}
			],
			answer: 1,
			explain: "来月、東京へ行きたいです。"
		}]
	},
	{
		id: "rd-n4-04",
		title: "Quyết định việc làm",
		level: "N4",
		jp: "卒業したら、日本で働きたいと思っています。そのためには、N3に合格しなければならないので、今から準備しています。落ちても、もう一度受けてみるつもりです。",
		kana: "そつぎょうしたら、にほんで働きたいとおもっています。そのためには、N3にごうかくしなければならないので、いまからじゅんびしています。おちても、もういちどうけてみるつもりです。",
		romaji: "Sotsugyou shitara, Nihon de hatarakitai to omotte imasu. Sono tame ni wa, N3 ni goukaku shinakereba naranai node, ima kara junbi shite imasu. Ochite mo, mou ichido ukete miru tsumori desu.",
		vi: "Tốt nghiệp xong tôi nghĩ muốn làm việc ở Nhật. Vì vậy phải đỗ N3 nên đang chuẩn bị. Dù trượt vẫn định thi lại.",
		questions: [{
			q: "なぜ今から準備していますか。",
			options: [
				{
					jp: "旅行したいから",
					romaji: "ryokou shitai kara"
				},
				{
					jp: "N3に合格しなければならないから",
					romaji: "N3 ni goukaku shinakereba naranai kara"
				},
				{
					jp: "映画を見るから",
					romaji: "eiga o miru kara"
				},
				{
					jp: "犬を買うから",
					romaji: "inu o kau kara"
				}
			],
			answer: 1,
			explain: "N3に合格しなければならないので。"
		}, {
			q: "落ちたらどうしますか。",
			options: [
				{
					jp: "やめる",
					romaji: "yameru"
				},
				{
					jp: "もう一度受けてみる",
					romaji: "mou ichido ukete miru"
				},
				{
					jp: "国へ帰るだけ",
					romaji: "kuni e kaeru dake"
				},
				{
					jp: "先生になる",
					romaji: "sensei ni naru"
				}
			],
			answer: 1,
			explain: "落ちても、もう一度受けてみるつもりです。"
		}]
	},
	{
		id: "rd-n5-07",
		title: "Điện thoại của Mai",
		level: "N5",
		jp: "まいさんは新しい携帯電話を買いました。とても小さいです。まいさんは毎日お母さんに電話をかけます。夜はゲームをしません。",
		kana: "まいさんはあたらしいけいたいでんわをかいました。とてもちいさいです。まいさんはまいにちおかあさんにでんわをかけます。よるはゲームをしません。",
		romaji: "Mai-san wa atarashii keitai denwa o kaimashita. Totemo chiisai desu. Mai-san wa mainichi okaasan ni denwa o kakemasu. Yoru wa geemu o shimasen.",
		vi: "Mai mua điện thoại mới. Nó rất nhỏ. Mai gọi mẹ mỗi ngày. Ban đêm không chơi game.",
		questions: [{
			q: "まいさんは何を買いましたか。",
			options: [
				{
					jp: "本",
					romaji: "hon"
				},
				{
					jp: "新しい携帯電話",
					romaji: "atarashii keitai denwa"
				},
				{
					jp: "傘",
					romaji: "kasa"
				},
				{
					jp: "時計",
					romaji: "tokei"
				}
			],
			answer: 1,
			explain: "新しい携帯電話を買いました."
		}, {
			q: "夜は何をしますか。",
			options: [
				{
					jp: "ゲームをします",
					romaji: "geemu o shimasu"
				},
				{
					jp: "ゲームをしません",
					romaji: "geemu o shimasen"
				},
				{
					jp: "学校へ行きます",
					romaji: "gakkou e ikimasu"
				},
				{
					jp: "魚を食べます",
					romaji: "sakana o tabemasu"
				}
			],
			answer: 1,
			explain: "夜はゲームをしません."
		}]
	},
	{
		id: "rd-n5-05",
		title: "Takashi ở công viên",
		level: "N5",
		jp: "日曜日、たかしさんは公園へ行きます。犬が三匹います。子どもがボールで遊びます。たかしさんは写真を十枚撮りました。",
		kana: "にちようび、たかしさんはこうえんへいきます。いぬがさんびきいます。こどもがボールであそびます。たかしさんはしゃしんをじゅうまいとりました。",
		romaji: "Nichiyoubi, Takashi-san wa kouen e ikimasu. Inu ga sanbiki imasu. Kodomo ga booru de asobimasu. Takashi-san wa shashin o juumai torimashita.",
		vi: "Chủ nhật Takashi đến công viên. Có ba con chó. Trẻ em chơi bóng. Takashi chụp mười tấm ảnh.",
		questions: [{
			q: "犬は何匹いますか。",
			options: [
				{
					jp: "一匹",
					romaji: "ippiki"
				},
				{
					jp: "二匹",
					romaji: "nihiki"
				},
				{
					jp: "三匹",
					romaji: "sanbiki"
				},
				{
					jp: "十匹",
					romaji: "juppiki"
				}
			],
			answer: 2,
			explain: "犬が三匹います."
		}, {
			q: "たかしさんは何を撮りましたか。",
			options: [
				{
					jp: "映画",
					romaji: "eiga"
				},
				{
					jp: "写真",
					romaji: "shashin"
				},
				{
					jp: "手紙",
					romaji: "tegami"
				},
				{
					jp: "地図",
					romaji: "chizu"
				}
			],
			answer: 1,
			explain: "写真を十枚撮りました."
		}]
	},
	{
		id: "rd-n4-05",
		title: "Nhờ bạn giữ chìa",
		level: "N4",
		jp: "鍵を忘れてしまいました。友達に部屋を見ておいてもらいました。明日、早めに帰るようにします。もう二度と忘れないつもりです。",
		kana: "かぎをわすれてしまいました。ともだちにへやをみておいてもらいました。あした、はやめにかえるようにします。もうにどとわすれないつもりです。",
		romaji: "Kagi o wasurete shimaimashita. Tomodachi ni heya o mite oite moraimashita. Ashita, hayame ni kaeru you ni shimasu. Mou nidoto wasurenai tsumori desu.",
		vi: "Tôi quên mất chìa khóa. Nhờ bạn trông phòng giúp. Mai tôi sẽ về sớm hơn. Định không quên nữa.",
		questions: [{
			q: "何を忘れてしまいましたか。",
			options: [
				{
					jp: "傘",
					romaji: "kasa"
				},
				{
					jp: "鍵",
					romaji: "kagi"
				},
				{
					jp: "宿題",
					romaji: "shukudai"
				},
				{
					jp: "切符",
					romaji: "kippu"
				}
			],
			answer: 1,
			explain: "鍵を忘れてしまいました."
		}, {
			q: "明日どうしますか。",
			options: [
				{
					jp: "旅行します",
					romaji: "ryokou shimasu"
				},
				{
					jp: "早めに帰るようにします",
					romaji: "hayame ni kaeru you ni shimasu"
				},
				{
					jp: "犬を買います",
					romaji: "inu o kaimasu"
				},
				{
					jp: "映画を見ます",
					romaji: "eiga o mimasu"
				}
			],
			answer: 1,
			explain: "早めに帰るようにします."
		}]
	},
	{
		id: "rd-n4-06",
		title: "Bệnh viện buổi chiều",
		level: "N4",
		jp: "頭が痛いので、病院へ行ったほうがいいと思います。薬をもらったら、すぐ飲むつもりです。熱があっても、明日の試験は受けてみます。",
		kana: "あたまがいたいので、びょういんへいったほうがいいとおもいます。くすりをもらったら、すぐのむつもりです。ねつがあっても、あしたのしけんはうけてみます。",
		romaji: "Atama ga itai node, byouin e itta hou ga ii to omoimasu. Kusuri o morattara, sugu nomu tsumori desu. Netsu ga atte mo, ashita no shiken wa ukete mimasu.",
		vi: "Đau đầu nên nghĩ nên đến bệnh viện. Nhận thuốc xong định uống ngay. Dù sốt vẫn sẽ thi ngày mai.",
		questions: [{
			q: "なぜ病院へ行ったほうがいいと思いますか。",
			options: [
				{
					jp: "頭が痛いから",
					romaji: "atama ga itai kara"
				},
				{
					jp: "暇だから",
					romaji: "hima da kara"
				},
				{
					jp: "友達が待つから",
					romaji: "tomodachi ga matsu kara"
				},
				{
					jp: "写真を撮るから",
					romaji: "shashin o toru kara"
				}
			],
			answer: 0,
			explain: "頭が痛いので."
		}, {
			q: "熱があっても何をしますか。",
			options: [
				{
					jp: "寝ます",
					romaji: "nemasu"
				},
				{
					jp: "試験を受けてみます",
					romaji: "shiken o ukete mimasu"
				},
				{
					jp: "泳ぎます",
					romaji: "oyogimasu"
				},
				{
					jp: "料理します",
					romaji: "ryouri shimasu"
				}
			],
			answer: 1,
			explain: "明日の試験は受けてみます."
		}]
	}
];
function Page() {
	const [sel, setSel] = (0, import_react.useState)(READINGS[0].id);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [showKana, setShowKana] = (0, import_react.useState)(false);
	const [showVi, setShowVi] = (0, import_react.useState)(false);
	const item = READINGS.find((r) => r.id === sel);
	const showRomaji = useSettings((s) => s.showRomaji);
	const log = useProgress((s) => s.logStudy);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "読",
			title: "Luyện đọc",
			description: "Đọc đoạn trước, đoán nghĩa, rồi mới mở bản dịch. Bật romaji trong Cài đặt để hiện phiên âm trên đáp án."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: READINGS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: sel === r.id ? "default" : "secondary",
				onClick: () => {
					setSel(r.id);
					setAnswers({});
					setShowKana(false);
					setShowVi(false);
				},
				children: [
					r.level,
					" · ",
					r.title
				]
			}, r.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-jp text-xl leading-relaxed text-fg",
					children: item.jp
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, { text: item.jp })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: showKana ? "default" : "secondary",
					onClick: () => setShowKana((v) => !v),
					children: showKana ? "Ẩn furigana" : "Hiện hiragana"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: showVi ? "default" : "secondary",
					onClick: () => setShowVi((v) => !v),
					children: showVi ? "Ẩn nghĩa" : "Hiện nghĩa"
				})]
			}),
			showKana ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-[10px] border border-border bg-choice p-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-jp text-fg",
					children: item.kana
				}), showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted",
					children: item.romaji
				}) : null]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted",
				children: "Đọc không nhìn phiên âm trước — bấm hiện hiragana khi bí."
			}),
			showVi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-fg",
				children: item.vi
			}) : null
		] }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 space-y-4",
			children: item.questions.map((q, qi) => {
				const picked = answers[qi];
				const revealed = picked !== void 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-fg",
						children: q.q
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid gap-2",
						children: q.options.map((o, oi) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
							state: choiceState({
								revealed,
								isAnswer: oi === q.answer,
								picked: picked === oi
							}),
							disabled: revealed,
							onClick: () => {
								if (revealed) return;
								setAnswers((a) => ({
									...a,
									[qi]: oi
								}));
								log(1, .5);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex flex-col items-start gap-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceKana, { children: o.jp }), showRomaji && o.romaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRomaji, { children: o.romaji }) : null]
							})
						}, o.jp))
					}),
					revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: q.explain
					}) : null
				] }) }, q.q);
			})
		})
	] });
}
//#endregion
export { Page as component };
