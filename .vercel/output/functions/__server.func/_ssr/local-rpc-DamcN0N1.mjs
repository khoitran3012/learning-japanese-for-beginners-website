import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/local-rpc-DamcN0N1.js
/** Only loopback Ollama / LM Studio — never proxy to the public internet. */
function normalizeLocalAiUrl(raw) {
	try {
		const url = new URL(String(raw || "").trim());
		if (url.protocol !== "http:" && url.protocol !== "https:") return null;
		const host = url.hostname.replace(/^\[|\]$/g, "").toLowerCase();
		if (host !== "localhost" && host !== "127.0.0.1" && host !== "::1") return null;
		return `http://127.0.0.1:${url.port || (url.protocol === "https:" ? "443" : "80")}`;
	} catch {
		return null;
	}
}
function mapFetchError(err) {
	const msg = err instanceof Error ? err.message : String(err);
	if (/abort|timeout/i.test(msg)) return "Ollama quá chậm (model đang tải?). Đợi rồi thử lại.";
	if (/fetch|ECONNREFUSED|ENOTFOUND|network|Failed/i.test(msg)) return "Không nối được Ollama trên máy host. Mở ứng dụng Ollama rồi thử lại.";
	return "Không gọi được AI local.";
}
var hitsRef = globalThis;
function allowChat() {
	const now = Date.now();
	const hits = (hitsRef.__akariLocalAiHits ?? []).filter((t) => now - t < 6e4);
	if (hits.length >= 30) {
		hitsRef.__akariLocalAiHits = hits;
		return false;
	}
	hits.push(now);
	hitsRef.__akariLocalAiHits = hits;
	return true;
}
var probeLocalAi_createServerFn_handler = createServerRpc({
	id: "bb9e2c010310d8175a15df97f0940b9010672dd4e5c106219417511064d02c5a",
	name: "probeLocalAi",
	filename: "src/lib/ai/local-rpc.ts"
}, (opts) => probeLocalAi.__executeServer(opts));
var probeLocalAi = createServerFn({ method: "POST" }).validator((input) => ({
	url: String(input?.url ?? "http://127.0.0.1:11434").slice(0, 120),
	kind: input?.kind === "openai" ? "openai" : "ollama"
})).handler(probeLocalAi_createServerFn_handler, async ({ data }) => {
	const base = normalizeLocalAiUrl(data.url);
	if (!base) return {
		ok: false,
		error: "URL phải là http://localhost:11434 (Ollama) hoặc cổng 1234 (LM Studio).",
		models: []
	};
	try {
		const path = data.kind === "openai" ? "/v1/models" : "/api/tags";
		const res = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(5e3) });
		if (!res.ok) return {
			ok: false,
			error: `Ollama trả lỗi ${res.status}. Kiểm tra ollama serve.`,
			models: []
		};
		const body = await res.json();
		const models = (data.kind === "openai" ? (body.data ?? []).map((m) => m.id ?? "") : (body.models ?? []).map((m) => m.name ?? "")).filter(Boolean);
		if (!models.length) return {
			ok: false,
			error: "Ollama chạy nhưng chưa có model. Trong CMD: ollama pull llama3.2",
			models: []
		};
		return {
			ok: true,
			models,
			error: null
		};
	} catch (err) {
		return {
			ok: false,
			error: mapFetchError(err),
			models: []
		};
	}
});
var chatLocalAi_createServerFn_handler = createServerRpc({
	id: "feb02f3dbef43251966405dec073b6809ef0ab4d813e3ffa5ed3273786d166b3",
	name: "chatLocalAi",
	filename: "src/lib/ai/local-rpc.ts"
}, (opts) => chatLocalAi.__executeServer(opts));
var chatLocalAi = createServerFn({ method: "POST" }).validator((input) => ({
	prompt: String(input?.prompt ?? "").trim().slice(0, 400),
	url: String(input?.url ?? "http://127.0.0.1:11434").slice(0, 120),
	kind: input?.kind === "openai" ? "openai" : "ollama",
	model: String(input?.model ?? "llama3.2").trim().slice(0, 80) || "llama3.2",
	system: String(input?.system ?? "").slice(0, 800),
	temperature: Math.min(1.2, Math.max(0, Number(input?.temperature) || .4)),
	maxTokens: Math.min(800, Math.max(80, Math.floor(Number(input?.maxTokens) || 400)))
})).handler(chatLocalAi_createServerFn_handler, async ({ data }) => {
	if (!data.prompt) return {
		ok: false,
		error: "Nhập câu hỏi."
	};
	if (!allowChat()) return {
		ok: false,
		error: "Hỏi chậm thôi — đợi một lúc."
	};
	const base = normalizeLocalAiUrl(data.url);
	if (!base) return {
		ok: false,
		error: "URL AI local không hợp lệ."
	};
	const sys = data.system || "Bạn là gia sư tiếng Nhật cho người Việt (N5–N4). Trả lời ngắn, rõ, có ví dụ kana + romaji.";
	try {
		if (data.kind === "openai") {
			const res = await fetch(`${base}/v1/chat/completions`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					model: data.model,
					messages: [{
						role: "system",
						content: sys
					}, {
						role: "user",
						content: data.prompt
					}],
					max_tokens: data.maxTokens,
					temperature: data.temperature
				}),
				signal: AbortSignal.timeout(9e4)
			});
			if (!res.ok) return {
				ok: false,
				error: humanModelError(await res.text().catch(() => ""), data.model, res.status)
			};
			return {
				ok: true,
				text: (await res.json()).choices?.[0]?.message?.content ?? ""
			};
		}
		const res = await fetch(`${base}/api/chat`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				model: data.model,
				messages: [{
					role: "system",
					content: sys
				}, {
					role: "user",
					content: data.prompt
				}],
				stream: false,
				options: {
					temperature: data.temperature,
					num_predict: data.maxTokens
				}
			}),
			signal: AbortSignal.timeout(9e4)
		});
		if (res.ok) return {
			ok: true,
			text: (await res.json()).message?.content ?? ""
		};
		const errText = await res.text().catch(() => "");
		if (/not found|pull/i.test(errText)) return {
			ok: false,
			error: humanModelError(errText, data.model, res.status)
		};
		const gen = await fetch(`${base}/api/generate`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				model: data.model,
				prompt: `${sys}\n\n${data.prompt}`,
				stream: false,
				options: {
					temperature: data.temperature,
					num_predict: data.maxTokens
				}
			}),
			signal: AbortSignal.timeout(9e4)
		});
		if (!gen.ok) return {
			ok: false,
			error: humanModelError(await gen.text().catch(() => errText), data.model, gen.status)
		};
		return {
			ok: true,
			text: (await gen.json()).response ?? ""
		};
	} catch (err) {
		return {
			ok: false,
			error: mapFetchError(err)
		};
	}
});
function humanModelError(body, model, status) {
	if (/not found|pull it first|404/i.test(body) || status === 404) return `Chưa có model "${model}". Trong CMD: ollama pull ${model}`;
	return `Ollama lỗi ${status}. ${body.slice(0, 160)}`.trim();
}
//#endregion
export { chatLocalAi_createServerFn_handler, probeLocalAi_createServerFn_handler };
