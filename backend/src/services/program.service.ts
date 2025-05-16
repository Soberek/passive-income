import { CreateProgramDto, Program } from "../../../shared/types";
import { ProgramModelFactory } from "../factories/program-model.factory";
import { ProgramRepository } from "../repositories/program.repository";

export class ProgramService {
  constructor(private programRepository: ProgramRepository, private programModelFactory: ProgramModelFactory) {}

  getAllPrograms = (): Program[] => {
    const programs = this.programRepository.getAll();
    if (!programs) {
      return [];
    }
    return programs;
  };

  getProgramById = (id: number): Program | null => {
    const program = this.programRepository.getById(id);
    if (!program) {
      throw new Error("Program not found or invalid ID");
    }
    return program;
  };

  addProgram = (data: CreateProgramDto): number => {
    const programModel = this.programModelFactory.createProgramModel(data.name, data.description, data.programType);
    const errors = programModel.validate();
    if (errors.length > 0) {
      throw new Error("Validation errors: " + errors.join(", "));
    }
    const programId = this.programRepository.add(programModel);
    if (programId === -1) {
      throw new Error("Error adding program");
    }
    return programId;
  };

  deleteProgram = (id: number): boolean => {
    const result = this.programRepository.delete(id);
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
    const programModel = this.programModelFactory.createProgramModel(name, description, programType, id);

    const errors = programModel.validate();
    if (errors.length > 0) {
      throw new Error("Validation errors: " + errors.join(", "));
    }
    const result = this.programRepository.update(id, programModel);
    if (!result) {
      throw new Error("Error updating program");
    }

    return true;
  };
}

export default ProgramService;
