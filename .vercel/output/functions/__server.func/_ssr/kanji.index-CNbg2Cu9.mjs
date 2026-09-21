import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as kanjiLessonsFor, n as kanjiLessonById } from "./kanji-lessons-Bonc0FIc.mjs";
import { t as allKanji } from "./kanji-set-k3QBvSZq.mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { o as Route$9 } from "./router-sIrB-w_Z.mjs";
import { i as useProgress } from "./progress-BQrBv4Tb.mjs";
import { t as Input } from "./input-Blk7lEZJ.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { t as Badge } from "./badge-Bh2m61F7.mjs";
import { t as PagePager } from "./page-pager-BasewJ9L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kanji.index-CNbg2Cu9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE = 60;
function Page() {
	const { lesson: lessonParam } = Route$9.useSearch();
	const navigate = useNavigate();
	const selectedLesson = lessonParam ? kanjiLessonById(lessonParam) : void 0;
	const [q, setQ] = (0, import_react.useState)("");
	const [lv, setLv] = (0, import_react.useState)(selectedLesson?.level ?? "N5");
	const [page, setPage] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		if (selectedLesson) {
			setLv(selectedLesson.level);
			setPage(1);
		}
	}, [selectedLesson?.id, selectedLesson?.level]);
	const srs = useProgress((s) => s.srs);
	const all = (0, import_react.useMemo)(() => allKanji(), []);
	const lessons = kanjiLessonsFor(lv);
	const lessonChars = selectedLesson ? /* @__PURE__ */ new Set([...selectedLesson.chars]) : null;
	const list = all.filter((k) => {
		if (lv !== "all" && k.level !== lv) return false;
		if (lessonChars && !lessonChars.has(k.character)) return false;
		if (!q) return true;
		const s = q.toLowerCase();
		return k.character.includes(q) || k.han_viet.toLowerCase().includes(s) || k.meaning_vi.toLowerCase().includes(s) || k.onyomi.some((x) => x.toLowerCase().includes(s)) || k.kunyomi.some((x) => x.toLowerCase().includes(s)) || k.romaji.includes(s);
	});
	const pageCount = Math.max(1, Math.ceil(list.length / PAGE));
	const safe = Math.min(page, pageCount);
	const slice = list.slice((safe - 1) * PAGE, safe * PAGE);
	const learning = lv === "N5" || lv === "N4";
	function setLesson(id) {
		setPage(1);
		navigate({
			to: "/kanji",
			search: id ? { lesson: id } : {}
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "漢字",
			title: "Kanji",
			description: "Học theo bài N5–N4. N3–N1 đủ bộ để tra cứu — nghe cách đọc chuẩn từng âm."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => {
					setQ(e.target.value);
					setPage(1);
				},
				placeholder: "Tìm kanji, Hán-Việt, nghĩa, âm..."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					"N5",
					"N4",
					"N3",
					"N2",
					"N1",
					"all"
				].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setLv(x);
						setPage(1);
						setLesson(void 0);
					},
					className: cn("h-11 rounded-[10px] border px-3 text-sm", lv === x && !selectedLesson ? "border-primary bg-primary text-primary-fg" : "border-border"),
					children: x === "all" ? "Mọi cấp" : x
				}, x))
			})]
		}),
		lessons.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs uppercase tracking-[0.14em] text-subtle",
				children: learning ? "Bài học" : "Bài tra cứu"
			}), lessons.length > 12 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: "h-11 w-full rounded-[10px] border border-border bg-bg-elevated px-3 text-sm sm:max-w-md",
				value: selectedLesson?.id ?? "",
				onChange: (e) => {
					const id = e.target.value;
					if (!id) {
						setLesson(void 0);
						return;
					}
					const ls = kanjiLessonById(id);
					if (ls) setLv(ls.level);
					setLesson(id);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: "",
					children: ["Cả cấp ", lv === "all" ? "" : lv]
				}), lessons.map((ls) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: ls.id,
					children: [
						ls.title,
						" · ",
						ls.chars.length,
						" chữ"
					]
				}, ls.id))]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setLesson(void 0),
					className: cn("h-10 rounded-[10px] border px-3 text-sm", !selectedLesson ? "border-primary bg-primary text-primary-fg" : "border-border"),
					children: "Cả cấp"
				}), lessons.map((ls) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setLv(ls.level);
						setLesson(ls.id);
					},
					className: cn("h-10 max-w-full rounded-[10px] border px-3 text-sm", selectedLesson?.id === ls.id ? "border-primary bg-primary text-primary-fg" : "border-border"),
					children: [
						ls.title,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs opacity-70",
							children: ls.chars.length
						})
					]
				}, ls.id))]
			})]
		}) : null,
		selectedLesson ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-sm text-muted",
			children: selectedLesson.summary
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-subtle",
			children: [
				list.length,
				" chữ",
				learning ? " · học" : lv === "all" ? " · học + tra cứu" : " · tra cứu",
				selectedLesson ? ` · ${selectedLesson.title}` : ""
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6",
			children: slice.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/kanji/$id",
				params: { id: k.id },
				className: cn("flex flex-col items-center rounded-lg border border-border bg-surface p-3 hover:border-accent", srs[k.id]?.correct ? "border-success/40" : ""),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-kana text-4xl",
						children: k.character
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 text-xs font-medium",
						children: k.han_viet || k.meaning_vi
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "line-clamp-1 text-[11px] text-muted",
						children: k.meaning_vi
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "muted",
						className: "mt-1",
						children: k.level
					})
				]
			}, k.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePager, {
				page: safe,
				pageCount,
				onPage: setPage
			})
		})
	] });
}
//#endregion
export { Page as component };
