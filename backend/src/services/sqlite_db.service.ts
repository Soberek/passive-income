import SqliteDatabase from "better-sqlite3";

import path from "path";

const DB_PATH = path.resolve(__dirname, "../../sqliteDb.db");

import type { DatabaseI } from "../types/database.type";

export class SqliteDbService implements DatabaseI {
  private static instance: SqliteDbService | null = null;
  private db: SqliteDatabase.Database;

  private constructor(dbPath: string) {
    this.db = new SqliteDatabase(dbPath);
  }

  public static getInstance(): SqliteDbService {
    if (!this.instance) {
      this.instance = new SqliteDbService(DB_PATH);
    }
    return this.instance;
  }

  getDb() {
    return this.db;
  }
  close() {
    this.db.close();
  }
  transaction<T>(callback: () => Promise<T> | T): Promise<T> {
    const result = this.db.transaction(callback)();
    return Promise.resolve(result);
  }
}

export default SqliteDbService;
