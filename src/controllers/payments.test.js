import { create } from "./payment";

test("create payment", () => {
  expect(Object.keys(create())).toEqual(
    expect.arrayContaining(["id", "date", "value"])
  );
});

test("create payment", () => {
  expect(create({ value: 3.14 }).value).toEqual(3.14);
});
