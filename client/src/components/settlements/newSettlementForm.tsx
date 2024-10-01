import React, { useState } from "react";
import { billTypes, CashBalance, coinTypes } from "./domain";
import { CoinInput } from "./coinInput";
import { BillInput } from "./billInput";

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

      {billTypes.map((c) => (
        <BillInput
          key={c.key}
          type={c}
          value={balance[c.key]}
          setValue={(v) => setBalance((old) => ({ ...old, [c.key]: v }))}
        />
      ))}
      <div className={"coins"}>
        {coinTypes.map((c) => (
          <CoinInput
            key={c.key}
            type={c}
            value={balance[c.key]}
            setValue={(v) => setBalance((old) => ({ ...old, [c.key]: v }))}
          />
        ))}
      </div>
      <button type={"submit"} disabled={!department || !hasBalance()}>
        Submit
      </button>
    </form>
  );
}
