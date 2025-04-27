import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState<any>(null);

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

  return (
    <>
      <div></div>
    </>
  );
}

export default App;
