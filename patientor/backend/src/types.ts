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


export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnosesTypes['code']>;
}

export const HealthCheckRating = {
    Healthy: 0,
    LowRisk: 1,
    HighRisk: 2,
    CriticalRisk: 3,
} as const;

export type HealthCheckRating =
    typeof HealthCheckRating[keyof typeof HealthCheckRating];

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;



export type UnionOmit<T, K extends keyof T> =
    T extends unknown ? Omit<T, K> : never;

const BaseEntrySchema = z.object({
    description: z.string(),
    date: z.iso.date(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
});

export const NewEntrySchema = z.discriminatedUnion('type', [
    BaseEntrySchema.extend({
        type: z.literal('Hospital'),
        discharge: z.object({
            date: z.iso.date(),
            criteria: z.string(),
        }),
    }),

    BaseEntrySchema.extend({
        type: z.literal('OccupationalHealthcare'),
        employerName: z.string(),
        sickLeave: z.object({
            startDate: z.iso.date(),
            endDate: z.iso.date(),
        }).optional(),
    }),

    BaseEntrySchema.extend({
        type: z.literal('HealthCheck'),
        healthCheckRating: z.union([
            z.literal(HealthCheckRating.Healthy),
            z.literal(HealthCheckRating.LowRisk),
            z.literal(HealthCheckRating.HighRisk),
            z.literal(HealthCheckRating.CriticalRisk),
        ]),
    }),
]);

export type NewEntry = z.infer<typeof NewEntrySchema>;