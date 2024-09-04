import React, {useMemo, useState} from "react";

const billTypes = [
    { key: "1000kr", value: 1000, label: "1000-lapper" },
    { key: "500kr", value: 500, label: "500-lapper" },
    { key: "200kr", value: 200, label: "200-lapper" },
    { key: "100kr", value: 100, label: "100-lapper" },
    { key: "50kr", value: 50, label: "50-lapper" },
]

const coinTypes = [
    { key: "20kr", value: 20, label: "20-kroning", weightGrams: 9.9 },
    { key: "10kr", value: 10, label: "10-kroning", weightGrams: 6.8 },
    { key: "5kr", value: 5, label: "5-kroning", weightGrams: 7.85 },
    { key: "1kr", value: 1, label: "kronestykker", weightGrams: 4.35 },
];


export function Application() {
    const [selectedDepartment, setSelectedDepartment] = useState("Furniture");

    const [balance, setBalance] = useState({
        "5kr": 10
    });

    const sum = useMemo(() => {
        let result = 0;
        for (const denomination of billTypes) {
            if (denomination.key in balance) {
                result += denomination.value * balance[denomination.key];
            }
        }
        for (const denomination of coinTypes) {
            if (denomination.key in balance) {
                result += denomination.value * balance[denomination.key];
            }
        }
        return result;
    }, [balance])

    const departmentOptions = [
        "Cafe",
        "Furniture",
        "Books",
        "Clothes",
    ];

    const settlementReport = {
        selectedDepartment,
        balance
    };
    return <form>
        <h1>Register cash settlement</h1>

        <div>
            Department:
            <select value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)}>
                {departmentOptions.map(d => <option key={d}>{d}</option>)}
            </select>
        </div>
        {billTypes.map(c => <div key={c.key}>
            {c.label}
            <input
                type="number"
                value={balance[c.key]}
                onChange={e => setBalance(old => ({
                    ...old,
                    [c.key]: e.target.value
                }))}
            />
        </div>)}
        {coinTypes.map(c => <div key={c.key}>
            {c.label}
            <input
                type="number"
                value={balance[c.key]}
                onChange={e => setBalance(old => ({
                    ...old,
                    [c.key]: e.target.value
                }))}
            />
        </div>)}
        <div>
            Sum: {sum} kr
        </div>
        <div>
            <button>Submit</button>
        </div>
        <div>
            <pre>{JSON.stringify(settlementReport)}</pre>
        </div>
    </form>
}