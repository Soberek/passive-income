import SqliteDbService from "../../database/sqlite_db.service";
import type { Program } from "../../../../shared/types";
import type {
  CreatableIRepositoryI,
  ReadableRepositoryI,
  UpdatableRepositoryI,
  DeletableRepositoryI,
} from "../../types/index.type";

interface ProgramRepositoryI
  extends CreatableIRepositoryI<Program, "programId">,
    ReadableRepositoryI<Program, "programId">,
    UpdatableRepositoryI<Program, "programId">,
    DeletableRepositoryI<Program, "programId"> {}

export class ProgramRepository implements ProgramRepositoryI {
  private dbService: SqliteDbService;

  constructor() {
    this.dbService = SqliteDbService.getInstance();
  }

  getAll = (): Program[] => {
    const stmt = this.dbService
      .getDb()
      .prepare(
        "SELECT program_id as programId, name, description, program_type as programType, reference_number as referenceNumber FROM programs"
      );
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return [];
    }
    return stmt.all() as Program[];
  };

  getById = (id: Program["programId"]): Program | null => {
    const stmt = this.dbService
      .getDb()
      .prepare(
        "SELECT program_id as programId, name, description, program_type as programType FROM programs WHERE program_id = ?"
      );
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }
    const program = stmt.get(id) as Program;
    return program || null;
  };

  add = (entity: Partial<Program>): number => {
    const { name, description, programType } = entity;
    const stmt = this.dbService
      .getDb()
      .prepare("INSERT INTO program (name, description, program_type) VALUES (?, ?, ?)");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return -1;
    }
    const info = stmt.run(name, description, programType);
    if (info.lastInsertRowid) {
      return info.lastInsertRowid as number;
    } else {
      console.error("Error inserting program");
      return -1;
    }
  };

  delete = (id: Program["programId"]): boolean => {
    const stmt = this.dbService.getDb().prepare("DELETE FROM programs WHERE program_id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    const info = stmt.run(id);
    return info.changes > 0;
  };

  update = (id: Program["programId"], entity: Partial<Program>): boolean => {
    const { name, description, programType } = entity;
    const stmt = this.dbService
      .getDb()
      .prepare("UPDATE programs SET name = ?, description = ?, program_type = ? WHERE program_id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    const info = stmt.run(name, description, programType, id);
    return info.changes > 0;
  };

  bulkInsert = (programs: Omit<Program, "programId">[]): boolean => {
    const stmt = this.dbService
      .getDb()
      .prepare("INSERT INTO programs (name, description, program_type, reference_number) VALUES (?, ?, ?, ?)");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    try {
      // Use a transaction for bulk insert
      const transaction = this.dbService.transaction(() => {
        for (const program of programs) {
          stmt.run(program.name, program.description, program.programType, program.referenceNumber);
        }
      });

      transaction;
      return true;
    } catch (error) {
      console.error("Error during bulk insert transaction", String(error));
      return false;
    }
  };
}
