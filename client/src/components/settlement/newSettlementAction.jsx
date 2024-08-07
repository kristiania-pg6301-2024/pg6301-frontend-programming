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
    useEffect(() => {
        dialogRef.current.addEventListener("close", () => setShow(false));
    }, []);

    return <>
        <dialog ref={dialogRef}>
            <h1>Ny kontanttelling</h1>
        </dialog>
        <button onClick={() => setShow(true)}>
            Registrer telling? {show ? "hide" : "show"}
        </button>
    </>;
}