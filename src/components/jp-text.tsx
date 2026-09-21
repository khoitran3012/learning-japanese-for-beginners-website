import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SpeakButton } from "@/components/speak-button";
import { speakKanaOf, tokenizeJp, type PeekInfo } from "@/lib/akari/jp-peek";
import { useSettings } from "@/lib/akari/settings";
import { cn } from "@/lib/utils";

function PeekPanel({ info }: { info: PeekInfo }) {
  const showRomaji = useSettings((s) => s.showRomaji);
  const speak = speakKanaOf(info);
  const single = info.chars.length === 1 ? info.chars[0] : null;
  return (
    <div className="mt-2 rounded-[10px] border border-border bg-choice p-3 text-left">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-jp text-2xl leading-none">{info.surface}</p>
          {info.wordKana ? (
            <>
              <p className="mt-1 font-jp text-base text-muted">{info.wordKana}</p>
              {showRomaji && info.wordRomaji ? (
                <p className="text-sm text-accent">{info.wordRomaji}</p>
              ) : null}
            </>
          ) : null}
          {single && !info.wordKana ? (
            <div className="mt-2 space-y-0.5 text-sm">
              {single.kun ? (
                <p>
                  <span className="text-xs text-subtle">Kun </span>
                  <span className="font-jp">{single.kun}</span>
                </p>
              ) : null}
              {single.on ? (
                <p>
                  <span className="text-xs text-subtle">On </span>
                  <span className="font-jp">{single.on}</span>
                </p>
              ) : null}
            </div>
          ) : null}
          {info.hanViet ? (
            <p className="mt-2 text-sm">
              Hán-Việt: <span className="font-medium">{info.hanViet}</span>
            </p>
          ) : null}
          {info.meaning ? <p className="text-sm text-muted">{info.meaning}</p> : null}
        </div>
        {speak ? <SpeakButton text={speak} kana={speak} label="Nghe" /> : null}
      </div>
      {info.chars.length > 1 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {info.chars.map((c) => (
            <li
              key={c.ch}
              className="rounded-md border border-border bg-surface px-2 py-1 text-xs"
            >
              <span className="font-jp text-base">{c.ch}</span>
              {c.hanViet ? <span className="ml-1">{c.hanViet}</span> : null}
              {c.kun || c.on ? (
                <span className="ml-1 font-jp text-muted">{c.kun || c.on}</span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
      {single?.kanjiId ? (
        <Link
          to="/kanji/$id"
          params={{ id: single.kanjiId }}
          className="mt-2 inline-block text-xs text-accent hover:underline"
        >
          Mở chữ {single.ch}
        </Link>
      ) : null}
    </div>
  );
}

export function JpText({
  text,
  className,
  hint = true,
}: {
  text: string;
  className?: string;
  hint?: boolean;
}) {
  const tokens = useMemo(() => tokenizeJp(text), [text]);
  const [active, setActive] = useState<number | null>(null);
  const picked = active != null ? tokens[active] : undefined;
  const hasPeek = tokens.some((t) => t.kind === "kanji");

  return (
    <div>
      <p className={cn("font-jp leading-relaxed", className)}>
        {tokens.map((t, i) => {
          if (t.kind !== "kanji" || !t.info) {
            return <span key={i}>{t.surface}</span>;
          }
          const on = active === i;
          return (
            <button
              key={i}
              type="button"
              className={cn(
                "rounded-sm px-0.5 underline decoration-dotted decoration-muted underline-offset-[5px] transition-colors",
                on ? "bg-mist text-fg" : "hover:bg-choice",
              )}
              aria-label={`${t.surface}. Xem hiragana và Hán-Việt`}
              aria-expanded={on}
              onClick={() => setActive((cur) => (cur === i ? null : i))}
              onMouseEnter={() => setActive(i)}
            >
              {t.surface}
            </button>
          );
        })}
      </p>
      {picked?.info ? (
        <PeekPanel info={picked.info} />
      ) : hasPeek && hint ? (
        <p className="mt-1 text-xs text-subtle">Trỏ hoặc bấm kanji — hiện hiragana và Hán-Việt.</p>
      ) : null}
    </div>
  );
}
