import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as LESSONS } from "./lessons-C7yMsqVQ.mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-DKGo45g_.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { t as DynamicLink } from "./dynamic-link-CvxKwlbs.mjs";
import { n as primaryLessonHref } from "./lesson-links-Bk0snfip.mjs";
import { B as ArrowRight, P as Check, R as BookOpen, y as Lock } from "../_libs/lucide-react.mjs";
import { n as PATH_STAGES } from "./path-stages-CqTH9evT.mjs";
import { t as Label } from "./label-2T3zHwov.mjs";
import { t as Switch } from "./switch-BOp23DnP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/path.index-C4zXhlab.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const completed = useProgress((s) => s.completedLessonIds);
	const freeMode = useSettings((s) => s.freeMode);
	const set = useSettings((s) => s.set);
	const sorted = [...LESSONS].sort((a, b) => a.order - b.order);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "道",
		title: "Lộ trình học",
		description: "Từ số 0: làm quen → hiragana → katakana → từ vựng → ngữ pháp → kanji → đọc, nghe, quiz N5 rồi N4. Bấm Vào bài học để chuyển thẳng tới phần luyện.",
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
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-8",
		children: PATH_STAGES.map((stage) => {
			const items = sorted.filter((l) => l.stage === stage.id);
			if (items.length === 0) return null;
			const doneCount = items.filter((l) => completed.has(l.id)).length;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-3 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
					children: stage.kicker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: stage.label
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm tabular-nums text-muted",
					children: [
						doneCount,
						"/",
						items.length
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-2",
				children: items.map((l) => {
					const idx = sorted.findIndex((x) => x.id === l.id);
					const prevDone = idx === 0 || completed.has(sorted[idx - 1].id);
					const locked = !freeMode && !prevDone && !completed.has(l.id);
					const done = completed.has(l.id);
					const practiceTo = primaryLessonHref(l);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex flex-col gap-3 rounded-xl border border-border bg-surface px-4 py-3 sm:flex-row sm:items-center", locked && "opacity-55", done && "border-success/40"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-1 items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-xs tabular-nums",
								children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-success" }) : locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5" }) : l.order
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-subtle",
										children: l.level === "0" ? "Nhập môn" : l.level
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-medium",
										children: l.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: l.summary
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2 sm:shrink-0",
							children: locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								disabled: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }), "Chưa mở"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DynamicLink, {
									to: practiceTo,
									children: ["Vào bài học", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DynamicLink, {
									to: `/path/${l.id}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {}), "Đọc bài"]
								})
							})] })
						})]
					}) }, l.id);
				})
			})] }, stage.id);
		})
	})] });
}
//#endregion
export { Page as component };
