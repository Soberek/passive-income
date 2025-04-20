import sqliteDbService from "./sqliteDbService";

// TODO: Add institution type foreign key
//  id_institution_type INTEGER NOT NULL,
//  FOREIGN KEY (id_institution_type) REFERENCES institution_type(id_institution_type)

// Model for the Institution
// This interface defines the structure of an institution object.
export interface Institution {
  idInstitution: number;
  name: string;
  address?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  municipality?: string;
}

// This class is responsible for managing institutions in the database.
class InstitutionsService {
  private dbService: sqliteDbService;

  constructor() {
    this.dbService = sqliteDbService.getInstance();
  }

  createInstitutionTable() {
    const stmt = this.dbService.prepare(`
      CREATE TABLE institutions ( 
        id_institution INTEGER PRIMARY KEY AUTOINCREMENT,
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
    website?: string,
    municipality?: string
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

export { InstitutionsService };
