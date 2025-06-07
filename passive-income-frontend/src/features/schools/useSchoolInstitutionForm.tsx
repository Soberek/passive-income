import type { Institution, School } from "../../../../shared/types";

export function useSchoolInstitutionForm() {
  const handleSubmit = async (
    data: Omit<Institution, "institutionId"> & Omit<School, "schoolId" | "institutionId"> & { isSchool: boolean }
  ) => {
    try {
      if (data.isSchool === false) {
        const responseData = await PostData("http://localhost:3000/api/institutions", data);
        return responseData;
      }

      if (data.isSchool === true) {
        const responseData = await PostData("http://localhost:3000/api/schools-with-institutions", data);
        return responseData;
      }
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

  return { handleSubmit };
}

async function PostData(url: string, data: any) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to post data");
  }

  return await response.json();
}
