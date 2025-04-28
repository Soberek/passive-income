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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Director</th>
            <th>Address</th>
            <th>City</th>
            <th>Postal Code</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Website</th>
            <th>Municipality</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "#fff", color: "#333" }}>
          {schools.map((school) => (
            <tr key={school.schoolId.toString()} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{school.schoolId.toString()}</td>
              <td>{school.name}</td>
              <td>{school.director}</td>
              <td>{school.address}</td>
              <td>{school.city}</td>
              <td>{school.postalCode}</td>
              <td>{school.phone}</td>
              <td>{school.email}</td>
              <td>{school.website}</td>
              <td>{school.municipality}</td>
              <td>
                <button className="edit-button">Edytuj</button>
                <button
                  className="delete-button"
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
