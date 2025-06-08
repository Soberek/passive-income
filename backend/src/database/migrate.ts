import fs from "fs";
import path from "path";
import SqliteDbService from "../services/sqlite_db.service";

// import sqlitedb.sql
const sqlFilePath = path.join(__dirname, "sqlitedb.sql");
const sqlScript = fs.readFileSync(sqlFilePath, "utf8");

// check if the file exists
if (!fs.existsSync(sqlFilePath)) {
  console.error(`SQL file not found: ${sqlFilePath}`);
  process.exit(1);
}

const dbService = SqliteDbService.getInstance();

try {
  dbService.transaction(() => {
    dbService.getDb().exec(sqlScript);
  });
  console.log("Database migration completed successfully.");
  process.exit(0);
} catch (error) {
  console.error("Error executing SQL script:", error instanceof Error ? error.message : String(error));
  process.exit(1);
}
