"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionsService = void 0;
const sqliteDbService_1 = __importDefault(require("./sqliteDbService"));
class InstitutionsService {
    dbService;
    constructor() {
        this.dbService = sqliteDbService_1.default.getInstance();
    }
    createInstitutionTable() {
        const stmt = this.dbService.prepare(`
      CREATE TABLE institution ( 
        id_institution INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL, 
        id_institution_type INTEGER NOT NULL, 
        address TEXT NOT NULL, 
        city TEXT NOT NULL, 
        postal_code TEXT NOT NULL,
        phone TEXT, 
        email TEXT, 
        website TEXT, 
        municipality TEXT,
        FOREIGN KEY (id_institution_type) REFERENCES institution_type(id_institution_type) 
      );
    `);
        // Check if the statement was prepared successfully
        if (!stmt) {
            console.error("Error preparing SQL statement");
            return;
        }
        const info = stmt.run();
        const idOfCreatedInstitution = info.lastInsertRowid;
    }
    getAllInstitutions() {
        const stmt = this.dbService.prepare("SELECT * FROM institutions");
        if (!stmt) {
            console.error("Error preparing SQL statement");
            return [];
        }
        return stmt.all();
    }
    addInstitution(name, address, postal_code, city, phone, email, website) {
        const stmt = this.dbService.prepare("INSERT INTO institutions (name, address, postal_code, city, phone, email, website) VALUES (?, ?, ?, ?, ?, ?, ?)");
        // Check if the statement was prepared successfully
        // and handle the error if it wasn't
        if (!stmt) {
            console.error("Error preparing SQL statement");
            return null;
        }
        // Execute the statement with the provided parameters
        const result = stmt.run(name, address, postal_code, city, phone, email, website);
        // Check if the execution was successful
        if (result.changes > 0) {
            console.log("Institution added successfully");
            return result.lastInsertRowid; // Return the ID of the newly inserted row
        }
        // If the execution failed, log an error message
        console.error("Error adding institution");
        return null; // Return null to indicate failure
    }
}
exports.InstitutionsService = InstitutionsService;
