import { z } from 'zod';

export interface DiagnosesTypes {
    code: string
    name: string
    latin?: string
}

export const Gender = {
    Male: 'male',
    Female: 'female',
    Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export interface PatientTypes {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
}

export type NonSensitivePatient = Omit<PatientTypes, 'ssn' | 'entries'>;

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}



