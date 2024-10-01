import { describe, expect, it } from "vitest";
import { sumBalance } from "./cashBalance";

describe("cash balance", () => {
  it("calculates number of bills", () => {
    expect(sumBalance({ "1000kr": 11 })).toBe(11_000);
  });
  it("sums bills of different types", () => {
    expect(
      sumBalance({
        "1000kr": 1,
        "500kr": 2,
        "200kr": 3,
        "100kr": 5,
        "50kr": 7,
      }),
    ).toBe(1000 + 2 * 500 + 3 * 200 + 5 * 100 + 7 * 50);
  });
  it("sums coins by count", () => {
    expect(
      sumBalance({
        "20kr": { count: 1 },
        "10kr": { count: 2 },
        "5kr": { count: 3 },
      }),
    ).toBe(20 + 2 * 10 + 3 * 5);
  });
  it("sums coins by weight", () => {
    expect(
      sumBalance({
        "20kr": { grams: 9.9 * 2 },
        "10kr": { grams: 6.8 * 3 },
        "1kr": { grams: 4.35 * 50 },
      }),
    ).toBe(2 * 20 + 3 * 10 + 50);
  });
  it("rounds coins by weight", () => {
    expect(
      sumBalance({
        "20kr": { grams: 9.9 * 10 + 4 }, // round down
        "1kr": { grams: 4.35 * 10 + 3 }, // round up
      }),
    ).toBe(20 * 10 + 11);
  });
});
