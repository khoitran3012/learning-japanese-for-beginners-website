import { o as __toESM } from "../_runtime.mjs";
import { E as require_react, T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dynamic-link-CvxKwlbs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Client-side link for runtime paths that are not a typed route literal. */
var DynamicLink = (0, import_react.forwardRef)(function DynamicLink({ to, className, children }, ref) {
	const router = useRouter();
	function go(e) {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
		e.preventDefault();
		router.navigate({ to });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		ref,
		href: to,
		className: cn(className),
		onClick: go,
		children
	});
});
//#endregion
export { DynamicLink as t };
