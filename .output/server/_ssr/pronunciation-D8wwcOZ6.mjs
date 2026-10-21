import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-XG3oJXDV.mjs";
import { n as useSettings } from "./settings-_aQHY0Mw.mjs";
import { t as SpeakButton } from "./speak-button-CukGzBix.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pronunciation-D8wwcOZ6.js
var import_jsx_runtime = require_jsx_runtime();
function Pronunciation({ kana, romaji, speak, label, large = false, className }) {
	const showRomaji = useSettings((s) => s.showRomaji);
	const spoken = speak || kana;
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
			text: spoken,
			kana: spoken,
			label: "Nghe"
		})]
	});
}
//#endregion
export { Pronunciation as t };
