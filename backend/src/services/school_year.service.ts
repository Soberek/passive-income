import { ServiceI } from "../types/index.type";
import { SchoolYearRepository } from "../repositories/school_year.repository";
import { SchoolYear } from "../../../shared/types";
export class SchoolYearService implements ServiceI<SchoolYear, "schoolYearId"> {
  private schoolYearRepo: SchoolYearRepository;

  constructor(schoolYearRepo: SchoolYearRepository) {
    this.schoolYearRepo = schoolYearRepo;
  }

  add = (entity: Partial<SchoolYear>): number | null => {
    if (!entity.year) {
      throw new Error("year is required");
    }

    return this.schoolYearRepo.add(entity);
  };
  getAll = (): SchoolYear[] => {
    return this.schoolYearRepo.getAll();
  };
  getById: (id: number) => SchoolYear | null = (id) => {
    if (!id) {
      throw new Error("schoolYearId is required");
    }
    if (typeof id !== "number") {
      throw new Error("schoolYearId must be a number o");
    }
    if (id <= 0) {
      throw new Error("schoolYearId must be a positive number o");
    }
    if (isNaN(Number(id))) {
      throw new Error("schoolYearId must be a valid number o");
    }

    return this.schoolYearRepo.getById(id);
  };
  delete = (id: number): boolean => {
    return this.schoolYearRepo.delete(id);
  };
  update = (id: number, entity: Partial<SchoolYear>): boolean => {
    return this.schoolYearRepo.update(id, entity);
  };
}
