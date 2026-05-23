import { EntryFormValues, HealthCheckRating, Diagnosis } from "../../types";
import { useState, SyntheticEvent } from "react";
import { useDiagnoseStore } from "../../stores/diagnoseStore";
import { ChangeEvent } from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface HealthCheckRatingOption{
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.entries(HealthCheckRating)
  .filter(([key]) => isNaN(Number(key)))
  .map(([label, value]) => ({ 
    value: value as HealthCheckRating, 
    label}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [endDate, setEndDate] = useState('');
  const [employer, setEmployer] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');
  const diagnosesList:Diagnosis[] = useDiagnoseStore();

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const payload = {
      type,
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes,
      employerName: employer,
      sickLeave: {
        startDate,
        endDate
      },
      discharge: {
        date: dischargeDate,
        criteria
      }
    } as EntryFormValues;
    onSubmit(payload);
  };

  const handleAddDiagnosisCode = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const code = event.target.value;
    if(!code) return;

    if(!diagnosisCodes.includes(code)) {
      setDiagnosisCodes([...diagnosisCodes, code]);
    }
    event.target.value = '';
  };

  const handleRemoveDiagnosisCode = (code: string) => {
    setDiagnosisCodes(diagnosisCodes.filter(c => c !== code));
  };  

  return(
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="type">Entry Type:</label>
          <select 
            name="type" 
            id="type" 
            value={type}
            onChange={({ target }) => setType(target.value as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare')}
          >
            {
              ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].map(option =>
                <option key={option} value={option}>{option}</option>
              )
            }
          </select>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input 
            type="text"
            name="description" 
            id="description"
            value={description} 
            placeholder="Description" 
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input 
            type="date"
            name="date" 
            id="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <label htmlFor="specialist">Specialist:</label>
          <input
            type="text"
            name="specialist"
            id="specialist"
            value={specialist}
            placeholder="Specialist"
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </div>
        <div>
          <label htmlFor="diagnosesPicker">Diagnosis Codes:</label>
          <select 
            name="diagnosesPicker" 
            id="diagnosesPicker"
            defaultValue=""
            onChange={handleAddDiagnosisCode}
          >
            <option value="" disabled>Select a diagnosis</option>
            {
              diagnosesList.map(diagnose =>
                <option key={diagnose.code} value={diagnose.code}>{diagnose.code} - {diagnose.name}</option>
              )
            }
          </select>
        </div>
        <div>
          <ul>
            {diagnosisCodes.map(code => {
              const matchingDiagnosis = diagnosesList.find(diagnose => diagnose.code === code);
              return (
                <li key={code} title={matchingDiagnosis?.name}>
                  {code}
                  <button type="button" 
                          onClick={() => handleRemoveDiagnosisCode(code)}>
                            X
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          {
            type === 'HealthCheck' && (
              <div>
                <label style={{ display: 'block', marginTop: '10px' }}>Health Check Rating:</label>
                <select
                  value={healthCheckRating}
                  onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
                >
                  {healthCheckRatingOptions.map(option =>
                    <option key={option.label} value={option.value}>{option.label} ({option.value})</option>
                  )}
                </select>
              </div>
            )
          }
        </div>
        <div>
          {
            type === 'OccupationalHealthcare' && (
              <div>
                <h2>Employer Name:</h2>
                <label style={{ display: 'block', marginTop: '10px' }} htmlFor="employer">Employer Name:</label>
                <input
                  type="text"
                  name="employer"
                  id="employer"
                  value={employer}
                  onChange={({ target }) => setEmployer(target.value)}
                />
                <h2>Sick Leave Details:</h2>
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={startDate}
                  onChange={({ target }) => setStartDate(target.value)}
                />
                <label htmlFor="dischargeDate">Discharge Date:</label>
                <input
                  type="date"
                  name="dischargeDate"
                  id="dischargeDate"
                  value={endDate}
                  onChange={({ target }) => setEndDate(target.value)}
                />
              </div>
            )
          }
        </div>
        <div>
          {
            type === 'Hospital' && (
              <div>
                <h2>Discharge Details:</h2>
                <label htmlFor="dischargeDate">Discharge Date:</label>
                <input
                  type="date"
                  name="dischargeDate"
                  id="discharge"
                  value={dischargeDate}
                  onChange={({ target }) => setDischargeDate(target.value)}
                />
                <label htmlFor="criteria">Criteria:</label>
                <input
                  type="text"
                  name="criteria"
                  id="criteria"
                  value={criteria}
                  onChange={({ target }) => setCriteria(target.value)}
                />
              </div>
            )
          }
        </div>
        <div style={{ marginTop: "15px" }}>
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;