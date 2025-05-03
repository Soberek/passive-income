import sqliteDbService from "../services/sqliteDbService";
import { School, Institution } from "../../../shared/types";

export class SchoolRepository {
  private dbService: sqliteDbService;
  constructor() {
    this.dbService = sqliteDbService.getInstance();
  }

  getAllSchools = () => {
    const stmt = this.dbService.prepare("SELECT * FROM school");
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

  getSchoolById = (id: number) => {
    const stmt = this.dbService.prepare("SELECT * FROM school WHERE id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }
    const row = stmt.get(id);
    if (!row) {
      console.error("No school found with id: ", id);
      return null;
    }
    return row;
  };

  addSchool = (institutionId: Institution["id"], director: School["director"]) => {
    const stmt = this.dbService.prepare("INSERT INTO school (id_institution, director) VALUES (?, ?)");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return -1;
    }
    const info = stmt.run(institutionId, director);
    if (!info) {
      console.error("Error executing SQL statement");
      return -1;
    }
    return info.lastInsertRowid;
  };

  deleteSchool = (id: number) => {
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
    return true;
  };

  updateSchool = (id: number, institutionId: Institution["id"], director: School["director"]) => {
    const stmt = this.dbService.prepare("UPDATE school SET id_institution = ?, director = ? WHERE id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    const info = stmt.run(institutionId, director, id);
    if (!info) {
      console.error("Error executing SQL statement");
      return false;
    }
    if (info.changes === 0) {
      console.error("No school found with id: ", id);
      return false;
    }
    return true;
  };

  getSchoolByInstitutionId = (institutionId: Institution["id"]) => {
    const stmt = this.dbService.prepare("SELECT * FROM school WHERE id_institution = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }
    const row = stmt.get(institutionId);
    if (!row) {
      console.error("No school found with institution id: ", institutionId);
      return null;
    }
    return row;
  };

  getSchoolByIdWithInstitutionData = (id: number) => {
    const stmt = this.dbService.prepare(
      `SELECT school.id AS schoolId, institution.id AS institutionId, school.director, institution.name, institution.address, institution.city, institution.postalCode, institution.phone, institution.email, institution.website, institution.municipality
         FROM school
         JOIN institution ON school.id_institution = institution.id
         WHERE school.id = ?`
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
    return row;
  };
}
