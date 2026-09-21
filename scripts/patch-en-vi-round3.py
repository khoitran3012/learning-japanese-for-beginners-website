#!/usr/bin/env python3
"""Rebuild leftover-English example sentences from Vietnamese meanings."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path("/workspace")
DICT = ROOT / "src/data/dictionary-jlpt.json"
KANJI = ROOT / "src/data/kanji-jlpt.json"
HV_EXTRA = ROOT / "src/data/han-viet-extra.ts"
HV_TS = ROOT / "src/data/han-viet.ts"

KEEP = {
    "jlpt", "ok", "tv", "dvd", "cd", "pc", "wifi", "app", "pdf", "api", "ai",
    "jr", "cm", "kg", "km", "mm", "ml", "phd", "oxy", "axit", "hydro", "sen",
    "haiku", "judo", "futon", "tsunami", "samurai", "hiragana", "katakana",
    "romaji", "kanji", "anime", "manga", "sushi", "karaoke", "kimono", "yen",
    "bento", "tokyo", "osaka", "kyoto", "shinto", "yukata", "tatami", "sumo",
    "shogi", "koto", "sake", "n5", "n4", "n3", "n2", "n1", "sasa", "zelkova",
    "tomoe", "shamisen", "hagi", "taxi", "radio", "tivi", "piano", "salad",
    "fax", "whisky", "vinyl", "marathon", "bible", "nitrat",
}

EN = re.compile(r"[A-Za-z][A-Za-z'’.-]{2,}")
DUP = re.compile(r"\b(\S+)\s+\1\b", re.I)

MEANING_FIX = {
    "ラジカセ / ラジオカセット": "máy radio băng cát-xét",
    "サンダル": "dép xăng-đan",
    "サンドイッチ": "bánh sandwich",
    "ステレオ": "dàn stereo",
    "ウイスキー": "rượu whisky",
    "ビニール": "nhựa vinyl",
    "ブラウス": "áo blouse",
    "マラソン": "chạy marathon",
    "区間": "đoạn · khu",
    "仕掛け": "cơ quan · mẹo",
    "乗り換え": "chuyển tàu / xe buýt",
    "保母": "bảo mẫu",
    "溶液": "dung dịch",
    "ハンガー": "móc áo",
}

KANJI_FIX = {
    "湾": ("vịnh", "vịnh"),
    "週": None,
}


def leftover_en(s: str) -> bool:
    for w in EN.findall(s):
        wl = w.lower().rstrip(".")
        if wl in KEEP:
            continue
        if re.search(r"(tion|sion|ness|ment|ous|ally|ful|less|ship|able|ible|ence|ance|ing|ized|ism|ity|ology|graphy|phone|scope|ight|ough)$", wl):
            return True
        if wl in {
            "trick", "track", "trains", "nursery", "liquid", "ring", "pitiful",
            "running", "going", "remodeling", "night", "talking", "shipbuilding",
            "surveying", "lending", "carving", "biography", "light", "unity",
            "brightness", "fragment", "firing", "binding", "classification",
            "editing", "recruiting", "packing", "equation", "telescope",
            "contradiction", "superstition", "mailing", "brick", "hangar",
            "swing", "civility", "aggravation", "assassination", "reliance",
            "migration", "clothing", "shipping", "transportation", "projection",
            "impurity", "timidity", "waning", "seasoning", "baling",
            "depopulation", "intervention", "forwarding", "circulation",
            "deterioration", "notion", "diffusion", "disparity", "possession",
            "optimism", "smoothness", "tolerance", "interference", "infection",
            "sensitivity", "guarding", "viewing", "ophthalmology", "donation",
            "steamship", "describing", "undulation", "suspension", "residence",
            "coeducation", "communism", "forcing", "shortsightedness",
            "punishment", "bending", "blessing", "abatement", "encouragement",
            "quotation", "antiquity", "fixation", "late", "exaggeration",
            "connection", "licence", "engineering", "archaeology", "estrangement",
            "conference", "rebuilding", "playback", "mining", "gathering",
            "cultivation", "fence", "hallucination", "chatting", "visiting",
            "oxidation", "indication", "enforcing", "vision", "raising",
            "magnetism", "otolaryngology", "independence", "resignation",
            "adhesion", "elimination", "essence", "weakness", "starring",
            "seating", "adornment", "fullness", "repetition", "usefulness",
            "bleeding", "sailing", "owning", "erasing", "collation",
            "illumination", "distillation", "concession", "deliberation",
            "vibration", "devotion", "presentation", "propulsion", "reasoning",
            "flushing", "maturity", "constellation", "purity", "conjunction",
            "persuasion", "diving", "selection", "booking", "annihilation",
            "creation", "ornament", "traveling", "remittance", "duration",
            "giving", "interaction", "appointment", "degeneration",
            "extermination", "substitution", "secession", "expedition",
            "elasticity", "declaration", "slack", "suffocation", "coloring",
            "poisoning", "neutrality", "fidelity", "felling", "auditing",
            "stethoscope", "mediation", "coherence", "fishing", "acceptance",
            "adaptation", "ceiling", "ignition", "betting", "hibernation",
            "stealing", "flight", "mobilization", "tuning", "originality",
            "penetration", "stolidity", "obtaining", "winning", "nomination",
            "cognizance", "seniority", "viscosity", "destruction", "annulment",
            "borrowing", "disposition", "allotment", "indemnity", "persecution",
            "excavation", "starting", "edition", "negation", "proportion",
            "depiction", "sensibility", "ubiquity", "proceeding", "dispersion",
            "spewing", "closing", "finishing", "repayment", "insurance",
            "maintaining", "pavement", "constable", "compensation", "reparation",
            "abandonment", "emission", "radioactivity", "saturation", "violence",
            "spinning", "substance", "almighty", "pending", "density",
            "reticence", "innocence", "ignorance", "useless", "clarity",
            "exemption", "groping", "bedding", "nighthawk", "superiority",
            "promising", "prominence", "nomadism", "versatility", "premonition",
            "directions", "suppression", "attendance", "lawmaking",
            "acknowledgement", "conscience", "forestry", "solidarity",
            "commonwealth", "recitation", "senility", "apology", "snoring",
            "peculiarity", "sandal", "sandwich", "stereo", "cassette", "week",
            "bay", "youth", "rivers", "vest", "blouse",
        }:
            return True
    return False


def first_gloss(meaning: str) -> str:
    return meaning.split(" · ")[0].split(" / ")[0].strip(" ·") or meaning


def collapse_dup(s: str) -> str:
    prev = None
    while prev != s:
        prev = s
        s = DUP.sub(r"\1", s)
    return s


def rebuild_ex(meaning: str, vi_ex: str) -> str:
    gloss = first_gloss(meaning)
    if vi_ex.startswith("Rất "):
        return f"Rất {gloss}."
    if vi_ex.startswith("Hãy nói"):
        return f"Hãy nói {gloss}."
    if vi_ex.startswith("Mỗi ngày"):
        return f"Mỗi ngày đều cần {gloss}."
    if vi_ex.startswith("Thường "):
        return f"Thường {gloss}."
    return f"Đây là {gloss}."


def patch_dict() -> int:
    rows = json.loads(DICT.read_text(encoding="utf-8"))
    n = 0
    for r in rows:
        kanji, meaning, vi_ex = r[0], r[3], r[9]
        m2 = MEANING_FIX.get(kanji, collapse_dup(meaning))
        e2 = vi_ex
        if leftover_en(vi_ex) or leftover_en(m2):
            e2 = rebuild_ex(m2, vi_ex)
        else:
            e2 = collapse_dup(vi_ex)
        if kanji == "週":
            m2 = "tuần"
            e2 = "Đây là tuần."
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
        ch, meaning, ex_vi = r[0], r[3], r[8]
        m2 = collapse_dup(meaning)
        e2 = collapse_dup(ex_vi)
        if leftover_en(e2) or leftover_en(m2):
            e2 = first_gloss(m2)
        if ch == "湾":
            m2, e2 = "vịnh", "vịnh"
        if ch == "背":
            e2 = "áo vest"
        if m2 != meaning or e2 != ex_vi:
            r[3] = m2
            r[8] = e2
            n += 1
    KANJI.write_text(json.dumps(rows, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return n


def fill_hv() -> int:
    text = HV_TS.read_text(encoding="utf-8")
    extra_text = HV_EXTRA.read_text(encoding="utf-8")
    have = set(re.findall(r"^\s+(\S+): \"", text, re.M)) | set(
        re.findall(r"^\s+(\S+): \"", extra_text, re.M)
    )
    more = {
        "関": "Quan", "告": "Cáo", "変": "Biến", "両": "Lưỡng", "収": "Thu",
        "処": "Xử", "幸": "Hạnh", "窓": "Song", "煙": "Yên", "晩": "Vãn",
        "幾": "Kỷ", "査": "Tra", "況": "Huống", "戸": "Hộ", "歴": "Lịch",
        "鉄": "Thiết", "氷": "Băng", "塔": "Tháp", "菓": "Quả", "衆": "Chúng",
        "価": "Giá", "応": "Ứng", "検": "Kiểm", "沢": "Trạch", "幹": "Cán",
        "撃": "Kích", "拡": "Khuếch", "浜": "Tân", "廃": "Phế", "壊": "Hoại",
        "継": "Kế", "闘": "Đấu", "聴": "Thính", "択": "Trạch", "徴": "Trưng",
        "弾": "Đạn", "償": "Thường", "拠": "Cứ", "掲": "Yết", "縮": "Súc",
        "恵": "Huệ", "緩": "Hoãn", "購": "Cấu", "譲": "Nhượng", "銭": "Tiền",
        "渋": "Sáp", "駆": "Khu", "稲": "Đạo", "訳": "Dịch", "歓": "Hoan",
        "勧": "Khuyến", "騒": "Tao", "縄": "Thằng", "隠": "Ẩn", "釈": "Thích",
        "陥": "Hãm", "較": "Giác", "桜": "Anh", "縦": "Túng", "剣": "Kiếm",
        "浄": "Tịnh", "舗": "Phô", "径": "Kính", "繊": "Tiêm", "翻": "Phiên",
        "懐": "Hoài", "亜": "Á", "覧": "Lãm", "勲": "Huân", "穏": "Ổn",
        "粛": "Túc", "砕": "Toái", "履": "Lý", "殴": "Ốu", "酔": "Túy",
        "癒": "Dũ", "弥": "Di", "獣": "Thú", "暦": "Lịch", "摂": "Nhiếp",
        "醸": "Nhương", "猟": "Liệp", "鶏": "Kê", "暁": "Hiểu", "鋳": "Chú",
        "蛍": "Huỳnh", "嬢": "Nương", "渓": "Khê", "桟": "Sạn", "艶": "Diễm",
        "錬": "Luyện", "壱": "Nhất", "弐": "Nhị",
    }
    added = 0
    # insert before closing of extra
    if not extra_text.rstrip().endswith("};"):
        return 0
    lines = []
    for ch, hv in more.items():
        if ch in have:
            continue
        lines.append(f'  {ch}: "{hv}",')
        added += 1
    if not lines:
        return 0
    extra_text = extra_text.rstrip()
    extra_text = extra_text[:-2] + "\n" + "\n".join(lines) + "\n};\n"
    HV_EXTRA.write_text(extra_text, encoding="utf-8")
    return added


def main() -> None:
    d = patch_dict()
    k = patch_kanji()
    h = fill_hv()
    print(f"dict {d}, kanji {k}, hv +{h}")


if __name__ == "__main__":
    main()
