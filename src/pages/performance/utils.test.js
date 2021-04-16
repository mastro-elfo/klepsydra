import { closeTo } from "./utils";

test("closeTo should be", () => {
  expect(closeTo(0.1 + 0.2, 0.3)).toBe(true);
});
