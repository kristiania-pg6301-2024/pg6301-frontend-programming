import React from "react";
import { expect, test } from "vitest";
import { NewSettlementForm } from "../src/newSettlementForm";
import { render } from "@testing-library/react";

test("that it hasn't changes", () => {
  const component = render(<NewSettlementForm />);
  expect(component.baseElement).toMatchSnapshot();
});
