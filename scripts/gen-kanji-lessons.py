#!/usr/bin/env python3
"""Build src/data/kanji-lessons.ts — N5→N1 học theo bài, dễ trước khó sau."""
from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path("/workspace")
KANJI = json.loads((ROOT / "src/data/kanji-jlpt.json").read_text(encoding="utf-8"))

BY_LV: dict[str, list[str]] = {"N5": [], "N4": [], "N3": [], "N2": [], "N1": []}
STROKE: dict[str, int] = {}
LEVEL_OF: dict[str, str] = {}
for row in KANJI:
    ch, strokes, lv = row[0], row[4], row[5]
    STROKE[ch] = int(strokes) if str(strokes).isdigit() else 0
    LEVEL_OF[ch] = lv
    if ch not in BY_LV[lv]:
        BY_LV[lv].append(ch)

# Chữ N5 soạn tay (Minna / lớp Việt) — neo cấp thấp nếu JSON xếp N4.
auth_n5 = re.findall(r'k\("([^"]+)"', (ROOT / "src/data/kanji-n5.ts").read_text(encoding="utf-8"))
for ch in auth_n5:
    if ch not in BY_LV["N5"]:
        BY_LV["N5"].append(ch)
        LEVEL_OF[ch] = "N5"
        # kéo ra khỏi cấp cao hơn
        for other in ("N4", "N3", "N2", "N1"):
            if ch in BY_LV[other]:
                BY_LV[other].remove(ch)

N5_THEMES: list[tuple[str, str, str, str, str]] = [
    ("kj-ls-n5-num", "l-n5-kanji-num", "Số, lịch, tiền", "一二三・日月", "一二三四五六七八九十百千万年月日時半分今毎午円"),
    ("kj-ls-n5-nature", "l-n5-kanji-nature", "Ngũ hành & thiên nhiên", "木火土金水", "山川水土火木金天気雨田"),
    ("kj-ls-n5-people", "l-n5-kanji-people", "Người & gia đình", "人口父母", "人口子女男友名父母"),
    ("kj-ls-n5-school", "l-n5-kanji-school", "Trường & chữ nghĩa", "学校語本", "学校先生語本書聞話"),
    ("kj-ls-n5-verb", "l-n5-kanji-verb", "Hành động", "食行見", "出入行見来休読食飲買帰"),
    ("kj-ls-n5-place", "l-n5-kanji-place", "Chỗ & phương hướng", "上下東西", "上下中外前後左右東西南北"),
    ("kj-ls-n5-body", "l-n5-kanji-body", "Cơ thể N5", "目耳手足", "目耳手足"),
    ("kj-ls-n5-life", "l-n5-kanji-life", "Đời sống N5", "国電車", "国大長間高小電車何白安新古多少"),
]

N4_THEMES: list[tuple[str, str, str, str, str]] = [
    ("kj-ls-n4-work", "l-n4-kanji-work", "Việc làm", "会社仕事", "会仕事社業員発者場開力代仕"),
    ("kj-ls-n4-think", "l-n4-kanji-think", "Nghĩ & nói", "思知言考", "思知言問考教文研究試作"),
    ("kj-ls-n4-move", "l-n4-kanji-move", "Động từ N4", "待走歩", "動持用待走歩送切帰買起終始止"),
    ("kj-ls-n4-time", "l-n4-kanji-time", "Thời gian N4", "春夏秋冬", "朝週春夏秋冬昼夕曜"),
    ("kj-ls-n4-place", "l-n4-kanji-world", "Nơi chốn N4", "地院駅", "地京院町店駅館屋室世界"),
    ("kj-ls-n4-family", "l-n4-kanji-family", "Gia đình N4", "兄妹姉", "口弟兄妹姉私家族"),
    ("kj-ls-n4-nature", "l-n4-kanji-color", "Màu & thiên nhiên", "赤青黒", "赤青黒花紙色風海田鳥魚犬牛"),
    ("kj-ls-n4-adj", "l-n4-kanji-adj", "Tính chất N4", "新安強", "新多正安強公近広少"),
    ("kj-ls-n4-body", "l-n4-kanji-body", "Cơ thể & cảm", "手目体", "手目体足心病質"),
]

N3_TITLES = [
    ("Xã hội & chính trị", "政民"),
    ("Kinh tế & pháp", "経法"),
    ("Tiến triển", "進続"),
    ("Quan hệ & phán đoán", "判認"),
    ("Cảm xúc & thay đổi", "感情"),
    ("Năng lực & nghề", "職能"),
    ("Quy tắc & chi phí", "規費"),
    ("Nhà cửa & hỗ trợ", "宅助"),
    ("Hình dạng & số phận", "形命"),
    ("Quan sát & giá trị", "観察"),
    ("Khoa học & tốc độ", "科速"),
    ("Trách nhiệm & tình cảm", "愛責"),
    ("Gia đình & sức khỏe", "妻薬"),
    ("Nỗ lực & hạnh phúc", "幸努"),
    ("Sinh hoạt hằng ngày", "勤願"),
    ("Mong muốn & vui chơi", "欲遊"),
    ("Thời tiết & thói quen", "晴慣"),
    ("Cơ thể & cảm giác", "眠疲"),
    ("Kanji N3 còn lại", "才猫"),
]

N2_TITLES = [
    ("Tin tức & hành chính", "党県"),
    ("Kinh tế N2", "税営"),
    ("Kỹ thuật & số lượng", "技量"),
    ("Lịch sử & địa lý", "史谷"),
    ("Y tế & thương mại", "療販"),
    ("Giao thông & công nghiệp", "鉄航"),
    ("Đo lường & tự nhiên", "測豊"),
    ("Xã hội & tuổi tác", "齢城"),
    ("Văn hóa & thời gian", "季誌"),
    ("Nhà cửa & thiên tai", "寺震"),
    ("Cơ thể & công việc", "臓雇"),
    ("Thiên nhiên N2", "泉漁"),
    ("Lễ & đời sống", "祭宝"),
    ("Áo quần & thời tiết", "衣雲"),
    ("Ẩm thực & cơ thể", "乳菜"),
    ("Vật liệu & nông", "鉱氷"),
    ("Đồ vật đời sống", "瓶灯"),
    ("Nhà cửa & dụng cụ", "机皿"),
    ("Kanji N2 còn lại", "肯曇"),
]


def unique_keep(chars: str, pool: list[str], used: set[str]) -> str:
    out = []
    for ch in chars:
        if ch in pool and ch not in used:
            out.append(ch)
            used.add(ch)
    return "".join(out)


def by_stroke(chars: list[str]) -> list[str]:
    return sorted(chars, key=lambda c: (STROKE.get(c, 99), c))


def chunks(items: list[str], n: int) -> list[list[str]]:
    return [items[i : i + n] for i in range(0, len(items), n)]


def group_path(lv: str, i: int) -> str:
    size = 5 if lv == "N1" else 4
    g = (i - 1) // size + 1
    return f"l-{lv.lower()}-kanji-{g:02d}"


lessons: list[dict] = []
used_all: set[str] = set()

used: set[str] = set()
for lid, path, title, jp, chars in N5_THEMES:
    got = unique_keep(chars, BY_LV["N5"], used)
    if not got:
        continue
    lessons.append(
        {
            "id": lid,
            "level": "N5",
            "title": title,
            "title_jp": jp,
            "summary": f"{len(got)} chữ N5. Học theo bài, Hán-Việt trước rồi on/kun.",
            "chars": got,
            "pathLessonId": path,
            "kind": "học",
        }
    )
rest5 = by_stroke([c for c in BY_LV["N5"] if c not in used])
if rest5:
    lessons[-1]["chars"] += "".join(rest5)
    lessons[-1]["summary"] = f"{len(lessons[-1]['chars'])} chữ N5. Học theo bài, Hán-Việt trước rồi on/kun."
    used.update(rest5)
used_all.update(used)

used4: set[str] = set(used_all)
for lid, path, title, jp, chars in N4_THEMES:
    got = unique_keep(chars, BY_LV["N4"], used4)
    if not got:
        continue
    lessons.append(
        {
            "id": lid,
            "level": "N4",
            "title": title,
            "title_jp": jp,
            "summary": f"{len(got)} chữ N4. Từ ghép on, nhớ Hán-Việt.",
            "chars": got,
            "pathLessonId": path,
            "kind": "học",
        }
    )
rest4 = by_stroke([c for c in BY_LV["N4"] if c not in used4])
N4_MORE = [
    "Kanji N4 bổ sung — nét ít",
    "Kanji N4 bổ sung — trung bình",
    "Kanji N4 bổ sung — hơi khó",
    "Kanji N4 bổ sung — nét nhiều",
    "Kanji N4 còn lại",
]
for i, group in enumerate(chunks(rest4, 16), start=1):
    title = N4_MORE[i - 1] if i - 1 < len(N4_MORE) else f"Kanji N4 bổ sung {i}"
    lessons.append(
        {
            "id": f"kj-ls-n4-more-{i:02d}",
            "level": "N4",
            "title": title,
            "title_jp": f"N4-{i}",
            "summary": f"{len(group)} chữ N4, sắp theo số nét tăng dần — học để hoàn tất N4.",
            "chars": "".join(group),
            "pathLessonId": f"l-n4-kanji-more-{i:02d}",
            "kind": "học",
        }
    )
used_all.update(used4)
used_all.update(rest4)

for lv, size, titles in (("N3", 20, N3_TITLES), ("N2", 20, N2_TITLES)):
    pool = [c for c in BY_LV[lv] if c not in used_all]
    for i, group in enumerate(chunks(pool, size), start=1):
        title, jp = titles[i - 1] if i - 1 < len(titles) else (f"Kanji {lv} · bài {i}", f"{lv}-{i}")
        lessons.append(
            {
                "id": f"kj-ls-{lv.lower()}-{i:02d}",
                "level": lv,
                "title": title,
                "title_jp": jp,
                "summary": f"{len(group)} chữ {lv}. Chữ hay gặp trước — Hán-Việt, nét, on/kun.",
                "chars": "".join(group),
                "pathLessonId": group_path(lv, i),
                "kind": "học",
            }
        )
        used_all.update(group)

n1_bands = [
    (8, "Kanji N1 hay gặp", "N1 báo"),
    (8, "Kanji N1 học thuật", "N1 học"),
    (8, "Kanji N1 mở rộng", "N1 rộng"),
    (7, "Kanji N1 ít gặp", "N1 hiếm"),
]
n1_pool = [c for c in BY_LV["N1"] if c not in used_all]
n1_chunks = chunks(n1_pool, 40)
band_of = []
for count, label, jp in n1_bands:
    band_of.extend([(label, jp)] * count)
for i, group in enumerate(n1_chunks, start=1):
    label, jp = band_of[i - 1] if i - 1 < len(band_of) else ("Kanji N1 còn lại", "N1")
    lessons.append(
        {
            "id": f"kj-ls-n1-{i:02d}",
            "level": "N1",
            "title": f"{label} · bài {i}",
            "title_jp": f"{jp}-{i}",
            "summary": f"{len(group)} chữ N1. Học tiếp sau N2 — Hán-Việt neo nghĩa, rồi on/kun.",
            "chars": "".join(group),
            "pathLessonId": group_path("N1", i),
            "kind": "học",
        }
    )

# write TS
lines = [
    'import type { JlptLevel } from "@/lib/akari/types";',
    "",
    'export type KanjiLessonKind = "học" | "tra cứu";',
    "",
    "export interface KanjiLesson {",
    "  id: string;",
    "  level: JlptLevel;",
    "  title: string;",
    "  title_jp: string;",
    "  summary: string;",
    "  chars: string;",
    "  pathLessonId?: string;",
    "  kind: KanjiLessonKind;",
    "  /** Thứ tự học toàn bộ N5→N1, bắt đầu từ 1. */",
    "  seq: number;",
    "}",
    "",
    "export const KANJI_LESSONS: KanjiLesson[] = [",
]
for i, ls in enumerate(lessons, start=1):
    lines.append("  {")
    lines.append(f'    id: "{ls["id"]}",')
    lines.append(f'    level: "{ls["level"]}",')
    lines.append(f'    title: "{ls["title"]}",')
    lines.append(f'    title_jp: "{ls["title_jp"]}",')
    lines.append(f'    summary: "{ls["summary"]}",')
    lines.append(f'    chars: "{ls["chars"]}",')
    lines.append(f'    pathLessonId: "{ls["pathLessonId"]}",')
    lines.append(f'    kind: "{ls["kind"]}",')
    lines.append(f"    seq: {i},")
    lines.append("  },")
lines.append("];")
lines.append("")
lines.append("const BY_CHAR = new Map<string, KanjiLesson>();")
lines.append("for (const lesson of KANJI_LESSONS) {")
lines.append("  for (const ch of lesson.chars) {")
lines.append("    if (!BY_CHAR.has(ch)) BY_CHAR.set(ch, lesson);")
lines.append("  }")
lines.append("}")
lines.append("")
lines.append("export function kanjiLessonOf(character: string) {")
lines.append("  return BY_CHAR.get(character);")
lines.append("}")
lines.append("")
lines.append('export function kanjiLessonsFor(level: "all" | JlptLevel) {')
lines.append('  if (level === "all") return KANJI_LESSONS;')
lines.append("  return KANJI_LESSONS.filter((l) => l.level === level);")
lines.append("}")
lines.append("")
lines.append("export function kanjiLessonById(id: string) {")
lines.append("  return KANJI_LESSONS.find((l) => l.id === id);")
lines.append("}")
lines.append("")
lines.append("export function kanjiLessonByPath(pathId: string) {")
lines.append("  return KANJI_LESSONS.find((l) => l.pathLessonId === pathId);")
lines.append("}")
lines.append("")
lines.append("export function kanjiLessonsByPath(pathId: string) {")
lines.append("  return KANJI_LESSONS.filter((l) => l.pathLessonId === pathId);")
lines.append("}")
lines.append("")
lines.append("/** Chỉ số chữ trong thứ tự học N5→N1 (0-based). */")
lines.append("export function kanjiLearnIndex(character: string) {")
lines.append("  const lesson = BY_CHAR.get(character);")
lines.append("  if (!lesson) return Number.POSITIVE_INFINITY;")
lines.append("  const before = KANJI_LESSONS.slice(0, lesson.seq - 1).reduce((n, l) => n + l.chars.length, 0);")
lines.append("  return before + [...lesson.chars].indexOf(character);")
lines.append("}")
lines.append("")
lines.append("export const KANJI_LESSON_TOTAL = KANJI_LESSONS.length;")
lines.append("")

out = ROOT / "src/data/kanji-lessons.ts"
out.write_text("\n".join(lines) + "\n", encoding="utf-8")
print("lessons", len(lessons))
print(Counter(l["level"] for l in lessons))
all_chars = "".join(l["chars"] for l in lessons)
print("chars", len(all_chars), "unique", len(set(all_chars)))
print("N5", sum(len(l["chars"]) for l in lessons if l["level"] == "N5"), "of pool", len(BY_LV["N5"]))
print("N4", sum(len(l["chars"]) for l in lessons if l["level"] == "N4"), "of pool", len(BY_LV["N4"]))
print("N3", sum(len(l["chars"]) for l in lessons if l["level"] == "N3"))
print("N2", sum(len(l["chars"]) for l in lessons if l["level"] == "N2"))
print("N1", sum(len(l["chars"]) for l in lessons if l["level"] == "N1"))
print("path ids", len({l["pathLessonId"] for l in lessons}))
print("N5 titles", [l["title"] + ":" + str(len(l["chars"])) for l in lessons if l["level"] == "N5"])
