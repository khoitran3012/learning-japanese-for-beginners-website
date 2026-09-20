import { r as createServerFn } from "./ssr.mjs";
import { u as createSsrRpc } from "./router-nloH8-FU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/local-rpc-DYkgSBBN.js
var probeLocalAi = createServerFn({ method: "POST" }).validator((input) => ({
	url: String(input?.url ?? "http://127.0.0.1:11434").slice(0, 120),
	kind: input?.kind === "openai" ? "openai" : "ollama"
})).handler(createSsrRpc("bb9e2c010310d8175a15df97f0940b9010672dd4e5c106219417511064d02c5a"));
var chatLocalAi = createServerFn({ method: "POST" }).validator((input) => ({
	prompt: String(input?.prompt ?? "").trim().slice(0, 400),
	url: String(input?.url ?? "http://127.0.0.1:11434").slice(0, 120),
	kind: input?.kind === "openai" ? "openai" : "ollama",
	model: String(input?.model ?? "llama3.2").trim().slice(0, 80) || "llama3.2",
	system: String(input?.system ?? "").slice(0, 800),
	temperature: Math.min(1.2, Math.max(0, Number(input?.temperature) || .4)),
	maxTokens: Math.min(800, Math.max(80, Math.floor(Number(input?.maxTokens) || 400)))
})).handler(createSsrRpc("feb02f3dbef43251966405dec073b6809ef0ab4d813e3ffa5ed3273786d166b3"));
//#endregion
export { probeLocalAi as n, chatLocalAi as t };
