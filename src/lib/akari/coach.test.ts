import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildCoachTips, buildStartPlan, STUDY_TIPS, type CoachInput } from "./coach.ts";

function input(over: Partial<CoachInput> = {}): CoachInput {
  return {
    due: 0,
    weak: 0,
    minutesToday: 10,
    dailyGoal: 15,
    streak: 2,
    quizAvg: 80,
    learnedKana: 30,
    learnedVocab: 40,
    learnedKanji: 10,
    hasHistory: true,
    ...over,
  };
}

describe("buildCoachTips", () => {
  it("người mới nhận lộ trình 3 bước, không nhắc ôn tập", () => {
    const tips = buildCoachTips(input({ hasHistory: false, due: 5, weak: 3, minutesToday: 0 }));
    assert.equal(tips.length, 3);
    assert.deepEqual(
      tips.map((t) => t.id),
      ["plan-kana", "plan-vocab", "plan-listen"],
    );
    assert.ok(tips.every((t) => t.tone === "plan"));
    assert.ok(tips.every((t) => t.action?.to));
  });

  it("ưu tiên thẻ đến hạn và mục hay sai lên đầu", () => {
    const tips = buildCoachTips(input({ due: 4, weak: 2, minutesToday: 0 }));
    assert.deepEqual(
      tips.slice(0, 2).map((t) => t.id),
      ["due", "weak"],
    );
    assert.match(tips[0]!.title, /4/);
    assert.equal(tips[0]!.action?.to, "/review");
    assert.equal(tips[1]!.action?.to, "/weak");
  });

  it("nhắc đủ mục tiêu khi học chưa đủ phút", () => {
    const tips = buildCoachTips(input({ minutesToday: 8, dailyGoal: 15 }));
    const goal = tips.find((t) => t.id === "goal-left");
    assert.ok(goal);
    assert.match(goal.title, /7 phút/);
  });

  it("chúc mừng khi đã đủ mục tiêu và gợi ý nghe chép", () => {
    const tips = buildCoachTips(input({ minutesToday: 20, dailyGoal: 15 }));
    const goal = tips.find((t) => t.id === "goal-done");
    assert.ok(goal);
    assert.equal(goal.action?.to, "/listen");
  });

  it("nhắc nối lại chuỗi khi chuỗi bị đứt", () => {
    const tips = buildCoachTips(input({ streak: 0 }));
    assert.ok(tips.some((t) => t.id === "streak-broken"));
  });

  it("khen khi giữ chuỗi nhiều ngày", () => {
    const tips = buildCoachTips(input({ streak: 5 }));
    assert.ok(tips.some((t) => t.id === "streak"));
    assert.ok(!tips.some((t) => t.id === "streak-broken"));
  });

  it("gợi ý ôn lại khi điểm trắc nghiệm thấp", () => {
    const tips = buildCoachTips(input({ quizAvg: 45 }));
    const low = tips.find((t) => t.id === "quiz-low");
    assert.ok(low);
    assert.match(low.title, /45%/);
  });

  it("không gợi ý điểm thấp khi chưa làm bài nào", () => {
    const tips = buildCoachTips(input({ quizAvg: null }));
    assert.ok(!tips.some((t) => t.id === "quiz-low"));
  });

  it("gợi ý học chữ cái khi người học chưa học kana nào", () => {
    const tips = buildCoachTips(input({ learnedKana: 0 }));
    assert.ok(tips.some((t) => t.id === "learn-kana"));
  });

  it("luôn giới hạn số gợi ý theo limit", () => {
    const tips = buildCoachTips(input({ due: 3, weak: 3, quizAvg: 20, learnedKana: 0, streak: 0 }), 2);
    assert.equal(tips.length, 2);
  });
});

describe("buildStartPlan", () => {
  it("mỗi bước đều có nút hành động", () => {
    const plan = buildStartPlan();
    assert.equal(plan.length, 3);
    assert.deepEqual(
      plan.map((t) => t.action?.to),
      ["/hiragana", "/vocabulary", "/listen"],
    );
  });
});

describe("STUDY_TIPS", () => {
  it("mẹo học tập đều có link và mô tả ngắn", () => {
    assert.ok(STUDY_TIPS.length >= 5);
    for (const tip of STUDY_TIPS) {
      assert.ok(tip.title.length > 0, tip.id);
      assert.ok(tip.body.length > 10, tip.id);
      assert.ok(tip.to.startsWith("/"), tip.id);
    }
  });
});
