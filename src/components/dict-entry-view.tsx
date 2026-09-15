import { Link } from "@tanstack/react-router";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { SpeakButton } from "@/components/speak-button";
import { DictActions } from "@/components/dict-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { kanjiInWord, relatedEntries } from "@/lib/dictionary/catalog";
import { useSettings } from "@/lib/akari/settings";
import { copyToClipboard } from "@/lib/utils";
import type { DictionaryEntry } from "@/lib/akari/types";

export function DictEntryView({ entry }: { entry: DictionaryEntry }) {
  const showRomaji = useSettings((s) => s.showRomaji);
  const kanji = kanjiInWord(entry.kanji, entry);
  const posLabel = entry.part_of_speech.join(" · ");
  const related = relatedEntries(entry);

  async function copyHead() {
    const text = `${entry.kanji}　${entry.kana}　${entry.romaji}\n${entry.meanings.join(" · ")}`;
    const ok = await copyToClipboard(text);
    if (ok) toast("Đã sao chép");
    else toast.error("Không sao chép được");
  }

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <Card>
        <CardContent className="py-8 text-center">
          <div className="flex flex-wrap justify-center gap-1.5">
            {entry.jlpt.map((l) => (
              <Badge key={l}>JLPT {l}</Badge>
            ))}
            {entry.common ? <Badge variant="success">Phổ biến</Badge> : null}
          </div>
          <p className="text-kana mt-4 text-6xl">{entry.kanji}</p>
          <p className="mt-2 font-jp text-xl text-muted">{entry.kana}</p>
          {showRomaji ? <p className="text-accent">{entry.romaji}</p> : null}
          <ul className="mt-4 space-y-1">
            {entry.meanings.map((m) => (
              <li key={m} className="text-lg">
                {m}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm capitalize text-subtle">{posLabel}</p>
          {entry.pitch_accent != null ? (
            <p className="mt-1 text-xs text-muted">Pitch accent: {entry.pitch_accent}</p>
          ) : null}
          {entry.tags.length > 0 ? (
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {entry.tags.map((t) => (
                <Badge key={t} variant="muted">
                  {t}
                </Badge>
              ))}
            </div>
          ) : null}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <SpeakButton text={entry.kanji} />
            <Button type="button" variant="secondary" size="sm" onClick={() => void copyHead()}>
              <Copy /> Sao chép
            </Button>
          </div>
        </CardContent>
      </Card>

      {entry.examples.length > 0 ? (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-sm text-muted">Ví dụ</h2>
            {entry.examples.map((ex) => (
              <div key={ex.jp} className="border-t border-border pt-3 first:border-0 first:pt-0">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-jp text-lg">{ex.jp}</p>
                  <SpeakButton text={ex.jp} label="Nghe câu" />
                </div>
                {ex.kana ? <p className="text-sm text-muted">{ex.kana}</p> : null}
                {showRomaji && ex.romaji ? <p className="text-sm text-accent">{ex.romaji}</p> : null}
                <p className="text-sm">{ex.vi}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {kanji.length > 0 ? (
        <Card>
          <CardContent>
            <h2 className="mb-3 text-sm text-muted">Kanji trong từ</h2>
            <ul className="space-y-2">
              {kanji.map((k) => (
                <li key={k.char} className="flex items-center gap-3">
                  {k.entry ? (
                    <Link
                      to="/kanji/$id"
                      params={{ id: k.entry.id }}
                      className="font-jp text-2xl hover:underline"
                    >
                      {k.char}
                    </Link>
                  ) : (
                    <span className="font-jp text-2xl">{k.char}</span>
                  )}
                  <span className="text-sm text-muted">
                    {k.entry ? k.entry.meaning_vi : "Chưa có trong bộ kanji N5/N4"}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      {related.length > 0 ? (
        <Card>
          <CardContent>
            <h2 className="mb-3 text-sm text-muted">Từ liên quan</h2>
            <ul className="space-y-1">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    to="/dictionary/$id"
                    params={{ id: r.id }}
                    className="flex items-center justify-between rounded-lg px-1 py-1.5 hover:bg-bg-elevated"
                  >
                    <span>
                      <span className="font-jp text-lg">{r.kanji}</span>
                      <span className="ml-2 text-sm text-muted">{r.meanings[0]}</span>
                    </span>
                    <span className="text-xs text-subtle">{r.kana}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      <DictActions entry={entry} />
    </div>
  );
}
