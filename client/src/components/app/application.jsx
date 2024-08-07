import {NewSettlementAction} from "../settlement/newSettlementAction";
import {useState} from "react";
import {sumBalance} from "../settlement/sumBalance";

export function Application() {
    const [settlements, setSettlements] = useState([])

    return <>
        <h1>Kontantregnskap</h1>
        <NewSettlementAction
            onNewSettlement={settlement => setSettlements(old => [...old, settlement])}
        />
        {settlements.map((s) => (<div>settlement: kr {sumBalance(s.balance)}</div>))}
    </>;
}

