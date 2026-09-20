#!/usr/bin/env node
/**
 * Nitro's Vercel bundle inlines @electric-sql/pglite but does not copy the
 * sibling wasm/data blobs that `new URL("./pglite.data", import.meta.url)`
 * expects next to electric-sql__pglite.mjs. Without them, `vite preview`
 * (and a cold Vercel instance using PGLite fallback) crashes on boot.
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "node_modules/@electric-sql/pglite/dist");
const files = ["pglite.data", "pglite.wasm", "initdb.wasm"];

function destDirs() {
  const out = [];
  const funcRoot = join(root, ".vercel/output/functions");
  if (!existsSync(funcRoot)) return out;
  for (const name of readdirSync(funcRoot)) {
    const libs = join(funcRoot, name, "_libs");
    if (existsSync(libs)) out.push(libs);
  }
  return out;
}

const dirs = destDirs();
if (!dirs.length) {
  console.log("[pglite-assets] no .vercel function _libs dir — skip");
  process.exit(0);
}

for (const dest of dirs) {
  mkdirSync(dest, { recursive: true });
  for (const file of files) {
    const from = join(srcDir, file);
    if (!existsSync(from)) {
      console.warn("[pglite-assets] missing", from);
      continue;
    }
    copyFileSync(from, join(dest, file));
  }
  console.log("[pglite-assets] copied wasm/data →", dest);
}
