import { fromObject } from "./contact";

test("merge empty", () => {
  const obj = fromObject();
  expect(obj).toHaveProperty("id");
  expect(obj).toHaveProperty("type");
  expect(obj).toHaveProperty("value");
});
