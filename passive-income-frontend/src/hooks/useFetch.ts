import { useEffect, useState } from "react";

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchData() {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    console.log("Fetched data:", result);
    return result.data;
  }

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchDataEffect = async () => {
      try {
        const data = await fetchData();
        setData(data);
      } catch (error) {
        console.log("Fetch error:", error);
        setError(error instanceof Error ? error : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchDataEffect();
  }, [url]);

  const refetch = async () => {
    setLoading(true);
    setError(null);

    try {
      const newData = await fetchData();
      setData(newData);
    } catch (error) {
      console.log("Refetch error:", error);
      setError(error instanceof Error ? error : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, refetch };
};
