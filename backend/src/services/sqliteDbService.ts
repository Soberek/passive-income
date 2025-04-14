import betterSqlite3 from "better-sqlite3";
// import { v4 as uuidv4 } from "uuid";
interface School {
  id: number;
  name: string;
  address?: string;
  phone?: string;
}

const schools: School[] = [
  { id: 1, name: "School A", address: "123 Main St", phone: "555-1234" },
  { id: 2, name: "School B", address: "456 Elm St", phone: "555-5678" },
  { id: 3, name: "School C", address: "789 Oak St", phone: "555-8765" },
  { id: 4, name: "School D", address: "101 Pine St", phone: "555-4321" },
  { id: 5, name: "School E", address: "202 Maple St", phone: "555-6789" },
];

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
    this.insertSchoolsIfNotExists();
  }

  init() {
    try {
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS schools (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        address TEXT,
        phone TEXT
      );`);
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  }

  getAll(tableName: string): School[] | [] {
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
      const stmt = this.db.prepare(`INSERT INTO schools (id, name, address, phone) VALUES (?, ?, ?, ?)`);
      const info = stmt.run(school.id, school.name, school.address, school.phone);
      return info.lastInsertRowid;
    } catch (error) {
      console.error("Error inserting school:", error);
      return null;
    }
  }

  deleteSchool(id: number) {
    try {
      const stmt = this.db.prepare("DELETE FROM schools WHERE id = ?");
      const info = stmt.run(id);
      if (info.changes > 0) {
        console.log(`Deleted school with id ${id}`);
      }
    } catch (error) {
      console.error("Error deleting school:", error);
    }
  }

  insertSchoolsIfNotExists() {
    try {
      const existingSchools = this.getAll("schools");
      const existingSchoolNames = new Set(existingSchools.map((school) => school.id));

      schools.forEach((school) => {
        if (!existingSchoolNames.has(school.id)) {
          this.insertSchool(school);
        }
      });
    } catch (error) {
      console.error("Error inserting schools:", error);
    }
  }
}

export default sqliteDbService;
