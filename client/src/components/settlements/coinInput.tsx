import { CoinAmount, CoinType } from "../../../../src/cashBalance";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  type: CoinType;
  value?: CoinAmount;
  setValue: Dispatch<SetStateAction<CoinAmount>>;
}

export function CoinInput({
  type: { key, gramsPerCoin },
  value,
  setValue,
}: Props) {
  return (
    <div key={key} className={`denomination${key}`}>
      <label>
        {key}:
        <input
          type={"number"}
          className={"count"}
          disabled={value && "grams" in value}
          value={
            !value
              ? ""
              : "count" in value
                ? value.count
                : Math.round(value.grams / gramsPerCoin)
          }
          onChange={(e) => setValue({ count: parseInt(e.target.value) })}
        />
        <input
          type={"number"}
          className={"grams"}
          disabled={value && "count" in value}
          value={
            !value
              ? ""
              : "grams" in value
                ? value.grams
                : value.count * gramsPerCoin
          }
          onChange={(e) => setValue({ grams: parseFloat(e.target.value) })}
        />
      </label>
    </div>
  );
}
