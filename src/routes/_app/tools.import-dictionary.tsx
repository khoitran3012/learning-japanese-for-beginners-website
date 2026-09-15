import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { importDictionary, parseDictionaryJson } from "@/lib/dictionary/import";
import { runAcceptance } from "@/lib/dictionary/acceptance";
import { builtinDictionary, fullDictionary, mergeDictionary, rememberImported, setImportedCache } from "@/lib/dictionary/catalog";
import { clearImportedDictionary, putImportedEntries } from "@/lib/akari/storage";

export const Route = createFileRoute("/_app/tools/import-dictionary")({ component: Page });

const SAMPLE = `{
  "entries": [
    {
      "kanji": "学校",
      "kana": "がっこう",
      "romaji": "gakkou",
      "meanings": ["trường học"],
      "part_of_speech": ["danh từ"],
      "jlpt": ["N5"],
      "common": true,
      "examples": [
        {
          "jp": "学校は駅の近くです。",
          "kana": "がっこうはえきのちかくです。",
          "romaji": "Gakkou wa eki no chikaku desu.",
          "vi": "Trường ở gần nhà ga."
        }
      ]
    }
  ]
}`;

function Page() {
  const [text, setText] = useState(SAMPLE);
  const [log, setLog] = useState<string[]>([]);
  const builtin = useMemo(() => builtinDictionary(), []);
  const [tests, setTests] = useState<ReturnType<typeof runAcceptance>>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  function parse() {
    const parsed = parseDictionaryJson(text);
    if ("error" in parsed) {
      setLog([`JSON lỗi: ${parsed.error}`]);
      return null;
    }
    const result = importDictionary(parsed.data);
    setLog(
      result.issues.length
        ? result.issues.map((i) => `${i.level.toUpperCase()} [#${i.index}] ${i.field ?? ""} ${i.message}`)
        : [`Hợp lệ · ${result.entries.length} mục · ${Object.keys(result.index).length} khóa index`],
    );
    return result;
  }

  return (
    <div>
      <PageHeader
        kicker="DEV"
        title="Import từ điển"
        description="JSON → kiểm tra → chuẩn hóa → index → IndexedDB. Không dùng Google Translate / scraping."
      />
      <Card className="mb-4">
        <CardContent className="space-y-3">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-56 font-mono text-xs"
            spellCheck={false}
            aria-label="JSON từ điển"
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => parse()}>
              Kiểm tra
            </Button>
            <Button
              onClick={async () => {
                const result = parse();
                if (!result?.ok) {
                  toast.error("Sửa lỗi trước khi lưu");
                  return;
                }
                await putImportedEntries(result.entries);
                rememberImported(result.entries);
                toast(`Đã lưu ${result.entries.length} mục vào máy`);
              }}
            >
              Lưu vào IndexedDB
            </Button>
            <Button variant="secondary" onClick={() => fileRef.current?.click()}>
              Mở file JSON
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (!f) return;
                try {
                  setText(await f.text());
                  toast(`Đã mở ${f.name}`);
                } catch {
                  toast.error("Không đọc được file");
                }
              }}
            />
            <Button
              variant="secondary"
              onClick={async () => {
                const dict = await fullDictionary();
                const blob = new Blob([JSON.stringify({ entries: dict }, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "dictionary.json";
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              Xuất dictionary.json
            </Button>
            <Button
              variant="danger"
              onClick={async () => {
                await clearImportedDictionary();
                setImportedCache([]);
                toast("Đã xóa từ điển import");
              }}
            >
              Xóa import
            </Button>
            <Button
              variant="secondary"
              onClick={async () => {
                const parsed = parseDictionaryJson(text);
                const extra = "data" in parsed ? importDictionary(parsed.data).entries : [];
                const dict = extra.length ? mergeDictionary(extra) : await fullDictionary();
                setTests(runAcceptance(dict.length ? dict : builtin));
              }}
            >
              Chạy acceptance
            </Button>
          </div>
        </CardContent>
      </Card>

      {log.length > 0 ? (
        <Card className="mb-4">
          <CardContent>
            <ul className="space-y-1 font-mono text-xs">
              {log.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      {tests.length > 0 ? (
        <Card>
          <CardContent>
            <h2 className="mb-3 font-medium">Acceptance</h2>
            <ul className="space-y-2">
              {tests.map((t) => (
                <li key={t.q} className="flex flex-wrap items-center gap-2 text-sm">
                  <Badge variant={t.pass ? "success" : "seal"}>{t.pass ? "PASS" : "FAIL"}</Badge>
                  <span className="font-jp">{t.q}</span>
                  <span className="text-muted">{t.note}</span>
                  <span className="text-subtle">{t.top}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      <p className="mt-4 text-sm text-muted">
        Bộ từ đi kèm: {builtin.length} mục (từ vựng N5/N4 + biểu hiện + từ lõi). Tìm kiếm gồm dạng ます/て/ない.
      </p>
    </div>
  );
}
