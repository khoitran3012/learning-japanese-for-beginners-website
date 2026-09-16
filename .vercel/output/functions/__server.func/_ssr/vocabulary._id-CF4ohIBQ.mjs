import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { B as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as VOCAB_N5 } from "./vocabulary-n5-DDorjkhE.mjs";
import { t as VOCAB_N4 } from "./vocabulary-n4-CVIZPi7y.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-De5Z2Iqg.mjs";
import { s as Star } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { t as SpeakButton } from "./speak-button-D1RceTHQ.mjs";
import { n as Route$1 } from "./router-ClwOe2dp.mjs";
import { t as Badge } from "./badge-BjjZgNOo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vocabulary._id-CF4ohIBQ.js
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-jp text-lg",
					children: v.example_sentence
				}),
				v.example_kana ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: v.example_kana
				}) : null,
				showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-accent",
					children: v.example_romaji
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: v.example_meaning_vi
				})
			] }) }),
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
