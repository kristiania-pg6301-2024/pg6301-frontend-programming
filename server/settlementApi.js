import express from "express";

export const settlementApi = express.Router();
const settlements = [{
    id: 0,
    selectedDepartment: "Books",
    balance: {"10kr": 1000, "1000kr": 1}
}];

settlementApi.get("", (req, res) => {
    res.json(settlements);
});
settlementApi.post("", (req, res) => {
    const {selectedDepartment, balance} = req.body;
    const id = settlements.length;
    settlements.push({ id, selectedDepartment, balance });
    res.sendStatus(201);
})
