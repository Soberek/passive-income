import { SchoolProgramParticipation } from "./school_program_participation.repository";
import { schoolProgramParticipationSchema } from "./school_program_participation.schema";

export class SchoolProgramParticipationService {
  constructor(private schoolProgramParticipation: SchoolProgramParticipation) {}

  addSchoolProgramParticipation = (schoolId: number, programId: number, schoolYearId: number): boolean => {
    try {
      const validation = schoolProgramParticipationSchema.safeParse({
        schoolId,
        programId,
        schoolYearId,
      });
      if (!validation.success) {
        const errors = validation.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
        throw new Error("Invalid data: " + errors.join(", "));
      }
      return this.schoolProgramParticipation.addSchoolProgramParticipation(schoolId, programId, schoolYearId);
    } catch (error) {
      console.error(
        "Error adding school program participation:",
        error instanceof Error ? error.message : String(error)
      );
      return false;
    }
  };
}
