import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Y as notFound, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as isBrowser } from "./utils-XG3oJXDV.mjs";
import { t as Button } from "./button-Dt7wwSQI.mjs";
import { F as Check, P as ChevronLeft } from "../_libs/lucide-react.mjs";
import { r as Route$4 } from "./router-Dpb-YzpN.mjs";
import { n as useSettings } from "./settings-_aQHY0Mw.mjs";
import { n as songById, t as SONGS } from "./songs-f1G8RIBv.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { n as CardContent, t as Card } from "./card-D1pZ1BiI.mjs";
import { t as SpeakButton } from "./speak-button-CukGzBix.mjs";
import { i as choiceState, r as ChoiceRow } from "./choice-row-EQTkVhlN.mjs";
import { t as Badge } from "./badge-BshL6Y_S.mjs";
import { t as JpText } from "./jp-text-BzwjXJwK.mjs";
import { n as RememberMark } from "./remember-actions-CfojlqmX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/songs._id-DFvOhue9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function heardKey(id) {
	return `akari-song-heard-${id}`;
}
function loadHeard(id) {
	if (!isBrowser()) return [];
	try {
		const raw = localStorage.getItem(heardKey(id));
		const parsed = raw ? JSON.parse(raw) : [];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function Page() {
	const { id } = Route$4.useParams();
	const song = songById(id);
	if (!song) throw notFound();
	const current = song;
	const showRomaji = useSettings((s) => s.showRomaji);
	const [heard, setHeard] = (0, import_react.useState)(() => loadHeard(song.id));
	const youtube = `https://www.youtube.com/results?search_query=${encodeURIComponent(song.search)}`;
	function toggle(kana) {
		setHeard((prev) => {
			const next = prev.includes(kana) ? prev.filter((x) => x !== kana) : [...prev, kana];
			if (isBrowser()) localStorage.setItem(heardKey(current.id), JSON.stringify(next));
			return next;
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/songs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {}), " Bài hát"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: song.anime,
				title: song.title,
				description: `${song.artist} · ${song.year}. ${song.why}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: song.level }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-accent",
							children: song.romaji
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-jp text-lg text-muted",
						children: song.titleKana
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-fg",
						children: song.focus
					}),
					song.bits.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-wrap gap-2",
						children: song.bits.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-[10px] border border-border bg-bg-elevated px-3 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-jp text-xl",
									children: b.ch
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-jp text-sm text-muted",
									children: b.kana
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-fg",
									children: b.vi
								})
							]
						}, b.ch))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-relaxed text-subtle",
						children: "Không có lời bài hát ở đây. Học từ và câu bên dưới, rồi mở bản chính thức để nghe đúng giọng."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: youtube,
							target: "_blank",
							rel: "noreferrer",
							children: "Nghe bản chính thức"
						})
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium",
					children: "Từ nên thuộc trước khi nghe"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: song.vocab.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-2 rounded-[10px] border border-border px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-jp text-lg",
									children: v.word
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-jp text-sm text-muted",
									children: v.kana
								}),
								showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-accent",
									children: v.romaji
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: v.meaning
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
								text: v.kana,
								kana: v.kana,
								label: "Nghe"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RememberMark, {
								id: `song:${song.id}:${v.kana}`,
								itemType: "custom",
								label: v.word
							})]
						})]
					}, v.kana))
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Câu luyện"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Câu viết riêng để nhớ từ của bài, không phải lời hát. Bấm chữ để xem hiragana và Hán-Việt."
					}),
					song.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JpText, {
									text: line.jp,
									className: "font-jp text-lg"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
									text: line.kana,
									kana: line.kana,
									label: "Nghe"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-jp text-sm text-muted",
								children: line.kana
							}),
							showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-accent",
								children: line.romaji
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: line.vi
							})
						]
					}, line.jp))
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Nghe và tích từ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Mở bài hát, nghe một lần. Thấy từ nào thì tích. ",
							heard.length,
							"/",
							song.vocab.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: song.vocab.map((v) => {
							const on = heard.includes(v.kana);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggle(v.kana),
								className: "flex w-full items-center gap-2 rounded-[10px] border border-border px-3 py-2 text-left hover:bg-bg-elevated",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: on ? "size-4 text-success" : "size-4 text-subtle" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-jp",
										children: v.word
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted",
										children: v.meaning
									})
								]
							}) }, v.kana);
						})
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SongQuiz, { song })
		]
	});
}
function SongQuiz({ song }) {
	const questions = (0, import_react.useMemo)(() => makeQuiz(song), [song]);
	const [i, setI] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const q = questions[i];
	if (!q) return null;
	const done = i >= questions.length - 1 && picked !== null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: "Kiểm tra từ của bài"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Câu ",
					i + 1,
					"/",
					questions.length,
					picked !== null && i === questions.length - 1 ? ` · ${score}/${questions.length}` : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-jp text-3xl",
				children: q.word.word
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-jp text-sm text-muted",
				children: q.word.kana
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: q.options.map((opt, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
					state: choiceState({
						revealed: picked !== null,
						isAnswer: idx === q.answer,
						picked: picked === idx
					}),
					disabled: picked !== null,
					onClick: () => {
						if (picked !== null) return;
						setPicked(idx);
						if (idx === q.answer) setScore((n) => n + 1);
					},
					children: opt
				}, opt))
			}),
			picked !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => {
					if (done) {
						setI(0);
						setPicked(null);
						setScore(0);
						return;
					}
					setI((n) => n + 1);
					setPicked(null);
				},
				children: done ? "Làm lại" : "Câu tiếp"
			}) : null
		]
	}) });
}
function makeQuiz(song) {
	const pool = SONGS.flatMap((s) => s.vocab.map((v) => v.meaning));
	return song.vocab.map((word, index) => {
		const options = [word.meaning];
		for (const meaning of pool) {
			if (options.length >= 4) break;
			if (!options.includes(meaning)) options.push(meaning);
		}
		const shift = index % options.length;
		const rotated = options.map((_, i) => options[(i + shift) % options.length]);
		return {
			word,
			options: rotated,
			answer: rotated.indexOf(word.meaning)
		};
	});
}
//#endregion
export { Page as component };
