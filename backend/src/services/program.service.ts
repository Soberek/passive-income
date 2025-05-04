import { Program } from "../../../shared/types";
import { ProgramRepository } from "../repositories/program.repository";
import { ProgramModel } from "../models/program.model";

export class ProgramService {
  constructor(private programRepository: ProgramRepository, private programModel: ProgramModel) {}

  getAllPrograms = (): Program[] => {
    const programs = this.programRepository.getAllPrograms();
    if (!programs) {
      throw new Error("Error fetching all programs");
    }
    return programs;
  };

  getProgramById = (id: number): Program | null => {
    const program = this.programRepository.getProgramById(id);
    if (!program) {
      throw new Error("Program not found or invalid ID");
    }
    return program;
  };

  addProgram = (name: string, description: string, programType: "programowy" | "nieprogramowy"): number => {
    const programModel = new ProgramModel(name, description, programType);
    const errors = this.programModel.validate();
    if (errors.length > 0) {
      throw new Error("Validation errors: " + errors.join(", "));
    }
    const programId = this.programRepository.addProgram(programModel);
    if (programId === -1) {
      throw new Error("Error adding program");
    }
    return programId;
  };

  deleteProgram = (id: number): boolean => {
    const result = this.programRepository.deleteProgram(id);
    if (!result) {
      throw new Error("Error deleting program");
    }
    return true;
  };

  updateProgram = (
    id: number,
    name: string,
    description: string,
    programType: "programowy" | "nieprogramowy"
  ): boolean => {
    const programModel = new ProgramModel(name, description, programType, id);
    const errors = programModel.validate();
    if (errors.length > 0) {
      throw new Error("Validation errors: " + errors.join(", "));
    }
    const result = this.programRepository.updateProgram(id, programModel);
    if (!result) {
      throw new Error("Error updating program");
    }

    return true;
  };
}

export default ProgramService;
