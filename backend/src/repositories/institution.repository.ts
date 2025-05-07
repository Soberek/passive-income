import sqliteDbService from "../services/sqliteDbService";
import { Institution, CreateInstitutionDto, UpdateInstitutionDto } from "../../../shared/types";

export class InstitutionRepository {
  private dbService: sqliteDbService;

  constructor() {
    this.dbService = sqliteDbService.getInstance();
  }

  createInstitutionTable = () => {
    const stmt = this.dbService.prepare(`
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
    const stmt = this.dbService.prepare(`
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

  addInstitution = (input: CreateInstitutionDto): { newInstitutionId: number | BigInt } | null => {
    const { name, address, postalCode, city, phone, email, municipality } = input;

    // Check if the required fields are provided
    if (!name || !address || !postalCode || !city) {
      console.error("Missing required fields");
      return null;
    }

    const stmt = this.dbService.prepare(
      `INSERT INTO institutions (name, address, postal_code, city, phone, email, municipality) VALUES (?, ?, ?, ?, ?, ?, ?)`
    );

    // Check if the statement was prepared successfully
    // and handle the error if it wasn't
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }
    // Execute the statement with the provided parameters
    const result = stmt.run(name, address, postalCode, city, phone, email, municipality);
    // Check if the execution was successful
    if (result.changes > 0) {
      console.log("Institution added successfully");
      return { newInstitutionId: result.lastInsertRowid }; // Return the ID of the newly inserted row
    }
    // If the execution failed, log an error message
    console.error("Error adding institution");
    return null; // Return null to indicate failure
  };

  getInstitutionById = (id: Institution["institutionId"]): Institution | null => {
    const stmt = this.dbService.prepare("SELECT * FROM institutions WHERE institution_id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }
    const institution = stmt.get(id) as Institution;
    return institution || null;
  };

  deleteInstitution = (id: Institution["institutionId"]): boolean => {
    const stmt = this.dbService.prepare("DELETE FROM institutions WHERE institution_id = ?");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    const info = stmt.run(id);
    return info.changes > 0;
  };

  updateInstitution = (id: Institution["institutionId"], input: UpdateInstitutionDto): boolean => {
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

    const stmt = this.dbService.prepare(sql);
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return false;
    }
    const info = stmt.run(...valuesToUpdate);
    return info.changes > 0;
  };
}
