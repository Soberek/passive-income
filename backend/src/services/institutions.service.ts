import { InstitutionRepository } from "../repositories/institution.repository";

// TODO: Add institution type foreign key
//  id_institution_type INTEGER NOT NULL,
//  FOREIGN KEY (id_institution_type) REFERENCES institution_type(id_institution_type)

// Model for the Institution
// This interface defines the structure of an institution object.
import { CreateInstitutionDto, Institution } from "../../../shared/types";

// This class is responsible for managing institutions in the database.
class InstitutionsService {
  constructor(private institutionRepository: InstitutionRepository) {
    this.institutionRepository = institutionRepository;
  }

  // Fetches all institutions from the database.
  getAllInstitutions = () => {
    const institutions = this.institutionRepository.getAllInstitutions();
    if (!institutions) {
      throw new Error("Error fetching all institutions");
    }
    return institutions;
  };

  // Adds a new institution to the database.
  addInstitution = (input: CreateInstitutionDto) => {
    const { name, address, postalCode, city, phone, email, municipality } = input;

    // Check if the required fields are provided
    if (!name || !address || !postalCode || !city) {
      throw new Error("Missing required fields");
    }

    const institutionId = this.institutionRepository.addInstitution(input);
    if (!institutionId || institutionId.newInstitutionId === -1) {
      throw new Error("Error adding institution");
    }
    return institutionId;
  };

  // Deletes an institution from the database.
  deleteInstitution = (id: number) => {
    const result = this.institutionRepository.deleteInstitution(id);

    // result is null if the institution was not found
    if (!result) {
      throw new Error("Error deleting institution");
    }
    return true;
  };
}

export { InstitutionsService };
