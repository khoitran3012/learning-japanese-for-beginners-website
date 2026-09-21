import type { ReactNode } from "react";
import { SpeakButton } from "@/components/speak-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  TEACH_KUN,
  TEACH_ON,
  classifyExample,
  kunReadings,
  onReadings,
  pickKunExample,
  pickOnExample,
  type ReadingKind,
} from "@/lib/akari/on-kun";
import { useSettings } from "@/lib/akari/settings";
import type { KanjiEntry, KanjiExample } from "@/lib/akari/types";
import { cn } from "@/lib/utils";

function RubyWord({
  parts,
  oku,
  size = "lg",
}: {
  parts: ReadonlyArray<{ ch: string; yomi?: string }>;
  oku?: string;
  size?: "md" | "lg";
}) {
  const face = size === "lg" ? "text-3xl" : "text-2xl";
  return (
    <span className="inline-flex items-end font-jp leading-none">
      {parts.map((p, i) => (
        <span key={`${p.ch}-${i}`} className="inline-flex flex-col items-center px-0.5">
          <span className="h-4 text-[11px] leading-none text-muted">{p.yomi || "\u00a0"}</span>
          <span className={cn(face, "leading-none")}>{p.ch}</span>
        </span>
      ))}
      {oku ? <span className={cn(face, "leading-none text-muted")}>{oku}</span> : null}
    </span>
  );
}

function KindBadge({ kind }: { kind: ReadingKind }) {
  return kind === "on" ? (
    <Badge>音 ON · âm Hán</Badge>
  ) : (
    <Badge variant="success">訓 KUN · âm Nhật</Badge>
  );
}

function ExampleBlock({
  kind,
  title,
  why,
  children,
  speak,
  kana,
  romaji,
  vi,
  hanViet,
}: {
  kind: ReadingKind;
  title: string;
  why: string;
  children: ReactNode;
  speak: string;
  kana: string;
  romaji: string;
  vi: string;
  hanViet?: string;
}) {
  const showRomaji = useSettings((s) => s.showRomaji);
  return (
    <div
      className={cn(
        "flex flex-col rounded-[10px] border p-4",
        kind === "on" ? "border-primary/25 bg-choice" : "border-forest/30 bg-mist",
      )}
    >
      <KindBadge kind={kind} />
      <p className="mt-2 text-sm font-medium">{title}</p>
      <div className="mt-3 flex items-end justify-between gap-2">
        {children}
        <SpeakButton text={kana} kana={kana} label="Nghe" />
      </div>
      <p className="mt-2 font-jp text-sm text-muted">{kana}</p>
      {showRomaji ? <p className="text-sm text-accent">{romaji}</p> : null}
      <p className="mt-1 text-sm">{vi}</p>
      {hanViet ? <p className="text-xs text-subtle">Hán-Việt: {hanViet}</p> : null}
      <p className="mt-2 text-xs leading-relaxed text-muted">{why}</p>
    </div>
  );
}

export function OnKunGuide() {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div>
          <h2 className="font-medium">Onyomi và Kunyomi khác nhau chỗ nào?</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Một kanji có hai họ âm. <span className="text-fg">On</span> gần Hán-Việt, dùng khi{" "}
            <span className="text-fg">ghép chữ</span>. <span className="text-fg">Kun</span> là âm Nhật, dùng khi chữ{" "}
            <span className="text-fg">đứng một mình</span> hoặc có <span className="text-fg">đuôi hiragana</span>.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <ExampleBlock
            kind="on"
            title={TEACH_ON.label}
            why={TEACH_ON.why}
            speak={TEACH_ON.kana}
            kana={TEACH_ON.kana}
            romaji={TEACH_ON.romaji}
            vi={TEACH_ON.vi}
            hanViet={TEACH_ON.hanViet}
          >
            <RubyWord parts={TEACH_ON.parts} />
          </ExampleBlock>
          <ExampleBlock
            kind="kun"
            title={TEACH_KUN.label}
            why={TEACH_KUN.why}
            speak={TEACH_KUN.kana}
            kana={TEACH_KUN.kana}
            romaji={TEACH_KUN.romaji}
            vi={TEACH_KUN.vi}
          >
            <RubyWord parts={TEACH_KUN.parts} oku={TEACH_KUN.oku} />
          </ExampleBlock>
        </div>
        <p className="text-xs leading-relaxed text-subtle">
          Cùng một chữ 食: ghép 食堂 đọc しょく (on, gần Hán-Việt Thực); có đuôi 食べる đọc たべる (kun). Tương tự 火山 かざん (on) vs 山 やま (kun, một mình). Từ điển viết on bằng katakana (ショク), kun bằng hiragana, dấu ・ chỗ cắt đuôi (た・べる).
        </p>
      </CardContent>
    </Card>
  );
}

export function OnKunForKanji({
  kanji,
  words,
}: {
  kanji: KanjiEntry;
  words: KanjiExample[];
}) {
  const showRomaji = useSettings((s) => s.showRomaji);
  const ons = onReadings(kanji);
  const kuns = kunReadings(kanji);
  const onEx = pickOnExample(kanji, words);
  const kunEx = pickKunExample(kanji, words);
  const firstKun = kuns[0];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Card className="border-primary/25">
          <CardContent className="space-y-3">
            <KindBadge kind="on" />
            <p className="text-sm text-muted">
              Âm Hán · gần Hán-Việt <span className="text-fg">{kanji.han_viet || "—"}</span>
              . Hay gặp trong từ ghép.
            </p>
            {ons.length ? (
              <ul className="space-y-2">
                {ons.map((r) => (
                  <li key={r.kata} className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-jp text-lg leading-tight">
                        <span className="text-muted">{r.kata}</span>
                        <span className="mx-2 text-subtle">→</span>
                        {r.hira}
                      </p>
                      {showRomaji ? <p className="text-sm text-accent">{r.romaji}</p> : null}
                    </div>
                    <SpeakButton text={r.hira} kana={r.hira} label="Nghe" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-subtle">Chữ này ít dùng on.</p>
            )}
            {onEx ? (
              <div className="rounded-[10px] border border-border bg-choice p-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">Từ ghép</p>
                <p className="mt-1 font-jp text-2xl leading-none">{onEx.word}</p>
                <p className="mt-1 font-jp text-sm text-muted">{onEx.kana}</p>
                {showRomaji ? <p className="text-sm text-accent">{onEx.romaji}</p> : null}
                <p className="text-sm">{onEx.meaning_vi}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="border-forest/30">
          <CardContent className="space-y-3">
            <KindBadge kind="kun" />
            <p className="text-sm text-muted">
              Âm Nhật gốc. Chữ đứng một mình hoặc có đuôi hiragana (okurigana).
            </p>
            {kuns.length ? (
              <ul className="space-y-3">
                {kuns.map((r) => (
                  <li key={r.raw} className="flex items-end justify-between gap-2">
                    <div>
                      <RubyWord
                        size="md"
                        parts={[{ ch: kanji.character, yomi: r.stem }]}
                        oku={r.oku}
                      />
                      <p className="mt-1 font-jp text-sm text-muted">
                        {r.stem}
                        {r.oku ? <span className="text-subtle">・{r.oku}</span> : null}
                      </p>
                      {showRomaji ? <p className="text-sm text-accent">{r.romaji}</p> : null}
                    </div>
                    <SpeakButton text={r.kana} kana={r.kana} label="Nghe" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-subtle">Chữ này chủ yếu đọc on (từ Hán).</p>
            )}
            {kunEx ? (
              <div className="rounded-[10px] border border-forest/25 bg-mist p-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">
                  {firstKun?.oku ? "Chữ + đuôi" : "Một mình"}
                </p>
                <p className="mt-1 font-jp text-2xl leading-none">{kunEx.word}</p>
                <p className="mt-1 font-jp text-sm text-muted">{kunEx.kana}</p>
                {showRomaji ? <p className="text-sm text-accent">{kunEx.romaji}</p> : null}
                <p className="text-sm">{kunEx.meaning_vi}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ReadingTag({ kind }: { kind: ReadingKind | "mixed" }) {
  if (kind === "on") return <Badge>音 ON</Badge>;
  if (kind === "kun") return <Badge variant="success">訓 KUN</Badge>;
  return <Badge variant="muted">ON + KUN</Badge>;
}

export function exampleKindLabel(kind: ReadingKind | "mixed") {
  if (kind === "on") return "Từ ghép · đọc on";
  if (kind === "kun") return "Một chữ / có đuôi · đọc kun";
  return "Trộn on và kun";
}

export { classifyExample };
