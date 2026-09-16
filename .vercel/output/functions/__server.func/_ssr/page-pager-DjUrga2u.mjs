import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { A as ChevronLeft, k as ChevronRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-pager-DjUrga2u.js
var import_jsx_runtime = require_jsx_runtime();
function PagePager({ page, pageCount, onPage, className }) {
	if (pageCount <= 1) return null;
	const windowed = pageWindow(page, pageCount);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: cn("flex flex-wrap items-center justify-center gap-1", className),
		"aria-label": "Phân trang",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				variant: "secondary",
				disabled: page <= 1,
				onClick: () => onPage(page - 1),
				"aria-label": "Trang trước",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
			}),
			windowed.map((p, i) => p === "…" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "px-1 text-sm text-subtle",
				children: "…"
			}, `e${i}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				variant: p === page ? "default" : "secondary",
				className: "min-w-10 tabular-nums",
				onClick: () => onPage(p),
				"aria-current": p === page ? "page" : void 0,
				children: p
			}, p)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				variant: "secondary",
				disabled: page >= pageCount,
				onClick: () => onPage(page + 1),
				"aria-label": "Trang sau",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
			})
		]
	});
}
function pageWindow(page, pageCount) {
	if (pageCount <= 9) return Array.from({ length: pageCount }, (_, i) => i + 1);
	const nums = [.../* @__PURE__ */ new Set([
		1,
		2,
		pageCount - 1,
		pageCount,
		page - 1,
		page,
		page + 1
	])].filter((n) => n >= 1 && n <= pageCount).sort((a, b) => a - b);
	const out = [];
	for (let i = 0; i < nums.length; i++) {
		const n = nums[i];
		if (i > 0 && n - nums[i - 1] > 1) out.push("…");
		out.push(n);
	}
	return out;
}
//#endregion
export { PagePager as t };
