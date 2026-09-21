import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as shuffle, t as cn } from "./utils-D10sm1uC.mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-BQrBv4Tb.mjs";
import { t as Input } from "./input-Blk7lEZJ.mjs";
import { a as ttsKana, i as stopSpeaking, r as speakJapanese, t as SpeakButton } from "./speak-button-BcZ3hYwQ.mjs";
import { t as answersMatch } from "./answer-check-CQcGeaO2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flashcard-deck-CvL0UqJ1.js
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
	const pendingRef = (0, import_react.useRef)(null);
	const busyRef = (0, import_react.useRef)(false);
	const mark = useProgress((s) => s.mark);
	const autoPlay = useSettings((s) => s.autoPlayAudio);
	const ttsRate = useSettings((s) => s.ttsRate);
	const rateRef = (0, import_react.useRef)(ttsRate);
	rateRef.current = ttsRate;
	const card = !done && deck.length ? deck[i] : void 0;
	function clearPending() {
		if (pendingRef.current != null) {
			window.clearTimeout(pendingRef.current);
			pendingRef.current = null;
		}
	}
	(0, import_react.useEffect)(() => {
		clearPending();
		busyRef.current = false;
		setDeck(shuffle(cards));
		setI(0);
		setFlip(false);
		setDone(false);
		setRated(0);
		setSaved(0);
		setTyped("");
		setCheck("idle");
	}, [sessionKey]);
	(0, import_react.useEffect)(() => () => clearPending(), []);
	(0, import_react.useEffect)(() => {
		if (!card || !autoPlay) {
			stopSpeaking();
			return;
		}
		const text = ttsKana(card.speak, card.front);
		let cancelled = false;
		const handle = window.setTimeout(() => {
			if (!cancelled) speakJapanese(text, rateRef.current);
		}, 80);
		return () => {
			cancelled = true;
			window.clearTimeout(handle);
			stopSpeaking();
		};
	}, [card?.id, autoPlay]);
	(0, import_react.useEffect)(() => {
		if (card && check === "idle") inputRef.current?.focus();
	}, [
		card,
		check,
		i
	]);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
			if (!card) return;
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				if (check === "wrong") rate("forgot");
				else if (check === "idle") setFlip((f) => !f);
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
		deck.length,
		check
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
		if (!card || busyRef.current) return;
		busyRef.current = true;
		clearPending();
		const snapshot = card;
		const idx = i;
		const next = [...deck];
		next.splice(idx, 1);
		if (label === "forgot") next.splice(Math.min(next.length, idx + 2), 0, snapshot);
		else if (label === "hard") next.splice(Math.min(next.length, idx + 4), 0, snapshot);
		setRated((n) => n + 1);
		if (label === "good" || label === "easy") setSaved((n) => n + 1);
		advance(next, idx);
		try {
			await mark(snapshot.id, snapshot.type, label);
		} catch {} finally {
			busyRef.current = false;
		}
	}
	function onTypeCheck() {
		if (!card) return;
		if (check === "wrong") {
			rate("forgot");
			return;
		}
		if (check !== "idle") return;
		const expected = card.answers?.filter(Boolean) ?? [];
		if (!expected.length) {
			setFlip(true);
			return;
		}
		if (answersMatch(typed, expected)) {
			setCheck("correct");
			setFlip(true);
			pendingRef.current = window.setTimeout(() => {
				rate("good");
			}, 800);
		} else {
			setCheck("wrong");
			setFlip(true);
			pendingRef.current = window.setTimeout(() => {
				rate("forgot");
			}, 1600);
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
					clearPending();
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
				onClick: () => {
					if (check !== "idle") return;
					setFlip((f) => !f);
				},
				className: cn("relative min-h-64 w-full rounded-xl border bg-surface p-8 text-center shadow-[var(--shadow-soft)]", check === "correct" ? "border-success" : check === "wrong" ? "border-danger" : "border-border"),
				"aria-label": "Lật thẻ",
				children: flip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-line text-lg text-fg",
						children: card.back
					}),
					card.extra ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-jp text-fg",
						children: card.extra
					}) : null,
					check === "correct" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-success",
						children: "Đúng — đã lưu là nhớ"
					}) : check === "wrong" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-danger",
						children: "Chưa khớp. Thẻ sẽ quay lại sau vài lá."
					}) : null
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-kana text-6xl",
					children: card.front
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-muted",
					children: "Bấm để lật · hoặc gõ đáp án bên dưới"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
					text: card.speak ?? card.front,
					kana: card.speak
				}), card.extra ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
					text: card.extra,
					kana: card.speakExtra,
					label: "Nghe ví dụ"
				}) : null]
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
					disabled: check !== "idle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: check === "wrong" ? "default" : "secondary",
					disabled: check === "correct",
					children: check === "wrong" ? "Tiếp" : "Kiểm tra"
				})]
			}) : check === "wrong" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4 w-full",
				onClick: () => void rate("forgot"),
				children: "Tiếp"
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
						className: "block text-muted",
						children: "Gõ sai sẽ hiện đáp án rồi tự sang thẻ tiếp (ôn lại sau)."
					})
				]
			})
		]
	});
}
//#endregion
export { FlashcardDeck as t };
