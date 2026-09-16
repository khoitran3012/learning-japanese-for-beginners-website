import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { B as notFound, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-8NRl5CDj.mjs";
import { t as LESSONS } from "./lessons-C7yMsqVQ.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { r as Route$4 } from "./router-CdBadYz-.mjs";
import { t as Badge } from "./badge-BjjZgNOo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/path._id-CcfDXEwX.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { id } = Route$4.useParams();
	const lesson = LESSONS.find((l) => l.id === id);
	if (!lesson) throw notFound();
	const complete = useProgress((s) => s.completeLesson);
	const done = useProgress((s) => s.completedLessonIds.has(id));
	const showRomaji = useSettings((s) => s.showRomaji);
	const next = LESSONS.filter((l) => l.order > lesson.order).sort((a, b) => a.order - b.order)[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: lesson.stage,
				title: lesson.title,
				description: lesson.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				className: "mb-4",
				children: lesson.level === "0" ? "Nhập môn" : lesson.level
			}),
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: done ? "secondary" : "success",
					onClick: () => void complete(lesson.id),
					children: done ? "Đã hoàn thành" : "Đánh dấu hoàn thành"
				}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/path/$id",
						params: { id: next.id },
						children: "Bài tiếp"
					})
				}) : null]
			})
		]
	});
}
//#endregion
export { Page as component };
