#!/usr/bin/env python3
"""Retag JLPT dictionary POS and translate leftover English glosses to Vietnamese."""
from __future__ import annotations

import json
import re
import unicodedata
from collections import Counter
from pathlib import Path

ROOT = Path("/workspace")
JSON_PATH = ROOT / "src/data/dictionary-jlpt.json"
TSV_PATH = ROOT / "scripts/en-vi-jlpt.tsv"
EXTRA_TSV = ROOT / "scripts/en-vi-extra.tsv"
VOCAB_N5 = ROOT / "src/data/vocabulary-n5.ts"
VOCAB_N4 = ROOT / "src/data/vocabulary-n4.ts"
CORE = ROOT / "src/data/dictionary-core.ts"
OPENJLPT = Path("/tmp/openjlpt")

IE_ROW = set("いきぎしじちぢにひびぴみりえけげせぜてでねへべぺめれ")
U_ROW = set("うくぐすつぬぶむる")
KANJI_RE = re.compile(r"[\u4e00-\u9fff]")
VI_DIAC = re.compile(
    r"[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]",
    re.I,
)

PARTICLES = {
    "は", "が", "を", "に", "で", "と", "も", "から", "まで", "より", "の", "へ",
    "や", "か", "ね", "よ", "さ", "わ", "ぞ", "な", "かな", "こそ", "さえ", "しか",
    "だけ", "ばかり", "ほど", "くらい", "ぐらい", "など", "なんて", "って",
    "ば", "ても", "のに", "ので", "ながら", "たり", "つつ", "くらい",
}
EXPRESSIONS = {
    "こんにちは", "こんばんは", "おはよう", "おはようございます", "さようなら",
    "ありがとう", "ありがとうございます", "すみません", "ごめんなさい",
    "はい", "いいえ", "はじめまして", "どうぞ", "よろしく", "お願いします",
    "よろしくおねがいします", "いただきます", "ごちそうさま", "ただいま",
    "おかえり", "おやすみ", "おやすみなさい", "いってきます", "いってらっしゃい",
    "ようこそ", "いらっしゃいませ", "いらっしゃい", "ください", "ちょうだい",
    "もしもし", "じゃあね", "またね", "お疲れ様", "おつかれさま",
    "かもしれない", "かもしれません", "いけない", "くださいませ",
    "いただきます", "かしこまりました", "どういたしまして",
}
PRONOUNS = {
    "わたし", "あたし", "ぼく", "おれ", "あなた", "きみ", "かれ", "かのじょ",
    "わたしたち", "かれら", "これ", "それ", "あれ", "どれ", "ここ", "そこ",
    "あそこ", "どこ", "こちら", "そちら", "あちら", "どちら", "だれ", "誰",
    "なに", "なん", "私", "僕", "俺", "彼", "彼女", "此れ", "其れ", "彼れ",
    "我々", "みんな", "みなさん", "ぼくたち",
}
QUESTION = {
    "なに", "なん", "何", "だれ", "誰", "どこ", "いつ", "どう", "どうして",
    "なぜ", "どれ", "どの", "どちら", "いくら", "いくつ", "どんな",
}
NUMERALS = {
    "いち", "に", "さん", "よん", "し", "ご", "ろく", "なな", "しち", "はち",
    "きゅう", "く", "じゅう", "ひゃく", "せん", "まん", "ゼロ", "れい",
    "ひとつ", "ふたつ", "みっつ", "よっつ", "いつつ", "むっつ", "ななつ",
    "やっつ", "ここのつ", "とお", "一", "二", "三", "四", "五", "六", "七",
    "八", "九", "十", "百", "千", "万", "零",
}
CONJUNCTIONS = {
    "そして", "それから", "でも", "しかし", "だから", "ですから", "それに",
    "それでも", "ところで", "すなわち", "つまり", "あるいは", "または",
    "もしくは", "ただし", "なお", "ちなみに", "また", "しかも", "それでも",
    "それでは", "では", "すると", "なので", "だから",
}
ADVERBS = {
    "すぐに", "すぐ", "たくさん", "いつも", "まだ", "もう", "ちょっと",
    "たぶん", "きっと", "ぜひ", "だんだん", "どんどん", "はっきり",
    "ゆっくり", "あまり", "ぜんぜん", "とても", "かなり", "すこし", "もっと",
    "ずっと", "やっと", "ついに", "まず", "ほとんど", "だいたい", "たいてい",
    "よく", "たまに", "ときどき", "なぜ", "どうして", "こう", "そう",
    "やはり", "やっぱり", "なるべく", "できるだけ", "わざわざ", "うっかり",
    "しっかり", "ぴったり", "そっと", "じっと", "きちんと", "ちゃんと",
    "いきなり", "しばらく", "さっき", "あとで", "これから", "いままで",
    "すっかり", "すべて", "特に", "必ず", "決して", "絶対", "もちろん",
    "おそらく", "どうも", "どうやら", "せっかく", "いっぱい", "おたがいに",
    "かなり", "ずいぶん", "もっと", "いちばん", "とっても", "すごく",
    "まあまあ", "かなり", "ほぼ", "まさに", "すでに", "いま", "さっき",
    "いつも", "いつでも", "どこでも", "なんでも", "ぜひとも", "なるべく",
    "たいてい", "たまに", "しばしば", "しばらく", "だんだん", "いよいよ",
    "やがて", "ついに", "とうとう", "ようやく", "やっと", "まさか",
    "さすが", "どうせ", "あくまで", "せめて", "あえて", "しょっちゅう",
    "かなり", "けっこう", "わりと", "わりに", "とても", "大変",
    "お互い", "おたがい", "互いに",
}
NA_DESPITE_I = {"きれい", "嫌い", "きらい", "幸い", "偉大", "奇麗", "綺麗"}
NA_ADJ = {
    "有名", "静か", "好き", "便利", "下手", "上手", "元気", "暇", "丁寧",
    "親切", "大切", "安全", "危険", "簡単", "複雑", "十分", "必要", "可能",
    "不可能", "同じ", "色々", "特別", "普通", "大変", "結構", "適当", "謙虚",
    "まじめ", "真面目", "きれい", "嫌い", "好き", "有名", "便利", "静か",
    "にぎやか", "賑やか", "しんせつ", "じょうず", "へた", "げんき", "ひま",
    "たいせつ", "かんたん", "すてき", "立派", "らく", "だめ", "無理",
    "いろいろ", "さまざま", "特別", "急", "変", "不思議", "十分", "大切",
    "好き", "嫌い", "同じ", "元気", "暇", "簡単", "複雑", "丁寧", "親切",
    "便利", "不便", "安全", "危険", "大丈夫", "必要", "不要", "可能",
    "有能", "無能", "幸せ", "不幸", "自由", "平和", "特別", "一般",
    "完全", "明確", "重要", "優秀", "豊富", "適切", "正確", "重大",
    "深刻", "明らか", "真剣", "熱心", "慎重", "積極", "消極", "平等",
    "公平", "独特", "奇妙", "不便", "無理", "結構", "普通", "大変",
    "不要", "複雑", "必要", "可能", "不可能", "十分", "危険", "安全",
    "幸せ", "不幸", "楽", "嫌", "好き", "嫌い", "有名", "便利", "静か",
    "緩やか", "ゆるやか", "明らか", "明らか", "だめ",
}
NOUN_I = {
    "匂い", "におい", "臭い", "勢い", "いきおい", "思い", "おもい",
    "違い", "ちがい", "向かい", "むかい", "出会い", "であい", "住まい",
    "すまい", "願い", "ねがい", "祝い", "いわい", "お祝い", "おいわい",
    "笑い", "わらい", "戦い", "たたかい", "手伝い", "てつだい", "間違い",
    "まちがい", "見舞い", "みまい", "お見舞い", "おみまい", "くらい",
    "ぐらい", "あい", "はい", "ください", "ちょうだい", "うがい",
    "お互い", "おたがい", "いっぱい", "たいてい", "しまい",
    "お手洗い", "てあらい",
}

VI_KEEP = {
    "xung quanh", "kinh doanh", "cho xem", "em trai", "tham quan", "quay phim",
    "sinh ra", "radio", "taxi", "tivi", "kimono", "futon", "ghita", "judo",
    "salad", "album", "fax", "sofa", "vali", "vest", "internet", "email",
    "menu", "bonus", "poster", "mask", "drama", "video", "picnic", "hiking",
    "pilot", "beer", "yacht", "wine", "violin", "piano", "tennis", "golf",
    "hotel", "taxi", "bus", "taxi", "ok", "web", "jazz", "club", "quiz",
    "graph", "catch", "career", "show", "shock", "studio", "solo", "teamwork",
    "design", "virus", "boots", "ferry", "buzzer", "swing", "pause", "hall",
    "volt", "pump", "mark", "massage", "melody", "motel", "label", "race",
    "lady", "lever", "romantic", "watt", "cocktail", "cameraman", "jumbo",
    "genre", "slacks", "typist", "timer", "timing", "chime", "dessert",
    "demonstration", "telex", "transistor", "drill", "napkin", "nuance",
    "screwdriver", "pajamas", "pyjamas", "badge", "hint", "boom", "front",
    "boycott", "hose", "best-seller", "misprint", "maker", "ribbon", "lens",
    "locker", "lobby", "marathon", "motor", "monorail", "lunch", "rhythm",
    "raincoat", "helicopter", "plastic", "platform", "print", "brooch",
    "program", "veteran", "blouse", "brush", "pistol", "vitamin", "vinyl",
    "pink", "zipper", "nylon", "dial", "diamond", "tempo", "shutter",
    "speaker", "slide", "cement", "diagram", "stewardess", "stockings",
    "calorie", "cooler", "siren", "apron", "orchestra", "automation",
    "antenna", "etiquette", "accent", "yawn", "serial", "ring", "mail",
    "export", "midnight", "mug", "blanket", "fog", "bottle", "ice", "cord",
    "cloth", "Buddha", "physics", "gem", "charm", "daze", "permit",
    "championship", "prediction", "storm", "fee", "tear", "lover", "cage",
    "luxury", "PhD", "museum", "Japan", "tea", "verb", "poison", "road",
    "wave", "plum", "board", "tragedy", "aviation", "heart", "sleep",
    "clean", "needle", "floor", "laugh", "elephant", "castle", "plant",
    "week", "poem", "poet", "magic", "lawn", "suicide", "delay", "queen",
    "actress", "wheat", "parcel", "boys", "signal", "buddy", "tongue",
    "twins", "nest", "frost", "noise", "bundle", "sleeve", "sun", "arrest",
    "atmosphere", "ambassador", "continent", "valley", "earth", "basement",
    "mud", "peas", "headache", "coworker", "farmer", "farmers", "applause",
    "denial", "comparison", "complaint", "fellowship", "width", "garments",
    "sounds", "tale", "things", "phrase", "walkway", "tomb", "treasure",
    "call", "rich", "ignore", "futility", "bother", "wings", "nude", "gist",
    "validity", "better", "alighting", "ditch", "underline", "aerial",
    "volcano", "fireworks", "taxation", "cargo", "mosquito", "breakup",
    "lump", "ocean", "colors", "external", "hedge", "husk", "probability",
    "angle", "undergraduate", "multiplication", "brackets", "thoughts",
    "ventilation", "canning", "observation", "appreciation", "utensil",
    "gas", "famine", "reverse", "inversion", "holiday", "grant", "fisherman",
    "boundary", "curve", "goldfish", "zone", "fancy", "comb", "form",
    "honorific", "longitude", "modesty", "humble", "microscope", "habitat",
    "origin", "paste", "pepper", "pleasure", "bow", "try", "merit",
    "lipstick", "plaza", "lecturer", "mineral", "item", "perfume", "rational",
    "nationality", "calamity", "sewing", "lumber", "manufacture", "erasure",
    "photographing", "triangle", "arithmetic", "abacus", "acidity",
    "assignment", "corpse", "wastepaper", "violet", "gear", "children",
    "magnet", "writing", "achievements", "stripe", "sketching", "editorial",
    "garage", "handy", "wrist", "restroom", "procedure", "repairs", "repair",
    "penmanship", "idiom", "predicate", "bookshop", "calligraphy", "recording",
    "decimal", "alcove", "digestion", "disinfection", "omission", "humid",
    "evaporation", "trees", "tableware", "lips", "shinkansen", "myth",
    "thumb", "wire", "humanities", "vinegar", "chart", "vertical",
    "fisheries", "hydrogen", "flask", "drunkard", "essays", "integer",
    "adjustment", "equator", "publicity", "cork", "sandals", "funeral",
    "farewell", "postage", "fluctuation", "shipbuilding", "measurement",
    "surveying", "footprints", "tabi", "drum", "ellipse", "gymnastics",
    "lending", "pronoun", "carpenter", "waterfall", "derailment", "bamboo",
    "sterility", "reconciliation", "siesta", "carving", "condiment",
    "currency", "passbook", "interpretation", "claw", "razor", "nail",
    "biography", "contagion", "farm", "nausea", "Orient", "theft", "teacup",
    "lighthouse", "unity", "scratch", "cleanness", "route", "forte",
    "Antarctic", "rainbow", "sunrise", "shadow", "brightness", "fragment",
    "proceeds", "scales", "firing", "radius", "peninsula", "sarcasm",
    "elbow", "writer", "binding", "spread", "attached", "balloon", "adverb",
    "plural", "classification", "context", "sailor", "hiragana", "weekday",
    "closure", "villa", "katakana", "editing", "hygiene", "recruiting",
    "packing", "bandage", "dialect", "equation", "telescope", "meadow",
    "pillow", "infinite", "plain", "contradiction", "masterpiece", "noun",
    "superstition", "niece", "wood", "dialogue", "pharmacy", "transport",
    "mailing", "infancy", "kindergarten", "vessel", "lava", "nutrient",
    "greed", "yukata", "caretaker", "grain", "hostel", "consul", "brick",
    "candle", "pun", "alkali", "aluminium", "hour", "encore", "interchange",
    "intercom", "inflation", "orientation", "attendant", "errand",
    "guidebook", "category", "comeback", "feel", "cheat", "crane",
    "contest", "compass", "dungarees", "jump", "dozen", "tile", "dump",
    "teamwork", "spoil", "hangar", "fawn", "Mrs", "rice", "suborder",
    "civility", "evil", "aggravation", "rascal", "reed", "assassination",
    "dark", "reliance", "commit", "dissent", "migration", "emigrant",
    "outfit", "clothing", "swirl", "shipping", "fare", "carriage",
    "transportation", "projection", "image", "hero", "cigarettes",
    "impurity", "nephew", "gold", "timidity", "timbre", "diarrhoea",
    "fossil", "seasoning", "cattle", "retinue", "rivers", "spark",
    "pollen", "load", "baling", "depopulation", "strain", "stroke",
    "intervention", "autopsy", "forwarding", "circulation", "monster",
    "deterioration", "maritime", "channel", "pioneer", "stories", "cliff",
    "notion", "highway", "diffusion", "disparity", "kernel", "possession",
    "ensure", "optimism", "credit", "quota", "smoothness", "funny", "pardon",
    "bureaucrat", "tolerance", "interference", "infection", "sensitivity",
    "cheer", "guarding", "onlookers", "viewing", "cancer", "ophthalmology",
    "eyeball", "sham", "obstinacy", "comedy", "donation", "loom", "whim",
    "steamship", "prayer", "describing", "undulation", "orbit", "forgery",
    "objective", "reversal", "handstand", "hill", "suspension", "truce",
    "palace", "poverty", "residence", "veto", "coeducation", "communism",
    "shout", "forcing", "threat", "arousal", "nostalgia", "wonder",
    "paradise", "labor", "taboo", "myopia", "shortsightedness", "testing",
    "grumble", "blank", "vacancy", "hunger", "bending", "mob", "warship",
    "armaments", "lean", "blessing", "cost", "stalk", "meter", "warning",
    "abatement", "scorn", "rash", "troupe", "encouragement", "crystal",
    "reward", "quotation", "viewpoint", "hearsay", "antiquity", "fixation",
    "orphan", "solitude", "groin", "exaggeration", "hire", "retreat",
    "words", "glossary", "connection", "polish", "licence", "oral", "dirt",
    "engineering", "protest", "subsidy", "attack", "pose", "archaeology",
    "sail", "estrangement", "act", "march", "rainfall", "spices", "plateau",
    "interval", "conference", "realm", "curio", "trifle", "gravel", "fraud",
    "symposium", "rebuilding", "playback", "mining", "gathering",
    "cultivation", "germ", "riches", "finances", "fence", "hallucination",
    "murder", "sundries", "chatting", "shamisen", "visiting", "mountains",
    "hillside", "postpartum", "yield", "acid", "oxidation", "trick", "thorn",
    "embroidery", "thought", "indication", "mandate", "orders", "enforcing",
    "vision", "requirements", "raising", "dentistry", "Samurai", "magnetism",
    "otolaryngology", "self", "hubris", "spin", "independence", "resignation",
    "axis", "adhesion", "elimination", "jealousy", "businessman", "essence",
    "sod", "weakness", "starring", "protagonist", "swap", "doorkeeper",
    "preparations", "handicrafts", "manacles", "trouble", "technique",
    "choker", "create", "returns", "seating", "adornment", "aggregate",
    "fullness", "beast", "repetition", "usefulness", "lessons", "bleeding",
    "sailing", "wink", "shield", "whereabouts", "owning", "particle", "Ms",
    "quotient", "pediatrics", "retail", "treetop", "erasing", "collation",
    "illumination", "phenomenon", "symbol", "boss", "pact", "cane",
    "distillation", "concession", "colony", "weave", "fabric", "devotee",
    "deliberation", "outset", "vibration", "freshman", "pearl", "devotion",
    "mystery", "gentleman", "gesture", "presentation", "hostage", "glimpse",
    "dustpan", "propulsion", "guess", "reasoning", "vapor", "fountainhead",
    "flushing", "cult", "numeral", "fruits", "maturity", "constellation",
    "pure", "purity", "native", "menses", "delicate", "Bible", "recipe",
    "honest", "youth", "repose", "static", "deficit", "heir", "conjunction",
    "persuasion", "avalanche", "despair", "hermit", "tactics", "mean",
    "diving", "fibre", "selection", "booking", "precedent", "virtue",
    "annihilation", "step", "creation", "ornament", "traveling", "remittance",
    "hatred", "duration", "saliva", "physique", "interaction", "cope",
    "equivalent", "appointment", "default", "thigh", "degeneration",
    "extermination", "substitution", "libretto", "mess", "shit", "ordinal",
    "secession", "monotony", "litter", "expedition", "sigh", "tanka",
    "protein", "podium", "elasticity", "declaration", "discount",
    "intellectual", "terrain", "hell", "slack", "lag", "damn", "store",
    "suffocation", "launch", "coloring", "relay", "libel", "pivot", "break",
    "poisoning", "neutrality", "neutralize", "somersault", "fidelity",
    "raffle", "savings", "tide", "auditing", "stethoscope", "guts",
    "butterfly", "mediation", "chief", "spire", "sinking", "wages",
    "tsunami", "falling", "pursuit", "exile", "connoisseur", "coherence",
    "strap", "fishing", "offer", "acceptance", "adaptation", "aptitude",
    "crowbar", "ceiling", "divert", "transfer", "ignition", "rear",
    "betting", "arena", "insolvency", "hibernation", "stealing", "lead",
    "flight", "pottery", "mobilization", "motive", "dynamic", "unrest",
    "power", "tuning", "longing", "dojo", "copper", "monopoly", "originality",
    "reader", "penetration", "stolidity", "cabinet", "viscera", "inland",
    "defect", "sunburn", "obtaining", "bathe", "urine", "nomination",
    "pregnancy", "cognizance", "yearbook", "seniority", "screw", "burning",
    "fuel", "viscosity", "worry", "grasp", "send", "destruction", "annulment",
    "rupture", "scrap", "repeal", "borrowing", "drainage", "defeat",
    "disposition", "allotment", "indemnity", "persecution", "bomb", "blast",
    "excavation", "fit", "outbreak", "starting", "curse", "warp", "revolt",
    "echo", "counterblow", "oppose", "mutiny", "spots", "edition", "negation",
    "misery", "shriek", "door", "proportion", "manure", "misconduct", "tail",
    "smile", "eyebrow", "beauty", "motto", "depiction", "sensibility",
    "disgrace", "appendix", "millionaire", "edict", "ubiquity", "buoyancy",
    "decay", "wound", "force", "blockade", "revival", "boiling", "French",
    "storeroom", "minute", "dispersion", "molecule", "denominator", "split",
    "spewing", "soldier", "closing", "finishing", "repayment", "insurance",
    "maintaining", "pavement", "whaling", "constable", "compensation",
    "reparation", "cemetery", "follow", "service", "peak", "collapse",
    "abandonment", "emission", "radioactivity", "emit", "courtroom",
    "saturation", "gale", "violence", "exposure", "spinning", "cheek",
    "manservant", "pastor", "propriety", "substance", "instinct", "flax",
    "anaesthesia", "palsy", "almighty", "pending", "crowd", "close",
    "density", "pulse", "reticence", "innocence", "ignorance", "inefficiency",
    "useless", "honor", "clarity", "exemption", "acne", "rage", "eyelid",
    "look", "bedding", "nighthawk", "designs", "wild", "arrow", "gentle",
    "ascendancy", "supremacy", "superiority", "bravery", "organic",
    "prominence", "lure", "nomadism", "versatility", "premonition",
    "directions", "suppression", "desire", "barefoot", "attendance",
    "lawmaking", "acronym", "pillage", "sink", "arrears", "finish",
    "acknowledgement", "conscience", "forestry", "analogy", "lotus",
    "solidarity", "commonwealth", "dew", "recitation", "senility", "logic",
    "planet", "frame", "apology", "beak", "excreta", "creases", "lottery",
    "bud", "wince", "snoring",
}

# Remaining English → Vietnamese. Single words + phrases not already in TSV.
WORD_VI: dict[str, str] = {}


def load_tsv(path: Path) -> dict[str, str]:
    out: dict[str, str] = {}
    if not path.exists():
        return out
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
            out[stripped] = val
    return out


def verb_group(reading: str) -> str:
    if reading in ("する", "くる", "来") or reading.endswith("する"):
        return "động từ nhóm 3"
    if reading.endswith("る") and reading[:-1] and reading[-2] in IE_ROW:
        return "động từ nhóm 2"
    return "động từ nhóm 1"


def meaning_is_verb(meanings: list[str]) -> bool:
    for m in meanings:
        sl = m.lower().strip()
        if sl.startswith("to "):
            rest = sl[3:]
            if rest.startswith(("that ", "this ", "the ", "a ", "an ", "one ", "some ", "such ")):
                continue
            return True
        if sl.startswith("be ") and " " in sl[3:]:
            return True
    return False


def guess_pos(word: str, reading: str, meanings: list[str], en: list[str] | None = None) -> str:
    w = word.strip()
    r = (reading or word).strip()
    joined = " ".join([*meanings, *(en or [])]).lower()

    if w in PARTICLES or (w == r and r in PARTICLES):
        return "trợ từ"
    if w in EXPRESSIONS or (w == r and r in EXPRESSIONS):
        return "biểu hiện"
    if w in PRONOUNS or (w == r and r in PRONOUNS):
        return "đại từ"
    if w in QUESTION or (w == r and r in QUESTION):
        return "từ nghi vấn"
    if w in NUMERALS or (w == r and r in NUMERALS):
        return "số từ"
    if w in CONJUNCTIONS or (w == r and r in CONJUNCTIONS):
        return "liên từ"
    if w in ADVERBS or (w == r and r in ADVERBS):
        return "trạng từ"
    if "っ" in r and r.endswith("り") and len(r) <= 6:
        return "trạng từ"
    if w in NA_DESPITE_I or r in NA_DESPITE_I:
        return "tính từ -na"
    if w.endswith("的") or r.endswith("てき"):
        return "tính từ -na"
    if w in NA_ADJ or r in NA_ADJ:
        return "tính từ -na"
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

    # Two-kanji compounds whose English gloss is adjectival → na-adj
    adj_tokens = set()
    for m in (en or meanings):
        adj_tokens.update(re.findall(r"[a-z']+", m.lower()))
    ADJ_HINT = {
        "important", "serious", "excellent", "abundant", "accurate", "correct",
        "clear", "complete", "perfect", "proper", "appropriate", "major",
        "severe", "unique", "equal", "fair", "active", "passive", "eager",
        "careful", "obvious", "complex", "necessary", "possible", "impossible",
        "safe", "dangerous", "free", "peaceful", "special", "general",
        "happy", "unhappy", "inconvenient", "reasonable", "enough",
        "famous", "quiet", "convenient", "skillful", "clumsy", "healthy",
        "kind", "polite", "simple", "complicated", "same", "various",
        "busy", "fine", "okay", "alright", "useless", "capable",
    }
    if (adj_tokens & ADJ_HINT) and not w.endswith("い") and not r.endswith("しい"):
        if not meaning_is_verb(en or meanings):
            return "tính từ -na"

    if r in ("する", "くる") or w in ("する", "来る"):
        return "động từ nhóm 3"
    if w.endswith("する") or (r.endswith("する") and meaning_is_verb(en or meanings)):
        return "động từ nhóm 3"
    if w in ("ある", "いる", "できる", "なる") or r in ("ある", "いる", "できる", "なる"):
        return verb_group(r)

    is_verb = meaning_is_verb(en or meanings)
    has_kanji = bool(KANJI_RE.search(w))
    last_is_kana = bool(w) and not KANJI_RE.match(w[-1])
    if w[-1:] in U_ROW and has_kanji and last_is_kana:
        return verb_group(r)
    if is_verb and r[-1:] in U_ROW:
        return verb_group(r)

    if r.endswith("しい") or w.endswith("しい"):
        if w not in NOUN_I and r not in NOUN_I:
            return "tính từ -i"
    surface_i = w.endswith("い") or (w == r and r.endswith("い") and len(r) >= 3)
    if surface_i and w not in NOUN_I and r not in NOUN_I and w not in EXPRESSIONS:
        if not (w == r and r.endswith("さい") and r not in ("ちいさい", "おおきい")):
            return "tính từ -i"

    if w.endswith("な") and "adj" in joined:
        return "tính từ -na"
    return "danh từ"


def parse_vocab_pos() -> dict[str, str]:
    out: dict[str, str] = {}
    pat = re.compile(
        r'e\(\s*\d+\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"[^"]+"\s*,\s*"[^"]*"\s*,\s*"[^"]+"\s*,\s*\[([^\]]+)\]',
        re.M,
    )
    for path in (VOCAB_N5, VOCAB_N4):
        text = path.read_text(encoding="utf-8")
        for m in pat.finditer(text):
            w, k, posraw = m.group(1), m.group(2), m.group(3)
            pos = [p.strip().strip('"') for p in posraw.split(",") if p.strip()]
            if pos:
                out[f"{w}::{k}"] = pos[0]
                out[w] = pos[0]
                if w == k:
                    out[k] = pos[0]
    dpat = re.compile(
        r'd\(\s*\d+\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"[^"]+"\s*,\s*\[[^\]]*\]\s*,\s*\[([^\]]+)\]',
        re.M,
    )
    if CORE.exists():
        text = CORE.read_text(encoding="utf-8")
        for m in dpat.finditer(text):
            w, k, posraw = m.group(1), m.group(2), m.group(3)
            pos = [p.strip().strip('"') for p in posraw.split(",") if p.strip()]
            if pos:
                out[f"{w}::{k}"] = pos[0]
    return out


def load_openjlpt() -> dict[str, list[str]]:
    out: dict[str, list[str]] = {}
    if not OPENJLPT.exists():
        return out
    for level in ("N5", "N4", "N3", "N2", "N1"):
        path = OPENJLPT / f"{level.lower()}.json"
        if not path.exists():
            continue
        data = json.loads(path.read_text(encoding="utf-8"))
        for it in data:
            word = (it.get("word") or "").strip()
            if not word:
                continue
            reading = (it.get("reading") or "").strip() or word
            meanings = [str(m).strip() for m in (it.get("meanings") or []) if str(m).strip()]
            out[f"{word}::{reading}"] = meanings
            out.setdefault(word, meanings)
    return out


def fold(s: str) -> str:
    s = s.replace("đ", "d").replace("Đ", "d")
    s = unicodedata.normalize("NFD", s)
    return "".join(c for c in s if unicodedata.category(c) != "Mn").lower()


def looks_english(s: str) -> bool:
    sl = s.lower().strip()
    if not sl:
        return False
    if VI_DIAC.search(s):
        return False
    key = re.sub(r"[?.!]+$", "", sl)
    if key in VI_KEEP or fold(key) in {fold(v) for v in VI_KEEP}:
        return False
    if sl.startswith("to "):
        return True
    if not re.fullmatch(r"[A-Za-z][A-Za-z0-9 '()\-/.,!?]*", s.strip()):
        return False
    tokens = re.findall(r"[a-z']+", sl)
    if not tokens:
        return False
    if len(tokens) >= 2:
        return True
    t = tokens[0]
    if t.endswith(("tion", "sion", "ness", "ment", "ity", "ous", "ive", "ally", "ance", "ence", "able", "ible", "ical")):
        return True
    if len(t) >= 8:
        return True
    return False


PREFIX = {
    "humble": " (khiêm nhường)",
    "honorable": " (tôn kính)",
    "honorific": " (tôn kính)",
    "respectful": " (tôn kính)",
    "polite": " (lịch sự)",
    "informal": " (thân mật)",
    "abbr": "",
}


def en_to_vi(text: str, table: dict[str, str]) -> str:
    raw = text.strip()
    if not raw:
        return raw
    if not looks_english(raw) and VI_DIAC.search(raw):
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

    s = re.sub(r"[?.!]+$", "", raw.lower()).strip()
    s = re.sub(r"^\(\d+\)\s*", "", s)
    s = re.sub(r"\s+", " ", s)
    if s in table:
        return table[s]
    if s in VI_KEEP:
        return raw if VI_DIAC.search(raw) else s

    prefix = ""
    m = re.match(r"^\((honorable|humble|polite|honorific|respectful|informal|abbr)\)\s*", s)
    if m:
        prefix = PREFIX.get(m.group(1), "")
        s = s[m.end() :].strip()
        if s in table:
            return table[s] + prefix

    if s.startswith("to "):
        rest = s[3:]
        if rest in table:
            return table[rest] + prefix
        if ("to " + rest) in table:
            return table["to " + rest] + prefix
        # strip articles after to
        rest2 = re.sub(r"^(be |become |get |make |have |do )", "", rest).strip()
        if rest2 in table:
            return table[rest2] + prefix

    s_art = re.sub(r"^(the |a |an )", "", s).strip()
    if s_art in table:
        return table[s_art] + prefix

    words = s.split()
    for n in range(min(8, len(words)), 1, -1):
        chunk = " ".join(words[:n])
        if chunk in table:
            rest_w = " ".join(words[n:])
            tail = en_to_vi(rest_w, table) if rest_w else ""
            return (table[chunk] + ((" " + tail) if tail and tail != rest_w else "")).strip() + prefix

    mapped = []
    ok = True
    skip = {"a", "an", "the", "of", "or", "and", "for", "in", "on", "at", "to", "e.g."}
    for w in words:
        wl = w.strip(".,()!")
        if wl in skip:
            continue
        if wl in table:
            mapped.append(table[wl])
        elif wl.endswith("ing") and wl[:-3] in table:
            mapped.append(table[wl[:-3]])
        elif wl.endswith("tion") and wl[:-4] in table:
            mapped.append(table[wl[:-4]])
        elif looks_english(wl):
            ok = False
            mapped.append(wl)
        else:
            mapped.append(wl)
    if mapped and (ok or len(mapped) >= 2 and sum(looks_english(x) for x in mapped) == 0):
        return " ".join(mapped) + prefix
    return (table.get(s) or raw) + prefix


def translate_meaning(current: str, en_src: list[str], table: dict[str, str], ja_vi: dict[str, list[str]], word: str, reading: str) -> str:
    if word in ja_vi:
        return " · ".join(ja_vi[word])
    if word == reading and reading in ja_vi:
        return " · ".join(ja_vi[reading])
    # kana JA_VI leaked onto a kanji headword (灰 reading はい → vâng)
    leaked = word != reading and reading in ja_vi and KANJI_RE.search(word)
    if leaked:
        joined = " · ".join(ja_vi[reading])
        if current.strip() == joined or current.strip() in ja_vi[reading]:
            current = ""
    parts = [p.strip() for p in re.split(r"\s*[·]\s*", current) if p.strip()] if current else []
    out: list[str] = []
    seen = set()

    def add(v: str) -> None:
        v = v.strip(" ·")
        if not v:
            return
        k = v.lower()
        if k in seen:
            return
        seen.add(k)
        out.append(v)

    for p in parts:
        if looks_english(p):
            add(en_to_vi(p, table))
        else:
            add(p)
    if not out or all(looks_english(x) for x in out):
        for m in en_src[:4]:
            add(en_to_vi(m, table))
    # drop leftover english if we already have a vietnamese gloss
    vi_out = [x for x in out if not looks_english(x)]
    if vi_out:
        out = vi_out
    return " · ".join(out[:3]) if out else current


def main() -> None:
    extra_map = load_tsv(EXTRA_TSV)
    table = load_tsv(TSV_PATH)
    table.update(WORD_VI)
    table.update(extra_map)
    # also index without "to "
    for k, v in list(table.items()):
        if k.startswith("to ") and k[3:] not in table:
            table[k[3:]] = v

    ns: dict = {}
    builder = (ROOT / "scripts/build-jlpt-dict.py").read_text(encoding="utf-8")
    exec(builder.split("def guess_pos")[0], ns)
    JA_VI: dict[str, list[str]] = ns.get("JA_VI") or {}

    vocab_pos = parse_vocab_pos()
    openjlpt = load_openjlpt()
    rows: list[list[str]] = json.loads(JSON_PATH.read_text(encoding="utf-8"))

    pos_changed = 0
    gloss_changed = 0
    pos_ctr: Counter[str] = Counter()
    still_en = 0

    for r in rows:
        word, kana, romaji, meaning, pos, level, jp, kana_ex, rom_ex, vi_ex = r
        en = openjlpt.get(f"{word}::{kana}") or openjlpt.get(word) or []
        key = f"{word}::{kana}"
        new_pos = vocab_pos.get(key) or vocab_pos.get(word) or vocab_pos.get(kana)
        if not new_pos:
            new_pos = guess_pos(word, kana, [meaning], en)
        if new_pos != pos:
            pos_changed += 1
            r[4] = new_pos
            # keep tag-like 5th field in sync if examples used pos; tags live in TS wrapper
        pos_ctr[r[4]] += 1

        new_mean = translate_meaning(meaning, en, table, JA_VI, word, kana)
        if new_mean != meaning:
            gloss_changed += 1
            r[3] = new_mean
        if any(looks_english(p) for p in re.split(r"\s*[·|/]\s*", r[3])):
            still_en += 1

        if looks_english(vi_ex):
            r[9] = en_to_vi(vi_ex, table)

    JSON_PATH.write_text(json.dumps(rows, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"rows {len(rows)}")
    print(f"pos changed {pos_changed} -> {pos_ctr.most_common()}")
    print(f"gloss changed {gloss_changed}; still-english entries {still_en}")
    print(f"wrote {JSON_PATH} ({JSON_PATH.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
