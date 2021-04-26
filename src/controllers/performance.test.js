import { fromObject } from "./performance";

test("merge empty", () => {
  const obj = fromObject();
  expect(obj).toHaveProperty("_id");
  expect(obj).toHaveProperty("client");
  expect(obj).toHaveProperty("discount");
  expect(obj).toHaveProperty("end");
  expect(obj).toHaveProperty("note");
  expect(obj).toHaveProperty("pauses");
  expect(obj).toHaveProperty("payments");
  expect(obj).toHaveProperty("price");
  expect(obj).toHaveProperty("start");
});
