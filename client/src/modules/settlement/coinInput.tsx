import React, { useEffect, useState } from "react";

interface Props {
  onChangeCount(newCount: number): void;
  coinType: {
    label: string;
    key: string;
    weightGrams: number;
  };
  balance: Record<string, number>;
}

export function CoinInput({
  onChangeCount,
  coinType: { label, key, weightGrams },
  balance,
}: Props) {
  const [weight, setWeight] = useState("");
  const [count, setCount] = useState("");

  useEffect(() => onChangeCount(parseInt(count) || 0), [count]);
  useEffect(
    () => onChangeCount(Math.round(parseInt(weight) / weightGrams) || 0),
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
        value={weight || balance[key] * weightGrams || ""}
        disabled={!!count}
        onChange={(e) => setWeight(e.target.value)}
        width={10}
      />
    </p>
  );
}
