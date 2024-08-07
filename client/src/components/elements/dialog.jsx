import {useEffect, useRef} from "react";

export function Dialog({show, onClose, children}) {
    const dialogRef = useRef();
    useEffect(() => {
        if (show) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [show]);
    useEffect(() => {
        dialogRef.current.addEventListener("close", onClose);
    }, []);
    return <dialog ref={dialogRef}>
        {children}
    </dialog>;
}