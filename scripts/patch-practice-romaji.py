#!/usr/bin/env python3
"""Add romaji to listening options and reading question options."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path("/workspace")

LISTEN_RO = {
    "三時です。": "Sanji desu.",
    "電車です。": "Densha desu.",
    "水をください。": "Mizu o kudasai.",
    "はい、学生です。": "Hai, gakusei desu.",
    "駅はどこですか。": "Eki wa doko desu ka.",
    "ええ、ありがとう。": "Ee, arigatou.",
    "明日は試験です。": "Ashita wa shiken desu.",
    "これは本です。": "Kore wa hon desu.",
    "赤いです。": "Akai desu.",
    "五つです。": "Itsutsu desu.",
    "百円です。": "Hyakuen desu.",
    "図書館です。": "Toshokan desu.",
    "自転車で行きます。": "Jitensha de ikimasu.",
    "魚を食べます。": "Sakana o tabemasu.",
    "静かな部屋です。": "Shizuka na heya desu.",
    "黒い猫です。": "Kuroi neko desu.",
    "私は学生です。": "Watashi wa gakusei desu.",
    "雨です。傘を持って行きます。": "Ame desu. Kasa o motte ikimasu.",
    "机の上にあります。": "Tsukue no ue ni arimasu.",
    "八時に寝ます。": "Hachiji ni nemasu.",
    "階段の隣です。": "Kaidan no tonari desu.",
    "日本語が好きです。": "Nihongo ga suki desu.",
    "三千円です。": "Sanzen-en desu.",
    "ゆっくり話してください。": "Yukkuri hanashite kudasai.",
    "写真を撮りましょう。": "Shashin o torimashou.",
    "はい、必ず連絡してください。": "Hai, kanarazu renraku shite kudasai.",
    "この本は面白いです。": "Kono hon wa omoshiroi desu.",
    "冷房を消してください。": "Reibou o keshite kudasai.",
    "ええ、お願いしたほうが安心です。": "Ee, onegai shita hou ga anshin desu.",
    "窓が開いています。": "Mado ga aite imasu.",
    "私は肉が好きです。": "Watashi wa niku ga suki desu.",
    "七時に起きました。": "Shichiji ni okimashita.",
    "自分で昨日作りました。": "Jibun de kinou tsukurimashita.",
    "本当ですか。今度行ってみましょう。": "Hontou desu ka. Kondo itte mimashou.",
    "足が痛いです。": "Ashi ga itai desu.",
    "辞書を貸してください。": "Jisho o kashite kudasai.",
    "先生に相談したらどうですか。": "Sensei ni soudan shitara dou desu ka.",
    "これは百円です。": "Kore wa hyakuen desu.",
    "電車に乗ってください。": "Densha ni notte kudasai.",
    "空が青いです。": "Sora ga aoi desu.",
    "「ひ」と読みます。": "Hi to yomimasu.",
    "電車を降ります。": "Densha o orimasu.",
    "今日は雨です。": "Kyou wa ame desu.",
    "かしこまりました。": "Kashikomarimashita.",
    "駅はあっちです。": "Eki wa acchi desu.",
    "試験は難しいです。": "Shiken wa muzukashii desu.",
    "本を返してください。": "Hon o kaeshite kudasai.",
    "銀行の隣です。": "Ginkou no tonari desu.",
    "お茶が好きです。": "Ocha ga suki desu.",
    "九時に起きます。": "Kuji ni okimasu.",
    "これは猫です。": "Kore wa neko desu.",
    "ええ、大丈夫ですよ。": "Ee, daijoubu desu yo.",
    "富士山は高いです。": "Fujisan wa takai desu.",
    "写真を撮りました。": "Shashin o torimashita.",
    "魚を食べません。": "Sakana o tabemasen.",
    "「に」と読みます。": "Ni to yomimasu.",
    "「つき」と読みます。": "Tsuki to yomimasu.",
    "「みず」と読みます。": "Mizu to yomimasu.",
    "「やま」と読みます。": "Yama to yomimasu.",
    "はい、どうぞ。": "Hai, douzo.",
    "月曜日です。": "Getsuyoubi desu.",
    "高いです。": "Takai desu.",
    "川です。": "Kawa desu.",
    "富士山です。": "Fujisan desu.",
    "海です。": "Umi desu.",
    "森です。": "Mori desu.",
    "入口に五人います。": "Iriguchi ni gonin imasu.",
    "犬が五匹います。": "Inu ga gohiki imasu.",
    "本が五冊あります。": "Hon ga gosatsu arimasu.",
    "車が五台あります。": "Kuruma ga godai arimasu.",
    "三時に始まります。": "Sanji ni hajimarimasu.",
    "駅で待ちます。": "Eki de machimasu.",
    "写真を撮ります。": "Shashin o torimasu.",
    "電車で行きます。": "Densha de ikimasu.",
    "明日は雨です。": "Ashita wa ame desu.",
    "これは机です。": "Kore wa tsukue desu.",
}

READ_RO = {
    "六時": "rokuji",
    "七時": "shichiji",
    "八時": "hachiji",
    "九時": "kuji",
    "英語": "eigo",
    "数学": "suugaku",
    "日本語": "nihongo",
    "歴史": "rekishi",
    "パン": "pan",
    "赤いりんご": "akai ringo",
    "牛乳": "gyuunyuu",
    "魚": "sakana",
    "はい、高いです": "Hai, takai desu",
    "いいえ、安いです": "Iie, yasui desu",
    "分かりません": "wakarimasen",
    "五つです": "itsutsu desu",
    "赤い傘": "akai kasa",
    "黄色い傘": "kiiroi kasa",
    "黒い鞄": "kuroi kaban",
    "白い花": "shiroi hana",
    "父": "chichi",
    "先生": "sensei",
    "母": "haha",
    "友達": "tomodachi",
    "会議があったから": "kaigi ga atta kara",
    "雪でバスが遅れたから": "yuki de basu ga okureta kara",
    "資料がなかったから": "shiryou ga nakatta kara",
    "会社が休みだったから": "kaisha ga yasumi datta kara",
    "今朝": "kesa",
    "会議の後": "kaigi no ato",
    "昨夜": "sakuya",
    "来週": "raishuu",
    "昨日": "kinou",
    "今夜": "konya",
    "来年": "rainen",
    "旅行した": "ryokou shita",
    "先生に相談した": "sensei ni soudan shita",
    "会社を休んだ": "kaisha o yasunda",
    "切符を買った": "kippu o katta",
    "自分が昨日見た": "jibun ga kinou mita",
    "聞いた話（そうだ）": "kiita hanashi (sou da)",
    "天気予報だけ": "tenki yohou dake",
    "手紙": "tegami",
    "家にいる": "ie ni iru",
    "駅前まで行く": "ekimae made iku",
    "飛行機で帰る": "hikouki de kaeru",
    "会議に出る": "kaigi ni deru",
    "本を読む": "hon o yomu",
    "ボールで遊ぶ": "booru de asobu",
    "電車に乗る": "densha ni noru",
    "試験を受ける": "shiken o ukeru",
    "駅員": "ekiin",
    "働いている": "hataraite iru",
    "日本語を勉強している": "nihongo o benkyou shite iru",
    "料理している": "ryouri shite iru",
    "寝ている": "nete iru",
    "来月": "raigetsu",
    "旅行したいから": "ryokou shitai kara",
    "N3に合格しなければならないから": "N3 ni goukaku shinakereba naranai kara",
    "映画を見るから": "eiga o miru kara",
    "犬を買うから": "inu o kau kara",
    "やめる": "yameru",
    "もう一度受けてみる": "mou ichido ukete miru",
    "国へ帰るだけ": "kuni e kaeru dake",
    "先生になる": "sensei ni naru",
    "本": "hon",
    "新しい携帯電話": "atarashii keitai denwa",
    "傘": "kasa",
    "時計": "tokei",
    "ゲームをします": "geemu o shimasu",
    "ゲームをしません": "geemu o shimasen",
    "学校へ行きます": "gakkou e ikimasu",
    "魚を食べます": "sakana o tabemasu",
    "一匹": "ippiki",
    "二匹": "nihiki",
    "三匹": "sanbiki",
    "十匹": "juppiki",
    "映画": "eiga",
    "写真": "shashin",
    "地図": "chizu",
    "鍵": "kagi",
    "宿題": "shukudai",
    "切符": "kippu",
    "旅行します": "ryokou shimasu",
    "早めに帰るようにします": "hayame ni kaeru you ni shimasu",
    "犬を買います": "inu o kaimasu",
    "映画を見ます": "eiga o mimasu",
    "頭が痛いから": "atama ga itai kara",
    "暇だから": "hima da kara",
    "友達が待つから": "tomodachi ga matsu kara",
    "写真を撮るから": "shashin o toru kara",
    "寝ます": "nemasu",
    "試験を受けてみます": "shiken o ukete mimasu",
    "泳ぎます": "oyogimasu",
    "料理します": "ryouri shimasu",
}


def patch_listening(text: str) -> str:
    text = text.replace(
        "options: { jp: string; vi: string }[];",
        "options: { jp: string; romaji: string; vi: string }[];",
    )
    missing = []

    def repl(m: re.Match[str]) -> str:
        jp, vi = m.group(1), m.group(2)
        ro = LISTEN_RO.get(jp)
        if not ro:
            missing.append(jp)
            return m.group(0)
        return f'{{ jp: "{jp}", romaji: "{ro}", vi: "{vi}" }}'

    out = re.sub(r'\{ jp: "([^"]+)", vi: "([^"]*)" \}', repl, text)
    if missing:
        raise SystemExit("listening missing romaji:\n" + "\n".join(sorted(set(missing))))
    return out


def patch_readings(text: str) -> str:
    text = text.replace(
        "questions: { q: string; options: string[]; answer: number; explain: string }[];",
        "questions: { q: string; options: { jp: string; romaji: string }[]; answer: number; explain: string }[];",
    )
    missing = []

    def repl(m: re.Match[str]) -> str:
        inner = m.group(1)
        items = re.findall(r'"([^"]*)"', inner)
        parts = []
        for it in items:
            ro = READ_RO.get(it)
            if not ro:
                missing.append(it)
                ro = it
            parts.append(f'{{ jp: "{it}", romaji: "{ro}" }}')
        return "options: [" + ", ".join(parts) + "]"

    out = re.sub(r"options: \[([^\]]+)\]", repl, text)
    if missing:
        raise SystemExit("readings missing romaji:\n" + "\n".join(sorted(set(missing))))
    return out


def main() -> None:
    lp = ROOT / "src/data/listening.ts"
    rp = ROOT / "src/data/readings.ts"
    lp.write_text(patch_listening(lp.read_text()), encoding="utf-8")
    rp.write_text(patch_readings(rp.read_text()), encoding="utf-8")
    print("patched listening + readings")


if __name__ == "__main__":
    main()
