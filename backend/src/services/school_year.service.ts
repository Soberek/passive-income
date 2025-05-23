import { ServiceI } from "../types/index.type";
import { SchoolYearRepository } from "../repositories/school_year.repository";
import { SchoolYear } from "../../../shared/types";
import { z } from "zod";

const schoolYearSchema = z.object({
  schoolYearId: z.number().min(1).optional(),
  year: z.string().min(4).max(4),
});
export class SchoolYearService implements ServiceI<SchoolYear, "schoolYearId"> {
  private schoolYearRepo: SchoolYearRepository;

  constructor(schoolYearRepo: SchoolYearRepository) {
    this.schoolYearRepo = schoolYearRepo;
  }

  add = (entity: Partial<SchoolYear>): number | null => {
    const validation = schoolYearSchema.safeParse(entity);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      throw new Error("Invalid data: " + errors.join(", "));
    }

    return this.schoolYearRepo.add(entity);
  };
  getAll = (): SchoolYear[] => {
    const schoolYears = this.schoolYearRepo.getAll();

    return schoolYears;
  };
  getById: (id: number) => SchoolYear | null = (id) => {
    const validation = z.number().min(1).safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid schoolYearId " + JSON.stringify(validation.error.issues));
    }

    return this.schoolYearRepo.getById(id);
  };
  delete = (id: number): boolean => {
    const validation = z.number().min(1).safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid schoolYearId " + JSON.stringify(validation.error.issues));
    }
    return this.schoolYearRepo.delete(id);
  };
  update = (id: number, entity: Partial<SchoolYear>): boolean => {
    const validation = z.number().min(1).safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid schoolYearId " + JSON.stringify(validation.error.issues));
    }
    return this.schoolYearRepo.update(id, entity);
  };
}
