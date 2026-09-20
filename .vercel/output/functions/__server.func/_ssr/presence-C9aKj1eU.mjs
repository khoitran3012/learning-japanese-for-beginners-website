import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-iW6MThKt.mjs";
import { t as authMiddleware } from "./middleware-CVirv4hv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/presence-C9aKj1eU.js
var heartbeatPresence_createServerFn_handler = createServerRpc({
	id: "55bde106b37f88219366398a62501124eea17a554b4108af3d819880cb4908c3",
	name: "heartbeatPresence",
	filename: "src/lib/akari/presence.ts"
}, (opts) => heartbeatPresence.__executeServer(opts));
var heartbeatPresence = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({ displayName: String(input?.displayName ?? "").trim().slice(0, 32) })).handler(heartbeatPresence_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	let name = data.displayName;
	if (!name) name = (await sql`
        select display_name from study_stats where user_id = ${context.userId} limit 1
      `)[0]?.display_name ?? "";
	if (!name) try {
		const { getSessionUser } = await import("./verify.server-TI2QFOGt.mjs");
		name = ((await getSessionUser())?.email || "").split("@")[0] ?? "";
	} catch {
		name = "";
	}
	name = (name || "Học viên").slice(0, 32);
	await sql`
      insert into user_presence (user_id, display_name, last_seen)
      values (${context.userId}, ${name}, now())
      on conflict (user_id) do update set
        display_name = excluded.display_name,
        last_seen = now()
    `;
	return { ok: true };
});
var listOnlineUsers_createServerFn_handler = createServerRpc({
	id: "c9030a61763885d9527112bfa9bafc3120bd6a4149b9c2ab840482b5e914bc2e",
	name: "listOnlineUsers",
	filename: "src/lib/akari/presence.ts"
}, (opts) => listOnlineUsers.__executeServer(opts));
var listOnlineUsers = createServerFn({ method: "GET" }).handler(listOnlineUsers_createServerFn_handler, async () => {
	return (await (await getSql())`
    select user_id, display_name
    from user_presence
    where last_seen > now() - interval '2 minutes'
    order by last_seen desc
    limit 40
  `).map((r) => ({
		userId: r.user_id,
		displayName: r.display_name || "Học viên"
	}));
});
//#endregion
export { heartbeatPresence_createServerFn_handler, listOnlineUsers_createServerFn_handler };
