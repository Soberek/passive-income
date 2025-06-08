import { Contact, Institution, Program } from "../../../../shared/types";
import SqliteDbService from "../../services/sqlite_db.service";
import {
  CreatableIRepositoryI,
  ReadableRepositoryI,
  UpdatableRepositoryI,
  DeletableRepositoryI,
} from "../../types/index.type";

// coordinator_id, program_id, institution_id, contact_id, school_year_id

import type { ProgramCoordinator } from "../../types/index.type";

export class ProgramCoordinatorRepository implements ReadableRepositoryI<ProgramCoordinator, "programCoordinatorId"> {
  constructor(private dbService: SqliteDbService) {}

  getAll = (): ProgramCoordinator[] => {
    try {
      const stmt = this.dbService.getDb().prepare(
        `SELECT 
            pc.coordinator_id as coordinatorId,
            pc.program_id as programId,
            pc.institution_id as institutionId,
            pc.contact_id as contactId,
            pc.school_year_id as schoolYearId,
            p.program_name,          -- nazwa programu
            i.institution_name,      -- nazwa instytucji (szkoły)
            c.contact_name,          -- nazwa koordynatora (kontakt)
            sy.year                  -- np. rok szkolny
        FROM program_coordinators pc
        JOIN programs p ON pc.program_id = p.program_id
        JOIN institutions i ON pc.institution_id = i.institution_id
        JOIN contacts c ON pc.contact_id = c.contact_id
        JOIN school_years sy ON pc.school_year_id = sy.school_year_id;
`
      );
      if (!stmt) {
        console.error("Error preparing SQL statement");
        return [];
      }
      return stmt.all() as ProgramCoordinator[];
    } catch (error) {
      console.error("Error fetching all program coordinators:", error instanceof Error ? error.message : String(error));
      return [];
    }
  };

  getById = (id: number): ProgramCoordinator | null => {
    try {
      const stmt = this.dbService
        .getDb()
        .prepare("SELECT program_id, coordinator_id FROM program_coordinators WHERE coordinator_id = ?");
      if (!stmt) {
        console.error("Error preparing SQL statement");
        return null;
      }
      const result = stmt.get(id) as ProgramCoordinator | undefined;
      return result || null;
    } catch (error) {
      console.error(
        "Error fetching program coordinator by ID:",
        error instanceof Error ? error.message : String(error)
      );
      return null;
    }
  };
}
