import { useFetch } from "../../hooks/useFetch";
import { Contact } from "../../../../shared/types";

export const useContactTable = () => {
  const { data, error, loading } = useFetch<Contact[]>("http://localhost:3000/api/contacts");

  return { data, error, loading };
};
