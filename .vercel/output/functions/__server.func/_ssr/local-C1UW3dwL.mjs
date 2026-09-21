import { a as stripKanaLength, i as romajiVariants, r as normalizeRomaji, t as hasJapanese } from "./romaji-BCVeKQ98.mjs";
import { n as allVocabExamples } from "./examples-Bn2JLbDz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/local-C1UW3dwL.js
/** Search aliases for polite / conjugated forms so 食べます still hits 食べる. */
var GODAN_I = {
	う: "い",
	く: "き",
	ぐ: "ぎ",
	す: "し",
	つ: "ち",
	ぬ: "に",
	ぶ: "び",
	む: "み",
	る: "り"
};
var GODAN_A = {
	う: "わ",
	く: "か",
	ぐ: "が",
	す: "さ",
	つ: "た",
	ぬ: "な",
	ぶ: "ば",
	む: "ま",
	る: "ら"
};
var GODAN_TE = {
	う: "って",
	つ: "って",
	る: "って",
	む: "んで",
	ぶ: "んで",
	ぬ: "んで",
	く: "いて",
	ぐ: "いで",
	す: "して"
};
function lastKana(s) {
	return s.slice(-1);
}
function stem(s) {
	return s.slice(0, -1);
}
function addForms(out, base, iStem, aStem, te) {
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
function verbAliases(kanji, kana, pos) {
	const out = /* @__PURE__ */ new Set();
	if (!pos.some((p) => p.includes("động từ"))) return [];
	const group3 = pos.some((p) => p.includes("nhóm 3")) || kanji === "する" || kanji === "来る";
	const group2 = pos.some((p) => p.includes("nhóm 2")) || !group3 && kanji.endsWith("る") && /[いきぎじぢちびぴえけげせぜてでねべぺ]$/.test(stem(kana));
	const pairs = [[kanji, kana], [kana, kana]];
	for (const [head, reading] of pairs) {
		if (!head || !reading) continue;
		if (group3) {
			if (head === "する" || reading === "する") addForms(out, "する", "し", "し", "して");
			else if (head === "来る" || reading === "くる") {
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
var POLITE_TAIL = [
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
	"ない"
];
/** Peel polite / tense endings off a typed query. */
function queryStems(raw) {
	const q = raw.trim();
	const out = /* @__PURE__ */ new Set([q]);
	for (const tail of POLITE_TAIL) if (q.endsWith(tail) && q.length > tail.length) out.add(q.slice(0, -tail.length));
	return [...out];
}
/** Labeled polite / te / nai forms for the vocab "cách dùng" panel. */
function verbUsageForms(kanji, kana, pos) {
	if (!pos.some((p) => p.includes("động từ"))) return [];
	const group3 = pos.some((p) => p.includes("nhóm 3")) || kanji === "する" || kanji === "来る";
	const group2 = pos.some((p) => p.includes("nhóm 2")) || !group3 && kanji.endsWith("る") && /[いきぎじぢちびぴえけげせぜてでねべぺ]$/.test(stem(kana));
	let masu = "";
	let te = "";
	let nai = "";
	let ta = "";
	if (group3) {
		if (kana === "する" || kanji === "する") {
			masu = "します";
			te = "して";
			nai = "しない";
			ta = "した";
		} else if (kana === "くる" || kanji === "来る") {
			masu = "きます";
			te = "きて";
			nai = "こない";
			ta = "きた";
		} else if (kana.endsWith("する")) {
			const pre = kana.slice(0, -2);
			masu = `${pre}します`;
			te = `${pre}して`;
			nai = `${pre}しない`;
			ta = `${pre}した`;
		}
	} else if (group2 && kana.endsWith("る")) {
		const s = stem(kana);
		masu = `${s}ます`;
		te = `${s}て`;
		nai = `${s}ない`;
		ta = `${s}た`;
	} else {
		const end = lastKana(kana);
		const i = GODAN_I[end];
		const a = GODAN_A[end];
		let teTail = GODAN_TE[end];
		if ((kanji === "行く" || kana === "いく") && end === "く") teTail = "って";
		if (i && a && teTail) {
			const s = stem(kana);
			masu = `${s}${i}ます`;
			te = `${s}${teTail}`;
			nai = `${s}${a}ない`;
			ta = te.replace(/て$/, "た").replace(/で$/, "だ");
		}
	}
	if (!masu) return [];
	return [
		{
			label: "Từ điển",
			kana,
			note: "dạng gốc, tra từ điển"
		},
		{
			label: "ます",
			kana: masu,
			note: "lịch sự, hiện tại / tương lai"
		},
		{
			label: "て",
			kana: te,
			note: "nối câu, nhờ vả, đang làm"
		},
		{
			label: "た",
			kana: ta,
			note: "quá khứ ngắn"
		},
		{
			label: "ない",
			kana: nai,
			note: "phủ định ngắn"
		}
	];
}
function levenshtein(a, b) {
	if (a === b) return 0;
	if (!a.length) return b.length;
	if (!b.length) return a.length;
	const row = Array.from({ length: b.length + 1 }, (_, i) => i);
	for (let i = 1; i <= a.length; i++) {
		let prev = i - 1;
		row[0] = i;
		for (let j = 1; j <= b.length; j++) {
			const tmp = row[j];
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
			prev = tmp;
		}
	}
	return row[b.length];
}
function fuzzyScore(query, target) {
	if (!query) return 0;
	if (target === query) return 1;
	if (target.startsWith(query)) return .92;
	if (target.includes(query)) return .75;
	const sim = 1 - levenshtein(query, target) / Math.max(query.length, target.length);
	return sim > .55 ? sim * .7 : 0;
}
/** Fold Vietnamese diacritics and whitespace so "truong hoc" hits "trường học". */
function foldVi(input) {
	return input.trim().toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/g, "d").replace(/Đ/g, "d").replace(/[\s'\-./·,;:()]+/g, " ").trim();
}
function foldCompact(input) {
	return foldVi(input).replace(/\s+/g, "");
}
/** Drop sokuon / chōon so がっこう ≈ がこう for typo-tolerant kana search. */
function foldKana(input) {
	return input.replace(/ー/g, "").replace(/っ|ッ/g, "");
}
function uniqueStrings(list) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const item of list) {
		const key = item.trim();
		if (!key || seen.has(key)) continue;
		seen.add(key);
		out.push(key);
	}
	return out;
}
var GENERIC_POS = /* @__PURE__ */ new Set(["danh từ"]);
var JLPT_RANK = {
	N5: 0,
	N4: 1,
	N3: 2,
	N2: 3,
	N1: 4
};
/** Keep specific POS (adj/verb/…) and drop a leftover default “danh từ”. */
function preferPos(tags) {
	const uniq = uniqueStrings(tags);
	const specific = uniq.filter((p) => !GENERIC_POS.has(p));
	return specific.length ? specific : uniq.length ? uniq : ["danh từ"];
}
/** Vocab POS wins over a guessed JLPT tag so nouns are not reclassified as adj/verb. */
function mergePos(primary, extra) {
	const a = preferPos(primary);
	if (a.some((p) => !GENERIC_POS.has(p))) return a;
	return preferPos([...primary, ...extra]);
}
function easiestJlpt(levels) {
	const uniq = uniqueStrings(levels);
	uniq.sort((x, y) => (JLPT_RANK[x] ?? 9) - (JLPT_RANK[y] ?? 9));
	return uniq.length ? [uniq[0]] : ["N5"];
}
function looksEnglishGloss(s) {
	const t = s.trim();
	if (!t) return false;
	if (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(t)) return false;
	if (/^(to |the |a |an |\(\d+\)|\(abbr\)|\(n\)|\(v\)|\(adj\))/i.test(t)) return true;
	if (/\b(the|and|with|from|that|this|used|into|about|which|abbr|lit:|sing)\b/i.test(t)) return true;
	if (/^[A-Za-z][A-Za-z0-9 '()\-/.,]*$/.test(t) && t.split(/\s+/).length >= 2) return true;
	return false;
}
function preferVietnameseMeanings(list) {
	const uniq = uniqueStrings(list);
	const vi = uniq.filter((s) => !looksEnglishGloss(s));
	return vi.length ? vi : uniq;
}
function vocabToDict(v) {
	const aliases = uniqueStrings([...v.meanings ?? [], ...verbAliases(v.word, v.kana, v.part_of_speech)]);
	return {
		id: v.id,
		kanji: v.word,
		kana: v.kana,
		romaji: v.romaji,
		meanings: v.meanings ?? [v.meaning_vi],
		part_of_speech: preferPos(v.part_of_speech),
		jlpt: [v.level],
		common: v.common ?? v.difficulty <= 2,
		frequency: v.difficulty,
		pitch_accent: null,
		examples: allVocabExamples(v),
		tags: v.tags,
		vocabId: v.id,
		kanjiChars: [...v.word].filter((c) => /[\u4e00-\u9fff]/.test(c)),
		aliases
	};
}
function headKey(e) {
	return `${e.kanji}::${e.kana}`;
}
function mergeEntries(a, b) {
	const examples = [...a.examples];
	for (const ex of b.examples) if (!examples.some((x) => x.jp === ex.jp)) examples.push(ex);
	return {
		...a,
		meanings: preferVietnameseMeanings([...a.meanings, ...b.meanings]),
		part_of_speech: mergePos(a.part_of_speech, b.part_of_speech),
		jlpt: easiestJlpt([...a.jlpt, ...b.jlpt]),
		tags: uniqueStrings([...a.tags ?? [], ...b.tags ?? []].filter((t) => !/^N[1-5]$/.test(t))),
		related: uniqueStrings([...a.related ?? [], ...b.related ?? []]),
		kanjiChars: uniqueStrings([...a.kanjiChars ?? [], ...b.kanjiChars ?? []]),
		aliases: uniqueStrings([...a.aliases ?? [], ...b.aliases ?? []]),
		examples,
		common: a.common || b.common,
		frequency: Math.min(a.frequency, b.frequency),
		pitch_accent: a.pitch_accent ?? b.pitch_accent,
		romaji: a.romaji || b.romaji,
		kana: /[\u3040-\u30ff]/.test(a.kana) ? a.kana : b.kana || a.kana
	};
}
function withSearchAliases(entry) {
	const extra = verbAliases(entry.kanji, entry.kana, entry.part_of_speech);
	if (entry.kana === "なに" || entry.kanji === "何") extra.push("nan", "なん");
	if (entry.kana === "は" && entry.romaji === "wa") extra.push("ha");
	if (entry.kana === "を" && (entry.romaji === "o" || entry.romaji === "wo")) extra.push("wo");
	if (entry.kana === "へ" && entry.romaji === "e") extra.push("he");
	if (!extra.length && !entry.aliases?.length) return entry;
	return {
		...entry,
		aliases: uniqueStrings([...entry.aliases ?? [], ...extra])
	};
}
function buildDictionary(vocab, _kanji, extra = []) {
	const byId = /* @__PURE__ */ new Map();
	const byHead = /* @__PURE__ */ new Map();
	const add = (entry) => {
		const next = withSearchAliases({
			...entry,
			part_of_speech: preferPos(entry.part_of_speech)
		});
		const head = headKey(next);
		const existingId = byHead.get(head);
		if (existingId) {
			const current = byId.get(existingId);
			if (current) {
				byId.set(existingId, mergeEntries(current, {
					...next,
					id: existingId
				}));
				return;
			}
		}
		if (byId.has(next.id)) {
			byId.set(next.id, mergeEntries(byId.get(next.id), next));
			byHead.set(head, next.id);
			return;
		}
		byId.set(next.id, next);
		byHead.set(head, next.id);
	};
	for (const v of vocab) add(vocabToDict(v));
	for (const e of extra) add(e);
	return [...byId.values()];
}
function posMatch(entryPos, filters) {
	return entryPos.some((p) => filters.some((f) => {
		if (f === "động từ") return p === "động từ" || p.startsWith("động từ ");
		if (f === "tính từ") return p.startsWith("tính từ");
		if (f === "danh từ") return p === "danh từ" || p.startsWith("danh từ ");
		return p === f || p.startsWith(`${f} `);
	}));
}
function matchesFilters(e, query) {
	if (query.jlpt && query.jlpt.length && !e.jlpt.some((l) => query.jlpt.includes(l))) return false;
	if (query.pos && query.pos.length && !posMatch(e.part_of_speech, query.pos)) return false;
	return true;
}
function filterDictionary(dict, query) {
	const filtered = dict.filter((e) => matchesFilters(e, query));
	filtered.sort((a, b) => Number(b.common) - Number(a.common) || a.frequency - b.frequency || a.kana.localeCompare(b.kana, "ja"));
	return filtered.slice(0, query.limit ?? 2e4);
}
function scoreEntry(e, raw) {
	const q = raw.toLowerCase();
	const qNorm = normalizeRomaji(q);
	const qFold = foldVi(q);
	const qCompact = foldCompact(q);
	const qKana = foldKana(raw);
	const variants = romajiVariants(q);
	const stems = queryStems(raw);
	const jp = hasJapanese(raw);
	let score = 0;
	const fields = [
		e.kanji,
		e.kana,
		foldKana(e.kana),
		e.romaji.toLowerCase(),
		normalizeRomaji(e.romaji),
		...e.meanings.map((m) => m.toLowerCase()),
		...e.meanings.map((m) => foldVi(m)),
		...e.meanings.map((m) => foldCompact(m)),
		...e.tags,
		...e.aliases ?? []
	];
	for (const f of fields) {
		if (!f) continue;
		if (f === raw || f === q || f === qFold || f === qKana) score = Math.max(score, 1);
		else if (f.startsWith(q) || f.startsWith(raw) || f.startsWith(qFold) || f.startsWith(qKana)) score = Math.max(score, raw.length === 1 ? .7 : .94);
		else if (f.includes(q) || f.includes(raw) || qFold.length >= 3 && f.includes(qFold)) score = Math.max(score, .8);
	}
	for (const stem of stems) {
		if (stem === e.kanji || stem === e.kana) score = Math.max(score, .99);
		if (e.kanji.startsWith(stem) && stem.length >= 2) score = Math.max(score, .93);
		if (e.kana.startsWith(stem) && stem.length >= 2) score = Math.max(score, .93);
		for (const a of e.aliases ?? []) if (a === stem || a.startsWith(stem)) score = Math.max(score, .96);
	}
	const nRomaji = normalizeRomaji(e.romaji);
	for (const v of variants) {
		score = Math.max(score, fuzzyScore(v, nRomaji));
		if (nRomaji.startsWith(v) && v.length >= 2) score = Math.max(score, v.length >= 3 ? .88 : .7);
		if (e.kana.startsWith(raw) || e.kanji.startsWith(raw)) score = Math.max(score, .96);
	}
	if (!jp) for (const m of e.meanings) {
		const mf = foldVi(m);
		const tokens = mf.split(" ").filter(Boolean);
		if (mf === qFold || foldCompact(m) === qCompact) score = Math.max(score, 1);
		else if (tokens.includes(qFold) || tokens.includes(qCompact)) score = Math.max(score, .97);
		else if (mf.startsWith(qFold) && qFold.length >= 2) score = Math.max(score, .9);
		else if (qFold.length >= 3 && mf.includes(qFold)) score = Math.max(score, .84);
		else if (qFold.length >= 3) score = Math.max(score, fuzzyScore(qFold, mf) * .95);
	}
	score = Math.max(score, fuzzyScore(qNorm, nRomaji));
	if (qNorm.length >= 3 && nRomaji.startsWith(qNorm)) score = Math.max(score, .9);
	if (qKana.length >= 2 && stripKanaLength(e.kana).startsWith(qKana)) score = Math.max(score, .9);
	if (raw.length === 1 && jp) {
		if (e.kanji !== raw && e.kana !== raw) score *= .55;
	}
	return score;
}
function searchLocal(dict, query) {
	const raw = query.q.trim();
	if (!raw) return filterDictionary(dict, query);
	return dict.filter((e) => matchesFilters(e, query)).map((e) => ({
		e,
		score: scoreEntry(e, raw)
	})).filter((x) => x.score >= .42).sort((a, b) => b.score - a.score || Number(b.e.common) - Number(a.e.common) || a.e.frequency - b.e.frequency).slice(0, query.limit ?? 200).map((x) => x.e);
}
//#endregion
export { verbUsageForms as i, foldVi as n, searchLocal as r, buildDictionary as t };
