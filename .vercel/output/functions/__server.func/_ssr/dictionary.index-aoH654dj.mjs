import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { _ as pushSearch, d as clearSearchHistory, v as putImportedEntries, x as searchHistory } from "./storage-BvOEP3N4.mjs";
import { d as rememberImported, h as useDictionary, p as searchDictionary, t as POS_FILTERS } from "./catalog-BH6ywzg_.mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { f as Search, u as Sparkles } from "../_libs/lucide-react.mjs";
import { l as Route$15, u as createSsrRpc } from "./router-C92aJlrP.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { t as Input } from "./input-Blk7lEZJ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { t as Badge } from "./badge-Bh2m61F7.mjs";
import { t as DictEntryView } from "./dict-entry-view-DA90tnpx.mjs";
import { t as PagePager } from "./page-pager-BasewJ9L.mjs";
import { t as EmptyState } from "./empty-state-A1bLnuh-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dictionary.index-aoH654dj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lookupDictionaryAi = createServerFn({ method: "POST" }).validator((input) => ({ q: String(input?.q ?? "").trim().slice(0, 80) })).handler(createSsrRpc("8479a0af739791056e0d783c49b096045786f141be5a4ec432c7769139efa764"));
var PAGE_SIZE = 50;
function Page() {
	const { q: qParam = "", p: pParam = 1 } = Route$15.useSearch();
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)(qParam);
	const [jlpt, setJlpt] = (0, import_react.useState)("all");
	const [pos, setPos] = (0, import_react.useState)("all");
	const dict = useDictionary();
	const [recent, setRecent] = (0, import_react.useState)([]);
	const showRomaji = useSettings((s) => s.showRomaji);
	const online = useSettings((s) => s.onlineDictionary);
	const inputRef = (0, import_react.useRef)(null);
	const typing = (0, import_react.useRef)(false);
	const page = Math.max(1, pParam);
	(0, import_react.useEffect)(() => {
		searchHistory().then((h) => setRecent(h.map((x) => x.query)));
	}, []);
	(0, import_react.useEffect)(() => {
		if (typing.current) return;
		if (document.activeElement === inputRef.current) return;
		setQ(qParam);
	}, [qParam]);
	(0, import_react.useEffect)(() => {
		const handle = window.setTimeout(() => {
			typing.current = false;
			const value = q.trim();
			if (value === (qParam ?? "").trim()) return;
			navigate({
				to: "/dictionary",
				search: {
					...value ? { q: value } : {},
					p: 1
				},
				replace: true
			});
		}, 400);
		return () => window.clearTimeout(handle);
	}, [
		q,
		qParam,
		navigate
	]);
	const allResults = (0, import_react.useMemo)(() => {
		return searchDictionary(dict, {
			q: q.trim(),
			jlpt: jlpt === "all" ? void 0 : [jlpt],
			pos: pos === "all" ? void 0 : [pos],
			limit: 2e4
		});
	}, [
		dict,
		q,
		jlpt,
		pos
	]);
	const pageCount = Math.max(1, Math.ceil(allResults.length / PAGE_SIZE));
	const safePage = Math.min(page, pageCount);
	const results = allResults.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
	const from = allResults.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
	const to = Math.min(safePage * PAGE_SIZE, allResults.length);
	function goPage(next) {
		const p = Math.min(pageCount, Math.max(1, next));
		const value = q.trim();
		navigate({
			to: "/dictionary",
			search: {
				...value ? { q: value } : {},
				...p > 1 ? { p } : {}
			}
		});
	}
	function record(value) {
		const next = value.trim();
		if (!next) return;
		pushSearch(next).then(() => searchHistory().then((h) => setRecent(h.map((x) => x.query))));
	}
	function commit(next) {
		typing.current = false;
		const value = next.trim();
		setQ(next);
		navigate({
			to: "/dictionary",
			search: value ? {
				q: value,
				p: 1
			} : { p: 1 }
		});
		record(value);
		inputRef.current?.blur();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "辞書",
			title: "Từ điển Nhật – Việt",
			description: `${dict.length} mục trên máy — duyệt 50 từ mỗi trang, hoặc tra kanji, kana, romaji, dạng ます, tiếng Việt.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "relative mb-4",
			onSubmit: (e) => {
				e.preventDefault();
				commit(q);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				ref: inputRef,
				value: q,
				onChange: (e) => {
					typing.current = true;
					setQ(e.target.value);
				},
				placeholder: "学校 · がっこう · gakkou · trường học · 食べます",
				className: "h-12 pl-10",
				"aria-label": "Tra từ điển",
				autoFocus: true
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [
				[
					"all",
					"N5",
					"N4",
					"N3",
					"N2",
					"N1"
				].map((lv) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: jlpt === lv ? "default" : "secondary",
					onClick: () => {
						setJlpt(lv);
						goPage(1);
					},
					children: lv === "all" ? "Mọi cấp" : lv
				}, lv)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-1 w-px self-stretch bg-border" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: pos === "all" ? "default" : "secondary",
					onClick: () => {
						setPos("all");
						goPage(1);
					},
					children: "Mọi loại"
				}),
				POS_FILTERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: pos === p ? "default" : "secondary",
					onClick: () => {
						setPos(p);
						goPage(1);
					},
					children: p
				}, p))
			]
		}),
		q.trim() && allResults.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiLookupPanel, {
			query: q.trim(),
			auto: online,
			onSaved: () => record(q.trim())
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				!q.trim() && recent.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm text-muted",
						children: "Vừa tra"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-xs text-subtle underline",
						onClick: () => {
							clearSearchHistory();
							setRecent([]);
						},
						children: "Xóa"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: recent.slice(0, 10).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => commit(r),
						children: r
					}, r))
				})] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm text-muted",
						children: q.trim() ? "Kết quả" : jlpt !== "all" || pos !== "all" ? "Theo bộ lọc" : "Tất cả từ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm tabular-nums text-subtle",
						children: [
							from,
							"–",
							to,
							" / ",
							allResults.length,
							" · ",
							PAGE_SIZE,
							" từ/trang"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultList, {
					results,
					showRomaji,
					onPick: (word) => record(word)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePager, {
					page: safePage,
					pageCount,
					onPage: goPage
				})
			]
		})
	] });
}
function AiLookupPanel({ query, auto, onSaved }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [entry, setEntry] = (0, import_react.useState)(null);
	const ran = (0, import_react.useRef)("");
	async function run() {
		setBusy(true);
		setError(null);
		try {
			const res = await lookupDictionaryAi({ data: { q: query } });
			if (!res.ok) {
				setError(res.error);
				setEntry(null);
				return;
			}
			setEntry(res.entry);
		} catch {
			setError("Không tra cứu được.");
		} finally {
			setBusy(false);
		}
	}
	(0, import_react.useEffect)(() => {
		setEntry(null);
		setError(null);
		if (auto && query && ran.current !== query) {
			ran.current = query;
			run();
		}
	}, [query, auto]);
	async function save() {
		if (!entry) return;
		await putImportedEntries([entry]);
		rememberImported([entry]);
		onSaved?.();
		toast("Đã lưu vào từ điển trên máy");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Không có trong bộ đi kèm",
				description: "Thử romaji ngắn hơn, kana, nghĩa không dấu — hoặc tra cứu bổ sung rồi lưu vào máy.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => void run(),
						disabled: busy,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}),
							" ",
							busy ? "Đang tra…" : "Tra cứu bổ sung"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/tools/import-dictionary",
							children: "Import JSON"
						})
					})]
				})
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-sm text-danger",
				children: error
			}) : null,
			entry ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Kết quả tra cứu — kiểm tra rồi lưu nếu đúng."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => void save(),
						children: "Lưu vào máy"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DictEntryView, { entry })]
			}) : null
		]
	});
}
function ResultList({ results, showRomaji, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-border rounded-xl border border-border bg-surface",
		children: results.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/dictionary/$id",
			params: { id: e.id },
			onClick: () => onPick?.(e.kanji),
			className: cn("flex min-h-12 items-center gap-3 px-4 py-3 hover:bg-bg-elevated"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-28 shrink-0 font-jp text-lg",
					children: e.kanji
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "hidden min-w-0 shrink-0 text-sm text-accent sm:block sm:w-36",
					children: [e.kana, showRomaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1 text-subtle",
						children: e.romaji
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 truncate text-sm",
					children: e.meanings[0]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "muted",
					children: e.jlpt[0]
				})
			]
		}) }, e.id))
	});
}
//#endregion
export { Page as component };
