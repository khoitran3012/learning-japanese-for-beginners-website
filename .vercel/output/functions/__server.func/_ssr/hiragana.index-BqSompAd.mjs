import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as HIRAGANA } from "./kana-CV-aAiLY.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { t as KanaChart } from "./kana-chart-BYGW2otR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hiragana.index-BqSompAd.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const first = HIRAGANA[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "五十音",
		title: "Hiragana",
		description: "Bảng chữ mềm, dùng cho ngữ pháp và từ thuần Nhật. Bấm một chữ để học nét, nghe và ví dụ.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/hiragana/$id",
				params: { id: first.id },
				children: "Bắt đầu học"
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KanaChart, {
		kind: "hiragana",
		chars: HIRAGANA
	})] });
}
//#endregion
export { Page as component };
