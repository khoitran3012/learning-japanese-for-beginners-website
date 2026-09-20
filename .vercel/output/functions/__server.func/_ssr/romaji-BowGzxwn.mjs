import { o as __toESM } from "../_runtime.mjs";
import { E as require_react, T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as HIRAGANA } from "./kana-CV-aAiLY.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-DKGo45g_.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { r as normalizeRomaji } from "./romaji-BCVeKQ98.mjs";
import { t as Input } from "./input-qD8XPiq5.mjs";
import { t as SpeakButton } from "./speak-button-D1RceTHQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/romaji-BowGzxwn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var pool = HIRAGANA.filter((k) => k.group === "gojuon");
function Page() {
	const [mode, setMode] = (0, import_react.useState)("jp-ro");
	const [i, setI] = (0, import_react.useState)(0);
	const [typed, setTyped] = (0, import_react.useState)("");
	const [msg, setMsg] = (0, import_react.useState)(null);
	const remember = useProgress((s) => s.remember);
	const forgot = useProgress((s) => s.forgot);
	const showRomaji = useSettings((s) => s.showRomaji);
	const item = pool[i % pool.length];
	const prompt = (0, import_react.useMemo)(() => {
		if (mode === "jp-ro") return item.char;
		if (mode === "ro-jp") return item.romaji;
		return item.char;
	}, [item, mode]);
	function check() {
		if (mode === "ro-jp" ? typed.trim() === item.char : mode === "jp-vi" ? item.examples[0]?.vi.toLowerCase().includes(typed.trim().toLowerCase()) || typed.trim().length > 1 : normalizeRomaji(typed) === normalizeRomaji(item.romaji)) {
			setMsg("Đúng.");
			remember(item.id, "kana");
			setTyped("");
			setI((x) => x + 1);
		} else {
			setMsg(`Chưa đúng. Đáp án: ${mode === "ro-jp" ? item.char : item.romaji}`);
			forgot(item.id, "kana");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "ローマ字",
			title: "Romaji",
			description: "Luyện chuyển Nhật → Latin, Latin → Nhật. Hepburn: shi, chi, tsu, ou."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [
				["jp-ro", "Nhật → Romaji"],
				["ro-jp", "Romaji → Nhật"],
				["jp-vi", "Nhật → nghĩa"]
			].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: mode === id ? "default" : "secondary",
				onClick: () => setMode(id),
				children: label
			}, id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mx-auto max-w-lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col items-center py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-kana text-7xl",
						children: prompt
					}),
					showRomaji && mode !== "jp-ro" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: item.examples[0]?.vi
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
						className: "mt-4",
						text: item.char
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-6 flex w-full max-w-sm gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							check();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: typed,
							onChange: (e) => setTyped(e.target.value),
							placeholder: mode === "ro-jp" ? "Nhập chữ Nhật" : "Nhập đáp án",
							"aria-label": "Đáp án"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Kiểm tra"
						})]
					}),
					msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: msg
					}) : null
				]
			})
		})
	] });
}
//#endregion
export { Page as component };
