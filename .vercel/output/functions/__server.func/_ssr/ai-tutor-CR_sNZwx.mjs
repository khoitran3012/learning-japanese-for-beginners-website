import { o as __toESM } from "../_runtime.mjs";
import { E as require_react, T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { u as Sparkles } from "../_libs/lucide-react.mjs";
import { n as getAI, t as applyLocalAiFromSettings } from "./provider-CilpJFiz.mjs";
import { u as createSsrRpc } from "./router-ChMDlQy1.mjs";
import { t as Textarea } from "./textarea-B3zn85Mz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-tutor-CR_sNZwx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var explainWithCloudAi = createServerFn({ method: "POST" }).validator((input) => ({ prompt: String(input?.prompt ?? "").trim().slice(0, 400) })).handler(createSsrRpc("0e02039674196d88cb90fa49b47588eb786be4a57942e856b79088eca09f634b"));
async function explainWithLocalAi(prompt, system) {
	const ai = getAI();
	if (!await ai.available()) return {
		ok: false,
		error: "Không kết nối được AI local. Kiểm tra URL trong Cài đặt."
	};
	try {
		return {
			ok: true,
			text: (await ai.explain(prompt, system)).text
		};
	} catch {
		return {
			ok: false,
			error: "AI local không phản hồi."
		};
	}
}
function AiTutor({ seed }) {
	const settings = useSettings();
	const [q, setQ] = (0, import_react.useState)("");
	const [text, setText] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (settings.aiMode === "off") return null;
	async function run() {
		const prompt = (q.trim() || seed).slice(0, 400);
		setBusy(true);
		setError(null);
		setText(null);
		try {
			if (settings.aiMode === "local") {
				applyLocalAiFromSettings(settings);
				const res = await explainWithLocalAi(prompt, settings.localAiSystem);
				if (!res.ok) setError(res.error);
				else setText(res.text);
			} else {
				const res = await explainWithCloudAi({ data: { prompt } });
				if (!res.ok) setError(res.error);
				else setText(res.text);
			}
		} catch {
			setError("Không hỏi được AI.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 rounded-xl border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Hỏi gia sư AI"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: settings.aiMode === "local" ? `Local · ${settings.localAiModel}` : "Đám mây · chỉ khi bạn bấm hỏi"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: seed,
				rows: 2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				disabled: busy,
				onClick: () => void run(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}),
					" ",
					busy ? "Đang nghĩ…" : "Hỏi"
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				children: error
			}) : null,
			text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap text-sm leading-relaxed text-muted",
				children: text
			}) : null
		]
	});
}
//#endregion
export { AiTutor as t };
