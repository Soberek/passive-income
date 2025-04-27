export const useFetch = <T>(url: string, options?: RequestInit): Promise<T> => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: T) => resolve(data))
      .catch((error) => reject(error));
  });
};
