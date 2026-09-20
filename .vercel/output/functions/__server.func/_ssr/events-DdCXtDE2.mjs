import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-DdCXtDE2.js
var events_exports = /* @__PURE__ */ __exportAll({ gardenEvents: () => gardenEvents });
var listeners = {};
var gardenEvents = {
	on(type, fn) {
		const existing = listeners[type];
		const set = existing ?? /* @__PURE__ */ new Set();
		if (!existing) listeners[type] = set;
		set.add(fn);
		return () => {
			set.delete(fn);
		};
	},
	emit(type, payload) {
		const set = listeners[type];
		if (!set) return;
		for (const fn of set) try {
			fn(payload);
		} catch {}
	}
};
//#endregion
export { gardenEvents as n, events_exports as t };
