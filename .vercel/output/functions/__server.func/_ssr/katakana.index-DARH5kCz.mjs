import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as KATAKANA } from "./kana-CV-aAiLY.mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { t as KanaChart } from "./kana-chart-CraCueJO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/katakana.index-DARH5kCz.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const first = KATAKANA[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "カタカナ",
		title: "Katakana",
		description: "Cùng hệ âm với hiragana, nét thẳng — dùng cho từ mượn, tên nước ngoài và nhấn mạnh.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/katakana/$id",
				params: { id: first.id },
				children: "Bắt đầu học"
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KanaChart, {
		kind: "katakana",
		chars: KATAKANA
	})] });
}
//#endregion
export { Page as component };
