import betterSqlite3 from "better-sqlite3";
console.log("..", __dirname);

import path from "path";

// how to get current path
const DB_PATH = path.resolve(__dirname, "../../sqliteDb.db");
const DB_PATH_TEST = path.resolve(__dirname, "../../sqliteDbTest.db");

// import { v4 as uuidv4 } from "uuid";

class sqliteDbService {
  private db: betterSqlite3.Database;
  private static instance: sqliteDbService | null = null;

  // The constructor takes an object with a dbPath property, which is the path to the SQLite database file.
  // constructor is a special method for creating and initializing an object created with a class.
  private constructor(params: { dbPath: string; test?: boolean }) {
    this.db = betterSqlite3(params.dbPath, {
      verbose: console.log, // Enable verbose logging for debugging
    });
  }

  // zwraca instancję sqliteDbService
  // singleton pattern zeby nie tworzyc nowej instancji za kazdym razem
  // bede przekazywal do kazdego service czy kontrolera
  public static getInstance = (test: boolean = false): sqliteDbService => {
    const dbPath = test ? DB_PATH_TEST : DB_PATH;

    // Always create a new instance for tests
    if (test) {
      console.log("Creating new instance for test");
      return new sqliteDbService({ dbPath });
    }

    // Use the singleton instance for production
    if (!sqliteDbService.instance) {
      console.log("Creating new instance");
      sqliteDbService.instance = new sqliteDbService({ dbPath });
    }

    return sqliteDbService.instance;
  };

  public static resetInstance = (): void => {
    sqliteDbService.instance = null; // Clear the singleton instance
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

  transaction = <T>(callback: () => T) => {
    try {
      const transaction = this.db.transaction(callback);
      return transaction();
    } catch (error) {
      throw new Error(`Error executing transaction: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
}

export default sqliteDbService;
