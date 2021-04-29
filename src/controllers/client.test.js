import { fromObject } from "./client";

test("merge empty", () => {
  const obj = fromObject();
  expect(obj).toHaveProperty("_id");
  expect(obj).toHaveProperty("contacts");
  expect(obj).toHaveProperty("name");
  expect(obj).toHaveProperty("price");
  expect(obj).toHaveProperty("surname");
});

test("merge object", () => {
  const obj = fromObject({ name: "qwerty" });
  expect(obj).toHaveProperty("name");
  expect(obj.name).toEqual("qwerty");
});

test("merge objects", () => {
  const obj = fromObject({ name: "qwerty" }, { name: "asdfgh" });
  expect(obj).toHaveProperty("name");
  expect(obj.name).toEqual("asdfgh");
});
