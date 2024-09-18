import React, { useEffect, useState } from "react";

export function CoinInput({
  onChangeCount,
  coinType: { label, key, weightGrams },
  balance,
}) {
  const [weight, setWeight] = useState();
  const [count, setCount] = useState("");

  useEffect(() => onChangeCount(count || 0), [count]);
  useEffect(
    () => onChangeCount(Math.round(weight / weightGrams) || 0),
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
        value={weight || parseInt(balance[key]) * weightGrams || ""}
        disabled={!!count}
        onChange={(e) => setWeight(e.target.value)}
        width={10}
      />
    </p>
  );
}
