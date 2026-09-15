#!/usr/bin/env node

import { spawn } from "node:child_process";
import { readFileSync, realpathSync } from "node:fs";
import { constants as osConstants } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const APP_ENV_REL_PATH = ".grok/app-env.json";

const VITE_PREFIX = "VITE_";

export function parseAppEnv(text) {
  let parsed;

  try {
    parsed = JSON.parse(text);
  } catch {
    return {};
  }

  if (
    parsed === null ||
    typeof parsed !== "object" ||
    Array.isArray(parsed)
  ) {
    return {};
  }

  const env = {};

  for (const [key, value] of Object.entries(parsed)) {
    if (!key.startsWith(VITE_PREFIX)) continue;
    if (typeof value !== "string") continue;

    env[key] = value;
  }

  return env;
}

export function readAppEnv(root) {
  try {
    return parseAppEnv(
      readFileSync(
        join(root, APP_ENV_REL_PATH),
        "utf8"
      )
    );
  } catch {
    return {};
  }
}

export function mergeAppEnv(appEnv, processEnv) {
  return {
    ...appEnv,
    ...processEnv,
  };
}

export function exitStatusFromChild(code, signal) {
  if (signal) {
    const signo = osConstants.signals[signal];

    return 128 + (
      typeof signo === "number"
        ? signo
        : 1
    );
  }

  return code ?? 1;
}

export function projectRoot() {
  return dirname(
    dirname(
      fileURLToPath(import.meta.url)
    )
  );
}

export function isMainModule(moduleUrl) {
  const entry = process.argv[1];

  if (!entry) {
    return false;
  }

  try {
    return (
      realpathSync(entry) ===
      fileURLToPath(moduleUrl)
    );
  } catch {
    return false;
  }
}

function main(argv) {
  const [command, ...args] = argv;

  if (!command) {
    console.error(
      "usage: node scripts/with-app-env.mjs <command> [args…]"
    );

    process.exit(2);
  }

  const root = projectRoot();

  const env = mergeAppEnv(
    readAppEnv(root),
    process.env
  );

  let executable;
  let childArgs;

  /*
   * Windows + Vite:
   *
   * Không chạy:
   *   node_modules\.bin\vite.cmd
   *
   * vì child_process.spawn() có thể gây EINVAL
   * khi chạy trực tiếp Windows .cmd.
   *
   * Thay vào đó chạy:
   *   node vite/bin/vite.js
   */
  if (
    process.platform === "win32" &&
    command === "vite"
  ) {
    executable = process.execPath;

    const viteEntry = join(
      root,
      "node_modules",
      "vite",
      "bin",
      "vite.js"
    );

    childArgs = [
      viteEntry,
      ...args,
    ];
  } else {
    executable = command;
    childArgs = args;
  }

  console.log(
    `[with-app-env] platform=${process.platform}`
  );

  console.log(
    `[with-app-env] command=${command}`
  );

  console.log(
    `[with-app-env] executable=${executable}`
  );

  console.log(
    `[with-app-env] args=${childArgs.join(" ")}`
  );

  const child = spawn(
    executable,
    childArgs,
    {
      stdio: "inherit",
      env,
    }
  );

  for (const signal of [
    "SIGINT",
    "SIGTERM",
    "SIGHUP",
  ]) {
    process.on(signal, () => {
      child.kill(signal);
    });
  }

  child.on("error", (err) => {
    console.error(
      `[with-app-env] failed to run ${command}:`,
      err?.message || err
    );

    process.exit(127);
  });

  child.on("exit", (code, signal) => {
    process.exit(
      exitStatusFromChild(code, signal)
    );
  });
}

if (isMainModule(import.meta.url)) {
  main(process.argv.slice(2));
}