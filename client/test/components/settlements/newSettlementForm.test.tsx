import { afterEach, describe, expect, it, vitest } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { NewSettlementForm } from "../../../src/components/settlements/newSettlementForm";
import React from "react";

afterEach(cleanup);

function fireChange(element: HTMLElement, value: string) {
  fireEvent.change(element, { target: { value: value } });
}

describe("NewSettlementForm", () => {
  it("displays form", () => {
    const app = render(<NewSettlementForm onNewSettlement={vitest.fn()} />);
    expect(app.baseElement).toMatchSnapshot();
  });
  it("creates new settlement", async () => {
    const onNewSettlement = vitest.fn();
    const app = render(<NewSettlementForm onNewSettlement={onNewSettlement} />);
    const department = "Furniture";
    fireChange(await app.findByLabelText("Department:"), department);
    fireChange(await app.findByLabelText("100kr:"), "4");
    fireEvent.click(await app.findByText("Submit"));
    expect(onNewSettlement).toBeCalledWith({
      department,
      balance: { "100kr": 4 },
    });
  });
  it("prevents submitting form without department", async () => {
    const onNewSettlement = vitest.fn();
    const app = render(<NewSettlementForm onNewSettlement={onNewSettlement} />);
    fireChange(await app.findByLabelText("Department:"), "");
    const submitButton = await app.findByText("Submit");
    expect(submitButton.getAttribute("disabled")).toBeDefined();
    fireEvent.click(submitButton);
    expect(onNewSettlement).not.toBeCalled();
  });
});
