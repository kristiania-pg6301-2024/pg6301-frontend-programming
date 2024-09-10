import express from "express";

const app = express();
app.use(express.json());

const settlements = [
    {id: 0, selectedDepartment: "Furniture", balance: {"20kr": 200, "10kr": 50}}
];
app.get("/api/settlements", (req, res) => {
    res.json(settlements)
})
app.post("/api/settlements", (req, res) => {
    const { selectedDepartment, balance } = req.body;
    const id = settlements.length;
    settlements.push({id, selectedDepartment, balance});
    res.sendStatus(201);
})

app.listen(3000);