import { Institution, Program, SchoolYear, School, Contact } from "../../../../shared/types";

export interface SchoolProgramParticipationTableI extends Institution, Program, SchoolYear, School, Contact {
  participationId: number;
  coordinatorId: number;
  programId: number;
  institutionName: string;
  schoolId: number;
  contactId: number;
  schoolYear: string;
  programName: string;
  contactName: string;
  contactEmail: string;
}

export type FormValues = {
  institutionId: number | null;
  contactId: number | null;
  programId: number | null;
  schoolYearId: number | null;
};
