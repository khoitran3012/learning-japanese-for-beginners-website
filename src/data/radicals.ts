/** Bộ thủ (部首) — học theo cách người Việt học kanji: biến thể hay gặp trước, rồi ngũ hành, người, nhà cửa. */

export type RadicalPos =
  | "hen"
  | "tsukuri"
  | "kanmuri"
  | "ashi"
  | "tare"
  | "nyou"
  | "kamae"
  | "dokuritsu";

export type RadicalStage = "nen-tang" | "n5" | "n4" | "tra-cuu";

export interface Radical {
  id: string;
  kangxi: number;
  /** Hình học sinh gặp trên sách. */
  char: string;
  /** Dạng gốc Kangxi nếu khác. */
  parent?: string;
  variants: string[];
  strokes: number;
  name_jp: string;
  name_kana: string;
  han_viet: string;
  meaning_vi: string;
  pos: RadicalPos;
  group: string;
  stage: RadicalStage;
  hint: string;
  /** Kanji minh họa (N5–N4 ưu tiên). */
  examples: string;
}

export const POS_VI: Record<RadicalPos, string> = {
  hen: "bên trái · へん",
  tsukuri: "bên phải · つくり",
  kanmuri: "phía trên · かんむり",
  ashi: "phía dưới · あし",
  tare: "phủ từ trên · たれ",
  nyou: "quặp dưới · にょう",
  kamae: "bao quanh · かまえ",
  dokuritsu: "độc lập",
};

export const RADICAL_GROUPS = [
  "Biến thể",
  "Tự nhiên",
  "Người",
  "Cơ thể",
  "Cây cỏ",
  "Động vật",
  "Nhà cửa",
  "Tay & dụng cụ",
  "Ăn mặc",
  "Lời & giá",
  "Đi lại",
  "Nét đơn",
] as const;

function r(
  id: string,
  kangxi: number,
  char: string,
  variants: string,
  strokes: number,
  name_jp: string,
  name_latin: string,
  han_viet: string,
  meaning_vi: string,
  pos: RadicalPos,
  group: string,
  stage: RadicalStage,
  hint: string,
  examples: string,
  parent?: string,
): Radical {
  const kana = /[\u3040-\u30ff]/.test(name_jp) ? name_jp : name_latin;
  return {
    id,
    kangxi,
    char,
    parent,
    variants: variants ? [...variants] : [],
    strokes,
    name_jp,
    name_kana: kana,
    han_viet,
    meaning_vi,
    pos,
    group,
    stage,
    hint,
    examples,
  };
}

export const RADICALS: Radical[] = [
  // —— Biến thể hay gặp: học TRƯỚC khi học kanji N5 ——
  r("r-ninben", 9, "亻", "人亻", 2, "にんべん", "ninben", "Nhân", "người (bên trái)", "hen", "Biến thể", "nen-tang",
    "Người đứng nghiêng bên trái. Gặp 休何作仕 — nghĩ 'có người'.", "休何作仕使代待", "人"),
  r("r-sanzui", 85, "氵", "水氵", 3, "さんずい", "sanzui", "Thủy", "nước (ba chấm)", "hen", "Biến thể", "nen-tang",
    "Ba giọt nước bên trái. Chữ có 氵 gần như liên quan nước: 海池河洗.", "海水河池洗活注", "水"),
  r("r-tehen", 64, "扌", "手扌", 3, "てへん", "tehen", "Thủ", "tay (bên trái)", "hen", "Biến thể", "nen-tang",
    "Tay nắm. 持待打投 — hành động bằng tay.", "持打投折押抽", "手"),
  r("r-risshin", 61, "忄", "心忄", 3, "りっしんべん", "risshinben", "Tâm", "tim / cảm xúc (bên trái)", "hen", "Biến thể", "nen-tang",
    "Tim đứng. 情忙忘 — cảm xúc, tính cách.", "情忙快怖", "心"),
  r("r-kusa", 140, "艹", "艸艹", 3, "くさかんむり", "kusakanmuri", "Thảo", "cỏ (phía trên)", "kanmuri", "Biến thể", "nen-tang",
    "Hai dấu + trên đầu. Cây cỏ, hoa, thuốc: 花茶草.", "花茶草薬芸", "艸"),
  r("r-shinnyou", 162, "辶", "辵辶", 3, "しんにょう", "shinnyou", "Sước", "đi / chuyển động", "nyou", "Biến thể", "nen-tang",
    "Quặp dưới-trái. 道速遅近遠 — đường và di chuyển.", "道速遅近遠連", "辵"),
  r("r-rittou", 18, "刂", "刀刂", 2, "りっとう", "rittou", "Đao", "dao (bên phải)", "tsukuri", "Biến thể", "nen-tang",
    "Hai nét đứng bên phải. Cắt, chia: 別利前.", "別利前割", "刀"),
  r("r-kemono", 94, "犭", "犬犭", 3, "けものへん", "kemonohen", "Khuyển", "thú (bên trái)", "hen", "Biến thể", "n5",
    "Chó đứng. Thú vật, tính 'hoang': 猫独狩.", "猫独狩猛", "犬"),
  r("r-shimesu", 113, "礻", "示礻", 4, "しめすへん", "shimesuhen", "Thị", "thờ / thần (bên trái)", "hen", "Biến thể", "n4",
    "Bàn thờ. 社礼神福 — đền, lễ, phúc.", "社礼神福祝", "示"),
  r("r-koromo", 145, "衤", "衣衤", 5, "ころもへん", "koromohen", "Y", "áo (bên trái)", "hen", "Biến thể", "n4",
    "Áo. 服袋裏 — quần áo, túi.", "服袋裏補", "衣"),
  r("r-shoku", 184, "飠", "食飠", 8, "しょくへん", "shokuhen", "Thực", "ăn (bên trái)", "hen", "Biến thể", "n5",
    "Thức ăn bên trái. 飲飯館 — uống, cơm, quán.", "飲食飯館飽", "食"),
  r("r-rekka", 86, "灬", "火灬", 4, "れっか", "rekka", "Hỏa", "lửa (bốn chấm dưới)", "ashi", "Biến thể", "n5",
    "Bốn chấm dưới. Nóng, nấu, điểm: 点熱黒.", "点熱黒煮", "火"),
  r("r-kozato", 170, "阝", "阜阝", 3, "こざとへん", "kozatohen", "Phụ", "đồi / chỗ (bên trái)", "hen", "Biến thể", "n4",
    "阝 BÊN TRÁI = đất, chỗ: 院階防陽.", "院階防陽陰", "阜"),
  r("r-ozato", 163, "⻏", "邑阝", 3, "おおざと", "oozato", "Ấp", "làng / ấp (bên phải)", "tsukuri", "Biến thể", "n4",
    "阝 BÊN PHẢI = ấp, thành: 都部郵.", "都部郵郡", "邑"),
  r("r-gonben", 149, "言", "言訁", 7, "ごんべん", "gonben", "Ngôn", "lời nói", "hen", "Biến thể", "n5",
    "Lời. Mọi chữ 'nói/đọc/ngôn ngữ': 話語読言.", "話語読証言計", "言"),
  r("r-itohen", 120, "糸", "糸糹", 6, "いとへん", "itohen", "Mịch", "sợi / chỉ", "hen", "Biến thể", "n5",
    "Sợi tơ. 紙終約級 — giấy, kết, ước.", "紙終約級細線", "糸"),
  r("r-kanehen", 167, "金", "金釒", 8, "かねへん", "kanehen", "Kim", "kim loại / tiền", "hen", "Biến thể", "n5",
    "Vàng, tiền, kim loại: 鉄銀銅.", "金鉄銀銅銭", "金"),
  r("r-gyounin", 60, "彳", "彳", 3, "ぎょうにんべん", "gyouninben", "Xích", "bước đi (bên trái)", "hen", "Biến thể", "n5",
    "Người đang bước. 行待後 — đi, đợi, sau.", "行待後役得", "彳"),
  r("r-take", 118, "⺮", "竹⺮", 6, "たけかんむり", "takekanmuri", "Trúc", "tre (phía trên)", "kanmuri", "Biến thể", "n4",
    "Hai nét tre trên đầu. 答第笑 — trả lời, thứ, cười.", "答第笑箱筆", "竹"),
  r("r-nogi", 115, "禾", "禾", 5, "のぎへん", "nogihen", "Hòa", "lúa (bên trái)", "hen", "Biến thể", "n4",
    "Lúa nghiêng. 和秋科種 — hòa, thu, khoa.", "和秋科種利", "禾"),
  r("r-yamaidare", 104, "疒", "疒", 5, "やまいだれ", "yamaidare", "Nạch", "bệnh (phủ trái)", "tare", "Biến thể", "n4",
    "Mái bệnh. 病気痛 — bệnh, đau.", "病気痛疲", "疒"),
  r("r-ukanmuri", 40, "宀", "宀", 3, "うかんむり", "ukanmuri", "Miên", "mái nhà", "kanmuri", "Biến thể", "n5",
    "Mái che. 安室字学守 — yên, phòng, chữ, học.", "安室字学守家", "宀"),
  r("r-madare", 53, "广", "广", 3, "まだれ", "madare", "Nghiễm", "mái rộng / nhà", "tare", "Biến thể", "n4",
    "Mái rộng phủ trái. 店度座庫 — cửa hàng, lần.", "店度座庫庭", "广"),
  r("r-mon", 169, "門", "門", 8, "もんがまえ", "mongamae", "Môn", "cổng (bao quanh)", "kamae", "Biến thể", "n5",
    "Cổng. Chữ viết BÊN TRONG cổng: 間聞問開閉.", "間聞問開閉", "門"),
  r("r-kunigamae", 31, "囗", "囗", 3, "くにがまえ", "kunigamae", "Vi", "khung bao (quốc)", "kamae", "Biến thể", "n5",
    "Khung vuông. 回国図園 — về, nước, hình.", "回国図園", "囗"),
  r("r-nikuzuki", 130, "月", "肉月", 4, "にくづき", "nikuzuki", "Nhục", "thịt / bộ phận cơ thể", "hen", "Biến thể", "n4",
    "Khi 月 bên trái trong chữ cơ thể (腕肝), đó là thịt, không phải mặt trăng.", "腕肝肌服", "肉"),

  // —— Tự nhiên ——
  r("r-hi", 72, "日", "日", 4, "ひ", "hi", "Nhật", "mặt trời / ngày", "hen", "Tự nhiên", "nen-tang",
    "Mặt trời. 日時明曜映 — ngày, giờ, sáng.", "日時明曜映春"),
  r("r-tsuki", 74, "月", "月", 4, "つき", "tsuki", "Nguyệt", "mặt trăng / tháng", "hen", "Tự nhiên", "nen-tang",
    "Mặt trăng. 月朝 — tháng, buổi sáng (cũng xem にくづき).", "月朝有服"),
  r("r-hi-fire", 86, "火", "火灬", 4, "ひへん", "hihen", "Hỏa", "lửa", "hen", "Tự nhiên", "nen-tang",
    "Lửa. 火灯点熱 — lửa, đèn, điểm.", "火灯点熱焼"),
  r("r-mizu", 85, "水", "水氵", 4, "みず", "mizu", "Thủy", "nước", "dokuritsu", "Tự nhiên", "nen-tang",
    "Nước đầy đủ. Khi đứng một mình hoặc dưới chữ: 水氷泉.", "水氷泉"),
  r("r-ki", 75, "木", "木", 4, "きへん", "kihen", "Mộc", "cây / gỗ", "hen", "Tự nhiên", "nen-tang",
    "Cây. 木校本東楽林 — cây, trường, sách, đông.", "木校本東楽林"),
  r("r-tsuchi", 32, "土", "土", 3, "つちへん", "tsuchihen", "Thổ", "đất", "hen", "Tự nhiên", "nen-tang",
    "Đất. 土場堂地坂 — đất, chỗ, sảnh.", "土場堂地坂"),
  r("r-kane", 167, "金", "金釒", 8, "かね", "kane", "Kim", "vàng / tiền / kim loại", "dokuritsu", "Tự nhiên", "nen-tang",
    "Kim loại. 金鉄銀 — vàng, sắt, bạc.", "金鉄銀銅"),
  r("r-ame", 173, "雨", "雨⻗", 8, "あめかんむり", "amekanmuri", "Vũ", "mưa", "kanmuri", "Tự nhiên", "n5",
    "Mưa trên đầu. 電雪雲露 — điện, tuyết, mây.", "雨電雪雲"),
  r("r-yama", 46, "山", "山", 3, "やま", "yama", "Sơn", "núi", "kanmuri", "Tự nhiên", "n5",
    "Núi. 山岩島岸 — núi, đá, đảo.", "山岩島岸"),
  r("r-kawa", 47, "川", "川巛", 3, "さんぼんがわ", "sanbongawa", "Xuyên", "sông", "dokuritsu", "Tự nhiên", "n5",
    "Ba nét chảy. 川州 — sông, châu.", "川州"),
  r("r-ta", 102, "田", "田", 5, "たへん", "tahen", "Điền", "ruộng", "hen", "Tự nhiên", "n5",
    "Ruộng chia ô. 田男町界 — ruộng, nam, phố.", "田男町界"),
  r("r-ishi", 112, "石", "石", 5, "いしへん", "ishihen", "Thạch", "đá", "hen", "Tự nhiên", "n4",
    "Đá. 石研砂岩 — đá, mài, cát.", "石研砂岩"),
  r("r-kigamae", 84, "气", "气", 4, "きがまえ", "kigamae", "Khí", "hơi / khí", "kamae", "Tự nhiên", "n5",
    "Hơi bay. 気汽 — khí, hơi nước.", "気汽"),
  r("r-nisui", 15, "冫", "冫", 2, "にすい", "nisui", "Băng", "băng / lạnh", "hen", "Tự nhiên", "n4",
    "Hai chấm nước đá. 冷次凍 — lạnh, lần, đóng băng.", "冷次凍"),

  // —— Người ——
  r("r-hito", 9, "人", "人亻", 2, "ひと", "hito", "Nhân", "người", "dokuritsu", "Người", "nen-tang",
    "Người đứng. Dạng đầy đủ: 人入? Không — 人 và 亻 cùng gốc.", "人会"),
  r("r-onna", 38, "女", "女", 3, "おんなへん", "onnahen", "Nữ", "phụ nữ", "hen", "Người", "n5",
    "Người nữ. 女始安好母 — nữ, bắt đầu, yên.", "女始安好母"),
  r("r-ko", 39, "子", "子", 3, "こへん", "kohen", "Tử", "con / trẻ", "hen", "Người", "n5",
    "Trẻ. 子女学字孫 — con, học, chữ.", "子女学字"),
  r("r-chichi", 88, "父", "父", 4, "ちち", "chichi", "Phụ", "cha", "dokuritsu", "Người", "n5",
    "Cha. Ít chữ ghép; nhớ 父母.", "父"),
  r("r-haha", 80, "母", "母毋", 5, "はは", "haha", "Mẫu", "mẹ", "dokuritsu", "Người", "n5",
    "Mẹ. 母毎 cùng gốc nét.", "母毎"),
  r("r-ookii", 37, "大", "大", 3, "だい", "dai", "Đại", "lớn / người dang tay", "dokuritsu", "Người", "n5",
    "Người dang tay. 大天太 — lớn, trời.", "大天太"),
  r("r-shi", 33, "士", "士", 3, "さむらい", "samurai", "Sĩ", "kẻ sĩ", "dokuritsu", "Người", "n4",
    "Sĩ. 仕売声 — làm, bán.", "仕売"),

  // —— Cơ thể ——
  r("r-kuchi", 30, "口", "口", 3, "くちへん", "kuchihen", "Khẩu", "miệng", "hen", "Cơ thể", "n5",
    "Miệng. 名古可味鳴 — tên, cũ, vị.", "口名古可味"),
  r("r-me", 109, "目", "目", 5, "めへん", "mehen", "Mục", "mắt", "hen", "Cơ thể", "n5",
    "Mắt. 目見省 — mắt, nhìn.", "目見省眠"),
  r("r-mimi", 128, "耳", "耳", 6, "みみへん", "mimihen", "Nhĩ", "tai", "hen", "Cơ thể", "n5",
    "Tai. 耳聞職 — tai, nghe, nghề.", "耳聞職"),
  r("r-te", 64, "手", "手扌", 4, "て", "te", "Thủ", "tay", "dokuritsu", "Cơ thể", "nen-tang",
    "Tay đầy đủ. 手足持 — tay, chân, cầm.", "手"),
  r("r-ashi", 157, "足", "足⻊", 7, "あしへん", "ashihen", "Túc", "chân", "hen", "Cơ thể", "n5",
    "Chân. 足路跳 — chân, đường, nhảy.", "足路跳"),
  r("r-kokoro", 61, "心", "心忄⺗", 4, "こころ", "kokoro", "Tâm", "tim / lòng", "ashi", "Cơ thể", "nen-tang",
    "Tim dưới hoặc giữa. 思急急忘 — nghĩ, gấp, quên.", "心思急忘"),
  r("r-ookai", 181, "頁", "頁", 9, "おおがい", "oogai", "Hiệt", "đầu / trang", "tsukuri", "Cơ thể", "n4",
    "Đầu. 頭題顔願 — đầu, đề, mặt.", "頭題顔願"),
  r("r-mi", 158, "身", "身", 7, "みへん", "mihen", "Thân", "thân thể", "hen", "Cơ thể", "n4",
    "Thân. 身射 — thân, bắn.", "身"),
  r("r-hone", 188, "骨", "骨", 10, "ほねへん", "honehen", "Cốt", "xương", "hen", "Cơ thể", "tra-cuu",
    "Xương. 骨体髄.", "骨"),
  r("r-ha", 211, "歯", "歯齒", 12, "は", "ha", "Xỉ", "răng", "dokuritsu", "Cơ thể", "n4",
    "Răng. 歯齢.", "歯"),
  r("r-hana", 209, "鼻", "鼻", 14, "はな", "hana", "Tỵ", "mũi", "dokuritsu", "Cơ thể", "tra-cuu",
    "Mũi.", "鼻"),
  r("r-shita", 135, "舌", "舌", 6, "した", "shita", "Thiệt", "lưỡi", "hen", "Cơ thể", "n4",
    "Lưỡi. 舌話 — lưỡi; 話 có 言 chứ không 舌, nhưng 活 có 舌.", "舌活"),

  // —— Cây cỏ ——
  r("r-take-full", 118, "竹", "竹⺮", 6, "たけ", "take", "Trúc", "tre", "dokuritsu", "Cây cỏ", "n4",
    "Tre đầy đủ. Xem ⺮ khi ở trên đầu.", "竹"),
  r("r-kome", 119, "米", "米", 6, "こめへん", "komehen", "Mễ", "gạo", "hen", "Cây cỏ", "n4",
    "Gạo. 米料粉糖 — gạo, liệu, bột.", "米料粉糖"),
  r("r-hitsuji", 123, "羊", "羊", 6, "ひつじ", "hitsuji", "Dương", "dê / cừu", "dokuritsu", "Cây cỏ", "n4",
    "Dê. 着義美 — mặc, nghĩa, đẹp (gốc 羊).", "羊着義美"),
  r("r-hane", 124, "羽", "羽", 6, "はね", "hane", "Vũ", "lông / cánh", "dokuritsu", "Cây cỏ", "n4",
    "Cánh. 羽習翌 — lông, học, hôm sau.", "羽習翌"),

  // —— Động vật ——
  r("r-inu", 94, "犬", "犬犭", 4, "いぬ", "inu", "Khuyển", "chó", "dokuritsu", "Động vật", "n5",
    "Chó. Dạng đầy đủ; bên trái thành 犭.", "犬"),
  r("r-ushi", 93, "牛", "牛牜", 4, "うしへん", "ushihen", "Ngưu", "trâu / bò", "hen", "Động vật", "n4",
    "Bò. 物特解 — vật, đặc, giải.", "牛物特"),
  r("r-uma", 187, "馬", "馬", 10, "うまへん", "umahen", "Mã", "ngựa", "hen", "Động vật", "n4",
    "Ngựa. 駅験驚 — ga, thi, giật mình.", "馬駅験"),
  r("r-tori", 196, "鳥", "鳥", 11, "とりへん", "torihen", "Điểu", "chim", "hen", "Động vật", "n4",
    "Chim. 鳥鳴鶏 — chim, kêu, gà.", "鳥鳴鶏"),
  r("r-uo", 195, "魚", "魚", 11, "うおへん", "uohen", "Ngư", "cá", "hen", "Động vật", "n4",
    "Cá. 魚鮮 — cá, tươi.", "魚鮮"),
  r("r-mushi", 142, "虫", "虫", 6, "むしへん", "mushihen", "Trùng", "côn trùng", "hen", "Động vật", "n4",
    "Sâu bọ. 虫風? 風 khác bộ. 蛇独.", "虫蛇"),
  r("r-kai", 154, "貝", "貝", 7, "かいへん", "kaihen", "Bối", "sò / tiền", "hen", "Động vật", "n5",
    "Sò = tiền cổ. 買貴負貨 — mua, quý, hàng.", "貝買貴負貨"),

  // —— Nhà cửa ——
  r("r-to", 63, "戸", "戸", 4, "とだれ", "todare", "Hộ", "cửa", "tare", "Nhà cửa", "n4",
    "Cửa. 所房戻 — chỗ, phòng, trở.", "戸所房"),
  r("r-sato", 166, "里", "里", 7, "さと", "sato", "Lý", "làng / dặm", "dokuritsu", "Nhà cửa", "n4",
    "Làng. 里野量 — làng, đồng, lượng.", "里野量"),
  r("r-ana", 116, "穴", "穴", 5, "あなかんむり", "anakanmuri", "Huyệt", "hang / lỗ", "kanmuri", "Nhà cửa", "n4",
    "Hang. 究空窓 — cứu, không, cửa sổ.", "穴究空窓"),
  r("r-ennyou", 54, "廴", "廴", 3, "えんにょう", "ennyou", "Dẫn", "kéo dài / bước", "nyou", "Nhà cửa", "n4",
    "Nét kéo. 建延庭 — xây, kéo dài.", "建延"),

  // —— Tay & dụng cụ ——
  r("r-katana", 18, "刀", "刀刂", 2, "かたな", "katana", "Đao", "dao", "dokuritsu", "Tay & dụng cụ", "n5",
    "Dao. 刀切分 — dao, cắt, chia.", "刀切分"),
  r("r-chikara", 19, "力", "力", 2, "ちから", "chikara", "Lực", "sức", "tsukuri", "Tay & dụng cụ", "n4",
    "Sức. 力男助勉 — sức, nam, giúp.", "力男助勉"),
  r("r-yumi", 57, "弓", "弓", 3, "ゆみへん", "yumihen", "Cung", "cung", "hen", "Tay & dụng cụ", "n4",
    "Cung. 引強弱弟 — kéo, mạnh, yếu.", "弓引強弱"),
  r("r-ono", 69, "斤", "斤", 4, "おのづくり", "onozukuri", "Cân", "rìu / cân", "tsukuri", "Tay & dụng cụ", "n4",
    "Rìu. 新所近 — mới, chỗ, gần.", "斤新所近"),
  r("r-hou", 70, "方", "方", 4, "ほうへん", "houhen", "Phương", "phương / phía", "hen", "Tay & dụng cụ", "n4",
    "Phương. 方放旅族 — phương, thả, du lịch.", "方放旅族"),
  r("r-sun", 41, "寸", "寸", 3, "すんづくり", "sunzukuri", "Thốn", "tấc / đo", "tsukuri", "Tay & dụng cụ", "n4",
    "Tấc. 寺対射 — chùa, đối.", "寸寺対"),
  r("r-hoko", 62, "戈", "戈", 4, "ほこづくり", "hokozukuri", "Qua", "mâu / giáo", "tsukuri", "Tay & dụng cụ", "n4",
    "Giáo. 戦成我 — chiến, thành, ta.", "戈戦成我"),
  r("r-ya", 111, "矢", "矢", 5, "やへん", "yahen", "Thỉ", "mũi tên", "hen", "Tay & dụng cụ", "n4",
    "Tên. 矢知族 — tên, biết, tộc.", "矢知"),
  r("r-masu", 68, "斗", "斗", 4, "とます", "tomasu", "Đấu", "đấu đo", "dokuritsu", "Tay & dụng cụ", "tra-cuu",
    "Đấu. 料斜.", "斗料"),
  r("r-fude", 66, "攵", "攴攵", 4, "のぶん", "nobun", "Phộc", "đánh / hành động", "tsukuri", "Tay & dụng cụ", "n4",
    "Roi bên phải. 教数放 — dạy, số, thả.", "攵教数放"),

  // —— Ăn mặc ——
  r("r-shoku-full", 184, "食", "食飠", 9, "しょく", "shoku", "Thực", "ăn", "dokuritsu", "Ăn mặc", "n5",
    "Ăn. 食飲飯 — ăn, uống, cơm.", "食"),
  r("r-koromo-full", 145, "衣", "衣衤", 6, "ころも", "koromo", "Y", "áo", "dokuritsu", "Ăn mặc", "n4",
    "Áo đầy đủ. 衣装 — áo, trang.", "衣"),
  r("r-haba", 50, "巾", "巾", 3, "はばへん", "habahen", "Cân", "khăn / vải", "hen", "Ăn mặc", "n4",
    "Khăn. 市席帯 — chợ, chiếu, đai.", "巾市席帯"),
  r("r-kaku", 177, "革", "革", 9, "かくのかわ", "kakunokawa", "Cách", "da thuộc", "hen", "Ăn mặc", "tra-cuu",
    "Da. 靴鞭.", "革靴"),

  // —— Lời & giá ——
  r("r-miru", 147, "見", "見", 7, "みる", "miru", "Kiến", "nhìn", "dokuritsu", "Lời & giá", "n5",
    "Mắt + người. 見現親 — nhìn, hiện, thân.", "見現親覚"),
  r("r-tatsu", 117, "立", "立", 5, "たつへん", "tatsuhen", "Lập", "đứng", "hen", "Lời & giá", "n5",
    "Đứng. 立音部 — đứng, âm, bộ.", "立音部親"),
  r("r-shiro", 106, "白", "白", 5, "しろへん", "shirohen", "Bạch", "trắng", "hen", "Lời & giá", "n5",
    "Trắng. 白的皇 — trắng, đích, hoàng.", "白的皇"),
  r("r-aka", 155, "赤", "赤", 7, "あか", "aka", "Xích", "đỏ", "dokuritsu", "Lời & giá", "n5",
    "Đỏ. 赤赫.", "赤"),
  r("r-ao", 174, "青", "青", 8, "あお", "ao", "Thanh", "xanh", "dokuritsu", "Lời & giá", "n5",
    "Xanh. 青静晴 — xanh, lặng, nắng.", "青静晴"),
  r("r-kuro", 203, "黒", "黒黑", 11, "くろ", "kuro", "Hắc", "đen", "dokuritsu", "Lời & giá", "n4",
    "Đen. 黒黙.", "黒"),
  r("r-iro", 139, "色", "色", 6, "いろ", "iro", "Sắc", "màu", "dokuritsu", "Lời & giá", "n5",
    "Màu. 色絶.", "色"),
  r("r-oto", 180, "音", "音", 9, "おと", "oto", "Âm", "âm thanh", "dokuritsu", "Lời & giá", "n4",
    "Âm. 音暗響 — âm, tối, vang.", "音暗"),
  r("r-takai", 189, "高", "高", 10, "たかい", "takai", "Cao", "cao", "dokuritsu", "Lời & giá", "n5",
    "Cao. 高亭.", "高"),
  r("r-nagai", 168, "長", "長镸", 8, "ながい", "nagai", "Trường", "dài / trưởng", "dokuritsu", "Lời & giá", "n5",
    "Dài. 長張 — dài, căng.", "長"),

  // —— Đi lại ——
  r("r-iku", 144, "行", "行", 6, "ぎょうがまえ", "gyougamae", "Hành", "đi", "kamae", "Đi lại", "n5",
    "Đi. 行街術 — đi, phố, thuật.", "行"),
  r("r-hashiru", 156, "走", "走", 7, "そうにょう", "sounyou", "Tẩu", "chạy", "nyou", "Đi lại", "n4",
    "Chạy. 走赴起 — chạy, dậy.", "走起"),
  r("r-kuruma", 159, "車", "車", 7, "くるまへん", "kurumahen", "Xa", "xe", "hen", "Đi lại", "n5",
    "Xe. 車軍輪転 — xe, quân, bánh.", "車軍"),
  r("r-fune", 137, "舟", "舟", 6, "ふねへん", "funehen", "Chu", "thuyền", "hen", "Đi lại", "tra-cuu",
    "Thuyền. 船航.", "舟船"),
  r("r-tobu", 183, "飛", "飛", 9, "とぶ", "tobu", "Phi", "bay", "dokuritsu", "Đi lại", "n4",
    "Bay. 飛.", "飛"),
  r("r-kaze", 182, "風", "風", 9, "かぜ", "kaze", "Phong", "gió", "dokuritsu", "Đi lại", "n4",
    "Gió. 風.", "風"),

  // —— Nét đơn ——
  r("r-ichi", 1, "一", "一", 1, "いち", "ichi", "Nhất", "một / nét ngang", "dokuritsu", "Nét đơn", "nen-tang",
    "Nét ngang. Nền của 二三天.", "一二三天"),
  r("r-kun", 2, "丨", "丨", 1, "ぼう", "bou", "Cổn", "nét sổ", "dokuritsu", "Nét đơn", "tra-cuu",
    "Nét sổ đứng. Ít đứng một mình.", "十"),
  r("r-ten", 3, "丶", "丶", 1, "てん", "ten", "Chủ", "chấm", "dokuritsu", "Nét đơn", "tra-cuu",
    "Chấm. Trong 丸主.", "主"),
  r("r-no", 4, "丿", "丿", 1, "の", "no", "Phiệt", "nét phẩy", "dokuritsu", "Nét đơn", "tra-cuu",
    "Nét phẩy. Trong 乃久.", "久"),
  r("r-otsu", 5, "乙", "乙", 1, "おつ", "otsu", "Ất", "nét móc", "dokuritsu", "Nét đơn", "n4",
    "Móc. 乙九乱 — chín, loạn.", "乙九"),
  r("r-ni", 7, "二", "二", 2, "に", "ni", "Nhị", "hai", "dokuritsu", "Nét đơn", "nen-tang",
    "Hai nét. 二三五.", "二三"),
  r("r-nabebuta", 8, "亠", "亠", 2, "なべぶた", "nabebuta", "Đầu", "nắp / nét trên", "kanmuri", "Nét đơn", "n5",
    "Nắp nồi. 方市高交 — phương, chợ, cao.", "亠方市高交"),
  r("r-hachi", 12, "八", "八", 2, "はち", "hachi", "Bát", "tám / tách", "ashi", "Nét đơn", "n5",
    "Tách hai. 八公六 — tám, công, sáu.", "八公六"),
  r("r-juu", 24, "十", "十", 2, "じゅう", "juu", "Thập", "mười", "dokuritsu", "Nét đơn", "nen-tang",
    "Thập. 十早博 — mười, sớm.", "十早"),
  r("r-chiisai", 42, "小", "小⺌", 3, "しょう", "shou", "Tiểu", "nhỏ", "kanmuri", "Nét đơn", "n5",
    "Nhỏ. 小少 — nhỏ, ít.", "小少"),
  r("r-iru", 11, "入", "入", 2, "いる", "iru", "Nhập", "vào", "dokuritsu", "Nét đơn", "n5",
    "Vào. 入.", "入"),
  r("r-ninnyou", 10, "儿", "儿", 2, "にんにょう", "ninnyou", "Nhi", "chân người", "ashi", "Nét đơn", "n5",
    "Hai chân. 兄元先見 — anh, gốc, trước, nhìn.", "儿兄元先"),
  r("r-wakanmuri", 14, "冖", "冖", 2, "わかんむり", "wakanmuri", "Mịch", "mái phủ", "kanmuri", "Nét đơn", "n5",
    "Mái ngắn. 写軍愛 — chép, quân.", "冖写軍"),
  r("r-keigamae", 13, "冂", "冂", 2, "けいがまえ", "keigamae", "Quynh", "khung hở", "kamae", "Nét đơn", "n4",
    "Khung. 円内再 — yên, trong.", "冂円内"),
  r("r-mata", 29, "又", "又", 2, "また", "mata", "Hựu", "lại / tay phải", "tsukuri", "Nét đơn", "n5",
    "Tay. 友受 — bạn, nhận.", "又友受"),
  r("r-takumi", 48, "工", "工", 3, "たくみ", "takumi", "Công", "thợ / công", "hen", "Nét đơn", "n4",
    "Thợ. 工左差 — thợ, trái.", "工左差"),
  r("r-yube", 36, "夕", "夕", 3, "ゆうべ", "yuube", "Tịch", "chiều / tối", "hen", "Nét đơn", "n4",
    "Chiều. 夕多外名 — tối, nhiều, ngoài, tên.", "夕多外名"),
  r("r-tome", 77, "止", "止", 4, "とめる", "tomeru", "Chỉ", "dừng", "hen", "Đi lại", "n4",
    "Dừng. 止歩正 — dừng, bước, đúng.", "止歩正"),
  r("r-akeru", 76, "欠", "欠", 4, "あくび", "akubi", "Khiếm", "thiếu / ngáp", "tsukuri", "Lời & giá", "n4",
    "Ngáp. 次歌歓 — lần, hát.", "欠次歌"),
  r("r-umaru", 100, "生", "生", 5, "うまれる", "umareru", "Sinh", "sống / sinh", "dokuritsu", "Người", "n5",
    "Sinh. 生.", "生"),
  r("r-tsuchi-shi", 102, "疋", "疋", 5, "ひき", "hiki", "Sất", "cuộn vải", "dokuritsu", "Ăn mặc", "tra-cuu",
    "Ít gặp.", "疋"),
  r("r-sara", 108, "皿", "皿", 5, "さら", "sara", "Mãnh", "đĩa", "ashi", "Ăn mặc", "n4",
    "Đĩa dưới. 皿盗温 — đĩa, ấm.", "皿盗温"),
  r("r-tama", 96, "玉", "玉王", 5, "たまへん", "tamahen", "Ngọc", "ngọc", "hen", "Tự nhiên", "n4",
    "Ngọc (thường viết 王 bên trái). 玉国現理 — ngọc, nước, hiện, lý.", "玉国現理球"),
  r("r-onore", 49, "己", "己", 3, "おのれ", "onore", "Kỷ", "mình", "tsukuri", "Người", "n4",
    "Mình. 己記起 — mình, ghi, dậy.", "己記起"),
  r("r-ho", 51, "干", "干", 3, "ほす", "hosu", "Can", "khô / can", "dokuritsu", "Tay & dụng cụ", "n4",
    "Can. 干刊平 — khô, phẳng.", "干平"),
  r("r-nao", 71, "无", "无", 4, "なし", "nashi", "Vô", "không", "dokuritsu", "Nét đơn", "tra-cuu",
    "Không có.", "无"),
  r("r-kei", 58, "彐", "彐", 3, "けいがしら", "keigashira", "Kệ", "đầu heo", "kanmuri", "Nét đơn", "tra-cuu",
    "Trong 当尋.", "当"),
  r("r-sanzukuri", 59, "彡", "彡", 3, "さんづくり", "sanzukuri", "Sam", "lông / vẽ", "tsukuri", "Nét đơn", "n4",
    "Ba nét. 形修影 — hình, sửa, bóng.", "彡形修"),
  r("r-shikabane", 44, "尸", "尸", 3, "しかばね", "shikabane", "Thi", "xác / mái xác", "tare", "Nhà cửa", "n4",
    "Phủ. 屋局居 — nhà, cục, ở.", "尸屋局居"),
  r("r-gandare", 27, "厂", "厂", 2, "がんだれ", "gandare", "Hán", "vách đá", "tare", "Nhà cửa", "n4",
    "Vách. 原历? 原厚 — nguyên, dày.", "厂原厚"),
  r("r-hako", 22, "匚", "匚", 2, "はこがまえ", "hakogamae", "Phương", "hòm", "kamae", "Nhà cửa", "tra-cuu",
    "Hòm. 区医 — khu, y.", "匚区医"),
  r("r-mu", 28, "厶", "厶", 2, "む", "mu", "Tư", "riêng", "dokuritsu", "Nét đơn", "n4",
    "Tư. 公台参 — công, đài.", "厶公去"),
  r("r-tsutsumi", 20, "勹", "勹", 2, "つつみがまえ", "tsutsumigamae", "Bao", "bao bọc", "kamae", "Nét đơn", "n4",
    "Bao. 勻? 句包 — câu, gói.", "勹句包"),
  r("r-saji", 21, "匕", "匕", 2, "さじのひ", "sajinohi", "Chủy", "thìa", "tsukuri", "Tay & dụng cụ", "n4",
    "Thìa. 化北 — hóa, bắc.", "匕化北"),
  r("r-fushi", 26, "卩", "卩", 2, "ふしづくり", "fushizukuri", "Tiết", "đốt / ấn", "tsukuri", "Nét đơn", "n4",
    "Ấn. 印危卵 — ấn, nguy.", "卩印危"),
  r("r-uranai", 25, "卜", "卜", 2, "うらない", "uranai", "Bốc", "bói", "tsukuri", "Nét đơn", "n4",
    "Bói. 外占 — ngoài, chiếm.", "卜外"),
  r("r-nihonashi", 55, "廾", "廾", 3, "にじゅうあし", "nijuuashi", "Củng", "chắp tay", "ashi", "Nét đơn", "n4",
    "Hai tay. 開弁 — mở.", "廾開"),
  r("r-yamai-note", 105, "癶", "癶", 5, "はつがしら", "hatsugashira", "Bát", "bước ngược", "kanmuri", "Đi lại", "n4",
    "Trên 発.", "発"),
  r("r-netsu", 78, "歹", "歹", 4, "がつへん", "gatsuhen", "Ngạt", "xương chết", "hen", "Cơ thể", "tra-cuu",
    "Chết. 死残 — chết, còn.", "歹死残"),
  r("r-ke", 82, "毛", "毛", 4, "け", "ke", "Mao", "lông", "dokuritsu", "Cơ thể", "tra-cuu",
    "Lông.", "毛"),
  r("r-uji", 83, "氏", "氏", 4, "うじ", "uji", "Thị", "họ", "dokuritsu", "Người", "n4",
    "Họ. 氏民 — họ, dân.", "氏民"),
  r("r-kuraberu", 81, "比", "比", 4, "くらべる", "kuraberu", "Tỷ", "so", "dokuritsu", "Nét đơn", "n4",
    "So. 比皆 — so, đều.", "比"),
  r("r-tsume", 87, "爪", "爪⺤", 4, "つめ", "tsume", "Trảo", "móng", "kanmuri", "Cơ thể", "n4",
    "Móng. 爪采受 — móng, nhận.", "爪受"),
  r("r-kata", 91, "片", "片", 4, "かたへん", "katahen", "Phiến", "mảnh", "hen", "Tay & dụng cụ", "n4",
    "Mảnh. 片版.", "片"),
  r("r-kiba", 92, "牙", "牙", 4, "きばへん", "kibahen", "Nha", "ngà", "hen", "Động vật", "tra-cuu",
    "Ngà.", "牙"),
  r("r-gen", 95, "玄", "玄", 5, "げん", "gen", "Huyền", "huyền / đen sẫm", "dokuritsu", "Nét đơn", "tra-cuu",
    "Huyền. 玄率.", "玄"),
  r("r-uri", 97, "瓜", "瓜", 5, "うり", "uri", "Qua", "đưa", "dokuritsu", "Cây cỏ", "tra-cuu",
    "Đưa.", "瓜"),
  r("r-kawara", 98, "瓦", "瓦", 5, "かわら", "kawara", "Ngõa", "ngói", "dokuritsu", "Nhà cửa", "tra-cuu",
    "Ngói. 瓶.", "瓦瓶"),
  r("r-amai", 99, "甘", "甘", 5, "あまい", "amai", "Cam", "ngọt", "dokuritsu", "Ăn mặc", "tra-cuu",
    "Ngọt. 甘.", "甘"),
  r("r-mochiiru", 101, "用", "用", 5, "もちいる", "mochiiru", "Dụng", "dùng", "dokuritsu", "Tay & dụng cụ", "n4",
    "Dùng. 用.", "用"),
  r("r-kegawa", 107, "皮", "皮", 5, "けがわ", "kegawa", "Bì", "da", "hen", "Ăn mặc", "n4",
    "Da. 皮彼波 — da, kia, sóng.", "皮彼"),
  r("r-hoko2", 110, "矛", "矛", 5, "ほこへん", "hokohen", "Mâu", "mâu", "hen", "Tay & dụng cụ", "tra-cuu",
    "Mâu. 柔務.", "矛柔"),
  r("r-itogashira", 52, "幺", "幺", 3, "いとがしら", "itogashira", "Yêu", "nhỏ / tơ", "hen", "Nét đơn", "n4",
    "Tơ ngắn. 幻幼幾 — ảo, trẻ, mấy.", "幺幼幾"),
  r("r-bun", 67, "文", "文", 4, "ぶん", "bun", "Văn", "văn", "dokuritsu", "Lời & giá", "n4",
    "Văn. 文対 — văn, đối.", "文"),
  r("r-shinnyou-note", 65, "支", "支", 4, "しんよう", "shinyou", "Chi", "cành / chống", "dokuritsu", "Cây cỏ", "n4",
    "Chi. 支技枝.", "支技"),
  r("r-nakare2", 80, "毋", "毋", 4, "なかれ", "nakare", "Vô", "chớ", "dokuritsu", "Nét đơn", "tra-cuu",
    "Chớ. Gần 母.", "毋"),
];

export interface RadicalLesson {
  id: string;
  title: string;
  title_jp: string;
  summary: string;
  ids: string[];
}

export const RADICAL_LESSONS: RadicalLesson[] = [
  {
    id: "rad-ls-variant",
    title: "Biến thể hay gặp",
    title_jp: "旁の形",
    summary: "Học hình chữ viết tắt trước: 亻氵扌忄艹辶. Nhìn 3 nét trái là đã đoán được nghĩa.",
    ids: ["r-ninben", "r-sanzui", "r-tehen", "r-risshin", "r-kusa", "r-shinnyou", "r-rittou", "r-gyounin", "r-ukanmuri", "r-gonben"],
  },
  {
    id: "rad-ls-nature",
    title: "Ngũ hành & trời đất",
    title_jp: "木火土金水",
    summary: "Cùng bộ với kanji N5 ngày trong tuần và thiên nhiên.",
    ids: ["r-hi", "r-tsuki", "r-hi-fire", "r-mizu", "r-ki", "r-tsuchi", "r-kane", "r-ame", "r-yama", "r-kawa", "r-ta"],
  },
  {
    id: "rad-ls-people",
    title: "Người & cơ thể",
    title_jp: "人口目",
    summary: "Người, miệng, mắt, tay, tim — bộ của hầu hết chữ N5 về con người.",
    ids: ["r-hito", "r-onna", "r-ko", "r-kuchi", "r-me", "r-mimi", "r-te", "r-ashi", "r-kokoro", "r-ookii"],
  },
  {
    id: "rad-ls-house",
    title: "Nhà, cổng, mái",
    title_jp: "宀門广",
    summary: "Mái 宀, cổng 門, 阝 trái/phải — đừng nhầm hai bộ 阝.",
    ids: ["r-ukanmuri", "r-madare", "r-mon", "r-kunigamae", "r-kozato", "r-ozato", "r-to", "r-ana"],
  },
  {
    id: "rad-ls-action",
    title: "Tay, dao, sức, đi",
    title_jp: "手刀力",
    summary: "Hành động: tay, cắt, sức, bước, chạy, xe.",
    ids: ["r-tehen", "r-katana", "r-chikara", "r-iku", "r-hashiru", "r-kuruma", "r-ono", "r-fude"],
  },
  {
    id: "rad-ls-life",
    title: "Ăn, nói, tiền, màu",
    title_jp: "食言貝",
    summary: "Đời sống N5: ăn uống, lời nói, mua bán, màu sắc.",
    ids: ["r-shoku-full", "r-gonben", "r-kai", "r-itohen", "r-miru", "r-shiro", "r-aka", "r-ao", "r-iro", "r-kome"],
  },
];

const byIdCache = new Map<string, Radical>();
const byCharCache = new Map<string, Radical>();

function indexRadicals() {
  if (byIdCache.size) return;
  for (const x of RADICALS) {
    byIdCache.set(x.id, x);
    if (!x.parent) byCharCache.set(x.char, x);
  }
  for (const x of RADICALS) {
    const keys = [x.char, x.parent, ...x.variants].filter(Boolean) as string[];
    for (const k of keys) {
      if (!byCharCache.has(k)) byCharCache.set(k, x);
    }
  }
}

export function radicalById(id: string) {
  indexRadicals();
  return byIdCache.get(id);
}

export function radicalByChar(ch: string) {
  indexRadicals();
  return byCharCache.get(ch);
}

export function learnRadicals() {
  return RADICALS.filter((x) => x.stage === "nen-tang" || x.stage === "n5" || x.stage === "n4");
}

export function radicalsInLesson(id: string) {
  const ls = RADICAL_LESSONS.find((x) => x.id === id);
  if (!ls) return [];
  return ls.ids.map(radicalById).filter((x): x is Radical => Boolean(x));
}

export function radicalNeighbors(id: string, pool: Radical[] = learnRadicals()) {
  const i = pool.findIndex((x) => x.id === id);
  if (i < 0) return { prev: undefined, next: undefined, index: -1, total: pool.length };
  return { prev: pool[i - 1], next: pool[i + 1], index: i, total: pool.length };
}

/** Map kanji → bộ thủ chính (N5–N4 + minh họa). */
const KANJI_RADICAL: Record<string, string> = {
  日: "r-hi", 時: "r-hi", 明: "r-hi", 曜: "r-hi", 映: "r-hi", 春: "r-hi",
  月: "r-tsuki", 朝: "r-tsuki", 有: "r-tsuki",
  火: "r-hi-fire", 灯: "r-hi-fire", 点: "r-rekka", 熱: "r-rekka", 黒: "r-rekka", 焼: "r-hi-fire",
  水: "r-mizu", 海: "r-sanzui", 河: "r-sanzui", 池: "r-sanzui", 洗: "r-sanzui", 活: "r-sanzui", 注: "r-sanzui", 氷: "r-mizu",
  木: "r-ki", 校: "r-ki", 本: "r-ki", 東: "r-ki", 楽: "r-ki", 林: "r-ki",
  土: "r-tsuchi", 場: "r-tsuchi", 堂: "r-tsuchi", 地: "r-tsuchi",
  金: "r-kane", 鉄: "r-kanehen", 銀: "r-kanehen", 円: "r-keigamae",
  雨: "r-ame", 電: "r-ame", 雪: "r-ame", 雲: "r-ame",
  山: "r-yama", 川: "r-kawa", 田: "r-ta", 男: "r-ta", 町: "r-ta", 界: "r-ta",
  気: "r-kigamae", 天: "r-ookii",
  人: "r-hito", 休: "r-ninben", 何: "r-ninben", 作: "r-ninben", 仕: "r-ninben", 使: "r-ninben", 代: "r-ninben", 体: "r-ninben",
  女: "r-onna", 始: "r-onna", 好: "r-onna",
  子: "r-ko", 学: "r-ko", 字: "r-ukanmuri", 安: "r-ukanmuri",
  父: "r-chichi", 友: "r-mata", 名: "r-kuchi", 母: "r-haha", 毎: "r-haha",
  口: "r-kuchi", 古: "r-kuchi", 可: "r-kuchi",
  目: "r-me", 見: "r-miru",
  耳: "r-mimi", 聞: "r-mon",
  手: "r-te", 持: "r-tehen", 打: "r-tehen",
  足: "r-ashi",
  心: "r-kokoro", 思: "r-kokoro", 急: "r-kokoro", 忘: "r-kokoro",
  言: "r-gonben", 話: "r-gonben", 語: "r-gonben", 読: "r-gonben", 計: "r-gonben",
  食: "r-shoku-full", 飲: "r-shoku",
  貝: "r-kai", 買: "r-kai", 貴: "r-kai",
  糸: "r-itohen", 紙: "r-itohen", 終: "r-itohen",
  門: "r-mon", 間: "r-mon", 問: "r-mon", 開: "r-mon", 閉: "r-mon",
  行: "r-gyounin", 待: "r-gyounin", 後: "r-gyounin",
  道: "r-shinnyou", 速: "r-shinnyou", 遅: "r-shinnyou", 近: "r-shinnyou", 遠: "r-shinnyou", 連: "r-shinnyou",
  入: "r-iru", 出: "r-kunigamae", 上: "r-ichi", 下: "r-ichi", 中: "r-kuchi",
  外: "r-yube", 前: "r-rittou", 右: "r-kuchi", 左: "r-takumi",
  西: "r-ichi", 南: "r-juu", 北: "r-saji",
  車: "r-kuruma", 帰: "r-to",
  来: "r-ki", 書: "r-hi",
  大: "r-ookii", 小: "r-chiisai", 高: "r-nabebuta", 新: "r-ono", 多: "r-yube", 少: "r-chiisai",
  白: "r-shiro", 長: "r-nagai", 国: "r-kunigamae",
  午: "r-juu", 年: "r-ichi", 分: "r-katana", 半: "r-juu", 今: "r-hito", 先: "r-ninnyou", 生: "r-umaru",
  一: "r-ichi", 二: "r-ni", 三: "r-ichi", 四: "r-kuchi", 五: "r-ichi", 六: "r-hachi", 七: "r-ichi", 八: "r-hachi", 九: "r-otsu", 十: "r-juu",
  百: "r-shiro", 千: "r-juu", 万: "r-ichi",
  会: "r-hito", 社: "r-shimesu", 発: "r-yamai-note", 着: "r-hitsuji",
  題: "r-ookai", 研: "r-ishi", 究: "r-ana", 事: "r-ichi", 業: "r-ki",
  院: "r-kozato", 館: "r-shoku", 屋: "r-shikabane", 度: "r-madare", 回: "r-kunigamae",
  的: "r-shiro", 力: "r-chikara", 知: "r-ya", 考: "r-onore", 教: "r-fude",
  室: "r-ukanmuri", 起: "r-hashiru", 切: "r-katana",
  走: "r-hashiru", 歩: "r-tome", 正: "r-tome", 音: "r-oto", 歌: "r-akeru",
  画: "r-ta", 写: "r-wakanmuri", 真: "r-me", 色: "r-iro", 赤: "r-aka", 青: "r-ao",
  所: "r-to", 世: "r-ichi", 店: "r-madare",
};

export function radicalOfKanji(ch: string): Radical | undefined {
  indexRadicals();
  const id = KANJI_RADICAL[ch];
  if (id) return byIdCache.get(id);
  return byCharCache.get(ch);
}

export function kanjiCharsFor(r: Radical): string[] {
  const set = new Set<string>();
  for (const ch of r.examples) set.add(ch);
  for (const [ch, id] of Object.entries(KANJI_RADICAL)) {
    if (id === r.id) set.add(ch);
  }
  return [...set];
}
