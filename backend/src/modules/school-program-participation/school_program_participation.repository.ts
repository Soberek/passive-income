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
        `SELECT 
        -- Program Coordinator Details
         pc.coordinator_id as coordinatorId,
         pc.participation_id as participationId,

         
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
         (c.last_name || ' ' || c.first_name) as contactName,
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

  addSchoolProgramParticipationCoordinatorTransaction = (entity: schoolProgramParticipationCreateType) => {
    const transaction = this.dbService.getDb().transaction((entity: schoolProgramParticipationCreateType) => {
      const stmt = this.dbService
        .getDb()
        .prepare("INSERT INTO school_program_participation (school_id, program_id, school_year_id) VALUES (?, ?, ?)");
      if (!stmt) {
        throw new Error("Error preparing SQL statement");
      }
      const info = stmt.run(entity.schoolId, entity.programId, entity.schoolYearId);
      if (!info || info.changes === undefined) {
        throw new Error("Error executing SQL statement");
      }
      const participationId = info.lastInsertRowid as number;

      const stmt2 = this.dbService
        .getDb()
        .prepare("INSERT INTO program_coordinators (participation_id, contact_id) VALUES (?, ?)");

      if (!stmt2) {
        throw new Error("Error preparing SQL statement for coordinators");
      }

      const info2 = stmt2.run(participationId, entity.contactId);

      if (!info2 || info2.changes === undefined) {
        throw new Error("Error executing SQL statement for coordinators");
      }
      return participationId;
    });

    try {
      const result = transaction(entity);
      return result;
    } catch (error) {
      console.error(
        "Error adding school program participations in transaction:",
        error instanceof Error ? error.message : String(error)
      );
    }
  };
}

export default SchoolProgramParticipationRepository;
