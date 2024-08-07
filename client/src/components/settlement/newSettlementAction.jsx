import {useState} from "react";
import {Dialog} from "../elements/dialog";

export function NewSettlementAction() {
    const [show, setShow] = useState(false);
    return <>
        <Dialog show={show} onClose={() => setShow(false)}>
            <h1>Ny kontanttelling</h1>
        </Dialog>
        <button onClick={() => setShow(true)}>
            Registrer telling?
        </button>
    </>;
}