import type {EntryType, Diagnosis} from "../../types";
import { useDiagnoseStore } from "../../stores/diagnoseStore";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";

interface Props {
  entry: EntryType;
}

const EntryInfo = ({ entry }: Props) => {
  const diagnoses:Diagnosis[] = useDiagnoseStore();
  console.log(diagnoses);
  const diagnosisCodes = entry.diagnosisCodes ? entry.diagnosisCodes.map((code: string) => {
                          const matchingDiagnosis = diagnoses.find(diagnose => diagnose.code === code);
                          return (
                              <li key={code}>{code} {matchingDiagnosis?.name}</li>
                          );
                      }) : null;

  const baseCase = (
    <div>
      <p>{entry.date}: {entry.description}</p>
      <ul>
        {diagnosisCodes}
      </ul>
    </div>
  );

  
  switch(entry.type) {
    case "HealthCheck":
      return (
        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          {baseCase}
          <p>Diagnosed by: {entry.specialist}</p>
          <HealthCheck entry={entry} />
        </div>
      );
    case "Hospital":
      return (
        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          { baseCase }
          <Hospital entry={entry} />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            { baseCase }
            <OccupationalHealthcare entry={entry} />
        </div>
      );
  default:
      return null;
  }
};

export default EntryInfo;