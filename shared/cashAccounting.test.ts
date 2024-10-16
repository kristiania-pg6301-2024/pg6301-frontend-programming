import { expect, test } from "vitest";
import { sumBalance } from "../sumBalance";

test("that we can sum 1000 kr bills", () => {
  expect(sumBalance({ "1000kr": 10 })).toBe(10_000);
  expect(sumBalance({ "1000kr": 5 })).toBe(5_000);
});
test("that we can sum 100 kr bills", () => {
  expect(sumBalance({ "100kr": 5 })).toBe(500);
});
test("that we can sum bills of different types", () => {
  expect(sumBalance({ "1000kr": 1, "200kr": 1, "100kr": 5, "50kr": 3 })).toBe(
    1850,
  );
});

test("that we can sum coins ", () => {
  expect(sumBalance({ "20kr": { count: 10 } })).toBe(200);
});
test("that we can sum coins by weight", () => {
  expect(sumBalance({ "20kr": { grams: 19.8 } })).toBe(40);
});

test("that we can sum coins and bills", () => {
  expect(
    sumBalance({
      "100kr": 1,
      "20kr": { grams: 19.8 },
      "10kr": { count: 2 },
    }),
  ).toBe(100 + 2 * 20 + 2 * 10);
});

test("should round off number of coins", () => {
  expect(sumBalance({ "20kr": { grams: 1998 } })).toBe(4040);
});
