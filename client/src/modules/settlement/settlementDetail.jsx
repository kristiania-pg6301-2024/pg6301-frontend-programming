import {useParams} from "react-router-dom";
import React from "react";
import {billTypes, coinTypes} from "./money.js";

export function SettlementDetail({settlements}) {
    const {id} = useParams()
    const settlement = settlements.find(s => s.id == id);
    if (!settlement) {
        return <h1>Not found</h1>
    }
    return <>
        <h1>Settlement details for {id}: {settlement.selectedDepartment}</h1>
        <h2>Bills</h2>
        {billTypes.map(({key, label}) => settlement.balance[key] && <div key={key}>{label}: {settlement.balance[key]}</div>)}
        {coinTypes.map(({key, label}) => settlement.balance[key] ? <div key={key}>{label}: {settlement.balance[key]}</div> : null)}
    </>;
}