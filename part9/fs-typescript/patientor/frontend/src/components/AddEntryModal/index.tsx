import AddEntryForm from "./AddEntryForm";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { EntryFormValues, Patient } from "../../types";
import patientService from "../../services/patients";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const AddEntryModal = ({ isOpen, onClose, setPatient }: Props) => {
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState<string | null>(null);

    if(!isOpen){
        return null;
    }

    const handleFormSubmit = async (values: EntryFormValues) => {
        if(!id) {
            setError("Cannot submit: Missing patient ID.");
            return;
        }

        try {
            const savedEntry = await patientService.addEntry(String(id), values);
            setPatient(patient => {
                if(!patient) return undefined;
                return {
                    ...patient,
                    entries: [...patient.entries, savedEntry]
                };
            });
            setError(null);
            onClose();
            
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            setError('Submission failed: ' + message);
        }
    };

    return(
        <div>
            <h1>Add new entry:</h1>
            {error && (
                <div style={{ color: "red", backgroundColor: "#ffebee", padding: "10px", marginBottom: "15px" }}>
                    {error}
                </div>
            )}
            <AddEntryForm 
                onSubmit={handleFormSubmit} 
                onCancel={onClose} 
            />
        </div>
    );
};

export default AddEntryModal;
  