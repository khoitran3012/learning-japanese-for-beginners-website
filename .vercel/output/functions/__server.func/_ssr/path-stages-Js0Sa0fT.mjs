import { t as LESSONS } from "./lessons-C9QwqSa3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/path-stages-Js0Sa0fT.js
/** Thứ tự lớp Việt: kana → nói/từ → kanji Hán-Việt → ngữ pháp → đọc nghe → nâng cao. */
var PATH_STAGES = [
	{
		id: "nền tảng",
		label: "Làm quen",
		kicker: "基礎",
		hint: "Hiểu tiếng Nhật ghi âm thế nào trước khi viết."
	},
	{
		id: "hiragana",
		label: "Hiragana",
		kicker: "ひらがな",
		hint: "Bảng 50 âm — đọc được thì mới nghe và nói được."
	},
	{
		id: "katakana",
		label: "Katakana",
		kicker: "カタカナ",
		hint: "Từ mượn, tên riêng, thực đơn."
	},
	{
		id: "giao tiếp",
		label: "Nói & từ vựng N5",
		kicker: "会話",
		hint: "Chào hỏi, số, gia đình, trường, ăn uống — nghe rồi nhắc."
	},
	{
		id: "kanji",
		label: "Kanji + Hán-Việt",
		kicker: "漢字",
		hint: "Mỗi chữ một âm Hán-Việt để nhớ nghĩa, rồi mới on/kun."
	},
	{
		id: "từ vựng",
		label: "Từ vựng N4",
		kicker: "語彙",
		hint: "Từ công việc, xã hội — học trong cụm."
	},
	{
		id: "ngữ pháp",
		label: "Ngữ pháp",
		kicker: "文法",
		hint: "Trợ từ và mẫu câu sau khi đã có từ để nhét vào."
	},
	{
		id: "đọc",
		label: "Đọc hiểu",
		kicker: "読解",
		hint: "Đoạn ngắn, tìm chủ đề và động từ cuối câu."
	},
	{
		id: "nghe",
		label: "Nghe nói",
		kicker: "聴解",
		hint: "Nghe từ/câu, chọn đúng nghĩa — rồi nhại lại."
	},
	{
		id: "kiểm tra",
		label: "Kiểm tra",
		kicker: "確認",
		hint: "Chốt N5 rồi N4 trước khi lên cấp."
	},
	{
		id: "nâng cao",
		label: "N3 → N1",
		kicker: "上級",
		hint: "Tự học với từ điển N3–N1, nghe và kanji ghép."
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
function stageHint(id) {
	return PATH_STAGES.find((s) => s.id === id)?.hint ?? "";
}
function stageKicker(id) {
	return PATH_STAGES.find((s) => s.id === id)?.kicker ?? "";
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
/** Gom bài theo thứ tự học — mỗi cụm liên tiếp cùng stage là một chặng. */
function journeyGroups(lessons = LESSONS) {
	const sorted = [...lessons].sort((a, b) => a.order - b.order);
	const groups = [];
	for (const lesson of sorted) {
		const last = groups[groups.length - 1];
		if (last && last.stage === lesson.stage) last.items.push(lesson);
		else groups.push({
			stage: lesson.stage,
			items: [lesson]
		});
	}
	return {
		sorted,
		groups
	};
}
//#endregion
export { journeyGroups as a, stageLabel as c, countCompletedByStage as i, PATH_STAGES as n, stageHint as o, STAGE_TOTALS as r, stageKicker as s, LESSON_STAGE as t };
