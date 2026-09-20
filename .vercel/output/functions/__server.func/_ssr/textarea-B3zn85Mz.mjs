import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/textarea-B3zn85Mz.js
var import_jsx_runtime = require_jsx_runtime();
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-32 w-full rounded-[10px] border border-border bg-bg-elevated px-3 py-2 text-sm text-fg placeholder:text-subtle", "transition-[border-color,box-shadow] duration-[var(--motion-quick)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
//#endregion
export { Textarea as t };
