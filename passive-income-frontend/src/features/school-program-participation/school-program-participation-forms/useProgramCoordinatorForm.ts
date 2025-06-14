import { useFetch } from "../../../hooks/useFetch";

import type { FormValues, SchoolProgramParticipationTableI } from "../types";

export const useProgramCoordinatorForm = () => {
  const { data, loading, refetch } = useFetch<SchoolProgramParticipationTableI[]>(
    "http://localhost:3000/api/school-program-participation"
  );

  const handleFormSubmit = (data: FormValues) => {
    console.log("Form submitted with data:", data);

    try {
      const requestBody = {
        institutionId: data.institutionId,
        contactId: data.contactId,
        programId: data.programId,
        schoolYearId: data.schoolYearId,
      };

      fetch("http://localhost:3000/api/program-coordinators", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          console.log("Form submission successful:", result);
          refetch(); // Refetch the data to update the table
        });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return {
    handleFormSubmit,
    data,
    loading,
    refetch,
  };
};
