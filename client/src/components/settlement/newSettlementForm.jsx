import React, {useMemo, useState} from 'react';

const DenominationTypes = {
    "kr1000": {
        description: "tusenlapper",
        value: 1000,
    },
    "kr500": {
        description: "femhundrelapper",
        value: 500
    }
}

function BillCountInput({settlement, setSettlement, denomination}) {
    return <div>
        <div>Antall {DenominationTypes[denomination].description}:</div>
        <input
            type="number"
            value={settlement.balance[denomination]?.count || ""}
            onChange={(e) => setSettlement(old => ({
                ...old,
                balance: {
                    ...old.balance,
                    [denomination]: { count: e.target.value }
                }
            }))}
        />
    </div>;
}

function sumBalance(balance) {
    let sum = 0;
    for (const denonimation in DenominationTypes) {
        if (balance[denonimation]?.count) {
            sum += balance[denonimation].count * DenominationTypes[denonimation].value;
        }
    }
    return sum;
}

export function NewSettlementForm() {
    const allDepartments = [
        "Auksjon", "Bilder", "Bøker", "Cafeteria", "Elektro", "Godteri", "Kjøkken", "Møbler", "Popcorn", "Sport",
    ];

    function handleChangeCount(e) {
        setSettlement(old => ({
            ...old,
            balance: {
                ...old.balance,
                ["kr1000"]: {
                    count: e.target.value
                }
            }
        }))

    }

    const [settlement, setSettlement] = useState({
        balance: {}
    })
    const sum = useMemo(() => sumBalance(settlement.balance), [settlement]);

    return <form>
        <h2>Registrere kontanter</h2>
        <div>
            <div>Avdeling:</div>
            <select onChange={e => setSettlement(old => ({
                ...old,
                department: e.target.value
            }))}>
                <option></option>
                {allDepartments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
        </div>
        <div>
            <div>Antall tusenlapper</div>
            <input type="text" value={settlement.balance["kr1000"]?.count || ""} onChange={e => handleChangeCount(e)}/>
        </div>
        <BillCountInput
            settlement={settlement}
            setSettlement={setSettlement}
            denomination={"kr500"}
        />

        <div>
            Sum: {sum}
        </div>

        <pre>
            {JSON.stringify(settlement, null, 2)}
        </pre>
    </form>;
}
