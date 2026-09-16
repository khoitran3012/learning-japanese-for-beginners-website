//#region node_modules/.nitro/vite/services/ssr/assets/kana-CV-aAiLY.js
function ex([jp, romaji, vi]) {
	return {
		jp,
		romaji,
		vi
	};
}
function make(kind, seeds) {
	return seeds.map((s) => ({
		id: `${kind === "hiragana" ? "h" : "k"}-${s.romaji}-${s.char}`,
		char: s.char,
		romaji: s.romaji,
		kind,
		group: s.group ?? "gojuon",
		row: s.row,
		col: s.col,
		strokeCount: s.strokes,
		dakutenOf: s.dakutenOf,
		notes: s.notes,
		mnemonic: s.mnemonic,
		pronunciation: s.romaji,
		examples: s.examples.map(ex)
	}));
}
var HIRA_SEEDS = [
	{
		char: "あ",
		romaji: "a",
		row: "a",
		col: "a",
		strokes: 3,
		mnemonic: "Giống người đang cúi chào.",
		examples: [[
			"あさ",
			"asa",
			"buổi sáng"
		]]
	},
	{
		char: "い",
		romaji: "i",
		row: "a",
		col: "i",
		strokes: 2,
		mnemonic: "Hai nét đứng cạnh nhau như chữ i.",
		examples: [[
			"いぬ",
			"inu",
			"con chó"
		]]
	},
	{
		char: "う",
		romaji: "u",
		row: "a",
		col: "u",
		strokes: 2,
		examples: [[
			"うみ",
			"umi",
			"biển"
		]]
	},
	{
		char: "え",
		romaji: "e",
		row: "a",
		col: "e",
		strokes: 2,
		examples: [[
			"えき",
			"eki",
			"nhà ga"
		]]
	},
	{
		char: "お",
		romaji: "o",
		row: "a",
		col: "o",
		strokes: 3,
		examples: [[
			"お茶",
			"ocha",
			"trà"
		]]
	},
	{
		char: "か",
		romaji: "ka",
		row: "ka",
		col: "a",
		strokes: 3,
		examples: [[
			"かさ",
			"kasa",
			"cái ô"
		]]
	},
	{
		char: "き",
		romaji: "ki",
		row: "ka",
		col: "i",
		strokes: 4,
		examples: [[
			"き",
			"ki",
			"cây"
		]]
	},
	{
		char: "く",
		romaji: "ku",
		row: "ka",
		col: "u",
		strokes: 1,
		examples: [[
			"くに",
			"kuni",
			"đất nước"
		]]
	},
	{
		char: "け",
		romaji: "ke",
		row: "ka",
		col: "e",
		strokes: 3,
		examples: [[
			"けむり",
			"kemuri",
			"khói"
		]]
	},
	{
		char: "こ",
		romaji: "ko",
		row: "ka",
		col: "o",
		strokes: 2,
		examples: [[
			"こども",
			"kodomo",
			"trẻ em"
		]]
	},
	{
		char: "さ",
		romaji: "sa",
		row: "sa",
		col: "a",
		strokes: 3,
		examples: [[
			"さかな",
			"sakana",
			"cá"
		]]
	},
	{
		char: "し",
		romaji: "shi",
		row: "sa",
		col: "i",
		strokes: 1,
		notes: "Đọc shi, không phải si.",
		examples: [[
			"しろ",
			"shiro",
			"màu trắng / lâu đài"
		]]
	},
	{
		char: "す",
		romaji: "su",
		row: "sa",
		col: "u",
		strokes: 2,
		examples: [[
			"すし",
			"sushi",
			"sushi"
		]]
	},
	{
		char: "せ",
		romaji: "se",
		row: "sa",
		col: "e",
		strokes: 3,
		examples: [[
			"せんせい",
			"sensei",
			"giáo viên"
		]]
	},
	{
		char: "そ",
		romaji: "so",
		row: "sa",
		col: "o",
		strokes: 1,
		examples: [[
			"そら",
			"sora",
			"bầu trời"
		]]
	},
	{
		char: "た",
		romaji: "ta",
		row: "ta",
		col: "a",
		strokes: 4,
		examples: [[
			"たべる",
			"taberu",
			"ăn"
		]]
	},
	{
		char: "ち",
		romaji: "chi",
		row: "ta",
		col: "i",
		strokes: 3,
		notes: "Đọc chi, không phải ti.",
		examples: [[
			"ちず",
			"chizu",
			"bản đồ"
		]]
	},
	{
		char: "つ",
		romaji: "tsu",
		row: "ta",
		col: "u",
		strokes: 1,
		notes: "Đọc tsu, không phải tu.",
		examples: [[
			"つき",
			"tsuki",
			"mặt trăng"
		]]
	},
	{
		char: "て",
		romaji: "te",
		row: "ta",
		col: "e",
		strokes: 1,
		examples: [[
			"て",
			"te",
			"bàn tay"
		]]
	},
	{
		char: "と",
		romaji: "to",
		row: "ta",
		col: "o",
		strokes: 2,
		examples: [[
			"とり",
			"tori",
			"con chim"
		]]
	},
	{
		char: "な",
		romaji: "na",
		row: "na",
		col: "a",
		strokes: 4,
		examples: [[
			"なつ",
			"natsu",
			"mùa hè"
		]]
	},
	{
		char: "に",
		romaji: "ni",
		row: "na",
		col: "i",
		strokes: 3,
		examples: [[
			"にほん",
			"nihon",
			"Nhật Bản"
		]]
	},
	{
		char: "ぬ",
		romaji: "nu",
		row: "na",
		col: "u",
		strokes: 2,
		examples: [[
			"いぬ",
			"inu",
			"con chó"
		]]
	},
	{
		char: "ね",
		romaji: "ne",
		row: "na",
		col: "e",
		strokes: 2,
		examples: [[
			"ねこ",
			"neko",
			"con mèo"
		]]
	},
	{
		char: "の",
		romaji: "no",
		row: "na",
		col: "o",
		strokes: 1,
		examples: [[
			"のり",
			"nori",
			"rong biển"
		]]
	},
	{
		char: "は",
		romaji: "ha",
		row: "ha",
		col: "a",
		strokes: 3,
		notes: "Khi là trợ từ chủ đề, đọc wa.",
		examples: [[
			"はな",
			"hana",
			"hoa / mũi"
		]]
	},
	{
		char: "ひ",
		romaji: "hi",
		row: "ha",
		col: "i",
		strokes: 1,
		examples: [[
			"ひと",
			"hito",
			"người"
		]]
	},
	{
		char: "ふ",
		romaji: "fu",
		row: "ha",
		col: "u",
		strokes: 4,
		notes: "Đọc fu (gần hu).",
		examples: [[
			"ふゆ",
			"fuyu",
			"mùa đông"
		]]
	},
	{
		char: "へ",
		romaji: "he",
		row: "ha",
		col: "e",
		strokes: 1,
		notes: "Khi là trợ từ hướng, đọc e.",
		examples: [[
			"へや",
			"heya",
			"căn phòng"
		]]
	},
	{
		char: "ほ",
		romaji: "ho",
		row: "ha",
		col: "o",
		strokes: 4,
		examples: [[
			"ほん",
			"hon",
			"sách"
		]]
	},
	{
		char: "ま",
		romaji: "ma",
		row: "ma",
		col: "a",
		strokes: 3,
		examples: [[
			"まど",
			"mado",
			"cửa sổ"
		]]
	},
	{
		char: "み",
		romaji: "mi",
		row: "ma",
		col: "i",
		strokes: 2,
		examples: [[
			"みず",
			"mizu",
			"nước"
		]]
	},
	{
		char: "む",
		romaji: "mu",
		row: "ma",
		col: "u",
		strokes: 3,
		examples: [[
			"むし",
			"mushi",
			"côn trùng"
		]]
	},
	{
		char: "め",
		romaji: "me",
		row: "ma",
		col: "e",
		strokes: 2,
		examples: [[
			"め",
			"me",
			"mắt"
		]]
	},
	{
		char: "も",
		romaji: "mo",
		row: "ma",
		col: "o",
		strokes: 3,
		examples: [[
			"もも",
			"momo",
			"quả đào"
		]]
	},
	{
		char: "や",
		romaji: "ya",
		row: "ya",
		col: "a",
		strokes: 3,
		examples: [[
			"やま",
			"yama",
			"núi"
		]]
	},
	{
		char: "ゆ",
		romaji: "yu",
		row: "ya",
		col: "u",
		strokes: 2,
		examples: [[
			"ゆき",
			"yuki",
			"tuyết"
		]]
	},
	{
		char: "よ",
		romaji: "yo",
		row: "ya",
		col: "o",
		strokes: 2,
		examples: [[
			"よる",
			"yoru",
			"ban đêm"
		]]
	},
	{
		char: "ら",
		romaji: "ra",
		row: "ra",
		col: "a",
		strokes: 2,
		examples: [[
			"らいねん",
			"rainen",
			"năm sau"
		]]
	},
	{
		char: "り",
		romaji: "ri",
		row: "ra",
		col: "i",
		strokes: 2,
		examples: [[
			"りんご",
			"ringo",
			"táo"
		]]
	},
	{
		char: "る",
		romaji: "ru",
		row: "ra",
		col: "u",
		strokes: 1,
		examples: [[
			"はる",
			"haru",
			"mùa xuân"
		]]
	},
	{
		char: "れ",
		romaji: "re",
		row: "ra",
		col: "e",
		strokes: 2,
		examples: [[
			"れきし",
			"rekishi",
			"lịch sử"
		]]
	},
	{
		char: "ろ",
		romaji: "ro",
		row: "ra",
		col: "o",
		strokes: 1,
		examples: [[
			"ろく",
			"roku",
			"sáu"
		]]
	},
	{
		char: "わ",
		romaji: "wa",
		row: "wa",
		col: "a",
		strokes: 2,
		examples: [[
			"わたし",
			"watashi",
			"tôi"
		]]
	},
	{
		char: "を",
		romaji: "wo",
		row: "wa",
		col: "o",
		strokes: 3,
		notes: "Trợ từ tân ngữ, đọc o.",
		examples: [[
			"を",
			"o",
			"trợ từ tân ngữ"
		]]
	},
	{
		char: "ん",
		romaji: "n",
		row: "n",
		col: "n",
		strokes: 1,
		notes: "Phụ âm duy nhất đứng một mình.",
		examples: [[
			"にほん",
			"nihon",
			"Nhật Bản"
		]]
	},
	{
		char: "が",
		romaji: "ga",
		row: "ga",
		col: "a",
		strokes: 3,
		group: "dakuten",
		dakutenOf: "か",
		examples: [[
			"がっこう",
			"gakkou",
			"trường học"
		]]
	},
	{
		char: "ぎ",
		romaji: "gi",
		row: "ga",
		col: "i",
		strokes: 4,
		group: "dakuten",
		dakutenOf: "き",
		examples: [[
			"ぎんこう",
			"ginkou",
			"ngân hàng"
		]]
	},
	{
		char: "ぐ",
		romaji: "gu",
		row: "ga",
		col: "u",
		strokes: 1,
		group: "dakuten",
		dakutenOf: "く",
		examples: [[
			"ぐん",
			"gun",
			"quân đội"
		]]
	},
	{
		char: "げ",
		romaji: "ge",
		row: "ga",
		col: "e",
		strokes: 3,
		group: "dakuten",
		dakutenOf: "け",
		examples: [[
			"げんき",
			"genki",
			"khỏe"
		]]
	},
	{
		char: "ご",
		romaji: "go",
		row: "ga",
		col: "o",
		strokes: 2,
		group: "dakuten",
		dakutenOf: "こ",
		examples: [[
			"ごはん",
			"gohan",
			"cơm"
		]]
	},
	{
		char: "ざ",
		romaji: "za",
		row: "za",
		col: "a",
		strokes: 3,
		group: "dakuten",
		dakutenOf: "さ",
		examples: [[
			"ざっし",
			"zasshi",
			"tạp chí"
		]]
	},
	{
		char: "じ",
		romaji: "ji",
		row: "za",
		col: "i",
		strokes: 1,
		group: "dakuten",
		dakutenOf: "し",
		notes: "じ và ぢ đều đọc ji; じ phổ biến hơn.",
		examples: [[
			"じかん",
			"jikan",
			"thời gian"
		]]
	},
	{
		char: "ず",
		romaji: "zu",
		row: "za",
		col: "u",
		strokes: 2,
		group: "dakuten",
		dakutenOf: "す",
		examples: [[
			"みず",
			"mizu",
			"nước"
		]]
	},
	{
		char: "ぜ",
		romaji: "ze",
		row: "za",
		col: "e",
		strokes: 3,
		group: "dakuten",
		dakutenOf: "せ",
		examples: [[
			"かぜ",
			"kaze",
			"gió / cảm"
		]]
	},
	{
		char: "ぞ",
		romaji: "zo",
		row: "za",
		col: "o",
		strokes: 1,
		group: "dakuten",
		dakutenOf: "そ",
		examples: [[
			"ぞう",
			"zou",
			"con voi"
		]]
	},
	{
		char: "だ",
		romaji: "da",
		row: "da",
		col: "a",
		strokes: 4,
		group: "dakuten",
		dakutenOf: "た",
		examples: [[
			"だれ",
			"dare",
			"ai"
		]]
	},
	{
		char: "ぢ",
		romaji: "ji",
		row: "da",
		col: "i",
		strokes: 3,
		group: "dakuten",
		dakutenOf: "ち",
		notes: "Hiếm; thường dùng じ.",
		examples: [[
			"はなぢ",
			"hanaji",
			"chảy máu mũi"
		]]
	},
	{
		char: "づ",
		romaji: "zu",
		row: "da",
		col: "u",
		strokes: 1,
		group: "dakuten",
		dakutenOf: "つ",
		notes: "Hiếm; thường dùng ず.",
		examples: [[
			"つづく",
			"tsuzuku",
			"tiếp tục"
		]]
	},
	{
		char: "で",
		romaji: "de",
		row: "da",
		col: "e",
		strokes: 1,
		group: "dakuten",
		dakutenOf: "て",
		examples: [[
			"でんしゃ",
			"densha",
			"tàu điện"
		]]
	},
	{
		char: "ど",
		romaji: "do",
		row: "da",
		col: "o",
		strokes: 2,
		group: "dakuten",
		dakutenOf: "と",
		examples: [[
			"どこ",
			"doko",
			"ở đâu"
		]]
	},
	{
		char: "ば",
		romaji: "ba",
		row: "ba",
		col: "a",
		strokes: 3,
		group: "dakuten",
		dakutenOf: "は",
		examples: [[
			"ばしょ",
			"basho",
			"địa điểm"
		]]
	},
	{
		char: "び",
		romaji: "bi",
		row: "ba",
		col: "i",
		strokes: 1,
		group: "dakuten",
		dakutenOf: "ひ",
		examples: [[
			"えび",
			"ebi",
			"tôm"
		]]
	},
	{
		char: "ぶ",
		romaji: "bu",
		row: "ba",
		col: "u",
		strokes: 4,
		group: "dakuten",
		dakutenOf: "ふ",
		examples: [[
			"ぶた",
			"buta",
			"con lợn"
		]]
	},
	{
		char: "べ",
		romaji: "be",
		row: "ba",
		col: "e",
		strokes: 1,
		group: "dakuten",
		dakutenOf: "へ",
		examples: [[
			"べんきょう",
			"benkyou",
			"học"
		]]
	},
	{
		char: "ぼ",
		romaji: "bo",
		row: "ba",
		col: "o",
		strokes: 4,
		group: "dakuten",
		dakutenOf: "ほ",
		examples: [[
			"ぼうし",
			"boushi",
			"mũ"
		]]
	},
	{
		char: "ぱ",
		romaji: "pa",
		row: "pa",
		col: "a",
		strokes: 3,
		group: "handakuten",
		dakutenOf: "は",
		examples: [[
			"パン",
			"pan",
			"bánh mì"
		]]
	},
	{
		char: "ぴ",
		romaji: "pi",
		row: "pa",
		col: "i",
		strokes: 1,
		group: "handakuten",
		dakutenOf: "ひ",
		examples: [[
			"えんぴつ",
			"enpitsu",
			"bút chì"
		]]
	},
	{
		char: "ぷ",
		romaji: "pu",
		row: "pa",
		col: "u",
		strokes: 4,
		group: "handakuten",
		dakutenOf: "ふ",
		examples: [[
			"きっぷ",
			"kippu",
			"vé"
		]]
	},
	{
		char: "ぺ",
		romaji: "pe",
		row: "pa",
		col: "e",
		strokes: 1,
		group: "handakuten",
		dakutenOf: "へ",
		examples: [[
			"ぺん",
			"pen",
			"bút"
		]]
	},
	{
		char: "ぽ",
		romaji: "po",
		row: "pa",
		col: "o",
		strokes: 4,
		group: "handakuten",
		dakutenOf: "ほ",
		examples: [[
			"さんぽ",
			"sanpo",
			"đi dạo"
		]]
	},
	{
		char: "きゃ",
		romaji: "kya",
		row: "ka",
		col: "ya",
		strokes: 7,
		group: "yoon",
		examples: [[
			"きゃく",
			"kyaku",
			"khách"
		]]
	},
	{
		char: "きゅ",
		romaji: "kyu",
		row: "ka",
		col: "yu",
		strokes: 6,
		group: "yoon",
		examples: [[
			"きゅう",
			"kyuu",
			"chín"
		]]
	},
	{
		char: "きょ",
		romaji: "kyo",
		row: "ka",
		col: "yo",
		strokes: 6,
		group: "yoon",
		examples: [[
			"きょう",
			"kyou",
			"hôm nay"
		]]
	},
	{
		char: "しゃ",
		romaji: "sha",
		row: "sa",
		col: "ya",
		strokes: 4,
		group: "yoon",
		examples: [[
			"しゃしん",
			"shashin",
			"ảnh"
		]]
	},
	{
		char: "しゅ",
		romaji: "shu",
		row: "sa",
		col: "yu",
		strokes: 3,
		group: "yoon",
		examples: [[
			"しゅくだい",
			"shukudai",
			"bài tập"
		]]
	},
	{
		char: "しょ",
		romaji: "sho",
		row: "sa",
		col: "yo",
		strokes: 3,
		group: "yoon",
		examples: [[
			"しょうゆ",
			"shouyu",
			"xì dầu"
		]]
	},
	{
		char: "ちゃ",
		romaji: "cha",
		row: "ta",
		col: "ya",
		strokes: 6,
		group: "yoon",
		examples: [[
			"お茶",
			"ocha",
			"trà"
		]]
	},
	{
		char: "ちゅ",
		romaji: "chu",
		row: "ta",
		col: "yu",
		strokes: 5,
		group: "yoon",
		examples: [[
			"ちゅうい",
			"chuui",
			"chú ý"
		]]
	},
	{
		char: "ちょ",
		romaji: "cho",
		row: "ta",
		col: "yo",
		strokes: 5,
		group: "yoon",
		examples: [[
			"ちょっと",
			"chotto",
			"một chút"
		]]
	},
	{
		char: "にゃ",
		romaji: "nya",
		row: "na",
		col: "ya",
		strokes: 7,
		group: "yoon",
		examples: [[
			"にゃん",
			"nyan",
			"meo"
		]]
	},
	{
		char: "にゅ",
		romaji: "nyu",
		row: "na",
		col: "yu",
		strokes: 6,
		group: "yoon",
		examples: [[
			"にゅうがく",
			"nyuugaku",
			"nhập học"
		]]
	},
	{
		char: "にょ",
		romaji: "nyo",
		row: "na",
		col: "yo",
		strokes: 6,
		group: "yoon",
		examples: [[
			"にょう",
			"nyou",
			"nước tiểu"
		]]
	},
	{
		char: "ひゃ",
		romaji: "hya",
		row: "ha",
		col: "ya",
		strokes: 4,
		group: "yoon",
		examples: [[
			"ひゃく",
			"hyaku",
			"một trăm"
		]]
	},
	{
		char: "ひゅ",
		romaji: "hyu",
		row: "ha",
		col: "yu",
		strokes: 3,
		group: "yoon",
		examples: [[
			"ひゅうが",
			"hyuuga",
			"Hyuga"
		]]
	},
	{
		char: "ひょ",
		romaji: "hyo",
		row: "ha",
		col: "yo",
		strokes: 3,
		group: "yoon",
		examples: [[
			"びょういん",
			"byouin",
			"bệnh viện"
		]]
	},
	{
		char: "みゃ",
		romaji: "mya",
		row: "ma",
		col: "ya",
		strokes: 5,
		group: "yoon",
		examples: [[
			"みゃく",
			"myaku",
			"mạch"
		]]
	},
	{
		char: "みゅ",
		romaji: "myu",
		row: "ma",
		col: "yu",
		strokes: 4,
		group: "yoon",
		examples: [[
			"みゅうじっく",
			"myuujikku",
			"âm nhạc"
		]]
	},
	{
		char: "みょ",
		romaji: "myo",
		row: "ma",
		col: "yo",
		strokes: 4,
		group: "yoon",
		examples: [[
			"みょうじ",
			"myouji",
			"họ"
		]]
	},
	{
		char: "りゃ",
		romaji: "rya",
		row: "ra",
		col: "ya",
		strokes: 5,
		group: "yoon",
		examples: [[
			"りゃく",
			"ryaku",
			"viết tắt"
		]]
	},
	{
		char: "りゅ",
		romaji: "ryu",
		row: "ra",
		col: "yu",
		strokes: 4,
		group: "yoon",
		examples: [[
			"りゅうがく",
			"ryuugaku",
			"du học"
		]]
	},
	{
		char: "りょ",
		romaji: "ryo",
		row: "ra",
		col: "yo",
		strokes: 4,
		group: "yoon",
		examples: [[
			"りょこう",
			"ryokou",
			"du lịch"
		]]
	},
	{
		char: "ぎゃ",
		romaji: "gya",
		row: "ga",
		col: "ya",
		strokes: 7,
		group: "yoon",
		examples: [[
			"ぎゃく",
			"gyaku",
			"ngược"
		]]
	},
	{
		char: "ぎゅ",
		romaji: "gyu",
		row: "ga",
		col: "yu",
		strokes: 6,
		group: "yoon",
		examples: [[
			"ぎゅうにゅう",
			"gyuunyuu",
			"sữa bò"
		]]
	},
	{
		char: "ぎょ",
		romaji: "gyo",
		row: "ga",
		col: "yo",
		strokes: 6,
		group: "yoon",
		examples: [[
			"きんぎょ",
			"kingyo",
			"cá vàng"
		]]
	},
	{
		char: "じゃ",
		romaji: "ja",
		row: "za",
		col: "ya",
		strokes: 4,
		group: "yoon",
		examples: [[
			"じゃありません",
			"jaarimasen",
			"không phải"
		]]
	},
	{
		char: "じゅ",
		romaji: "ju",
		row: "za",
		col: "yu",
		strokes: 3,
		group: "yoon",
		examples: [[
			"じゅう",
			"juu",
			"mười"
		]]
	},
	{
		char: "じょ",
		romaji: "jo",
		row: "za",
		col: "yo",
		strokes: 3,
		group: "yoon",
		examples: [[
			"じょせい",
			"josei",
			"phụ nữ"
		]]
	},
	{
		char: "びゃ",
		romaji: "bya",
		row: "ba",
		col: "ya",
		strokes: 4,
		group: "yoon",
		examples: [[
			"さんびゃく",
			"sanbyaku",
			"ba trăm"
		]]
	},
	{
		char: "びゅ",
		romaji: "byu",
		row: "ba",
		col: "yu",
		strokes: 3,
		group: "yoon",
		examples: [[
			"びゅう",
			"byuu",
			"view"
		]]
	},
	{
		char: "びょ",
		romaji: "byo",
		row: "ba",
		col: "yo",
		strokes: 3,
		group: "yoon",
		examples: [[
			"びょうき",
			"byouki",
			"ốm"
		]]
	},
	{
		char: "ぴゃ",
		romaji: "pya",
		row: "pa",
		col: "ya",
		strokes: 4,
		group: "yoon",
		examples: [[
			"ろっぴゃく",
			"roppyaku",
			"sáu trăm"
		]]
	},
	{
		char: "ぴゅ",
		romaji: "pyu",
		row: "pa",
		col: "yu",
		strokes: 3,
		group: "yoon",
		examples: [[
			"コンピュータ",
			"konpyuuta",
			"máy tính"
		]]
	},
	{
		char: "ぴょ",
		romaji: "pyo",
		row: "pa",
		col: "yo",
		strokes: 3,
		group: "yoon",
		examples: [[
			"はっぴょう",
			"happyou",
			"thuyết trình"
		]]
	},
	{
		char: "っ",
		romaji: "(sokuon)",
		row: "sokuon",
		col: "tsu",
		strokes: 1,
		group: "sokuon",
		notes: "Nhân đôi phụ âm sau: きって = kitte.",
		examples: [[
			"がっこう",
			"gakkou",
			"trường học"
		]]
	}
];
var KATA_SEEDS = [
	{
		char: "ア",
		romaji: "a",
		row: "a",
		col: "a",
		strokes: 2,
		examples: [[
			"アメリカ",
			"amerika",
			"Mỹ"
		]]
	},
	{
		char: "イ",
		romaji: "i",
		row: "a",
		col: "i",
		strokes: 2,
		examples: [[
			"イタリア",
			"itaria",
			"Ý"
		]]
	},
	{
		char: "ウ",
		romaji: "u",
		row: "a",
		col: "u",
		strokes: 3,
		examples: [[
			"ウール",
			"uuru",
			"len"
		]]
	},
	{
		char: "エ",
		romaji: "e",
		row: "a",
		col: "e",
		strokes: 3,
		examples: [[
			"エレベーター",
			"erebeetaa",
			"thang máy"
		]]
	},
	{
		char: "オ",
		romaji: "o",
		row: "a",
		col: "o",
		strokes: 3,
		examples: [[
			"オレンジ",
			"orenji",
			"cam"
		]]
	},
	{
		char: "カ",
		romaji: "ka",
		row: "ka",
		col: "a",
		strokes: 2,
		examples: [[
			"カメラ",
			"kamera",
			"máy ảnh"
		]]
	},
	{
		char: "キ",
		romaji: "ki",
		row: "ka",
		col: "i",
		strokes: 3,
		examples: [[
			"キロ",
			"kiro",
			"kilo"
		]]
	},
	{
		char: "ク",
		romaji: "ku",
		row: "ka",
		col: "u",
		strokes: 2,
		examples: [[
			"クラス",
			"kurasu",
			"lớp"
		]]
	},
	{
		char: "ケ",
		romaji: "ke",
		row: "ka",
		col: "e",
		strokes: 3,
		examples: [[
			"ケーキ",
			"keeki",
			"bánh kem"
		]]
	},
	{
		char: "コ",
		romaji: "ko",
		row: "ka",
		col: "o",
		strokes: 2,
		examples: [[
			"コーヒー",
			"koohii",
			"cà phê"
		]]
	},
	{
		char: "サ",
		romaji: "sa",
		row: "sa",
		col: "a",
		strokes: 3,
		examples: [[
			"サービス",
			"saabisu",
			"dịch vụ"
		]]
	},
	{
		char: "シ",
		romaji: "shi",
		row: "sa",
		col: "i",
		strokes: 3,
		examples: [[
			"シャツ",
			"shatsu",
			"áo sơ mi"
		]]
	},
	{
		char: "ス",
		romaji: "su",
		row: "sa",
		col: "u",
		strokes: 2,
		examples: [[
			"スーパー",
			"suupaa",
			"siêu thị"
		]]
	},
	{
		char: "セ",
		romaji: "se",
		row: "sa",
		col: "e",
		strokes: 2,
		examples: [[
			"セーター",
			"seetaa",
			"áo len"
		]]
	},
	{
		char: "ソ",
		romaji: "so",
		row: "sa",
		col: "o",
		strokes: 2,
		examples: [[
			"ソファ",
			"sofa",
			"ghế sofa"
		]]
	},
	{
		char: "タ",
		romaji: "ta",
		row: "ta",
		col: "a",
		strokes: 3,
		examples: [[
			"タクシー",
			"takushii",
			"taxi"
		]]
	},
	{
		char: "チ",
		romaji: "chi",
		row: "ta",
		col: "i",
		strokes: 3,
		examples: [[
			"チーズ",
			"chiizu",
			"phô mai"
		]]
	},
	{
		char: "ツ",
		romaji: "tsu",
		row: "ta",
		col: "u",
		strokes: 3,
		examples: [[
			"ツアー",
			"tsuaa",
			"tour"
		]]
	},
	{
		char: "テ",
		romaji: "te",
		row: "ta",
		col: "e",
		strokes: 3,
		examples: [[
			"テレビ",
			"terebi",
			"tivi"
		]]
	},
	{
		char: "ト",
		romaji: "to",
		row: "ta",
		col: "o",
		strokes: 2,
		examples: [[
			"トイレ",
			"toire",
			"nhà vệ sinh"
		]]
	},
	{
		char: "ナ",
		romaji: "na",
		row: "na",
		col: "a",
		strokes: 2,
		examples: [[
			"ナイフ",
			"naifu",
			"dao"
		]]
	},
	{
		char: "ニ",
		romaji: "ni",
		row: "na",
		col: "i",
		strokes: 2,
		examples: [[
			"ニュース",
			"nyuusu",
			"tin tức"
		]]
	},
	{
		char: "ヌ",
		romaji: "nu",
		row: "na",
		col: "u",
		strokes: 2,
		examples: [[
			"ヌードル",
			"nuudoru",
			"mì"
		]]
	},
	{
		char: "ネ",
		romaji: "ne",
		row: "na",
		col: "e",
		strokes: 4,
		examples: [[
			"ネクタイ",
			"nekutai",
			"cà vạt"
		]]
	},
	{
		char: "ノ",
		romaji: "no",
		row: "na",
		col: "o",
		strokes: 1,
		examples: [[
			"ノート",
			"nooto",
			"vở"
		]]
	},
	{
		char: "ハ",
		romaji: "ha",
		row: "ha",
		col: "a",
		strokes: 2,
		examples: [[
			"ハンバーガー",
			"hanbaagaa",
			"hamburger"
		]]
	},
	{
		char: "ヒ",
		romaji: "hi",
		row: "ha",
		col: "i",
		strokes: 2,
		examples: [[
			"ホテル",
			"hoteru",
			"khách sạn"
		]]
	},
	{
		char: "フ",
		romaji: "fu",
		row: "ha",
		col: "u",
		strokes: 1,
		examples: [[
			"フォーク",
			"fooku",
			"nĩa"
		]]
	},
	{
		char: "ヘ",
		romaji: "he",
		row: "ha",
		col: "e",
		strokes: 1,
		examples: [[
			"ヘリコプター",
			"herikoputaa",
			"trực thăng"
		]]
	},
	{
		char: "ホ",
		romaji: "ho",
		row: "ha",
		col: "o",
		strokes: 4,
		examples: [[
			"ホテル",
			"hoteru",
			"khách sạn"
		]]
	},
	{
		char: "マ",
		romaji: "ma",
		row: "ma",
		col: "a",
		strokes: 2,
		examples: [[
			"マンガ",
			"manga",
			"truyện tranh"
		]]
	},
	{
		char: "ミ",
		romaji: "mi",
		row: "ma",
		col: "i",
		strokes: 3,
		examples: [[
			"ミルク",
			"miruku",
			"sữa"
		]]
	},
	{
		char: "ム",
		romaji: "mu",
		row: "ma",
		col: "u",
		strokes: 2,
		examples: [[
			"チーム",
			"chiimu",
			"đội"
		]]
	},
	{
		char: "メ",
		romaji: "me",
		row: "ma",
		col: "e",
		strokes: 2,
		examples: [[
			"メール",
			"meeru",
			"email"
		]]
	},
	{
		char: "モ",
		romaji: "mo",
		row: "ma",
		col: "o",
		strokes: 3,
		examples: [[
			"レモン",
			"remon",
			"chanh"
		]]
	},
	{
		char: "ヤ",
		romaji: "ya",
		row: "ya",
		col: "a",
		strokes: 2,
		examples: [[
			"タイヤ",
			"taiya",
			"lốp xe"
		]]
	},
	{
		char: "ユ",
		romaji: "yu",
		row: "ya",
		col: "u",
		strokes: 2,
		examples: [[
			"ユニフォーム",
			"yunifoomu",
			"đồng phục"
		]]
	},
	{
		char: "ヨ",
		romaji: "yo",
		row: "ya",
		col: "o",
		strokes: 3,
		examples: [[
			"ヨガ",
			"yoga",
			"yoga"
		]]
	},
	{
		char: "ラ",
		romaji: "ra",
		row: "ra",
		col: "a",
		strokes: 2,
		examples: [[
			"ラジオ",
			"rajio",
			"radio"
		]]
	},
	{
		char: "リ",
		romaji: "ri",
		row: "ra",
		col: "i",
		strokes: 2,
		examples: [[
			"リンゴ",
			"ringo",
			"táo"
		]]
	},
	{
		char: "ル",
		romaji: "ru",
		row: "ra",
		col: "u",
		strokes: 2,
		examples: [[
			"ルール",
			"ruuru",
			"luật"
		]]
	},
	{
		char: "レ",
		romaji: "re",
		row: "ra",
		col: "e",
		strokes: 1,
		examples: [[
			"レストラン",
			"resutoran",
			"nhà hàng"
		]]
	},
	{
		char: "ロ",
		romaji: "ro",
		row: "ra",
		col: "o",
		strokes: 3,
		examples: [[
			"ロボット",
			"robotto",
			"robot"
		]]
	},
	{
		char: "ワ",
		romaji: "wa",
		row: "wa",
		col: "a",
		strokes: 2,
		examples: [[
			"ワイン",
			"wain",
			"rượu vang"
		]]
	},
	{
		char: "ヲ",
		romaji: "wo",
		row: "wa",
		col: "o",
		strokes: 3,
		notes: "Hiếm trong katakana hiện đại.",
		examples: [[
			"ヲ",
			"o",
			"trợ từ (cổ)"
		]]
	},
	{
		char: "ン",
		romaji: "n",
		row: "n",
		col: "n",
		strokes: 2,
		examples: [[
			"パン",
			"pan",
			"bánh mì"
		]]
	},
	{
		char: "ガ",
		romaji: "ga",
		row: "ga",
		col: "a",
		strokes: 2,
		group: "dakuten",
		dakutenOf: "カ",
		examples: [[
			"ガス",
			"gasu",
			"gas"
		]]
	},
	{
		char: "ギ",
		romaji: "gi",
		row: "ga",
		col: "i",
		strokes: 3,
		group: "dakuten",
		dakutenOf: "キ",
		examples: [[
			"ギター",
			"gitaa",
			"guitar"
		]]
	},
	{
		char: "グ",
		romaji: "gu",
		row: "ga",
		col: "u",
		strokes: 2,
		group: "dakuten",
		dakutenOf: "ク",
		examples: [[
			"グループ",
			"guruupu",
			"nhóm"
		]]
	},
	{
		char: "ゲ",
		romaji: "ge",
		row: "ga",
		col: "e",
		strokes: 3,
		group: "dakuten",
		dakutenOf: "ケ",
		examples: [[
			"ゲーム",
			"geemu",
			"trò chơi"
		]]
	},
	{
		char: "ゴ",
		romaji: "go",
		row: "ga",
		col: "o",
		strokes: 2,
		group: "dakuten",
		dakutenOf: "コ",
		examples: [[
			"ゴルフ",
			"gorufu",
			"golf"
		]]
	},
	{
		char: "ザ",
		romaji: "za",
		row: "za",
		col: "a",
		strokes: 3,
		group: "dakuten",
		dakutenOf: "サ",
		examples: [[
			"ピザ",
			"piza",
			"pizza"
		]]
	},
	{
		char: "ジ",
		romaji: "ji",
		row: "za",
		col: "i",
		strokes: 3,
		group: "dakuten",
		dakutenOf: "シ",
		examples: [[
			"ジーンズ",
			"jiinzu",
			"quần jean"
		]]
	},
	{
		char: "ズ",
		romaji: "zu",
		row: "za",
		col: "u",
		strokes: 2,
		group: "dakuten",
		dakutenOf: "ス",
		examples: [[
			"チーズ",
			"chiizu",
			"phô mai"
		]]
	},
	{
		char: "ゼ",
		romaji: "ze",
		row: "za",
		col: "e",
		strokes: 2,
		group: "dakuten",
		dakutenOf: "セ",
		examples: [[
			"ゼロ",
			"zero",
			"không"
		]]
	},
	{
		char: "ゾ",
		romaji: "zo",
		row: "za",
		col: "o",
		strokes: 2,
		group: "dakuten",
		dakutenOf: "ソ",
		examples: [[
			"ゾーン",
			"zoon",
			"khu vực"
		]]
	},
	{
		char: "ダ",
		romaji: "da",
		row: "da",
		col: "a",
		strokes: 3,
		group: "dakuten",
		dakutenOf: "タ",
		examples: [[
			"ダンス",
			"dansu",
			"nhảy"
		]]
	},
	{
		char: "ヂ",
		romaji: "ji",
		row: "da",
		col: "i",
		strokes: 3,
		group: "dakuten",
		dakutenOf: "チ",
		notes: "Hiếm.",
		examples: [[
			"ヂ",
			"ji",
			"biến thể ji"
		]]
	},
	{
		char: "ヅ",
		romaji: "zu",
		row: "da",
		col: "u",
		strokes: 3,
		group: "dakuten",
		dakutenOf: "ツ",
		notes: "Hiếm.",
		examples: [[
			"ヅ",
			"zu",
			"biến thể zu"
		]]
	},
	{
		char: "デ",
		romaji: "de",
		row: "da",
		col: "e",
		strokes: 3,
		group: "dakuten",
		dakutenOf: "テ",
		examples: [[
			"デパート",
			"depaato",
			"cửa hàng bách hóa"
		]]
	},
	{
		char: "ド",
		romaji: "do",
		row: "da",
		col: "o",
		strokes: 2,
		group: "dakuten",
		dakutenOf: "ト",
		examples: [[
			"ドア",
			"doa",
			"cửa"
		]]
	},
	{
		char: "バ",
		romaji: "ba",
		row: "ba",
		col: "a",
		strokes: 2,
		group: "dakuten",
		dakutenOf: "ハ",
		examples: [[
			"バス",
			"basu",
			"xe buýt"
		]]
	},
	{
		char: "ビ",
		romaji: "bi",
		row: "ba",
		col: "i",
		strokes: 2,
		group: "dakuten",
		dakutenOf: "ヒ",
		examples: [[
			"ビール",
			"biiru",
			"bia"
		]]
	},
	{
		char: "ブ",
		romaji: "bu",
		row: "ba",
		col: "u",
		strokes: 1,
		group: "dakuten",
		dakutenOf: "フ",
		examples: [[
			"クラブ",
			"kurabu",
			"câu lạc bộ"
		]]
	},
	{
		char: "ベ",
		romaji: "be",
		row: "ba",
		col: "e",
		strokes: 1,
		group: "dakuten",
		dakutenOf: "ヘ",
		examples: [[
			"ベッド",
			"beddo",
			"giường"
		]]
	},
	{
		char: "ボ",
		romaji: "bo",
		row: "ba",
		col: "o",
		strokes: 4,
		group: "dakuten",
		dakutenOf: "ホ",
		examples: [[
			"ボール",
			"booru",
			"quả bóng"
		]]
	},
	{
		char: "パ",
		romaji: "pa",
		row: "pa",
		col: "a",
		strokes: 2,
		group: "handakuten",
		dakutenOf: "ハ",
		examples: [[
			"パン",
			"pan",
			"bánh mì"
		]]
	},
	{
		char: "ピ",
		romaji: "pi",
		row: "pa",
		col: "i",
		strokes: 2,
		group: "handakuten",
		dakutenOf: "ヒ",
		examples: [[
			"ピアノ",
			"piano",
			"piano"
		]]
	},
	{
		char: "プ",
		romaji: "pu",
		row: "pa",
		col: "u",
		strokes: 1,
		group: "handakuten",
		dakutenOf: "フ",
		examples: [[
			"パソコン",
			"pasokon",
			"máy tính"
		]]
	},
	{
		char: "ペ",
		romaji: "pe",
		row: "pa",
		col: "e",
		strokes: 1,
		group: "handakuten",
		dakutenOf: "ヘ",
		examples: [[
			"ペン",
			"pen",
			"bút"
		]]
	},
	{
		char: "ポ",
		romaji: "po",
		row: "pa",
		col: "o",
		strokes: 4,
		group: "handakuten",
		dakutenOf: "ホ",
		examples: [[
			"スポーツ",
			"supootsu",
			"thể thao"
		]]
	},
	{
		char: "キャ",
		romaji: "kya",
		row: "ka",
		col: "ya",
		strokes: 5,
		group: "yoon",
		examples: [[
			"キャンプ",
			"kyanpu",
			"cắm trại"
		]]
	},
	{
		char: "キュ",
		romaji: "kyu",
		row: "ka",
		col: "yu",
		strokes: 5,
		group: "yoon",
		examples: [[
			"キューブ",
			"kyuubu",
			"khối"
		]]
	},
	{
		char: "キョ",
		romaji: "kyo",
		row: "ka",
		col: "yo",
		strokes: 6,
		group: "yoon",
		examples: [[
			"キョウ",
			"kyou",
			"hôm nay (kata)"
		]]
	},
	{
		char: "シャ",
		romaji: "sha",
		row: "sa",
		col: "ya",
		strokes: 5,
		group: "yoon",
		examples: [[
			"シャツ",
			"shatsu",
			"áo sơ mi"
		]]
	},
	{
		char: "シュ",
		romaji: "shu",
		row: "sa",
		col: "yu",
		strokes: 5,
		group: "yoon",
		examples: [[
			"シューズ",
			"shuuzu",
			"giày"
		]]
	},
	{
		char: "ショ",
		romaji: "sho",
		row: "sa",
		col: "yo",
		strokes: 6,
		group: "yoon",
		examples: [[
			"ショッピング",
			"shoppingu",
			"mua sắm"
		]]
	},
	{
		char: "チャ",
		romaji: "cha",
		row: "ta",
		col: "ya",
		strokes: 5,
		group: "yoon",
		examples: [[
			"チャンス",
			"chansu",
			"cơ hội"
		]]
	},
	{
		char: "チュ",
		romaji: "chu",
		row: "ta",
		col: "yu",
		strokes: 5,
		group: "yoon",
		examples: [[
			"チューリップ",
			"chuurippu",
			"tulip"
		]]
	},
	{
		char: "チョ",
		romaji: "cho",
		row: "ta",
		col: "yo",
		strokes: 6,
		group: "yoon",
		examples: [[
			"チョコ",
			"choko",
			"sô cô la"
		]]
	},
	{
		char: "ニャ",
		romaji: "nya",
		row: "na",
		col: "ya",
		strokes: 4,
		group: "yoon",
		examples: [[
			"ニャー",
			"nyaa",
			"meo"
		]]
	},
	{
		char: "ニュ",
		romaji: "nyu",
		row: "na",
		col: "yu",
		strokes: 4,
		group: "yoon",
		examples: [[
			"ニュース",
			"nyuusu",
			"tin tức"
		]]
	},
	{
		char: "ニョ",
		romaji: "nyo",
		row: "na",
		col: "yo",
		strokes: 5,
		group: "yoon",
		examples: [[
			"ニョキニョキ",
			"nyokinyoki",
			"lúc nhúc"
		]]
	},
	{
		char: "ヒャ",
		romaji: "hya",
		row: "ha",
		col: "ya",
		strokes: 4,
		group: "yoon",
		examples: [[
			"ヒャク",
			"hyaku",
			"trăm"
		]]
	},
	{
		char: "ヒュ",
		romaji: "hyu",
		row: "ha",
		col: "yu",
		strokes: 4,
		group: "yoon",
		examples: [[
			"ヒュー",
			"hyuu",
			"huu"
		]]
	},
	{
		char: "ヒョ",
		romaji: "hyo",
		row: "ha",
		col: "yo",
		strokes: 5,
		group: "yoon",
		examples: [[
			"ヒョウ",
			"hyou",
			"bảng"
		]]
	},
	{
		char: "ミャ",
		romaji: "mya",
		row: "ma",
		col: "ya",
		strokes: 5,
		group: "yoon",
		examples: [[
			"ミャンマー",
			"myanmaa",
			"Myanmar"
		]]
	},
	{
		char: "ミュ",
		romaji: "myu",
		row: "ma",
		col: "yu",
		strokes: 5,
		group: "yoon",
		examples: [[
			"ミュージック",
			"myuujikku",
			"âm nhạc"
		]]
	},
	{
		char: "ミョ",
		romaji: "myo",
		row: "ma",
		col: "yo",
		strokes: 6,
		group: "yoon",
		examples: [[
			"ミョウ",
			"myou",
			"lạ"
		]]
	},
	{
		char: "リャ",
		romaji: "rya",
		row: "ra",
		col: "ya",
		strokes: 4,
		group: "yoon",
		examples: [[
			"リャク",
			"ryaku",
			"viết tắt"
		]]
	},
	{
		char: "リュ",
		romaji: "ryu",
		row: "ra",
		col: "yu",
		strokes: 4,
		group: "yoon",
		examples: [[
			"リュック",
			"ryukku",
			"balo"
		]]
	},
	{
		char: "リョ",
		romaji: "ryo",
		row: "ra",
		col: "yo",
		strokes: 5,
		group: "yoon",
		examples: [[
			"リョウ",
			"ryou",
			"số lượng"
		]]
	},
	{
		char: "ギャ",
		romaji: "gya",
		row: "ga",
		col: "ya",
		strokes: 5,
		group: "yoon",
		examples: [[
			"ギャラリー",
			"gyararii",
			"phòng trưng bày"
		]]
	},
	{
		char: "ギュ",
		romaji: "gyu",
		row: "ga",
		col: "yu",
		strokes: 5,
		group: "yoon",
		examples: [[
			"ギュッ",
			"gyu",
			"siết"
		]]
	},
	{
		char: "ギョ",
		romaji: "gyo",
		row: "ga",
		col: "yo",
		strokes: 6,
		group: "yoon",
		examples: [[
			"ギョーザ",
			"gyooza",
			"há cảo"
		]]
	},
	{
		char: "ジャ",
		romaji: "ja",
		row: "za",
		col: "ya",
		strokes: 5,
		group: "yoon",
		examples: [[
			"ジャズ",
			"jazu",
			"jazz"
		]]
	},
	{
		char: "ジュ",
		romaji: "ju",
		row: "za",
		col: "yu",
		strokes: 5,
		group: "yoon",
		examples: [[
			"ジュース",
			"juusu",
			"nước ép"
		]]
	},
	{
		char: "ジョ",
		romaji: "jo",
		row: "za",
		col: "yo",
		strokes: 6,
		group: "yoon",
		examples: [[
			"ジョギング",
			"jogingu",
			"chạy bộ"
		]]
	},
	{
		char: "ビャ",
		romaji: "bya",
		row: "ba",
		col: "ya",
		strokes: 4,
		group: "yoon",
		examples: [[
			"ビャク",
			"byaku",
			"trắng (âm on)"
		]]
	},
	{
		char: "ビュ",
		romaji: "byu",
		row: "ba",
		col: "yu",
		strokes: 4,
		group: "yoon",
		examples: [[
			"ビュー",
			"byuu",
			"tầm nhìn"
		]]
	},
	{
		char: "ビョ",
		romaji: "byo",
		row: "ba",
		col: "yo",
		strokes: 5,
		group: "yoon",
		examples: [[
			"ビョウイン",
			"byouin",
			"bệnh viện"
		]]
	},
	{
		char: "ピャ",
		romaji: "pya",
		row: "pa",
		col: "ya",
		strokes: 4,
		group: "yoon",
		examples: [[
			"ピャー",
			"pyaa",
			"âm tượng thanh"
		]]
	},
	{
		char: "ピュ",
		romaji: "pyu",
		row: "pa",
		col: "yu",
		strokes: 4,
		group: "yoon",
		examples: [[
			"コンピューター",
			"konpyuutaa",
			"máy tính"
		]]
	},
	{
		char: "ピョ",
		romaji: "pyo",
		row: "pa",
		col: "yo",
		strokes: 5,
		group: "yoon",
		examples: [[
			"ピョン",
			"pyon",
			"nhảy"
		]]
	},
	{
		char: "ッ",
		romaji: "(sokuon)",
		row: "sokuon",
		col: "tsu",
		strokes: 3,
		group: "sokuon",
		notes: "Nhân đôi phụ âm: ベッド = beddo.",
		examples: [[
			"ベッド",
			"beddo",
			"giường"
		]]
	},
	{
		char: "ー",
		romaji: "(âm dài)",
		row: "choon",
		col: "long",
		strokes: 1,
		group: "choon",
		notes: "Kéo dài nguyên âm đứng trước.",
		examples: [[
			"コーヒー",
			"koohii",
			"cà phê"
		]]
	},
	{
		char: "ファ",
		romaji: "fa",
		row: "fa",
		col: "a",
		strokes: 3,
		group: "foreign",
		examples: [[
			"ファイル",
			"fairu",
			"tệp"
		]]
	},
	{
		char: "フィ",
		romaji: "fi",
		row: "fa",
		col: "i",
		strokes: 3,
		group: "foreign",
		examples: [[
			"フィルム",
			"firumu",
			"phim"
		]]
	},
	{
		char: "フェ",
		romaji: "fe",
		row: "fa",
		col: "e",
		strokes: 2,
		group: "foreign",
		examples: [[
			"カフェ",
			"kafe",
			"quán cà phê"
		]]
	},
	{
		char: "フォ",
		romaji: "fo",
		row: "fa",
		col: "o",
		strokes: 2,
		group: "foreign",
		examples: [[
			"フォーク",
			"fooku",
			"nĩa"
		]]
	},
	{
		char: "ティ",
		romaji: "ti",
		row: "ta",
		col: "i",
		strokes: 5,
		group: "foreign",
		examples: [[
			"パーティー",
			"paatii",
			"bữa tiệc"
		]]
	},
	{
		char: "ディ",
		romaji: "di",
		row: "da",
		col: "i",
		strokes: 5,
		group: "foreign",
		examples: [[
			"ディズニー",
			"dizunii",
			"Disney"
		]]
	},
	{
		char: "トゥ",
		romaji: "tu",
		row: "ta",
		col: "u",
		strokes: 4,
		group: "foreign",
		examples: [[
			"タトゥー",
			"tatoo",
			"xăm"
		]]
	},
	{
		char: "ドゥ",
		romaji: "du",
		row: "da",
		col: "u",
		strokes: 4,
		group: "foreign",
		examples: [[
			"ドゥ",
			"du",
			"do"
		]]
	},
	{
		char: "シェ",
		romaji: "she",
		row: "sa",
		col: "e",
		strokes: 5,
		group: "foreign",
		examples: [[
			"シェフ",
			"shefu",
			"đầu bếp"
		]]
	},
	{
		char: "チェ",
		romaji: "che",
		row: "ta",
		col: "e",
		strokes: 5,
		group: "foreign",
		examples: [[
			"チェック",
			"chekku",
			"kiểm tra"
		]]
	},
	{
		char: "ウィ",
		romaji: "wi",
		row: "wa",
		col: "i",
		strokes: 4,
		group: "foreign",
		examples: [[
			"ウィンドウ",
			"windou",
			"cửa sổ"
		]]
	},
	{
		char: "ウェ",
		romaji: "we",
		row: "wa",
		col: "e",
		strokes: 3,
		group: "foreign",
		examples: [[
			"ウェブサイト",
			"webusaito",
			"website"
		]]
	},
	{
		char: "ウォ",
		romaji: "wo",
		row: "wa",
		col: "o",
		strokes: 5,
		group: "foreign",
		examples: [[
			"ウォーク",
			"wooku",
			"đi bộ"
		]]
	},
	{
		char: "ヴァ",
		romaji: "va",
		row: "va",
		col: "a",
		strokes: 4,
		group: "foreign",
		examples: [[
			"ヴァイオリン",
			"vaiorin",
			"violin"
		]]
	},
	{
		char: "ヴィ",
		romaji: "vi",
		row: "va",
		col: "i",
		strokes: 4,
		group: "foreign",
		examples: [[
			"ヴィーナス",
			"viinasu",
			"Venus"
		]]
	},
	{
		char: "ヴェ",
		romaji: "ve",
		row: "va",
		col: "e",
		strokes: 3,
		group: "foreign",
		examples: [[
			"ヴェネツィア",
			"venetsia",
			"Venice"
		]]
	},
	{
		char: "ヴォ",
		romaji: "vo",
		row: "va",
		col: "o",
		strokes: 5,
		group: "foreign",
		examples: [[
			"ヴォーカル",
			"vookaru",
			"vocal"
		]]
	},
	{
		char: "ツァ",
		romaji: "tsa",
		row: "ta",
		col: "a",
		strokes: 5,
		group: "foreign",
		examples: [[
			"モーツァルト",
			"mootsaruto",
			"Mozart"
		]]
	},
	{
		char: "ツェ",
		romaji: "tse",
		row: "ta",
		col: "e",
		strokes: 4,
		group: "foreign",
		examples: [[
			"ツェッペリン",
			"tsepperin",
			"zeppelin"
		]]
	},
	{
		char: "ツォ",
		romaji: "tso",
		row: "ta",
		col: "o",
		strokes: 6,
		group: "foreign",
		examples: [[
			"カンツォーネ",
			"kantsoone",
			"canzone"
		]]
	}
];
var HIRAGANA = make("hiragana", HIRA_SEEDS);
var KATAKANA = make("katakana", KATA_SEEDS);
function kanaById(id) {
	return HIRAGANA.find((k) => k.id === id) ?? KATAKANA.find((k) => k.id === id);
}
//#endregion
export { KATAKANA as n, kanaById as r, HIRAGANA as t };
