import { Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatLocalAi } from "@/lib/ai/local-rpc";
import { explainWithCloudAi } from "@/lib/ai/tutor";
import { useSettings } from "@/lib/akari/settings";

export function AiTutor({ seed }: { seed: string }) {
  const settings = useSettings();
  const [q, setQ] = useState("");
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (settings.aiMode === "off") return null;

  async function run() {
    const prompt = (q.trim() || seed).slice(0, 400);
    setBusy(true);
    setError(null);
    setText(null);
    try {
      if (settings.aiMode === "local") {
        const res = await chatLocalAi({
          data: {
            prompt,
            url: settings.localAiUrl,
            kind: settings.localAiKind,
            model: settings.localAiModel,
            system: settings.localAiSystem,
            temperature: settings.localAiTemperature,
            maxTokens: settings.localAiMaxTokens,
          },
        });
        if (!res.ok) setError(res.error);
        else setText(res.text);
      } else {
        const res = await explainWithCloudAi({ data: { prompt } });
        if (!res.ok) setError(res.error);
        else setText(res.text);
      }
    } catch {
      setError("Không hỏi được AI.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-sm font-medium">Hỏi gia sư AI</p>
      <p className="text-xs text-muted">
        {settings.aiMode === "local"
          ? `Ollama trên máy host · ${settings.localAiModel}`
          : "Đám mây · chỉ khi bạn bấm hỏi"}
      </p>
      <Textarea
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={seed}
        rows={2}
      />
      <Button size="sm" disabled={busy} onClick={() => void run()}>
        <Sparkles /> {busy ? "Đang nghĩ…" : "Hỏi"}
      </Button>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {text ? <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted">{text}</p> : null}
    </div>
  );
}
