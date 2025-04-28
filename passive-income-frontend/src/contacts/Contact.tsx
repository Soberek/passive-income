import { useState, useEffect } from "react";
import { Contact as Contacts } from "../../../shared/types";

export const Contact = () => {
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [newContact, setNewContact] = useState<Contacts>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/contact");
      const data = await response.json();
      setContacts(data);
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
      setNewContact({ id: 0, firstName: "", lastName: "", email: "", phone: "" });
      fetchContacts();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <div>
      <h1>Contact List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={newContact.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={newContact.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <input type="email" name="email" value={newContact.email} onChange={handleInputChange} placeholder="Email" />
        <input type="text" name="phone" value={newContact.phone} onChange={handleInputChange} placeholder="Phone" />
        <button type="submit">Add Contact</button>
      </form>
      <ul>
        {contacts.length > 0 &&
          contacts.map((contact) => (
            <li key={contact.id}>
              {contact.firstName} {contact.lastName} - {contact.email} - {contact.phone}
            </li>
          ))}
      </ul>
    </div>
  );
};
