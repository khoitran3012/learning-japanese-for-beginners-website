import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as copyToClipboard } from "./utils-D10sm1uC.mjs";
import { l as relatedEntries, s as kanjiInWord } from "./catalog-Ba7ml22_.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-De5Z2Iqg.mjs";
import { D as Copy, N as BookmarkPlus, s as Star } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { t as SpeakButton } from "./speak-button-D1RceTHQ.mjs";
import { t as Badge } from "./badge-BjjZgNOo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dict-entry-view-D_ko_1Q0.js
var import_jsx_runtime = require_jsx_runtime();
function DictActions({ entry, itemType = "vocab" }) {
	const fav = useProgress((s) => s.favorites.has(entry.id));
	const mine = useProgress((s) => s.myWords.has(entry.id));
	const toggleFav = useProgress((s) => s.toggleFav);
	const addStudy = useProgress((s) => s.addToStudy);
	const remember = useProgress((s) => s.remember);
	const forgot = useProgress((s) => s.forgot);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: fav ? "default" : "secondary",
				onClick: async () => {
					const on = await toggleFav(entry.id, itemType);
					toast(on ? "Đã thêm yêu thích" : "Đã bỏ yêu thích");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {}),
					" ",
					fav ? "Đã thích" : "Yêu thích"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: mine ? "default" : "secondary",
				onClick: async () => {
					await addStudy(entry.id, itemType);
					toast(mine ? "Đã có trong từ của tôi" : "Đã thêm vào danh sách học");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkPlus, {}),
					" ",
					mine ? "Trong từ của tôi" : "Thêm vào học"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: async () => {
					await forgot(entry.id, itemType);
					toast("Đánh dấu cần ôn");
				},
				children: "Cần ôn"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "success",
				onClick: async () => {
					await remember(entry.id, itemType);
					toast("Đã nhớ — sẽ ôn sau");
				},
				children: "Đã nhớ"
			})
		]
	});
}
function DictEntryView({ entry }) {
	const showRomaji = useSettings((s) => s.showRomaji);
	const kanji = kanjiInWord(entry.kanji, entry);
	const posLabel = entry.part_of_speech.join(" · ");
	const related = relatedEntries(entry);
	async function copyHead() {
		const text = `${entry.kanji}　${entry.kana}　${entry.romaji}\n${entry.meanings.join(" · ")}`;
		if (await copyToClipboard(text)) toast("Đã sao chép");
		else toast.error("Không sao chép được");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "py-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap justify-center gap-1.5",
						children: [entry.jlpt.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["JLPT ", l] }, l)), entry.common ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "success",
							children: "Phổ biến"
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-kana mt-4 text-6xl",
						children: entry.kanji
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-jp text-xl text-muted",
						children: entry.kana
					}),
					showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-accent",
						children: entry.romaji
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-1",
						children: entry.meanings.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-lg",
							children: m
						}, m))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm capitalize text-subtle",
						children: posLabel
					}),
					entry.pitch_accent != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: ["Pitch accent: ", entry.pitch_accent]
					}) : null,
					entry.tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap justify-center gap-1.5",
						children: entry.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "muted",
							children: t
						}, t))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, { text: entry.kanji }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "secondary",
							size: "sm",
							onClick: () => void copyHead(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), " Sao chép"]
						})]
					})
				]
			}) }),
			entry.examples.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm text-muted",
					children: "Ví dụ"
				}), entry.examples.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border pt-3 first:border-0 first:pt-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
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
			}) }) : null,
			kanji.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-sm text-muted",
				children: "Kanji trong từ"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: kanji.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3",
					children: [k.entry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/kanji/$id",
						params: { id: k.entry.id },
						className: "font-jp text-2xl hover:underline",
						children: k.char
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-jp text-2xl",
						children: k.char
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: k.entry ? k.entry.meaning_vi : "Chưa có trong bộ kanji N5/N4"
					})]
				}, k.char))
			})] }) }) : null,
			related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-sm text-muted",
				children: "Từ liên quan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1",
				children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/dictionary/$id",
					params: { id: r.id },
					className: "flex items-center justify-between rounded-lg px-1 py-1.5 hover:bg-bg-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-jp text-lg",
						children: r.kanji
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-sm text-muted",
						children: r.meanings[0]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-subtle",
						children: r.kana
					})]
				}) }, r.id))
			})] }) }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DictActions, { entry })
		]
	});
}
//#endregion
export { DictEntryView as t };
