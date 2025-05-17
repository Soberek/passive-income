import { Program } from "../../../shared/types";

export class ProgramModel {
  static validate(entity: Omit<Program, "programId"> | Partial<Program>): string[] {
    const errors: string[] = [];
    if (!entity.name) {
      errors.push("Name is required");
    }
    if (!entity.description) {
      errors.push("Description is required");
    }
    if (!entity.programType) {
      errors.push("Program type is required");
    } else if (entity.programType !== "programowy" && entity.programType !== "nieprogramowy") {
      errors.push("Invalid program type");
    }
    return errors;
  }
}
