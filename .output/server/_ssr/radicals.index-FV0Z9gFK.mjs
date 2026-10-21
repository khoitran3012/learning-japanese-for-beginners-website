import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as RADICAL_LESSONS, n as RADICALS, o as learnRadicals, r as RADICAL_GROUPS, s as radicalById } from "./radicals-BsxpUXhx.mjs";
import { r as foldVi } from "./text-Kuvw8qUk.mjs";
import { t as cn } from "./utils-XG3oJXDV.mjs";
import { t as Button } from "./button-Dt7wwSQI.mjs";
import { a as Route$7 } from "./router-Dpb-YzpN.mjs";
import { a as useProgress } from "./progress-CIocZrv7.mjs";
import { t as Input } from "./input-BD95aU7I.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { n as CardContent, t as Card } from "./card-D1pZ1BiI.mjs";
import { n as RememberMark } from "./remember-actions-CfojlqmX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/radicals.index-FV0Z9gFK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function matches(r, q) {
	if (!q) return true;
	const s = foldVi(q);
	return r.char.includes(q) || r.parent && r.parent.includes(q) || r.variants.some((v) => v.includes(q)) || foldVi(r.han_viet).includes(s) || foldVi(r.meaning_vi).includes(s) || foldVi(r.name_jp).includes(s) || r.name_kana.includes(q) || r.examples.includes(q);
}
function Page() {
	const { lesson } = Route$7.useSearch();
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("hoc");
	const srs = useProgress((s) => s.srs);
	const selected = lesson ? RADICAL_LESSONS.find((x) => x.id === lesson) : void 0;
	const list = (0, import_react.useMemo)(() => {
		let pool = selected ? selected.ids.map(radicalById).filter((x) => Boolean(x)) : filter === "hoc" ? learnRadicals() : filter === "all" ? RADICALS : filter === "nen-tang" || filter === "n5" || filter === "n4" || filter === "tra-cuu" ? RADICALS.filter((x) => x.stage === filter) : RADICALS.filter((x) => x.group === filter);
		if (q.trim()) pool = (selected ? RADICALS : pool).filter((x) => matches(x, q.trim()));
		return pool;
	}, [
		filter,
		q,
		selected
	]);
	const first = list[0] ?? learnRadicals()[0];
	const learned = list.filter((x) => srs[x.id]?.correct).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "部首",
			title: "Bộ thủ",
			description: "Phần chữ lặp lại trong kanji. Học biến thể (氵亻扌) trước — nhìn bộ là đoán được nghĩa.",
			actions: first ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/radicals/$id",
					params: { id: first.id },
					children: "Bắt đầu học"
				})
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-2 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium text-fg",
					children: "Cách học bộ thủ khi mới bắt đầu"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "space-y-2 text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-fg",
							children: "1. Học biến thể trước, không học 214 bộ Kangxi."
						}), " Người mới chỉ cần khoảng 30 bộ hay gặp: 氵 nước, 亻 người, 扌 tay, 口 miệng, 木 cây, 日 mặt trời."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-fg",
							children: "2. Gắn một nghĩa ngắn."
						}), " Thấy 氵 nghĩ “có nước”. 海 biển, 池 ao, 酒 rượu. Không cần nhớ hết chữ, chỉ nhớ bộ báo nghĩa gì."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-fg",
							children: "3. Nhìn vị trí."
						}), " Bên trái (へん) thường là nghĩa. Bên phải (つくり) thường gợi âm on. Trên đầu (かんむり) như 艹 cỏ, 宀 mái nhà."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-fg",
							children: "4. Học kèm 2 chữ thật."
						}), " Mỗi bộ bấm vào, xem 2 kanji ví dụ, đọc Hán-Việt rồi hiragana. Bộ không sống một mình."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-fg",
							children: "5. Ôn ít, đều."
						}), " Mỗi ngày 5 bộ ở mục “Học trước”. Đánh “đã nhớ” khi nhìn bộ là nói được nghĩa."] })
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs uppercase tracking-[0.14em] text-subtle",
				children: "Bài học"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setFilter("hoc");
						navigate({
							to: "/radicals",
							search: {}
						});
					},
					className: cn("h-10 rounded-[10px] border px-3 text-sm", !selected && filter === "hoc" ? "border-primary bg-primary text-primary-fg" : "border-border"),
					children: "Học trước"
				}), RADICAL_LESSONS.map((ls, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => void navigate({
						to: "/radicals",
						search: { lesson: ls.id }
					}),
					className: cn("h-10 rounded-[10px] border px-3 text-sm", selected?.id === ls.id ? "border-primary bg-primary text-primary-fg" : "border-border"),
					children: [
						i + 1,
						". ",
						ls.title
					]
				}, ls.id))]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Tìm bộ, Hán-Việt, さんずい, kanji…"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [[
				["hoc", "Cần học"],
				["nen-tang", "Nền tảng"],
				["n5", "N5"],
				["n4", "N4"],
				["all", "Tất cả"]
			].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setFilter(id);
					navigate({
						to: "/radicals",
						search: {}
					});
				},
				className: cn("h-9 rounded-full border px-3 text-xs", !selected && filter === id ? "border-primary bg-primary text-primary-fg" : "border-border text-muted"),
				children: label
			}, id)), RADICAL_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setFilter(g);
					navigate({
						to: "/radicals",
						search: {}
					});
				},
				className: cn("h-9 rounded-full border px-3 text-xs", !selected && filter === g ? "border-primary bg-primary text-primary-fg" : "border-border text-muted"),
				children: g
			}, g))]
		}),
		selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-sm text-muted",
			children: selected.summary
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-subtle",
			children: [
				list.length,
				" bộ",
				learned ? ` · đã nhớ ${learned}` : "",
				selected ? ` · ${selected.title}` : ""
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6",
			children: list.map((x) => {
				const known = Boolean(srs[x.id]?.correct);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("relative flex flex-col rounded-lg border border-border bg-surface", known && "border-success/40"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/radicals/$id",
						params: { id: x.id },
						className: "flex flex-col items-center p-3 pb-10 hover:border-accent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-kana text-4xl leading-none",
								children: x.char
							}),
							x.parent && x.parent !== x.char ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-1 font-jp text-xs text-muted",
								children: ["← ", x.parent]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 text-xs font-medium",
								children: x.han_viet
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "line-clamp-1 text-[11px] text-muted",
								children: x.meaning_vi
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 font-jp text-[11px] text-subtle",
								children: x.name_kana
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RememberMark, {
						className: "absolute inset-x-1 bottom-1",
						id: x.id,
						itemType: "radical",
						label: x.char
					})]
				}, x.id);
			})
		}),
		list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Không thấy bộ thủ khớp. Thử Hán-Việt hoặc tên Nhật (さんずい)."
		}) : null
	] });
}
//#endregion
export { Page as component };
