import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { hashPassword } from "better-auth/crypto";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function normalizeCode(code: string) {
  return code.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 24);
}

function hashCode(code: string) {
  return createHash("sha256").update(normalizeCode(code)).digest("hex");
}

function codesEqual(aHex: string, bHex: string) {
  try {
    const a = Buffer.from(aHex, "hex");
    const b = Buffer.from(bHex, "hex");
    if (a.length !== b.length || a.length === 0) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function formatRecoveryCode(raw: string) {
  const n = normalizeCode(raw);
  return n.match(/.{1,4}/g)?.join("-") ?? n;
}

function mintCode() {
  const bytes = randomBytes(10);
  let out = "";
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length];
  return formatRecoveryCode(out);
}

const attempts = ((globalThis as typeof globalThis & {
  __akariResetAttempts__?: Map<string, { n: number; resetAt: number }>;
}).__akariResetAttempts__ ??= new Map());

function rateLimited(key: string, max = 6, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const prev = attempts.get(key);
  if (!prev || prev.resetAt < now) {
    attempts.set(key, { n: 1, resetAt: now + windowMs });
    return false;
  }
  prev.n += 1;
  return prev.n > max;
}

export const issueRecoveryCode = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const users = await sql<{ id: string; email: string }>`
      select id, email from "user" where id = ${context.userId} limit 1
    `;
    const email = (users[0]?.email || "").trim().toLowerCase();
    if (!email) return { ok: false as const, error: "Không tìm thấy email tài khoản." };
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
    return { ok: true as const, code };
  });

export const hasRecoveryCode = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ n: number }>`
      select count(*)::int as n from account_recovery where user_id = ${context.userId}
    `;
    return { has: (rows[0]?.n ?? 0) > 0 };
  });

export const resetPasswordWithCode = createServerFn({ method: "POST" })
  .validator((input: { email: string; code: string; password: string }) => ({
    email: String(input.email ?? "").trim().toLowerCase().slice(0, 160),
    code: normalizeCode(String(input.code ?? "")),
    password: String(input.password ?? ""),
  }))
  .handler(async ({ data }) => {
    const generic = "Email, mã khôi phục hoặc mật khẩu chưa đúng.";
    if (!data.email || !data.email.includes("@") || data.code.length < 8) {
      return { ok: false as const, error: generic };
    }
    if (data.password.length < 8) {
      return { ok: false as const, error: "Mật khẩu mới cần tối thiểu 8 ký tự." };
    }
    if (rateLimited(`reset:${data.email}`)) {
      return { ok: false as const, error: "Thử lại sau vài phút." };
    }

    const sql = await getSql();
    const users = await sql<{ id: string; email: string }>`
      select id, email from "user" where lower(email) = ${data.email} limit 1
    `;
    const user = users[0];
    if (!user) return { ok: false as const, error: generic };

    const rec = await sql<{ code_hash: string }>`
      select code_hash from account_recovery where user_id = ${user.id} limit 1
    `;
    if (!rec[0] || !codesEqual(rec[0].code_hash, hashCode(data.code))) {
      return { ok: false as const, error: generic };
    }

    const accounts = await sql<{ id: string }>`
      select id from "account"
      where "userId" = ${user.id} and "providerId" = 'credential'
      limit 1
    `;
    if (!accounts[0]) {
      return { ok: false as const, error: "Tài khoản này không dùng mật khẩu email." };
    }

    const hashed = await hashPassword(data.password);
    await sql`
      update "account"
      set password = ${hashed}, "updatedAt" = now()
      where "userId" = ${user.id} and "providerId" = 'credential'
    `;
    await sql`delete from "session" where "userId" = ${user.id}`;
    return { ok: true as const };
  });
