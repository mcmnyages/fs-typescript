import express from "express";
import {calculateBmi} from "./bmiCalculator.ts";

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack')
})

app.get("/bmi", (req, res) => {
    const { height, weight } = req.query;

    const heightNumber = Number(height);
    const weightNumber = Number(weight);

    if (typeof height !== "string" || typeof weight !== "string" || isNaN(heightNumber) || isNaN(weightNumber)) {
        res.status(400).json({
            error: "malformatted parameters",
        });
        return;
    }

    res.json({
        weight: weightNumber,
        height: heightNumber,
        bmi: calculateBmi(heightNumber, weightNumber),
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
