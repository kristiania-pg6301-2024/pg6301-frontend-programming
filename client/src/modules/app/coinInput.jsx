import React, {useEffect, useState} from "react";

export function CoinInput({onChangeCount, coinType: {label, key, gramsPerCoin}, balance}) {

    const [weight, setWeight] = useState("")
    const [count, setCount] = useState("");

    useEffect(() => onChangeCount(count || 0), [count])
    useEffect(() => onChangeCount(Math.round(weight / gramsPerCoin) || 0), [weight])

    return <p>
        {label}<br/>
        Count of mynter: <input
        type="number"
        value={count || balance[key] || ""}
        onChange={e => setCount(e.target.value)}
        disabled={!!weight}
    /><br/>
        Weight: <input
        type="number"
        value={weight || balance[key] * gramsPerCoin || ""}
        onChange={e => setWeight(e.target.value)}
        width={10}
        disabled={!!count}
    />
    </p>;
}