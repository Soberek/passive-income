import sqliteDbService from "./sqliteDbService";
import { Institution } from "./institutionsService";

interface School {
  idSchool: number | BigInt;
  director: string;
  // foreign key to institution
}

class SchoolService {
  private dbService: sqliteDbService;
  constructor() {
    this.dbService = sqliteDbService.getInstance();
  }

  createSchoolTable() {
    const stmt = this.dbService.prepare(`
            CREATE TABLE school ( 
                id_school INTEGER PRIMARY KEY AUTOINCREMENT,
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

  getAllSchools(): School[] {
    const stmt = this.dbService.prepare("SELECT * FROM school");

    if (!stmt) {
      console.error("Error preparing SQL statement");
      return [];
    }
    const rows = stmt.all();
    return rows as School[];
  }

  addSchool(institutionId: Institution["idInstitution"], director: string) {
    // 1. add
    const stmt = this.dbService.prepare(`
            INSERT INTO school (id_institution, direction) 
            VALUES (?, ?)
        `);

    if (!stmt) {
      console.error("Error preparing SQL statement");
      return -1;
    }

    const info = stmt.run(institutionId, director);

    if (!info) {
      console.error("Error executing SQL statement");
    } else {
      console.log("Added school with id: ", info.lastInsertRowid);
    }
  }
}

export default SchoolService;
