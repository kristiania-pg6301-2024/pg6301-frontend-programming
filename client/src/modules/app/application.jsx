import React, {useEffect, useState} from "react";
import {SubmitSettlementForm} from "../settlement/submitSettlementForm";
import {sumBalance} from "../settlement/money";
import {Dialog} from "../components/dialog.jsx";
import {Link} from "react-router-dom";


export function Application() {
    const [settlements, setSettlements] = useState([]);

    async function handleNewSettlement(s) {
        //setSettlements(old => [...old, {...s, id: old.length}]);
        setShowsSettlementDialog(false);
        await fetch("/api/settlements", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(s)
        })
        await loadSettlements();
    }

    async function loadSettlements() {
        const res = await fetch("/api/settlements");
        if (res.ok) {
            setSettlements(await res.json());
        }
    }

    useEffect(() => {
        loadSettlements();
    }, [])

    const [showsSettlementDialog, setShowsSettlementDialog] = useState(false)

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

