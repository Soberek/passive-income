import { useEffect, useState } from "react";
import { SchoolWithInstitutionData, schoolParams } from "../../../shared/types/index";
import { SchoolList } from "./SchoolList";
import { SchoolAddForm } from "./SchoolAddForm/SchoolAddForm";

export const School = () => {
  const [schools, setSchools] = useState<SchoolWithInstitutionData[]>([]);
  const URL = "http://127.0.0.1:3000";

  useEffect((): void => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(`${URL}/api/school`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch schools");
        }
        setSchools(data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, []);

  const handleSubmit = async (event: React.FormEvent, schoolInstitution: schoolParams) => {
    event.preventDefault();
    try {
      const response = await fetch(`${URL}/api/school`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schoolInstitution),
      });
      console.log(response);
      const data = await response.json();

      console.log("Data submitted:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <h1>Szkoły</h1>
      <SchoolAddForm handleSubmit={handleSubmit} />
      <SchoolList schools={schools} />
    </div>
  );
};
