import { Institution } from "../../../shared/types";
import { InstitutionRepository } from "../repositories/institution.repository";
import { ServiceI } from "../types/index.type";

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
    if (!result) {
      throw new Error("Error adding institution");
    }
    return Number(result);
  };

  delete = (id: Institution["institutionId"]) => {
    const result = this.institutionRepository.delete(id);

    // result is null if the institution was not found
    if (!result) {
      throw new Error("Error deleting institution");
    }
    return true;
  };

  update = (id: Institution["institutionId"], input: Partial<Institution>) => {
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
