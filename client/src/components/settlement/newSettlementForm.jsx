import React from 'react';
import {BalanceInputForm} from "./balanceInputForm";
import {sumBalance} from "./sumBalance";

export function NewSettlementForm({settlement, setSettlement}) {
    const allDepartments = [
        "Auksjon", "Bilder", "Bøker", "Cafeteria", "Elektro", "Godteri", "Kjøkken", "Møbler", "Popcorn", "Sport",
    ];
    const sum = sumBalance(settlement.balance);

    return <>
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
    </>;
}
