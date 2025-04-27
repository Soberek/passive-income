import { useEffect, useState } from "react";
import "./App.css";

interface SchoolInstitution {
  name: string;
  director?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  municipality?: string;
}

function App() {
  const [data, setData] = useState<any>(null);
  const [SchoolInstitutions, setSchoolInstitutions] = useState<SchoolInstitution[]>([]);
  const [SchoolInstitution, setSchoolInstitution] = useState<SchoolInstitution>({
    name: "",
    director: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
    website: "",
    municipality: "",
  });

  const URL = "http://127.0.0.1:3000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/api/school`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    console.log("Data fetched:", data);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`${URL}/api/school`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SchoolInstitution),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Data submitted:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            console.log(formData);
            handleSubmit;
          }}
        >
          {/* Add more fields as needed */}

          {/* Submit button */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
