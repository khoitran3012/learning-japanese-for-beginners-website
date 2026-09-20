import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-iW6MThKt.mjs";
import { t as hashPassword$1 } from "./password-VlpK0Xix.mjs";
import { t as authMiddleware } from "./middleware-CVirv4hv.mjs";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/recovery-1x54ZUs7.js
var ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function normalizeCode(code) {
	return code.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 24);
}
function hashCode(code) {
	return createHash("sha256").update(normalizeCode(code)).digest("hex");
}
function codesEqual(aHex, bHex) {
	try {
		const a = Buffer.from(aHex, "hex");
		const b = Buffer.from(bHex, "hex");
		if (a.length !== b.length || a.length === 0) return false;
		return timingSafeEqual(a, b);
	} catch {
		return false;
	}
}
function formatRecoveryCode(raw) {
	const n = normalizeCode(raw);
	return n.match(/.{1,4}/g)?.join("-") ?? n;
}
function mintCode() {
	const bytes = randomBytes(10);
	let out = "";
	for (const b of bytes) out += ALPHABET[b % 32];
	return formatRecoveryCode(out);
}
var attempts = globalThis.__akariResetAttempts__ ??= /* @__PURE__ */ new Map();
function rateLimited(key, max = 6, windowMs = 9e5) {
	const now = Date.now();
	const prev = attempts.get(key);
	if (!prev || prev.resetAt < now) {
		attempts.set(key, {
			n: 1,
			resetAt: now + windowMs
		});
		return false;
	}
	prev.n += 1;
	return prev.n > max;
}
var issueRecoveryCode_createServerFn_handler = createServerRpc({
	id: "51d9ca9a53678d60c1b6f5d349d4fefb496f76cd5130cd8b5e1047de33e6aa84",
	name: "issueRecoveryCode",
	filename: "src/lib/akari/recovery.ts"
}, (opts) => issueRecoveryCode.__executeServer(opts));
var issueRecoveryCode = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(issueRecoveryCode_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const email = ((await sql`
      select id, email from "user" where id = ${context.userId} limit 1
    `)[0]?.email || "").trim().toLowerCase();
	if (!email) return {
		ok: false,
		error: "Không tìm thấy email tài khoản."
	};
	const code = mintCode();
	const hashed = hashCode(code);
	await sql`
      insert into account_recovery (user_id, email, code_hash, created_at)
      values (${context.userId}, ${email}, ${hashed}, now())
      on conflict (user_id) do update set
        email = excluded.email,
        code_hash = excluded.code_hash,
        created_at = now()
    `;
	return {
		ok: true,
		code
	};
});
var hasRecoveryCode_createServerFn_handler = createServerRpc({
	id: "18b88fdf29efe8ab145f5423f9858321ca3d5e6aa4e8197c4f4643793ee75d4c",
	name: "hasRecoveryCode",
	filename: "src/lib/akari/recovery.ts"
}, (opts) => hasRecoveryCode.__executeServer(opts));
var hasRecoveryCode = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(hasRecoveryCode_createServerFn_handler, async ({ context }) => {
	return { has: ((await (await getSql())`
      select count(*)::int as n from account_recovery where user_id = ${context.userId}
    `)[0]?.n ?? 0) > 0 };
});
var resetPasswordWithCode_createServerFn_handler = createServerRpc({
	id: "e046a1145b847d24a1449d0654302e70d3a9b85f8c985368943b9b5688072825",
	name: "resetPasswordWithCode",
	filename: "src/lib/akari/recovery.ts"
}, (opts) => resetPasswordWithCode.__executeServer(opts));
var resetPasswordWithCode = createServerFn({ method: "POST" }).validator((input) => ({
	email: String(input.email ?? "").trim().toLowerCase().slice(0, 160),
	code: normalizeCode(String(input.code ?? "")),
	password: String(input.password ?? "")
})).handler(resetPasswordWithCode_createServerFn_handler, async ({ data }) => {
	const generic = "Email, mã khôi phục hoặc mật khẩu chưa đúng.";
	if (!data.email || !data.email.includes("@") || data.code.length < 8) return {
		ok: false,
		error: generic
	};
	if (data.password.length < 8) return {
		ok: false,
		error: "Mật khẩu mới cần tối thiểu 8 ký tự."
	};
	if (rateLimited(`reset:${data.email}`)) return {
		ok: false,
		error: "Thử lại sau vài phút."
	};
	const sql = await getSql();
	const user = (await sql`
      select id, email from "user" where lower(email) = ${data.email} limit 1
    `)[0];
	if (!user) return {
		ok: false,
		error: generic
	};
	const rec = await sql`
      select code_hash from account_recovery where user_id = ${user.id} limit 1
    `;
	if (!rec[0] || !codesEqual(rec[0].code_hash, hashCode(data.code))) return {
		ok: false,
		error: generic
	};
	if (!(await sql`
      select id from "account"
      where "userId" = ${user.id} and "providerId" = 'credential'
      limit 1
    `)[0]) return {
		ok: false,
		error: "Tài khoản này không dùng mật khẩu email."
	};
	await sql`
      update "account"
      set password = ${await hashPassword$1(data.password)}, "updatedAt" = now()
      where "userId" = ${user.id} and "providerId" = 'credential'
    `;
	await sql`delete from "session" where "userId" = ${user.id}`;
	return { ok: true };
});
//#endregion
export { hasRecoveryCode_createServerFn_handler, issueRecoveryCode_createServerFn_handler, resetPasswordWithCode_createServerFn_handler };
