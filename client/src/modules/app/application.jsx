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


    return <FrontPage
        settlements={settlements}
        onNewSettlement={s => setSettlements(old => [...old, s])}
    />;
}

