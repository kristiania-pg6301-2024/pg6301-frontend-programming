import {useParams} from "react-router-dom";
import React from "react";

export function SettlementDetails({settlements}) {
    const {id} = useParams();
    const settlement = settlements.find(s => s.id == id);
    return <>
        <h1>Du ser nå på settlement {id}: {settlement?.selectedDepartment}</h1>
        <pre>{JSON.stringify(settlement.balance, null, 2)}</pre>
    </>;
}
