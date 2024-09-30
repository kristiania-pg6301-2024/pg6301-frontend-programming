import { describe, expect, it } from "vitest";

describe("leap years", () => {
  it("returns false for normal years", () => {
    expect(isLeapYear(2025)).toBe(false);
  })
})