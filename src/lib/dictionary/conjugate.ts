/** Search aliases for polite / conjugated forms so 食べます still hits 食べる. */

const GODAN_I: Record<string, string> = {
  う: "い",
  く: "き",
  ぐ: "ぎ",
  す: "し",
  つ: "ち",
  ぬ: "に",
  ぶ: "び",
  む: "み",
  る: "り",
};

const GODAN_A: Record<string, string> = {
  う: "わ",
  く: "か",
  ぐ: "が",
  す: "さ",
  つ: "た",
  ぬ: "な",
  ぶ: "ば",
  む: "ま",
  る: "ら",
};

const GODAN_TE: Record<string, string> = {
  う: "って",
  つ: "って",
  る: "って",
  む: "んで",
  ぶ: "んで",
  ぬ: "んで",
  く: "いて",
  ぐ: "いで",
  す: "して",
};

function lastKana(s: string) {
  return s.slice(-1);
}

function stem(s: string) {
  return s.slice(0, -1);
}

function addForms(out: Set<string>, base: string, iStem: string, aStem: string, te: string) {
  if (!base) return;
  out.add(base);
  out.add(`${iStem}ます`);
  out.add(`${iStem}ました`);
  out.add(`${iStem}ません`);
  out.add(`${iStem}たい`);
  out.add(`${aStem}ない`);
  out.add(te);
  out.add(te.replace(/て$/, "た").replace(/で$/, "だ"));
}

export function verbAliases(kanji: string, kana: string, pos: string[]): string[] {
  const out = new Set<string>();
  const isVerb = pos.some((p) => p.includes("động từ"));
  if (!isVerb) return [];

  const group3 = pos.some((p) => p.includes("nhóm 3")) || kanji === "する" || kanji === "来る";
  const group2 =
    pos.some((p) => p.includes("nhóm 2")) ||
    (!group3 && (kanji.endsWith("る") && /[いきぎじぢちびぴえけげせぜてでねべぺ]$/.test(stem(kana))));

  const pairs: Array<[string, string]> = [
    [kanji, kana],
    [kana, kana],
  ];

  for (const [head, reading] of pairs) {
    if (!head || !reading) continue;
    if (group3) {
      if (head === "する" || reading === "する") {
        addForms(out, "する", "し", "し", "して");
      } else if (head === "来る" || reading === "くる") {
        addForms(out, "来る", "来", "来", "来て");
        addForms(out, "くる", "き", "こ", "きて");
        out.add("きます");
        out.add("きました");
        out.add("こない");
      } else if (head.endsWith("する")) {
        const pre = head.slice(0, -2);
        addForms(out, head, `${pre}し`, `${pre}し`, `${pre}して`);
      }
      continue;
    }

    if (group2 && (reading.endsWith("る") || head.endsWith("る"))) {
      const iKanji = stem(head);
      const iKana = stem(reading);
      addForms(out, head, iKanji, iKanji, `${iKanji}て`);
      addForms(out, reading, iKana, iKana, `${iKana}て`);
      continue;
    }

    const end = lastKana(reading);
    const i = GODAN_I[end];
    const a = GODAN_A[end];
    let teTail = GODAN_TE[end];
    if ((head === "行く" || reading === "いく") && end === "く") teTail = "って";
    if (!i || !a || !teTail) continue;
    const hStem = stem(head);
    const rStem = stem(reading);
    addForms(out, head, hStem + i, hStem + a, hStem + teTail);
    addForms(out, reading, rStem + i, rStem + a, rStem + teTail);
  }

  out.delete(kanji);
  out.delete(kana);
  return [...out].filter(Boolean);
}

const POLITE_TAIL = [
  "ませんでした",
  "ました",
  "ません",
  "ます",
  "でした",
  "です",
  "でしたか",
  "ですか",
  "たいです",
  "たい",
  "てください",
  "ている",
  "ています",
  "てる",
  "ないで",
  "ない",
];

/** Peel polite / tense endings off a typed query. */
export function queryStems(raw: string): string[] {
  const q = raw.trim();
  const out = new Set<string>([q]);
  for (const tail of POLITE_TAIL) {
    if (q.endsWith(tail) && q.length > tail.length) {
      out.add(q.slice(0, -tail.length));
    }
  }
  return [...out];
}
