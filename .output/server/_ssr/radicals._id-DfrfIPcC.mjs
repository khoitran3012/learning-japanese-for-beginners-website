import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Y as notFound, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as kanaToRomaji } from "./kana-util-DgSJpVDG.mjs";
import { i as kanjiByChar } from "./kanji-set-B5ykdYH_.mjs";
import { a as kanjiCharsFor, c as radicalNeighbors, i as RADICAL_LESSONS, o as learnRadicals, s as radicalById, t as POS_VI } from "./radicals-BsxpUXhx.mjs";
import { t as Button } from "./button-Dt7wwSQI.mjs";
import { N as ChevronRight, P as ChevronLeft } from "../_libs/lucide-react.mjs";
import { i as Route$6 } from "./router-Dpb-YzpN.mjs";
import { n as useSettings } from "./settings-_aQHY0Mw.mjs";
import { n as CardContent, t as Card } from "./card-D1pZ1BiI.mjs";
import { t as SpeakButton } from "./speak-button-CukGzBix.mjs";
import { t as Badge } from "./badge-BshL6Y_S.mjs";
import { t as RememberActions } from "./remember-actions-CfojlqmX.mjs";
import { n as WriteCanvas, t as StrokeOrder } from "./stroke-order-BFqXGMg3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/radicals._id-DfrfIPcC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SLOT = {
	hen: {
		where: "bên trái",
		place: "left-2 top-1/2 -translate-y-1/2"
	},
	tsukuri: {
		where: "bên phải",
		place: "right-2 top-1/2 -translate-y-1/2"
	},
	kanmuri: {
		where: "phía trên",
		place: "top-2 left-1/2 -translate-x-1/2"
	},
	ashi: {
		where: "phía dưới",
		place: "bottom-2 left-1/2 -translate-x-1/2"
	},
	tare: {
		where: "phủ từ trên",
		place: "left-2 top-2"
	},
	nyou: {
		where: "quặp dưới",
		place: "left-2 bottom-2"
	},
	kamae: {
		where: "bao quanh",
		place: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
	},
	dokuritsu: {
		where: "đứng một mình",
		place: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
	}
};
function Page() {
	const { id } = Route$6.useParams();
	const r = radicalById(id);
	if (!r) throw notFound();
	const showRomaji = useSettings((s) => s.showRomaji);
	const [peek, setPeek] = (0, import_react.useState)(false);
	const pool = learnRadicals();
	const nav = radicalNeighbors(r.id, pool.length && pool.some((x) => x.id === r.id) ? pool : void 0);
	const lesson = RADICAL_LESSONS.find((ls) => ls.ids.includes(r.id));
	const chars = kanjiCharsFor(r);
	const kanji = chars.map(kanjiByChar).filter((x) => Boolean(x));
	const extra = chars.filter((ch) => !kanji.some((k) => k.character === ch));
	const romaji = kanaToRomaji(r.name_kana);
	const slot = SLOT[r.pos];
	const samples = [...r.examples].slice(0, 3);
	const core = r.meaning_vi.split("(")[0]?.trim() || r.meaning_vi;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col items-center py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["Bộ ", r.kangxi] }),
					lesson ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/radicals",
						search: { lesson: lesson.id },
						className: "mt-2 text-xs text-accent hover:underline",
						children: lesson.title
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs tabular-nums text-subtle",
						children: [
							r.strokes,
							" nét · ",
							POS_VI[r.pos],
							nav.index >= 0 ? ` · ${nav.index + 1}/${nav.total}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-kana mt-3 text-[8rem] leading-none",
						children: r.char
					}),
					r.parent && r.parent !== r.char ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							"Cùng ý với ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-jp text-2xl text-fg",
								children: r.parent
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-1",
								children: "→"
							}),
							"khi đứng ",
							slot.where,
							" thì viết ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-jp text-2xl text-fg",
								children: r.char
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xl font-medium",
						children: ["Hán-Việt: ", r.han_viet]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-lg",
						children: r.meaning_vi
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-jp text-xl text-muted",
						children: [r.name_kana, showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-accent",
							children: romaji
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
							text: r.name_kana,
							kana: r.name_kana,
							label: "Nghe tên bộ"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RememberActions, {
						className: "mt-5",
						id: r.id,
						itemType: "radical"
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm text-muted",
						children: "Nhớ trong 10 giây"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-base leading-relaxed text-fg",
						children: [
							"Thấy ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-jp text-xl",
								children: r.char
							}),
							" thì nghĩ",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: core
							}),
							". Bộ này đứng ",
							slot.where,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-32 w-32 rounded-xl border border-border bg-bg-elevated",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `absolute font-jp text-4xl text-fg ${slot.place}`,
								children: r.char
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute bottom-2 right-2 text-[10px] text-subtle",
								children: "chữ"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 space-y-2 text-sm leading-relaxed text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: r.hint }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Chỉ cần nhớ nghĩa và chỗ đứng. Đừng học thuộc tên tiếng Nhật trước." })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm text-accent hover:underline",
						onClick: () => setPeek((v) => !v),
						children: peek ? "Giấu nghĩa" : "Tự nói nghĩa, rồi bấm xem"
					}), peek ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-fg",
						children: [
							r.han_viet,
							" · ",
							r.meaning_vi,
							" · ",
							slot.where
						]
					}) : null] })
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-1 text-sm text-muted",
					children: "Thấy bộ này trong chữ thật"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-3 text-sm text-subtle",
					children: [
						"Nhìn chữ, chỉ ra ",
						r.char,
						", rồi nói “",
						core,
						"”."
					]
				}),
				kanji.length || extra.length || samples.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						(kanji.length ? kanji.slice(0, 6) : []).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/kanji/$id",
							params: { id: k.id },
							className: "flex min-w-16 flex-col items-center rounded-[10px] border border-border bg-choice px-3 py-2 hover:border-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-jp text-2xl",
								children: k.character
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted",
								children: k.han_viet || k.meaning_vi
							})]
						}, k.id)),
						!kanji.length ? samples.map((ch) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex min-w-16 flex-col items-center rounded-[10px] border border-border px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-jp text-2xl",
								children: ch
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] text-subtle",
								children: ["thấy ", r.char]
							})]
						}, ch)) : null,
						extra.slice(0, 3).map((ch) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex min-w-16 flex-col items-center rounded-[10px] border border-border px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-jp text-2xl",
								children: ch
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-subtle",
								children: "minh họa"
							})]
						}, ch))
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Chưa gắn kanji minh họa."
				})
			] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [r.strokes, " nét · viết thử một lần là đủ"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrokeOrder, {
						character: r.char,
						strokeCount: r.strokes
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WriteCanvas, {
						character: r.char,
						strokeCount: r.strokes
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [nav.prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/radicals/$id",
						params: { id: nav.prev.id },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {}),
							" ",
							nav.prev.char
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), nav.next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/radicals/$id",
						params: { id: nav.next.id },
						children: [
							nav.next.char,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})]
			})
		]
	});
}
//#endregion
export { Page as component };
