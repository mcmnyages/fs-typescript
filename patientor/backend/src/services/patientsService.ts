import patients from '../../data/patients.ts';
import type { NonSensitivePatient,NewPatient,PatientTypes } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
    return patients.map(p => ({
        id: p.id,
        name: p.name,
        dateOfBirth: p.dateOfBirth,
        gender: p.gender,
        occupation: p.occupation
    }));
};

const addPatient = (entry: NewPatient): PatientTypes => {
    const newPatient = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatient);
    return newPatient;
};


export default {
    getPatients,
    addPatient
};
