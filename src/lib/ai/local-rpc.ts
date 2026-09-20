import { createServerFn } from "@tanstack/react-start";

/** Only loopback Ollama / LM Studio — never proxy to the public internet. */
export function normalizeLocalAiUrl(raw: string): string | null {
  try {
    const url = new URL(String(raw || "").trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    const host = url.hostname.replace(/^\[|\]$/g, "").toLowerCase();
    if (host !== "localhost" && host !== "127.0.0.1" && host !== "::1") return null;
    const port = url.port || (url.protocol === "https:" ? "443" : "80");
    return `http://127.0.0.1:${port}`;
  } catch {
    return null;
  }
}

function mapFetchError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (/abort|timeout/i.test(msg)) return "Ollama quá chậm (model đang tải?). Đợi rồi thử lại.";
  if (/fetch|ECONNREFUSED|ENOTFOUND|network|Failed/i.test(msg)) {
    return "Không nối được Ollama trên máy host. Mở ứng dụng Ollama rồi thử lại.";
  }
  return "Không gọi được AI local.";
}

const hitsRef = globalThis as typeof globalThis & { __akariLocalAiHits?: number[] };
function allowChat(): boolean {
  const now = Date.now();
  const hits = (hitsRef.__akariLocalAiHits ?? []).filter((t) => now - t < 60_000);
  if (hits.length >= 30) {
    hitsRef.__akariLocalAiHits = hits;
    return false;
  }
  hits.push(now);
  hitsRef.__akariLocalAiHits = hits;
  return true;
}

export const probeLocalAi = createServerFn({ method: "POST" })
  .validator((input: { url?: string; kind?: string }) => ({
    url: String(input?.url ?? "http://127.0.0.1:11434").slice(0, 120),
    kind: input?.kind === "openai" ? ("openai" as const) : ("ollama" as const),
  }))
  .handler(async ({ data }) => {
    const base = normalizeLocalAiUrl(data.url);
    if (!base) {
      return {
        ok: false as const,
        error: "URL phải là http://localhost:11434 (Ollama) hoặc cổng 1234 (LM Studio).",
        models: [] as string[],
      };
    }
    try {
      const path = data.kind === "openai" ? "/v1/models" : "/api/tags";
      const res = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) {
        return {
          ok: false as const,
          error: `Ollama trả lỗi ${res.status}. Kiểm tra ollama serve.`,
          models: [] as string[],
        };
      }
      const body = (await res.json()) as {
        models?: { name?: string }[];
        data?: { id?: string }[];
      };
      const models = (
        data.kind === "openai"
          ? (body.data ?? []).map((m) => m.id ?? "")
          : (body.models ?? []).map((m) => m.name ?? "")
      ).filter(Boolean);
      if (!models.length) {
        return {
          ok: false as const,
          error: "Ollama chạy nhưng chưa có model. Trong CMD: ollama pull llama3.2",
          models: [],
        };
      }
      return { ok: true as const, models, error: null as string | null };
    } catch (err) {
      return { ok: false as const, error: mapFetchError(err), models: [] as string[] };
    }
  });

export const chatLocalAi = createServerFn({ method: "POST" })
  .validator((input: {
    prompt?: string;
    url?: string;
    kind?: string;
    model?: string;
    system?: string;
    temperature?: number;
    maxTokens?: number;
  }) => ({
    prompt: String(input?.prompt ?? "").trim().slice(0, 400),
    url: String(input?.url ?? "http://127.0.0.1:11434").slice(0, 120),
    kind: input?.kind === "openai" ? ("openai" as const) : ("ollama" as const),
    model: String(input?.model ?? "llama3.2").trim().slice(0, 80) || "llama3.2",
    system: String(input?.system ?? "").slice(0, 800),
    temperature: Math.min(1.2, Math.max(0, Number(input?.temperature) || 0.4)),
    maxTokens: Math.min(800, Math.max(80, Math.floor(Number(input?.maxTokens) || 400))),
  }))
  .handler(async ({ data }) => {
    if (!data.prompt) return { ok: false as const, error: "Nhập câu hỏi." };
    if (!allowChat()) return { ok: false as const, error: "Hỏi chậm thôi — đợi một lúc." };
    const base = normalizeLocalAiUrl(data.url);
    if (!base) {
      return { ok: false as const, error: "URL AI local không hợp lệ." };
    }
    const sys =
      data.system ||
      "Bạn là gia sư tiếng Nhật cho người Việt (N5–N4). Trả lời ngắn, rõ, có ví dụ kana + romaji.";

    try {
      if (data.kind === "openai") {
        const res = await fetch(`${base}/v1/chat/completions`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            model: data.model,
            messages: [
              { role: "system", content: sys },
              { role: "user", content: data.prompt },
            ],
            max_tokens: data.maxTokens,
            temperature: data.temperature,
          }),
          signal: AbortSignal.timeout(90000),
        });
        if (!res.ok) {
          const errText = await res.text().catch(() => "");
          return { ok: false as const, error: humanModelError(errText, data.model, res.status) };
        }
        const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
        return { ok: true as const, text: body.choices?.[0]?.message?.content ?? "" };
      }

      const res = await fetch(`${base}/api/chat`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          model: data.model,
          messages: [
            { role: "system", content: sys },
            { role: "user", content: data.prompt },
          ],
          stream: false,
          options: { temperature: data.temperature, num_predict: data.maxTokens },
        }),
        signal: AbortSignal.timeout(90000),
      });
      if (res.ok) {
        const body = (await res.json()) as { message?: { content?: string } };
        return { ok: true as const, text: body.message?.content ?? "" };
      }
      const errText = await res.text().catch(() => "");
      if (/not found|pull/i.test(errText)) {
        return { ok: false as const, error: humanModelError(errText, data.model, res.status) };
      }

      const gen = await fetch(`${base}/api/generate`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          model: data.model,
          prompt: `${sys}\n\n${data.prompt}`,
          stream: false,
          options: { temperature: data.temperature, num_predict: data.maxTokens },
        }),
        signal: AbortSignal.timeout(90000),
      });
      if (!gen.ok) {
        const genErr = await gen.text().catch(() => errText);
        return { ok: false as const, error: humanModelError(genErr, data.model, gen.status) };
      }
      const body = (await gen.json()) as { response?: string };
      return { ok: true as const, text: body.response ?? "" };
    } catch (err) {
      return { ok: false as const, error: mapFetchError(err) };
    }
  });

function humanModelError(body: string, model: string, status: number): string {
  if (/not found|pull it first|404/i.test(body) || status === 404) {
    return `Chưa có model "${model}". Trong CMD: ollama pull ${model}`;
  }
  return `Ollama lỗi ${status}. ${body.slice(0, 160)}`.trim();
}
