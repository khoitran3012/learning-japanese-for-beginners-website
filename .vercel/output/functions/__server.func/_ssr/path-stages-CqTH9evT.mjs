import { t as LESSONS } from "./lessons-C7yMsqVQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/path-stages-CqTH9evT.js
var PATH_STAGES = [
	{
		id: "nền tảng",
		label: "Nền tảng",
		kicker: "基礎"
	},
	{
		id: "hiragana",
		label: "Hiragana",
		kicker: "ひらがな"
	},
	{
		id: "katakana",
		label: "Katakana",
		kicker: "カタカナ"
	},
	{
		id: "từ vựng",
		label: "Từ vựng",
		kicker: "語彙"
	},
	{
		id: "ngữ pháp",
		label: "Ngữ pháp",
		kicker: "文法"
	},
	{
		id: "kanji",
		label: "Kanji",
		kicker: "漢字"
	},
	{
		id: "đọc",
		label: "Đọc hiểu",
		kicker: "読解"
	},
	{
		id: "nghe",
		label: "Nghe hiểu",
		kicker: "聴解"
	},
	{
		id: "kiểm tra",
		label: "Kiểm tra",
		kicker: "確認"
	}
];
var STAGE_TOTALS = PATH_STAGES.reduce((acc, s) => {
	acc[s.id] = LESSONS.filter((l) => l.stage === s.id).length;
	return acc;
}, {});
LESSONS.length;
var LESSON_STAGE = Object.fromEntries(LESSONS.map((l) => [l.id, l.stage]));
function stageLabel(id) {
	return PATH_STAGES.find((s) => s.id === id)?.label ?? id;
}
function countCompletedByStage(completed) {
	const counts = {};
	for (const id of completed) {
		const stage = LESSON_STAGE[id];
		if (!stage) continue;
		counts[stage] = (counts[stage] ?? 0) + 1;
	}
	return counts;
}
//#endregion
export { stageLabel as a, countCompletedByStage as i, PATH_STAGES as n, STAGE_TOTALS as r, LESSON_STAGE as t };
