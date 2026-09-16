import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { B as notFound, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as LESSONS } from "./lessons-C7yMsqVQ.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-De5Z2Iqg.mjs";
import { F as BookOpen, L as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { t as DynamicLink } from "./dynamic-link-CvxKwlbs.mjs";
import { t as lessonPracticeLinks } from "./lesson-links-D_7bi2YH.mjs";
import { r as Route$4 } from "./router-ClwOe2dp.mjs";
import { t as Badge } from "./badge-BjjZgNOo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/path._id-AoF_MEsV.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { id } = Route$4.useParams();
	const lesson = LESSONS.find((l) => l.id === id);
	if (!lesson) throw notFound();
	const complete = useProgress((s) => s.completeLesson);
	const done = useProgress((s) => s.completedLessonIds.has(id));
	const showRomaji = useSettings((s) => s.showRomaji);
	const next = LESSONS.filter((l) => l.order > lesson.order).sort((a, b) => a.order - b.order)[0];
	const practices = lessonPracticeLinks(lesson);
	const primary = practices[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: lesson.stage,
				title: lesson.title,
				description: lesson.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: lesson.level === "0" ? "Nhập môn" : lesson.level }), done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "success",
					children: "Đã hoàn thành"
				}) : null]
			}),
			primary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mb-4 border-primary/25 bg-bg-elevated",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.14em] text-subtle",
							children: "Chuyển tới bài học"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-medium",
							children: primary.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Mở phần luyện tương ứng với bài này."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DynamicLink, {
							to: primary.to,
							children: ["Vào bài học", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})
					})]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: lesson.sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: s.heading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: s.body
					}),
					s.jp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-jp text-2xl",
						children: [s.jp, showRomaji && s.romaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-3 text-base text-accent",
							children: s.romaji
						}) : null]
					}) : null
				] }) }, s.heading))
			}),
			practices.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: practices.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DynamicLink, {
						to: p.to,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {}), p.label]
					})
				}, p.to))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: [
					primary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DynamicLink, {
							to: primary.to,
							children: ["Vào bài học", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: done ? "secondary" : "success",
						onClick: () => void complete(lesson.id),
						children: done ? "Đã hoàn thành" : "Đánh dấu hoàn thành"
					}),
					next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/path/$id",
							params: { id: next.id },
							children: "Bài tiếp"
						})
					}) : null
				]
			})
		]
	});
}
//#endregion
export { Page as component };
