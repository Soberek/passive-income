import React from "react";
import SchoolInstitutionForm from "./SchoolInstitutionForm";
import { Institution, School } from "../../../../shared/types";
import SchoolInstitutionTable from "./SchoolInstitutionTable";
import { useInstitutions } from "../../hooks/useInstitutions";

const SchoolsPage: React.FC = () => {
  // Fetch data from the API
  const { institutions, loading } = useInstitutions();

  const handleSubmit = async (
    data: Omit<Institution, "institutionId"> & Omit<School, "schoolId" | "institutionId">
  ) => {
    try {
      // Make your API call here
      const response = await fetch("http://localhost:3000/api/schools-with-institutions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create school and institution");
      }

      // Return the created data
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating school:", error.message);
        throw error;
      } else {
        console.error("Error creating school:", error);
        throw error;
      }
    }
  };

  return (
    <div>
      <SchoolInstitutionForm onSubmit={handleSubmit} />
      {loading && <p>Loading...</p>}
      {!loading && institutions.length === 0 && <p>No institutions found.</p>}
      {!loading && institutions.length > 0 && <h2>Institutions</h2>}

      {!loading && institutions.length > 0 && (
        <SchoolInstitutionTable
          data={institutions}
          rowsPerPage={5}
          page={0}
          totalCount={institutions.length}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      )}
    </div>
  );
};

export default SchoolsPage;
