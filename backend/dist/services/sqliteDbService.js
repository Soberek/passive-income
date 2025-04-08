"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const schools = [
    { id: 1, name: "School A", address: "123 Main St", phone: "555-1234" },
    { id: 2, name: "School B", address: "456 Elm St", phone: "555-5678" },
    { id: 3, name: "School C", address: "789 Oak St", phone: "555-8765" },
    { id: 4, name: "School D", address: "101 Pine St", phone: "555-4321" },
    { id: 5, name: "School E", address: "202 Maple St", phone: "555-6789" },
];
class sqliteDbService {
    db;
    // The constructor takes an object with a dbPath property, which is the path to the SQLite database file.
    constructor(params) {
        this.db = (0, better_sqlite3_1.default)(params.dbPath);
        this.init();
        this.insertSchoolsIfNotExists();
    }
    init() {
        try {
            this.db.exec(`
        CREATE TABLE IF NOT EXISTS schools (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        address TEXT,
        phone TEXT
      );`);
        }
        catch (error) {
            console.error("Error initializing database:", error);
        }
    }
    getAll(tableName) {
        try {
            const stmt = this.db.prepare(`SELECT * FROM ${tableName}`);
            return stmt.all();
        }
        catch (error) {
            console.error(`Error fetching all records from ${tableName}:`, error);
            return [];
        }
    }
    insertSchool(school) {
        try {
            const stmt = this.db.prepare(`INSERT INTO schools (id, name, address, phone) VALUES (?, ?, ?, ?)`);
            const info = stmt.run(school.id, school.name, school.address, school.phone);
            return info.lastInsertRowid;
        }
        catch (error) {
            console.error("Error inserting school:", error);
            return null;
        }
    }
    insertSchoolsIfNotExists() {
        try {
            const existingSchools = this.getAll("schools");
            const existingSchoolNames = new Set(existingSchools.map((school) => school.id));
            schools.forEach((school) => {
                if (!existingSchoolNames.has(school.name)) {
                    this.insertSchool(school);
                }
            });
        }
        catch (error) {
            console.error("Error inserting schools:", error);
        }
    }
}
exports.default = sqliteDbService;
