import { n as KATAKANA, t as HIRAGANA } from "./kana-CV-aAiLY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lesson-links-D_7bi2YH.js
var ROW_LESSON = {
	"l-n5-hira-a": "a",
	"l-n5-hira-ka": "ka",
	"l-n5-hira-sa": "sa",
	"l-n5-hira-ta": "ta",
	"l-n5-hira-na": "na",
	"l-n5-hira-ha": "ha",
	"l-n5-hira-ma": "ma",
	"l-n5-hira-ya": "ya"
};
function kanaHref(kind, row) {
	const list = kind === "hiragana" ? HIRAGANA : KATAKANA;
	const found = row ? list.find((k) => k.row === row) : list[0];
	if (!found) return `/${kind}`;
	return `/${kind}/${found.id}`;
}
function practiceLink(id) {
	if (id.startsWith("h-")) return {
		to: `/hiragana/${id}`,
		label: "Hiragana"
	};
	if (id.startsWith("k-")) return {
		to: `/katakana/${id}`,
		label: "Katakana"
	};
	if (id.startsWith("v-")) return {
		to: `/vocabulary/${id}`,
		label: "Từ vựng"
	};
	if (id.startsWith("g-")) return {
		to: `/grammar/${id}`,
		label: "Ngữ pháp"
	};
	if (id.startsWith("kj-")) return {
		to: `/kanji/${id}`,
		label: "Kanji"
	};
	return null;
}
function lessonPracticeLinks(lesson) {
	const fromIds = (lesson.practiceIds ?? []).map(practiceLink).filter((x) => Boolean(x));
	const seen = /* @__PURE__ */ new Set();
	const unique = [];
	for (const link of fromIds) {
		if (seen.has(link.to)) continue;
		seen.add(link.to);
		unique.push(link);
	}
	if (unique.length > 0) return unique;
	const row = ROW_LESSON[lesson.id];
	if (row) return [{
		to: kanaHref("hiragana", row),
		label: `Hàng ${row.toUpperCase()}`
	}];
	switch (lesson.stage) {
		case "nền tảng":
			if (lesson.id === "l0-1") return [{
				to: "/alphabet",
				label: "Bảng chữ cái"
			}];
			if (lesson.id === "l0-2") return [{
				to: "/romaji",
				label: "Romaji"
			}];
			return [{
				to: kanaHref("hiragana", "a"),
				label: "Nguyên âm"
			}];
		case "hiragana": return [{
			to: "/hiragana",
			label: "Hiragana"
		}];
		case "katakana": return [{
			to: "/katakana",
			label: "Katakana"
		}];
		case "từ vựng": return [{
			to: "/vocabulary",
			label: "Từ vựng"
		}];
		case "ngữ pháp": return [{
			to: "/grammar",
			label: "Ngữ pháp"
		}];
		case "kanji": return [{
			to: "/kanji",
			label: "Kanji"
		}];
		case "đọc": return [{
			to: "/read",
			label: "Luyện đọc"
		}];
		case "nghe": return [{
			to: "/listen",
			label: "Luyện nghe"
		}];
		case "kiểm tra": return [{
			to: "/quiz",
			label: "Quiz"
		}];
		default: return [{
			to: "/daily",
			label: "Bài hôm nay"
		}];
	}
}
function primaryLessonHref(lesson) {
	return lessonPracticeLinks(lesson)[0]?.to ?? `/path/${lesson.id}`;
}
//#endregion
export { primaryLessonHref as n, lessonPracticeLinks as t };
