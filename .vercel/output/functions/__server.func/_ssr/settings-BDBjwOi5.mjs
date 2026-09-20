import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime, a as Overlay2, c as Title2, i as Description2, l as Trigger2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as LESSONS } from "./lessons-C7yMsqVQ.mjs";
import { t as authClient } from "./client-CVqXY6bk.mjs";
import { n as KANJI_N5, t as KANJI_N4 } from "./kanji-n4-Bq9tkueZ.mjs";
import { n as GRAMMAR_N5, t as GRAMMAR_N4 } from "./grammar-n4-Dv0a1spF.mjs";
import { t as VOCAB_N5 } from "./vocabulary-n5-DDorjkhE.mjs";
import { t as VOCAB_N4 } from "./vocabulary-n4-CVIZPi7y.mjs";
import { n as KATAKANA, t as HIRAGANA } from "./kana-CV-aAiLY.mjs";
import { r as searchLocal, t as buildDictionary } from "./local-DrLvRlaq.mjs";
import { t as cn } from "./utils-D10sm1uC.mjs";
import { T as wipeUserData, g as importAll, m as exportAll, w as validateBackup } from "./storage-BvOEP3N4.mjs";
import { n as buttonVariants, t as Button } from "./button-D6esF8zp.mjs";
import { n as useCurrentUserState } from "./use-current-user-ClOiUQ-z.mjs";
import { u as createSsrRpc } from "./router-nloH8-FU.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress } from "./progress-QMZec7H2.mjs";
import { t as applyLocalAiFromSettings } from "./provider-BsUoWR6V.mjs";
import { t as Input } from "./input-qD8XPiq5.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { t as Textarea } from "./textarea-B3zn85Mz.mjs";
import { n as probeLocalAi } from "./local-rpc-DYkgSBBN.mjs";
import { t as Label } from "./label-2T3zHwov.mjs";
import { n as issueRecoveryCode, t as hasRecoveryCode } from "./recovery-DW64J2kr.mjs";
import { t as Switch } from "./switch-BOp23DnP.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BDBjwOi5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DataProvider = class {};
var current = null;
function setDataProvider(provider) {
	current = provider;
}
function getDataProvider() {
	if (!current) throw new Error("DataProvider chưa được khởi tạo");
	return current;
}
var LocalDataProvider = class extends DataProvider {
	name = "local";
	dict = null;
	async getKana() {
		return [...HIRAGANA, ...KATAKANA];
	}
	async getVocab() {
		return [...VOCAB_N5, ...VOCAB_N4];
	}
	async getKanji() {
		return [...KANJI_N5, ...KANJI_N4];
	}
	async getGrammar() {
		return [...GRAMMAR_N5, ...GRAMMAR_N4];
	}
	async getLessons() {
		return LESSONS;
	}
	async getDictionary() {
		if (!this.dict) {
			const extra = await import("./dictionary-extra-CkhUMB5P.mjs").then((n) => n.n).then((n) => n.n).then((m) => m.DICTIONARY_EXTRA);
			this.dict = buildDictionary([...VOCAB_N5, ...VOCAB_N4], [...KANJI_N5, ...KANJI_N4], extra);
		}
		return this.dict;
	}
	async searchDictionary(query) {
		const dict = await this.getDictionary();
		return searchLocal(dict, query);
	}
};
var RemoteDataProvider = class extends DataProvider {
	fallback;
	name = "remote";
	constructor(fallback) {
		super();
		this.fallback = fallback;
	}
	getKana() {
		return this.fallback.getKana();
	}
	getVocab() {
		return this.fallback.getVocab();
	}
	getKanji() {
		return this.fallback.getKanji();
	}
	getGrammar() {
		return this.fallback.getGrammar();
	}
	getLessons() {
		return this.fallback.getLessons();
	}
	getDictionary() {
		return this.fallback.getDictionary();
	}
	async searchDictionary(query) {
		try {
			const local = await this.fallback.searchDictionary(query);
			if (local.length > 0) return local;
			return local;
		} catch {
			return this.fallback.searchDictionary(query);
		}
	}
};
var local = new LocalDataProvider();
var remote = new RemoteDataProvider(local);
setDataProvider(local);
function useLocalFirst(online = false) {
	setDataProvider(online ? remote : local);
	return getDataProvider();
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex w-full touch-none items-center select-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full border border-border bg-surface shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" })]
	});
}
var AlertDialog = Root2;
var AlertDialogTrigger = Trigger2;
function AlertDialogContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal2, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, { className: "fixed inset-0 z-50 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		className: cn("fixed left-1/2 top-1/2 z-50 w-[min(440px,calc(100vw-1.5rem))] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-surface p-5 text-fg shadow-[var(--shadow-soft)]", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("space-y-2", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		className: cn("text-lg font-semibold", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		className: cn("text-sm text-muted", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-5 flex justify-end gap-2", className),
		...props
	});
}
function AlertDialogCancel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
		className: cn(buttonVariants({ variant: "secondary" }), className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		className: cn(buttonVariants({ variant: "danger" }), className),
		...props
	});
}
var getDbInfo = createServerFn({ method: "GET" }).handler(createSsrRpc("58bdad00eee37171961c843a0827de66cd01626ae7d9941befbc9456f3a03222"));
function Page() {
	const settings = useSettings();
	const load = useProgress((s) => s.load);
	const fileRef = (0, import_react.useRef)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [dbInfo, setDbInfo] = (0, import_react.useState)(null);
	const [aiModels, setAiModels] = (0, import_react.useState)([]);
	const [aiProbe, setAiProbe] = (0, import_react.useState)(null);
	const { user } = useCurrentUserState();
	const [hasCode, setHasCode] = (0, import_react.useState)(false);
	const [freshCode, setFreshCode] = (0, import_react.useState)(null);
	const [codeBusy, setCodeBusy] = (0, import_react.useState)(false);
	const [curPass, setCurPass] = (0, import_react.useState)("");
	const [newPass, setNewPass] = (0, import_react.useState)("");
	const [passBusy, setPassBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		useLocalFirst(settings.onlineDictionary);
	}, [settings.onlineDictionary]);
	(0, import_react.useEffect)(() => {
		getDbInfo().then(setDbInfo).catch(() => setDbInfo(null));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setHasCode(false);
			return;
		}
		hasRecoveryCode().then((r) => setHasCode(r.has)).catch(() => setHasCode(false));
	}, [user]);
	async function onExport() {
		const payload = await exportAll({
			theme: settings.theme,
			fontSize: settings.fontSize,
			showRomaji: settings.showRomaji,
			autoPlayAudio: settings.autoPlayAudio,
			ttsRate: settings.ttsRate,
			dailyGoal: settings.dailyGoal,
			flashcardPerDay: settings.flashcardPerDay,
			freeMode: settings.freeMode,
			onlineDictionary: settings.onlineDictionary,
			reducedMotion: settings.reducedMotion,
			aiMode: settings.aiMode,
			localAiUrl: settings.localAiUrl,
			localAiModel: settings.localAiModel,
			localAiKind: settings.localAiKind,
			localAiSystem: settings.localAiSystem,
			localAiTemperature: settings.localAiTemperature,
			localAiMaxTokens: settings.localAiMaxTokens
		});
		const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `akari-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
		a.click();
		URL.revokeObjectURL(url);
		toast("Đã tải file sao lưu");
	}
	async function onImport(file) {
		setBusy(true);
		try {
			const text = await file.text();
			const data = JSON.parse(text);
			if (!validateBackup(data)) {
				toast.error("File sao lưu không hợp lệ");
				return;
			}
			await importAll(data);
			if (data.settings && typeof data.settings === "object") settings.set(data.settings);
			await load();
			toast("Đã khôi phục dữ liệu");
		} catch {
			toast.error("Không đọc được file");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "設定",
		title: "Cài đặt",
		description: "Giao diện, ôn tập, AI local và sao lưu."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			dbInfo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Cơ sở dữ liệu SQL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Tài khoản, bảng xếp hạng, lộ trình và vườn được lưu bằng ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: dbInfo.label }),
							".",
							dbInfo.persistent ? " Dữ liệu còn sau khi tắt máy chủ." : " Muốn giữ tài khoản khi host: điền databaseUrl Postgres trong akari-host.json, hoặc chạy start-akari.bat (tự lưu file SQL)."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: "Tiến độ flashcard / SRS vẫn trên máy bạn (IndexedDB) để học offline."
					})
				]
			}) }) : null,
			user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Mật khẩu & khôi phục"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: ["App không gửi email. Mã khôi phục dùng khi quên mật khẩu trên trang đăng nhập.", hasCode ? " Bạn đã có mã — tạo mới sẽ hủy mã cũ." : " Bạn chưa có mã, hãy tạo ngay."]
					}),
					freshCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-[10px] border border-border bg-bg-elevated px-3 py-3 text-center font-mono text-lg tracking-wide",
						children: freshCode
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							disabled: codeBusy,
							onClick: async () => {
								setCodeBusy(true);
								try {
									const res = await issueRecoveryCode();
									if (res.ok) {
										setFreshCode(res.code);
										setHasCode(true);
										toast("Lưu mã này ngay — chỉ hiện một lần.");
									} else toast.error(res.error);
								} catch {
									toast.error("Không tạo được mã. Đăng nhập lại rồi thử.");
								} finally {
									setCodeBusy(false);
								}
							},
							children: hasCode ? "Tạo mã mới" : "Tạo mã khôi phục"
						}), freshCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => {
								navigator.clipboard.writeText(freshCode).then(() => toast("Đã chép mã"));
							},
							children: "Chép mã"
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cur-pass",
							children: "Mật khẩu hiện tại"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cur-pass",
							type: "password",
							autoComplete: "current-password",
							value: curPass,
							onChange: (e) => setCurPass(e.target.value),
							className: "mt-1"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "new-pass",
							children: "Mật khẩu mới"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "new-pass",
							type: "password",
							autoComplete: "new-password",
							minLength: 8,
							value: newPass,
							onChange: (e) => setNewPass(e.target.value),
							className: "mt-1"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: passBusy || curPass.length < 8 || newPass.length < 8,
						onClick: async () => {
							setPassBusy(true);
							try {
								const res = await authClient.changePassword({
									currentPassword: curPass,
									newPassword: newPass,
									revokeOtherSessions: true
								});
								if (res.error) toast.error(res.error.message || "Không đổi được mật khẩu.");
								else {
									toast("Đã đổi mật khẩu");
									setCurPass("");
									setNewPass("");
								}
							} catch {
								toast.error("Không đổi được mật khẩu.");
							} finally {
								setPassBusy(false);
							}
						},
						children: "Đổi mật khẩu"
					})
				]
			}) }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Giao diện"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							["system", "Theo hệ thống"],
							["light", "Sáng"],
							["dark", "Tối"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: settings.theme === id ? "default" : "secondary",
							onClick: () => settings.set({ theme: id }),
							children: label
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "mb-2 block",
						children: "Cỡ chữ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						children: [
							"sm",
							"md",
							"lg"
						].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: settings.fontSize === id ? "default" : "secondary",
							onClick: () => settings.set({ fontSize: id }),
							children: id === "sm" ? "Nhỏ" : id === "md" ? "Vừa" : "Lớn"
						}, id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "romaji",
							children: "Hiện Romaji"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: "romaji",
							checked: settings.showRomaji,
							onCheckedChange: (v) => settings.set({ showRomaji: v })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "motion",
							children: "Giảm chuyển động"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: "motion",
							checked: settings.reducedMotion,
							onCheckedChange: (v) => settings.set({ reducedMotion: v })
						})]
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Học tập"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
						className: "mb-2 block",
						children: [
							"Mục tiêu mỗi ngày: ",
							settings.dailyGoal,
							" phút"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 5,
						max: 60,
						step: 5,
						value: [settings.dailyGoal],
						onValueChange: ([v]) => settings.set({ dailyGoal: v ?? 15 })
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
						className: "mb-2 block",
						children: ["Flashcard mỗi phiên: ", settings.flashcardPerDay]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 5,
						max: 40,
						step: 5,
						value: [settings.flashcardPerDay],
						onValueChange: ([v]) => settings.set({ flashcardPerDay: v ?? 20 })
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
						className: "mb-2 block",
						children: ["Tốc độ đọc: ", settings.ttsRate.toFixed(1)]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: .6,
						max: 1.2,
						step: .1,
						value: [settings.ttsRate],
						onValueChange: ([v]) => settings.set({ ttsRate: v ?? .9 })
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "autoplay",
							children: "Tự đọc khi mở thẻ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: "autoplay",
							checked: settings.autoPlayAudio,
							onCheckedChange: (v) => settings.set({ autoPlayAudio: v })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "free",
							children: "Mở khóa lộ trình (chế độ tự do)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: "free",
							checked: settings.freeMode,
							onCheckedChange: (v) => settings.set({ freeMode: v })
						})]
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "AI gia sư"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Tùy chọn. Học không cần AI. Ollama chạy trên máy host (cùng máy với Akari). Đám mây chỉ gọi khi bạn bấm hỏi."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							["off", "Tắt"],
							["local", "AI local"],
							["cloud", "Đám mây"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: settings.aiMode === id ? "default" : "secondary",
							onClick: () => {
								settings.set({ aiMode: id });
								applyLocalAiFromSettings({
									...settings,
									aiMode: id
								});
							},
							children: label
						}, id))
					}),
					settings.aiMode === "local" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 rounded-[10px] border border-border bg-bg-elevated p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: settings.localAiKind === "ollama" ? "default" : "secondary",
									onClick: () => settings.set({
										localAiKind: "ollama",
										localAiUrl: "http://localhost:11434"
									}),
									children: "Ollama"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: settings.localAiKind === "openai" ? "default" : "secondary",
									onClick: () => settings.set({
										localAiKind: "openai",
										localAiUrl: "http://localhost:1234"
									}),
									children: "LM Studio"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "ai-url",
								children: "URL máy chủ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "ai-url",
								className: "mt-1",
								value: settings.localAiUrl,
								onChange: (e) => settings.set({ localAiUrl: e.target.value }),
								placeholder: "http://localhost:11434"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "ai-model",
								children: "Model"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "ai-model",
								className: "mt-1",
								value: settings.localAiModel,
								onChange: (e) => settings.set({ localAiModel: e.target.value }),
								placeholder: "llama3.2"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "mb-2 block",
								children: ["Nhiệt độ: ", (settings.localAiTemperature ?? .4).toFixed(1)]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 0,
								max: 1.2,
								step: .1,
								value: [settings.localAiTemperature ?? .4],
								onValueChange: ([v]) => settings.set({ localAiTemperature: v ?? .4 })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "mb-2 block",
								children: [
									"Độ dài trả lời: ",
									settings.localAiMaxTokens ?? 400,
									" token"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 120,
								max: 800,
								step: 40,
								value: [settings.localAiMaxTokens ?? 400],
								onValueChange: ([v]) => settings.set({ localAiMaxTokens: v ?? 400 })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "ai-sys",
								children: "Hướng dẫn hệ thống"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "ai-sys",
								className: "mt-1",
								rows: 3,
								value: settings.localAiSystem,
								onChange: (e) => settings.set({ localAiSystem: e.target.value })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								disabled: busy,
								onClick: async () => {
									applyLocalAiFromSettings(settings);
									setBusy(true);
									setAiProbe(null);
									try {
										const res = await probeLocalAi({ data: {
											url: settings.localAiUrl,
											kind: settings.localAiKind
										} });
										if (!res.ok) {
											setAiModels([]);
											setAiProbe(res.error);
											toast.error(res.error);
											return;
										}
										setAiModels(res.models);
										const current = settings.localAiModel.replace(/:latest$/, "");
										if (!res.models.find((m) => {
											return m.replace(/:latest$/, "") === current || m === settings.localAiModel || m.startsWith(`${current}:`);
										}) && res.models[0]) {
											const picked = res.models[0].replace(/:latest$/, "");
											settings.set({ localAiModel: picked });
											setAiProbe(`Kết nối được. Đã chọn model ${picked}.`);
										} else setAiProbe(`Kết nối được · ${res.models.length} model.`);
										toast.success("Kết nối Ollama được");
									} catch {
										setAiProbe("Không gọi được máy chủ Akari.");
										toast.error("Không gọi được máy chủ Akari.");
									} finally {
										setBusy(false);
									}
								},
								children: "Kiểm tra kết nối"
							}),
							aiProbe ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-sm ${aiProbe.startsWith("Kết nối") ? "text-muted" : "text-danger"}`,
								children: aiProbe
							}) : null,
							aiModels.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: aiModels.map((m) => {
									const short = m.replace(/:latest$/, "");
									const active = settings.localAiModel === m || settings.localAiModel === short || m.startsWith(`${settings.localAiModel}:`);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: active ? "default" : "secondary",
										onClick: () => settings.set({ localAiModel: short }),
										children: short
									}, m);
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-subtle",
								children: [
									"Akari gọi Ollama từ máy host (không cần CORS). Giữ URL",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "font-mono",
										children: "http://localhost:11434"
									}),
									". Nếu chưa có model, mở CMD:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "font-mono",
										children: "ollama pull llama3.2"
									})
								]
							})
						]
					}) : null
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Từ điển"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Mặc định tra bộ đi kèm trên máy (kể cả dạng ます/て). Bật nguồn bổ sung để tự tra khi không có kết quả — bạn vẫn xem và lưu từng mục."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "online",
							children: "Tự tra cứu bổ sung khi không có kết quả"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: "online",
							checked: settings.onlineDictionary,
							onCheckedChange: (v) => settings.set({ onlineDictionary: v })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/tools/import-dictionary",
							children: "Import / kiểm tra từ điển"
						})
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Sao lưu"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "File JSON chứa tiến độ SRS, yêu thích, từ của bạn và cài đặt. Không gửi lên máy chủ."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								onClick: () => void onExport(),
								children: "Tải sao lưu"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								disabled: busy,
								onClick: () => fileRef.current?.click(),
								children: "Khôi phục"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "application/json",
								className: "hidden",
								onChange: (e) => {
									const f = e.target.files?.[0];
									if (f) onImport(f);
									e.target.value = "";
								}
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							children: "Xóa dữ liệu trên máy"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Xóa toàn bộ tiến độ?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "SRS, yêu thích, từ của bạn và lịch sử tra sẽ mất. Hãy sao lưu trước nếu cần." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Hủy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						onClick: async () => {
							await wipeUserData();
							localStorage.removeItem("akari-settings");
							toast("Đã xóa dữ liệu");
							window.location.reload();
						},
						children: "Xóa"
					})] })] })] })
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-2 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium text-fg",
						children: "Akari"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Học tiếng Nhật từ số 0, ưu tiên N5 → N4. Dữ liệu bài học là nội dung gốc, không sao chép giáo trình thương mại." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Giấy phép mã nguồn MIT. Font và thư viện ghi trong ATTRIBUTIONS.md." })
				]
			}) })
		]
	})] });
}
//#endregion
export { Page as component };
