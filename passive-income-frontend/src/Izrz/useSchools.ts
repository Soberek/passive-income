import { useEffect, useState } from "react";

export const useSchools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    // Fetch schools data
    const fetchSchools = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/institution");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);

        setSchools(data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };
    fetchSchools();
  }, []);
  return { schools };
};
