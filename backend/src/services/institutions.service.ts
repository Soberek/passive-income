import { Institution } from "../../../shared/types";
import { InstitutionRepository } from "../repositories/institution.repository";
import { ServiceI } from "../types/index.type";

// TODO: Add institution type foreign key
//  id_institution_type INTEGER NOT NULL,
//  FOREIGN KEY (id_institution_type) REFERENCES institution_type(id_institution_type)

// Model for the Institution
// This interface defines the structure of an institution object.

// This class is responsible for managing institutions in the database.

class InstitutionsService implements ServiceI<Institution, "institutionId", number> {
  constructor(private institutionRepository: InstitutionRepository) {
    this.institutionRepository = institutionRepository;
  }

  // Fetches all institutions from the database.
  getAll = () => {
    const institutions = this.institutionRepository.getAll();
    if (!institutions) {
      throw new Error("Error fetching all institutions");
    }
    return institutions;
  };

  getById = (id: number) => {
    const institution = this.institutionRepository.getById(id);
    if (!institution) {
      throw new Error("Institution not found or invalid ID");
    }
    return institution;
  };

  // Adds a new institution to the database.
  add = (entity: Omit<Institution, "institutionId">) => {
    if (!entity.name || !entity.address || !entity.postalCode || !entity.city) {
      throw new Error("Missing required fields");
    }
    const result = this.institutionRepository.add(entity);
    if (typeof result === "bigint") {
      return Number(result);
    }
    return result;
  };

  delete = (id: number | BigInt) => {
    const result = this.institutionRepository.delete(id);

    // result is null if the institution was not found
    if (!result) {
      throw new Error("Error deleting institution");
    }
    return true;
  };

  update = (id: number, input: Partial<Institution>) => {
    if (!input.name || !input.address || !input.postalCode || !input.city) {
      throw new Error("Missing required fields");
    }

    const result = this.institutionRepository.update(id, input);
    if (!result) {
      throw new Error("Error updating institution");
    }
    return true;
  };
}

export { InstitutionsService };
