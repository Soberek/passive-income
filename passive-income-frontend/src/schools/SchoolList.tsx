import { SchoolInstitution } from "../../../shared/types";

export const SchoolList = ({ schools }: { schools: SchoolInstitution[] }) => {
  return (
    <div>
      <h1>School List</h1>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Director</th>
            <th>Address</th>
            <th>City</th>
            <th>Postal Code</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Website</th>
            <th>Municipality</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school.id.toString()}>
              <td>{school.name}</td>
              <td>{school.director}</td>
              <td>{school.address}</td>
              <td>{school.city}</td>
              <td>{school.postalCode}</td>
              <td>{school.phone}</td>
              <td>{school.email}</td>
              <td>{school.website}</td>
              <td>{school.municipality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
