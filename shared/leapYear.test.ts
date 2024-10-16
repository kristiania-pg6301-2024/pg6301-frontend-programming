import { expect, test } from "vitest";
import { isLeapYear } from "./isLeapYear";

test("should detect normal leap years", () => {
  expect(isLeapYear(2024)).toBe(true);
});

test("should detect non-leap years", () => {
  expect(isLeapYear(2025)).toBe(false);
});

test("that most years divisible by 100 are not leap years", () => {
  expect(isLeapYear(2100)).toBe(false);
});

test("that years divisible by 400 are leap years", () => {
  expect(isLeapYear(2000)).toBe(true);
});
