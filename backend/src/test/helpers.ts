import { DatabaseI } from "../types/database.type";
import bettersqlite from "better-sqlite3";
export function insertInstitution(db: DatabaseI<bettersqlite.Database>, id: number) {
  // Check if the database is initialized
  if (!db || !db.prepare) {
    throw new Error("Database not initialized");
  }
  db.prepare(
    `INSERT INTO institutions (
        institution_id, name, address, postal_code, municipality, city, email, phone
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    "Instytucja " + id,
    "ul. Testowa " + id,
    "00-00" + id,
    "Gmina " + id,
    "Miasto " + id,
    `test${id}@example.com`,
    `1234567${id}`
  );
}

// CREATE TABLE programs (
//     program_id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     description TEXT,
//     program_type TEXT NOT NULL CHECK (program_type IN ('programowy', 'nieprogramowy'))
// );

export function insertProgram(db: DatabaseI<bettersqlite.Database>, id: number) {
  // Check if the database is initialized
  if (!db || !db.prepare) {
    throw new Error("Database not initialized");
  }
  db.prepare(
    `INSERT INTO programs (
        program_id, name, description, program_type
      ) VALUES (?, ?, ?, ?)`
  ).run(id, "Program " + id, "Opis programu " + id, id % 2 === 0 ? "programowy" : "nieprogramowy");
}

export function insertMediaPlatform(db: DatabaseI<bettersqlite.Database>, id: number) {
  // Check if the database is initialized
  if (!db || !db.prepare) {
    throw new Error("Database not initialized");
  }
  db.prepare(
    `INSERT INTO media_platforms (
        media_platform_id, name
      ) VALUES (?, ?)`
  ).run(id, "Media Platform " + id);
}

// CREATE TABLE action_types (
//     action_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL UNIQUE
// );

export function insertActionType(db: DatabaseI<bettersqlite.Database>, id: number) {
  // Check if the database is initialized
  if (!db || !db.prepare) {
    throw new Error("Database not initialized");
  }
  db.prepare(
    `INSERT INTO action_types (
        action_type_id, name
      ) VALUES (?, ?)`
  ).run(id, "Action Type " + id);
}
