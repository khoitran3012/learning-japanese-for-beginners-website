import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { applyDayDelta, emptyDay } from "./day-stats.ts";

describe("applyDayDelta", () => {
  it("tạo ngày mới từ delta", () => {
    const day = applyDayDelta(undefined, { minutes: 0.4, items: 1 }, "2026-10-22");
    assert.deepEqual(day, { id: "2026-10-22", date: "2026-10-22", minutes: 0.4, items: 1, quizzes: 0 });
  });

  it("cộng dồn nhiều lượt trong cùng ngày", () => {
    let day = emptyDay("2026-10-22");
    for (let i = 0; i < 3; i++) day = applyDayDelta(day, { minutes: 0.4, items: 1 }, "2026-10-22");
    day = applyDayDelta(day, { quizzes: 1 }, "2026-10-22");
    assert.equal(day.items, 3);
    assert.equal(Math.round(day.minutes * 10) / 10, 1.2);
    assert.equal(day.quizzes, 1);
  });

  it("giữ nguyên số liệu đã có khi delta rỗng", () => {
    const before = { id: "2026-10-22", date: "2026-10-22", minutes: 12, items: 30, quizzes: 2 };
    assert.deepEqual(applyDayDelta(before, {}, "2026-10-22"), before);
  });

  it("không sửa object đầu vào", () => {
    const before = emptyDay("2026-10-22");
    applyDayDelta(before, { items: 5 }, "2026-10-22");
    assert.equal(before.items, 0);
  });

  it("bỏ qua delta âm và NaN từ dữ liệu hỏng", () => {
    const broken = { id: "2026-10-22", date: "2026-10-22", minutes: NaN, items: 4, quizzes: 0 };
    const day = applyDayDelta(broken, { minutes: 2, items: Number.NaN, quizzes: -3 }, "2026-10-22");
    assert.equal(day.minutes, 2);
    assert.equal(day.items, 4);
    assert.equal(day.quizzes, 0);
  });

  it("luôn dùng date làm id", () => {
    const stale = { id: "2026-01-01", date: "2026-10-22", minutes: 1, items: 1, quizzes: 0 };
    assert.equal(applyDayDelta(stale, { items: 1 }, "2026-10-22").id, "2026-10-22");
  });
});
