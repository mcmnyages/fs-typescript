import express from 'express';
import { z } from 'zod';
import patientsService from '../services/patientsService.ts';
import { NewPatientSchema,NewEntrySchema } from '../types.ts';
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
    const patient = patientsService.findById(req.params.id);

    if (patient) {
        res.json(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = NewPatientSchema.parse(req.body);
        const addedPatient = patientsService.addPatient(newPatient);

        res.json(addedPatient);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        } else {
            res.status(400).send({ error: 'unknown error' });
        }
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const entry = NewEntrySchema.parse(req.body);
        const addedEntry = patientsService.addEntry(
            req.params.id,
            entry
        );

        if (!addedEntry) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }

        res.status(201).json(addedEntry);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }
    }
});


export default router;
