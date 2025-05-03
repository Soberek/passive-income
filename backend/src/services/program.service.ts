import { Program } from "../../../shared/types";
import { ProgramRepository } from "../repositories/program.repository";
import { ProgramModel } from "../models/program.model";

export class ProgramService {
  constructor(private programRepository: ProgramRepository) {
    this.programRepository = programRepository;
  }

  getAllPrograms = (): Program[] => {
    const programs = this.programRepository.getAllPrograms();
    if (!programs) {
      console.error("Error fetching all programs");
      return [];
    }
    return programs;
  };

  getProgramById = (id: number): Program | null => {
    const program = this.programRepository.getProgramById(id);
    if (!program) {
      console.error("Error fetching program by id");
      return null;
    }
    return program;
  };

  addProgram = (name: string, description: string, programType: "programowy" | "nieprogramowy"): number => {
    const programModel = new ProgramModel(0, name, description, programType);
    const errors = programModel.validate();
    if (errors.length > 0) {
      console.error("Validation errors:", errors);
      return -1;
    }
    const programId = this.programRepository.addProgram(programModel);
    if (programId === -1) {
      console.error("Error adding program");
      return -1;
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
    const programModel = new ProgramModel(id, name, description, programType);
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
