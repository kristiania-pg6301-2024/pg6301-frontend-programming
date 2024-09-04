import React, {useState} from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

function TaskList() {
    const [tasks, setTasks] = useState([
        { id: 1, description: "Follow the lecture", completed: true },
        { id: 2, description: "Read the exercise", completed: false },
        { id: 3, description: "Complete the exercise", completed: false },
    ]);

    const [description, setDescription] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        setDescription("");
        setTasks(old => [...old, {description, completed: false}])
    }

    return <div>
        <h2>Tasks</h2>
        {tasks.map(({id, description, completed}) => <label key={id}>
            <input
                type="checkbox"
                checked={completed}
                onChange={e => setTasks(old => old.map(
                    task => (task.id === id)
                        ? { ...task, completed: e.target.checked}
                        : task
                ))}
            />{description}
        </label>)}
        <dialog>
            <h3>Update task description</h3>
        </dialog>
        <h3>New task</h3>
        <form onSubmit={handleSubmit}>
            <div>
                Description: <input
                    type={"text"}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
            />
            </div>
            <div><button disabled={!description}>Submit</button></div>
        </form>
    </div>;
}
function Application() {
    return <TaskList />;
}
root.render(<Application />);