import { o as __toESM } from "./_runtime.mjs";
import { D as require_react, E as require_jsx_runtime, d as DialogClose, f as DialogContent, g as DialogTitle, h as DialogPortal, m as DialogOverlay, u as Dialog } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { S as useRouter, b as Link, g as Outlet, p as useRouterState } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as LESSONS } from "./_ssr/path-stages-Cie-poLX.mjs";
import { o as hasGateSessionMarker } from "./_ssr/server-Nep1Cdby.mjs";
import { i as signOut } from "./_ssr/client-CVqXY6bk.mjs";
import { t as allKanji } from "./_ssr/kanji-set-B5ykdYH_.mjs";
import { n as GRAMMAR_N5, t as GRAMMAR_N4 } from "./_ssr/grammar-n4-Dv0a1spF.mjs";
import { n as KATAKANA, t as HIRAGANA } from "./_ssr/kana-CV-aAiLY.mjs";
import { n as RADICALS } from "./_ssr/radicals-BsxpUXhx.mjs";
import { r as normalizeRomaji } from "./_ssr/romaji-BCVeKQ98.mjs";
import { r as foldVi } from "./_ssr/text-Kuvw8qUk.mjs";
import { n as searchLocal } from "./_ssr/local-DjRTAQg1.mjs";
import { t as cn } from "./_ssr/utils-XG3oJXDV.mjs";
import { h as useDictionary } from "./_ssr/catalog-BHXFuF28.mjs";
import { t as Button } from "./_ssr/button-Dt7wwSQI.mjs";
import { n as useCurrentUserState, t as useCurrentUser } from "./_ssr/use-current-user-ClOiUQ-z.mjs";
import { B as BookMarked, C as Languages, D as Gamepad2, E as GraduationCap, I as ChartColumn, M as CircleHelp, R as BookText, S as Layers, T as Headphones, _ as Music, d as Sparkles, f as Settings, i as Type, j as Component, l as Star, m as RotateCcw, o as Trophy, p as Search, t as X, u as Sprout, v as Menu, w as House, x as Library, y as Map$1, z as BookOpen } from "./_libs/lucide-react.mjs";
import { n as PresenceHeartbeat, t as OnlineUsersList } from "./_ssr/online-users-5Ev8MzWl.mjs";
import { n as useSettings, t as initSettingsDom } from "./_ssr/settings-_aQHY0Mw.mjs";
import { a as useProgress } from "./_ssr/progress-CIocZrv7.mjs";
import { t as applyLocalAiFromSettings } from "./_ssr/provider-BsUoWR6V.mjs";
import { a as DialogTitle$1, i as DialogHeader, n as DialogContent$1, t as Dialog$1 } from "./_ssr/dialog-CKgE4LoH.mjs";
import { t as Input } from "./_ssr/input-BD95aU7I.mjs";
import { t as SONGS } from "./_ssr/songs-f1G8RIBv.mjs";
import { t as Toaster } from "./_libs/sonner.mjs";
import { t as Provider } from "./_libs/radix-ui__react-tooltip.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-Cy8n7Tun.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
function SheetContent({ className, children, side = "left", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-scrim/55" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 bg-surface text-fg shadow-[var(--shadow-soft)]", side === "left" && "inset-y-0 left-0 h-full w-[min(20rem,88vw)] border-r border-border", side === "right" && "inset-y-0 right-0 h-full w-[min(20rem,88vw)] border-l border-border", side === "bottom" && "inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl border-t border-border", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-3 top-3 rounded-sm p-1 text-muted hover:bg-choice",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Đóng"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("p-5 pb-2", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("text-base font-semibold", className),
		...props
	});
}
function TooltipProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration: 250,
		children
	});
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
function AuthSlot({ compact = false }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-8 w-8 shrink-0 animate-pulse rounded-full bg-border",
		"aria-hidden": true
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		className: "inline-flex h-9 items-center rounded-[10px] border border-border bg-surface px-3 text-sm hover:bg-bg-elevated",
		children: "Đăng nhập"
	});
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {});
}
var NAV = [
	{
		to: "/",
		label: "Trang chủ",
		icon: House,
		group: "Chính"
	},
	{
		to: "/path",
		label: "Lộ trình",
		icon: Map$1,
		group: "Chính"
	},
	{
		to: "/daily",
		label: "Bài hôm nay",
		icon: Sparkles,
		group: "Chính"
	},
	{
		to: "/garden",
		label: "Vườn Sakura",
		icon: Sprout,
		group: "Chính"
	},
	{
		to: "/alphabet",
		label: "Bảng chữ cái",
		icon: Languages,
		group: "Chữ"
	},
	{
		to: "/hiragana",
		label: "Hiragana",
		icon: Type,
		group: "Chữ"
	},
	{
		to: "/katakana",
		label: "Katakana",
		icon: Type,
		group: "Chữ"
	},
	{
		to: "/kanji",
		label: "Kanji",
		icon: Library,
		group: "Kiến thức"
	},
	{
		to: "/radicals",
		label: "Bộ thủ",
		icon: Component,
		group: "Kiến thức"
	},
	{
		to: "/vocabulary",
		label: "Từ vựng",
		icon: BookOpen,
		group: "Kiến thức"
	},
	{
		to: "/grammar",
		label: "Ngữ pháp",
		icon: GraduationCap,
		group: "Kiến thức"
	},
	{
		to: "/dictionary",
		label: "Từ điển",
		icon: BookMarked,
		group: "Kiến thức"
	},
	{
		to: "/flashcards",
		label: "Thẻ từ",
		icon: Layers,
		group: "Luyện"
	},
	{
		to: "/listen",
		label: "Luyện nghe",
		icon: Headphones,
		group: "Luyện"
	},
	{
		to: "/songs",
		label: "Bài hát",
		icon: Music,
		group: "Luyện"
	},
	{
		to: "/read",
		label: "Luyện đọc",
		icon: BookText,
		group: "Luyện"
	},
	{
		to: "/quiz",
		label: "Trắc nghiệm",
		icon: CircleHelp,
		group: "Luyện"
	},
	{
		to: "/play",
		label: "Giải trí",
		icon: Gamepad2,
		group: "Luyện"
	},
	{
		to: "/review",
		label: "Ôn tập",
		icon: RotateCcw,
		group: "Luyện"
	},
	{
		to: "/leaderboard",
		label: "Thi đua",
		icon: Trophy,
		group: "Tôi"
	},
	{
		to: "/stats",
		label: "Thống kê",
		icon: ChartColumn,
		group: "Tôi"
	},
	{
		to: "/favorites",
		label: "Yêu thích",
		icon: Star,
		group: "Tôi"
	},
	{
		to: "/my-words",
		label: "Từ của tôi",
		icon: BookMarked,
		group: "Tôi"
	},
	{
		to: "/settings",
		label: "Cài đặt",
		icon: Settings,
		group: "Tôi"
	}
];
var MOBILE_TAB = [
	{
		to: "/",
		label: "Trang chủ",
		icon: House
	},
	{
		to: "/daily",
		label: "Hôm nay",
		icon: Sparkles
	},
	{
		to: "/dictionary",
		label: "Từ điển",
		icon: Search
	},
	{
		to: "/garden",
		label: "Vườn",
		icon: Sprout
	},
	{
		to: "/settings",
		label: "Thêm",
		icon: Settings
	}
];
function SearchDialog({ open, onOpenChange }) {
	const [q, setQ] = (0, import_react.useState)("");
	const router = useRouter();
	const dict = useDictionary();
	const results = (0, import_react.useMemo)(() => {
		const query = q.trim();
		if (query.length < 1) return [];
		const nq = normalizeRomaji(query);
		const qFold = foldVi(query);
		const out = [];
		for (const k of [...HIRAGANA, ...KATAKANA]) if (k.char === query || k.romaji === nq || k.romaji.startsWith(nq) || k.id.includes(query)) out.push({
			type: k.kind === "hiragana" ? "Hiragana" : "Katakana",
			title: k.char,
			sub: k.romaji,
			to: `/${k.kind}/${k.id}`
		});
		for (const kj of allKanji()) if (kj.character === query || foldVi(kj.meaning_vi).includes(qFold) || foldVi(kj.han_viet).includes(qFold) || kj.onyomi.some((x) => x.includes(query)) || kj.kunyomi.some((x) => x.includes(query))) out.push({
			type: "Kanji",
			title: kj.character,
			sub: kj.han_viet ? `${kj.han_viet} · ${kj.meaning_vi}` : kj.meaning_vi,
			to: `/kanji/${kj.id}`
		});
		for (const rd of RADICALS) if (rd.char === query || rd.parent === query || rd.variants.includes(query) || foldVi(rd.han_viet).includes(qFold) || foldVi(rd.meaning_vi).includes(qFold) || rd.name_kana.includes(query) || foldVi(rd.name_jp).includes(qFold)) out.push({
			type: "Bộ thủ",
			title: rd.char,
			sub: `${rd.han_viet} · ${rd.name_kana} · ${rd.meaning_vi}`,
			to: `/radicals/${rd.id}`
		});
		for (const g of [...GRAMMAR_N5, ...GRAMMAR_N4]) if (g.name.includes(query) || g.structure.includes(query) || foldVi(g.meaning_vi).includes(qFold)) out.push({
			type: "Ngữ pháp",
			title: g.name,
			sub: g.meaning_vi,
			to: `/grammar/${g.id}`
		});
		for (const l of LESSONS) if (foldVi(l.title).includes(qFold) || foldVi(l.summary).includes(qFold)) out.push({
			type: "Bài học",
			title: l.title,
			sub: l.summary,
			to: `/path/${l.id}`
		});
		for (const song of SONGS) if (song.title.includes(query) || song.titleKana.includes(query) || foldVi(song.romaji).includes(qFold) || foldVi(song.anime).includes(qFold) || foldVi(song.series ?? "").includes(qFold) || foldVi(song.artist).includes(qFold) || foldVi(song.title).includes(qFold)) out.push({
			type: "Bài hát",
			title: song.title,
			sub: `${song.anime} · ${song.artist}`,
			to: `/songs/${song.id}`
		});
		for (const d of searchLocal(dict, {
			q: query,
			limit: 8
		})) out.push({
			type: "Từ điển",
			title: d.kanji,
			sub: `${d.kana} · ${d.meanings[0]}`,
			to: `/dictionary/${d.id}`
		});
		return out.slice(0, 20);
	}, [dict, q]);
	(0, import_react.useEffect)(() => {
		if (!open) setQ("");
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
			className: "p-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					className: "sr-only",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, { children: "Tìm kiếm" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoFocus: true,
						placeholder: "Kanji, kana, romaji, tiếng Việt...",
						value: q,
						onChange: (e) => setQ(e.target.value),
						"aria-label": "Tìm kiếm toàn cục"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "max-h-80 overflow-y-auto pb-3",
					children: [q && results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-4 py-6 text-center text-sm text-muted",
						children: "Không tìm thấy."
					}) : null, results.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex min-h-12 w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-choice",
						onClick: () => {
							onOpenChange(false);
							router.navigate({ to: r.to });
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-20 shrink-0 text-[11px] uppercase tracking-wide text-muted",
								children: r.type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-jp text-base",
								children: r.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-sm text-muted",
								children: r.sub
							})
						]
					}) }, `${r.to}-${i}`))]
				})
			]
		})
	});
}
function NavLinks({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const groups = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const item of NAV) {
			const list = map.get(item.group) ?? [];
			list.push(item);
			map.set(item.group, list);
		}
		return [...map.entries()];
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-5",
		"aria-label": "Điều hướng chính",
		children: groups.map(([group, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted",
			children: group
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-0.5",
			children: items.map((item) => {
				const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					onClick: onNavigate,
					className: cn("flex h-10 items-center gap-2.5 rounded-[10px] px-3 text-sm transition-colors", active ? "bg-primary text-primary-fg" : "text-muted hover:bg-bg-elevated hover:text-fg"),
					"aria-current": active ? "page" : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), item.label]
				}) }, item.to);
			})
		})] }, group))
	});
}
function AppShell({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [search, setSearch] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const load = useProgress((s) => s.load);
	const applyDom = useSettings((s) => s.applyDom);
	const theme = useSettings((s) => s.theme);
	const aiMode = useSettings((s) => s.aiMode);
	const localAiUrl = useSettings((s) => s.localAiUrl);
	const localAiModel = useSettings((s) => s.localAiModel);
	const localAiKind = useSettings((s) => s.localAiKind);
	const localAiSystem = useSettings((s) => s.localAiSystem);
	const localAiTemperature = useSettings((s) => s.localAiTemperature);
	const localAiMaxTokens = useSettings((s) => s.localAiMaxTokens);
	(0, import_react.useEffect)(() => {
		initSettingsDom();
		applyDom();
		load();
		import("./_ssr/catalog-BHXFuF28.mjs").then((n) => n.r).then((n) => n.r).then((m) => m.fullDictionary());
	}, [applyDom, load]);
	(0, import_react.useEffect)(() => {
		applyLocalAiFromSettings({
			aiMode,
			localAiUrl,
			localAiModel,
			localAiKind,
			localAiSystem,
			localAiTemperature,
			localAiMaxTokens
		});
	}, [
		aiMode,
		localAiUrl,
		localAiModel,
		localAiKind,
		localAiSystem,
		localAiTemperature,
		localAiMaxTokens
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setSearch(true);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-60 overflow-y-auto border-r border-border bg-bg-elevated/80 px-3 py-5 backdrop-blur-sm lg:flex lg:flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "mb-4 flex items-center gap-2.5 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-9 items-center justify-center rounded-[10px] bg-primary font-jp text-lg text-primary-fg",
							children: "明"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-semibold leading-tight",
							children: "Akari"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[11px] text-muted",
							children: "Học tiếng Nhật"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSearch(true),
						className: "mb-5 flex h-10 w-full items-center gap-2 rounded-[10px] border border-border bg-choice px-3 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 text-left",
								children: "Tìm kiếm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "rounded border border-border px-1.5 text-[10px]",
								children: "⌘K"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnlineUsersList, { compact: true })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-auto border-t border-border px-1 pt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border bg-bg/90 px-3 backdrop-blur-sm lg:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						"aria-label": "Mở menu",
						onClick: () => setOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2 font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-8 items-center justify-center rounded-md bg-primary font-jp text-primary-fg",
							children: "明"
						}), "Akari"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							"aria-label": "Tìm kiếm",
							onClick: () => setSearch(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, { compact: true })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Akari" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-2 pb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, { onNavigate: () => setOpen(false) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 px-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnlineUsersList, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 px-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "px-4 pb-24 pt-6 lg:ml-60 lg:px-10 lg:pb-12 lg:pt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "akari-rise mx-auto w-full max-w-5xl",
					children
				}, pathname)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-border bg-surface/95 px-1 py-1 backdrop-blur-sm lg:hidden",
				style: { paddingBottom: "max(0.35rem, env(safe-area-inset-bottom))" },
				"aria-label": "Thanh điều hướng",
				children: MOBILE_TAB.map((item) => {
					const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-md text-[10px]", active ? "text-primary" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), item.label]
					}, item.to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchDialog, {
				open: search,
				onOpenChange: setSearch
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresenceHeartbeat, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: theme === "dark" ? "dark" : theme === "light" ? "light" : "system",
				position: "bottom-center"
			})
		]
	}) });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
//#endregion
export { SplitComponent as component };
