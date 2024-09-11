import React, {useEffect, useState} from "react";
import {FrontPage} from "../settlement/frontPage";
import {Route, Routes} from "react-router-dom";
import {SettlementDetails} from "../settlement/settlementDetails";


export function Application() {
    const [settlements, setSettlements] = useState([]);

    function loadSettlement() {
        fetch("/api/settlements")
            .then(res => res.json())
            .then(settlements => setSettlements(settlements));
    }

    useEffect(() => {
        console.log("hei", settlements);
    }, [settlements])

    useEffect(() => {
        loadSettlement();
    }, [])


    function handleNewSettlement(s) {
        fetch("/api/settlements", {
            method: "POST",
            body: JSON.stringify(s),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => loadSettlement());
    }

    return <Routes>
        <Route path={"/"} element={<FrontPage settlements={settlements} onNewSettlement={handleNewSettlement} /> } />
        <Route path={"/settlements/:id"} element={<SettlementDetails settlements={settlements} />} />
        <Route path={"*"} element={<h1>Siden finnes ikke</h1>} />
    </Routes>;
}

