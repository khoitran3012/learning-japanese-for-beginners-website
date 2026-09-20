import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/db-info-DwSg--Cb.js
var getDbInfo_createServerFn_handler = createServerRpc({
	id: "58bdad00eee37171961c843a0827de66cd01626ae7d9941befbc9456f3a03222",
	name: "getDbInfo",
	filename: "src/lib/akari/db-info.ts"
}, (opts) => getDbInfo.__executeServer(opts));
var getDbInfo = createServerFn({ method: "GET" }).handler(getDbInfo_createServerFn_handler, async () => {
	if (process.env.DATABASE_URL?.trim()) return {
		engine: "postgres",
		persistent: true,
		label: "PostgreSQL (SQL)"
	};
	if (process.env.AKARI_PGLITE_DIR?.trim()) return {
		engine: "pglite",
		persistent: true,
		label: "PostgreSQL nhúng (SQL, lưu file)"
	};
	return {
		engine: "pglite",
		persistent: false,
		label: "PostgreSQL nhúng (SQL, bộ nhớ — mất khi tắt máy chủ)"
	};
});
//#endregion
export { getDbInfo_createServerFn_handler };
