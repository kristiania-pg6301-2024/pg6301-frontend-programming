import { expect, test } from "vitest";

function sum(a: number, b: number) {
  return a + b;
}

test("calculate sum", () => {
  expect(sum(1, 2)).toBe(3);
});
