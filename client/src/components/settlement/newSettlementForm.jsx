import React, {useState} from 'react';
import {BillDenominationTypes, CoinDenominationTypes} from "./domain";
import {BalanceInputForm} from "./balanceInputForm";

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
            sum += Math.round(balance[denonimation].weight / type.gramsPerCoin) * type.value;
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
        <BalanceInputForm
            balance={settlement.balance}
            setBalance={fn => setSettlement(old => ({
                ...old,
                balance: fn(old.balance)
            }))}
        />
        <div>
            <strong>Sum: {sum}</strong>
        </div>

        <pre>
            {JSON.stringify(settlement, null, 2)}
        </pre>
    </form>;
}
