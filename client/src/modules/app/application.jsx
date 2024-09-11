import React, {useState} from "react";
import {FrontPage} from "../settlement/frontPage";


export function Application() {
    const [settlements, setSettlements] = useState([
        { selectedDepartment: "Furniture", balance: { "10kr": 2000 }}

        ]
    );

    return <FrontPage
        settlements={settlements}
        onNewSettlement={s => setSettlements(old => [...old, s])}
    />;
}

