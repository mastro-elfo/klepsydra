import { create } from "./pause";

test("create pause", () => {
  expect(Object.keys(create())).toEqual(
    expect.arrayContaining(["id", "end", "note", "start"])
  );
});
