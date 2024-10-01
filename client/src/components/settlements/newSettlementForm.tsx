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
      <div className={"coins"}>
        {coinTypes.map(({ key, gramsPerCoin }) => (
          <div key={key} className={`denomination${key}`}>
            <label>
              {key}:
              <input
                type={"number"}
                className={"count"}
                disabled={balance[key] && "grams" in balance[key]}
                value={
                  !balance[key]
                    ? ""
                    : "count" in balance[key]
                      ? balance[key].count
                      : Math.round(balance[key].grams / gramsPerCoin)
                }
                onChange={(e) =>
                  setBalance((old) => ({
                    ...old,
                    [key]: { count: parseInt(e.target.value) },
                  }))
                }
              />
              <input
                type={"number"}
                className={"grams"}
                disabled={balance[key] && "count" in balance[key]}
                value={
                  !balance[key]
                    ? ""
                    : "grams" in balance[key]
                      ? balance[key].grams
                      : balance[key].count * gramsPerCoin
                }
                onChange={(e) =>
                  setBalance((old) => ({
                    ...old,
                    [key]: { grams: parseFloat(e.target.value) },
                  }))
                }
              />
            </label>
          </div>
        ))}
      </div>
      <button type={"submit"} disabled={!department || !hasBalance()}>
        Submit
      </button>
    </form>
  );
}
