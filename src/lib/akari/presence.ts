import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export type OnlineUser = {
  userId: string;
  displayName: string;
  isYou?: boolean;
};

export const heartbeatPresence = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input?: { displayName?: string }) => ({
    displayName: String(input?.displayName ?? "").trim().slice(0, 32),
  }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    let name = data.displayName;
    if (!name) {
      const stats = await sql<{ display_name: string }>`
        select display_name from study_stats where user_id = ${context.userId} limit 1
      `;
      name = stats[0]?.display_name ?? "";
    }
    if (!name) {
      try {
        const { getSessionUser } = await import("@/lib/auth/verify.server");
        const u = await getSessionUser();
        name = (u?.email || "").split("@")[0] ?? "";
      } catch {
        name = "";
      }
    }
    name = (name || "Học viên").slice(0, 32);
    await sql`
      insert into user_presence (user_id, display_name, last_seen)
      values (${context.userId}, ${name}, now())
      on conflict (user_id) do update set
        display_name = excluded.display_name,
        last_seen = now()
    `;
    return { ok: true as const };
  });

export const listOnlineUsers = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<{ user_id: string; display_name: string }>`
    select user_id, display_name
    from user_presence
    where last_seen > now() - interval '2 minutes'
    order by last_seen desc
    limit 40
  `;
  return rows.map((r) => ({
    userId: r.user_id,
    displayName: r.display_name || "Học viên",
  })) satisfies OnlineUser[];
});
