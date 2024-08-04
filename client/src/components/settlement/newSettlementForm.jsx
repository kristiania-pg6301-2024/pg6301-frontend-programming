import React, {useMemo, useState} from 'react';

const BillDenominationTypes = {
    "kr1000": {
        description: "tusenlapper",
        value: 1000,
    },
    "kr500": {
        description: "femhundrelapper",
        value: 500
    },
    "kr200": {
        description: "tohundrelapper",
        value: 200
    },
    "kr100": {
        description: "hundrelapper",
        value: 100
    },
    "kr50": {
        description: "femtilapper",
        value: 50
    },
}

function BillCountInput({settlement, setSettlement, denomination}) {
    return <div>
        <div>Antall {BillDenominationTypes[denomination].description}:</div>
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
    for (const denonimation in BillDenominationTypes) {
        if (balance[denonimation]?.count) {
            sum += balance[denonimation].count * BillDenominationTypes[denonimation].value;
        }
    }
    return sum;
}

export function NewSettlementForm() {
    const allDepartments = [
        "Auksjon", "Bilder", "Bøker", "Cafeteria", "Elektro", "Godteri", "Kjøkken", "Møbler", "Popcorn", "Sport",
    ];

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
        {Object.keys(BillDenominationTypes).map(d =>
            <BillCountInput
                key={d}
                settlement={settlement}
                setSettlement={setSettlement}
                denomination={d}
            />
        )}
        <div>
            Sum: {sum}
        </div>

        <pre>
            {JSON.stringify(settlement, null, 2)}
        </pre>
    </form>;
}
