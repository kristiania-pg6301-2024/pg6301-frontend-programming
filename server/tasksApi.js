import express from "express";

const tasks = [
    {id: 1, description: "Implement client", completed: true},
    {id: 2, description: "Implement server", completed: false},
];

export const tasksApi = new express.Router();
tasksApi.get("/api/tasks", (req, res) => {
    res.send(tasks)
});
tasksApi.post("/api/tasks", (req, res) => {
    const {description, completed} = req.body;
    tasks.push({
        id: tasks.length + 1,
        description,
        completed,
    });
    res.sendStatus(201);
})
