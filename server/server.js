import express from "express";

const app = express();
app.listen(3000);

const tasksApi = new express.Router();
tasksApi.get("/api/tasks", (req, res) => {
    res.send([
            {id: 1, description: "Implement client", completed: true},
            {id: 2, description: "Implement server", completed: false},
        ]
    )
});
app.use(tasksApi);
