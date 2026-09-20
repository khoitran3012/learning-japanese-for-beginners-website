import { o as __toESM } from "../_runtime.mjs";
import { E as require_react, T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as VOCAB_N5 } from "./vocabulary-n5-DDorjkhE.mjs";
import { t as HIRAGANA } from "./kana-CV-aAiLY.mjs";
import { i as shuffle } from "./utils-D10sm1uC.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { i as useProgress } from "./progress-DKGo45g_.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { r as normalizeRomaji } from "./romaji-BCVeKQ98.mjs";
import { t as Input } from "./input-qD8XPiq5.mjs";
import { t as SpeakButton } from "./speak-button-D1RceTHQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play-CqTExNIF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const [mode, setMode] = (0, import_react.useState)("memory");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "遊",
			title: "Giải trí",
			description: "Ghép thẻ, đua tốc độ, nối nghĩa, gõ romaji — luyện chữ mà không khô lý thuyết."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: mode === "memory" ? "default" : "secondary",
					onClick: () => setMode("memory"),
					children: "Lật thẻ"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: mode === "speed" ? "default" : "secondary",
					onClick: () => setMode("speed"),
					children: "30 giây"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: mode === "match" ? "default" : "secondary",
					onClick: () => setMode("match"),
					children: "Nối nghĩa"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: mode === "type" ? "default" : "secondary",
					onClick: () => setMode("type"),
					children: "Gõ romaji"
				})
			]
		}),
		mode === "memory" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryGame, {}) : null,
		mode === "speed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeedGame, {}) : null,
		mode === "match" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchGame, {}) : null,
		mode === "type" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeGame, {}) : null
	] });
}
function MemoryGame() {
	const log = useProgress((s) => s.logStudy);
	const deck = (0, import_react.useMemo)(() => {
		const pool = shuffle(HIRAGANA.filter((k) => k.group === "gojuon")).slice(0, 8);
		return shuffle(pool.flatMap((c) => [{
			id: `${c.id}-jp`,
			pair: c.id,
			label: c.char,
			kind: "jp"
		}, {
			id: `${c.id}-ro`,
			pair: c.id,
			label: c.romaji,
			kind: "ro"
		}]));
	}, []);
	const [open, setOpen] = (0, import_react.useState)([]);
	const [matched, setMatched] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [moves, setMoves] = (0, import_react.useState)(0);
	const done = matched.size === 8;
	function flip(id, pair) {
		if (matched.has(pair) || open.includes(id) || open.length === 2) return;
		const next = [...open, id];
		setOpen(next);
		if (next.length < 2) return;
		setMoves((m) => m + 1);
		const a = deck.find((c) => c.id === next[0]);
		const b = deck.find((c) => c.id === next[1]);
		window.setTimeout(() => {
			if (a && b && a.pair === b.pair && a.id !== b.id) {
				setMatched((s) => /* @__PURE__ */ new Set([...s, a.pair]));
				log(1, .2);
			}
			setOpen([]);
		}, 550);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mb-3 text-sm text-muted",
		children: [
			"Lật 8 cặp hiragana ↔ romaji · ",
			moves,
			" lượt",
			done ? " · xong!" : ""
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-4 gap-2 sm:grid-cols-4",
		children: deck.map((c) => {
			const face = matched.has(c.pair) || open.includes(c.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => flip(c.id, c.pair),
				className: `flex min-h-[4.5rem] items-center justify-center rounded-[10px] border text-xl ${matched.has(c.pair) ? "border-success bg-success/10 font-jp" : face ? "border-primary bg-surface font-jp" : "border-border bg-bg-elevated text-subtle"}`,
				children: face ? c.label : "?"
			}, c.id);
		})
	})] }) });
}
function SpeedGame() {
	const pool = (0, import_react.useMemo)(() => shuffle(HIRAGANA.filter((k) => k.group === "gojuon")), []);
	const [i, setI] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [left, setLeft] = (0, import_react.useState)(30);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [over, setOver] = (0, import_react.useState)(false);
	const log = useProgress((s) => s.logStudy);
	const item = pool[i % pool.length];
	const timer = (0, import_react.useState)({ id: null })[0];
	(0, import_react.useEffect)(() => {
		return () => {
			if (timer.id) window.clearInterval(timer.id);
		};
	}, [timer]);
	function start() {
		if (timer.id) window.clearInterval(timer.id);
		setScore(0);
		setI(0);
		setLeft(30);
		setOver(false);
		setRunning(true);
		timer.id = window.setInterval(() => {
			setLeft((s) => {
				if (s <= 1) {
					if (timer.id) window.clearInterval(timer.id);
					timer.id = null;
					setRunning(false);
					setOver(true);
					log(1, .5);
					return 0;
				}
				return s - 1;
			});
		}, 1e3);
	}
	const options = (0, import_react.useMemo)(() => {
		const wrong = shuffle(pool.filter((x) => x.id !== item.id)).slice(0, 3);
		return shuffle([item, ...wrong]);
	}, [i, running]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "mx-auto max-w-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums",
					children: ["Điểm ", score]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums",
					children: [left, "s"]
				})]
			}), !running && !over ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: start,
				children: "Bắt đầu 30 giây"
			}) : over ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-3xl font-semibold tabular-nums",
						children: score
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "chữ đúng trong 30 giây"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						onClick: start,
						children: "Chơi lại"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center font-jp text-6xl",
					children: item.char
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, { text: item.char }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => {
							if (o.id === item.id) setScore((s) => s + 1);
							setI((n) => n + 1);
						},
						children: o.romaji
					}, o.id + i))
				})
			] })]
		})
	});
}
function MatchGame() {
	const round = (0, import_react.useMemo)(() => shuffle(VOCAB_N5).slice(0, 5), []);
	const [right, setRight] = (0, import_react.useState)(() => shuffle(round.map((v) => v.id)));
	const [leftPick, setLeftPick] = (0, import_react.useState)(null);
	const [done, setDone] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [wrong, setWrong] = (0, import_react.useState)(0);
	const log = useProgress((s) => s.logStudy);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-muted",
			children: ["Chọn từ bên trái, rồi nghĩa bên phải · sai ", wrong]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: round.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: done.has(v.id) ? "success" : leftPick === v.id ? "default" : "secondary",
					className: "h-auto w-full justify-start py-3 font-jp",
					disabled: done.has(v.id),
					onClick: () => setLeftPick(v.id),
					children: [v.word, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-xs font-sans text-muted",
						children: v.kana
					})]
				}, v.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: right.map((id) => {
					const v = round.find((x) => x.id === id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: done.has(id) ? "success" : "secondary",
						className: "h-auto w-full justify-start py-3",
						disabled: done.has(id),
						onClick: () => {
							if (!leftPick || done.has(id)) return;
							if (leftPick === id) {
								const next = new Set(done);
								next.add(id);
								setDone(next);
								setLeftPick(null);
								log(1, .2);
								if (next.size === round.length) setRight((r) => r);
							} else {
								setWrong((w) => w + 1);
								setLeftPick(null);
							}
						},
						children: v.meaning_vi
					}, id);
				})
			})]
		}),
		done.size === round.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-center text-sm text-success",
			children: [
				"Khớp hết ",
				round.length,
				" cặp."
			]
		}) : null
	] }) });
}
function TypeGame() {
	const pool = (0, import_react.useMemo)(() => shuffle(HIRAGANA.filter((k) => k.group === "gojuon" || k.group === "dakuten")), []);
	const [i, setI] = (0, import_react.useState)(0);
	const [typed, setTyped] = (0, import_react.useState)("");
	const [ok, setOk] = (0, import_react.useState)(0);
	const [miss, setMiss] = (0, import_react.useState)(0);
	const [msg, setMsg] = (0, import_react.useState)(null);
	const log = useProgress((s) => s.logStudy);
	const item = pool[i % pool.length];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "mx-auto max-w-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Nhìn chữ, gõ romaji · đúng ",
						ok,
						" · sai ",
						miss
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center font-jp text-7xl leading-none",
					children: item.char
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, { text: item.char })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						if (normalizeRomaji(typed) === normalizeRomaji(item.romaji)) {
							setOk((n) => n + 1);
							setMsg("Đúng!");
							log(1, .15);
						} else {
							setMiss((n) => n + 1);
							setMsg(`${item.char} = ${item.romaji}`);
						}
						setTyped("");
						setI((n) => n + 1);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: typed,
						onChange: (e) => setTyped(e.target.value),
						placeholder: "vd: ka",
						autoComplete: "off",
						autoCapitalize: "off"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "OK"
					})]
				}),
				msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-sm text-muted",
					children: msg
				}) : null
			]
		})
	});
}
//#endregion
export { Page as component };
