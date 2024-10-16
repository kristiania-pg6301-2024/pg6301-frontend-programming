import React from "react";
import { expect, test } from "vitest";
import { NewSettlementForm } from "../src/newSettlementForm";
import { render } from "@testing-library/react";

test("that it hasn't changes", () => {
  const component = render(<NewSettlementForm />);
  expect(
    [...component.baseElement.querySelectorAll(".settlement .money label")].map(
      (l) => l.textContent,
    ),
  ).toEqual([
    "Tusenlapper: ",
    "500kr: ",
    "200kr: ",
    "100kr: ",
    "50kr: ",
    "20kr: ",
    "10kr: ",
    "5kr: ",
    "1kr: ",
  ]);
  expect(component.baseElement).toMatchSnapshot();
});
