#!/usr/bin/env python3
"""Build src/data/kanji-lessons.ts — N5–N1 grouped by bài học."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path("/workspace")
KANJI = json.loads((ROOT / "src/data/kanji-jlpt.json").read_text(encoding="utf-8"))

BY_LV: dict[str, list[str]] = {"N5": [], "N4": [], "N3": [], "N2": [], "N1": []}
for row in KANJI:
    ch, lv = row[0], row[5]
    if ch not in BY_LV[lv]:
        BY_LV[lv].append(ch)

N5_THEMES: list[tuple[str, str, str, str, str]] = [
    ("kj-ls-n5-num", "l-n5-kanji-num", "Số, lịch, tiền", "一二三・日月", "一二三四五六七八九十百千万年月日時半今毎午円"),
    ("kj-ls-n5-nature", "l-n5-kanji-nature", "Ngũ hành & thiên nhiên", "木火土金水", "山川水土火木金天気雨"),
    ("kj-ls-n5-people", "l-n5-kanji-people", "Người & gia đình", "人口父母", "人子女男女友名父母"),
    ("kj-ls-n5-school", "l-n5-kanji-school", "Trường & chữ nghĩa", "学校語本", "学校先生語本書聞話"),
    ("kj-ls-n5-verb", "l-n5-kanji-verb", "Hành động", "食行見", "出入行見来休読食"),
    ("kj-ls-n5-place", "l-n5-kanji-place", "Chỗ & phương hướng", "上下東西", "上下中外前後左右東西南北"),
    ("kj-ls-n5-life", "l-n5-kanji-life", "Đời sống N5", "国電車", "国大長生間高小電車何白"),
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
    ("kj-ls-n4-body", "l-n4-kanji-body", "Cơ thể & cảm", "手目体", "手目体足心病気質"),
]


def unique_keep(chars: str, pool: list[str], used: set[str]) -> str:
    out = []
    for ch in chars:
        if ch in pool and ch not in used:
            out.append(ch)
            used.add(ch)
    return "".join(out)


def chunks(items: list[str], n: int) -> list[list[str]]:
    return [items[i : i + n] for i in range(0, len(items), n)]


lessons: list[dict] = []

used: set[str] = set()
for lid, path, title, jp, chars in N5_THEMES:
    got = unique_keep(chars, BY_LV["N5"], used)
    rest = ""
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
rest5 = [c for c in BY_LV["N5"] if c not in used]
if rest5:
    lessons[-1]["chars"] += "".join(rest5)
    used.update(rest5)

used4: set[str] = set()
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
rest4 = [c for c in BY_LV["N4"] if c not in used4]
for i, group in enumerate(chunks(rest4, 16), start=1):
    lessons.append(
        {
            "id": f"kj-ls-n4-more-{i:02d}",
            "level": "N4",
            "title": f"Kanji N4 bổ sung {i}",
            "title_jp": f"N4-{i}",
            "summary": f"{len(group)} chữ N4 còn lại — học để hoàn tất N4.",
            "chars": "".join(group),
            "pathLessonId": f"l-n4-kanji-more-{i:02d}",
            "kind": "học",
        }
    )

for lv, size, kind in (("N3", 20, "tra cứu"), ("N2", 20, "tra cứu"), ("N1", 40, "tra cứu")):
    for i, group in enumerate(chunks(BY_LV[lv], size), start=1):
        lessons.append(
            {
                "id": f"kj-ls-{lv.lower()}-{i:02d}",
                "level": lv,
                "title": f"Kanji {lv} · bài {i}",
                "title_jp": f"{lv}-{i}",
                "summary": f"{len(group)} chữ {lv} để tra cứu. Lộ trình học vẫn ưu tiên N5–N4.",
                "chars": "".join(group),
                "pathLessonId": "",
                "kind": kind,
            }
        )

# write TS
lines = [
    'import type { JlptLevel } from "@/lib/akari/types";',
    "",
    "export type KanjiLessonKind = \"học\" | \"tra cứu\";",
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
    "}",
    "",
    "export const KANJI_LESSONS: KanjiLesson[] = [",
]
for ls in lessons:
    path = ls["pathLessonId"]
    path_js = f'"{path}"' if path else "undefined"
    lines.append("  {")
    lines.append(f'    id: "{ls["id"]}",')
    lines.append(f'    level: "{ls["level"]}",')
    lines.append(f'    title: "{ls["title"]}",')
    lines.append(f'    title_jp: "{ls["title_jp"]}",')
    lines.append(f'    summary: "{ls["summary"]}",')
    lines.append(f'    chars: "{ls["chars"]}",')
    if path:
        lines.append(f'    pathLessonId: "{path}",')
    lines.append(f'    kind: "{ls["kind"]}",')
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
lines.append("  if (level === \"all\") return KANJI_LESSONS;")
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

out = ROOT / "src/data/kanji-lessons.ts"
out.write_text("\n".join(lines) + "\n", encoding="utf-8")
print("lessons", len(lessons))
from collections import Counter
print(Counter(l["level"] for l in lessons))
print("N5 chars", sum(len(l["chars"]) for l in lessons if l["level"]=="N5"), "of", len(BY_LV["N5"]))
print("N4 chars", sum(len(l["chars"]) for l in lessons if l["level"]=="N4"), "of", len(BY_LV["N4"]))
print("N3", sum(len(l["chars"]) for l in lessons if l["level"]=="N3"), "N2", sum(len(l["chars"]) for l in lessons if l["level"]=="N2"), "N1", sum(len(l["chars"]) for l in lessons if l["level"]=="N1"))
