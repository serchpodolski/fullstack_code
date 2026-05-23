import type { EntryType } from "../../types";

interface Props {
    entry: EntryType;
}
 
const HealthCheck = ({ entry }: Props) => {
  if (entry.type !== 'Hospital') {
    return null;
  }
  return (
    <div>
      <p>Discharge date: {entry.discharge.date}</p>
      <p>Discharge criteria: {entry.discharge.criteria}</p>
    </div>
  );
};

export default HealthCheck;