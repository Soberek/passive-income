import sqliteDbService from "../services/sqliteDbService";
import { Program } from "../../../shared/types";

export class ProgramRepository {
  private dbService: sqliteDbService;

  constructor() {
    this.dbService = sqliteDbService.getInstance();
  }

  getAllPrograms = (): Program[] => {
    const stmt = this.dbService.prepare("SELECT * FROM program");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return [];
    }
    return stmt.all() as Program[];
  };

  getProgramById = (id: number): Program | null => {
    const stmt = this.dbService.prepare("SELECT * FROM program WHERE id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }
    const program = stmt.get(id) as Program;
    return program || null;
  };

  addProgram = (input: Omit<Program, "id">): number => {
    const { name, description, programType } = input;
    const stmt = this.dbService.prepare("INSERT INTO program (name, description, programType) VALUES (?, ?, ?)");
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

  deleteProgram = (id: number): boolean => {
    const stmt = this.dbService.prepare("DELETE FROM program WHERE id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    const info = stmt.run(id);
    return info.changes > 0;
  };

  updateProgram = (id: number, input: Omit<Program, "id">): boolean => {
    const { name, description, programType } = input;
    const stmt = this.dbService.prepare("UPDATE program SET name = ?, description = ?, programType = ? WHERE id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    const info = stmt.run(name, description, programType, id);
    return info.changes > 0;
  };
}
