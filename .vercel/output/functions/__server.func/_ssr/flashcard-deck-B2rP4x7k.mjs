import { o as __toESM } from "../_runtime.mjs";
import { E as require_react, T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-Cu0w4vLw.mjs";
import { n as speakJapanese, t as SpeakButton } from "./speak-button-D1RceTHQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flashcard-deck-B2rP4x7k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FlashcardDeck({ cards, empty, sessionKey }) {
	const [deck, setDeck] = (0, import_react.useState)(cards);
	const [i, setI] = (0, import_react.useState)(0);
	const [flip, setFlip] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const [rated, setRated] = (0, import_react.useState)(0);
	const mark = useProgress((s) => s.mark);
	const autoPlay = useSettings((s) => s.autoPlayAudio);
	const ttsRate = useSettings((s) => s.ttsRate);
	const card = !done && deck.length ? deck[i] : void 0;
	(0, import_react.useEffect)(() => {
		setDeck(cards);
		setI(0);
		setFlip(false);
		setDone(false);
		setRated(0);
	}, [sessionKey]);
	(0, import_react.useEffect)(() => {
		if (!card || !autoPlay) return;
		const text = card.speak ?? card.front;
		speakJapanese(text, ttsRate);
	}, [
		card,
		autoPlay,
		ttsRate
	]);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
			if (!card) return;
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				setFlip((f) => !f);
			} else if (e.key === "1") rate("forgot");
			else if (e.key === "2") rate("hard");
			else if (e.key === "3") rate("good");
			else if (e.key === "4") rate("easy");
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		card,
		i,
		deck.length
	]);
	async function rate(label) {
		if (!card) return;
		await mark(card.id, card.type, label);
		setFlip(false);
		setRated((n) => n + 1);
		if (i + 1 >= deck.length) setDone(true);
		else setI((x) => x + 1);
	}
	if (!deck.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: empty ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Bộ thẻ trống."
	}) });
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md rounded-xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-soft)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Phiên ôn xong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-4xl font-semibold tabular-nums",
				children: rated
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "thẻ đã đánh giá"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-5",
				onClick: () => {
					setI(0);
					setDone(false);
					setRated(0);
					setFlip(false);
				},
				children: "Ôn lại bộ này"
			})
		]
	});
	if (!card) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFlip((f) => !f),
				className: cn("relative min-h-64 w-full rounded-xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-soft)]"),
				"aria-label": "Lật thẻ",
				children: flip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whitespace-pre-line text-lg",
					children: card.back
				}), card.extra ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-jp text-muted",
					children: card.extra
				}) : null] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-kana text-6xl",
					children: card.front
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-subtle",
					children: "Bấm để lật · phím cách"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, { text: card.speak ?? card.front })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						onClick: () => void rate("forgot"),
						children: "Quên"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => void rate("hard"),
						children: "Khó"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => void rate("good"),
						children: "Nhớ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "success",
						onClick: () => void rate("easy"),
						children: "Dễ"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-center text-xs text-muted tabular-nums",
				children: [
					"Thẻ ",
					i + 1,
					" / ",
					deck.length
				]
			})
		]
	});
}
//#endregion
export { FlashcardDeck as t };
