import React, {useState} from "react";
import {Link} from "react-router-dom";
import {sumBalance} from "./money.js";
import {Dialog} from "../components/dialog.jsx";
import {SubmitSettlementForm} from "./submitSettlementForm.jsx";

export function FrontPage({settlements, onNewSettlement}) {
    const [showsSettlementDialog, setShowsSettlementDialog] = useState(false)
    function handleNewSettlement(s) {
        setShowsSettlementDialog(false);
        onNewSettlement(s);
    }
    return <>
        <h1>Settlements</h1>
        {settlements.map(s => <div key={s.id}>
            <Link to={`/settlements/${s.id}`}>{s.selectedDepartment}</Link>: {sumBalance(s.balance)}
        </div>)}

        <Dialog visible={showsSettlementDialog} onClose={() => setShowsSettlementDialog(false)}>
            <SubmitSettlementForm onNewSettlement={handleNewSettlement}/>
            <button onClick={() => setShowsSettlementDialog(false)}>Cancel</button>
        </Dialog>
        <button onClick={() => setShowsSettlementDialog(true)}>Create new settlement</button>
    </>
}