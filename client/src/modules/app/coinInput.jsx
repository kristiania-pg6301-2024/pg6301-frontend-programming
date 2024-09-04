import React, {useEffect, useState} from "react";

export function CoinInput({onChangeCount, coinType: {label, key, weightGrams}, balance}) {

    const [weight, setWeight] = useState("")
    const [count, setCount] = useState(balance[key]?.toString());

    useEffect(() => {
        setWeight((count * weightGrams).toString());
        onChangeCount(count || 0);
    }, [])

    useEffect(() => {
        const count = Math.round(weight / weightGrams);
        setCount(count);
        onChangeCount(count || 0)
    }, [weight])

    return <p>
        {label}<br/>
        Count of mynter: <input
        type="number"
        value={count}
        onChange={e => setCount(e.target.value)}
    /><br/>
        Weight: <input
        type="number"
        value={weight}
        onChange={e => setWeight(e.target.value)}
        width={10}
    />
    </p>;
}