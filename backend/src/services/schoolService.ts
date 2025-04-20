import sqliteDbService from "./sqliteDbService";

interface School {
  id_institution: number;
  direction: string;
  // foreign key to institution
}

class SchoolService {
  private dbService: sqliteDbService;

  constructor() {
    this.dbService = sqliteDbService.getInstance();
  }

  createSchoolTable() {
    const stmt = this.dbService.prepare(`
            CREATE TABLE school ( 
                id_institution INTEGER PRIMARY KEY AUTOINCREMENT,
                direction TEXT NOT NULL, 
                FOREIGN KEY (id_institution) REFERENCES institutions(id_institution) ON DELETE CASCADE 
            );
        `);

    // Check if the statement was prepared successfully
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return;
    }
    stmt.run();
  }
}
