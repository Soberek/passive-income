import betterSqlite3 from "better-sqlite3";

interface School {
  id?: number;
  name: string;
  address?: string;
  phone?: string;
}

interface Izrz {
  program_id: number;
  school_id: number;
}

class sqliteDbService {
  private db: betterSqlite3.Database;

  // The constructor takes an object with a dbPath property, which is the path to the SQLite database file.
  constructor(params: { dbPath: string }) {
    this.db = betterSqlite3(params.dbPath);
    this.init();
  }

  init() {
    this.db.exec(`
        CREATE TABLE IF NOT EXISTS schools (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT,
        phone TEXT
      );`);
  }

  getAll(tableName: string): any[] {
    try {
      const stmt = this.db.prepare(`SELECT * FROM ${tableName}`);
      return stmt.all();
    } catch (error) {
      console.error(`Error fetching all records from ${tableName}:`, error);
      return [];
    }
  }

  insertSchool(school: School) {
    try {
      const stmt = this.db.prepare(`INSERT INTO schools (name, address, phone) VALUES (?, ?, ?)`);
      const info = stmt.run(school.name, school.address, school.phone);
      return info.lastInsertRowid;
    } catch (error) {
      console.error("Error inserting school:", error);
      return null;
    }
  }
}

export default sqliteDbService;
