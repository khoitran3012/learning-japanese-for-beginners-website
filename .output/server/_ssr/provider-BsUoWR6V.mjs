//#region node_modules/.nitro/vite/services/ssr/assets/provider-BsUoWR6V.js
var AIProvider = class {};
var NoopAIProvider = class extends AIProvider {
	name = "none";
	async available() {
		return false;
	}
	async explain() {
		throw new Error("AI chưa được bật");
	}
};
var LocalAIProvider = class extends AIProvider {
	cfg;
	name;
	constructor(cfg) {
		super();
		this.cfg = cfg;
		this.name = cfg.kind === "ollama" ? "ollama" : "lm-studio";
	}
	async available() {
		try {
			const url = this.cfg.kind === "ollama" ? `${this.cfg.url.replace(/\/$/, "")}/api/tags` : `${this.cfg.url.replace(/\/$/, "")}/v1/models`;
			return (await fetch(url, { signal: AbortSignal.timeout(2500) })).ok;
		} catch {
			return false;
		}
	}
	async explain(prompt, system) {
		const sys = system ?? this.cfg.system;
		const base = this.cfg.url.replace(/\/$/, "");
		if (this.cfg.kind === "openai") {
			const res = await fetch(`${base}/v1/chat/completions`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					model: this.cfg.model,
					messages: [{
						role: "system",
						content: sys
					}, {
						role: "user",
						content: prompt
					}],
					max_tokens: this.cfg.maxTokens,
					temperature: this.cfg.temperature
				}),
				signal: AbortSignal.timeout(25e3)
			});
			if (!res.ok) throw new Error("Local AI không phản hồi");
			return {
				text: (await res.json()).choices?.[0]?.message?.content ?? "",
				source: "ai"
			};
		}
		const res = await fetch(`${base}/api/chat`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				model: this.cfg.model,
				messages: [{
					role: "system",
					content: sys
				}, {
					role: "user",
					content: prompt
				}],
				stream: false,
				options: {
					temperature: this.cfg.temperature,
					num_predict: this.cfg.maxTokens
				}
			}),
			signal: AbortSignal.timeout(25e3)
		});
		if (!res.ok) {
			const gen = await fetch(`${base}/api/generate`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					model: this.cfg.model,
					prompt: `${sys}\n\n${prompt}`,
					stream: false,
					options: {
						temperature: this.cfg.temperature,
						num_predict: this.cfg.maxTokens
					}
				}),
				signal: AbortSignal.timeout(25e3)
			});
			if (!gen.ok) throw new Error("Local AI không phản hồi");
			return {
				text: (await gen.json()).response ?? "",
				source: "ai"
			};
		}
		return {
			text: (await res.json()).message?.content ?? "",
			source: "ai"
		};
	}
};
new NoopAIProvider();
function applyLocalAiFromSettings(s) {
	if (s.aiMode === "local") new LocalAIProvider({
		url: s.localAiUrl,
		model: s.localAiModel,
		kind: s.localAiKind,
		system: s.localAiSystem,
		temperature: s.localAiTemperature ?? .4,
		maxTokens: s.localAiMaxTokens ?? 400
	});
	else new NoopAIProvider();
}
//#endregion
export { applyLocalAiFromSettings as t };
