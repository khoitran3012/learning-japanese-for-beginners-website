//#region node_modules/.nitro/vite/services/ssr/assets/config-BHwtEIDq.js
var GARDEN_CONFIG = {
	xp: {
		perWord: 3,
		perLesson: 20,
		/** Daily claim after a real study session that day. */
		daily: 15,
		/** Max words the client may add in one sync (anti-cheat). */
		maxWordDelta: 80,
		maxWords: 2e4
	},
	levels: [
		{
			level: 1,
			xp: 0,
			name: "Hạt giống",
			nameJp: "種"
		},
		{
			level: 2,
			xp: 40,
			name: "Mầm non",
			nameJp: "芽"
		},
		{
			level: 3,
			xp: 140,
			name: "Khu vườn nhỏ",
			nameJp: "小さな庭"
		},
		{
			level: 4,
			xp: 360,
			name: "Khu vườn phát triển",
			nameJp: "庭園"
		},
		{
			level: 5,
			xp: 800,
			name: "Khu vườn hoàn chỉnh",
			nameJp: "楽園"
		},
		{
			level: 6,
			xp: 1600,
			name: "Khu rừng nhỏ",
			nameJp: "小さな森"
		}
	],
	items: [
		{
			id: "sprout",
			name: "Mầm cây",
			nameJp: "芽",
			category: "plants",
			description: "Mầm đầu tiên khi bạn bắt đầu học.",
			x: 48,
			y: 72,
			scale: 1
		},
		{
			id: "grass",
			name: "Cỏ non",
			nameJp: "若草",
			category: "plants",
			description: "Cỏ mọc khi bạn học những từ đầu tiên.",
			x: 36,
			y: 78,
			scale: 1
		},
		{
			id: "wildflower",
			name: "Hoa dại",
			nameJp: "野花",
			category: "plants",
			description: "Những bông hoa nhỏ ven đường.",
			x: 62,
			y: 76,
			scale: 1
		},
		{
			id: "flower-bed",
			name: "Luống hoa",
			nameJp: "花壇",
			category: "plants",
			description: "Một luống hoa đủ màu.",
			x: 28,
			y: 70,
			scale: 1.1
		},
		{
			id: "herb",
			name: "Rau thơm",
			nameJp: "ハーブ",
			category: "plants",
			description: "Bụi thảo mộc nhỏ cạnh đá.",
			x: 70,
			y: 68,
			scale: .9
		},
		{
			id: "sakura",
			name: "Hoa anh đào nhỏ",
			nameJp: "桜",
			category: "plants",
			description: "Cây anh đào nở khi vốn từ đủ đầy.",
			x: 22,
			y: 52,
			scale: 1.25,
			z: 2
		},
		{
			id: "pine",
			name: "Thông xanh",
			nameJp: "松",
			category: "plants",
			description: "Cây thông vững chãi.",
			x: 78,
			y: 48,
			scale: 1.2,
			z: 2
		},
		{
			id: "maple",
			name: "Phong",
			nameJp: "紅葉",
			category: "plants",
			description: "Cây phong đổi màu theo mùa.",
			x: 12,
			y: 56,
			scale: 1.1,
			z: 2
		},
		{
			id: "ancient-tree",
			name: "Cây cổ thụ",
			nameJp: "古木",
			category: "plants",
			description: "Cây lớn nhất khu vườn.",
			x: 84,
			y: 42,
			scale: 1.4,
			z: 1
		},
		{
			id: "stones",
			name: "Đá rêu",
			nameJp: "苔石",
			category: "decor",
			description: "Cục đá phủ rêu.",
			x: 42,
			y: 74,
			scale: .85
		},
		{
			id: "path",
			name: "Con đường nhỏ",
			nameJp: "小道",
			category: "decor",
			description: "Lối đi đá xuyên vườn.",
			x: 50,
			y: 80,
			scale: 1
		},
		{
			id: "pond",
			name: "Hồ nước",
			nameJp: "池",
			category: "decor",
			description: "Hồ tròn phản chiếu trời.",
			x: 58,
			y: 62,
			scale: 1.15,
			z: 0
		},
		{
			id: "bridge",
			name: "Cầu gỗ",
			nameJp: "橋",
			category: "decor",
			description: "Cầu cong bắc qua hồ.",
			x: 58,
			y: 58,
			scale: 1,
			z: 3
		},
		{
			id: "lantern",
			name: "Đèn đá",
			nameJp: "灯籠",
			category: "decor",
			description: "Đèn đá sáng vào buổi tối.",
			x: 40,
			y: 60,
			scale: .95
		},
		{
			id: "house",
			name: "Nhà nhỏ",
			nameJp: "小屋",
			category: "decor",
			description: "Mái rêu, cửa gỗ, đèn vàng.",
			x: 74,
			y: 54,
			scale: 1.2,
			z: 2
		},
		{
			id: "chime",
			name: "Chuông gió",
			nameJp: "風鈴",
			category: "decor",
			description: "Chuông gió trên hiên nhà.",
			x: 71,
			y: 50,
			scale: .7,
			z: 4
		},
		{
			id: "butterfly",
			name: "Bướm",
			nameJp: "蝶",
			category: "animals",
			description: "Bướm bay quanh hoa.",
			x: 34,
			y: 66,
			scale: .7
		},
		{
			id: "bird",
			name: "Chim sẻ",
			nameJp: "雀",
			category: "animals",
			description: "Chim sẻ ghé thăm.",
			x: 64,
			y: 44,
			scale: .75
		},
		{
			id: "frog",
			name: "Ếch",
			nameJp: "蛙",
			category: "animals",
			description: "Ếch ngồi bên hồ.",
			x: 54,
			y: 64,
			scale: .7
		},
		{
			id: "squirrel",
			name: "Sóc",
			nameJp: "リス",
			category: "animals",
			description: "Sóc trên cành thông.",
			x: 80,
			y: 46,
			scale: .7
		},
		{
			id: "cat",
			name: "Mèo vườn",
			nameJp: "猫",
			category: "animals",
			description: "Mèo ngủ dưới mái hiên.",
			x: 68,
			y: 62,
			scale: .85
		},
		{
			id: "fireflies",
			name: "Đom đóm",
			nameJp: "蛍",
			category: "special",
			description: "Đom đóm chỉ hiện khi trời tối.",
			x: 50,
			y: 58,
			scale: 1
		},
		{
			id: "moon",
			name: "Trăng",
			nameJp: "月",
			category: "special",
			description: "Mảnh trăng đêm yên tĩnh.",
			x: 82,
			y: 16,
			scale: 1
		},
		{
			id: "star",
			name: "Sao",
			nameJp: "星",
			category: "special",
			description: "Bầu trời đầy sao.",
			x: 18,
			y: 14,
			scale: 1
		}
	],
	milestones: [
		{
			id: "m-sprout",
			itemId: "sprout",
			label: "Bắt đầu học",
			words: 1
		},
		{
			id: "m-grass",
			itemId: "grass",
			label: "10 từ đã học",
			words: 10
		},
		{
			id: "m-stones",
			itemId: "stones",
			label: "3 bài quiz",
			quizzes: 3
		},
		{
			id: "m-wildflower",
			itemId: "wildflower",
			label: "25 từ",
			words: 25
		},
		{
			id: "m-path",
			itemId: "path",
			label: "5 bài học",
			lessons: 5
		},
		{
			id: "m-flower-bed",
			itemId: "flower-bed",
			label: "50 từ",
			words: 50
		},
		{
			id: "m-herb",
			itemId: "herb",
			label: "75 từ",
			words: 75
		},
		{
			id: "m-butterfly",
			itemId: "butterfly",
			label: "7 ngày streak",
			streak: 7
		},
		{
			id: "m-sakura",
			itemId: "sakura",
			label: "100 từ — hoa anh đào",
			words: 100
		},
		{
			id: "m-lantern",
			itemId: "lantern",
			label: "10 bài học",
			lessons: 10
		},
		{
			id: "m-pond",
			itemId: "pond",
			label: "200 từ — hồ nước",
			words: 200
		},
		{
			id: "m-bird",
			itemId: "bird",
			label: "14 ngày streak",
			streak: 14
		},
		{
			id: "m-bridge",
			itemId: "bridge",
			label: "350 từ — cầu gỗ",
			words: 350
		},
		{
			id: "m-pine",
			itemId: "pine",
			label: "120 XP vườn",
			xp: 120
		},
		{
			id: "m-frog",
			itemId: "frog",
			label: "21 ngày streak",
			streak: 21
		},
		{
			id: "m-chime",
			itemId: "chime",
			label: "10 bài quiz",
			quizzes: 10
		},
		{
			id: "m-house",
			itemId: "house",
			label: "500 từ — nhà nhỏ",
			words: 500
		},
		{
			id: "m-maple",
			itemId: "maple",
			label: "20 bài học",
			lessons: 20
		},
		{
			id: "m-squirrel",
			itemId: "squirrel",
			label: "Khu vườn nhỏ (level 3)",
			xp: 140
		},
		{
			id: "m-cat",
			itemId: "cat",
			label: "30 ngày streak",
			streak: 30
		},
		{
			id: "m-fireflies",
			itemId: "fireflies",
			label: "50 câu quiz đúng",
			quizzes: 15
		},
		{
			id: "m-ancient",
			itemId: "ancient-tree",
			label: "800 từ — cây cổ thụ",
			words: 800
		},
		{
			id: "m-moon",
			itemId: "moon",
			label: "Khu vườn hoàn chỉnh",
			xp: 800
		},
		{
			id: "m-star",
			itemId: "star",
			label: "Khu rừng nhỏ",
			xp: 1600
		}
	]
};
var GARDEN_ITEM_MAP = Object.fromEntries(GARDEN_CONFIG.items.map((item) => [item.id, item]));
//#endregion
export { GARDEN_ITEM_MAP as n, GARDEN_CONFIG as t };
