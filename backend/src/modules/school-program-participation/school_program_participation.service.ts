import SchoolProgramParticipationRepository from "./school_program_participation.repository";
import { schoolProgramParticipationSchema } from "./school_program_participation.schema";
import { CreatableServiceI } from "../../types/index.type";

import type {
  SchoolProgramParticipationType,
  schoolProgramParticipationCreateType,
} from "./school_program_participation.schema";
class SchoolProgramParticipationService
  implements CreatableServiceI<SchoolProgramParticipationType, "participationId">
{
  constructor(private schoolProgramParticipation: SchoolProgramParticipationRepository) {}

  add = (entity: schoolProgramParticipationCreateType) => {
    try {
      const validation = schoolProgramParticipationSchema.safeParse(entity);

      if (!validation.success) {
        const errors = validation.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
        throw new Error("Invalid data: " + errors.join(", "));
      }

      const result = this.schoolProgramParticipation.add(entity);
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
}

export default SchoolProgramParticipationService;
