import { BillType } from "./domain";
import React from "react";

interface Props {
  type: BillType;
  value?: number | undefined;
  setValue: (v: number) => void;
}

export function BillInput({ type: { key }, value, setValue }: Props) {
  return (
    <div key={key}>
      <label htmlFor={`newSettlementBalance_${key}`}>{key}:</label>
      <input
        id={`newSettlementBalance_${key}`}
        type={"number"}
        value={value || "0"}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
    </div>
  );
}
