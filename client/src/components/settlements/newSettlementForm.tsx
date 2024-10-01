import React from "react";
import { billTypes, CashBalance, coinTypes } from "../../../../src/cashBalance";

const departments = ["Furniture", "Books"];

export interface Settlement {
  department: string;
  balance: CashBalance;
}

interface Props {
  onNewSettlement(settlement: Settlement): void;
}

export function NewSettlementForm({ onNewSettlement }: Props) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onNewSettlement({
      department: "Furniture",
      balance: {
        "100kr": 4,
      },
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>New Settlement</h1>

      <div>
        <label htmlFor={"newSettlementDepartment"}>Department: </label>
        <select id={"newSettlementDepartment"}>
          <option></option>
          {departments.map((department) => (
            <option key={department}>{department}</option>
          ))}
        </select>
      </div>

      {billTypes.map(({ key }) => (
        <div key={key}>
          <label htmlFor={`newSettlementBalance_${key}`}>{key}:</label>
          <input id={`newSettlementBalance_${key}`} type={"number"} />
        </div>
      ))}
      {coinTypes.map(({ key }) => (
        <div key={key}>
          <label htmlFor={`newSettlementBalance_${key}`}>{key}:</label>
          <input id={`newSettlementBalance_${key}`} type={"number"} />
        </div>
      ))}
      <button type={"submit"}>Submit</button>
    </form>
  );
}
