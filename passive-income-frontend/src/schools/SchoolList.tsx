import { SchoolInstitution } from "../../../shared/types";

export const SchoolList = ({ schools }: { schools: SchoolInstitution[] }) => {
  return (
    <div>
      <h1>School List</h1>
      <ul>
        {schools.map((school) => (
          <li key={school.id.toString()}>{school.name}</li>
        ))}
      </ul>
    </div>
  );
};
