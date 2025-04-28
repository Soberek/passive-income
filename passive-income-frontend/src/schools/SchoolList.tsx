import { SchoolWithInstitutionData } from "../../../shared/types";

export const SchoolList = ({ schools }: { schools: SchoolWithInstitutionData[] }) => {
  if (!schools || schools.length === 0) {
    return <div>No schools available</div>;
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/school/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to delete school");
      }
      const data = await response.json();
      console.log("School deleted:", data);
    } catch (error) {
      console.error("Error deleting school:", error);
    }
  };

  return (
    <div>
      <h1>Lista szkół</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial, sans-serif" }}>
        <thead style={{ backgroundColor: "#333", color: "#fff" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Director</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Address</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>City</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Postal Code</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Phone</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Email</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Website</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Municipality</th>
            <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "#fff", color: "#333" }}>
          {schools.map((school) => (
            <tr key={school.schoolId.toString()} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.schoolId.toString()}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.name}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.director}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.address}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.city}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.postalCode}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.phone}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.email}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.website}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{school.municipality}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Edytuj
                </button>
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#FF0000",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  onClick={() => {
                    // Handle delete action
                    console.log(`Delete school with ID: ${school.schoolId}`);
                    handleDelete(Number(school.schoolId));
                  }}
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
