import sqliteDbService from "./sqliteDbService";

// Model for the Institution
// This interface defines the structure of an institution object.
interface Institution {
  idInstitution: number;
  name: string;
  idInstitutionType: number;
  address?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  municipality?: string;
}

class InstitutionsService {
  private dbService: sqliteDbService;

  constructor() {
    this.dbService = sqliteDbService.getInstance();
  }

  createInstitutionTable() {
    const stmt = this.dbService.prepare(`
      CREATE TABLE institution ( 
        id_institution INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL, 
        id_institution_type INTEGER NOT NULL, 
        address TEXT NOT NULL, 
        city TEXT NOT NULL, 
        postal_code TEXT NOT NULL,
        phone TEXT, 
        email TEXT, 
        website TEXT, 
        municipality TEXT,
        FOREIGN KEY (id_institution_type) REFERENCES institution_type(id_institution_type) 
      );
    `);

    // Check if the statement was prepared successfully
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return;
    }
    stmt.run();
  }

  getAllInstitutions(): Institution[] {
    const stmt = this.dbService.prepare("SELECT * FROM institutions");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return [];
    }

    return stmt.all() as Institution[];
  }

  addInstitution(
    name: string,
    address?: string,
    postal_code?: string,
    city?: string,
    phone?: string,
    email?: string,
    website?: string
  ) {
    const stmt = this.dbService.prepare(
      "INSERT INTO institutions (name, address, postal_code, city, phone, email, website) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    // Check if the statement was prepared successfully
    // and handle the error if it wasn't
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return null;
    }
    // Execute the statement with the provided parameters
    const result = stmt.run(
      name,
      address,
      postal_code,
      city,
      phone,
      email,
      website
    );
    // Check if the execution was successful
    if (result.changes > 0) {
      console.log("Institution added successfully");
      return result.lastInsertRowid; // Return the ID of the newly inserted row
    }
    // If the execution failed, log an error message
    console.error("Error adding institution");
    return null; // Return null to indicate failure
  }
}

export { InstitutionsService, Institution };
