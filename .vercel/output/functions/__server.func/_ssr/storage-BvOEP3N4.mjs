import { r as isBrowser } from "./utils-D10sm1uC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/storage-BvOEP3N4.js
var DB_NAME = "akari-nihongo";
var DB_VERSION = 2;
var dbPromise = null;
function openDb() {
	if (!isBrowser()) return Promise.reject(/* @__PURE__ */ new Error("IndexedDB is browser-only"));
	if (dbPromise) return dbPromise;
	dbPromise = new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, DB_VERSION);
		req.onupgradeneeded = () => {
			const db = req.result;
			for (const name of [
				"srs",
				"favorites",
				"myWords",
				"quiz",
				"searchHistory",
				"dayStats",
				"lessons",
				"meta",
				"dictionary"
			]) if (!db.objectStoreNames.contains(name)) db.createObjectStore(name, { keyPath: "id" });
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
	return dbPromise;
}
function txDone(tx) {
	return new Promise((resolve, reject) => {
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
		tx.onabort = () => reject(tx.error);
	});
}
async function idbPut(store, value) {
	const tx = (await openDb()).transaction(store, "readwrite");
	tx.objectStore(store).put(value);
	await txDone(tx);
}
async function idbGet(store, id) {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const req = db.transaction(store, "readonly").objectStore(store).get(id);
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function idbGetAll(store) {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const req = db.transaction(store, "readonly").objectStore(store).getAll();
		req.onsuccess = () => resolve(req.result ?? []);
		req.onerror = () => reject(req.error);
	});
}
async function idbDelete(store, id) {
	const tx = (await openDb()).transaction(store, "readwrite");
	tx.objectStore(store).delete(id);
	await txDone(tx);
}
async function idbClear(store) {
	const tx = (await openDb()).transaction(store, "readwrite");
	tx.objectStore(store).clear();
	await txDone(tx);
}
async function putSrs(item) {
	return idbPut("srs", item);
}
async function allSrs() {
	return idbGetAll("srs");
}
async function allFavorites() {
	return idbGetAll("favorites");
}
async function toggleFavorite(id, itemType) {
	if (await idbGet("favorites", id)) {
		await idbDelete("favorites", id);
		return false;
	}
	await idbPut("favorites", {
		id,
		itemType,
		addedAt: Date.now()
	});
	return true;
}
async function addMyWord(id, source = "dictionary") {
	await idbPut("myWords", {
		id,
		addedAt: Date.now(),
		source
	});
}
async function removeMyWord(id) {
	await idbDelete("myWords", id);
}
async function allMyWords() {
	return idbGetAll("myWords");
}
async function addQuizResult(result) {
	await idbPut("quiz", result);
}
async function allQuizResults() {
	return idbGetAll("quiz");
}
async function pushSearch(query) {
	const q = query.trim();
	if (!q) return;
	const dup = (await idbGetAll("searchHistory")).find((x) => x.query === q);
	if (dup) await idbDelete("searchHistory", dup.id);
	await idbPut("searchHistory", {
		id: `s-${Date.now()}`,
		query: q,
		at: Date.now()
	});
	const next = await idbGetAll("searchHistory");
	next.sort((a, b) => b.at - a.at);
	for (const extra of next.slice(30)) await idbDelete("searchHistory", extra.id);
}
async function searchHistory() {
	return (await idbGetAll("searchHistory")).sort((a, b) => b.at - a.at);
}
async function clearSearchHistory() {
	await idbClear("searchHistory");
}
async function completeLesson(id) {
	await idbPut("lessons", {
		id,
		completedAt: Date.now()
	});
}
async function completedLessons() {
	return idbGetAll("lessons");
}
async function bumpDayStats(delta, date) {
	const current = await idbGet("dayStats", date) ?? {
		id: date,
		date,
		minutes: 0,
		items: 0,
		quizzes: 0
	};
	const next = {
		...current,
		id: date,
		minutes: current.minutes + (delta.minutes ?? 0),
		items: current.items + (delta.items ?? 0),
		quizzes: current.quizzes + (delta.quizzes ?? 0)
	};
	await idbPut("dayStats", next);
	return next;
}
async function allDayStats() {
	return idbGetAll("dayStats");
}
async function getMeta(id) {
	return (await idbGet("meta", id))?.value;
}
async function setMeta(id, value) {
	await idbPut("meta", {
		id,
		value
	});
}
async function allImportedDictionary() {
	return idbGetAll("dictionary");
}
async function putImportedEntries(entries) {
	for (const e of entries) await idbPut("dictionary", e);
}
async function clearImportedDictionary() {
	await idbClear("dictionary");
}
async function exportAll(settings) {
	const [srs, favorites, myWords, quiz, history, dayStats, lessons, meta, dictionary] = await Promise.all([
		allSrs(),
		allFavorites(),
		allMyWords(),
		allQuizResults(),
		searchHistory(),
		allDayStats(),
		completedLessons(),
		idbGetAll("meta"),
		allImportedDictionary()
	]);
	return {
		version: 1,
		exportedAt: Date.now(),
		srs,
		favorites,
		myWords,
		quiz,
		searchHistory: history,
		dayStats,
		lessons,
		dictionary,
		settings,
		meta
	};
}
function validateBackup(data) {
	if (!data || typeof data !== "object") return false;
	const d = data;
	return d.version === 1 && Array.isArray(d.srs);
}
async function importAll(payload) {
	const entries = [
		["srs", payload.srs],
		["favorites", payload.favorites ?? []],
		["myWords", payload.myWords ?? []],
		["quiz", payload.quiz ?? []],
		["searchHistory", payload.searchHistory ?? []],
		["dayStats", (payload.dayStats ?? []).map((x) => ({
			...x,
			id: x.date ?? x.id
		}))],
		["lessons", payload.lessons ?? []],
		["meta", payload.meta ?? []],
		["dictionary", payload.dictionary ?? []]
	];
	for (const [store, rows] of entries) {
		await idbClear(store);
		for (const row of rows) if (row && typeof row.id === "string") await idbPut(store, row);
	}
}
async function wipeUserData() {
	for (const s of [
		"srs",
		"favorites",
		"myWords",
		"quiz",
		"searchHistory",
		"dayStats",
		"lessons",
		"meta",
		"dictionary"
	]) await idbClear(s);
}
//#endregion
export { toggleFavorite as C, setMeta as S, wipeUserData as T, pushSearch as _, allImportedDictionary as a, removeMyWord as b, allSrs as c, clearSearchHistory as d, completeLesson as f, importAll as g, getMeta as h, allFavorites as i, bumpDayStats as l, exportAll as m, addQuizResult as n, allMyWords as o, completedLessons as p, allDayStats as r, allQuizResults as s, addMyWord as t, clearImportedDictionary as u, putImportedEntries as v, validateBackup as w, searchHistory as x, putSrs as y };
