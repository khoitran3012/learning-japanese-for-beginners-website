import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { B as ArrowRight, P as Check, R as BookOpen, y as Lock } from "../_libs/lucide-react.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-BQrBv4Tb.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { t as DynamicLink } from "./dynamic-link-DhvOmV8v.mjs";
import { n as primaryLessonHref } from "./lesson-links-DiU0qHPI.mjs";
import { t as Badge } from "./badge-Bh2m61F7.mjs";
import { a as journeyGroups, c as stageLabel, o as stageHint, s as stageKicker } from "./path-stages-Js0Sa0fT.mjs";
import { t as Label } from "./label-2T3zHwov.mjs";
import { t as Switch } from "./switch-DmPARbQm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/path.index-kAJeJ447.js
var import_jsx_runtime = require_jsx_runtime();
function focusBadge(focus) {
	if (!focus) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "muted",
		children: focus
	});
}
function Page() {
	const completed = useProgress((s) => s.completedLessonIds);
	const freeMode = useSettings((s) => s.freeMode);
	const set = useSettings((s) => s.set);
	const { sorted, groups } = journeyGroups();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "道",
			title: "Lộ trình học",
			description: "Cách lớp Việt hay đi: kana → nói & từ vựng → kanji kèm Hán-Việt → ngữ pháp → đọc nghe. Ba trụ cho người mới: từ vựng, nghe nói, kanji.",
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
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mb-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
			children: [
				"1. Hiragana + katakana — đọc được mới nghe nói được",
				"2. Nói & từ N5 — chào, số, nhà, trường, ăn, đi",
				"3. Kanji + Hán-Việt — nghĩa trước, on/kun sau",
				"4. Ngữ pháp, đọc, nghe N5 — nhét từ vào câu",
				"5. N4 cùng ba trụ: từ, nói, kanji",
				"6. N3 → N1 tự học với từ điển"
			].map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-muted",
				children: line
			}, line))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-8",
			children: groups.map((group) => {
				const items = group.items;
				const doneCount = items.filter((l) => completed.has(l.id)).length;
				const hint = stageHint(group.stage);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-3 flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
							children: stageKicker(group.stage)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold",
							children: stageLabel(group.stage)
						}),
						hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-xl text-sm text-muted",
							children: hint
						}) : null
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
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
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-subtle",
												children: l.level === "0" ? "Nhập môn" : l.level
											}), focusBadge(l.focus)]
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
				})] }, `${group.stage}-${items[0]?.id}`);
			})
		})
	] });
}
//#endregion
export { Page as component };
