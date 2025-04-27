import { SchoolInstitution } from "../../../shared/types";

export const SchoolList = ({ schools }: { schools: SchoolInstitution[] }) => {
  return (
    <div>
      <h1>List szkół</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial, sans-serif" }}>
        <thead style={{ backgroundColor: "#333", color: "#fff" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Director</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Address</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>City</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Postal Code</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Phone</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Email</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Website</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Municipality</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "#fff", color: "#333" }}>
          {schools.map((school) => (
            <tr key={school.id.toString()} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.name}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.director}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.address}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.city}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.postalCode}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.phone}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.email}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.website}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.municipality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
