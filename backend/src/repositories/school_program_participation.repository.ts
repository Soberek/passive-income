import { DatabaseI } from "../types/database.type";
import SqliteDbService from "../services/sqlite_db.service";
import type { CreatableIRepositoryI, ReadableRepositoryI } from "../types/index.type";

export class SchoolProgramParticipation {
  constructor(private dbService: SqliteDbService) {}

  addSchoolProgramParticipation = (schoolId: number, programId: number, schoolYearId: number): boolean => {
    try {
      const stmt = this.dbService
        .getDb()
        .prepare("INSERT INTO school_program_participation (school_id, program_id, school_year_id) VALUES (?, ?, ?)");
      if (!stmt) {
        console.error("Error preparing SQL statement");
        return false;
      }
      const info = stmt.run(schoolId, programId, schoolYearId);
      return info.changes > 0;
    } catch (error) {
      console.error(
        "Error adding school program participation:",
        error instanceof Error ? error.message : String(error)
      );
      return false;
    }
  };
}
