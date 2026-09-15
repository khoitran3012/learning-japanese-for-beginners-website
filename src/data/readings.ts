export const READINGS: Array<{
  id: string;
  title: string;
  level: "N5" | "N4";
  jp: string;
  kana: string;
  romaji: string;
  vi: string;
  questions: { q: string; options: string[]; answer: number; explain: string }[];
}> = [
  {
    id: "rd-n5-01",
    title: "Buổi sáng của Yumi",
    level: "N5",
    jp: "ゆみさんは毎朝七時に起きます。朝ごはんを食べてから学校へ行きます。教室で日本語を勉強します。先生はとてもやさしいです。",
    kana: "ゆみさんはまいあさしちじにおきます。あさごはんをたべてからがっこうへいきます。きょうしつでにほんごをべんきょうします。せんせいはとてもやさしいです。",
    romaji: "Yumi-san wa maiasa shichiji ni okimasu. Asagohan o tabete kara gakkou e ikimasu. Kyoushitsu de nihongo o benkyou shimasu. Sensei wa totemo yasashii desu.",
    vi: "Yumi dậy lúc bảy giờ mỗi sáng. Ăn sáng xong rồi đến trường. Ở lớp học tiếng Nhật. Cô giáo rất dịu dàng.",
    questions: [
      {
        q: "ゆみさんは何時に起きますか。",
        options: ["六時", "七時", "八時", "九時"],
        answer: 1,
        explain: "Câu đầu: 毎朝七時に起きます.",
      },
      {
        q: "学校で何を勉強しますか。",
        options: ["英語", "数学", "日本語", "歴史"],
        answer: 2,
        explain: "教室で日本語を勉強します.",
      },
    ],
  },
  {
    id: "rd-n5-02",
    title: "Mua táo ở siêu thị",
    level: "N5",
    jp: "けんさんはスーパーへ行きます。りんごが安いです。けんさんは赤いりんごを五つ買います。家へ帰って家族と食べます。",
    kana: "けんさんはスーパーへいきます。りんごがやすいです。けんさんはあかいりんごをいつつかいます。いえへかえってかぞくとたべます。",
    romaji: "Ken-san wa suupaa e ikimasu. Ringo ga yasui desu. Ken-san wa akai ringo o itsutsu kaimasu. Ie e kaette kazoku to tabemasu.",
    vi: "Ken đến siêu thị. Táo đang rẻ. Ken mua năm quả táo đỏ. Về nhà ăn cùng gia đình.",
    questions: [
      {
        q: "けんさんは何を買いますか。",
        options: ["パン", "赤いりんご", "牛乳", "魚"],
        answer: 1,
        explain: "赤いりんごを五つ買います.",
      },
      {
        q: "りんごは高いですか。",
        options: ["はい、高いです", "いいえ、安いです", "分かりません", "五つです"],
        answer: 1,
        explain: "りんごが安いです.",
      },
    ],
  },
  {
    id: "rd-n5-03",
    title: "Ngày mưa ra ga",
    level: "N5",
    jp: "きょうは雨です。空が暗いです。わたしは黄色い傘を持って駅まで歩きます。電車は少し混んでいます。家に帰ると母がお茶を入れてくれました。",
    kana: "きょうはあめです。そらがくらいです。わたしはきいろいかさをもってえきまであるきます。でんしゃはすこしこんでいます。いえにかえるとははがおちゃをいれてくれました。",
    romaji: "Kyou wa ame desu. Sora ga kurai desu. Watashi wa kiiroi kasa o motte eki made arukimasu. Densha wa sukoshi konde imasu. Ie ni kaeru to haha ga ocha o irete kuremashita.",
    vi: "Hôm nay trời mưa. Bầu trời tối. Tôi cầm ô vàng đi bộ tới ga. Tàu hơi đông. Về nhà mẹ pha trà cho tôi.",
    questions: [
      {
        q: "わたしは何を持っていますか。",
        options: ["赤い傘", "黄色い傘", "黒い鞄", "白い花"],
        answer: 1,
        explain: "黄色い傘を持って駅まで歩きます.",
      },
      {
        q: "家に帰ると、誰がお茶を入れてくれましたか。",
        options: ["父", "先生", "母", "友達"],
        answer: 2,
        explain: "母がお茶を入れてくれました.",
      },
    ],
  },
  {
    id: "rd-n4-01",
    title: "Lỡ tàu buổi sáng",
    level: "N4",
    jp: "けさ雪でバスが遅れました。走ったのに、電車に間に合いませんでした。会社に連絡して、次の電車で行きました。会議には少し遅れましたが、資料は昨夜準備しておきました。",
    kana: "けさゆきでバスがおくれました。はしったのに、でんしゃにまにあいませんでした。かいしゃにれんらくして、つぎのでんしゃでいきました。かいぎにはすこしおくれましたが、しりょうはさくやじゅんびしておきました。",
    romaji: "Kesa yuki de basu ga okuremashita. Hashitta noni, densha ni maniaimasen deshita. Kaisha ni renraku shite, tsugi no densha de ikimashita. Kaigi ni wa sukoshi okuremashita ga, shiryou wa sakuya junbi shite okimashita.",
    vi: "Sáng nay xe buýt trễ vì tuyết. Dù chạy vẫn không kịp tàu. Tôi liên lạc công ty rồi đi chuyến sau. Họp hơi trễ nhưng tài liệu đã chuẩn bị từ tối qua.",
    questions: [
      {
        q: "なぜ電車に間に合いませんでしたか。",
        options: ["会議があったから", "雪でバスが遅れたから", "資料がなかったから", "会社が休みだったから"],
        answer: 1,
        explain: "けさ雪でバスが遅れました。それが原因です。",
      },
      {
        q: "資料はいつ準備しましたか。",
        options: ["今朝", "会議の後", "昨夜", "来週"],
        answer: 2,
        explain: "資料は昨夜準備しておきました。",
      },
    ],
  },
  {
    id: "rd-n4-02",
    title: "Chuẩn bị thuyết trình",
    level: "N4",
    jp: "来週、研究の発表があります。図書館で資料を集めて、家で何度も練習するつもりです。失敗しないように、先生に相談しておきました。緊張すると思いますが、やってみます。",
    kana: "らいしゅう、けんきゅうのはっぴょうがあります。としょかんでしりょうをあつめて、いえでなんどもれんしゅうするつもりです。しっぱいしないように、せんせいにそうだんしておきました。きんちょうするとおもいますが、やってみます。",
    romaji: "Raishuu, kenkyuu no happyou ga arimasu. Toshokan de shiryou o atsumete, ie de nando mo renshuu suru tsumori desu. Shippai shinai you ni, sensei ni soudan shite okimashita. Kinchou suru to omoimasu ga, yatte mimasu.",
    vi: "Tuần sau có buổi thuyết trình nghiên cứu. Tôi định thu thập tài liệu ở thư viện rồi luyện ở nhà. Để khỏi thất bại, tôi đã hỏi ý thầy trước. Sẽ hồi hộp nhưng tôi sẽ thử.",
    questions: [
      {
        q: "発表はいつですか。",
        options: ["昨日", "今夜", "来週", "来年"],
        answer: 2,
        explain: "来週、研究の発表があります。",
      },
      {
        q: "失敗しないために、何をしましたか。",
        options: ["旅行した", "先生に相談した", "会社を休んだ", "切符を買った"],
        answer: 1,
        explain: "先生に相談しておきました。",
      },
    ],
  },
  {
    id: "rd-n4-03",
    title: "Lễ hội phố",
    level: "N4",
    jp: "日曜日に町の祭りがあるそうです。弟は花火を見たがっています。母は弁当を作っておくと言いました。雨が降っても、駅前まで行くつもりです。世界の料理も出るらしいです。",
    kana: "にちようびにまちのまつりがあるそうです。おとうとははなびをみたがっています。はははべんとうをつくっておくといいました。あめがふっても、えきまえまでいくつもりです。せかいのりょうりもでるらしいです。",
    romaji: "Nichiyoubi ni machi no matsuri ga aru sou desu. Otouto wa hanabi o mitagatte imasu. Haha wa bentou o tsukutte oku to iimashita. Ame ga futte mo, ekimae made iku tsumori desu. Sekai no ryouri mo deru rashii desu.",
    vi: "Nghe nói Chủ nhật có lễ hội phố. Em trai muốn xem pháo hoa. Mẹ nói sẽ nấu cơm hộp sẵn. Dù mưa chúng tôi vẫn định ra trước ga. Nghe đâu cũng có quán ẩm thực thế giới.",
    questions: [
      {
        q: "祭りの情報はどのような形で伝わっていますか。",
        options: ["自分が昨日見た", "聞いた話（そうだ）", "天気予報だけ", "手紙"],
        answer: 1,
        explain: "あるそうです — mẫu truyền tin.",
      },
      {
        q: "雨の場合、家族はどうしますか。",
        options: ["家にいる", "駅前まで行く", "飛行機で帰る", "会議に出る"],
        answer: 1,
        explain: "雨が降っても、駅前まで行くつもりです。",
      },
    ],
  },
];
