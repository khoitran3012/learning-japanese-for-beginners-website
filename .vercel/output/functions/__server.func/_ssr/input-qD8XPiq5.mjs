import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-qD8XPiq5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = (0, import_react.forwardRef)(function Input({ className, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		className: cn("flex h-11 w-full rounded-[10px] border border-border bg-bg-elevated px-3 text-sm text-fg placeholder:text-subtle", "transition-[border-color,box-shadow] duration-[var(--motion-quick)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
});
//#endregion
export { Input as t };
