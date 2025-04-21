import betterSqlite3 from "better-sqlite3";
// import { v4 as uuidv4 } from "uuid";

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
      sqliteDbService.instance = new sqliteDbService({
        dbPath: "./sqliteDb.db",
      });
    }
    return sqliteDbService.instance;
  }

  // tworzenie tabeli w bazie danych, jezeli nie istnieje
  init() {}

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
  getTable<T>(tableName: string): T[] {
    try {
      const stmt = this.db.prepare(`SELECT * FROM ${tableName}`);
      return stmt.all() as T[];
    } catch (error) {
      console.error(`Error fetching all records from ${tableName}:`, error);
      return [];
    }
  }
}

export default sqliteDbService;
