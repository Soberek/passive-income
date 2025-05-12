import sqliteDbService from "../services/sqliteDbService";

import { Contact } from "../../../shared/types";

export class ContactRepository {
  private dbService: sqliteDbService;

  constructor() {
    this.dbService = sqliteDbService.getInstance();
  }

  createContactTable = () => {
    const stmt = this.dbService.prepare(`
      CREATE TABLE IF NOT EXISTS contacts (
        contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
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
      "SELECT contact_id as contactId, first_name as firstName, last_name as lastName, email, phone FROM contacts"
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

  public addNewContact = (firstName: string, lastName: string, email?: string, phone?: string) => {
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
      "SELECT contact_id as contactId, first_name as firstName, last_name as lastName, email, phone FROM contacts WHERE contact_id = ?"
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

  public updateContact = (id: number, firstName: string, lastName: string, email?: string, phone?: string) => {
    // This SQL statement updates the contact with the given ID
    // It sets the first name, last name, email, and phone number to the new values
    // if some of them are not provided, it will not update them
    // user provides every value
    // if some of them are not provided, it will not update them

    const stmt = this.dbService.prepare(
      "UPDATE contacts SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE contact_id = ?"
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
    const stmt = this.dbService.prepare("DELETE FROM contacts WHERE contact_id = ?");

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
