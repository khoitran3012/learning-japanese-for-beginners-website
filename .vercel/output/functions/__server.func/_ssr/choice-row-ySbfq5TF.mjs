import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/choice-row-ySbfq5TF.js
var import_jsx_runtime = require_jsx_runtime();
function choiceState({ revealed, isAnswer, picked }) {
	if (!revealed) return "idle";
	if (isAnswer) return "correct";
	if (picked) return "wrong";
	return "revealed";
}
function ChoiceRow({ state = "idle", className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: cn("flex min-h-12 w-full items-center justify-start rounded-[10px] border px-4 py-3 text-left", "transition-colors duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:pointer-events-none disabled:opacity-100 active:scale-[0.99]", state === "idle" && "border-border bg-choice text-fg hover:bg-choice-hover", state === "correct" && "border-forest bg-mist text-fg", state === "wrong" && "border-seal bg-danger-soft text-fg", state === "revealed" && "border-border bg-bg-elevated text-muted", className),
		...props,
		children
	});
}
function ChoiceKana({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-jp text-base font-medium leading-snug text-fg",
		children
	});
}
function ChoiceRomaji({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-sm font-normal leading-snug text-muted",
		children
	});
}
//#endregion
export { choiceState as i, ChoiceRomaji as n, ChoiceRow as r, ChoiceKana as t };
