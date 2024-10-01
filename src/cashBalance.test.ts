import { describe, expect, it } from "vitest";
import { sumBalance } from "./cashBalance";

describe("cash balance", () => {
  it("calculates number of bills", () => {
    expect(sumBalance({ "1000kr": 11 })).toBe(11_000);
  });
  it("sums bills of different type", () => {
    expect(sumBalance({ "1000kr": 1, "50kr": 8 })).toBe(1400);
  });
});
