import React, {useState} from "react";
import {sumBalance} from "./money";
import {Dialog} from "../components/dialog";
import {SubmitSettlementForm} from "./submitSettlementForm";

export function FrontPage({settlements, onNewSettlement}) {
    const [showsSettlementDialog, setShowsSettlementDialog] = useState(false)

    function handleNewSettlement(s) {
        onNewSettlement(s);
        setShowsSettlementDialog(false);
    }

    return <>
        <h1>Settlements</h1>
        {settlements.map(s => <div>
            {s.selectedDepartment}: {sumBalance(s.balance)}
        </div>)}

        <Dialog visible={showsSettlementDialog} onClose={() => setShowsSettlementDialog(false)}>
            <SubmitSettlementForm onNewSettlement={handleNewSettlement}/>
            <button onClick={() => setShowsSettlementDialog(false)}>Dismiss</button>
        </Dialog>

        <button onClick={() => setShowsSettlementDialog(true)}>Create new settlement</button>
    </>
}