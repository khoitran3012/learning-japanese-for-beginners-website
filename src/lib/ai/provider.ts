/**
 * Optional AI tutor. Never required for core learning.
 * Implementations: RemoteAIProvider, LocalAIProvider (Ollama / LM Studio).
 */

export interface AiExplainResult {
  text: string;
  source: "ai";
}

export abstract class AIProvider {
  abstract name: string;
  abstract available(): Promise<boolean>;
  abstract explain(prompt: string): Promise<AiExplainResult>;
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
  name = "ollama";
  constructor(private base = "http://localhost:11434") {
    super();
  }
  async available() {
    try {
      const res = await fetch(`${this.base}/api/tags`, { signal: AbortSignal.timeout(1200) });
      return res.ok;
    } catch {
      return false;
    }
  }
  async explain(prompt: string): Promise<AiExplainResult> {
    const res = await fetch(`${this.base}/api/generate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: `Giải thích tiếng Nhật bằng tiếng Việt, ngắn gọn:\n${prompt}`,
        stream: false,
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) throw new Error("Local AI không phản hồi");
    const data = (await res.json()) as { response?: string };
    return { text: data.response ?? "", source: "ai" };
  }
}

let ai: AIProvider = new NoopAIProvider();
export function setAIProvider(p: AIProvider) {
  ai = p;
}
export function getAI() {
  return ai;
}
