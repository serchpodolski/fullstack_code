import type { CoursePart } from "../types";

const Part = ({ part }: {part: CoursePart}) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2> 
          <p>{part.description}</p>
        </div>
      )
    case 'group':
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2> 
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
    case 'background':
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      )
    case 'special':
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
    )
    default:
      return null;
}
};

export default Part;