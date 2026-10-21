import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Y as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as HIRAGANA } from "./kana-CV-aAiLY.mjs";
import { d as Route$14 } from "./router-Dpb-YzpN.mjs";
import { t as StudyKana } from "./study-kana-DUoFrAVI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hiragana._id-vBK2AmA0.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { id } = Route$14.useParams();
	const idx = HIRAGANA.findIndex((k) => k.id === id);
	if (idx < 0) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyKana, {
		kind: "hiragana",
		current: HIRAGANA[idx],
		prev: HIRAGANA[idx - 1],
		next: HIRAGANA[idx + 1]
	});
}
//#endregion
export { Page as component };
