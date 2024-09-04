import React, {useEffect, useRef, useState} from "react";
import {SubmitSettlementForm} from "../settlement/submitSettlementForm";
import {sumBalance} from "../settlement/money";


export function Application() {
    const [settlements, setSettlements] = useState([
        { selectedDepartment: "Furniture", balance: { "10kr": 2000 }}

        ]
    );

    const [showsSettlementDialog, setShowsSettlementDialog] = useState(false)

    const dialogRef = useRef()

    useEffect(() => {
        if (showsSettlementDialog) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [showsSettlementDialog])
    useEffect(() => {
        dialogRef.current.addEventListener("close", () => setShowsSettlementDialog(false))
    }, [dialogRef])

    return <>
        <h1>Settlements</h1>
        {settlements.map(s => <div>
            {s.selectedDepartment}: {sumBalance(s.balance)}
        </div>)}

        <dialog ref={dialogRef}>
            <SubmitSettlementForm onNewSettlement={s => {
                setSettlements(old => [...old, s]);
                setShowsSettlementDialog(false);
            }} />
            <button onClick={() => setShowsSettlementDialog(false)}>Dismiss</button>
        </dialog>

        <button onClick={() => setShowsSettlementDialog(true)}>Create new settlement</button>
        </>
}

