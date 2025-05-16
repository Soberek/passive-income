import sqliteDbService from "../services/sqliteDbService";
import { Program } from "../../../shared/types";
import { RepositoryI } from "../types/repositories.type";

interface ProgramRepositoryI extends RepositoryI<Program> {}

export class ProgramRepository implements ProgramRepositoryI {
  private dbService: sqliteDbService;

  constructor() {
    this.dbService = sqliteDbService.getInstance();
  }

  getAll = (): Program[] => {
    const stmt = this.dbService.prepare(
      "SELECT program_id as programId, name, description, program_type as programType FROM programs"
    );
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return [];
    }
    return stmt.all() as Program[];
  };

  getById = (id: number): Program | null => {
    const stmt = this.dbService.prepare(
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
    const stmt = this.dbService.prepare("INSERT INTO program (name, description, program_type) VALUES (?, ?, ?)");
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

  delete = (id: number): boolean => {
    const stmt = this.dbService.prepare("DELETE FROM programs WHERE program_id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    const info = stmt.run(id);
    return info.changes > 0;
  };

  update = (id: number, entity: Partial<Program>): boolean => {
    const { name, description, programType } = entity;
    const stmt = this.dbService.prepare(
      "UPDATE programs SET name = ?, description = ?, program_type = ? WHERE program_id = ?"
    );
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    const info = stmt.run(name, description, programType, id);
    return info.changes > 0;
  };
}
