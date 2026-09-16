import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { n as ALLOWED_POS, t as ALLOWED_JLPT } from "./import-CvWp5blA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-lookup-Ba88V0jW.js
function slug(kanji, kana) {
	return `ai-${`${kanji || kana || "entry"}`.toLowerCase().replace(/\s+/g, "-")}`.slice(0, 80);
}
function asEntry(raw) {
	const kanji = typeof raw.kanji === "string" ? raw.kanji.trim() : "";
	const kana = typeof raw.kana === "string" ? raw.kana.trim() : "";
	const romaji = typeof raw.romaji === "string" ? raw.romaji.trim() : "";
	const meanings = Array.isArray(raw.meanings) ? raw.meanings.map((m) => String(m).trim()).filter(Boolean) : [];
	if (!kana || meanings.length === 0) return null;
	const pos = (Array.isArray(raw.part_of_speech) ? raw.part_of_speech.map((p) => String(p)) : ["danh từ"]).filter((p) => ALLOWED_POS.includes(p));
	const jlpt = (Array.isArray(raw.jlpt) ? raw.jlpt.map((l) => String(l)) : ["N5"]).filter((l) => ALLOWED_JLPT.includes(l));
	const examples = (Array.isArray(raw.examples) ? raw.examples : []).map((ex) => {
		if (!ex || typeof ex !== "object") return null;
		const o = ex;
		const jp = String(o.jp ?? "").trim();
		const vi = String(o.vi ?? "").trim();
		if (!jp || !vi) return null;
		return {
			jp,
			kana: String(o.kana ?? "").trim() || void 0,
			romaji: String(o.romaji ?? "").trim(),
			vi
		};
	}).filter((x) => Boolean(x)).slice(0, 2);
	return {
		id: slug(kanji || kana, kana),
		kanji: kanji || kana,
		kana,
		romaji,
		meanings,
		part_of_speech: pos.length ? pos : ["danh từ"],
		jlpt: jlpt.length ? jlpt : ["N5"],
		common: Boolean(raw.common),
		frequency: 4,
		pitch_accent: null,
		examples,
		tags: Array.isArray(raw.tags) ? raw.tags.map((t) => String(t)).filter(Boolean).slice(0, 6) : ["ai"],
		related: Array.isArray(raw.related) ? raw.related.map((t) => String(t)).filter(Boolean).slice(0, 6) : [],
		aliases: Array.isArray(raw.aliases) ? raw.aliases.map((t) => String(t)).filter(Boolean).slice(0, 12) : []
	};
}
function extractJson(text) {
	const trimmed = text.trim();
	const start = trimmed.indexOf("{");
	const end = trimmed.lastIndexOf("}");
	if (start < 0 || end <= start) return null;
	try {
		return JSON.parse(trimmed.slice(start, end + 1));
	} catch {
		return null;
	}
}
var lookupDictionaryAi_createServerFn_handler = createServerRpc({
	id: "8479a0af739791056e0d783c49b096045786f141be5a4ec432c7769139efa764",
	name: "lookupDictionaryAi",
	filename: "src/lib/dictionary/ai-lookup.ts"
}, (opts) => lookupDictionaryAi.__executeServer(opts));
var lookupDictionaryAi = createServerFn({ method: "POST" }).validator((input) => ({ q: String(input?.q ?? "").trim().slice(0, 80) })).handler(lookupDictionaryAi_createServerFn_handler, async ({ data }) => {
	const q = data.q;
	if (!q) return {
		ok: false,
		error: "Nhập từ cần tra."
	};
	const apiKey = process.env.XAI_API_KEY?.trim();
	if (!apiKey) return {
		ok: false,
		error: "Tra cứu AI chưa khả dụng trong môi trường này."
	};
	const prompt = `Bạn là từ điển Nhật–Việt cho người học JLPT N5–N4.
Cho truy vấn (kanji, kana, romaji, hoặc tiếng Việt), trả về ĐÚNG MỘT JSON, không markdown, không lời dẫn:

{"kanji":"","kana":"","romaji":"","meanings":[""],"part_of_speech":["danh từ"],"jlpt":["N5"],"common":true,"examples":[{"jp":"","kana":"","romaji":"","vi":""}],"tags":[],"related":[],"aliases":[]}

Quy tắc:
- Nghĩa và câu ví dụ bằng tiếng Việt do bạn soạn, ngắn, tự nhiên. Không sao chép giáo trình.
- romaji Hepburn: ou/uu, sokuon kk/tt.
- part_of_speech chỉ lấy: danh từ, động từ nhóm 1, động từ nhóm 2, động từ nhóm 3, tính từ -i, tính từ -na, trạng từ, trợ từ, liên từ, đại từ, số từ, từ nghi vấn, biểu hiện, thán từ, định từ.
- jlpt: N5 hoặc N4 (N3 nếu thật sự trên N4).
- aliases: dạng ます/て/ない nếu là động từ, cách đọc khác (なん/なに).
- Nếu truy vấn là tiếng Việt, trả về từ tiếng Nhật tương ứng.
- Nếu không phải từ tiếng Nhật hợp lệ: {"error":"not found"}.
Truy vấn: ${q}`;
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: .2,
				max_tokens: 700,
				messages: [{
					role: "user",
					content: prompt
				}]
			})
		});
		if (!res.ok) return {
			ok: false,
			error: "Không gọi được dịch vụ tra cứu."
		};
		const json = extractJson((await res.json()).choices?.[0]?.message?.content ?? "");
		if (!json) return {
			ok: false,
			error: "Không đọc được kết quả tra cứu."
		};
		if (typeof json.error === "string") return {
			ok: false,
			error: "Không tìm thấy từ này."
		};
		const entry = asEntry(json);
		if (!entry) return {
			ok: false,
			error: "Kết quả thiếu kana hoặc nghĩa."
		};
		return {
			ok: true,
			entry,
			source: "ai"
		};
	} catch {
		return {
			ok: false,
			error: "Lỗi mạng khi tra cứu."
		};
	}
});
//#endregion
export { lookupDictionaryAi_createServerFn_handler };
