import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSettings } from "@/lib/akari/settings";
import { exportAll, importAll, validateBackup, wipeUserData } from "@/lib/akari/storage";
import { useProgress } from "@/lib/akari/progress";
import { useLocalFirst } from "@/lib/api/api-client";
import type { ThemeMode } from "@/lib/akari/types";

export const Route = createFileRoute("/_app/settings")({ component: Page });

function Page() {
  const settings = useSettings();
  const load = useProgress((s) => s.load);
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    useLocalFirst(settings.onlineDictionary);
  }, [settings.onlineDictionary]);

  async function onExport() {
    const payload = await exportAll({
      theme: settings.theme,
      fontSize: settings.fontSize,
      showRomaji: settings.showRomaji,
      autoPlayAudio: settings.autoPlayAudio,
      ttsRate: settings.ttsRate,
      dailyGoal: settings.dailyGoal,
      flashcardPerDay: settings.flashcardPerDay,
      freeMode: settings.freeMode,
      onlineDictionary: settings.onlineDictionary,
      reducedMotion: settings.reducedMotion,
    });
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `akari-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Đã tải file sao lưu");
  }

  async function onImport(file: File) {
    setBusy(true);
    try {
      const text = await file.text();
      const data: unknown = JSON.parse(text);
      if (!validateBackup(data)) {
        toast.error("File sao lưu không hợp lệ");
        return;
      }
      await importAll(data);
      if (data.settings && typeof data.settings === "object") {
        settings.set(data.settings as Parameters<typeof settings.set>[0]);
      }
      await load();
      toast("Đã khôi phục dữ liệu");
    } catch {
      toast.error("Không đọc được file");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader kicker="設定" title="Cài đặt" description="Giao diện, ôn tập và sao lưu — tất cả lưu trên máy này." />

      <div className="space-y-4">
        <Card>
          <CardContent className="space-y-4">
            <h2 className="font-medium">Giao diện</h2>
            <div className="flex flex-wrap gap-2">
              {([
                ["system", "Theo hệ thống"],
                ["light", "Sáng"],
                ["dark", "Tối"],
              ] as [ThemeMode, string][]).map(([id, label]) => (
                <Button
                  key={id}
                  size="sm"
                  variant={settings.theme === id ? "default" : "secondary"}
                  onClick={() => settings.set({ theme: id })}
                >
                  {label}
                </Button>
              ))}
            </div>
            <div>
              <Label className="mb-2 block">Cỡ chữ</Label>
              <div className="flex gap-2">
                {(["sm", "md", "lg"] as const).map((id) => (
                  <Button
                    key={id}
                    size="sm"
                    variant={settings.fontSize === id ? "default" : "secondary"}
                    onClick={() => settings.set({ fontSize: id })}
                  >
                    {id === "sm" ? "Nhỏ" : id === "md" ? "Vừa" : "Lớn"}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="romaji">Hiện Romaji</Label>
              <Switch
                id="romaji"
                checked={settings.showRomaji}
                onCheckedChange={(v) => settings.set({ showRomaji: v })}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="motion">Giảm chuyển động</Label>
              <Switch
                id="motion"
                checked={settings.reducedMotion}
                onCheckedChange={(v) => settings.set({ reducedMotion: v })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <h2 className="font-medium">Học tập</h2>
            <div>
              <Label className="mb-2 block">Mục tiêu mỗi ngày: {settings.dailyGoal} phút</Label>
              <Slider
                min={5}
                max={60}
                step={5}
                value={[settings.dailyGoal]}
                onValueChange={([v]) => settings.set({ dailyGoal: v ?? 15 })}
              />
            </div>
            <div>
              <Label className="mb-2 block">Flashcard mỗi phiên: {settings.flashcardPerDay}</Label>
              <Slider
                min={5}
                max={40}
                step={5}
                value={[settings.flashcardPerDay]}
                onValueChange={([v]) => settings.set({ flashcardPerDay: v ?? 20 })}
              />
            </div>
            <div>
              <Label className="mb-2 block">Tốc độ đọc: {settings.ttsRate.toFixed(1)}</Label>
              <Slider
                min={0.6}
                max={1.2}
                step={0.1}
                value={[settings.ttsRate]}
                onValueChange={([v]) => settings.set({ ttsRate: v ?? 0.9 })}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="autoplay">Tự đọc khi mở thẻ</Label>
              <Switch
                id="autoplay"
                checked={settings.autoPlayAudio}
                onCheckedChange={(v) => settings.set({ autoPlayAudio: v })}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="free">Mở khóa lộ trình (chế độ tự do)</Label>
              <Switch
                id="free"
                checked={settings.freeMode}
                onCheckedChange={(v) => settings.set({ freeMode: v })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <h2 className="font-medium">Từ điển</h2>
            <p className="text-sm text-muted">
              Mặc định tra bộ đi kèm trên máy (kể cả dạng ます/て). Bật nguồn bổ sung để tự tra khi không có kết quả — bạn vẫn xem và lưu từng mục.
            </p>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="online">Tự tra cứu bổ sung khi không có kết quả</Label>
              <Switch
                id="online"
                checked={settings.onlineDictionary}
                onCheckedChange={(v) => settings.set({ onlineDictionary: v })}
              />
            </div>
            <Button asChild variant="secondary">
              <Link to="/tools/import-dictionary">Import / kiểm tra từ điển</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3">
            <h2 className="font-medium">Sao lưu</h2>
            <p className="text-sm text-muted">
              File JSON chứa tiến độ SRS, yêu thích, từ của bạn và cài đặt. Không gửi lên máy chủ.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => void onExport()}>
                Tải sao lưu
              </Button>
              <Button variant="secondary" disabled={busy} onClick={() => fileRef.current?.click()}>
                Khôi phục
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void onImport(f);
                  e.target.value = "";
                }}
              />
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="danger">Xóa dữ liệu trên máy</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xóa toàn bộ tiến độ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    SRS, yêu thích, từ của bạn và lịch sử tra sẽ mất. Hãy sao lưu trước nếu cần.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      await wipeUserData();
                      localStorage.removeItem("akari-settings");
                      toast("Đã xóa dữ liệu");
                      window.location.reload();
                    }}
                  >
                    Xóa
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2 text-sm text-muted">
            <h2 className="font-medium text-fg">Akari</h2>
            <p>Học tiếng Nhật từ số 0, ưu tiên N5 → N4. Dữ liệu bài học là nội dung gốc, không sao chép giáo trình thương mại.</p>
            <p>Giấy phép mã nguồn MIT. Font và thư viện ghi trong ATTRIBUTIONS.md.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
