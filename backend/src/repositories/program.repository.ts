import sqliteDbService from "../services/sqliteDbService";
import { CreateProgramDto, Program, UpdateProgramDto } from "../../../shared/types";

export class ProgramRepository {
  private dbService: sqliteDbService;

  constructor() {
    this.dbService = sqliteDbService.getInstance();
  }

  getAllPrograms = (): Program[] => {
    const stmt = this.dbService.prepare(
      "SELECT program_id as programId, name, description, program_type as programType FROM programs"
    );
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return [];
    }
    return stmt.all() as Program[];
  };

  getProgramById = (id: number): Program | null => {
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

  addProgram = (input: CreateProgramDto): number => {
    const { name, description, programType } = input;
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

  deleteProgram = (id: number): boolean => {
    const stmt = this.dbService.prepare("DELETE FROM programs WHERE program_id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    const info = stmt.run(id);
    return info.changes > 0;
  };

  updateProgram = (id: number, input: UpdateProgramDto): boolean => {
    const { name, description, programType } = input;
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
