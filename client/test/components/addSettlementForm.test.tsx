import React from "react";

import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { AddSettlementForm } from "../../src/components/settlements/addSettlementForm";

test("settlement form", () => {
  const app = render(<AddSettlementForm />);
  expect(app.baseElement).toMatchSnapshot();
});
