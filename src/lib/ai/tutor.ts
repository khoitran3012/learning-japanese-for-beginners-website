import { createServerFn } from "@tanstack/react-start";
import { getAI } from "./provider";

export const explainWithCloudAi = createServerFn({ method: "POST" })
  .validator((input: { prompt: string }) => ({
    prompt: String(input?.prompt ?? "").trim().slice(0, 400),
  }))
  .handler(async ({ data }) => {
    const prompt = data.prompt;
    if (!prompt) return { ok: false as const, error: "Nhập câu hỏi." };
    const apiKey = process.env.XAI_API_KEY?.trim();
    if (!apiKey) return { ok: false as const, error: "AI đám mây chưa khả dụng." };

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          temperature: 0.4,
          max_tokens: 400,
          messages: [
            {
              role: "system",
              content:
                "Bạn là gia sư tiếng Nhật cho người Việt (N5–N4). Trả lời ngắn, rõ, có ví dụ kana + romaji. Không sao chép giáo trình thương mại.",
            },
            { role: "user", content: prompt },
          ],
        }),
      });
      if (!res.ok) return { ok: false as const, error: "Không gọi được AI." };
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      return { ok: true as const, text: body.choices?.[0]?.message?.content ?? "" };
    } catch {
      return { ok: false as const, error: "Lỗi mạng khi gọi AI." };
    }
  });

export async function explainWithLocalAi(prompt: string, system?: string) {
  const ai = getAI();
  if (!(await ai.available())) {
    return { ok: false as const, error: "Không kết nối được AI local. Kiểm tra URL trong Cài đặt." };
  }
  try {
    const res = await ai.explain(prompt, system);
    return { ok: true as const, text: res.text };
  } catch {
    return { ok: false as const, error: "AI local không phản hồi." };
  }
}
