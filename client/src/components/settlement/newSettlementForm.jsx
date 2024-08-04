import React, {useState} from 'react';

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
        gramsPerCoin: 9.9
    },
    "kr10": {
        description: "tikroninger",
        value: 10,
        gramsPerCoin: 6.8
    },
    "kr5": {
        description: "femkroninger",
        value: 5,
        gramsPerCoin: 7.85
    },
    "kr1": {
        description: "kronestykker",
        value: 1,
        gramsPerCoin: 4.35
    },
};

function BillCountInput({balance, setBalance, denomination}) {
    return <div>
        <div>Antall {BillDenominationTypes[denomination].description}:</div>
        <input
            type="number"
            value={balance[denomination]?.count || ""}
            onChange={e => setBalance(denomination, {count: e.target.value})}
        />
    </div>;
}

function CoinCountInput({balance, setBalance, denomination}) {
    const {count, weight} = balance[denomination] || {};
    const coinType = CoinDenominationTypes[denomination];
    return <div>
        <div>{coinType.description}:</div>
        <div>
            Antall:
            <input
                type="number"
                disabled={weight}
                value={count || Math.round(weight/coinType.gramsPerCoin) || ""}
                onChange={(e) => setBalance(denomination, {count: e.target.value})}
            />
            {" "}
            Vekt:
            <input
                type="number"
                disabled={count}
                value={weight || count*coinType.gramsPerCoin || ""}
                onChange={(e) => setBalance(denomination, {weight: e.target.value})}
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
            sum += Math.round(balance[denonimation].weight/type.gramsPerCoin) * type.value;
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
    function setBalance(denomination, value) {
        setSettlement(old => ({
            ...old,
            balance: {
                ...old.balance,
                [denomination]: value
            }
        }));
    }

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
                balance={settlement.balance}
                setBalance={setBalance}
                denomination={d}
            />
        )}
        {Object.keys(CoinDenominationTypes).map(d =>
            <CoinCountInput key={d}
                balance={settlement.balance}
                setBalance={setBalance}
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
