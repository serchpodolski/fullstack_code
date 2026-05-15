import patientsData from '../../data/patients.ts';
import { type NewPatient, type Patient } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient [] => {
    return patientsData;
};

const addPatient = (patient: NewPatient ): Patient | undefined => {
    const id: string = uuid(); //need to cast uuid call to the correct type
    const addedPatient: Patient = {
        id,
        ...patient
    };

    patientsData.push(addedPatient);
    return addedPatient;
};

export default{
    getPatients,
    addPatient
};