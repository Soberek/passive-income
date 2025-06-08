import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Contact } from "../../../../shared/types";

export const useContactTable = () => {
  const [contactList, setContactList] = useState<Contact[]>([]);

  const { data, error, loading } = useFetch<{ contacts: Contact[] }>("http://localhost:3000/api/contacts");

  console.log("useContactTable data:", data);
  useEffect(() => {
    if (data) {
      setContactList(data.contacts);
    }
  }, [data]);

  return { contactList, error, loading };
};
