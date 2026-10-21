import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-XG3oJXDV.mjs";
import { t as Button } from "./button-Dt7wwSQI.mjs";
import { F as Check, m as RotateCcw } from "../_libs/lucide-react.mjs";
import { a as useProgress } from "./progress-CIocZrv7.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/remember-actions-CfojlqmX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NOUN = {
	kana: "chữ này",
	kanji: "chữ này",
	radical: "bộ này",
	vocab: "từ này",
	grammar: "mẫu này",
	custom: "mục này"
};
function RememberActions({ id, itemType, className }) {
	const item = useProgress((s) => s.srs[id]);
	const remember = useProgress((s) => s.remember);
	const forgot = useProgress((s) => s.forgot);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const known = (item?.correct ?? 0) > 0;
	async function go(kind) {
		if (busy) return;
		setBusy(kind);
		try {
			if (kind === "remember") {
				await remember(id, itemType);
				toast.success("Đã nhớ — sẽ ôn lại sau");
			} else {
				await forgot(id, itemType);
				toast("Đánh dấu cần ôn");
			}
		} catch {
			toast.error("Không lưu được, thử lại");
		} finally {
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center gap-2", className),
		children: [item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs tabular-nums text-muted",
			children: [
				known ? "Đã nhớ" : "Đang học",
				" · đúng ",
				item.correct,
				" · sai ",
				item.incorrect
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted",
			children: ["Chưa đánh dấu ", NOUN[itemType]]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap justify-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "secondary",
				disabled: busy !== null,
				onClick: () => void go("forgot"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), " Cần ôn"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: known ? "success" : "default",
				disabled: busy !== null,
				onClick: () => void go("remember"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}),
					" ",
					known ? "Nhớ rồi" : "Đã nhớ"
				]
			})]
		})]
	});
}
/** Nút nhỏ trên danh sách. Không điều hướng khi bấm. */
function RememberMark({ id, itemType, label, className }) {
	const known = (useProgress((s) => s.srs[id])?.correct ?? 0) > 0;
	const remember = useProgress((s) => s.remember);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: cn("flex h-8 shrink-0 items-center justify-center gap-1 rounded-md px-2 text-[11px] font-medium", known ? "bg-success/15 text-success" : "bg-choice text-fg hover:bg-choice-hover", className),
		onClick: (e) => {
			e.preventDefault();
			e.stopPropagation();
			remember(id, itemType).then(() => toast.success(`Đã nhớ ${label}`));
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), known ? "Nhớ rồi" : "Đã nhớ"]
	});
}
//#endregion
export { RememberMark as n, RememberActions as t };
