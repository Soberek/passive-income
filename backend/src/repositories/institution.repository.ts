import sqliteDbService from "../services/sqliteDbService";
import { Institution } from "../../../shared/types";

export class InstitutionRepository {
  private dbService: sqliteDbService;

  constructor() {
    this.dbService = sqliteDbService.getInstance();
  }

  createInstitutionTable = () => {
    const stmt = this.dbService.prepare(`
      CREATE TABLE institutions ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL, 
        address TEXT NOT NULL, 
        city TEXT NOT NULL, 
        postal_code TEXT NOT NULL,
        phone TEXT, 
        email TEXT, 
        website TEXT, 
        municipality TEXT,
      );
    `);

    // Check if the statement was prepared successfully
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

  getAllInstitutions = (): Institution[] => {
    const stmt = this.dbService.prepare("SELECT * FROM institutions");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return [];
    }

    return stmt.all() as Institution[];
  };

  addInstitution = (input: Omit<Institution, "id">): { newInstitutionId: number | bigint } | null => {
    const { name, address, postalCode, city, phone, email, website, municipality } = input;

    // Check if the required fields are provided
    if (!name || !address || !postalCode || !city) {
      console.error("Missing required fields");
      return null;
    }
    const stmt = this.dbService.prepare(
      "INSERT INTO institutions (name, address, postal_code, city, phone, email, website, municipality) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    // Check if the statement was prepared successfully
    // and handle the error if it wasn't
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }
    // Execute the statement with the provided parameters
    const result = stmt.run(name, address, postalCode, city, phone, email, website, municipality);
    // Check if the execution was successful
    if (result.changes > 0) {
      console.log("Institution added successfully");
      return { newInstitutionId: result.lastInsertRowid }; // Return the ID of the newly inserted row
    }
    // If the execution failed, log an error message
    console.error("Error adding institution");
    return null; // Return null to indicate failure
  };

  getInstitutionById = (id: number | BigInt): Institution | null => {
    const stmt = this.dbService.prepare("SELECT * FROM institutions WHERE id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }
    const institution = stmt.get(id) as Institution;
    return institution || null;
  };

  deleteInstitution = (id: number): boolean => {
    const stmt = this.dbService.prepare("DELETE FROM institutions WHERE id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    const info = stmt.run(id);
    return info.changes > 0;
  };

  updateInstitution = (id: number, input: Omit<Institution, "id">): boolean => {
    const { name, address, postalCode, city, phone, email, website, municipality } = input;
    const stmt = this.dbService.prepare(
      "UPDATE institutions SET name = ?, address = ?, postal_code = ?, city = ?, phone = ?, email = ?, website = ?, municipality = ? WHERE id = ?"
    );
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    const info = stmt.run(name, address, postalCode, city, phone, email, website, municipality, id);
    return info.changes > 0;
  };
}
