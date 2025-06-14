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
           -- Program Coordinator Details
            pc.coordinator_id as coordinatorId,
            pc.participation_id as participationId,
            sy.school_year_id as schoolYearId,

            
            -- School Year Details
            sy.school_year_id as schoolYearId,
            sy.year as schoolYear,

            -- Program Details
            p.program_id as programId,
            p.name as programName,
            p.program_type as programType,

            -- Institution Details
            i.institution_id as institutionId,
            i.name as institutionName,
            i.address as institutionAddress,
            i.postal_code as institutionPostalCode,
            i.city as institutionCity,

            -- Contact Details
            c.contact_id as contactId,
            c.first_name as contactFirstName,
            c.last_name as contactLastName,
            c.phone as contactPhone,
            c.email as contactEmail

        FROM program_coordinators pc
        JOIN school_program_participation spp ON pc.participation_id = spp.participation_id
        JOIN school_years sy ON spp.school_year_id = sy.school_year_id
        JOIN schools s ON spp.school_id = s.school_id
        JOIN institutions i ON s.institution_id = i.institution_id
        JOIN programs p ON spp.program_id = p.program_id
        JOIN contacts c ON pc.contact_id = c.contact_id
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
