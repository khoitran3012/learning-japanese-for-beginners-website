import { o as __toESM } from "../_runtime.mjs";
import { E as require_react, T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as searchLocal } from "./local-D5_3Xz6J.mjs";
import { u as clearImportedDictionary, v as putImportedEntries } from "./storage-BvOEP3N4.mjs";
import { c as mergeDictionary, n as builtinDictionary, o as fullDictionary, p as setImportedCache, u as rememberImported } from "./catalog-Ba7ml22_.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { n as CardContent, t as Card } from "./card-BGiMB6P_.mjs";
import { i as parseDictionaryJson, r as importDictionary } from "./import-CvWp5blA.mjs";
import { t as Badge } from "./badge-BjjZgNOo.mjs";
import { t as Textarea } from "./textarea-B3zn85Mz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tools.import-dictionary-BStj5KP8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ACCEPTANCE_CASES = [
	{
		q: "学校",
		expect: "学校",
		note: "Kanji"
	},
	{
		q: "がっこう",
		expect: "学校",
		note: "Kana"
	},
	{
		q: "gakkou",
		expect: "学校",
		note: "Romaji"
	},
	{
		q: "trường học",
		expect: "学校",
		note: "Nghĩa Việt"
	},
	{
		q: "truong hoc",
		expect: "学校",
		note: "Nghĩa không dấu"
	},
	{
		q: "gakko",
		expect: "学校",
		note: "Romaji thiếu dấu dài"
	},
	{
		q: "食べる",
		expect: "食べる",
		note: "Động từ N5"
	},
	{
		q: "taberu",
		expect: "食べる",
		note: "Romaji động từ"
	},
	{
		q: "ăn",
		expect: "食べる",
		note: "Nghĩa Việt động từ"
	},
	{
		q: "食べます",
		expect: "食べる",
		note: "Dạng lịch sự"
	},
	{
		q: "cam on",
		expect: "ありがとう",
		note: "Cảm ơn không dấu"
	},
	{
		q: "desu",
		expect: "です",
		note: "Copula"
	},
	{
		q: "は",
		expect: "は",
		note: "Trợ từ chủ đề"
	},
	{
		q: "namae",
		expect: "名前",
		note: "Tên (romaji)"
	},
	{
		q: "tên",
		expect: "名前",
		note: "Tên (Việt)"
	},
	{
		q: "oishii",
		expect: "美味しい",
		note: "Ngon"
	},
	{
		q: "行きます",
		expect: "行く",
		note: "Đi — dạng ます"
	},
	{
		q: "iu",
		expect: "言う",
		note: "Nói"
	}
];
function runAcceptance(dict) {
	return ACCEPTANCE_CASES.map((c) => {
		const hits = searchLocal(dict, {
			q: c.q,
			limit: 8
		});
		const hit = hits.find((e) => e.kanji === c.expect) ?? hits[0];
		const pass = Boolean(hits.some((e) => e.kanji === c.expect));
		return {
			...c,
			pass,
			top: hit ? `${hit.kanji} ${hit.kana} ${hit.romaji} · ${hit.meanings[0]}` : "—"
		};
	});
}
var SAMPLE = `{
  "entries": [
    {
      "kanji": "学校",
      "kana": "がっこう",
      "romaji": "gakkou",
      "meanings": ["trường học"],
      "part_of_speech": ["danh từ"],
      "jlpt": ["N5"],
      "common": true,
      "examples": [
        {
          "jp": "学校は駅の近くです。",
          "kana": "がっこうはえきのちかくです。",
          "romaji": "Gakkou wa eki no chikaku desu.",
          "vi": "Trường ở gần nhà ga."
        }
      ]
    }
  ]
}`;
function Page() {
	const [text, setText] = (0, import_react.useState)(SAMPLE);
	const [log, setLog] = (0, import_react.useState)([]);
	const builtin = (0, import_react.useMemo)(() => builtinDictionary(), []);
	const [tests, setTests] = (0, import_react.useState)([]);
	const fileRef = (0, import_react.useRef)(null);
	function parse() {
		const parsed = parseDictionaryJson(text);
		if ("error" in parsed) {
			setLog([`JSON lỗi: ${parsed.error}`]);
			return null;
		}
		const result = importDictionary(parsed.data);
		setLog(result.issues.length ? result.issues.map((i) => `${i.level.toUpperCase()} [#${i.index}] ${i.field ?? ""} ${i.message}`) : [`Hợp lệ · ${result.entries.length} mục · ${Object.keys(result.index).length} khóa index`]);
		return result;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "DEV",
			title: "Import từ điển",
			description: "JSON → kiểm tra → chuẩn hóa → index → IndexedDB. Không dùng Google Translate / scraping."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: text,
					onChange: (e) => setText(e.target.value),
					className: "min-h-56 font-mono text-xs",
					spellCheck: false,
					"aria-label": "JSON từ điển"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => parse(),
							children: "Kiểm tra"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: async () => {
								const result = parse();
								if (!result?.ok) {
									toast.error("Sửa lỗi trước khi lưu");
									return;
								}
								await putImportedEntries(result.entries);
								rememberImported(result.entries);
								toast(`Đã lưu ${result.entries.length} mục vào máy`);
							},
							children: "Lưu vào IndexedDB"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => fileRef.current?.click(),
							children: "Mở file JSON"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "application/json,.json",
							className: "hidden",
							onChange: async (e) => {
								const f = e.target.files?.[0];
								e.target.value = "";
								if (!f) return;
								try {
									setText(await f.text());
									toast(`Đã mở ${f.name}`);
								} catch {
									toast.error("Không đọc được file");
								}
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: async () => {
								const dict = await fullDictionary();
								const blob = new Blob([JSON.stringify({ entries: dict }, null, 2)], { type: "application/json" });
								const url = URL.createObjectURL(blob);
								const a = document.createElement("a");
								a.href = url;
								a.download = "dictionary.json";
								a.click();
								URL.revokeObjectURL(url);
							},
							children: "Xuất dictionary.json"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							onClick: async () => {
								await clearImportedDictionary();
								setImportedCache([]);
								toast("Đã xóa từ điển import");
							},
							children: "Xóa import"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: async () => {
								const parsed = parseDictionaryJson(text);
								const extra = "data" in parsed ? importDictionary(parsed.data).entries : [];
								const dict = extra.length ? mergeDictionary(extra) : await fullDictionary();
								setTests(runAcceptance(dict.length ? dict : builtin));
							},
							children: "Chạy acceptance"
						})
					]
				})]
			})
		}),
		log.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 font-mono text-xs",
				children: log.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: l }, l))
			}) })
		}) : null,
		tests.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-medium",
			children: "Acceptance"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2",
			children: tests.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-wrap items-center gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: t.pass ? "success" : "seal",
						children: t.pass ? "PASS" : "FAIL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-jp",
						children: t.q
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: t.note
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-subtle",
						children: t.top
					})
				]
			}, t.q))
		})] }) }) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-muted",
			children: [
				"Bộ từ đi kèm: ",
				builtin.length,
				" mục (từ vựng N5/N4 + biểu hiện + từ lõi). Tìm kiếm gồm dạng ます/て/ない."
			]
		})
	] });
}
//#endregion
export { Page as component };
