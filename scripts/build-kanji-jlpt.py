#!/usr/bin/env python3
"""Patch leftover English dictionary glosses and build N5–N1 kanji lookup JSON."""
from __future__ import annotations

import json
import re
import unicodedata
from collections import defaultdict
from pathlib import Path

ROOT = Path("/workspace")
DICT = ROOT / "src/data/dictionary-jlpt.json"
KANJI_OUT = ROOT / "src/data/kanji-jlpt.json"
EN_REMAIN = ROOT / "scripts/en-remain-vi.tsv"
OPEN = Path("/tmp/openjlpt/kanji")

KANJI_EN = {
    "day": "ngày", "sun": "mặt trời", "month": "tháng", "moon": "mặt trăng",
    "fire": "lửa", "water": "nước", "tree": "cây", "wood": "gỗ", "gold": "vàng",
    "money": "tiền", "earth": "đất", "ground": "mặt đất", "person": "người",
    "people": "con người", "mouth": "miệng", "eye": "mắt", "ear": "tai",
    "hand": "tay", "foot": "chân", "mountain": "núi", "river": "sông",
    "rice field": "ruộng", "heaven": "trời", "spirit": "tinh thần",
    "air": "không khí", "one": "một", "two": "hai", "three": "ba", "four": "bốn",
    "five": "năm", "six": "sáu", "seven": "bảy", "eight": "tám", "nine": "chín",
    "ten": "mười", "hundred": "trăm", "thousand": "nghìn", "ten thousand": "vạn",
    "yen": "yên", "year": "năm", "time": "thời gian", "hour": "giờ",
    "minute": "phút", "half": "nửa", "now": "bây giờ", "before": "trước",
    "after": "sau", "every": "mỗi", "week": "tuần", "up": "trên", "down": "dưới",
    "left": "trái", "right": "phải", "inside": "trong", "outside": "ngoài",
    "east": "đông", "west": "tây", "south": "nam", "north": "bắc",
    "car": "xe", "electricity": "điện", "talk": "nói", "language": "ngôn ngữ",
    "read": "đọc", "write": "viết", "see": "nhìn", "hear": "nghe", "eat": "ăn",
    "drink": "uống", "buy": "mua", "go": "đi", "come": "đến", "return": "về",
    "rest": "nghỉ", "friend": "bạn", "mother": "mẹ", "father": "bố",
    "woman": "nữ", "man": "nam", "child": "con", "name": "tên", "what": "gì",
    "large": "lớn", "small": "nhỏ", "high": "cao", "cheap": "rẻ", "new": "mới",
    "old": "cũ", "many": "nhiều", "few": "ít", "white": "trắng", "long": "dài",
    "meeting": "cuộc họp", "meet": "gặp", "company": "công ty", "work": "việc",
    "study": "học", "school": "trường", "book": "sách", "enter": "vào",
    "exit": "ra", "life": "sống", "teacher": "thầy cô", "country": "nước",
    "station": "ga", "dog": "chó", "cat": "mèo", "fish": "cá", "flower": "hoa",
    "rain": "mưa", "snow": "tuyết", "wind": "gió", "sky": "bầu trời",
    "sea": "biển", "house": "nhà", "home": "nhà", "shop": "cửa hàng",
    "store": "cửa hàng", "road": "đường", "street": "phố", "town": "thị trấn",
    "city": "thành phố", "village": "làng", "word": "từ", "letter": "chữ",
    "voice": "giọng", "sound": "âm", "music": "nhạc", "picture": "tranh",
    "movie": "phim", "color": "màu", "red": "đỏ", "blue": "xanh", "black": "đen",
    "paper": "giấy", "cut": "cắt", "place": "nơi", "world": "thế giới",
    "politics": "chính trị", "government": "chính phủ", "party": "đảng",
    "faction": "phe phái", "clique": "bè phái", "family name": "họ",
    "surname": "họ", "clan": "dòng họ", "plan": "kế hoạch", "help": "giúp",
    "change": "thay đổi", "join": "tham gia", "die": "chết", "end": "kết thúc",
    "polish": "mài", "all": "tất cả", "follow": "theo", "cause": "nguyên nhân",
    "take": "lấy", "law": "luật", "kind": "loại", "association": "hiệp hội",
    "equal": "bằng", "send": "gửi", "copy": "sao", "get": "được",
    "occasion": "dịp", "support": "hỗ trợ", "benefit": "lợi ích", "edge": "mép",
    "board": "tấm", "raise": "nâng", "reject": "từ chối", "praise": "khen",
    "great": "vĩ đại", "honor": "danh dự", "present": "hiện tại", "ask": "hỏi",
    "clear": "rõ", "rule": "quy tắc", "interview": "phỏng vấn",
    "counter for days": "loại từ đếm ngày", "japan": "Nhật Bản",
    "kokuji": "chữ Nhật tạo", "power": "sức", "force": "lực", "heart": "tim",
    "mind": "tâm", "think": "nghĩ", "feel": "cảm thấy", "love": "yêu",
    "like": "thích", "hate": "ghét", "good": "tốt", "bad": "xấu",
    "beautiful": "đẹp", "correct": "đúng", "true": "thật", "false": "sai",
    "strong": "mạnh", "weak": "yếu", "fast": "nhanh", "slow": "chậm",
    "early": "sớm", "late": "muộn", "hot": "nóng", "cold": "lạnh",
    "warm": "ấm", "cool": "mát", "bright": "sáng", "dark": "tối",
    "heavy": "nặng", "light": "nhẹ", "wide": "rộng", "narrow": "hẹp",
    "deep": "sâu", "shallow": "nông", "near": "gần", "far": "xa",
    "open": "mở", "close": "đóng", "begin": "bắt đầu", "stop": "dừng",
    "stand": "đứng", "sit": "ngồi", "walk": "đi bộ", "run": "chạy",
    "sleep": "ngủ", "wake": "thức", "live": "sống", "die": "chết",
    "born": "sinh", "grow": "lớn lên", "make": "làm", "use": "dùng",
    "know": "biết", "understand": "hiểu", "learn": "học", "teach": "dạy",
    "speak": "nói", "say": "nói", "call": "gọi", "wait": "đợi",
    "hold": "cầm", "give": "cho", "receive": "nhận", "lose": "mất",
    "win": "thắng", "fight": "đánh", "protect": "bảo vệ", "attack": "tấn công",
    "build": "xây", "break": "phá", "fix": "sửa", "move": "chuyển",
    "stay": "ở", "travel": "du lịch", "arrive": "đến", "leave": "rời",
    "body": "cơ thể", "head": "đầu", "face": "mặt", "hair": "tóc",
    "blood": "máu", "bone": "xương", "skin": "da", "illness": "bệnh",
    "medicine": "thuốc", "doctor": "bác sĩ", "hospital": "bệnh viện",
    "war": "chiến tranh", "peace": "hòa bình", "army": "quân đội",
    "soldier": "binh sĩ", "weapon": "vũ khí", "king": "vua", "god": "thần",
    "temple": "chùa", "shrine": "đền", "buddha": "Phật", "faith": "tín ngưỡng",
    "art": "nghệ thuật", "poem": "thơ", "song": "bài hát", "dance": "múa",
    "sport": "thể thao", "game": "trò chơi", "play": "chơi",
    "number": "số", "count": "đếm", "measure": "đo", "weight": "cân nặng",
    "length": "chiều dài", "height": "chiều cao", "size": "kích thước",
    "shape": "hình", "circle": "hình tròn", "square": "hình vuông",
    "line": "đường", "point": "điểm", "side": "bên", "center": "trung tâm",
    "direction": "hướng", "position": "vị trí", "distance": "khoảng cách",
    "space": "không gian", "room": "phòng", "door": "cửa", "window": "cửa sổ",
    "wall": "tường", "floor": "sàn", "roof": "mái", "bridge": "cầu",
    "field": "cánh đồng", "farm": "nông trại", "forest": "rừng",
    "island": "đảo", "lake": "hồ", "spring": "suối", "stone": "đá",
    "sand": "cát", "iron": "sắt", "silver": "bạc", "jewel": "ngọc",
    "oil": "dầu", "salt": "muối", "sugar": "đường", "rice": "gạo",
    "bread": "bánh mì", "meat": "thịt", "vegetable": "rau", "fruit": "trái cây",
    "tea": "trà", "wine": "rượu", "egg": "trứng", "milk": "sữa",
    "family": "gia đình", "parent": "cha mẹ", "brother": "anh em",
    "sister": "chị em", "husband": "chồng", "wife": "vợ", "son": "con trai",
    "daughter": "con gái", "self": "bản thân", "i": "tôi", "you": "bạn",
    "he": "anh ấy", "she": "cô ấy", "we": "chúng tôi", "they": "họ",
    "public": "công cộng", "private": "riêng", "official": "chính thức",
    "society": "xã hội", "culture": "văn hóa", "history": "lịch sử",
    "economy": "kinh tế", "science": "khoa học", "technology": "công nghệ",
    "machine": "máy", "tool": "dụng cụ", "method": "phương pháp",
    "reason": "lý do", "result": "kết quả", "problem": "vấn đề",
    "question": "câu hỏi", "answer": "đáp án", "meaning": "ý nghĩa",
    "idea": "ý tưởng", "opinion": "ý kiến", "feeling": "cảm giác",
    "hope": "hy vọng", "fear": "sợ", "anger": "giận", "joy": "vui",
    "sadness": "buồn", "pain": "đau", "pleasure": "khoái cảm",
    "danger": "nguy hiểm", "safety": "an toàn", "peace": "hòa bình",
    "freedom": "tự do", "right": "quyền", "duty": "nghĩa vụ",
    "responsibility": "trách nhiệm", "crime": "tội", "punishment": "trừng phạt",
    "court": "tòa án", "judge": "thẩm phán", "police": "cảnh sát",
    "tax": "thuế", "price": "giá", "value": "giá trị", "profit": "lợi nhuận",
    "loss": "tổn thất", "rich": "giàu", "poor": "nghèo",
    "same": "giống", "different": "khác", "special": "đặc biệt",
    "ordinary": "bình thường", "important": "quan trọng", "necessary": "cần thiết",
    "possible": "có thể", "impossible": "không thể", "easy": "dễ",
    "difficult": "khó", "simple": "đơn giản", "complex": "phức tạp",
    "complete": "hoàn thành", "full": "đầy", "empty": "trống",
    "clean": "sạch", "dirty": "bẩn", "quiet": "yên", "noisy": "ồn",
    "young": "trẻ", "adult": "người lớn", "age": "tuổi",
    "morning": "buổi sáng", "noon": "buổi trưa", "night": "đêm",
    "today": "hôm nay", "tomorrow": "ngày mai", "yesterday": "hôm qua",
    "spring": "mùa xuân", "summer": "mùa hè", "autumn": "mùa thu", "fall": "mùa thu",
    "winter": "mùa đông", "season": "mùa", "weather": "thời tiết",
    "temperature": "nhiệt độ", "degree": "độ",
    "going": "đi", "journey": "hành trình", "genuine": "thật",
    "publish": "xuất bản", "emit": "phát ra", "traffic": "giao thông",
    "avenue": "đại lộ", "topic": "chủ đề", "subject": "chủ đề",
    "utilize": "dùng", "service": "dịch vụ", "degrees": "độ",
    "agree": "đồng ý", "bureau": "cục", "dept": "ban",
    "horse": "ngựa", "order": "thứ tự", "form": "hình thức",
    "back": "lưng", "class": "lớp", "carry": "mang", "turn": "quay",
    "bear": "chịu", "request": "yêu cầu", "shine": "chiếu",
    "design": "thiết kế", "male": "nam", "branch": "chi nhánh",
    "luck": "may mắn", "finish": "kết thúc", "evening": "buổi tối",
    "lead": "dẫn", "green": "xanh lá", "bird": "chim", "neck": "cổ",
    "advance": "tiến", "strike": "đánh", "rank": "cấp bậc",
    "ball": "quả bóng", "offer": "dâng", "ride": "cưỡi", "look": "nhìn",
    "reach": "với tới", "thick": "dày", "distant": "xa", "grieve": "đau buồn",
    "office": "văn phòng", "compare": "so sánh", "arms": "vũ khí",
    "hide": "ẩn", "beach": "bãi biển", "pure": "tinh khiết",
    "respect": "tôn kính", "wise": "khôn ngoan", "boil": "sôi",
    "grant": "ban", "calm": "bình tĩnh", "silk": "lụa",
    "little": "nhỏ", "thing": "vật", "capital": "thủ đô", "chief": "thủ lĩnh",
    "style": "phong cách", "origin": "nguồn gốc", "brush": "bút lông",
    "wisdom": "trí tuệ", "article": "bài viết", "reside": "cư trú",
    "tears": "nước mắt", "vice": "phó", "palace": "cung điện",
    "hall": "sảnh", "elder": "trưởng bối", "times": "lần",
    "truth": "sự thật", "table": "bàn", "tone": "giọng", "period": "thời kỳ",
    "proceed": "tiến hành", "gain": "được", "exist": "tồn tại",
    "next": "tiếp", "throw": "ném", "reward": "thưởng", "skill": "kỹ năng",
    "sink": "chìm", "divide": "chia", "refuse": "từ chối", "drive": "lái",
    "plane": "máy bay", "drop": "rơi", "defeat": "đánh bại",
    "command": "chỉ huy", "wealth": "của cải", "volume": "khối lượng",
    "salary": "lương", "garden": "vườn", "rare": "hiếm", "ship": "tàu",
    "boat": "thuyền", "refined": "tinh tế", "rejoice": "vui mừng",
    "fine": "tốt", "hurt": "tổn thương", "imitate": "bắt chước",
    "genius": "thiên tài", "ward": "phường", "group": "nhóm",
    "camp": "trại", "state": "bang", "pipe": "ống", "seal": "con dấu",
    "sign": "dấu hiệu", "heavens": "trời",
    "big": "lớn", "because": "vì", "by means": "bằng",
    "possess": "có", "have": "có", "revolve": "xoay",
    "effect": "hiệu quả", "testing": "thử", "england": "Anh",
    "english": "tiếng Anh", "map": "bản đồ", "drawing": "hình vẽ",
    "chicken": "gà", "younger": "em", "barrier": "rào cản",
    "promise": "lời hứa", "shrink": "co lại", "accept": "nhận",
    "undergo": "chịu", "means": "cách",
}


def load_tsv(path: Path) -> dict[str, str]:
    out: dict[str, str] = {}
    if not path.exists():
        return out
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip() or "\t" not in line:
            continue
        a, b = line.split("\t", 1)
        k = a.strip().lower()
        v = b.strip()
        if k and v and k not in out:
            out[k] = v
    return out


def looks_en(s: str) -> bool:
    sl = s.lower().strip()
    if re.search(r"[àáảãạăâèéêìíòóôơùúưỳýđ]", sl):
        return False
    if sl.startswith("to "):
        return True
    if re.search(r"\b(the|and|with|from|that|this|used|for|into|about|which)\b", sl) and " " in sl:
        return True
    toks = re.findall(r"[a-z']+", sl)
    if len(toks) == 1 and (len(toks[0]) >= 8 or toks[0].endswith(("tion", "sion", "ness", "ment", "ity"))):
        return True
    if len(toks) >= 2 and any(len(t) >= 7 for t in toks):
        return True
    return False


def en_to_vi(text: str, table: dict[str, str]) -> str:
    raw = text.strip()
    if not raw:
        return raw
    s = re.sub(r"^\(\d+\)\s*", "", raw.lower()).strip(" ?.!")
    s = re.sub(r"^\d+\.\s*", "", s)
    if s in table:
        return table[s]
    if s in KANJI_EN:
        return KANJI_EN[s]
    parts = re.split(r"\s*[,;/]\s*", s)
    if len(parts) > 1:
        seen, out = set(), []
        for p in parts:
            v = en_to_vi(p, table)
            if v and v.lower() not in seen:
                seen.add(v.lower())
                out.append(v)
        return " · ".join(out[:3])
    words = s.split()
    mapped = []
    for w in words:
        wl = w.strip(".,()!")
        if wl in {"a", "an", "the", "of", "or", "and", "for", "in", "on"}:
            continue
        mapped.append(table.get(wl) or KANJI_EN.get(wl) or wl)
    if mapped and not any(looks_en(x) for x in mapped):
        return " ".join(mapped)
    return table.get(s) or KANJI_EN.get(s) or raw


def clean_kun(k: str) -> str:
    k = k.strip()
    k = k.lstrip("-")
    k = k.replace(".", "")
    return k


def to_hira(s: str) -> str:
    out = []
    for ch in unicodedata.normalize("NFKC", s):
        c = ord(ch)
        if 0x30A1 <= c <= 0x30F6:
            out.append(chr(c - 0x60))
        else:
            out.append(ch)
    return "".join(out)


def patch_dictionary(table: dict[str, str]) -> int:
    rows = json.loads(DICT.read_text(encoding="utf-8"))
    n = 0
    for r in rows:
        parts = [p.strip() for p in re.split(r"\s*[·|/]\s*", r[3]) if p.strip()]
        out, seen = [], set()
        for p in parts:
            pl = re.sub(r"^\(\d+\)\s*", "", p.lower()).strip()
            pl = re.sub(r"^\d+\.\s*", "", pl)
            nxt = table.get(pl) or table.get(p.lower())
            if nxt is None and looks_en(p):
                nxt = en_to_vi(p, table)
            if nxt is None:
                nxt = p
            if looks_en(nxt) and any(not looks_en(x) for x in parts):
                continue
            k = nxt.lower()
            if k in seen:
                continue
            seen.add(k)
            out.append(nxt)
        # leftover numbered English fragments
        FORCE = {
            "還暦": "sinh nhật 60 tuổi",
            "福": "phúc / may mắn",
            "下町": "phố cổ",
        }
        if r[0] in FORCE:
            out = [FORCE[r[0]]]
        if not out:
            continue
        new = " · ".join(out[:3])
        if new != r[3]:
            r[3] = new
            n += 1
    DICT.write_text(json.dumps(rows, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return n


def build_kanji(table: dict[str, str]) -> None:
    dict_rows = json.loads(DICT.read_text(encoding="utf-8"))
    by_char: dict[str, list[tuple[str, str, str]]] = defaultdict(list)
    for r in dict_rows:
        word, kana, _rom, meaning = r[0], r[1], r[2], r[3]
        for ch in word:
            if "\u4e00" <= ch <= "\u9fff":
                by_char[ch].append((word, kana, meaning.split(" · ")[0]))

    rows = []
    seen = set()
    for level in ("N5", "N4", "N3", "N2", "N1"):
        data = json.loads((OPEN / f"{level.lower()}.json").read_text(encoding="utf-8"))
        for it in data:
            ch = it.get("character") or ""
            if not ch or ch in seen:
                continue
            seen.add(ch)
            on = [x for x in (it.get("onyomi") or []) if x]
            kun = [clean_kun(x) for x in (it.get("kunyomi") or []) if clean_kun(x)]
            meanings = [m.strip() for m in (it.get("meanings") or []) if m.strip() and m.lower() != "(kokuji)"]
            vis = []
            for m in meanings[:4]:
                v = en_to_vi(m, table)
                if v and v.lower() not in {x.lower() for x in vis}:
                    vis.append(v)
            flat = []
            for v in vis:
                for p in re.split(r"\s*[·|/]\s*", v):
                    p = p.strip()
                    if not p:
                        continue
                    if re.fullmatch(r"[A-Za-z][A-Za-z0-9' .,-]*", p):
                        p = en_to_vi(p, table)
                    if re.fullmatch(r"[A-Za-z][A-Za-z0-9' .,-]*", p):
                        continue
                    if p.lower() not in {x.lower() for x in flat}:
                        flat.append(p)
            vis = flat[:2] or [en_to_vi(meanings[0], table) if meanings else ch]
            examples = by_char.get(ch) or []
            examples.sort(key=lambda t: (0 if ch in t[0] else 1, len(t[0]), t[0] != ch))
            ex = next((t for t in examples if t[0] != ch), examples[0] if examples else ("", "", ""))
            if ch in {t[0] for t in examples[:3]}:
                self = next(t for t in examples if t[0] == ch)
                # prefer a compound example when possible
                ex = next((t for t in examples if t[0] != ch), self)
            rows.append([
                ch,
                " ".join(on[:4]),
                " ".join(kun[:4]),
                " · ".join(vis[:2]),
                str(it.get("strokes") or 0),
                level,
                ex[0],
                ex[1],
                ex[2],
            ])
    KANJI_OUT.write_text(json.dumps(rows, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"kanji {len(rows)} -> {KANJI_OUT} ({KANJI_OUT.stat().st_size} bytes)")


def main() -> None:
    table = load_tsv(EN_REMAIN)
    n = patch_dictionary(table)
    print(f"dictionary gloss patched {n}")
    build_kanji(table)


if __name__ == "__main__":
    main()
