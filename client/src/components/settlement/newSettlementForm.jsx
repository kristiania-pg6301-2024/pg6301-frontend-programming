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
};

const CoinDenominationTypes = {
    "kr20": {
        description: "20-kroninger",
        value: 20,
        unitWeight: 9.9
    },
    "kr10": {
        description: "tikroninger",
        value: 10,
        unitWeight: 6.8
    },
    "kr5": {
        description: "femkroninger",
        value: 5,
        unitWeight: 7.85
    },
    "kr1": {
        description: "kronestykker",
        value: 1,
        unitWeight: 4.35
    },
};

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

function CoinCountInput({settlement, setSettlement, denomination}) {
    const count = settlement.balance[denomination]?.count;
    const weight = settlement.balance[denomination]?.weight;
    const coinType = CoinDenominationTypes[denomination];
    return <div>
        <div>{coinType.description}:</div>
        <div>
            Antall:
            <input
                type="number"
                disabled={weight}
                value={count || Math.round(weight/coinType.unitWeight) || ""}
                onChange={(e) => setSettlement(old => ({
                    ...old,
                    balance: {
                        ...old.balance,
                        [denomination]: {count: e.target.value}
                    }
                }))}
            />
            {" "}
            Vekt:
            <input
                type="number"
                disabled={count}
                value={weight || count*coinType.unitWeight || ""}
                onChange={(e) => setSettlement(old => ({
                    ...old,
                    balance: {
                        ...old.balance,
                        [denomination]: {weight: e.target.value}
                    }
                }))}
            />
            g
        </div>
    </div>;
}

function sumBalance(balance) {
    let sum = 0;
    for (const denonimation in BillDenominationTypes) {
        if (balance[denonimation]?.count) {
            sum += balance[denonimation].count * BillDenominationTypes[denonimation].value;
        }
    }
    for (const denonimation in CoinDenominationTypes) {
        const type = CoinDenominationTypes[denonimation];
        if (balance[denonimation]?.count) {
            sum += balance[denonimation].count * type.value;
        } else if (balance[denonimation]?.weight) {
            sum += Math.round(balance[denonimation].weight/type.unitWeight) * type.value;
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
    const sum = sumBalance(settlement.balance);

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
        {Object.keys(CoinDenominationTypes).map(d =>
            <CoinCountInput
                key={d}
                settlement={settlement}
                setSettlement={setSettlement}
                denomination={d}
            />
        )}
        <div>
            <strong>Sum: {sum}</strong>
        </div>

        <pre>
            {JSON.stringify(settlement, null, 2)}
        </pre>
    </form>;
}
