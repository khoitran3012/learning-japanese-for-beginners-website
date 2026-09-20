import { useEffect, useState } from "react";
import { heartbeatPresence, listOnlineUsers, type OnlineUser } from "@/lib/akari/presence";
import { useCurrentUser, useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

const PING_MS = 25_000;
const LIST_MS = 20_000;

export function PresenceHeartbeat() {
  const { user, isPending } = useCurrentUserState();

  useEffect(() => {
    if (isPending || !user) return;
    let cancelled = false;
    const ping = () => {
      void heartbeatPresence({ data: { displayName: user.displayName ?? undefined } }).catch(() => undefined);
    };
    ping();
    const id = window.setInterval(() => {
      if (!cancelled) ping();
    }, PING_MS);
    const onVis = () => {
      if (document.visibilityState === "visible") ping();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelled = true;
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [user, isPending]);

  return null;
}

export function useOnlineUsers() {
  const [users, setUsers] = useState<OnlineUser[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      void listOnlineUsers()
        .then((rows) => {
          if (!cancelled) setUsers(rows);
        })
        .catch(() => {
          if (!cancelled) setUsers([]);
        });
    };
    load();
    const id = window.setInterval(load, LIST_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return users;
}

export function OnlineUsersList({ compact = false }: { compact?: boolean }) {
  const users = useOnlineUsers();
  const me = useCurrentUser();
  if (!users.length) {
    if (compact) return null;
    return <p className="text-xs text-subtle">Chưa có ai đang online.</p>;
  }

  const shown = compact ? users.slice(0, 5) : users;
  return (
    <div>
      <p className={cn("mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-subtle", compact && "px-3")}>
        <span className="size-1.5 rounded-full bg-success" aria-hidden />
        {users.length} đang học
      </p>
      <ul className={cn("space-y-1", compact && "px-3")}>
        {shown.map((u) => {
          const you = Boolean(me && u.userId === me.id);
          return (
            <li key={u.userId} className="flex items-center gap-2 text-sm">
              <span className="size-1.5 shrink-0 rounded-full bg-success" aria-hidden />
              <span className="truncate">{u.displayName}</span>
              {you ? <span className="text-xs text-accent">bạn</span> : null}
            </li>
          );
        })}
      </ul>
      {compact && users.length > shown.length ? (
        <p className="mt-1 px-3 text-xs text-subtle">+{users.length - shown.length} người nữa</p>
      ) : null}
    </div>
  );
}
