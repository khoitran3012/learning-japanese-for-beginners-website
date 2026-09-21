import { SpeakButton } from "@/components/speak-button";
import { useSettings } from "@/lib/akari/settings";
import { cn } from "@/lib/utils";

export function Pronunciation({
  kana,
  romaji,
  speak,
  label,
  large = false,
  className,
}: {
  kana: string;
  romaji?: string;
  speak?: string;
  label?: string;
  large?: boolean;
  className?: string;
}) {
  const showRomaji = useSettings((s) => s.showRomaji);
  const spoken = speak || kana;
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <div className="min-w-0">
        {label ? <p className="text-xs text-muted">{label}</p> : null}
        <p className={cn("font-jp leading-tight", large ? "text-2xl" : "text-lg")}>{kana}</p>
        {showRomaji && romaji ? <p className="text-sm text-accent">{romaji}</p> : null}
      </div>
      <SpeakButton text={spoken} kana={spoken} label="Nghe" />
    </div>
  );
}
