import type { CreatableServiceI, DeletableServiceI, UpdatableServiceI, ReadableServiceI } from "../../types/index.type";
import { SchoolYearRepository } from "./school_year.repository";
import { SchoolYear } from "../../../../shared/types";
import { schoolYearSchema, schoolYearCreateSchema, schoolYearUpdateSchema } from "./school_year.schema";
export class SchoolYearService
  implements
    CreatableServiceI<SchoolYear, "schoolYearId">,
    DeletableServiceI<SchoolYear, "schoolYearId">,
    UpdatableServiceI<SchoolYear, "schoolYearId">,
    ReadableServiceI<SchoolYear, "schoolYearId">
{
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
    const validation = schoolYearSchema.shape.schoolYearId.safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid schoolYearId " + JSON.stringify(validation.error.issues));
    }

    return this.schoolYearRepo.getById(id);
  };
  delete = (id: number): boolean => {
    const validation = schoolYearSchema.shape.schoolYearId.safeParse(id);
    if (!validation.success) {
      throw new Error("Invalid schoolYearId " + JSON.stringify(validation.error.issues));
    }
    return this.schoolYearRepo.delete(id);
  };
  update = (id: number, entity: Partial<SchoolYear>): boolean => {
    const entityValidation = schoolYearSchema.partial().safeParse(entity);
    const idValidation = schoolYearSchema.shape.schoolYearId.safeParse(id);
    if (!idValidation.success) {
      const errors = idValidation.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      throw new Error("Invalid data: " + errors.join(", "));
    }
    if (!entityValidation.success) {
      throw new Error("Invalid schoolYearId " + JSON.stringify(entityValidation.error.issues));
    }
    return this.schoolYearRepo.update(id, entity);
  };
}
