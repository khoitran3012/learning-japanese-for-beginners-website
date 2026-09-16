import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-8NRl5CDj.mjs";
import { t as LESSONS } from "./lessons-C7yMsqVQ.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { _ as Lock, j as Check } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-2T3zHwov.mjs";
import { t as Switch } from "./switch-BOp23DnP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/path.index-2qM0Bxrn.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const completed = useProgress((s) => s.completedLessonIds);
	const freeMode = useSettings((s) => s.freeMode);
	const set = useSettings((s) => s.set);
	const sorted = [...LESSONS].sort((a, b) => a.order - b.order);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "道",
		title: "Lộ trình học",
		description: "Từ số 0: làm quen → hiragana → katakana → từ vựng → ngữ pháp → kanji → đọc, nghe, quiz N5 rồi N4.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "free",
				children: "Chế độ tự do"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				id: "free",
				checked: freeMode,
				onCheckedChange: (v) => set({ freeMode: v })
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "space-y-2",
		children: sorted.map((l, i) => {
			const prevDone = i === 0 || completed.has(sorted[i - 1].id);
			const locked = !freeMode && !prevDone && !completed.has(l.id);
			const done = completed.has(l.id);
			const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3", locked && "opacity-50", done && "border-success/40"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 flex size-8 items-center justify-center rounded-full bg-bg-elevated text-xs tabular-nums",
					children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-success" }) : locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5" }) : l.order
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: l.stage
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: l.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: l.summary
					})
				] })]
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: locked ? inner : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/path/$id",
				params: { id: l.id },
				children: inner
			}) }, l.id);
		})
	})] });
}
//#endregion
export { Page as component };
