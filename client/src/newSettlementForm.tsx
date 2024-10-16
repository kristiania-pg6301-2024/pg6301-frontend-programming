import React from "react";
import { BillTypeValues, CoinTypeValues } from "../../shared/sumBalance";

export function NewSettlementForm() {
  const departments = ["Møbler", "Elektronikk", "Bøker"];

  return (
    <div className={"settlement"}>
      <h1>Register new settlement</h1>
      <div>
        <label>
          Avdeling:
          <br />
          <select>
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
              {bill.label}: <input />
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
    </div>
  );
}
