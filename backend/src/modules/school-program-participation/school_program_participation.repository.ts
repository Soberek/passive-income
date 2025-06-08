import { DatabaseI } from "../../types/database.type";
import SqliteDbService from "../../database/sqlite_db.service";
import type { CreatableIRepositoryI, ReadableRepositoryI } from "../../types/index.type";

export class SchoolProgramParticipation {
  constructor(private dbService: SqliteDbService) {}

  getAllSchoolProgramParticipations = (): { schoolId: number; programId: number; schoolYearId: number }[] => {
    try {
      const stmt = this.dbService.getDb().prepare(
        `SELECT institutions.name, institutions.email, institutions.municipality, programs.name, school_years.year  
            FROM  school_program_participation spp
            JOIN schools ON spp.school_id = schools.school_id 
            JOIN institutions ON institutions.institution_id = schools.institution_id
            JOIN programs ON spp.program_id = programs.program_id
            JOIN school_years ON spp.school_year_id = school_years.school_year_id`
      );
      if (!stmt) {
        console.error("Error preparing SQL statement");
        return [];
      }
      return stmt.all() as { schoolId: number; programId: number; schoolYearId: number }[];
    } catch (error) {
      console.error(
        "Error fetching all school program participations:",
        error instanceof Error ? error.message : String(error)
      );
      return [];
    }
  };
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
