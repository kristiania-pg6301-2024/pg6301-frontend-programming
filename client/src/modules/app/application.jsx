import React, {useState} from "react";
import {SubmitSettlementForm} from "../settlement/submitSettlementForm";
import {sumBalance} from "../settlement/money";
import {Dialog} from "../components/dialog.jsx";


export function Application() {
    const [settlements, setSettlements] = useState([
            {selectedDepartment: "Furniture", balance: {"10kr": 2000}}
        ]
    );
    const [showsSettlementDialog, setShowsSettlementDialog] = useState(false)
    return <>
        <h1>Settlements</h1>
        {settlements.map(s => <div>
            {s.selectedDepartment}: {sumBalance(s.balance)}
        </div>)}

        <Dialog visible={showsSettlementDialog} onClose={() => setShowsSettlementDialog(false)}>
            <SubmitSettlementForm onNewSettlement={s => {
                setSettlements(old => [...old, s]);
                setShowsSettlementDialog(false);
            }}/>
            <button onClick={() => setShowsSettlementDialog(false)}>Cancel</button>
        </Dialog>
        <button onClick={() => setShowsSettlementDialog(true)}>Create new settlement</button>
    </>
}

