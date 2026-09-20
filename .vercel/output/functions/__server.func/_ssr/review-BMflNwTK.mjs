import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as shuffle } from "./utils-D10sm1uC.mjs";
import { f as resolveStudyItem } from "./catalog-B78poYwc.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as useSettings } from "./settings-BVK2Ns8d.mjs";
import { i as useProgress, t as isDue } from "./progress-QMZec7H2.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { t as EmptyState } from "./empty-state-A1bLnuh-.mjs";
import { t as FlashcardDeck } from "./flashcard-deck-BMXg5u3x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/review-BMflNwTK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const srs = useProgress((s) => s.srs);
	const ready = useProgress((s) => s.ready);
	const showRomaji = useSettings((s) => s.showRomaji);
	const due = (0, import_react.useMemo)(() => Object.values(srs).filter(isDue), [srs]);
	const cards = (0, import_react.useMemo)(() => {
		return shuffle(due).map((item) => {
			const r = resolveStudyItem(item.id);
			return {
				id: item.id,
				front: r?.title ?? item.id,
				back: r?.sub ?? "",
				speak: r?.speak,
				type: item.itemType
			};
		});
	}, [due, showRomaji]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "復習",
		title: "Ôn tập",
		description: "Phiên ôn các mục đến hạn theo spaced repetition. Lật thẻ, rồi chọn Quên / Khó / Nhớ / Dễ."
	}), !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Đang tải tiến độ…"
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlashcardDeck, {
		cards,
		sessionKey: `review-${ready ? "1" : "0"}-${showRomaji ? "ro" : "ja"}`,
		empty: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Không có mục đến hạn",
			description: "Học thêm chữ hoặc từ, rồi quay lại đây. Flashcard sẽ đưa thẻ mới vào hàng ôn.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/flashcards",
					children: "Mở flashcard"
				})
			})
		})
	})] });
}
//#endregion
export { Page as component };
