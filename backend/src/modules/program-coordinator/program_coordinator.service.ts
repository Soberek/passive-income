import { CreatableServiceI, ReadableServiceI } from "../../types/index.type";
import { ProgramCoordinatorRepository } from "./program_coordinator.repository";

import type { ProgramCoordinatorType, ProgramCoordinatorCreateType } from "./program_coordinator.schema";
import { ProgramCoordinatorSchema, programCoordinatorCreateSchema } from "./program_coordinator.schema";

export class ProgramCoordinatorService
  implements
    ReadableServiceI<ProgramCoordinatorType, "coordinatorId">,
    CreatableServiceI<ProgramCoordinatorType, "coordinatorId">
{
  constructor(private programCoordinatorRepository: ProgramCoordinatorRepository) {}

  getAll = () => {
    return this.programCoordinatorRepository.getAll();
  };

  getById = (id: number) => {
    return this.programCoordinatorRepository.getById(id);
  };

  add = (item: ProgramCoordinatorCreateType) => {
    try {
      const validate = programCoordinatorCreateSchema.safeParse(item);
      if (!validate.success) {
        console.error("Validation error:", validate.error);
        throw new Error("Invalid data provided for Program Coordinator creation.");
      }
      return this.programCoordinatorRepository.add(item);
    } catch (error) {
      console.error("Error adding program coordinator:", error);
      throw new Error("Failed to add program coordinator.");
    }
  };
}
