import { expect, test } from "vitest";

test("that submitted settlements are listed", () => {
  const newSettlement = {
    department: "test dep",
    balance: { "1000kr": 1000 },
  };
  const allSettlements: object[] = [];

  // this is what I want the router to do:
  allSettlements.push({ ...newSettlement });

  expect(allSettlements).toContainEqual(newSettlement);
});
