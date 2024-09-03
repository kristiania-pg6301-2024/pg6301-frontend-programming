import React, {useMemo, useState} from "react";

const billTypes = {
    ["1000kr"]: { key: "1000kr", value: 1000, label: "1000-lapper" },
    ["500kr"]: { key: "500kr", value: 500, label: "500-lapper" },
    ["200kr"]: { key: "200kr", value: 200, label: "200-lapper" },
    ["100kr"]: { key: "100kr", value: 100, label: "100-lapper" },
    ["50kr"]: { key: "50kr", value: 50, label: "50-lapper" },
}

const coinTypes = [
    {key: "20kr", label: "20-kroning", value: 20, weightGrams: 9.9 },
    {key: "1kr", label: "Kronestykke", value: 1, weightGrams: 4.35 },
]


function BillInput({denomination, balance, setBalance}) {
    return <div>
        {billTypes[denomination].label}:{" "}
        <input
            type="number"
            value={balance[denomination]}
            onChange={e => setBalance(old => ({
                ...old,
                [denomination]: e.target.value
            }))}
        />
    </div>;
}

export function Application() {
    const [selectedDepartment, setSelectedDepartment] = useState("Furniture");

    const [balance, setBalance] = useState({});

    const sum = useMemo(() => {
        let result = 0;
        for (const denomination in balance) {
            result += billTypes[denomination].value * balance[denomination];
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
        {["1000kr", "500kr", "200kr", "100kr", "50kr"].map(d => (
            <BillInput
                key={d}
                denomination={d}
                setBalance={setBalance}
                balance={balance}
            />
        ))}
        {coinTypes.map(c => (
            <div key={c.key}>
                {c.label}:{" "}
                Count: <input
                    type="number"
                    value={balance[c.key]}
                    onChange={e => setBalance(old => ({
                        ...old,
                        [c.key]: e.target.value
                    }))}
                />
                Weight: <input
                    type="number"
                    value={balance[c.key]}
                    onChange={e => setBalance(old => ({
                        ...old,
                        [c.key]: e.target.value
                    }))}
                />
            </div>
        ))}
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