/**
 * Optional AI tutor. Never required for core learning.
 * Implementations: Cloud (xAI via server) and Local (Ollama / LM Studio).
 */

export interface AiExplainResult {
  text: string;
  source: "ai";
}

export interface LocalAiConfig {
  url: string;
  model: string;
  kind: "ollama" | "openai";
  system: string;
  temperature: number;
  maxTokens: number;
}

export abstract class AIProvider {
  abstract name: string;
  abstract available(): Promise<boolean>;
  abstract explain(prompt: string, system?: string): Promise<AiExplainResult>;
}

export class NoopAIProvider extends AIProvider {
  name = "none";
  async available() {
    return false;
  }
  async explain(): Promise<AiExplainResult> {
    throw new Error("AI chưa được bật");
  }
}

export class LocalAIProvider extends AIProvider {
  name: string;
  constructor(private cfg: LocalAiConfig) {
    super();
    this.name = cfg.kind === "ollama" ? "ollama" : "lm-studio";
  }

  async available() {
    try {
      const url = this.cfg.kind === "ollama" ? `${this.cfg.url.replace(/\/$/, "")}/api/tags` : `${this.cfg.url.replace(/\/$/, "")}/v1/models`;
      const res = await fetch(url, { signal: AbortSignal.timeout(2500) });
      return res.ok;
    } catch {
      return false;
    }
  }

  async explain(prompt: string, system?: string): Promise<AiExplainResult> {
    const sys = system ?? this.cfg.system;
    const base = this.cfg.url.replace(/\/$/, "");
    if (this.cfg.kind === "openai") {
      const res = await fetch(`${base}/v1/chat/completions`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          model: this.cfg.model,
          messages: [
            { role: "system", content: sys },
            { role: "user", content: prompt },
          ],
          max_tokens: this.cfg.maxTokens,
          temperature: this.cfg.temperature,
        }),
        signal: AbortSignal.timeout(25000),
      });
      if (!res.ok) throw new Error("Local AI không phản hồi");
      const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      return { text: data.choices?.[0]?.message?.content ?? "", source: "ai" };
    }
    const res = await fetch(`${base}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: this.cfg.model,
        messages: [
          { role: "system", content: sys },
          { role: "user", content: prompt },
        ],
        stream: false,
        options: {
          temperature: this.cfg.temperature,
          num_predict: this.cfg.maxTokens,
        },
      }),
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) {
      // Fallback for older Ollama that only has /api/generate
      const gen = await fetch(`${base}/api/generate`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          model: this.cfg.model,
          prompt: `${sys}\n\n${prompt}`,
          stream: false,
          options: {
            temperature: this.cfg.temperature,
            num_predict: this.cfg.maxTokens,
          },
        }),
        signal: AbortSignal.timeout(25000),
      });
      if (!gen.ok) throw new Error("Local AI không phản hồi");
      const data = (await gen.json()) as { response?: string };
      return { text: data.response ?? "", source: "ai" };
    }
    const data = (await res.json()) as { message?: { content?: string } };
    return { text: data.message?.content ?? "", source: "ai" };
  }
}

let ai: AIProvider = new NoopAIProvider();
export function setAIProvider(p: AIProvider) {
  ai = p;
}
export function getAI() {
  return ai;
}

export function applyLocalAiFromSettings(s: {
  aiMode: "off" | "local" | "cloud";
  localAiUrl: string;
  localAiModel: string;
  localAiKind: "ollama" | "openai";
  localAiSystem: string;
  localAiTemperature?: number;
  localAiMaxTokens?: number;
}) {
  if (s.aiMode === "local") {
    setAIProvider(
      new LocalAIProvider({
        url: s.localAiUrl,
        model: s.localAiModel,
        kind: s.localAiKind,
        system: s.localAiSystem,
        temperature: s.localAiTemperature ?? 0.4,
        maxTokens: s.localAiMaxTokens ?? 400,
      }),
    );
  } else {
    setAIProvider(new NoopAIProvider());
  }
}
