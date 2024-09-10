import React, {useEffect, useRef} from "react";

export function Dialog({children, onClose, visible}) {
    const dialogRef = useRef()
    useEffect(() => {
        if (visible) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [visible])
    useEffect(() => {
        dialogRef.current.addEventListener("close", () => onClose())
    }, [dialogRef])

    return <dialog ref={dialogRef}>{children}</dialog>;
}