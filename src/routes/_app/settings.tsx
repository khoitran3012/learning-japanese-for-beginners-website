import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { applyLocalAiFromSettings } from "@/lib/ai/provider";
import { probeLocalAi } from "@/lib/ai/local-rpc";
import { exportAll, importAll, validateBackup, wipeUserData } from "@/lib/akari/storage";
import { useProgress } from "@/lib/akari/progress";
import { useLocalFirst } from "@/lib/api/api-client";
import type { ThemeMode } from "@/lib/akari/types";
import { getDbInfo, type DbInfo } from "@/lib/akari/db-info";
import { hasRecoveryCode, issueRecoveryCode } from "@/lib/akari/recovery";
import { authClient } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/_app/settings")({ component: Page });

function Page() {
  const settings = useSettings();
  const load = useProgress((s) => s.load);
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dbInfo, setDbInfo] = useState<DbInfo | null>(null);
  const [aiModels, setAiModels] = useState<string[]>([]);
  const [aiProbe, setAiProbe] = useState<string | null>(null);
  const { user } = useCurrentUserState();
  const [hasCode, setHasCode] = useState(false);
  const [freshCode, setFreshCode] = useState<string | null>(null);
  const [codeBusy, setCodeBusy] = useState(false);
  const [curPass, setCurPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [passBusy, setPassBusy] = useState(false);

  useEffect(() => {
    useLocalFirst(settings.onlineDictionary);
  }, [settings.onlineDictionary]);

  useEffect(() => {
    void getDbInfo()
      .then(setDbInfo)
      .catch(() => setDbInfo(null));
  }, []);

  useEffect(() => {
    if (!user) {
      setHasCode(false);
      return;
    }
    void hasRecoveryCode()
      .then((r) => setHasCode(r.has))
      .catch(() => setHasCode(false));
  }, [user]);

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
      aiMode: settings.aiMode,
      localAiUrl: settings.localAiUrl,
      localAiModel: settings.localAiModel,
      localAiKind: settings.localAiKind,
      localAiSystem: settings.localAiSystem,
      localAiTemperature: settings.localAiTemperature,
      localAiMaxTokens: settings.localAiMaxTokens,
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
      <PageHeader kicker="設定" title="Cài đặt" description="Giao diện, ôn tập, AI local và sao lưu." />

      <div className="space-y-4">
        {dbInfo ? (
          <Card>
            <CardContent className="space-y-2">
              <h2 className="font-medium">Cơ sở dữ liệu SQL</h2>
              <p className="text-sm text-muted">
                Tài khoản, bảng xếp hạng, lộ trình và vườn được lưu bằng <strong>{dbInfo.label}</strong>.
                {dbInfo.persistent
                  ? " Dữ liệu còn sau khi tắt máy chủ."
                  : " Muốn giữ tài khoản khi host: điền databaseUrl Postgres trong akari-host.json, hoặc chạy start-akari.bat (tự lưu file SQL)."}
              </p>
              <p className="text-xs text-subtle">
                Tiến độ flashcard / SRS vẫn trên máy bạn (IndexedDB) để học offline.
              </p>
            </CardContent>
          </Card>
        ) : null}

        {user ? (
          <Card>
            <CardContent className="space-y-4">
              <h2 className="font-medium">Mật khẩu & khôi phục</h2>
              <p className="text-sm text-muted">
                App không gửi email. Mã khôi phục dùng khi quên mật khẩu trên trang đăng nhập.
                {hasCode ? " Bạn đã có mã — tạo mới sẽ hủy mã cũ." : " Bạn chưa có mã, hãy tạo ngay."}
              </p>
              {freshCode ? (
                <p className="rounded-[10px] border border-border bg-choice px-3 py-3 text-center font-mono text-lg tracking-wide">
                  {freshCode}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  disabled={codeBusy}
                  onClick={async () => {
                    setCodeBusy(true);
                    try {
                      const res = await issueRecoveryCode();
                      if (res.ok) {
                        setFreshCode(res.code);
                        setHasCode(true);
                        toast("Lưu mã này ngay — chỉ hiện một lần.");
                      } else toast.error(res.error);
                    } catch {
                      toast.error("Không tạo được mã. Đăng nhập lại rồi thử.");
                    } finally {
                      setCodeBusy(false);
                    }
                  }}
                >
                  {hasCode ? "Tạo mã mới" : "Tạo mã khôi phục"}
                </Button>
                {freshCode ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      void navigator.clipboard.writeText(freshCode).then(() => toast("Đã chép mã"));
                    }}
                  >
                    Chép mã
                  </Button>
                ) : null}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="cur-pass">Mật khẩu hiện tại</Label>
                  <Input
                    id="cur-pass"
                    type="password"
                    autoComplete="current-password"
                    value={curPass}
                    onChange={(e) => setCurPass(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="new-pass">Mật khẩu mới</Label>
                  <Input
                    id="new-pass"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <Button
                disabled={passBusy || curPass.length < 8 || newPass.length < 8}
                onClick={async () => {
                  setPassBusy(true);
                  try {
                    const res = await authClient.changePassword({
                      currentPassword: curPass,
                      newPassword: newPass,
                      revokeOtherSessions: true,
                    });
                    if (res.error) toast.error(res.error.message || "Không đổi được mật khẩu.");
                    else {
                      toast("Đã đổi mật khẩu");
                      setCurPass("");
                      setNewPass("");
                    }
                  } catch {
                    toast.error("Không đổi được mật khẩu.");
                  } finally {
                    setPassBusy(false);
                  }
                }}
              >
                Đổi mật khẩu
              </Button>
            </CardContent>
          </Card>
        ) : null}

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
            <h2 className="font-medium">AI gia sư</h2>
            <p className="text-sm text-muted">
              Tùy chọn. Học không cần AI. Ollama chạy trên máy host (cùng máy với Akari). Đám mây chỉ gọi khi bạn bấm hỏi.
            </p>
            <div className="flex flex-wrap gap-2">
              {([
                ["off", "Tắt"],
                ["local", "AI local"],
                ["cloud", "Đám mây"],
              ] as const).map(([id, label]) => (
                <Button
                  key={id}
                  size="sm"
                  variant={settings.aiMode === id ? "default" : "secondary"}
                  onClick={() => {
                    settings.set({ aiMode: id });
                    applyLocalAiFromSettings({ ...settings, aiMode: id });
                  }}
                >
                  {label}
                </Button>
              ))}
            </div>
            {settings.aiMode === "local" ? (
              <div className="space-y-3 rounded-[10px] border border-border bg-bg-elevated p-3">
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={settings.localAiKind === "ollama" ? "default" : "secondary"}
                    onClick={() => settings.set({ localAiKind: "ollama", localAiUrl: "http://localhost:11434" })}
                  >
                    Ollama
                  </Button>
                  <Button
                    size="sm"
                    variant={settings.localAiKind === "openai" ? "default" : "secondary"}
                    onClick={() => settings.set({ localAiKind: "openai", localAiUrl: "http://localhost:1234" })}
                  >
                    LM Studio
                  </Button>
                </div>
                <div>
                  <Label htmlFor="ai-url">URL máy chủ</Label>
                  <Input
                    id="ai-url"
                    className="mt-1"
                    value={settings.localAiUrl}
                    onChange={(e) => settings.set({ localAiUrl: e.target.value })}
                    placeholder="http://localhost:11434"
                  />
                </div>
                <div>
                  <Label htmlFor="ai-model">Model</Label>
                  <Input
                    id="ai-model"
                    className="mt-1"
                    value={settings.localAiModel}
                    onChange={(e) => settings.set({ localAiModel: e.target.value })}
                    placeholder="llama3.2"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Nhiệt độ: {(settings.localAiTemperature ?? 0.4).toFixed(1)}</Label>
                  <Slider
                    min={0}
                    max={1.2}
                    step={0.1}
                    value={[settings.localAiTemperature ?? 0.4]}
                    onValueChange={([v]) => settings.set({ localAiTemperature: v ?? 0.4 })}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Độ dài trả lời: {settings.localAiMaxTokens ?? 400} token</Label>
                  <Slider
                    min={120}
                    max={800}
                    step={40}
                    value={[settings.localAiMaxTokens ?? 400]}
                    onValueChange={([v]) => settings.set({ localAiMaxTokens: v ?? 400 })}
                  />
                </div>
                <div>
                  <Label htmlFor="ai-sys">Hướng dẫn hệ thống</Label>
                  <Textarea
                    id="ai-sys"
                    className="mt-1"
                    rows={3}
                    value={settings.localAiSystem}
                    onChange={(e) => settings.set({ localAiSystem: e.target.value })}
                  />
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={busy}
                  onClick={async () => {
                    applyLocalAiFromSettings(settings);
                    setBusy(true);
                    setAiProbe(null);
                    try {
                      const res = await probeLocalAi({
                        data: { url: settings.localAiUrl, kind: settings.localAiKind },
                      });
                      if (!res.ok) {
                        setAiModels([]);
                        setAiProbe(res.error);
                        toast.error(res.error);
                        return;
                      }
                      setAiModels(res.models);
                      const current = settings.localAiModel.replace(/:latest$/, "");
                      const match = res.models.find((m) => {
                        const id = m.replace(/:latest$/, "");
                        return id === current || m === settings.localAiModel || m.startsWith(`${current}:`);
                      });
                      if (!match && res.models[0]) {
                        const picked = res.models[0].replace(/:latest$/, "");
                        settings.set({ localAiModel: picked });
                        setAiProbe(`Kết nối được. Đã chọn model ${picked}.`);
                      } else {
                        setAiProbe(`Kết nối được · ${res.models.length} model.`);
                      }
                      toast.success("Kết nối Ollama được");
                    } catch {
                      setAiProbe("Không gọi được máy chủ Akari.");
                      toast.error("Không gọi được máy chủ Akari.");
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  Kiểm tra kết nối
                </Button>
                {aiProbe ? (
                  <p className={`text-sm ${aiProbe.startsWith("Kết nối") ? "text-muted" : "text-danger"}`}>{aiProbe}</p>
                ) : null}
                {aiModels.length ? (
                  <div className="flex flex-wrap gap-2">
                    {aiModels.map((m) => {
                      const short = m.replace(/:latest$/, "");
                      const active =
                        settings.localAiModel === m ||
                        settings.localAiModel === short ||
                        m.startsWith(`${settings.localAiModel}:`);
                      return (
                        <Button
                          key={m}
                          size="sm"
                          variant={active ? "default" : "secondary"}
                          onClick={() => settings.set({ localAiModel: short })}
                        >
                          {short}
                        </Button>
                      );
                    })}
                  </div>
                ) : null}
                <p className="text-xs text-subtle">
                  Akari gọi Ollama từ máy host (không cần CORS). Giữ URL{" "}
                  <code className="font-mono">http://localhost:11434</code>. Nếu chưa có model, mở CMD:{" "}
                  <code className="font-mono">ollama pull llama3.2</code>
                </p>
              </div>
            ) : null}
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
