"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqliteDbService_1 = __importDefault(require("./sqliteDbService"));
const schools = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
];
class SchoolService {
    dbService;
    constructor() {
        this.dbService = sqliteDbService_1.default.getInstance();
    }
    createSchoolTable() {
        try {
            const stmt = this.dbService.prepare(`
            CREATE TABLE school ( 
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                id_institution INTEGER NOT NULL,
                director TEXT NOT NULL, 
                FOREIGN KEY (id_institution) REFERENCES institutions(id_institution) ON DELETE CASCADE 
            );
        `);
            // Check if the statement was prepared successfully
            if (!stmt) {
                console.error("Error preparing SQL statement");
                return;
            }
            const info = stmt.run();
            const id = info.lastInsertRowid;
            console.log("Created school table with id: ", id);
        }
        catch (error) {
            console.error("Error creating school table: ", error);
        }
    }
    getAllSchools() {
        // get all schools
        const stmt = this.dbService.prepare("SELECT * FROM school JOIN institutions ON school.id_institution = institutions.id");
        if (!stmt) {
            console.error("Error preparing SQL statement");
            return [];
        }
        const rows = stmt.all();
        if (rows.length === 0) {
            console.error("No schools found");
            return [];
        }
        console.log("Fetched all schools: ", rows);
        return rows;
    }
    addSchool(institutionId, director) {
        // 1. add
        const stmt = this.dbService.prepare(`
            INSERT INTO school (id_institution, director) 
            VALUES (?, ?)
        `);
        if (!stmt) {
            console.error("Error preparing SQL statement");
            return -1;
        }
        const info = stmt.run(institutionId, director);
        if (!info) {
            console.error("Error executing SQL statement");
            return -1;
        }
        console.log("Added school with id: ", info.lastInsertRowid);
        return info.lastInsertRowid;
    }
}
exports.default = SchoolService;
