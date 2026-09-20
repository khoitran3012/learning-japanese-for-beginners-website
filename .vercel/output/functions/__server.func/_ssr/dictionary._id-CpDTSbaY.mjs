import { o as __toESM } from "../_runtime.mjs";
import { D as require_react, E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { B as notFound, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as findEntry, o as fullDictionary } from "./catalog-BH6ywzg_.mjs";
import { t as Button } from "./button-C9dY86uP.mjs";
import { c as Route$14 } from "./router-C92aJlrP.mjs";
import { t as DictEntryView } from "./dict-entry-view-DA90tnpx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dictionary._id-CpDTSbaY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { id } = Route$14.useParams();
	const [entry, setEntry] = (0, import_react.useState)(() => findEntry(id) ?? null);
	const [ready, setReady] = (0, import_react.useState)(Boolean(entry));
	(0, import_react.useEffect)(() => {
		let alive = true;
		const cached = findEntry(id) ?? null;
		if (cached) {
			setEntry(cached);
			setReady(true);
		}
		fullDictionary().then((dict) => {
			if (!alive) return;
			setEntry(dict.find((e) => e.id === id) ?? cached);
			setReady(true);
		});
		return () => {
			alive = false;
		};
	}, [id]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Đang mở mục từ…"
	});
	if (!entry) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "ghost",
			size: "sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/dictionary",
				children: "← Từ điển"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DictEntryView, { entry })]
	});
}
//#endregion
export { Page as component };
