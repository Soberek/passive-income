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

class sqliteDbService {
  private db: betterSqlite3.Database;
  public static instance: sqliteDbService;

  // The constructor takes an object with a dbPath property, which is the path to the SQLite database file.
  // constructor is a special method for creating and initializing an object created with a class.
  constructor(params: { dbPath: string }) {
    this.db = betterSqlite3(params.dbPath);
    this.init();
  }

  // zwraca instancję sqliteDbService
  // singleton pattern zeby nie tworzyc nowej instancji za kazdym razem
  // bede przekazywal do kazdego service czy kontrolera
  public static getInstance(): sqliteDbService {
    if (!sqliteDbService.instance) {
      sqliteDbService.instance = new sqliteDbService({ dbPath: "./sqliteDb.db" });
    }
    return sqliteDbService.instance;
  }

  // tworzenie tabeli w bazie danych, jezeli nie istnieje
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

  prepare(sql: string) {
    try {
      const stmt = this.db.prepare(sql);
      return stmt;
    } catch (error) {
      console.error("Error preparing SQL statement:", error);
      return null;
    }
  }

  // zwraca wszystkie rekordy z tabeli o podanej nazwie
  // getTable
  getTable(tableName: string): School[] | [] {
    try {
      const stmt = this.db.prepare(`SELECT * FROM ${tableName}`);
      return stmt.all() as School[] | [];
    } catch (error) {
      console.error(`Error fetching all records from ${tableName}:`, error);
      return [];
    }
  }
}

export default sqliteDbService;
