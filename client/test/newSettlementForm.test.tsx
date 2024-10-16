import React from "react";
import { afterEach, expect, test, vitest } from "vitest";
import { NewSettlementForm } from "../src/newSettlementForm";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

test("that it hasn't changes", () => {
  const component = render(<NewSettlementForm onNewSettlement={vitest.fn()} />);
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

test("that we can submit new settlement", async () => {
  const handleNewSettlement = vitest.fn();
  const component = render(
    <NewSettlementForm onNewSettlement={handleNewSettlement} />,
  );

  const department = "Elektronikk";
  fireEvent.change(component.baseElement.querySelector("select")!, {
    target: { value: department },
  });
  fireEvent.change(await component.findByLabelText("500kr:"), {
    target: { value: "5" },
  });
  fireEvent.submit(await component.findByText("Submit"));

  expect(handleNewSettlement).toHaveBeenCalledWith({
    department,
    balance: { "500kr": 5 },
  });
});
