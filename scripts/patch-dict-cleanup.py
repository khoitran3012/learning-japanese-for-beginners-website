#!/usr/bin/env python3
"""One-shot cleanup: leftover English, wrong POS/meanings, generic examples."""
from __future__ import annotations

import json
import re
from pathlib import Path

JSON_PATH = Path("/workspace/src/data/dictionary-jlpt.json")

EN_VI = {
    "basement": "tầng hầm",
    "aviation": "hàng không",
    "futility": "vô ích",
    "validity": "hiệu lực",
    "prediction": "dự đoán",
    "automation": "tự động hóa",
    "taxation": "đánh thuế",
    "probability": "xác suất",
    "multiplication": "phép nhân",
    "ventilation": "thông gió",
    "observation": "quan sát",
    "appreciation": "thưởng thức",
    "inversion": "đảo ngược",
    "nationality": "quốc tịch",
    "calamity": "tai họa",
    "assignment": "chỉ định",
    "digestion": "tiêu hóa",
    "disinfection": "khử trùng",
    "omission": "lược bỏ",
    "evaporation": "bay hơi",
    "adjustment": "chỉnh sửa",
    "publicity": "tuyên truyền",
    "fluctuation": "tăng giảm",
    "measurement": "đo lường",
    "derailment": "trật bánh",
    "sterility": "vô sinh",
    "reconciliation": "hòa giải",
    "condiment": "gia vị",
    "interpretation": "phiên dịch",
    "cleanness": "trong suốt",
    "fortune": "vận may",
    "suicide": "tự sát",
    "magic": "ảo thuật",
    "queen": "nữ hoàng",
    "actress": "nữ diễn viên",
    "wheat": "lúa mì",
    "parcel": "bưu kiện",
    "floor": "sàn nhà",
    "elephant": "voi",
    "castle": "lâu đài",
    "signal": "tín hiệu",
    "heart": "tim",
    "buddy": "bạn thân",
    "needle": "kim",
    "tongue": "lưỡi",
    "twins": "sinh đôi",
    "frost": "sương giá",
    "noise": "tiếng ồn",
    "bundle": "bó",
    "sleeve": "tay áo",
    "atmosphere": "khí quyển",
    "ambassador": "đại sứ",
    "continent": "lục địa",
    "valley": "thung lũng",
    "earth": "đất / trái đất",
    "breathe": "thở",
    "vomit": "nôn",
    "headache": "đau đầu",
    "coworker": "đồng nghiệp",
    "poison": "thuốc độc",
    "japan": "Nhật Bản",
    "farmer": "nông dân",
    "farmers": "nông dân",
    "museum": "bảo tàng",
    "applause": "vỗ tay",
    "denial": "phủ nhận",
    "tragedy": "bi kịch",
    "comparison": "so sánh",
    "bottle": "chai",
    "complaint": "than phiền",
    "fellowship": "giao du",
    "cloth": "vải",
    "width": "chiều rộng",
    "garments": "trang phục",
    "buddha": "Phật",
    "sounds": "âm thanh",
    "things": "sự việc",
    "physics": "vật lý",
    "phrase": "câu / phàn nàn",
    "goblin": "yêu quái",
    "walkway": "vỉa hè",
    "treasure": "kho báu",
    "charm": "sức hút",
    "bother": "phiền phức",
    "permit": "giấy phép",
    "blanket": "chăn",
    "midnight": "nửa đêm",
    "championship": "vô địch",
    "better": "có lợi hơn",
    "wings": "cánh",
    "storm": "bão",
    "lover": "người yêu",
    "serial": "liên tiếp",
    "luxury": "xa xỉ",
    "accent": "trọng âm",
    "antenna": "ăng-ten",
    "etiquette": "nghi thức",
    "apron": "tạp dề",
    "orchestra": "dàn nhạc",
    "calorie": "calo",
    "cooler": "máy lạnh",
    "siren": "còi báo",
    "shutter": "cửa chớp",
    "stewardess": "tiếp viên hàng không",
    "stockings": "bít tất",
    "speaker": "loa",
    "cement": "xi măng",
    "diagram": "sơ đồ",
    "diamond": "kim cương",
    "tempo": "nhịp độ",
    "nylon": "ny-lon",
    "pistol": "súng lục",
    "vitamin": "vitamin",
    "vinyl": "nhựa vinyl",
    "zipper": "khóa kéo",
    "blouse": "áo blouse",
    "brush": "bàn chải",
    "plastic": "nhựa",
    "platform": "sân ga",
    "print": "in",
    "brooch": "trâm cài",
    "program": "chương trình",
    "veteran": "người kỳ cựu",
    "helicopter": "trực thăng",
    "marathon": "marathon",
    "motor": "động cơ",
    "monorail": "tàu một ray",
    "lunch": "bữa trưa",
    "rhythm": "nhịp điệu",
    "ribbon": "ruy băng",
    "raincoat": "áo mưa",
    "locker": "tủ khóa",
    "lobby": "sảnh",
    "alighting": "xuống xe",
    "ditch": "mương",
    "underline": "gạch dưới",
    "aerial": "trên không",
    "volcano": "núi lửa",
    "fireworks": "pháo hoa",
    "cargo": "hàng hóa",
    "mosquito": "muỗi",
    "breakup": "chia tay",
    "ocean": "đại dương",
    "colors": "màu sắc",
    "external": "bên ngoài",
    "hedge": "hàng rào",
    "angle": "góc",
    "undergraduate": "sinh viên đại học",
    "brackets": "dấu ngoặc",
    "thoughts": "suy nghĩ",
    "canning": "đóng hộp",
    "utensil": "dụng cụ",
    "famine": "nạn đói",
    "reverse": "ngược lại",
    "holiday": "ngày lễ",
    "grant": "cấp phát",
    "fisherman": "ngư dân",
    "boundary": "ranh giới",
    "curve": "đường cong",
    "goldfish": "cá vàng",
    "fancy": "ưa thích",
    "honorific": "kính ngữ",
    "longitude": "kinh độ",
    "modesty": "khiêm tốn",
    "humble": "khiêm nhường",
    "microscope": "kính hiển vi",
    "habitat": "môi trường sống",
    "origin": "nguồn gốc",
    "paste": "hồ dán",
    "pepper": "tiêu",
    "pleasure": "niềm vui",
    "merit": "công lao",
    "lipstick": "son môi",
    "plaza": "quảng trường",
    "lecturer": "giảng viên",
    "mineral": "khoáng sản",
    "perfume": "nước hoa",
    "rational": "hợp lý",
    "sewing": "may vá",
    "lumber": "gỗ xẻ",
    "manufacture": "chế tạo",
    "erasure": "tẩy xóa",
    "photographing": "chụp ảnh",
    "triangle": "tam giác",
    "arithmetic": "số học",
    "abacus": "bàn tính",
    "acidity": "độ chua",
    "sashimi": "sashimi",
    "corpse": "thi thể",
    "wastepaper": "giấy vụn",
    "violet": "màu tím",
    "children": "trẻ em",
    "magnet": "nam châm",
    "writing": "chữ viết",
    "achievements": "thành tích",
    "stripe": "sọc",
    "sketching": "phác họa",
    "editorial": "xã luận",
    "garage": "nhà để xe",
    "faucet": "vòi nước",
    "handy": "tiện tay",
    "wrist": "cổ tay",
    "restroom": "nhà vệ sinh",
    "procedure": "thủ tục",
    "repairs": "sửa chữa",
    "penmanship": "chữ viết tay",
    "idiom": "thành ngữ",
    "predicate": "vị ngữ",
    "bookshop": "hiệu sách",
    "calligraphy": "thư pháp",
    "recording": "ghi âm",
    "decimal": "thập phân",
    "alcove": "hốc tường",
    "humid": "ẩm",
    "trees": "cây cối",
    "tableware": "bát đĩa",
    "shinkansen": "tàu shinkansen",
    "thumb": "ngón cái",
    "humanities": "nhân văn",
    "vinegar": "giấm",
    "chart": "biểu đồ",
    "vertical": "thẳng đứng",
    "bonus": "tiền thưởng",
    "poster": "áp phích",
    "pyjamas": "đồ ngủ",
    "drama": "kịch / phim truyền hình",
    "violin": "vĩ cầm",
    "hiking": "đi bộ đường dài",
    "pilot": "phi công",
    "picnic": "dã ngoại",
    "video": "video",
    "yacht": "du thuyền",
    "particle": "trợ từ",
    "fellowship": "giao du",
    "rat": "chuột",
    "ply": "lớp / sợi",
    "towel": "khăn",
    "mask": "khẩu trang",
    "demo": "biểu tình / bản demo",
    "knock": "gõ cửa",
    "paint": "sơn",
    "home": "nhà / sân nhà",
    "joy": "niềm vui",
    "gold": "vàng",
    "silver": "bạc",
    "tuesday": "thứ Ba",
    "friday": "thứ Sáu",
    "three": "ba",
    "six": "sáu",
    "raw": "sống / thô",
    "charge": "phụ trách",
    "savings": "tiền tiết kiệm",
    "bankruptcy": "phá sản",
    "life": "cuộc sống",
    "soup": "súp",
    "copy": "bản sao",
    "photocopy": "bản photocopy",
    "truck": "xe tải",
    "screw": "ốc vít",
    "seminar": "chuyên đề",
    "pliers": "kìm",
    "broom": "chổi",
    "ruler": "thước kẻ",
    "conductor": "trưởng tàu",
    "wheel": "bánh xe",
    "subject": "chủ ngữ",
    "receiver": "ống nghe",
    "ground": "mặt đất",
    "basin": "lưu vực",
    "birth": "sinh nở",
    "negative": "phim âm bản",
    "neurosis": "loạn thần kinh",
    "filter": "bộ lọc",
    "monitor": "màn hình",
    "lightning": "tia chớp",
    "petal": "cánh hoa",
    "gruel": "cháo",
    "trunk": "thân cây",
    "bulb": "củ (cây)",
    "date": "ngày tháng",
    "hem": "gấu áo",
    "sale": "bán giảm giá",
    "secretary": "thư ký",
    "heel": "gót giày",
    "maple": "cây phong",
    "alarm-clock": "đồng hồ báo thức",
    "congratulations!": "chúc mừng!",
    "congratulations": "chúc mừng",
    "quiet": "im lặng",
    "eat": "ăn",
    "know": "biết",
    "look": "nhìn",
    "you": "bạn",
    "possibly": "có thể",
}

PHRASE = {
    "(fam) you (sing)": "bạn (thân mật)",
    "(1) a (photo)copy": "bản photocopy",
    "(western) soup": "súp",
    "(hand) towel": "khăn tay",
    "(abbr) demo": "biểu tình / demo",
    "playing cards (lit: trump)": "bài tây",
    "(n) paint (nl: pek)": "sơn",
    "(female) you might say": "ừ thì",
    "(abbr) tuesday": "thứ Ba",
    "(abbr) friday": "thứ Sáu",
    "(a) joy": "niềm vui",
    "(male) (vulg) to eat": "ăn (thô)",
    "(human) life (i.e. conception to death)": "đời người",
    "(human) life": "sinh mạng",
    "(in) charge": "phụ trách",
    "(bank) savings": "tiền tiết kiệm",
    "(personal) bankruptcy": "phá sản",
    "(not) all": "không nhất thiết",
    "act (law: the x act)": "đạo luật",
    "(n) playing cards (pt: carta)": "bài",
    "(pt:) (n) playing cards (pt: carta)": "bài",
    "(deathly) quiet": "im phăng phắc",
    "contest (fr: concours)": "cuộc thi",
    "(n) rock-scissors-paper game": "oẳn tù tì",
    "(n) seminar": "chuyên đề",
    "(a) screw": "ốc vít",
    "(abbr) pliers (lit: pinchers)": "kìm",
    "(1) (japanese) maple": "cây phong Nhật",
    "(enrolled) in school": "đang học",
    "(train) conductor": "trưởng tàu",
    "(car) wheel": "bánh xe",
    "(gram) subject": "chủ ngữ",
    "(telephone) receiver": "ống nghe điện thoại",
    "(hum) to know": "biết (khiêm)",
    "(not) very": "không mấy",
    "(the) ground": "mặt đất",
    "(measuring) ruler": "thước kẻ",
    "(hon) aunt": "cô/dì (tôn kính)",
    "(abbr) alarm-clock": "đồng hồ báo thức",
    "(sudden) evening shower (rain)": "mưa rào chiều",
    "(river) basin": "lưu vực sông",
    "(audio) recording": "ghi âm",
    "(n) broom": "chổi",
    "(giving) birth": "sinh nở",
    "(ateji) (int) (uk) congratulations!": "chúc mừng!",
    "(de:) (n) clinical records (de: karte)": "bệnh án",
    "(photographic) negative": "phim âm bản",
    "(de:) (n) neurosis (de: neurose)": "loạn thần kinh",
    "(camera) filter": "kính lọc",
    "(computer) monitor": "màn hình máy tính",
    "hire car (lit: rent-a-car)": "xe thuê",
    "x-ray (lit: roentgen)": "x-quang",
    "(flash of) lightning": "tia chớp",
    "(flower) petal": "cánh hoa",
    "(rice) gruel": "cháo",
    "(tree) trunk": "thân cây",
    "(plant) bulb": "củ giống",
    "(foot) race": "chạy đua",
    "(the) date": "ngày tháng",
    "(please) look": "xin hãy xem",
    "(water-filled) paddy field": "ruộng lúa",
    "(skirt) hem": "gấu váy",
    "(geometrical) opposite side": "cạnh đối diện",
    "1.  to breathe": "thở",
    "2.  to tell (lies)": "nói dối",
    "3.  to vomit": "nôn",
    "(cannot) possibly": "không thể nào",
    "(bargain) sale": "bán giảm giá",
    "(private) secretary": "thư ký riêng",
    "(proceeding to) new appointment": "đi nhận nhiệm sở",
    "(open) fire": "lửa trại",
    "(shoe) heel": "gót giày",
    "(num) three": "ba",
    "(num) six": "sáu",
    "1.  if (conjunction)": "và / với / rằng",
    "skillful (only in comparisons)": "khéo (khi so sánh)",
    "(2) what on earth?": "rốt cuộc là gì?",
    "(1) gold": "vàng",
    "(1) silver": "bạc",
    "(2) raw": "sống",
    "(2) home": "sân nhà / nhà",
    "10e4:1 odds": "vạn lần một",
    "~ street": "phố ~",
    "1.  if (conjunction)": "và / với / rằng",
    "playing cards (pt: carta)": "bài",
    "(fr:) (n) rough sketch (fr: dessin)": "phác thảo",
}

FORCE = {
    ("ヶ月", "かげつ"): ("tháng (loại từ đếm)", "số từ"),
    ("歳", "さい"): ("tuổi (loại từ đếm)", "số từ"),
    ("畳", "じょう"): ("chiếu (loại từ đếm)", "số từ"),
    ("で", "で"): ("ở / bằng / vì", "trợ từ"),
    ("ね", "（感）"): ("nhỉ / chứ", "trợ từ"),
    ("より", "より"): ("hơn / từ", "trợ từ"),
    ("と", "と"): ("và / với / rằng", "trợ từ"),
    ("助詞", "じょし"): ("trợ từ (loại từ)", "danh từ"),
    ("微塵", "みじん"): ("mảnh vụn / một chút", "danh từ"),
    ("付き合い", "つきあい"): ("mối quan hệ / giao du", "danh từ"),
    ("付合う", "つきあう"): ("giao du / hẹn hò", "động từ nhóm 1"),
    ("付き合う", "つきあう"): ("giao du / hẹn hò", "động từ nhóm 1"),
    ("おやすみ", "おやすみ"): ("chúc ngủ ngon", "biểu hiện"),
    ("お休み", "おやすみ"): ("ngày nghỉ / chúc ngủ ngon", "danh từ"),
    ("ごちそうさま", "ごちそうさま"): ("cảm ơn vì bữa ăn", "biểu hiện"),
    ("ご馳走さま", "ごちそうさま"): ("cảm ơn vì bữa ăn", "biểu hiện"),
    ("こんばんは", "こんばんは"): ("chào buổi tối", "biểu hiện"),
    ("今晩は", "こんばんは"): ("chào buổi tối", "biểu hiện"),
    ("かしこまりました", "かしこまりました"): ("vâng ạ / đã hiểu", "biểu hiện"),
    ("畏まりました", "かしこまりました"): ("vâng ạ / đã hiểu", "biểu hiện"),
    ("よろしく", "（感）"): ("rất mong được chiếu cố", "biểu hiện"),
    ("宜しく", "よろしく"): ("rất mong được chiếu cố", "biểu hiện"),
    ("どうぞ", "どうぞ"): ("xin mời / cứ tự nhiên", "biểu hiện"),
}

VI_DIAC = re.compile(
    r"[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]",
    re.I,
)


def cap_ro(s: str) -> str:
    return s[:1].upper() + s[1:] if s else s


def clean_part(p: str) -> str:
    raw = p.strip()
    if not raw:
        return raw
    if VI_DIAC.search(raw) and not re.search(r"\b(the|with|from|that|this|used)\b", raw, re.I):
        # close truncated paren
        if raw.count("(") > raw.count(")"):
            raw += ")"
        return raw
    key = re.sub(r"\s+", " ", raw.lower().strip(" ."))
    if key in PHRASE:
        return PHRASE[key]
    if key in EN_VI:
        return EN_VI[key]
    # strip numbered / POS prefixes then retry
    s = re.sub(r"^\(\d+\)\s*", "", key)
    s = re.sub(r"^\((n|v|adj|abbr|hum|hon|num|int|uk|ateji)\)\s*", "", s)
    s = re.sub(r"^\d+\.\s*", "", s)
    if s in PHRASE:
        return PHRASE[s]
    if s in EN_VI:
        return EN_VI[s]
    # (hand) towel → towel
    inner = re.sub(r"\([^)]*\)", "", raw).strip(" -")
    il = inner.lower()
    if il in EN_VI:
        return EN_VI[il]
    if il in PHRASE:
        return PHRASE[il]
    # keep loanwords / Vietnamese without diacritics
    return raw


def looks_en(s: str) -> bool:
    t = s.strip()
    if not t or VI_DIAC.search(t):
        return False
    if t.lower().startswith("to "):
        return True
    if re.search(r"\b(the|and|with|from|that|this|used|into|about|which|lit:|sing|vulg)\b", t, re.I):
        if re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9 '()\-/.,!?~:]*", t):
            return True
    if re.fullmatch(r"[A-Za-z][A-Za-z' -]{5,}", t) and t.lower() in EN_VI:
        return True
    if t.startswith("(") and re.match(r"\([A-Za-z]", t):
        return True
    return False


def make_example(word: str, reading: str, romaji: str, vi: str, pos: str) -> tuple[str, str, str, str]:
    gloss = re.split(r"\s*[·/]\s*", vi)[0].strip()
    r = reading or word
    ro = romaji or ""
    cap = cap_ro(ro)
    if pos.startswith("tính từ"):
        return (
            f"とても{word}です。",
            f"とても{r}です。",
            f"Totemo {ro} desu.",
            f"Rất {gloss}.",
        )
    if pos == "trạng từ":
        return (
            f"{word}話してください。",
            f"{r}はなしてください。",
            f"{cap} hanashite kudasai.",
            f"Hãy nói {gloss}.",
        )
    if pos == "trợ từ":
        return (
            f"助詞「{word}」を使います。",
            f"じょし「{r}」をつかいます。",
            f"Joshi {ro} o tsukaimasu.",
            f"Dùng trợ từ {word} — {gloss}.",
        )
    if pos == "biểu hiện":
        return (word, r, cap.rstrip(".") + ".", gloss[0].upper() + gloss[1:] if gloss else gloss)
    if pos.startswith("động từ"):
        return (
            f"よく{word}。",
            f"よく{r}。",
            f"Yoku {ro}.",
            f"Thường {gloss}.",
        )
    if pos in ("đại từ", "từ nghi vấn", "số từ"):
        return (
            f"これは{word}です。",
            f"これは{r}です。",
            f"Kore wa {ro} desu.",
            f"Đây là {gloss}.",
        )
    return (
        f"これは{word}です。",
        f"これは{r}です。",
        f"Kore wa {ro} desu.",
        f"Đây là {gloss}.",
    )


def generic_example(jp: str, word: str) -> bool:
    return jp in {f"これは{word}です。", f"とても{word}です。"} or "#NAME" in jp


def main() -> None:
    rows: list[list[str]] = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    gloss_n = pos_n = ex_n = 0
    still = []
    for r in rows:
        word, kana, romaji, meaning, pos, level, jp, kana_ex, rom_ex, vi_ex = r
        key = (word, kana)
        if key in FORCE:
            meaning, pos = FORCE[key]
            if r[3] != meaning:
                gloss_n += 1
            if r[4] != pos:
                pos_n += 1
            r[3], r[4] = meaning, pos

        parts = [p.strip() for p in re.split(r"\s*[·]\s*", r[3]) if p.strip()]
        cleaned: list[str] = []
        seen: set[str] = set()
        for p in parts:
            # split leftover " / " english
            bits = [b.strip() for b in re.split(r"\s*/\s*", p) if b.strip()] if looks_en(p) else [p]
            for b in bits:
                v = clean_part(b)
                if looks_en(v):
                    v = EN_VI.get(v.lower().strip(" ."), v)
                k = v.lower()
                if not v or k in seen:
                    continue
                if looks_en(v) and cleaned:
                    continue
                seen.add(k)
                cleaned.append(v)
        if cleaned:
            new_m = " · ".join(cleaned[:3])
            if new_m != r[3]:
                gloss_n += 1
                r[3] = new_m

        if generic_example(r[6], word) and r[4] != "danh từ":
            jp, kana_ex, rom_ex, vi_ex = make_example(word, kana, romaji, r[3], r[4])
            r[6], r[7], r[8], r[9] = jp, kana_ex, rom_ex, vi_ex
            ex_n += 1
        elif r[4] in ("tính từ -i", "tính từ -na", "trạng từ", "biểu hiện", "trợ từ") and generic_example(r[6], word):
            jp, kana_ex, rom_ex, vi_ex = make_example(word, kana, romaji, r[3], r[4])
            r[6], r[7], r[8], r[9] = jp, kana_ex, rom_ex, vi_ex
            ex_n += 1
        elif r[4] == "danh từ" and generic_example(r[6], word) and r[9].startswith("Đây là"):
            head = re.split(r"[·/]", r[3])[0].strip()
            r[9] = f"Đây là {head}."

        if any(looks_en(p) for p in re.split(r"\s*[·|/]\s*", r[3])):
            still.append((word, kana, r[3], r[5]))

    JSON_PATH.write_text(json.dumps(rows, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"gloss {gloss_n} pos {pos_n} examples {ex_n} still-en {len(still)}")
    for x in still[:40]:
        print(" ", x[3], x[0], x[2][:90])


if __name__ == "__main__":
    main()
