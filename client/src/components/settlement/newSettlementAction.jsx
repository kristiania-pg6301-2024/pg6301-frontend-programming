import {useState} from "react";
import {Dialog} from "../elements/dialog";
import {NewSettlementForm} from "./newSettlementForm";

export function NewSettlementAction({onNewSettlement}) {
    const [show, setShow] = useState(false);
    const [settlement, setSettlement] = useState({
        balance: {}
    })

    function handleSubmit(e) {
        e.preventDefault();
        setShow(false);
        onNewSettlement(settlement);
    }

    function handleShow() {
        setSettlement({
            id: new Date().getTime(),
            balance: {}
        })
        setShow(true);
    }

    return <>
        <Dialog show={show} onClose={() => setShow(false)}>
            <form onSubmit={handleSubmit}>
                <NewSettlementForm settlement={settlement} setSettlement={setSettlement}/>
                <button type={"submit"}>
                    Registrer
                </button>
                <button onClick={() => setShow(false)}>
                    Avbryt
                </button>
            </form>
        </Dialog>
        <button onClick={handleShow}>
            Registrer telling?
        </button>
    </>;
}