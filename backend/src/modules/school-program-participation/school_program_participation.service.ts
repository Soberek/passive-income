import SchoolProgramParticipationRepository from "./school_program_participation.repository";
import {
  schoolProgramParticipationSchema,
  schoolProgramParticipationCreateSchema,
} from "./school_program_participation.schema";
import { CreatableServiceI, ReadableServiceI } from "../../types/index.type";

import type {
  SchoolProgramParticipationType,
  schoolProgramParticipationCreateType,
} from "./school_program_participation.schema";
import { ProgramCoordinatorRepository } from "../program-coordinator/program_coordinator.repository";
class SchoolProgramParticipationService
  implements
    CreatableServiceI<SchoolProgramParticipationType, "participationId">,
    ReadableServiceI<SchoolProgramParticipationType, "participationId">
{
  constructor(private schoolProgramParticipation: SchoolProgramParticipationRepository) {}

  add = (entity: schoolProgramParticipationCreateType) => {
    try {
      const validation = schoolProgramParticipationCreateSchema.safeParse(entity);

      if (!validation.success) {
        const errors = validation.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
        throw new Error("Invalid data: " + errors.join(", "));
      }

      const result = this.schoolProgramParticipation.addSchoolProgramParticipationCoordinatorTransaction(entity);
      if (!result) {
        throw new Error("Failed to add school program participation");
      }
      return result;
    } catch (error) {
      console.error(
        "Error adding school program participation:",
        error instanceof Error ? error.message : String(error)
      );
      return null;
    }
  };

  getAll = () => {
    try {
      const result = this.schoolProgramParticipation.getAll();
      if (!result) {
        throw new Error("No school program participation found");
      }
      return result;
    } catch (error) {
      console.error(
        "Error retrieving school program participation:",
        error instanceof Error ? error.message : String(error)
      );
      return [];
    }
  };

  getById = (participationId: number) => {
    try {
      const result = this.schoolProgramParticipation.getById(participationId);
      if (!result) {
        throw new Error(`No school program participation found with ID: ${participationId}`);
      }
      return result;
    } catch (error) {
      console.error(
        "Error retrieving school program participation by ID:",
        error instanceof Error ? error.message : String(error)
      );
      return null;
    }
  };
}

export default SchoolProgramParticipationService;
