import type { AnimeSong, SongLevel, SongVocab } from "./songs";

type W = [string, string, string, string, SongLevel];

function s(
  id: string,
  title: string,
  kana: string,
  romaji: string,
  artist: string,
  anime: string,
  year: number,
  level: SongLevel,
  kind: string,
  series: string,
  focus: string,
  words: W[],
): AnimeSong {
  const vocab: SongVocab[] = words.map(([word, kanaW, romajiW, meaning, lv]) => ({
    word,
    kana: kanaW,
    romaji: romajiW,
    meaning,
    level: lv,
  }));
  const a = vocab[0]!;
  const b = vocab[1] ?? a;
  return {
    id,
    title,
    titleKana: kana,
    romaji,
    artist,
    anime,
    year,
    level,
    kind,
    series,
    why: `${kind} của ${anime}. ${focus}`,
    focus,
    search: `${title} ${artist} official`,
    bits: [],
    vocab,
    lines: [
      {
        jp: `${a.word}が好きです。`,
        kana: `${a.kana}がすきです。`,
        romaji: `${a.romaji} ga suki desu`,
        vi: `Tôi thích ${a.meaning}.`,
      },
      {
        jp: `${b.word}があります。`,
        kana: `${b.kana}があります。`,
        romaji: `${b.romaji} ga arimasu`,
        vi: `Có ${b.meaning}.`,
      },
    ],
  };
}

const N = "Naruto";
const D = "Dragon Ball";

export const FRANCHISE_SONGS: AnimeSong[] = [
  s("n-rocks", "R★O★C★K★S", "ロックス", "rocks", "HOUND DOG", "NARUTO", 2002, "N5", "OP 1", N, "Opening đầu tiên. Tên bài đọc là katakana của rock.", [
    ["ロック", "ロック", "rokku", "nhạc rock", "N5"],
    ["星", "ほし", "hoshi", "ngôi sao", "N5"],
    ["今日", "きょう", "kyou", "hôm nay", "N5"],
  ]),
  s("n-haruka", "遥か彼方", "はるか かなた", "haruka kanata", "ASIAN KUNG-FU GENERATION", "NARUTO", 2002, "N4", "OP 2", N, "遥か = rất xa. 彼方 = phía bên kia.", [
    ["遥か", "はるか", "haruka", "xa xôi", "N4"],
    ["空", "そら", "sora", "bầu trời", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("n-kanashimi", "悲しみをやさしさに", "かなしみをやさしさに", "kanashimi o yasashisa ni", "little by little", "NARUTO", 2002, "N4", "OP 3", N, "Mẫu を…に: biến nỗi buồn thành sự dịu dàng.", [
    ["悲しみ", "かなしみ", "kanashimi", "nỗi buồn", "N4"],
    ["やさしさ", "やさしさ", "yasashisa", "sự dịu dàng", "N4"],
    ["心", "こころ", "kokoro", "trái tim", "N4"],
  ]),
  s("n-go", "GO!!!", "ゴー", "go", "FLOW", "NARUTO", 2004, "N5", "OP 4", N, "Điệp khúc tiếng Anh GO. Phần Nhật nghe 今 và 友.", [
    ["今", "いま", "ima", "bây giờ", "N5"],
    ["友", "とも", "tomo", "bạn", "N5"],
    ["行く", "いく", "iku", "đi", "N5"],
  ]),
  s("n-seishun", "青春狂騒曲", "せいしゅんきょうそうきょく", "seishun kyousoukyoku", "サンボマスター", "NARUTO", 2005, "N3", "OP 5", N, "青春 = tuổi trẻ (Thanh Xuân). Học tên bài là đủ.", [
    ["青春", "せいしゅん", "seishun", "tuổi trẻ", "N3"],
    ["歌", "うた", "uta", "bài hát", "N5"],
    ["今日", "きょう", "kyou", "hôm nay", "N5"],
  ]),
  s("n-noboy", "ノーボーイ・ノークライ", "ノーボーイ・ノークライ", "no boy, no cry", "STANCE PUNKS", "NARUTO", 2005, "N5", "OP 6", N, "Tên bài gần như toàn tiếng Anh. Học 涙 và 少年 bên cạnh.", [
    ["少年", "しょうねん", "shounen", "cậu bé", "N4"],
    ["涙", "なみだ", "namida", "nước mắt", "N4"],
    ["声", "こえ", "koe", "giọng", "N4"],
  ]),
  s("n-namikaze", "波風サテライト", "なみかぜサテライト", "namikaze satellite", "スノケル", "NARUTO", 2006, "N4", "OP 7", N, "波 = sóng, 風 = gió. サテライト là katakana.", [
    ["波", "なみ", "nami", "sóng", "N4"],
    ["風", "かぜ", "kaze", "gió", "N5"],
    ["空", "そら", "sora", "bầu trời", "N5"],
  ]),
  s("n-remember", "Re:member", "リメンバー", "remember", "FLOW", "NARUTO", 2006, "N4", "OP 8", N, "Tên bài là remember. Trong tiếng Nhật nhớ = 覚える.", [
    ["名前", "なまえ", "namae", "tên", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
    ["夢", "ゆめ", "yume", "ước mơ", "N4"],
  ]),
  s("n-yurayura", "ユラユラ", "ユラユラ", "yura yura", "Hearts Grow", "NARUTO", 2007, "N5", "OP 9", N, "ユラユラ là từ tượng thanh: đung đưa. Opening cuối của Naruto phần 1.", [
    ["風", "かぜ", "kaze", "gió", "N5"],
    ["花", "はな", "hana", "hoa", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
  ]),
  s("n-wind", "Wind", "ウインド", "wind", "Akeboshi", "NARUTO", 2002, "N5", "ED 1", N, "Ending đầu. Wind = 風.", [
    ["風", "かぜ", "kaze", "gió", "N5"],
    ["空", "そら", "sora", "bầu trời", "N5"],
    ["道", "みち", "michi", "con đường", "N5"],
  ]),
  s("n-harmonia", "ハルモニア", "ハルモニア", "harmonia", "RYTHEM", "NARUTO", 2003, "N5", "ED 2", N, "Tên bài là katakana. Nghe chậm, hợp người mới.", [
    ["歌", "うた", "uta", "bài hát", "N5"],
    ["声", "こえ", "koe", "giọng", "N4"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("n-vivarock", "ビバ★ロック", "ビバロック", "viva rock", "ORANGE RANGE", "NARUTO", 2003, "N5", "ED 3", N, "ビバ và ロック đều là katakana.", [
    ["ロック", "ロック", "rokku", "nhạc rock", "N5"],
    ["星", "ほし", "hoshi", "sao", "N5"],
    ["今日", "きょう", "kyou", "hôm nay", "N5"],
  ]),
  s("n-alive", "ALIVE", "アライブ", "alive", "雷鼓", "NARUTO", 2004, "N5", "ED 4", N, "Alive = đang sống. Tiếng Nhật: 生きる.", [
    ["命", "いのち", "inochi", "mạng sống", "N3"],
    ["今日", "きょう", "kyou", "hôm nay", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("n-nandomo", "今まで何度も", "いままでなんども", "ima made nando mo", "THE MASS MISSILE", "NARUTO", 2004, "N4", "ED 5", N, "今まで = cho đến bây giờ. 何度も = nhiều lần.", [
    ["今", "いま", "ima", "bây giờ", "N5"],
    ["何度", "なんど", "nando", "bao nhiêu lần", "N4"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("n-ryusei", "流星", "りゅうせい", "ryuusei", "TiA", "NARUTO", 2005, "N4", "ED 6", N, "流星 = sao băng. Hán-Việt Lưu Tinh.", [
    ["星", "ほし", "hoshi", "sao", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
    ["空", "そら", "sora", "bầu trời", "N5"],
  ]),
  s("n-mountain", "マウンテン・ア・ゴーゴー・ツー", "マウンテン・ア・ゴーゴー・ツー", "mountain a go go two", "キャプテンストライダム", "NARUTO", 2005, "N5", "ED 7", N, "Gần hết là katakana. Mountain = 山.", [
    ["山", "やま", "yama", "núi", "N5"],
    ["今日", "きょう", "kyou", "hôm nay", "N5"],
    ["歌", "うた", "uta", "bài hát", "N5"],
  ]),
  s("n-hajimete", "はじめて君としゃべった", "はじめてきみとしゃべった", "hajimete kimi to shabetta", "ガガガSP", "NARUTO", 2005, "N4", "ED 8", N, "はじめて = lần đầu. 君 = bạn. しゃべる = nói chuyện.", [
    ["初めて", "はじめて", "hajimete", "lần đầu", "N5"],
    ["君", "きみ", "kimi", "bạn", "N4"],
    ["話", "はなし", "hanashi", "chuyện", "N5"],
  ]),
  s("n-kotoba", "失くした言葉", "なくしたことば", "nakushita kotoba", "No Regret Life", "NARUTO", 2006, "N4", "ED 9", N, "言葉 = lời nói. 失くす = làm mất.", [
    ["言葉", "ことば", "kotoba", "lời nói", "N4"],
    ["声", "こえ", "koe", "giọng", "N4"],
    ["名前", "なまえ", "namae", "tên", "N5"],
  ]),
  s("n-speed", "スピード", "スピード", "speed", "アナログフィッシュ", "NARUTO", 2006, "N5", "ED 10", N, "スピード là katakana của speed. Nghĩa Nhật: 速い.", [
    ["速い", "はやい", "hayai", "nhanh", "N5"],
    ["道", "みち", "michi", "đường", "N5"],
    ["今日", "きょう", "kyou", "hôm nay", "N5"],
  ]),
  s("n-soba", "そばにいるから", "そばにいるから", "soba ni iru kara", "AMADORI", "NARUTO", 2006, "N4", "ED 11", N, "そばにいる = ở bên cạnh. から = vì.", [
    ["そば", "そば", "soba", "bên cạnh", "N4"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
    ["今日", "きょう", "kyou", "hôm nay", "N5"],
  ]),
  s("n-parade", "パレード", "パレード", "parade", "CHABA", "NARUTO", 2006, "N5", "ED 12", N, "パレード = parade, đám rước.", [
    ["道", "みち", "michi", "đường", "N5"],
    ["人", "ひと", "hito", "người", "N5"],
    ["歌", "うた", "uta", "bài hát", "N5"],
  ]),
  s("n-yellow", "Yellow Moon", "イエロームーン", "yellow moon", "Akeboshi", "NARUTO", 2006, "N5", "ED 13", N, "Yellow = 黄色い. Moon = 月.", [
    ["月", "つき", "tsuki", "mặt trăng", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
    ["黄色", "きいろ", "kiiro", "màu vàng", "N5"],
  ]),
  s("n-pinocchio", "ピノキオ", "ピノキオ", "pinocchio", "オレスカバンド", "NARUTO", 2007, "N5", "ED 14", N, "Tên bài là katakana. Ska dễ bắt nhịp.", [
    ["木", "き", "ki", "gỗ / cây", "N5"],
    ["少年", "しょうねん", "shounen", "cậu bé", "N4"],
    ["歌", "うた", "uta", "bài hát", "N5"],
  ]),
  s("n-scenario", "シナリオ", "シナリオ", "scenario", "SABOTEN", "NARUTO", 2007, "N5", "ED 15", N, "Ending cuối phần Naruto. シナリオ = kịch bản.", [
    ["話", "はなし", "hanashi", "câu chuyện", "N5"],
    ["終わり", "おわり", "owari", "kết thúc", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),

  s("ns-heros", "Hero's Come Back!!", "ヒーローズカムバック", "hero's come back", "nobodyknows+", "NARUTO 疾風伝", 2007, "N5", "OP 1", N, "Opening đầu Shippuden. Hero = ヒーロー.", [
    ["ヒーロー", "ヒーロー", "hiiroo", "anh hùng", "N5"],
    ["帰る", "かえる", "kaeru", "trở về", "N5"],
    ["村", "むら", "mura", "làng", "N4"],
  ]),
  s("ns-distance", "distance", "ディスタンス", "distance", "LONG SHOT PARTY", "NARUTO 疾風伝", 2007, "N4", "OP 2", N, "Distance = khoảng cách. Tiếng Nhật: 距離.", [
    ["距離", "きょり", "kyori", "khoảng cách", "N3"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
    ["道", "みち", "michi", "đường", "N5"],
  ]),
  s("ns-bluebird", "ブルーバード", "ブルーバード", "blue bird", "いきものがかり", "NARUTO 疾風伝", 2008, "N5", "OP 3", N, "Bài Naruto được hát theo nhiều nhất. Blue = 青い, bird = 鳥.", [
    ["青", "あお", "ao", "màu xanh", "N5"],
    ["鳥", "とり", "tori", "chim", "N5"],
    ["空", "そら", "sora", "bầu trời", "N5"],
  ]),
  s("ns-closer", "CLOSER", "クローザー", "closer", "井上ジョー", "NARUTO 疾風伝", 2008, "N4", "OP 4", N, "Closer = gần hơn. Tiếng Nhật: 近い.", [
    ["近い", "ちかい", "chikai", "gần", "N5"],
    ["手", "て", "te", "tay", "N5"],
    ["君", "きみ", "kimi", "bạn", "N4"],
  ]),
  s("ns-hotaru", "ホタルノヒカリ", "ホタルノヒカリ", "hotaru no hikari", "いきものがかり", "NARUTO 疾風伝", 2009, "N4", "OP 5", N, "ホタル = đom đóm. 光 = ánh sáng. の nối hai danh từ.", [
    ["光", "ひかり", "hikari", "ánh sáng", "N4"],
    ["夜", "よる", "yoru", "đêm", "N5"],
    ["夏", "なつ", "natsu", "mùa hè", "N5"],
  ]),
  s("ns-sign", "Sign", "サイン", "sign", "FLOW", "NARUTO 疾風伝", 2009, "N4", "OP 6", N, "Sign = dấu hiệu. Katakana サイン.", [
    ["サイン", "サイン", "sain", "dấu hiệu", "N5"],
    ["手", "て", "te", "tay", "N5"],
    ["空", "そら", "sora", "trời", "N5"],
  ]),
  s("ns-toumei", "透明だった世界", "とうめいだったせかい", "toumei datta sekai", "秦基博", "NARUTO 疾風伝", 2010, "N3", "OP 7", N, "透明 = trong suốt. だった = thì quá khứ của だ. 世界 = thế giới.", [
    ["世界", "せかい", "sekai", "thế giới", "N4"],
    ["空", "そら", "sora", "bầu trời", "N5"],
    ["目", "め", "me", "mắt", "N5"],
  ]),
  s("ns-diver", "Diver", "ダイバー", "diver", "NICO Touches the Walls", "NARUTO 疾風伝", 2010, "N4", "OP 8", N, "Diver = thợ lặn. Học 海 khi nghe.", [
    ["海", "うみ", "umi", "biển", "N5"],
    ["水", "みず", "mizu", "nước", "N5"],
    ["深い", "ふかい", "fukai", "sâu", "N4"],
  ]),
  s("ns-lovers", "Lovers", "ラヴァーズ", "lovers", "7!!", "NARUTO 疾風伝", 2011, "N4", "OP 9", N, "Lovers = người yêu. Tiếng Nhật hay gặp: 恋人.", [
    ["恋人", "こいびと", "koibito", "người yêu", "N4"],
    ["好き", "すき", "suki", "thích", "N5"],
    ["手", "て", "te", "tay", "N5"],
  ]),
  s("ns-newsong", "newsong", "ニューソング", "newsong", "tacica", "NARUTO 疾風伝", 2011, "N5", "OP 10", N, "New song = bài hát mới. 新しい歌.", [
    ["新しい", "あたらしい", "atarashii", "mới", "N5"],
    ["歌", "うた", "uta", "bài hát", "N5"],
    ["声", "こえ", "koe", "giọng", "N4"],
  ]),
  s("ns-totsugeki", "突撃ロック", "とつげきロック", "totsugeki rock", "ザ・クロマニヨンズ", "NARUTO 疾風伝", 2012, "N4", "OP 11", N, "突撃 = xung phong. ロック = rock.", [
    ["ロック", "ロック", "rokku", "nhạc rock", "N5"],
    ["前", "まえ", "mae", "phía trước", "N5"],
    ["走る", "はしる", "hashiru", "chạy", "N5"],
  ]),
  s("ns-moshimo", "もしも", "もしも", "moshimo", "ダイスケ", "NARUTO 疾風伝", 2012, "N4", "OP 12", N, "もしも = nếu như. Mở câu giả định.", [
    ["もし", "もし", "moshi", "nếu", "N4"],
    ["明日", "あした", "ashita", "ngày mai", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("ns-niwaka", "ニワカ雨ニモ負ケズ", "にわかあめにもまけず", "niwaka ame ni mo makezu", "NICO Touches the Walls", "NARUTO 疾風伝", 2013, "N4", "OP 13", N, "雨 = mưa. 負ける = thua. 〜ず = không (cổ).", [
    ["雨", "あめ", "ame", "mưa", "N5"],
    ["空", "そら", "sora", "trời", "N5"],
    ["強い", "つよい", "tsuyoi", "mạnh", "N5"],
  ]),
  s("ns-tsuki", "月の大きさ", "つきのおおきさ", "tsuki no ookisa", "乃木坂46", "NARUTO 疾風伝", 2013, "N4", "OP 14", N, "月の大きさ = độ lớn của mặt trăng.", [
    ["月", "つき", "tsuki", "mặt trăng", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
    ["大きい", "おおきい", "ookii", "to", "N5"],
  ]),
  s("ns-guren", "紅蓮", "ぐれん", "guren", "DOES", "NARUTO 疾風伝", 2014, "N3", "OP 15", N, "紅蓮 = sen đỏ. Cùng chữ với 紅蓮華. Hán-Việt Hồng Liên.", [
    ["赤", "あか", "aka", "màu đỏ", "N5"],
    ["花", "はな", "hana", "hoa", "N5"],
    ["火", "ひ", "hi", "lửa", "N5"],
  ]),
  s("ns-kaze", "風", "かぜ", "kaze", "山猿", "NARUTO 疾風伝", 2015, "N5", "OP 17", N, "Một chữ 風. Đọc kun かぜ khi đứng một mình.", [
    ["風", "かぜ", "kaze", "gió", "N5"],
    ["空", "そら", "sora", "trời", "N5"],
    ["今日", "きょう", "kyou", "hôm nay", "N5"],
  ]),
  s("ns-line", "LINE", "ライン", "line", "スキマスイッチ", "NARUTO 疾風伝", 2015, "N4", "OP 18", N, "LINE đọc ライン. Trong bài, nghe 線 và 手.", [
    ["線", "せん", "sen", "đường kẻ", "N4"],
    ["手", "て", "te", "tay", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("ns-blood", "ブラッドサーキュレーター", "ブラッドサーキュレーター", "blood circulator", "ASIAN KUNG-FU GENERATION", "NARUTO 疾風伝", 2016, "N4", "OP 19", N, "Tên bài toàn katakana: máu và vòng tuần hoàn.", [
    ["血", "ち", "chi", "máu", "N3"],
    ["心", "こころ", "kokoro", "tim", "N4"],
    ["体", "からだ", "karada", "cơ thể", "N5"],
  ]),
  s("ns-karano", "カラノココロ", "カラノココロ", "kara no kokoro", "Anly", "NARUTO 疾風伝", 2016, "N4", "OP 20", N, "空の心 = trái tim trống. カラ là cách viết katakana của 空.", [
    ["心", "こころ", "kokoro", "trái tim", "N4"],
    ["空", "そら", "sora", "trống / trời", "N5"],
    ["人", "ひと", "hito", "người", "N5"],
  ]),
  s("ns-nagare", "流れ星", "ながれぼし", "nagareboshi", "HOME MADE 家族", "NARUTO 疾風伝", 2007, "N4", "ED 1", N, "流れ星 = sao băng. Có đoạn tiếng Anh Shooting Star.", [
    ["星", "ほし", "hoshi", "sao", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
    ["空", "そら", "sora", "trời", "N5"],
  ]),
  s("ns-michi", "道 〜to you all", "みち", "michi", "alüto", "NARUTO 疾風伝", 2007, "N5", "ED 2", N, "道 = con đường. Phần Anh: to you all.", [
    ["道", "みち", "michi", "con đường", "N5"],
    ["歩く", "あるく", "aruku", "đi bộ", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("ns-kimimono", "キミモノガタリ", "キミモノガタリ", "kimi monogatari", "little by little", "NARUTO 疾風伝", 2007, "N4", "ED 3", N, "君の物語 = câu chuyện của bạn.", [
    ["君", "きみ", "kimi", "bạn", "N4"],
    ["物語", "ものがたり", "monogatari", "câu chuyện", "N3"],
    ["名前", "なまえ", "namae", "tên", "N5"],
  ]),
  s("ns-yasei", "目覚めろ！野性", "めざめろ やせい", "mezamero yasei", "マッチョ with QUESTION?", "NARUTO 疾風伝", 2007, "N3", "ED 4", N, "野性 = bản năng hoang dã. 目覚める = tỉnh dậy.", [
    ["朝", "あさ", "asa", "buổi sáng", "N5"],
    ["目", "め", "me", "mắt", "N5"],
    ["強い", "つよい", "tsuyoi", "mạnh", "N5"],
  ]),
  s("ns-niji", "素直な虹", "すなおなにじ", "sunao na niji", "surface", "NARUTO 疾風伝", 2008, "N4", "ED 5", N, "虹 = cầu vồng. 素直 = thẳng thắn.", [
    ["虹", "にじ", "niji", "cầu vồng", "N4"],
    ["空", "そら", "sora", "trời", "N5"],
    ["雨", "あめ", "ame", "mưa", "N5"],
  ]),
  s("ns-broken", "Broken Youth", "ブロークンユース", "broken youth", "NICO Touches the Walls", "NARUTO 疾風伝", 2008, "N4", "ED 6", N, "Youth = tuổi trẻ = 青春.", [
    ["青春", "せいしゅん", "seishun", "tuổi trẻ", "N3"],
    ["心", "こころ", "kokoro", "lòng", "N4"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("ns-longkiss", "Long Kiss Good Bye", "ロングキスグッドバイ", "long kiss good bye", "HALCALI", "NARUTO 疾風伝", 2008, "N4", "ED 7", N, "Good bye = tạm biệt. Tiếng Nhật: さようなら.", [
    ["さよなら", "さよなら", "sayonara", "tạm biệt", "N5"],
    ["キス", "キス", "kisu", "hôn", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
  ]),
  s("ns-bacchikoi", "バッチコイ!!!", "バッチコイ", "bacchikoi", "DEV PARADE", "NARUTO 疾風伝", 2009, "N4", "ED 8", N, "バッチコイ là khẩu lệnh: cứ tới đi.", [
    ["来る", "くる", "kuru", "đến", "N5"],
    ["前", "まえ", "mae", "phía trước", "N5"],
    ["声", "こえ", "koe", "giọng", "N4"],
  ]),
  s("ns-shinkokyu", "深呼吸", "しんこきゅう", "shinkokyuu", "SUPER BEAVER", "NARUTO 疾風伝", 2009, "N4", "ED 9", N, "深呼吸 = hít thở sâu. 深い + 呼吸.", [
    ["息", "いき", "iki", "hơi thở", "N4"],
    ["深い", "ふかい", "fukai", "sâu", "N4"],
    ["空", "そら", "sora", "trời", "N5"],
  ]),
  s("ns-myanswer", "My ANSWER", "マイアンサー", "my answer", "SEAMO", "NARUTO 疾風伝", 2009, "N4", "ED 10", N, "Answer = câu trả lời. Tiếng Nhật: 答え.", [
    ["答え", "こたえ", "kotae", "câu trả lời", "N4"],
    ["質問", "しつもん", "shitsumon", "câu hỏi", "N4"],
    ["私", "わたし", "watashi", "tôi", "N5"],
  ]),
  s("ns-omae", "おまえだったんだ", "おまえだったんだ", "omae datta n da", "氣志團", "NARUTO 疾風伝", 2010, "N4", "ED 11", N, "おまえ = mày (suồng sã). だった = thì quá khứ.", [
    ["お前", "おまえ", "omae", "mày", "N4"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
    ["名前", "なまえ", "namae", "tên", "N5"],
  ]),
  s("ns-foryou", "For You", "フォーユー", "for you", "AZU", "NARUTO 疾風伝", 2010, "N5", "ED 12", N, "For you = dành cho bạn. 君のために.", [
    ["君", "きみ", "kimi", "bạn", "N4"],
    ["ため", "ため", "tame", "vì / cho", "N4"],
    ["歌", "うた", "uta", "bài hát", "N5"],
  ]),
  s("ns-jitensha", "自転車", "じてんしゃ", "jitensha", "オレスカバンド", "NARUTO 疾風伝", 2010, "N5", "ED 13", N, "自転車 = xe đạp. Từ N5 rất rõ.", [
    ["自転車", "じてんしゃ", "jitensha", "xe đạp", "N5"],
    ["道", "みち", "michi", "đường", "N5"],
    ["学校", "がっこう", "gakkou", "trường", "N5"],
  ]),
  s("ns-utakata", "うたかた花火", "うたかたはなび", "utakata hanabi", "supercell", "NARUTO 疾風伝", 2010, "N4", "ED 14", N, "花火 = pháo hoa. うたかた = thoáng qua.", [
    ["花火", "はなび", "hanabi", "pháo hoa", "N4"],
    ["夏", "なつ", "natsu", "mùa hè", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
  ]),
  s("ns-ucando", "U Can Do It!", "ユーキャンドゥーイット", "u can do it", "DOMINO", "NARUTO 疾風伝", 2011, "N5", "ED 15", N, "Câu cổ vũ tiếng Anh. Nhật: できる.", [
    ["出来る", "できる", "dekiru", "làm được", "N5"],
    ["私", "わたし", "watashi", "tôi", "N5"],
    ["今日", "きょう", "kyou", "hôm nay", "N5"],
  ]),
  s("ns-orchestra", "真夜中のオーケストラ", "まよなかのオーケストラ", "mayonaka no orchestra", "Aqua Timez", "NARUTO 疾風伝", 2011, "N4", "ED 16", N, "Cùng chữ 真夜中 với Stay with Me. オーケストラ = dàn nhạc.", [
    ["真夜中", "まよなか", "mayonaka", "nửa đêm", "N4"],
    ["音楽", "おんがく", "ongaku", "âm nhạc", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
  ]),
  s("ns-freedom", "FREEDOM", "フリーダム", "freedom", "HOME MADE 家族", "NARUTO 疾風伝", 2011, "N4", "ED 17", N, "Freedom = 自由.", [
    ["自由", "じゆう", "jiyuu", "tự do", "N4"],
    ["空", "そら", "sora", "trời", "N5"],
    ["道", "みち", "michi", "đường", "N5"],
  ]),
  s("ns-yokubo", "欲望を叫べ!!!", "よくぼうをさけべ", "yokubou o sakebe", "OKAMOTO'S", "NARUTO 疾風伝", 2012, "N3", "ED 18", N, "叫ぶ = hét. 欲望 = ham muốn.", [
    ["声", "こえ", "koe", "giọng", "N4"],
    ["大きい", "おおきい", "ookii", "to", "N5"],
    ["夢", "ゆめ", "yume", "ước", "N4"],
  ]),
  s("ns-placetry", "Place to Try", "プレイストゥトライ", "place to try", "TOTALFAT", "NARUTO 疾風伝", 2012, "N4", "ED 19", N, "Place = chỗ. Try = thử. 場所 và 試す.", [
    ["場所", "ばしょ", "basho", "nơi chốn", "N4"],
    ["手", "て", "te", "tay", "N5"],
    ["今日", "きょう", "kyou", "hôm nay", "N5"],
  ]),
  s("ns-bymyside", "By My Side", "バイマイサイド", "by my side", "hemenway", "NARUTO 疾風伝", 2012, "N4", "ED 20", N, "By my side = ở bên tôi. そばに.", [
    ["そば", "そば", "soba", "bên cạnh", "N4"],
    ["私", "わたし", "watashi", "tôi", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("ns-cascade", "カスケード", "カスケード", "cascade", "UNLIMITS", "NARUTO 疾風伝", 2013, "N4", "ED 21", N, "Cascade = thác nước nối nhau. Học 水.", [
    ["水", "みず", "mizu", "nước", "N5"],
    ["川", "かわ", "kawa", "sông", "N5"],
    ["音", "おと", "oto", "âm thanh", "N4"],
  ]),
  s("ns-koe", "この声枯らして", "このこえからして", "kono koe karashite", "AISHA", "NARUTO 疾風伝", 2013, "N4", "ED 22", N, "この声 = giọng này. 枯らす = hát đến khản.", [
    ["声", "こえ", "koe", "giọng", "N4"],
    ["歌", "うた", "uta", "bài hát", "N5"],
    ["この", "この", "kono", "cái này", "N5"],
  ]),
  s("ns-mother", "MOTHER", "マザー", "mother", "MUCC", "NARUTO 疾風伝", 2013, "N5", "ED 23", N, "Mother = 母 / お母さん.", [
    ["母", "はは", "haha", "mẹ", "N5"],
    ["家族", "かぞく", "kazoku", "gia đình", "N4"],
    ["家", "いえ", "ie", "nhà", "N5"],
  ]),
  s("ns-memory", "さよならメモリー", "さよならメモリー", "sayonara memory", "7!!", "NARUTO 疾風伝", 2014, "N4", "ED 24", N, "さよなら + memory (メモリー).", [
    ["さよなら", "さよなら", "sayonara", "tạm biệt", "N5"],
    ["記憶", "きおく", "kioku", "ký ức", "N3"],
    ["名前", "なまえ", "namae", "tên", "N5"],
  ]),
  s("ns-icanhear", "I Can Hear", "アイキャンヒア", "i can hear", "DISH//", "NARUTO 疾風伝", 2014, "N5", "ED 25", N, "Hear = nghe. Tiếng Nhật: 聞こえる.", [
    ["耳", "みみ", "mimi", "tai", "N5"],
    ["声", "こえ", "koe", "giọng", "N4"],
    ["歌", "うた", "uta", "bài hát", "N5"],
  ]),
  s("ns-yume", "夢を抱いて", "ゆめをだいて", "yume o daite", "Rake", "NARUTO 疾風伝", 2014, "N4", "ED 26", N, "夢を抱く = ôm một giấc mơ.", [
    ["夢", "ゆめ", "yume", "ước mơ", "N4"],
    ["手", "て", "te", "tay", "N5"],
    ["明日", "あした", "ashita", "ngày mai", "N5"],
  ]),
  s("ns-blacknight", "ブラックナイトタウン", "ブラックナイトタウン", "black night town", "近藤晃央", "NARUTO 疾風伝", 2015, "N4", "ED 27", N, "Black night town: 黒い夜の町.", [
    ["黒", "くろ", "kuro", "màu đen", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
    ["町", "まち", "machi", "phố", "N5"],
  ]),
  s("ns-niji2", "虹", "にじ", "niji", "真空ホロウ", "NARUTO 疾風伝", 2015, "N4", "ED 28", N, "Một chữ 虹, cầu vồng.", [
    ["虹", "にじ", "niji", "cầu vồng", "N4"],
    ["空", "そら", "sora", "trời", "N5"],
    ["雨", "あめ", "ame", "mưa", "N5"],
  ]),
  s("ns-flame", "FLAME", "フレイム", "flame", "DISH//", "NARUTO 疾風伝", 2015, "N4", "ED 29", N, "Flame = ngọn lửa. 炎.", [
    ["火", "ひ", "hi", "lửa", "N5"],
    ["熱い", "あつい", "atsui", "nóng", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
  ]),
  s("ns-never", "Never Change", "ネバーチェンジ", "never change", "SHUN", "NARUTO 疾風伝", 2015, "N4", "ED 30", N, "Never change = không đổi. 変わらない.", [
    ["同じ", "おなじ", "onaji", "giống nhau", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
    ["心", "こころ", "kokoro", "lòng", "N4"],
  ]),
  s("ns-damedame", "だめだめだ", "だめだめだ", "dame dame da", "Shiori Tomita", "NARUTO 疾風伝", 2016, "N5", "ED 31", N, "だめ = không được. Lặp hai lần cho khẩu ngữ.", [
    ["だめ", "だめ", "dame", "không được", "N5"],
    ["今日", "きょう", "kyou", "hôm nay", "N5"],
    ["私", "わたし", "watashi", "tôi", "N5"],
  ]),
  s("ns-spinning", "Spinning World", "スピニングワールド", "spinning world", "Diana Garnet", "NARUTO 疾風伝", 2016, "N4", "ED 32", N, "World = 世界. Spinning = đang quay.", [
    ["世界", "せかい", "sekai", "thế giới", "N4"],
    ["空", "そら", "sora", "trời", "N5"],
    ["回る", "まわる", "mawaru", "quay", "N4"],
  ]),
  s("ns-yakusoku", "言葉のいらない約束", "ことばのいらないやくそく", "kotoba no iranai yakusoku", "sana", "NARUTO 疾風伝", 2016, "N4", "ED 33", N, "約束 = lời hứa. いらない = không cần.", [
    ["約束", "やくそく", "yakusoku", "lời hứa", "N4"],
    ["言葉", "ことば", "kotoba", "lời", "N4"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("ns-nijisora", "虹の空", "にじのそら", "niji no sora", "FLOW", "NARUTO 疾風伝", 2016, "N4", "ED 34", N, "虹の空 = bầu trời có cầu vồng.", [
    ["虹", "にじ", "niji", "cầu vồng", "N4"],
    ["空", "そら", "sora", "bầu trời", "N5"],
    ["青", "あお", "ao", "xanh", "N5"],
  ]),
  s("ns-trouble", "トラブルメイカー", "トラブルメイカー", "troublemaker", "KANIKAPILA", "NARUTO 疾風伝", 2016, "N4", "ED 35", N, "Troublemaker đọc katakana. Nghĩa: người hay gây chuyện.", [
    ["問題", "もんだい", "mondai", "vấn đề", "N4"],
    ["人", "ひと", "hito", "người", "N5"],
    ["今日", "きょう", "kyou", "hôm nay", "N5"],
  ]),
  s("ns-sonnakimi", "そんな君、こんな僕", "そんなきみ こんなぼく", "sonna kimi konna boku", "Thinking Dogs", "NARUTO 疾風伝", 2016, "N4", "ED 36", N, "そんな = như thế đó. こんな = như thế này. 僕 = tôi.", [
    ["君", "きみ", "kimi", "bạn", "N4"],
    ["僕", "ぼく", "boku", "tôi", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("ns-lullaby", "青のララバイ", "あおのララバイ", "ao no lullaby", "黒猫チェルシー", "NARUTO 疾風伝", 2017, "N4", "ED 37", N, "青のララバイ = khúc ru màu xanh. ララバイ = lullaby.", [
    ["青", "あお", "ao", "xanh", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
    ["歌", "うた", "uta", "bài hát", "N5"],
  ]),
  s("ns-pino", "ピノとアメリ", "ピノとアメリ", "pino to ameri", "石崎ひゅーい", "NARUTO 疾風伝", 2017, "N5", "ED 38", N, "Hai tên katakana nối bằng と = và.", [
    ["と", "と", "to", "và", "N5"],
    ["名前", "なまえ", "namae", "tên", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("ns-tabidachi", "旅立ちの唄", "たびだちのうた", "tabidachi no uta", "あゆみくりかまき", "NARUTO 疾風伝", 2017, "N4", "ED 39", N, "旅立ち = lên đường. 唄 = bài hát (cách viết khác của 歌).", [
    ["旅", "たび", "tabi", "chuyến đi", "N4"],
    ["歌", "うた", "uta", "bài hát", "N5"],
    ["道", "みち", "michi", "đường", "N5"],
  ]),
  s("ns-zetsu", "絶絶", "ぜつぜつ", "zetsu zetsu", "Swimy", "NARUTO 疾風伝", 2017, "N3", "ED 40", N, "Ending cuối Shippuden. 絶 là chữ Hán-Việt Tuyệt.", [
    ["終わり", "おわり", "owari", "kết thúc", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
    ["道", "みち", "michi", "đường", "N5"],
  ]),

  s("b-baton", "バトンロード", "バトンロード", "baton road", "KANA-BOON", "BORUTO", 2017, "N4", "OP 1", N, "Baton = gậy tiếp sức. Road = 道.", [
    ["道", "みち", "michi", "con đường", "N5"],
    ["手", "て", "te", "tay", "N5"],
    ["次", "つぎ", "tsugi", "tiếp theo", "N5"],
  ]),
  s("b-over", "OVER", "オーバー", "over", "Little Glee Monster", "BORUTO", 2017, "N4", "OP 2", N, "Over = vượt qua. 超える.", [
    ["上", "うえ", "ue", "phía trên", "N5"],
    ["空", "そら", "sora", "trời", "N5"],
    ["強い", "つよい", "tsuyoi", "mạnh", "N5"],
  ]),
  s("b-game", "It's all in the game", "イッツオールインザゲーム", "it's all in the game", "Qyoto", "BORUTO", 2018, "N4", "OP 3", N, "Game = ゲーム. All = tất cả = 全部.", [
    ["全部", "ぜんぶ", "zenbu", "tất cả", "N5"],
    ["ゲーム", "ゲーム", "geemu", "trò chơi", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("b-lonely", "Lonely Go!", "ロンリーゴー", "lonely go", "Brian the Sun", "BORUTO", 2018, "N4", "OP 4", N, "Lonely = cô đơn. 一人.", [
    ["一人", "ひとり", "hitori", "một mình", "N5"],
    ["行く", "いく", "iku", "đi", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
  ]),
  s("b-golden", "Golden Time", "ゴールデンタイム", "golden time", "フジファブリック", "BORUTO", 2019, "N4", "OP 5", N, "Golden = vàng. Time = 時間.", [
    ["時間", "じかん", "jikan", "thời gian", "N5"],
    ["金", "きん", "kin", "vàng", "N5"],
    ["午後", "ごご", "gogo", "buổi chiều", "N5"],
  ]),
  s("b-teenage", "Teenage Dream", "ティーンネイジドリーム", "teenage dream", "miwa", "BORUTO", 2019, "N4", "OP 6", N, "Dream = 夢. Teenage = tuổi teen.", [
    ["夢", "ゆめ", "yume", "ước mơ", "N4"],
    ["年", "とし", "toshi", "tuổi / năm", "N5"],
    ["学校", "がっこう", "gakkou", "trường", "N5"],
  ]),
  s("b-hajimari", "始まっていく 高まっていく", "はじまっていく たかまっていく", "hajimatteiku takamatteiku", "サンボマスター", "BORUTO", 2020, "N4", "OP 7", N, "始まる = bắt đầu. 高まる = dâng lên. 〜ていく = tiếp diễn về phía trước.", [
    ["始まる", "はじまる", "hajimaru", "bắt đầu", "N5"],
    ["高い", "たかい", "takai", "cao", "N5"],
    ["道", "みち", "michi", "đường", "N5"],
  ]),
  s("b-baku", "BAKU", "バク", "baku", "いきものがかり", "BORUTO", 2020, "N4", "OP 8", N, "BAKU gợi 爆, nổ. Học 火 và 音.", [
    ["火", "ひ", "hi", "lửa", "N5"],
    ["音", "おと", "oto", "tiếng", "N4"],
    ["大きい", "おおきい", "ookii", "to", "N5"],
  ]),
  s("b-gamushara", "がむしゃら", "がむしゃら", "gamushara", "CHiCO with HoneyWorks", "BORUTO", 2021, "N4", "OP 9", N, "がむしゃら = lao vào, không tính toán.", [
    ["走る", "はしる", "hashiru", "chạy", "N5"],
    ["前", "まえ", "mae", "phía trước", "N5"],
    ["強い", "つよい", "tsuyoi", "mạnh", "N5"],
  ]),
  s("b-gold", "GOLD", "ゴールド", "gold", "FLOW", "BORUTO", 2021, "N5", "OP 10", N, "Gold = vàng. 金.", [
    ["金", "きん", "kin", "vàng", "N5"],
    ["光", "ひかり", "hikari", "ánh sáng", "N4"],
    ["星", "ほし", "hoshi", "sao", "N5"],
  ]),
  s("b-kirari", "キラリ", "キラリ", "kirarirari", "KANA-BOON", "BORUTO", 2022, "N4", "OP 11", N, "キラリ = lấp lánh một cái. Từ tượng thanh.", [
    ["光", "ひかり", "hikari", "ánh sáng", "N4"],
    ["星", "ほし", "hoshi", "sao", "N5"],
    ["目", "め", "me", "mắt", "N5"],
  ]),
  s("b-shukuen", "祝宴", "しゅくえん", "shukuen", "ASIAN KUNG-FU GENERATION", "BORUTO", 2022, "N3", "OP 12", N, "祝宴 = yến tiệc mừng. Hán-Việt Chúc Yến.", [
    ["パーティー", "パーティー", "paatii", "tiệc", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
  ]),
  s("b-dreamy", "ドリーミージャーニー", "ドリーミージャーニー", "dreamy journey", "the peggies", "BORUTO", 2017, "N4", "ED 1", N, "Dream = 夢. Journey = chuyến đi = 旅.", [
    ["夢", "ゆめ", "yume", "giấc mơ", "N4"],
    ["旅", "たび", "tabi", "chuyến đi", "N4"],
    ["道", "みち", "michi", "đường", "N5"],
  ]),
  s("b-moontown", "さよならムーンタウン", "さよならムーンタウン", "sayonara moon town", "Scenarioart", "BORUTO", 2017, "N5", "ED 2", N, "さよなら + moon (月) + town (町).", [
    ["さよなら", "さよなら", "sayonara", "tạm biệt", "N5"],
    ["月", "つき", "tsuki", "trăng", "N5"],
    ["町", "まち", "machi", "phố", "N5"],
  ]),
  s("b-hashiri", "僕は走り続ける", "ぼくははしりつづける", "boku wa hashiri tsuzukeru", "MELOFLOAT", "BORUTO", 2017, "N4", "ED 3", N, "走り続ける = chạy tiếp, không dừng.", [
    ["僕", "ぼく", "boku", "tôi", "N5"],
    ["走る", "はしる", "hashiru", "chạy", "N5"],
    ["道", "みち", "michi", "đường", "N5"],
  ]),
  s("b-denshin", "デンシンタマシイ", "デンシンタマシイ", "denshin tamashii", "ゲーム実況者わくわくバンド", "BORUTO", 2018, "N4", "ED 4", N, "電信 = điện tín. 魂 = linh hồn, đọc たましい.", [
    ["魂", "たましい", "tamashii", "linh hồn", "N3"],
    ["声", "こえ", "koe", "giọng", "N4"],
    ["手", "て", "te", "tay", "N5"],
  ]),
  s("b-kachou", "花鳥風月", "かちょうふうげつ", "kachou fuugetsu", "COALAMODE.", "BORUTO", 2018, "N3", "ED 5", N, "Bốn chữ: hoa, chim, gió, trăng. Thành ngữ cảnh đẹp.", [
    ["花", "はな", "hana", "hoa", "N5"],
    ["鳥", "とり", "tori", "chim", "N5"],
    ["月", "つき", "tsuki", "trăng", "N5"],
  ]),
  s("b-laika", "ライカ", "ライカ", "laika", "Bird Bear Hare and Fish", "BORUTO", 2018, "N4", "ED 6", N, "ライカ là tên riêng katakana. Học 犬 và 空 bên cạnh.", [
    ["犬", "いぬ", "inu", "chó", "N5"],
    ["空", "そら", "sora", "trời", "N5"],
    ["星", "ほし", "hoshi", "sao", "N5"],
  ]),
  s("b-polaris", "ポラリス", "ポラリス", "polaris", "ヒトリエ", "BORUTO", 2018, "N4", "ED 7", N, "Polaris = sao Bắc Đẩu. 北極星.", [
    ["星", "ほし", "hoshi", "sao", "N5"],
    ["北", "きた", "kita", "phía bắc", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
  ]),
  s("b-tsuyogari", "強がりLOSER", "つよがりルーザー", "tsuyogari loser", "ЯeaL", "BORUTO", 2019, "N4", "ED 8", N, "強がり = giả vờ mạnh. Loser = người thua.", [
    ["強い", "つよい", "tsuyoi", "mạnh", "N5"],
    ["弱い", "よわい", "yowai", "yếu", "N5"],
    ["心", "こころ", "kokoro", "lòng", "N4"],
  ]),
  s("b-ride", "Ride or Die", "ライドオアダイ", "ride or die", "スカイピース", "BORUTO", 2019, "N4", "ED 9", N, "Ride = cưỡi / đi. Die = chết. Cụm tiếng Anh: đi cùng đến cùng.", [
    ["車", "くるま", "kuruma", "xe", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
    ["一緒", "いっしょ", "issho", "cùng nhau", "N5"],
  ]),
  s("b-mikansei", "未完成な光たち", "みかんせいなひかりたち", "mikansei na hikari-tachi", "福原遥", "BORUTO", 2019, "N3", "ED 10", N, "未完成 = chưa xong. 光 = ánh sáng. たち đánh dấu số nhiều người.", [
    ["光", "ひかり", "hikari", "ánh sáng", "N4"],
    ["まだ", "まだ", "mada", "vẫn chưa", "N5"],
    ["人", "ひと", "hito", "người", "N5"],
  ]),
  s("b-wish", "Wish on", "ウィッシュオン", "wish on", "Longman", "BORUTO", 2020, "N4", "ED 11", N, "Wish = ước. 願う.", [
    ["夢", "ゆめ", "yume", "ước", "N4"],
    ["星", "ほし", "hoshi", "sao", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
  ]),
  s("b-fireworks", "Fireworks", "ファイアーワークス", "fireworks", "FlowBack", "BORUTO", 2020, "N4", "ED 12", N, "Fireworks = pháo hoa = 花火.", [
    ["花火", "はなび", "hanabi", "pháo hoa", "N4"],
    ["夏", "なつ", "natsu", "mùa hè", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
  ]),
  s("b-maybe", "Maybe I", "メイビーアイ", "maybe i", "Seven Billion Dots", "BORUTO", 2020, "N5", "ED 13", N, "Maybe = có lẽ. たぶん. I = 私.", [
    ["たぶん", "たぶん", "tabun", "có lẽ", "N4"],
    ["私", "わたし", "watashi", "tôi", "N5"],
    ["今日", "きょう", "kyou", "hôm nay", "N5"],
  ]),
  s("b-central", "Central", "セントラル", "central", "Ami Sakaguchi", "BORUTO", 2020, "N4", "ED 14", N, "Central = trung tâm. 真ん中.", [
    ["中", "なか", "naka", "bên trong", "N5"],
    ["町", "まち", "machi", "phố", "N5"],
    ["駅", "えき", "eki", "nhà ga", "N5"],
  ]),
  s("b-answers", "Answers", "アンサーズ", "answers", "mol-74", "BORUTO", 2021, "N4", "ED 15", N, "Answers = những câu trả lời. 答え.", [
    ["答え", "こたえ", "kotae", "đáp án", "N4"],
    ["質問", "しつもん", "shitsumon", "câu hỏi", "N4"],
    ["言葉", "ことば", "kotoba", "lời", "N4"],
  ]),
  s("b-signthere", "Sign That You Were There", "サインザットユーワーゼア", "sign that you were there", "halca", "BORUTO", 2021, "N4", "ED 16", N, "Sign = dấu. There = ở đó. そこにいた印.", [
    ["サイン", "サイン", "sain", "dấu", "N5"],
    ["そこ", "そこ", "soko", "ở đó", "N5"],
    ["手", "て", "te", "tay", "N5"],
  ]),
  s("b-who", "Who are you?", "フーアーユー", "who are you", "PELICAN FANCLUB", "BORUTO", 2021, "N5", "ED 17", N, "Who = ai. だれ. You = bạn.", [
    ["だれ", "だれ", "dare", "ai", "N5"],
    ["名前", "なまえ", "namae", "tên", "N5"],
    ["君", "きみ", "kimi", "bạn", "N4"],
  ]),
  s("b-prologue", "Prologue", "プロローグ", "prologue", "Jo1", "BORUTO", 2021, "N4", "ED 18", N, "Prologue = mở đầu. 始まり.", [
    ["始め", "はじめ", "hajime", "bắt đầu", "N5"],
    ["話", "はなし", "hanashi", "chuyện", "N5"],
    ["本", "ほん", "hon", "sách", "N5"],
  ]),
  s("b-voltage", "VOLTAGE", "ボルテージ", "voltage", "Anly", "BORUTO", 2022, "N4", "ED 19", N, "Voltage = điện thế. Katakana ボルテージ.", [
    ["電気", "でんき", "denki", "điện", "N5"],
    ["高い", "たかい", "takai", "cao", "N5"],
    ["音", "おと", "oto", "âm", "N4"],
  ]),
  s("b-twilight", "Twilight Fuzz", "トワイライトファズ", "twilight fuzz", "THIS IS JAPAN", "BORUTO", 2022, "N4", "ED 20", N, "Twilight = chạng vạng. 夕方.", [
    ["夕方", "ゆうがた", "yuugata", "chiều tối", "N5"],
    ["空", "そら", "sora", "trời", "N5"],
    ["オレンジ", "オレンジ", "orenji", "màu cam", "N5"],
  ]),
  s("b-bibou", "ビボウロク", "ビボウロク", "bibouroku", "Lenny code fiction", "BORUTO", 2022, "N3", "ED 21", N, "備忘録 = sổ ghi để khỏi quên. Đọc びぼうろく.", [
    ["ノート", "ノート", "nooto", "vở", "N5"],
    ["書く", "かく", "kaku", "viết", "N5"],
    ["言葉", "ことば", "kotoba", "chữ", "N4"],
  ]),
  s("b-ladder", "Ladder", "ラダー", "ladder", "Anonymouz", "BORUTO", 2022, "N4", "ED 22", N, "Ladder = thang. はしご.", [
    ["上", "うえ", "ue", "phía trên", "N5"],
    ["手", "て", "te", "tay", "N5"],
    ["高い", "たかい", "takai", "cao", "N5"],
  ]),
  s("b-matane", "またね", "またね", "mata ne", "ハンブレッダーズ", "BORUTO", 2023, "N5", "ED 23", N, "またね = hẹn gặp lại. Ending rất dễ.", [
    ["また", "また", "mata", "lại", "N5"],
    ["明日", "あした", "ashita", "ngày mai", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),

  s("db-maka", "魔訶不思議アドベンチャー！", "まかふしぎアドベンチャー", "makafushigi adventure", "高橋洋樹", "ドラゴンボール", 1986, "N4", "OP", D, "Opening Dragon Ball gốc. 不思議 = kỳ lạ. アドベンチャー = cuộc phiêu lưu.", [
    ["不思議", "ふしぎ", "fushigi", "kỳ lạ", "N4"],
    ["冒険", "ぼうけん", "bouken", "phiêu lưu", "N3"],
    ["空", "そら", "sora", "trời", "N5"],
  ]),
  s("db-romantic", "ロマンティックあげるよ", "ロマンティックあげるよ", "romantic ageru yo", "橋本潮", "ドラゴンボール", 1986, "N4", "ED", D, "あげる = đưa cho. Ending dễ, nhịp chậm.", [
    ["あげる", "あげる", "ageru", "cho", "N5"],
    ["好き", "すき", "suki", "thích", "N5"],
    ["あなた", "あなた", "anata", "bạn", "N5"],
  ]),
  s("z-chala", "CHA-LA HEAD-CHA-LA", "チャラヘッチャラ", "cha-la head-cha-la", "影山ヒロノブ", "ドラゴンボールZ", 1989, "N5", "OP 1", D, "Opening Z kinh điển. Điệp khúc là âm thanh, không cần dịch.", [
    ["頭", "あたま", "atama", "đầu", "N5"],
    ["強い", "つよい", "tsuyoi", "mạnh", "N5"],
    ["空", "そら", "sora", "trời", "N5"],
  ]),
  s("z-power", "WE GOTTA POWER", "ウィガッタパワー", "we gotta power", "影山ヒロノブ", "ドラゴンボールZ", 1993, "N4", "OP 2", D, "Opening Z từ khoảng tập 200. Power = sức mạnh = 力.", [
    ["力", "ちから", "chikara", "sức mạnh", "N4"],
    ["僕", "ぼく", "boku", "tôi", "N5"],
    ["星", "ほし", "hoshi", "hành tinh / sao", "N5"],
  ]),
  s("z-zenkai", "でてこいとびきりZENKAIパワー！", "でてこいとびきりゼンカイパワー", "detekoi tobikiri zenkai power", "MANNA", "ドラゴンボールZ", 1989, "N4", "ED 1", D, "でてこい = ra đây đi. ZENKAI là katakana của 全開, hết cỡ.", [
    ["力", "ちから", "chikara", "sức", "N4"],
    ["出る", "でる", "deru", "ra", "N5"],
    ["大きい", "おおきい", "ookii", "to", "N5"],
  ]),
  s("z-hikari", "光の旅", "ひかりのたび", "hikari no tabi", "影山ヒロノブ", "ドラゴンボールZ", 1990, "N4", "ED", D, "光の旅 = chuyến đi của ánh sáng.", [
    ["光", "ひかり", "hikari", "ánh sáng", "N4"],
    ["旅", "たび", "tabi", "chuyến đi", "N4"],
    ["空", "そら", "sora", "trời", "N5"],
  ]),
  s("z-aoikaze", "青い風のHOPE", "あおいかぜのホープ", "aoi kaze no hope", "影山ヒロノブ", "ドラゴンボールZ", 1991, "N4", "ED", D, "青い風 = ngọn gió xanh. HOPE = hy vọng.", [
    ["青", "あお", "ao", "xanh", "N5"],
    ["風", "かぜ", "kaze", "gió", "N5"],
    ["希望", "きぼう", "kibou", "hy vọng", "N3"],
  ]),
  s("z-tenshi", "僕達は天使だった", "ぼくたちはてんしだった", "bokutachi wa tenshi datta", "影山ヒロノブ", "ドラゴンボールZ", 1993, "N4", "ED 2", D, "僕達 = bọn tôi. 天使 = thiên thần. だった = đã từng là.", [
    ["僕", "ぼく", "boku", "tôi", "N5"],
    ["天使", "てんし", "tenshi", "thiên thần", "N3"],
    ["空", "そら", "sora", "trời", "N5"],
  ]),
  s("gt-dandan", "DAN DAN 心魅かれてく", "ダンダンこころひかれてく", "dan dan kokoro hikareteku", "FIELD OF VIEW", "ドラゴンボールGT", 1996, "N4", "OP", D, "Opening duy nhất của GT. 心 = trái tim. DAN DAN = dần dần.", [
    ["心", "こころ", "kokoro", "trái tim", "N4"],
    ["少し", "すこし", "sukoshi", "một chút", "N5"],
    ["星", "ほし", "hoshi", "sao", "N5"],
  ]),
  s("gt-hitori", "ひとりじゃない", "ひとりじゃない", "hitori ja nai", "DEEN", "ドラゴンボールGT", 1996, "N4", "ED 1", D, "一人じゃない = không chỉ một mình.", [
    ["一人", "ひとり", "hitori", "một mình", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
    ["一緒", "いっしょ", "issho", "cùng nhau", "N5"],
  ]),
  s("gt-dontyou", "Don't you see!", "ドントユーシー", "don't you see", "ZARD", "ドラゴンボールGT", 1996, "N4", "ED 2", D, "See = thấy. 見える. Câu Anh: bạn không thấy sao.", [
    ["目", "め", "me", "mắt", "N5"],
    ["空", "そら", "sora", "trời", "N5"],
    ["君", "きみ", "kimi", "bạn", "N4"],
  ]),
  s("gt-velvet", "Blue Velvet", "ブルーベルベット", "blue velvet", "工藤静香", "ドラゴンボールGT", 1997, "N4", "ED 3", D, "Blue = xanh. Velvet = nhung.", [
    ["青", "あお", "ao", "xanh", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
    ["色", "いろ", "iro", "màu", "N5"],
  ]),
  s("gt-sabi", "錆びついたマシンガンで今を撃ち抜こう", "さびついたマシンガンでいまをうちぬこう", "sabitsuita machinegun de ima o uchinukou", "WANDS", "ドラゴンボールGT", 1997, "N3", "ED 4", D, "今 = bây giờ. Tên dài, chỉ cần bắt 今 và 錆びる (gỉ).", [
    ["今", "いま", "ima", "bây giờ", "N5"],
    ["鉄", "てつ", "tetsu", "sắt", "N3"],
    ["手", "て", "te", "tay", "N5"],
  ]),
  s("kai-soul", "Dragon Soul", "ドラゴンソウル", "dragon soul", "谷本貴義", "ドラゴンボール改", 2009, "N4", "OP 1", D, "Opening Kai. Dragon = 竜. Soul = 魂.", [
    ["竜", "りゅう", "ryuu", "rồng", "N3"],
    ["魂", "たましい", "tamashii", "linh hồn", "N3"],
    ["空", "そら", "sora", "trời", "N5"],
  ]),
  s("kai-kuuzen", "空・前・絶・後", "くうぜんぜつご", "kuu zen zetsu go", "谷本貴義", "ドラゴンボール改", 2011, "N3", "OP 2", D, "Thành ngữ 空前絶後: chưa từng có. Bốn chữ Hán.", [
    ["空", "そら", "sora", "trời", "N5"],
    ["前", "まえ", "mae", "trước", "N5"],
    ["後", "あと", "ato", "sau", "N5"],
  ]),
  s("kai-yabure", "ヤ・ブレ・カ・ブレ", "ヤブレカブレ", "ya bure ka bure", "谷本貴義", "ドラゴンボール改", 2009, "N4", "ED 1", D, "Nhịp đếm từng âm. 破れる = rách / vỡ.", [
    ["手", "て", "te", "tay", "N5"],
    ["強い", "つよい", "tsuyoi", "mạnh", "N5"],
    ["声", "こえ", "koe", "giọng", "N4"],
  ]),
  s("kai-hane", "心の羽根", "こころのはね", "kokoro no hane", "チームドラゴン", "ドラゴンボール改", 2010, "N4", "ED 2", D, "心の羽根 = đôi cánh của trái tim.", [
    ["心", "こころ", "kokoro", "trái tim", "N4"],
    ["鳥", "とり", "tori", "chim", "N5"],
    ["空", "そら", "sora", "trời", "N5"],
  ]),
  s("kai-haikei", "拝啓、ツラツストラ", "はいけい ツラツストラ", "haikei tsuratsusutora", "グッドモーニングアメリカ", "ドラゴンボール改", 2010, "N3", "ED 3", D, "拝啓 = kính gửi, mở đầu một lá thư.", [
    ["手紙", "てがみ", "tegami", "lá thư", "N5"],
    ["書く", "かく", "kaku", "viết", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("kai-junjou", "純情", "じゅんじょう", "junjou", "家入レオ", "ドラゴンボール改", 2011, "N3", "ED 4", D, "純情 = trong trẻo, chân thành. Hán-Việt Thuần Tình.", [
    ["心", "こころ", "kokoro", "lòng", "N4"],
    ["好き", "すき", "suki", "thích", "N5"],
    ["本当", "ほんとう", "hontou", "thật", "N5"],
  ]),
  s("kai-ohyeah", "オー・ヤー!!!!!!", "オーヤー", "oh yeah", "Czecho No Republic", "ドラゴンボール改", 2014, "N5", "ED 5", D, "Điệp khúc là ô yeah. Học 声 to.", [
    ["声", "こえ", "koe", "tiếng", "N4"],
    ["大きい", "おおきい", "ookii", "to", "N5"],
    ["今日", "きょう", "kyou", "hôm nay", "N5"],
  ]),
  s("kai-galaxy", "GALAXY", "ギャラクシー", "galaxy", "キュウソネコカミ", "ドラゴンボール改", 2014, "N4", "ED 6", D, "Galaxy = thiên hà. 銀河.", [
    ["星", "ほし", "hoshi", "sao", "N5"],
    ["空", "そら", "sora", "trời", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
  ]),
  s("kai-dontlet", "Don't Let Me Down", "ドントレットミーダウン", "don't let me down", "Gacharic Spin", "ドラゴンボール改", 2015, "N4", "ED 7", D, "Don't let me down = đừng để tôi thất vọng.", [
    ["下", "した", "shita", "phía dưới", "N5"],
    ["手", "て", "te", "tay", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("kai-never", "Never give up!!!", "ネバーギブアップ", "never give up", "Junear", "ドラゴンボール改", 2015, "N4", "ED 8", D, "Never give up = đừng bỏ cuộc. 諦めない.", [
    ["強い", "つよい", "tsuyoi", "mạnh", "N5"],
    ["まだ", "まだ", "mada", "vẫn còn", "N5"],
    ["夢", "ゆめ", "yume", "ước", "N4"],
  ]),
  s("s-chouzetsu", "超絶☆ダイナミック！", "ちょうぜつダイナミック", "chouzetsu dynamic", "吉井和哉", "ドラゴンボール超", 2015, "N4", "OP 1", D, "超 = siêu. Dynamic đọc ダイナミック.", [
    ["超", "ちょう", "chou", "siêu", "N3"],
    ["強い", "つよい", "tsuyoi", "mạnh", "N5"],
    ["空", "そら", "sora", "trời", "N5"],
  ]),
  s("s-genkai", "限界突破×サバイバー", "げんかいとっぱサバイバー", "genkai toppa survivor", "氷川きよし", "ドラゴンボール超", 2017, "N3", "OP 2", D, "限界 = giới hạn. 突破 = phá vỡ. Survivor = người sống sót.", [
    ["限界", "げんかい", "genkai", "giới hạn", "N3"],
    ["強い", "つよい", "tsuyoi", "mạnh", "N5"],
    ["人", "ひと", "hito", "người", "N5"],
  ]),
  s("s-hello", "ハローハローハロー", "ハローハローハロー", "hello hello hello", "グッドモーニングアメリカ", "ドラゴンボール超", 2015, "N5", "ED 1", D, "Hello lặp ba lần. Nhật: こんにちは.", [
    ["こんにちは", "こんにちは", "konnichiwa", "xin chào", "N5"],
    ["朝", "あさ", "asa", "buổi sáng", "N5"],
    ["友達", "ともだち", "tomodachi", "bạn", "N5"],
  ]),
  s("s-starring", "スターリングスター", "スターリングスター", "starring star", "KEYTALK", "ドラゴンボール超", 2015, "N4", "ED 2", D, "Star = 星. Starring = đang tỏa sáng.", [
    ["星", "ほし", "hoshi", "ngôi sao", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
    ["光", "ひかり", "hikari", "ánh sáng", "N4"],
  ]),
  s("s-usubeni", "薄紅", "うすべに", "usubeni", "LACCO TOWER", "ドラゴンボール超", 2016, "N4", "ED 3", D, "薄紅 = hồng nhạt. 薄い + 紅.", [
    ["赤", "あか", "aka", "đỏ", "N5"],
    ["色", "いろ", "iro", "màu", "N5"],
    ["花", "はな", "hana", "hoa", "N5"],
  ]),
  s("s-forever", "フォーエバー・ドリーミング", "フォーバードリーミング", "forever dreaming", "Czecho No Republic", "ドラゴンボール超", 2016, "N4", "ED 4", D, "Forever = mãi mãi. Dreaming = đang mơ.", [
    ["夢", "ゆめ", "yume", "giấc mơ", "N4"],
    ["いつも", "いつも", "itsumo", "luôn luôn", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
  ]),
  s("s-yoka", "よかよかダンス", "よかよかダンス", "yoka yoka dance", "Batten Showjo Tai", "ドラゴンボール超", 2016, "N5", "ED 5", D, "よか là phương ngữ của いい, nghĩa là tốt. Dance = ダンス.", [
    ["いい", "いい", "ii", "tốt", "N5"],
    ["ダンス", "ダンス", "dansu", "điệu nhảy", "N5"],
    ["手", "て", "te", "tay", "N5"],
  ]),
  s("s-chaohan", "炒飯MUSIC", "チャーハンミュージック", "chaahan music", "アルカラ", "ドラゴンボール超", 2016, "N5", "ED 6", D, "炒飯 = cơm chiên. MUSIC = 音楽. Bài dễ và vui.", [
    ["ご飯", "ごはん", "gohan", "cơm", "N5"],
    ["食べる", "たべる", "taberu", "ăn", "N5"],
    ["音楽", "おんがく", "ongaku", "âm nhạc", "N5"],
  ]),
  s("s-aku", "悪の天使と正義の悪魔", "あくのてんしとせいぎのあくま", "aku no tenshi to seigi no akuma", "THE COLLECTORS", "ドラゴンボール超", 2017, "N3", "ED 7", D, "悪 = ác. 正義 = chính nghĩa. 天使 và 悪魔 đối nhau.", [
    ["天使", "てんし", "tenshi", "thiên thần", "N3"],
    ["悪魔", "あくま", "akuma", "ác quỷ", "N3"],
    ["人", "ひと", "hito", "người", "N5"],
  ]),
  s("s-boogie", "Boogie Back", "ブギーバック", "boogie back", "井上実優", "ドラゴンボール超", 2017, "N4", "ED 8", D, "Back = trở lại. 戻る.", [
    ["戻る", "もどる", "modoru", "quay lại", "N4"],
    ["音楽", "おんがく", "ongaku", "nhạc", "N5"],
    ["夜", "よる", "yoru", "đêm", "N5"],
  ]),
  s("s-haruka", "遥", "はるか", "haruka", "LACCO TOWER", "ドラゴンボール超", 2017, "N4", "ED 9", D, "遥 = xa. Cùng chữ với 遥か.", [
    ["遠い", "とおい", "tooi", "xa", "N5"],
    ["空", "そら", "sora", "trời", "N5"],
    ["道", "みち", "michi", "đường", "N5"],
  ]),
  s("s-mado", "70cm四方の窓辺", "ななじゅっセンチしほうのまどべ", "70cm shihou no madobe", "ROTTENGRAFFTY", "ドラゴンボール超", 2018, "N4", "ED 10", D, "窓辺 = bên cửa sổ. 四方 = bốn phía.", [
    ["窓", "まど", "mado", "cửa sổ", "N5"],
    ["部屋", "へや", "heya", "phòng", "N5"],
    ["見る", "みる", "miru", "nhìn", "N5"],
  ]),
  s("s-lagrima", "LÁGRIMA", "ラグリマ", "lagrima", "OnePixcel", "ドラゴンボール超", 2018, "N4", "ED 11", D, "Lágrima tiếng Tây Ban Nha nghĩa là nước mắt. Nhật: 涙.", [
    ["涙", "なみだ", "namida", "nước mắt", "N4"],
    ["目", "め", "me", "mắt", "N5"],
    ["悲しい", "かなしい", "kanashii", "buồn", "N4"],
  ]),
  s("d-jaka", "ジャカ☆ジャーン", "ジャカジャーン", "jaka jaan", "Zedd & C&K", "ドラゴンボールDAIMA", 2024, "N5", "OP", D, "Opening Daima. ジャカジャーン là tiếng kèn mở màn.", [
    ["音", "おと", "oto", "âm thanh", "N4"],
    ["始める", "はじめる", "hajimeru", "bắt đầu", "N5"],
    ["小さい", "ちいさい", "chiisai", "nhỏ", "N5"],
  ]),
];
