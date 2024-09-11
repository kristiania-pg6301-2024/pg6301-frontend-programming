import React, {useState} from "react";
import {sumBalance} from "./money";
import {Dialog} from "../components/dialog";
import {SubmitSettlementForm} from "./submitSettlementForm";
import {Link} from "react-router-dom";

export function FrontPage({settlements, onNewSettlement}) {
    const [showsSettlementDialog, setShowsSettlementDialog] = useState(false)

    function handleNewSettlement(s) {
        onNewSettlement(s);
        setShowsSettlementDialog(false);
    }

    return <>
        <h1>Settlements</h1>
        {settlements.map(s => <div>
            <Link to={`/settlements/${s.id}`}>{s.selectedDepartment}</Link>: {sumBalance(s.balance)}
        </div>)}

        <Dialog visible={showsSettlementDialog} onClose={() => setShowsSettlementDialog(false)}>
            <SubmitSettlementForm onNewSettlement={handleNewSettlement}/>
            <button onClick={() => setShowsSettlementDialog(false)}>Dismiss</button>
        </Dialog>

        <button onClick={() => setShowsSettlementDialog(true)}>Create new settlement</button>
    </>
}