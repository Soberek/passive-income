import { InstitutionRepository } from "../repositories/institution.repository";

// TODO: Add institution type foreign key
//  id_institution_type INTEGER NOT NULL,
//  FOREIGN KEY (id_institution_type) REFERENCES institution_type(id_institution_type)

// Model for the Institution
// This interface defines the structure of an institution object.
import { CreateInstitutionDto } from "../../../shared/types";

// This class is responsible for managing institutions in the database.
class InstitutionsService {
  constructor(private institutionRepository: InstitutionRepository) {
    this.institutionRepository = institutionRepository;
  }

  // Fetches all institutions from the database.
  getAllInstitutions = () => {
    const institutions = this.institutionRepository.getAll();
    if (!institutions) {
      throw new Error("Error fetching all institutions");
    }
    return institutions;
  };

  // Adds a new institution to the database.
  addInstitution = (input: CreateInstitutionDto) => {
    if (!input.name || !input.address || !input.postalCode || !input.city) {
      throw new Error("Missing required fields");
    }

    const institutionId = this.institutionRepository.add(input);
    if (!institutionId || institutionId === -1) {
      throw new Error("Error adding institution");
    }
    return institutionId;
  };

  // Deletes an institution from the database.
  deleteInstitution = (id: number) => {
    const result = this.institutionRepository.delete(id);

    // result is null if the institution was not found
    if (!result) {
      throw new Error("Error deleting institution");
    }
    return true;
  };
}

export { InstitutionsService };
