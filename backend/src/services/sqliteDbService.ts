import betterSqlite3 from "better-sqlite3";
// import { v4 as uuidv4 } from "uuid";

class sqliteDbService {
  private db: betterSqlite3.Database;
  private static instance: sqliteDbService;

  // The constructor takes an object with a dbPath property, which is the path to the SQLite database file.
  // constructor is a special method for creating and initializing an object created with a class.
  private constructor(params: { dbPath: string }) {
    this.db = betterSqlite3(params.dbPath, {
      timeout: 5000,
    });
  }

  // zwraca instancję sqliteDbService
  // singleton pattern zeby nie tworzyc nowej instancji za kazdym razem
  // bede przekazywal do kazdego service czy kontrolera
  public static getInstance = (): sqliteDbService => {
    if (!sqliteDbService.instance) {
      sqliteDbService.instance = new sqliteDbService({
        dbPath: "./sqliteDb.db",
      });
    }
    return sqliteDbService.instance;
  };

  prepare = (sql: string) => {
    try {
      const stmt = this.db.prepare(sql);
      return stmt;
    } catch (error) {
      throw new Error(`Error preparing SQL statement: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // zwraca wszystkie rekordy z tabeli o podanej nazwie
  // getTable
  getTable = <T>(tableName: string): T[] => {
    try {
      const stmt = this.db.prepare(`SELECT * FROM ${tableName}`);
      return stmt.all() as T[];
    } catch (error) {
      throw new Error(
        `Error fetching records from ${tableName}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  close = () => {
    try {
      this.db.close();
    } catch (error) {
      throw new Error(`Error closing database connection: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  getDb = () => {
    return this.db;
  };

  transaction = (callback: () => void) => {
    try {
      const transaction = this.db.transaction(callback);
      transaction();
    } catch (error) {
      throw new Error(`Error executing transaction: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
}

export default sqliteDbService;
