import { Program } from "../../../../shared/types";
import { ProgramModel } from "../../models/program.model";
import { ProgramRepository } from "./program.repository";
import type { CreatableServiceI, DeletableServiceI, UpdatableServiceI, ReadableServiceI } from "../../types/index.type";
import { z } from "zod";

const programSchema = z.object({
  programId: z.number().min(1).optional(),
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  mediaPlatformId: z.number().min(1),
  actionTypeId: z.number().min(1),
});
export class ProgramService
  implements
    CreatableServiceI<Program, "programId">,
    DeletableServiceI<Program, "programId">,
    UpdatableServiceI<Program, "programId">,
    ReadableServiceI<Program, "programId">
{
  constructor(private programRepository: ProgramRepository) {}

  getAll = (): Program[] => {
    const programs = this.programRepository.getAll();
    if (!programs) {
      return [];
    }
    return programs;
  };

  getById = (id: Program["programId"]): Program | null => {
    const validation = z.number().min(1).safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid program ID " + JSON.stringify(validation.error.issues));
    }
    const program = this.programRepository.getById(id);

    if (!program) {
      throw new Error("Program not found or invalid ID");
    }
    return program;
  };

  add = (entity: Omit<Program, "programId">): number => {
    const validation = programSchema.safeParse(entity);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      throw new Error("Invalid data: " + errors.join(", "));
    }

    const programId = this.programRepository.add(entity);
    if (programId === -1) {
      throw new Error("Error adding program");
    }
    return programId;
  };

  delete = (id: Program["programId"]): boolean => {
    const result = this.programRepository.delete(id);
    if (!result) {
      throw new Error("Error deleting program");
    }
    return true;
  };

  update = (id: Program["programId"], entity: Partial<Program>): boolean => {
    const entityValidation = programSchema.partial().safeParse(entity);
    const idValidation = z.number().min(1).safeParse(id);
    if (!idValidation.success) {
      throw new Error("Invalid program ID: " + JSON.stringify(idValidation.error.issues));
    }
    if (!entityValidation.success) {
      const errors = entityValidation.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      throw new Error("Invalid data: " + errors.join(", "));
    }
    const result = this.programRepository.update(id, entity);
    if (!result) {
      throw new Error("Error updating program");
    }

    return true;
  };

  bulkInsert = (programs: Omit<Program, "programId">[]): boolean => {
    const validation = z.array(programSchema).safeParse(programs);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      throw new Error("Invalid data: " + errors.join(", "));
    }
    const result = this.programRepository.bulkInsert(programs);
    if (!result) {
      throw new Error("Error bulk inserting programs");
    }
    return true;
  };
}

export default ProgramService;
