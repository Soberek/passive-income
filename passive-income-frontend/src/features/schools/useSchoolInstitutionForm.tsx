import type { Institution, School } from "../../../../shared/types";

type SchoolInstitutionFormData = Omit<Institution, "institutionId"> &
  Omit<School, "schoolId" | "institutionId"> & { isSchool: boolean };

type isSchool =
  | (Omit<SchoolInstitutionFormData, "isSchool"> & { isSchool: true })
  | ({ isSchool: false } & Omit<Institution, "institutionId">);

export function useSchoolInstitutionForm() {
  const handleSubmit = async (data: isSchool) => {
    try {
      if (!data.isSchool) {
        const responseData = await PostData<isSchool>("http://localhost:3000/api/institutions", data);
        return responseData;
      }

      if (data.isSchool === true) {
        const responseData = await PostData<SchoolInstitutionFormData>(
          "http://localhost:3000/api/schools-with-institutions",
          data
        );
        return responseData;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw error;
      }
    }
  };

  return { handleSubmit };
}

async function PostData<T>(url: string, data: T) {
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
