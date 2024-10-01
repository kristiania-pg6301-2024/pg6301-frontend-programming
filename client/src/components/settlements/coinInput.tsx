import { CashBalance, CoinType } from "../../../../src/cashBalance";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  type: CoinType;
  balance: CashBalance;
  setBalance: Dispatch<SetStateAction<CashBalance>>;
}

export function CoinInput({
  type: { key, gramsPerCoin },
  balance,
  setBalance,
}: Props) {
  function setBalanceForCoin(value: { count: number } | { grams: number }) {
    setBalance((old) => ({ ...old, [key]: value }));
  }
  return (
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
            setBalanceForCoin({ count: parseInt(e.target.value) })
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
            setBalanceForCoin({ grams: parseFloat(e.target.value) })
          }
        />
      </label>
    </div>
  );
}
