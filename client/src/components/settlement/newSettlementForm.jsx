import React, {useMemo, useState} from 'react';

const DenominationTypes = {
    "kr500": {
        description: "femhundrelapper",
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
    const sum = useMemo(() => (
        (settlement.balance["kr1000"]?.count || 0) * 1000
        + (settlement.balance["kr500"]?.count || 0) * 500
    ), [settlement]);

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
