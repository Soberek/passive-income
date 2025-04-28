import sqliteDbService from "./sqliteDbService";
import { Contact } from "../../../shared/types";

class ContactService {
  private dbService: sqliteDbService;

  constructor() {
    this.dbService = sqliteDbService.getInstance();
    this.createContactTable();
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
      "SELECT first_name as firstName, last_name as lastName, email, phone FROM contacts"
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
