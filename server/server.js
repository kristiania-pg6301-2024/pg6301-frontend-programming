import express from "express";

const app = express();
app.use(express.json());

const settlements = [{
    selectedDepartment: "Books",
    balance: {"10kr": 1000, "1000kr": 1}
}];

app.get("/api/settlements", (req, res) => {
    res.json(settlements);
});
app.post("/api/settlements", (req, res) => {
    const {selectedDepartment, balance} = req.body;
    settlements.push({ selectedDepartment, balance });
    res.sendStatus(201);
})

app.listen(3000);

