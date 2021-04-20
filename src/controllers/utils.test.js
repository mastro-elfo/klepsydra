import { merge } from "./utils";

test("merge empty", () => {
  expect(merge({})).toEqual({});
  expect(merge({}, {})).toEqual({});
  expect(merge({}, { a: 1 })).toEqual({});
  expect(merge({}, {}, {})).toEqual({});
  expect(merge({}, { a: 1 }, { b: 2 })).toEqual({});
});

test("merge", () => {
  expect(merge({ a: 0 })).toEqual({ a: 0 });
  expect(merge({ a: 0 }, {})).toEqual({ a: 0 });
  expect(merge({ a: 0 }, { a: 1 })).toEqual({ a: 1 });
  expect(merge({ a: 0 }, {}, {})).toEqual({ a: 0 });
  expect(merge({ a: 0 }, { a: 1 }, { a: 2 })).toEqual({ a: 2 });
});
