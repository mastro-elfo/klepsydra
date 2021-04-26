import { fromObject } from "./client";

test("merge empty", () => {
  const obj = fromObject();
  expect(obj).toHaveProperty("_id");
  expect(obj).toHaveProperty("contacts");
  expect(obj).toHaveProperty("name");
  expect(obj).toHaveProperty("price");
  expect(obj).toHaveProperty("surname");
});
