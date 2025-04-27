import { useEffect, useState } from "react";
import { SchoolInstitution, schoolParams } from "../../../shared/types/index";
import { SchoolList } from "./SchoolList";

export const School = () => {
  const [schools, setSchools] = useState<SchoolInstitution[]>([]);
  const URL = "http://127.0.0.1:3000";

  useEffect(() => {
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
      <h1>School</h1>
      <p>Welcome to the School page!</p>

      <SchoolList schools={schools} />
    </div>
  );
};
