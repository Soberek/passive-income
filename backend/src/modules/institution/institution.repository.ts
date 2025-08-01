import SqliteDbService from "../../database/sqlite_db.service";
import { Institution } from "./institution.schema";

import type {
  CreatableIRepositoryI,
  ReadableRepositoryI,
  UpdatableRepositoryI,
  DeletableRepositoryI,
} from "../../types/index.type";

interface InstitutionRepositoryI
  extends CreatableIRepositoryI<Institution, "institutionId">,
    ReadableRepositoryI<Institution, "institutionId">,
    UpdatableRepositoryI<Institution, "institutionId">,
    DeletableRepositoryI<Institution, "institutionId"> {
  // addSchoolInstitution: (entity: Partial<Institution>) => number | null;
}
export class InstitutionRepository implements InstitutionRepositoryI {
  private dbService: SqliteDbService;

  constructor(dbService: SqliteDbService) {
    this.dbService = dbService;
    // this.dbService = sqliteDbService.getInstance();
  }

  createInstitutionTable = () => {
    const stmt = this.dbService.getDb().prepare(`
     CREATE TABLE institutions (
        institution_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT,
        postal_code TEXT,
        municipality TEXT,
        city TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        email TEXT,
        phone TEXT
    );
    `);

    // Check if the statement was getDb().prepared successfully
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return;
    }

    const info = stmt.run();

    if (info.lastInsertRowid) {
      console.log("Created institutions table with id: ", info.lastInsertRowid);
    } else {
      console.error("Error creating institutions table");
    }
  };

  getAll = (): Institution[] | [] => {
    const stmt = this.dbService.getDb().prepare(`
      SELECT 
        institution_id as institutionId, 
        name, 
        address, 
        postal_code as postalCode, 
        municipality, 
        city, 
        created_at as createdAt, 
        email, 
        phone 
      FROM institutions
    `);
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return [];
    }

    return stmt.all() as Institution[];
  };

  add = (entity: Partial<Institution>): number | null => {
    const { name, address, postalCode, municipality, city, email, phone } = entity;
    const stmt = this.dbService
      .getDb()
      .prepare(
        "INSERT INTO institutions (name, address, postal_code, municipality, city, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?)"
      );

    // Check if the statement was getDb().prepared successfully
    // and handle the error if it wasn't
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }
    const result = stmt.run(name, address, postalCode, municipality, city, email, phone);
    if (result.changes > 0) {
      return Number(result.lastInsertRowid); // Return the ID of the newly inserted row
    }
    return null; // Return null to indicate failure
  };

  getById = (id: Institution["institutionId"]): Institution | null => {
    const stmt = this.dbService.getDb().prepare("SELECT * FROM institutions WHERE institution_id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }

    const institution = stmt.get(id) as Institution;
    return institution || null;
  };

  delete = (id: Institution["institutionId"]): boolean => {
    const stmt = this.dbService.getDb().prepare("DELETE FROM institutions WHERE institution_id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    const info = stmt.run(id);
    return info.changes > 0;
  };

  update = (id: Institution["institutionId"], input: Partial<Institution>): boolean => {
    const fieldsToUpdate: string[] = [];
    const valuesToUpdate: any[] = [];

    // Only add fields that are defined in the input
    if (input.name !== undefined) {
      fieldsToUpdate.push("name = ?");
      valuesToUpdate.push(input.name);
    }

    if (input.address !== undefined) {
      fieldsToUpdate.push("address = ?");
      valuesToUpdate.push(input.address);
    }

    if (input.postalCode !== undefined) {
      fieldsToUpdate.push("postal_code = ?");
      valuesToUpdate.push(input.postalCode);
    }

    if (input.city !== undefined) {
      fieldsToUpdate.push("city = ?");
      valuesToUpdate.push(input.city);
    }

    if (input.phone !== undefined) {
      fieldsToUpdate.push("phone = ?");
      valuesToUpdate.push(input.phone);
    }

    if (input.email !== undefined) {
      fieldsToUpdate.push("email = ?");
      valuesToUpdate.push(input.email);
    }

    if (input.municipality !== undefined) {
      fieldsToUpdate.push("municipality = ?");
      valuesToUpdate.push(input.municipality);
    }

    // If no fields to update, return early
    if (fieldsToUpdate.length === 0) {
      console.warn("No fields to update provided");
      return false;
    }

    // Build the SQL query dynamically
    const sql = `UPDATE institutions SET ${fieldsToUpdate.join(", ")} WHERE institution_id = ?`;

    // Add the ID to the values array
    valuesToUpdate.push(id);

    const stmt = this.dbService.getDb().prepare(sql);
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    const info = stmt.run(...valuesToUpdate);
    return info.changes > 0;
  };
}
