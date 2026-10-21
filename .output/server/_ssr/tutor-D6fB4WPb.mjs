import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutor-D6fB4WPb.js
var explainWithCloudAi_createServerFn_handler = createServerRpc({
	id: "0e02039674196d88cb90fa49b47588eb786be4a57942e856b79088eca09f634b",
	name: "explainWithCloudAi",
	filename: "src/lib/ai/tutor.ts"
}, (opts) => explainWithCloudAi.__executeServer(opts));
var explainWithCloudAi = createServerFn({ method: "POST" }).validator((input) => ({ prompt: String(input?.prompt ?? "").trim().slice(0, 400) })).handler(explainWithCloudAi_createServerFn_handler, async ({ data }) => {
	const prompt = data.prompt;
	if (!prompt) return {
		ok: false,
		error: "Nhập câu hỏi."
	};
	const apiKey = process.env.XAI_API_KEY?.trim();
	if (!apiKey) return {
		ok: false,
		error: "AI đám mây chưa khả dụng."
	};
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: .4,
				max_tokens: 400,
				messages: [{
					role: "system",
					content: "Bạn là gia sư tiếng Nhật cho người Việt (N5–N4). Trả lời ngắn, rõ, có ví dụ kana + romaji. Không sao chép giáo trình thương mại."
				}, {
					role: "user",
					content: prompt
				}]
			})
		});
		if (!res.ok) return {
			ok: false,
			error: "Không gọi được AI."
		};
		return {
			ok: true,
			text: (await res.json()).choices?.[0]?.message?.content ?? ""
		};
	} catch {
		return {
			ok: false,
			error: "Lỗi mạng khi gọi AI."
		};
	}
});
//#endregion
export { explainWithCloudAi_createServerFn_handler };
