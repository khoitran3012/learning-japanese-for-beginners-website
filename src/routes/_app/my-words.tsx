import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DynamicLink } from "@/components/dynamic-link";
import { useProgress } from "@/lib/akari/progress";
import { putImportedEntries } from "@/lib/akari/storage";
import { rememberImported, resolveStudyItem, useDictionary } from "@/lib/dictionary/catalog";
import { importDictionary } from "@/lib/dictionary/import";
import type { DictionaryEntry } from "@/lib/akari/types";

export const Route = createFileRoute("/_app/my-words")({ component: Page });

function Page() {
  useDictionary();
  const ids = [...useProgress((s) => s.myWords)];
  const addToStudy = useProgress((s) => s.addToStudy);
  const drop = useProgress((s) => s.dropMyWord);
  const items = ids.map(resolveStudyItem).filter(Boolean);
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState("");
  const [kana, setKana] = useState("");
  const [romaji, setRomaji] = useState("");
  const [meaning, setMeaning] = useState("");

  async function addCustom() {
    const payload = {
      entries: [
        {
          kanji: word,
          kana,
          romaji,
          meanings: [meaning],
          part_of_speech: ["danh từ"],
          jlpt: ["N5"],
          tags: ["tùy chọn"],
        },
      ],
    };
    const result = importDictionary(payload);
    if (!result.ok || !result.entries[0]) {
      toast.error(result.issues[0]?.message ?? "Không thêm được");
      return;
    }
    const entry: DictionaryEntry = result.entries[0];
    await putImportedEntries([entry]);
    rememberImported([entry]);
    await addToStudy(entry.id, "custom");
    toast("Đã thêm từ của bạn");
    setWord("");
    setKana("");
    setRomaji("");
    setMeaning("");
    setOpen(false);
  }

  return (
    <div>
      <PageHeader
        kicker="単語帳"
        title="Từ của tôi"
        description="Danh sách học từ từ điển, từ vựng, hoặc từ bạn tự thêm."
        actions={
          <Button variant="secondary" onClick={() => setOpen((v) => !v)}>
            Thêm từ tùy
          </Button>
        }
      />

      {open ? (
        <Card className="mb-4">
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="w">Chữ (kanji / kana)</Label>
              <Input id="w" value={word} onChange={(e) => setWord(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="k">Kana</Label>
              <Input id="k" value={kana} onChange={(e) => setKana(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="r">Romaji</Label>
              <Input id="r" value={romaji} onChange={(e) => setRomaji(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="m">Nghĩa tiếng Việt</Label>
              <Input id="m" value={meaning} onChange={(e) => setMeaning(e.target.value)} className="mt-1" />
            </div>
            <div className="sm:col-span-2">
              <Button onClick={() => void addCustom()}>Lưu vào máy</Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {items.length === 0 ? (
        <EmptyState
          title="Chưa có từ nào"
          description="Tra từ điển rồi bấm Thêm vào học, hoặc tự thêm ở trên."
          action={
            <Button asChild>
              <Link to="/dictionary">Tra từ điển</Link>
            </Button>
          }
        />
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
          {items.map((item) =>
            item ? (
              <li key={item.id} className="flex items-center gap-2 px-4 py-3">
                <DynamicLink to={item.to} className="min-w-0 flex-1 hover:underline">
                  <span className="font-jp text-lg">{item.title}</span>
                  <span className="ml-2 text-sm text-muted">{item.sub}</span>
                </DynamicLink>
                <Button size="sm" variant="ghost" onClick={() => void drop(item.id)}>
                  Xóa
                </Button>
              </li>
            ) : null,
          )}
        </ul>
      )}
    </div>
  );
}
