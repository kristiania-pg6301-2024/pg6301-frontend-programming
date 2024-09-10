import express from "express";

const app = express();

app.get("/api/settlements", (req, res) => {
    res.json([
        {
            id: 0,
            selectedDepartment: "Furniture",
            balance: {
                "20kr": 200,
                "10kr": 50
            }
        }
    ])
})

app.listen(3000);