#!/usr/bin/env node
/**
 * Windows / DDNS self-host launcher for Akari.
 *
 * Reads optional `akari-host.json` (never a .env file), sets:
 *   BETTER_AUTH_URL, BETTER_AUTH_SECRET, DATABASE_URL, AKARI_SELF_HOST,
 *   AKARI_INSECURE_COOKIES, AKARI_PGLITE_DIR
 * then starts the same command as `npm run dev` bound on 0.0.0.0:8080.
 *
 * Spawns `node.exe` + JS entry files only — Node 20+ on Windows throws
 * `spawn EINVAL` if you `spawn()` a `.cmd` (npm.cmd / vite.cmd) without a shell.
 *
 * Copy `akari-host.example.json` → `akari-host.json` and fill in your
 * public origin + optional Postgres URL.
 */
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { dirname, join, delimiter } from "node:path";
import { fileURLToPath } from "node:url";
import { execPath } from "node:process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const hostFile = join(root, "akari-host.json");
const dataDir = join(root, "data");
const secretFile = join(dataDir, "better-auth-secret");
const withAppEnv = join(root, "scripts", "with-app-env.mjs");
const viteJs = join(root, "node_modules", "vite", "bin", "vite.js");
const migrateJs = join(root, "scripts", "migrate.mjs");

function loadHostConfig() {
  const defaults = {
    publicOrigin: "http://khoitran3012.ddns.net:8080",
    databaseUrl: "",
    pgliteMemory: false,
  };
  if (!existsSync(hostFile)) return defaults;
  try {
    const parsed = JSON.parse(readFileSync(hostFile, "utf8"));
    if (!parsed || typeof parsed !== "object") return defaults;
    return {
      publicOrigin:
        typeof parsed.publicOrigin === "string" && parsed.publicOrigin.trim()
          ? parsed.publicOrigin.trim().replace(/\/+$/, "")
          : defaults.publicOrigin,
      databaseUrl:
        typeof parsed.databaseUrl === "string" ? parsed.databaseUrl.trim() : "",
      pgliteMemory: parsed.pgliteMemory === true,
    };
  } catch (err) {
    console.error("Không đọc được akari-host.json:", err instanceof Error ? err.message : err);
    return defaults;
  }
}

function ensureSecret() {
  mkdirSync(dataDir, { recursive: true });
  if (existsSync(secretFile)) {
    const existing = readFileSync(secretFile, "utf8").trim();
    if (existing.length >= 32) return existing;
  }
  const secret = randomBytes(32).toString("hex");
  writeFileSync(secretFile, secret, { encoding: "utf8", mode: 0o600 });
  return secret;
}

const config = loadHostConfig();
let origin;
try {
  origin = new URL(config.publicOrigin).origin;
} catch {
  origin = "http://khoitran3012.ddns.net:8080";
}
const httpPublic = origin.startsWith("http://") && !/localhost|127\.0\.0\.1/.test(origin);

const env = {
  ...process.env,
  PATH: join(root, "node_modules", ".bin") + delimiter + (process.env.PATH || ""),
  AKARI_SELF_HOST: "1",
  AKARI_PUBLIC_ORIGIN: origin,
  BETTER_AUTH_URL: origin,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || ensureSecret(),
  BETTER_AUTH_TRUSTED_ORIGINS: [
    origin,
    "http://khoitran3012.ddns.net",
    "http://khoitran3012.ddns.net:8080",
    "https://khoitran3012.ddns.net",
    "https://khoitran3012.ddns.net:8080",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
  ].join(","),
};

if (httpPublic) env.AKARI_INSECURE_COOKIES = "1";

if (config.databaseUrl) {
  env.DATABASE_URL = config.databaseUrl;
  console.log("  Database: PostgreSQL (DATABASE_URL)");
} else if (config.pgliteMemory === true) {
  env.AKARI_PGLITE_MEMORY = "1";
  console.log("  Database: PGLite in-memory (pgliteMemory: true)");
} else {
  const pgliteDir = join(dataDir, "pglite");
  mkdirSync(pgliteDir, { recursive: true });
  // POSIX slashes — PGLite WASM on Windows aborts on `D:\...` backslashes.
  env.AKARI_PGLITE_DIR = pgliteDir.replace(/\\/g, "/");
  console.log("  Database: PostgreSQL nhúng (PGLite) lưu tại data/pglite");
  console.log("            Muốn dùng Postgres riêng, điền databaseUrl trong akari-host.json");
}

const major = Number.parseInt(String(process.versions.node).split(".")[0] || "0", 10);
if (major >= 24) {
  console.log("  Lưu ý: Node " + process.version + " — nếu PGLite lỗi, cài Node 22 LTS (nodejs.org).");
}

console.log("");
console.log("  Akari self-host");
console.log("  Public:  " + origin);
console.log("  Local:   http://127.0.0.1:8080");
console.log("  Node:    " + process.version + "  " + execPath);
console.log("  Đăng nhập: email + mật khẩu (Google/X chỉ hoạt động trên bản Grok).");
if (httpPublic) {
  console.log("  Cookie HTTP: bật (domain chưa HTTPS).");
}
console.log("  Dừng: Ctrl+C");
console.log("");

function runNode(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(execPath, args, {
      cwd: root,
      env,
      stdio: "inherit",
      windowsHide: true,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code) reject(new Error("node " + args.join(" ") + " failed: " + code));
      else resolve();
    });
  });
}

if (!existsSync(viteJs)) {
  console.error("Chưa thấy Vite. Chạy lại start-akari.bat để npm install.");
  process.exit(1);
}

async function migrateIfNeeded() {
  if (!env.DATABASE_URL) return;
  await runNode([migrateJs]);
}

await migrateIfNeeded();

const child = spawn(
  execPath,
  [withAppEnv, execPath, viteJs, "dev", "--host", "0.0.0.0", "--port", "8080"],
  {
    cwd: root,
    env,
    stdio: "inherit",
    windowsHide: true,
  },
);
child.on("error", (err) => {
  console.error("Không chạy được máy chủ:", err instanceof Error ? err.message : err);
  process.exit(1);
});
child.on("exit", (code) => process.exit(code ?? 0));
