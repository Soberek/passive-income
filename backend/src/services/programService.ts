import sqliteDbService from "./sqliteDbService";

interface Program {
  id: number;
  name: string;
  description: string;
  programType: "programowy" | "nieprogramowy";
}

class ProgramService {
  private dbService: sqliteDbService;

  constructor() {
    this.dbService = sqliteDbService.getInstance();
    this.createProgramTable();
  }

  createProgramTable = () => {
    const stmt = this.dbService.prepare(`
        CREATE TABLE IF NOT EXISTS program (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            program_type TEXT NOT NULL CHECK(programType IN ('programowy', 'nieprogramowy'))
        )
        `);

    if (!stmt) {
      console.error("Error preparing SQL statement");
      return;
    }
    stmt.run();
  };

  getPrograms() {
    const stmt = this.dbService.prepare("SELECT * FROM program");

    if (!stmt) {
      console.error("Error preparing stmt");
      return [];
    }

    return stmt.all() as Program[];
  }

  addProgram(
    name: string,
    description: string,
    programType: "programowy" | "nieprogramowy"
  ) {
    const stmt = this.dbService.prepare(
      "INSERT INTO program (name, description, programType) VALUES (?, ?, ?)"
    );

    // Check if the statement was prepared successfully
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }

    // Execute the statement with the provided parameters
    const result = stmt.run(name, description, programType);
    if (!result) {
      console.error("Error executing SQL statement");
      return null;
    }

    return result;
  }
}

export default ProgramService;
