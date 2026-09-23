import { FRANCHISE_SONGS } from "./songs-franchise";

export type SongLevel = "N5" | "N4" | "N3";

export interface SongBit {
  ch: string;
  kana: string;
  vi: string;
}

export interface SongVocab {
  word: string;
  kana: string;
  romaji: string;
  meaning: string;
  level: SongLevel;
}

export interface SongLine {
  jp: string;
  kana: string;
  romaji: string;
  vi: string;
}

export interface AnimeSong {
  id: string;
  title: string;
  titleKana: string;
  romaji: string;
  artist: string;
  anime: string;
  year: number;
  level: SongLevel;
  why: string;
  focus: string;
  /** Cụm tìm bản chính thức trên YouTube. */
  search: string;
  bits: SongBit[];
  vocab: SongVocab[];
  /** Câu luyện tự viết, không phải lời bài hát. */
  lines: SongLine[];
  series?: string;
  kind?: string;
}

const FEATURED: AnimeSong[] = [
  {
    id: "stay-with-me",
    title: "真夜中のドア",
    titleKana: "まよなかのドア",
    romaji: "mayonaka no door — stay with me",
    artist: "松原みき",
    anime: "Stay with Me",
    year: 1979,
    level: "N4",
    series: "Nổi bật",
    kind: "City pop",
    why: "Bài Stay with Me. Điệp khúc tiếng Anh, lời Nhật chậm. Hát lại rất mạnh từ 2020.",
    focus: "Nhớ 真夜中 (nửa đêm) và ドア. Câu tiếng Anh chỉ có stay with me — phần còn lại nghe hiragana.",
    search: "真夜中のドア Stay with Me 松原みき official",
    bits: [
      { ch: "真夜中", kana: "まよなか", vi: "nửa đêm" },
      { ch: "ドア", kana: "ドア", vi: "cánh cửa" },
    ],
    vocab: [
      { word: "真夜中", kana: "まよなか", romaji: "mayonaka", meaning: "nửa đêm", level: "N4" },
      { word: "ドア", kana: "ドア", romaji: "doa", meaning: "cửa", level: "N5" },
      { word: "私", kana: "わたし", romaji: "watashi", meaning: "tôi", level: "N5" },
      { word: "帰る", kana: "かえる", romaji: "kaeru", meaning: "về", level: "N5" },
      { word: "季節", kana: "きせつ", romaji: "kisetsu", meaning: "mùa", level: "N4" },
    ],
    lines: [
      { jp: "真夜中にドアを開けます。", kana: "まよなかにドアをあけます。", romaji: "mayonaka ni doa o akemasu", vi: "Nửa đêm tôi mở cửa." },
      { jp: "私は帰りません。", kana: "わたしはかえりません。", romaji: "watashi wa kaerimasen", vi: "Tôi không về." },
    ],
  },
  {
    id: "sanpo",
    title: "さんぽ",
    titleKana: "さんぽ",
    romaji: "sanpo",
    artist: "井上あずみ",
    anime: "となりのトトロ",
    year: 1988,
    level: "N5",
    why: "Bài đi bộ kinh điển. Nhịp chậm, từ toàn N5.",
    focus: "Nghe あるく, みち, うた. Hát theo từng nhịp mora.",
    search: "さんぽ となりのトトロ official",
    bits: [{ ch: "散歩", kana: "さんぽ", vi: "đi dạo" }],
    vocab: [
      { word: "散歩", kana: "さんぽ", romaji: "sanpo", meaning: "đi dạo", level: "N5" },
      { word: "歩く", kana: "あるく", romaji: "aruku", meaning: "đi bộ", level: "N5" },
      { word: "道", kana: "みち", romaji: "michi", meaning: "con đường", level: "N5" },
      { word: "歌", kana: "うた", romaji: "uta", meaning: "bài hát", level: "N5" },
      { word: "今日", kana: "きょう", romaji: "kyou", meaning: "hôm nay", level: "N5" },
    ],
    lines: [
      { jp: "今日は公園を歩きます。", kana: "きょうはこうえんをあるきます。", romaji: "kyou wa kouen o arukimasu", vi: "Hôm nay tôi đi bộ ở công viên." },
      { jp: "道で歌を歌います。", kana: "みちでうたをうたいます。", romaji: "michi de uta o utaimasu", vi: "Tôi hát trên đường." },
    ],
  },
  {
    id: "ponyo",
    title: "崖の上のポニョ",
    titleKana: "がけのうえのポニョ",
    romaji: "gake no ue no ponyo",
    artist: "藤岡藤巻と大橋のぞみ",
    anime: "崖の上のポニョ",
    year: 2008,
    level: "N5",
    why: "Điệp khúc ngắn, lặp tên và từ biển. Dễ hát theo.",
    focus: "の nối danh từ: 崖の上 = trên vách đá.",
    search: "崖の上のポニョ official",
    bits: [
      { ch: "崖", kana: "がけ", vi: "vách đá" },
      { ch: "上", kana: "うえ", vi: "phía trên" },
    ],
    vocab: [
      { word: "海", kana: "うみ", romaji: "umi", meaning: "biển", level: "N5" },
      { word: "魚", kana: "さかな", romaji: "sakana", meaning: "cá", level: "N5" },
      { word: "上", kana: "うえ", romaji: "ue", meaning: "trên", level: "N5" },
      { word: "好き", kana: "すき", romaji: "suki", meaning: "thích", level: "N5" },
      { word: "女の子", kana: "おんなのこ", romaji: "onna no ko", meaning: "bé gái", level: "N5" },
    ],
    lines: [
      { jp: "海に魚がいます。", kana: "うみにさかながいます。", romaji: "umi ni sakana ga imasu", vi: "Dưới biển có cá." },
      { jp: "ポニョが好きです。", kana: "ポニョがすきです。", romaji: "ponyo ga suki desu", vi: "Tôi thích Ponyo." },
    ],
  },
  {
    id: "itsumo",
    title: "いつも何度でも",
    titleKana: "いつもなんどでも",
    romaji: "itsumo nando demo",
    artist: "木村弓",
    anime: "千と千尋の神隠し",
    year: 2001,
    level: "N4",
    why: "Bài cuối Spirited Away. Học 何度でも = bao nhiêu lần cũng được.",
    focus: "でも sau từ hỏi: 何度でも, どこでも, だれでも.",
    search: "いつも何度でも 木村弓 official",
    bits: [
      { ch: "何度", kana: "なんど", vi: "bao nhiêu lần" },
    ],
    vocab: [
      { word: "いつも", kana: "いつも", romaji: "itsumo", meaning: "luôn luôn", level: "N5" },
      { word: "何度", kana: "なんど", romaji: "nando", meaning: "bao nhiêu lần", level: "N4" },
      { word: "会う", kana: "あう", romaji: "au", meaning: "gặp", level: "N5" },
      { word: "名前", kana: "なまえ", romaji: "namae", meaning: "tên", level: "N5" },
      { word: "帰る", kana: "かえる", romaji: "kaeru", meaning: "về", level: "N5" },
    ],
    lines: [
      { jp: "何度でも会いたいです。", kana: "なんどでもあいたいです。", romaji: "nando demo aitai desu", vi: "Tôi muốn gặp bao nhiêu lần cũng được." },
      { jp: "名前を忘れません。", kana: "なまえをわすれません。", romaji: "namae o wasuremasen", vi: "Tôi không quên tên." },
    ],
  },
  {
    id: "zenzenzense",
    title: "前前前世",
    titleKana: "ぜんぜんぜんせ",
    romaji: "zenzenzense",
    artist: "RADWIMPS",
    anime: "君の名は。",
    year: 2016,
    level: "N4",
    why: "Nhạc phim Your Name. Tên bài là một bài kanji: nhiều kiếp trước.",
    focus: "前 = trước. 世 = đời. Ba chữ 前 nhấn 'rất xa'.",
    search: "前前前世 RADWIMPS official",
    bits: [
      { ch: "前", kana: "ぜん / まえ", vi: "trước · Tiền" },
      { ch: "世", kana: "せ / よ", vi: "đời · Thế" },
    ],
    vocab: [
      { word: "前", kana: "まえ", romaji: "mae", meaning: "phía trước / trước đây", level: "N5" },
      { word: "名前", kana: "なまえ", romaji: "namae", meaning: "tên", level: "N5" },
      { word: "また", kana: "また", romaji: "mata", meaning: "lại", level: "N5" },
      { word: "会う", kana: "あう", romaji: "au", meaning: "gặp", level: "N5" },
      { word: "好き", kana: "すき", romaji: "suki", meaning: "thích", level: "N5" },
    ],
    lines: [
      { jp: "また会いたいです。", kana: "またあいたいです。", romaji: "mata aitai desu", vi: "Tôi muốn gặp lại." },
      { jp: "あなたの名前が好きです。", kana: "あなたのなまえがすきです。", romaji: "anata no namae ga suki desu", vi: "Tôi thích tên của bạn." },
    ],
  },
  {
    id: "hanabi",
    title: "打上花火",
    titleKana: "うちあげはなび",
    romaji: "uchiage hanabi",
    artist: "DAOKO × 米津玄師",
    anime: "打ち上げ花火、下から見るか？横から見るか？",
    year: 2017,
    level: "N4",
    why: "Bài pháo hoa rất phổ biến. Học 花火 và mùa hè.",
    focus: "Danh từ ghép: 花 + 火 = pháo hoa. 打上 = bắn lên.",
    search: "打上花火 DAOKO 米津玄師 official",
    bits: [
      { ch: "打上", kana: "うちあげ", vi: "bắn lên" },
      { ch: "花火", kana: "はなび", vi: "pháo hoa · Hoa Hỏa" },
    ],
    vocab: [
      { word: "花火", kana: "はなび", romaji: "hanabi", meaning: "pháo hoa", level: "N4" },
      { word: "夏", kana: "なつ", romaji: "natsu", meaning: "mùa hè", level: "N5" },
      { word: "夜", kana: "よる", romaji: "yoru", meaning: "ban đêm", level: "N5" },
      { word: "見る", kana: "みる", romaji: "miru", meaning: "xem", level: "N5" },
      { word: "空", kana: "そら", romaji: "sora", meaning: "bầu trời", level: "N5" },
    ],
    lines: [
      { jp: "夏の夜に花火を見ます。", kana: "なつのよるにはなびをみます。", romaji: "natsu no yoru ni hanabi o mimasu", vi: "Đêm hè tôi xem pháo hoa." },
      { jp: "空が明るいです。", kana: "そらがあかるいです。", romaji: "sora ga akarui desu", vi: "Bầu trời sáng." },
    ],
  },
  {
    id: "gurenge",
    title: "紅蓮華",
    titleKana: "ぐれんげ",
    romaji: "gurenge",
    artist: "LiSA",
    anime: "鬼滅の刃",
    year: 2019,
    level: "N4",
    why: "Opening Thanh gươm diệt quỷ. Bài anime được nghe nhiều nhất những năm gần đây.",
    focus: "Tên bài: 紅 liên hoa đỏ. Khi nghe, bắt 心 và 夢 trước, đừng đuổi cả câu.",
    search: "紅蓮華 LiSA official",
    bits: [
      { ch: "紅", kana: "くれない", vi: "đỏ thẫm · Hồng" },
      { ch: "蓮", kana: "はす", vi: "hoa sen · Liên" },
      { ch: "華", kana: "はな", vi: "hoa · Hoa" },
    ],
    vocab: [
      { word: "心", kana: "こころ", romaji: "kokoro", meaning: "trái tim", level: "N4" },
      { word: "強い", kana: "つよい", romaji: "tsuyoi", meaning: "mạnh", level: "N5" },
      { word: "夢", kana: "ゆめ", romaji: "yume", meaning: "giấc mơ", level: "N4" },
      { word: "夜", kana: "よる", romaji: "yoru", meaning: "ban đêm", level: "N5" },
      { word: "人", kana: "ひと", romaji: "hito", meaning: "người", level: "N5" },
    ],
    lines: [
      { jp: "心が強い人です。", kana: "こころがつよいひとです。", romaji: "kokoro ga tsuyoi hito desu", vi: "Là người có trái tim mạnh." },
      { jp: "夜に夢を見ます。", kana: "よるにゆめをみます。", romaji: "yoru ni yume o mimasu", vi: "Ban đêm tôi nằm mơ." },
    ],
  },
  {
    id: "homura",
    title: "炎",
    titleKana: "ほむら",
    romaji: "homura",
    artist: "LiSA",
    anime: "鬼滅の刃 無限列車編",
    year: 2020,
    level: "N4",
    why: "Nhạc phim Chuyến tàu vô tận. Một kanji, một bài.",
    focus: "炎 đọc ほむら ở đây (kun), không phải ほのお. Cùng nghĩa lửa.",
    search: "炎 LiSA 劇場版 official",
    bits: [{ ch: "炎", kana: "ほむら", vi: "ngọn lửa · Viêm" }],
    vocab: [
      { word: "炎", kana: "ほのお", romaji: "honoo", meaning: "ngọn lửa", level: "N4" },
      { word: "守る", kana: "まもる", romaji: "mamoru", meaning: "bảo vệ", level: "N4" },
      { word: "泣く", kana: "なく", romaji: "naku", meaning: "khóc", level: "N4" },
      { word: "友達", kana: "ともだち", romaji: "tomodachi", meaning: "bạn", level: "N5" },
      { word: "行く", kana: "いく", romaji: "iku", meaning: "đi", level: "N5" },
    ],
    lines: [
      { jp: "友達を守ります。", kana: "ともだちをまもります。", romaji: "tomodachi o mamorimasu", vi: "Tôi bảo vệ bạn." },
      { jp: "火が強いです。", kana: "ひがつよいです。", romaji: "hi ga tsuyoi desu", vi: "Lửa mạnh." },
    ],
  },
  {
    id: "mixed-nuts",
    title: "ミックスナッツ",
    titleKana: "ミックスナッツ",
    romaji: "mikkusu nattsu",
    artist: "Official髭男dism",
    anime: "SPY×FAMILY",
    year: 2022,
    level: "N4",
    why: "Opening Spy x Family. Nhiều từ mượn katakana, hợp người mới.",
    focus: "Katakana: ミックス, ナッツ, ファミリー. Kanji: 家族.",
    search: "ミックスナッツ Official髭男dism official",
    bits: [{ ch: "家族", kana: "かぞく", vi: "gia đình · Gia Tộc" }],
    vocab: [
      { word: "家族", kana: "かぞく", romaji: "kazoku", meaning: "gia đình", level: "N4" },
      { word: "今日", kana: "きょう", romaji: "kyou", meaning: "hôm nay", level: "N5" },
      { word: "笑う", kana: "わらう", romaji: "warau", meaning: "cười", level: "N4" },
      { word: "秘密", kana: "ひみつ", romaji: "himitsu", meaning: "bí mật", level: "N4" },
      { word: "一緒", kana: "いっしょ", romaji: "issho", meaning: "cùng nhau", level: "N5" },
    ],
    lines: [
      { jp: "家族と一緒に笑います。", kana: "かぞくといっしょにわらいます。", romaji: "kazoku to issho ni waraimasu", vi: "Tôi cười cùng gia đình." },
      { jp: "秘密があります。", kana: "ひみつがあります。", romaji: "himitsu ga arimasu", vi: "Có một bí mật." },
    ],
  },
  {
    id: "idol",
    title: "アイドル",
    titleKana: "アイドル",
    romaji: "aidoru",
    artist: "YOASOBI",
    anime: "【推しの子】",
    year: 2023,
    level: "N3",
    why: "Opening Oshi no Ko, lan rất rộng. Học từ bài này ở mức từ, chưa cần cả câu hát.",
    focus: "アイドル là katakana. Đối lập 嘘 và 本当.",
    search: "アイドル YOASOBI official",
    bits: [{ ch: "嘘", kana: "うそ", vi: "điều nói dối" }],
    vocab: [
      { word: "嘘", kana: "うそ", romaji: "uso", meaning: "nói dối", level: "N4" },
      { word: "本当", kana: "ほんとう", romaji: "hontou", meaning: "thật", level: "N5" },
      { word: "好き", kana: "すき", romaji: "suki", meaning: "thích", level: "N5" },
      { word: "目", kana: "め", romaji: "me", meaning: "mắt", level: "N5" },
      { word: "歌", kana: "うた", romaji: "uta", meaning: "bài hát", level: "N5" },
    ],
    lines: [
      { jp: "それは本当ですか。", kana: "それはほんとうですか。", romaji: "sore wa hontou desu ka", vi: "Chuyện đó có thật không?" },
      { jp: "嘘は好きじゃないです。", kana: "うそはすきじゃないです。", romaji: "uso wa suki janai desu", vi: "Tôi không thích nói dối." },
    ],
  },
  {
    id: "aoi",
    title: "青のすみか",
    titleKana: "あおのすみか",
    romaji: "ao no sumika",
    artist: "キタニタツヤ",
    anime: "呪術廻戦",
    year: 2023,
    level: "N4",
    why: "Opening Jujutsu Kaisen phần Hội chú thuật. Tên bài là một mẫu の.",
    focus: "青のすみか = nơi ở của màu xanh. すみか = chỗ ở.",
    search: "青のすみか キタニタツヤ official",
    bits: [
      { ch: "青", kana: "あお", vi: "xanh · Thanh" },
      { ch: "住処", kana: "すみか", vi: "nơi ở" },
    ],
    vocab: [
      { word: "青", kana: "あお", romaji: "ao", meaning: "màu xanh", level: "N5" },
      { word: "空", kana: "そら", romaji: "sora", meaning: "bầu trời", level: "N5" },
      { word: "君", kana: "きみ", romaji: "kimi", meaning: "bạn (thân)", level: "N4" },
      { word: "世界", kana: "せかい", romaji: "sekai", meaning: "thế giới", level: "N4" },
      { word: "行く", kana: "いく", romaji: "iku", meaning: "đi", level: "N5" },
    ],
    lines: [
      { jp: "空が青いです。", kana: "そらがあおいです。", romaji: "sora ga aoi desu", vi: "Trời xanh." },
      { jp: "君と世界を見たいです。", kana: "きみとせかいをみたいです。", romaji: "kimi to sekai o mitai desu", vi: "Tôi muốn xem thế giới cùng bạn." },
    ],
  },
  {
    id: "silhouette",
    title: "シルエット",
    titleKana: "シルエット",
    romaji: "shiruetto",
    artist: "KANA-BOON",
    anime: "NARUTO 疾風伝",
    year: 2014,
    level: "N4",
    series: "Naruto",
    kind: "OP",
    why: "Opening Naruto lâu đời vẫn được nghe. Tên bài là katakana của silhouette.",
    focus: "Từ mượn シルエット. Kanji nên lấy: 友達, 走る, 夢.",
    search: "シルエット KANA-BOON NARUTO official",
    bits: [{ ch: "友達", kana: "ともだち", vi: "bạn" }],
    vocab: [
      { word: "友達", kana: "ともだち", romaji: "tomodachi", meaning: "bạn", level: "N5" },
      { word: "走る", kana: "はしる", romaji: "hashiru", meaning: "chạy", level: "N5" },
      { word: "夢", kana: "ゆめ", romaji: "yume", meaning: "ước mơ", level: "N4" },
      { word: "影", kana: "かげ", romaji: "kage", meaning: "cái bóng", level: "N3" },
      { word: "一緒", kana: "いっしょ", romaji: "issho", meaning: "cùng nhau", level: "N5" },
    ],
    lines: [
      { jp: "友達と一緒に走ります。", kana: "ともだちといっしょにはしります。", romaji: "tomodachi to issho ni hashirimasu", vi: "Tôi chạy cùng bạn." },
      { jp: "夢があります。", kana: "ゆめがあります。", romaji: "yume ga arimasu", vi: "Tôi có một ước mơ." },
    ],
  },
  {
    id: "shinjidai",
    title: "新時代",
    titleKana: "しんじだい",
    romaji: "shin jidai",
    artist: "Ado",
    anime: "ONE PIECE FILM RED",
    year: 2022,
    level: "N4",
    why: "Nhạc phim One Piece Film Red. Tên bài là Hán-Việt Tân Thời Đại.",
    focus: "新 = mới (on: しん). 時代 = thời đại. Ghép chữ thì đọc on.",
    search: "新時代 Ado ONE PIECE official",
    bits: [
      { ch: "新", kana: "しん", vi: "mới · Tân" },
      { ch: "時代", kana: "じだい", vi: "thời đại · Thời Đại" },
    ],
    vocab: [
      { word: "新しい", kana: "あたらしい", romaji: "atarashii", meaning: "mới", level: "N5" },
      { word: "時代", kana: "じだい", romaji: "jidai", meaning: "thời đại", level: "N4" },
      { word: "海", kana: "うみ", romaji: "umi", meaning: "biển", level: "N5" },
      { word: "歌", kana: "うた", romaji: "uta", meaning: "bài hát", level: "N5" },
      { word: "世界", kana: "せかい", romaji: "sekai", meaning: "thế giới", level: "N4" },
    ],
    lines: [
      { jp: "新しい歌を聞きます。", kana: "あたらしいうたをききます。", romaji: "atarashii uta o kikimasu", vi: "Tôi nghe một bài hát mới." },
      { jp: "海の向こうに世界があります。", kana: "うみのむこうにせかいがあります。", romaji: "umi no mukou ni sekai ga arimasu", vi: "Bên kia biển có cả một thế giới." },
    ],
  },
  {
    id: "peace-sign",
    title: "ピースサイン",
    titleKana: "ピースサイン",
    romaji: "piisu sain",
    artist: "米津玄師",
    anime: "僕のヒーローアカデミア",
    year: 2017,
    level: "N4",
    why: "Opening My Hero Academia. Gần hết tên bài là katakana.",
    focus: "ピース = peace, サイン = sign. Thêm ヒーロー, 明日.",
    search: "ピースサイン 米津玄師 ヒロアカ official",
    bits: [{ ch: "僕", kana: "ぼく", vi: "tôi (nam)" }],
    vocab: [
      { word: "ヒーロー", kana: "ヒーロー", romaji: "hirou", meaning: "anh hùng", level: "N5" },
      { word: "明日", kana: "あした", romaji: "ashita", meaning: "ngày mai", level: "N5" },
      { word: "手", kana: "て", romaji: "te", meaning: "tay", level: "N5" },
      { word: "友達", kana: "ともだち", romaji: "tomodachi", meaning: "bạn", level: "N5" },
      { word: "僕", kana: "ぼく", romaji: "boku", meaning: "tôi", level: "N5" },
    ],
    lines: [
      { jp: "明日、友達に会います。", kana: "あした、ともだちにあいます。", romaji: "ashita, tomodachi ni aimasu", vi: "Ngày mai tôi gặp bạn." },
      { jp: "僕はヒーローになりたいです。", kana: "ぼくはヒーローになりたいです。", romaji: "boku wa hiirou ni naritai desu", vi: "Tôi muốn trở thành anh hùng." },
    ],
  },
  {
    id: "yuusha",
    title: "勇者",
    titleKana: "ゆうしゃ",
    romaji: "yuusha",
    artist: "YOASOBI",
    anime: "葬送のフリーレン",
    year: 2023,
    level: "N4",
    why: "Opening Frieren. Một từ Hán-Việt: Dũng Giả.",
    focus: "勇 + 者. Nghe chậm và tìm 友達, 旅.",
    search: "勇者 YOASOBI フリーレン official",
    bits: [
      { ch: "勇", kana: "ゆう", vi: "dũng cảm · Dũng" },
      { ch: "者", kana: "しゃ", vi: "người · Giả" },
    ],
    vocab: [
      { word: "勇者", kana: "ゆうしゃ", romaji: "yuusha", meaning: "dũng giả", level: "N4" },
      { word: "魔法", kana: "まほう", romaji: "mahou", meaning: "phép thuật", level: "N4" },
      { word: "旅", kana: "たび", romaji: "tabi", meaning: "chuyến đi", level: "N4" },
      { word: "友達", kana: "ともだち", romaji: "tomodachi", meaning: "bạn", level: "N5" },
      { word: "終わる", kana: "おわる", romaji: "owaru", meaning: "kết thúc", level: "N5" },
    ],
    lines: [
      { jp: "長い旅が終わりました。", kana: "ながいたびがおわりました。", romaji: "nagai tabi ga owarimashita", vi: "Chuyến đi dài đã hết." },
      { jp: "魔法が好きです。", kana: "まほうがすきです。", romaji: "mahou ga suki desu", vi: "Tôi thích phép thuật." },
    ],
  },
  {
    id: "guren",
    title: "紅蓮の弓矢",
    titleKana: "ぐれんのゆみや",
    romaji: "guren no yumiya",
    artist: "Linked Horizon",
    anime: "進撃の巨人",
    year: 2013,
    level: "N3",
    why: "Opening Attack on Titan. Hơi khó, học tên bài và 4 từ là đủ.",
    focus: "の nối: cung tên của sen đỏ. 弓 + 矢 = cung và tên.",
    search: "紅蓮の弓矢 Linked Horizon official",
    bits: [
      { ch: "紅蓮", kana: "ぐれん", vi: "sen đỏ · Hồng Liên" },
      { ch: "弓", kana: "ゆみ", vi: "cung · Cung" },
      { ch: "矢", kana: "や", vi: "tên · Thỉ" },
    ],
    vocab: [
      { word: "弓", kana: "ゆみ", romaji: "yumi", meaning: "cái cung", level: "N3" },
      { word: "矢", kana: "や", romaji: "ya", meaning: "mũi tên", level: "N3" },
      { word: "人", kana: "ひと", romaji: "hito", meaning: "người", level: "N5" },
      { word: "壁", kana: "かべ", romaji: "kabe", meaning: "bức tường", level: "N4" },
      { word: "自由", kana: "じゆう", romaji: "jiyuu", meaning: "tự do", level: "N4" },
    ],
    lines: [
      { jp: "壁の向こうに行きます。", kana: "かべのむこうにいきます。", romaji: "kabe no mukou ni ikimasu", vi: "Tôi đi ra phía bên kia tường." },
      { jp: "自由がほしいです。", kana: "じゆうがほしいです。", romaji: "jiyuu ga hoshii desu", vi: "Tôi muốn tự do." },
    ],
  },
  {
    id: "kaibutsu",
    title: "怪物",
    titleKana: "かいぶつ",
    romaji: "kaibutsu",
    artist: "YOASOBI",
    anime: "BEASTARS",
    year: 2021,
    level: "N4",
    why: "Opening Beastars. Hai kanji, nghĩa thấy ngay: quái vật.",
    focus: "怪 + 物. Hán-Việt Quái Vật.",
    search: "怪物 YOASOBI BEASTARS official",
    bits: [
      { ch: "怪", kana: "かい", vi: "kỳ lạ · Quái" },
      { ch: "物", kana: "ぶつ", vi: "vật · Vật" },
    ],
    vocab: [
      { word: "怪物", kana: "かいぶつ", romaji: "kaibutsu", meaning: "quái vật", level: "N3" },
      { word: "夜", kana: "よる", romaji: "yoru", meaning: "đêm", level: "N5" },
      { word: "心", kana: "こころ", romaji: "kokoro", meaning: "lòng", level: "N4" },
      { word: "食べる", kana: "たべる", romaji: "taberu", meaning: "ăn", level: "N5" },
      { word: "怖い", kana: "こわい", romaji: "kowai", meaning: "đáng sợ", level: "N4" },
    ],
    lines: [
      { jp: "夜は少し怖いです。", kana: "よるはすこしこわいです。", romaji: "yoru wa sukoshi kowai desu", vi: "Ban đêm hơi đáng sợ." },
      { jp: "ご飯を食べます。", kana: "ごはんをたべます。", romaji: "gohan o tabemasu", vi: "Tôi ăn cơm." },
    ],
  },
];

export const SONGS: AnimeSong[] = [...FEATURED, ...FRANCHISE_SONGS];

export function songById(id: string) {
  return SONGS.find((s) => s.id === id);
}
