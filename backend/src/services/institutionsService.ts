/*
Table institutions {
  institution_id integer [primary key]
  name varchar(200) [not null]
  address varchar(255)
  postal_code varchar(10)
  city varchar(100)
  phone varchar(20)
  email varchar(100)
  website varchar(255)
}
*/
import sqliteDbService from "./sqliteDbService";

interface Institution {
  institution_id: number;
  name: string;
  address?: string;
  postal_code?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
}
class InstitutionsService {
  private dbService: sqliteDbService;

  constructor(dbService: sqliteDbService) {
    this.dbService = dbService;
  }

  getAllInstitutions(): Institution[] {
    const stmt = this.dbService.prepare("SELECT * FROM institutions");
    if (!stmt) {
      console.error("Error preparing SQL statement");
      return [];
    }

    return stmt.all() as Institution[];
  }
}

export default InstitutionsService;
