import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { B as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as KATAKANA } from "./kana-CV-aAiLY.mjs";
import { i as Route$6 } from "./router-sIrB-w_Z.mjs";
import { t as StudyKana } from "./study-kana-Cmo60a0U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/katakana._id-CYZFPeBo.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { id } = Route$6.useParams();
	const idx = KATAKANA.findIndex((k) => k.id === id);
	if (idx < 0) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyKana, {
		kind: "katakana",
		current: KATAKANA[idx],
		prev: KATAKANA[idx - 1],
		next: KATAKANA[idx + 1]
	});
}
//#endregion
export { Page as component };
