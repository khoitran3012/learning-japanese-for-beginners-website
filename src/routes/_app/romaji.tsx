import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HIRAGANA } from "@/data/kana";
import { normalizeRomaji } from "@/lib/akari/romaji";
import { SpeakButton } from "@/components/speak-button";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";

export const Route = createFileRoute("/_app/romaji")({ component: Page });

const pool = HIRAGANA.filter((k) => k.group === "gojuon");

function Page() {
  const [mode, setMode] = useState<"jp-ro" | "ro-jp" | "jp-vi">("jp-ro");
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const remember = useProgress((s) => s.remember);
  const forgot = useProgress((s) => s.forgot);
  const showRomaji = useSettings((s) => s.showRomaji);
  const item = pool[i % pool.length]!;

  const prompt = useMemo(() => {
    if (mode === "jp-ro") return item.char;
    if (mode === "ro-jp") return item.romaji;
    return item.char;
  }, [item, mode]);

  function check() {
    const ok =
      mode === "ro-jp"
        ? typed.trim() === item.char
        : mode === "jp-vi"
          ? item.examples[0]?.vi.toLowerCase().includes(typed.trim().toLowerCase()) ||
            typed.trim().length > 1
          : normalizeRomaji(typed) === normalizeRomaji(item.romaji);
    if (ok) {
      setMsg("Đúng.");
      void remember(item.id, "kana");
      setTyped("");
      setI((x) => x + 1);
    } else {
      setMsg(`Chưa đúng. Đáp án: ${mode === "ro-jp" ? item.char : item.romaji}`);
      void forgot(item.id, "kana");
    }
  }

  return (
    <div>
      <PageHeader
        kicker="ローマ字"
        title="Romaji"
        description="Luyện chuyển Nhật → Latin, Latin → Nhật. Hepburn: shi, chi, tsu, ou."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            ["jp-ro", "Nhật → Romaji"],
            ["ro-jp", "Romaji → Nhật"],
            ["jp-vi", "Nhật → nghĩa"],
          ] as const
        ).map(([id, label]) => (
          <Button key={id} variant={mode === id ? "default" : "secondary"} onClick={() => setMode(id)}>
            {label}
          </Button>
        ))}
      </div>
      <Card className="mx-auto max-w-lg">
        <CardContent className="flex flex-col items-center py-10">
          <p className="text-kana text-7xl">{prompt}</p>
          {showRomaji && mode !== "jp-ro" ? (
            <p className="mt-2 text-sm text-muted">{item.examples[0]?.vi}</p>
          ) : null}
          <SpeakButton className="mt-4" text={item.char} />
          <form
            className="mt-6 flex w-full max-w-sm gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              check();
            }}
          >
            <Input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder={mode === "ro-jp" ? "Nhập chữ Nhật" : "Nhập đáp án"}
              aria-label="Đáp án"
            />
            <Button type="submit">Kiểm tra</Button>
          </form>
          {msg ? <p className="mt-3 text-sm text-muted">{msg}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}
