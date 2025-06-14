import type { FormValues } from "../types";

export const useProgramCoordinatorForm = () => {
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
        });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return {
    handleFormSubmit,
  };
};
