import { InstitutionRepository } from "../repositories/institution.repository";

// TODO: Add institution type foreign key
//  id_institution_type INTEGER NOT NULL,
//  FOREIGN KEY (id_institution_type) REFERENCES institution_type(id_institution_type)

// Model for the Institution
// This interface defines the structure of an institution object.
import { Institution } from "../../../shared/types";

// This class is responsible for managing institutions in the database.
class InstitutionsService {
  constructor(private institutionRepository: InstitutionRepository) {
    this.institutionRepository = institutionRepository;
  }

  // Fetches all institutions from the database.
  getAllInstitutions = () => {
    const institutions = this.institutionRepository.getAllInstitutions();
    if (!institutions) {
      console.error("Error fetching all institutions");
      return [];
    }
    return institutions;
  };

  // Adds a new institution to the database.
  addInstitution = (input: Omit<Institution, "id">) => {
    const { name, address, postalCode, city, phone, email, website, municipality } = input;

    // Check if the required fields are provided
    if (!name || !address || !postalCode || !city) {
      console.error("Missing required fields");
      return null;
    }

    const institutionId = this.institutionRepository.addInstitution(input);
    if (!institutionId || institutionId.newInstitutionId === -1) {
      console.error("Error adding institution");
      return -1;
    }
    return institutionId;
  };

  // Deletes an institution from the database.
  deleteInstitution = (id: number) => {
    const result = this.institutionRepository.deleteInstitution(id);
    if (!result) {
      console.error("Error deleting institution");
      return false;
    }
    return true;
  };
}

export { InstitutionsService };
