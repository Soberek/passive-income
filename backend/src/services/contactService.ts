import sqliteDbService from "./sqliteDbService";
import { Contact } from "../../../shared/types";

// Model is a class that represents the structure of a contact. Used to create a new contact and validate the data.
// It implements the Contact interface, which defines the properties of a contact.

// Repository is a class that handles the database operations related to contacts.
// It uses the sqliteDbService to interact with the SQLite database.

// Service is a class that provides higher-level operations related to contacts.
// It uses the ContactRepository to perform CRUD operations on contacts.
// It can also include business logic related to contacts like validation, formatting, etc. So it use the ContactModel class to create a new contact and validate the data and repository to perform CRUD operations on contacts.

// Controller is a class that handles the HTTP requests related to contacts.
// It uses the ContactService to perform operations on contacts.
// It can also include request validation, response formatting, etc. Joi
export class ContactModel implements Contact {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email?: string,
    phone?: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }

  validate(): string[] {
    const errors: string[] = [];

    if (!this.firstName.trim()) {
      errors.push("First name is required.");
    }

    if (!this.lastName.trim()) {
      errors.push("Last name is required.");
    }

    if (this.email && !this.email.includes("@")) {
      errors.push("Email is invalid.");
    }

    if (this.phone && this.phone.length < 10) {
      errors.push("Phone number is too short.");
    }

    return errors;
  }
}

class ContactRepository {
  private dbService: sqliteDbService;

  constructor() {
    this.dbService = sqliteDbService.getInstance();
  }

  createContactTable = () => {
    const stmt = this.dbService.prepare(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT,
        phone TEXT
      )
    `);

    if (!stmt) {
      console.error("Error preparing SQL statement");
      return;
    }
    stmt.run();
  };

  public getAllContacts = (): Contact[] => {
    const stmt = this.dbService.prepare(
      "SELECT id, first_name as firstName, last_name as lastName, email, phone FROM contacts"
    );

    if (!stmt) {
      console.error("Error preparing SQL statement");
      return [];
    }

    const rows = stmt.all() as Contact[];

    if (rows.length === 0) {
      console.log("No contacts found");
      return [];
    }

    return rows;
  };

  public addNewContact = (
    firstName: string,
    lastName: string,
    email?: string,
    phone?: string
  ) => {
    const stmt = this.dbService.prepare(
      "INSERT INTO contacts (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)"
    );

    // Check if the statement was prepared successfully
    // and handle the error if it wasn't
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }
    const result = stmt.run(firstName, lastName, email, phone);
    if (result.changes > 0) {
      // If the insert is successful, log a success message
      console.log("Contact added successfully");
      return result.lastInsertRowid; // ID of the newly inserted contact
    } else {
      // If the insert fails, log an error message
      console.error("Error adding contact");
      return null;
    }
  };

  public getContactById = (id: number): Contact | null => {
    const stmt = this.dbService.prepare(
      "SELECT id, first_name as firstName, last_name as lastName, email, phone FROM contacts WHERE id = ?"
    );

    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }

    const row = stmt.get(id) as Contact;

    if (!row) {
      console.log(`No contact found with ID ${id}`);
      return null;
    }

    return row;
  };

  public updateContact = (
    id: number,
    firstName: string,
    lastName: string,
    email?: string,
    phone?: string
  ) => {
    const stmt = this.dbService.prepare(
      "UPDATE contacts SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?"
    );

    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }

    const result = stmt.run(firstName, lastName, email, phone, id);

    if (result.changes > 0) {
      console.log(`Contact with ID ${id} updated successfully`);
      return result.changes; // Number of rows changed
    } else {
      console.error(`Error updating contact with ID ${id}`);
      return null;
    }
  };

  public deleteContact = (id: number) => {
    const stmt = this.dbService.prepare("DELETE FROM contacts WHERE id = ?");

    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }

    const result = stmt.run(id);

    if (result.changes > 0) {
      console.log(`Contact with ID ${id} deleted successfully`);
      return result.changes; // Number of rows changed
    } else {
      console.error(`Error deleting contact with ID ${id}`);
      return null;
    }
  };
}

class ContactService {
  constructor(private contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }
}

class ContactService {
  private dbService: sqliteDbService;

  constructor() {
    this.dbService = sqliteDbService.getInstance();
  }

  createContactTable = () => {
    const stmt = this.dbService.prepare(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT,
        phone TEXT
      )
    `);

    if (!stmt) {
      console.error("Error preparing SQL statement");
      return;
    }
    stmt.run();
  };

  public getAllContacts = (): Contact[] => {
    const stmt = this.dbService.prepare(
      "SELECT id, first_name as firstName, last_name as lastName, email, phone FROM contacts"
    );

    if (!stmt) {
      console.error("Error preparing SQL statement");
      return [];
    }

    const rows = stmt.all() as Contact[];

    if (rows.length === 0) {
      console.log("No contacts found");
      return [];
    }

    return rows;
  };

  public addNewContact = (
    firstName: string,
    lastName: string,
    email?: string,
    phone?: string
  ) => {
    const stmt = this.dbService.prepare(
      "INSERT INTO contacts (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)"
    );

    // Check if the statement was prepared successfully
    // and handle the error if it wasn't
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }
    const result = stmt.run(firstName, lastName, email, phone);
    if (result.changes > 0) {
      // If the insert is successful, log a success message
      console.log("Contact added successfully");
      return result.lastInsertRowid; // ID of the newly inserted contact
    } else {
      // If the insert fails, log an error message
      console.error("Error adding contact");
      return null;
    }
  };
}
export default ContactService;

// Usage example
// const contactsService = new ContactsService();
// const contacts = contactsService.getAllContacts();
