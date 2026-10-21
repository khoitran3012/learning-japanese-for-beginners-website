globalThis.__nitro_main__ = import.meta.url;
import { a as toEventHandler, c as serve, i as defineLazyEventHandler, n as HTTPError, r as defineHandler, s as NodeResponse, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { existsSync, promises, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/apple-touch-icon.png": {
		"type": "image/png",
		"etag": "\"1d6-UkXfO+W/FoYKUnDG42PinceoDzY\"",
		"mtime": "2026-10-12T10:11:00.163Z",
		"size": 470,
		"path": "../public/apple-touch-icon.png"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"21c-3cqZ8irbgyr6SuwIQLpBiIX8sl0\"",
		"mtime": "2026-10-12T10:11:00.163Z",
		"size": 540,
		"path": "../public/favicon.svg"
	},
	"/icon-192.png": {
		"type": "image/png",
		"etag": "\"1e9-fLNdF8R4xzzUy7ly+NwDNVsbg4Y\"",
		"mtime": "2026-10-12T10:11:00.163Z",
		"size": 489,
		"path": "../public/icon-192.png"
	},
	"/icon-512.png": {
		"type": "image/png",
		"etag": "\"63f-ULAuCB3yIPE0EkMIRqz7T8wEhtM\"",
		"mtime": "2026-10-12T10:11:00.163Z",
		"size": 1599,
		"path": "../public/icon-512.png"
	},
	"/og.jpg": {
		"type": "image/jpeg",
		"etag": "\"f867-aQQh4SJLPAkWZkqlEP+MpcRFTmQ\"",
		"mtime": "2026-10-12T10:11:00.163Z",
		"size": 63591,
		"path": "../public/og.jpg"
	},
	"/__grok/icon-180.png": {
		"type": "image/png",
		"etag": "\"834-Xk8vfS0DTFn7ggtkfEduWTcNWGE\"",
		"mtime": "2026-10-12T10:11:00.163Z",
		"size": 2100,
		"path": "../public/__grok/icon-180.png"
	},
	"/assets/_app--C3xffsq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1525-xH4EF4fTq2sA7GnDShUww54S5Wg\"",
		"mtime": "2026-10-12T10:10:57.639Z",
		"size": 5413,
		"path": "../public/assets/_app--C3xffsq.js"
	},
	"/assets/_app-BpQrceB6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5857-5PTExLqeIeG0WYaekOQdue88XV8\"",
		"mtime": "2026-10-12T10:10:57.639Z",
		"size": 22615,
		"path": "../public/assets/_app-BpQrceB6.js"
	},
	"/assets/ai-tutor-Dj2eQalN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f3-XkqAQ1J8lJPUbf6fDaIY1SJTR5M\"",
		"mtime": "2026-10-12T10:10:57.639Z",
		"size": 1779,
		"path": "../public/assets/ai-tutor-Dj2eQalN.js"
	},
	"/assets/alphabet-B2LYMge8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"87a-eW9CmF4xh8sO/TNiwx7pkP3llv0\"",
		"mtime": "2026-10-12T10:10:57.639Z",
		"size": 2170,
		"path": "../public/assets/alphabet-B2LYMge8.js"
	},
	"/assets/answer-check-BS6KV7eo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2df-EbbbASvuwfyQzkWs0eaAOfVS+Zc\"",
		"mtime": "2026-10-12T10:10:57.639Z",
		"size": 735,
		"path": "../public/assets/answer-check-BS6KV7eo.js"
	},
	"/assets/badge-7_6jZM9W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26f-Ho7JPIazaCxQ345dXf9KFOx0YM8\"",
		"mtime": "2026-10-12T10:10:57.639Z",
		"size": 623,
		"path": "../public/assets/badge-7_6jZM9W.js"
	},
	"/assets/book-open-Dm7VX8DY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10c-OEgf4vVST9ygReovnmCe7cvUm5s\"",
		"mtime": "2026-10-12T10:10:57.639Z",
		"size": 268,
		"path": "../public/assets/book-open-Dm7VX8DY.js"
	},
	"/assets/button-DpU6m3O1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"107b-y/wGQSrbL1Q4QZ66a58gNzEqb9Y\"",
		"mtime": "2026-10-12T10:10:57.639Z",
		"size": 4219,
		"path": "../public/assets/button-DpU6m3O1.js"
	},
	"/assets/card-hjrPJv7E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"160-FwU5ZU4g7ylJPRHnXet8hTxbIxU\"",
		"mtime": "2026-10-12T10:10:57.639Z",
		"size": 352,
		"path": "../public/assets/card-hjrPJv7E.js"
	},
	"/assets/check-rpqbNV1K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"71-A3cntVOmTdYfa1DRXYW5or+auWk\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 113,
		"path": "../public/assets/check-rpqbNV1K.js"
	},
	"/assets/chevron-left-GEtLXkj9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"77-Nu/pTIHWB82ErZD4N+xVIbM6v5A\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 119,
		"path": "../public/assets/chevron-left-GEtLXkj9.js"
	},
	"/assets/chevron-right-BisXOhOb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"77-m1VK8vvTYhlC+aqzHIdPdhDQKwo\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 119,
		"path": "../public/assets/chevron-right-BisXOhOb.js"
	},
	"/assets/choice-row-DU9eACQ8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"470-sNCAntfhVam2Mqx11u5v1FSq7Fo\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 1136,
		"path": "../public/assets/choice-row-DU9eACQ8.js"
	},
	"/art/garden-dawn.jpg": {
		"type": "image/jpeg",
		"etag": "\"dc567-osUAcLAlnx53zodJnckz7OXmcdk\"",
		"mtime": "2026-10-12T10:11:00.163Z",
		"size": 902503,
		"path": "../public/art/garden-dawn.jpg"
	},
	"/art/garden-night.jpg": {
		"type": "image/jpeg",
		"etag": "\"842a5-hLIFXO04wAY3GH3gVd2S44qSYH0\"",
		"mtime": "2026-10-12T10:11:00.167Z",
		"size": 541349,
		"path": "../public/art/garden-night.jpg"
	},
	"/art/ghibli-hills.jpg": {
		"type": "image/jpeg",
		"etag": "\"b2413-MFhAtVvmz5i3Ihcw+7UPbFA6cHk\"",
		"mtime": "2026-10-12T10:11:00.167Z",
		"size": 730131,
		"path": "../public/art/ghibli-hills.jpg"
	},
	"/art/ghibli-meadow.jpg": {
		"type": "image/jpeg",
		"etag": "\"d7dcf-K3z01X3q88Nh+7Ez8XcYX9vCfXQ\"",
		"mtime": "2026-10-12T10:11:00.171Z",
		"size": 884175,
		"path": "../public/art/ghibli-meadow.jpg"
	},
	"/art/garden-lush.jpg": {
		"type": "image/jpeg",
		"etag": "\"10a1f3-PRqcP0GB8ibaD5iG+VIyQs+U2Yg\"",
		"mtime": "2026-10-12T10:11:00.167Z",
		"size": 1090035,
		"path": "../public/art/garden-lush.jpg"
	},
	"/assets/catalog-BxYFhpuR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18762d-/V6Ntfu2p2xlzTHcwMpu5qtg4rQ\"",
		"mtime": "2026-10-12T10:10:57.639Z",
		"size": 1603117,
		"path": "../public/assets/catalog-BxYFhpuR.js"
	},
	"/assets/client-C85fcJ4s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f9a-DCSWRvSc2ePplC0pnTjBXgmYLf0\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 32666,
		"path": "../public/assets/client-C85fcJ4s.js"
	},
	"/assets/dict-entry-view-DYT_4ShP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1675-rVTCNdWI5YP/GhudBJr4ctlXrI0\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 5749,
		"path": "../public/assets/dict-entry-view-DYT_4ShP.js"
	},
	"/assets/daily-6r7Cgfv4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"445f-t4VkmuHFWIvDGBSyewwvsozsi5E\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 17503,
		"path": "../public/assets/daily-6r7Cgfv4.js"
	},
	"/assets/dialog-Ckr-4mKI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c4-WiiWd3BZwMIaaAH5z+tpWB27soE\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 1220,
		"path": "../public/assets/dialog-Ckr-4mKI.js"
	},
	"/assets/dictionary-B-CHz6Mk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e-kig9hrZ37l1+MnBeLe0pHcOM6Gg\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 78,
		"path": "../public/assets/dictionary-B-CHz6Mk.js"
	},
	"/assets/dictionary-extra-BKSuEgN1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d92-VqTluXFhar9bzKZFJqhq0P3Ww78\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 19858,
		"path": "../public/assets/dictionary-extra-BKSuEgN1.js"
	},
	"/assets/dictionary._id-BZoOEiA4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1be-g7zIk0sv2OkTO0mHdbzbjVfKrbc\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 446,
		"path": "../public/assets/dictionary._id-BZoOEiA4.js"
	},
	"/assets/dictionary._id-CmCKmjQN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a9-2YBtW/p2i54oFvBp5cMx+ZWZJ14\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 937,
		"path": "../public/assets/dictionary._id-CmCKmjQN.js"
	},
	"/assets/dictionary.index-dAuegqsj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1be8-n9k+DV0K3iDFvHXnY04ubX4q9sU\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 7144,
		"path": "../public/assets/dictionary.index-dAuegqsj.js"
	},
	"/assets/dist-B4El48fb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8304-RuL18jqbam5vFF8+uuP0/HaAfOY\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 33540,
		"path": "../public/assets/dist-B4El48fb.js"
	},
	"/assets/dist-CVZXG3wR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75ee-qtIJQo67FBVEiRg0WpLAxB0YzxM\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 30190,
		"path": "../public/assets/dist-CVZXG3wR.js"
	},
	"/assets/dist-DpECN_4E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"281-u8kYXR0IQqMHGDaZcxKtDMJ7UYg\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 641,
		"path": "../public/assets/dist-DpECN_4E.js"
	},
	"/assets/dynamic-link-BAGix1We.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23c-rjWlYC0hES3FO98MjoWvfGaYOVg\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 572,
		"path": "../public/assets/dynamic-link-BAGix1We.js"
	},
	"/assets/dist-WB8SADIE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1389-nkiryy1IkX8qe8n8KttD55uWRWg\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 5001,
		"path": "../public/assets/dist-WB8SADIE.js"
	},
	"/assets/empty-state-DtV7rveW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1be-3eRCPHYk0m4c9+B659G6STlFATc\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 446,
		"path": "../public/assets/empty-state-DtV7rveW.js"
	},
	"/assets/events-Ylw3vQi7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ea-vKoXREw5qd6GhVVoKhE6COy4cmM\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 234,
		"path": "../public/assets/events-Ylw3vQi7.js"
	},
	"/assets/examples-g-uhen6G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e835-43AkuvhYEasggcBiqnYB89QouSc\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 190517,
		"path": "../public/assets/examples-g-uhen6G.js"
	},
	"/assets/favorites-D9iVsOJ3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55b-29V73MLYsdZvGNDTqTUjBMHXlhw\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 1371,
		"path": "../public/assets/favorites-D9iVsOJ3.js"
	},
	"/assets/flashcard-deck-DqI_Mhx_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"164a-JivF73EJmFBjcDxISNYgvuSp51w\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 5706,
		"path": "../public/assets/flashcard-deck-DqI_Mhx_.js"
	},
	"/assets/flashcards-Cl3CQ2ll.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1103-96Om350Kv3enfSaP/e+pHDe6Wvc\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 4355,
		"path": "../public/assets/flashcards-Cl3CQ2ll.js"
	},
	"/assets/garden-CToKl62_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c39-Ge56fYUPYMNuOTgovFytgW4/rWQ\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 3129,
		"path": "../public/assets/garden-CToKl62_.js"
	},
	"/assets/grammar-B-CHz6Mk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e-kig9hrZ37l1+MnBeLe0pHcOM6Gg\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 78,
		"path": "../public/assets/grammar-B-CHz6Mk.js"
	},
	"/assets/grammar-categories-uiiuX8j1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b35-c+FVf8hVBBudpiLl5XHDNYDXaKU\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 2869,
		"path": "../public/assets/grammar-categories-uiiuX8j1.js"
	},
	"/assets/grammar-n4-C1t2ZdUa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a346-WBGuYwwcZgQ1h23NBCwSxvI9FP0\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 41798,
		"path": "../public/assets/grammar-n4-C1t2ZdUa.js"
	},
	"/assets/grammar._id-BR0Z8gv6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"895-2jD+wBfdKssueGvFiTJBclDHbAw\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 2197,
		"path": "../public/assets/grammar._id-BR0Z8gv6.js"
	},
	"/assets/grammar.index-Bs8yC7KF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85c-zLLWXunngZe9bX7zq1LJeZNvi20\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 2140,
		"path": "../public/assets/grammar.index-Bs8yC7KF.js"
	},
	"/assets/hiragana-B-CHz6Mk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e-kig9hrZ37l1+MnBeLe0pHcOM6Gg\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 78,
		"path": "../public/assets/hiragana-B-CHz6Mk.js"
	},
	"/assets/hiragana._id-CpY_aVDL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"187-C0TPtV4X8n31EbObg4LlaaRyL+o\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 391,
		"path": "../public/assets/hiragana._id-CpY_aVDL.js"
	},
	"/assets/hiragana.index-lZ6LWV08.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b7-hRPlXUnjvAEvRVS1kN/wlC0cQ3E\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 695,
		"path": "../public/assets/hiragana.index-lZ6LWV08.js"
	},
	"/assets/import-Ct4HRGI2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c99-CLMQ9BFz4GL+bXQ1ecpSqpA/Cio\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 3225,
		"path": "../public/assets/import-Ct4HRGI2.js"
	},
	"/assets/index-DMpXd8dA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53a29-1TxPDI7gWIpv45jjbJX9gEUpHFw\"",
		"mtime": "2026-10-12T10:10:57.639Z",
		"size": 342569,
		"path": "../public/assets/index-DMpXd8dA.js"
	},
	"/assets/input-1Mx__hYT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23d-KSjMmlKc/NDgMQSJS6olP/MIPnk\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 573,
		"path": "../public/assets/input-1Mx__hYT.js"
	},
	"/assets/jp-text-DsPc1M2-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1334-jVigsXRrj4Dc+hj/M+7+ZQ5A/n8\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 4916,
		"path": "../public/assets/jp-text-DsPc1M2-.js"
	},
	"/assets/jsx-runtime-0vZSBttN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a8-DT21o0DVEenQwk6wXcylq/J4hZA\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 424,
		"path": "../public/assets/jsx-runtime-0vZSBttN.js"
	},
	"/assets/kana-D361Ufq3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"69f4-RFQZUMqAWrQoHEdV4AsSbdbrQxo\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 27124,
		"path": "../public/assets/kana-D361Ufq3.js"
	},
	"/assets/kana-chart-D59eGPWt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"861-qnWqN+OZupKQocAmPSw9cKZST5o\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 2145,
		"path": "../public/assets/kana-chart-D59eGPWt.js"
	},
	"/assets/kana-util-BgtkHei-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"748-/UFu6GNVZj/a/LwjEUaEXDp3xOs\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 1864,
		"path": "../public/assets/kana-util-BgtkHei-.js"
	},
	"/assets/kanji-B-CHz6Mk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e-kig9hrZ37l1+MnBeLe0pHcOM6Gg\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 78,
		"path": "../public/assets/kanji-B-CHz6Mk.js"
	},
	"/assets/kanji-lessons-BRSzt2x9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6ae8-plYuLl69cbzfjCmf86WGOpAn4dA\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 27368,
		"path": "../public/assets/kanji-lessons-BRSzt2x9.js"
	},
	"/assets/kanji-set-BxnOMgC0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f565-rjXCUTiIzOU7MHr/SIRSGapIL6k\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 259429,
		"path": "../public/assets/kanji-set-BxnOMgC0.js"
	},
	"/assets/kanji._id-BiCkb1Fs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1951-9ggTppkPFaHwgYzxTHEJkLAQvog\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 6481,
		"path": "../public/assets/kanji._id-BiCkb1Fs.js"
	},
	"/assets/kanji.index-B__BnoLp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ec5-LC0SLiV8/saEdRTJ9ThbMUZ/7/I\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 11973,
		"path": "../public/assets/kanji.index-B__BnoLp.js"
	},
	"/assets/katakana-B-CHz6Mk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e-kig9hrZ37l1+MnBeLe0pHcOM6Gg\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 78,
		"path": "../public/assets/katakana-B-CHz6Mk.js"
	},
	"/assets/katakana._id-cxmiB819.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"187-W3xAgYPCXfpXw7XcUaxQQTC71Y8\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 391,
		"path": "../public/assets/katakana._id-cxmiB819.js"
	},
	"/assets/katakana.index-zgvNPEis.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2aa-7h4mVG2n3eCguqQNrn6DZZhsSHU\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 682,
		"path": "../public/assets/katakana.index-zgvNPEis.js"
	},
	"/assets/label-jbxrvu9f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d6-eCn+/OXiYpixQHeJuSTFJDEhCmc\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 214,
		"path": "../public/assets/label-jbxrvu9f.js"
	},
	"/assets/lazyRouteComponent-COJjJ0PK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e89-2g9zbDpdgZCW6ndd0PJ2aifignU\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 3721,
		"path": "../public/assets/lazyRouteComponent-COJjJ0PK.js"
	},
	"/assets/leaderboard-B3JVwEo0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"242-uJWE+F9aUreqPGHgMuAOq5rX7+g\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 578,
		"path": "../public/assets/leaderboard-B3JVwEo0.js"
	},
	"/assets/leaderboard-Dn1zv14Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"67189-ogDbovtFeC/DPU1Hz/EjYjUjClc\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 422281,
		"path": "../public/assets/leaderboard-Dn1zv14Z.js"
	},
	"/assets/lesson-links-iRQ3uGYK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae3-yB9G1Bim1HHTZPdbsUdffGJLvgo\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 2787,
		"path": "../public/assets/lesson-links-iRQ3uGYK.js"
	},
	"/assets/link-f5aJifx9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1084-GVI/Phb3H+MCtxKCikkMmsE9YE8\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 4228,
		"path": "../public/assets/link-f5aJifx9.js"
	},
	"/assets/listen-CZW8qxs0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35f0-q4ZHKkgBUNNCk+scDpASsaFHTYQ\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 13808,
		"path": "../public/assets/listen-CZW8qxs0.js"
	},
	"/assets/local-CTM50YsK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21d9-4XEp4T33KuH+kQ/Lgo9wvfWP8ig\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 8665,
		"path": "../public/assets/local-CTM50YsK.js"
	},
	"/assets/local-rpc-B-lMnInl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10c-qC5huDcxexsTYFKZkshJMA8rzDo\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 268,
		"path": "../public/assets/local-rpc-B-lMnInl.js"
	},
	"/assets/lock-gJVyriPQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c3-3uW4O2kgtY4FdijB4ZSXr5dvU1Y\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 195,
		"path": "../public/assets/lock-gJVyriPQ.js"
	},
	"/assets/login-tm8EhusR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2060-08KuMhOjTytSycbz2eVcOOyobrU\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 8288,
		"path": "../public/assets/login-tm8EhusR.js"
	},
	"/assets/matchContext-Ct6-rzEy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e4e1-AeOIvdCgYFEihAQEG9ftD6U1BuM\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 58593,
		"path": "../public/assets/matchContext-Ct6-rzEy.js"
	},
	"/assets/middleware-ChMHMhP-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ef-hrjiIAGzQOlIZ3RdzH7C0A1nwrE\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 751,
		"path": "../public/assets/middleware-ChMHMhP-.js"
	},
	"/assets/my-words-BQCzNh3u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c6d-Q8CpJHr99H9AbK0I6Mk4+eN0cgQ\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 3181,
		"path": "../public/assets/my-words-BQCzNh3u.js"
	},
	"/assets/on-kun-RMREk7fq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"752-Gi9JNVBGjg8FhqXfnLaU/+2osz0\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 1874,
		"path": "../public/assets/on-kun-RMREk7fq.js"
	},
	"/assets/on-kun-panel-C4QmXope.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7b-li+rXc+wFnamantEcBQxFIObH9M\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 7803,
		"path": "../public/assets/on-kun-panel-C4QmXope.js"
	},
	"/assets/online-users-CK8di2CK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a3-hHzKZc3iBjzPUIduCQ6b40KnyVw\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 2211,
		"path": "../public/assets/online-users-CK8di2CK.js"
	},
	"/assets/page-header-DUE8ayrx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"290-7YgOBaS3NlNoIeaVkE1hbkqd2Qo\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 656,
		"path": "../public/assets/page-header-DUE8ayrx.js"
	},
	"/assets/page-pager-Cn1GpKIN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f2-w6Qa8IFhJ+GPFeWehsAFLSNnKLo\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 1266,
		"path": "../public/assets/page-pager-Cn1GpKIN.js"
	},
	"/assets/path-B-CHz6Mk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e-kig9hrZ37l1+MnBeLe0pHcOM6Gg\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 78,
		"path": "../public/assets/path-B-CHz6Mk.js"
	},
	"/assets/path-stages-BTOLpzEb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a634-r1Xe/pYPhhhsYlLF5IDhrXi/oUs\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 42548,
		"path": "../public/assets/path-stages-BTOLpzEb.js"
	},
	"/assets/path._id-QJp0maJ3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e35-xbowsoNxzw018psjSfu6CpCCrrw\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 3637,
		"path": "../public/assets/path._id-QJp0maJ3.js"
	},
	"/assets/path.index-BAMzd7kV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1027-VpX13FOqFzvuTO3UX0JRHNm6UTM\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 4135,
		"path": "../public/assets/path.index-BAMzd7kV.js"
	},
	"/assets/play-CUDXnhiN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a0f-x9QQ3K6FBNES5XgtBdqCmOF4q4c\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 6671,
		"path": "../public/assets/play-CUDXnhiN.js"
	},
	"/assets/preload-helper-Czpn1I53.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ac-sE+5KsaRXTMfwOfrOATQajMSGV4\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 1196,
		"path": "../public/assets/preload-helper-Czpn1I53.js"
	},
	"/assets/progress--UjsOww_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c1-NhG2GAcmmHYwkDgdfZ+snSZYk6U\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 705,
		"path": "../public/assets/progress--UjsOww_.js"
	},
	"/assets/progress-CxEAdDB5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f6b-qdjY8BawpuItHcHqoOTIuMDfV0A\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 8043,
		"path": "../public/assets/progress-CxEAdDB5.js"
	},
	"/assets/pronunciation-C2AXF312.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf-IFZ02ApxlEYukYd325BuH6veEqM\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 703,
		"path": "../public/assets/pronunciation-C2AXF312.js"
	},
	"/assets/provider-Crcp2fF3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7d4-mZMEXMzYb0oDFoHepsh4oi2SmcQ\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 2004,
		"path": "../public/assets/provider-Crcp2fF3.js"
	},
	"/assets/qss-CagxF-d_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c3-RNirzuC3XMRAfcyvf7yh2Q0WAyk\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 963,
		"path": "../public/assets/qss-CagxF-d_.js"
	},
	"/assets/quiz-CExDzrS_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1130-BCbjDD5T99Vmw+adPYFj9TLFaKo\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 4400,
		"path": "../public/assets/quiz-CExDzrS_.js"
	},
	"/assets/quiz-engine-CzsBoujV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ce3-F1Mv2P4z4hqRFFIhmLKqbNrGvnU\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 19683,
		"path": "../public/assets/quiz-engine-CzsBoujV.js"
	},
	"/assets/radicals-B-CHz6Mk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e-kig9hrZ37l1+MnBeLe0pHcOM6Gg\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 78,
		"path": "../public/assets/radicals-B-CHz6Mk.js"
	},
	"/assets/radicals-BcCd4xQW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7990-rj7HtAkFtBESslu7mGvJTodQor0\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 31120,
		"path": "../public/assets/radicals-BcCd4xQW.js"
	},
	"/assets/radicals._id-CuM-RpM6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a52-lZ60RnX55MbFG/oftyN0cEdiy7Y\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 6738,
		"path": "../public/assets/radicals._id-CuM-RpM6.js"
	},
	"/assets/radicals.index-DJZ96CNq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1851-tmvWyPGbgB0QJU7/xDbdHTJFuOo\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 6225,
		"path": "../public/assets/radicals.index-DJZ96CNq.js"
	},
	"/assets/react-SIfiwpqq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ff9-FGVdof4/lFGmrdRsB9EIvuwBlYc\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 8185,
		"path": "../public/assets/react-SIfiwpqq.js"
	},
	"/assets/read-CC6cBb7N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"52fc-nzGzroJlIab6Otunq6zZB7SJnQQ\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 21244,
		"path": "../public/assets/read-CC6cBb7N.js"
	},
	"/assets/recovery-ClAMQh-3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c8-iadHBRHDjDoznulDZEmgAqDKGP0\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 456,
		"path": "../public/assets/recovery-ClAMQh-3.js"
	},
	"/assets/remember-actions-OUD1slAG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"825-MWXDw7IMrgi8WW+355ApzP2hrgI\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 2085,
		"path": "../public/assets/remember-actions-OUD1slAG.js"
	},
	"/assets/review-DjCBZ0bl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59e-Oi7taMbTbPSKkR07imY2EzXqMqo\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 1438,
		"path": "../public/assets/review-DjCBZ0bl.js"
	},
	"/assets/romaji-CUIQ9HEm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4aa-/u9iy1Don0YdY+nT3wQApd7Vj2I\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 1194,
		"path": "../public/assets/romaji-CUIQ9HEm.js"
	},
	"/assets/rotate-ccw-DEfHWUQ1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bd-lbzjISpARJVGuUBc5yujdPerXBY\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 189,
		"path": "../public/assets/rotate-ccw-DEfHWUQ1.js"
	},
	"/assets/route-outlet-D9jMml8Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92-lLEll1iNROuoDUzViDzrBszIgwk\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 146,
		"path": "../public/assets/route-outlet-D9jMml8Q.js"
	},
	"/assets/search-CcqfbEp0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a3-BsebfJ0Db2JlJCazYn3TRSbtUnE\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 163,
		"path": "../public/assets/search-CcqfbEp0.js"
	},
	"/assets/settings-C2KzD9vV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e0c-OD7yf7kgvtKCfcT12EUJxBYb6G8\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 3596,
		"path": "../public/assets/settings-C2KzD9vV.js"
	},
	"/assets/settings-DUI2pKeG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8fb1-3iACEMCswa7xD0nxT8xFtTDoGWo\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 36785,
		"path": "../public/assets/settings-DUI2pKeG.js"
	},
	"/assets/songs-B-CHz6Mk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e-kig9hrZ37l1+MnBeLe0pHcOM6Gg\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 78,
		"path": "../public/assets/songs-B-CHz6Mk.js"
	},
	"/assets/songs-rsCjpRbA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10b46-g6dOYbDTYq5uy1wh2C9tCbHr8PI\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 68422,
		"path": "../public/assets/songs-rsCjpRbA.js"
	},
	"/assets/songs._id-D_LLfet-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19a3-J8H6JcDjHEzh8UBnEmDwB4rDsjo\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 6563,
		"path": "../public/assets/songs._id-D_LLfet-.js"
	},
	"/assets/songs.index-BrbWZJe1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc0-VlnEqeN7NAEgXhfKELKXvF9dNSI\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 3264,
		"path": "../public/assets/songs.index-BrbWZJe1.js"
	},
	"/assets/sparkles-BsV2d3kV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f1-RcXVdXrsYS9pRnNxP6jOg4d7pVs\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 497,
		"path": "../public/assets/sparkles-BsV2d3kV.js"
	},
	"/assets/speak-button-DZXR5YQf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14ed-GKWvunMeOZL65iWTfN+l09uKWrQ\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 5357,
		"path": "../public/assets/speak-button-DZXR5YQf.js"
	},
	"/assets/star-CN190SqT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cd-pCbTqtC9FqCp968Mdu5PCGfptF4\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 461,
		"path": "../public/assets/star-CN190SqT.js"
	},
	"/assets/stats-dEhvSUVp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa5-Qt1B9tFnf2kWVQ3oAyqZhZvN6AQ\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 2725,
		"path": "../public/assets/stats-dEhvSUVp.js"
	},
	"/assets/storage-SlikgenJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f44-ph2yjSinQugBlsDcIAxUpEq/AMI\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 3908,
		"path": "../public/assets/storage-SlikgenJ.js"
	},
	"/assets/stroke-order-BaYiIjg7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"221b8-RliJF7CXDC27YWEf8CUGRsDSf40\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 139704,
		"path": "../public/assets/stroke-order-BaYiIjg7.js"
	},
	"/assets/study-kana-B4TWyQaV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cb8-VebAJaLYEMHBdU5bzXhy+jyvaIk\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 3256,
		"path": "../public/assets/study-kana-B4TWyQaV.js"
	},
	"/assets/styles-B80oD3yw.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"e4d2-jvGuAcneiYSIfujBeSLJMQ+C3S0\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 58578,
		"path": "../public/assets/styles-B80oD3yw.css"
	},
	"/assets/switch-BuHxWjWO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1284-Z3e8enl+ikMBiG1xqDMrU7qz0o8\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 4740,
		"path": "../public/assets/switch-BuHxWjWO.js"
	},
	"/assets/sync-BTzZaPI2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56d-i15pR6lAQj1zpQy/MR5j/RIpphY\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 1389,
		"path": "../public/assets/sync-BTzZaPI2.js"
	},
	"/assets/sync-path-DNg04Rwt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"246-TnGSFeCxNwAu92sAq2XZ/idJkn4\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 582,
		"path": "../public/assets/sync-path-DNg04Rwt.js"
	},
	"/assets/sync-score-CVu99UOv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f1-wpxCxrtCmo5UZyZaEGX1leGpttQ\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 1009,
		"path": "../public/assets/sync-score-CVu99UOv.js"
	},
	"/assets/text-BycMK1sS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-iLdtosi01Ym1hD2DH/GUmym83wg\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 406,
		"path": "../public/assets/text-BycMK1sS.js"
	},
	"/assets/textarea-EE4xdSP7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f4-TAhpu9vBQ/N58OEAPU0o1KNzWts\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 500,
		"path": "../public/assets/textarea-EE4xdSP7.js"
	},
	"/assets/tools.import-dictionary-BEZ7O6KT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"150b-cbq0FRlDtAtoK1hDGDBkhLX78+c\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 5387,
		"path": "../public/assets/tools.import-dictionary-BEZ7O6KT.js"
	},
	"/assets/use-current-user-C4dygdOb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127-ZRqTqK+9loZmNev/wCjUce3vBFs\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 295,
		"path": "../public/assets/use-current-user-C4dygdOb.js"
	},
	"/assets/use-garden-DINqTFFb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c31-xO/a7slla0PfKvkyaqipHm2vSR0\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 27697,
		"path": "../public/assets/use-garden-DINqTFFb.js"
	},
	"/assets/useMatch-D6RGXUlI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"259-Y/qOYMuTvntQOtsRSRFkNAVg5SM\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 601,
		"path": "../public/assets/useMatch-D6RGXUlI.js"
	},
	"/assets/useNavigate-2tVq4iZ2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d9-KI5YpzhtDFmzRGe4LPDoBUrnRQA\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 217,
		"path": "../public/assets/useNavigate-2tVq4iZ2.js"
	},
	"/assets/useRouter-CcIDS3PN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c-w6ifWgbxsDUwyR5PLvgt2S7M1SA\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 140,
		"path": "../public/assets/useRouter-CcIDS3PN.js"
	},
	"/assets/useSelector-CuIwGYhX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75a-NO0iGi1pVF4g3e/Y7G5zJTuTy5Q\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 1882,
		"path": "../public/assets/useSelector-CuIwGYhX.js"
	},
	"/assets/utils-B7EjJoJ9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6d95-JcESnVwmk3o9hz7IWIMI5JdySEo\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 28053,
		"path": "../public/assets/utils-B7EjJoJ9.js"
	},
	"/assets/vocabulary-B-CHz6Mk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e-kig9hrZ37l1+MnBeLe0pHcOM6Gg\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 78,
		"path": "../public/assets/vocabulary-B-CHz6Mk.js"
	},
	"/assets/vocabulary-n4-DnmdFx8S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c62-9vLfOBMxDKxVjcNREuBW3WisaxA\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 31842,
		"path": "../public/assets/vocabulary-n4-DnmdFx8S.js"
	},
	"/assets/vocabulary-n5-BvtkuoM5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8b9-K9JnM9EkHdvA+bE9XG8goVlwsEk\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 55481,
		"path": "../public/assets/vocabulary-n5-BvtkuoM5.js"
	},
	"/assets/vocabulary._id-BeRNHPOI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1705-XqcdODj5TBI2iOFdXOvMxWtulBY\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 5893,
		"path": "../public/assets/vocabulary._id-BeRNHPOI.js"
	},
	"/assets/vocabulary.index-CPA-zF-j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bf9-ZmziG9U2ed4wmhZXazI8DJ3Fr7s\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 3065,
		"path": "../public/assets/vocabulary.index-CPA-zF-j.js"
	},
	"/assets/volume-2-Bc0bXlmg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17b-/KonGlMmxDoXBlPtIqZd6yRsfYI\"",
		"mtime": "2026-10-12T10:10:57.643Z",
		"size": 379,
		"path": "../public/assets/volume-2-Bc0bXlmg.js"
	},
	"/data/dictionary.sample.json": {
		"type": "application/json",
		"etag": "\"45d-KHkh/sEN3/HewDlGyxWiPwcNDY0\"",
		"mtime": "2026-10-12T10:11:00.163Z",
		"size": 1117,
		"path": "../public/data/dictionary.sample.json"
	},
	"/fonts/BeVietnamPro-Medium.ttf": {
		"type": "font/ttf",
		"etag": "\"2132c-jUoNBDmIXFyGGKG/2kXM5iUI6po\"",
		"mtime": "2026-10-12T10:11:00.163Z",
		"size": 135980,
		"path": "../public/fonts/BeVietnamPro-Medium.ttf"
	},
	"/fonts/BeVietnamPro-Regular.ttf": {
		"type": "font/ttf",
		"etag": "\"20754-5PoUzdPWYrY3Pm6DFYMaRiHfZao\"",
		"mtime": "2026-10-12T10:11:00.175Z",
		"size": 132948,
		"path": "../public/fonts/BeVietnamPro-Regular.ttf"
	},
	"/__grok/install/styles.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1a3d-VUsWOMAheo1/P30EqU5qaIkyvIQ\"",
		"mtime": "2026-10-12T10:11:00.163Z",
		"size": 6717,
		"path": "../public/__grok/install/styles.css"
	},
	"/__grok/install/assets/homescreen/glass-puzzle.svg": {
		"type": "image/svg+xml",
		"etag": "\"713-AP2wG8KChAGjse1Fn+f/+vDN+sQ\"",
		"mtime": "2026-10-12T10:11:00.191Z",
		"size": 1811,
		"path": "../public/__grok/install/assets/homescreen/glass-puzzle.svg"
	},
	"/__grok/install/assets/homescreen/glass-share.svg": {
		"type": "image/svg+xml",
		"etag": "\"954-jb3ATcKjqgMOYrA/4w1v21j0Jvg\"",
		"mtime": "2026-10-12T10:11:00.195Z",
		"size": 2388,
		"path": "../public/__grok/install/assets/homescreen/glass-share.svg"
	},
	"/__grok/install/assets/homescreen/logo-grok.svg": {
		"type": "image/svg+xml",
		"etag": "\"423-5mXO+yh9KW40jM3to5JlWPhxNK8\"",
		"mtime": "2026-10-12T10:11:00.195Z",
		"size": 1059,
		"path": "../public/__grok/install/assets/homescreen/logo-grok.svg"
	},
	"/__grok/install/assets/homescreen/ob-ipad.png": {
		"type": "image/png",
		"etag": "\"18dd3-wlRwrpmBImStuiu+4poVz7ANin4\"",
		"mtime": "2026-10-12T10:11:00.199Z",
		"size": 101843,
		"path": "../public/__grok/install/assets/homescreen/ob-ipad.png"
	},
	"/__grok/install/assets/homescreen/ob-phone.png": {
		"type": "image/png",
		"etag": "\"194bc-oZradWHIHO68q2glHU0Gk5ttpWA\"",
		"mtime": "2026-10-12T10:11:00.199Z",
		"size": 103612,
		"path": "../public/__grok/install/assets/homescreen/ob-phone.png"
	},
	"/__grok/install/assets/homescreen/plus.svg": {
		"type": "image/svg+xml",
		"etag": "\"961-sSBPunx/13vbMNAlPxb7UeO3l3A\"",
		"mtime": "2026-10-12T10:11:00.199Z",
		"size": 2401,
		"path": "../public/__grok/install/assets/homescreen/plus.svg"
	},
	"/fonts/NotoSansJP-Bold.otf": {
		"type": "font/otf",
		"etag": "\"470d40-p6mXxMiU0sxpEzLnIy2QnU8IpVI\"",
		"mtime": "2026-10-12T10:11:00.199Z",
		"size": 4656448,
		"path": "../public/fonts/NotoSansJP-Bold.otf"
	},
	"/fonts/NotoSansJP-Regular.otf": {
		"type": "font/otf",
		"etag": "\"452b24-KhZ6EWtU7NT5OeR9CteMs0Atk4w\"",
		"mtime": "2026-10-12T10:11:00.191Z",
		"size": 4533028,
		"path": "../public/fonts/NotoSansJP-Regular.otf"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region scripts/install-page.html?raw
var install_page_default = "<!DOCTYPE html>\n<html lang=\"en\" class=\"device-desktop\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta\n      name=\"viewport\"\n      content=\"width=device-width, initial-scale=1, viewport-fit=cover\"\n    />\n    <meta name=\"color-scheme\" content=\"dark\" />\n    <meta name=\"theme-color\" content=\"#000000\" />\n    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\" />\n    <meta name=\"apple-mobile-web-app-title\" content=\"{{APP_NAME}}\" />\n    <title>Add {{APP_NAME}} to your Home Screen</title>\n    <link rel=\"manifest\" href=\"/__grok/manifest.webmanifest\" />\n    <link rel=\"apple-touch-icon\" href=\"/__grok/icon-180.png\" />\n    <link rel=\"stylesheet\" href=\"/__grok/install/styles.css\" />\n    <script>\n      (function () {\n        var ua = navigator.userAgent || \"\";\n        var touch = navigator.maxTouchPoints || 0;\n        var isiPad = /iPad/.test(ua) || (/Macintosh/.test(ua) && touch > 1);\n        var isiPhone = /iPhone|iPod/.test(ua);\n        var isIOS = isiPhone || isiPad;\n        var isAndroid = /Android/i.test(ua);\n        var isAndroidPhone = isAndroid && /Mobile/i.test(ua);\n        var isAndroidTablet = isAndroid && !/Mobile/i.test(ua);\n        var minSide = Math.min(screen.width || 0, screen.height || 0);\n        var maxSide = Math.max(screen.width || 0, screen.height || 0);\n\n        var type = \"desktop\";\n        if (isiPhone) type = \"phone\";\n        else if (isiPad || isAndroidTablet) type = \"tablet\";\n        else if (isAndroidPhone) type = \"phone\";\n        else if (touch > 0 && minSide > 0 && minSide <= 500) type = \"phone\";\n        else if (touch > 0 && minSide > 500 && maxSide <= 1400) type = \"tablet\";\n\n        var iosMajor = null;\n        var osToken = null;\n        var safariToken = null;\n        var iphoneOs = ua.match(/iPhone OS (\\d+)[._]/);\n        var ipadOs = ua.match(/CPU OS (\\d+)[._](\\d+) like Mac OS X/);\n        var safariVer = ua.match(/Version\\/(\\d+)[._]/);\n        if (iphoneOs) osToken = parseInt(iphoneOs[1], 10);\n        else if (ipadOs) osToken = parseInt(ipadOs[1], 10);\n        if (isIOS && safariVer) safariToken = parseInt(safariVer[1], 10);\n        if (osToken != null || safariToken != null) {\n          iosMajor = Math.max(osToken || 0, safariToken || 0);\n        }\n\n        var root = document.documentElement;\n        var classes = [\"device-\" + type];\n        if (iosMajor != null) {\n          root.dataset.ios = String(iosMajor);\n          classes.push(iosMajor >= 27 ? \"ios-27-plus\" : \"ios-below-27\");\n        }\n        root.className = classes.join(\" \");\n      })();\n    <\/script>\n  </head>\n  <body>\n    <div class=\"page\">\n      <header class=\"powered\" aria-label=\"Powered by Grok\">\n        <span class=\"powered-by\">Powered by</span>\n        <span class=\"powered-brand\">\n          <img\n            class=\"grok-logo\"\n            src=\"/__grok/install/assets/homescreen/logo-grok.svg\"\n            width=\"14\"\n            height=\"14\"\n            alt=\"\"\n          />\n          <span class=\"powered-grok\">Grok</span>\n        </span>\n      </header>\n\n      <main class=\"content\">\n        <div class=\"ob\" aria-hidden=\"true\">\n          <img\n            class=\"ob-img ob-phone\"\n            src=\"/__grok/install/assets/homescreen/ob-phone.png\"\n            width=\"338\"\n            height=\"294\"\n            alt=\"\"\n          />\n          <img\n            class=\"ob-img ob-ipad\"\n            src=\"/__grok/install/assets/homescreen/ob-ipad.png\"\n            width=\"634\"\n            height=\"294\"\n            alt=\"\"\n          />\n        </div>\n\n        <section class=\"copy\">\n          <h1>Add {{APP_NAME}} to your&nbsp;Home&nbsp;Screen</h1>\n\n          <div class=\"steps\">\n            <p class=\"step step-tap step-ios27\">\n              <span class=\"muted\">Tap</span>\n              <span class=\"glass glass--icon\" aria-hidden=\"true\">\n                <img src=\"/__grok/install/assets/homescreen/glass-puzzle.svg\" width=\"24\" height=\"24\" alt=\"\" />\n              </span>\n              <span class=\"muted loc loc-phone\">in the bottom bar, then</span>\n              <span class=\"muted loc loc-ipad\">in the tool bar, then</span>\n              <span class=\"glass glass--icon\" aria-hidden=\"true\">\n                <img src=\"/__grok/install/assets/homescreen/glass-share.svg\" width=\"24\" height=\"24\" alt=\"\" />\n              </span>\n            </p>\n\n            <p class=\"step step-tap step-ios-legacy\">\n              <span class=\"muted\">Tap</span>\n              <span class=\"glass glass--icon\" aria-hidden=\"true\">\n                <img src=\"/__grok/install/assets/homescreen/glass-share.svg\" width=\"24\" height=\"24\" alt=\"\" />\n              </span>\n              <span class=\"muted loc loc-phone\">in the bottom bar</span>\n              <span class=\"muted loc loc-ipad\">in the tool bar</span>\n            </p>\n\n            <p class=\"step step-select\">\n              <span class=\"muted\">Select</span>\n              <span class=\"add-label\">\n                <img\n                  class=\"plus-icon\"\n                  src=\"/__grok/install/assets/homescreen/plus.svg\"\n                  width=\"16\"\n                  height=\"16\"\n                  alt=\"\"\n                />\n                <span class=\"add-text\">Add to Home Screen</span>\n              </span>\n            </p>\n          </div>\n        </section>\n      </main>\n\n      <main class=\"content content-desktop\">\n        <section class=\"copy\">\n          <h1>Open this link on your iPhone&nbsp;or&nbsp;iPad</h1>\n          <p class=\"desktop-note\">\n            This page shows how to add {{APP_NAME}} to an iOS Home Screen.\n          </p>\n          <a class=\"desktop-open\" href=\"{{APP_URL}}\">Open {{APP_NAME}}</a>\n        </section>\n      </main>\n    </div>\n  </body>\n</html>\n";
//#endregion
//#region \0virtual:grok-og-identity
var grokOgIdentity = { "site": {
	"title": "Akari",
	"description": "Học tiếng Nhật từ số 0, trong khu vườn êm đềm.",
	"card": "custom",
	"image": "/og.jpg"
} };
//#endregion
//#region scripts/grok-pwa-shared.mjs
/**
* Single source of truth for platform head chrome (PWA, extensions.js, OG),
* shared by the Vite plugin and Nitro middleware. Plain ESM so `node --test`
* and the Nitro bundler can both consume it.
*/
var DEFAULT_APP_NAME = "Grok App";
var OG_SITE_REL_PATH = "src/lib/og/site.json";
var SHARE_META_KEYS = /* @__PURE__ */ new Set([
	"og:title",
	"og:description",
	"og:image",
	"og:image:width",
	"og:image:height",
	"og:type",
	"og:url",
	"og:site_name",
	"twitter:card",
	"twitter:title",
	"twitter:image",
	"twitter:description",
	"x:game:image",
	"x:game:image:width",
	"x:game:image:height"
]);
function escapeHtml(value) {
	return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#39;");
}
/** Inverse of escapeHtml. Decode &amp; last so a single pass undoes one encode. */
function unescapeHtml(value) {
	return String(value).replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"").replaceAll("&#39;", "'").replaceAll("&amp;", "&");
}
/** 6-digit hex for the og.grok.me placeholder, or "" if site.color is missing/invalid. */
function placeholderCardColor(site = {}) {
	const raw = String(site.color ?? "").trim();
	const hex = raw.startsWith("#") ? raw.slice(1) : raw;
	return /^[0-9a-fA-F]{6}$/.test(hex) ? hex : "";
}
/**
* "wild-race.grok.me" → "Wild Race". Only published app hosts encode the
* display name in the first label. Preview / guest hosts are image origins
* only — slugifying them produced internal names like "Hds Abc 3000 Xy".
*/
function appNameFromHost(hostHeader) {
	const host = String(hostHeader ?? "").split(",")[0].trim().split(":")[0].toLowerCase();
	if (!host.endsWith(".grok.me")) return DEFAULT_APP_NAME;
	const slug = host.split(".")[0] ?? "";
	if (!slug || slug === "www" || !/^[a-z0-9-]{1,63}$/.test(slug)) return DEFAULT_APP_NAME;
	return slug.split("-").filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ") || "Grok App";
}
/** True for Vercel system domains. Envoy rewrites origin Host to these; they SSO-protect `/og.jpg`. */
function isVercelSystemHost(host) {
	return host === "vercel.app" || host.endsWith(".vercel.app") || host === "vercel.com" || host.endsWith(".vercel.com");
}
/** Hostname suitable for absolute og:image URLs. Preview guests (X-Forwarded-Host) are allowed. */
function publicAppHost(hostHeader) {
	const host = String(hostHeader ?? "").split(",")[0].trim().split(":")[0].toLowerCase();
	if (!host || !/^[a-z0-9.-]+$/.test(host) || !host.includes(".")) return "";
	if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) return "";
	if (isVercelSystemHost(host)) return "";
	return host;
}
/**
* Published apps always use `VITE_PUBLIC_HOSTNAME` (the grok.me host the
* deployer injects). Live preview has no such env, so fall back to the
* request host / X-Forwarded-Host. Never prefer request Host on a published
* app — Envoy rewrites it to `*.vercel.app`.
*/
function resolvePublicHost(hostHeader) {
	return publicAppHost(process.env?.VITE_PUBLIC_HOSTNAME) || publicAppHost(hostHeader);
}
function isInstallQuery(url) {
	const query = String(url ?? "").split("?", 2)[1] ?? "";
	const params = new URLSearchParams(query);
	const install = params.get("install");
	const platform = (params.get("platform") ?? "").toLowerCase();
	return (install === "1" || install === "true") && platform === "ios";
}
/** Paths that can carry an app document (vs assets / API / internals). */
function isDocumentPath(pathname) {
	const path = String(pathname ?? "");
	return !path.startsWith("/__grok/") && !path.startsWith("/api/") && !path.startsWith("/@") && !path.startsWith("/node_modules") && !/\.[a-z0-9]+$/i.test(path);
}
function acceptsHtml(accept) {
	const value = String(accept ?? "");
	return value === "" || value.includes("text/html") || value.includes("*/*");
}
/** The same URL without the install-tutorial params (used as the app link). */
function stripInstallParams(url) {
	const [path = "/", query = ""] = String(url ?? "/").split("?", 2);
	const params = new URLSearchParams(query);
	params.delete("install");
	params.delete("platform");
	const rest = params.toString();
	return rest ? `${path}?${rest}` : path;
}
function renderInstallPageHtml(template, { host, url } = {}) {
	return String(template).replaceAll("{{APP_NAME}}", escapeHtml(appNameFromHost(host))).replaceAll("{{APP_URL}}", escapeHtml(stripInstallParams(url)));
}
function renderWebManifest(hostHeader) {
	const name = appNameFromHost(hostHeader);
	return JSON.stringify({
		name,
		short_name: name,
		id: "/",
		start_url: "/",
		scope: "/",
		display: "standalone",
		background_color: "#000000",
		theme_color: "#000000",
		icons: [{
			src: "/__grok/icon-180.png",
			sizes: "180x180",
			type: "image/png"
		}]
	}, null, 2);
}
function grokPwaHeadTags(appName = DEFAULT_APP_NAME) {
	return [
		["manifest", "<link rel=\"manifest\" href=\"/__grok/manifest.webmanifest\">"],
		["apple-touch-icon", "<link rel=\"apple-touch-icon\" href=\"/__grok/icon-180.png\">"],
		["apple-mobile-web-app-title", `<meta name="apple-mobile-web-app-title" content="${escapeHtml(appName)}">`],
		["apple-mobile-web-app-status-bar-style", "<meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\">"],
		["theme-color", "<meta name=\"theme-color\" content=\"#000000\">"]
	];
}
var GROK_EXTENSIONS_SCRIPT_SRC = "https://grok.com/grok-app-builder/extensions.js";
function readGrokProjectId() {
	const fromProcess = typeof process !== "undefined" ? process.env?.VITE_PROJECT_ID : "";
	return String(fromProcess ?? "").trim();
}
function readGrokExtensionsEnabled() {
	const fromProcess = typeof process !== "undefined" ? process.env?.VITE_GROK_EXTENSIONS : "";
	return String(fromProcess ?? "").trim() !== "0";
}
function readXCreator() {
	const fromProcess = typeof process !== "undefined" ? process.env?.X_CREATOR : "";
	return String(fromProcess ?? "").trim();
}
function readXCreatorId() {
	const fromProcess = typeof process !== "undefined" ? process.env?.X_CREATOR_ID : "";
	return String(fromProcess ?? "").trim();
}
function grokXCreatorHeadTags(creator = readXCreator(), creatorId = readXCreatorId()) {
	const name = String(creator ?? "").trim();
	const id = String(creatorId ?? "").trim();
	if (!name || !id) return [];
	return [`<meta property="x:creator" content="${escapeHtml(name)}">`, `<meta property="x:creator:id" content="${escapeHtml(id)}">`];
}
/** Platform "Created with Grok" banner — injected into every HTML document. */
function grokExtensionsHeadTags(projectId = readGrokProjectId()) {
	const id = escapeHtml(projectId);
	const tags = [];
	if (projectId) tags.push(`<meta name="grok-project-id" content="${id}">`);
	if (!readGrokExtensionsEnabled()) return tags;
	tags.push(`<script src="${GROK_EXTENSIONS_SCRIPT_SRC}"${projectId ? ` data-project-id="${id}"` : ""} defer><\/script>`);
	return tags;
}
function readOgSite(cwd = process.cwd()) {
	try {
		const raw = readFileSync(join(cwd, OG_SITE_REL_PATH), "utf8");
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
	} catch {
		return {};
	}
}
/** Public path of an on-disk share card, or "" if neither file exists. */
function ogCardPublicPath(cwd = process.cwd()) {
	if (existsSync(join(cwd, "public/og.jpg"))) return "/og.jpg";
	if (existsSync(join(cwd, "public/og.png"))) return "/og.png";
	return "";
}
function detectCustomOgCard(cwd = process.cwd(), site = {}) {
	if (ogCardPublicPath(cwd)) return true;
	return siteHasCustomCard(site) || Boolean(String(site.image ?? "").trim());
}
/** Snapshot for Vite/Nitro to bake into the server bundle (Vercel has no workspace FS). */
function snapshotOgIdentity(cwd = process.cwd()) {
	const site = { ...readOgSite(cwd) };
	const disk = ogCardPublicPath(cwd);
	if (disk) {
		site.card = "custom";
		site.image = disk;
	} else {
		if (siteHasCustomCard(site)) delete site.card;
		if (site.image) delete site.image;
	}
	if (existsSync(join(cwd, "public/x-banner.jpg"))) site.banner = site.banner || "/x-banner.jpg";
	return { site };
}
function ogServiceUrl() {
	return (String(process.env?.VITE_OG_SERVICE_URL ?? "").trim() || "https://og.grok.me").replace(/\/+$/, "");
}
function titleFromDocument(html) {
	const match = String(html ?? "").match(/<title\b[^>]*>([^<]*)<\/title>/i);
	return match ? unescapeHtml(match[1]).trim() : "";
}
function resolveOgTitle(site = {}, appName = DEFAULT_APP_NAME, host = "", documentTitle = "") {
	const fromSite = String(site.title ?? "").trim();
	if (fromSite) return fromSite;
	const fromDoc = String(documentTitle ?? "").trim();
	if (fromDoc) return fromDoc;
	const fromHost = appNameFromHost(host);
	if (fromHost && fromHost !== "Grok App") return fromHost;
	return String(appName ?? "").trim() || "Grok App";
}
function siteHasCustomCard(site = {}) {
	return String(site.card ?? "").toLowerCase() === "custom";
}
/**
* Preview: public/og.jpg|png on disk.
* Vercel: the bake (`card=custom` / `image`) because the function cannot stat public/.
* Otherwise empty — caller emits the og.grok.me placeholder.
*/
function resolveOgCardAsset(site = {}, cwd = process.cwd()) {
	return ogCardPublicPath(cwd) || (detectCustomOgCard(cwd, site) ? String(site.image ?? "").trim() || "/og.jpg" : "");
}
/** Stamp `card=custom` when public/og.jpg or public/og.png is on disk. */
function applyCustomCardFromFs(site, cwd) {
	const disk = ogCardPublicPath(cwd);
	if (!disk) return site;
	return {
		...site,
		card: "custom",
		image: disk
	};
}
function grokOgHeadTags({ host = "", appName = DEFAULT_APP_NAME, site = {}, documentTitle = "", cwd = process.cwd() } = {}) {
	const title = resolveOgTitle(site, appName, host, documentTitle);
	const publicHost = resolvePublicHost(host);
	const tags = [`<meta name="twitter:card" content="summary_large_image">`, `<meta property="og:title" content="${escapeHtml(title)}">`];
	const description = String(site.description ?? "").trim();
	if (description) tags.push(`<meta property="og:description" content="${escapeHtml(description)}">`);
	if (String(site.type ?? "").toLowerCase() === "x:game") tags.push(`<meta property="og:type" content="x:game">`);
	if (publicHost) {
		const asset = resolveOgCardAsset(site, cwd);
		const custom = Boolean(asset);
		let image = custom ? `https://${publicHost}${asset.startsWith("/") ? asset : `/${asset}`}` : `${ogServiceUrl()}/v1/card.png?host=${encodeURIComponent(publicHost)}&title=${encodeURIComponent(title)}`;
		const color = !custom ? placeholderCardColor(site) : "";
		if (color) image += `&color=${encodeURIComponent(color)}`;
		tags.push(`<meta property="og:image" content="${escapeHtml(image)}">`);
		tags.push(`<meta property="og:image:width" content="1200">`);
		tags.push(`<meta property="og:image:height" content="630">`);
		const banner = String(site.banner ?? "").trim();
		if (banner) {
			const bannerUrl = `https://${publicHost}${banner.startsWith("/") ? banner : `/${banner}`}`;
			tags.push(`<meta property="x:game:image" content="${escapeHtml(bannerUrl)}">`);
			tags.push(`<meta property="x:game:image:width" content="1200">`);
			tags.push(`<meta property="x:game:image:height" content="264">`);
		}
	}
	return tags;
}
function stripGrokExtensionsScript(html) {
	return String(html).replace(/<script\b[^>]*\bsrc\s*=\s*["'][^"']*\/grok-app-builder\/extensions\.js[^"']*["'][^>]*>\s*<\/script>/gi, "");
}
function stripShareMetaTags(html) {
	return String(html).replace(/<meta\b[^>]*>/gi, (tag) => {
		const attrs = [...tag.matchAll(/\b(?:property|name)\s*=\s*["']([^"']+)["']/gi)];
		for (const match of attrs) if (SHARE_META_KEYS.has(String(match[1]).toLowerCase())) return "";
		return tag;
	});
}
function insertAfterHeadOpen(html, snippet) {
	if (/<head\b[^>]*>/i.test(html)) return html.replace(/<head\b[^>]*>/i, (open) => `${open}${snippet}`);
	if (/<html\b[^>]*>/i.test(html)) return html.replace(/<html\b[^>]*>/i, (open) => `${open}<head>${snippet}</head>`);
	return `<!doctype html><html><head>${snippet}</head>${html}`;
}
function insertBeforeHeadClose(html, snippet) {
	if (/<\/head>/i.test(html)) return html.replace(/<\/head>/i, `${snippet}</head>`);
	return insertAfterHeadOpen(html, snippet);
}
function normalizeHeadContext(ctx = {}) {
	const cwd = ctx.cwd ?? process.cwd();
	const site = applyCustomCardFromFs(ctx.site !== void 0 ? ctx.site : snapshotOgIdentity(cwd).site, cwd);
	return {
		appName: resolveOgTitle(site, ctx.appName ?? "Grok App", ctx.host ?? ""),
		projectId: ctx.projectId ?? readGrokProjectId(),
		creator: ctx.creator ?? readXCreator(),
		creatorId: ctx.creatorId ?? readXCreatorId(),
		host: ctx.host ?? "",
		cwd,
		site
	};
}
function injectGrokPwaHead(html, ctx = {}) {
	if (typeof html !== "string") return html;
	const { site, projectId, creator, creatorId, host, cwd } = normalizeHeadContext(ctx);
	const documentTitle = titleFromDocument(html);
	const appName = resolveOgTitle(site, ctx.appName ?? "Grok App", host, documentTitle);
	let next = stripShareMetaTags(html);
	if (!readGrokExtensionsEnabled()) next = stripGrokExtensionsScript(next);
	const missing = grokPwaHeadTags(appName).filter(([key]) => {
		if (key === "manifest") return !next.includes("href=\"/__grok/manifest.webmanifest\"");
		if (key === "apple-touch-icon") return !next.includes("href=\"/__grok/icon-180.png\"");
		return !next.includes(`name="${key}"`);
	}).map(([, tag]) => tag);
	next = insertAfterHeadOpen(next, grokOgHeadTags({
		host,
		appName,
		site,
		documentTitle,
		cwd
	}).join(""));
	if (readGrokExtensionsEnabled() && !next.includes("/grok-app-builder/extensions.js")) missing.push(...grokExtensionsHeadTags(projectId));
	else if (projectId && !next.includes("name=\"grok-project-id\"")) missing.push(`<meta name="grok-project-id" content="${escapeHtml(projectId)}">`);
	if (projectId && !next.includes("property=\"grok:app_id\"") && !next.includes("property='grok:app_id'")) missing.push(`<meta property="grok:app_id" content="${escapeHtml(projectId)}">`);
	const creatorTags = grokXCreatorHeadTags(creator, creatorId);
	if (creatorTags.length > 0) {
		if (!(next.includes("property=\"x:creator\" content=") || next.includes("property='x:creator' content="))) missing.push(creatorTags[0]);
		if (!next.includes("property=\"x:creator:id\"")) missing.push(creatorTags[1]);
	}
	if (missing.length === 0) return next;
	return insertBeforeHeadClose(next, missing.join(""));
}
function findHeadClose(buf) {
	return buf.toString("latin1").search(/<\/head>/i);
}
/**
* Streaming head injector: buffers only until `</head>` (ASCII marker; never
* appears inside a UTF-8 continuation byte), overwrites share-card metas,
* then passes later chunks through so streaming SSR keeps streaming.
*/
function createHeadInjector(ctx = {}) {
	const normalized = normalizeHeadContext(ctx);
	/** @type {Buffer[]} */
	let pending = [];
	let done = false;
	const apply = (html) => injectGrokPwaHead(html, {
		appName: normalized.appName,
		projectId: normalized.projectId,
		creator: normalized.creator,
		creatorId: normalized.creatorId,
		host: normalized.host,
		cwd: normalized.cwd,
		site: normalized.site
	});
	return {
		/** @param {Uint8Array | string} chunk @returns {Buffer[]} chunks ready to emit */
		push(chunk) {
			const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
			if (done) return [buf];
			pending.push(buf);
			const joined = Buffer.concat(pending);
			const at = findHeadClose(joined);
			if (at === -1) return [];
			done = true;
			pending = [];
			const closeLen = joined.toString("latin1", at).match(/^<\/head>/i)[0].length;
			const head = apply(joined.subarray(0, at + closeLen).toString("utf8"));
			return [Buffer.concat([Buffer.from(head, "utf8"), joined.subarray(at + closeLen)])];
		},
		/** @returns {Buffer[]} whatever is still buffered (no `</head>` seen) */
		flush() {
			if (done || pending.length === 0) return [];
			const rest = Buffer.concat(pending);
			pending = [];
			done = true;
			return [Buffer.from(apply(rest.toString("utf8")), "utf8")];
		}
	};
}
//#endregion
//#region server/middleware/grok-pwa.ts
/**
* Deployed-app (Nitro) half of the platform PWA chrome. Auto-registered as
* global h3 middleware because vite.config.ts sets `serverDir: "./server"` —
* without that option Nitro v3 never scans this directory.
*
* - `?install=1&platform=ios` on a document path → the Home Screen tutorial,
*   bundled into the server build via `?raw` (the public/ directory is CDN
*   static output on Vercel and not readable from the function).
* - `/__grok/manifest.webmanifest` → per-app-named manifest (kept out of
*   public/ so this dynamic response is the only one).
* - Other HTML documents → stream-inject PWA + OG head tags at `</head>`.
*   OG identity is baked via `virtual:grok-og-identity` at `vite build`
*   (this function cannot read `src/lib/og/site.json` or `public/og.jpg`).
*   This must be a middleware transforming `next()`: h3 discards the `response`
*   runtime hook's return value, and `render:html` does not exist in Nitro v3.
*/
function requestHost(event) {
	return event.req.headers.get("x-forwarded-host") ?? event.req.headers.get("host") ?? event.url.host;
}
function injectHeadStreaming(response, host) {
	const injector = createHeadInjector({
		host,
		site: grokOgIdentity.site
	});
	const transformed = response.body.pipeThrough(new TransformStream({
		transform(chunk, controller) {
			for (const out of injector.push(chunk)) controller.enqueue(out);
		},
		flush(controller) {
			for (const out of injector.flush()) controller.enqueue(out);
		}
	}));
	const headers = new Headers(response.headers);
	headers.delete("content-length");
	return new Response(transformed, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}
async function grokPwaMiddleware(event, next) {
	if ((event.req.method ?? "GET").toUpperCase() !== "GET") return next();
	const path = event.url.pathname;
	const urlWithQuery = path + event.url.search;
	if (path === "/__grok/manifest.webmanifest" || path === "/__grok/manifest.json") return new Response(renderWebManifest(requestHost(event)), { headers: {
		"content-type": "application/manifest+json; charset=utf-8",
		"cache-control": "no-cache"
	} });
	if (isInstallQuery(urlWithQuery) && isDocumentPath(path) && acceptsHtml(event.req.headers.get("accept"))) {
		const html = renderInstallPageHtml(install_page_default, {
			host: requestHost(event),
			url: urlWithQuery
		});
		return new Response(html, { headers: {
			"content-type": "text/html; charset=utf-8",
			"cache-control": "no-cache"
		} });
	}
	if (!isDocumentPath(path)) return next();
	const result = await next();
	if (result instanceof Response && result.body && String(result.headers.get("content-type") ?? "").includes("text/html") && !result.headers.get("content-encoding")) return injectHeadStreaming(result, requestHost(event));
	return result;
}
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_IO091Z = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_IO091Z
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default), toEventHandler(grokPwaMiddleware)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
