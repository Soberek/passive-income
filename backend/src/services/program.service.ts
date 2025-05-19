import { Program } from "../../../shared/types";
import { ProgramModel } from "../models/program.model";
import { ProgramRepository } from "../repositories/program.repository";

import { ServiceI } from "../types/index.type";
export class ProgramService implements ServiceI<Program, "programId"> {
  constructor(private programRepository: ProgramRepository) {}

  getAll = (): Program[] => {
    const programs = this.programRepository.getAll();
    if (!programs) {
      return [];
    }
    return programs;
  };

  getById = (id: number | BigInt): Program | null => {
    const program = this.programRepository.getById(id);
    if (!program) {
      throw new Error("Program not found or invalid ID");
    }
    return program;
  };

  add = (entity: Omit<Program, "programId">): number => {
    const validationErrors = ProgramModel.validate(entity);

    if (validationErrors.length > 0) {
      throw new Error("Validation errors: " + validationErrors.join(", "));
    }
    const programId = this.programRepository.add(entity);
    if (programId === -1) {
      throw new Error("Error adding program");
    }
    return programId;
  };

  delete = (id: number | BigInt): boolean => {
    const result = this.programRepository.delete(id);
    if (!result) {
      throw new Error("Error deleting program");
    }
    return true;
  };

  update = (id: number | BigInt, entity: Partial<Program>): boolean => {
    const validationErrors = ProgramModel.validate(entity);
    if (validationErrors.length > 0) {
      throw new Error("Validation errors: " + validationErrors.join(", "));
    }
    const result = this.programRepository.update(id, entity);
    if (!result) {
      throw new Error("Error updating program");
    }

    return true;
  };

  bulkInsert = (programs: Omit<Program, "programId">[]): boolean => {
    const validationErrors = programs.map((program) => ProgramModel.validate(program)).flat();
    if (validationErrors.length > 0) {
      throw new Error("Validation errors: " + validationErrors.join(", "));
    }
    const result = this.programRepository.bulkInsert(programs);
    if (!result) {
      throw new Error("Error bulk inserting programs");
    }
    return true;
  };
}

export default ProgramService;
