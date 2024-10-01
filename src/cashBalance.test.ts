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
});
