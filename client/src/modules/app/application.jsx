import React, {useEffect, useState} from "react";
import {FrontPage} from "../settlement/frontPage.jsx";
import {Route, Routes} from "react-router-dom";


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

    return <Routes>
        <Route path={"/"} element={<FrontPage settlements={settlements} onNewSettlement={handleNewSettlement}/>}/>
        <Route path={"*"} element={<h1>Not found</h1>}/>
    </Routes>;
}

