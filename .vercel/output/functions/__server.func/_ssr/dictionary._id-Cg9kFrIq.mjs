import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dictionary._id-Cg9kFrIq.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "space-y-3",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Không tìm thấy mục từ này."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		variant: "secondary",
		size: "sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/dictionary",
			children: "← Về từ điển"
		})
	})]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
