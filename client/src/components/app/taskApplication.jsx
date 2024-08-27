import React from "react";

export function TaskApplication() {
    const tasks = [
        { id: 1, description: "Follow the lecture", completed: true },
        { id: 2, description: "Read the exercise", completed: false },
        { id: 3, description: "Complete the exercise", completed: true },
    ];

    return <div>
        <h2>Tasks</h2>
        {tasks.map(({id, description, completed}) => <label key={id}>
            <input type="checkbox" checked={completed} />
            {description}
        </label>)}
    </div>;
}