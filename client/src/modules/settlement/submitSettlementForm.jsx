import React, { useMemo, useState } from "react";
import { billTypes, coinTypes, sumBalance } from "./money";
import { CoinInput } from "./coinInput";

export function SubmitSettlementForm({ onNewSettlement }) {
  const [selectedDepartment, setSelectedDepartment] = useState("Furniture");

  const [balance, setBalance] = useState({});

  const departmentOptions = ["Cafe", "Furniture", "Books", "Clothes"];

  const settlementReport = {
    selectedDepartment,
    balance,
  };

  function handleSubmit(e) {
    e.preventDefault();
    onNewSettlement(settlementReport);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register cash settlement</h1>

      <div>
        Department:
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          {departmentOptions.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>
      {billTypes.map((c) => (
        <div key={c.key}>
          {c.label}
          <input
            type="number"
            value={balance[c.key]}
            onChange={(e) =>
              setBalance((old) => ({
                ...old,
                [c.key]: e.target.value,
              }))
            }
          />
        </div>
      ))}
      {coinTypes.map((c) => (
        <CoinInput
          key={c.key}
          coinType={c}
          balance={balance}
          onChangeCount={(newCount) =>
            setBalance((old) => ({
              ...balance,
              [c.key]: newCount,
            }))
          }
        />
      ))}
      <div>Sum: {sumBalance(balance)} kr</div>
      <div>
        <button>Submit</button>
      </div>
      <div>
        <pre>{JSON.stringify(settlementReport)}</pre>
      </div>
    </form>
  );
}
