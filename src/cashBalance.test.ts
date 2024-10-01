import { describe, expect, it } from "vitest";

function sumBalance(param: { "50kr"?: number; "1000kr"?: number }) {
  return 1000 * (param["1000kr"] || 0) + 50 * (param["50kr"] || 0);
}

describe("cash balance", () => {
  it("calculates number of bills", () => {
    expect(sumBalance({ "1000kr": 11 })).toBe(11_000);
  });
  it("sums bills of different type", () => {
    expect(sumBalance({ "1000kr": 1, "50kr": 8 })).toBe(1400);
  });
});
