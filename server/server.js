import express from "express";

const app = express();
app.use(express.json());

const settlements = [
    {id: 0, selectedDepartment: "Furniture", balance: {"20kr": 200, "10kr": 51}}
];
const settlementApi = express.Router();
settlementApi.get("/", (req, res) => {
    res.json(settlements)
})
settlementApi.post("/", (req, res) => {
    const { selectedDepartment, balance } = req.body;
    const id = settlements.length;
    settlements.push({id, selectedDepartment, balance});
    res.sendStatus(201);
})
app.use("/api/settlements", settlementApi);

app.listen(3000);