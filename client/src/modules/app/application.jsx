import React, {useMemo, useState} from "react";

function BillInput({denomination, label, balance, setBalance}) {
    return <div>
        {label}:{" "}
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

    const values = {
        ["1000kr"]: 1000,
        ["500kr"]: 500,
        ["200kr"]: 200,
        ["100kr"]: 100,
        ["50kr"]: 50,
    }

    const sum = useMemo(() => {
        let result = 0;
        for (const denomination in balance) {
            result += values[denomination] * balance[denomination];
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
                {departmentOptions.map(d => <option>{d}</option>)}
            </select>
        </div>
        <BillInput
            denomination={"1000kr"}
            label={"1000-lapper"}
            balance={balance}
            setBalance={setBalance}
        />
        <BillInput
            denomination={"500kr"}
            label={"500-lapper"}
            balance={balance}
            setBalance={setBalance}
        />
        <BillInput
            denomination={"200kr"}
            label={"200-lapper"}
            balance={balance}
            setBalance={setBalance}
        />
        <BillInput
            denomination={"100kr"}
            label={"100-lapper"}
            balance={balance}
            setBalance={setBalance}
        />
        <BillInput
            denomination={"50kr"}
            label={"50-lapper"}
            balance={balance}
            setBalance={setBalance}
        />
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