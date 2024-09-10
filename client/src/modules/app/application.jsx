import React, {useEffect, useState} from "react";
import {SubmitSettlementForm} from "../settlement/submitSettlementForm";
import {sumBalance} from "../settlement/money";
import {Dialog} from "../components/dialog.jsx";


export function Application() {
    const [settlements, setSettlements] = useState([]);

    function handleNewSettlement(s) {
        setSettlements(old => [...old, {...s, id: old.length}]);
        setShowsSettlementDialog(false);
    }

    function loadSettlements() {
        setSettlements([
            {id: 0, selectedDepartment: "Furniture", balance: {"10kr": 200}}
        ])
    }

    useEffect(() => {
        loadSettlements();
    }, [])

    const [showsSettlementDialog, setShowsSettlementDialog] = useState(false)

    return <>
        <h1>Settlements</h1>
        {settlements.map(s => <div key={s.id}>
            {s.selectedDepartment}: {sumBalance(s.balance)}
        </div>)}

        <Dialog visible={showsSettlementDialog} onClose={() => setShowsSettlementDialog(false)}>
            <SubmitSettlementForm onNewSettlement={handleNewSettlement}/>
            <button onClick={() => setShowsSettlementDialog(false)}>Cancel</button>
        </Dialog>
        <button onClick={() => setShowsSettlementDialog(true)}>Create new settlement</button>
    </>
}

