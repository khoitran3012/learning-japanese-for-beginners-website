import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as foldVi } from "./text-Kuvw8qUk.mjs";
import { t as cn } from "./utils-XG3oJXDV.mjs";
import { t as Input } from "./input-BD95aU7I.mjs";
import { t as SONGS } from "./songs-f1G8RIBv.mjs";
import { t as PageHeader } from "./page-header-CF9mcnZA.mjs";
import { t as Badge } from "./badge-BshL6Y_S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/songs.index-CXxuhVrR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const [q, setQ] = (0, import_react.useState)("");
	const [lv, setLv] = (0, import_react.useState)("all");
	const [series, setSeries] = (0, import_react.useState)("all");
	const list = (0, import_react.useMemo)(() => {
		const s = foldVi(q.trim());
		return SONGS.filter((song) => {
			if (lv !== "all" && song.level !== lv) return false;
			if (series === "hot" && song.series && song.series !== "Nổi bật") return false;
			if (series !== "all" && series !== "hot" && song.series !== series) return false;
			if (!s) return true;
			return foldVi(song.title).includes(s) || foldVi(song.romaji).includes(s) || foldVi(song.artist).includes(s) || foldVi(song.anime).includes(s) || foldVi(song.series ?? "").includes(s) || song.titleKana.includes(q.trim()) || song.vocab.some((v) => foldVi(v.meaning).includes(s) || v.kana.includes(q.trim()));
		});
	}, [
		lv,
		q,
		series
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "歌",
			title: "Bài hát anime",
			description: "Stay with Me, bài đang hot, và toàn bộ opening/ending truyền hình của Naruto (kể cả Shippuden, Boruto) và Dragon Ball. Học từ rồi nghe bản chính thức. App không đăng lời."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Tìm bài, anime, ca sĩ, từ..."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-3 flex flex-wrap gap-2",
			children: [
				["all", "Tất cả"],
				["hot", "Đang hot"],
				["Naruto", "Naruto"],
				["Dragon Ball", "Dragon Ball"]
			].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setSeries(id),
				className: cn("h-9 rounded-full border px-3 text-sm", series === id ? "border-primary bg-primary text-primary-fg" : "border-border text-muted"),
				children: label
			}, id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [
				["all", "Tất cả"],
				["N5", "Dễ N5"],
				["N4", "N4"],
				["N3", "Khó hơn"]
			].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setLv(id),
				className: cn("h-9 rounded-full border px-3 text-sm", lv === id ? "border-primary bg-primary text-primary-fg" : "border-border text-muted"),
				children: label
			}, id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm tabular-nums text-muted",
			children: [list.length, " bài"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3 sm:grid-cols-2",
			children: list.map((song) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/songs/$id",
				params: { id: song.id },
				className: "flex h-full flex-col rounded-xl border border-border bg-surface p-4 hover:border-accent",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-jp text-2xl text-fg",
							children: song.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 gap-1",
							children: [song.kind ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "muted",
								children: song.kind
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "muted",
								children: song.level
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-accent",
						children: song.romaji
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-fg",
						children: song.anime
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							song.artist,
							" · ",
							song.year
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: song.why
					})
				]
			}) }, song.id))
		}),
		list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Không thấy bài nào. Thử tên anime hoặc một từ tiếng Việt."
		}) : null
	] });
}
//#endregion
export { Page as component };
