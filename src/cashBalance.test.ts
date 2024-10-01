import { describe, expect, it } from "vitest";

function sumBalance(param: { "1000kr": number }) {
  return 1000 * param["1000kr"];
}

describe("cash balance", () => {
  it("calculates number of bills", () => {
    expect(sumBalance({ "1000kr": 11 })).toBe(11_000);
  });
});
