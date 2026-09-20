import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { B as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as HIRAGANA } from "./kana-CV-aAiLY.mjs";
import { o as Route$10 } from "./router-C92aJlrP.mjs";
import { t as StudyKana } from "./study-kana-DjBl2TgO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hiragana._id-DNJkarKO.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { id } = Route$10.useParams();
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
