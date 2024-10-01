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
  it("prevents submission without department", async () => {
    const onNewSettlement = vitest.fn();
    const app = render(<NewSettlementForm onNewSettlement={onNewSettlement} />);
    fireChange(await app.findByLabelText("Department:"), "");
    fireChange(await app.findByLabelText("100kr:"), "4");
    const submitButton = await app.findByText("Submit");
    expect(submitButton.getAttribute("disabled")).toBe("");
    fireEvent.click(submitButton);
    expect(onNewSettlement).not.toBeCalled();
  });
  it("prevents submission without balance", async () => {
    const onNewSettlement = vitest.fn();
    const app = render(<NewSettlementForm onNewSettlement={onNewSettlement} />);
    fireChange(await app.findByLabelText("Department:"), "Furniture");
    const submitButton = await app.findByText("Submit");
    expect(submitButton.getAttribute("disabled")).toBe("");
    fireEvent.click(submitButton);
    expect(onNewSettlement).not.toBeCalled();
  });
  it("shows weight when entering coin count", async () => {
    const app = render(<NewSettlementForm onNewSettlement={vitest.fn()} />);
    const gramsInput = app.baseElement.querySelector(
      ".coins .denomination5kr .grams",
    )! as HTMLInputElement;
    const countInput = app.baseElement.querySelector(
      ".coins .denomination5kr .count",
    ) as HTMLInputElement;
    fireChange(countInput, "10");
    expect(countInput.value).toBe("10");
    expect(gramsInput.value).toBe("78.5");
    expect(gramsInput.disabled).toBe(true);
  });
  it("shows count when entering coin weight", async () => {
    const app = render(<NewSettlementForm onNewSettlement={vitest.fn()} />);
    const gramsInput = app.baseElement.querySelector(
      ".coins .denomination1kr .grams",
    )! as HTMLInputElement;
    const countInput = app.baseElement.querySelector(
      ".coins .denomination1kr .count",
    ) as HTMLInputElement;
    fireChange(gramsInput, "44");
    expect(gramsInput.value).toBe("44");
    expect(countInput.value).toBe("10");
    expect(countInput.disabled).toBe(true);
  });
  it("submits coins by count and weight", async () => {
    const onNewSettlement = vitest.fn();
    const app = render(<NewSettlementForm onNewSettlement={onNewSettlement} />);
    const department = "Furniture";
    fireChange(await app.findByLabelText("Department:"), department);
    fireChange(
      app.baseElement.querySelector(".coins .denomination1kr .grams")!,
      "44.2",
    );
    fireChange(
      app.baseElement.querySelector(".coins .denomination5kr .count")!,
      "15",
    );
    fireEvent.click(await app.findByText("Submit"));
    expect(onNewSettlement).toBeCalledWith({
      department,
      balance: { "1kr": { grams: 44.2 }, "5kr": { count: 15 } },
    });
  });
});
