import sqliteDbService from "../services/sqliteDbService";

import { Contact } from "../../../shared/types";

import { RepositoryI } from "../types/repositories.type";

interface ContactRepositoryI extends RepositoryI<Contact> {}
export class ContactRepository implements ContactRepositoryI {
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

  public getAll = (): Contact[] => {
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

  public add = (entity: Partial<Contact>) => {
    const stmt = this.dbService.prepare(
      "INSERT INTO contacts (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)"
    );

    // Check if the statement was prepared successfully
    // and handle the error if it wasn't
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }
    const result = stmt.run(entity.firstName, entity.lastName, entity.email, entity.phone);
    if (result.changes > 0) {
      return result.lastInsertRowid;
    } else {
      console.error("Error adding contact");
      return null;
    }
  };

  public getById = (id: number): Contact | null => {
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

  public update = (id: number, entity: Partial<Contact>) => {
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
      return false;
    }

    const result = stmt.run(entity.firstName, entity.lastName, entity.email, entity.phone, id);

    if (result.changes > 0) {
      return true;
    } else {
      console.error(`Error updating contact with ID ${id}`);
      return false;
    }
  };

  public delete = (id: number) => {
    const stmt = this.dbService.prepare("DELETE FROM contacts WHERE contact_id = ?");

    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }

    const result = stmt.run(id);

    if (result.changes > 0) {
      console.log(`Contact with ID ${id} deleted successfully`);
      return true;
    } else {
      console.error(`Error deleting contact with ID ${id}`);
      return false;
    }
  };
}
