import { afterEach, describe, expect, it, vitest } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { NewSettlementForm } from "../../../src/components/settlements/newSettlementForm";
import React from "react";

afterEach(cleanup);

describe("NewSettlementForm", () => {
  it("displays form", () => {
    const app = render(<NewSettlementForm onNewSettlement={vitest.fn()} />);
    expect(app.baseElement).toMatchSnapshot();
  });
  it("creates new settlement", async () => {
    const onNewSettlement = vitest.fn();
    const app = render(<NewSettlementForm onNewSettlement={onNewSettlement} />);
    let department = "Furniture";
    fireEvent.change(await app.findByLabelText("Department:"), {
      target: { value: department },
    });
    fireEvent.change(await app.findByLabelText("100kr:")!, {
      target: { value: "4" },
    });
    const submitButtons = await app.findAllByText("Submit");
    fireEvent.click(submitButtons[0]);
    expect(onNewSettlement).toBeCalledWith({
      department,
      balance: { "100kr": 4 },
    });
  });
});
