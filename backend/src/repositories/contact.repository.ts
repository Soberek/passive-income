import sqliteDbService from "../services/sqlite_db.service";

import { Contact } from "../../../shared/types";

import { RepositoryI } from "../types/index.type";

import type {
  CreatableIRepositoryI,
  ReadableRepositoryI,
  UpdatableRepositoryI,
  DeletableRepositoryI,
} from "../types/index.type";

export class ContactRepository
  implements
    CreatableIRepositoryI<Contact, "contactId">,
    ReadableRepositoryI<Contact, "contactId">,
    UpdatableRepositoryI<Contact, "contactId">,
    DeletableRepositoryI<Contact, "contactId">
{
  private dbService: sqliteDbService;

  constructor(dbService: sqliteDbService) {
    this.dbService = dbService;
  }

  createContactTable = () => {
    const stmt = this.dbService.getDb().prepare(`
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

  public getAll = (): Contact[] | [] => {
    const stmt = this.dbService
      .getDb()
      .prepare(
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

  public add = (entity: Partial<Contact>): number | null => {
    const stmt = this.dbService
      .getDb()
      .prepare("INSERT INTO contacts (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)");

    // Check if the statement was prepared successfully
    // and handle the error if it wasn't
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }
    const result = stmt.run(entity.firstName, entity.lastName, entity.email, entity.phone);
    if (result.changes > 0) {
      return Number(result.lastInsertRowid);
    } else {
      console.error("Error adding contact");
      return null;
    }
  };

  public getById = (id: number): Contact | null => {
    const stmt = this.dbService
      .getDb()
      .prepare(
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

  public update = (id: number, entity: Partial<Contact>): boolean => {
    // This SQL statement updates the contact with the given ID
    // It sets the first name, last name, email, and phone number to the new values
    // if some of them are not provided, it will not update them
    // user provides every value
    // if some of them are not provided, it will not update them
    const fieldsToUpdate = [];
    const valuesToUpdate = [];
    if (entity.firstName) {
      fieldsToUpdate.push("first_name = ?");
      valuesToUpdate.push(entity.firstName);
    }
    if (entity.lastName) {
      fieldsToUpdate.push("last_name = ?");
      valuesToUpdate.push(entity.lastName);
    }
    if (entity.email) {
      fieldsToUpdate.push("email = ?");
      valuesToUpdate.push(entity.email);
    }
    if (entity.phone) {
      fieldsToUpdate.push("phone = ?");
      valuesToUpdate.push(entity.phone);
    }
    if (fieldsToUpdate.length === 0) {
      console.error("No fields to update");
      return false;
    }
    const sql = `UPDATE contacts SET ${fieldsToUpdate.join(", ")} WHERE contact_id = ?`;

    const stmt = this.dbService.getDb().prepare(sql);

    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }

    const result = stmt.run(...valuesToUpdate, id);

    if (result.changes > 0) {
      return true;
    } else {
      console.error(`Error updating contact with ID ${id}`);
      return false;
    }
  };

  public delete = (id: number): boolean => {
    const stmt = this.dbService.getDb().prepare("DELETE FROM contacts WHERE contact_id = ?");

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

  public bulkInsert = (contacts: Omit<Contact, "contactId">[]): boolean => {
    const stmt = this.dbService
      .getDb()
      .prepare("INSERT INTO contacts (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)");

    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    try {
      this.dbService.transaction(() => {
        for (const contact of contacts) {
          stmt.run(contact.firstName, contact.lastName, contact.email, contact.phone);
        }
      });

      return true;
    } catch (error) {
      console.error("Error inserting contacts in bulk", error);
      return false;
    }
  };
}
