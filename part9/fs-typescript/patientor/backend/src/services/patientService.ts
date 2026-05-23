import patientsData from '../../data/patients.ts';
import { type EntryType, type NewPatient, type Patient, EntryTypeSchema } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient [] => {
    return patientsData;
};

const getPatientById = (id: string): Patient | undefined => {
    const patient = patientsData.find(patient => patient.id === id);
    return patient ? { ...patient, entries: patient.entries ?? [] } : undefined;
};

const addPatient = (patient: NewPatient ): Patient | undefined => {
    const id: string = uuid(); //need to cast uuid call to the correct type
    const addedPatient: Patient = {
        id,
        ...patient,
        entries: []
    };

    patientsData.push(addedPatient);
    return addedPatient;
};

const addEntry = (patientId: string, entryData: unknown): EntryType | undefined => {
    const patient = patientsData.find(patient => patient.id === patientId);
    console.log('Adding entry for patient ID:', patientId);
    console.log('Entry data:', entryData);
    console.log('Patient:', patient);
    if (!patient) {
        return undefined;
    }
    const parsedEntry = EntryTypeSchema.parse(entryData);

    const newEntry: EntryType = {
        id: uuid(),
        ...parsedEntry
    };
    patient.entries = patient.entries ?? [];
    patient.entries.push(newEntry);
    return newEntry;
};


export default{
    getPatients,
    addPatient,
    getPatientById,
    addEntry
};
