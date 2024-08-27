import React, {useEffect, useRef} from "react";

export function EditTaskDialog({task}) {
    const dialogRef = useRef();

    useEffect(() => {
        if (task) {
            dialogRef.current.showModal();
        }
    }, [task])

    return <dialog ref={dialogRef}>
        <h2>Updating {task?.description}</h2>
    </dialog>;
}