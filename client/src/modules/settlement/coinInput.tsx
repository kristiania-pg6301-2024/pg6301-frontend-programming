import React, { useEffect, useState } from "react";
import { Balance, CoinType } from "./money";

interface Props {
  onChangeCount(count: number): void;
  coinType: CoinType;
  balance: Balance;
}

export function CoinInput({
  onChangeCount,
  coinType: { label, key, gramsPerCoin },
  balance,
}: Props) {
  const [weight, setWeight] = useState("");
  const [count, setCount] = useState("");

  useEffect(() => onChangeCount(parseInt(count || "0")), [count]);
  useEffect(
    () =>
      onChangeCount(Math.round(parseInt(weight || "0") / gramsPerCoin) || 0),
    [weight],
  );

  return (
    <p>
      {label}
      <br />
      Count of mynter:{" "}
      <input
        type="number"
        value={count || balance[key] || ""}
        disabled={!!weight}
        onChange={(e) => setCount(e.target.value)}
      />
      <br />
      Weight:{" "}
      <input
        type="number"
        value={weight || (balance[key] || 0) * gramsPerCoin || ""}
        disabled={!!count}
        onChange={(e) => setWeight(e.target.value)}
        width={10}
      />
    </p>
  );
}
