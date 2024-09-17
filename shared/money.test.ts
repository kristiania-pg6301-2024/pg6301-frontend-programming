import { expect, test } from "vitest";
import { sumBalance } from "./money";

test("calculate for single currency", () => {
  expect(sumBalance({ "1000kr": 2 })).toBe(2000);
});
test("calculate for other currency", () => {
  expect(sumBalance({ "50kr": 400 })).toBe(20000);
});
test("calculate multiple currencies", () => {
  expect(sumBalance({ "500kr": 100, "100kr": 1, "50kr": 40 })).toBe(52100);
});
test("calculate coins by weight", () => {
  expect(sumBalance({ "20kr": { grams: 198 } })).toBe(20 * 20);
});
test("calculate coins by count", () => {
  expect(sumBalance({ "10kr": { count: 50 } })).toBe(500);
});
