import express from "express";

const app = express();
app.listen(3000);

app.get("/api/tasks", (req, res) => {
    res.json([{ title: "create server" }]);
})

console.log("started http://localhost:3000");
