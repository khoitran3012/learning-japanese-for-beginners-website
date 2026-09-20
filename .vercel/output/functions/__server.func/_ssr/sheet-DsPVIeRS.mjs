import { E as require_jsx_runtime, d as DialogClose, f as DialogContent, g as DialogTitle, h as DialogPortal, m as DialogOverlay, u as Dialog } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sheet-DsPVIeRS.js
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
function SheetContent({ className, children, side = "left", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 bg-surface text-fg shadow-[var(--shadow-soft)]", side === "left" && "inset-y-0 left-0 h-full w-[min(20rem,88vw)] border-r border-border", side === "right" && "inset-y-0 right-0 h-full w-[min(20rem,88vw)] border-l border-border", side === "bottom" && "inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl border-t border-border", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-3 top-3 rounded-sm p-1 text-muted hover:bg-bg-elevated",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Đóng"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("p-5 pb-2", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("text-base font-semibold", className),
		...props
	});
}
//#endregion
export { SheetTitle as i, SheetContent as n, SheetHeader as r, Sheet as t };
