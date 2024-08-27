import React, {useState} from "react";

export function NewTaskForm({onAddTask}) {
    const [description, setDescription] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onAddTask({ description, completed: false });
        setDescription("");
    }

    return <form onSubmit={handleSubmit}>
        <h2>Add new task</h2>
        <div>
            <input
                value={description}
                onChange={e => setDescription(e.target.value)}
                autoFocus={true}
            />
        </div>
        <button>Add</button>
    </form>;
}