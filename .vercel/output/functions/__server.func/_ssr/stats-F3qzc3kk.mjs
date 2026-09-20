import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as KANJI_N5, t as KANJI_N4 } from "./kanji-n4-Bq9tkueZ.mjs";
import { n as GRAMMAR_N5, t as GRAMMAR_N4 } from "./grammar-n4-Dv0a1spF.mjs";
import { t as VOCAB_N5 } from "./vocabulary-n5-DDorjkhE.mjs";
import { t as VOCAB_N4 } from "./vocabulary-n4-CVIZPi7y.mjs";
import { n as KATAKANA, t as HIRAGANA } from "./kana-CV-aAiLY.mjs";
import { i as useProgress, n as learnedCount, r as masteredCount, t as isDue } from "./progress-QMZec7H2.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { t as Progress } from "./progress-059PnNni.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats-F3qzc3kk.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const srs = useProgress((s) => s.srs);
	const streak = useProgress((s) => s.streak);
	const today = useProgress((s) => s.today);
	const quiz = useProgress((s) => s.quizScores);
	const rows = [
		{
			label: "Hiragana",
			value: learnedCount(srs, "h-"),
			total: HIRAGANA.length
		},
		{
			label: "Katakana",
			value: learnedCount(srs, "k-"),
			total: KATAKANA.length
		},
		{
			label: "Từ vựng",
			value: learnedCount(srs, "v-"),
			total: VOCAB_N5.length + VOCAB_N4.length
		},
		{
			label: "Kanji",
			value: learnedCount(srs, "kj-"),
			total: KANJI_N5.length + KANJI_N4.length
		},
		{
			label: "Ngữ pháp",
			value: learnedCount(srs, "g-"),
			total: GRAMMAR_N5.length + GRAMMAR_N4.length
		}
	];
	const due = Object.values(srs).filter(isDue).length;
	const mastered = Object.values(srs).filter((x) => x.status === "mastered").length;
	const avg = quiz.length ? Math.round(quiz.reduce((a, q) => a + q.score / q.total, 0) / quiz.length * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "統計",
			title: "Thống kê",
			description: "Số liệu trên máy này. Đăng nhập để so sánh XP trên bảng thi đua."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 grid gap-3 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Chuỗi"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-2xl font-semibold tabular-nums",
						children: [streak, " ngày"]
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Hôm nay"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-2xl font-semibold tabular-nums",
						children: [Math.round(today?.minutes ?? 0), " phút"]
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Nhớ tốt"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xl font-semibold tabular-nums",
						children: mastered
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Cần ôn"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xl font-semibold tabular-nums",
						children: due
					})]
				}) })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-4",
			children: [rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				label: `${r.label} ${r.value}/${r.total}`,
				value: r.value / r.total * 100
			}, r.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				label: `Quiz ${avg}%`,
				value: avg
			})]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-muted",
			children: [
				"Từ đã học: ",
				learnedCount(srs, "v-"),
				" · Hiragana thuộc: ",
				masteredCount(srs, "h-"),
				" · Katakana thuộc: ",
				masteredCount(srs, "k-")
			]
		})
	] });
}
//#endregion
export { Page as component };
