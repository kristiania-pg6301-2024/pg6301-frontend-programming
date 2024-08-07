import {useEffect, useRef, useState} from "react";

export function NewSettlementAction() {
    const [show, setShow] = useState(false);
    const dialogRef = useRef();

    useEffect(() => {
        if (show) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [show]);

    return <>
        <dialog ref={dialogRef}>
            <h1>Ny kontanttelling</h1>
        </dialog>
        <button onClick={() => setShow(b => !b)}>
            Registrer telling? {show ? "hide" : "show"}
        </button>
    </>;
}