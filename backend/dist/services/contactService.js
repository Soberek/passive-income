"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqliteDbService_1 = __importDefault(require("./sqliteDbService"));
class ContactService {
    dbService;
    constructor() {
        this.dbService = sqliteDbService_1.default.getInstance();
        this.createContactTable();
    }
    createContactTable() {
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
    }
    getAllContacts() {
        const stmt = this.dbService.prepare("SELECT * FROM contacts");
        if (!stmt) {
            console.error("Error preparing SQL statement");
            return [];
        }
        return stmt.all();
    }
    addNewContact(firstName, lastName, email, phone) {
        const stmt = this.dbService.prepare("INSERT INTO contacts (firstName, lastName, email, phone) VALUES (?, ?, ?, ?)");
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
        }
        else {
            // If the insert fails, log an error message
            console.error("Error adding contact");
            return null;
        }
    }
}
exports.default = ContactService;
// Usage example
// const contactsService = new ContactsService();
// const contacts = contactsService.getAllContacts();
