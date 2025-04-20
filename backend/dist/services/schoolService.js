"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqliteDbService_1 = __importDefault(require("./sqliteDbService"));
class SchoolService {
    dbService;
    constructor() {
        this.dbService = sqliteDbService_1.default.getInstance();
    }
    createSchoolTable() {
        const stmt = this.dbService.prepare(`
            CREATE TABLE school ( 
                id_institution INTEGER PRIMARY KEY AUTOINCREMENT,
                direction TEXT NOT NULL, 
                FOREIGN KEY (id_institution) REFERENCES institutions(id_institution) ON DELETE CASCADE 
            );
        `);
        // Check if the statement was prepared successfully
        if (!stmt) {
            console.error("Error preparing SQL statement");
            return;
        }
        stmt.run();
    }
}
