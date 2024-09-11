import React, {useEffect, useState} from "react";
import {FrontPage} from "../settlement/frontPage";


export function Application() {
    const [settlements, setSettlements] = useState([]);

    function loadSettlement() {
        fetch("/api/settlements")
            .then(res => res.json())
            .then(settlements => setSettlements(settlements));
    }

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

    return <FrontPage
        settlements={settlements}
        onNewSettlement={handleNewSettlement}
    />;
}

