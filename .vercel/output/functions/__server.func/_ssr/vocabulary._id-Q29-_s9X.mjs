import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { B as notFound, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as VOCAB_N5 } from "./vocabulary-n5-DDorjkhE.mjs";
import { t as VOCAB_N4 } from "./vocabulary-n4-CVIZPi7y.mjs";
import { n as allVocabExamples } from "./examples-nNwFwmkA.mjs";
import { i as verbUsageForms } from "./local-DrLvRlaq.mjs";
import { s as kanjiByChar } from "./catalog-BH6ywzg_.mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { c as Star } from "../_libs/lucide-react.mjs";
import { n as Route$1 } from "./router-C92aJlrP.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-BOD7PV7B.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { t as SpeakButton } from "./speak-button-DVsDELCU.mjs";
import { t as Badge } from "./badge-Bh2m61F7.mjs";
import { t as Pronunciation } from "./pronunciation-CQJtVer2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vocabulary._id-Q29-_s9X.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { id } = Route$1.useParams();
	const v = [...VOCAB_N5, ...VOCAB_N4].find((x) => x.id === id);
	if (!v) throw notFound();
	const remember = useProgress((s) => s.remember);
	const forgot = useProgress((s) => s.forgot);
	const toggleFav = useProgress((s) => s.toggleFav);
	const addToStudy = useProgress((s) => s.addToStudy);
	const fav = useProgress((s) => s.favorites.has(v.id));
	const mine = useProgress((s) => s.myWords.has(v.id));
	const showRomaji = useSettings((s) => s.showRomaji);
	const examples = allVocabExamples(v);
	const forms = verbUsageForms(v.word, v.kana, v.part_of_speech);
	const kanjiChars = [...v.word].filter((c) => /[\u4e00-\u9fff]/.test(c));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "py-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: v.level }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-kana mt-3 text-6xl",
						children: v.word
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-jp text-xl text-muted",
						children: v.kana
					}),
					showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-accent",
						children: v.romaji
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-lg",
						children: v.meaning_vi
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-subtle",
						children: [
							v.part_of_speech.join(", "),
							" · ",
							v.category
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
						className: "mt-4 mx-auto",
						text: v.word
					})
				]
			}) }),
			forms.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm text-muted",
						children: "Cách dùng động từ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-subtle",
						children: "Học dạng ます trước, rồi て để nối câu. Từ điển ghi dạng gốc."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: forms.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-[10px] border border-border bg-bg-elevated px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									f.label,
									" · ",
									f.note
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pronunciation, {
								className: "mt-1",
								kana: f.kana,
								speak: f.kana
							})]
						}, f.label))
					})
				]
			}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm text-muted",
					children: "Cách dùng"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-fg",
					children: v.part_of_speech.includes("danh từ") ? `${v.word} là danh từ. Đi với は / が / を / の tùy vai trò trong câu — xem các ví dụ bên dưới.` : v.part_of_speech.some((p) => p.includes("tính từ")) ? `${v.word} là tính từ. Đặt trước danh từ hoặc đứng cuối câu với です.` : v.part_of_speech.includes("trạng từ") ? `${v.word} là trạng từ, đứng trước động từ để bổ nghĩa.` : `Dùng ${v.word} như trong các câu ví dụ. Nghe rồi nhắc lại.`
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-sm text-muted",
					children: [
						"Ví dụ (",
						examples.length,
						")"
					]
				}), examples.map((ex, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border pt-3 first:border-0 first:pt-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-subtle",
							children: ["Câu ", i + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-jp text-lg",
								children: ex.jp
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
								text: ex.jp,
								label: "Nghe câu"
							})]
						}),
						ex.kana ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: ex.kana
						}) : null,
						showRomaji && ex.romaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-accent",
							children: ex.romaji
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: ex.vi
						})
					]
				}, ex.jp))]
			}) }),
			kanjiChars.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm text-muted",
						children: "Kanji trong từ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: kanjiChars.map((ch) => {
							const entry = kanjiByChar(ch);
							if (entry) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/kanji/$id",
								params: { id: entry.id },
								className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border border-border bg-bg-elevated font-jp text-xl hover:bg-surface",
								children: ch
							}, ch);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border border-border bg-bg-elevated font-jp text-xl",
								children: ch
							}, ch);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: "Bấm chữ để xem cách đọc on/kun và từ ghép."
					})
				]
			}) }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: fav ? "default" : "secondary",
						onClick: async () => {
							const on = await toggleFav(v.id, "vocab");
							toast(on ? "Đã thêm yêu thích" : "Đã bỏ yêu thích");
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {}),
							" ",
							fav ? "Đã thích" : "Yêu thích"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: mine ? "default" : "secondary",
						onClick: async () => {
							await addToStudy(v.id, "vocab");
							toast(mine ? "Đã có trong từ của tôi" : "Đã thêm vào danh sách học");
						},
						children: mine ? "Trong từ của tôi" : "Thêm vào từ của tôi"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: async () => {
							await forgot(v.id, "vocab");
							toast("Đánh dấu cần ôn");
						},
						children: "Cần ôn"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "success",
						onClick: async () => {
							await remember(v.id, "vocab");
							toast("Đã nhớ — sẽ ôn sau");
						},
						children: "Đã nhớ"
					})
				]
			})
		]
	});
}
//#endregion
export { Page as component };
