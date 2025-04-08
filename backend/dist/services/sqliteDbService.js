"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
class sqliteDbService {
    db;
    // The constructor takes an object with a dbPath property, which is the path to the SQLite database file.
    constructor(params) {
        this.db = (0, better_sqlite3_1.default)(params.dbPath);
        this.init();
    }
    init() {
        this.db.exec(`
        CREATE TABLE IF NOT EXISTS schools (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT,
        phone TEXT
      );`);
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
            const stmt = this.db.prepare(`INSERT INTO schools (name, address, phone) VALUES (?, ?, ?)`);
            const info = stmt.run(school.name, school.address, school.phone);
            return info.lastInsertRowid;
        }
        catch (error) {
            console.error("Error inserting school:", error);
            return null;
        }
    }
}
exports.default = sqliteDbService;
