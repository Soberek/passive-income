"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const sqliteDbService_1 = __importDefault(require("./sqliteDbService"));
class SchoolService {
  dbService;
  constructor() {
    this.dbService = sqliteDbService_1.default.getInstance();
  }
  createSchoolTable = () => {
    try {
      const stmt = this.dbService.prepare(`
            CREATE TABLE school ( 
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                id_institution INTEGER NOT NULL,
                director TEXT NOT NULL, 
                FOREIGN KEY (id_institution) REFERENCES institutions(id) ON DELETE CASCADE 
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
    } catch (error) {
      console.error("Error creating school table: ", error);
    }
  };
  getAllSchools = () => {
    // get all schools
    const stmt = this.dbService.prepare(`
      SELECT 
        school.id AS schoolId,
        school.director,
        institutions.address,
        institutions.city,
        institutions.postal_code,
        institutions.phone,
        institutions.email,
        institutions.website,
        institutions.municipality,
        institutions.id AS institutionId,
        institutions.name AS institution_name
      FROM school
      JOIN institutions ON school.id_institution = institutions.id
`);
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return [];
    }
    const rows = stmt.all();
    if (rows.length === 0) {
      console.error("No schools found");
      return [];
    }
    return rows;
  };
  getSchoolById = (id) => {
    console.log("Fetching school with id: ", id);
    const stmt = this.dbService.prepare(`SELECT   
        school.id AS schoolId,
        school.director,
        institutions.address,
        institutions.city,
        institutions.postal_code as postalCode,
        institutions.phone,
        institutions.email,
        institutions.website,
        institutions.municipality,
        institutions.id AS institutionId,
        institutions.name AS institutionName
       FROM school JOIN institutions ON school.id_institution = institutions.id WHERE school.id = ?`);
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }
    const row = stmt.get(id);
    if (!row) {
      console.error("No school found with id: ", id);
      return null;
    }
    console.log("Fetched school with id: ", id, row);
    return row;
  };
  addSchool = (institutionId, director) => {
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
  };
  deleteSchool = (id) => {
    const stmt = this.dbService.prepare("DELETE FROM school WHERE id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    const info = stmt.run(id);
    if (!info) {
      console.error("Error executing SQL statement");
      return false;
    }
    if (info.changes === 0) {
      console.error("No school found with id: ", id);
      return false;
    }
    console.log("Deleted school with id: ", id);
    return true;
  };
}
exports.default = SchoolService;
