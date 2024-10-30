import React, { FormEvent, useState } from "react";
import {
  BillTypeValues,
  CashSettlement,
  CoinTypeValues,
  sumBalance,
} from "../../shared/sumBalance";

export interface Settlement {
  department: string;
  balance: CashSettlement;
}

interface Props {
  onNewSettlement(settlement: Settlement): void;
}

export function NewSettlementForm({ onNewSettlement }: Props) {
  const departments = ["Møbler", "Elektronikk", "Bøker"];

  const [department, setDepartment] = useState("");
  const [balance, setBalance] = useState<CashSettlement>({});

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onNewSettlement({ department, balance });
  }

  return (
    <form className={"settlement"} onSubmit={handleSubmit}>
      <h1>Register new settlement</h1>
      <div>
        <label>
          Avdeling:
          <br />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departments.map((department) => (
              <option key={department}>{department}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="money">
        {BillTypeValues.map((bill) => (
          <div>
            <label>
              {bill.label}:{" "}
              <input
                value={balance[bill.key] || ""}
                onChange={(e) =>
                  setBalance((old) => ({
                    ...old,
                    [bill.key]: parseInt(e.target.value),
                  }))
                }
              />
            </label>
          </div>
        ))}
        {CoinTypeValues.map((coin) => (
          <div>
            <label>
              {coin.label}: <input />
            </label>
          </div>
        ))}
      </div>
      <div>
        <button disabled={sumBalance(balance) === 0}>Submit</button>
      </div>
    </form>
  );
}
