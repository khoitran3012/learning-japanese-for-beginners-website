#!/usr/bin/env python3
"""Translate leftover English in dictionary + kanji JSON; emit Hán-Việt extras."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path("/workspace")
DICT = ROOT / "src/data/dictionary-jlpt.json"
KANJI = ROOT / "src/data/kanji-jlpt.json"
HV_TS = ROOT / "src/data/han-viet.ts"
HV_EXTRA = ROOT / "src/data/han-viet-extra.ts"

WORD = {
    "rivers": "sông",
    "youth": "tuổi xuân",
    "call": "thăm",
    "cheer": "cổ vũ",
    "road": "đường",
    "inn": "quán trọ",
    "daze": "mơ",
    "closure": "đóng cửa",
    "sandals": "dép",
    "credit": "trả góp",
    "sun": "mặt trời",
    "adverb": "phó từ",
    "mould": "khuôn",
    "wire": "dây",
    "sailor": "thủy thủ",
    "bamboo": "tre",
    "story": "chuyện",
    "rich": "giàu",
    "lava": "dung nham",
    "mail": "thư",
    "burning": "cháy",
    "sarcasm": "mỉa mai",
    "gem": "ngọc",
    "palace": "cung điện",
    "tear": "nước mắt",
    "ice": "băng",
    "pollen": "phấn hoa",
    "grain": "hạt",
    "verb": "động từ",
    "pine": "thông",
    "tree": "cây",
    "spread": "lan",
    "hero": "anh hùng",
    "funeral": "tang lễ",
    "step": "bước",
    "item": "mục",
    "reward": "thưởng",
    "put": "treo",
    "frame": "khung",
    "losing": "mất",
    "commit": "ủy thác",
    "warning": "cảnh báo",
    "honor": "danh dự",
    "unrest": "náo động",
    "hermit": "ẩn sĩ",
    "forgery": "giả mạo",
    "poet": "nhà thơ",
    "tide": "thủy triều",
    "orphan": "mồ côi",
    "store": "tích trữ",
    "axis": "trục",
    "lessons": "buổi học",
    "rage": "dữ dội",
    "meadow": "đồng cỏ",
    "warship": "tàu chiến",
    "sinking": "chìm",
    "shadow": "bóng",
    "hill": "đồi",
    "boiling": "sôi",
    "peas": "đậu",
    "falling": "rơi",
    "manure": "phân bón",
    "context": "mạch",
    "orbit": "quỹ đạo",
    "arena": "võ đài",
    "whaling": "săn cá voi",
    "villa": "biệt thự",
    "fraud": "gian lận",
    "arousal": "phấn khích",
    "pioneer": "khai phá",
    "hell": "địa ngục",
    "infancy": "ấu thơ",
    "grasp": "nắm",
    "germ": "vi khuẩn",
    "nest": "tổ",
    "crystal": "tinh thể",
    "poverty": "nghèo",
    "grumble": "càm ràm",
    "excreta": "nước tiểu",
    "pottery": "đồ gốm",
    "hostel": "ký túc xá",
    "pearl": "ngọc trai",
    "monster": "thú",
    "tap": "vòi nước",
    "fog": "sương mù",
    "swirl": "xoáy",
    "razor": "dao cạo",
    "drum": "trống",
    "lump": "cục",
    "guts": "ruột",
    "channel": "eo biển",
    "peak": "đỉnh",
    "lotus": "sen",
    "bravery": "dũng cảm",
    "door": "cửa",
    "autopsy": "mổ tử thi",
    "female": "cái",
    "testing": "thử",
    "cult": "sùng bái",
    "lips": "môi",
    "stalk": "thân",
    "rainbow": "cầu vồng",
    "eyebrow": "lông mày",
    "cork": "nút chai",
    "longing": "khao khát",
    "treetop": "ngọn cây",
    "glory": "vinh quang",
    "cabinet": "nội các",
    "honest": "thành thực",
    "names": "tên",
    "master": "chủ",
    "pivot": "trục",
    "harp": "đàn",
    "heard": "nghe",
    "land": "đất",
    "trove": "kho",
    "counter": "loại từ",
    "refuge": "nơi ẩn",
    "entwine": "quấn",
    "acronym": "từ viết tắt",
    "arrears": "nợ đọng",
    "dew": "sương",
    "creases": "nếp nhăn",
    "gaudy": "lòe loẹt",
    "tame": "thuần hóa",
    "upset": "lật đổ",
    "owe": "mắc nợ",
    "churn": "khuấy",
    "rupture": "vỡ",
    "lure": "cám dỗ",
    "forward": "phía trước",
    "under": "dưới",
    "un-": "không",
    "vice-": "phó",
    "glass": "ly",
    "years": "năm",
    "drunken": "say",
    "caught": "bắt",
    "shut": "đóng",
    "nice": "dễ chịu",
    "cloudy": "nhiều mây",
    "bows": "cung",
    "stringed": "dây",
    "instruments": "nhạc cụ",
    "numbers": "số",
    "cross": "băng qua",
    "rid": "cởi",
    "acclaim": "tán dương",
    "bowl": "bát",
    "nape": "gáy",
    "assumed": "giả",
    "genus": "chi",
    "expanse": "mênh mông",
    "lbs": "cân",
    "specific": "cụ thể",
    "products": "sản vật",
    "earn": "kiếm",
    "omen": "điềm",
    "cram": "luyện thi",
    "pear": "lê",
    "beat": "nhịp",
    "spare": "rảnh",
    "acquire": "thuần thục",
    "parallels": "vĩ tuyến",
    "dress": "áo",
    "heat": "nóng",
    "pack": "thồ",
    "crest": "huy hiệu",
    "stirred": "phấn khích",
    "dim": "mờ",
    "bend": "cúi",
    "leap": "nhảy",
    "belt": "đai",
    "grudge": "hận",
    "dipper": "gàu",
    "tub": "chậu",
    "hull": "thân tàu",
    "camphor": "long não",
    "jewels": "ngọc",
    "pass": "đèo",
    "confine": "giam",
    "juice": "nước",
    "rinse": "súc",
    "stream": "suối",
    "crop": "hoa màu",
    "dearly": "tha thiết",
    "brave": "dũng cảm",
    "serpent": "rắn",
    "fifth": "tháng năm",
    "legs": "chân",
    "hare": "thỏ",
    "rabbit": "thỏ",
    "fourth": "thứ tư",
    "chinese": "Trung Quốc",
    "zodiac": "con giáp",
    "turkey": "đỏ thẫm",
    "bream": "cá tráp",
    "snapper": "cá tráp",
    "crops": "mùa màng",
    "pongee": "lụa thô",
    "knotted": "thắt",
    "pig": "lợn",
    "tenth": "một phần mười",
    "urge": "mời",
    "worse": "nặng hơn",
    "bulky": "cồng kềnh",
    "coconut": "dừa",
    "atom": "nguyên tử",
    "week": "tuổi tuần",
    "person": "người",
    "woman": "phụ nữ",
    "like": "giống",
    "long": "dài",
    "time": "thời gian",
    "period": "giai đoạn",
    "the": "",
    "aged": "người già",
    "beautiful": "đẹp",
    "of": "của",
    "at": "ở",
    "is": "",
    "be": "",
    "and": "và",
    "with": "với",
    "from": "từ",
    "into": "vào",
    "upon": "trên",
    "away": "đi",
    "out": "ra",
    "over": "qua",
    "after": "sau",
    "before": "trước",
    "about": "về",
    "between": "giữa",
    "through": "qua",
    "during": "trong lúc",
    "without": "không",
    "within": "trong",
    "along": "dọc",
    "among": "giữa",
    "against": "chống",
    "also": "cũng",
    "only": "chỉ",
    "just": "vừa",
    "more": "hơn",
    "most": "nhất",
    "very": "rất",
    "sasa": "tre sasa",
    "zelkova": "cây zelkova",
    "catalpa": "cây tử",
    "paulownia": "cây ngô đồng",
    "koto": "đàn koto",
    "dairy": "sữa",
    "female": "cái",
    "v.i.p": "nhân vật",
    "million": "triệu",
    "story": "chuyện",
    "glass": "ly",
    "years": "tuổi",
    "pop": "dân số",
    "iii": "ba",
    "ii": "hai",
}

PHRASE = {
    "(1) pine tree": "cây thông",
    "pine tree": "cây thông",
    "put trên thông báo": "dán thông báo",
    "put trên": "treo",
    "rời is": "im lặng",
    "be rõ": "trong trẻo",
    "be trực thuộc": "trực thuộc",
    "losing cái gì đó": "làm mất",
    "cũ story": "chuyện cũ",
    "trăm million": "trăm triệu",
    "được rid": "cởi bỏ",
    "thắng acclaim": "được tán dương",
    "mật độ pop": "mật độ dân số",
    "nông bowl": "bát nông",
    "nape cổ": "gáy",
    "assumed tên": "tên giả",
    "lớp genus": "chi (sinh học)",
    "rộng expanse": "mênh mông",
    "mùa specific products)": "mùa sản vật",
    "earn tiền": "kiếm tiền",
    "tốt omen": "điềm lành",
    "cram trường": "lò luyện thi",
    "pear cây": "cây lê",
    "beat nhạc": "nhịp nhạc",
    "spare thời gian": "thời gian rảnh",
    "acquire kỹ năng": "thuần thục",
    "(parallels vĩ độ": "vĩ tuyến",
    "tốt dress": "áo đẹp",
    "mùa hè heat": "nóng mùa hè",
    "pack ngựa": "ngựa thồ",
    "gia đình crest": "huy hiệu gia tộc",
    "stirred trên": "phấn khích",
    "lớn lên dim": "mờ đi",
    "bend dưới": "cúi xuống",
    "leap trên": "nhảy lên",
    "tốt belt": "đai đẹp",
    "chịu grudge": "ân hận",
    "lớn dipper": "Bắc Đẩu",
    "gạo tub": "chậu gạo",
    "hull tàu": "thân tàu",
    "camphor cây": "cây long não",
    "âm jewels": "tiếng ngọc",
    "núi pass": "đèo",
    "confine phòng": "giam",
    "zelkova cây": "cây zelkova",
    "trái cây juice": "nước quả",
    "rinse miệng": "súc miệng",
    "núi stream": "suối núi",
    "crop thuế": "thuế hoa màu",
    "yêu dearly": "yêu tha thiết",
    "mạnh brave": "dũng cảm",
    "dấu hiệu rắn serpent": "tỵ (con giáp)",
    "fifth tháng": "tháng năm",
    "vũ khí & legs": "tay chân",
    "catalpa cây": "cây tử",
    "loại buổi sáng glory": "hoa muống",
    "dấu hiệu hare rabbit · fourth dấu hiệu chinese zodiac": "mão (con giáp)",
    "turkey đỏ": "đỏ thẫm",
    "biển bream · đỏ snapper": "cá tráp",
    "tốt crops": "mùa màng tốt",
    "pongee knotted lụa vải": "lụa thô",
    "pig sắt": "gang",
    "một tenth đi": "một phần mười",
    "urge ăn": "mời ăn",
    "lớn lên worse · lớn lên bulky": "phình to",
    "coconut cây": "cây dừa",
    "stringed instruments": "nhạc cụ dây",
    "counter for bows": "loại từ đếm cung",
    "years cũ": "tuổi",
    "rượu glass": "ly rượu",
    "nam tên suffix": "hậu tố tên nam",
    "drunken nói": "nói sảng",
    "được caught": "bị bắt",
    "shut trên": "xếp lại",
    "nice mát": "mát mẻ",
    "cloudy thời tiết": "trời nhiều mây",
    "mây trên": "mây che",
    "vĩ đại numbers": "số lớn",
    "đi cross": "băng qua",
    "land gần lâu đài": "đất gần thành",
    "kho báu trove": "kho báu",
    "cái gì đó heard thứ nhất thời gian": "nghe lần đầu",
    "lấy refuge": "ẩn náu",
    "đăng ký names": "sổ tên",
    "master nhà": "chủ nhà",
    "koto tiếng Nhật harp": "đàn koto",
    "cây paulownia": "cây ngô đồng",
    "female động vật": "con cái",
    "dairy nông trại": "trại sữa",
    "rót rượu sake": "rót rượu",
    "cái nhìn forward": "mong chờ",
    "đúng · phải under": "ngay dưới",
    "long time period": "thời gian dài",
    "the aged": "người già",
    "beautiful person (woman)": "mỹ nhân",
    "-like": "giống",
    "(1)": "",
}

# Headword-specific meaning fixes (kanji, meaning)
DICT_MEANING = {
    "気に入る": "thích · ưng ý",
    "似合う": "hợp",
    "適する": "thích hợp",
    "釣り合う": "cân xứng",
    "揃い": "cả bộ",
    "聴講": "dự thính",
    "真下": "ngay dưới",
    "待ち遠しい": "mong chờ",
    "動揺": "náo động",
    "破裂": "vỡ",
    "誘惑": "cám dỗ",
    "猛烈": "dữ dội",
    "蛇口": "vòi nước",
    "ハンガー": "móc áo",
    "背広": "áo vest",
    "気味": "cảm giác · vẻ",
    "絡む": "quấn",
    "略語": "từ viết tắt",
    "溜まり": "nợ đọng",
    "露": "sương",
    "煌びやか": "lòe loẹt",
    "皺": "nếp nhăn",
    "負う": "mang · mắc nợ",
    "覆す": "lật đổ",
    "馴らす": "thuần hóa",
    "掻き回す": "khuấy",
}

KANJI_MEANING = {
    "川": "sông",
    "非": "không · phi",
    "未": "chưa · vị",
    "宿": "quán trọ · trọ",
    "型": "khuôn",
    "泥": "bùn · trực thuộc",
    "掲": "treo · dán thông báo",
    "之": "của (cổ văn)",
    "黙": "im lặng",
    "澄": "trong trẻo",
    "於": "ở · tại",
    "冴": "trong trẻo · lạnh",
    "副": "phó",
    "畳": "chiếu tatami · xếp",
    "曇": "mây · trời u ám",
    "涼": "mát",
    "杯": "ly rượu",
    "才": "tài · tuổi",
    "君": "bạn · quân",
    "管": "ống",
    "久": "lâu · chuyện cũ",
    "億": "trăm triệu",
    "絡": "bị quấn",
    "張": "căng · loại từ đếm cung",
    "衆": "chúng · số đông",
    "渉": "băng qua",
    "脱": "cởi",
    "博": "bác · được khen",
    "密": "mật · mật độ dân số",
    "盤": "mâm · bát",
    "項": "hạng · gáy",
    "仮": "giả · tạm",
    "綱": "cương · chi",
    "浩": "mênh mông",
    "貫": "xuyên · khoảng 3,75 kg",
    "旬": "mười ngày · mùa sản vật",
    "稼": "cày · kiếm tiền",
    "祥": "điềm lành",
    "塾": "lò luyện thi",
    "梨": "lê",
    "拍": "nhịp",
    "暇": "rảnh",
    "熟": "chín · thuần thục",
    "緯": "vĩ · vĩ tuyến",
    "錦": "gấm",
    "暑": "nóng",
    "駄": "đà · ngựa thồ",
    "紋": "văn · huy hiệu",
    "奮": "phấn khích",
    "霞": "mù · mờ",
    "伏": "phục · cúi",
    "賓": "tân · nhân vật",
    "跳": "nhảy",
    "紳": "thân · quý ông",
    "恨": "hận",
    "斗": "đẩu · Bắc Đẩu",
    "鉢": "bát",
    "胴": "thân",
    "楠": "nam · long não",
    "玲": "linh · tiếng ngọc",
    "峠": "đèo",
    "幽": "u · giam",
    "槻": "cây zelkova",
    "酪": "lạc · sữa",
    "漱": "súc miệng",
    "渓": "khe suối",
    "租": "tô · thuế ruộng",
    "慕": "mộ · yêu tha thiết",
    "赳": "dũng cảm",
    "巳": "tỵ (con giáp)",
    "皐": "tháng năm",
    "肢": "chi · tay chân",
    "梓": "tử · cây tử",
    "舜": "thuấn",
    "卯": "mão (con giáp)",
    "茜": "thiến · đỏ thẫm",
    "鯛": "cá tráp",
    "穣": "nhương · mùa màng",
    "紬": "lụa thô",
    "銑": "gang",
    "勺": "chước · 1/10",
    "侑": "hữu · mời ăn",
    "嵩": "tung · phình",
    "椰": "dừa",
    "舜": "thuấn",
}

KANJI_EX = {
    "川": "sông ngòi",
    "春": "tuổi xuân",
    "訪": "thăm",
    "声": "cổ vũ",
    "路": "đường",
    "夢": "giấc mơ",
    "閉": "đóng cửa",
    "草": "dép cỏ",
    "掛": "trả góp",
    "陽": "mặt trời",
    "副": "phó từ",
    "針": "dây kim",
    "兵": "thủy thủ",
    "竹": "tre",
    "豊": "giàu",
    "岩": "dung nham",
    "郵": "thư",
    "燃": "cháy",
    "皮": "mỉa mai",
    "宝": "ngọc",
    "殿": "cung điện",
    "涙": "nước mắt",
    "氷": "băng",
    "粉": "phấn hoa",
    "粒": "hạt",
    "詞": "động từ",
    "閣": "nội các",
    "松": "cây thông",
    "及": "lan tới",
    "雄": "anh hùng",
    "葬": "tang lễ",
    "措": "bước",
    "項": "mục",
    "懸": "treo thưởng",
    "枠": "khung",
    "紛": "làm mất",
    "託": "ủy thác",
    "戒": "cảnh báo",
    "誉": "danh dự",
    "揺": "náo động",
    "仙": "ẩn sĩ",
    "偽": "giả mạo",
    "詩": "nhà thơ",
    "潮": "thủy triều",
    "孤": "mồ côi",
    "蓄": "tích trữ",
    "軸": "trục",
    "塾": "buổi học",
    "猛": "dữ dội",
    "牧": "đồng cỏ",
    "艦": "tàu chiến",
    "没": "chìm",
    "陰": "bóng",
    "丘": "đồi",
    "騰": "sôi",
    "豆": "đậu",
    "墜": "rơi",
    "肥": "phân bón",
    "脈": "mạch",
    "軌": "quỹ đạo",
    "俵": "võ đài",
    "鯨": "săn cá voi",
    "荘": "biệt thự",
    "詐": "gian lận",
    "奮": "phấn khích",
    "拓": "khai phá",
    "獄": "địa ngục",
    "稚": "ấu thơ",
    "把": "nắm",
    "菌": "vi khuẩn",
    "巣": "tổ",
    "晶": "tinh thể",
    "乏": "nghèo",
    "痴": "càm ràm",
    "尿": "nước tiểu",
    "陶": "đồ gốm",
    "寮": "ký túc xá",
    "珠": "ngọc trai",
    "獣": "thú",
    "蛇": "vòi nước",
    "陵": "đồi lăng",
    "霧": "sương mù",
    "渦": "xoáy",
    "刀": "dao cạo",
    "鼓": "trống",
    "塊": "cục",
    "腸": "ruột",
    "峡": "eo biển",
    "峰": "đỉnh",
    "蓮": "sen",
    "敢": "dũng cảm",
    "扉": "cửa",
    "剖": "mổ tử thi",
    "吟": "ngâm",
    "崇": "sùng bái",
    "唇": "môi",
    "茎": "thân",
    "虹": "cầu vồng",
    "眉": "lông mày",
    "栓": "nút chai",
    "憧": "khao khát",
    "梢": "ngọn cây",
    "耳": "nghe lần đầu",
    "城": "đất gần thành",
    "埋": "kho báu",
    "冊": "loại từ đếm sách",
    "避": "ẩn náu",
    "簿": "sổ tên",
    "那": "chủ nhà",
    "琴": "đàn koto",
    "桐": "cây ngô đồng",
    "雌": "con cái",
    "酪": "trại sữa",
    "誠": "thành thực",
    "跳": "nhảy",
}

KEEP_LATIN = {
    "jlpt", "ok", "tv", "dvd", "cd", "pc", "wifi", "app", "pdf", "api", "ai",
    "jr", "cm", "kg", "km", "mm", "ml", "phd", "oxy", "axit", "hydro", "sen",
    "haiku", "judo", "futon", "tsunami", "samurai", "hiragana", "katakana",
    "romaji", "kanji", "anime", "manga", "sushi", "karaoke", "kimono", "yen",
    "bento", "tokyo", "osaka", "kyoto", "shinto", "yukata", "tatami", "sumo",
    "shogi", "koto", "sake", "n5", "n4", "n3", "n2", "n1", "sasa", "zelkova",
}

EN_TOKEN = re.compile(r"[A-Za-z][A-Za-z'’.-]*")
TO_INF = re.compile(r"\bto [a-z]+(?: [a-z]+)*", re.I)


def first_gloss(meaning: str) -> str:
    part = meaning.split(" · ")[0].split(" / ")[0].strip(" ·")
    return part or meaning


def apply_phrase(s: str) -> str:
    out = s
    for src, dst in sorted(PHRASE.items(), key=lambda kv: -len(kv[0])):
        out = re.sub(re.escape(src), dst, out, flags=re.I)
    return out


def apply_words(s: str) -> str:
    def repl(m: re.Match[str]) -> str:
        w = m.group(0)
        wl = w.lower().rstrip(".")
        if wl in KEEP_LATIN:
            return w
        if wl in WORD:
            return WORD[wl]
        return w

    return EN_TOKEN.sub(repl, s)


def tidy(s: str) -> str:
    s = re.sub(r"\s{2,}", " ", s)
    s = re.sub(r"\s+([.,;:!?])", r"\1", s)
    s = re.sub(r"( · )+", " · ", s)
    s = re.sub(r"^( · )|( · )$", "", s)
    s = s.replace(" .", ".").strip(" ·")
    s = re.sub(r"\s+\.", ".", s)
    # collapse duplicated first token "sông · sông ba nét sông"
    parts = [p.strip() for p in s.split(" · ") if p.strip()]
    seen = []
    for p in parts:
        if p not in seen:
            seen.append(p)
    return " · ".join(seen)


def fix_text(s: str) -> str:
    if not s:
        return s
    s = apply_phrase(s)
    s = apply_words(s)
    return tidy(s)


def fix_example(meaning: str, vi_ex: str) -> str:
    if not vi_ex:
        return vi_ex
    if TO_INF.search(vi_ex):
        gloss = first_gloss(fix_text(meaning))
        return f"Mỗi ngày đều cần {gloss}."
    return fix_text(vi_ex)


def patch_dict() -> int:
    rows = json.loads(DICT.read_text(encoding="utf-8"))
    n = 0
    for r in rows:
        kanji, kana, romaji, meaning, pos, level, jp, kana_ex, romaji_ex, vi_ex = r
        m2 = DICT_MEANING.get(kanji, fix_text(meaning))
        e2 = fix_example(m2, vi_ex)
        if m2 != meaning or e2 != vi_ex:
            r[3] = m2
            r[9] = e2
            n += 1
    DICT.write_text(json.dumps(rows, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return n


def patch_kanji() -> int:
    rows = json.loads(KANJI.read_text(encoding="utf-8"))
    n = 0
    for r in rows:
        ch, on, kun, meaning, strokes, level, ex_word, ex_kana, ex_vi = r
        m2 = KANJI_MEANING.get(ch, fix_text(meaning))
        e2 = KANJI_EX.get(ch, fix_text(ex_vi))
        if m2 != meaning or e2 != ex_vi:
            r[3] = m2
            r[8] = e2
            n += 1
    KANJI.write_text(json.dumps(rows, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return n


def existing_hv() -> dict[str, str]:
    text = HV_TS.read_text(encoding="utf-8")
    return dict(re.findall(r'^\s+(\S+): "([^"]+)"', text, re.M))


def pick_viet(raw: str) -> str:
    parts = [p for p in re.split(r"\s+", raw.strip()) if p]
    if not parts:
        return ""
    skip = {
        "trăm", "ngựa", "lầy", "đang", "chò", "giâu", "tợ", "nghiền", "nghiến",
        "nghiện", "ne", "nè", "né", "nê", "nề", "nể", "nễ", "nệ", "nơi", "phay",
        "chẻm", "khía", "êu", "nộm",
    }
    one = [p for p in parts if p.lower() not in skip]
    # Prefer a 1-syllable literary reading near the end (often Hán-Việt).
    literary = [p for p in one if "-" not in p]
    if literary:
        # 東 đang đông → đông; 百 bá bách trăm → bách (trăm skipped)
        return literary[-1] if literary[-1].lower() not in skip else literary[0]
    return parts[-1]


def build_hv_extra() -> int:
    have = existing_hv()
    viet: dict[str, str] = {}
    readings = Path("/tmp/Unihan_Readings.txt")
    variants = Path("/tmp/Unihan_Variants.txt")
    if readings.exists():
        for line in readings.read_text(encoding="utf-8").splitlines():
            if line.startswith("#") or "kVietnamese" not in line:
                continue
            parts = line.split("\t")
            if len(parts) < 3 or parts[1] != "kVietnamese":
                continue
            viet[chr(int(parts[0][2:], 16))] = parts[2].strip()
    trad: dict[str, str] = {}
    if variants.exists():
        for line in variants.read_text(encoding="utf-8").splitlines():
            if line.startswith("#") or "kTraditionalVariant" not in line:
                continue
            parts = line.split("\t")
            if len(parts) < 3 or parts[1] != "kTraditionalVariant":
                continue
            trad[chr(int(parts[0][2:], 16))] = parts[2].strip()

    def lookup(ch: str) -> str:
        if ch in viet:
            return pick_viet(viet[ch])
        raw = trad.get(ch, "")
        for m in re.finditer(r"U\+([0-9A-F]+)", raw, re.I):
            alt = chr(int(m.group(1), 16))
            if alt in viet:
                return pick_viet(viet[alt])
        return ""

    MANUAL = {
        "気": "Khí", "円": "Viên", "北": "Bắc", "電": "Điện", "聞": "Văn",
        "食": "Thực", "何": "Hà", "毎": "Mỗi", "読": "Độc", "父": "Phụ",
        "発": "Phát", "者": "Giả", "問": "Vấn", "題": "Đề", "売": "Mại",
        "広": "Quảng", "町": "Đinh", "転": "Chuyển", "楽": "Lạc", "験": "Nghiệm",
        "帰": "Quy", "悪": "Ác", "図": "Đồ", "歩": "Bộ", "春": "Xuân",
        "夏": "Hạ", "駅": "Dịch", "曜": "Diệu", "肉": "Nhục", "貸": "Thải",
        "飯": "Phạn", "昼": "Trú", "犬": "Khuyển", "対": "Đối", "米": "Mễ",
        "実": "Thực", "戦": "Chiến", "経": "Kinh", "続": "Tục", "権": "Quyền",
        "済": "Tế", "資": "Tư", "際": "Tế", "面": "Diện", "昨": "Tạc",
        "増": "Tăng", "直": "Trực", "疑": "Nghi", "構": "Cấu", "優": "Ưu",
        "宅": "Trạch", "席": "Tịch", "乗": "Thừa", "労": "Lao", "伝": "Truyền",
        "働": "Động", "観": "Quan", "申": "Thân", "様": "Dạng", "識": "Thức",
        "満": "Mãn", "単": "Đơn", "愛": "Ái", "込": "Nhập", "薬": "Dược",
        "険": "Hiểm", "頼": "Lại", "覚": "Giác", "抜": "Bạt", "努": "Nỗ",
        "静": "Tĩnh", "婚": "Hôn", "遅": "Trì", "雑": "Tạp", "賛": "Tán",
        "戻": "Lệ", "絵": "Hội", "笑": "Tiếu", "夢": "Mộng", "緒": "Tự",
        "酒": "Tửu", "寝": "Tẩm", "歯": "Xỉ", "雪": "Tuyết", "誤": "Ngộ",
        "泳": "Vịnh", "祖": "Tổ", "鳴": "Minh", "髪": "Phát", "靴": "Ngoa",
        "恥": "Sỉ", "党": "Đảng", "総": "Tổng", "県": "Huyện", "改": "Cải",
        "団": "Đoàn", "革": "Cách", "営": "Doanh", "線": "Tuyến", "欧": "Âu",
        "辺": "Biên", "復": "Phục", "脳": "Não", "蔵": "Tàng", "量": "Lượng",
        "型": "Hình", "専": "Chuyên", "湾": "Loan", "録": "Lục", "旧": "Cựu",
        "材": "Tài", "券": "Khoán", "捜": "Sưu", "並": "Tịnh", "競": "Cạnh",
        "販": "Phiến", "貿": "Mậu", "児": "Nhi", "換": "Hoán", "圧": "Áp",
        "芸": "Nghệ", "伸": "Thân", "爆": "Bộc", "帯": "Đái", "豊": "Phong",
        "厚": "Hậu", "齢": "Linh", "囲": "Vi", "軽": "Khinh", "庁": "Sảnh",
        "募": "Mộ", "裏": "Lý", "仏": "Phật", "寺": "Tự", "巨": "Cự",
        "震": "Chấn", "籍": "Tịch", "汚": "Ô", "複": "Phức", "郵": "Bưu",
        "仲": "Trọng", "栄": "Vinh", "届": "Giới", "巻": "Quyển", "雇": "Cố",
        "焼": "Thiêu", "臓": "Tạng", "薄": "Bạc", "秒": "Miếu", "翌": "Dực",
        "悩": "Não", "浴": "Dục", "砂": "Sa", "塩": "Diêm", "緑": "Lục",
        "肩": "Kiên", "荷": "Hà", "郊": "Giao", "踊": "Dũng", "冊": "Sách",
        "菜": "Thái", "卵": "Noãn", "鉱": "Khoáng", "涙": "Lệ", "拝": "Bái",
        "祈": "Kỳ", "糸": "Mịch", "汗": "Hãn", "咲": "Tiếu", "脂": "Chi",
        "肌": "Cơ", "隅": "Ngung", "鼻": "Tỵ", "胃": "Vị", "畳": "Điệp",
        "膚": "Phu", "濯": "Trạc", "舟": "Chu", "憎": "Tăng", "曇": "Đàm",
        "伺": "Tứ", "価": "Giá", "挙": "Cử", "応": "Ứng", "検": "Kiểm",
        "沢": "Trạch", "幹": "Cán", "宮": "Cung", "率": "Suất", "環": "Hoàn",
        "撃": "Kích", "融": "Dung", "渉": "Thiệp", "崎": "Kỳ", "盟": "Minh",
        "従": "Tòng", "拡": "Khuếch", "弁": "Biện", "就": "Tựu", "異": "Dị",
        "厳": "Nghiêm", "維": "Duy", "浜": "Tân", "塁": "Lũy", "昭": "Chiêu",
        "廃": "Phế", "臨": "Lâm", "壊": "Hoại", "継": "Kế", "闘": "Đấu",
        "逮": "Đãi", "崩": "Băng", "聴": "Thính", "幕": "Mạc", "択": "Trạch",
        "徴": "Trưng", "弾": "Đạn", "償": "Thường", "拠": "Cứ", "秘": "Bí",
        "鈴": "Linh", "懸": "Huyền", "街": "Nhai", "掲": "Yết", "棄": "Khí",
        "邸": "Để", "縮": "Súc", "枠": "Khung", "恵": "Huệ", "緩": "Hoãn",
        "需": "Nhu", "購": "Cấu", "賃": "Lẫm", "衝": "Xung", "焦": "Tiêu",
        "浦": "Phổ", "析": "Tích", "譲": "Nhượng", "握": "Ác", "銭": "Tiền",
        "渋": "Sáp", "操": "Thao", "誕": "Đản", "駆": "Khu", "津": "Tân",
        "稲": "Đạo", "仮": "Giả", "裂": "Liệt", "訳": "Dịch", "弘": "Hoằng",
        "祉": "Chỉ", "歓": "Hoan", "勧": "Khuyến", "騒": "Tao", "閥": "Phiệt",
        "縄": "Thằng", "既": "Ký", "薦": "Tiến", "範": "Phạm", "隠": "Ẩn",
        "徳": "Đức", "杉": "Sam", "釈": "Thích", "倉": "Thương", "彦": "Nhan",
        "俳": "Bài", "浩": "Hạo", "剤": "Tề", "瀬": "Lại", "陥": "Hãm",
        "旬": "Tuần", "舎": "Xá", "較": "Giác", "抵": "Để", "茂": "Mậu",
        "飾": "Sức", "潟": "Diệc", "魅": "Mị", "敷": "Phu", "擁": "Ủng",
        "圏": "Quyền", "酸": "Toan", "脚": "Cước", "桜": "Anh", "賠": "Bồi",
        "摩": "Ma", "縦": "Túng", "蓄": "Súc", "稼": "Giá", "瞬": "Thuấn",
        "祥": "Tường", "宏": "Hoành", "唆": "Toa", "賄": "Hối", "堀": "Quật",
        "耐": "Nại", "芳": "Phương", "剣": "Kiếm", "彰": "Chương", "恒": "Hằng",
        "岳": "Nhạc", "概": "Khái", "雰": "Phân", "諮": "Tư", "亀": "Quy",
        "簿": "Bộ", "牧": "Mục", "殖": "Thực", "艦": "Hạm", "暖": "Noãn",
        "昌": "Xương", "寛": "Khoan", "覆": "Phúc", "浄": "Tịnh", "肺": "Phế",
        "靖": "Tĩnh", "鑑": "Giám", "飼": "Tự", "銘": "Minh", "稿": "Cảo",
        "啓": "Khải", "壌": "Nhưỡng", "粘": "Niêm", "悟": "Ngộ", "舗": "Phô",
        "妊": "Nhâm", "騰": "Đằng", "岐": "Kỳ", "艇": "Đĩnh", "径": "Kính",
        "暑": "Thử", "磯": "Ky", "剰": "Thặng", "繊": "Tiêm", "霊": "Linh",
        "翻": "Phiên", "脈": "Mạch", "俵": "Biểu", "妨": "Phương", "荘": "Trang",
        "懐": "Hoài", "栽": "Tài", "駄": "Đà", "聡": "Thông", "浪": "Lãng",
        "亜": "Á", "覧": "Lãm", "勲": "Huân", "曙": "Thự", "卸": "Tá",
        "穏": "Ổn", "垣": "Viên", "釣": "Điếu", "粛": "Túc", "嘉": "Gia",
        "稚": "Trĩ", "滋": "Tư", "煮": "Chử", "姫": "Cơ", "践": "Tiễn",
        "剛": "Cương", "砕": "Toái", "巣": "Sào", "頻": "Tần", "棚": "Bằng",
        "辰": "Thìn", "霞": "Hà", "墨": "Mặc", "履": "Lý", "劣": "Liệt",
        "殴": "Ốu", "娠": "Thần", "怪": "Quái", "酔": "Túy", "該": "Cai",
        "髄": "Tủy", "晋": "Tấn", "穂": "Tùy", "癒": "Dũ", "桐": "Đồng",
        "尿": "Niệu", "虜": "Lỗ", "陶": "Đào", "弥": "Di", "芽": "Nha",
        "寧": "Ninh", "循": "Tuần", "怠": "Đãi", "寮": "Liêu", "祐": "Hữu",
        "獣": "Thú", "匠": "Tượng", "縫": "Phùng", "眺": "Điều", "憩": "Khế",
        "媛": "Viện", "溝": "Câu", "刈": "Ngải", "睡": "Thụy", "笹": "Sasa",
        "穀": "Cốc", "舶": "Bạc", "餓": "Nga", "掌": "Chưởng", "縛": "Phược",
        "暦": "Lịch", "粋": "Túy", "弦": "Huyền", "摂": "Nhiếp", "飽": "Bão",
        "狩": "Thú", "渦": "Oa", "碑": "Bi", "鍛": "Đoán", "鼓": "Cổ",
        "猶": "Do", "膜": "Mạc", "腸": "Tràng", "漬": "Tự", "糾": "Củ",
        "亮": "Lượng", "坪": "Bình", "紺": "Cám", "娯": "Ngu", "椿": "Xuân",
        "峰": "Phong", "醸": "Nhương", "遍": "Biến", "衡": "Hành", "薫": "Huân",
        "猟": "Liệp", "酵": "Hiếu", "豚": "Đồn", "遮": "Giá", "扉": "Phi",
        "窃": "Thiết", "瑞": "Thụy", "肪": "Phương", "奔": "Bôn", "蘭": "Lan",
        "迅": "Tấn", "肖": "Tiếu", "秦": "Tần", "茅": "Mao", "藩": "Phiên",
        "輔": "Phụ", "鶏": "Kê", "禅": "Thiền", "胴": "Đồng", "嵐": "Lam",
        "絹": "Quyên", "陪": "Bồi", "郁": "Úc", "悠": "Du", "淑": "Thục",
        "帆": "Phàm", "暁": "Hiểu", "侍": "Thị", "峠": "Đèo", "肇": "Triệu",
        "渇": "Khát", "酢": "Tạc", "嶺": "Lĩnh", "喬": "Kiều", "漆": "Tất",
        "岬": "Giáp", "癖": "Phích", "礁": "Tiêu", "樺": "Hoa", "塀": "Bình",
        "胡": "Hồ", "幽": "U", "峻": "Tuấn", "卑": "Tì", "侮": "Vũ",
        "鋳": "Chú", "抹": "Mạt", "隷": "Lệ", "酪": "Lạc", "逝": "Thệ",
        "汽": "Khí", "襟": "Khâm", "蛍": "Huỳnh", "庸": "Dung", "搾": "Trá",
        "畔": "Bạn", "遼": "Liêu", "唄": "Bái", "漱": "Sấu", "嬢": "Nương",
        "渓": "Khê", "窯": "Diêu", "褒": "Bao", "禎": "Trinh", "桟": "Sạn",
        "虹": "Hồng", "泌": "Bí", "赳": "Củ", "蚊": "Văn", "藻": "Tảo",
        "尭": "Nghiêu", "嚇": "Hách", "凸": "Đột", "硝": "Tiêu", "慧": "Tuệ",
        "薪": "Tân", "褐": "Hạt", "賜": "Tứ", "嵯": "Ta", "綜": "Tống",
        "繕": "Thiện", "鮎": "Niên", "榛": "Trăn", "凹": "Ao", "艶": "Diễm",
        "惣": "Tổng", "蔦": "Điếu", "錬": "Luyện", "隼": "Chuẩn", "衷": "Trung",
        "雛": "Sồ", "惟": "Duy", "佑": "Hữu", "耀": "Diệu", "黛": "Đại",
        "憧": "Đồng", "宵": "Tiêu", "妄": "Vọng", "脩": "Tu", "嬉": "Hi",
        "蒼": "Thương", "暉": "Huy", "頒": "Ban", "彗": "Tuệ", "謄": "Đằng",
        "梓": "Tử", "絢": "Huyến", "畝": "Mẫu", "惰": "Nọa", "冴": "Nghi",
        "偲": "Ti", "壱": "Nhất", "允": "Doãn", "蒔": "Thì", "鯉": "Lý",
        "弧": "Hồ", "瑛": "Anh", "彪": "Bưu", "但": "Đãn", "綺": "Khỉ",
        "芋": "Vu", "茜": "Thiến", "皓": "Hạo", "洸": "Quang", "緋": "Phi",
        "鯛": "Điều", "穣": "Nhương", "倹": "Kiểm", "凪": "Im", "栞": "Kham",
        "崚": "Lăng", "晟": "Thịnh", "亦": "Diệc", "弐": "Nhị", "塑": "Tố",
        "侑": "Hữu", "叡": "Duệ", "匁": "Chỉ", "裟": "Sa", "誼": "Nghị",
        "錘": "Chùy", "竣": "Tuấn", "洵": "Tuân", "茉": "Mạt", "宥": "Hựu",
        "昴": "Mão", "耶": "Da", "侃": "Khản", "迪": "Địch", "梢": "Sao",
        "菖": "Xương", "莞": "Hoàn", "梧": "Ngô", "莉": "Lợi", "詢": "Tuân",
        "晏": "Án", "衿": "Khâm", "眸": "Mâu", "瑳": "Ta", "奎": "Khuê",
        "虞": "Ngu", "琳": "Lâm", "絃": "Huyền", "諄": "Thuần", "滉": "Hoảng",
        "枠": "Khung",
    }

    kanji_rows = json.loads(KANJI.read_text(encoding="utf-8"))
    extra: dict[str, str] = {}
    for row in kanji_rows:
        ch = row[0]
        if ch in have:
            continue
        raw = MANUAL.get(ch) or lookup(ch)
        if not raw:
            continue
        # Title-case Vietnamese HV: Quốc, not quốc — keep existing caps in MANUAL
        if ch in MANUAL:
            extra[ch] = MANUAL[ch]
        else:
            extra[ch] = raw[:1].upper() + raw[1:]

    lines = ["/** Hán-Việt bổ sung N3–N1 (tra cứu). N5–N4 ưu tiên han-viet.ts. */", "export const HAN_VIET_EXTRA: Record<string, string> = {"]
    for ch, hv in extra.items():
        lines.append(f'  {ch}: "{hv}",')
    lines.append("};")
    lines.append("")
    HV_EXTRA.write_text("\n".join(lines), encoding="utf-8")
    return len(extra)


def main() -> None:
    d = patch_dict()
    k = patch_kanji()
    h = build_hv_extra()
    print(f"dict patched {d}, kanji patched {k}, han-viet extra {h}")


if __name__ == "__main__":
    main()
