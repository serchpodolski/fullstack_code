import type { EntryType } from "../../types";
import { FaHeartbeat } from "react-icons/fa";

interface Props {
    entry: EntryType;
}
 
const HealthCheck = ({ entry }: Props) => {
    if (entry.type !== "HealthCheck") {
        return null; // Return nothing if it's a Hospital or Occupational entry
    }

    const rating = entry.healthCheckRating;

  // 2. Invert the rating so a lower score renders MORE health icons
  // 0 (Healthy) -> 4 icons | 1 -> 3 icons | 2 -> 2 icons | 3 (Critical) -> 1 icon
  const iconCount = Math.max(1, 4 - rating);

  // 3. Map colors to the status to make it visually clear
  const getIconColor = () => {
    switch (rating) {
      case 0: return "green";
      case 1: return "yellowgreen";
      case 2: return "orange";
      case 3: return "red";
      default: return "gray";
    }
  };

  return (
    <div>
      <p><strong>{entry.date}</strong>: {entry.description}</p>
      
      {/* 4. Generate the array on the fly and map to the icon component */}
      <div style={{ display: "flex", gap: "4px" }}>
        {Array(iconCount)
          .fill(null)
          .map((_, index) => (
            <FaHeartbeat 
              key={index} 
              color={getIconColor()} 
              size="1.5em" 
            />
          ))}
      </div>
    </div>
  );
};

export default HealthCheck;