import fs from "fs";
import path from "path";
import { DatabaseI } from "../types/database.type";
import bettersqlite from "better-sqlite3";

// import sqlitedb.sql
const sqlFilePath = path.join(__dirname, "sqlitedb.sql");
const sqlScript = fs.readFileSync(sqlFilePath, "utf8");

// check if the file exists
if (!fs.existsSync(sqlFilePath)) {
  console.error(`SQL file not found: ${sqlFilePath}`);
  process.exit(1);
}

class Migration {
  public async migrate(db: DatabaseI<bettersqlite.Database>) {
    console.log("Starting database migration...");
    try {
      db.transaction(() => {
        db.getDb().exec(sqlScript);
      });
      console.log("Database migration completed successfully.");
    } catch (error) {
      console.error("Error executing SQL script:", error instanceof Error ? error.message : String(error));
    }
  }
}

export default Migration;
