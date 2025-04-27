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
  const [SchoolInstitution, setSchoolInstitution] = useState<SchoolInstitution[]>([]);

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
        <form onSubmit={handleSubmit}>
          <h1>Passive Income</h1>
          <h2>School and Institution</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label htmlFor="director">Director:</label>
            <input type="text" id="director" name="director" />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" />
          </div>
          <div>
            <label htmlFor="postalCode">Postal Code:</label>
            <input type="text" id="postalCode" name="postalCode" />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="website">Website:</label>
            <input type="url" id="website" name="website" />
          </div>
          <div>
            <label htmlFor="municipality">Municipality:</label>
            <input type="text" id="municipality" name="municipality" />
          </div>

          {/* Add more fields as needed */}

          {/* Submit button */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
