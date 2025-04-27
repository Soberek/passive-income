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

        const data = await response.json();
        setSchoolInstitutions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    console.log("Data fetched:", SchoolInstitutions);
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
      console.log(response);
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
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px", margin: "auto" }}
        >
          <label>
            Name:
            <input
              type="text"
              value={SchoolInstitution.name}
              onChange={(e) => setSchoolInstitution({ ...SchoolInstitution, name: e.target.value })}
            />
          </label>
          <label>
            Director:
            <input
              type="text"
              value={SchoolInstitution.director}
              onChange={(e) => setSchoolInstitution({ ...SchoolInstitution, director: e.target.value })}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              value={SchoolInstitution.address}
              onChange={(e) => setSchoolInstitution({ ...SchoolInstitution, address: e.target.value })}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              value={SchoolInstitution.city}
              onChange={(e) => setSchoolInstitution({ ...SchoolInstitution, city: e.target.value })}
            />
          </label>
          <label>
            Postal Code:
            <input
              type="text"
              value={SchoolInstitution.postalCode}
              onChange={(e) => setSchoolInstitution({ ...SchoolInstitution, postalCode: e.target.value })}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              value={SchoolInstitution.phone}
              onChange={(e) => setSchoolInstitution({ ...SchoolInstitution, phone: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={SchoolInstitution.email}
              onChange={(e) => setSchoolInstitution({ ...SchoolInstitution, email: e.target.value })}
            />
          </label>
          <label>
            Website:
            <input
              type="url"
              value={SchoolInstitution.website}
              onChange={(e) => setSchoolInstitution({ ...SchoolInstitution, website: e.target.value })}
            />
          </label>
          <label>
            Municipality:
            <input
              type="text"
              value={SchoolInstitution.municipality}
              onChange={(e) => setSchoolInstitution({ ...SchoolInstitution, municipality: e.target.value })}
            />
          </label>

          <button
            type="submit"
            style={{ padding: "10px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
