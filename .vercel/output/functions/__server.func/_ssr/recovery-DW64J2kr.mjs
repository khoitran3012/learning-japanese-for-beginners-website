import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-CVirv4hv.mjs";
import { u as createSsrRpc } from "./router-nloH8-FU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recovery-DW64J2kr.js
function normalizeCode(code) {
	return code.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 24);
}
var issueRecoveryCode = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("51d9ca9a53678d60c1b6f5d349d4fefb496f76cd5130cd8b5e1047de33e6aa84"));
var hasRecoveryCode = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("18b88fdf29efe8ab145f5423f9858321ca3d5e6aa4e8197c4f4643793ee75d4c"));
var resetPasswordWithCode = createServerFn({ method: "POST" }).validator((input) => ({
	email: String(input.email ?? "").trim().toLowerCase().slice(0, 160),
	code: normalizeCode(String(input.code ?? "")),
	password: String(input.password ?? "")
})).handler(createSsrRpc("e046a1145b847d24a1449d0654302e70d3a9b85f8c985368943b9b5688072825"));
//#endregion
export { issueRecoveryCode as n, resetPasswordWithCode as r, hasRecoveryCode as t };
