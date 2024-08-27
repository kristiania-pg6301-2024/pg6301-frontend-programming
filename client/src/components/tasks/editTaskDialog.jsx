import React, {useEffect, useRef, useState} from "react";

export function EditTaskDialog({task, onUpdateTask}) {
    const dialogRef = useRef();
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (task) {
            setDescription(task.description);
            dialogRef.current.showModal();
        }
    }, [task?.id])

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateTask(task.id, { description });
        dialogRef.current.close();
    }


    return <dialog ref={dialogRef}>
        <form onSubmit={handleSubmit}>
            <h2>Updating {task?.description}</h2>
            <div>
                <input value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <button>Update</button>
        </form>
    </dialog>;
}