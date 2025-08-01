import { Institution } from "./institution.schema";
import { InstitutionRepository } from "./institution.repository";
import { CreatableServiceI, ReadableServiceI, UpdatableServiceI, DeletableServiceI } from "../../types/index.type";

import { institutionSchema, institutionCreateSchema, institutionUpdateSchema } from "./institution.schema";
class InstitutionsService
  implements
    CreatableServiceI<Institution, "institutionId", number>,
    ReadableServiceI<Institution, "institutionId", number>,
    UpdatableServiceI<Institution, "institutionId", number>,
    DeletableServiceI<Institution, "institutionId", number>
{
  constructor(private institutionRepository: InstitutionRepository) {
    this.institutionRepository = institutionRepository;
  }

  // Fetches all institutions from the database.
  getAll = () => {
    const institutions = this.institutionRepository.getAll();
    if (!institutions || institutions.length === 0) {
      throw new Error("Error fetching all institutions");
    }
    return institutions;
  };

  getById = (id: Institution["institutionId"]) => {
    const validation = institutionSchema.shape.institutionId.safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid institution ID " + JSON.stringify(validation.error.issues));
    }
    const institution = this.institutionRepository.getById(id);
    if (!institution) {
      throw new Error("Institution not found or invalid ID");
    }
    return institution;
  };

  // Adds a new institution to the database.
  add = (entity: Omit<Institution, "institutionId">) => {
    const validation = institutionCreateSchema.safeParse(entity);
    if (!validation.success) {
      console.error("Validation failed:", validation.error);
      const errors = validation.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      throw new Error("Invalid data: " + errors.join(", "));
    }
    const result = this.institutionRepository.add(entity);
    if (!result) {
      throw new Error("Error adding institution");
    }
    return Number(result);
  };

  delete = (id: Institution["institutionId"]) => {
    const validation = institutionSchema.shape.institutionId.safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid institution ID " + JSON.stringify(validation.error.issues));
    }
    const result = this.institutionRepository.delete(id);

    // result is null if the institution was not found
    if (!result) {
      throw new Error("Error deleting institution");
    }
    return true;
  };

  update = (id: Institution["institutionId"], entity: Partial<Institution>) => {
    const entityValidation = institutionSchema.partial().safeParse(entity);
    const idValidation = institutionSchema.shape.institutionId.safeParse(id);
    if (!idValidation.success) {
      throw new Error("Invalid institution ID " + JSON.stringify(idValidation.error.issues));
    }
    if (!entityValidation.success) {
      const errors = entityValidation.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      throw new Error("Invalid data: " + errors.join(", "));
    }

    const result = this.institutionRepository.update(id, entity);
    if (!result) {
      throw new Error("Error updating institution");
    }
    return true;
  };
}

export { InstitutionsService };
