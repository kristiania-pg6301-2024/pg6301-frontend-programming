import { describe, expect, it } from "vitest";

function sumBalance(param: { "1000kr": number }) {}

describe("cash balance", () => {
  it("calculates number of bills", () => {
    expect(sumBalance({ "1000kr": 11 })).toBe(10_000);
  });
});
