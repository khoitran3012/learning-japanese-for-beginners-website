import { o as __toESM } from "../_runtime.mjs";
import { E as require_react, T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as todayKey, o as uid, r as isBrowser, t as cn } from "./utils-D10sm1uC.mjs";
import { t as Button } from "./button-D6esF8zp.mjs";
import { D as Flower2, R as BookOpen, n as VolumeX, r as Volume2, t as X, y as Lock } from "../_libs/lucide-react.mjs";
import { i as SheetTitle, n as SheetContent, r as SheetHeader, t as Sheet } from "./sheet-DsPVIeRS.mjs";
import { n as useCurrentUserState } from "./use-current-user-ClOiUQ-z.mjs";
import { i as useProgress } from "./progress-Cu0w4vLw.mjs";
import { t as PageHeader } from "./page-header-BwwPPGfl.mjs";
import { n as GARDEN_ITEM_MAP, t as GARDEN_CONFIG } from "./config-CXidsrfo.mjs";
import { t as buildSnapshot } from "./compute-Cv-sZvIm.mjs";
import { n as gardenEvents } from "./events-DdCXtDE2.mjs";
import { a as loadGarden, c as setGardenSound, i as claimGardenDaily, o as reportGardenLearning, r as acknowledgeGardenUnlocks, s as saveGardenPlacements, t as learnedWordCount } from "./sync-l6nVZd2N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/garden-BvTcGLZO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Sprite({ className, style, children, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		className,
		style,
		"aria-hidden": title ? void 0 : true,
		role: title ? "img" : void 0,
		children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: title }) : null, children]
	});
}
var SPRITES = {
	sprout: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "32",
				cy: "56",
				rx: "10",
				ry: "4",
				fill: "#6b5a48",
				opacity: "0.45"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 54 C32 40 32 28 32 20",
				stroke: "#3d6b4f",
				strokeWidth: "2.4",
				fill: "none",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 34 C22 30 18 22 24 16 C28 22 32 26 32 34Z",
				fill: "#7dba91"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 36 C42 32 46 22 40 16 C36 22 32 28 32 36Z",
				fill: "#5d8a6a"
			})
		]
	}),
	grass: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M18 56 C20 36 12 24 10 18",
				stroke: "#3d6b4f",
				strokeWidth: "2",
				fill: "none",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M28 56 C28 34 24 20 22 14",
				stroke: "#5d8a6a",
				strokeWidth: "2.2",
				fill: "none",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M38 56 C40 32 46 22 50 16",
				stroke: "#3d6b4f",
				strokeWidth: "2",
				fill: "none",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M48 56 C48 38 54 28 58 22",
				stroke: "#7dba91",
				strokeWidth: "1.8",
				fill: "none",
				strokeLinecap: "round"
			})
		]
	}),
	wildflower: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 58 L32 30",
				stroke: "#3d6b4f",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "24",
				r: "5",
				fill: "#c45b52"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "26",
				r: "4.5",
				fill: "#e8b4b8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "26",
				r: "4.5",
				fill: "#e8b4b8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "28",
				cy: "18",
				r: "4.2",
				fill: "#f4efe6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "36",
				cy: "18",
				r: "4.2",
				fill: "#f4efe6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "24",
				r: "2.4",
				fill: "#d4a25a"
			})
		]
	}),
	"flower-bed": ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "32",
				cy: "50",
				rx: "24",
				ry: "8",
				fill: "#6b5a48",
				opacity: "0.35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "38",
				r: "5",
				fill: "#c45b52"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "28",
				cy: "34",
				r: "5.5",
				fill: "#d4a25a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "36",
				r: "5",
				fill: "#e8b4b8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "40",
				r: "4.5",
				fill: "#8b9bb4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "22",
				cy: "44",
				r: "4",
				fill: "#7dba91"
			})
		]
	}),
	herb: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "32",
				cy: "54",
				rx: "12",
				ry: "5",
				fill: "#3d5c4a",
				opacity: "0.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "24",
				cy: "40",
				rx: "8",
				ry: "12",
				fill: "#5d8a6a",
				transform: "rotate(-18 24 40)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "34",
				cy: "36",
				rx: "7",
				ry: "14",
				fill: "#7dba91"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "42",
				cy: "42",
				rx: "8",
				ry: "11",
				fill: "#3d6b4f",
				transform: "rotate(16 42 42)"
			})
		]
	}),
	sakura: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 60 L32 34",
				stroke: "#6b5a48",
				strokeWidth: "3.2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 44 L18 32",
				stroke: "#6b5a48",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 40 L46 30",
				stroke: "#6b5a48",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "24",
				r: "14",
				fill: "#e8b4b8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "30",
				r: "9",
				fill: "#f3c6c9"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "46",
				cy: "28",
				r: "10",
				fill: "#f7d6d8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "22",
				r: "6",
				fill: "#f4efe6",
				opacity: "0.7"
			})
		]
	}),
	pine: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "29",
				y: "44",
				width: "6",
				height: "16",
				rx: "1",
				fill: "#6b5a48"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 8 L48 28 L16 28 Z",
				fill: "#3d5c4a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 16 L50 38 L14 38 Z",
				fill: "#3d6b4f"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 26 L52 50 L12 50 Z",
				fill: "#5d8a6a"
			})
		]
	}),
	maple: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 60 L32 36",
				stroke: "#6b5a48",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 20 L18 28 L24 18 L12 16 L24 12 L20 4 L32 12 L44 4 L40 12 L52 16 L40 18 L46 28 Z",
				fill: "#c88870"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "22",
				r: "6",
				fill: "#d4a25a"
			})
		]
	}),
	"ancient-tree": ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 62 C30 44 28 34 32 22",
				stroke: "#5a4636",
				strokeWidth: "7",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 40 C18 36 12 28 14 20",
				stroke: "#5a4636",
				strokeWidth: "3",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "22",
				cy: "18",
				r: "12",
				fill: "#3d5c4a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "16",
				r: "14",
				fill: "#3d6b4f"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "10",
				r: "11",
				fill: "#5d8a6a"
			})
		]
	}),
	stones: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "24",
				cy: "44",
				rx: "12",
				ry: "8",
				fill: "#8a8178"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "40",
				cy: "46",
				rx: "10",
				ry: "7",
				fill: "#6b635b"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "32",
				cy: "38",
				rx: "7",
				ry: "5",
				fill: "#7dba91",
				opacity: "0.7"
			})
		]
	}),
	path: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20 58 C28 46 36 34 44 18",
			stroke: "#c4b49a",
			strokeWidth: "10",
			fill: "none",
			strokeLinecap: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20 58 C28 46 36 34 44 18",
			stroke: "#ddd4c8",
			strokeWidth: "4",
			fill: "none",
			strokeLinecap: "round",
			opacity: "0.7"
		})]
	}),
	pond: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "32",
				cy: "36",
				rx: "26",
				ry: "16",
				fill: "#6d8ea8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "32",
				cy: "36",
				rx: "20",
				ry: "11",
				fill: "#7ea8c4",
				opacity: "0.8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "24",
				cy: "32",
				rx: "8",
				ry: "4",
				fill: "#f4efe6",
				opacity: "0.35"
			})
		]
	}),
	bridge: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 44 C32 12 32 12 56 44",
				stroke: "#8f6a4a",
				strokeWidth: "5",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 44 C32 18 32 18 56 44",
				stroke: "#c4a574",
				strokeWidth: "3",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 36 L16 28",
				stroke: "#8f6a4a",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M48 36 L48 28",
				stroke: "#8f6a4a",
				strokeWidth: "2"
			})
		]
	}),
	lantern: ({ title, className, night }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "22",
				y: "40",
				width: "20",
				height: "6",
				rx: "1",
				fill: "#6b5a48"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 40 L32 16 L40 40",
				fill: "#8a8178"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "26",
				y: "24",
				width: "12",
				height: "12",
				rx: "2",
				fill: night ? "#d4a25a" : "#ddd4c8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "30",
				y: "12",
				width: "4",
				height: "6",
				fill: "#6b5a48"
			})
		]
	}),
	house: ({ title, className, night }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "14",
				y: "30",
				width: "36",
				height: "24",
				rx: "2",
				fill: "#c4a574"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10 32 L32 12 L54 32",
				fill: "#6b5a48"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "18",
				y: "14",
				width: "8",
				height: "10",
				fill: "#6b5a48"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "28",
				y: "38",
				width: "10",
				height: "16",
				fill: "#5a4636"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "44",
				y: "36",
				width: "8",
				height: "8",
				fill: night ? "#d4a25a" : "#8b9bb4"
			})
		]
	}),
	chime: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 8 L32 18",
				stroke: "#6b5a48",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M20 18 H44",
				stroke: "#6b5a48",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "22",
				y: "22",
				width: "5",
				height: "16",
				rx: "2",
				fill: "#7ea8c4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "30",
				y: "20",
				width: "5",
				height: "20",
				rx: "2",
				fill: "#8b9bb4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "38",
				y: "22",
				width: "5",
				height: "16",
				rx: "2",
				fill: "#7dba91"
			})
		]
	}),
	butterfly: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "22",
				cy: "28",
				rx: "12",
				ry: "8",
				fill: "#c45b52"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "42",
				cy: "28",
				rx: "12",
				ry: "8",
				fill: "#d4a25a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "24",
				cy: "40",
				rx: "8",
				ry: "6",
				fill: "#e8b4b8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "40",
				cy: "40",
				rx: "8",
				ry: "6",
				fill: "#f4efe6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "30",
				y: "24",
				width: "4",
				height: "22",
				rx: "2",
				fill: "#3a3632"
			})
		]
	}),
	bird: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "32",
				cy: "34",
				rx: "14",
				ry: "9",
				fill: "#8b9bb4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "46",
				cy: "30",
				r: "6",
				fill: "#6d8ea8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M50 30 L58 32 L50 34 Z",
				fill: "#d4a25a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M18 34 C12 24 8 20 6 18",
				stroke: "#3a3632",
				strokeWidth: "2",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "48",
				cy: "28",
				r: "1.4",
				fill: "#1c1917"
			})
		]
	}),
	frog: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "32",
				cy: "40",
				rx: "16",
				ry: "12",
				fill: "#5d8a6a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "22",
				cy: "28",
				r: "7",
				fill: "#7dba91"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "42",
				cy: "28",
				r: "7",
				fill: "#7dba91"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "22",
				cy: "28",
				r: "2.4",
				fill: "#1c1917"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "42",
				cy: "28",
				r: "2.4",
				fill: "#1c1917"
			})
		]
	}),
	squirrel: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "30",
				cy: "38",
				rx: "12",
				ry: "10",
				fill: "#c88870"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "42",
				cy: "28",
				r: "8",
				fill: "#c88870"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 40 C4 20 8 12 18 22 C22 30 18 38 16 40Z",
				fill: "#b56a4e"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "44",
				cy: "26",
				r: "1.6",
				fill: "#1c1917"
			})
		]
	}),
	cat: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "34",
				cy: "40",
				rx: "18",
				ry: "12",
				fill: "#d7c4a8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "28",
				r: "10",
				fill: "#d7c4a8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10 22 L14 12 L20 22Z",
				fill: "#d7c4a8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M18 22 L26 12 L28 24Z",
				fill: "#d7c4a8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "28",
				r: "1.6",
				fill: "#1c1917"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M50 42 C58 28 60 44 52 48",
				stroke: "#d7c4a8",
				strokeWidth: "4",
				fill: "none"
			})
		]
	}),
	fireflies: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "24",
				r: "3",
				fill: "#d4a25a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "36",
				r: "2.4",
				fill: "#f4efe6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "46",
				cy: "20",
				r: "3.2",
				fill: "#d4a25a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "48",
				r: "2",
				fill: "#7dba91"
			})
		]
	}),
	moon: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sprite, {
		className,
		title,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "32",
			cy: "32",
			r: "16",
			fill: "#f4efe6"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "40",
			cy: "26",
			r: "12",
			fill: "#2f4158"
		})]
	}),
	star: ({ title, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprite, {
		className,
		title,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M32 8 L36 24 L52 24 L40 34 L44 50 L32 40 L20 50 L24 34 L12 24 L28 24 Z",
			fill: "#f4efe6"
		})
	})
};
function MascotMame({ waving }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 80 88",
		className: waving ? "garden-mascot-wave" : void 0,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "40",
				cy: "82",
				rx: "16",
				ry: "4",
				fill: "#1c1917",
				opacity: "0.18"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "40",
				cy: "50",
				rx: "22",
				ry: "26",
				fill: "#f4efe6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "40",
				cy: "56",
				rx: "16",
				ry: "14",
				fill: "#7dba91",
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "46",
				r: "3.2",
				fill: "#1c1917"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "48",
				cy: "46",
				r: "3.2",
				fill: "#1c1917"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M34 56 Q40 60 46 56",
				stroke: "#8f3a32",
				strokeWidth: "1.6",
				fill: "none",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 28 C18 12 28 10 32 22",
				fill: "#5d8a6a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M56 28 C62 12 52 10 48 22",
				fill: "#5d8a6a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "58",
				cy: "62",
				r: "6",
				fill: "#d4a25a",
				opacity: "0.9"
			})
		]
	});
}
function hourNow() {
	return (/* @__PURE__ */ new Date()).getHours();
}
function monthNow() {
	return (/* @__PURE__ */ new Date()).getMonth() + 1;
}
function seasonOf(month) {
	if (month >= 3 && month <= 5) return "spring";
	if (month >= 6 && month <= 8) return "summer";
	if (month >= 9 && month <= 11) return "autumn";
	return "winter";
}
function GardenScene({ garden, placing, onPlace, reduced }) {
	const night = hourNow() < 6 || hourNow() >= 19;
	const dusk = hourNow() >= 17 && hourNow() < 19;
	const season = seasonOf(monthNow());
	const lush = Math.min(1, Math.max(0, (garden.level - 1) / 4));
	const unlocked = new Set(garden.unlocked);
	const stage = (0, import_react.useRef)(null);
	const [cam, setCam] = (0, import_react.useState)({
		s: 1,
		x: 0,
		y: 0
	});
	const drag = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = stage.current;
		if (!el) return;
		const onWheel = (e) => {
			const we = e;
			we.preventDefault();
			setCam((c) => ({
				...c,
				s: Math.min(1.8, Math.max(.85, c.s + (we.deltaY < 0 ? .08 : -.08)))
			}));
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		return () => el.removeEventListener("wheel", onWheel);
	}, []);
	function onPointerDown(e) {
		if (placing) return;
		drag.current = {
			x: e.clientX,
			y: e.clientY,
			cx: cam.x,
			cy: cam.y
		};
		e.currentTarget.setPointerCapture(e.pointerId);
	}
	function onPointerMove(e) {
		if (!drag.current) return;
		setCam({
			s: cam.s,
			x: drag.current.cx + (e.clientX - drag.current.x),
			y: drag.current.cy + (e.clientY - drag.current.y)
		});
	}
	function onPointerUp(e) {
		const wasDrag = drag.current;
		drag.current = null;
		if (!placing || wasDrag) return;
		const world = stage.current?.querySelector("[data-garden-world]");
		if (!world) return;
		const rect = world.getBoundingClientRect();
		onPlace((e.clientX - rect.left) / rect.width * 100, (e.clientY - rect.top) / rect.height * 100);
	}
	const idle = garden.xp === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: stage,
		className: cn("garden-stage", night && "is-night", dusk && "is-dusk", `season-${season}`, placing && "is-placing"),
		onPointerDown,
		onPointerMove,
		onPointerUp,
		onPointerCancel: onPointerUp,
		role: "img",
		"aria-label": `Khu vườn cấp ${garden.level}, ${garden.levelName}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-garden-world": true,
			className: "garden-world",
			style: { transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.s})` },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/art/garden-dawn.jpg",
					alt: "",
					className: "garden-bg garden-bg-dawn"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/art/garden-lush.jpg",
					alt: "",
					className: "garden-bg garden-bg-lush",
					style: { opacity: lush }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/art/garden-night.jpg",
					alt: "",
					className: "garden-bg garden-bg-night",
					style: { opacity: night ? .92 : dusk ? .35 : 0 }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "garden-wash" }),
				!reduced ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clouds, {}) : null,
				season === "spring" && unlocked.has("sakura") && !reduced ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Petals, { color: "sakura" }) : null,
				season === "autumn" && !reduced ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Petals, { color: "maple" }) : null,
				season === "winter" && !reduced ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snow, {}) : null,
				garden.placements.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GardenProp, {
					placement: p,
					night,
					reduced
				}, p.id)),
				unlocked.has("butterfly") && !reduced ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "garden-critter is-butterfly" }) : null,
				unlocked.has("bird") && !reduced ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "garden-critter is-bird" }) : null,
				night && unlocked.has("fireflies") && !reduced ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "garden-firefly",
						style: {
							left: "38%",
							top: "58%"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "garden-firefly",
						style: {
							left: "52%",
							top: "62%",
							animationDelay: "1.2s"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "garden-firefly",
						style: {
							left: "46%",
							top: "50%",
							animationDelay: "0.6s"
						}
					})
				] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "garden-mascot",
					title: "Mame, linh vật khu vườn",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MascotMame, { waving: !idle })
				})
			]
		}), idle ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "garden-empty",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl",
					children: "Đây là khu vườn đầu tiên của bạn."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-sm text-sm text-muted",
					children: "Hãy bắt đầu học tiếng Nhật và cùng nhau trồng nó nhé."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/daily",
					className: "mt-3 inline-flex h-11 items-center rounded-[10px] bg-primary px-4 text-sm text-primary-fg",
					children: "Bắt đầu học"
				})
			]
		}) : null]
	});
}
function GardenProp({ placement, night, reduced }) {
	const def = GARDEN_ITEM_MAP[placement.itemId];
	const Sprite = SPRITES[placement.itemId];
	if (!Sprite) return null;
	const fly = placement.itemId === "butterfly" || placement.itemId === "bird";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("garden-prop", fly && !reduced && "is-living"),
		style: {
			left: `${placement.x}%`,
			top: `${placement.y}%`,
			zIndex: def?.z ?? 2,
			width: `${(def?.scale ?? 1) * (placement.scale ?? 1) * 4.6}rem`
		},
		children: Sprite({
			title: def?.name,
			night
		})
	});
}
function Clouds() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "garden-cloud",
		style: {
			top: "8%",
			left: "-10%"
		}
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "garden-cloud c2",
		style: {
			top: "14%",
			left: "30%"
		}
	})] });
}
function Petals({ color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("garden-petals", color === "maple" && "is-maple"),
		"aria-hidden": true,
		children: Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
			left: `${8 + i * 11}%`,
			animationDelay: `${i * .7}s`
		} }, i))
	});
}
function Snow() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "garden-snow",
		"aria-hidden": true,
		children: Array.from({ length: 10 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
			left: `${6 + i * 9}%`,
			animationDelay: `${i * .5}s`
		} }, i))
	});
}
var CATS = [
	{
		id: "plants",
		label: "Cây & hoa"
	},
	{
		id: "animals",
		label: "Sinh vật"
	},
	{
		id: "decor",
		label: "Trang trí"
	},
	{
		id: "special",
		label: "Đặc biệt"
	}
];
function GardenHud({ garden, soundOn, onSound, onDaily, onOpenCollection, placing, onCancelPlace }) {
	const pct = garden.nextLevelXp ? Math.min(100, garden.xp / garden.nextLevelXp * 100) : 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "garden-hud",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "garden-chip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] uppercase tracking-[0.14em] text-subtle",
						children: ["Khu vườn cấp ", garden.level]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-lg leading-tight",
						children: [
							garden.levelName,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-jp text-muted",
								children: garden.levelNameJp
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-1.5 overflow-hidden rounded-full bg-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-meadow",
							style: { width: `${pct}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [garden.xp, " Garden XP"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [garden.wordsLearned, " từ"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [garden.streak, " ngày"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [garden.unlocked.length, " vật phẩm"] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						size: "sm",
						onClick: onOpenCollection,
						"aria-label": "Bộ sưu tập",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower2, {}), " Bộ sưu tập"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "icon-sm",
						onClick: onSound,
						"aria-label": soundOn ? "Tắt âm" : "Bật âm",
						children: soundOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {})
					}),
					garden.canClaimDaily ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: onDaily,
						children: "Quà hôm nay"
					}) : null
				]
			}),
			placing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "garden-chip flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: "Chạm vào vườn để đặt vật phẩm."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon-sm",
					variant: "ghost",
					onClick: onCancelPlace,
					"aria-label": "Hủy đặt",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})]
			}) : null
		]
	});
}
function CollectionSheet({ open, onOpenChange, garden, onPlace }) {
	const unlocked = new Set(garden.unlocked);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Bộ sưu tập khu vườn" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6 px-2 pb-10",
				children: CATS.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 text-xs uppercase tracking-[0.14em] text-subtle",
					children: cat.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-2 gap-2",
					children: GARDEN_CONFIG.items.filter((item) => item.category === cat.id).map((item) => {
						const on = unlocked.has(item.id);
						const Sprite = SPRITES[item.id];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: !on,
							onClick: () => {
								onPlace(item.id);
								onOpenChange(false);
							},
							className: cn("flex w-full flex-col items-center rounded-[12px] border border-border bg-surface p-3 text-center", !on && "opacity-50"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("size-14", !on && "opacity-30 grayscale"),
									children: Sprite ? Sprite({ title: item.name }) : null
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 flex items-center gap-1 text-sm",
									children: [on ? item.name : "Chưa mở", on ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-jp text-[11px] text-muted",
									children: item.nameJp
								})
							]
						}) }, item.id);
					})
				})] }, cat.id))
			})]
		})
	});
}
function UnlockModal({ garden, onDone }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	const item = garden.newUnlocks[index];
	(0, import_react.useEffect)(() => {
		setIndex(0);
	}, [garden.newUnlocks.map((u) => u.id).join(",")]);
	if (!item) return null;
	const Sprite = SPRITES[item.id];
	const last = index >= garden.newUnlocks.length - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "garden-modal",
		role: "dialog",
		"aria-labelledby": "garden-unlock-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "garden-modal-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.16em] text-subtle",
					children: "Vật phẩm mới"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "garden-unlock-glow mx-auto my-3 size-24",
					children: Sprite ? Sprite({ title: item.name }) : null
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "garden-unlock-title",
					className: "font-display text-2xl",
					children: item.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-jp text-muted",
					children: item.nameJp
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [garden.wordsLearned, " từ đã học đã làm khu vườn lớn thêm một chút."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					onClick: () => {
						if (last) onDone(garden.newUnlocks.map((u) => u.id));
						else setIndex((i) => i + 1);
					},
					children: last ? "Vào khu vườn" : "Tiếp"
				})
			]
		})
	});
}
function GardenFallback() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[16px] border border-border bg-surface p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl",
				children: "Khu vườn đang nghỉ một chút"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Phần học tiếng Nhật vẫn dùng bình thường."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-4",
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/daily",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {}), " Tiếp tục học"]
				})
			})
		]
	});
}
function GardenLoading() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-[50vh] place-items-center text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: "Đang chăm sóc khu vườn…"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Mame đang tưới một chút nước."
		})] })
	});
}
var KEY = "akari-garden-v1";
function emptyLocal() {
	return {
		placements: [],
		seenUnlocks: [],
		soundOn: false,
		dailyBonus: 0,
		lastDailyDate: null
	};
}
function readLocalGarden() {
	if (!isBrowser()) return emptyLocal();
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return emptyLocal();
		const parsed = JSON.parse(raw);
		return {
			placements: Array.isArray(parsed.placements) ? parsed.placements : [],
			seenUnlocks: Array.isArray(parsed.seenUnlocks) ? parsed.seenUnlocks : [],
			soundOn: Boolean(parsed.soundOn),
			dailyBonus: Number(parsed.dailyBonus) || 0,
			lastDailyDate: typeof parsed.lastDailyDate === "string" ? parsed.lastDailyDate : null
		};
	} catch {
		return emptyLocal();
	}
}
function writeLocalGarden(next) {
	if (!isBrowser()) return;
	try {
		localStorage.setItem(KEY, JSON.stringify(next));
	} catch {}
}
function localSnapshot(facts) {
	const local = readLocalGarden();
	return buildSnapshot({
		...facts,
		dailyBonus: local.dailyBonus,
		lastDailyDate: local.lastDailyDate,
		soundOn: local.soundOn,
		seenUnlocks: local.seenUnlocks,
		placements: local.placements,
		today: todayKey()
	}, false);
}
function markLocalSeen(ids) {
	const local = readLocalGarden();
	const seen = new Set(local.seenUnlocks);
	for (const id of ids) seen.add(id);
	writeLocalGarden({
		...local,
		seenUnlocks: [...seen]
	});
}
function saveLocalPlacements(placements) {
	writeLocalGarden({
		...readLocalGarden(),
		placements
	});
}
function setLocalSound(soundOn) {
	writeLocalGarden({
		...readLocalGarden(),
		soundOn
	});
}
function claimLocalDaily(studiedToday) {
	const local = readLocalGarden();
	const today = todayKey();
	if (!studiedToday || local.lastDailyDate === today) return local;
	const next = {
		...local,
		dailyBonus: local.dailyBonus + GARDEN_CONFIG.xp.daily,
		lastDailyDate: today
	};
	writeLocalGarden(next);
	return next;
}
function fromLocalProgress(srs, lessons, streak, lastStudyDate, quizScores) {
	return localSnapshot({
		wordsLearned: learnedWordCount(srs),
		lessons: lessons.size,
		streak,
		quizzes: quizScores.length,
		studyXp: quizScores.reduce((a, q) => a + q.score * 10, 0),
		lastStudyDate
	});
}
function useGarden() {
	const { user, isPending } = useCurrentUserState();
	const srs = useProgress((s) => s.srs);
	const lessons = useProgress((s) => s.completedLessonIds);
	const streak = useProgress((s) => s.streak);
	const lastStudyDate = useProgress((s) => s.lastStudyDate);
	const quizScores = useProgress((s) => s.quizScores);
	const ready = useProgress((s) => s.ready);
	const [remote, setRemote] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const local = (0, import_react.useMemo)(() => fromLocalProgress(srs, lessons, streak, lastStudyDate, quizScores), [
		srs,
		lessons,
		streak,
		lastStudyDate,
		quizScores
	]);
	const garden = remote?.signedIn ? remote : local;
	const refresh = (0, import_react.useCallback)(async () => {
		try {
			const res = await loadGarden();
			if (res && "signedIn" in res && res.signedIn) {
				setRemote(res);
				setError(false);
			} else setRemote(null);
		} catch {
			setError(true);
			setRemote(null);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
	}, [refresh, user?.id]);
	(0, import_react.useEffect)(() => {
		return gardenEvents.on("gardenSynced", () => {
			refresh();
		});
	}, [refresh]);
	(0, import_react.useEffect)(() => {
		if (!ready || isPending) return;
		const words = learnedWordCount(srs);
		reportGardenLearning({ data: {
			wordsLearned: words,
			streak,
			studiedToday: lastStudyDate === todayKey()
		} }).then((res) => {
			if (res && "signedIn" in res && res.signedIn) setRemote(res);
		}).catch(() => {});
	}, [
		ready,
		isPending,
		srs,
		streak,
		lastStudyDate
	]);
	return {
		garden,
		loading,
		error,
		refresh,
		ackUnlocks: (0, import_react.useCallback)(async (ids) => {
			if (!ids.length) return;
			if (garden.signedIn) try {
				const next = await acknowledgeGardenUnlocks({ data: ids });
				setRemote(next);
				return;
			} catch {
				setError(true);
			}
			markLocalSeen(ids);
			setRemote(null);
		}, [garden.signedIn]),
		savePlacements: (0, import_react.useCallback)(async (placements) => {
			if (garden.signedIn) try {
				const next = await saveGardenPlacements({ data: placements });
				setRemote(next);
				return;
			} catch {
				setError(true);
			}
			saveLocalPlacements(placements);
		}, [garden.signedIn]),
		claimDaily: (0, import_react.useCallback)(async () => {
			if (garden.signedIn) try {
				const next = await claimGardenDaily();
				setRemote(next);
				return next;
			} catch {
				setError(true);
			}
			claimLocalDaily(lastStudyDate === todayKey());
			return fromLocalProgress(srs, lessons, streak, lastStudyDate, quizScores);
		}, [
			garden.signedIn,
			lastStudyDate,
			srs,
			lessons,
			streak,
			quizScores
		]),
		toggleSound: (0, import_react.useCallback)(async (on) => {
			if (garden.signedIn) try {
				await setGardenSound({ data: on });
				setRemote((prev) => prev ? {
					...prev,
					soundOn: on
				} : prev);
				return;
			} catch {}
			setLocalSound(on);
		}, [garden.signedIn]),
		config: GARDEN_CONFIG
	};
}
var ctx = null;
var wind = null;
var gain = null;
function ensure() {
	if (typeof window === "undefined") return null;
	if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
	return ctx;
}
async function setGardenAudio(on) {
	const audio = ensure();
	if (!audio) return;
	if (!on) {
		gain?.gain.setTargetAtTime(0, audio.currentTime, .2);
		return;
	}
	if (audio.state === "suspended") await audio.resume();
	if (!wind) {
		const osc = audio.createOscillator();
		osc.type = "triangle";
		osc.frequency.value = 110;
		const g = audio.createGain();
		g.gain.value = 0;
		const filter = audio.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.value = 420;
		osc.connect(filter);
		filter.connect(g);
		g.connect(audio.destination);
		osc.start();
		wind = osc;
		gain = g;
	}
	gain?.gain.setTargetAtTime(.015, audio.currentTime, .4);
}
function chimeUnlock() {
	const audio = ensure();
	if (!audio || !gain || gain.gain.value <= .001) return;
	const osc = audio.createOscillator();
	const g = audio.createGain();
	osc.frequency.value = 784;
	osc.type = "sine";
	g.gain.value = .04;
	osc.connect(g);
	g.connect(audio.destination);
	osc.start();
	g.gain.exponentialRampToValueAtTime(.001, audio.currentTime + .8);
	osc.stop(audio.currentTime + .85);
}
function GardenPage() {
	const { garden, loading, error, ackUnlocks, savePlacements, claimDaily, toggleSound } = useGarden();
	const [collection, setCollection] = (0, import_react.useState)(false);
	const [placing, setPlacing] = (0, import_react.useState)(null);
	const [sound, setSound] = (0, import_react.useState)(garden.soundOn);
	const reduced = typeof window !== "undefined" && (window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("reduce-motion"));
	(0, import_react.useEffect)(() => {
		setSound(garden.soundOn);
	}, [garden.soundOn]);
	(0, import_react.useEffect)(() => {
		setGardenAudio(sound);
		return () => {
			setGardenAudio(false);
		};
	}, [sound]);
	(0, import_react.useEffect)(() => {
		if (garden.newUnlocks.length && sound) chimeUnlock();
	}, [garden.newUnlocks.length, sound]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GardenLoading, {});
	if (error && !garden) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GardenFallback, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "庭",
			title: "Khu vườn của tôi",
			description: "Học tiếng Nhật càng đều, khu vườn càng sống. Cây không bao giờ chết — chúng chỉ chờ bạn trở lại.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/daily",
					children: "Bắt đầu học"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "garden-frame",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GardenScene, {
				garden,
				placing,
				reduced,
				onPlace: (x, y) => {
					if (!placing) return;
					const def = GARDEN_ITEM_MAP[placing];
					savePlacements([...garden.placements.filter((p) => p.itemId !== placing), {
						id: uid("plt"),
						itemId: placing,
						x,
						y,
						scale: def?.scale ?? 1
					}]);
					setPlacing(null);
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GardenHud, {
				garden,
				soundOn: sound,
				placing,
				onCancelPlace: () => setPlacing(null),
				onOpenCollection: () => setCollection(true),
				onSound: () => {
					const next = !sound;
					setSound(next);
					toggleSound(next);
				},
				onDaily: () => {
					claimDaily();
				}
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionSheet, {
			open: collection,
			onOpenChange: setCollection,
			garden,
			onPlace: (id) => setPlacing(id)
		}),
		garden.newUnlocks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnlockModal, {
			garden,
			onDone: (ids) => void ackUnlocks(ids)
		}) : null,
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-center text-sm text-muted",
			children: "Khu vườn đang nghỉ một chút — tiến trình học vẫn an toàn."
		}) : null
	] });
}
//#endregion
export { GardenPage as component };
