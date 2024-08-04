import React from "react";

export function CoinInput({value, setValue, coinType}) {
    const {count, weight} = value;
    const {description, gramsPerCoin } = coinType;
    return <div>
        <div>{description}:</div>
        <div>
            Antall:
            <input
                type="number"
                disabled={weight}
                value={count || Math.round(weight / gramsPerCoin) || ""}
                onChange={(e) => setValue({count: e.target.value})}
            />
            {" "}
            Vekt:
            <input
                type="number"
                disabled={count}
                value={weight || count * gramsPerCoin || ""}
                onChange={(e) => setValue({weight: e.target.value})}
            />
            g
        </div>
    </div>;
}