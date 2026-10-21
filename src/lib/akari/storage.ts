import type { DictionaryEntry, QuizResult, SearchHistoryItem, SrsItem } from "./types";
import { applyDayDelta, type DayDelta, type DayStats } from "./day-stats";
import { isBrowser, todayKey } from "@/lib/utils";

export type { DayStats } from "./day-stats";

const DB_NAME = "akari-nihongo";
const DB_VERSION = 2;

export interface FavoriteRecord {
  id: string;
  itemType: string;
  addedAt: number;
}

export interface MyWordRecord {
  id: string;
  addedAt: number;
  source: "dictionary" | "vocab" | "custom";
}

export interface LessonProgress {
  id: string;
  completedAt: number;
}

type StoreName =
  | "srs"
  | "favorites"
  | "myWords"
  | "quiz"
  | "searchHistory"
  | "dayStats"
  | "lessons"
  | "meta"
  | "dictionary";

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (!isBrowser()) {
    return Promise.reject(new Error("IndexedDB is browser-only"));
  }
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      const stores: StoreName[] = [
        "srs",
        "favorites",
        "myWords",
        "quiz",
        "searchHistory",
        "dayStats",
        "lessons",
        "meta",
        "dictionary",
      ];
      for (const name of stores) {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, { keyPath: "id" });
        }
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function txDone(tx: IDBTransaction) {
  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function idbPut<T extends { id: string }>(store: StoreName, value: T) {
  const db = await openDb();
  const tx = db.transaction(store, "readwrite");
  tx.objectStore(store).put(value);
  await txDone(tx);
}

export async function idbGet<T>(store: StoreName, id: string) {
  const db = await openDb();
  return new Promise<T | undefined>((resolve, reject) => {
    const req = db.transaction(store, "readonly").objectStore(store).get(id);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error);
  });
}

export async function idbGetAll<T>(store: StoreName) {
  const db = await openDb();
  return new Promise<T[]>((resolve, reject) => {
    const req = db.transaction(store, "readonly").objectStore(store).getAll();
    req.onsuccess = () => resolve((req.result as T[]) ?? []);
    req.onerror = () => reject(req.error);
  });
}

export async function idbDelete(store: StoreName, id: string) {
  const db = await openDb();
  const tx = db.transaction(store, "readwrite");
  tx.objectStore(store).delete(id);
  await txDone(tx);
}

export async function idbClear(store: StoreName) {
  const db = await openDb();
  const tx = db.transaction(store, "readwrite");
  tx.objectStore(store).clear();
  await txDone(tx);
}

export async function getSrs(id: string) {
  return idbGet<SrsItem>("srs", id);
}

export async function putSrs(item: SrsItem) {
  return idbPut("srs", item);
}

export async function allSrs() {
  return idbGetAll<SrsItem>("srs");
}

export async function allFavorites() {
  return idbGetAll<FavoriteRecord>("favorites");
}

export async function toggleFavorite(id: string, itemType: string) {
  const existing = await idbGet<FavoriteRecord>("favorites", id);
  if (existing) {
    await idbDelete("favorites", id);
    return false;
  }
  await idbPut("favorites", { id, itemType, addedAt: Date.now() });
  return true;
}

export async function addMyWord(id: string, source: MyWordRecord["source"] = "dictionary") {
  await idbPut("myWords", { id, addedAt: Date.now(), source });
}

export async function removeMyWord(id: string) {
  await idbDelete("myWords", id);
}

export async function allMyWords() {
  return idbGetAll<MyWordRecord>("myWords");
}

export async function addQuizResult(result: QuizResult) {
  await idbPut("quiz", result);
  await bumpDayStats({ quizzes: 1 }, todayKey(new Date(result.at)));
}

export async function allQuizResults() {
  return idbGetAll<QuizResult>("quiz");
}

export async function pushSearch(query: string) {
  const q = query.trim();
  if (!q) return;
  const all = await idbGetAll<SearchHistoryItem & { id: string }>("searchHistory");
  const dup = all.find((x) => x.query === q);
  if (dup) await idbDelete("searchHistory", dup.id);
  await idbPut("searchHistory", { id: `s-${Date.now()}`, query: q, at: Date.now() });
  const next = await idbGetAll<SearchHistoryItem & { id: string }>("searchHistory");
  next.sort((a, b) => b.at - a.at);
  for (const extra of next.slice(30)) {
    await idbDelete("searchHistory", extra.id);
  }
}

export async function searchHistory() {
  const all = await idbGetAll<SearchHistoryItem & { id: string }>("searchHistory");
  return all.sort((a, b) => b.at - a.at);
}

export async function clearSearchHistory() {
  await idbClear("searchHistory");
}

export async function completeLesson(id: string) {
  await idbPut("lessons", { id, completedAt: Date.now() });
}

export async function completedLessons() {
  return idbGetAll<LessonProgress>("lessons");
}

/**
 * Đọc–sửa–ghi trên IndexedDB: nhiều lượt trả lời có thể gọi cùng lúc
 * (`mark()` bắn `logStudy` không chờ), nên nếu chạy song song thì lượt sau đọc
 * số cũ và ghi đè, làm mất phút/mục của lượt trước. Xếp hàng từng lượt một.
 */
let dayStatsQueue: Promise<unknown> = Promise.resolve();

export function bumpDayStats(delta: DayDelta, date: string): Promise<DayStats> {
  const run = dayStatsQueue.then(async () => {
    const current = await idbGet<DayStats>("dayStats", date);
    const next = applyDayDelta(current, delta, date);
    await idbPut("dayStats", next);
    return next;
  });
  dayStatsQueue = run.catch(() => undefined);
  return run;
}

export async function allDayStats() {
  return idbGetAll<DayStats>("dayStats");
}

export async function getMeta<T>(id: string) {
  const row = await idbGet<{ id: string; value: T }>("meta", id);
  return row?.value;
}

export async function setMeta<T>(id: string, value: T) {
  await idbPut("meta", { id, value });
}

export async function allImportedDictionary() {
  return idbGetAll<DictionaryEntry>("dictionary");
}

export async function putImportedEntries(entries: DictionaryEntry[]) {
  for (const e of entries) {
    await idbPut("dictionary", e);
  }
}

export async function clearImportedDictionary() {
  await idbClear("dictionary");
}

export interface BackupPayload {
  version: 1;
  exportedAt: number;
  srs: SrsItem[];
  favorites: FavoriteRecord[];
  myWords: MyWordRecord[];
  quiz: QuizResult[];
  searchHistory: Array<SearchHistoryItem & { id: string }>;
  dayStats: DayStats[];
  lessons: LessonProgress[];
  dictionary?: DictionaryEntry[];
  settings?: unknown;
  meta?: Array<{ id: string; value: unknown }>;
}

export async function exportAll(settings?: unknown): Promise<BackupPayload> {
  const [srs, favorites, myWords, quiz, history, dayStats, lessons, meta, dictionary] = await Promise.all([
    allSrs(),
    allFavorites(),
    allMyWords(),
    allQuizResults(),
    searchHistory() as Promise<Array<SearchHistoryItem & { id: string }>>,
    allDayStats(),
    completedLessons(),
    idbGetAll<{ id: string; value: unknown }>("meta"),
    allImportedDictionary(),
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
    meta,
  };
}

const BACKUP_ARRAYS = ["srs", "favorites", "myWords", "quiz", "searchHistory", "dayStats", "lessons"] as const;

/**
 * Chỉ nhận đúng file do `exportAll` tạo ra.
 *
 * Trước đây chỉ cần `version: 1` + `srs` là mảng, nên một file JSON bất kỳ có
 * thể qua vòng kiểm tra rồi `importAll` xoá sạch mọi store. Giờ yêu cầu đủ các
 * mảng bắt buộc và mỗi thẻ SRS phải có id chuỗi (nếu không sẽ bị bỏ qua im lặng).
 */
export function validateBackup(data: unknown): data is BackupPayload {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  if (d.version !== 1 || typeof d.exportedAt !== "number") return false;
  for (const key of BACKUP_ARRAYS) {
    if (!Array.isArray(d[key])) return false;
  }
  return (d.srs as unknown[]).every((row) => {
    if (!row || typeof row !== "object") return false;
    return typeof (row as { id?: unknown }).id === "string";
  });
}

export async function importAll(payload: BackupPayload) {
  const entries: Array<[StoreName, { id: string }[]]> = [
    ["srs", payload.srs],
    ["favorites", payload.favorites ?? []],
    ["myWords", payload.myWords ?? []],
    ["quiz", payload.quiz ?? []],
    ["searchHistory", payload.searchHistory ?? []],
    ["dayStats", (payload.dayStats ?? []).map((x) => ({ ...x, id: x.date ?? x.id }))],
    ["lessons", payload.lessons ?? []],
    ["meta", payload.meta ?? []],
    ["dictionary", payload.dictionary ?? []],
  ];
  for (const [store, rows] of entries) {
    await idbClear(store);
    for (const row of rows) {
      if (row && typeof row.id === "string") await idbPut(store, row);
    }
  }
}

export async function wipeUserData() {
  const stores: StoreName[] = [
    "srs",
    "favorites",
    "myWords",
    "quiz",
    "searchHistory",
    "dayStats",
    "lessons",
    "meta",
    "dictionary",
  ];
  for (const s of stores) await idbClear(s);
}
