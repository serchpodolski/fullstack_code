import type { Patient, EntryType } from "../../types";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import EntryInfo from "./EntryInfo";
import AddEntryModal from "../AddEntryModal";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { FaGenderless } from "react-icons/fa";


const PatientInfo = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient>();
    const [error, setError] = useState<string | null>(null);

    // console.log(id);
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);
 
    useEffect(() => {
        if(!id) return;

        patientService.getById(id)
            .then(patient => {
                setPatient(patient);
                console.log(patient);
            })
            .catch(err => {
                setError(err.message);
            });
        }, [id]);


    // const handleAddTestEntry = async () => {
    //     try {
    //         const response = await patientService.addEntry(String(id), {
    //             "type": "Hospital",
    //             "description": "Admitted following acute appendicitis symptoms. Appendectomy performed successfully.",
    //             "date": "2026-05-01",
    //             "specialist": "Dr. Robert Chase",
    //             "discharge": {
    //                 "date": "2026-05-04",
    //                 "criteria": "Patient is ambulatory, managing post-op discomfort well with oral analgesics, and shows normal vital trends."
    //             },
    //             "diagnosisCodes": ["K35.8", "Z48.8"]
    //         });
    //         console.log('Backend confirmation response:', response);
    //         alert('Mock entry sent! Check your backend terminal log.');
    //     } catch (err: unknown) {
    //         const message = err instanceof Error ? err.message : String(err);
    //         console.error('Network transaction failed:', message);
    //         alert(`Submission failed: ${message}`);
    //     }
    // };

    if(error) {
        return <div>Error: {error}</div>;
    }

    if(!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "left", width: "20%" }}>
                <h1>{patient.name}</h1>
                <h1>{patient.gender === 'male' ? <IoMdMale /> : patient.gender === 'female' ? <IoMdFemale /> : <FaGenderless />}</h1>
            </div>
            <p>Occupation: {patient.occupation}</p>
            <p>Date of Birth: {patient.dateOfBirth}</p>
            <p>SSN: {patient.ssn}</p>
            <h2>Entries:</h2>
            {
                (patient.entries as EntryType[]).map((entry: EntryType) => (
                    <EntryInfo key={entry.id} entry={entry} />
                ))
            }
            <button onClick={()=> setModalOpen(true)} style={{ marginTop: "10px" }}>Add new Entry</button>
            <AddEntryModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                setPatient={setPatient}
            />
        </div>
    );
};

export default PatientInfo;