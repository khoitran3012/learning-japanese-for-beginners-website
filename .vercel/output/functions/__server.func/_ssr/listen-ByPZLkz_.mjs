import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as uid } from "./utils-D10sm1uC.mjs";
import { n as addQuizResult } from "./storage-BvOEP3N4.mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { t as useCurrentUser } from "./use-current-user-ClOiUQ-z.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-BOD7PV7B.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { i as choiceState, n as ChoiceRomaji, r as ChoiceRow, t as ChoiceKana } from "./choice-row-ySbfq5TF.mjs";
import { t as SpeakButton } from "./speak-button-DVsDELCU.mjs";
import { t as syncQuizToLeaderboard } from "./sync-score-C_3RPUr4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listen-ByPZLkz_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LISTENING = [
	{
		id: "ls-n5-01",
		title: "Hỏi giờ",
		level: "N5",
		promptJp: "今、何時ですか。",
		promptRomaji: "Ima, nanji desu ka.",
		promptVi: "Bây giờ là mấy giờ?",
		options: [
			{
				jp: "三時です。",
				romaji: "Sanji desu.",
				vi: "Ba giờ."
			},
			{
				jp: "電車です。",
				romaji: "Densha desu.",
				vi: "Là tàu điện."
			},
			{
				jp: "水をください。",
				romaji: "Mizu o kudasai.",
				vi: "Cho tôi nước."
			},
			{
				jp: "はい、学生です。",
				romaji: "Hai, gakusei desu.",
				vi: "Vâng, tôi là học sinh."
			}
		],
		answerIndex: 0
	},
	{
		id: "ls-n5-02",
		title: "Mời trà",
		level: "N5",
		promptJp: "お茶を飲みませんか。",
		promptRomaji: "Ocha o nomimasen ka.",
		promptVi: "Bạn uống trà chứ?",
		options: [
			{
				jp: "駅はどこですか。",
				romaji: "Eki wa doko desu ka.",
				vi: "Ga ở đâu?"
			},
			{
				jp: "ええ、ありがとう。",
				romaji: "Ee, arigatou.",
				vi: "Vâng, cảm ơn."
			},
			{
				jp: "明日は試験です。",
				romaji: "Ashita wa shiken desu.",
				vi: "Ngày mai có kỳ thi."
			},
			{
				jp: "これは本です。",
				romaji: "Kore wa hon desu.",
				vi: "Đây là sách."
			}
		],
		answerIndex: 1
	},
	{
		id: "ls-n5-03",
		title: "Hỏi giá táo",
		level: "N5",
		promptJp: "このりんごはいくらですか。",
		promptRomaji: "Kono ringo wa ikura desu ka.",
		promptVi: "Quả táo này bao nhiêu tiền?",
		options: [
			{
				jp: "赤いです。",
				romaji: "Akai desu.",
				vi: "Màu đỏ."
			},
			{
				jp: "五つです。",
				romaji: "Itsutsu desu.",
				vi: "Năm quả."
			},
			{
				jp: "百円です。",
				romaji: "Hyakuen desu.",
				vi: "Một trăm yên."
			},
			{
				jp: "図書館です。",
				romaji: "Toshokan desu.",
				vi: "Là thư viện."
			}
		],
		answerIndex: 2
	},
	{
		id: "ls-n5-04",
		title: "Đến trường bằng gì",
		level: "N5",
		promptJp: "学校までどうやって行きますか。",
		promptRomaji: "Gakkou made dou yatte ikimasu ka.",
		promptVi: "Bạn đến trường bằng cách nào?",
		options: [
			{
				jp: "自転車で行きます。",
				romaji: "Jitensha de ikimasu.",
				vi: "Tôi đi xe đạp."
			},
			{
				jp: "魚を食べます。",
				romaji: "Sakana o tabemasu.",
				vi: "Tôi ăn cá."
			},
			{
				jp: "静かな部屋です。",
				romaji: "Shizuka na heya desu.",
				vi: "Là phòng yên tĩnh."
			},
			{
				jp: "黒い猫です。",
				romaji: "Kuroi neko desu.",
				vi: "Là mèo đen."
			}
		],
		answerIndex: 0
	},
	{
		id: "ls-n5-05",
		title: "Thời tiết ngày mai",
		level: "N5",
		promptJp: "明日の天気はどうですか。",
		promptRomaji: "Ashita no tenki wa dou desu ka.",
		promptVi: "Thời tiết ngày mai thế nào?",
		options: [
			{
				jp: "私は学生です。",
				romaji: "Watashi wa gakusei desu.",
				vi: "Tôi là học sinh."
			},
			{
				jp: "雨です。傘を持って行きます。",
				romaji: "Ame desu. Kasa o motte ikimasu.",
				vi: "Trời mưa. Tôi sẽ mang ô."
			},
			{
				jp: "机の上にあります。",
				romaji: "Tsukue no ue ni arimasu.",
				vi: "Ở trên bàn."
			},
			{
				jp: "八時に寝ます。",
				romaji: "Hachiji ni nemasu.",
				vi: "Tôi ngủ lúc tám giờ."
			}
		],
		answerIndex: 1
	},
	{
		id: "ls-n5-06",
		title: "Nhà vệ sinh ở đâu",
		level: "N5",
		promptJp: "すみません、トイレはどこですか。",
		promptRomaji: "Sumimasen, toire wa doko desu ka.",
		promptVi: "Xin lỗi, nhà vệ sinh ở đâu?",
		options: [
			{
				jp: "階段の隣です。",
				romaji: "Kaidan no tonari desu.",
				vi: "Ở cạnh cầu thang."
			},
			{
				jp: "日本語が好きです。",
				romaji: "Nihongo ga suki desu.",
				vi: "Tôi thích tiếng Nhật."
			},
			{
				jp: "三千円です。",
				romaji: "Sanzen-en desu.",
				vi: "Ba nghìn yên."
			},
			{
				jp: "ゆっくり話してください。",
				romaji: "Yukkuri hanashite kudasai.",
				vi: "Hãy nói chậm."
			}
		],
		answerIndex: 0
	},
	{
		id: "ls-n4-01",
		title: "Liên lạc vì trễ",
		level: "N4",
		promptJp: "電車が遅れそうです。会社に連絡したほうがいいですか。",
		promptRomaji: "Densha ga okure sou desu. Kaisha ni renraku shita hou ga ii desu ka.",
		promptVi: "Tàu có vẻ sẽ trễ. Tôi nên liên lạc công ty chứ?",
		options: [
			{
				jp: "写真を撮りましょう。",
				romaji: "Shashin o torimashou.",
				vi: "Mình chụp ảnh nhé."
			},
			{
				jp: "はい、必ず連絡してください。",
				romaji: "Hai, kanarazu renraku shite kudasai.",
				vi: "Vâng, nhất định hãy liên lạc."
			},
			{
				jp: "この本は面白いです。",
				romaji: "Kono hon wa omoshiroi desu.",
				vi: "Quyển sách này thú vị."
			},
			{
				jp: "冷房を消してください。",
				romaji: "Reibou o keshite kudasai.",
				vi: "Hãy tắt điều hòa."
			}
		],
		answerIndex: 1
	},
	{
		id: "ls-n4-02",
		title: "Đặt khách sạn",
		level: "N4",
		promptJp: "旅行の前にホテルを予約しておきましょうか。",
		promptRomaji: "Ryokou no mae ni hoteru o yoyaku shite okimashou ka.",
		promptVi: "Trước chuyến đi mình đặt khách sạn sẵn nhé?",
		options: [
			{
				jp: "ええ、お願いしたほうが安心です。",
				romaji: "Ee, onegai shita hou ga anshin desu.",
				vi: "Vâng, đặt thì yên tâm hơn."
			},
			{
				jp: "窓が開いています。",
				romaji: "Mado ga aite imasu.",
				vi: "Cửa sổ đang mở."
			},
			{
				jp: "私は肉が好きです。",
				romaji: "Watashi wa niku ga suki desu.",
				vi: "Tôi thích thịt."
			},
			{
				jp: "七時に起きました。",
				romaji: "Shichiji ni okimashita.",
				vi: "Tôi dậy lúc bảy giờ."
			}
		],
		answerIndex: 0
	},
	{
		id: "ls-n4-03",
		title: "Tin đồn cửa hàng mới",
		level: "N4",
		promptJp: "駅の前に新しい店ができたそうです。",
		promptRomaji: "Eki no mae ni atarashii mise ga dekita sou desu.",
		promptVi: "Nghe nói trước ga có cửa hàng mới.",
		options: [
			{
				jp: "自分で昨日作りました。",
				romaji: "Jibun de kinou tsukurimashita.",
				vi: "Tôi tự làm hôm qua."
			},
			{
				jp: "本当ですか。今度行ってみましょう。",
				romaji: "Hontou desu ka. Kondo itte mimashou.",
				vi: "Thật à? Lần này mình thử đến xem."
			},
			{
				jp: "足が痛いです。",
				romaji: "Ashi ga itai desu.",
				vi: "Chân tôi đau."
			},
			{
				jp: "辞書を貸してください。",
				romaji: "Jisho o kashite kudasai.",
				vi: "Cho mượn từ điển."
			}
		],
		answerIndex: 1
	},
	{
		id: "ls-n4-04",
		title: "Khuyên hỏi thầy",
		level: "N4",
		promptJp: "進路が決まらなくて困っています。",
		promptRomaji: "Shinro ga kimaranakute komatte imasu.",
		promptVi: "Tôi đang bối rối vì chưa quyết được hướng đi.",
		options: [
			{
				jp: "先生に相談したらどうですか。",
				romaji: "Sensei ni soudan shitara dou desu ka.",
				vi: "Hay là hỏi ý thầy cô?"
			},
			{
				jp: "これは百円です。",
				romaji: "Kore wa hyakuen desu.",
				vi: "Cái này một trăm yên."
			},
			{
				jp: "電車に乗ってください。",
				romaji: "Densha ni notte kudasai.",
				vi: "Hãy lên tàu."
			},
			{
				jp: "空が青いです。",
				romaji: "Sora ga aoi desu.",
				vi: "Bầu trời xanh."
			}
		],
		answerIndex: 0
	},
	{
		id: "ls-n5-07",
		title: "Hỏi kanji",
		level: "N5",
		promptJp: "この漢字は何と読みますか。",
		promptRomaji: "Kono kanji wa nan to yomimasu ka.",
		promptVi: "Kanji này đọc thế nào?",
		options: [
			{
				jp: "「ひ」と読みます。",
				romaji: "Hi to yomimasu.",
				vi: "Đọc là hi."
			},
			{
				jp: "電車を降ります。",
				romaji: "Densha o orimasu.",
				vi: "Xuống tàu."
			},
			{
				jp: "水をください。",
				romaji: "Mizu o kudasai.",
				vi: "Cho tôi nước."
			},
			{
				jp: "今日は雨です。",
				romaji: "Kyou wa ame desu.",
				vi: "Hôm nay trời mưa."
			}
		],
		answerIndex: 0
	},
	{
		id: "ls-n5-08",
		title: "Gọi món",
		level: "N5",
		promptJp: "すみません、ラーメンを二つください。",
		promptRomaji: "Sumimasen, raamen o futatsu kudasai.",
		promptVi: "Xin lỗi, cho tôi hai tô ramen.",
		options: [
			{
				jp: "かしこまりました。",
				romaji: "Kashikomarimashita.",
				vi: "Vâng ạ."
			},
			{
				jp: "駅はあっちです。",
				romaji: "Eki wa acchi desu.",
				vi: "Ga ở phía kia."
			},
			{
				jp: "試験は難しいです。",
				romaji: "Shiken wa muzukashii desu.",
				vi: "Kỳ thi khó."
			},
			{
				jp: "本を返してください。",
				romaji: "Hon o kaeshite kudasai.",
				vi: "Hãy trả sách."
			}
		],
		answerIndex: 0
	},
	{
		id: "ls-n5-09",
		title: "Hỏi đường",
		level: "N5",
		promptJp: "郵便局はどこですか。",
		promptRomaji: "Yuubinkyoku wa doko desu ka.",
		promptVi: "Bưu điện ở đâu?",
		options: [
			{
				jp: "銀行の隣です。",
				romaji: "Ginkou no tonari desu.",
				vi: "Cạnh ngân hàng."
			},
			{
				jp: "お茶が好きです。",
				romaji: "Ocha ga suki desu.",
				vi: "Tôi thích trà."
			},
			{
				jp: "九時に起きます。",
				romaji: "Kuji ni okimasu.",
				vi: "Dậy lúc 9 giờ."
			},
			{
				jp: "これは猫です。",
				romaji: "Kore wa neko desu.",
				vi: "Đây là mèo."
			}
		],
		answerIndex: 0
	},
	{
		id: "ls-n4-05",
		title: "Nhờ giữ chỗ",
		level: "N4",
		promptJp: "この席、ちょっと見ておいてもらえますか。",
		promptRomaji: "Kono seki, chotto mite oite moraemasu ka.",
		promptVi: "Nhờ bạn trông giúp chỗ này một chút được không?",
		options: [
			{
				jp: "ええ、大丈夫ですよ。",
				romaji: "Ee, daijoubu desu yo.",
				vi: "Được, không sao."
			},
			{
				jp: "富士山は高いです。",
				romaji: "Fujisan wa takai desu.",
				vi: "Núi Phú Sĩ cao."
			},
			{
				jp: "写真を撮りました。",
				romaji: "Shashin o torimashita.",
				vi: "Tôi đã chụp ảnh."
			},
			{
				jp: "魚を食べません。",
				romaji: "Sakana o tabemasen.",
				vi: "Tôi không ăn cá."
			}
		],
		answerIndex: 0
	},
	{
		id: "ls-n4-06",
		title: "Kanji trong từ",
		level: "N4",
		promptJp: "「日本」の「日」は何と読みますか。",
		promptRomaji: "Nihon no nichi/hi wa nan to yomimasu ka.",
		promptVi: "Chữ 日 trong 日本 đọc thế nào?",
		options: [
			{
				jp: "「に」と読みます。",
				romaji: "Ni to yomimasu.",
				vi: "Đọc là ni."
			},
			{
				jp: "「つき」と読みます。",
				romaji: "Tsuki to yomimasu.",
				vi: "Đọc là tsuki."
			},
			{
				jp: "「みず」と読みます。",
				romaji: "Mizu to yomimasu.",
				vi: "Đọc là mizu."
			},
			{
				jp: "「やま」と読みます。",
				romaji: "Yama to yomimasu.",
				vi: "Đọc là yama."
			}
		],
		answerIndex: 0
	},
	{
		id: "ls-n5-10",
		title: "Kanji 水",
		level: "N5",
		promptJp: "水、ください。",
		promptRomaji: "Mizu, kudasai.",
		promptVi: "Cho tôi nước.",
		options: [
			{
				jp: "はい、どうぞ。",
				romaji: "Hai, douzo.",
				vi: "Vâng, mời."
			},
			{
				jp: "電車です。",
				romaji: "Densha desu.",
				vi: "Là tàu điện."
			},
			{
				jp: "月曜日です。",
				romaji: "Getsuyoubi desu.",
				vi: "Là thứ Hai."
			},
			{
				jp: "高いです。",
				romaji: "Takai desu.",
				vi: "Đắt."
			}
		],
		answerIndex: 0
	},
	{
		id: "ls-n5-11",
		title: "Đọc 山",
		level: "N5",
		promptJp: "あの山は富士山です。",
		promptRomaji: "Ano yama wa Fujisan desu.",
		promptVi: "Núi kia là núi Phú Sĩ.",
		options: [
			{
				jp: "川です。",
				romaji: "Kawa desu.",
				vi: "Là sông."
			},
			{
				jp: "富士山です。",
				romaji: "Fujisan desu.",
				vi: "Là núi Phú Sĩ."
			},
			{
				jp: "海です。",
				romaji: "Umi desu.",
				vi: "Là biển."
			},
			{
				jp: "森です。",
				romaji: "Mori desu.",
				vi: "Là rừng."
			}
		],
		answerIndex: 1
	},
	{
		id: "ls-n5-12",
		title: "Người và cửa",
		level: "N5",
		promptJp: "人が五人、入口にいます。",
		promptRomaji: "Hito ga gonin, iriguchi ni imasu.",
		promptVi: "Có năm người ở cửa vào.",
		options: [
			{
				jp: "入口に五人います。",
				romaji: "Iriguchi ni gonin imasu.",
				vi: "Ở cửa vào có năm người."
			},
			{
				jp: "犬が五匹います。",
				romaji: "Inu ga gohiki imasu.",
				vi: "Có năm con chó."
			},
			{
				jp: "本が五冊あります。",
				romaji: "Hon ga gosatsu arimasu.",
				vi: "Có năm quyển sách."
			},
			{
				jp: "車が五台あります。",
				romaji: "Kuruma ga godai arimasu.",
				vi: "Có năm chiếc xe."
			}
		],
		answerIndex: 0
	},
	{
		id: "ls-n4-07",
		title: "Đọc 会",
		level: "N4",
		promptJp: "会議は何時に始まりますか。",
		promptRomaji: "Kaigi wa nanji ni hajimarimasu ka.",
		promptVi: "Cuộc họp bắt đầu lúc mấy giờ?",
		options: [
			{
				jp: "三時に始まります。",
				romaji: "Sanji ni hajimarimasu.",
				vi: "Bắt đầu lúc 3 giờ."
			},
			{
				jp: "駅で待ちます。",
				romaji: "Eki de machimasu.",
				vi: "Đợi ở ga."
			},
			{
				jp: "写真を撮ります。",
				romaji: "Shashin o torimasu.",
				vi: "Chụp ảnh."
			},
			{
				jp: "お茶が好きです。",
				romaji: "Ocha ga suki desu.",
				vi: "Thích trà."
			}
		],
		answerIndex: 0
	},
	{
		id: "ls-n4-08",
		title: "Nhờ giải thích",
		level: "N4",
		promptJp: "この漢字の読み方を教えてください。",
		promptRomaji: "Kono kanji no yomikata o oshiete kudasai.",
		promptVi: "Làm ơn dạy cách đọc kanji này.",
		options: [
			{
				jp: "「やま」と読みます。",
				romaji: "Yama to yomimasu.",
				vi: "Đọc là yama."
			},
			{
				jp: "電車で行きます。",
				romaji: "Densha de ikimasu.",
				vi: "Đi bằng tàu."
			},
			{
				jp: "明日は雨です。",
				romaji: "Ashita wa ame desu.",
				vi: "Mai mưa."
			},
			{
				jp: "これは机です。",
				romaji: "Kore wa tsukue desu.",
				vi: "Đây là bàn."
			}
		],
		answerIndex: 0
	}
];
function Page() {
	const [i, setI] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const log = useProgress((s) => s.logStudy);
	const streak = useProgress((s) => s.streak);
	const showRomaji = useSettings((s) => s.showRomaji);
	const user = useCurrentUser();
	const item = LISTENING[i];
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Luyện nghe" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			"Hoàn thành ",
			score,
			"/",
			LISTENING.length,
			"."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-4",
			onClick: () => {
				setI(0);
				setScore(0);
				setPicked(null);
			},
			children: "Làm lại"
		})
	] });
	const revealed = picked !== null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "聴",
		title: "Luyện nghe",
		description: "Nghe trước, chọn đáp án. Romaji hiện khi bật trong Cài đặt — câu gốc chỉ hiện sau khi trả lời."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "mx-auto max-w-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						item.title,
						" · ",
						item.level,
						" · ",
						i + 1,
						"/",
						LISTENING.length
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
					text: item.promptJp,
					label: "Nghe câu"
				}),
				revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[10px] border border-border bg-choice p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-jp text-xl leading-relaxed text-fg",
							children: item.promptJp
						}),
						showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-relaxed text-muted",
							children: item.promptRomaji
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-relaxed text-fg",
							children: item.promptVi
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Bấm nghe, rồi chọn câu trả lời phù hợp. Bản dịch hiện sau."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2",
					children: item.options.map((o, idx) => {
						const state = choiceState({
							revealed,
							isAnswer: idx === item.answerIndex,
							picked: picked === idx
						});
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
							state,
							disabled: revealed,
							onClick: () => {
								setPicked(idx);
								if (idx === item.answerIndex) setScore((s) => s + 1);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex min-w-0 flex-col items-start gap-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex flex-wrap items-baseline gap-x-2 gap-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceKana, { children: o.jp }), showRomaji && o.romaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRomaji, { children: o.romaji }) : null]
								}), revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm leading-snug text-fg",
									children: o.vi
								}) : null]
							})
						}, o.jp);
					})
				}),
				revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: async () => {
						const nextScore = score;
						if (i + 1 >= LISTENING.length) {
							await addQuizResult({
								id: uid("quiz"),
								at: Date.now(),
								kind: "listen",
								score: nextScore,
								total: LISTENING.length,
								durationMs: 0
							});
							await log(LISTENING.length, 4);
							await syncQuizToLeaderboard({
								score: nextScore,
								total: LISTENING.length,
								minutes: 4,
								streak,
								displayName: user?.displayName
							});
						}
						setPicked(null);
						setI((x) => x + 1);
					},
					children: "Tiếp"
				}) : null
			]
		})
	})] });
}
//#endregion
export { Page as component };
