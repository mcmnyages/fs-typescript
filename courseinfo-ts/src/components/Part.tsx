import type { CoursePart } from "../types";

type PartProps = {
  part: CoursePart;
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled course part: ${JSON.stringify(value)}`);
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h4>{part.name}  {part.exerciseCount}</h4>
          <p>{part.description}</p>
        </div>
      );

    case "group":
      return (
        <div>
          <h4>{part.name} {part.exerciseCount}</h4>
          <p>Group projects: {part.groupProjectCount}</p>
        </div>
      );

    case "background":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3> 
          <p><i>{part.description}</i></p>
          <p>Background material: {part.backgroundMaterial}</p>
        </div>
      );

    case "special":
      return (
        <div>
          <h4>{part.name}  {part.exerciseCount}</h4>
          <p>{part.description}</p>
          <p>Requirements: {part.requirements.join(", ")}</p>
        </div>
      );

    default:
      return assertNever(part);
  }
};

export default Part;
