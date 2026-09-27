import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from './exerciseCalculator.ts'

const app = express();

app.use(express.json())
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
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


app.post("/exercises", (req, res) => {
    const { daily_exercises, target } = req.body;

    if (daily_exercises === undefined || target === undefined) {
        res.status(400).json({
            error: "parameters missing",
        });
        return;
    }

    if (!Array.isArray(daily_exercises) || typeof target !== "number" || !daily_exercises.every((exercise: unknown) => typeof exercise === "number")
    ) {
        res.status(400).json({
            error: "malformatted parameters",
        });
        return;
    }

    res.json(calculateExercises(daily_exercises, target));
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
