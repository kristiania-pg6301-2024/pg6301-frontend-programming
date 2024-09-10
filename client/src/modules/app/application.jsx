import React, {useEffect, useState} from "react";
import {FrontPage} from "../settlement/frontPage.jsx";


export function Application() {
    const [settlements, setSettlements] = useState([]);

    async function handleNewSettlement(s) {
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

    return <FrontPage settlements={settlements} onNewSettlement={handleNewSettlement} />
}

