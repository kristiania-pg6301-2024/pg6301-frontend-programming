import React from "react";

export function TaskListItem({
    task: {id, completed, description},
    onCompleted
}) {
    return <div>
        <label>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => onCompleted(id)}
            />
            {description}
        </label>
    </div>;
}