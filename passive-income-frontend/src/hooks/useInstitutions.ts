import { useEffect, useState } from "react";
import { Institution } from "../../../shared/types";

export const useInstitutions = () => {
  const [institutions, setInstitutions] = useState<Institution[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch institutions data
    const fetchInstitutions = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/institutions");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setInstitutions(data);

        console.log("Institutions data:", data);
      } catch (error) {
        console.error("Error fetching institutions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstitutions();
  }, []);
  return { institutions, loading };
};
