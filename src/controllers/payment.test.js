import { fromObject } from "./payment";

test("create payment", () => {
  const obj = fromObject();
  expect(obj).toHaveProperty("id");
  expect(obj).toHaveProperty("date");
  expect(obj).toHaveProperty("value");
  expect(obj.id).not.toBeNull();
  expect(obj.date).not.toBeNull();
  expect(obj.value).not.toBeNull();
});

test("create payment", () => {
  const obj = fromObject({ value: 3.14 });
  expect(obj).toHaveProperty("value");
  expect(obj.value).toEqual(3.14);
});

test("create payment", () => {
  const obj = fromObject({ value: 3.14 }, { value: 2.71 });
  expect(obj).toHaveProperty("value");
  expect(obj.value).toEqual(2.71);
});
