import { z } from 'zod';

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export const Gender = {
    Male: 'male',
    Female: 'female',
    Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

// export interface Patient {
//     id: string;
//     name: string;
//     dateOfBirth: string;
//     ssn: string;
//     gender: Gender;
//     occupation: string;
// }

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string()
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: EntryType[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type nonSSNPatient = Omit<Patient, 'ssn'>;

interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

const HealthCheckRating = {
    "Healthy": 0,
    "LowRisk": 1,
    "HighRisk": 2,
    "CriticalRisk": 3
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
}

export type EntryType = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export const BaseEntrySchema = z.object({
    date: z.string(),
    specialist: z.string(),
    description: z.string(),
    diagnosisCodes: z.array(z.string()).optional()
});

export const EntryTypeSchema = z.discriminatedUnion('type', [
    BaseEntrySchema.extend({
        type: z.literal('HealthCheck'),
        healthCheckRating: z.union([
            z.literal(0),
            z.literal(1),
            z.literal(2),
            z.literal(3)
        ]),
    }),
    BaseEntrySchema.extend({
        type: z.literal('OccupationalHealthcare'),
        employerName: z.string(),
        sickLeave: z.object({
            startDate: z.string(),
            endDate: z.string()
        }).optional()
    }),
    BaseEntrySchema.extend({
        type: z.literal('Hospital'),
        discharge: z.object({
            date: z.string(),
            criteria: z.string()
        })
    })
]);

export type NewEntry = z.infer<typeof EntryTypeSchema>;


