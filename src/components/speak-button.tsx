import { Volume2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ttsKana } from "@/lib/akari/kana-speak";
import { getTts, speakJapanese } from "@/lib/akari/tts";
import { useSettings } from "@/lib/akari/settings";
import { cn } from "@/lib/utils";

export function SpeakButton({
  text,
  kana,
  className,
  label = "Nghe",
}: {
  /** Display/source text. TTS prefers `kana` when given — kanji alone is often misread. */
  text: string;
  kana?: string;
  className?: string;
  label?: string;
}) {
  const rate = useSettings((s) => s.ttsRate);
  const [msg, setMsg] = useState<string | null>(null);
  const spoken = ttsKana(kana, text);

  return (
    <div className={cn("inline-flex flex-col items-start gap-1", className)}>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        aria-label={label}
        onClick={async () => {
          const res = await speakJapanese(spoken, rate);
          const status = getTts().statusMessage();
          setMsg(res.ok ? status : res.message);
        }}
      >
        <Volume2 />
        {label}
      </Button>
      {msg ? <p className="max-w-xs text-xs text-muted">{msg}</p> : null}
    </div>
  );
}
