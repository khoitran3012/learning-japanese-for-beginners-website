#!/usr/bin/env python3
"""Build N5–N1 dictionary JSON with Vietnamese glosses and original examples.

Headword coverage follows public JLPT word lists (word + reading + level are
facts). Gloss translations and example sentences are original to Akari.
"""
from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

SRC = Path("/tmp/openjlpt")
OUT = Path("/workspace/src/data/dictionary-jlpt.json")
TSV = Path("/workspace/scripts/en-vi-jlpt.tsv")

DIGRAPHS = [
    ("きゃ", "kya"), ("きゅ", "kyu"), ("きょ", "kyo"),
    ("ぎゃ", "gya"), ("ぎゅ", "gyu"), ("ぎょ", "gyo"),
    ("しゃ", "sha"), ("しゅ", "shu"), ("しょ", "sho"),
    ("じゃ", "ja"), ("じゅ", "ju"), ("じょ", "jo"),
    ("ちゃ", "cha"), ("ちゅ", "chu"), ("ちょ", "cho"),
    ("にゃ", "nya"), ("にゅ", "nyu"), ("にょ", "nyo"),
    ("ひゃ", "hya"), ("ひゅ", "hyu"), ("ひょ", "hyo"),
    ("びゃ", "bya"), ("びゅ", "byu"), ("びょ", "byo"),
    ("ぴゃ", "pya"), ("ぴゅ", "pyu"), ("ぴょ", "pyo"),
    ("みゃ", "mya"), ("みゅ", "myu"), ("みょ", "myo"),
    ("りゃ", "rya"), ("りゅ", "ryu"), ("りょ", "ryo"),
]
MONO = {
    "あ": "a", "い": "i", "う": "u", "え": "e", "お": "o",
    "か": "ka", "き": "ki", "く": "ku", "け": "ke", "こ": "ko",
    "が": "ga", "ぎ": "gi", "ぐ": "gu", "げ": "ge", "ご": "go",
    "さ": "sa", "し": "shi", "す": "su", "せ": "se", "そ": "so",
    "ざ": "za", "じ": "ji", "ず": "zu", "ぜ": "ze", "ぞ": "zo",
    "た": "ta", "ち": "chi", "つ": "tsu", "て": "te", "と": "to",
    "だ": "da", "ぢ": "ji", "づ": "zu", "で": "de", "ど": "do",
    "な": "na", "に": "ni", "ぬ": "nu", "ね": "ne", "の": "no",
    "は": "ha", "ひ": "hi", "ふ": "fu", "へ": "he", "ほ": "ho",
    "ば": "ba", "び": "bi", "ぶ": "bu", "べ": "be", "ぼ": "bo",
    "ぱ": "pa", "ぴ": "pi", "ぷ": "pu", "ぺ": "pe", "ぽ": "po",
    "ま": "ma", "み": "mi", "む": "mu", "め": "me", "も": "mo",
    "や": "ya", "ゆ": "yu", "よ": "yo",
    "ら": "ra", "り": "ri", "る": "ru", "れ": "re", "ろ": "ro",
    "わ": "wa", "を": "o", "ん": "n",
    "ぁ": "a", "ぃ": "i", "ぅ": "u", "ぇ": "e", "ぉ": "o",
    "ゃ": "ya", "ゅ": "yu", "ょ": "yo", "ゎ": "wa", "ゐ": "i", "ゑ": "e",
}


def to_hiragana(s: str) -> str:
    out = []
    for ch in unicodedata.normalize("NFKC", s):
        c = ord(ch)
        if 0x30A1 <= c <= 0x30F6:
            out.append(chr(c - 0x60))
        else:
            out.append(ch)
    return "".join(out)


def kana_to_romaji(s: str) -> str:
    hira = to_hiragana(s)
    i, out = 0, ""
    while i < len(hira):
        pair = hira[i : i + 2]
        found = next((r for k, r in DIGRAPHS if pair == k), None)
        if found:
            out += found
            i += 2
            continue
        ch = hira[i]
        if ch == "っ":
            rest = hira[i + 1 :]
            nxt = next((r for k, r in DIGRAPHS if rest.startswith(k)), None)
            if nxt is None:
                nxt = MONO.get(rest[:1], "")
            cons = nxt[:1]
            out += cons if cons and cons != "n" else "t"
            i += 1
            continue
        if ch == "ー":
            m = re.search(r"[aeiou]$", out)
            out += m.group(0) if m else ""
            i += 1
            continue
        out += MONO.get(ch, ch)
        i += 1
    return out


def cap_ro(s: str) -> str:
    return s[:1].upper() + s[1:] if s else s


IE_ROW = set("いきぎしじちぢにひびぴみりえけげせぜてでねへべぺめれ")


def verb_group(reading: str) -> str:
    if reading in ("する", "くる", "来") or reading.endswith("する"):
        return "động từ nhóm 3"
    if reading.endswith("る") and reading[:-1] and reading[-2] in IE_ROW:
        return "động từ nhóm 2"
    return "động từ nhóm 1"


def load_vi() -> dict[str, str]:
    out: dict[str, str] = {}
    paths = [TSV, Path("/workspace/scripts/en-vi-remain.tsv")]
    for path in paths:
        if not path.exists():
            continue
        for line in path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "\t" not in line:
                continue
            a, b = line.split("\t", 1)
            key = re.sub(r"[?.!]+$", "", a.strip().lower()).strip()
            val = b.strip()
            if key and key not in out:
                out[key] = val
            stripped = re.sub(r"^\([^)]+\)\s*", "", key).strip()
            if stripped and stripped not in out:
                out[stripped] = re.sub(
                    r"\s*\((khiêm nhường|tôn kính|lịch sự|thân mật)\)\s*$", "", val
                ).strip()
    return out


JA_VI: dict[str, list[str]] = {
    "食べる": ["ăn"], "飲む": ["uống"], "行く": ["đi"], "来る": ["đến"], "する": ["làm"],
    "見る": ["nhìn", "xem"], "聞く": ["nghe", "hỏi"], "言う": ["nói"], "思う": ["nghĩ"],
    "知る": ["biết"], "分かる": ["hiểu"], "作る": ["làm", "tạo"], "使う": ["dùng"],
    "会う": ["gặp"], "待つ": ["đợi"], "持つ": ["cầm", "có"], "取る": ["lấy"],
    "買う": ["mua"], "売る": ["bán"], "読む": ["đọc"], "書く": ["viết"],
    "教える": ["dạy"], "学ぶ": ["học"], "勉強": ["học tập"], "学校": ["trường học"],
    "先生": ["giáo viên"], "学生": ["học sinh"], "友達": ["bạn bè"],
    "時間": ["thời gian"], "今": ["bây giờ"], "今日": ["hôm nay"], "明日": ["ngày mai"],
    "計画": ["kế hoạch"], "予定": ["dự định"], "約束": ["lời hứa", "cuộc hẹn"],
    "理由": ["lý do"], "意味": ["ý nghĩa"], "関係": ["quan hệ"], "場合": ["trường hợp"],
    "経済": ["kinh tế"], "政治": ["chính trị"], "社会": ["xã hội"], "文化": ["văn hóa"],
    "技術": ["kỹ thuật"], "影響": ["ảnh hưởng"], "状況": ["tình hình"],
    "実際": ["thực tế"], "必要": ["cần thiết"], "可能": ["có thể"], "不可能": ["không thể"],
    "例えば": ["ví dụ"], "決して": ["không bao giờ"], "必ず": ["nhất định"],
    "準備": ["chuẩn bị"], "会議": ["cuộc họp"], "研究": ["nghiên cứu"],
    "経験": ["kinh nghiệm"], "説明": ["giải thích"], "質問": ["câu hỏi"],
    "問題": ["vấn đề"], "答案": ["đáp án"], "試験": ["kỳ thi"], "合格": ["đỗ"],
    "失敗": ["thất bại"], "成功": ["thành công"], "努力": ["nỗ lực"],
    "意見": ["ý kiến"], "情報": ["thông tin"], "報道": ["đưa tin"],
    "憲法": ["hiến pháp"], "法律": ["pháp luật"], "投資": ["đầu tư"],
    "曖昧": ["mơ hồ"], "配慮": ["quan tâm", "chiếu cố"], "締結": ["ký kết"],
    "抽象": ["trừu tượng"], "具体": ["cụ thể"], "主張": ["chủ trương", "khẳng định"],
    "議論": ["tranh luận"], "批判": ["phê phán"], "評価": ["đánh giá"],
    "貢献": ["đóng góp"], "犠牲": ["hy sinh"], "責任": ["trách nhiệm"],
    "義務": ["nghĩa vụ"], "権利": ["quyền lợi"], "平等": ["bình đẳng"],
    "自由": ["tự do"], "平和": ["hòa bình"], "戦争": ["chiến tranh"],
    "環境": ["môi trường"], "汚染": ["ô nhiễm"], "資源": ["tài nguyên"],
    "エネルギー": ["năng lượng"], "科学": ["khoa học"], "医学": ["y học"],
    "哲学": ["triết học"], "文学": ["văn học"], "芸術": ["nghệ thuật"],
    "宗教": ["tôn giáo"], "伝統": ["truyền thống"], "習慣": ["thói quen"],
    "態度": ["thái độ"], "性格": ["tính cách"], "感情": ["cảm xúc"],
    "意識": ["ý thức"], "無意識": ["vô thức"], "印象": ["ấn tượng"],
    "現象": ["hiện tượng"], "本質": ["bản chất"], "現実": ["hiện thực"],
    "理想": ["lý tưởng"], "目的": ["mục đích"], "目標": ["mục tiêu"],
    "効果": ["hiệu quả"], "結果": ["kết quả"], "原因": ["nguyên nhân"],
    "過程": ["quá trình"], "方法": ["phương pháp"], "手段": ["phương tiện"],
    "機会": ["cơ hội"], "条件": ["điều kiện"], "制限": ["hạn chế"],
    "規則": ["quy tắc"], "制度": ["chế độ"], "組織": ["tổ chức"],
    "企業": ["doanh nghiệp"], "産業": ["ngành công nghiệp"], "農業": ["nông nghiệp"],
    "商業": ["thương mại"], "貿易": ["ngoại thương"], "市場": ["thị trường"],
    "価格": ["giá cả"], "給料": ["lương"], "税金": ["thuế"],
    "予算": ["ngân sách"], "利益": ["lợi nhuận"], "損失": ["tổn thất"],
    "人口": ["dân số"], "都市": ["đô thị"], "農村": ["nông thôn"],
    "交通": ["giao thông"], "事故": ["tai nạn"], "災害": ["thảm họa"],
    "地震": ["động đất"], "台風": ["bão"], "洪水": ["lũ lụt"],
    "病気": ["bệnh"], "健康": ["sức khỏe"], "治療": ["điều trị"],
    "手術": ["phẫu thuật"], "薬": ["thuốc"], "予防": ["phòng ngừa"],
    "高齢": ["cao tuổi"], "介護": ["chăm sóc"], "福祉": ["phúc lợi"],
    "教育": ["giáo dục"], "大学": ["đại học"], "卒業": ["tốt nghiệp"],
    "就職": ["tìm việc"], "失業": ["thất nghiệp"], "退職": ["nghỉ việc"],
    "残業": ["làm thêm giờ"], "休暇": ["kỳ nghỉ"], "旅行": ["du lịch"],
    "趣味": ["sở thích"], "スポーツ": ["thể thao"], "音楽": ["âm nhạc"],
    "映画": ["phim"], "小説": ["tiểu thuyết"], "漫画": ["truyện tranh"],
    "新聞": ["báo"], "雑誌": ["tạp chí"], "放送": ["phát sóng"],
    "インターネット": ["internet"], "パソコン": ["máy tính"],
    "携帯電話": ["điện thoại di động"], "電子メール": ["email"],
    "あるいは": ["hoặc", "hay là"], "つまり": ["nói cách khác"],
    "ただし": ["tuy nhiên", "với điều kiện"], "なお": ["thêm vào đó"],
    "やがて": ["chẳng bao lâu"], "ついに": ["cuối cùng"],
    "あくまで": ["đến cùng", "nhất quyết"], "せめて": ["ít ra"],
    "あえて": ["cố ý", "dám"], "まさか": ["không lẽ"],
    "さすが": ["quả nhiên"], "どうせ": ["dù sao cũng"],
    "ちなみに": ["nhân tiện"], "すなわち": ["tức là"],
    "せっけん": ["xà phòng"], "石鹸": ["xà phòng"],
    "きれい": ["xinh đẹp", "sạch"],
    "はい": ["vâng"],
    "いくつ": ["bao nhiêu", "bao nhiêu tuổi"],
    "いくら": ["bao nhiêu tiền"],
    "どう": ["thế nào", "bằng cách nào"],
    "おいしい": ["ngon"],
    "より、ほう": ["dùng khi so sánh"],
    "ノート": ["vở"],
    "パーティー": ["bữa tiệc"],
    "はく": ["mặc (quần, giày)"],
    "ほか": ["khác", "phần còn lại"],
    "背": ["tầm vóc", "lưng"],
    "こと": ["việc", "điều"],
    "うん": ["ừ"],
    "いえ": ["không"],
    "できる": ["có thể"],
    "ダイヤ": ["kim cương", "biểu đồ"],
    "コピー": ["bản sao"],
    "スープ": ["súp"],
    "タオル": ["khăn"],
    "トランプ": ["bài tây"],
    "ホーム": ["sân ga"],
    "まあ": ["thôi nào"],
    "しまう": ["làm xong", "cất"],
    "賛成": ["tán thành"],
    "ヶ月": ["tháng"],
    "歳": ["tuổi"],
    "畳": ["chiếu tatami"],
    "おまえ": ["cậu (thân mật)"],
    "軽い": ["nhẹ"],
    "厚い": ["dày"],
}


ADJ_EN = {
    "good", "bad", "delicious", "cute", "pretty", "clean", "beautiful", "hot", "cold",
    "big", "small", "new", "old", "high", "low", "long", "short", "heavy", "light",
    "dark", "bright", "fun", "interesting", "boring", "busy", "easy", "difficult",
    "strong", "weak", "young", "round", "sweet", "spicy", "dirty", "dangerous",
    "quiet", "noisy", "wide", "narrow", "thick", "thin", "fat", "early", "late",
    "fast", "slow", "near", "far", "important", "famous", "kind", "healthy",
    "expensive", "cheap", "scary", "sad", "lonely", "correct", "wrong", "necessary",
    "possible", "impossible", "tasty", "skillful", "unskillful", "spacious",
    "painful", "happy", "glad", "awful", "wonderful", "splendid", "serious", "rare",
    "polite", "strict", "deep", "shallow", "soft", "hard", "warm", "cool",
    "refreshing", "gloomy", "unpleasant", "likeable", "powerful", "skillful",
}
NA_DESPITE_I = {"きれい", "嫌い", "きらい", "幸い", "偉大"}


def guess_pos(word: str, reading: str, meanings: list[str]) -> str:
    joined = " ".join(meanings).lower()
    if joined.startswith("to ") or "; to " in joined or "/ to " in joined or "| to " in joined:
        return verb_group(reading or word)
    if "na-adjective" in joined or "na adjective" in joined:
        return "tính từ -na"
    if "i-adjective" in joined or "i adjective" in joined:
        return "tính từ -i"
    if "adverb" in joined:
        return "trạng từ"
    if "particle" in joined:
        return "trợ từ"
    if "conjunction" in joined:
        return "liên từ"
    if "pronoun" in joined:
        return "đại từ"
    particles = {"は", "が", "を", "に", "で", "と", "も", "から", "まで", "より", "の", "へ", "や", "か", "ね", "よ", "さ"}
    if word in particles:
        return "trợ từ"
    if word.endswith("的"):
        return "tính từ -na"
    particles = {"は", "が", "を", "に", "で", "と", "も", "から", "まで", "より", "の", "へ", "や", "か", "ね", "よ", "さ"}
    if word in particles:
        return "trợ từ"
    # i-adj: dictionary form almost always writes the い okurigana
    base = reading or word
    noun_i = {
        "匂い", "におい", "勢い", "思い", "違い", "向かい", "出会い", "住まい",
        "願い", "祝い", "お祝い", "笑い", "戦い", "手伝い", "間違い", "見舞い",
        "お見舞い", "くらい", "ぐらい", "あい", "はい", "ください", "ちょうだい",
        "勢い", "向かい", "扱い", "疑い", "支払", "支払い", "度合い",
    }
    expressions = {
        "こんにちは", "こんばんは", "おはよう", "おはようございます", "さようなら",
        "ありがとう", "すみません", "ごめんなさい", "はい", "いいえ", "はじめまして",
        "どうぞ", "ください", "いらっしゃいませ",
    }
    adverbs = {
        "すぐに", "たくさん", "いつも", "まだ", "もう", "ちょっと", "たぶん",
        "きっと", "ぜひ", "だんだん", "どんどん", "はっきり", "ゆっくり",
        "あまり", "ぜんぜん", "とても", "すこし", "たいてい", "ときどき",
    }
    if word in expressions or base in expressions:
        return "biểu hiện"
    if word in adverbs or base in adverbs:
        return "trạng từ"
    first = re.sub(r"^to be ", "", (meanings[0] if meanings else "").lower().strip(" ?.!"))
    tokens = set(re.findall(r"[a-z']+", first))
    is_adj = bool(tokens & ADJ_EN) or first in ADJ_EN
    if word.endswith("しい") or base.endswith("しい"):
        if word not in noun_i and base not in noun_i:
            return "tính từ -i"
    # Only treat 〜い as i-adj when the English gloss looks adjectival.
    if word.endswith("い") and word not in noun_i and base not in noun_i and word not in expressions:
        if "to " not in joined and (is_adj or "i-adjective" in joined or first in ADJ_EN):
            return "tính từ -i"
    if word[-1:] in set("うくぐすつぬぶむる") and re.search(r"[\u4e00-\u9fff]", word):
        return verb_group(base)
    if is_adj:
        if word in NA_DESPITE_I or reading in NA_DESPITE_I:
            return "tính từ -na"
        if base.endswith("い") and not base.endswith(("まい", "だい")):
            return "tính từ -i"
        return "tính từ -na"
    if any(x in joined.split()[:3] for x in ("suddenly", "always", "often", "already", "still", "never")):
        if base.endswith(("に", "く", "て", "と", "ず")):
            return "trạng từ"
    return "danh từ"


def looks_english(s: str) -> bool:
    sl = s.lower()
    if re.search(r"[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]", s, re.I):
        return False
    if re.search(r"\b(the|and|with|from|that|this|used|for|into|about|which)\b", sl) or sl.startswith("to "):
        return True
    if " " in s.strip() and re.fullmatch(r"[A-Za-z][A-Za-z0-9 '()\-/.,]*", s.strip()):
        return True
    return False


NOTE_RE = re.compile(r"[（(][^）)]*[）)]")
KANA_RE = re.compile(r"^[\u3040-\u30ffー・/ ]+$")

READING_FIX = {
    "できる": "できる",
    "うん": "うん",
    "はい": "はい",
    "しまう": "しまう",
    "しまった": "しまった",
    "すみません": "すみません",
    "それ": "それ",
    "どう": "どう",
    "ね": "ね",
    "ふと": "ふと",
    "よろしく": "よろしく",
    "しまい": "しまい",
    "賛成": "さんせい",
    "暖かい": "あたたかい",
    "しいんと": "しいんと",
    "じゅうたん": "じゅうたん",
    "だいいち": "だいいち",
    "ミリ": "ミリ",
    "とん": "とん",
    "ヶ月": "かげつ",
    "歳": "さい",
    "畳": "じょう",
}


def is_kana(s: str) -> bool:
    t = s.replace(" ", "").replace("・", "").replace("/", "")
    return bool(t) and bool(KANA_RE.match(s.replace("・", "").replace("/", " ")))


def clean_reading(word: str, reading: str) -> str:
    if word in READING_FIX:
        return READING_FIX[word]
    r = (reading or "").strip()
    r = r.replace("＝", "=")
    r = re.sub(r"（する）", "", r)
    r = re.sub(r"\(([\u3040-\u30ff]+)\)", r"\1", r)
    r = NOTE_RE.sub("", r)
    r = re.sub(r"\s*=.*$", "", r)
    r = r.replace("、", "/").replace("#NAME?", "").strip(" /")
    if is_kana(r):
        return r.split("/")[0].strip() or r
    if is_kana(word):
        return word.split("/")[0].strip()
    if word in READING_FIX:
        return READING_FIX[word]
    return r or word


def normalize_en_key(raw: str) -> str:
    s = re.sub(r"[?.!]+$", "", raw.lower()).strip()
    s = re.sub(r"^\(\d+\)\s*", "", s)
    s = re.sub(r"^1\.\s*", "", s)
    s = re.sub(r"^\([^)]*\)\s*", "", s)
    s = re.sub(r"\s*\([^)]*\)", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def en_to_vi(text: str, table: dict[str, str]) -> str:
    raw = text.strip()
    if not raw:
        return raw
    parts = re.split(r"\s*[|;/]\s*", raw)
    if len(parts) > 1:
        seen, out = set(), []
        for p in parts:
            v = en_to_vi(p, table)
            if v and v not in seen:
                seen.add(v)
                out.append(v)
        return " / ".join(out)

    s = normalize_en_key(raw)
    if s in table:
        return table[s]

    prefix = ""
    m = re.match(r"^\((honorable|humble|polite|honorific|respectful|informal)\)\s*", raw.lower())
    if m:
        kind = m.group(1)
        prefix = {
            "humble": " (khiêm nhường)",
            "honorable": " (tôn kính)",
            "honorific": " (tôn kính)",
            "respectful": " (tôn kính)",
            "polite": " (lịch sự)",
            "informal": " (thân mật)",
        }[kind]
        s = normalize_en_key(raw[m.end() :])
        if s in table:
            return table[s] + prefix

    if s.startswith("to "):
        rest = s[3:]
        if rest in table:
            return table[rest] + prefix
        key = "to " + rest
        if key in table:
            return table[key] + prefix

    words = s.split()
    for n in range(min(6, len(words)), 1, -1):
        chunk = " ".join(words[:n])
        if chunk in table:
            return table[chunk] + prefix

    if len(words) <= 2:
        mapped = [table.get(w) for w in words]
        if all(mapped):
            return " ".join(mapped) + prefix  # type: ignore[arg-type]
    return (table.get(s) or raw) + prefix


def translate_item(word: str, reading: str, meanings: list[str], table: dict[str, str]) -> list[str]:
    if word in JA_VI:
        return JA_VI[word]
    if reading in JA_VI:
        return JA_VI[reading]
    src_set = {m.lower().strip(" ?.!") for m in meanings}
    vis: list[str] = []
    seen = set()
    for m in meanings[:4]:
        v = en_to_vi(m, table).strip(" .")
        if not v:
            continue
        key = v.lower()
        if key in seen:
            continue
        seen.add(key)
        vis.append(v)
    if not vis:
        vis = [meanings[0]] if meanings else [word]
    vis.sort(key=lambda x: (x.lower() in src_set or looks_english(x), len(x)))
    out = []
    for v in vis:
        leftover = v.lower() in src_set or looks_english(v)
        if leftover and out:
            continue
        out.append(v)
        if len(out) >= 3:
            break
    return out or vis[:1]


def make_example(word: str, reading: str, romaji: str, vi: str, pos: str) -> tuple[str, str, str, str]:
    r = reading or word
    ro = romaji
    gloss = vi.split(" / ")[0]
    if pos.startswith("động từ"):
        jp = f"毎日、{word}必要があります。"
        kana = f"まいにち、{r}ひつようです。"
        rom = f"Mainichi, {ro} hitsuyou desu."
        vie = f"Mỗi ngày đều cần {gloss}."
    elif pos.startswith("tính từ"):
        jp = f"とても{word}です。"
        kana = f"とても{r}です。"
        rom = f"Totemo {ro} desu."
        vie = f"Rất {gloss}."
    elif pos == "trạng từ":
        jp = f"{word}話してください。"
        kana = f"{r}はなしてください。"
        rom = f"{cap_ro(ro)} hanashite kudasai."
        vie = f"Hãy nói {gloss}."
    elif pos == "trợ từ":
        jp = f"助詞「{word}」の使い方を覚えます。"
        kana = f"じょし「{r}」のつかいかたをおぼえます。"
        rom = f"Joshi {ro} no tsukaikata o oboemasu."
        vie = f"Tôi nhớ cách dùng trợ từ {word} ({gloss})."
    else:
        jp = f"これは{word}です。"
        kana = f"これは{r}です。"
        rom = f"Kore wa {ro} desu."
        vie = f"Đây là {gloss}."
    return jp, kana, cap_ro(rom) if rom[:1].islower() else rom, vie


def main() -> None:
    table = load_vi()
    rows: list[list[str]] = []
    seen_head: set[str] = set()
    english_left = 0
    for level in ("N5", "N4", "N3", "N2", "N1"):
        path = SRC / f"{level.lower()}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        for it in data:
            word = (it.get("word") or "").strip()
            if not word:
                continue
            reading = clean_reading(word, (it.get("reading") or "").strip() or word)
            meanings = [m.strip() for m in (it.get("meanings") or []) if str(m).strip()]
            head = f"{word}::{reading}"
            if head in seen_head:
                continue
            seen_head.add(head)
            vis = translate_item(word, reading, meanings, table)
            if any(looks_english(v) for v in vis):
                english_left += 1
            pos = guess_pos(word, reading, meanings)
            romaji = kana_to_romaji(reading)
            jp, kana, er, ev = make_example(word, reading, romaji, vis[0], pos)
            rows.append([
                word,
                reading,
                romaji,
                " · ".join(vis),
                pos,
                level,
                jp,
                kana,
                er,
                ev,
            ])
    OUT.write_text(json.dumps(rows, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"wrote {len(rows)} entries -> {OUT} ({OUT.stat().st_size} bytes)")
    print(f"entries still containing latin gloss: {english_left}")


if __name__ == "__main__":
    main()
