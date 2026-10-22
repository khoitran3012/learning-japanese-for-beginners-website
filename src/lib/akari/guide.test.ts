import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { DAILY_ROUTINE, GRADE_GUIDE, SCREEN_GUIDE, START_PLAN, TROUBLES } from "./guide.ts";

/** Các màn hình có thật trong app — mọi link trong hướng dẫn phải trỏ tới đây. */
const ROUTES = new Set([
  "/",
  "/daily",
  "/guide",
  "/path",
  "/garden",
  "/alphabet",
  "/hiragana",
  "/katakana",
  "/kanji",
  "/radicals",
  "/vocabulary",
  "/grammar",
  "/dictionary",
  "/flashcards",
  "/listen",
  "/speak",
  "/songs",
  "/read",
  "/romaji",
  "/quiz",
  "/play",
  "/review",
  "/weak",
  "/leaderboard",
  "/stats",
  "/favorites",
  "/my-words",
  "/settings",
]);

describe("hướng dẫn cách học", () => {
  it("lộ trình 7 ngày có đủ bước và link hợp lệ", () => {
    // 6 bước phủ 7 ngày (ngày 3–4 dồn một bước).
    assert.equal(START_PLAN.length, 6);
    const whens = START_PLAN.map((s) => s.when);
    assert.ok(whens.includes("Ngày 1"));
    assert.ok(whens.includes("Ngày 3–4"));
    assert.ok(whens.includes("Ngày 7"));
    for (const step of START_PLAN) {
      assert.ok(step.title.length > 0);
      assert.ok(step.body.length > 20, step.title);
      assert.ok(ROUTES.has(step.action.to), step.action.to);
    }
    assert.equal(new Set(START_PLAN.map((s) => s.when)).size, START_PLAN.length);
  });

  it("giải thích đúng 4 nút chấm điểm theo phím 1-4", () => {
    assert.equal(GRADE_GUIDE.length, 4);
    assert.deepEqual(
      GRADE_GUIDE.map((g) => g.label),
      ["Quên", "Khó", "Nhớ", "Dễ"],
    );
    assert.deepEqual(
      GRADE_GUIDE.map((g) => g.key),
      ["1", "2", "3", "4"],
    );
    for (const row of GRADE_GUIDE) {
      assert.ok(row.effect.length > 20, row.label);
      assert.ok(row.when.length > 10, row.label);
    }
  });

  it("mọi màn hình trong hướng dẫn đều tồn tại", () => {
    assert.ok(SCREEN_GUIDE.length >= 8);
    for (const s of SCREEN_GUIDE) {
      assert.ok(ROUTES.has(s.to), s.to);
      assert.ok(s.body.length > 20, s.title);
    }
  });

  it("mỗi khó khăn đều có cách xử lý và link", () => {
    assert.ok(TROUBLES.length >= 5);
    for (const t of TROUBLES) {
      assert.ok(t.problem.length > 5);
      assert.ok(t.fix.length > 20, t.problem);
      assert.ok(ROUTES.has(t.to), t.to);
    }
  });

  it("một ngày học mẫu có đủ ba khung giờ", () => {
    assert.equal(DAILY_ROUTINE.length, 3);
    for (const step of DAILY_ROUTINE) {
      assert.match(step.label, /phút/);
      assert.ok(step.body.length > 20);
    }
  });
});
