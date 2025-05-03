import { Program } from "../../../shared/types";
import { ProgramRepository } from "../repositories/program.repository";
import { ProgramModel } from "../models/program.model";

export class ProgramService {
  constructor(private programRepository: ProgramRepository, private programModel: ProgramModel) {
    this.programRepository = programRepository;
    this.programModel = programModel;
  }

  getAllPrograms = (): Program[] => {
    const programs = this.programRepository.getAllPrograms();
    if (!programs) {
      return [];
    }
    return programs;
  };

  getProgramById = (id: number): Program | null => {
    const program = this.programRepository.getProgramById(id);
    if (!program) {
      return null;
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
      console.error("Error deleting program");
      return false;
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
      console.error("Validation errors:", errors);
      return false;
    }
    const result = this.programRepository.updateProgram(id, programModel);
    if (!result) {
      console.error("Error updating program");
      return false;
    }

    return true;
  };
}

export default ProgramService;
