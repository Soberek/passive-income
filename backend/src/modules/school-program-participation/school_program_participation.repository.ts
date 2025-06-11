import { DatabaseI } from "../../types/database.type";
import SqliteDbService from "../../database/sqlite_db.service";
import type { CreatableIRepositoryI, ReadableRepositoryI } from "../../types/index.type";
import type {
  SchoolProgramParticipationType,
  schoolProgramParticipationCreateType,
} from "./school_program_participation.schema";

class SchoolProgramParticipationRepository
  implements
    CreatableIRepositoryI<SchoolProgramParticipationType, "participationId">,
    ReadableRepositoryI<SchoolProgramParticipationType, "participationId">
{
  constructor(private dbService: SqliteDbService) {}

  getAll = (): SchoolProgramParticipationType[] => {
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
      return stmt.all() as SchoolProgramParticipationType[];
    } catch (error) {
      console.error(
        "Error fetching all school program participations:",
        error instanceof Error ? error.message : String(error)
      );
      return [];
    }
  };

  getById: (id: number) => SchoolProgramParticipationType | null = (id: number) => {
    try {
      const stmt = this.dbService
        .getDb()
        .prepare("SELECT * FROM school_program_participation WHERE participation_id = ?");
      if (!stmt) {
        console.error("Error preparing SQL statement");
        return null;
      }
      const result = stmt.get(id) as SchoolProgramParticipationType | undefined;
      if (!result) {
        console.error("No participation found with the given ID");
        return null;
      }
      return result;
    } catch (error) {
      console.error(
        "Error fetching school program participation by ID:",
        error instanceof Error ? error.message : String(error)
      );
      return null;
    }
  };

  add = (entity: schoolProgramParticipationCreateType) => {
    try {
      const stmt = this.dbService
        .getDb()
        .prepare("INSERT INTO school_program_participation (school_id, program_id, school_year_id) VALUES (?, ?, ?)");
      if (!stmt) {
        console.error("Error preparing SQL statement");
        return null;
      }
      const info = stmt.run(entity.schoolId, entity.programId, entity.schoolYearId);
      if (info.changes === 0) {
        console.error("No rows were inserted");
        return null;
      }
      return info.lastInsertRowid as number;
    } catch (error) {
      console.error(
        "Error adding school program participation:",
        error instanceof Error ? error.message : String(error)
      );
      return null;
    }
  };
}

export default SchoolProgramParticipationRepository;
