import { describe, expect, it } from "vitest";

function isLeapYear(year: number) {
  if (year % 100 === 0) return false;
  return year % 4 === 0;
}

describe("leap years", () => {
  it("returns false for normal years", () => {
    expect(isLeapYear(2025)).toBe(false);
  });
  it("returns true for years divisible by four", () => {
    expect(isLeapYear(2024)).toBe(true);
  });
  it("returns false for years divisible by 100", () => {
    expect(isLeapYear(2100)).toBe(false);
  });
});
