import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as putImportedEntries } from "./storage-BvOEP3N4.mjs";
import { d as rememberImported, f as resolveStudyItem, h as useDictionary } from "./catalog-D7gOJvrd.mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { i as useProgress } from "./progress-BQrBv4Tb.mjs";
import { t as Input } from "./input-Blk7lEZJ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { t as DynamicLink } from "./dynamic-link-DhvOmV8v.mjs";
import { r as importDictionary } from "./import-CvWp5blA.mjs";
import { t as EmptyState } from "./empty-state-A1bLnuh-.mjs";
import { t as Label } from "./label-2T3zHwov.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/my-words-Bd3U-B0i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	useDictionary();
	const ids = [...useProgress((s) => s.myWords)];
	const addToStudy = useProgress((s) => s.addToStudy);
	const drop = useProgress((s) => s.dropMyWord);
	const items = ids.map(resolveStudyItem).filter(Boolean);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [word, setWord] = (0, import_react.useState)("");
	const [kana, setKana] = (0, import_react.useState)("");
	const [romaji, setRomaji] = (0, import_react.useState)("");
	const [meaning, setMeaning] = (0, import_react.useState)("");
	async function addCustom() {
		const result = importDictionary({ entries: [{
			kanji: word,
			kana,
			romaji,
			meanings: [meaning],
			part_of_speech: ["danh từ"],
			jlpt: ["N5"],
			tags: ["tùy chọn"]
		}] });
		if (!result.ok || !result.entries[0]) {
			toast.error(result.issues[0]?.message ?? "Không thêm được");
			return;
		}
		const entry = result.entries[0];
		await putImportedEntries([entry]);
		rememberImported([entry]);
		await addToStudy(entry.id, "custom");
		toast("Đã thêm từ của bạn");
		setWord("");
		setKana("");
		setRomaji("");
		setMeaning("");
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "単語帳",
			title: "Từ của tôi",
			description: "Danh sách học từ từ điển, từ vựng, hoặc từ bạn tự thêm.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => setOpen((v) => !v),
				children: "Thêm từ tùy"
			})
		}),
		open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "w",
						children: "Chữ (kanji / kana)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "w",
						value: word,
						onChange: (e) => setWord(e.target.value),
						className: "mt-1"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "k",
						children: "Kana"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "k",
						value: kana,
						onChange: (e) => setKana(e.target.value),
						className: "mt-1"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "r",
						children: "Romaji"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "r",
						value: romaji,
						onChange: (e) => setRomaji(e.target.value),
						className: "mt-1"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "m",
						children: "Nghĩa tiếng Việt"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "m",
						value: meaning,
						onChange: (e) => setMeaning(e.target.value),
						className: "mt-1"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => void addCustom(),
							children: "Lưu vào máy"
						})
					})
				]
			})
		}) : null,
		items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Chưa có từ nào",
			description: "Tra từ điển rồi bấm Thêm vào học, hoặc tự thêm ở trên.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dictionary",
					children: "Tra từ điển"
				})
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border rounded-xl border border-border bg-surface",
			children: items.map((item) => item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-2 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DynamicLink, {
					to: item.to,
					className: "min-w-0 flex-1 hover:underline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-jp text-lg",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-sm text-muted",
						children: item.sub
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => void drop(item.id),
					children: "Xóa"
				})]
			}, item.id) : null)
		})
	] });
}
//#endregion
export { Page as component };
