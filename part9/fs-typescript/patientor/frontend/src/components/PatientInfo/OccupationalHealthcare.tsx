import type { EntryType } from "../../types";

interface Props {
    entry: EntryType;
}
 
const OccupationalHealthcare = ({ entry }: Props) => {
    if (entry.type !== 'OccupationalHealthcare') {
        return null;
    }

    return (
        <div>
            <p>Employer name: {entry.employerName}</p>
            <p>Sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</p>
        </div>
    );
};

export default OccupationalHealthcare;