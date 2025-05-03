import { Program } from "../../../shared/types";

export class ProgramModel implements Omit<Program, "id"> {
  id?: number;
  name: string;
  description: string;
  programType: "programowy" | "nieprogramowy";

  constructor(name: string, description: string, programType: "programowy" | "nieprogramowy", id?: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.programType = programType;
  }

  validate(): string[] {
    const errors: string[] = [];
    if (!this.name) {
      errors.push("Name is required");
    }
    if (!this.description) {
      errors.push("Description is required");
    }
    if (!this.programType) {
      errors.push("Program type is required");
    } else if (this.programType !== "programowy" && this.programType !== "nieprogramowy") {
      errors.push("Invalid program type");
    }
    return errors;
  }
}
