import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { t as SpeakButton } from "./speak-button-D1RceTHQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pronunciation-C-grmXdb.js
var import_jsx_runtime = require_jsx_runtime();
function Pronunciation({ kana, romaji, speak, label, large = false, className }) {
	const showRomaji = useSettings((s) => s.showRomaji);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center justify-between gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: label
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("font-jp leading-tight", large ? "text-2xl" : "text-lg"),
					children: kana
				}),
				showRomaji && romaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-accent",
					children: romaji
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
			text: speak || kana,
			label: "Nghe"
		})]
	});
}
//#endregion
export { Pronunciation as t };
