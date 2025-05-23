import { useState, useEffect } from "react";
import { Contact as Contacts } from "../../../../shared/types";
import ContactsTable from "./ContactTable";

export const Contact = () => {
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [newContact, setNewContact] = useState<Omit<Contacts, "contactId">>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/contacts");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (!data || data.length === 0) {
        console.log("No contacts found");
        return;
      }
      setContacts(data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      });

      if (!response.ok) {
        throw new Error("Failed to add contact");
      }
      setNewContact({ firstName: "", lastName: "", email: "", phone: "" });
      fetchContacts();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h3>Lista kontaktów</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Imię:
          <input
            type="text"
            name="firstName"
            value={newContact.firstName}
            onChange={handleInputChange}
            placeholder="Imię"
          />
        </label>

        <label>
          Nazwisko:
          <input
            type="text"
            name="lastName"
            value={newContact.lastName}
            onChange={handleInputChange}
            placeholder="Nazwisko"
          />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={newContact.email} onChange={handleInputChange} placeholder="Email" />
        </label>
        <label>
          Telefon:
          <input type="text" name="phone" value={newContact.phone} onChange={handleInputChange} placeholder="Telefon" />
        </label>

        <button type="submit">Dodaj kontakt</button>
      </form>

      <ContactsTable
        contacts={contacts}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={5}
        totalCount={contacts.length}
      />
    </div>
  );
};
