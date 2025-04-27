import sqliteDbService from "./sqliteDbService";
import { Institution } from "../../../shared/types";
import { School } from "../../../shared/types";

class SchoolService {
  private dbService: sqliteDbService;
  constructor() {
    this.dbService = sqliteDbService.getInstance();
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

  getAllSchools = (): School[] | [] => {
    // get all schools
    const stmt = this.dbService.prepare(
      "SELECT * FROM school JOIN institutions ON school.id_institution = institutions.id"
    );

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
    return rows as School[];
  };

  getSchoolById = (id: number): School | null => {
    const stmt = this.dbService.prepare(
      "SELECT * FROM school JOIN institutions ON school.id_institution = institutions.id WHERE school.id = ?"
    );

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
    return row as School;
  };

  addSchool = (
    institutionId: Institution["id"],
    director: School["director"]
  ): School["id"] => {
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

  deleteSchool = (id: number): boolean => {
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

export default SchoolService;
