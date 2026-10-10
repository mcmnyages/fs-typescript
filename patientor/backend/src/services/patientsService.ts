import patients from '../../data/patients.ts';
import type { NonSensitivePatient, NewPatient, PatientTypes,NewEntry,Entry } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
    return patients.map(p => ({
        id: p.id,
        name: p.name,
        dateOfBirth: p.dateOfBirth,
        gender: p.gender,
        occupation: p.occupation,
    }));
};

const findById = (id: string): PatientTypes | undefined => {
    return patients.find(p => p.id === id);
};


const addPatient = (entry: NewPatient): PatientTypes => {
    const newPatient = {
        id: uuid(),
        ...entry,
        entries: []
    };

    patients.push(newPatient);
    return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry | undefined => {
    const patient = patients.find(p => p.id === id);

    if (!patient) {
        return undefined;
    }

    const { diagnosisCodes, ...entryData } = entry;

    const newEntry = {
        ...Object.fromEntries(
            Object.entries(entryData).filter(([, value]) => value !== undefined)
        ),
        id: uuid(),
        ...(diagnosisCodes !== undefined ? { diagnosisCodes } : {}),
    } as Entry;

    patient.entries.push(newEntry);

    return newEntry;
};

export default {
    getPatients,
    findById,
    addPatient,
    addEntry
};
