import { ProgramModel } from "../models/program.model";

export class ProgramModelFactory {
  createProgramModel(
    name: string,
    description: string,
    programType: "programowy" | "nieprogramowy",
    programId?: number | BigInt
  ): ProgramModel {
    return new ProgramModel(name, description, programType, programId);
  }
}
