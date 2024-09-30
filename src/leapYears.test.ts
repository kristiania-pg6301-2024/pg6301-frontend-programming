import { describe, expect, it } from "vitest";

function isLeapYear(number: number) {

}

describe("leap years", () => {
  it("returns false for normal years", () => {
    expect(isLeapYear(2025)).toBe(false);
  })
})