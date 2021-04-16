import { delta2hms, roundCost, timeDiff } from "./utils";

test("timeDiff should be 10000", () => {
  expect(timeDiff(0, 10000, [])).toBe(10000);
});

test("timeDiff should be 9000", () => {
  expect(
    timeDiff(0, 10000, [
      {
        start: 1000,
        end: 2000,
      },
    ])
  ).toBe(9000);
});

test("timeDiff should be 8000", () => {
  expect(
    timeDiff(0, 10000, [
      {
        start: 1000,
        end: 2000,
      },
      {
        start: 3000,
        end: 4000,
      },
    ])
  ).toBe(8000);
});

test("delta2hms should be 00:00:00", () => {
  expect(delta2hms(0)).toBe("00:00:00");
});

test("delta2hms should be 00:00:01", () => {
  expect(delta2hms(1000)).toBe("00:00:01");
});

test("delta2hms should be 00:01:00", () => {
  expect(delta2hms(60000)).toBe("00:01:00");
});

test("delta2hms should be 01:00:00", () => {
  expect(delta2hms(3600000)).toBe("01:00:00");
});

test("roundCost should be 0", () => {
  expect(roundCost(0, 0)).toBe(0);
});

test("roundCost should be 0", () => {
  expect(roundCost(0.9, 1)).toBe(0);
});

test("roundCost should be 0.33", () => {
  expect(roundCost(10.33, 1)).toBeCloseTo(0.33, 2);
});

test("roundCost should be 10", () => {
  expect(roundCost(12.5, 2.5)).toBeCloseTo(0, 2);
});
