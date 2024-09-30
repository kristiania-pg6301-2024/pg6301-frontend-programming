import { describe, expect, it } from "vitest";

function isLeapYear(year: number) {
  return false;
}

describe("leap years", () => {
  it("returns false for normal years", () => {
    expect(isLeapYear(2025)).toBe(false);
  });
  it("returns true for years divisible by four", () => {
    expect(isLeapYear(2024)).toBe(true);
  });
});
