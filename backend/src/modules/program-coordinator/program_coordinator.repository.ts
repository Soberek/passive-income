import SqliteDbService from "../../database/sqlite_db.service";
import {
  CreatableIRepositoryI,
  ReadableRepositoryI,
  UpdatableRepositoryI,
  DeletableRepositoryI,
} from "../../types/index.type";

// coordinator_id, program_id, institution_id, contact_id, school_year_id

import type {
  ProgramCoordinatorType,
  ProgramCoordinatorCreateType,
  ProgramCoordinatorUpdateType,
} from "./program_coordinator.schema";

export class ProgramCoordinatorRepository
  implements
    ReadableRepositoryI<ProgramCoordinatorType, "coordinatorId">,
    CreatableIRepositoryI<ProgramCoordinatorType, "coordinatorId">
{
  constructor(private dbService: SqliteDbService) {}

  getAll = (): ProgramCoordinatorType[] => {
    try {
      const stmt = this.dbService.getDb().prepare(
        `SELECT 
            pc.coordinator_id as coordinatorId,
            p.name as programName,          -- nazwa programu
            i.name as institutionName,      -- nazwa instytucji (szkoły)
            c.phone as contactPhone,
            i.phone as institutionPhone,
            (c.first_name || ' ' || c.last_name) as contactName,          -- nazwa koordynatora (kontakt)
            sy.year as year           -- np. rok szkolny
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
      return stmt.all() as ProgramCoordinatorType[];
    } catch (error) {
      console.error("Error fetching all program coordinators:", error instanceof Error ? error.message : String(error));
      return [];
    }
  };

  getById = (id: number): ProgramCoordinatorType | null => {
    try {
      const stmt = this.dbService
        .getDb()
        .prepare("SELECT program_id, coordinator_id FROM program_coordinators WHERE coordinator_id = ?");
      if (!stmt) {
        console.error("Error preparing SQL statement");
        return null;
      }
      const result = stmt.get(id) as ProgramCoordinatorType | undefined;
      return result || null;
    } catch (error) {
      console.error(
        "Error fetching program coordinator by ID:",
        error instanceof Error ? error.message : String(error)
      );
      return null;
    }
  };

  add = (item: ProgramCoordinatorCreateType) => {
    try {
      const stmt = this.dbService.getDb().prepare(
        `INSERT INTO program_coordinators (program_id, institution_id, contact_id, school_year_id)
         VALUES (?, ?, ?, ?)`
      );
      if (!stmt) {
        console.error("Error preparing SQL statement for insert");
        return null;
      }
      const result = stmt.run(item.programId, item.institutionId, item.contactId, item.schoolYearId);
      if (result.changes > 0) {
        return result.lastInsertRowid as number;
      } else {
        console.error("No rows were inserted");
        return null;
      }
    } catch (error) {
      console.error("Error adding program coordinator:", error instanceof Error ? error.message : String(error));
      return null;
    }
  };
}
