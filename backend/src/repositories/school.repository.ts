import sqliteDbService from "../services/sqliteDbService";
import { School, Institution } from "../../../shared/types";

export class SchoolRepository {
  private dbService: sqliteDbService;
  constructor() {
    this.dbService = sqliteDbService.getInstance();
  }

  getAllSchools = () => {
    const stmt = this.dbService.prepare("SELECT school_id as schoolId, director FROM schools");
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

  getSchoolById = (id: School["schoolId"]) => {
    const stmt = this.dbService.prepare("SELECT school_id as schoolId, director FROM schools WHERE school_id = ?");
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

  addSchool = (institutionId: Institution["institutionId"], director: School["director"]) => {
    const stmt = this.dbService.prepare("INSERT INTO schools (institution_id, director) VALUES (?, ?)");
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

  deleteSchool = (id: School["schoolId"]) => {
    const stmt = this.dbService.prepare("DELETE FROM schools WHERE school_id = ?");
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

  updateSchool = (
    id: School["schoolId"],
    institutionId: Institution["institutionId"],
    director: School["director"]
  ) => {
    const fieldsToUpdate: string[] = []; // Array to hold the fields to be updated director
    const valuesToUpdate: any[] = []; // Array to hold the values to be updated

    if (director !== undefined) {
      fieldsToUpdate.push("director = ?");
      valuesToUpdate.push(director);
    }
    if (institutionId !== undefined) {
      fieldsToUpdate.push("institution_id = ?");
      valuesToUpdate.push(institutionId);
    }
    if (fieldsToUpdate.length === 0) {
      console.warn("No fields to update provided");
      return false;
    }
    const sql = `UPDATE schools SET ${fieldsToUpdate.join(", ")} WHERE school_id = ?`;
    valuesToUpdate.push(id);
    const stmt = this.dbService.prepare(sql);

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

  getSchoolByInstitutionId = (institutionId: Institution["institutionId"]) => {
    const stmt = this.dbService.prepare("SELECT * FROM schools WHERE institution_id = ?");
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

  getSchoolByIdWithInstitutionData = (id: School["schoolId"]) => {
    const stmt = this.dbService.prepare(
      `SELECT school.school_id AS schoolId, institution.institution_id AS institutionId, school.director, institution.name, institution.address, institution.city, institution.postalCode, institution.phone, institution.email, institution.website, institution.municipality
         FROM schools
         JOIN institution ON school.institution_id = institution.institution_id
         WHERE school.school_id = ?`
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
