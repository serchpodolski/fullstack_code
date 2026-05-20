import type { CoursePart } from "../types.ts";
import Part from "./Part.tsx";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {
        courseParts.map(part => <Part key={part.name} part={part} />)
      }
    </div>
  )
};

export default Content;