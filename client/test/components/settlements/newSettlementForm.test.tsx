import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { NewSettlementForm } from "../../../src/components/settlements/newSettlementForm";
import React from "react";

describe("NewSettlementForm", () => {
  it("displays form", () => {
    const app = render(<NewSettlementForm />);
    expect(app.baseElement).toMatchSnapshot();
  });
});
