import { fromObject } from "./tracker";

test("merge empty", () => {
  const obj = fromObject();
  expect(obj).toHaveProperty("client");
  expect(obj).toHaveProperty("note");
  expect(obj).toHaveProperty("pause");
  expect(obj).toHaveProperty("pauses");
  expect(obj).toHaveProperty("price");
  expect(obj).toHaveProperty("start");
  expect(obj).toHaveProperty("status");
});
