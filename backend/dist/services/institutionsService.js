"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionsService = void 0;
const sqliteDbService_1 = __importDefault(require("./sqliteDbService"));
// This class is responsible for managing institutions in the database.
class InstitutionsService {
    dbService;
    constructor() {
        this.dbService = sqliteDbService_1.default.getInstance();
    }
    createInstitutionTable() {
        const stmt = this.dbService.prepare(`
      CREATE TABLE institutions ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL, 
        address TEXT NOT NULL, 
        city TEXT NOT NULL, 
        postal_code TEXT NOT NULL,
        phone TEXT, 
        email TEXT, 
        website TEXT, 
        municipality TEXT,
      );
    `);
        // Check if the statement was prepared successfully
        if (!stmt) {
            console.error("Error preparing SQL statement");
            return;
        }
        const info = stmt.run();
        if (info.lastInsertRowid) {
            console.log("Created institutions table with id: ", info.lastInsertRowid);
        }
        else {
            console.error("Error creating institutions table");
        }
    }
    getAllInstitutions() {
        const stmt = this.dbService.prepare("SELECT * FROM institutions");
        if (!stmt) {
            console.error("Error preparing SQL statement");
            return [];
        }
        return stmt.all();
    }
    addInstitution(input) {
        const { name, address, postalCode, city, phone, email, website, municipality, } = input;
        // Check if the required fields are provided
        if (!name || !address || !postalCode || !city) {
            console.error("Missing required fields");
            return null;
        }
        const stmt = this.dbService.prepare("INSERT INTO institutions (name, address, postal_code, city, phone, email, website, municipality) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        // Check if the statement was prepared successfully
        // and handle the error if it wasn't
        if (!stmt) {
            console.error("Error preparing SQL statement");
            return null;
        }
        // Execute the statement with the provided parameters
        const result = stmt.run(name, address, postalCode, city, phone, email, website, municipality);
        // Check if the execution was successful
        if (result.changes > 0) {
            console.log("Institution added successfully");
            return { newInstitutionId: result.lastInsertRowid }; // Return the ID of the newly inserted row
        }
        // If the execution failed, log an error message
        console.error("Error adding institution");
        return null; // Return null to indicate failure
    }
}
exports.InstitutionsService = InstitutionsService;
