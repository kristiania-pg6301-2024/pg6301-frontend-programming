import React, { useState } from "react";
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
  const [department, setDepartment] = useState("");
  const [balance, setBalance] = useState<CashBalance>({});
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onNewSettlement({ department, balance });
  }

  function hasBalance() {
    return Object.values(balance).some((b) => !!b);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Settlement</h1>

      <div>
        <label htmlFor={"newSettlementDepartment"}>Department: </label>
        <select
          id={"newSettlementDepartment"}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option></option>
          {departments.map((department) => (
            <option key={department}>{department}</option>
          ))}
        </select>
      </div>

      {billTypes.map(({ key }) => (
        <div key={key}>
          <label htmlFor={`newSettlementBalance_${key}`}>{key}:</label>
          <input
            id={`newSettlementBalance_${key}`}
            type={"number"}
            value={balance[key] || "0"}
            onChange={(e) =>
              setBalance((old) => ({ ...old, [key]: parseInt(e.target.value) }))
            }
          />
        </div>
      ))}
      {coinTypes.map(({ key }) => (
        <div key={key}>
          <label htmlFor={`newSettlementBalance_${key}`}>{key}:</label>
          <input id={`newSettlementBalance_${key}`} type={"number"} />
        </div>
      ))}
      <button type={"submit"} disabled={!department || !hasBalance()}>
        Submit
      </button>
    </form>
  );
}
