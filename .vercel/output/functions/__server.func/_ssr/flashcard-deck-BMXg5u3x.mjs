import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as shuffle, t as cn } from "./utils-D10sm1uC.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-QMZec7H2.mjs";
import { t as Input } from "./input-qD8XPiq5.mjs";
import { n as speakJapanese, t as SpeakButton } from "./speak-button-D1RceTHQ.mjs";
import { t as answersMatch } from "./answer-check-CQcGeaO2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flashcard-deck-BMXg5u3x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FlashcardDeck({ cards, empty, sessionKey }) {
	const [deck, setDeck] = (0, import_react.useState)(() => shuffle(cards));
	const [i, setI] = (0, import_react.useState)(0);
	const [flip, setFlip] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const [rated, setRated] = (0, import_react.useState)(0);
	const [saved, setSaved] = (0, import_react.useState)(0);
	const [typed, setTyped] = (0, import_react.useState)("");
	const [check, setCheck] = (0, import_react.useState)("idle");
	const inputRef = (0, import_react.useRef)(null);
	const mark = useProgress((s) => s.mark);
	const autoPlay = useSettings((s) => s.autoPlayAudio);
	const ttsRate = useSettings((s) => s.ttsRate);
	const card = !done && deck.length ? deck[i] : void 0;
	(0, import_react.useEffect)(() => {
		setDeck(shuffle(cards));
		setI(0);
		setFlip(false);
		setDone(false);
		setRated(0);
		setSaved(0);
		setTyped("");
		setCheck("idle");
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
		if (card && !flip && check === "idle") inputRef.current?.focus();
	}, [
		card,
		flip,
		check,
		i
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
	function advance(nextDeck, from) {
		if (nextDeck.length === 0) {
			setDeck([]);
			setDone(true);
			setFlip(false);
			setTyped("");
			setCheck("idle");
			return;
		}
		setDeck(nextDeck);
		setI(from >= nextDeck.length ? 0 : from);
		setFlip(false);
		setTyped("");
		setCheck("idle");
	}
	async function rate(label) {
		if (!card) return;
		await mark(card.id, card.type, label);
		setRated((n) => n + 1);
		if (label === "good" || label === "easy") setSaved((n) => n + 1);
		const next = [...deck];
		next.splice(i, 1);
		if (label === "forgot") next.splice(Math.min(next.length, i + 2), 0, card);
		else if (label === "hard") next.splice(Math.min(next.length, i + 4), 0, card);
		advance(next, i);
	}
	function onTypeCheck() {
		if (!card || check !== "idle") return;
		const expected = card.answers?.filter(Boolean) ?? [];
		if (!expected.length) {
			setFlip(true);
			return;
		}
		if (answersMatch(typed, expected)) {
			setCheck("correct");
			setFlip(true);
			window.setTimeout(() => {
				rate("good");
			}, 700);
		} else {
			setCheck("wrong");
			setFlip(true);
		}
	}
	if (!deck.length && done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [saved, " thẻ đã lưu là nhớ"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-5",
				onClick: () => {
					setDeck(shuffle(cards));
					setI(0);
					setDone(false);
					setRated(0);
					setSaved(0);
					setFlip(false);
					setTyped("");
					setCheck("idle");
				},
				children: "Ôn lại bộ này"
			})
		]
	});
	if (!deck.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: empty ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Bộ thẻ trống."
	}) });
	if (!card) return null;
	const canType = Boolean(card.answers?.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFlip((f) => !f),
				className: cn("relative min-h-64 w-full rounded-xl border bg-surface p-8 text-center shadow-[var(--shadow-soft)]", check === "correct" ? "border-success" : check === "wrong" ? "border-danger" : "border-border"),
				"aria-label": "Lật thẻ",
				children: flip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-line text-lg",
						children: card.back
					}),
					card.extra ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-jp text-muted",
						children: card.extra
					}) : null,
					check === "correct" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-success",
						children: "Đúng — đã lưu là nhớ"
					}) : check === "wrong" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-danger",
						children: "Chưa khớp. Đọc đáp án rồi đánh giá."
					}) : null
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-kana text-6xl",
					children: card.front
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-subtle",
					children: "Bấm để lật · hoặc gõ đáp án bên dưới"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, { text: card.speak ?? card.front })
			}),
			canType ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 flex gap-2",
				onSubmit: (e) => {
					e.preventDefault();
					onTypeCheck();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					ref: inputRef,
					value: typed,
					onChange: (e) => setTyped(e.target.value),
					placeholder: card.answerHint ?? "Gõ để kiểm tra",
					autoComplete: "off",
					autoCapitalize: "off",
					autoCorrect: "off",
					spellCheck: false,
					disabled: check === "correct"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "secondary",
					disabled: check === "correct",
					children: "Kiểm tra"
				})]
			}) : null,
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
					"Còn ",
					deck.length,
					" thẻ · đã lưu ",
					saved,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-subtle",
						children: "Nhớ / Dễ / gõ đúng thì tiến độ lưu ngay trên máy."
					})
				]
			})
		]
	});
}
//#endregion
export { FlashcardDeck as t };
