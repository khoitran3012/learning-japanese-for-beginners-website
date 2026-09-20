import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthSlot } from "@/components/auth-slot";
import { OnlineUsersList, PresenceHeartbeat } from "@/components/online-users";
import { MOBILE_TAB, NAV } from "@/lib/akari/nav";
import { initSettingsDom, useSettings } from "@/lib/akari/settings";
import { useProgress } from "@/lib/akari/progress";
import { applyLocalAiFromSettings } from "@/lib/ai/provider";
import { cn } from "@/lib/utils";
import { SearchDialog } from "@/components/search-dialog";
import "@/lib/api/api-client";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const groups = useMemo(() => {
    const map = new Map<string, typeof NAV>();
    for (const item of NAV) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return [...map.entries()];
  }, []);

  return (
    <nav className="flex flex-col gap-5" aria-label="Điều hướng chính">
      {groups.map(([group, items]) => (
        <div key={group}>
          <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            {group}
          </p>
          <ul className="space-y-0.5">
            {items.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    className={cn(
                      "flex h-10 items-center gap-2.5 rounded-[10px] px-3 text-sm transition-colors",
                      active
                        ? "bg-primary text-primary-fg"
                        : "text-muted hover:bg-bg-elevated hover:text-fg",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const load = useProgress((s) => s.load);
  const applyDom = useSettings((s) => s.applyDom);
  const theme = useSettings((s) => s.theme);
  const aiMode = useSettings((s) => s.aiMode);
  const localAiUrl = useSettings((s) => s.localAiUrl);
  const localAiModel = useSettings((s) => s.localAiModel);
  const localAiKind = useSettings((s) => s.localAiKind);
  const localAiSystem = useSettings((s) => s.localAiSystem);
  const localAiTemperature = useSettings((s) => s.localAiTemperature);
  const localAiMaxTokens = useSettings((s) => s.localAiMaxTokens);

  useEffect(() => {
    initSettingsDom();
    applyDom();
    void load();
    void import("@/lib/dictionary/catalog").then((m) => m.fullDictionary());
  }, [applyDom, load]);

  useEffect(() => {
    applyLocalAiFromSettings({
      aiMode,
      localAiUrl,
      localAiModel,
      localAiKind,
      localAiSystem,
      localAiTemperature,
      localAiMaxTokens,
    });
  }, [aiMode, localAiUrl, localAiModel, localAiKind, localAiSystem, localAiTemperature, localAiMaxTokens]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <TooltipProvider>
      <div className="min-h-dvh bg-bg text-fg">
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 overflow-y-auto border-r border-border bg-bg-elevated/80 px-3 py-5 backdrop-blur-sm lg:flex lg:flex-col">
          <Link to="/" className="mb-4 flex items-center gap-2.5 px-2">
            <span className="flex size-9 items-center justify-center rounded-[10px] bg-primary font-jp text-lg text-primary-fg">
              明
            </span>
            <span>
              <span className="block text-sm font-semibold leading-tight">Akari</span>
              <span className="block text-[11px] text-muted">Học tiếng Nhật</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setSearch(true)}
            className="mb-5 flex h-10 w-full items-center gap-2 rounded-[10px] border border-border bg-choice px-3 text-sm text-muted"
          >
            <Search className="size-4" />
            <span className="flex-1 text-left">Tìm kiếm</span>
            <kbd className="rounded border border-border px-1.5 text-[10px]">⌘K</kbd>
          </button>
          <NavLinks />
          <div className="mt-6">
            <OnlineUsersList compact />
          </div>
          <div className="mt-auto border-t border-border px-1 pt-4">
            <AuthSlot />
          </div>
        </aside>

        <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border bg-bg/90 px-3 backdrop-blur-sm lg:hidden">
          <Button variant="ghost" size="icon-sm" aria-label="Mở menu" onClick={() => setOpen(true)}>
            <Menu />
          </Button>
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary font-jp text-primary-fg">
              明
            </span>
            Akari
          </Link>
          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Tìm kiếm"
              onClick={() => setSearch(true)}
            >
              <Search />
            </Button>
            <AuthSlot compact />
          </div>
        </header>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Akari</SheetTitle>
            </SheetHeader>
            <div className="px-2 pb-8">
              <NavLinks onNavigate={() => setOpen(false)} />
              <div className="mt-6 px-1">
                <OnlineUsersList />
              </div>
              <div className="mt-6 px-1">
                <AuthSlot />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <main className="px-4 pb-24 pt-6 lg:ml-60 lg:px-10 lg:pb-12 lg:pt-8">
          <div key={pathname} className="akari-rise mx-auto w-full max-w-5xl">
            {children}
          </div>
        </main>

        <nav
          className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-border bg-surface/95 px-1 py-1 backdrop-blur-sm lg:hidden"
          style={{ paddingBottom: "max(0.35rem, env(safe-area-inset-bottom))" }}
          aria-label="Thanh điều hướng"
        >
          {MOBILE_TAB.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-md text-[10px]",
                  active ? "text-primary" : "text-muted",
                )}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <SearchDialog open={search} onOpenChange={setSearch} />
        <PresenceHeartbeat />
        <Toaster theme={theme === "dark" ? "dark" : theme === "light" ? "light" : "system"} position="bottom-center" />
      </div>
    </TooltipProvider>
  );
}
