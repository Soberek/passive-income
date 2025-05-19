import React from "react";
import SchoolInstitutionForm from "./SchoolInstitutionForm";
import { Institution, School } from "../../../../shared/types";

const SchoolsPage: React.FC = () => {
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
    </div>
  );
};

export default SchoolsPage;
