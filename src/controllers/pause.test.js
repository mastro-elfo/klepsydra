import { fromObject } from "./pause";

test("create pause", () => {
  const obj = fromObject();
  expect(obj).toHaveProperty("end");
  expect(obj).toHaveProperty("id");
  expect(obj).toHaveProperty("note");
  expect(obj).toHaveProperty("start");
  expect(obj.end).not.toBeNull();
  expect(obj.id).not.toBeNull();
  expect(obj.note).not.toBeNull();
  expect(obj.start).not.toBeNull();
});

test("create pause", () => {
  const obj = fromObject({ note: "qwerty" });
  expect(obj).toHaveProperty("note");
  expect(obj.note).toEqual("qwerty");
});

test("create pause", () => {
  const obj = fromObject({ note: "qwerty" }, { note: "asdfgh" });
  expect(obj).toHaveProperty("note");
  expect(obj.note).toEqual("asdfgh");
});
